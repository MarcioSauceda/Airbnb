import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';

export default function HostNewLayout({ title, children, onSaveExit, progress = 0 }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Top bar (simple) */}
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
        </Link>
        <div className="flex items-center gap-2">
          <button className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
            ¿Tienes alguna duda?
          </button>
          <button
            onClick={onSaveExit}
            className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Guardar y salir
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="mt-8 text-4xl font-semibold">{title}</h1>

      {/* Content */}
      <div className="mt-6">{children}</div>

      {/* Progress (fijo abajo) */}
      <div className="fixed inset-x-0 bottom-14 mx-auto max-w-4xl">
        <div className="h-1 w-full rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-gray-900 transition-all"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
