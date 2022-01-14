import { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { throttle } from "lodash";
import Movie from '../components/Movie';
import MenuList from '../atom/MenuList';

function Menu() {
  const { men } = useParams();
  const menu = useRecoilValue(MenuList);
  const [loading, setLoading] =useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const getMovies = async() => {
      const response = await fetch(
        `https://yts.mx/api/v2/list_movies.json?${menu[men]}&page=1&sort_by=like_count&limit=5`
      );
      const json = await response.json();
      setMovies(json.data.movies);
      setLoading(true)
    }
    getMovies()
  }, [men,menu])

  const secondMovie = ()=>{
    const getMovies = async() => {
      const response = await fetch(
        `https://yts.mx/api/v2/list_movies.json?${menu[men]}&page=${page}&sort_by=like_count&limit=5`
      );
      const json = await response.json();
      setPage(carry => carry + 1);
      setMovies(carry => [...carry, ...json.data.movies]);
      setLoading(true)
    }
    getMovies()
  }

  const handleScroll = throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (scrollTop + innerHeight === scrollHeight) {
      secondMovie()
    }
    console.log("run")
  },500);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    // 스크롤이 발생할때마다 handleScroll 함수를 호출하도록 추가합니다.
    
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      // 해당 컴포넌트가 언마운트 될때, 스크롤 이벤트를 제거합니다.
    };
  }, [handleScroll]);

  return (
    <div>
      {
        <div>
          {movies.map((movie) => (
            <Movie key={movie.id} setData={movie} />
          ))}
          {loading ? <h2>Loading...</h2> : null}
        </div>
      }
    </div>
  )
}

export default Menu;