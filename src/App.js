import React from 'react';

import './App.css'
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from './components/form.component';
import Weather from './components/weather.component';

const API_key = 'fd9fb084a09d8b5949e8d196f037950d';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: "",
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  calCelsius(temp) {
    let celsius = Math.floor(temp - 273.15);
    return celsius;
  }

  getWeatherIcon(icons, id) {
    switch (true) {
      case id >= 200 && id <= 232:
        this.setState({
          icon: this.weatherIcon.Thunderstorm
        })
        break;
      case id >= 300 && id <= 321:
        this.setState({
          icon: this.weatherIcon.Drizzle
        })
        break;
      case id >= 500 && id <= 531:
        this.setState({
          icon: this.weatherIcon.Rain
        })
        break;
      case id >= 600 && id <= 622:
        this.setState({
          icon: this.weatherIcon.Snow
        })
        break;
      case id >= 700 && id <= 781:
        this.setState({
          icon: this.weatherIcon.Atmosphere
        })
        break;
      case id === 800:
        this.setState({
          icon: this.weatherIcon.Clear
        })
        break;
      case id >= 801 && id <= 804:
        this.setState({
          icon: this.weatherIcon.Clouds
        })
        break;
      default: this.setState({
        icon: this.weatherIcon.Clouds
      })
        break;
    }
  }

  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)

      const response = await api_call.json();

      console.log(response);

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_min: this.calCelsius(response.main.temp_min),
        temp_max: this.calCelsius(response.main.temp_max),
        description: response.weather[0].description,
        error: false
      })

      this.getWeatherIcon(this.weatherIcon, response.weather[0].id)
    } else {
      this.setState({
        error: true
      })
    }
  }
  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          temp_celsius={this.state.celsius}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
