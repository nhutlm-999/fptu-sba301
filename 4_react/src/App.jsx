import './App.css'
import Header from "./components/NavBar.jsx";
import {Routes} from "react-router-dom";
import {HomePage} from "./page/HomePage.jsx";
import {ArtistList} from "./components/artist/ArtistList.jsx";
import {ArtistForm} from "./components/artist/ArtistForm.jsx";
function App() {

  return (
    <Header>
      <Routes>
        <Routes path={'/'} element={<HomePage/>}/>
        <Routes path={'/artists'} element={<ArtistList/>}/>
        <Routes path={'/artists/new'} element={<ArtistForm/>}/>
      </Routes>
    </Header>
  )
}

export default App
