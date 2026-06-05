"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Password errata. Riprova.");
    }
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(160deg, #3D1F0D 0%, #6B3A20 60%, #C4622D 100%)",
      }}
    >
      <div className="bg-crema rounded-2xl shadow-2xl p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-oro text-4xl mb-3">✝</div>
          <h1 className="text-2xl text-marrone">Area Riservata</h1>
          <p className="text-marrone-medio text-sm mt-2 opacity-70">
            Inserisci la password per accedere al pannello admin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-marrone-medio mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-crema-scuro bg-crema focus:outline-none focus:border-primario text-marrone text-sm"
              placeholder="••••••••••••"
              required
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primario text-crema font-semibold rounded-lg hover:bg-primario-scuro transition-colors disabled:opacity-50 tracking-wide"
          >
            {loading ? "Accesso..." : "Accedi"}
          </button>
        </form>
      </div>
    </div>
  );
}
