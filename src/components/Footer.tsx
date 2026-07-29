import Link from "next/link";

const LINKS = {
  Shiva: [
    { label: "Shiv Chalisa",     href: "/chalisa/shiv-chalisa" },
    { label: "Shiv Aarti",       href: "/aarti/shiv-aarti" },
    { label: "Shiv Tandav",      href: "/stotra/shiv-tandav-stotram" },
    { label: "Mahamrityunjaya",  href: "/mantra/mahamrityunjaya-mantra" },
  ],
  Hanuman: [
    { label: "Hanuman Chalisa",  href: "/chalisa/hanuman-chalisa" },
    { label: "Hanuman Aarti",    href: "/aarti/hanuman-aarti" },
  ],
  Devi: [
    { label: "Durga Chalisa",    href: "/chalisa/durga-chalisa" },
    { label: "Durga Aarti",      href: "/aarti/durga-aarti" },
    { label: "Lakshmi Aarti",    href: "/aarti/lakshmi-aarti" },
  ],
  Others: [
    { label: "Ganesh Chalisa",   href: "/chalisa/ganesh-chalisa" },
    { label: "Ganesh Aarti",     href: "/aarti/ganesh-aarti" },
    { label: "Gayatri Mantra",   href: "/mantra/gayatri-mantra" },
    { label: "Vishnu Aarti",     href: "/aarti/vishnu-aarti" },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-16" style={{ background: "#2a1c12", color: "#d8c8b8" }}>
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wide">
                {section}
              </h3>
              <ul className="space-y-1.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-orange-200/70 hover:text-orange-200 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-orange-200/50">
          <p>
            <span className="text-orange-200 font-bold text-sm">🕉️ Shiv Chalisa</span>
            {" "}— Devotional texts in Hindi, English & Sanskrit
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link href="/about" className="hover:text-orange-200 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-orange-200 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-orange-200 transition-colors">Privacy</Link>
            <Link href="/deity" className="hover:text-orange-200 transition-colors">Deities</Link>
            <Link href="/sitemap.xml" className="hover:text-orange-200 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
