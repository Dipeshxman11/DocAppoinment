document.addEventListener('DOMContentLoaded', () => {
    const doctorSelect = document.getElementById('doctor');
    const newDoctorNameInput = document.getElementById('newDoctorName');

    doctorSelect.addEventListener('change', () => {
        newDoctorNameInput.style.display = doctorSelect.value === 'new' ? 'block' : 'none';
    });

    const form = document.getElementById('appointmentForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        let doctorId;
        if (doctorSelect.value === 'new') {
            const newDoctorName = newDoctorNameInput.value.trim();
            if (!newDoctorName) {
                alert('Please enter a new doctor\'s name');
                return;
            }
            doctorId = newDoctorName;
        } else {
            doctorId = doctorSelect.value;
        }

        const appointmentData = {
            patientName: form.patientName.value,
            contact: form.patientContact.value,
            doctorId: doctorId,
            channel: form.channel.value,
            appointmentTime: form.appointmentTime.value,
            appointmentType: form.appointmentType.value,
            needForDoctor: form.needForDoctor.value
        };

        axios.post('http://localhost:3000/api/appointments', appointmentData)
            .then(response => {
                alert('Appointment booked successfully!');
                form.reset();  // Clear the form inputs
                newDoctorNameInput.style.display = 'none'; // Hide the new doctor input
            })
            .catch(error => console.error('Error booking appointment:', error));
    });
});