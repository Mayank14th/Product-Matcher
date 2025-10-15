import React, { useState } from 'react';
import ImageUploader from '.components/ImageUploader';
import ProductCard from '.components/ProductCard';
import products from './data/products.json';
import { getImagePHash } from '.utils/pHash';
import { hammingDistance, scoreFromHamming } from './utils/similarity';

export default function App() {
  const [queryUrl, setQueryUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [minScore, setMinScore] = useState(0);

  async function handleImage(fileOrUrl) {
    setLoading(true);
    setResults([]);
    try {
      const url = typeof fileOrUrl === 'string' ? fileOrUrl : URL.createObjectURL(fileOrUrl);
      setQueryUrl(url);

      const qhash = await getImagePHash(url);

      // compute distances and scores
      const scored = products
        .map((p) => {
          const dist = hammingDistance(qhash, p.phash);
          const score = scoreFromHamming(dist);
          return { ...p, dist, score };
        })
        .sort((a, b) => b.score - a.score);

      setResults(scored);
    } catch (e) {
      alert('Failed to process image.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  // filter by min score
  const visible = results.filter((r) => r.score >= minScore);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h1>Visual Product Matcher</h1>

      <ImageUploader onUpload={handleImage} loading={loading} />

      <div style={{ marginTop: 12 }}>
        <label>Minimum similarity score: {minScore}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={minScore}
          onChange={(e) => setMinScore(Number(e.target.value))}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        {loading && <div>Processing image…</div>}

        {queryUrl && (
          <div>
            <h3>Query image</h3>
            <img src={queryUrl} alt="query" style={{ maxWidth: 200, border: '1px solid #ccc' }} />
          </div>
        )}
      </div>

      <h2>Results ({visible.length})</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
          marginTop: 12,
        }}
      >
        {visible.length === 0 && !loading && <div style={{ gridColumn: '1/-1' }}>No results to show.</div>}

        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
