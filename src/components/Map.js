import { Component } from "react";

export default class MessageErr extends Component{
    render(){
        return(
            <>
            <img src={this.props.map} alt={this.props.displayName} />
            </>
        )
    }
}