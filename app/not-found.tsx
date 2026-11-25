import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | ScrewUp Nights",
};

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="wrap">
        <Link href="/" aria-label="ScrewUp Nights home">
          <Image
            src="/ScrewupPurple.png"
            alt=""
            width={757}
            height={592}
            sizes="160px"
            className="not-found-logo"
          />
        </Link>
        <h1 className="h2">Page not found</h1>
        <p>
          That link doesn&rsquo;t go anywhere. Everything about the next
          ScrewUp Nights is on the homepage.
        </p>
        <Link className="btn btn-primary" href="/">
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
