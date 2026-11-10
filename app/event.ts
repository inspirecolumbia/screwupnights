export const SITE = {
  name: "ScrewUp Nights",
  city: "Columbia, SC",
  email: "screwupnights@inspirecolumbia.org",
  organizer: {
    name: "Inspire Columbia",
    url: "https://www.inspirecolumbia.org/",
  },
  description:
    "A live storytelling night in Columbia, SC, where people share what went wrong—and what they learned.",
} as const;

type ConfirmedDetails = {
  /** ISO timestamps with a UTC offset. The event date is derived from start. */
  start: string;
  doors: string;
  timezone: string;
  venue: string;
  address: string;
  /** The verified admission price, including its currency symbol. */
  price: string;
  inclusions: readonly string[];
  /** Set only after inspecting the current event's Zeffy checkout. */
  checkoutUrl: string;
  /** Leave null unless the current checkout contribution flow is verified. */
  optionalContributionNote: string | null;
};

export type EventDetails =
  | {
      state: "unannounced";
      start: null;
      doors: null;
      timezone: string;
      venue: null;
      address: null;
      price: null;
      inclusions: readonly string[];
      checkoutUrl: null;
      optionalContributionNote: null;
    }
  | ({ state: "on-sale" } & ConfirmedDetails)
  | ({ state: "sold-out" } & ConfirmedDetails);

// There is no confirmed upcoming event. Replace this object only with details
// confirmed by the organizer and checked against the current Zeffy checkout.
// Historical event: September 2, 2026 (past). Its old checkout must not be reused:
// https://www.zeffy.com/en-US/ticketing/screwup-nights-september--2026
export const EVENT: EventDetails = {
  state: "unannounced",
  start: null,
  doors: null,
  timezone: "America/New_York",
  venue: null,
  address: null,
  price: null,
  inclusions: [],
  checkoutUrl: null,
  optionalContributionNote: null,
};

/** Keep an expired or invalid date out of the upcoming-event presentation. */
export function getCurrentEvent(event: EventDetails = EVENT, now = Date.now()): EventDetails {
  if (event.state === "unannounced") return event;
  const start = timestamp(event.start);
  if (Number.isFinite(start) && start > now) return event;
  return {
    state: "unannounced",
    start: null,
    doors: null,
    timezone: "America/New_York",
    venue: null,
    address: null,
    price: null,
    inclusions: [],
    checkoutUrl: null,
    optionalContributionNote: null,
  };
}

export type Booking = {
  available: boolean;
  href: string | null;
  label: string;
};

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

function validTimezone(timezone: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

function timestamp(value: string) {
  // A missing offset must not silently use the server's local timezone.
  if (!/T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return NaN;
  return Date.parse(value);
}

function zeffyTicketUrl(value: string) {
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      !["www.zeffy.com", "zeffy.com"].includes(url.hostname) ||
      url.port ||
      url.username ||
      url.password ||
      !/^\/(?:[a-z]{2}-[A-Z]{2}\/)?ticketing\/[^/]+\/?$/.test(url.pathname)
    ) {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}

/** Every ticket entry point uses this gate and the same verified destination. */
export function getBooking(
  event: EventDetails = EVENT,
  now = Date.now(),
): Booking {
  const unavailable = {
    available: false,
    href: null,
    label: "Tickets to be announced",
  };

  if (event.state === "unannounced") return unavailable;

  const start = timestamp(event.start);
  const doors = timestamp(event.doors);
  if (!Number.isFinite(start) || start <= now) {
    return { ...unavailable, label: "Tickets unavailable" };
  }

  if (event.state === "sold-out") {
    return { ...unavailable, label: "Sold out" };
  }

  const href = zeffyTicketUrl(event.checkoutUrl);
  if (
    !href ||
    !Number.isFinite(doors) ||
    doors > start ||
    !hasText(event.timezone) ||
    !validTimezone(event.timezone) ||
    !hasText(event.venue) ||
    !hasText(event.address) ||
    !hasText(event.price) ||
    event.inclusions.length === 0 ||
    !event.inclusions.every(hasText)
  ) {
    return { ...unavailable, label: "Tickets unavailable" };
  }

  return { available: true, href, label: "Buy tickets" };
}

/** Date and times share the event timezone, regardless of the server location. */
export function getEventEssentials(event: EventDetails = EVENT) {
  const format = (
    value: string | null,
    options: Intl.DateTimeFormatOptions,
  ) => {
    if (
      value === null ||
      !Number.isFinite(timestamp(value)) ||
      !validTimezone(event.timezone)
    ) {
      return null;
    }
    return new Intl.DateTimeFormat("en-US", {
      timeZone: event.timezone,
      ...options,
    }).format(new Date(value));
  };

  return {
    date: format(event.start, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    start: format(event.start, { hour: "numeric", minute: "2-digit" }),
    doors: format(event.doors, { hour: "numeric", minute: "2-digit" }),
    timezone: event.timezone,
    venue: event.venue,
    address: event.address,
    price: event.price,
    inclusions: event.inclusions,
  };
}
