import type { CSSProperties } from "react";
import RsvpForm from "./rsvp-form";
import ScrollReveal from "./scroll-reveal";

// Helper for the prototype's per-element rotation custom property (`--r`).
const rot = (deg: string) => ({ "--r": deg }) as CSSProperties;

const tickerItems = [
  "Failure is data",
  "Bring your worst",
  "Sept 4 2026",
  "Columbia, SC",
  "A celebration of screwing up",
];

function TickerGroup() {
  return (
    <>
      {tickerItems.map((item, i) => (
        <span key={i}>
          {item} <span className="dot">●</span>
        </span>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <>
      <div className="ticker">
        <div>
          <TickerGroup />
          <TickerGroup />
        </div>
      </div>

      <header>
        <div className="wrap">
          <span className="vol rv">Vol. 01 — Live &amp; in person</span>
          <h1 className="hero-title">
            <span className="l1 rv" style={rot("-1deg")}>
              Screwup
            </span>
            <span className="l2 rv">
              <span className="nightsbox">Nights</span>
            </span>
          </h1>
          <p className="hero-sub rv">
            A celebration of <span className="struck">success</span>{" "}
            <b>failure</b> — and everything it quietly taught us.{" "}
            <span className="scribble">yes, on purpose.</span>
          </p>
          <p className="presented rv">
            Presented by{" "}
            <a
              href="https://inspirecolumbia.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>Inspire Columbia</b>
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

          <div className="meta-row">
            <div className="meta-card paste rv" style={rot("-1.5deg")}>
              <span
                className="tape"
                style={{ top: "-14px", left: "24px", transform: "rotate(-5deg)" }}
              />
              <div className="k">When</div>
              <div className="v">
                Sept 4<small>Friday · 2026 · doors 7pm</small>
              </div>
            </div>
            <div className="meta-card paste rv" style={rot("1.5deg")}>
              <span
                className="tape"
                style={{ top: "-14px", right: "24px", transform: "rotate(6deg)" }}
              />
              <div className="k">Where</div>
              <div className="v">
                Columbia<small>South Carolina · venue TBA</small>
              </div>
            </div>
            <div className="meta-card paste rv" style={rot("-1deg")}>
              <span
                className="tape"
                style={{ top: "-14px", left: "40%", transform: "rotate(-3deg)" }}
              />
              <div className="k">Tickets</div>
              <div className="v">
                $15<small>limited spots · dignity not included</small>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="about">
        <div className="wrap">
          <div className="kicker rv">The premise</div>
          <h2 className="sec-title rv">
            Every win is built on a<br />
            <em>landfill</em> of failures.
          </h2>
          <div className="about-grid">
            <div className="about-lead rv">
              SCrewUp Nights is a live storytelling show where real people take
              the mic and walk us through their most spectacular flops — the
              launches that tanked, the relationships that imploded, the
              decisions that looked great until they very much didn&rsquo;t.
            </div>
            <div className="about-body rv">
              <p>
                It&rsquo;s part stand-up, part post-mortem. Speakers get the
                stage to be honest, funny, and a little vulnerable about the
                times things went sideways — and what they&rsquo;d actually do
                differently.
              </p>
              <p>
                Because failure isn&rsquo;t the opposite of learning. It&rsquo;s
                the whole curriculum. We just don&rsquo;t usually talk about it
                out loud.
              </p>
            </div>
          </div>

          <div className="cards">
            <div className="mini paste rv" style={rot("-1deg")}>
              <div className="n">01</div>
              <h4>Real stories</h4>
              <p>
                No sanitized LinkedIn versions. The actual, embarrassing,
                instructive truth.
              </p>
            </div>
            <div className="mini paste rv" style={rot("1deg")}>
              <div className="n">02</div>
              <h4>Actual laughs</h4>
              <p>
                Comedy is the spoonful of sugar. We promise you&rsquo;ll laugh —
                probably at us.
              </p>
            </div>
            <div className="mini paste rv" style={rot("1deg")}>
              <div className="n">03</div>
              <h4>Useful lessons</h4>
              <p>
                Every story lands on something you can steal for your own next
                screwup.
              </p>
            </div>
            <div className="mini paste rv" style={rot("-1deg")}>
              <div className="n">04</div>
              <h4>Good company</h4>
              <p>
                A room full of people who&rsquo;ve also blown it. Wildly
                underrated medicine.
              </p>
            </div>
          </div>

          <div className="pull rv">
            <span
              className="stamp"
              style={{ position: "absolute", top: "-18px", left: "30px" }}
            >
              draft
            </span>
            <q>
              I have not failed. I&rsquo;ve just found 10,000 ways that
              won&rsquo;t work.
            </q>
            <div className="by">
              — stolen for the occasion, with apologies to Edison
            </div>
          </div>
        </div>
      </section>

      <section className="rsvp" id="rsvp">
        <div className="wrap">
          <div className="rsvp-grid">
            <div className="rsvp-copy rv">
              <div className="kicker">Save your seat</div>
              <h3>
                Come fail
                <br />
                in public.
              </h3>
              <div className="free">$15 a seat · spots are limited →</div>
              <ul>
                <li>One unforgettable evening of glorious mistakes</li>
                <li>Snacks, drinks, and zero judgment</li>
                <li>Limited seating — when it&rsquo;s gone, it&rsquo;s gone</li>
              </ul>
            </div>

            <RsvpForm />
          </div>
        </div>
      </section>

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

      <footer>
        <div className="wrap">
          <div className="foot">
            <div className="big rv">
              Screw<span>up</span>
              <br />
              Nights<span>.</span>
            </div>
            <div className="errata rv">
              <b>ERRATA:</b> An earlier version of this life implied that
              everything would go according to plan. We regret the error.
              <br />
              <br />
              Presented by{" "}
              <a
                href="https://inspirecolumbia.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <b>Inspire Columbia</b>
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
              <br />
              Columbia, SC · Sept 4, 2026 · $15 · made with mistakes
            </div>
          </div>
        </div>
      </footer>

      <ScrollReveal />
    </>
  );
}
