import axios from 'axios';
import {API_BASE_URL} from '../constants';

export async function uploadToS3({fileType, fileContents}) {
    const presignedPostUrl = await getPresignedPostUrl(fileType);

    const formData = new FormData();
    formData.append('Content-Type', fileType);
    console.log('ppu', presignedPostUrl)
    Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
        formData.append(k, v);
    });
    formData.append('file', fileContents); // The file has be the last element

    const response = await axios.post(presignedPostUrl.url, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
    });

    console.log(response);

    return presignedPostUrl.filePath;
}

async function getPresignedPostUrl(fileType) {
    const {data: presignedPostUrl} = await axios.get(
        `${API_BASE_URL}/presigned-url?fileType=${fileType}`,
    );

    return presignedPostUrl;
}
