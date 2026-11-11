"use client";

import { useEffect, useState } from "react";
import { daysUntil } from "./days-until";

// Days to the next show. The server renders the starting number; the client
// re-checks it so a cached page or a tab left open past midnight stays right.
export default function Countdown({
  day,
  initial,
}: {
  day: string;
  initial: number;
}) {
  const [days, setDays] = useState(initial);

  useEffect(() => {
    const tick = () => setDays(daysUntil(day, new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [day]);

  if (days < 0) return null;
  return (
    <p className="countdown">
      {days === 0 ? (
        <span className="countdown-num">Today</span>
      ) : (
        <>
          <span className="countdown-num">{days}</span>{" "}
          {days === 1 ? "day to go" : "days to go"}
        </>
      )}
    </p>
  );
}
