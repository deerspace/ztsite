import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Instructional Videos",
  description: "Disassembly, installation, and maintenance walkthroughs for ZEV firearms and components.",
};

const VIDEOS = [
  { title: "OZ9 V2 Field Strip & Reassembly", meta: "Disassembly · 6:12", img: "/products/oz9-elite-right.jpg" },
  { title: "Installing a PRO Curved Face Trigger", meta: "Install · 8:40", img: "/products/oz9-elite-left.jpg" },
  { title: "FDP: Deploy, Fold & Store", meta: "Overview · 4:55", img: "/products/fdp-carbine-ls34.jpg" },
  { title: "Citadel Slide & Optic Mounting", meta: "Install · 7:21", img: "/products/oz9-combat-hero.jpg" },
  { title: "PRO Match Barrel Swap", meta: "Install · 3:48", img: "/products/oz9-hypercomp-detail.jpg" },
  { title: "Cleaning & Lubrication Basics", meta: "Maintenance · 9:03", img: "/products/oz9-hypercomp-hero.jpg" },
  { title: "Hypercomp: How the Porting Works", meta: "Tech · 5:30", img: "/products/oz9-hypercomp-angle.jpg" },
  { title: "Core Elite Rifle Setup", meta: "Overview · 11:18", img: "/products/rifle-core-elite.jpg" },
  { title: "Zeroing Your Red Dot", meta: "Range · 6:45", img: "/products/oz9-combat-angle.jpg" },
];

export default function VideosPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Support</p>
        <h1>Instructional Videos</h1>
        <p className="lede">Field strips, installs, and maintenance — straight from the bench.</p>
      </div>

      <div className="video-grid">
        {VIDEOS.map((v) => (
          <a key={v.title} className="video-card" href="#" aria-label={`Play: ${v.title}`}>
            <div className="video-thumb">
              <Image src={v.img} alt="" width={480} height={270} sizes="(max-width: 834px) 100vw, 380px" />
              <span className="video-play" aria-hidden="true" />
            </div>
            <h3>{v.title}</h3>
            <p className="video-meta">{v.meta}</p>
          </a>
        ))}
      </div>
    </>
  );
}
