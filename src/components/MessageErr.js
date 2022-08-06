import { Component } from "react";

export default class MessageErr extends Component{
    render(){
        return(
            <>
            {this.props.errorMessage}
            </>
        )
    }
}