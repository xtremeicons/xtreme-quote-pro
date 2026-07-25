export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "42px", fontWeight: 800 }}>
        Xtreme Quote Pro
      </h1>

      <p style={{ fontSize: "18px", color: "#cccccc" }}>
        Cotiza en segundos. Vende con confianza.
      </p>

      <button
        style={{
          background: "#d00000",
          color: "#fff",
          border: "none",
          padding: "16px 28px",
          borderRadius: "12px",
          fontSize: "18px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Nueva Cotización
      </button>
    </main>
  );
}
