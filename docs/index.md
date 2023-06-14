<p align="center">
  <img src="https://raw.githubusercontent.com/danielmera2912/crev_server/master/crev_logo.png" alt="Logo de CREV"/>
</p>


# CREV

## Enlaces

### Enlace principal

[Despliegue del proyecto](https://crev.netlify.app/)

### Enlaces varios

- [Repositorio del proyecto y código del frontend (DESPLEGADO)](https://github.com/danielmera2912/crev) (Enlace a la rama master para acceder al código del frontend que ha sido desplegado)
- [Repositorio del proyecto y código del frontend (LOCAL)](https://github.com/danielmera2912/crev/tree/local) (Enlace a la rama local para acceder al código del frontend que ha sido desplegado)
- [Repositorio del servidor del proyecto (DESPLEGADO)](https://github.com/danielmera2912/crev_server_spring) (Enlace a la rama master para acceder al código del backend que ha sido desplegado)
- [Repositorio del servidor del proyecto (LOCAL)](https://github.com/danielmera2912/crev_server_spring/tree/local) (Enlace a la rama local para acceder al código del backend que ha sido desplegado)
- [Despliegue del backend](https://crevserverspring-production.up.railway.app)
- [Script de la Base de Datos](https://github.com/danielmera2912/crev_server_spring/blob/master/src/main/resources/script.sql) (para instalación local en el workbench)
- [Script de la base de datos usada en el despliegue](https://github.com/danielmera2912/crev_server_spring/blob/master/src/main/resources/script_despliegue.sql) (no es útil para el usuario, solo expuesto a modo de curiosidad)
- [Colección Postman con peticiones](https://github.com/danielmera2912/crev_server_spring/blob/master/src/main/resources/CREV.postman_collection.json)
- [Manual de uso](https://github.com/danielmera2912/crev/blob/master/Manual%20de%20Uso%20de%20CREV.pdf)

## Contenido

### Antecedentes

El objetivo de este proyecto es desarrollar un organizador de eventos deportivos que satisfaga la necesidad de usuarios que deseen participar en partidos deportivos en una ciudad específica, especialmente cuando no tienen suficientes personas para formar un equipo. La motivación detrás de este proyecto surge de mi propia experiencia al intentar encontrar una solución similar en la web y darme cuenta de que no existían opciones de calidad con funcionalidades gratuitas. Al jugar frecuentemente al baloncesto con amigos, enfrentamos la dificultad de no tener suficientes jugadores para completar un partido y, en consecuencia, cancelar nuestros planes. Esta situación me llevó a concebir este proyecto como una manera de satisfacer una necesidad común.

El objetivo principal es desarrollar una página web que permita a los usuarios crear eventos deportivos con el propósito de encontrar otros usuarios interesados en participar en esos partidos. La página contendrá información sobre usuarios y eventos. Como mínimo, se podrán crear partidos individuales (uno contra uno) y partidos entre equipos. Los usuarios tendrán perfiles personales en los que se mostrará, al menos, un avatar y su dirección de correo electrónico para facilitar el contacto. Los equipos existirán únicamente dentro de un evento específico, lo que significa que en cada evento se formarán equipos únicos. Es posible que los mismos equipos se formen nuevamente en otro evento con el mismo nombre y composición de jugadores, pero cada equipo está vinculado al evento y no existe como una entidad independiente.

La provincia en la que se llevará a cabo el partido y el deporte establecido para el evento también serán datos importantes a tener en cuenta. Se podrán ingresar los resultados de los partidos una vez que hayan concluido las exhibiciones. Además, los usuarios podrán buscar perfiles y administrar sus propios eventos, teniendo la capacidad de eliminarlos o modificarlos. Del mismo modo, los usuarios podrán buscar y filtrar los eventos en los que deseen participar, utilizando criterios como la provincia y el deporte.

En resumen, el objetivo del proyecto es desarrollar una plataforma web que facilite la organización de eventos deportivos, permitiendo a los usuarios crear y participar en partidos, establecer equipos, gestionar perfiles, buscar eventos y administrar sus propios eventos. Con estas funcionalidades, se espera satisfacer las necesidades de los usuarios interesados en jugar deportes y promover la interacción y la diversión deportiva en la comunidad.


### Tecnologías a utilizar

- Diseño de Mockup: Figma
- Desarrollo Frontend: Visual Studio Code, HTML5, SASS, Vue3
- Desarrollo Backend: Intellij IDEA, Java, Spring Boot
- Gestión de Base de Datos: Workbench, MySQL
- Control de Versiones: GitHub
- Despliegue: Netlify (frontend), Railway (backend)
- Testing de API: Postman

### Descripción

La aplicación web denominada CREV (Creador de Eventos Deportivos) es una plataforma diseñada para facilitar la creación y participación en eventos deportivos. Con CREV, los usuarios registrados tienen la posibilidad de crear eventos personalizados en función de una provincia y una fecha específica, brindando una experiencia para los amantes del deporte.

La aplicación ofrece una amplia variedad de opciones deportivas, desde partidos individuales (1vs1) hasta encuentros entre equipos (5vs5). Los usuarios pueden seleccionar su deporte favorito al crear un evento y también tienen la posibilidad de unirse a eventos organizados por otros usuarios, ampliando así sus oportunidades de juego y permitiéndoles establecer contactos con personas afines en su área.

CREV se destaca por su enfoque intuitivo y fácil de usar. Los usuarios pueden explorar los detalles de cada evento, incluyendo información sobre la ubicación, horario y participantes actuales. Además, la plataforma facilita la interacción entre los usuarios al proporcionar perfiles individuales, donde se pueden visualizar y gestionar sus propios datos, así como acceder a los perfiles de otros usuarios para establecer contactos y crear amistades con personas con intereses deportivos similares.

Con un diseño moderno y atractivo, CREV ofrece una experiencia fluida y agradable para los usuarios. La plataforma se ha desarrollado utilizando las últimas tecnologías web, garantizando un rendimiento óptimo y una navegación eficiente.

En resumen, CREV proporciona una solución integral para la organización y participación en eventos deportivos, permitiendo a los usuarios conectar con otros entusiastas del deporte, programar partidos emocionantes y disfrutar de una experiencia social única.

### Instalación

Para la instalación, deberá de irse a las ramas local del repositorio de github del proyecto tanto el repositorio de backend, como en el de frontend, ambos enlaces se encuentran disponible en el apartado de “Enlaces del proyecto”,se podrá ejecutar de diferentes formas, recomiendo usar Visual Studio Code para ejecutar el frontend, se podrá clonar (tras instalar Git, además de configurar la variable de entorno PATH y reiniciar la sesión o el sistema) el repositorio con: 
git clone https://github.com/danielmera2912/crev.git

Otra opción es clonar usando el apartado de Git que te ofrece el idle.
Se deberá de mover a la rama “local” desde el idle que se utilice. En VS Code es abrir el panel de control de Git, pulsar en la parte inferior del panel, y se verá el nombre de la rama actual, se deberá de clickear y aparecerá un desplegable con todas las ramas disponibles del repositorio, y se deberá de pulsar “local”, desde ahí en la consola (se podrá abrir con ctrl + Ñ) se escribirá (para que funcione habrá que descargar node.js, configurar el PATH y reiniciar la sesión o el sistema): 
npm i

A continuación se generará node-modules que tendrá las librerías que se necesita para arrancar el frontend. Y a continuación habrá que escribir:
npm run dev

Tras esto podrás acceder a: http://localhost:5173/

Y para la parte de backend, yo recomiendo el idle de Intellij Idea, simplemente habrá que clonar de la misma forma que el frontend.
Se tendrá que cambiar la rama a la local, se tendrá que abrir el panel “Git” en la parte inferior de la ventana, se verá la rama actual donde te encuentras, y tendrás que pulsarla y te saldrá un desplegable con todas las ramas y tendrás que pulsar la “local” y clickear en “checkout”.
O por el contrario, modificar el archivo de resources/application.properties para ajustarlo a tu gusto, habrá que ejecutar este script que contiene los datos básicos para poder iniciar el servidor y que todo funcione correctamente.
Habrá que seleccionar este servidor de MySQL, ahora habrá que configurar la conexión de workbench de la siguiente forma:

```
spring.datasource.url=jdbc:mysql://localhost:3306/crev
spring.datasource.username=root
spring.datasource.password=1234
```

O por el contrario, usar esas mismas credenciales para conectarlo a una base de datos mysql en un contenedor docker.

Por último ahora habrá que ejecutar “CrevServerSpringApplication.java” que se encuentra esta ruta: crev_server_spring/src/main/java/com/example/crev_server_spring
Ya se encargará de construir todo lo necesario para su funcionamiento.

## Diseño

### Guía de estilos.

[Enlace al figma de la guía de estilos](https://www.figma.com/file/h37mdDYlAf84ntqszAMWFo/Hojas-de-estilo?type=design&t=Xc9C9yn6ivYMXRo4-1)

### Mockup

Se ha realizado en figma el mockup tanto de escritorio como de móvil. [Enlace al figma de la guía de estilos.](https://www.figma.com/file/gxTF7C2nLs3VALrKYATRKb/Mockup?type=design&node-id=0%3A1&t=D1fmKuLbMukkIGPZ-1)

## Manual de Uso

[Pinchando aquí puedes acceder al manual de uso.](https://github.com/danielmera2912/crev/blob/master/Manual%20de%20Uso%20de%20CREV.pdf)
