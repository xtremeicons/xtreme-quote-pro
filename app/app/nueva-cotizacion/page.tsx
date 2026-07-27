"use client";

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";

type Language = "es" | "en";
type NumericValue = number | "";

const translations = {
  es: {
    back: "← Regresar al inicio",
    newQuote: "Nueva cotización",
    quote: "Cotización",
    clientInfo: "Información del cliente",
    clientName: "Nombre del cliente",
    company: "Empresa",
    phone: "Teléfono",
    email: "Correo",
    productMeasurements: "Producto y medidas",
    category: "Categoría",
    selectCategory: "Selecciona una categoría",
    material: "Material",
    selectMaterial: "Selecciona un material",
    selectCategoryFirst: "Selecciona primero una categoría",
    unit: "Unidad de medida",
    feet: "Pies",
    inches: "Pulgadas",
    width: "Ancho",
    height: "Alto",
    quantity: "Cantidad",
    areaPerPiece: "Área por pieza",
    totalArea: "Área total",
    waste: "Desperdicio",
    totalPerimeter: "Perímetro total",
    notes: "Descripción o notas",
    costsExtras: "Costos y extras",
    labor: "Mano de obra ($)",
    laminate: "Laminado",
    chargedSqFt: "Se cobra por pie cuadrado",
    priceSqFt: "Precio por ft²",
    grommets: "Ojillos",
    qtyUnitPrice: "Cantidad y precio por unidad",
    unitPrice: "Precio c/u",
    hem: "Dobladillo",
    chargedLinearFt: "Se cobra por pie lineal",
    linearFeet: "Pies lineales",
    pricePerFoot: "Precio por pie",
    polePockets: "Bolsas para tubo",
    graphicDesign: "Diseño gráfico",
    editableFixedFee: "Cargo fijo editable",
    designFee: "Cargo de diseño",
    installation: "Instalación",
    installationFee: "Cargo de instalación",
    shipping: "Envío",
    shippingFee: "Cargo de envío",
    summary: "Resumen",
    markup: "Recargo (%)",
    tax: "Impuesto (%)",
    materialNoWaste: "Material sin desperdicio",
    wasteCost: "Costo del desperdicio",
    materialTotal: "Material total",
    laborSummary: "Mano de obra",
    productionExtras: "Extras de producción",
    productionCost: "Costo de producción",
    markupSummary: "Recargo",
    productPrice: "Precio del producto",
    serviceExtras: "Diseño / instalación / envío",
    subtotal: "Subtotal",
    taxes: "Impuestos",
    total: "TOTAL",
    profit: "Utilidad",
    profitOnSale: "Utilidad sobre venta",
    calculate: "Calcular cotización",
    save: "Guardar",
    printPdf: "Imprimir / PDF",
    calculated: "Cotización calculada correctamente",
    saved: "guardada. La próxima será",
    client: "CLIENTE",
    jobSummary: "RESUMEN DEL TRABAJO",
    concept: "Concepto",
    detail: "Detalle",
    amount: "Importe",
    product: "Producto",
    units: "unidad(es)",
    designCharge: "Cargo de diseño",
    installationCharge: "Cargo de instalación",
    shippingCharge: "Cargo de envío",
    printNotes: "NOTAS",
    disclaimer: "Esta cotización está sujeta a confirmación de medidas, materiales y disponibilidad. Gracias por elegir Xtreme Icons Agency.",
    professionalServices: "Professional Printing & Creative Services",
  },
  en: {
    back: "← Back to home",
    newQuote: "New quote",
    quote: "Quote",
    clientInfo: "Client information",
    clientName: "Client name",
    company: "Company",
    phone: "Phone",
    email: "Email",
    productMeasurements: "Product and measurements",
    category: "Category",
    selectCategory: "Select a category",
    material: "Material",
    selectMaterial: "Select a material",
    selectCategoryFirst: "Select a category first",
    unit: "Unit of measurement",
    feet: "Feet",
    inches: "Inches",
    width: "Width",
    height: "Height",
    quantity: "Quantity",
    areaPerPiece: "Area per piece",
    totalArea: "Total area",
    waste: "Waste",
    totalPerimeter: "Total perimeter",
    notes: "Description or notes",
    costsExtras: "Costs and extras",
    labor: "Labor ($)",
    laminate: "Lamination",
    chargedSqFt: "Charged per square foot",
    priceSqFt: "Price per ft²",
    grommets: "Grommets",
    qtyUnitPrice: "Quantity and price per unit",
    unitPrice: "Unit price",
    hem: "Hem",
    chargedLinearFt: "Charged per linear foot",
    linearFeet: "Linear feet",
    pricePerFoot: "Price per foot",
    polePockets: "Pole pockets",
    graphicDesign: "Graphic design",
    editableFixedFee: "Editable fixed fee",
    designFee: "Design fee",
    installation: "Installation",
    installationFee: "Installation fee",
    shipping: "Shipping",
    shippingFee: "Shipping fee",
    summary: "Summary",
    markup: "Markup (%)",
    tax: "Tax (%)",
    materialNoWaste: "Material before waste",
    wasteCost: "Waste cost",
    materialTotal: "Total material",
    laborSummary: "Labor",
    productionExtras: "Production extras",
    productionCost: "Production cost",
    markupSummary: "Markup",
    productPrice: "Product price",
    serviceExtras: "Design / installation / shipping",
    subtotal: "Subtotal",
    taxes: "Taxes",
    total: "TOTAL",
    profit: "Profit",
    profitOnSale: "Profit on sale",
    calculate: "Calculate quote",
    save: "Save",
    printPdf: "Print / PDF",
    calculated: "Quote calculated successfully",
    saved: "saved. The next one will be",
    client: "CLIENT",
    jobSummary: "JOB SUMMARY",
    concept: "Item",
    detail: "Detail",
    amount: "Amount",
    product: "Product",
    units: "unit(s)",
    designCharge: "Design fee",
    installationCharge: "Installation fee",
    shippingCharge: "Shipping fee",
    printNotes: "NOTES",
    disclaimer: "This quote is subject to confirmation of measurements, materials, and availability. Thank you for choosing Xtreme Icons Agency.",
    professionalServices: "Professional Printing & Creative Services",
  },
} as const;
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

const categoryLabels: Record<Language, Record<CategoryKey, string>> = {
  es: {
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
  },
  en: {
    banner: "Banner",
    coroplast: "Coroplast",
    vinyl: "Adhesive vinyl",
    "window-perf": "Window Perf",
    magnets: "Magnets",
    canvas: "Canvas",
    pvc: "PVC",
    acrylic: "Acrylic",
    dtf: "DTF",
    "uv-dtf": "UV DTF",
    "business-cards": "Business cards",
  },
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
  const [language, setLanguage] = useState<Language>("es");
  const t = translations[language];
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
    const savedLanguage = window.localStorage.getItem("xqs-language");
    if (savedLanguage === "es" || savedLanguage === "en") setLanguage(savedLanguage);

    const saved = window.localStorage.getItem("xqs-next-quote-number");
    const nextNumber = saved ? Math.max(1, Number(saved) || 1) : 1;
    setNumeroSecuencial(nextNumber);
    setNumeroCotizacion(`XQS-${String(nextNumber).padStart(4, "0")}`);
  }, []);

  const cambiarIdioma = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("xqs-language", nextLanguage);
  };

  const guardarCotizacion = () => {
    if (!calculado) return;
    const nextNumber = numeroSecuencial + 1;
    window.localStorage.setItem("xqs-next-quote-number", String(nextNumber));
    window.alert(`${t.quote} ${numeroCotizacion} ${t.saved} XQS-${String(nextNumber).padStart(4, "0")}.`);
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
          {t.back}
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
              {t.newQuote}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <div
              style={{
                display: "flex",
                padding: "4px",
                background: "#111418",
                border: "1px solid #2a3037",
                borderRadius: "12px",
              }}
            >
              <button
                type="button"
                onClick={() => cambiarIdioma("es")}
                aria-pressed={language === "es"}
                style={{
                  padding: "8px 11px",
                  border: 0,
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 800,
                  background: language === "es" ? "#d00000" : "transparent",
                  color: "white",
                }}
              >
                🇪🇸 Español
              </button>
              <button
                type="button"
                onClick={() => cambiarIdioma("en")}
                aria-pressed={language === "en"}
                style={{
                  padding: "8px 11px",
                  border: 0,
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 800,
                  background: language === "en" ? "#d00000" : "transparent",
                  color: "white",
                }}
              >
                🇺🇸 English
              </button>
            </div>
          <div
            style={{
              background: "#111418",
              border: "1px solid #2a3037",
              borderRadius: "12px",
              padding: "12px 16px",
            }}
          >
            <small style={{ color: "#8b949e" }}>{t.quote}</small>
            <div style={{ fontWeight: 800, marginTop: "3px" }}>
              {numeroCotizacion}
            </div>
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
              <h2 style={{ marginTop: 0 }}>{t.clientInfo}</h2>
              <div style={{ display: "grid", gap: "13px" }}>
                <div>
                  <label style={labelStyle}>{t.clientName}</label>
                  <input value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{t.company}</label>
                  <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={labelStyle}>{t.phone}</label>
                    <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.email}</label>
                    <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} style={inputStyle} />
                  </div>
                </div>
              </div>
            </section>

            <section style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>{t.productMeasurements}</h2>
              <div style={{ display: "grid", gap: "13px" }}>
                <div>
                  <label style={labelStyle}>{t.category}</label>
                  <select value={categoria} onChange={(e) => handleCategory(e.target.value as CategoryKey | "")} style={inputStyle}>
                    <option value="">{t.selectCategory}</option>
                    {(Object.keys(categoryLabels[language]) as CategoryKey[]).map((key) => (
                      <option key={key} value={key}>{categoryLabels[language][key]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{t.material}</label>
                  <select value={material} onChange={(e) => handleMaterial(e.target.value)} disabled={!categoria} style={{ ...inputStyle, opacity: categoria ? 1 : 0.55 }}>
                    <option value="">{categoria ? t.selectMaterial : t.selectCategoryFirst}</option>
                    {categoria && materials[categoria].map((item) => (
                      <option key={item.name} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{t.unit}</label>
                  <select value={unidad} onChange={(e) => setUnidad(e.target.value)} style={inputStyle}>
                    <option value="pies">{t.feet}</option>
                    <option value="pulgadas">{t.inches}</option>
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={labelStyle}>{t.width}</label>
                    <input type="number" min="0" step="0.01" value={ancho} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setAncho)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.height}</label>
                    <input type="number" min="0" step="0.01" value={alto} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setAlto)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.quantity}</label>
                    <input type="number" min="1" value={cantidad} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setCantidad)} style={inputStyle} />
                  </div>
                </div>
                <div style={{ background: "#0b0e12", border: "1px solid #292f36", borderRadius: "12px", padding: "14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <span>{t.areaPerPiece}: <strong>{areaPieza.toFixed(2)} ft²</strong></span>
                  <span>{t.totalArea}: <strong>{areaTotal.toFixed(2)} ft²</strong></span>
                  <span>{t.waste}: <strong>{areaDesperdicio.toFixed(2)} ft²</strong></span>
                  <span>{t.totalPerimeter}: <strong>{perimetroTotal.toFixed(2)} ft</strong></span>
                </div>
                <div>
                  <label style={labelStyle}>{t.notes}</label>
                  <textarea value={notas} onChange={(e) => setNotas(e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                </div>
              </div>
            </section>
          </div>

          <section style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>{t.costsExtras}</h2>
            <div style={{ display: "grid", gap: "13px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={labelStyle}>{t.waste} (%)</label>
                  <input type="number" min="0" step="0.01" value={desperdicio} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setDesperdicio)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{t.labor}</label>
                  <input type="number" min="0" step="0.01" value={manoObra} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setManoObra)} style={inputStyle} />
                </div>
              </div>

              {checkboxRow(usarLaminado, setUsarLaminado, t.laminate, t.chargedSqFt, <div><label style={labelStyle}>{t.priceSqFt}</label><input type="number" min="0" step="0.01" value={laminadoPie} onChange={(e) => updateNumber(e.target.value, setLaminadoPie)} style={inputStyle} /></div>)}
              {checkboxRow(usarOjillos, setUsarOjillos, t.grommets, t.qtyUnitPrice, <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}><div><label style={labelStyle}>{t.quantity}</label><input type="number" min="0" value={cantidadOjillos} onChange={(e) => updateNumber(e.target.value, setCantidadOjillos)} style={inputStyle} /></div><div><label style={labelStyle}>{t.unitPrice}</label><input type="number" min="0" step="0.01" value={precioOjillo} onChange={(e) => updateNumber(e.target.value, setPrecioOjillo)} style={inputStyle} /></div></div>)}
              {checkboxRow(usarDobladillo, setUsarDobladillo, t.hem, t.chargedLinearFt, <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}><div><label style={labelStyle}>{t.linearFeet}</label><input type="number" min="0" step="0.01" value={piesDobladillo} placeholder={perimetroTotal.toFixed(2)} onChange={(e) => updateNumber(e.target.value, setPiesDobladillo)} style={inputStyle} /></div><div><label style={labelStyle}>{t.pricePerFoot}</label><input type="number" min="0" step="0.01" value={precioDobladillo} onChange={(e) => updateNumber(e.target.value, setPrecioDobladillo)} style={inputStyle} /></div></div>)}
              {checkboxRow(usarBolsas, setUsarBolsas, t.polePockets, t.chargedLinearFt, <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}><div><label style={labelStyle}>{t.linearFeet}</label><input type="number" min="0" step="0.01" value={piesBolsas} onChange={(e) => updateNumber(e.target.value, setPiesBolsas)} style={inputStyle} /></div><div><label style={labelStyle}>{t.pricePerFoot}</label><input type="number" min="0" step="0.01" value={precioBolsas} onChange={(e) => updateNumber(e.target.value, setPrecioBolsas)} style={inputStyle} /></div></div>)}
              {checkboxRow(usarDiseno, setUsarDiseno, t.graphicDesign, t.editableFixedFee, <div><label style={labelStyle}>{t.designFee}</label><input type="number" min="0" step="0.01" value={diseno} onChange={(e) => updateNumber(e.target.value, setDiseno)} style={inputStyle} /></div>)}
              {checkboxRow(usarInstalacion, setUsarInstalacion, t.installation, t.editableFixedFee, <div><label style={labelStyle}>{t.installationFee}</label><input type="number" min="0" step="0.01" value={instalacion} onChange={(e) => updateNumber(e.target.value, setInstalacion)} style={inputStyle} /></div>)}
              {checkboxRow(usarEnvio, setUsarEnvio, t.shipping, t.editableFixedFee, <div><label style={labelStyle}>{t.shippingFee}</label><input type="number" min="0" step="0.01" value={envio} onChange={(e) => updateNumber(e.target.value, setEnvio)} style={inputStyle} /></div>)}
            </div>
          </section>

          <section style={{ ...cardStyle, position: "sticky", top: "18px" }}>
            <h2 style={{ marginTop: 0 }}>{t.summary}</h2>
            <div style={{ display: "grid", gap: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={labelStyle}>{t.markup}</label>
                  <input type="number" min="0" step="0.01" value={recargo} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setRecargo)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{t.tax}</label>
                  <input type="number" min="0" step="0.01" value={impuesto} onFocus={(e) => e.currentTarget.select()} onChange={(e) => updateNumber(e.target.value, setImpuesto)} style={inputStyle} />
                </div>
              </div>

              <div style={{ background: "#0b0e12", border: "1px solid #292f36", borderRadius: "12px", padding: "16px", display: "grid", gap: "10px" }}>
                <SummaryRow label={t.materialNoWaste} value={money(costoMaterialBase)} />
                <SummaryRow label={t.wasteCost} value={money(costoDesperdicio)} />
                <SummaryRow label={t.materialTotal} value={money(costoMaterial)} />
                <SummaryRow label={t.laborSummary} value={money(costoManoObra)} />
                <SummaryRow label={t.productionExtras} value={money(extrasProduccion)} />
                <SummaryRow label={t.productionCost} value={money(costoProduccion)} strong />
                <SummaryRow label={t.markupSummary} value={money(montoRecargo)} />
                <SummaryRow label={t.productPrice} value={money(precioProducto)} strong />
                <SummaryRow label={t.serviceExtras} value={money(costoDiseno + costoInstalacion + costoEnvio)} />
                <SummaryRow label={t.subtotal} value={money(subtotal)} />
                <SummaryRow label={t.taxes} value={money(impuestos)} />
                <div style={{ borderTop: "1px solid #30363d", paddingTop: "14px", marginTop: "4px" }}>
                  <div style={{ color: "#8b949e", fontSize: "13px" }}>{t.total}</div>
                  <div style={{ color: "#ff3838", fontSize: "34px", fontWeight: 900, marginTop: "4px" }}>{money(total)}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "5px" }}>
                  <div style={{ background: "#14181d", borderRadius: "10px", padding: "11px" }}><small style={{ color: "#8b949e" }}>{t.profit}</small><div style={{ fontWeight: 800, marginTop: "4px" }}>{money(utilidadDolares)}</div></div>
                  <div style={{ background: "#14181d", borderRadius: "10px", padding: "11px" }}><small style={{ color: "#8b949e" }}>{t.profitOnSale}</small><div style={{ fontWeight: 800, marginTop: "4px" }}>{utilidadPorcentaje.toFixed(1)}%</div></div>
                </div>
              </div>

              <button type="button" onClick={() => setCalculado(true)} style={{ width: "100%", padding: "15px", background: "#d00000", color: "white", border: 0, borderRadius: "10px", fontSize: "17px", fontWeight: 900, cursor: "pointer" }}>{t.calculate}</button>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <button type="button" disabled={!calculado} onClick={guardarCotizacion} style={{ padding: "12px", background: calculado ? "#24292f" : "#171a1f", color: calculado ? "white" : "#666", border: "1px solid #30363d", borderRadius: "9px", cursor: calculado ? "pointer" : "not-allowed", fontWeight: 700 }}>{t.save}</button>
                <button type="button" disabled={!calculado} onClick={() => window.print()} style={{ padding: "12px", background: calculado ? "#24292f" : "#171a1f", color: calculado ? "white" : "#666", border: "1px solid #30363d", borderRadius: "9px", cursor: calculado ? "pointer" : "not-allowed", fontWeight: 700 }}>{t.printPdf}</button>
              </div>
              {calculado && <div style={{ background: "#102117", color: "#86efac", border: "1px solid #1f5131", borderRadius: "10px", padding: "11px", textAlign: "center", fontWeight: 700 }}>{t.calculated}</div>}
            </div>
          </section>
        </div>
      </div>
    </main>

    <section className="print-quote">
      <div className="print-section" style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #b00000", paddingBottom: "8px", marginBottom: "8px" }}>
        <div>
          <div style={{ fontSize: "19px", fontWeight: 900 }}>XTREME ICONS AGENCY</div>
          <div style={{ fontSize: "9px", marginTop: "2px" }}>{t.professionalServices}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "16px", fontWeight: 900 }}>{t.quote.toUpperCase()}</div>
          <div><strong>{numeroCotizacion}</strong></div>
          <div>{new Date().toLocaleDateString(language === "es" ? "es-US" : "en-US")}</div>
        </div>
      </div>

      <div className="print-section" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "8px" }}>
        <div style={{ border: "1px solid #bbb", padding: "7px" }}>
          <strong>{t.client}</strong>
          <div style={{ marginTop: "4px" }}>{nombreCliente || "—"}</div>
          <div>{empresa || ""}</div>
          <div>{telefono || ""}{telefono && correo ? " · " : ""}{correo || ""}</div>
        </div>
        <div style={{ border: "1px solid #bbb", padding: "7px" }}>
          <strong>{t.jobSummary}</strong>
          <div style={{ marginTop: "4px" }}>{categoria ? categoryLabels[language][categoria] : "—"} · {material || "—"}</div>
          <div>{num(ancho)} × {num(alto)} {unidad} · {t.quantity}: {num(cantidad)}</div>
          <div>{t.totalArea}: {areaTotal.toFixed(2)} ft²</div>
        </div>
      </div>

      <table className="print-table print-section" style={{ marginBottom: "8px" }}>
        <thead><tr><th>{t.concept}</th><th>{t.detail}</th><th style={{ textAlign: "right" }}>{t.amount}</th></tr></thead>
        <tbody>
          <tr><td>{t.product}</td><td>{categoria ? categoryLabels[language][categoria] : "—"}, {material || "—"}, {num(ancho)} × {num(alto)} {unidad}, {num(cantidad)} {t.units}</td><td style={{ textAlign: "right" }}>{money(precioProducto)}</td></tr>
          {usarLaminado && <tr><td>{t.laminate}</td><td>{areaTotal.toFixed(2)} ft² × {money(num(laminadoPie))}</td><td style={{ textAlign: "right" }}>{money(costoLaminado)}</td></tr>}
          {usarOjillos && <tr><td>{t.grommets}</td><td>{num(cantidadOjillos)} × {money(num(precioOjillo))}</td><td style={{ textAlign: "right" }}>{money(costoOjillos)}</td></tr>}
          {usarDobladillo && <tr><td>{t.hem}</td><td>{num(piesDobladillo)} {t.linearFeet.toLowerCase()}</td><td style={{ textAlign: "right" }}>{money(costoDobladillo)}</td></tr>}
          {usarBolsas && <tr><td>{t.polePockets}</td><td>{num(piesBolsas)} {t.linearFeet.toLowerCase()}</td><td style={{ textAlign: "right" }}>{money(costoBolsas)}</td></tr>}
          {usarDiseno && <tr><td>{t.graphicDesign}</td><td>{t.designCharge}</td><td style={{ textAlign: "right" }}>{money(costoDiseno)}</td></tr>}
          {usarInstalacion && <tr><td>{t.installation}</td><td>{t.installationCharge}</td><td style={{ textAlign: "right" }}>{money(costoInstalacion)}</td></tr>}
          {usarEnvio && <tr><td>{t.shipping}</td><td>{t.shippingCharge}</td><td style={{ textAlign: "right" }}>{money(costoEnvio)}</td></tr>}
        </tbody>
      </table>

      {notas && <div className="print-section" style={{ border: "1px solid #bbb", padding: "7px", marginBottom: "8px" }}><strong>{t.printNotes}</strong><div style={{ marginTop: "3px", whiteSpace: "pre-wrap" }}>{notas}</div></div>}

      <div className="print-section" style={{ marginLeft: "auto", width: "48%", border: "1px solid #999", padding: "7px" }}>
        <PrintRow label={t.subtotal} value={money(subtotal)} />
        <PrintRow label={`${t.tax.replace(" (%)", "")} (${num(impuesto).toFixed(2)}%)`} value={money(impuestos)} />
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #111", marginTop: "5px", paddingTop: "5px", fontSize: "16px", fontWeight: 900 }}><span>{t.total}</span><span>{money(total)}</span></div>
      </div>

      <div className="print-section" style={{ marginTop: "10px", borderTop: "1px solid #aaa", paddingTop: "6px", fontSize: "8.5px", color: "#333" }}>
        {t.disclaimer}
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
