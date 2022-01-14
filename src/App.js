import {
  BrowserRouter as Router,
  Routes,
  Route,
}from "react-router-dom"

import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Nav from "./components/Nav";
import Search from "./routes/Search";
import Menu from "./routes/Menu";
import { RecoilRoot } from 'recoil';

function App() {
 return<RecoilRoot><Router>
   <Nav />
   <Routes>
     <Route path="/" element={<Home />}></Route>
     <Route path="/movie/:id" element={<Detail />}></Route>
     <Route path={`/search/:search`} element={<Search />} />
     <Route path={`/movie/menu/:men`} element={<Menu />} />
   </Routes>
 </Router></RecoilRoot>
}

export default App;
