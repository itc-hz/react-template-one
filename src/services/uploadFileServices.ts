import axios from 'axios';

axios.defaults.withCredentials = true;

class UploadFileServices {
    uploadImage(params: {
        data: FormData;
    }, success: (data: any) => void, error: (err: Error) => void): void {
        axios.post(`/meetingcloud/apps/theming/ajax/uploadImage`, params.data).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    deviceGroupUploadImg(params: {
        data: FormData;
    }, success: (data: any) => void, error: (err: Error) => void): void {
        axios.post(`/meetingcloud/apps/accesscontrol/api/v1/deviceGroupUploadImg`, params.data).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    smallApkUpload(params: {
        data: FormData;
    }, success: (data: any) => void, error: (err: Error) => void): void {
        axios.post(`/meetingcloud/apps/accesscontrol/api/v1/smallApkUpload`, params.data).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    importUsers(params: {
        data: FormData;
    }, success: (data: any) => void, error: (err: Error) => void): void {
        axios.post(`/meetingcloud/apps/department/api/v1/user/importUsers`, params.data).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    meetingImportUsers(params: {
        data: FormData;
    }, success: (data: any) => void, error: (err: Error) => void): void {
        axios.post(`/meetingcloud/apps/meeting/api/v1/meetingImportUsers`, params.data).then((res) => {
            success(res.data);
        }).catch((err) => {
            error(err);
        });
    }

    uploadFile(params: {
        fileName: string;
        data: File;
        type: string;
    }, success: (data: any) => void, error: (err: Error) => void, onProgress: (obj: { percent: number }) => void): void {
        const fileName = new Date().getTime().toString() + params.fileName;
        axios.put(`/meetingcloud/remote.php/webdav/${fileName}`, params.data, {
            headers: {
                'Content-Type': params.type,
                'Content-Disposition': `attachment; filename="${window.encodeURIComponent(fileName)}"`
            },
            onUploadProgress: ({total, loaded}) => {
                onProgress({percent: parseInt(Math.round(loaded / total * 100).toFixed(2))});
            },
        }).then((res) => {
            success(`${fileName}`);
        }).catch((err) => {
            error(err);
        });
    }
}

export default UploadFileServices;
