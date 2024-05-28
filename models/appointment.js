module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      channel: {
        type: DataTypes.STRING,
        allowNull: false
      },
      appointmentTime: {  
        type: DataTypes.DATE,
        allowNull: false
      },
      appointmentType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      needForDoctor: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {});
    
    Appointment.associate = function(models) {
      Appointment.belongsTo(models.Patient, { as: 'patient', foreignKey: 'patientId' });
      Appointment.belongsTo(models.Doctor, { as: 'doctor', foreignKey: 'doctorId' });
    };
    
    return Appointment;
  };