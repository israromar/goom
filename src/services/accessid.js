import axios from 'axios';
/**
 * AccessID
 * @type {AxiosInstance}
 */

const accessid = axios.create({
    baseURL: 'http://3.16.158.226:81/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default accessid;