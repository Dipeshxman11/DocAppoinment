const db = require('../models');

const getChannels = async (req, res) => {
  try {
    const channels = await db.AppointmentChannel.findAll();
    res.json(channels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getChannels
};
