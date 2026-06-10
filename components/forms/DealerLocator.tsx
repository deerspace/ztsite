"use client";

import { useMemo, useState } from "react";

interface Dealer {
  name: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  tag?: string;
}

// Representative dealer directory for the concept. A live build would query a
// real locator API and render a map.
const DEALERS: Dealer[] = [
  { name: "Cascade Defense", city: "Centralia", state: "WA", zip: "98531", phone: "(360) 555-0142", tag: "Flagship" },
  { name: "Rainier Arms", city: "Auburn", state: "WA", zip: "98001", phone: "(253) 555-0188" },
  { name: "Sportsman's Reserve", city: "Boise", state: "ID", zip: "83702", phone: "(208) 555-0119" },
  { name: "Lone Star Firearms", city: "Austin", state: "TX", zip: "78701", phone: "(512) 555-0173", tag: "Range" },
  { name: "Gulf Coast Guns", city: "Tampa", state: "FL", zip: "33602", phone: "(813) 555-0150" },
  { name: "Front Range Tactical", city: "Denver", state: "CO", zip: "80202", phone: "(303) 555-0164" },
  { name: "Liberty Outfitters", city: "Nashville", state: "TN", zip: "37203", phone: "(615) 555-0127" },
  { name: "Granite State Shooting", city: "Manchester", state: "NH", zip: "03101", phone: "(603) 555-0191", tag: "Range" },
];

export default function DealerLocator() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return DEALERS;
    return DEALERS.filter((d) =>
      [d.name, d.city, d.state, d.zip].some((f) => f.toLowerCase().includes(query)),
    );
  }, [q]);

  return (
    <>
      <form className="dealer-search" onSubmit={(e) => e.preventDefault()} role="search">
        <input
          type="search"
          placeholder="Search by city, state, or ZIP"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search dealers"
        />
      </form>

      {results.length === 0 ? (
        <p className="form-note" style={{ textAlign: "center", marginTop: 36, maxWidth: "none" }}>
          No dealers match “{q.trim()}”. You can always order online and ship to any licensed FFL.
        </p>
      ) : (
        <div className="dealer-list">
          {results.map((d) => (
            <div className="dealer-card" key={d.name + d.zip}>
              {d.tag && <p className="dealer-tag">{d.tag}</p>}
              <h3>{d.name}</h3>
              <p>{d.city}, {d.state} {d.zip}</p>
              <p>{d.phone}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
