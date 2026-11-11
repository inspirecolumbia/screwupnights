import Image from "next/image";
import Countdown from "./countdown";
import { daysUntil } from "./days-until";
import LogoDock from "./logo-dock";
import Menu from "./menu";
import ScrollReveal from "./scroll-reveal";

type ShowState = "on-sale" | "soon";

// Single source of truth for show details. Everything on the page that
// mentions a date, venue or price reads from here.
// Vol. 02 is on Dec 2 but tickets are not on sale yet, so the page defaults to
// "soon" (date shown, mailing list). Switch to "on-sale" once ticketUrl and
// price are real. Preview either state with ?show=on-sale or ?show=soon.
const EVENT = {
  state: "soon" as ShowState,
  volume: "Vol. 02",
  // Start time not announced yet. Noon keeps the date right in Eastern time.
  start: "2026-12-02T12:00:00-05:00",
  // Doors time not announced yet. Set an ISO time here to show it.
  doors: null as string | null,
  venue: "TLC Sports Bar",
  city: "Columbia, SC",
  // Placeholders until the updated ticket link and prices are ready.
  price: "$15",
  ticketUrl: "https://www.zeffy.com/",
  email: "screwupnights@inspirecolumbia.org",
};

const TZ = "America/New_York";
const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...opts }).format(
    new Date(iso),
  );

const mailto = (subject: string) =>
  `mailto:${EVENT.email}?subject=${encodeURIComponent(subject)}`;

// In page order.
const NAV = [
  { href: "#next-night", label: "Next night" },
  { href: "#about", label: "About" },
  { href: "#photos", label: "Photos" },
  { href: "#speak", label: "Speak" },
];

// From Night 01, Sept 2026. The first photo leads the grid.
const PHOTOS = [
  {
    src: "/proto/n01-face-you-make.jpg",
    w: 866,
    h: 1300,
    alt: "A speaker with a microphone on stage under a row of pennant flags, audience in the foreground.",
    sizes: "(max-width: 899px) 100vw, 460px",
  },
  {
    src: "/proto/n01-mid-confession.jpg",
    w: 1400,
    h: 933,
    alt: "A speaker telling a story on the lit outdoor stage at night.",
    sizes: "(max-width: 899px) 100vw, 640px",
    dark: true,
  },
  {
    src: "/proto/n01-crowd-wide.jpg",
    w: 1440,
    h: 960,
    alt: "A full patio audience at TLC Sports Bar watching the show at dusk.",
    sizes: "(max-width: 899px) 50vw, 380px",
  },
  {
    src: "/proto/n01-bar-crowd.jpg",
    w: 1600,
    h: 1066,
    alt: "Audience members standing and sitting by the bar, listening to a story.",
    sizes: "(max-width: 899px) 50vw, 300px",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { show } = await searchParams;
  const state: ShowState =
    show === "on-sale" || show === "soon" ? show : EVENT.state;
  const onSale = state === "on-sale";

  const weekday = fmt(EVENT.start, { weekday: "long" });
  const monthDay = fmt(EVENT.start, { month: "short", day: "numeric" });
  const month = fmt(EVENT.start, { month: "short" });
  const day = fmt(EVENT.start, { day: "numeric" });
  const doorsTime = EVENT.doors
    ? fmt(EVENT.doors, { hour: "numeric", minute: "2-digit" })
    : null;
  const when = `${weekday}, ${monthDay}`;
  const eventDay = EVENT.start.slice(0, 10);

  const mailingList = mailto("Add me to the ScrewUp Nights mailing list");
  const speak = mailto("I'd like to speak at ScrewUp Nights");
  // The one action the page pushes: tickets once on sale, the list until then.
  const primary = onSale
    ? { href: "#next-night", label: "Get tickets" }
    : { href: mailingList, label: "Join the mailing list" };

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <div className="announce">
        <div className="wrap announce-inner">
          <p>
            <strong>{`ScrewUp Nights ${EVENT.volume}`}</strong>
            {` · ${when}`}
            <span className="hide-sm">{` · ${EVENT.venue}, ${EVENT.city}`}</span>
          </p>
          <a href={primary.href}>
            {onSale ? "Get tickets" : "Join the list"}&nbsp;<span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <header className="topbar">
        <nav className="wrap topbar-inner" aria-label="Main">
          <a className="topbar-logo" href="#top">
            <Image
              src="/ScrewupLight.png"
              alt="ScrewUp Nights home"
              width={757}
              height={592}
              sizes="60px"
            />
          </a>
          <ul className="nav-links">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
          <a className="btn btn-accent btn-sm nav-cta" href={primary.href}>
            {primary.label}
          </a>
          <Menu links={NAV} cta={primary} />
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" id="top" aria-label="ScrewUp Nights">
          {/* Full-width photo behind the hero, tinted so the text reads and
              faded into the page at the bottom. */}
          <div className="hero-bg">
            <Image
              src="/proto/n01-patio-dusk.jpg"
              alt="The audience seated on the TLC Sports Bar patio at dusk, under string lights."
              fill
              sizes="100vw"
              preload
            />
          </div>
          <div className="wrap">
            <div className="hero-copy">
              <h1>
                <Image
                  className="hero-logo"
                  src="/ScrewupLight.png"
                  alt="ScrewUp Nights"
                  width={757}
                  height={592}
                  sizes="(max-width: 899px) 300px, 400px"
                  preload
                />
              </h1>
              <p className="hero-lede">
                A live storytelling night where real people tell the story of
                their most spectacular flops, and what they learned.
              </p>
              <p className="hero-tagline">
                A celebration of failure and everything it taught us.
              </p>
              <p className="hero-when">
                <time dateTime={EVENT.start.slice(0, 10)}>{when}</time>
                {doorsTime && ` · Doors ${doorsTime}`}
                {` · ${EVENT.venue}, ${EVENT.city}`}
              </p>
              <div className="actions">
                <a className="btn btn-accent" href={primary.href}>
                  {primary.label}&nbsp;<span className="arrow" aria-hidden="true">→</span>
                </a>
                <a className="btn btn-secondary" href={speak}>
                  Speak at a night
                </a>
              </div>
              <p className="presented">
                Presented by{" "}
                <a
                  href="https://inspirecolumbia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inspire Columbia
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                , the team behind{" "}
                <a
                  href="https://tedxcongareevista.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TEDxCongaree Vista
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="next" id="next-night" aria-labelledby="next-title">
          <div className="wrap">
            <div className="ticket-wrap">
              <div className="ticket">
                <div className="ticket-main">
                  <p className="ticket-date" aria-hidden="true">
                    <span>{month}</span>
                    {day}
                  </p>
                  <div className="ticket-body">
                    <h2 id="next-title" className="ticket-title">
                      {`ScrewUp Nights ${EVENT.volume}`}
                    </h2>
                    <ul className="ticket-facts">
                      <li>
                        <time dateTime={EVENT.start.slice(0, 10)}>{when}</time>
                        {doorsTime && ` · Doors ${doorsTime}`}
                      </li>
                      <li>{`${EVENT.venue}, ${EVENT.city}`}</li>
                      <li>Snacks included</li>
                    </ul>
                  </div>
                </div>
                <div className="ticket-stub">
                  <Countdown
                    day={eventDay}
                    initial={daysUntil(eventDay, new Date())}
                  />
                  {onSale ? (
                    <>
                      <p className="stub-price">{EVENT.price}</p>
                      <p className="stub-note">Limited spots.</p>
                      <a
                        className="stub-btn"
                        href={EVENT.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy tickets&nbsp;<span className="arrow" aria-hidden="true">→</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <p className="stub-note">
                        Tickets and prices are coming soon. The list hears
                        first.
                      </p>
                      <a className="stub-btn" href={mailingList}>
                        Join the list&nbsp;<span className="arrow" aria-hidden="true">→</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="wrap about-grid">
            <div className="about-side">
              <h2 className="h2">What is ScrewUp Nights?</h2>
              {/* Brand mark: a handheld mic, for "take the mic". */}
              <svg
                className="about-mic"
                viewBox="0 0 200 240"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <clipPath id="mic-head">
                    <rect x="60" y="14" width="80" height="104" rx="40" />
                  </clipPath>
                </defs>
                <g transform="rotate(-14 100 120)">
                  <rect x="60" y="14" width="80" height="104" rx="40" fill="var(--ink)" />
                  <g clipPath="url(#mic-head)" stroke="var(--paper)" strokeOpacity="0.35" strokeWidth="4">
                    <line x1="56" y1="38" x2="144" y2="38" />
                    <line x1="56" y1="54" x2="144" y2="54" />
                    <line x1="56" y1="70" x2="144" y2="70" />
                    <line x1="56" y1="86" x2="144" y2="86" />
                    <line x1="80" y1="10" x2="80" y2="118" />
                    <line x1="100" y1="10" x2="100" y2="118" />
                    <line x1="120" y1="10" x2="120" y2="118" />
                  </g>
                  <rect x="54" y="104" width="92" height="18" rx="7" fill="var(--pink)" />
                  <path d="M70 122 H130 L116 214 Q100 226 84 214 Z" fill="var(--ink)" />
                  <rect x="93" y="146" width="14" height="26" rx="5" fill="var(--lime)" />
                </g>
                <g strokeWidth="7" strokeLinecap="round" fill="none">
                  <path d="M160 40 L182 26" stroke="var(--pink)" />
                  <path d="M166 70 L192 70" stroke="var(--pink)" />
                  <path d="M160 100 L182 114" stroke="var(--pink)" />
                  <path d="M38 52 L18 40" stroke="var(--lime)" />
                  <path d="M32 82 L8 82" stroke="var(--lime)" />
                </g>
              </svg>
            </div>
            <div className="about-text">
              <p className="lead">
                Every win is built on a landfill of failures. ScrewUp Nights is
                a live storytelling show where real people take the mic and
                walk us through their most spectacular flops: the launches that
                tanked, the relationships that imploded, the decisions that
                looked great until they very much didn&rsquo;t.
              </p>
              <p>
                It&rsquo;s part stand-up, part post-mortem. Speakers get the
                stage to be honest, funny, and a little vulnerable about the
                times things went sideways and what they&rsquo;d actually do
                differently.
              </p>
              <p>
                Failure is the best kind of learning, and we rarely talk about
                it out loud.
              </p>
            </div>
          </div>
        </section>

        <section className="photos" id="photos" aria-labelledby="photos-title">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2" id="photos-title">
                Photos from Night 01
              </h2>
              <p className="muted">September 2026 at TLC Sports Bar, Columbia.</p>
            </div>
            <ul className="photo-grid">
              {PHOTOS.map((p, i) => (
                <li key={p.src} className={`photo photo-${i + 1}`}>
                  <figure className={`rv${p.dark ? " is-dark" : ""}`}>
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={p.w}
                      height={p.h}
                      sizes={p.sizes}
                    />
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="speak" id="speak" aria-labelledby="speak-title">
          <div className="wrap speak-grid">
            <div>
              <h2 className="h2" id="speak-title">
                Come fail in public.
              </h2>
              <p className="lead">
                Have a story about a time things went sideways, and what it
                taught you? Tell us about it, and you could be on stage at a
                future ScrewUp Nights.
              </p>
            </div>
            <div className="speak-actions">
              <div className="actions">
                <a className="btn btn-primary" href={speak}>
                  Speak at a night&nbsp;<span className="arrow" aria-hidden="true">→</span>
                </a>
                <a className="btn btn-secondary" href={primary.href}>
                  {primary.label}
                </a>
              </div>
              <p className="muted">
                Questions? Email{" "}
                <a href={`mailto:${EVENT.email}`}>{EVENT.email}</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <a
              href="https://inspirecolumbia.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/InspireWhiteLogo.png"
                alt="Inspire Columbia (opens in a new tab)"
                width={490}
                height={192}
                sizes="160px"
                className="footer-logo"
              />
            </a>
            <p>
              ScrewUp Nights is presented by Inspire Columbia, the team behind
              TEDxCongaree Vista.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="footer-links">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer-contact">
            <a href={`mailto:${EVENT.email}`}>{EVENT.email}</a>
            <p className="errata">
              <b>Errata:</b> An earlier version of this life implied that
              everything would go according to plan. We regret the error.
            </p>
          </div>
          <p className="footer-legal">© 2026 Inspire Columbia</p>
        </div>
      </footer>

      <ScrollReveal />
      <LogoDock />
    </>
  );
}
