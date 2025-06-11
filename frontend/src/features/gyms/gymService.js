import axios from 'axios';


const API_URL = 'http://localhost:5000/api/gym';

const getGyms = async () => {
    const response = await axios.get(API_URL)
    console.log("getGyms() response:", response.data)
    return response.data
}

const gymService = {
    getGyms,
}

export default gymService