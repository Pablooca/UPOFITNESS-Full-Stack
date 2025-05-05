import axios from 'axios';


const API_URL = '/api/gyms/';

const getGyms = async (token) => {
    const response = await axios.get(API_URL)
    return response.data
}

const gymService = {
    getGyms,
}

export default goalService