const searchUser = () => {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const userProfiles = document.getElementsByClassName('user-profile');
    Array.from(userProfiles).forEach(profile => {
        const userName = profile.dataset.name.toLowerCase();
        const userContact = profile.dataset.contact.toLowerCase();
        if (userName.includes(searchValue) || userContact.includes(searchValue)) {
            profile.style.display = 'block';
        } else {
            profile.style.display = 'none';
        }
    });
};

const displayUser = (user) => {
    const usersList = document.getElementById('usersList');
    const userProfile = document.createElement('div');
    userProfile.classList.add('user-profile');
    userProfile.dataset.name = user.name;
    userProfile.dataset.contact = user.contact;
    userProfile.textContent = `${user.name} - ${user.contact}`;
    userProfile.addEventListener('click', () => {
        fetchUserInformation(user.name, user.contact);
    });
    usersList.appendChild(userProfile);
};

const fetchUserInformation = async (name, contact) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/appointments/search?name=${name}&contact=${contact}`);
        const userDetails = response.data;
        document.getElementById('userName').textContent = `Name: ${userDetails.patient.name}`;
        document.getElementById('userContact').textContent = `Contact: ${userDetails.patient.contact}`;
        document.getElementById('userDoctor').textContent = `Doctor: ${userDetails.doctor.name}`;
        document.getElementById('userChannel').textContent = `Channel: ${userDetails.channel}`;
        document.getElementById('appointmentTime').textContent = `Appointment Time: ${userDetails.appointmentTime}`;
        document.getElementById('userDetails').style.display = 'block';
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/appointments/users');
        response.data.forEach(user => {
            displayUser(user);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});