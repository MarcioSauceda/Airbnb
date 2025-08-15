import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const { loginSuccess } = useAuth();
    const navigate = useNavigate();

const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
        const { token } = await authApi.login(email, password);
        loginSuccess(token);
        navigate("/");
    } catch (e) {
        setErr(e.message);
    } finally {
        setLoading(false);
    }
};

return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50/40 to-white flex items-start justify-center">
        <div className="mx-auto w-full max-w-sm py-4 mt-12 flex flex-col justify-center">
        <h1 className="mb-4 text-2xl font-bold">Ingresar</h1>
        <form onSubmit={onSubmit} className="space-y-3">
        <input
            className="w-full rounded-lg border p-2"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
        />
        <input
            className="w-full rounded-lg border p-2"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
        />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button
            disabled={loading}
            className="w-full rounded-lg bg-black p-2 text-white hover:opacity-90 disabled:opacity-60"
        >
            {loading ? "Entrando..." : "Entrar"}
        </button>
        </form>
        <p className="mt-3 text-sm text-gray-600">
        ¿No tienes cuenta? <Link className="underline" to="/register">Regístrate</Link>
        </p>
        </div>
    </main>
);
}
