import {useState} from 'react'

import './App.css'
import {HashRouter, Route, Routes} from "react-router-dom";
import Header from "./layout/Header.jsx";
import Home from "./page/Home.jsx";
import ParkingList from "./page/ParkingList.jsx";
import CheckIn from "./page/CheckIn.jsx";

function App() {

    return (
        <>
            <Header/>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/parkings" element={<ParkingList />} />
                    <Route path="/checkin" element={<CheckIn />} />
                    {/*<Route path="*" element={<NotFound />} />*/}
                </Routes>
            </HashRouter></>
    )
}

export default App
