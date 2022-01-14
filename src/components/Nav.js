import { Link } from "react-router-dom"
import { useState } from "react";
import { useRecoilValue } from 'recoil';
import MenuList from "../atom/MenuList"

function Nav() {
    const [search, setSearch] = useState("");
    const menu = useRecoilValue(MenuList);
    
    const onChange = (event)=>{
      setSearch(event.target.value)
    }

    return (
        <div>
            <h2>
                <Link to={"/"} >Home</Link>
            </h2>
            <ul>
                {Object.keys(menu).map((men) => (
                    <li key={men}>
                        <Link to={`/movie/menu/${men}`}>{men}</Link>
                    </li>
                ))}
            </ul>
            <form>
                <input type="text" value={search} onChange={onChange} placeholder="Search movies" onMouseOut={() => { setSearch("") }}/>
                <Link to={`/search/${search}`}>
                    <button>search</button>
                </Link>
            </form>
        </div>
    )
}

export default Nav;