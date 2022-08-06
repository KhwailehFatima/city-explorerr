import { Component } from "react";
 
export default class Weather extends Component {

    render() {
        return (
            this.props.weather.map(item =>
               <div>
                   <p>  {item.date}  :  {item.description}  </p>
               </div> 
               
            )


        )
    }
}