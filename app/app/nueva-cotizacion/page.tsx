"use client";

import { useState, type CSSProperties } from "react";

const materialesPorCategoria: Record<string, string[]> = {
  banner: [
    "13 oz Matte",
    "13 oz Gloss",
    "18 oz Blockout",
    "Mesh Banner",
  ],
  coroplast: ["4 mm White", "10 mm White"],
  vinyl: ["Gloss Vinyl", "Matte Vinyl", "High Tack Vinyl"],
  "window-perf": ["50/50 Window Perf", "70/30 Window Perf"],
  magnets: ["30 mil Magnet", "20 mil Magnet"],
  "business-cards": ["14 pt Gloss", "16 pt Matte", "18 pt Premium"],
};

const precioPorPieCuadrado: Record<string, number> = {
  "13 oz Matte": 0.85,
  "13 oz Gloss": 0.95,
  "18 oz Blockout": 1.35,
  "Mesh Banner": 1.15,

  "4 mm White": 1.8,
  "10 mm White": 3.25,

  "Gloss Vinyl": 2.25,
  "Matte Vinyl": 2.45,
  "High Tack Vinyl": 2.85,

  "50/50 Window Perf": 3.25,
  "70/30 Window Perf": 3.75,

  "30 mil Magnet": 4.5,
  "20 mil Magnet": 3.85,

  "14 pt Gloss": 0,
  "16 pt Matte": 0,
  "18 pt Premium": 0,
};

const inputStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  marginBottom: "12px",
  background: "#1f2937",
  color: "#ffffff",
  border: "1px solid #374151",
  borderRadius: "8px",
  outline: "none",
  fontSize: "16px",
};

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: "6px",
  color: "#d1d5db",
  fontSize: "14px",
  fontWeight: 600,
};

const sectionStyle: CSSProperties = {
  background: "#181818",
  padding: "22px",
  borderRadius: "14px",
  marginTop: "20px",
  maxWidth: "760px",
  border: "1px solid #292929",
};

export default function NuevaCotizacion() {
  const [nombreCliente, setNombreCliente] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const [categoria, setCategoria] = useState("");
  const [material, setMaterial] = useState("");
  const [unidad, setUnidad] = useState("pies");

  const [ancho, setAncho] = useState(0);
  const [alto, setAlto] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [notas, setNotas] = useState("");

  const [margen, setMargen] = useState(50);
  const [diseno, setDiseno] = useState(0);
  const [instalacion, setInstalacion] = useState(0);
  const [envio, setEnvio] = useState(0);
  const [impuestoPorcentaje, setImpuestoPorcentaje] = useState(0);

  const [calculado, setCalculado] = useState(false);

  const anchoEnPies = unidad === "pulgadas" ? ancho / 12 : ancho;
  const altoEnPies = unidad === "pulgadas" ? alto / 12 : alto;

  const areaPorPieza = anchoEnPies * altoEnPies;
  const areaTotal = areaPorPieza * cantidad;

  const precioMaterial = precioPorPieCuadrado[material] ?? 0;
  const costoMaterial = areaTotal * precioMaterial;

  const ganancia = costoMaterial * (margen / 100);
  const precioProducto = costoMaterial + ganancia;

  const subtotal = precioProducto + diseno + instalacion + envio;
  const impuestos = subtotal * (impuestoPorcentaje / 100);
  const total = subtotal + impuestos;

  const cambiarCategoria = (nuevaCategoria: string) => {
    setCategoria(nuevaCategoria);
    setMaterial("");
    setCalculado(false);
  };

  const calcularCotizacion = () => {
    setCalculado(true);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        color: "white",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "8px" }}>🧾 Nueva Cotización</h1>

        <p style={{ color: "#9ca3af", marginTop: 0 }}>
          Xtreme Quote Pro
        </p>

        <section style={sectionStyle}>
          <h2>👤 Información del Cliente</h2>

          <label style={labelStyle}>Nombre del cliente</label>
          <input
            type="text"
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>Empresa</label>
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>Teléfono</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={inputStyle}
          />
        </section>

        <section style={sectionStyle}>
          <h2>📦 Información del Producto</h2>

          <label style={labelStyle}>Categoría</label>
          <select
            value={categoria}
            onChange={(e) => cambiarCategoria(e.target.value)}
            style={inputStyle}
          >
            <option value="">Selecciona una categoría</option>
            <option value="banner">Banner</option>
            <option value="coroplast">Coroplast</option>
            <option value="vinyl">Vinilo adhesivo</option>
            <option value="window-perf">Window Perf</option>
            <option value="magnets">Imanes</option>
            <option value="business-cards">
              Tarjetas de presentación
            </option>
          </select>

          <label style={labelStyle}>Material</label>
          <select
            value={material}
            onChange={(e) => {
              setMaterial(e.target.value);
              setCalculado(false);
            }}
            disabled={!categoria}
            style={{
              ...inputStyle,
              opacity: categoria ? 1 : 0.55,
              cursor: categoria ? "pointer" : "not-allowed",
            }}
          >
            <option value="">
              {categoria
                ? "Selecciona un material"
                : "Primero selecciona una categoría"}
            </option>

            {categoria &&
              materialesPorCategoria[categoria]?.map((nombreMaterial) => (
                <option key={nombreMaterial} value={nombreMaterial}>
                  {nombreMaterial}
                </option>
              ))}
          </select>

          <label style={labelStyle}>Unidad de medida</label>
          <select
            value={unidad}
            onChange={(e) => {
              setUnidad(e.target.value);
              setCalculado(false);
            }}
            style={inputStyle}
          >
            <option value="pies">Pies</option>
            <option value="pulgadas">Pulgadas</option>
          </select>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <div>
              <label style={labelStyle}>Ancho</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={ancho || ""}
                onChange={(e) => {
                  setAncho(Number(e.target.value));
                  setCalculado(false);
                }}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Alto</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={alto || ""}
                onChange={(e) => {
                  setAlto(Number(e.target.value));
                  setCalculado(false);
                }}
                style={inputStyle}
              />
            </div>
          </div>

          <label style={labelStyle}>Cantidad</label>
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => {
              setCantidad(Math.max(1, Number(e.target.value)));
              setCalculado(false);
            }}
            style={inputStyle}
          />

          <div
            style={{
              background: "#101010",
              padding: "16px",
              borderRadius: "10px",
              marginBottom: "12px",
              border: "1px solid #292929",
            }}
          >
            <div>Área por pieza: {areaPorPieza.toFixed(2)} ft²</div>
            <div style={{ marginTop: "8px" }}>
              Área total: {areaTotal.toFixed(2)} ft²
            </div>
          </div>

          <label style={labelStyle}>Descripción o notas</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows={4}
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
          />
        </section>

        <section style={sectionStyle}>
          <h2>💰 Precio y servicios</h2>

          <label style={labelStyle}>Margen de ganancia (%)</label>
          <input
            type="number"
            min="0"
            value={margen}
            onChange={(e) => {
              setMargen(Number(e.target.value));
              setCalculado(false);
            }}
            style={inputStyle}
          />

          <label style={labelStyle}>Diseño</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={diseno || ""}
            onChange={(e) => {
              setDiseno(Number(e.target.value));
              setCalculado(false);
            }}
            style={inputStyle}
          />

          <label style={labelStyle}>Instalación</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={instalacion || ""}
            onChange={(e) => {
              setInstalacion(Number(e.target.value));
              setCalculado(false);
            }}
            style={inputStyle}
          />

          <label style={labelStyle}>Envío</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={envio || ""}
            onChange={(e) => {
              setEnvio(Number(e.target.value));
              setCalculado(false);
            }}
            style={inputStyle}
          />

          <label style={labelStyle}>Impuestos (%)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={impuestoPorcentaje || ""}
            onChange={(e) => {
              setImpuestoPorcentaje(Number(e.target.value));
              setCalculado(false);
            }}
            style={inputStyle}
          />

          <button
            type="button"
            onClick={calcularCotizacion}
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "8px",
              background: "#d00000",
              color: "white",
              border: "none",
              borderRadius: "9px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            🧮 Calcular Cotización
          </button>
        </section>

        {calculado && (
          <section style={sectionStyle}>
            <h2>📄 Resultado</h2>

            <div
              style={{
                display: "grid",
                gap: "10px",
                background: "#101010",
                padding: "18px",
                borderRadius: "10px",
                border: "1px solid #292929",
              }}
            >
              <div>
                Precio por ft²: ${precioMaterial.toFixed(2)}
              </div>

              <div>
                Costo del material: ${costoMaterial.toFixed(2)}
              </div>

              <div>Ganancia: ${ganancia.toFixed(2)}</div>

              <div>
                Precio del producto: ${precioProducto.toFixed(2)}
              </div>

              <div>Diseño: ${diseno.toFixed(2)}</div>

              <div>Instalación: ${instalacion.toFixed(2)}</div>

              <div>Envío: ${envio.toFixed(2)}</div>

              <div>Subtotal: ${subtotal.toFixed(2)}</div>

              <div>Impuestos: ${impuestos.toFixed(2)}</div>

              <div
                style={{
                  marginTop: "8px",
                  paddingTop: "14px",
                  borderTop: "1px solid #333",
                  fontSize: "26px",
                  fontWeight: "bold",
                  color: "#ff3030",
                }}
              >
                Total: ${total.toFixed(2)}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}