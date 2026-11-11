import Image from "next/image";
import Countdown from "./countdown";
import { daysUntil } from "./days-until";
import LogoDock from "./logo-dock";
import Menu from "./menu";
import ScrollReveal from "./scroll-reveal";
import Silhouette from "./silhouette";

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
  { href: "#speakers", label: "Speakers" },
  { href: "#about", label: "About" },
  { href: "#photos", label: "Photos" },
  { href: "#faq", label: "FAQ" },
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

        {/* The speaker lineup as designed on proto/zine-torn: a torn-edged
            dark band, taped polaroid portraits and "coming soon" stickers. */}
        <section
          className="speakers torn-band"
          id="speakers"
          aria-labelledby="speakers-title"
        >
          <div className="wrap speakers-grid">
            <div>
              <p className="speakers-kicker">The screwups</p>
              <h2 className="speakers-title" id="speakers-title">
                Speaker
                <br />
                lineup
              </h2>
            </div>
            <div>
              <p className="sr-only">
                The {EVENT.volume} lineup will be announced soon.
              </p>
              <ul className="speaker-list">
                {["-3deg", "2deg", "-1.5deg", "2.5deg"].map((tilt) => (
                  <li
                    key={tilt}
                    className="speaker"
                    style={{ transform: `rotate(${tilt})` }}
                  >
                    <span className="speaker-tape" aria-hidden="true" />
                    <Silhouette />
                    <span className="soon">Speaker coming soon</span>
                  </li>
                ))}
              </ul>
              <p className="speakers-note">
                some amazing screwups on the way{" "}
                <span aria-hidden="true">☺</span>
              </p>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="wrap about-grid">
            <div className="about-side">
              {/* Brand mark: a handheld mic, for "take the mic". */}
              <svg
                className="about-mic"
                viewBox="0 -14 260 314"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <pattern
                    id="mic-mesh"
                    width="11"
                    height="11"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="5.5" cy="5.5" r="2.3" fill="var(--paper)" fillOpacity="0.32" />
                  </pattern>
                </defs>
                {/* spotlight the mic stands in */}
                <circle cx="130" cy="150" r="124" fill="var(--paper)" />
                <g transform="rotate(-18 120 150)">
                  {/* sound waves: matching pairs centered on the head, tilted
                      with the mic and clear of the ring */}
                  <g fill="none" stroke="var(--pink)" strokeWidth="7" strokeLinecap="round">
                    <path d="M166.3 20.8 A72 72 0 0 1 191.7 82.3" />
                    <path d="M73.7 20.8 A72 72 0 0 0 48.3 82.3" />
                    <g strokeOpacity="0.45">
                      <path d="M183.9 9.8 A92 92 0 0 1 211.9 79.2" />
                      <path d="M56.1 9.8 A92 92 0 0 0 28.1 79.2" />
                    </g>
                  </g>
                  {/* cable */}
                  <path
                    d="M120 264 C120 300 168 298 184 278 C196 262 214 274 206 300"
                    fill="none"
                    stroke="var(--pink)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* handle, with a shine down one side and an inset switch */}
                  <path d="M74 140 H166 L146 256 Q120 272 94 256 Z" fill="var(--ink)" />
                  <path d="M88 150 L104 250" stroke="var(--ink-2)" strokeWidth="6" strokeLinecap="round" />
                  <rect x="108" y="172" width="24" height="42" rx="9" fill="var(--ink-2)" />
                  <rect x="112" y="178" width="16" height="17" rx="5" fill="var(--lime)" />
                  {/* metal ring between head and handle */}
                  <rect x="64" y="118" width="112" height="26" rx="10" fill="var(--pink)" />
                  <rect x="64" y="128" width="112" height="5" fill="var(--pink-text)" />
                  {/* mesh head */}
                  <circle cx="120" cy="76" r="54" fill="var(--ink)" />
                  <circle cx="120" cy="76" r="49" fill="url(#mic-mesh)" />
                  <path
                    d="M82 59 A42 42 0 0 1 109 35"
                    fill="none"
                    stroke="var(--paper)"
                    strokeOpacity="0.55"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>
            <div className="about-text">
              <h2 className="h2">What is ScrewUp Nights?</h2>
              <p className="lead">
                Every win is built on a landfill of failures.
              </p>
              <p>
                ScrewUp Nights is a live storytelling show where real people
                take the mic and walk us through their most spectacular flops:
                the launches that tanked, the relationships that imploded, the
                decisions that looked great until they very much didn&rsquo;t.
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

        <section className="faq" id="faq" aria-labelledby="faq-title">
          <div className="wrap faq-grid">
            <div className="faq-intro">
              <h2 className="h2" id="faq-title">
                Frequently asked questions
              </h2>
              <p className="muted">
                Something else on your mind? Email{" "}
                <a href={`mailto:${EVENT.email}`}>{EVENT.email}</a>
              </p>
            </div>
            <div className="faq-list">
              <details open>
                <summary>Do I have to tell a story?</summary>
                <p>
                  No. Come to listen to the speakers, laugh, and take it all
                  in. Attending is not signing up to speak.
                </p>
              </details>
              <details>
                <summary>When and where is the next night?</summary>
                <p>
                  {`${when} at ${EVENT.venue}, ${EVENT.city}. `}
                  {doorsTime
                    ? `Doors open at ${doorsTime}.`
                    : "The start time hasn’t been announced yet."}
                </p>
              </details>
              <details>
                <summary>
                  {onSale ? "How do I buy a ticket?" : "Are tickets available?"}
                </summary>
                <p>
                  {onSale ? (
                    "Use any Buy tickets button on this page to go to our Zeffy checkout."
                  ) : (
                    <>
                      Not yet. Tickets and updated prices are coming soon.{" "}
                      <a href={mailingList}>Join the mailing list</a> to hear
                      first.
                    </>
                  )}
                </p>
              </details>
              <details>
                <summary>Is there food?</summary>
                <p>Yes, snacks are included.</p>
              </details>
              <details>
                <summary>Who’s behind ScrewUp Nights?</summary>
                <p>
                  We’re presented by{" "}
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
                  . Same curiosity about people, with a little more room for
                  things going wrong.
                </p>
              </details>
            </div>
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
              className="footer-logo-link"
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
              {/* sparkles that twinkle on hover and focus */}
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <span key={n} className={`sparkle sparkle-${n}`} aria-hidden="true" />
              ))}
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
            <p className="footer-next">
              Next show: {when} at {EVENT.venue}
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
