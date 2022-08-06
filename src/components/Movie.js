import { Component } from "react";

export default class Weather extends Component {

    render() {
        return (
            this.props.movie.map((item) =>
                <div >

                    <h3>Movie Title: {item.title}</h3>
                    <p> Overview: { item.overview}</p>
                    <p>Average Votes: { item.average_votes}</p>
                    <p>TotalVotes: { item.total_votes}</p>
                    <p>Popularity: { item.popularity}</p>
                    <p>Released On: { item.released_on}</p>

                    <img src={item.poster_path} alt={ item.title}/>
              

                </div>
            )


        )
    }
}