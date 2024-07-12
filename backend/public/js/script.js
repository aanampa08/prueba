document.getElementById('formRegistro').addEventListener('submit', function (event) {
    // Evitar el envío del formulario
    event.preventDefault();
    
    // Consigo los datos del formulario
    const usuario = document.getElementById('nombre_usuario').value;
    const contraseña = document.getElementById('contraseña_nueva').value;
    const newUser = {
      usuario: usuario,
      contraseña: contraseña
    };
  
    // Configuración de la solicitud
    const method = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    };
  
    // Hacer la solicitud POST
    fetch('http://localhost:3000/prueba/registroUsuario', method)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo crear el usuario');
        }
        return response.json();
      })
      .then(newUser => {
        console.log('Respuesta:', newUser);
        //aca se puede mostrar desde el index que se creo el usuario
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  
  // --------------------------- FETCH POST PARA EL LOGIN DEL USUARIO

document.getElementById('formInicio').addEventListener('submit', function (event) {
  // Evitar el envío del formulario
  event.preventDefault();

  // Consigo los datos del formulario
  const usuario = document.getElementById('idUsuario').value;
  const contraseña = document.getElementById('idContraseña').value;
  const dataUser = {
    usuario: usuario,
    contraseña: contraseña,
  };

  // Configuración de la solicitud
  const method = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataUser)
  };

  // Hacer la solicitud POST
  fetch('http://localhost:3000/prueba/loginUsuario', method)
    .then(response => {
      if (!response.ok) {
        throw new Error('front POST: no se pudo encontrar la ruta');
      }
      return response.json();
    })
    .then(resultado => {
      if(resultado.auth && resultado.token){
        localStorage.setItem('token',resultado.token);
        window.location.href="./user/dashboard.html";
        // console.log(resultado.token);
        // cargarDatosUsuario();
      }
      else{
        console.error('error de inicio de sesion: ',resultado);
      }
      
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
function cargarDatosUsuario() {
  // Obtener el token del localStorage
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('Token no encontrado en el localStorage.');
    return;
  }

  // Configurar la solicitud GET para obtener información del usuario
  const method = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  // Hacer la solicitud GET para obtener datos del usuario
  fetch('http://localhost:3000/prueba/userinfo', method)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener datos del usuario');
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos del usuario:', data);
      
      document.getElementById('nombreUsuario').textContent = data.username;
    })
    .catch(error => {
      console.error('Error al obtener datos del usuario:', error);
    });
}
