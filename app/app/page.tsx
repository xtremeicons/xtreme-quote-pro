"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

type Language = "es" | "en";

const translations = {
  es: {
    subtitle: "Sistema de cotizaciones, clientes y control de trabajos.",
    active: "Sistema activo",
    available: "Módulo disponible",
    developing: "Módulos en desarrollo",
    open: "Abrir módulo →",
    soon: "Próximamente",
    modules: [
      ["Nueva Cotización", "Crear una cotización nueva para un cliente."],
      ["Historial", "Consultar cotizaciones guardadas."],
      ["Clientes", "Administrar la información de tus clientes."],
      ["Productos", "Administrar productos, materiales y precios."],
      ["Reportes", "Revisar ventas, costos y ganancias."],
      ["Configuración", "Configurar los datos del negocio."],
    ],
  },
  en: {
    subtitle: "Quoting, customer, and job management system.",
    active: "System active",
    available: "Module available",
    developing: "Modules in development",
    open: "Open module →",
    soon: "Coming soon",
    modules: [
      ["New Quote", "Create a new quote for a customer."],
      ["History", "View saved quotes."],
      ["Customers", "Manage your customer information."],
      ["Products", "Manage products, materials, and prices."],
      ["Reports", "Review sales, costs, and profit."],
      ["Settings", "Configure your business information."],
    ],
  },
} as const;

const moduleSettings = [
  { href: "/nueva-cotizacion", icon: "➕", available: true },
  { href: "#", icon: "📄", available: false },
  { href: "#", icon: "👥", available: false },
  { href: "#", icon: "📦", available: false },
  { href: "#", icon: "📊", available: false },
  { href: "#", icon: "⚙️", available: false },
];

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("es");
  const t = translations[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("xqs-language");
    if (saved === "es" || saved === "en") setLanguage(saved);
  }, []);

  function changeLanguage(next: Language) {
    setLanguage(next);
    window.localStorage.setItem("xqs-language", next);
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>
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

        <header style={styles.header}>
          <div>
            <p style={styles.brand}>XTREME ICONS AGENCY</p>
            <h1 style={styles.title}>Xtreme Quote Pro</h1>
            <p style={styles.subtitle}>{t.subtitle}</p>
          </div>
          <div style={styles.status}>
            <span style={styles.statusDot} />
            {t.active}
          </div>
        </header>

        <section style={styles.summary}>
          <div style={styles.summaryCard}>
            <span style={styles.summaryNumber}>1</span>
            <span style={styles.summaryText}>{t.available}</span>
          </div>
          <div style={styles.summaryCard}>
            <span style={styles.summaryNumber}>5</span>
            <span style={styles.summaryText}>{t.developing}</span>
          </div>
        </section>

        <section style={styles.grid}>
          {moduleSettings.map((module, index) => {
            const [title, description] = t.modules[index];
            return module.available ? (
              <Link key={title} href={module.href} style={styles.card}>
                <div style={styles.icon}>{module.icon}</div>
                <div>
                  <h2 style={styles.cardTitle}>{title}</h2>
                  <p style={styles.cardDescription}>{description}</p>
                  <span style={styles.openText}>{t.open}</span>
                </div>
              </Link>
            ) : (
              <div key={title} style={{ ...styles.card, ...styles.disabledCard }}>
                <div style={styles.icon}>{module.icon}</div>
                <div>
                  <h2 style={styles.cardTitle}>{title}</h2>
                  <p style={styles.cardDescription}>{description}</p>
                  <span style={styles.comingSoon}>{t.soon}</span>
                </div>
              </div>
            );
          })}
        </section>

        <footer style={styles.footer}>
          <span>Xtreme Quote Pro</span>
          <span>Edinburg, Texas</span>
        </footer>
      </div>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  main: { minHeight: "100vh", padding: "28px 20px 40px", color: "#fff", fontFamily: "Arial, Helvetica, sans-serif", background: "linear-gradient(135deg, #080808 0%, #151515 55%, #260000 100%)" },
  container: { width: "100%", maxWidth: "1180px", margin: "0 auto" },
  languageBar: { display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "22px" },
  languageButton: { padding: "9px 13px", border: "1px solid rgba(255,255,255,.18)", borderRadius: "999px", background: "rgba(255,255,255,.06)", color: "#fff", fontWeight: 800, cursor: "pointer" },
  languageButtonActive: { background: "#d00000", borderColor: "#ef4444" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px", marginBottom: "32px" },
  brand: { margin: "0 0 8px", color: "#ef4444", fontSize: "13px", fontWeight: 800, letterSpacing: "2px" },
  title: { margin: 0, fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 1, fontWeight: 900 },
  subtitle: { maxWidth: "650px", marginTop: "14px", marginBottom: 0, color: "#c7c7c7", fontSize: "17px" },
  status: { display: "flex", alignItems: "center", gap: "9px", padding: "10px 16px", border: "1px solid rgba(255,255,255,.12)", borderRadius: "999px", background: "rgba(255,255,255,.07)", fontSize: "14px", fontWeight: 700 },
  statusDot: { width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 12px rgba(34,197,94,.8)" },
  summary: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" },
  summaryCard: { display: "flex", alignItems: "center", gap: "14px", padding: "20px", border: "1px solid rgba(255,255,255,.1)", borderRadius: "18px", background: "rgba(255,255,255,.06)" },
  summaryNumber: { color: "#ef4444", fontSize: "32px", fontWeight: 900 },
  summaryText: { color: "#d6d6d6", fontSize: "15px", fontWeight: 700 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" },
  card: { display: "flex", gap: "18px", minHeight: "180px", padding: "24px", border: "1px solid rgba(255,255,255,.11)", borderRadius: "20px", background: "rgba(255,255,255,.07)", color: "#fff", textDecoration: "none", boxShadow: "0 14px 35px rgba(0,0,0,.18)" },
  disabledCard: { opacity: .58, cursor: "not-allowed" },
  icon: { display: "grid", placeItems: "center", flex: "0 0 52px", width: "52px", height: "52px", borderRadius: "15px", background: "rgba(239,68,68,.15)", fontSize: "25px" },
  cardTitle: { margin: "2px 0 9px", fontSize: "22px" },
  cardDescription: { minHeight: "44px", margin: "0 0 18px", color: "#c9c9c9", lineHeight: 1.45 },
  openText: { color: "#ff5a5a", fontWeight: 800 },
  comingSoon: { display: "inline-block", padding: "6px 10px", borderRadius: "999px", background: "rgba(255,255,255,.1)", color: "#d4d4d4", fontSize: "13px", fontWeight: 800 },
  footer: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,.1)", color: "#888", fontSize: "13px" },
};
