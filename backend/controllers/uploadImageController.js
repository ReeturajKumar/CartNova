const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImage = async (req, res) => {
  try {
    // Validate file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type. Only JPEG, PNG, and GIF are allowed." });
    }

    if (req.file.size > maxSize) {
      return res.status(400).json({ error: "File size exceeds the limit of 5MB." });
    }

    // Stream upload to Cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" }, // Specify the resource type
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Upload image and get the result
    const result = await streamUpload(req.file.buffer);

    // Return the image URL from Cloudinary
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading file" });
  }
};

module.exports = { uploadImage };
