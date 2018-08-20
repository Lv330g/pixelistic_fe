import { host, port } from '../../const/node-server-config';

export const updateAvatarUrlPath = (avatarPath) => {
    if (!avatarPath || avatarPath.startsWith('http')) {
        return avatarPath
    } else {
        return `${host}:${port}/${avatarPath}`
    }
}