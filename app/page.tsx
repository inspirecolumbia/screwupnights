import Image from "next/image";
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
  city: "Columbia",
  price: "$15",
  ticketUrl: "https://www.zeffy.com/",
  email: "screwupnights@inspirecolumbia.org",
  // The night the photos are from.
  past: { label: "Night 01", when: "Sept 2026", venue: "TLC Sports Bar" },
};

const TZ = "America/New_York";
const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...opts }).format(
    new Date(iso),
  );

const NAV = [
  { href: "#about", label: "About" },
  { href: "#next-night", label: "Next night" },
  { href: "#photos", label: "Photos" },
  { href: "#speakers", label: "Speakers" },
];

const PILLARS = [
  ["Real stories", "No sanitized LinkedIn versions."],
  ["Actual laughs", "They laugh at themselves. You can too."],
  ["Useful lessons", "Steal them for your next screwup."],
  ["Good company", "A room full of people who've blown it."],
];

const PHOTOS = [
  {
    src: "/proto/n01-face-you-make.jpg",
    alt: "A speaker with a microphone on stage under a row of pennant flags, audience in the foreground.",
    caption: "The face you make",
  },
  {
    src: "/proto/n01-mid-confession.jpg",
    alt: "A speaker telling her story on the lit outdoor stage at night.",
    caption: "Mid-story",
  },
  {
    src: "/proto/n01-on-the-mic.jpg",
    alt: "A speaker in a blue shirt mid-sentence on the microphone.",
    caption: "On the mic",
  },
  {
    src: "/proto/n01-patio-dusk.jpg",
    alt: "The audience seated on the TLC Sports Bar patio at dusk, under string lights.",
    caption: "The crowd",
  },
];

const LINEUP = [
  { hair: "short", teaser: "The launch that tanked" },
  { hair: "long", teaser: "The idea that seemed great" },
  { hair: "bun", teaser: "The plan that imploded" },
  { hair: "crop", teaser: "The one we can't say yet" },
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
  const month = fmt(EVENT.start, { month: "short" });
  const day = fmt(EVENT.start, { day: "numeric" });
  const doorsTime = fmt(EVENT.doors, { hour: "numeric", minute: "2-digit" });
  const mailingList = `mailto:${EVENT.email}?subject=${encodeURIComponent(
    "Add me to the ScrewUp Nights mailing list",
  )}`;
  const cta = onSale
    ? { href: "#next-night", label: `Get tickets — ${EVENT.price}` }
    : { href: mailingList, label: "Join the list" };

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="topbar">
        <nav className="wrap topbar-inner" aria-label="Main">
          <a className="topbar-logo" href="#top">
            <Image
              src="/ScrewupPurple.png"
              alt="ScrewUp Nights home"
              width={757}
              height={592}
              sizes="52px"
            />
          </a>
          <ul className="nav-links">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
          <a className="pill pill-pink nav-cta" href={cta.href}>
            {cta.label}
          </a>
          {/* Mobile: a native disclosure, so it works by keyboard without JS. */}
          <details className="menu">
            <summary>Menu</summary>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
              <li>
                <a href={cta.href}>{cta.label}</a>
              </li>
            </ul>
          </details>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <Image
            className="hero-bg"
            src="/proto/n01-bar-crowd.jpg"
            alt="The Night 01 audience gathered by the bar at TLC Sports Bar, listening to a story."
            fill
            preload
            sizes="100vw"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="wrap hero-inner">
            <p className="mono hero-stamp">
              {EVENT.past.label} · {EVENT.past.when} · {EVENT.past.venue}
            </p>
            <p className="mono lime">{`Live storytelling · ${EVENT.city}, SC`}</p>
            <h1 id="hero-title" className="display hero-title">
              Failure,
              <br />
              <em className="lime">live on</em> stage.
            </h1>
            <div className="hero-foot">
              <p>
                Real people take the mic and walk us through their most
                spectacular flops — and what they&rsquo;d actually do
                differently.
              </p>
              <p className="mono">Presented by Inspire Columbia</p>
            </div>
          </div>
        </section>

        <section className="next" id="next-night" aria-labelledby="next-title">
          <div className="wrap">
            <p className="mono label">Next screwup night</p>
            <div className="ticket">
              <div className="ticket-main">
                <p className="ticket-date" aria-hidden="true">
                  <span>{onSale ? month : "Date"}</span>
                  {onSale ? day : "TBA"}
                </p>
                <div className="ticket-body">
                  <p className="mono">
                    {onSale
                      ? `${EVENT.volume} · ${weekday} · placeholder date`
                      : `${EVENT.volume} · date coming soon`}
                  </p>
                  <h2 id="next-title" className="display ticket-title">
                    {`ScrewUp Nights ${EVENT.volume}`}
                  </h2>
                  <ul className="ticket-facts">
                    <li>{`${EVENT.venue}, ${EVENT.city}`}</li>
                    {onSale && (
                      <li>
                        <time dateTime={EVENT.start}>
                          {`${weekday}, ${month} ${day}`}
                        </time>
                        {` · Doors ${doorsTime}`}
                      </li>
                    )}
                    <li>Snacks included</li>
                  </ul>
                </div>
              </div>
              <div className="ticket-stub">
                <p className="mono">{onSale ? "Admit one" : "Be first in line"}</p>
                {onSale ? (
                  <>
                    <p className="display stub-price">{EVENT.price}</p>
                    <p className="small">limited spots · dignity not included</p>
                    <a
                      className="pill pill-pink"
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
                    <p className="small">
                      The list hears about the date before tickets go on sale.
                    </p>
                    <a className="pill pill-pink" href={mailingList}>
                      Join the mailing list →
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <div className="wrap">
            <div className="about-grid">
              <h2 id="about-title" className="display about-title">
                Every win is built on a <em className="pink">landfill</em> of
                failures.
              </h2>
              <div className="about-copy">
                <p className="lead">
                  ScrewUp Nights is a live storytelling show about the launches
                  that tanked, the relationships that imploded, and the
                  decisions that looked great until they very much
                  didn&rsquo;t.
                </p>
                <p>
                  It&rsquo;s part stand-up, part post-mortem. Speakers get the
                  stage to be honest, funny, and a little vulnerable about the
                  times things went sideways.
                </p>
                <p>
                  Because failure isn&rsquo;t the opposite of learning. We just
                  don&rsquo;t usually talk about it out loud.
                </p>
              </div>
            </div>
            <ol className="pillars">
              {PILLARS.map(([title, text], i) => (
                <li key={title}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="pictures" id="photos" aria-labelledby="photos-title">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="photos-title" className="display sec-title">
                {`${EVENT.past.label}, `}
                <em className="pink">in pictures.</em>
              </h2>
              <p className="mono">{`${EVENT.past.when} · ${EVENT.past.venue}`}</p>
            </div>
            <ul className="mosaic">
              {PHOTOS.map((p, i) => (
                <li key={p.src} className={`tile tile-${i + 1}`}>
                  <figure>
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes={
                        i === 0
                          ? "(max-width: 760px) 100vw, 560px"
                          : "(max-width: 760px) 100vw, 480px"
                      }
                    />
                    <figcaption className="mono">{p.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lineup" id="speakers" aria-labelledby="lineup-title">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="lineup-title" className="display sec-title">
                {`${EVENT.volume} `}
                <em className="lime">lineup.</em>
              </h2>
              <p className="mono">Announcing soon</p>
            </div>
            <ul className="lineup-grid">
              {LINEUP.map((s, i) => (
                <li key={s.hair}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <div className="portrait">
                    <Silhouette hair={s.hair} />
                    <span className="soon">Speaker coming soon</span>
                  </div>
                  <h3>Speaker TBA</h3>
                  <p>{s.teaser}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band" aria-labelledby="band-title">
          <div className="wrap">
            <h2 id="band-title" className="display band-title">
              Come fail <em>in public.</em>
            </h2>
            <a
              className="pill pill-dark"
              href={onSale ? EVENT.ticketUrl : mailingList}
            >
              {onSale
                ? `Get tickets — ${EVENT.price} →`
                : "Join the mailing list →"}
            </a>
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

      <footer className="site-footer">
        <div className="wrap foot">
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
              className="foot-logo"
            />
          </a>
          <p>
            <b>ERRATA:</b> An earlier version of this life implied that
            everything would go according to plan. We regret the error.
          </p>
        </div>
      </footer>
    </>
  );
}
