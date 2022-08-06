import { Component } from "react";

export default class DispInfo extends Component{
    render(){
        return(
            <div>
                City Name: <p> {this.props.displayName}</p>
                Lattitude: <p> {this.props.lattitude} </p>
                Longitude: <p> {this.props.longitude} </p>    
            </div>
        )
    }
}