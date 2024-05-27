module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {});
  
    Patient.associate = function(models) {
      Patient.hasMany(models.Appointment, {
        foreignKey: 'patientId',
        as: 'appointments'
      });
    };
  
    return Patient;
  };
  