"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RSVP_TO = "info@inspirecolumbia.org";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [screwup, setScrewup] = useState("");
  const [errors, setErrors] = useState<{ name: boolean; email: boolean }>({
    name: false,
    email: false,
  });
  const [submitted, setSubmitted] = useState(false);

  // Build the prefilled mailto link from the current form values.
  function buildMailto() {
    const subject = `Screwup Nights RSVP — ${name.trim()}`;
    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      "",
      "My worst screwup:",
      screwup.trim() || "(declined to share — no pressure)",
      "",
      "Count me in for Screwup Nights — Sept 2, 2026, Columbia, SC.",
    ].join("\n");
    return `mailto:${RSVP_TO}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  // Returns true when valid; otherwise records which fields are in error.
  function validate() {
    const next = {
      name: name.trim().length === 0,
      email: !EMAIL_RE.test(email.trim()),
    };
    setErrors(next);
    return !next.name && !next.email;
  }

  // Clicking the mailto button: block navigation if invalid, else let the
  // browser hand off to the mail client and show the confirmation.
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!validate()) {
      e.preventDefault();
      return;
    }
    setSubmitted(true);
  }

  // Pressing Enter inside a field: validate, then open the mail client.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validate()) {
      window.location.href = buildMailto();
      setSubmitted(true);
    }
  }

  return (
    <form className="paste rv" id="rsvpForm" noValidate onSubmit={handleSubmit}>
      <span
        className="tape"
        style={{ top: "-15px", right: "30px", transform: "rotate(5deg)" }}
      />

      {submitted ? (
        <div className="success show" id="success">
          <span className="stamp">You&rsquo;re in!</span>
          <p>
            Your email&rsquo;s ready to send — hit send in your mail app and
            we&rsquo;ll see you September 2nd. Bring the worst version of a good
            story.
          </p>
        </div>
      ) : (
        <div className="formfields">
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jane Q. Public"
              className={errors.name ? "err" : undefined}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: false }));
              }}
            />
            <div className={`errmsg${errors.name ? " show" : ""}`} id="err-name">
              We at least need something to call you.
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className={errors.email ? "err" : undefined}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((p) => ({ ...p, email: false }));
              }}
            />
            <div
              className={`errmsg${errors.email ? " show" : ""}`}
              id="err-email"
            >
              That email looks like one of your screwups.
            </div>
          </div>

          <div className="field">
            <label htmlFor="screwup">
              Your worst screwup{" "}
              <span className="opt">(optional, no pressure)</span>
            </label>
            <textarea
              id="screwup"
              name="screwup"
              placeholder="Once I…"
              value={screwup}
              onChange={(e) => setScrewup(e.target.value)}
            />
          </div>

          <a className="btn" href={buildMailto()} onClick={handleClick}>
            Count me in →
          </a>
        </div>
      )}
    </form>
  );
}
