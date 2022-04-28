import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Movie from '../components/Movie';

function Search() {
  const { search } = useParams();
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState(false)
  const [resultArray, setresultArray] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      setLoading(true)
      for (let i = 1; i <= 60; i++) {
        axios.get(`https://yts.mx/api/v2/list_movies.json?page=${i}&sort_by=like_count&limit=50`)
        .then(response => searchMovie(response.data.data.movies))
      }
    }

    if(search.length<3){
      setWord(true)
    }else{
      getMovies()
      setTimeout(()=>{
        setLoading(false)
      }, 3000)
    }

    return () => {
      setresultArray([])
      setWord(false)
    }
    //해당 useEffect가 끝나면 resultArray를 []로 만든다
  }, [search])

  function searchMovie(MovieArray) {
    function filterItems(query) {
      return MovieArray.map((movie) => movie.title.toLowerCase()).filter(function (el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
      })
    }

    if (filterItems(search).length === 0) {
    } else {
      let currentArray = []
      for (let i = 0; i < filterItems(search).length; i++) {
        setLoading(false)
        function findMovie(movie) {
          return movie.title.toLowerCase() === filterItems(search)[i].toLowerCase();
        }
        currentArray.push(MovieArray.find(findMovie))
      }
      setresultArray(carry => [...carry, ...currentArray])
      
      //findMovie를 통해 추출한 currentArray를 현 시점의 resultArray에 추가하는 코드 ...를 통해 flat함.
      //filterItems에 값이 있을때만 resultArray값이 변하도록 하는 코드 - state값이 매번 바뀌지 않기 때문에 로딩횟수를 줄여줌
    }
  }

  return (
    <div>
      {loading ? <h1>Loading....</h1> : 
        word ? <h2>Please submit more words</h2> :
        resultArray.length === 0 ? <h1>It's empty</h1>
        :
        <div>
          {resultArray.map((movie) => (
            <Movie key={movie.id} setData={movie} />
          ))}
        </div>
      }
    </div>
  )
}

export default Search;