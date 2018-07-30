import axios from 'axios';

const httpServise = {
    get: (url, params) => {
        return new Promise((resolve, reject) => {
            axios(url, {
                method: 'GET',
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
                data: params
            }).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }
};

export default httpServise;
