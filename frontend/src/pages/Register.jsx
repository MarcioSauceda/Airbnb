import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const [form, setForm] = useState({
        nombre: "", apellido: "", email: "", password: "",
        codigo_tipo_usuario: 2, // p.ej. 1=anfitrión, 2=huésped, ajustaremos con catálogos
    });
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const { loginSuccess } = useAuth();
    const navigate = useNavigate();

function update(key, val){ setForm(prev => ({ ...prev, [key]: val })); }

const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
        await authApi.register(form);
      // tras registro, podrías forzar login con /login
        const { token } = await authApi.login(form.email, form.password);
        loginSuccess(token);
        navigate("/");
    } catch (e) {
        setErr(e.message);
    } finally { setLoading(false); }
};

  return (
    <main className="container">
      <div className="mx-auto w-full max-w-sm py-8">
      <h1 className="mb-4 text-2xl font-bold">Crear cuenta</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded-lg border p-2" placeholder="Nombre"
          value={form.nombre} onChange={(e)=>update("nombre", e.target.value)} />
        <input className="w-full rounded-lg border p-2" placeholder="Apellido"
          value={form.apellido} onChange={(e)=>update("apellido", e.target.value)} />
        <input className="w-full rounded-lg border p-2" type="email" placeholder="Email"
          value={form.email} onChange={(e)=>update("email", e.target.value)} />
        <input className="w-full rounded-lg border p-2" type="password" placeholder="Contraseña"
          value={form.password} onChange={(e)=>update("password", e.target.value)} />
        <button disabled={loading}
          className="w-full rounded-lg bg-black p-2 text-white hover:opacity-90 disabled:opacity-60">
          {loading ? "Creando..." : "Crear cuenta"}
        </button>
        {err && <p className="text-sm text-red-600">{err}</p>}
      </form>
      </div> 
    </main>
  );
}
