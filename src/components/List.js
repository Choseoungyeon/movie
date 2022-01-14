import { Link }from "react-router-dom"
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRecoilValue } from 'recoil';
import 'swiper/css';
import Movie from "../components/Movie";
import MenuList from "../atom/MenuList";


  
  function List({movieList}){
    const menu = useRecoilValue(MenuList);
    const [loading, setLoading] =useState(true);
    const [movies, setMovies] = useState([]);
    
    
    useEffect(() => {
      const getMovies = async() => {
        const response = await fetch(
          `https://yts.mx/api/v2/list_movies.json?${menu[movieList]}&sort_by=like_count&limit=8`
        );
        const json = await response.json();
        setMovies(json.data.movies);
        setLoading(false)
      }
      
      getMovies()

    }, [movieList, menu]);

      return (
        <div>
          <h2>
            <Link to={`/movie/menu/${movieList}`}>{movieList}</Link>
          </h2>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
          >
            {loading ? <h2>Loading</h2> : movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Movie key={movie.id} setData={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )
  }
  
  export default List;