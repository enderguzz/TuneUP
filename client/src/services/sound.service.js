import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL + "/sound/";

const getAll = () => {
    return axios.get(url);
};

const getUserSounds = (id) => {
    return axios.get(url + "user/" + id);
};

const create = (data) => {
    return axios.post(url, data);
};

const changePublic = (id, isPublic) => {
    return axios.put(url +"public/" +id, {isPublic: isPublic});
};

const deleteSound = (id) => {
    return axios.delete(url + id);
};


const service = {getAll, getUserSounds, create, changePublic, deleteSound}
export default service