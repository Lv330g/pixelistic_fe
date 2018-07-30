import httpServise from './http-service';
import { host , port } from '../const/node-server-config';

export const authApi = {
    signIn: (email, password) => {
        return new Promise((resolve, reject) => {
            httpServise.post(`${host}:${port}/login`, {email: email, password: password}).then(
                res => {
                    if (res.data.user) {
                        window.localStorage.setItem('authToken', res.data.user._id);
                        resolve(res.data.user);
                    } else reject({status: 401});
                }, err => reject(err)
            );
        });
    },

    signOut: () => {
        return new Promise ((resolve, reject) => {
            httpServise.get(`${host}:${port}/logout`, null).then(
                res => {
                    window.localStorage.removeItem('authToken');
                    resolve(res);
                },
                err => reject(err)
            )
        })
    },

    signUp: (nickname, email, password, passwordConf) => {
        let newUser = {
nickname, email, password, passwordConf
};
        return new Promise ((resolve, reject) => {
            httpServise.post(`${host}:${port}/register`, newUser).then(
                res => {
                    if (res.data.text) {
                        resolve(res.data.text);
                    } else reject({status: 401});
                }, err => reject(err)
            )
        })
    },
    verifyEmail: (hash) => {
        return new Promise ((resolve, reject) => {
            httpServise.get(`${host}:${port}/verify/${hash}`).then(
                res => {
                    if (res.data.user) {
                        window.localStorage.setItem('authToken', res.data.user._id);
                        resolve(res.data.user);
                    } else reject({status: 401});
                }, err => reject(err)
            )
        })
    }

}
