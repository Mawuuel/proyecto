const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const container = document.getElementById('container');
const signUpForm = document.forms[0];
const signInForm = document.forms[1];

registerBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

signUpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;

    // Obtén los usuarios almacenados
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica si el usuario ya está registrado
    if (userExists(users, username)) {
        showError('Usuario ya registrado.');
        return;
    }

    // Agrega nuevo usuario
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Limpiar formulario y mostrar mensaje de éxito
    signUpForm.reset();
    showError('Registro exitoso. Por favor, inicia sesión.');
});

signInForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = signInForm.querySelector('input[type="email"]').value;
    const password = signInForm.querySelector('input[type="password"]').value;

    // Obtén los usuarios almacenados
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica si las credenciales son válidas
    const authenticatedUser = users.find(user => user.email === email && user.password === password);

    if (authenticatedUser) {
        showError(`¡Bienvenido, ${authenticatedUser.username}!`);
        console.log('Redirigiendo a Home.html...');
        // Redirige al usuario a Home.html después del inicio de sesión exitoso
        window.location.href = 'Home.html';
    } else {
        alert('Correo o contraseña incorrectos.');
    }
});

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = message;
    setTimeout(() => {
        errorMessage.innerText = '';
    }, 5000);
}

function userExists(users, username) {
    return users.some(user => user.username === username);
}
