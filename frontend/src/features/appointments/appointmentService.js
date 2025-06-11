import axios from 'axios';

const API_URL = 'http://localhost:5000/api/appointment';

const getAppointmetByUser = async () => {

    const user = JSON.parse(localStorage.getItem('user'));

    if(!user){
        throw new Error("NO_AUTH");
    }

    const url = `${API_URL}/user/${user.dni}`;

    const response = await axios.get(url);

    return response.data;

}

const appointmentService = {
    getAppointmetByUser,
}

export default appointmentService;