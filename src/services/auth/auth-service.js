import axios from "axios";

//const API_URL = "https://hodlersports-api.herokuapp.com/api/v1/";
const API_URL = "http://localhost:8000/api/v1/";

export const login = async (email, password) => {
    return await axios.post(API_URL + "login", {
        email: email,
        password: password
    })
    .then(res => {
        if(res.data.data) {
            localStorage.setItem("user", JSON.stringify(res.data.data));
        }
        console.log("login info", res.data);
        return res.data;
    })
}

export const register = async (account, firstName, lastName, email, phoneNumber, photo) => {

    return await axios.post(API_URL + "register", {
        wallet: account,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        password: "123456789",
        photo: photo
    }, {
        headers: {"Content-Type": "multipart/form-data"}
    })
    .then(res => {
        if(res.data.data) {
            localStorage.setItem("user", JSON.stringify(res.data.data));
        }
        console.log("register info", res.data.data);
        return res.data;
    })
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const checkWallet = async (address) => {
    return await axios.post(API_URL + "login", {
        address: address
    })
    .then(res => {
        if(res.data.success) {
            return res.data;
        }
    })
    .catch(err => {
        console.log(err.response.data);
        return err.response.data.success;
    })
}