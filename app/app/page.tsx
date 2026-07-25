"use client";

import { useState } from "react";

type Language = "es" | "en";

const translations = {
  es: {
    appName: "Xtreme Quote Pro",
    subtitle: "Cotiza en segundos. Vende con confianza.",
    newQuote: "Nueva Cotización",
    clients: "Clientes",
    products: "Productos",
    history: "Historial",
    settings: "Configuración",
    language: "Idioma",
  },
  en: {
    appName: "Xtreme Quote Pro",
    subtitle: "Quote in seconds. Sell with confidence.",
    newQuote: "New Quote",
    clients: "Customers",
    products: "Products",
    history: "History",
    settings: "Settings",
    language: "Language",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const text = translations[language];

  const menuItems = [
    { title: text.newQuote, icon: "🧾" },
    { title: text.clients, icon: "👤" },
    { title: text.products, icon: "📦" },
    { title: text.history, icon: "📋" },
    { title: text.settings, icon: "⚙️" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #2a0000 0%, #090909 38%, #000 100%)",
        color: "#ffffff",
        padding: "24px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                color: "#ff3131",
                fontWeight: 700,
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              XTREME ICONS AGENCY
            </p>

            <h1
              style={{
                fontSize: "clamp(36px, 8vw, 64px)",
                lineHeight: 1,
                margin: 0,
              }}
            >
              {text.appName}
            </h1>

            <p
              style={{
                color: "#bdbdbd",
                fontSize: "18px",
                marginTop: "16px",
              }}
            >
              {text.subtitle}
            </p>
          </div>

          <div
            style={{
              background: "#161616",
              border: "1px solid #333",
              borderRadius: "14px",
              padding: "6px",
              display: "flex",
              gap: "6px",
            }}
          >
            <button
              onClick={() => setLanguage("es")}
              style={{
                border: "none",
                borderRadius: "10px",
                padding: "10px 14px",
                background: language === "es" ? "#d00000" : "transparent",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              ES
            </button>

            <button
              onClick={() => setLanguage("en")}
              style={{
                border: "none",
                borderRadius: "10px",
                padding: "10px 14px",
                background: language === "en" ? "#d00000" : "transparent",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              EN
            </button>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "18px",
          }}
        >
          {menuItems.map((item) => (
            <button
              key={item.title}
              style={{
                background: "rgba(20, 20, 20, 0.92)",
                border: "1px solid #2f2f2f",
                borderRadius: "18px",
                padding: "26px",
                color: "#fff",
                textAlign: "left",
                cursor: "pointer",
                minHeight: "145px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "34px",
                  marginBottom: "22px",
                }}
              >
                {item.icon}
              </span>

              <span
                style={{
                  display: "block",
                  fontSize: "20px",
                  fontWeight: 800,
                }}
              >
                {item.title}
              </span>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}