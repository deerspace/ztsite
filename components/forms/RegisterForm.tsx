"use client";

import { useState } from "react";

const PRODUCTS = ["OZ9 V2 Elite", "OZ9 V2 Combat", "OZ9 V2 Hypercomp", "FDP", "Core Elite Rifle", "Core Elite Pistol", "Slide", "Trigger", "Barrel", "Other"];

// Concept product-registration form — acknowledges locally, sends nothing.
export default function RegisterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="form-thanks">
        <h3>You&apos;re registered. ✓</h3>
        <p>Thanks — your product is on file and your lifetime warranty is active.</p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <div className="form-grid">
        <div className="field full">
          <label htmlFor="r-product">Product</label>
          <select id="r-product" required defaultValue="">
            <option value="" disabled>Choose a product…</option>
            {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="r-serial">Serial number</label>
          <input id="r-serial" required placeholder="e.g. ZS01-…" />
        </div>
        <div className="field">
          <label htmlFor="r-date">Purchase date</label>
          <input id="r-date" type="date" required />
        </div>
        <div className="field">
          <label htmlFor="r-first">First name</label>
          <input id="r-first" required />
        </div>
        <div className="field">
          <label htmlFor="r-last">Last name</label>
          <input id="r-last" required />
        </div>
        <div className="field full">
          <label htmlFor="r-email">Email</label>
          <input id="r-email" type="email" required />
        </div>
        <div className="field full">
          <label htmlFor="r-dealer">Where did you purchase? (optional)</label>
          <input id="r-dealer" placeholder="Dealer or zevtechnologies.com" />
        </div>
      </div>
      <div className="form-actions">
        <button className="btn btn-primary" type="submit">Register product</button>
      </div>
      <p className="form-note">
        Registration is optional — your lifetime warranty applies whether or not you register. We use
        this only to speed up warranty service and recalls.
      </p>
    </form>
  );
}
