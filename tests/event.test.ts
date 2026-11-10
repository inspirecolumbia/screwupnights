import assert from "node:assert/strict";
import test from "node:test";
import type { EventDetails } from "../app/event";

// Native Node TypeScript execution needs the extension; the URL import keeps
// the existing Next.js TypeScript module-resolution settings unchanged.
const { EVENT, getBooking, getCurrentEvent, getEventEssentials } = (await import(
  new URL("../app/event.ts", import.meta.url).href
)) as typeof import("../app/event");

// Deliberately synthetic data, confined to this test fixture.
const futureEvent: EventDetails = {
  state: "on-sale",
  start: "2030-03-08T20:00:00-05:00",
  doors: "2030-03-08T19:30:00-05:00",
  timezone: "America/New_York",
  venue: "Test venue",
  address: "Test address",
  price: "$20",
  inclusions: ["Admission"],
  checkoutUrl: "https://www.zeffy.com/en-US/ticketing/test-event",
  optionalContributionNote: null,
};
const beforeEvent = Date.parse("2030-03-01T00:00:00Z");

test("the current unannounced event exposes no purchase or signup destination", () => {
  assert.equal(EVENT.state, "unannounced");
  assert.deepEqual(getBooking(), {
    available: false,
    href: null,
    label: "Tickets to be announced",
  });
  assert.equal(getEventEssentials().date, null);
  assert.equal(getEventEssentials().price, null);
});

test("a complete future event routes directly to its configured Zeffy checkout", () => {
  assert.deepEqual(getBooking(futureEvent, beforeEvent), {
    available: true,
    href: futureEvent.checkoutUrl,
    label: "Buy tickets",
  });
});

test("past and sold-out events cannot expose a purchase destination", () => {
  assert.equal(getBooking(futureEvent, Date.parse(futureEvent.start)).href, null);
  assert.deepEqual(
    getBooking({ ...futureEvent, state: "sold-out" }, beforeEvent),
    { available: false, href: null, label: "Sold out" },
  );
});

test("Zeffy homepages, wrong hosts, credentials, and non-HTTPS links are rejected", () => {
  for (const checkoutUrl of [
    "https://www.zeffy.com/",
    "https://www.zeffy.com/en-US/",
    "https://www.zeffy.com/en-US/ticketing/",
    "https://www.zeffy.com.example.org/en-US/ticketing/test-event",
    "https://example.org/ticketing/test-event",
    "https://someone@www.zeffy.com/en-US/ticketing/test-event",
    "http://www.zeffy.com/en-US/ticketing/test-event",
    "javascript:alert(1)",
  ]) {
    assert.equal(
      getBooking({ ...futureEvent, checkoutUrl }, beforeEvent).href,
      null,
      checkoutUrl,
    );
  }
});

test("incomplete or internally inconsistent details cannot open ticket sales", () => {
  const changes = [
    { venue: " " },
    { address: "" },
    { price: "" },
    { inclusions: [] },
    { inclusions: [""] },
    { timezone: "Unknown/Place" },
    { start: "not a date" },
    { start: "2030-03-08T20:00:00" },
    { doors: "2030-03-08T21:00:00-05:00" },
  ];
  for (const change of changes) {
    assert.equal(
      getBooking({ ...futureEvent, ...change }, beforeEvent).available,
      false,
      JSON.stringify(change),
    );
  }
});

test("display dates and times follow the event timezone, not UTC", () => {
  const details = getEventEssentials(futureEvent);
  assert.equal(details.date, "Friday, March 8, 2030");
  assert.equal(details.start, "8:00 PM");
  assert.equal(details.doors, "7:30 PM");
});


test("expired events disappear from upcoming details as well as booking", () => {
  const current = getCurrentEvent(futureEvent, Date.parse(futureEvent.start));
  assert.equal(current.state, "unannounced");
  assert.equal(getEventEssentials(current).date, null);
  assert.equal(getEventEssentials(current).venue, null);
  assert.equal(getBooking(current).href, null);
  assert.equal(getCurrentEvent(futureEvent, beforeEvent).state, "on-sale");
  assert.equal(getCurrentEvent({ ...futureEvent, state: "sold-out" }, beforeEvent).state, "sold-out");
});
