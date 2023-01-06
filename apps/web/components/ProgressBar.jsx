import { useEffect, useRef, useState } from 'react';

import { useRouterEvents } from '../hooks';

function ProgressBar() {
  const [opacity, setOpacity] = useState(1);
  const [duration, setDuration] = useState(getDuration());
  const [width, setWidth] = useState({ value: 0, type: 'px' });
  const [intervalId, setIntervalId] = useState(0);
  const barRef = useRef();
  useRouterEvents({
    routeChangeStart: () => {
      setOpacity(1);
      setWidth({ value: getWidth(), type: 'px' });
      setIntervalId(
        setInterval(() => {
          setWidth((width) => ({
            value: width.value + getWidth(),
            type: 'px',
          }));
          console.log('interval');
        }, 1000)
      );
    },
    routeChangeComplete: () => {
      const duration = 400;
      clearInterval(intervalId);
      setDuration(duration);
      setWidth({ value: 100, type: '%' });
      setTimeout(() => {
        setOpacity(0);
      }, duration);
      setTimeout(() => {
        setWidth({ value: 0, type: 'px' });
      }, duration + 500);
    },
  });

  useEffect(() => {
    barRef.current.style['transition-duration'] = `${duration}ms`;
    barRef.current.style.width = getWidthStr(width);
    barRef.current.style.opacity = opacity;
  }, [width, duration, opacity]);

  return (
    <span
      ref={barRef}
      className="absolute top-0 left-0 h-1 rounded-r-full bg-cyan-500 transition-[width_opacity]"
    />
  );
}

const widthValues = [20, 30, 40, 50];
const durationValues = [100, 150, 200, 300];

function getDuration() {
  return durationValues[Math.floor(Math.random() * durationValues.length)];
}

function getWidth() {
  return widthValues[Math.floor(Math.random() * widthValues.length)];
}

function getWidthStr(width) {
  return `${width.value}${width.type}`;
}

export default ProgressBar;
