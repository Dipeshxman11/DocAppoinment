const db = require('../models');

const getChannels = async (req, res) => {
  try {
    const channels = await db.AppointmentChannel.findAll();
    res.json(channels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createChannel = async (req, res) => {
    const { channel } = req.body;
    try {
      const newChannel = await db.AppointmentChannel.create({ channel });
      res.status(201).json(newChannel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getChannels,
    createChannel
  };