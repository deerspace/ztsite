"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Result {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string | null;
  href: string;
}

const SUGGESTIONS = ["OZ9", "FDP", "Hypercomp", "Slides", "Triggers", "Barrels"];

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Focus on open, restore on close, lock scroll, Escape to close.
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 60);
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    document.body.style.overflow = "";
    setQuery("");
    setResults([]);
    lastFocused.current?.focus?.();
  }, [open, onClose]);

  // Debounced search.
  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (q.length < 1) { setResults([]); setLoading(false); return; }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = (await res.json()) as { results: Result[] };
        setResults(data.results);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 180);
    return () => clearTimeout(t);
  }, [query, open]);

  return (
    <div className={`search-root${open ? " open" : ""}`} aria-hidden={!open} role="dialog" aria-label="Search">
      <div className="search-overlay" onClick={onClose} />
      <div className="search-panel">
        <div className="search-bar">
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" className="search-bar-icon">
            <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search the lineup…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
          <button className="search-cancel" onClick={onClose}>Cancel</button>
        </div>

        <div className="search-body">
          {query.trim().length < 1 ? (
            <div className="search-suggest">
              <p className="search-suggest-label">Popular searches</p>
              <div className="search-chips">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="search-chip" onClick={() => setQuery(s)}>{s}</button>
                ))}
              </div>
            </div>
          ) : loading && results.length === 0 ? (
            <p className="search-status">Searching…</p>
          ) : results.length === 0 ? (
            <p className="search-status">No matches for “{query.trim()}”.</p>
          ) : (
            <ul className="search-results">
              {results.map((r) => (
                <li key={r.id}>
                  <Link href={r.href} className="search-result" onClick={onClose}>
                    <span className="search-thumb">
                      {r.image && <Image src={r.image} alt="" width={56} height={56} />}
                    </span>
                    <span className="search-result-text">
                      <span className="search-result-name">{r.name}</span>
                      <span className="search-result-cat">{r.category}</span>
                    </span>
                    <span className="search-result-price">{r.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
