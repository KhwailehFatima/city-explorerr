import React, { Component } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './weather';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: {},
      allCity: {},
      image_src: '',
      displayName: {},
      lattitude: {},
      longitude: {},
      errorMessage: '',
      displayError: true,
      display_name: '',
      weather: {}
    }
  }
   handleSubmit = async (e) => {
    e.preventDefault()
    const cityName = e.target.userCityInput.value;
      
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_MAIN_URL}&q=${cityName}&format=json`
     const cityData = await axios.get(url);

     try {

      this.setState({
        allCity: cityData.data[0],
        userInput: e.target.userCityInput.value,
        display_name: cityData.data[0].display_name,
        lattitude: cityData.data[0].lat,
        longitude: cityData.data[0].lon,
        city: cityData.data[0].display_name,
        displayError: false,
        image_src: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MAIN_URL}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=10`
      })
    } catch (error) {
       this.setState({
        display_name: '',
        displayError: true,
        errorMessage: error.response.status + ": " + error.response.data.error
      })
     }


this.displayWeather(cityData.data[0].lat, cityData.data[0].lon, cityName);
}
 
  displayWeather = async (lat,lon, cityName) => {

    try {
       const weatherData = await axios.get (`http://localhost:3001/weather`, { params: { lattitude: lat, longitude: lon, searchQuery: cityName} })
       console.log(weatherData)
       this.setState({
        weather: weatherData.data,       
     displayError:false

    })
 
  } catch (error) {
    console.log(error)
      this.setState({
        
        displayError:true,
        
        errorMessage: error.response.status + ": " + error.response.data.error
       })
     }
  }

  render() {
    return (
      <div>
        <h1> {process.env.REACT_APP_TITLE}</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3"  >
            <Form.Label>Enter City</Form.Label>
            <Form.Control type="text" name="userCityInput" placeholder="Enter city ..." />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>

        {this.state.displayError &&
          <p>  {this.state.errorMessage} </p>
        }

        {this.state.display_name &&
          <>
          
            <p> Display Name: {this.state.display_name} </p>
            <p> Lattitude: {this.state.allCity.lat} </p>
            <p> Longitude: {this.state.allCity.lon} </p>
            <img src={this.state.image_src} alt={this.state.city} />
             <Weather weather={this.state.weather} />
          </>
        }
      </div>
    )
  }
}
