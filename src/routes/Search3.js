import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Movie from '../components/Movie';

function Search() {
  const { search } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultArray, setresultArray] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      var currentMovies = []
      for (let i = 1; i <= 5; i++) {
        fetch(`https://yts.mx/api/v2/list_movies.json?page=${i}&sort_by=like_count&limit=50`)
          .then((res) => res.json())
          .then((json) => currentMovies.push(...json.data.movies))
      }
      setMovies(currentMovies)
    }

    if(search.length<3){
    }else{
      getMovies()
      console.log(movies)
    }

    return () => {
      setresultArray([])
    }
    //해당 useEffect가 끝나면 resultArray를 []로 만든다
  }, [search])

  useEffect(() => {
    function filterItems(query) {
      return movies.map((movie) => movie.title.toLowerCase()).filter(function (el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
      })
    }

    function searchMovie() {
      for (let i = 0; i < filterItems(search).length; i++) {
        function findMovie(movie) {
          return movie.title.toLowerCase() === filterItems(search)[i].toLowerCase();
        }
        setresultArray(carry => [...carry, movies.find(findMovie)])
      }
    }

    if(search.length<3){
    }else{
      setLoading(false);
      searchMovie()
    }
  }, [movies, search])

  return (
    <div>
      {loading ? <h1>Loading....</h1> : (
        <div>
          {resultArray.map((movie) => (
            <Movie key={movie.id} setData={movie} />
          ))}
        </div>)}
    </div>
  )
}

export default Search;