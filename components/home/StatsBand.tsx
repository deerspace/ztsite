import Reveal from "@/components/ux/Reveal";
import CountUp from "@/components/ux/CountUp";

const STATS = [
  { value: 4, label: "tapered vertical ports on Hypercomp" },
  { value: 3, label: "slide lengths, one modular receiver" },
  { value: 2, label: "grip sizes, fitted to the shooter" },
  { value: 100, label: "% machined in the USA" },
];

export default function StatsBand() {
  return (
    <section className="stats">
      <Reveal className="stats-head">
        <h2>Engineered to the thousandth.</h2>
        <p className="desc">
          Every ZEV component begins as billet and ends as a tolerance. Designed, machined, and
          assembled in the USA.
        </p>
      </Reveal>
      <div className="stats-row">
        {STATS.map((stat) => (
          <Reveal className="stat" key={stat.label}>
            <CountUp target={stat.value} />
            <span className="stat-label">{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
