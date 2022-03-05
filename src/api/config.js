let serviceUrl = process.env.REACT_APP_SERVICE_URL;
const BASE_URL = `${serviceUrl}`;
const API = "api";
export const API_URL = {
    auth: {
        adminLogin: `${BASE_URL}/${API}/auth/login`
    },
    billing:{
        createBill: `${BASE_URL}/${API}/bill/create`,
        updateBill: `${BASE_URL}/${API}/bill/editBill`,
        getUserBill: `${BASE_URL}/${API}/bill/getDetails`,
        getAllUserBill: `${BASE_URL}/${API}/bill/getAllBillDetails`,
    }
};