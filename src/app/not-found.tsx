import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-4">🕉️</div>
      <h1
        className="font-extrabold mb-2"
        style={{ fontSize: "2rem", color: "var(--deep)" }}
      >
        Page Not Found
      </h1>
      <p className="mb-6 max-w-sm" style={{ color: "var(--muted)" }}>
        The page you're looking for doesn't exist. Try searching for what you need.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full text-white font-bold text-sm"
          style={{ background: "linear-gradient(135deg,#ff7a18,#b23a00)" }}
        >
          Go Home
        </Link>
        <Link
          href="/chalisa"
          className="px-6 py-2.5 rounded-full font-bold text-sm chip"
        >
          Browse Chalisa
        </Link>
        <Link
          href="/aarti"
          className="px-6 py-2.5 rounded-full font-bold text-sm chip"
        >
          Browse Aarti
        </Link>
      </div>
    </div>
  );
}
