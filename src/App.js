import React, { Component } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: {},
      allCity: {},
      image_src: {},
      displayName: {},
      lattitude: {},
      longitude: {},
      errorMessage: '',
      displayError: true,
      display_name: ''
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const cityName = e.target.userCityInput.value
      console.log(cityName)
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_MAIN_URL}&q=${cityName}&format=json`
      const image_src = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MAIN_URL}&center=${this.state.latitude},${this.state.longitude}&zoom=10`

      console.log(url)
      const cityData = await axios.get(url);
      console.log(cityData)

      this.setState({
        allCity: cityData.data[0],
        userInput: e.target.userCityInput.value,
        display_name: cityData.data[0].display_name,
        lattitude: cityData.data[0].lat,
        longitude: cityData.data[0].lon,
         city: cityData.data[0].display_name,
        displayError: false
      })
    } catch (error) {
      console.log(error.response)
      this.setState({

        displayError: true,
        errorMessage: error.response.status + ':' + error.response.data.error
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
            <img image_src={this.state.image_src} alt={this.state.city} />
          </>
        }
      </div>
    )
  }
}
