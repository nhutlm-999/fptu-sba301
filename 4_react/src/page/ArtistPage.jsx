import {Button, Container, Dropdown, Pagination} from "react-bootstrap";
import {ArtistList} from "../components/artist/ArtistList.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axiosClient from "../axios/axiosClient.js";

export const ArtistPage = () => {
    const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

    const [artists, setArtists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {


        const fetchArtists = async () => {
            try {
                // Gửi kèm tham số page và size lên API Back-end
                const res = await axiosClient.get(`v1/artists?page=${currentPage}&size=${size}`);

                // Vì Back-end trả về Page nên data thật nằm trong mảng `content`
                setArtists(res.data.content || []);
                setTotalPages(res.data.totalPages || 0);
            } catch (error) {
                console.error("Lỗi tải danh sách Artist: ", error);
            } finally {
                // setIsLoading(false);
            }
        }
        //
        // fetch(`${BASE_API_URL}/v1/artists?page=${currentPage}&size=${size}`)
        //     .then(res => res.json()) // res là http response(header,...)
        //     .then(data => {
        //         setArtists(data.content);
        //         setTotalPages(data.totalPages);
        //     });
        fetchArtists();
    }, [BASE_API_URL, currentPage, size]);

    const renderPaginationItems = () => {
        let items = [];
        for (let number = 0; number < totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => setCurrentPage(number)}
                >
                    {number + 1} {/* Hiển thị user-friendly (1, 2, 3...) thay vì (0, 1, 2...) */}
                </Pagination.Item>
            );
        }
        return items;
    };

    const renderSizeOptions = () => {
        const options = [5, 10, 20, 50];
        return options.map(option => (
            <Dropdown.Item key={option} onClick={() => setSize(option)}>
                {option} per page
            </Dropdown.Item>
        ));
    }


    return (
        <Container>
            <h1>Artist Page</h1>
            <div className={"d-flex align-items-center"}><Button type={"button"} variant={"success"} className={"m-3"}
                                                                 as={Link} to={"/them-moi-nghe-si"}>
                Add new artist
            </Button>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Result perpages
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {renderSizeOptions()}
                    </Dropdown.Menu>
                </Dropdown></div>

            <ArtistList source={artists}/>

            {/* Thanh điều hướng phân trang */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.First onClick={() => setCurrentPage(0)} disabled={currentPage === 0}/>
                        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                                         disabled={currentPage === 0}/>

                        {renderPaginationItems()}

                        <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                                         disabled={currentPage === totalPages - 1}/>
                        <Pagination.Last onClick={() => setCurrentPage(totalPages - 1)}
                                         disabled={currentPage === totalPages - 1}/>
                    </Pagination>
                </div>
            )}


        </Container>
    )
}