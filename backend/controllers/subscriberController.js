const Subscriber = require("../models/subscriberModel");

const handlNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ error: "Email already subscribed" });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Successfully subscribed to newsletter" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error subscribing to newsletter" });
  }
}

module.exports = { handlNewsletter }