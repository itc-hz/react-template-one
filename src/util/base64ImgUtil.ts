class Base64ImgUtil {
    getBlob(base64: string): Blob {
        return this.b64toBlob(this.getData(base64), this.getContentType(base64));
    }

    getContentType(base64: string): string | undefined {
        const _matchContent = /data:([^;]*);/i.exec(base64);
        if (_matchContent) {
            return _matchContent[1];
        }
        return undefined;
    }

    getData(base64: string): string {
        return base64.substr(base64.indexOf("base64,") + 7, base64.length);
    }

    b64toBlob(b64Data: string, contentType: string | undefined, sliceSize?: number | undefined): Blob {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: contentType});
    }
}

export default Base64ImgUtil;
