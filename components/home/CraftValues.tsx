import Reveal from "@/components/ux/Reveal";
import { WarrantyIcon, UsaIcon, TargetIcon } from "@/components/art/CraftIcons";

const VALUES = [
  {
    icon: <WarrantyIcon />,
    title: "Lifetime warranty",
    body: "Every component we machine is guaranteed for life. No receipts, no fine print.",
  },
  {
    icon: <UsaIcon />,
    title: "Built in the USA",
    body: "Designed and machined in Centralia, Washington — from billet to bench to box.",
  },
  {
    icon: <TargetIcon />,
    title: "Proven in competition",
    body: "Born on the match circuit, carried on duty. Performance you can verify on a timer.",
  },
];

export default function CraftValues() {
  return (
    <section className="craft">
      <div className="craft-inner">
        {VALUES.map((value) => (
          <Reveal className="craft-item" key={value.title}>
            {value.icon}
            <h4>{value.title}</h4>
            <p>{value.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
