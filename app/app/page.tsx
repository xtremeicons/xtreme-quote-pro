"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

const modules = [
  {
    title: "Nueva Cotización",
    description: "Crear una cotización nueva para un cliente.",
    href: "/nueva-cotizacion",
    icon: "➕",
    available: true,
  },
  {
    title: "Historial",
    description: "Consultar cotizaciones guardadas.",
    href: "#",
    icon: "📄",
    available: false,
  },
  {
    title: "Clientes",
    description: "Administrar la información de tus clientes.",
    href: "#",
    icon: "👥",
    available: false,
  },
  {
    title: "Productos",
    description: "Administrar productos, materiales y precios.",
    href: "#",
    icon: "📦",
    available: false,
  },
  {
    title: "Reportes",
    description: "Revisar ventas, costos y ganancias.",
    href: "#",
    icon: "📊",
    available: false,
  },
  {
    title: "Configuración",
    description: "Configurar los datos del negocio.",
    href: "#",
    icon: "⚙️",
    available: false,
  },
];

export default function HomePage() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <p style={styles.brand}>XTREME ICONS AGENCY</p>

            <h1 style={styles.title}>Xtreme Quote Pro</h1>

            <p style={styles.subtitle}>
              Sistema de cotizaciones, clientes y control de trabajos.
            </p>
          </div>

          <div style={styles.status}>
            <span style={styles.statusDot} />
            Sistema activo
          </div>
        </header>

        <section style={styles.summary}>
          <div style={styles.summaryCard}>
            <span style={styles.summaryNumber}>1</span>
            <span style={styles.summaryText}>Módulo disponible</span>
          </div>

          <div style={styles.summaryCard}>
            <span style={styles.summaryNumber}>5</span>
            <span style={styles.summaryText}>Módulos en desarrollo</span>
          </div>
        </section>

        <section style={styles.grid}>
          {modules.map((module) =>
            module.available ? (
              <Link
                key={module.title}
                href={module.href}
                style={styles.card}
              >
                <div style={styles.icon}>{module.icon}</div>

                <div>
                  <h2 style={styles.cardTitle}>{module.title}</h2>

                  <p style={styles.cardDescription}>
                    {module.description}
                  </p>

                  <span style={styles.openText}>Abrir módulo →</span>
                </div>
              </Link>
            ) : (
              <div
                key={module.title}
                style={{
                  ...styles.card,
                  ...styles.disabledCard,
                }}
              >
                <div style={styles.icon}>{module.icon}</div>

                <div>
                  <h2 style={styles.cardTitle}>{module.title}</h2>

                  <p style={styles.cardDescription}>
                    {module.description}
                  </p>

                  <span style={styles.comingSoon}>Próximamente</span>
                </div>
              </div>
            )
          )}
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
  main: {
    minHeight: "100vh",
    padding: "40px 20px",
    color: "#ffffff",
    fontFamily: "Arial, Helvetica, sans-serif",
    background:
      "linear-gradient(135deg, #080808 0%, #151515 55%, #260000 100%)",
  },

  container: {
    width: "100%",
    maxWidth: "1180px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "32px",
  },

  brand: {
    margin: "0 0 8px",
    color: "#ef4444",
    fontSize: "13px",
    fontWeight: 800,
    letterSpacing: "2px",
  },

  title: {
    margin: 0,
    fontSize: "clamp(34px, 5vw, 58px)",
    lineHeight: 1,
    fontWeight: 900,
  },

  subtitle: {
    maxWidth: "650px",
    marginTop: "14px",
    marginBottom: 0,
    color: "#c7c7c7",
    fontSize: "17px",
  },

  status: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "10px 16px",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.07)",
    fontSize: "14px",
    fontWeight: 700,
  },

  statusDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 12px rgba(34,197,94,0.8)",
  },

  summary: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },

  summaryCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.06)",
  },

  summaryNumber: {
    color: "#ef4444",
    fontSize: "32px",
    fontWeight: 900,
  },

  summaryText: {
    color: "#d6d6d6",
    fontSize: "15px",
    fontWeight: 700,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },

  card: {
    minHeight: "200px",
    display: "flex",
    alignItems: "flex-start",
    gap: "18px",
    padding: "24px",
    color: "#ffffff",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.08)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
  },

  disabledCard: {
    opacity: 0.58,
    cursor: "not-allowed",
  },

  icon: {
    width: "54px",
    height: "54px",
    minWidth: "54px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px",
    background: "#b91c1c",
    fontSize: "25px",
  },

  cardTitle: {
    margin: "2px 0 10px",
    fontSize: "22px",
  },

  cardDescription: {
    margin: 0,
    color: "#c9c9c9",
    fontSize: "15px",
    lineHeight: 1.55,
  },

  openText: {
    display: "inline-block",
    marginTop: "20px",
    color: "#ff5c5c",
    fontWeight: 800,
  },

  comingSoon: {
    display: "inline-block",
    marginTop: "20px",
    color: "#a3a3a3",
    fontSize: "13px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "15px",
    marginTop: "32px",
    paddingTop: "20px",
    color: "#858585",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    fontSize: "13px",
  },
};