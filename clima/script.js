const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const departmentSelect = document.getElementById('department-select');

const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const API_KEY = '9de243494c0b295cca9337e1e96b00e2';

// Coordenadas de los departamentos del Perú
const departments = {
    "Amazonas": { lat: -5.115, lon: -78.5706 },
    "Áncash": { lat: -9.5297, lon: -77.528 },
    "Apurímac": { lat: -13.635, lon: -72.8814 },
    "Arequipa": { lat: -16.409, lon: -71.5375 },
    "Ayacucho": { lat: -13.1588, lon: -74.2236 },
    "Cajamarca": { lat: -7.16378, lon: -78.5003 },
    "Callao": { lat: -12.0553, lon: -77.1198 },
    "Cusco": { lat: -13.532, lon: -71.9675 },
    "Huancavelica": { lat: -12.786, lon: -74.972 },
    "Huánuco": { lat: -9.9306, lon: -76.2422 },
    "Ica": { lat: -14.0678, lon: -75.7286 },
    "Junín": { lat: -11.158, lon: -75.9933 },
    "La Libertad": { lat: -7.836, lon: -78.4688 },
    "Lambayeque": { lat: -6.701, lon: -79.9061 },
    "Lima": { lat: -12.0464, lon: -77.0428 },
    "Loreto": { lat: -3.74912, lon: -73.2538 },
    "Madre de Dios": { lat: -12.5933, lon: -69.1832 },
    "Moquegua": { lat: -17.195, lon: -70.9353 },
    "Pasco": { lat: -10.6773, lon: -76.2611 },
    "Piura": { lat: -5.1945, lon: -80.6328 },
    "Puno": { lat: -15.8402, lon: -70.0219 },
    "San Martín": { lat: -6.486, lon: -76.365 },
    "Tacna": { lat: -18.0056, lon: -70.2484 },
    "Tumbes": { lat: -3.56687, lon: -80.4515 },
    "Ucayali": { lat: -8.37915, lon: -74.5539 }
};

// Llenar el select con los departamentos
for (const department in departments) {
    const option = document.createElement('option');
    option.value = department;
    option.textContent = department;
    departmentSelect.appendChild(option);
}

// Establecer Lima como departamento por defecto
departmentSelect.value = "Lima";

departmentSelect.addEventListener('change', (event) => {
    const selectedDepartment = event.target.value;
    if (selectedDepartment) {
        const coordinates = departments[selectedDepartment];
        fetchWeatherData(coordinates.lat, coordinates.lon);
        timezone.innerHTML = `America/${selectedDepartment}`;
    }
});

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];
}, 1000);

function getWeatherData() {
    const latitude = -12.0464; // Latitud de Lima, Perú por defecto
    const longitude = -77.0428; // Longitud de Lima, Perú por defecto
    fetchWeatherData(latitude, longitude);
}

function fetchWeatherData(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showWeatherData(data);
        });
}

function showWeatherData(data) {
    const { humidity, pressure, sunrise, sunset, wind_speed } = data.current;
    countryEl.innerHTML = `${data.lat.toFixed(4)}N ${data.lon.toFixed(4)}E`;

    currentWeatherItemsEl.innerHTML = `
        <div class="weather-item">
            <img src="https://img.icons8.com/fluency/48/000000/humidity.png" alt="humidity icon">
            <div>Humedad</div>
            <div>${humidity}%</div>
        </div>
        <div class="weather-item">
            <img src="https://img.icons8.com/color/48/000000/pressure.png" alt="pressure icon">
            <div>Presión</div>
            <div>${pressure} hPa</div>
        </div>
        <div class="weather-item">
            <img src="https://img.icons8.com/ios/50/000000/wind.png" alt="wind speed icon">
            <div>Velocidad del viento</div>
            <div>${wind_speed} m/s</div>
        </div>
        <div class="weather-item">
            <img src="https://img.icons8.com/color/48/000000/sunrise.png" alt="sunrise icon">
            <div>Amanecer</div>
            <div>${moment(sunrise * 1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-item">
            <img src="https://img.icons8.com/color/48/000000/sunset.png" alt="sunset icon">
            <div>Atardecer</div>
            <div>${moment(sunset * 1000).format('HH:mm a')}</div>
        </div>
    `;

    let otherDayForecast = '';
    data.daily.slice(0, 3).forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                <div class="other">
                    <div class="day">${days[new Date(day.dt * 1000).getDay()]}</div>
                    <div class="temp">Noche - ${day.temp.night}&#176;C</div>
                    <div class="temp">Día - ${day.temp.day}&#176;C</div>
                </div>
            `;
        } else {
            otherDayForecast += `
                <div class="weather-forecast-item">
                    <div class="day">${days[new Date(day.dt * 1000).getDay()]}</div>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                    <div class="temp">Noche - ${day.temp.night}&#176;C</div>
                    <div class="temp">Día - ${day.temp.day}&#176;C</div>
                </div>
            `;
        }
    });

    weatherForecastEl.innerHTML = otherDayForecast;
}

// Cargar datos de clima para Lima por defecto
getWeatherData();