"use client";

import { useState } from "react";

// Concept newsletter signup. Does not submit anywhere — it acknowledges
// locally so the interaction feels complete without sending data.
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <div className="news">
      <div className="news-copy">
        <h3>Get the drop.</h3>
        <p>New releases, restocks, and field notes. No spam, ever.</p>
      </div>
      {done ? (
        <p className="news-thanks">Thanks — you&apos;re on the list. ✓</p>
      ) : (
        <form className="news-form" onSubmit={submit}>
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <button className="btn btn-dark" type="submit">Subscribe</button>
        </form>
      )}
    </div>
  );
}
