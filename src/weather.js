import { Component } from "react";

export default class Weather extends Component {

    render() {
        return (
            this.props.weather.map(item =>
                <>
                    <p> Date :  {item.date}   </p>
                    <p> Description : {item.description} </p>
                </>
            )


        )
    }
}