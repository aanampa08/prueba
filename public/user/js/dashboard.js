document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    fetch('http://localhost:3000/prueba/userinfo', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.username) {
            document.getElementById('username').textContent = data.username;
        } else {
            console.error('Error al obtener la información del usuario:', data.message);
        }
    })
    .catch(err => console.error('Fetch error:', err));
});