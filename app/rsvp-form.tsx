"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [screwup, setScrewup] = useState("");
  const [errors, setErrors] = useState<{ name: boolean; email: boolean }>({
    name: false,
    email: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = {
      name: name.trim().length === 0,
      email: !EMAIL_RE.test(email.trim()),
    };
    setErrors(next);
    if (!next.name && !next.email) {
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
            Confirmation sent (probably). See you September 4th — bring the worst
            version of a good story.
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

          <button type="submit" className="btn">
            Count me in →
          </button>
        </div>
      )}
    </form>
  );
}
