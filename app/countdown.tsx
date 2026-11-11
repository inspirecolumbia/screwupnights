"use client";

import { useEffect, useState } from "react";
import { daysUntil } from "./days-until";

// Days to the next show. The server renders the starting number; the client
// re-checks it so a cached page or a tab left open past midnight stays right.
// `inline` renders a short phrase for the hero badge instead of the big
// number used in the ticket stub.
export default function Countdown({
  day,
  initial,
  inline = false,
}: {
  day: string;
  initial: number;
  inline?: boolean;
}) {
  const [days, setDays] = useState(initial);

  useEffect(() => {
    const tick = () => setDays(daysUntil(day, new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [day]);

  if (days < 0) return null;

  if (inline) {
    return (
      <span className="hero-countdown">
        {days === 0
          ? "TODAY"
          : `${days} ${days === 1 ? "day" : "days"} to go`}
      </span>
    );
  }

  return (
    <p className="countdown">
      {days === 0 ? (
        <span className="countdown-num">TODAY</span>
      ) : (
        <>
          <span className="countdown-num">{days}</span>{" "}
          {days === 1 ? "day to go" : "days to go"}
        </>
      )}
    </p>
  );
}
