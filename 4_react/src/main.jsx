import React, {StrictMode, useState} from 'react'
import {createRoot} from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css'
import {Button, Container, Table} from "react-bootstrap";
import Header from "./components/NavBar.jsx";
import {ArtistList} from "./components/artist/ArtistList.jsx";
import * as PropTypes from "prop-types";
import {HashRouter} from "react-router-dom";
import App from "./App.jsx";

const greet = React.createElement('h1', null, 'Hello, React!');

const source = [
    {id: 1, name: "AC/DC"},
    {id: 2, name: "Olivia Rodrigo"},
    {id: 3, name: "Taylor Swift"}
];



createRoot(document.getElementById('root')).render(

    <StrictMode>

    <HashRouter>
        <App />
    </HashRouter>

    {/*<Header/>*/}

    {/*<Container>*/}

    {/*    <h1>Artist List</h1>*/}

    {/*    /!* Dấu '{' đề evaluate expression bên trong*/}
    {/*        variant, size aka props của Button component, onClick là event handler, alert là function để hiển thị thông báo khi button được click*/}
    {/*    *!/*/}
    {/*    <Button variant={"success"} size={"lg"} className={"my-2"} onClick={() => alert("Add artist")}>Add</Button>*/}

    {/*    <ArtistList source={source}/>*/}



    {/*</Container>*/}

</StrictMode>)
