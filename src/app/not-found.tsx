import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#050505" }}>
      <div className="glass-card rounded-2xl p-10 text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: "#D4AF37" }}>
          404
        </h1>
        <p className="text-gray-400 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn-gold px-6 py-2 rounded-lg font-medium inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
