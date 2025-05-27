import axios from 'axios';


const API_URL = 'http://localhost:5000/api/gym';

// const createBook = async (bookData, token) => {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     }

//     const response = await axios.post(API_URL, bookData, config)

//     return response.data
// }

const getGyms = async () => {
    const response = await axios.get(API_URL)
    console.log("getGyms() response:", response.data)
    return response.data
}

const gymService = {
    getGyms,
}

export default gymService