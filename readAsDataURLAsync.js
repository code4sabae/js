const readAsDataURLAsync = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const bin = e.target.result;
            resolve(bin);
        };
        reader.onerror = reader.onabort = (e) => {
            reject(e);
        };
        reader.readAsDataURL(file);
    });
};
export { readAsDataURLAsync };
