git import {Container} from "react-bootstrap";
import {ArtistList} from "../components/artist/ArtistList.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

// const source = [
//     {id: 1, name: "AC/DC"},
//     {id: 2, name: "Olivia Rodrigo"},
//     {id: 3, name: "Taylor Swift"}
// ];


export const ArtistPage = () => {
    const [artists, setArtists] = useState([]);

    // useEffect(() => {
    //     const fetchArtists = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8080/api/v1/artists");
    //             setArtists(response.data);
    //             console.log(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //
    //     fetchArtists();
    //
    // }, []);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/artists")
        .then(res => res.json()) // res là http response(header,...)
        .then(data => setArtists(data));
    })



    return (
        <Container>
            <h1>Artist Page</h1>
            <ArtistList source={artists} />
        </Container>
    )
}