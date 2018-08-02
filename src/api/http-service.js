import axios from 'axios';

const httpServise = {
    get: (url, params) => {
        return new Promise((resolve, reject) => {
            axios(url, {
                method: 'GET',
                headers: getHeaders(),
                params: params
            }).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    },
    post: (url, params) => {
        return new Promise((resolve, reject) => {
            axios(url, {
                method: 'POST',
                headers: getHeaders(),
                data: params
            }).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    },
    put: (url, params) => {
        return new Promise((resolve, reject) => {
            axios(url, {
                method: 'PUT',
                headers: getHeaders(),
                data: params
            }).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    },
    delete: (url, params) => {
        return new Promise((resolve, reject) => {
            axios(url, {
                method: 'DELETE',
                headers: getHeaders(),
                data: params
            }).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }
};

function getHeaders() {
    let headers = {'Client-Device': 'web', 'Content-Type': 'application/json'};

    let userToken = window.localStorage.getItem('authHeaders');
    if (userToken) headers['Authorization'] = JSON.parse(userToken) ? `Bearer ${JSON.parse(userToken)['accessToken']}` : '';
    return headers;
}
export default httpServise;
