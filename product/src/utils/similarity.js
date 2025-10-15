export function hammingDistance(hex1, hex2){
if(!hex1 || !hex2) return 64; // max for 16x16 hash = 256 bits? using small fallback
// convert hex to binary string
const b1 = BigInt('0x'+hex1).toString(2).padStart(hex1.length*4,'0');
const b2 = BigInt('0x'+hex2).toString(2).padStart(hex2.length*4,'0');
let dist=0;
for(let i=0;i<b1.length;i++) if(b1[i] !== b2[i]) dist++;
return dist;
}


export function scoreFromHamming(dist){
// assume max bits = 256 (hex length 64) — normalize accordingly
const maxBits = 64*4; // this may be larger than used; keep safe
const s = Math.max(0, Math.round((1 - dist / maxBits) * 100));
return s;
}