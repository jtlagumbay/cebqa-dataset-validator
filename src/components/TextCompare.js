import React, { useState } from 'react';
import { diffWords } from 'diff';

export default function TextCompare ({ text1, text2, title }){
  const [comparison, setComparison] = useState([]);

  // Compare the texts when the component mounts or the props change
  React.useEffect(() => {
    const diff = diffWords(text1, text2);
    setComparison(diff);
  }, [text1, text2]);

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* <textarea value={text1} readOnly rows="10" cols="30" />
        <textarea value={text2} readOnly rows="10" cols="30" /> */}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h4>{title}</h4>
        <div>
          {comparison.map((part, index) => {
            const color = part.added ? 'green' : part.removed ? 'red' : 'black';
            return (
              <span key={index} style={{ color }}>
                {part.value}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

