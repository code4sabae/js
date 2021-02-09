const waitDropFiles = async (div) => {
    return new Promise(resolve => {
        div.ondrop = div.ondragover = async (e) => {
            e.preventDefault();
            if (e.type !== "drop") {
                return;
            }
            const files = [];
            const ditems = e.dataTransfer.items;
            for (let i = 0; i < ditems.length; i++) {
                const item = ditems[i];
                if (item.kind !== "file") {
                    continue;
                }
                const file = item.getAsFile();
                files.push({ type: item.type, file });
            }
            div.ondrop = div.ondragover = null;
            resolve(files);
        };
    });
};
export { waitDropFiles };
