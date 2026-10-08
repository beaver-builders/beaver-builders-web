import Link from "next/link";
import { site } from "@/lib/site-data";
import Brand from "./Brand";
import type { Project } from "@/lib/types";

const company = [
  { href: "/#about", label: "Our history" },
  { href: "/#values", label: "Vision & values" },
  { href: "/#care", label: "We care" },
  { href: "/#careers", label: "Careers" },
];

type FooterProps = {
  projects: Project[];
};

export default function Footer({ projects }: FooterProps) {
  const work = [
    { href: "/#services", label: "Services" },
    { href: "/#projects", label: "Project register" },
    ...projects
      .slice(0, 3)
      .map((p) => ({
        href: `/projects/${p.slug}`,
        label: p.title,
      })),
  ];

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="f-brand">
            <Link
              className="brand"
              href="/"
              aria-label={`${site.name}, home`}
            >
              <Brand />
            </Link>

            <p className="f-tag">
              Build green.
              <br />
              Craft dreams.
            </p>

            <p className="f-about">
              Construction, consultancy, real estate, equipment rental and
              trading across the Maldives.
            </p>
          </div>

          <nav className="f-col" aria-labelledby="f-company">
            <h2 className="fh" id="f-company">
              Company
            </h2>

            <ul>
              {company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="f-col" aria-labelledby="f-work">
            <h2 className="fh" id="f-work">
              Work
            </h2>

            <ul>
              {work.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="f-col f-contact">
            <h2 className="fh">Contact</h2>

            <a
              className="f-big"
              href={`tel:${site.phone.replace(/\s/g, "")}`}
            >
              {site.phone}
            </a>

            <a className="f-big" href={`mailto:${site.email}`}>
              {site.email}
            </a>

            <address>
              {site.addressLines.map((l, i) => (
                <span key={l}>
                  {i > 0 && <br />}
                  {l}
                </span>
              ))}
            </address>
          </div>
        </div>

        <dl className="f-sheet">
          <div>
            <dt>Company</dt>
            <dd>{site.name} Pvt Ltd</dd>
          </div>

          <div>
            <dt>Registration</dt>
            <dd>C-0629/2016</dd>
          </div>

          <div>
            <dt>Head office</dt>
            <dd>Malé, Maldives</dd>
          </div>

          <div>
            <dt>Copyright</dt>
            <dd>© {new Date().getFullYear()}</dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}