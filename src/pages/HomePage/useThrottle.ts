import { useEffect, useRef, useState } from 'react';

export default function useThrottleValue<T>(value: T, delay: number = 500) {
  const [throttleValue, setThrottleValue] = useState<T>(value);
  const throttling = useRef(false);
  useEffect(() => {
    if (throttling.current === false) {
      setThrottleValue(value);
      throttling.current = true;
      const timeout = setTimeout(() => {
        if (throttling?.current) throttling.current = false;
      }, delay);

      return clearTimeout(timeout);
    }
  }, [value, delay]);
  return throttleValue;
}
