# WEATHER APP

Repositorio donde se guarda la aplicación web para móvil del tiempo de Sergio De la Fuente.

## Diseño de la página

La página tiene una página principal donde podrás elegir una ubicación para consultar el tiempo.
Hay un selector en los que podrás elegir entre "Ubicación actual" o "Por ciudad":
- Si eliges "Ubicación actual" el dispositivo necesitará permisos para acceder a la ubicación en tiempo real.
- Si elilges "Por ciudad" aparecerá una casilla para poder introducir el nombre de una ciudad.
Una vez se sabe la ubicación, hay 2 botones.
- Para consultar el tiempo en tiempo real de la ubicación indicada.
- Para consultar el tiempo de hoy + próximos 4 días de la ubicación indicada.
Una vez seleccionado uno de los botones aparecerá otra página con la información solicitada.

Además, en la página principal se puede cambiar el idioma, entre español e inglés.

Información que se muestra sobre el tiempo:
- Icono indicando el tiempo
- Hora de dicha predicción
- Temperatura (en ºC)
- Viento (en m/s)
- Precipitaciones (en mm)
- Estado

## Estructura del proyecto

- **`/diseño-previo`**: Carpeta con cuatro imágenes del diseño previo.
- **`/android`**: Carpeta generada al introducir por consula el comando para convertir la app en app móvil para android.
- **`/src`**: Carpeta principal de la aplicación.
  - **`/enviroments`**: Carpeta donde se especifica la api key para consultar la información sobre el tiempo.
  - **`/assets`**: Dentro de esta carpeta habrá otra carpeta con el nombre **`/i18n`**: con las especificaciones de cada idioma.
  - **`/app`**: Carpeta con la importante de la aplicación.
    - **`/home`**: Página principal.
    - **`/pages/results`**: Página con los resultados de la información del tiempo.
    - **`/models`**: Carpeta para la interface **weather**.
    - **`/services`**: Carpeta para el servicio de **weather**.

## Requisitos previos a la instalación

- Tener un Entorno de desarrollo, como VSCode
- Node.js
- ionic CLI
- Entorno de desarrollo de móvil, como AndroidStudio

## Instalación y ejecución de la aplicación

1. Clona el repositorio: 
    ```bash
    git clone https://github.com/Sergiodlf/weatherApp.git
    ```
2. Poner esta carpeta donde se quiera en el pc y abrirla con VSCode, por ejemplo.
3. Abrir una terminal donde se instalarán las dependencias con: 
    ```bash
    npm install
    ```
4. Ya se puede arrancar el servidor:
    ```bash
    ionic serve
    ```
5. Estará disponible en:
    ```bash
    localhost:8100
    ```
6. Convertirla en app móvil
    ```bash
    ionic build
    ionic cap sync android
    ionic cap open android
    ```
