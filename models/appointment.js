module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      appointmentTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      appointmentType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      needForDoctor: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      channel: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {});
  
    Appointment.associate = function(models) {
      Appointment.belongsTo(models.Patient, {
        foreignKey: 'patientId',
        as: 'patient'
      });
      Appointment.belongsTo(models.Doctor, {
        foreignKey: 'doctorId',
        as: 'doctor'
      });
    };
  
    return Appointment;
  };
  