const waitImageLoad = async (img) => {
	return new Promise((resolve) => {
		img.onload = () => {
			resolve(img);
		};
	});
};
export { waitImageLoad };
