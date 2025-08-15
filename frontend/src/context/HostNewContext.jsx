import { createContext, useContext, useEffect, useState } from "react";

const HostNewCtx = createContext(null);
const LS_KEY = "host-new-draft";

const defaultDraft = {
  id_tipo_alojamiento: null,
  country: "HN",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postalCode: "",
  huespedes: 1,
  recamaras: 1,
  camas: 1,
  banos: 1,
  titulo: "",
  descripcion: "",
  precio_fijo: "",
  listingId: null,
};

export function HostNewProvider({ children }) {
  const [draft, setDraft] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? { ...defaultDraft, ...JSON.parse(raw) } : defaultDraft;
    } catch {
      return defaultDraft;
    }
  });

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(draft)); } catch {}
  }, [draft]);

  const setField = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  const inc = (k) => setDraft((d) => ({ ...d, [k]: Math.max(0, Number(d[k] || 0) + 1) }));
  const dec = (k) => setDraft((d) => ({ ...d, [k]: Math.max(0, Number(d[k] || 0) - 1) }));
  const reset = () => {
    setDraft(defaultDraft);
    try { localStorage.removeItem(LS_KEY); } catch {}
  };

  return (
    <HostNewCtx.Provider value={{ draft, setField, inc, dec, reset }}>
      {children}
    </HostNewCtx.Provider>
  );
}

export function useHostNew() {
  const ctx = useContext(HostNewCtx);
  if (!ctx) throw new Error("useHostNew must be used within HostNewProvider");
  return ctx;
}
