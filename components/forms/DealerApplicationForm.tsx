"use client";

import { useState } from "react";

// Concept dealer-application form — acknowledges locally, sends nothing.
export default function DealerApplicationForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="form-thanks">
        <h3>Application received. ✓</h3>
        <p>Thanks for your interest in carrying ZEV. Our dealer team will be in touch within 2–3 business days.</p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <div className="form-grid">
        <div className="field full">
          <label htmlFor="d-biz">Business name</label>
          <input id="d-biz" required />
        </div>
        <div className="field">
          <label htmlFor="d-ffl">FFL number</label>
          <input id="d-ffl" required placeholder="X-XX-XXX-XX-XX-XXXXX" />
        </div>
        <div className="field">
          <label htmlFor="d-type">Business type</label>
          <select id="d-type" required defaultValue="">
            <option value="" disabled>Choose…</option>
            <option>Retail storefront</option>
            <option>Online retailer</option>
            <option>Range / training</option>
            <option>Distributor</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="d-name">Contact name</label>
          <input id="d-name" required />
        </div>
        <div className="field">
          <label htmlFor="d-email">Email</label>
          <input id="d-email" type="email" required />
        </div>
        <div className="field">
          <label htmlFor="d-phone">Phone</label>
          <input id="d-phone" type="tel" required />
        </div>
        <div className="field">
          <label htmlFor="d-site">Website (optional)</label>
          <input id="d-site" />
        </div>
        <div className="field full">
          <label htmlFor="d-msg">Tell us about your shop (optional)</label>
          <textarea id="d-msg" rows={4} />
        </div>
      </div>
      <div className="form-actions">
        <button className="btn btn-primary" type="submit">Submit application</button>
      </div>
      <p className="form-note">
        A valid Federal Firearms License is required to become a ZEV dealer. We&apos;ll verify your FFL
        before activating a wholesale account.
      </p>
    </form>
  );
}
