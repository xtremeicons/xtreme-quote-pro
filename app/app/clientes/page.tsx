"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

type Language = "es" | "en";

type Client = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;
};

const translations = {
  es: {
    back: "← Regresar al inicio",
    eyebrow: "XTREME ICONS AGENCY",
    title: "Clientes",
    subtitle: "Guarda, busca y administra la información de tus clientes.",
    total: "Clientes guardados",
    search: "Buscar por nombre, empresa, teléfono o correo",
    newClient: "Nuevo cliente",
    editClient: "Editar cliente",
    name: "Nombre del cliente",
    company: "Empresa",
    phone: "Teléfono",
    email: "Correo",
    notes: "Notas",
    save: "Guardar cliente",
    update: "Actualizar cliente",
    cancel: "Cancelar",
    noClients: "Todavía no hay clientes guardados.",
    noResults: "No se encontraron clientes.",
    edit: "Editar",
    remove: "Eliminar",
    deleteConfirm: "¿Seguro que deseas eliminar este cliente?",
    required: "Escribe al menos el nombre del cliente.",
    saved: "Cliente guardado correctamente.",
    updated: "Cliente actualizado correctamente.",
    deleted: "Cliente eliminado.",
    optional: "Opcional",
  },
  en: {
    back: "← Back to home",
    eyebrow: "XTREME ICONS AGENCY",
    title: "Customers",
    subtitle: "Save, search, and manage your customer information.",
    total: "Saved customers",
    search: "Search by name, company, phone, or email",
    newClient: "New customer",
    editClient: "Edit customer",
    name: "Customer name",
    company: "Company",
    phone: "Phone",
    email: "Email",
    notes: "Notes",
    save: "Save customer",
    update: "Update customer",
    cancel: "Cancel",
    noClients: "No customers have been saved yet.",
    noResults: "No customers found.",
    edit: "Edit",
    remove: "Delete",
    deleteConfirm: "Are you sure you want to delete this customer?",
    required: "Enter at least the customer's name.",
    saved: "Customer saved successfully.",
    updated: "Customer updated successfully.",
    deleted: "Customer deleted.",
    optional: "Optional",
  },
} as const;

const emptyForm = {
  name: "",
  company: "",
  phone: "",
  email: "",
  notes: "",
};

export default function ClientsPage() {
  const [language, setLanguage] = useState<Language>("es");
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const t = translations[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("xqs-language");
    if (savedLanguage === "es" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }

    try {
      const savedClients = window.localStorage.getItem("xqs-clients");
      if (savedClients) {
        const parsed = JSON.parse(savedClients) as Client[];
        if (Array.isArray(parsed)) setClients(parsed);
      }
    } catch {
      setClients([]);
    }
  }, []);

  function changeLanguage(next: Language) {
    setLanguage(next);
    window.localStorage.setItem("xqs-language", next);
  }

  function persist(nextClients: Client[]) {
    setClients(nextClients);
    window.localStorage.setItem("xqs-clients", JSON.stringify(nextClients));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function showMessage(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2600);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();

    if (!name) {
      showMessage(t.required);
      return;
    }

    if (editingId) {
      const nextClients = clients.map((client) =>
        client.id === editingId
          ? { ...client, ...form, name }
          : client,
      );
      persist(nextClients);
      resetForm();
      showMessage(t.updated);
      return;
    }

    const newClient: Client = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      ...form,
      name,
      createdAt: new Date().toISOString(),
    };

    persist([newClient, ...clients]);
    resetForm();
    showMessage(t.saved);
  }

  function editClient(client: Client) {
    setEditingId(client.id);
    setForm({
      name: client.name,
      company: client.company,
      phone: client.phone,
      email: client.email,
      notes: client.notes,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteClient(client: Client) {
    if (!window.confirm(t.deleteConfirm)) return;
    persist(clients.filter((item) => item.id !== client.id));
    if (editingId === client.id) resetForm();
    showMessage(t.deleted);
  }

  const filteredClients = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return clients;

    return clients.filter((client) =>
      [client.name, client.company, client.phone, client.email]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [clients, search]);

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <Link href="/" style={styles.backLink}>{t.back}</Link>
          <div style={styles.languageBar}>
            <button
              type="button"
              onClick={() => changeLanguage("es")}
              style={{ ...styles.languageButton, ...(language === "es" ? styles.languageButtonActive : {}) }}
            >
              🇪🇸 Español
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              style={{ ...styles.languageButton, ...(language === "en" ? styles.languageButtonActive : {}) }}
            >
              🇺🇸 English
            </button>
          </div>
        </div>

        <header style={styles.header}>
          <div>
            <p style={styles.eyebrow}>{t.eyebrow}</p>
            <h1 style={styles.title}>{t.title}</h1>
            <p style={styles.subtitle}>{t.subtitle}</p>
          </div>
          <div style={styles.totalCard}>
            <span style={styles.totalNumber}>{clients.length}</span>
            <span style={styles.totalLabel}>{t.total}</span>
          </div>
        </header>

        {message && <div style={styles.message}>{message}</div>}

        <section style={styles.layout}>
          <form onSubmit={handleSubmit} style={styles.formCard}>
            <h2 style={styles.sectionTitle}>{editingId ? t.editClient : t.newClient}</h2>

            <label style={styles.label}>
              {t.name}
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                style={styles.input}
                autoComplete="name"
              />
            </label>

            <label style={styles.label}>
              {t.company} <span style={styles.optional}>({t.optional})</span>
              <input
                value={form.company}
                onChange={(event) => setForm({ ...form, company: event.target.value })}
                style={styles.input}
                autoComplete="organization"
              />
            </label>

            <div style={styles.twoColumns}>
              <label style={styles.label}>
                {t.phone} <span style={styles.optional}>({t.optional})</span>
                <input
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  style={styles.input}
                  type="tel"
                  autoComplete="tel"
                />
              </label>

              <label style={styles.label}>
                {t.email} <span style={styles.optional}>({t.optional})</span>
                <input
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  style={styles.input}
                  type="email"
                  autoComplete="email"
                />
              </label>
            </div>

            <label style={styles.label}>
              {t.notes} <span style={styles.optional}>({t.optional})</span>
              <textarea
                value={form.notes}
                onChange={(event) => setForm({ ...form, notes: event.target.value })}
                style={{ ...styles.input, ...styles.textarea }}
              />
            </label>

            <div style={styles.formActions}>
              <button type="submit" style={styles.primaryButton}>
                {editingId ? t.update : t.save}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} style={styles.secondaryButton}>
                  {t.cancel}
                </button>
              )}
            </div>
          </form>

          <section style={styles.listCard}>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.search}
              style={styles.searchInput}
            />

            <div style={styles.clientList}>
              {clients.length === 0 ? (
                <div style={styles.emptyState}>{t.noClients}</div>
              ) : filteredClients.length === 0 ? (
                <div style={styles.emptyState}>{t.noResults}</div>
              ) : (
                filteredClients.map((client) => (
                  <article key={client.id} style={styles.clientCard}>
                    <div style={styles.avatar}>{client.name.charAt(0).toUpperCase()}</div>
                    <div style={styles.clientContent}>
                      <h3 style={styles.clientName}>{client.name}</h3>
                      {client.company && <p style={styles.company}>{client.company}</p>}
                      <div style={styles.details}>
                        {client.phone && <span>📞 {client.phone}</span>}
                        {client.email && <span>✉️ {client.email}</span>}
                      </div>
                      {client.notes && <p style={styles.notes}>{client.notes}</p>}
                    </div>
                    <div style={styles.cardActions}>
                      <button type="button" onClick={() => editClient(client)} style={styles.editButton}>
                        {t.edit}
                      </button>
                      <button type="button" onClick={() => deleteClient(client)} style={styles.deleteButton}>
                        {t.remove}
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  main: { minHeight: "100vh", padding: "24px 18px 42px", color: "#fff", fontFamily: "Arial, Helvetica, sans-serif", background: "linear-gradient(135deg, #080808 0%, #151515 55%, #260000 100%)" },
  container: { width: "100%", maxWidth: "1180px", margin: "0 auto" },
  topBar: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "14px", marginBottom: "26px" },
  backLink: { color: "#fff", textDecoration: "none", fontWeight: 800 },
  languageBar: { display: "flex", gap: "8px" },
  languageButton: { padding: "9px 13px", border: "1px solid rgba(255,255,255,.18)", borderRadius: "999px", background: "rgba(255,255,255,.06)", color: "#fff", fontWeight: 800, cursor: "pointer" },
  languageButtonActive: { background: "#d00000", borderColor: "#ef4444" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "24px" },
  eyebrow: { margin: "0 0 8px", color: "#ef4444", fontSize: "13px", fontWeight: 900, letterSpacing: "2px" },
  title: { margin: 0, fontSize: "clamp(36px, 6vw, 58px)", lineHeight: 1, fontWeight: 900 },
  subtitle: { margin: "12px 0 0", color: "#c8c8c8", fontSize: "17px" },
  totalCard: { display: "flex", alignItems: "center", gap: "12px", minWidth: "210px", padding: "16px 20px", border: "1px solid rgba(255,255,255,.12)", borderRadius: "18px", background: "rgba(255,255,255,.07)" },
  totalNumber: { color: "#ef4444", fontSize: "34px", fontWeight: 900 },
  totalLabel: { color: "#dedede", fontWeight: 800 },
  message: { marginBottom: "18px", padding: "13px 16px", border: "1px solid rgba(34,197,94,.35)", borderRadius: "12px", background: "rgba(34,197,94,.12)", color: "#dcfce7", fontWeight: 800 },
  layout: { display: "grid", gridTemplateColumns: "minmax(300px, .82fr) minmax(360px, 1.18fr)", gap: "20px", alignItems: "start" },
  formCard: { padding: "24px", border: "1px solid rgba(255,255,255,.11)", borderRadius: "20px", background: "rgba(255,255,255,.07)", boxShadow: "0 14px 35px rgba(0,0,0,.18)" },
  listCard: { padding: "20px", border: "1px solid rgba(255,255,255,.11)", borderRadius: "20px", background: "rgba(255,255,255,.07)", boxShadow: "0 14px 35px rgba(0,0,0,.18)" },
  sectionTitle: { margin: "0 0 20px", fontSize: "24px" },
  label: { display: "grid", gap: "7px", marginBottom: "15px", color: "#f3f3f3", fontSize: "14px", fontWeight: 800 },
  optional: { color: "#8f8f8f", fontWeight: 600 },
  input: { width: "100%", boxSizing: "border-box", padding: "12px 13px", border: "1px solid rgba(255,255,255,.16)", borderRadius: "11px", outline: "none", background: "rgba(0,0,0,.28)", color: "#fff", fontSize: "15px" },
  textarea: { minHeight: "92px", resize: "vertical" },
  twoColumns: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" },
  formActions: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "8px" },
  primaryButton: { padding: "12px 17px", border: 0, borderRadius: "11px", background: "#d00000", color: "#fff", fontWeight: 900, cursor: "pointer" },
  secondaryButton: { padding: "12px 17px", border: "1px solid rgba(255,255,255,.2)", borderRadius: "11px", background: "rgba(255,255,255,.08)", color: "#fff", fontWeight: 900, cursor: "pointer" },
  searchInput: { width: "100%", boxSizing: "border-box", padding: "13px 15px", border: "1px solid rgba(255,255,255,.16)", borderRadius: "12px", outline: "none", background: "rgba(0,0,0,.3)", color: "#fff", fontSize: "15px", marginBottom: "16px" },
  clientList: { display: "grid", gap: "12px" },
  emptyState: { padding: "42px 20px", border: "1px dashed rgba(255,255,255,.16)", borderRadius: "14px", color: "#aaa", textAlign: "center" },
  clientCard: { display: "grid", gridTemplateColumns: "50px 1fr auto", gap: "14px", alignItems: "start", padding: "16px", border: "1px solid rgba(255,255,255,.1)", borderRadius: "15px", background: "rgba(0,0,0,.22)" },
  avatar: { display: "grid", placeItems: "center", width: "50px", height: "50px", borderRadius: "14px", background: "rgba(239,68,68,.17)", color: "#ff6666", fontSize: "22px", fontWeight: 900 },
  clientContent: { minWidth: 0 },
  clientName: { margin: "1px 0 4px", fontSize: "19px" },
  company: { margin: "0 0 9px", color: "#f0b3b3", fontWeight: 700 },
  details: { display: "flex", flexWrap: "wrap", gap: "7px 14px", color: "#cfcfcf", fontSize: "14px", overflowWrap: "anywhere" },
  notes: { margin: "10px 0 0", color: "#a9a9a9", fontSize: "14px", lineHeight: 1.45 },
  cardActions: { display: "flex", flexDirection: "column", gap: "7px" },
  editButton: { padding: "8px 11px", border: "1px solid rgba(255,255,255,.16)", borderRadius: "9px", background: "rgba(255,255,255,.08)", color: "#fff", fontWeight: 800, cursor: "pointer" },
  deleteButton: { padding: "8px 11px", border: "1px solid rgba(239,68,68,.28)", borderRadius: "9px", background: "rgba(239,68,68,.11)", color: "#ff8a8a", fontWeight: 800, cursor: "pointer" },
};
