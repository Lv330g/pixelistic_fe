import httpServise from './http-service';
import { host , port } from '../const/node-server-config';
 export const profileAPI = {
    getProfile: (nickname) => {
        return new Promise ((resolve, reject) => {
            httpServise.get(`${host}:${port}/profile/get-profile/${nickname}`).then(
                res => {
                    if (res.data.payload) {
                        resolve(res.data.payload);
                    } else reject({status: 401});
                }, err => reject(err)
            )
        })
    },

    updateProfile: (nickname, userName, newNickname, website, userBio) => {
        let updatedProfile = { userName, nickname, website, userBio };
        return new Promise ((resolve, reject) => {
            httpServise.post(`${host}:${port}/profile/${nickname}`, updatedProfile).then(
                res => {
                        resolve(res);
                }, err => reject(err)
            )
        })
    }
 }
