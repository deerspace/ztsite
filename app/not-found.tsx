import Link from "next/link";

export default function NotFound() {
  return (
    <section className="nf">
      <h1>Lost the front sight.</h1>
      <p className="desc">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="cta-row center" style={{ justifyContent: "center" }}>
        <Link className="btn btn-primary" href="/">
          Back to home
        </Link>
        <Link className="link-arrow" href="/shop">
          Shop the lineup <span>›</span>
        </Link>
      </div>
    </section>
  );
}
