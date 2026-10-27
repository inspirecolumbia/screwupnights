import type { CSSProperties } from "react";
import Image from "next/image";
import ScrollReveal from "./scroll-reveal";
import MarginShapes from "./margin-shapes";
import Silhouette from "./silhouette";

type ShowState = "on-sale" | "none";

// Single source of truth for show details. Everything on the page that
// mentions a date, venue or price reads from here.
// PROTOTYPE: the Vol. 02 date, times and ticket link are placeholders, not a
// confirmed show. Preview either state with ?show=on-sale or ?show=none.
const EVENT = {
  state: "on-sale" as ShowState,
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
  { href: "#speakers", label: "Speakers" },
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

const SPEAKERS = [
  { hair: "short", r: "-3deg" },
  { hair: "long", r: "2deg" },
  { hair: "bun", r: "-1.5deg" },
  { hair: "crop", r: "2.5deg" },
] as const;

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
      <MarginShapes />
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((g) => (
            <div className="ticker-group" key={g}>
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i}>
                  {item} <span className="dot">●</span>
                </span>
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
              <span className="vol rv">{`${EVENT.volume} — Live & in person`}</span>
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

              <p className="hero-sub rv">
                A celebration of <span className="struck">success</span>{" "}
                <b>failure</b> and everything it quietly taught us.
              </p>
              <p className="scribble rv">yes, on purpose.</p>
              <p className="presented rv">
                Presented by{" "}
                <a
                  href="https://inspirecolumbia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inspire Columbia
                </a>{" "}
                — the team behind{" "}
                <a
                  href="https://tedxcongareevista.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TEDxCongaree Vista
                </a>
                .
              </p>
              <p className="proof-note marker rv" aria-hidden="true">
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
            <div className="kicker rv">Next screwup night</div>
            <div className="ticket-wrap rv">
              <div className="ticket">
                <div className="ticket-main">
                  <p className="ticket-date" aria-hidden="true">
                    <span>{onSale ? month : "Date"}</span>
                    {onSale ? day : "TBA"}
                  </p>
                  <div className="ticket-body">
                    <p className="ticket-kicker">
                      {onSale
                        ? `${EVENT.volume} · ${weekday} · placeholder date`
                        : `${EVENT.volume} · date coming soon`}
                    </p>
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
                  <p className="ticket-kicker">
                    {onSale ? "Admit one" : "Be first in line"}
                  </p>
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
                        Buy tickets →
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <p className="stub-note">
                        The list hears about the date before tickets go on sale.
                      </p>
                      <a className="stub-btn" href={mailingList}>
                        Join the mailing list →
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
            <div className="kicker rv">The premise</div>
            <h2 className="sec-title rv">
              Every win is built on a<br />
              <em>landfill</em> of failures.
            </h2>
            <div className="about-grid">
              <div className="about-lead rv">
                ScrewUp Nights is a live storytelling show where real people
                take the mic and walk us through their most spectacular flops:
                the launches that tanked, the relationships that imploded, the
                decisions that looked great until they very much didn&rsquo;t.
              </div>
              <div className="about-body rv">
                <p>
                  It&rsquo;s part stand-up, part post-mortem. Speakers get the
                  stage to be honest, funny, and a little vulnerable about the
                  times things went sideways and what they&rsquo;d actually do
                  differently.
                </p>
                <p>
                  Because failure isn&rsquo;t the opposite of learning.
                  It&rsquo;s actually the best kind of learning. We just
                  don&rsquo;t usually talk about it out loud.
                </p>
              </div>
            </div>

            <div className="cards">
              <div className="mini paste rv" style={rot("-1deg")}>
                <div className="n">01</div>
                <h3>Real stories</h3>
                <p>
                  No sanitized LinkedIn versions. The actual, embarrassing,
                  instructive truth.
                </p>
              </div>
              <div className="mini paste rv" style={rot("1deg")}>
                <div className="n">02</div>
                <h3>Actual laughs</h3>
                <p>
                  Our speakers learned to laugh at themselves. Now you can laugh
                  at them too.
                </p>
              </div>
              <div className="mini paste rv" style={rot("-0.5deg")}>
                <div className="n">03</div>
                <h3>Useful lessons</h3>
                <p>
                  Every story lands on something you can steal for your own next
                  screwup.
                </p>
              </div>
              <div className="mini paste rv" style={rot("1deg")}>
                <div className="n">04</div>
                <h3>Good company</h3>
                <p>
                  A room full of people who&rsquo;ve also blown it. Wildly
                  underrated medicine.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="evidence torn-band" id="photos">
          <div className="wrap">
            <div className="kicker rv">From the floor · {EVENT.past.label}</div>
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

        <section className="speakers torn-band" id="speakers">
          <div className="wrap speakers-grid">
            <div>
              <div className="kicker rv">The screwups</div>
              <h2 className="sec-title rv">
                Speaker
                <br />
                lineup
              </h2>
            </div>
            <div>
              <ul className="speaker-list">
                {SPEAKERS.map((s, i) => (
                  <li key={i} className="polaroid speaker rv" style={rot(s.r)}>
                    <span className="tape tape-pink" aria-hidden="true" />
                    <Silhouette hair={s.hair} />
                    <span className="soon">Speaker coming soon</span>
                  </li>
                ))}
              </ul>
              <p className="speakers-note marker rv">
                some amazing screwups on the way ☺
              </p>
            </div>
          </div>
        </section>

        <section className="rsvp" id="rsvp">
          <div className="wrap">
            <div className="rsvp-grid">
              <div className="rsvp-copy rv">
                <div className="kicker">
                  {onSale ? "Save your seat" : "Next show"}
                </div>
                <h2>
                  Come fail
                  <br />
                  in public.
                </h2>
                <p className="rsvp-line">
                  {onSale
                    ? `${EVENT.price} a seat · spots are limited → snacks included, drinks available.`
                    : "No date yet — join the list and you'll hear before tickets go on sale."}
                </p>
              </div>

              <div className="paste rv cta-card">
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
                    Buy tickets →
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <a className="btn" href={mailingList}>
                    Join the mailing list →
                  </a>
                )}
                <a className="btn alt" href={`mailto:${EVENT.email}`}>
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <figure className="quote rv">
              <blockquote>
                <p>
                  &ldquo;I have not failed. I&rsquo;ve just found 10,000 ways
                  that won&rsquo;t work.&rdquo;
                </p>
              </blockquote>
              <figcaption>— Thomas Edison</figcaption>
            </figure>
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
            <p className="errata">
              <b>ERRATA:</b> An earlier version of this life implied that
              everything would go according to plan. We regret the error.
            </p>
          </div>
        </div>
      </footer>

      <ScrollReveal />
    </>
  );
}
