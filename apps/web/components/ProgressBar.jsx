import { useEffect, useRef, useState } from 'react';

import { useLoading } from '../hooks/loading';

function ProgressBar() {
  const [opacity, setOpacity] = useState(1);
  const [width, setWidth] = useState({ value: 0, type: 'px' });
  const { loading } = useLoading();
  const barRef = useRef();

  useEffect(() => {
    if (loading) {
      setOpacity(1);
      let count = 0;
      const intervalId = setInterval(() => {
        if (count === 20) return;
        setWidth((width) => ({
          value: width.value + getWidth(),
          type: 'px',
        }));
        count++;
      }, 400);

      return () => {
        clearInterval(intervalId);
      };
    } else {
      (async () => {
        setWidth({ value: 100, type: '%' });
        await new Promise((resolve) => {
          setTimeout(() => {
            setOpacity(0);
            resolve();
          }, 200);
        });
        setWidth({ value: 0, type: 'px' });
      })();
    }
  }, [loading]);

  useEffect(() => {
    barRef.current.style.width = getWidthStr(width);
    barRef.current.style.opacity = opacity;
  }, [width, opacity]);

  return (
    <span
      ref={barRef}
      className="absolute top-0 left-0 h-1 rounded-r-full bg-cyan-500 transition-all"
    />
  );
}

const widthValues = [20, 30, 40, 50];

function getWidth() {
  return widthValues[Math.floor(Math.random() * widthValues.length)];
}

function getWidthStr(width) {
  return `${width.value}${width.type}`;
}

export default ProgressBar;
