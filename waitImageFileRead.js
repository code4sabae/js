const waitImageFileRead = async (f) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = (e) => {
			reject(e);
		};
		reader.onload = (e) => {
			const img = new Image();
			img.src = e.target.result;
			img.onload = () => {
				resolve(img);
			};
		};
		reader.readAsDataURL(f);
	});
};

export { waitImageFileRead };
