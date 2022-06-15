import { useEffect, useState } from "react";

export default function useCountdown(seconds) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    const tm = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(tm);
  }, [time]);

  function isFinished() {
    return time === 0;
  }

  return { time, isFinished };
}
