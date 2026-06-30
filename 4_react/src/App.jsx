import './App.css'
import Header from "./components/Header.jsx";
import {Routes, Route} from "react-router-dom";
import {HomePage} from "./page/HomePage.jsx";
import {ArtistList} from "./components/artist/ArtistList.jsx";
import {ArtistForm} from "./components/artist/ArtistForm.jsx";
import {ArtistPage} from "./page/ArtistPage.jsx";
import ArtistDeleteForm from "./components/artist/ArtistDeleteForm.jsx";
import {ThemeProvider} from "./context/ThemeContext.jsx";
import {AuthCallbackHandler} from "./auth/AuthContext.jsx";
import {RequireAuth} from "./auth/RequireAuth.jsx";


function App() {

    return (
        <> {/*fragment*/}
            <AuthCallbackHandler>
                <ThemeProvider>
                    <Header/>
                </ThemeProvider>
                <main>
                    <Routes>
                        <Route path={'/'} element={<HomePage/>}/>
                        {/*<Route path={'/danh-sach-nghe-si'} element={<ArtistList source={source}/>}/>*/}
                        <Route path={'/danh-sach-nghe-si'} element={<RequireAuth> <ArtistPage/> </RequireAuth>}/>
                        <Route path={'/them-moi-nghe-si'} element={<ArtistForm/>}/>
                        <Route path={'/chinh-sua-nghe-si/:id'} element={<ArtistForm/>}/>
                        <Route path={'/xoa-nghe-si/:id'} element={<ArtistDeleteForm/>}/>
                    </Routes>
                </main>
            </AuthCallbackHandler>
        </>
    )
}

export default App
