import List from "../components/List";
import MenuList from "../atom/MenuList";
import { useRecoilValue } from 'recoil';

function Home(){

  const menu = useRecoilValue(MenuList);

    return (
      <div>
        {Object.keys(menu).map((men) => (
            <List key={men} movieList={men} />
          ))}
      </div>
    );
}

export default Home;