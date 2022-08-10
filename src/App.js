import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchCityForm from './components/SearchCityForm';
import DispInfo from './components/DispInfo';
import Map from './components/Map';
import MessageErr from './components/MessageErr';
import Weather from './components/Weather';
import Movie from './components/Movie';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userInput: {},
      
      map: '',
      displayName: {},
      lattitude: {},
      longitude: {},
      errorMessage: '',
      displayError: true,
      display_name: '',
      displayInfo:false,
      isWeather: false,
      weather: [],
      isMovie: false,
      movie: []
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    const searchQuery = e.target.searchQuery.value;
    //console.log(searchQuery)
    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MAIN_URL}&q=${searchQuery}&format=json`
    
    try {
      const cityData = await axios.get(url)
      //console.log(cityData)
      this.setState({
        display_name: cityData.data[0].display_name,
        lattitude: cityData.data[0].lat,
        longitude: cityData.data[0].lon,
        displayError: false,
        displayInfo: true
      })


      this.displayMap(cityData.data[0].lat, cityData.data[0].lon);

      this.displayWeather(cityData.data[0].lat, cityData.data[0].lon, searchQuery);

      this.displayMovie(searchQuery);
     } catch (error) {
         //console.log(error)
      this.setState({
        display_name: '',
        displayError: true,
        displayInfo: false,
        errorMessage: error.response.status + ": " + error.response.data
      })
     }
 
      
  }

  displayMap = async (lat, lon) => {

    const mp_src = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MAIN_URL}&center=${lat},${lon}&zoom=10`
    this.setState({
      map: mp_src
    })
//console.log(mp_src)
  }


  displayWeather = async (lat, lon, searchQuery) => {

    try {
      const weatherData = await axios.get(`https://cityexplorer301.herokuapp.com/weather?lat=${lat}&lon=${lon}&searchQuery=${searchQuery}`)
      //console.log("weatherData :"  + weatherData.data)
      this.setState({
        weather: weatherData.data,
        isWeather: true
        // displayError: false

      })

    } catch (error) {
      // console.log(error)
      this.setState({
        isWeather: false,
        displayError: true,
        errorMessage: error.response.status + ": " + error.response.data,
        displayInfo: false
      })
    }
  }

  displayMovie = async (searchQuery) => {
    try {
      const movieData = await axios.get(`https://cityexplorer301.herokuapp.com/movie?query=${searchQuery}`)
      console.log(movieData.data)
      this.setState({
        movie: movieData.data,
        isMovie: true
        // displayError: false

      })

    } catch (error) {
      // console.log(error)
      this.setState({
        isMovie: false,
        // displayError: true,
        // errorMessage: error.response.status + ": " + error.response.data.error
       errorMessage: error.response.status + ": " + error.response.data
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h1> {process.env.REACT_APP_TITLE}</h1>

        <SearchCityForm handleSubmit={this.handleSubmit} />

        {this.state.displayInfo &&
          <>
            <DispInfo lattitude={this.state.lattitude} longitude={this.state.longitude} displayName={this.state.display_name} />
            <Map map={this.state.map}   />
          </>
        }

        {this.state.isWeather &&
          <Weather weather={this.state.weather} />
        }


        {this.state.isMovie &&
          <Movie movie={this.state.movie} />}

        {this.state.displayError &&
          <MessageErr errorMessage={this.state.errorMessage} />
        }

      </div>
    )
  }
}
