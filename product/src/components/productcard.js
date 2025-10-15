import React from 'react';


export default function ProductCard({product}){
return (
<div style={{border:'1px solid #ddd', borderRadius:8, padding:8}}>
<img src={product.image} alt={product.name} style={{width:'100%', height:180, objectFit:'cover', borderRadius:6}} />
<h4>{product.name}</h4>
<div>Category: {product.category}</div>
<div>Similarity: {product.score}%</div>
<div style={{fontSize:12, color:'#666'}}>Hamming dist: {product.dist}</div>
</div>
);
}