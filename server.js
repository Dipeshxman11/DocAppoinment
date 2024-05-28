const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

const db = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);


const PORT = 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
