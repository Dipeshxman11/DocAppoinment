module.exports = (sequelize, DataTypes) => {
  const AppointmentChannel = sequelize.define('AppointmentChannel', {
    channel: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  AppointmentChannel.associate = function(models) {
    AppointmentChannel.hasMany(models.Appointment, {
      foreignKey: 'channelId',
      as: 'appointments'
    });
  };

  return AppointmentChannel;
};
