# App del Clima

## Descripción

**App del Clima** proporciona una interfaz interactiva para consultar la información meteorológica de diversos departamentos de Perú. Al abrir la aplicación, el usuario se encuentra con una vista dividida en dos secciones principales:

- **Sección Izquierda**: Muestra la hora actual, la fecha y la zona horaria, junto con un selector desplegable para elegir el departamento del cual se desea conocer el clima.
- **Sección Derecha**: Presenta los detalles del clima actual y un pronóstico para los próximos días.

## Lenguajes y Tecnologías Usados

- **HTML**: Utilizado para la estructura y el contenido de la aplicación.
- **CSS**: Utilizado para el diseño y la presentación visual de la aplicación.
- **JavaScript**: Utilizado para la lógica interactiva y la integración con la API meteorológica.

## Funcionamiento de la Aplicación

1. **Interfaz Inicial**: Al abrir la aplicación, se muestra la hora y fecha actuales, junto con un selector desplegable para elegir el departamento de Perú para consultar el clima. Los datos del clima para Lima se cargan automáticamente al inicio.
   
2. **Selección de Departamento**: Al seleccionar un departamento del desplegable, la aplicación actualiza dinámicamente la zona horaria y realiza una solicitud a la API de OpenWeatherMap para obtener datos meteorológicos.

3. **Obtención de Datos**: La respuesta de la API se procesa para mostrar información detallada como la humedad, presión, velocidad del viento, así como el amanecer y el atardecer. También se presenta un pronóstico del clima para los días siguientes.

4. **Actualización en Tiempo Real**: La hora y la fecha se actualizan en tiempo real para ofrecer una experiencia de usuario fluida y actualizada.

## Instalación

Para utilizar la App del Clima, sigue estos pasos:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/ampuerovillanueva/appClima
