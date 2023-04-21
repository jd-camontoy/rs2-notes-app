import axios, { AxiosError } from "axios";

interface UserParams {
    first_name: string,
    surname: string,
    password: string
}

interface NoteParams {
    title: string,
    content: string,
    label_list: Array,
    user_id: string
}

const baseURL = 'http://localhost:5055/api';

const urlLoginEndpoint = '/login';
const urlRegisterEndpoint = '/user';
const urlNoteEndpoint = '/note';

const api = axios.create({
    baseURL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    }
});

const sendToPOST = async (url, parameters) => {
    let data = {
        params: JSON.stringify(parameters)
    };
    let result = 
        await api.post(url, data).catch((error) => {
            return error;
        });
    if (!(result instanceof AxiosError)) {
        return {
            ...result.data,
            status_code: result.status
        }
    } else {
        return result;
    }
}

export const loginUser = async (params: UserParams) => {
    let result = await sendToPOST(urlLoginEndpoint, params);
    return result;
}

export const registerUser = async (params: UserParams) => {
    let result = await sendToPOST(urlRegisterEndpoint, params);
    return result;
}

export const addNote = async (params: NoteParams) => {
    let result = await sendToPOST(urlNoteEndpoint, params);
    return result;
};