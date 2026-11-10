import type { CSSProperties } from "react";
import Image from "next/image";
import ScrollReveal from "./scroll-reveal";

type ShowState = "on-sale" | "none";

// Single source of truth for show details. Everything on the page that
// mentions a date, venue or price reads from here.
// The Vol. 02 date is not confirmed, so the page defaults to "none" (date TBA,
// mailing list). The on-sale fields below are placeholders for when it is.
// Preview either state with ?show=on-sale or ?show=none.
const EVENT = {
  state: "none" as ShowState,
  volume: "Vol. 02",
  start: "2026-11-12T20:00:00-05:00",
  doors: "2026-11-12T19:30:00-05:00",
  venue: "TLC Sports Bar",
  city: "Columbia, SC",
  region: "Columbia, South Carolina",
  price: "$15",
  ticketUrl: "https://www.zeffy.com/",
  email: "screwupnights@inspirecolumbia.org",
  // The night the photos are from.
  past: { label: "Night 01", when: "Sept 2026", venue: "TLC" },
};

const TZ = "America/New_York";
const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...opts }).format(
    new Date(iso),
  );

// Helper for the per-element rotation custom property (`--r`).
const rot = (deg: string) => ({ "--r": deg }) as CSSProperties;

const NAV = [
  { href: "#about", label: "About" },
  { href: "#next-night", label: "Next night" },
  { href: "#photos", label: "Photos" },
];

const EVIDENCE = [
  {
    src: "/proto/n01-mid-confession.jpg",
    w: 1400,
    h: 933,
    alt: "A speaker telling her story on the lit outdoor stage at night.",
    caption: "mid-confession",
    r: "-2deg",
    tape: "lime",
  },
  {
    src: "/proto/n01-face-you-make.jpg",
    w: 866,
    h: 1300,
    alt: "A speaker with a microphone on stage under a row of pennant flags, audience in the foreground.",
    caption: "the face you make",
    r: "2.5deg",
    tape: "pink",
  },
  {
    src: "/proto/n01-crowd-wide.jpg",
    w: 1440,
    h: 960,
    alt: "A full patio audience at TLC Sports Bar watching the show at dusk.",
    caption: "collective wince",
    r: "-1deg",
    tape: "lime",
  },
  {
    src: "/proto/n01-nobody-left-early.jpg",
    w: 1400,
    h: 933,
    alt: "A wide view of the stage with a speaker mid-story and the audience watching.",
    caption: "nobody left early",
    r: "1.5deg",
    tape: "pink",
  },
  {
    src: "/proto/n01-bar-crowd.jpg",
    w: 1600,
    h: 1066,
    alt: "Audience members standing and sitting by the bar, listening to a story.",
    caption: "see you at Vol. 02",
    r: "-2deg",
    tape: "lime",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { show } = await searchParams;
  const state: ShowState =
    show === "on-sale" || show === "none" ? show : EVENT.state;
  const onSale = state === "on-sale";

  const weekday = fmt(EVENT.start, { weekday: "long" });
  const monthDay = fmt(EVENT.start, { month: "short", day: "numeric" });
  const month = fmt(EVENT.start, { month: "short" });
  const day = fmt(EVENT.start, { day: "numeric" });
  const doorsTime = fmt(EVENT.doors, { hour: "numeric", minute: "2-digit" });
  const mailingList = `mailto:${EVENT.email}?subject=${encodeURIComponent(
    "Add me to the ScrewUp Nights mailing list",
  )}`;
  const ticketHref = onSale ? "#next-night" : mailingList;

  const tickerItems = [
    "Failure is data",
    "Bring your worst",
    `Next: ${EVENT.volume}`,
    EVENT.city,
    "A celebration of screwing up",
  ];

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((g) => (
            <div className="ticker-group" key={g}>
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header className="topbar">
        <nav className="wrap topbar-inner" aria-label="Main">
          <a className="topbar-logo" href="#top">
            <Image
              src="/ScrewupPurple.png"
              alt="ScrewUp Nights home"
              width={757}
              height={592}
              sizes="56px"
            />
          </a>
          <ul className="nav-links">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
          <a className="btn btn-sm nav-cta" href={ticketHref}>
            {onSale ? "Get tickets →" : "Get updates →"}
          </a>
          {/* Mobile: a native disclosure, so it works by keyboard without JS. */}
          <details className="menu">
            <summary aria-label="Menu">
              <span className="burger" aria-hidden="true" />
            </summary>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
              <li>
                <a href={ticketHref}>
                  {onSale ? "Get tickets →" : "Get updates →"}
                </a>
              </li>
            </ul>
          </details>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" id="top" aria-label="ScrewUp Nights">
          <div className="wrap">
            <div className="hero-copy">
              <h1 className="hero-title">
                <Image
                  className="hero-logo rv"
                  src="/ScrewupPurple.png"
                  alt="ScrewUp Nights"
                  width={757}
                  height={592}
                  preload
                  style={rot("-1deg")}
                />
              </h1>

              {/* Desktop: torn-paper panel bleeding off the right edge.
                  Mobile: full-width torn strip under the logo. */}
              <figure className="hero-photo">
                <span className="tape tape-pink hero-tape" aria-hidden="true" />
                <div className="torn">
                  <div className="torn-img">
                    <Image
                      src="/proto/n01-patio-dusk.jpg"
                      alt="The audience seated on the TLC Sports Bar patio at dusk, under string lights."
                      fill
                      preload
                      sizes="(max-width: 760px) 100vw, 52vw"
                    />
                  </div>
                </div>
                <figcaption className="photo-tag">
                  {EVENT.past.label} · {EVENT.past.when} · {EVENT.past.venue}
                </figcaption>
              </figure>

              <p className="hero-sub">
                A celebration of <span className="struck">success</span>{" "}
                <b>failure</b> and everything it quietly taught us.
              </p>
              <p className="scribble">yes, on purpose.</p>
              <p className="presented">
                Presented by{" "}
                <a
                  href="https://inspirecolumbia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inspire Columbia
                </a>
                , the team behind{" "}
                <a
                  href="https://tedxcongareevista.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TEDxCongaree Vista
                </a>
                .
              </p>
              <p className="proof-note marker" aria-hidden="true">
                proof it
                <br />
                actually
                <br />
                happened ↘
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
                    <span>{onSale ? month : "Date"}</span>
                    {onSale ? day : "TBA"}
                  </p>
                  <div className="ticket-body">
                    <h2 id="next-title" className="ticket-title">
                      {`ScrewUp Nights ${EVENT.volume}`}
                    </h2>
                    <ul className="ticket-facts">
                      <li>{`${EVENT.venue}, ${EVENT.city}`}</li>
                      {onSale && (
                        <li>
                          <time dateTime={EVENT.start}>
                            {`${weekday}, ${monthDay}`}
                          </time>
                          {` · Doors ${doorsTime}`}
                        </li>
                      )}
                      <li>Snacks included</li>
                    </ul>
                  </div>
                </div>
                <div className="ticket-stub">
                  {onSale ? (
                    <>
                      <p className="stub-price">{EVENT.price}</p>
                      <p className="stub-note">
                        limited spots · dignity not included
                      </p>
                      <a
                        className="stub-btn"
                        href={EVENT.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy tickets&nbsp;→
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <p className="stub-note">
                        The list hears about the date before tickets go on sale.
                      </p>
                      <a className="stub-btn" href={mailingList}>
                        Join the mailing list&nbsp;→
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="wrap">
            <h2 className="sec-title rv">
              Every win is built on a<br />
              <em>landfill</em> of failures.
            </h2>
            <div className="about-grid">
              <div className="about-lead">
                ScrewUp Nights is a live storytelling show where real people
                take the mic and walk us through their most spectacular flops:
                the launches that tanked, the relationships that imploded, the
                decisions that looked great until they very much didn&rsquo;t.
              </div>
              <div className="about-body">
                <p>
                  It&rsquo;s part stand-up, part post-mortem. Speakers get the
                  stage to be honest, funny, and a little vulnerable about the
                  times things went sideways and what they&rsquo;d actually do
                  differently.
                </p>
                <p>
                  Failure is the best kind of learning, and we rarely talk
                  about it out loud.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="evidence torn-band" id="photos">
          <div className="wrap">
            <h2 className="sec-title rv">Evidence.</h2>
            <ul className="evidence-grid">
              {EVIDENCE.map((p, i) => (
                <li key={p.src} className={`ev ev-${i + 1}`}>
                  <figure className="polaroid rv" style={rot(p.r)}>
                    <span
                      className={`tape tape-${p.tape}`}
                      style={{
                        top: "-14px",
                        left: i % 2 ? "28%" : "36%",
                        transform: `rotate(${i % 2 ? 3 : -2}deg)`,
                      }}
                    />
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={p.w}
                      height={p.h}
                      sizes="(max-width: 760px) 90vw, 420px"
                    />
                    <figcaption>{p.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rsvp" id="rsvp">
          <div className="wrap">
            <div className="rsvp-grid">
              <div className="rsvp-copy">
                <h2 className="rv">
                  Come fail
                  <br />
                  in public.
                </h2>
                <p className="rsvp-line">
                  {onSale
                    ? `${EVENT.price} a seat · spots are limited → snacks included, drinks available.`
                    : "No date yet. Join the list and you'll hear before tickets go on sale."}
                </p>
              </div>

              <div className="paste cta-card">
                <span
                  className="tape"
                  style={{
                    top: "-15px",
                    right: "30px",
                    transform: "rotate(5deg)",
                  }}
                />
                {onSale ? (
                  <a
                    className="btn"
                    href={EVENT.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy tickets&nbsp;→
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <a className="btn" href={mailingList}>
                    Join the mailing list&nbsp;→
                  </a>
                )}
                <a className="btn alt" href={`mailto:${EVENT.email}`}>
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Sponsors section — hidden until we have sponsors. Uncomment to restore.
      <section className="sponsors">
        <div className="wrap">
          <div className="kicker rv" style={{ textAlign: "center" }}>
            Enabled by
          </div>
          <h2 className="sec-title rv" style={{ textAlign: "center" }}>
            The fine folks who
            <br />
            also screwed up.
          </h2>
          <p className="sponsor-note rv">
            Sponsors who get that failure is part of the process — and were
            brave enough to put their logo next to the word &ldquo;screwup.&rdquo;
          </p>
          <div className="logos">
            <div className="logo rv">
              your
              <br />
              logo
              <br />
              here
            </div>
            <div className="logo rv">
              sponsor
              <br />
              slot 02
            </div>
            <div className="logo rv">
              sponsor
              <br />
              slot 03
            </div>
            <div className="logo rv">
              sponsor
              <br />
              slot 04
            </div>
          </div>
          <div className="become rv">
            <a href="mailto:info@inspirecolumbia.org">Become a sponsor →</a>
          </div>
        </div>
      </section>
      */}

      <footer>
        <div className="wrap">
          <div className="foot">
            <a
              className="big"
              href="https://inspirecolumbia.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/InspireWhiteLogo.png"
                alt="Inspire Columbia (opens in a new tab)"
                width={490}
                height={192}
                style={{ width: "160px", height: "auto" }}
              />
            </a>
            <div className="foot-info">
              <p className="errata">
                <b>ERRATA:</b> An earlier version of this life implied that
                everything would go according to plan. We regret the error.
              </p>
              <a className="foot-mail" href={`mailto:${EVENT.email}`}>
                {EVENT.email}
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ScrollReveal />
    </>
  );
}
