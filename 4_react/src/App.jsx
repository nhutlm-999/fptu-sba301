import './App.css'
import Header from "./components/NavBar.jsx";
import {Routes, Route} from "react-router-dom";
import {HomePage} from "./page/HomePage.jsx";
import {ArtistList} from "./components/artist/ArtistList.jsx";
import {ArtistForm} from "./components/artist/ArtistForm.jsx";
import {ArtistPage} from "./page/ArtistPage.jsx";


function App() {

    return (
        <> {/*fragment*/}
            <Header/>
            <main>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    {/*<Route path={'/danh-sach-nghe-si'} element={<ArtistList source={source}/>}/>*/}
                    <Route path={'/danh-sach-nghe-si'} element={<ArtistPage/>}/>
                    <Route path={'/them-moi-nghe-si'} element={<ArtistForm/>}/>
                </Routes>
            </main>
        </>
    )
}

export default App
