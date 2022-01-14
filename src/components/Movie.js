import {
  Link,
}from "react-router-dom"

function Movie({setData}){
    return (
        <div>
            <img src={setData.medium_cover_image} alt={setData.title}/>
            <h2>
              <Link to={`/movie/${setData.id}`}>{setData.title}</Link>
            </h2>
            <p>{setData.summary.length > 235 ? `${setData.summary.slice(0, 235)}...` : setData.summary}</p>
            <p>rating = {setData.rating}</p>
            <ul>
              {setData.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
        </div>
    )
}

export default Movie;