import axiosClient from "../axios/axiosClient.js";

export async function getGenres(page = 1, size = 10) {
    const response = await axiosClient.get(`/genres`,
        {params: {page, size}});
    return response;
}