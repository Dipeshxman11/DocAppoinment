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

module.exports = {
  getAppointments,
  createAppointment
};
