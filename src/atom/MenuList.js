import { atom } from "recoil";

const MenuList = atom({
    key: 'MenuState', // unique ID (with respect to other atoms/selectors)
    default: {"High Rating": "minimum_rating=8", "Animation": "genre=animation&minimum_rating=7", "Drama": "genre=drama&minimum_rating=7", "Fantasy": "genre=fantasy&minimum_rating=7"}, // default value (aka initial value)
  });


export default MenuList;