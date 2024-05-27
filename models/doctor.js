module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }, {});
  
    Doctor.associate = function(models) {
      Doctor.hasMany(models.Appointment, {
        foreignKey: 'doctorId',
        as: 'appointments'
      });
    };
  
    return Doctor;
  };
  