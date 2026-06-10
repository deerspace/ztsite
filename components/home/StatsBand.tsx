import Reveal from "@/components/ux/Reveal";
import CountUp from "@/components/ux/CountUp";

const STATS = [
  { value: 4, label: "tapered ports on Hypercomp" },
  { value: 3, label: "slide lengths, one receiver" },
  { value: 2, label: "grip sizes, fitted to you" },
  { value: 100, label: "% machined in the USA" },
];

export default function StatsBand() {
  return (
    <section className="section section--soft stats">
      <Reveal>
        <h2 className="headline">Engineered to the thousandth.</h2>
        <p className="lede" style={{ maxWidth: "560px", margin: "16px auto 0" }}>
          Every ZEV component begins as billet and ends as a tolerance. Designed, machined, and
          assembled in the USA.
        </p>
      </Reveal>
      <div className="stats-row">
        {STATS.map((s) => (
          <Reveal className="stat" key={s.label}>
            <CountUp target={s.value} />
            <span className="stat-label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
