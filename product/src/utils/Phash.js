
import blockhash from 'blockhash-core';


export async function getImagePHash(imgSrc){
return new Promise((resolve, reject) => {
const img = new Image();
img.crossOrigin = 'Anonymous';
img.onload = () => {
try{
const canvas = document.createElement('canvas');
const size = 256;
canvas.width = size; canvas.height = size;
const ctx = canvas.getContext('2d');
ctx.drawImage(img, 0, 0, size, size);
const data = ctx.getImageData(0,0,size,size).data;
// blockhash-core expects an ImageData-like object with width/height and getPixel
const pixels = [];
for(let i=0;i<data.length;i+=4) pixels.push([data[i], data[i+1], data[i+2], data[i+3]]);
const hex = blockhash.bmvbhashData({width:size, height:size, data}, 16);
resolve(hex);
}catch(e){ reject(e); }
};
img.onerror = (e) => reject(e);
img.src = imgSrc;
});
}