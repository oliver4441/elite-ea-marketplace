export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#050505" }}>
      <div className="text-center">
        <div
          className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4"
          style={{ borderColor: "rgba(212,175,55,0.2)", borderTopColor: "#D4AF37" }}
        />
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}
