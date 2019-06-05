/**
 * getDataUrlFromFile
 * @param {File} file
 * @returns {Promise<string>}
 */
export function getDataUrlFromFile(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
}

/**
 * getFilefromDataUrl
 *
 * @param {string} dataurl
 * @param {string} filename
 * @param {number} [lastModified=Date.now()]
 * @returns {Promise<File|Blob>}
 */
export function getFilefromDataUrl(dataurl: string, filename: string, lastModified: number = Date.now()): Promise<File> {
    return new Promise((resolve) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const file = new File([u8arr], filename, { type: mime, lastModified: lastModified });
        resolve(file);

        // Safari has issue with File constructor not being able to POST in FormData
        // https://github.com/Donaldcwl/browser-image-compression/issues/8
        // https://bugs.webkit.org/show_bug.cgi?id=165081
        // let file
        // try {
        //   file = new File([u8arr], filename, { type: mime }) // Edge do not support File constructor
        // } catch (e) {
        //   file = new Blob([u8arr], { type: mime })
        //   file.name = filename
        //   file.lastModified = lastModified
        // }
        // resolve(file)
    });
}
/**
 * loadImage
 *
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
    });
}
/**
 * drawImageInCanvas
 *
 * @param {HTMLImageElement} img
 * @returns {HTMLCanvasElement}
 */
export function drawImageInCanvas(img: ImageBitmap | HTMLImageElement): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    // if (typeof OffscreenCanvas === 'function') {
    //   canvas = new OffscreenCanvas(img.width, img.height);
    // }
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
}

/**
 * drawFileInCanvas
 *
 * @param {File} file
 * @returns {Promise<[ImageBitmap | HTMLImageElement, HTMLCanvasElement]>}
 */
export async function drawFileInCanvas(file: File): Promise<[ImageBitmap | HTMLImageElement, HTMLCanvasElement]> {
    let img: HTMLImageElement | ImageBitmap;
    try {
        img = await createImageBitmap(file);
    } catch (e) {
        const dataUrl = await getDataUrlFromFile(file);
        img = await loadImage(dataUrl);
    }
    const canvas = drawImageInCanvas(img);
    return [img, canvas];
}

/**
 * canvasToFile
 *
 * @param canvas
 * @param {string} fileType
 * @param {string} fileName
 * @param {number} fileLastModified
 * @param {number} [quality]
 * @returns {Promise<File|Blob>}
 */
export async function canvasToFile(canvas: any, fileType: string, fileName: string, fileLastModified: number, quality: number = 1): Promise<File> {

    const dataUrl = canvas.toDataURL(fileType, quality);
    const compressedFile = await getFilefromDataUrl(dataUrl, fileName, fileLastModified);
    // let compressedFile
    // if (typeof OffscreenCanvas === 'function' && canvas instanceof OffscreenCanvas) {
    //     compressedFile = await canvas.convertToBlob({ type: fileType, quality })
    //     compressedFile.name = fileName
    //     compressedFile.lastModified = fileLastModified
    // }
    return compressedFile;
}

/**
 * getExifOrientation
 * get image exif orientation info
 * source: https://stackoverflow.com/a/32490603/10395024
 *
 * @param {File} file
 * @returns {Promise<number>} - orientation id, see https://i.stack.imgur.com/VGsAj.gif
 */
export function getExifOrientation(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const view = new DataView(reader.result as ArrayBuffer);
            if (view.getUint16(0, false) !== 0xFFD8) {
                return resolve(-2);
            }
            const length = view.byteLength;
            let offset = 2;
            while (offset < length) {
                if (view.getUint16(offset + 2, false) <= 8) { return resolve(-1); }
                const marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xFFE1) {
                    if (view.getUint32(offset += 2, false) !== 0x45786966) {
                        return resolve(-1);
                    }

                    const little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    const tags = view.getUint16(offset, little);
                    offset += 2;
                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                            return resolve(view.getUint16(offset + (i * 12) + 8, little));
                        }
                    }
                    // tslint:disable-next-line: no-bitwise
                } else if ((marker & 0xFF00) !== 0xFF00) {
                    break;
                } else {
                    offset += view.getUint16(offset, false);
                }
            }
            return resolve(-1);
        };
        reader.onerror = (e) => reject(e);
        reader.readAsArrayBuffer(file);
    });
}

/**
 *
 * @param img
 * @param canvas
 * @param options
 * @returns {Promise<[HTMLCanvasElement, boolean]>}
 */
export function handleMaxWidthOrHeight(img: any, canvas: HTMLCanvasElement, options: any): Promise<[HTMLCanvasElement, boolean]> {
    return new Promise(resolve => {
        const ctx = canvas.getContext('2d');
        const maxWidthOrHeight = options.maxWidthOrHeight;
        const needToHandle = Number.isInteger(maxWidthOrHeight) && (img.width > maxWidthOrHeight || img.height > maxWidthOrHeight);
        if (needToHandle) {
            if (img.width > img.height) {
                canvas.width = maxWidthOrHeight;
                canvas.height = (img.height / img.width) * maxWidthOrHeight;
            } else {
                canvas.width = (img.width / img.height) * maxWidthOrHeight;
                canvas.height = maxWidthOrHeight;
            }
        } else {
            canvas.width = img.width;
            canvas.height = img.height;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve([canvas, needToHandle]);
    });
}

/**
 * followExifOrientation
 * source: https://stackoverflow.com/a/40867559/10395024
 *
 * @param {HTMLImageElement} img
 * @param {HTMLCanvasElement} canvas
 * @param {number} exifOrientation
 * @returns {HTMLCanvasElement} canvas
 */
export function followExifOrientation(img: HTMLImageElement, canvas: HTMLCanvasElement, exifOrientation: number): HTMLCanvasElement {
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    // set proper canvas dimensions before transform & export
    if (4 < exifOrientation && exifOrientation < 9) {
        canvas.width = height;
        canvas.height = width;
    } else {
        canvas.width = width;
        canvas.height = height;
    }

    // transform context before drawing image
    switch (exifOrientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
        case 7: ctx.transform(0, -1, -1, 0, height, width); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
        default: break;
    }

    ctx.drawImage(img, 0, 0, width, height);
    return canvas;
}
