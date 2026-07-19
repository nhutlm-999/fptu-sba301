import axiosClient from '../../app/axios/axiosClient';

const artistService = {
    getAllArtists: async () => {
        const response = await axiosClient.get("/artists");
        return response.data;
    }
};
export default artistService;