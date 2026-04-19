import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label-meta">Correspondence</p>
            <p className="mt-4 font-serif text-2xl text-ink">Dr Jayakrishna S S</p>
            <p className="mt-2 text-sm text-ink-muted">
              AI · Phytopathology · Computer Vision
            </p>
            <a
              href="mailto:jayakrishnascientist@gmail.com"
              className="mt-6 inline-block link-underline text-sm text-ink"
            >
              jayakrishnascientist@gmail.com
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="label-meta">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/research" className="text-ink-soft hover:text-ink">Research</Link></li>
              <li><Link to="/publications" className="text-ink-soft hover:text-ink">Publications</Link></li>
              <li><Link to="/projects" className="text-ink-soft hover:text-ink">Projects</Link></li>
              <li><Link to="/about" className="text-ink-soft hover:text-ink">About</Link></li>
              <li><Link to="/contact" className="text-ink-soft hover:text-ink">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="label-meta">Profiles</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://scholar.google.com/citations?user=vaXil9UAAAAJ&hl=en"
                  target="_blank" rel="noreferrer"
                  className="text-ink-soft hover:text-ink"
                >
                  Google Scholar ↗
                </a>
              </li>
              <li>
                <a
                  href="https://orcid.org/0000-0002-5906-9163"
                  target="_blank" rel="noreferrer"
                  className="text-ink-soft hover:text-ink"
                >
                  ORCID 0000-0002-5906-9163 ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/dr-jayakrishna-s-s-b1811a27a/"
                  target="_blank" rel="noreferrer"
                  className="text-ink-soft hover:text-ink"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-border pt-8 text-xs text-ink-muted md:flex-row">
          <p>© {new Date().getFullYear()} Dr Jayakrishna S S. All rights reserved.</p>
          <p className="font-mono">Postdoc · IIT Delhi</p>
        </div>
      </div>
    </footer>
  );
}
