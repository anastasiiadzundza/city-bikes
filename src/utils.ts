import axios from 'axios';

 export default function utils() {
    const instance = axios.create({
        baseURL: 'http://api.citybik.es/v2',
        timeout: 3000,
    });
    
    const get = (url) => instance.get(url);

    return {
        get,
    }
}


