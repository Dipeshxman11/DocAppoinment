const db = require('../models');

const getAppointments = async (req, res) => {
  try {
    const appointments = await db.Appointment.findAll({
      include: [
        { model: db.Patient, as: 'patient' },
        { model: db.Doctor, as: 'doctor' }
      ]
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAppointment = async (req, res) => {
  const { patientName, contact, doctorId, channel, appointmentTime, appointmentType, needForDoctor } = req.body;
  try {
    let patient = await db.Patient.findOne({ where: { name: patientName, contact } });
    if (!patient) {
      patient = await db.Patient.create({ name: patientName, contact });
    }

    let finalDoctorId;
    if (isNaN(parseInt(doctorId))) {
      const newDoctorName = doctorId;
      const newDoctor = await db.Doctor.create({ name: newDoctorName });
      finalDoctorId = newDoctor.id;
    } else {
      finalDoctorId = parseInt(doctorId);
    }

    const appointment = await db.Appointment.create({
      patientId: patient.id,
      doctorId: finalDoctorId,
      channel,
      appointmentTime,
      appointmentType,
      needForDoctor
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await db.Patient.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchAppointments = async (req, res) => {
  const { name, contact } = req.query;
  try {
    const user = await db.Patient.findOne({ where: { name, contact } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const appointment = await db.Appointment.findOne({
      where: { patientId: user.id },
      include: [
        { model: db.Patient, as: 'patient' },
        { model: db.Doctor, as: 'doctor' }
      ]
    });
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({
      patient: {
        name: user.name,
        contact: user.contact
      },
      doctor: {
        name: appointment.doctor.name
      },
      channel: appointment.channel,
      appointmentTime: appointment.appointmentTime
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  getUsers,
  searchAppointments
};