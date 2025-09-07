import { useEffect, useRef, useState } from "react";

  const formatTime = (ms: number) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

export const useCountDownTimer = (time: string) => {
  const [remainedTime, setRemainedTime] = useState<number>(() => {
    if (!time) return 0;
    return new Date(time).getTime() - Date.now();
  });

  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!time) {
      setRemainedTime(0);
      return;
    }

    const targetTime = new Date(time).getTime();
    let diff = targetTime - Date.now();

    if (diff <= 0) {
      setRemainedTime(0);
      return;
    }

    setRemainedTime(diff);

    timerIdRef.current = setInterval(() => {
      diff = targetTime - Date.now();
      if (diff <= 0) {
        clearInterval(timerIdRef.current!);
        setRemainedTime(0);
      } else {
        setRemainedTime(diff);
      }
    }, 1000);

    return () => {
      if (timerIdRef.current) clearInterval(timerIdRef.current);
    };
  }, [time]);
  const formattedRemainedTime= formatTime(remainedTime)

  return { time:formattedRemainedTime };
};
