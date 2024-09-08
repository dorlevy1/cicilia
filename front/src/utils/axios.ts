import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://us-central1-cicilia-e6f75.cloudfunctions.net/', // Change this to your Node.js backend URL
});


    export default axiosInstance;