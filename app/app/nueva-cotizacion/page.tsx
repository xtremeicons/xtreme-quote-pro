"use client";

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";

type NumericValue = number | "";
type CategoryKey =
  | "banner"
  | "coroplast"
  | "vinyl"
  | "window-perf"
  | "magnets"
  | "canvas"
  | "pvc"
  | "acrylic"
  | "dtf"
  | "uv-dtf"
  | "business-cards";

type MaterialOption = {
  name: string;
  price: number;
  waste: number;
};

const categoryLabels: Record<CategoryKey, string> = {
  banner: "Banner",
  coroplast: "Coroplast",
  vinyl: "Vinilo adhesivo",
  "window-perf": "Window Perf",
  magnets: "Imanes",
  canvas: "Canvas",
  pvc: "PVC",
  acrylic: "Acrílico",
  dtf: "DTF",
  "uv-dtf": "UV DTF",
  "business-cards": "Tarjetas de presentación",
};

const materials: Record<CategoryKey, MaterialOption[]> = {
  banner: [
    { name: "13 oz Matte", price: 0.85, waste: 10 },
    { name: "13 oz Gloss", price: 0.95, waste: 10 },
    { name: "18 oz Blockout", price: 1.35, waste: 12 },
    { name: "Mesh Banner", price: 1.15, waste: 12 },
  ],
  coroplast: [
    { name: "4 mm White", price: 1.8, waste: 8 },
    { name: "10 mm White", price: 3.25, waste: 8 },
  ],
  vinyl: [
    { name: "Gloss Vinyl", price: 2.25, waste: 10 },
    { name: "Matte Vinyl", price: 2.45, waste: 10 },
    { name: "High Tack Vinyl", price: 2.85, waste: 12 },
  ],
  "window-perf": [
    { name: "50/50 Window Perf", price: 3.25, waste: 12 },
    { name: "70/30 Window Perf", price: 3.75, waste: 12 },
  ],
  magnets: [
    { name: "30 mil Magnet", price: 4.5, waste: 8 },
    { name: "20 mil Magnet", price: 3.85, waste: 8 },
  ],
  canvas: [
    { name: "Canvas Standard", price: 3.5, waste: 12 },
    { name: "Canvas Premium", price: 4.75, waste: 15 },
  ],
  pvc: [
    { name: "PVC 3 mm", price: 3.25, waste: 8 },
    { name: "PVC 6 mm", price: 5.25, waste: 8 },
  ],
  acrylic: [
    { name: "Acrylic 1/8 in", price: 7.5, waste: 12 },
    { name: "Acrylic 1/4 in", price: 11.5, waste: 12 },
  ],
  dtf: [
    { name: "DTF Transfer", price: 4.25, waste: 8 },
    { name: "DTF Gang Sheet", price: 3.75, waste: 8 },
  ],
  "uv-dtf": [
    { name: "UV DTF Transfer", price: 5.5, waste: 10 },
    { name: "UV DTF Gang Sheet", price: 4.75, waste: 10 },
  ],
  "business-cards": [
    { name: "14 pt Gloss", price: 0, waste: 5 },
    { name: "16 pt Matte", price: 0, waste: 5 },
    { name: "18 pt Premium", price: 0, waste: 5 },
  ],
};

const inputStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 13px",
  background: "#161b22",
  color: "#ffffff",
  border: "1px solid #30363d",
  borderRadius: "9px",
  outline: "none",
  fontSize: "15px",
};

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: "7px",
  color: "#d1d5db",
  fontSize: "13px",
  fontWeight: 700,
};

const cardStyle: CSSProperties = {
  background: "#111418",
  padding: "22px",
  borderRadius: "15px",
  border: "1px solid #292f36",
  boxShadow: "0 12px 30px rgba(0,0,0,.18)",
};

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.isFinite(value) ? value : 0);

const num = (value: NumericValue) => Number(value) || 0;

const updateNumber = (
  raw: string,
  setter: (value: NumericValue) => void,
) => setter(raw === "" ? "" : Number(raw));

export default function NuevaCotizacion() {
  const [nombreCliente, setNombreCliente] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [numeroCotizacion, setNumeroCotizacion] = useState("XQS-0001");
  const [numeroSecuencial, setNumeroSecuencial] = useState(1);

  const [categoria, setCategoria] = useState<CategoryKey | "">("");
  const [material, setMaterial] = useState("");
  const [unidad, setUnidad] = useState("pies");
  const [ancho, setAncho] = useState<NumericValue>("");
  const [alto, setAlto] = useState<NumericValue>("");
  const [cantidad, setCantidad] = useState<NumericValue>(1);
  const [notas, setNotas] = useState("");

  const [desperdicio, setDesperdicio] = useState<NumericValue>(10);
  const [recargo, setRecargo] = useState<NumericValue>(50);
  const [impuesto, setImpuesto] = useState<NumericValue>(8.25);
  const [manoObra, setManoObra] = useState<NumericValue>("");

  const [usarDiseno, setUsarDiseno] = useState(false);
  const [diseno, setDiseno] = useState<NumericValue>(35);
  const [usarInstalacion, setUsarInstalacion] = useState(false);
  const [instalacion, setInstalacion] = useState<NumericValue>(95);
  const [usarEnvio, setUsarEnvio] = useState(false);
  const [envio, setEnvio] = useState<NumericValue>(25);
  const [usarLaminado, setUsarLaminado] = useState(false);
  const [laminadoPie, setLaminadoPie] = useState<NumericValue>(0.85);
  const [usarOjillos, setUsarOjillos] = useState(false);
  const [cantidadOjillos, setCantidadOjillos] = useState<NumericValue>(4);
  const [precioOjillo, setPrecioOjillo] = useState<NumericValue>(1);
  const [usarDobladillo, setUsarDobladillo] = useState(false);
  const [piesDobladillo, setPiesDobladillo] = useState<NumericValue>("");
  const [precioDobladillo, setPrecioDobladillo] = useState<NumericValue>(1.25);
  const [usarBolsas, setUsarBolsas] = useState(false);
  const [piesBolsas, setPiesBolsas] = useState<NumericValue>("");
  const [precioBolsas, setPrecioBolsas] = useState<NumericValue>(2);

  const [calculado, setCalculado] = useState(false);


  useEffect(() => {
    const saved = window.localStorage.getItem("xqs-next-quote-number");
    const nextNumber = saved ? Math.max(1, Number(saved) || 1) : 1;
    setNumeroSecuencial(nextNumber);
    setNumeroCotizacion(`XQS-${String(nextNumber).padStart(4, "0")}`);
  }, []);

  const guardarCotizacion = () => {
    if (!calculado) return;
    const nextNumber = numeroSecuencial + 1;
    window.localStorage.setItem("xqs-next-quote-number", String(nextNumber));
    window.alert(`Cotización ${numeroCotizacion} guardada. La próxima será XQS-${String(nextNumber).padStart(4, "0")}.`);
  };

  const selectedMaterial = useMemo(() => {
    if (!categoria || !material) return undefined;
    return materials[categoria].find((item) => item.name === material);
  }, [categoria, material]);

  const anchoPies = unidad === "pulgadas" ? num(ancho) / 12 : num(ancho);
  const altoPies = unidad === "pulgadas" ? num(alto) / 12 : num(alto);
  const areaPieza = anchoPies * altoPies;
  const areaTotal = areaPieza * num(cantidad);
  const areaDesperdicio = areaTotal * (num(desperdicio) / 100);
  const areaFacturable = areaTotal + areaDesperdicio;
  const perimetroTotal = 2 * (anchoPies + altoPies) * num(cantidad);

  const precioMaterial = selectedMaterial?.price ?? 0;
  const costoMaterialBase = areaTotal * precioMaterial;
  const costoDesperdicio = areaDesperdicio * precioMaterial;
  const costoMaterial = areaFacturable * precioMaterial;
  const costoManoObra = num(manoObra);

  const costoLaminado = usarLaminado ? areaTotal * num(laminadoPie) : 0;
  const costoOjillos = usarOjillos
    ? num(cantidadOjillos) * num(precioOjillo)
    : 0;
  const costoDobladillo = usarDobladillo
    ? num(piesDobladillo) * num(precioDobladillo)
    : 0;
  const costoBolsas = usarBolsas ? num(piesBolsas) * num(precioBolsas) : 0;
  const costoDiseno = usarDiseno ? num(diseno) : 0;
  const costoInstalacion = usarInstalacion ? num(instalacion) : 0;
  const costoEnvio = usarEnvio ? num(envio) : 0;

  const extrasProduccion =
    costoLaminado + costoOjillos + costoDobladillo + costoBolsas;
  const costoProduccion = costoMaterial + costoManoObra + extrasProduccion;
  const montoRecargo = costoProduccion * (num(recargo) / 100);
  const precioProducto = costoProduccion + montoRecargo;
  const subtotal =
    precioProducto + costoDiseno + costoInstalacion + costoEnvio;
  const impuestos = subtotal * (num(impuesto) / 100);
  const total = subtotal + impuestos;
  const utilidadDolares = montoRecargo;
  const utilidadPorcentaje = subtotal > 0 ? (utilidadDolares / subtotal) * 100 : 0;

  const handleCategory = (value: CategoryKey | "") => {
    setCategoria(value);
    setMaterial("");
    setCalculado(false);
  };

  const handleMaterial = (value: string) => {
    setMaterial(value);
    if (categoria) {
      const option = materials[categoria].find((item) => item.name === value);
      if (option) setDesperdicio(option.waste);
    }
    setCalculado(false);
  };

  const checkboxRow = (
    checked: boolean,
    setChecked: (checked: boolean) => void,
    title: string,
    description: string,
    children: ReactNode,
  ) => (
    <div
      style={{
        border: checked ? "1px solid #b91c1c" : "1px solid #2a3037",
        background: checked ? "#1b1214" : "#0d1014",
        borderRadius: "12px",
        padding: "14px",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            setCalculado(false);
          }}
          style={{ width: "18px", height: "18px", marginTop: "2px" }}
        />
        <span>
          <strong style={{ display: "block" }}>{title}</strong>
          <small style={{ color: "#8b949e" }}>{description}</small>
        </span>
      </label>
      {checked && <div style={{ marginTop: "14px" }}>{children}</div>}
    </div>
  );

  return (
    <>
    <style jsx global>{`
      .print-quote { display: none; }
      @media print {
        @page { size: Letter portrait; margin: 0.35in; }
        html, body { background: white !important; margin: 0 !important; padding: 0 !important; }
        .no-print { display: none !important; }
        .print-quote {
          display: block !important;
          color: #111 !important;
          background: white !important;
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.2;
          width: 100%;
        }
        .print-quote * { box-sizing: border-box; }
        .print-section { break-inside: avoid; page-break-inside: avoid; }
        .print-table { width: 100%; border-collapse: collapse; }
        .print-table th, .print-table td { border: 1px solid #bbb; padding: 4px 5px; text-align: left; vertical-align: top; }
        .print-table th { background: #efefef !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `}</style>
    <main
      className="no-print"
      style={{
        minHeight: "100vh",
        background: "#090b0e",
        color: "white",
        padding: "32px 18px 60px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
            padding: "10px 14px",
            color: "#ffffff",
            background: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          ← Regresar al inicio
        </a>

        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "18px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 8px",
                color: "#ef4444",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              XTREME QUOTE PRO
            </p>
            <h1 style={{ margin: 0, fontSize: "clamp(28px, 5vw, 44px)" }}>
              Nueva cotización
            </h1>
          </div>
          <div
            style={{
              background: "#111418",
              border: "1px solid #2a3037",
              borderRadius: "12px",
              padding: "12px 16px",
            }}
          >
            <small style={{ color: "#8b949e" }}>Cotización</small>
            <div style={{ fontWeight: 800, marginTop: "3px" }}>
              {numeroCotizacion}
            </div>
          </div>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
            gap: "20px",
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: "20px" }}>
            <section style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>Información del cliente</h2>
              <div style={{ display: "grid", gap: "13px" }}>
                <div>
                  <label style={labelStyle}>Nombre del cliente</label>
                  <input value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Empresa</label>
                  <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={labelStyle}>Teléfono</label>
                    <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Correo</label>
                    <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} style={inputStyle} />
                  </div>
                </div>
              </div>
            </section>

            <section style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>Producto y medidas</h2>
              <div style={{ display: "grid", gap: "13px" }}>
                <div>
                  <label style={labelStyle}>Categoría</label>
                  <select value={categoria} onChange={(e) => handleCategory(e.target.value as CategoryKey | "")} style={inputStyle}>
                    <option value="">Selecciona una categoría</option>
                    {(Object.keys(categoryLabels) as CategoryKey[]).map((key) => (
                      <option key={key} value={key}>{categoryLabels[key]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Material</label>
                  <select value={material} onChange={(e) => handleMaterial(e.target.value)} disabled={!categoria} style={{ ...inputStyle, opacity: categoria ? 1 : 0.55 }}>
                    <option value="">{categoria ? "Selecciona un material" : "Selecciona primero una categoría"}</option>
                    {categoria && materials[categoria].map((item) => (
                      <option key={item.name} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Unidad de medida</label>
                  <select value={unidad} onChange={(e) => setUnidad(e.target.value)} style={inputStyle}>
                    <option value="pies">Pies</option>
                    <option value="pulgadas">Pulgadas</option>
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={labelStyle}>Ancho</label>
                    <input type="number" min="0" step="0.01" value={ancho} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setAncho)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Alto</label>
                    <input type="number" min="0" step="0.01" value={alto} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setAlto)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Cantidad</label>
                    <input type="number" min="1" value={cantidad} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setCantidad)} style={inputStyle} />
                  </div>
                </div>
                <div style={{ background: "#0b0e12", border: "1px solid #292f36", borderRadius: "12px", padding: "14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <span>Área por pieza: <strong>{areaPieza.toFixed(2)} ft²</strong></span>
                  <span>Área total: <strong>{areaTotal.toFixed(2)} ft²</strong></span>
                  <span>Desperdicio: <strong>{areaDesperdicio.toFixed(2)} ft²</strong></span>
                  <span>Perímetro total: <strong>{perimetroTotal.toFixed(2)} ft</strong></span>
                </div>
                <div>
                  <label style={labelStyle}>Descripción o notas</label>
                  <textarea value={notas} onChange={(e) => setNotas(e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                </div>
              </div>
            </section>
          </div>

          <section style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>Costos y extras</h2>
            <div style={{ display: "grid", gap: "13px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={labelStyle}>Desperdicio (%)</label>
                  <input type="number" min="0" step="0.01" value={desperdicio} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setDesperdicio)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Mano de obra ($)</label>
                  <input type="number" min="0" step="0.01" value={manoObra} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setManoObra)} style={inputStyle} />
                </div>
              </div>

              {checkboxRow(usarLaminado, setUsarLaminado, "Laminado", "Se cobra por pie cuadrado", <div><label style={labelStyle}>Precio por ft²</label><input type="number" min="0" step="0.01" value={laminadoPie} onChange={(e) => updateNumber(e.target.value, setLaminadoPie)} style={inputStyle} /></div>)}
              {checkboxRow(usarOjillos, setUsarOjillos, "Ojillos", "Cantidad y precio por unidad", <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}><div><label style={labelStyle}>Cantidad</label><input type="number" min="0" value={cantidadOjillos} onChange={(e) => updateNumber(e.target.value, setCantidadOjillos)} style={inputStyle} /></div><div><label style={labelStyle}>Precio c/u</label><input type="number" min="0" step="0.01" value={precioOjillo} onChange={(e) => updateNumber(e.target.value, setPrecioOjillo)} style={inputStyle} /></div></div>)}
              {checkboxRow(usarDobladillo, setUsarDobladillo, "Dobladillo", "Se cobra por pie lineal", <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}><div><label style={labelStyle}>Pies lineales</label><input type="number" min="0" step="0.01" value={piesDobladillo} placeholder={perimetroTotal.toFixed(2)} onChange={(e) => updateNumber(e.target.value, setPiesDobladillo)} style={inputStyle} /></div><div><label style={labelStyle}>Precio por pie</label><input type="number" min="0" step="0.01" value={precioDobladillo} onChange={(e) => updateNumber(e.target.value, setPrecioDobladillo)} style={inputStyle} /></div></div>)}
              {checkboxRow(usarBolsas, setUsarBolsas, "Bolsas para tubo", "Se cobra por pie lineal", <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}><div><label style={labelStyle}>Pies lineales</label><input type="number" min="0" step="0.01" value={piesBolsas} onChange={(e) => updateNumber(e.target.value, setPiesBolsas)} style={inputStyle} /></div><div><label style={labelStyle}>Precio por pie</label><input type="number" min="0" step="0.01" value={precioBolsas} onChange={(e) => updateNumber(e.target.value, setPrecioBolsas)} style={inputStyle} /></div></div>)}
              {checkboxRow(usarDiseno, setUsarDiseno, "Diseño gráfico", "Cargo fijo editable", <div><label style={labelStyle}>Cargo de diseño</label><input type="number" min="0" step="0.01" value={diseno} onChange={(e) => updateNumber(e.target.value, setDiseno)} style={inputStyle} /></div>)}
              {checkboxRow(usarInstalacion, setUsarInstalacion, "Instalación", "Cargo fijo editable", <div><label style={labelStyle}>Cargo de instalación</label><input type="number" min="0" step="0.01" value={instalacion} onChange={(e) => updateNumber(e.target.value, setInstalacion)} style={inputStyle} /></div>)}
              {checkboxRow(usarEnvio, setUsarEnvio, "Envío", "Cargo fijo editable", <div><label style={labelStyle}>Cargo de envío</label><input type="number" min="0" step="0.01" value={envio} onChange={(e) => updateNumber(e.target.value, setEnvio)} style={inputStyle} /></div>)}
            </div>
          </section>

          <section style={{ ...cardStyle, position: "sticky", top: "18px" }}>
            <h2 style={{ marginTop: 0 }}>Resumen</h2>
            <div style={{ display: "grid", gap: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={labelStyle}>Recargo (%)</label>
                  <input type="number" min="0" step="0.01" value={recargo} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setRecargo)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Impuesto (%)</label>
                  <input type="number" min="0" step="0.01" value={impuesto} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setImpuesto)} style={inputStyle} />
                </div>
              </div>

              <div style={{ background: "#0b0e12", border: "1px solid #292f36", borderRadius: "12px", padding: "16px", display: "grid", gap: "10px" }}>
                <SummaryRow label="Material sin desperdicio" value={money(costoMaterialBase)} />
                <SummaryRow label="Costo del desperdicio" value={money(costoDesperdicio)} />
                <SummaryRow label="Material total" value={money(costoMaterial)} />
                <SummaryRow label="Mano de obra" value={money(costoManoObra)} />
                <SummaryRow label="Extras de producción" value={money(extrasProduccion)} />
                <SummaryRow label="Costo de producción" value={money(costoProduccion)} strong />
                <SummaryRow label="Recargo" value={money(montoRecargo)} />
                <SummaryRow label="Precio del producto" value={money(precioProducto)} strong />
                <SummaryRow label="Diseño / instalación / envío" value={money(costoDiseno + costoInstalacion + costoEnvio)} />
                <SummaryRow label="Subtotal" value={money(subtotal)} />
                <SummaryRow label="Impuestos" value={money(impuestos)} />
                <div style={{ borderTop: "1px solid #30363d", paddingTop: "14px", marginTop: "4px" }}>
                  <div style={{ color: "#8b949e", fontSize: "13px" }}>TOTAL</div>
                  <div style={{ color: "#ff3838", fontSize: "34px", fontWeight: 900, marginTop: "4px" }}>{money(total)}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "5px" }}>
                  <div style={{ background: "#14181d", borderRadius: "10px", padding: "11px" }}><small style={{ color: "#8b949e" }}>Utilidad</small><div style={{ fontWeight: 800, marginTop: "4px" }}>{money(utilidadDolares)}</div></div>
                  <div style={{ background: "#14181d", borderRadius: "10px", padding: "11px" }}><small style={{ color: "#8b949e" }}>Utilidad sobre venta</small><div style={{ fontWeight: 800, marginTop: "4px" }}>{utilidadPorcentaje.toFixed(1)}%</div></div>
                </div>
              </div>

              <button type="button" onClick={() => setCalculado(true)} style={{ width: "100%", padding: "15px", background: "#d00000", color: "white", border: 0, borderRadius: "10px", fontSize: "17px", fontWeight: 900, cursor: "pointer" }}>Calcular cotización</button>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <button type="button" disabled={!calculado} onClick={guardarCotizacion} style={{ padding: "12px", background: calculado ? "#24292f" : "#171a1f", color: calculado ? "white" : "#666", border: "1px solid #30363d", borderRadius: "9px", cursor: calculado ? "pointer" : "not-allowed", fontWeight: 700 }}>Guardar</button>
                <button type="button" disabled={!calculado} onClick={() => window.print()} style={{ padding: "12px", background: calculado ? "#24292f" : "#171a1f", color: calculado ? "white" : "#666", border: "1px solid #30363d", borderRadius: "9px", cursor: calculado ? "pointer" : "not-allowed", fontWeight: 700 }}>Imprimir / PDF</button>
              </div>
              {calculado && <div style={{ background: "#102117", color: "#86efac", border: "1px solid #1f5131", borderRadius: "10px", padding: "11px", textAlign: "center", fontWeight: 700 }}>Cotización calculada correctamente</div>}
            </div>
          </section>
        </div>
      </div>
    </main>

    <section className="print-quote">
      <div className="print-section" style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #b00000", paddingBottom: "8px", marginBottom: "8px" }}>
        <div>
          <div style={{ fontSize: "19px", fontWeight: 900 }}>XTREME ICONS AGENCY</div>
          <div style={{ fontSize: "9px", marginTop: "2px" }}>Professional Printing & Creative Services</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "16px", fontWeight: 900 }}>COTIZACIÓN</div>
          <div><strong>{numeroCotizacion}</strong></div>
          <div>{new Date().toLocaleDateString("en-US")}</div>
        </div>
      </div>

      <div className="print-section" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "8px" }}>
        <div style={{ border: "1px solid #bbb", padding: "7px" }}>
          <strong>CLIENTE</strong>
          <div style={{ marginTop: "4px" }}>{nombreCliente || "—"}</div>
          <div>{empresa || ""}</div>
          <div>{telefono || ""}{telefono && correo ? " · " : ""}{correo || ""}</div>
        </div>
        <div style={{ border: "1px solid #bbb", padding: "7px" }}>
          <strong>RESUMEN DEL TRABAJO</strong>
          <div style={{ marginTop: "4px" }}>{categoria ? categoryLabels[categoria] : "—"} · {material || "—"}</div>
          <div>{num(ancho)} × {num(alto)} {unidad} · Cantidad: {num(cantidad)}</div>
          <div>Área total: {areaTotal.toFixed(2)} ft²</div>
        </div>
      </div>

      <table className="print-table print-section" style={{ marginBottom: "8px" }}>
        <thead><tr><th>Concepto</th><th>Detalle</th><th style={{ textAlign: "right" }}>Importe</th></tr></thead>
        <tbody>
          <tr><td>Producto</td><td>{categoria ? categoryLabels[categoria] : "—"}, {material || "—"}, {num(ancho)} × {num(alto)} {unidad}, {num(cantidad)} unidad(es)</td><td style={{ textAlign: "right" }}>{money(precioProducto)}</td></tr>
          {usarLaminado && <tr><td>Laminado</td><td>{areaTotal.toFixed(2)} ft² × {money(num(laminadoPie))}</td><td style={{ textAlign: "right" }}>{money(costoLaminado)}</td></tr>}
          {usarOjillos && <tr><td>Ojillos</td><td>{num(cantidadOjillos)} × {money(num(precioOjillo))}</td><td style={{ textAlign: "right" }}>{money(costoOjillos)}</td></tr>}
          {usarDobladillo && <tr><td>Dobladillo</td><td>{num(piesDobladillo)} pies lineales</td><td style={{ textAlign: "right" }}>{money(costoDobladillo)}</td></tr>}
          {usarBolsas && <tr><td>Bolsas para tubo</td><td>{num(piesBolsas)} pies lineales</td><td style={{ textAlign: "right" }}>{money(costoBolsas)}</td></tr>}
          {usarDiseno && <tr><td>Diseño gráfico</td><td>Cargo de diseño</td><td style={{ textAlign: "right" }}>{money(costoDiseno)}</td></tr>}
          {usarInstalacion && <tr><td>Instalación</td><td>Cargo de instalación</td><td style={{ textAlign: "right" }}>{money(costoInstalacion)}</td></tr>}
          {usarEnvio && <tr><td>Envío</td><td>Cargo de envío</td><td style={{ textAlign: "right" }}>{money(costoEnvio)}</td></tr>}
        </tbody>
      </table>

      {notas && <div className="print-section" style={{ border: "1px solid #bbb", padding: "7px", marginBottom: "8px" }}><strong>NOTAS</strong><div style={{ marginTop: "3px", whiteSpace: "pre-wrap" }}>{notas}</div></div>}

      <div className="print-section" style={{ marginLeft: "auto", width: "48%", border: "1px solid #999", padding: "7px" }}>
        <PrintRow label="Subtotal" value={money(subtotal)} />
        <PrintRow label={`Impuesto (${num(impuesto).toFixed(2)}%)`} value={money(impuestos)} />
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #111", marginTop: "5px", paddingTop: "5px", fontSize: "16px", fontWeight: 900 }}><span>TOTAL</span><span>{money(total)}</span></div>
      </div>

      <div className="print-section" style={{ marginTop: "10px", borderTop: "1px solid #aaa", paddingTop: "6px", fontSize: "8.5px", color: "#333" }}>
        Esta cotización está sujeta a confirmación de medidas, materiales y disponibilidad. Gracias por elegir Xtreme Icons Agency.
      </div>
    </section>
    </>
  );
}

function PrintRow({ label, value }: { label: string; value: string }) {
  return <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "2px 0" }}><span>{label}</span><strong>{value}</strong></div>;
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "14px", fontWeight: strong ? 800 : 500 }}>
      <span style={{ color: strong ? "#f3f4f6" : "#aeb6c1" }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
