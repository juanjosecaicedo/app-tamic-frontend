# TAMIC
[Sitio Web del Proyecto](https://apptamic.com/#/)

## Variables de entorno

Se crearon los archivos .env y .env.production, para las variables de entorno, para crear variables
en este se deben definir con el prefijo "VUE_APP_" para que vuejs las reconozca. Toda variable
definida en el archivo .env se toma para el ambiente de desarrollo y toda variable definida en el
archivo .env.production será tomada para el ambiente de producción, todo ello depende de como se
compile la aplicación, si se ejecuta para desarrollo o se compila modo production.

### ¿Como esta compuesta la aplicación?

Esta aplicación cuenta con dos lugares de acceso, una parte para los clientes y otra para su
administración (Dashboard), se puede acceder a cada una dependiendo del tipo de usuario con el
cual se realice la actividad.

### Para trabajar localmente

Para trabajar de forma local se debe clonar el repositorio y seguir los siguientes pasos:

- Instalar nodejs
- Ejecutar el comando "npm install" para instalar las dependencias
- Modificar en el archivo .env las variables de conexión a la bd
- Ejecutar el comando "npm run serve" para levantar la aplciación, para ello
    ya debe estar en linea el backend.
