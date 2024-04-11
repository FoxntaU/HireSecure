# HireSecure

Welcome to the HireSecure wiki!
🚀 ¡Bienvenido a HireSecure!

En el proceso de búsqueda de empleo, los candidatos pueden ser víctimas de fraudes y estafas en diversos canales de comunicación. HireSecure es una aplicación que utiliza un enfoque omnicanal para verificar la autenticidad de los canales de comunicación asociados con reclutadores legítimos, como Magneto, y proteger a los candidatos contra fraudes en el proceso de búsqueda de empleo.

ℹ️ Más Detalles: Consulta los detalles completos del proyecto en los sprints y en el backlog.

📋 Sprints y Backlog: Visita el [enlace al backlog](https://github.com/users/FoxntaU/projects/1) para conocer las historias de usuario, tareas y progreso del proyecto.
📚 Wiki: Visita el [enlace al wiki](https://github.com/FoxntaU/HireSecure/wiki/Sprint-1) para conocer mas detalles del proyecto.


## Documentación del Proyecto
Descripción General
Este proyecto consiste en una aplicación web que proporciona endpoints para el registro de usuarios, inicio de sesión, generación y verificación de códigos JWT (JSON Web Tokens). Utiliza Node.js con Express.js para el backend, MongoDB para la base de datos y JWT para la autenticación.

Cómo Ejecutarlo
Clona el repositorio desde GitHub

```bash
git clone git@github.com:FoxntaU/HireSecure.git
```

## Backend

Instala las dependencias del proyecto:

cd Backend 
npm install
Crea un archivo .env en la raíz del proyecto y agrega la siguiente configuración (reemplaza TU_MONGODB_URI por tu URI de MongoDB):

```bash
MONGODB_URI=TU_MONGODB_URI
```


Inicia el servidor:
```bash
npm start
```

Archivos Principales

server.js: Archivo principal que configura y ejecuta el servidor Express.

routes/user.js: Contiene las rutas para el registro, obtención y autenticación de usuarios.

routes/token.js: Contiene las rutas para la generación y verificación de tokens JWT.

models/user.js: Define el esquema de usuario para la base de datos MongoDB.

models/token.js: Define el esquema para almacenar los tokens JWT en la base de datos.


Rutas de Usuario (/api/users)
Registrar Usuario

Ruta: POST /api/users/create

Descripción: Esta ruta permite registrar un nuevo usuario en la base de datos.
Parámetros Body: Se espera un objeto JSON con los datos del usuario a registrar, incluyendo name, email y password.
Respuesta: Retorna los datos del usuario registrado.
Obtener Usuario

Ruta: POST /api/users/retrieve

Descripción: Esta ruta permite obtener los datos de un usuario específico en la base de datos.
Parámetros Body: Se espera un objeto JSON con el id del usuario a obtener.
Respuesta: Retorna los datos del usuario solicitado.

Iniciar Sesión
Ruta: POST /api/users/login

Descripción: Esta ruta permite que un usuario inicie sesión en la aplicación.
Parámetros Body: Se espera un objeto JSON con el email y password del usuario.
Respuesta: Retorna un mensaje indicando si el inicio de sesión fue exitoso o no.


Rutas de Token (/api/token)

Generar Token
Ruta: POST /api/token/generate

Descripción: Esta ruta permite generar un nuevo token JWT.
Parámetros Body: Se espera un objeto JSON con los datos del token a generar, incluyendo subject, generatedBy, isSingleUse (booleano) y expirationDate.
Respuesta: Retorna el token generado.
Verificar Token

Ruta: POST /api/token/verify

Descripción: Esta ruta permite verificar la validez de un token JWT.
Parámetros Body: Se espera un objeto JSON con el token a verificar.
Respuesta: Retorna los datos del token verificado, incluyendo subject, generatedBy, isSingleUse, expirationDate y used.

Ejemplo para las rutas 

Para acceder a estas rutas, debes enviar las solicitudes correspondientes (POST) a la dirección base de tu servidor seguido de la ruta específica (por ejemplo, http://localhost:9000/api/users/create para registrar un usuario). Recuerda ajustar la dirección base según la configuración de tu entorno de desarrollo.
