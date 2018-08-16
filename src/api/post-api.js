import httpServise from './http-service';
import { host , port } from '../const/node-server-config';

export const postApi = {
    addPost: (image, description, geolocation, author) => {
      const post = {image, description, geolocation, author}
      return new Promise((resolve, reject) => {
          httpServise.post(`${host}:${port}/add-post`, { post }).then(
              res => {
                  if (res.data.post) {
                    resolve(res.data.post);
                  } else reject({status: 401});
              }, err => reject(err)
          );
      });
    },
}
