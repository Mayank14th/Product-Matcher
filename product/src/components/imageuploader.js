import React, {useRef} from 'react';


export default function ImageUploader({onUpload, loading}){
const fileRef = useRef();


function handleFile(e){
const f = e.target.files[0];
if(f) onUpload(f);
}


async function handleUrlSubmit(e){
e.preventDefault();
const url = e.target.elements.url.value.trim();
if(!url) return alert('Enter an image URL');
onUpload(url);
}


return (
<div style={{display:'flex', gap:12, alignItems:'center'}}>
<div>
<input ref={fileRef} type="file" accept="image/*" onChange={handleFile} disabled={loading} />
</div>
<form onSubmit={handleUrlSubmit} style={{display:'flex', gap:8}}>
<input name="url" placeholder="Paste image URL" style={{width:300}} />
<button type="submit" disabled={loading}>Search</button>
</form>
</div>
);
}