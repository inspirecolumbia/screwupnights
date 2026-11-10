import Image from "next/image";
import { connection } from "next/server";
import Silhouette from "./silhouette";
import { EVENT, SITE, getBooking, getCurrentEvent, getEventEssentials } from "./event";

const NAV = [
  { href: "#about", label: "The experience" },
  { href: "#photos", label: "Past nights" },
  { href: "#details", label: "Good to know" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function TicketAction({ placement, booking }: {
  placement: "header" | "opening" | "experience" | "closing";
  booking: ReturnType<typeof getBooking>;
}) {
  if (!booking.available || !booking.href) {
    return <p className="booking-status"><span aria-hidden="true" />{booking.label}</p>;
  }
  return (
    <a className="button" href={booking.href} data-ticket-placement={placement}>
      Buy tickets <Arrow diagonal />
    </a>
  );
}

function CheckoutNote({ booking }: { booking: ReturnType<typeof getBooking> }) {
  if (!booking.available) return null;
  return <p className="checkout-note">Secure checkout on Zeffy.{EVENT.optionalContributionNote ? ` ${EVENT.optionalContributionNote}` : ""}</p>;
}

export default async function Home() {
  // Evaluate availability on each request so an expired event cannot stay on sale
  // in a statically generated page. Query parameters never activate ticket sales.
  await connection();
  const currentEvent = getCurrentEvent();
  const booking = getBooking(currentEvent);
  const essentials = getEventEssentials(currentEvent);
  const unannounced = currentEvent.state === "unannounced";

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header" id="top">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="ScrewUp Nights home">
            <Image src="/ScrewupPurple.png" alt="ScrewUp Nights" width={757} height={592} sizes="96px" preload />
          </a>
          <p className="header-location">A celebration of failure.<br /><span>{SITE.city}</span></p>
          <nav className="desktop-nav" aria-label="Main navigation">
            {NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="header-action">
            {booking.available ? <TicketAction placement="header" booking={booking} /> : <a className="text-link" href="#next-night">Next night <Arrow diagonal /></a>}
          </div>
          <details className="mobile-menu">
            <summary>Menu <span aria-hidden="true">+</span></summary>
            <nav aria-label="Mobile navigation">
              {NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
              <a href="#next-night">Next night <Arrow diagonal /></a>
            </nav>
          </details>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
          <div className="hero-intro">
            <p className="eyebrow"><span className="small-star" aria-hidden="true">✳</span> A live storytelling night</p>
            <h1 id="hero-title">Good stories.<br /><span>Bad decisions.</span></h1>
            <p className="hero-description">A night in {SITE.city}, where people share what went wrong—and what they learned.</p>
            <p className="hero-aside">Come to listen. Leave feeling a little more human.</p>
          </div>

          <div className="event-panel" id="next-night" aria-labelledby="event-title">
            <div className="panel-heading">
              <h2 id="event-title">The next night</h2>
              <span className="edition-note">ScrewUp Nights</span>
            </div>
            <dl className="event-essentials">
              <div><dt>When</dt><dd>{essentials.date ?? "Date to be announced"}{essentials.start && <span className="detail-line">{essentials.start} · {essentials.timezone}</span>}{essentials.doors && <span className="detail-line">Doors {essentials.doors}</span>}</dd></div>
              <div><dt>Where</dt><dd>{essentials.venue ?? SITE.city}<span className="detail-line">{essentials.address ?? "Next venue to be announced"}</span></dd></div>
              <div><dt>Tickets</dt><dd>{essentials.price ?? "Price to be announced"}{essentials.inclusions.length > 0 && <span className="detail-line">{essentials.inclusions.join(" · ")}</span>}</dd></div>
            </dl>
            <div className="panel-action"><TicketAction placement="opening" booking={booking} /><a className="text-link" href={`mailto:${SITE.email}`}>Contact us <Arrow diagonal /></a></div>
            <CheckoutNote booking={booking} />
            {!booking.available && <p className="checkout-note">{unannounced ? "The date, venue and ticket details will be posted here once confirmed." : "Check back here for the next announcement."}</p>}
          </div>

          </div>

          <figure className="hero-photo">
            <div className="photo-window">
              <Image src="/proto/n01-patio-dusk.jpg" alt="The audience listening together on a patio under string lights at a previous ScrewUp Nights show." width={1600} height={1066} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 944px) calc(100vw - 80px), (max-width: 1100px) calc((100vw - 112px) / 2), (max-width: 1328px) calc((100vw - 144px) / 2), 592px" preload />
              <span className="photo-sticker" aria-hidden="true">Perfectly<br />imperfect.</span>
            </div>
            <figcaption><span>From a previous night at TLC</span><span aria-hidden="true">01 / The good company</span></figcaption>
          </figure>
        </section>

        <div className="organizer-line shell">
          <span>Good people behind the bad decisions.</span>
          <p>Presented by <a href={SITE.organizer.url}>{SITE.organizer.name}</a>, the team behind <a href="https://tedxcongareevista.com">TEDxCongaree Vista</a>.</p>
        </div>

        <section className="experience section-space shell" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="eyebrow">01 / The experience</p>
            <h2 id="about-title">An evening for<br />the rest of the story.</h2>
            <p>The launch that tanked. The plan that fell apart. The decision that looked great—until it really didn’t.</p>
          </div>
          <div className="experience-body">
            <p className="lead">Part storytelling. Part collective sigh of relief.</p>
            <p>Speakers take the mic to share their spectacular flops, the funny bits, and what they’d do differently. You get a seat, a story, and a reminder that nobody has it all figured out.</p>
            <dl className="experience-list">
              <div><dt><span aria-hidden="true">01</span> Real stories</dt><dd>The honest version. Even the embarrassing bit.</dd></div>
              <div><dt><span aria-hidden="true">02</span> Actual laughs</dt><dd>Because sometimes all you can do is laugh about it.</dd></div>
              <div><dt><span aria-hidden="true">03</span> Useful lessons</dt><dd>Something to take into your own next attempt.</dd></div>
              <div><dt><span aria-hidden="true">04</span> Good company</dt><dd>A room full of people who’ve been there, too.</dd></div>
            </dl>
            {booking.available && <div className="supporting-cta"><p>{essentials.price}{essentials.inclusions.length > 0 ? ` · ${essentials.inclusions.join(" · ")}` : ""}</p><TicketAction placement="experience" booking={booking} /><CheckoutNote booking={booking} /></div>}
          </div>
        </section>

        <section className="photo-section" id="photos" aria-labelledby="photos-title">
          <div className="shell section-space">
            <div className="photo-heading"><div><p className="eyebrow">02 / From the floor</p><h2 id="photos-title">You had to be there.<br /><span>Next time, you can be.</span></h2></div><p>Real people. Real stories.<br />A few frames from a previous night.</p></div>
            <div className="photo-grid">
              <figure className="story-photo"><Image src="/proto/n01-mid-confession.jpg" alt="A speaker holding a microphone on the outdoor stage at TLC." width={1400} height={933} sizes="(max-width: 600px) 100vw, 60vw" /><figcaption><span>01</span> The story behind the setback.</figcaption></figure>
              <figure className="crowd-photo"><Image src="/proto/n01-face-you-make.jpg" alt="A speaker addressing the seated audience beneath pennant flags." width={866} height={1300} sizes="(max-width: 600px) 100vw, 35vw" /><figcaption><span>02</span> A room that gets it.</figcaption></figure>
            </div>
            <div className="lineup" id="speakers"><p className="eyebrow">Next on the mic</p><div><h3>Speaker lineup to be announced.</h3><p>We’ll introduce the speakers here when they’re confirmed.</p></div><ul className="speaker-list" aria-hidden="true">{[0, 1, 2, 3].map((slot) => <li className="speaker-icon" key={slot}><Silhouette /></li>)}</ul></div>
          </div>
        </section>

        <section className="details-section section-space shell" id="details" aria-labelledby="details-title">
          <div><p className="eyebrow">03 / Good to know</p><h2 id="details-title">Less guesswork.<br />More good nights.</h2><p className="details-intro">Something else on your mind?<br /><a className="text-link" href={`mailto:${SITE.email}`}>Ask the organizers <Arrow diagonal /></a></p></div>
          <div className="questions">
            <details open><summary>Do I have to tell a story?</summary><div><p>No. Come to listen to the speakers, laugh, and take it all in. Attending is not signing up to speak.</p></div></details>
            <details><summary>When and where is the next night?</summary><div><p>{essentials.date && essentials.venue ? `${essentials.date} at ${essentials.venue}. ${essentials.address ?? ""}` : "The next date and venue haven’t been announced yet. We’ll update the details at the top of this page when they’re confirmed."}</p>{essentials.start && <p>The show starts at {essentials.start} ({essentials.timezone}){essentials.doors ? `, with doors at ${essentials.doors}` : ""}.</p>}</div></details>
            <details><summary>{booking.available ? "How do I buy a ticket?" : "Are tickets available?"}</summary><div><p>{booking.available ? "Use any Buy tickets button on this page to go directly to our Zeffy checkout. You’re booking to attend and listen to the speakers." : unannounced ? "Tickets aren’t available here yet. Once the next event is confirmed, you’ll find the price, inclusions and a direct booking link on this page." : currentEvent.state === "sold-out" ? "This night is sold out. Check back here for the next announcement." : "Tickets are currently unavailable. Please contact the organizers for the latest information."}</p><CheckoutNote booking={booking} /></div></details>
            <details><summary>Who’s behind ScrewUp Nights?</summary><div><p>We’re presented by <a href={SITE.organizer.url}>{SITE.organizer.name}</a>, the team behind <a href="https://tedxcongareevista.com">TEDxCongaree Vista</a>. Same curiosity about people. A little more room for things going wrong.</p></div></details>
          </div>
        </section>

        <section className="closing" aria-labelledby="closing-title">
          <div className="shell closing-inner"><div><p className="eyebrow">See you at the next one</p><h2 id="closing-title">Nobody’s perfect.<br />That’s the point.</h2><p>Come for the stories. Stay for the feeling<br className="desktop-break" /> that you’re in very good company.</p></div><div className="closing-booking"><p className="closing-label">{unannounced ? "Next night to be announced" : "Your next night out"}</p>{!unannounced && <p>{essentials.date}<br />{essentials.price}{essentials.inclusions.length > 0 ? ` · ${essentials.inclusions.join(" · ")}` : ""}</p>}<TicketAction placement="closing" booking={booking} /><CheckoutNote booking={booking} /><a className="text-link" href={`mailto:${SITE.email}`}>Contact us <Arrow diagonal /></a></div></div>
        </section>
      </main>
      <footer className="site-footer"><div className="shell footer-inner"><a href={SITE.organizer.url}><Image src="/InspireWhiteLogo.png" alt="Inspire Columbia" width={490} height={192} sizes="140px" /></a><p>Making a little more room for being human.<br /><span>{SITE.name} · {SITE.city}</span></p><a className="text-link" href="#top">Back to top <span aria-hidden="true">↑</span></a></div></footer>
    </>
  );
}
