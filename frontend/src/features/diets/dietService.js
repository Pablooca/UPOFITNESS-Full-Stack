import axios from 'axios';

const API_URL = 'http://localhost:5000/api/diets';

const getDiets = async () => {

    const user = JSON.parse(localStorage.getItem('user'));

    if(!user){
        throw new Error("NO_AUTH");
    }
    console.log("getDiets() user:", user);
    console.log("dni:", user.dni);
    const url = `${API_URL}/user/${user.dni}`;
    console.log("getDiets() URL:", url);
    const response = await axios.get(url);
    console.log("getDiets() response:", response.data);
    return response.data;
}

const dietService = {
    getDiets,
}

export default dietService;