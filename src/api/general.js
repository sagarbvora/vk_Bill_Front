import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultHeaders = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0"
};

export const defaultAxios = axios.create({
});

export function apiClient({
                              url,
                              data = {},
                              method = "POST",
                              headers = {},
                              noHeaders,
                              ...rest
                          }) {
    toast.configure();
    return new Promise((resolve, reject) => {
        defaultAxios({
            method,
            url,
            headers: {
                ...(noHeaders ? {} : defaultHeaders),
                ...headers,
            },
            data,
            ...rest,
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.error) {
                    reject(err.response.data.error);
                    console.log(err.response.data.error.code);
                    if (err.response.data.error.code === "ER_UNAUTHORIZED_CLIENT") {
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                        localStorage.removeItem('email');
                        toast.error('Please Reload the Page and Login Again');
                    } else {
                        toast.error(err.response.data.error.message);
                    }
                } else {
                    reject(err);
                }
            });
    });
}