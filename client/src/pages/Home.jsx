/* Design: Contemporary Editorial Waybill — deep navy structure, warm paper workspace, signal ochre for actionable value. */
import React, { useState, useMemo } from "react";
import {
  DollarSign, Zap, Truck, Brain, Globe, ChevronRight, ChevronLeft,
  Check, Printer, RotateCcw, ArrowRight, CheckCircle2, AlertCircle,
  XCircle, Info, Shield, Clock, Percent, Search, Landmark, Sparkles, Send, MessageSquare
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

/* ---------------------------------------------------------------------- */
/* DESIGN TOKENS — manifest / waybill inspired, not generic SaaS defaults */
/* ---------------------------------------------------------------------- */

const C = {
  ink: "#12181F",
  lane: "#132A3D",
  laneSoft: "#1D3A52",
  signal: "#B8590A",
  signalSoft: "#F2E2D0",
  paper: "#F7F6F2",
  card: "#FFFFFF",
  line: "#E1DFD8",
  mist: "#7C8188",
  gtm: "#4C3B6E",
  gtmSoft: "#EFEBF5",
};
const OTM_TARGET_MARKER = "#C4472D";

const MONO = "'SF Mono','JetBrains Mono',ui-monospace,'Roboto Mono',monospace";
const SANS = "-apple-system,'Segoe UI',ui-sans-serif,system-ui,sans-serif";
const BRAND_MARK = "/manus-storage/otm-route-value-mark_e763ba61.png";
const NETWORK_VISUAL = "/manus-storage/otm-network-discovery_edbaefb7.jpg";
const TRADE_VISUAL = "/manus-storage/otm-trade-compliance_afe12dd1.jpg";
const CASE_VISUAL = "/manus-storage/otm-value-brief_3508d6d3.jpg";

/* ---------------------------------------------------------------------- */
/* DATA                                                                    */
/* ---------------------------------------------------------------------- */

const CATEGORIES = [
  { id: "cost", Icon: DollarSign, accent: "#B8590A" },
  { id: "efficiency", Icon: Zap, accent: "#3C6E71" },
  { id: "service", Icon: Truck, accent: "#1D6F8C" },
  { id: "decision", Icon: Brain, accent: "#6B3F52" },
  { id: "complexity", Icon: Globe, accent: "#55672F" },
];

const PAIN_IDS = {
  cost: ["cost_1", "cost_2", "cost_3", "cost_4", "cost_5"],
  efficiency: ["eff_1", "eff_2", "eff_3", "eff_4"],
  service: ["svc_1", "svc_2", "svc_3", "svc_4"],
  decision: ["dec_1", "dec_2", "dec_3", "dec_4"],
  complexity: ["cx_1", "cx_2", "cx_3", "cx_4"],
};

const GTM_CATEGORIES = [
  { id: "risk", Icon: Shield, accent: "#8C3A3A" },
  { id: "gtmeff", Icon: Clock, accent: "#6B5B3E" },
  { id: "duty", Icon: Percent, accent: "#8A6D1F" },
  { id: "audit", Icon: Search, accent: "#4C3B6E" },
  { id: "gtmcx", Icon: Landmark, accent: "#45586E" },
];

const GTM_PAIN_IDS = {
  risk: ["risk_1", "risk_2", "risk_3", "risk_4", "risk_5"],
  gtmeff: ["gtmeff_1", "gtmeff_2", "gtmeff_3", "gtmeff_4"],
  duty: ["duty_1", "duty_2", "duty_3", "duty_4"],
  audit: ["audit_1", "audit_2", "audit_3", "audit_4"],
  gtmcx: ["gtmcx_1", "gtmcx_2", "gtmcx_3", "gtmcx_4"],
};

const GTM_TRIGGER_PAIN_ID = "cx_2";

const BOB_COPY = {
  en: { label: "Bob AI · Transportation Value Diagnostic", title: "Start a transportation value diagnostic.", intro: "Describe one operating symptom. We will clarify what it means before discussing any solution path.", placeholder: "For example: We pay for too many expedited shipments and planners rebuild plans in spreadsheets every day.", analyze: "Start initial diagnostic", applying: "Add to assessment", demo: "Customer discovery protocol", evidence: "Symptoms I heard", noSignals: "I need one concrete operational symptom to map it to an OTM value driver.", question: "The one question worth answering next", ready: "Guided diagnostic", applied: "Added to your assessment", suggestion: "Try: “We use Excel to plan shipments and keep paying for expedited freight.”", confirm: "Confirm symptoms & continue", confirmed: "Customer-confirmed diagnostic", impacts: "Likely business impact", rootCause: "Hypothesis to validate", data: "Facts to validate in the working session", diagnosis: "Initial value diagnosis", diagnosisCopy: "There is a meaningful transportation value opportunity. Validate the facts below before quantifying impact or selecting a solution path.", path: "Capability paths worth evaluating", showPath: "See capability paths after diagnosis", pathIntro: "These are not preset answers. Each path below is linked to a confirmed symptom and a hypothesis that still needs data validation.", fact: "Confirmed symptom", reasoning: "Why it may matter" },
  es: { label: "Bob AI · Diagnóstico de Valor de Transporte", title: "Inicie un diagnóstico de valor de transporte.", intro: "Describa un síntoma operativo. Aclararemos lo que significa antes de hablar de una solución.", placeholder: "Por ejemplo: Pagamos demasiados envíos urgentes y los planificadores reconstruyen planes en hojas de cálculo cada día.", analyze: "Iniciar diagnóstico inicial", applying: "Agregar a la evaluación", demo: "Protocolo de descubrimiento del cliente", evidence: "Síntomas que entendí", noSignals: "Necesito un síntoma operativo concreto para asociarlo a un impulsor de valor de OTM.", question: "La única pregunta que conviene responder ahora", ready: "Diagnóstico guiado", applied: "Agregado a su evaluación", suggestion: "Pruebe: “Usamos Excel para planificar envíos y seguimos pagando fletes urgentes.”", confirm: "Confirmar síntomas y continuar", confirmed: "Diagnóstico confirmado por el cliente", impacts: "Impacto potencial en el negocio", rootCause: "Hipótesis por validar", data: "Hechos por validar en la sesión de trabajo", diagnosis: "Diagnóstico inicial de valor", diagnosisCopy: "Existe una oportunidad de valor de transporte relevante. Valide los hechos siguientes antes de cuantificar el impacto o elegir una ruta de solución.", path: "Rutas de capacidad que vale la pena evaluar", showPath: "Ver rutas de capacidad después del diagnóstico", pathIntro: "No son respuestas predefinidas. Cada ruta se vincula con un síntoma confirmado y una hipótesis que aún requiere validación de datos.", fact: "Síntoma confirmado", reasoning: "Por qué puede importar" },
  zh: { label: "Bob AI · 运输价值问诊", title: "开始一次运输价值问诊。", intro: "先用自己的话描述一个运营现象；我们先厘清它代表什么，再讨论任何解决路径。", placeholder: "例如：我们加急运输越来越多，计划人员每天都在 Excel 里反复修改运输计划。", analyze: "开始初步问诊", applying: "加入评估", demo: "客户价值发现流程", evidence: "我听到的现象", noSignals: "请补充一个具体的运营现象，我才能将它对应到 OTM 的价值驱动。", question: "最值得继续确认的问题", ready: "引导式问诊", applied: "已加入当前评估", suggestion: "可以试试：我们用 Excel 规划运输，而且一直在支付加急运费。", confirm: "确认现象并继续问诊", confirmed: "客户已确认的初步诊断", impacts: "可能造成的业务影响", rootCause: "需要验证的根因假设", data: "工作会议中需要验证的事实", diagnosis: "初步价值诊断", diagnosisCopy: "存在值得深入了解的运输价值机会。在量化影响或选择解决路径前，请先验证以下关键事实。", path: "建议进一步评估的能力路径", showPath: "在完成诊断后查看能力路径", pathIntro: "这不是预设答案。以下路径均对应客户已确认的现象，以及仍需数据验证的根因假设。", fact: "已确认的业务现象", reasoning: "为什么值得关注" },
};

function getBobSignals(input) {
  const text = input.toLowerCase();
  const rules = [
    { id: "cost_3", test: /加急|紧急|premium|expedit|rush|urgent/ },
    { id: "cost_5", test: /滞箱|滞港|附加费|detention|demurrage|accessorial/ },
    { id: "eff_1", test: /手动计划|人工计划|manual.*plan|manually.*plan|手工创建/ },
    { id: "eff_2", test: /excel|spreadsheet|邮件|email|phone|电话|表格/ },
    { id: "eff_3", test: /审计|audit|付款|payment|invoice/ },
    { id: "svc_2", test: /可见性|追踪|跟踪|visibility|tracking|track/ },
    { id: "svc_4", test: /异常|投诉|complain|exception|late.*discover/ },
    { id: "dec_1", test: /不清楚.*成本|看不到.*钱|unclear.*cost|where.*spend/ },
    { id: "cx_2", test: /多国|海关|关税|country|customs|currency|跨境/ },
  ];
  return rules.filter((rule) => rule.test.test(text)).map((rule) => rule.id);
}

function getBobQuestion(signalIds, lang) {
  const questions = {
    en: {
      cost_3: "Roughly what percentage of annual freight spend is expedited or premium?",
      eff_2: "How many planner hours per week go into spreadsheets, email, and manual changes?",
      svc_2: "How long does it typically take to discover an in-transit exception?",
      cx_2: "How many countries, currencies, or customs regimes does the operation cover?",
      default: "Which of these issues creates the largest cost or customer impact today?",
    },
    es: {
      cost_3: "¿Qué porcentaje aproximado del gasto anual en flete corresponde a envíos urgentes o premium?",
      eff_2: "¿Cuántas horas por semana dedican los planificadores a hojas de cálculo, correos y cambios manuales?",
      svc_2: "¿Cuánto tardan normalmente en descubrir una excepción durante el tránsito?",
      cx_2: "¿Cuántos países, monedas o regímenes aduaneros cubre la operación?",
      default: "¿Cuál de estos problemas tiene hoy el mayor impacto en costo o cliente?",
    },
    zh: {
      cost_3: "加急或高价运输大约占全年运费的百分之多少？",
      eff_2: "计划人员每周花多少时间在 Excel、邮件和手动变更上？",
      svc_2: "运输异常发生后，通常多久才能被发现？",
      cx_2: "目前的运营覆盖多少个国家、币种或海关监管体系？",
      default: "这些问题中，哪一项目前对成本或客户体验影响最大？",
    },
  };
  const copy = questions[lang] || questions.en;
  return copy[signalIds[0]] || copy.default;
}

function getBobDiagnostic(signalIds, lang) {
  const catalog = {
    en: {
      cost: { impact: "Unplanned freight cost and weaker control of premium spend.", root: "Planning, carrier selection, or cost rules may not be operating under consistent optimization logic.", data: "Share expedited spend and accessorial charges as a percentage of annual freight spend." },
      efficiency: { impact: "Planner capacity is consumed by repetitive manual work and handoffs.", root: "Planning, tendering, and audit activities may be fragmented across tools and teams.", data: "Estimate weekly planner hours spent in spreadsheets, email, and manual shipment changes." },
      service: { impact: "Late exception awareness can put service performance and customer trust at risk.", root: "Transport events may not be continuously visible or connected to an actionable exception process.", data: "Measure how long it typically takes to discover and act on an in-transit exception." },
      decision: { impact: "Leaders may be unable to see where transportation value is being gained or lost.", root: "Transportation data and performance measures may not yet support comparable decisions across lanes and carriers.", data: "Identify the existing carrier, lane, and cost information available for review." },
      complexity: { impact: "Complexity can make cost, service, and compliance decisions inconsistent across the network.", root: "Mode-, country-, or business-unit processes may be running in disconnected operating models.", data: "Confirm the number of modes, countries, business units, and external partners involved." },
    },
    es: {
      cost: { impact: "Costo de flete no planificado y menor control del gasto premium.", root: "La planificación, selección de transportistas o reglas de costo podrían no operar con una lógica de optimización consistente.", data: "Comparta el gasto urgente y los cargos accesorios como porcentaje del gasto anual de flete." },
      efficiency: { impact: "La capacidad de los planificadores se consume en trabajo manual repetitivo y traspasos.", root: "La planificación, licitación y auditoría podrían estar fragmentadas entre herramientas y equipos.", data: "Estime las horas semanales dedicadas a hojas de cálculo, correo y cambios manuales." },
      service: { impact: "Detectar excepciones tarde puede poner en riesgo el servicio y la confianza del cliente.", root: "Los eventos de transporte podrían no ser visibles de forma continua ni estar conectados a un proceso de excepción accionable.", data: "Mida cuánto tarda normalmente en detectar y actuar sobre una excepción en tránsito." },
      decision: { impact: "Los líderes podrían no ver dónde se gana o pierde valor de transporte.", root: "Los datos y medidas de desempeño podrían no permitir decisiones comparables entre rutas y transportistas.", data: "Identifique la información disponible de transportistas, rutas y costos." },
      complexity: { impact: "La complejidad puede volver inconsistentes las decisiones de costo, servicio y cumplimiento.", root: "Los procesos por modo, país o unidad de negocio podrían operar en modelos desconectados.", data: "Confirme el número de modos, países, unidades de negocio y socios externos." },
    },
    zh: {
      cost: { impact: "计划外运费增加，且高价运输与附加费用的控制力不足。", root: "运输计划、承运商选择或费用规则可能尚未在一致的优化逻辑下运行。", data: "确认加急运费与附加费用分别占年度运费的比例。" },
      efficiency: { impact: "计划人员的能力被重复的手工操作和跨团队交接持续占用。", root: "计划、派单和运费审核活动可能仍分散在不同工具和团队之间。", data: "估算计划人员每周花在 Excel、邮件和手动运输变更上的时间。" },
      service: { impact: "较晚发现异常，可能会影响服务表现与客户信任。", root: "运输事件可能未被持续可见地跟踪，也没有连接到可执行的异常处理机制。", data: "确认运输异常发生后，通常多久才能被发现并采取行动。" },
      decision: { impact: "管理者可能无法清晰看到运输价值在哪些环节被创造或流失。", root: "运输数据和绩效指标可能还不足以支持跨线路、跨承运商的可比决策。", data: "梳理目前可用于分析的承运商、线路与运输成本信息。" },
      complexity: { impact: "网络复杂性可能让成本、服务和合规决策在不同场景下缺乏一致性。", root: "不同运输方式、国家或业务单元可能仍在相互割裂的运营模式下工作。", data: "确认涉及的运输方式、国家、业务单元和外部合作伙伴数量。" },
    },
  };
  const categories = Object.keys(PAIN_IDS).filter((cat) => PAIN_IDS[cat].some((id) => signalIds.includes(id)));
  const selected = catalog[lang] || catalog.en;
  return { categories, impacts: categories.map((cat) => selected[cat].impact), roots: categories.map((cat) => selected[cat].root), data: categories.map((cat) => selected[cat].data) };
}

const INDUSTRY_IDS = ["ind_manuf", "ind_retail", "ind_energy", "ind_travel", "ind_tech", "ind_food", "ind_other"];
const MATURITY_LEVELS = [1, 2, 3, 4, 5];
const TARGET_MATURITY = 4;

/* Ranges are % of TMS-addressable freight spend. Calibrated against
   commonly-cited industry ranges (ARC Advisory Group ~8-10% overall;
   Supply Chain Digest 5-15%; freight audit recovery consistently
   reported 3-7% across independent sources). Summed low/high across
   all four drivers lands at 4.5%-15%, matching the commonly cited
   overall-TMS-savings range rather than exceeding it. */
const DRIVERS = [
  { id: "drv_opt", low: 0.02, high: 0.06, categories: ["cost"] },
  { id: "drv_consol", low: 0.01, high: 0.03, categories: ["cost"] },
  { id: "drv_access", low: 0.005, high: 0.02, categories: ["cost"] },
  { id: "drv_audit", low: 0.01, high: 0.04, categories: ["efficiency"] },
];

/* GTM drivers scale off annual duty/tariff spend, not freight spend.
   Calibrated conservatively against FTA utilization research (US FTA
   utilization ~77%, meaning roughly a quarter of eligible savings go
   unclaimed; margins commonly 5-25% of MFN rate) and general drawback
   recovery literature. Kept narrower than OTM's ranges deliberately —
   most of GTM's value is risk avoidance, which is not monetized here. */
const GTM_DRIVERS = [
  { id: "drv_fta", low: 0.02, high: 0.08, categories: ["duty"] },
  { id: "drv_drawback", low: 0.01, high: 0.04, categories: ["duty"] },
];

const STRATEGIC_BENEFITS = ["strat_productivity", "strat_service", "strat_visibility", "strat_decision", "strat_scale"];
const GTM_STRATEGIC_BENEFITS = ["strat_gtmrisk", "strat_gtmclass", "strat_gtmaudit", "strat_gtmagility"];

const VALUE_TREE = {
  cost: {
    en: { causes: ["Suboptimal carrier selection", "Inefficient mode selection", "Poor load consolidation", "Inefficient routing", "Uncontrolled accessorial spend"], capability: "Transportation planning & optimization, rate management, load consolidation, and freight settlement" },
    es: { causes: ["Selección subóptima de transportistas", "Selección ineficiente de modos de transporte", "Consolidación de carga deficiente", "Enrutamiento ineficiente", "Gasto accesorio sin control"], capability: "Planificación y optimización de transporte, gestión de tarifas, consolidación de carga y liquidación de fletes" },
    zh: { causes: ["承运商选择不够优化", "运输方式选择效率低", "配载/拼车不足", "路线规划效率低", "附加费用缺乏管控"], capability: "运输计划与优化、费率管理、配载整合以及运费结算" },
  },
  efficiency: {
    en: { causes: ["Manual shipment planning", "Fragmented spreadsheet and email workflows", "Manual freight audit", "No standardized playbook for planners"], capability: "Automated planning and tendering, workflow automation, and freight payment automation" },
    es: { causes: ["Planificación manual de envíos", "Flujos de trabajo fragmentados en hojas de cálculo y correo", "Auditoría de fletes manual", "Falta de un proceso estándar para planificadores"], capability: "Planificación y licitación automatizadas, automatización de flujos de trabajo y automatización del pago de fletes" },
    zh: { causes: ["手动运输计划", "分散在 Excel 和邮件中的工作流程", "运费审核依赖人工", "缺乏计划人员的标准化作业流程"], capability: "自动化计划与派单、工作流自动化，以及运费支付自动化" },
  },
  service: {
    en: { causes: ["No real-time tracking", "Reactive exception handling", "Disconnected carrier communication", "No proactive customer alerts"], capability: "Real-time visibility, exception management, and event-driven alerts" },
    es: { causes: ["Sin rastreo en tiempo real", "Manejo reactivo de excepciones", "Comunicación desconectada con transportistas", "Sin alertas proactivas al cliente"], capability: "Visibilidad en tiempo real, gestión de excepciones y alertas basadas en eventos" },
    zh: { causes: ["缺乏实时跟踪", "异常处理被动应对", "与承运商的沟通割裂", "缺乏主动的客户预警"], capability: "实时可视化、异常管理，以及基于事件的预警提醒" },
  },
  decision: {
    en: { causes: ["No unified transportation data model", "No carrier scorecards", "No lane-level analytics", "No scenario modeling"], capability: "Analytics and reporting, network and scenario modeling, and carrier performance management" },
    es: { causes: ["Sin un modelo de datos de transporte unificado", "Sin tarjetas de puntuación de transportistas", "Sin análisis a nivel de ruta", "Sin modelado de escenarios"], capability: "Análisis y reportes, modelado de red y escenarios, y gestión del desempeño de transportistas" },
    zh: { causes: ["缺乏统一的运输数据模型", "缺乏承运商绩效评分体系", "缺乏线路层面的分析能力", "缺乏情景建模能力"], capability: "分析与报表、网络与情景建模，以及承运商绩效管理" },
  },
  complexity: {
    en: { causes: ["Disconnected mode-specific tools", "No global rate and compliance engine", "Fragmented business-unit processes", "Limited 3PL/broker integration"], capability: "A single multimodal global platform with a unified control tower and 3PL/broker collaboration" },
    es: { causes: ["Herramientas desconectadas por modo de transporte", "Sin motor global de tarifas y cumplimiento", "Procesos fragmentados por unidad de negocio", "Integración limitada con 3PLs/brokers"], capability: "Una única plataforma multimodal global con torre de control unificada y colaboración con 3PLs/brokers" },
    zh: { causes: ["各运输方式的工具相互割裂", "缺乏全球统一的费率与合规引擎", "各业务单元流程分散", "与第三方物流/货代的集成有限"], capability: "统一的多式联运全球平台，具备统一控制塔以及第三方物流/货代协同能力" },
  },
};

const GTM_VALUE_TREE = {
  risk: {
    en: { causes: ["Screening not integrated into order, ship, and pay workflows", "No automated watch-list updates", "Classification not standardized across teams", "No audit trail of screening decisions"], capability: "Automated restricted-party screening, ECCN/HS classification, and license management embedded directly in transaction workflows" },
    es: { causes: ["La verificación no está integrada en los flujos de pedido, envío y pago", "Sin actualizaciones automáticas de listas de vigilancia", "Clasificación no estandarizada entre equipos", "Sin rastro de auditoría de las decisiones de verificación"], capability: "Verificación automatizada de partes restringidas, clasificación ECCN/HS y gestión de licencias integradas directamente en los flujos de transacciones" },
    zh: { causes: ["筛查未嵌入下单、发货、付款流程", "缺乏自动化的名单更新机制", "各团队归类标准不统一", "筛查决策缺乏审计记录"], capability: "将自动化受限方筛查、ECCN/HS 归类与许可证管理直接嵌入交易流程" },
  },
  gtmeff: {
    en: { causes: ["Manual classification research per SKU", "Manual document assembly per shipment", "No workflow automation for approvals", "No shared system of record"], capability: "Automated classification, document generation, and approval workflows" },
    es: { causes: ["Investigación de clasificación manual por SKU", "Ensamblaje manual de documentos por envío", "Sin automatización de flujo de trabajo para aprobaciones", "Sin sistema de registro compartido"], capability: "Clasificación automatizada, generación de documentos y flujos de aprobación" },
    zh: { causes: ["每个 SKU 需要人工查找归类信息", "每票货物需要人工组装单证", "审批环节缺乏工作流自动化", "缺乏共享的系统记录"], capability: "自动化归类、单证生成与审批工作流" },
  },
  duty: {
    en: { causes: ["No systematic FTA qualification checks", "No drawback claim process", "Landed cost calculated after the fact", "Classification errors go undetected"], capability: "Duty management, FTA qualification, landed cost calculation, and drawback support" },
    es: { causes: ["Sin verificaciones sistemáticas de calificación FTA", "Sin proceso de reclamo de devolución de aranceles", "Costo de aterrizaje calculado después de los hechos", "Errores de clasificación no detectados"], capability: "Gestión de aranceles, calificación FTA, cálculo de costo de aterrizaje y soporte de devolución de aranceles" },
    zh: { causes: ["缺乏系统化的 FTA 资格核查", "缺乏退税申领流程", "到岸成本是事后才计算的", "归类错误未被及时发现"], capability: "关税管理、FTA 资格核定、到岸成本计算与退税支持" },
  },
  audit: {
    en: { causes: ["No centralized compliance reporting", "Screening and classification history not retained systematically", "Compliance process not documented", "Tribal knowledge instead of a system of record"], capability: "Centralized compliance reporting, audit trails, and documented control processes" },
    es: { causes: ["Sin reportes de cumplimiento centralizados", "Historial de verificación y clasificación no conservado sistemáticamente", "Proceso de cumplimiento no documentado", "Conocimiento informal en lugar de un sistema de registro"], capability: "Reportes de cumplimiento centralizados, rastros de auditoría y procesos de control documentados" },
    zh: { causes: ["缺乏集中化的合规报表", "筛查与归类历史未被系统化保存", "合规流程未形成文档", "依赖口口相传的经验而非系统记录"], capability: "集中化合规报表、审计记录与文档化的管控流程" },
  },
  gtmcx: {
    en: { causes: ["Country-specific rules tracked manually", "Watch lists updated outside the system", "New entities onboarded without compliance review", "Fragmented trade data across ERPs"], capability: "A single global trade content and rules engine covering restricted parties, tariffs, and country-specific regulations" },
    es: { causes: ["Reglas específicas por país rastreadas manualmente", "Listas de vigilancia actualizadas fuera del sistema", "Nuevas entidades incorporadas sin revisión de cumplimiento", "Datos comerciales fragmentados entre distintos ERPs"], capability: "Un único motor global de contenido y reglas de comercio que cubre partes restringidas, aranceles y regulaciones específicas por país" },
    zh: { causes: ["各国特定规则依靠人工跟踪", "名单更新在系统之外进行", "新增合作方未经合规审查即被纳入", "贸易数据分散在多个 ERP 中"], capability: "统一的全球贸易内容与规则引擎，覆盖受限方名单、关税及各国特定法规" },
  },
};

const T = {
  en: {
    appTitle: "OTM Value Assessment",
    appTagline: "Discover where transportation value is hiding, and estimate what OTM could unlock.",
    back: "Back",
    selectedSuffix: "selected",
    dateGenerated: "Generated",
    footerNote: "Built for exploratory discussion. All figures are illustrative and calculated in your browser — nothing is sent anywhere.",
    stepLabels: ["Start", "Value Drivers", "Calculator", "Maturity", "Business Case"],

    step0Title: "What are you trying to improve?",
    step0Sub: "Select every challenge that applies. There is no wrong answer — this shapes everything that follows.",
    industryLabel: "Which best describes your industry?",
    btnSeeDrivers: "See My Value Drivers",

    cat_cost_title: "Reduce Transportation Cost",
    cat_efficiency_title: "Improve Operational Efficiency",
    cat_service_title: "Improve Service & Visibility",
    cat_decision_title: "Improve Decision-Making",
    cat_complexity_title: "Manage Complexity",

    cost_1: "Freight spend is high relative to revenue and keeps climbing",
    cost_2: "Trucks and containers run with poor utilization",
    cost_3: "Too many premium or expedited shipments",
    cost_4: "Carrier rates are not actively benchmarked or negotiated",
    cost_5: "Accessorial charges (detention, demurrage, re-delivery) add up",
    eff_1: "Planners spend hours manually building and tendering shipments",
    eff_2: "Heavy reliance on spreadsheets, email, and phone calls",
    eff_3: "Freight audit and payment is a slow, manual process",
    eff_4: "New planners take months to become productive",
    svc_1: "On-time delivery performance is inconsistent",
    svc_2: "Limited real-time visibility into shipments in transit",
    svc_3: "Customers frequently ask where their order is",
    svc_4: "Exceptions are discovered late, after the customer complains",
    dec_1: "Unclear exactly where transportation dollars are going",
    dec_2: "Hard to compare carrier performance objectively",
    dec_3: "No systematic way to find lane or network savings",
    dec_4: "Cannot model network or volume changes before committing",
    cx_1: "Multiple transportation modes to coordinate (parcel, LTL, TL, ocean, air, rail)",
    cx_2: "Operations span multiple countries, currencies, or customs regimes",
    cx_3: "Multiple business units run separate, disconnected processes",
    cx_4: "Heavy reliance on 3PLs or brokers with limited direct control",

    ind_manuf: "Industrial & Manufacturing",
    ind_retail: "Retail & Consumer Goods",
    ind_energy: "Energy, Oil & Gas / Chemicals",
    ind_travel: "Travel, Hospitality & Cruise",
    ind_tech: "High-Tech & Electronics",
    ind_food: "Food & Beverage / Grocery",
    ind_other: "Other / Multiple Industries",

    step1Title: "Where This Value Comes From",
    step1Sub: "Based on what you selected, here is how these problems typically connect to root causes — and to OTM.",
    rootCausesLabel: "Typical Root Causes",
    capabilityLabel: "How OTM Helps",
    btnEstimate: "Estimate My Value Potential",

    step2Title: "Your Value Potential",
    step2Sub: "A rough, illustrative estimate — not a quote. Use your own data to refine it.",
    freightSpendLabel: "Annual Freight Spend",
    addressableLabel: "% of Spend Addressable by a TMS",
    totalLabel: "Total Potential Annual Value",
    disclaimerText: "Illustrative range based on typical industry benchmarks. Actual value depends on your baseline, network complexity, process maturity, and adoption.",
    complexityNote: "Companies with higher network complexity (more modes, countries, or business units) tend toward the upper end of these ranges.",
    noDriversText: "You did not flag any cost or efficiency challenges, so there is no monetizable range to show yet. Go back and select what applies, or continue to see the qualitative benefits.",
    btnSeeMaturity: "See My Maturity Gap",
    tableDriverHeader: "Value Driver",
    tableRangeHeader: "Estimated Annual Range",

    drv_opt_name: "Transportation Optimization",
    drv_opt_desc: "Better carrier, mode, and routing decisions",
    drv_consol_name: "Load Consolidation",
    drv_consol_desc: "Higher equipment and shipment utilization",
    drv_access_name: "Accessorial Reduction",
    drv_access_desc: "Fewer detention, demurrage, and re-delivery charges",
    drv_audit_name: "Freight Audit & Payment",
    drv_audit_desc: "Fewer billing errors, faster reconciliation",

    step3Title: "Where Are You Today?",
    step3Sub: "Select the level that best matches your current transportation operation.",
    currentLabel: "Current State",
    targetLabel: "Typical OTM Target",
    btnGenerateCase: "Generate My Business Case",

    m1_title: "Manual",
    m1_desc: "Transportation is managed with spreadsheets, email, and phone calls. No dedicated TMS.",
    m2_title: "Execution-Only",
    m2_desc: "A TMS supports basic tendering and execution, but planning is still manual.",
    m3_title: "Planning & Optimization Enabled",
    m3_desc: "The TMS actively optimizes routing, consolidation, and carrier selection.",
    m4_title: "Advanced Optimization",
    m4_desc: "Continuous move optimization, dynamic rating, and automated freight audit are standard.",
    m5_title: "Orchestrated Control Tower",
    m5_desc: "Network-wide, real-time optimization with predictive analytics and continuous improvement.",

    verdict_strong_title: "Strong Business Case",
    verdict_strong_desc: "Your spend, challenge profile, and maturity gap point to significant, well-supported value potential.",
    verdict_strong_next: "Validate the top value drivers against your actual transportation data in a working session with your OTM team.",
    verdict_potential_title: "Potential Business Case",
    verdict_potential_desc: "There is a credible opportunity here, but it is concentrated in specific areas rather than across the board.",
    verdict_potential_next: "A focused discovery workshop can pinpoint which OTM capabilities matter most for your situation.",
    verdict_limited_title: "Limited Business Case (For Now)",
    verdict_limited_desc: "Based on your inputs, your transportation operation may already be fairly mature relative to the challenges you flagged.",
    verdict_limited_next: "Consider a lighter-touch review in 12 to 18 months, or explore targeted solutions for your top 1-2 pain points.",

    step4Title: "Executive Business Case",
    companyProfileLabel: "Company Profile",
    valueOpportunityLabel: "Value Opportunity",
    strategicBenefitsLabel: "Strategic Benefits",
    whyOTMLabel: "Why OTM",
    nextStepLabel: "Recommended Next Step",
    btnPrint: "Print / Save as PDF",
    btnRestart: "Start Over",
    profileChallengesLabel: "Challenges Flagged",

    strat_productivity: "Planning Productivity",
    strat_productivity_desc: "Redeploy planner time from manual tasks to exceptions and strategy",
    strat_service: "Service Reliability",
    strat_service_desc: "More consistent on-time performance",
    strat_visibility: "Visibility",
    strat_visibility_desc: "Real-time tracking and proactive alerts",
    strat_decision: "Decision Quality",
    strat_decision_desc: "Data-driven carrier, lane, and network decisions",
    strat_scale: "Scalability",
    strat_scale_desc: "Absorb volume growth without proportional headcount",

    whyOtmFlow: ["Planning", "Optimization", "Execution", "Visibility", "Settlement"],

    gtmToggleLabel: "Also assess Global Trade Management (GTM)?",
    gtmToggleSub: "Optional — for companies with cross-border trade compliance, export control, or customs needs.",
    gtmNudge: "You flagged multi-country operations — want to include GTM?",
    gtmSectionLabel: "Additional: Global Trade Management (GTM)",
    dutySpendLabel: "Annual Duty & Tariff Spend",
    gtmMaturityLabel: "Additional: GTM Maturity",
    gtmNoDriversText: "No FTA or duty-related challenges flagged, so there is no monetizable GTM range to show — the qualitative benefits below still apply.",
    gtmOpportunityBadge: "GTM opportunity also identified",

    cat_risk_title: "Reduce Compliance Risk",
    cat_gtmeff_title: "Improve Trade Operations Efficiency",
    cat_duty_title: "Reduce Duty & Landed Cost",
    cat_audit_title: "Improve Visibility & Auditability",
    cat_gtmcx_title: "Manage Global Trade Complexity",

    risk_1: "Denied/restricted-party screening is manual or inconsistent across business units",
    risk_2: "Screening does not happen at every touchpoint (order, ship, pay) — gaps exist",
    risk_3: "No systematic ECCN or HS classification process; relies on a few people's knowledge",
    risk_4: "Past audit findings, close calls, or violations with export control agencies",
    risk_5: "License determination and usage tracking is manual or spreadsheet-based",
    gtmeff_1: "Classification (HS/ECCN) takes analysts days per item",
    gtmeff_2: "Export and import documentation is assembled manually per shipment",
    gtmeff_3: "Compliance approvals create shipment delays",
    gtmeff_4: "No single system of record for restricted-party screening across business units",
    duty_1: "Not systematically claiming FTA preferential duty rates",
    duty_2: "Duty drawback opportunities go unclaimed",
    duty_3: "Landed cost is not visible at the time of sourcing or quoting decisions",
    duty_4: "Classification errors lead to overpaying — or risking underpaying — duty",
    audit_1: "Cannot quickly produce a clean audit trail if a regulator asks",
    audit_2: "No centralized reporting on screening hits, license usage, or classification decisions",
    audit_3: "Hard to demonstrate reasonable care or program effectiveness to regulators",
    audit_4: "Compliance knowledge is concentrated in a few individuals, not systematized",
    gtmcx_1: "Operating across many countries and trade regimes with different rules",
    gtmcx_2: "Sanctions and denied-party lists change frequently and are hard to track manually",
    gtmcx_3: "New markets or M&A introduce new compliance obligations quickly",
    gtmcx_4: "Multiple ERPs or systems of record for trade data, no single source of truth",

    drv_fta_name: "FTA & Preferential Duty Optimization",
    drv_fta_desc: "Capturing eligible free trade agreement duty savings",
    drv_drawback_name: "Duty Drawback Recovery",
    drv_drawback_desc: "Reclaiming duty paid on re-exported or destroyed goods",

    gm1_title: "Manual",
    gm1_desc: "Compliance is managed with spreadsheets and manual lookups. Screening is ad hoc.",
    gm2_title: "Point Solution",
    gm2_desc: "A screening tool exists, but classification, licensing, and duty are still manual and disconnected.",
    gm3_title: "Systematic",
    gm3_desc: "Screening, classification, and licensing are systematized within a GTM platform for core flows.",
    gm4_title: "Integrated",
    gm4_desc: "GTM is embedded in transaction workflows with automated screening, classification, and duty management.",
    gm5_title: "Orchestrated",
    gm5_desc: "A real-time, global rules engine with continuous regulatory updates, full audit trail, and predictive risk flagging.",

    strat_gtmrisk: "Compliance Risk Reduction",
    strat_gtmrisk_desc: "Fewer screening gaps, license violations, and audit exposure",
    strat_gtmclass: "Classification Efficiency",
    strat_gtmclass_desc: "Faster, more consistent HS/ECCN classification",
    strat_gtmaudit: "Audit Readiness",
    strat_gtmaudit_desc: "A documented, defensible trail for every compliance decision",
    strat_gtmagility: "Global Agility",
    strat_gtmagility_desc: "Enter new markets and onboard partners without rebuilding compliance from scratch",
  },

  es: {
    appTitle: "Evaluación de Valor de OTM",
    appTagline: "Descubra dónde se esconde el valor de transporte, y estime lo que OTM podría desbloquear.",
    back: "Atrás",
    selectedSuffix: "seleccionados",
    dateGenerated: "Generado",
    footerNote: "Diseñado para facilitar la conversación exploratoria. Todas las cifras son ilustrativas y se calculan en su navegador: no se envía nada a ningún servidor.",
    stepLabels: ["Inicio", "Impulsores de Valor", "Calculadora", "Madurez", "Caso de Negocio"],

    step0Title: "¿Qué le gustaría mejorar?",
    step0Sub: "Seleccione todos los desafíos que apliquen. No hay una respuesta incorrecta: esto define todo lo que sigue.",
    industryLabel: "¿Cuál describe mejor su industria?",
    btnSeeDrivers: "Ver Mis Impulsores de Valor",

    cat_cost_title: "Reducir el Costo de Transporte",
    cat_efficiency_title: "Mejorar la Eficiencia Operativa",
    cat_service_title: "Mejorar el Servicio y la Visibilidad",
    cat_decision_title: "Mejorar la Toma de Decisiones",
    cat_complexity_title: "Gestionar la Complejidad",

    cost_1: "El gasto en transporte es alto respecto a los ingresos y sigue subiendo",
    cost_2: "Los camiones y contenedores operan con baja utilización",
    cost_3: "Demasiados envíos premium o expeditados",
    cost_4: "Las tarifas de transportistas no se comparan ni negocian activamente",
    cost_5: "Los cargos accesorios (detención, demora, reentrega) se acumulan",
    eff_1: "Los planificadores dedican horas a crear y licitar envíos manualmente",
    eff_2: "Fuerte dependencia de hojas de cálculo, correo electrónico y llamadas",
    eff_3: "La auditoría y el pago de fletes es un proceso lento y manual",
    eff_4: "Los nuevos planificadores tardan meses en ser productivos",
    svc_1: "El desempeño de entrega a tiempo es inconsistente",
    svc_2: "Visibilidad limitada en tiempo real de los envíos en tránsito",
    svc_3: "Los clientes preguntan con frecuencia dónde está su pedido",
    svc_4: "Las excepciones se detectan tarde, después de que el cliente se queja",
    dec_1: "No está claro exactamente a dónde va el dinero de transporte",
    dec_2: "Es difícil comparar el desempeño de los transportistas objetivamente",
    dec_3: "No hay una forma sistemática de encontrar ahorros por ruta o red",
    dec_4: "No se pueden modelar cambios de red o volumen antes de decidir",
    cx_1: "Múltiples modos de transporte por coordinar (paquetería, LTL, TL, marítimo, aéreo, ferroviario)",
    cx_2: "Las operaciones abarcan varios países, monedas o regímenes aduaneros",
    cx_3: "Varias unidades de negocio operan con procesos separados y desconectados",
    cx_4: "Fuerte dependencia de 3PLs o brokers con poco control directo",

    ind_manuf: "Industrial y Manufactura",
    ind_retail: "Retail y Bienes de Consumo",
    ind_energy: "Energía, Petróleo y Gas / Químicos",
    ind_travel: "Viajes, Hospitalidad y Cruceros",
    ind_tech: "Alta Tecnología y Electrónica",
    ind_food: "Alimentos y Bebidas / Supermercados",
    ind_other: "Otra / Múltiples Industrias",

    step1Title: "De Dónde Viene Este Valor",
    step1Sub: "Según lo que seleccionó, así es como estos problemas suelen conectarse con sus causas raíz, y con OTM.",
    rootCausesLabel: "Causas Raíz Típicas",
    capabilityLabel: "Cómo Ayuda OTM",
    btnEstimate: "Estimar Mi Potencial de Valor",

    step2Title: "Su Potencial de Valor",
    step2Sub: "Una estimación aproximada e ilustrativa, no una cotización. Use sus propios datos para refinarla.",
    freightSpendLabel: "Gasto Anual en Transporte",
    addressableLabel: "% del Gasto Abordable con un TMS",
    totalLabel: "Valor Potencial Anual Total",
    disclaimerText: "Rango ilustrativo basado en referencias típicas de la industria. El valor real depende de su línea base, la complejidad de su red, la madurez de sus procesos y la adopción.",
    complexityNote: "Las empresas con mayor complejidad de red (más modos, países o unidades de negocio) tienden a ubicarse hacia el extremo superior de estos rangos.",
    noDriversText: "No marcó desafíos de costo o eficiencia, así que aún no hay un rango monetizable que mostrar. Vuelva atrás y seleccione lo que aplique, o continúe para ver los beneficios cualitativos.",
    btnSeeMaturity: "Ver Mi Brecha de Madurez",
    tableDriverHeader: "Impulsor de Valor",
    tableRangeHeader: "Rango Anual Estimado",

    drv_opt_name: "Optimización de Transporte",
    drv_opt_desc: "Mejores decisiones de transportista, modo y ruta",
    drv_consol_name: "Consolidación de Carga",
    drv_consol_desc: "Mayor utilización de equipos y envíos",
    drv_access_name: "Reducción de Cargos Accesorios",
    drv_access_desc: "Menos cargos por detención, demora y reentrega",
    drv_audit_name: "Auditoría y Pago de Fletes",
    drv_audit_desc: "Menos errores de facturación, conciliación más rápida",

    step3Title: "¿Dónde Está Hoy?",
    step3Sub: "Seleccione el nivel que mejor describe su operación de transporte actual.",
    currentLabel: "Estado Actual",
    targetLabel: "Objetivo Típico con OTM",
    btnGenerateCase: "Generar Mi Caso de Negocio",

    m1_title: "Manual",
    m1_desc: "El transporte se gestiona con hojas de cálculo, correo electrónico y llamadas. Sin un TMS dedicado.",
    m2_title: "Solo Ejecución",
    m2_desc: "Un TMS soporta la licitación y ejecución básicas, pero la planificación sigue siendo manual.",
    m3_title: "Planificación y Optimización Habilitadas",
    m3_desc: "El TMS optimiza activamente rutas, consolidación y selección de transportistas.",
    m4_title: "Optimización Avanzada",
    m4_desc: "La optimización de movimientos continuos, tarificación dinámica y auditoría de fletes automatizada son estándar.",
    m5_title: "Torre de Control Orquestada",
    m5_desc: "Optimización en tiempo real a nivel de red, con análisis predictivo y mejora continua.",

    verdict_strong_title: "Caso de Negocio Sólido",
    verdict_strong_desc: "Su nivel de gasto, perfil de desafíos y brecha de madurez apuntan a un potencial de valor significativo y bien respaldado.",
    verdict_strong_next: "Valide los principales impulsores de valor con sus datos reales de transporte en una sesión de trabajo con su equipo de OTM.",
    verdict_potential_title: "Caso de Negocio Potencial",
    verdict_potential_desc: "Existe una oportunidad creíble, pero está concentrada en áreas específicas y no en todo el negocio.",
    verdict_potential_next: "Un taller de descubrimiento enfocado puede identificar qué capacidades de OTM son más relevantes para su situación.",
    verdict_limited_title: "Caso de Negocio Limitado (Por Ahora)",
    verdict_limited_desc: "Según sus respuestas, su operación de transporte ya podría ser bastante madura frente a los desafíos que señaló.",
    verdict_limited_next: "Considere una revisión más ligera en 12 a 18 meses, o explore soluciones puntuales para sus 1 o 2 principales problemas.",

    step4Title: "Caso de Negocio Ejecutivo",
    companyProfileLabel: "Perfil de la Empresa",
    valueOpportunityLabel: "Oportunidad de Valor",
    strategicBenefitsLabel: "Beneficios Estratégicos",
    whyOTMLabel: "Por Qué OTM",
    nextStepLabel: "Próximo Paso Recomendado",
    btnPrint: "Imprimir / Guardar como PDF",
    btnRestart: "Comenzar de Nuevo",
    profileChallengesLabel: "Desafíos Identificados",

    strat_productivity: "Productividad de Planificación",
    strat_productivity_desc: "Redirigir el tiempo de los planificadores de tareas manuales a excepciones y estrategia",
    strat_service: "Confiabilidad del Servicio",
    strat_service_desc: "Desempeño de entrega a tiempo más consistente",
    strat_visibility: "Visibilidad",
    strat_visibility_desc: "Rastreo en tiempo real y alertas proactivas",
    strat_decision: "Calidad de Decisiones",
    strat_decision_desc: "Decisiones de transportista, ruta y red basadas en datos",
    strat_scale: "Escalabilidad",
    strat_scale_desc: "Absorber el crecimiento de volumen sin aumentar el personal proporcionalmente",

    whyOtmFlow: ["Planificación", "Optimización", "Ejecución", "Visibilidad", "Liquidación"],

    gtmToggleLabel: "¿También evaluar Global Trade Management (GTM)?",
    gtmToggleSub: "Opcional — para empresas con necesidades de cumplimiento de comercio transfronterizo, control de exportaciones o aduanas.",
    gtmNudge: "Usted señaló operaciones en varios países — ¿desea incluir GTM?",
    gtmSectionLabel: "Adicional: Global Trade Management (GTM)",
    dutySpendLabel: "Gasto Anual en Aranceles y Derechos",
    gtmMaturityLabel: "Adicional: Madurez de GTM",
    gtmNoDriversText: "No se marcaron desafíos relacionados con FTA o aranceles, así que no hay un rango monetizable de GTM que mostrar — los beneficios cualitativos abajo aún aplican.",
    gtmOpportunityBadge: "También se identificó una oportunidad de GTM",

    cat_risk_title: "Reducir el Riesgo de Cumplimiento",
    cat_gtmeff_title: "Mejorar la Eficiencia de Operaciones de Comercio",
    cat_duty_title: "Reducir Aranceles y Costo de Aterrizaje",
    cat_audit_title: "Mejorar la Visibilidad y Auditabilidad",
    cat_gtmcx_title: "Gestionar la Complejidad del Comercio Global",

    risk_1: "La verificación de partes denegadas o restringidas es manual o inconsistente entre unidades de negocio",
    risk_2: "La verificación no ocurre en cada punto de contacto (pedido, envío, pago); existen brechas",
    risk_3: "No hay un proceso sistemático de clasificación ECCN o HS; depende del conocimiento de pocas personas",
    risk_4: "Hallazgos de auditoría pasados, casos límite o infracciones con agencias de control de exportación",
    risk_5: "La determinación y el seguimiento de licencias es manual o se basa en hojas de cálculo",
    gtmeff_1: "La clasificación (HS/ECCN) toma días de trabajo por artículo",
    gtmeff_2: "La documentación de exportación e importación se arma manualmente por envío",
    gtmeff_3: "Las aprobaciones de cumplimiento generan retrasos en los envíos",
    gtmeff_4: "No hay un sistema único de registro para la verificación de partes restringidas entre unidades de negocio",
    duty_1: "No se reclaman sistemáticamente las tarifas preferenciales de los tratados de libre comercio (FTA)",
    duty_2: "Las oportunidades de devolución de aranceles (drawback) no se reclaman",
    duty_3: "El costo de aterrizaje no es visible al momento de las decisiones de abastecimiento o cotización",
    duty_4: "Los errores de clasificación generan sobrepago, o riesgo de subpago, de aranceles",
    audit_1: "No se puede producir rápidamente un rastro de auditoría claro si un regulador lo solicita",
    audit_2: "No hay reportes centralizados sobre coincidencias de verificación, uso de licencias o decisiones de clasificación",
    audit_3: "Es difícil demostrar diligencia razonable o efectividad del programa ante los reguladores",
    audit_4: "El conocimiento de cumplimiento está concentrado en pocas personas, no sistematizado",
    gtmcx_1: "Operaciones en muchos países y regímenes comerciales con reglas distintas",
    gtmcx_2: "Las listas de sanciones y partes denegadas cambian con frecuencia y son difíciles de rastrear manualmente",
    gtmcx_3: "Nuevos mercados o fusiones y adquisiciones generan nuevas obligaciones de cumplimiento rápidamente",
    gtmcx_4: "Múltiples ERPs o sistemas de registro para datos comerciales, sin una fuente única de verdad",

    drv_fta_name: "Optimización de Aranceles Preferenciales (FTA)",
    drv_fta_desc: "Capturar los ahorros arancelarios elegibles bajo tratados de libre comercio",
    drv_drawback_name: "Recuperación de Devolución de Aranceles",
    drv_drawback_desc: "Recuperar aranceles pagados sobre mercancía reexportada o destruida",

    gm1_title: "Manual",
    gm1_desc: "El cumplimiento se gestiona con hojas de cálculo y búsquedas manuales. La verificación es informal.",
    gm2_title: "Solución Puntual",
    gm2_desc: "Existe una herramienta de verificación, pero la clasificación, licencias y aranceles siguen siendo manuales y desconectados.",
    gm3_title: "Sistemático",
    gm3_desc: "La verificación, clasificación y licencias están sistematizadas dentro de una plataforma GTM para los flujos principales.",
    gm4_title: "Integrado",
    gm4_desc: "GTM está integrado en los flujos de transacciones con verificación, clasificación y gestión de aranceles automatizadas.",
    gm5_title: "Orquestado",
    gm5_desc: "Un motor de reglas global en tiempo real con actualizaciones regulatorias continuas, rastro de auditoría completo y alertas predictivas de riesgo.",

    strat_gtmrisk: "Reducción del Riesgo de Cumplimiento",
    strat_gtmrisk_desc: "Menos brechas de verificación, infracciones de licencias y exposición en auditorías",
    strat_gtmclass: "Eficiencia de Clasificación",
    strat_gtmclass_desc: "Clasificación HS/ECCN más rápida y consistente",
    strat_gtmaudit: "Preparación para Auditorías",
    strat_gtmaudit_desc: "Un rastro documentado y defendible para cada decisión de cumplimiento",
    strat_gtmagility: "Agilidad Global",
    strat_gtmagility_desc: "Entrar a nuevos mercados e incorporar socios sin reconstruir el cumplimiento desde cero",
  },

  zh: {
    appTitle: "OTM 价值评估",
    appTagline: "发现运输价值隐藏在哪里，并估算 OTM 能释放出多少价值。",
    back: "上一步",
    selectedSuffix: "项已选择",
    dateGenerated: "生成时间",
    footerNote: "本工具用于辅助探索性沟通。所有数字均为示意性计算，且在您的浏览器本地完成——不会向任何服务器发送数据。",
    stepLabels: ["开始", "价值驱动因素", "价值计算器", "成熟度评估", "业务论证"],

    step0Title: "您希望改善什么？",
    step0Sub: "选择所有适用的挑战，没有标准答案——这将决定后续的所有内容。",
    industryLabel: "以下哪项最能描述您所在的行业？",
    btnSeeDrivers: "查看我的价值驱动因素",

    cat_cost_title: "降低运输成本",
    cat_efficiency_title: "提升运营效率",
    cat_service_title: "提升服务水平与可视性",
    cat_decision_title: "提升决策质量",
    cat_complexity_title: "管理复杂性",

    cost_1: "运输支出相对于营收偏高，且持续上升",
    cost_2: "卡车和集装箱的利用率偏低",
    cost_3: "加急/高价运输的比例过高",
    cost_4: "承运商费率缺乏主动的对标和谈判",
    cost_5: "滞留费、滞港费、重新配送等附加费用不断累积",
    eff_1: "计划人员需要花费大量时间手动创建和分配运单",
    eff_2: "高度依赖 Excel、邮件和电话沟通",
    eff_3: "运费审核与支付流程缓慢且高度依赖人工",
    eff_4: "新计划人员需要数月才能真正上手",
    svc_1: "准时交付表现不稳定",
    svc_2: "在途货物的实时可视性有限",
    svc_3: "客户经常询问“我的货到哪了”",
    svc_4: "异常情况往往在客户投诉后才被发现",
    dec_1: "不清楚运输费用究竟花在了哪里",
    dec_2: "难以客观比较各承运商的表现",
    dec_3: "缺乏系统化方法来发现线路或网络层面的节省机会",
    dec_4: "在做出决策前无法对网络或业务量变化进行建模",
    cx_1: "需要协调多种运输方式（快递、零担、整车、海运、空运、铁路）",
    cx_2: "业务涉及多个国家、货币或海关制度",
    cx_3: "多个业务单元各自运行独立、割裂的流程",
    cx_4: "高度依赖第三方物流/货代，直接掌控力有限",

    ind_manuf: "工业与制造业",
    ind_retail: "零售与消费品",
    ind_energy: "能源、石油天然气 / 化工",
    ind_travel: "旅游、酒店与邮轮",
    ind_tech: "高科技与电子",
    ind_food: "食品饮料 / 零售杂货",
    ind_other: "其他 / 多个行业",

    step1Title: "价值从何而来",
    step1Sub: "根据您的选择，以下展示了这些问题通常如何与根本原因、以及 OTM 相关联。",
    rootCausesLabel: "典型根本原因",
    capabilityLabel: "OTM 如何提供帮助",
    btnEstimate: "估算我的价值潜力",

    step2Title: "您的价值潜力",
    step2Sub: "这是一个粗略的、示意性的估算，而非报价。请使用您自己的数据进一步细化。",
    freightSpendLabel: "年度运输支出",
    addressableLabel: "TMS 可覆盖的支出比例",
    totalLabel: "潜在年度总价值",
    disclaimerText: "该区间基于行业典型基准，仅供参考。实际价值取决于您的基线水平、网络复杂度、流程成熟度以及采用程度。",
    complexityNote: "网络复杂度更高的企业（涉及更多运输方式、国家或业务单元）通常会更接近区间的上限。",
    noDriversText: "您尚未勾选任何成本或效率方面的挑战，因此暂时没有可量化的价值区间可以展示。请返回选择适用项，或继续查看定性收益。",
    btnSeeMaturity: "查看我的成熟度差距",
    tableDriverHeader: "价值驱动因素",
    tableRangeHeader: "预估年度区间",

    drv_opt_name: "运输优化",
    drv_opt_desc: "更优的承运商、运输方式与路线决策",
    drv_consol_name: "配载整合",
    drv_consol_desc: "提升设备与运输利用率",
    drv_access_name: "附加费用削减",
    drv_access_desc: "减少滞留费、滞港费与重新配送费用",
    drv_audit_name: "运费审核与支付",
    drv_audit_desc: "减少账单错误，加快对账速度",

    step3Title: "您目前处于什么阶段？",
    step3Sub: "请选择最符合您当前运输运营状况的级别。",
    currentLabel: "当前状态",
    targetLabel: "OTM 典型目标状态",
    btnGenerateCase: "生成我的业务论证",

    m1_title: "人工阶段",
    m1_desc: "运输管理依赖 Excel、邮件和电话，尚无专用 TMS 系统。",
    m2_title: "仅执行阶段",
    m2_desc: "TMS 支持基础的派单与执行，但计划环节仍主要依靠人工。",
    m3_title: "计划与优化启用阶段",
    m3_desc: "TMS 已能主动优化路线、配载和承运商选择。",
    m4_title: "高级优化阶段",
    m4_desc: "连续调车优化、动态计费与自动化运费审核已成为标配。",
    m5_title: "协同控制塔阶段",
    m5_desc: "实现网络层面的实时优化，具备预测分析与持续改进能力。",

    verdict_strong_title: "强有力的业务论证",
    verdict_strong_desc: "您的支出规模、挑战特征以及成熟度差距均指向显著且有据可依的价值潜力。",
    verdict_strong_next: "建议与您的 OTM 团队安排一次工作会议，用您真实的运输数据验证排名靠前的价值驱动因素。",
    verdict_potential_title: "潜在的业务论证",
    verdict_potential_desc: "存在可信的机会，但主要集中在特定领域，而非全面覆盖。",
    verdict_potential_next: "一场聚焦的探索工作坊有助于明确哪些 OTM 能力对您最为关键。",
    verdict_limited_title: "业务论证暂时有限",
    verdict_limited_desc: "根据您的输入，相对于您所标记的挑战，您的运输运营可能已经相当成熟。",
    verdict_limited_next: "建议 12-18 个月后再进行一次轻量评估，或针对排名前 1-2 位的痛点探索更有针对性的解决方案。",

    step4Title: "高管业务论证",
    companyProfileLabel: "公司概况",
    valueOpportunityLabel: "价值机会",
    strategicBenefitsLabel: "战略收益",
    whyOTMLabel: "为什么选择 OTM",
    nextStepLabel: "建议的下一步",
    btnPrint: "打印 / 保存为 PDF",
    btnRestart: "重新开始",
    profileChallengesLabel: "已标记的挑战数量",

    strat_productivity: "计划效率",
    strat_productivity_desc: "将计划人员的精力从手动任务转向异常处理与战略工作",
    strat_service: "服务可靠性",
    strat_service_desc: "更稳定的准时交付表现",
    strat_visibility: "可视性",
    strat_visibility_desc: "实时跟踪与主动预警",
    strat_decision: "决策质量",
    strat_decision_desc: "基于数据的承运商、线路与网络决策",
    strat_scale: "可扩展性",
    strat_scale_desc: "在业务量增长时无需同比例增加人力",

    whyOtmFlow: ["计划", "优化", "执行", "可视化", "结算"],

    gtmToggleLabel: "是否也评估 Global Trade Management (GTM)？",
    gtmToggleSub: "可选——适用于有跨境贸易合规、出口管制或清关需求的企业。",
    gtmNudge: "您提到了多国业务——要不要顺便纳入 GTM？",
    gtmSectionLabel: "附加：Global Trade Management (GTM)",
    dutySpendLabel: "年度关税与税费支出",
    gtmMaturityLabel: "附加：GTM 成熟度",
    gtmNoDriversText: "尚未勾选与 FTA 或关税相关的挑战，因此暂无可量化的 GTM 区间可展示——下方的定性收益依然适用。",
    gtmOpportunityBadge: "同时识别到 GTM 机会",

    cat_risk_title: "降低合规风险",
    cat_gtmeff_title: "提升贸易运营效率",
    cat_duty_title: "降低关税与到岸成本",
    cat_audit_title: "提升可视性与可审计性",
    cat_gtmcx_title: "管理全球贸易复杂性",

    risk_1: "被拒/受限方筛查在各业务单元之间手动进行、缺乏一致性",
    risk_2: "筛查未覆盖每个业务环节（下单、发货、付款），存在漏洞",
    risk_3: "缺乏系统化的 ECCN 或 HS 归类流程，依赖少数人的经验",
    risk_4: "曾有出口管制机构的审计发现、擦边情况或违规记录",
    risk_5: "许可证判定与使用情况跟踪依赖人工或 Excel",
    gtmeff_1: "HS/ECCN 归类每个物项需要分析人员花费数天",
    gtmeff_2: "进出口单证需要按每票货物手动组装",
    gtmeff_3: "合规审批环节导致货物延误",
    gtmeff_4: "各业务单元的受限方筛查缺乏统一的系统记录",
    duty_1: "未系统性地申请自贸协定（FTA）优惠关税",
    duty_2: "关税退税（drawback）机会未被主张",
    duty_3: "在寻源或报价决策时无法看到到岸成本",
    duty_4: "归类错误导致多缴关税，或存在少缴的合规风险",
    audit_1: "如果监管机构问询，无法快速提供清晰的审计记录",
    audit_2: "缺乏关于筛查命中、许可证使用或归类决策的集中化报表",
    audit_3: "难以向监管机构证明已尽合理注意义务或合规项目的有效性",
    audit_4: "合规知识集中在少数几个人身上，未形成系统化沉淀",
    gtmcx_1: "业务涉及众多国家和贸易制度，规则各不相同",
    gtmcx_2: "制裁名单和受限方名单频繁更新，人工难以跟踪",
    gtmcx_3: "新市场拓展或并购会迅速带来新的合规义务",
    gtmcx_4: "贸易数据分散在多个 ERP / 记录系统中，缺乏统一的数据源",

    drv_fta_name: "FTA 优惠关税优化",
    drv_fta_desc: "获取符合条件的自贸协定关税节省",
    drv_drawback_name: "关税退税追回",
    drv_drawback_desc: "追回已再出口或已销毁货物所缴纳的关税",

    gm1_title: "人工阶段",
    gm1_desc: "合规工作依赖 Excel 和人工查询，筛查是临时性的。",
    gm2_title: "单点工具阶段",
    gm2_desc: "已有筛查工具，但归类、许可证与关税仍是人工且相互割裂的。",
    gm3_title: "系统化阶段",
    gm3_desc: "核心流程中的筛查、归类与许可证管理已在 GTM 平台内系统化。",
    gm4_title: "集成阶段",
    gm4_desc: "GTM 已嵌入交易流程，筛查、归类与关税管理实现自动化。",
    gm5_title: "协同编排阶段",
    gm5_desc: "具备实时的全球规则引擎，持续更新法规、完整审计记录，并能预测性地标记风险。",

    strat_gtmrisk: "合规风险降低",
    strat_gtmrisk_desc: "减少筛查漏洞、许可证违规与审计风险敞口",
    strat_gtmclass: "归类效率",
    strat_gtmclass_desc: "更快、更一致的 HS/ECCN 归类",
    strat_gtmaudit: "审计就绪度",
    strat_gtmaudit_desc: "每一项合规决策都有可留痕、经得起审查的记录",
    strat_gtmagility: "全球敏捷性",
    strat_gtmagility_desc: "拓展新市场、引入新合作方时无需从零搭建合规体系",
  },
};

/* ---------------------------------------------------------------------- */
/* HELPERS                                                                 */
/* ---------------------------------------------------------------------- */

function fmtUSD(n) {
  if (n === null || n === undefined || isNaN(n)) return "$0";
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(0)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}

function fmtRange(low, high) {
  return `${fmtUSD(low)} \u2013 ${fmtUSD(high)}`;
}

/* ---------------------------------------------------------------------- */
/* VERDICT CARD                                                            */
/* ---------------------------------------------------------------------- */

function VerdictCard({ verdict, t }) {
  const config = {
    strong: { Icon: CheckCircle2, color: "#1F7A4D", bg: "#EBF5EE", border: "#BFE0CC" },
    potential: { Icon: AlertCircle, color: C.signal, bg: C.signalSoft, border: "#E3C296" },
    limited: { Icon: XCircle, color: C.mist, bg: "#F1F1EE", border: C.line },
  }[verdict];
  const { Icon } = config;
  return (
    <div style={{ backgroundColor: config.bg, borderColor: config.border, borderWidth: 1, borderStyle: "solid" }} className="rounded p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={20} color={config.color} />
        <h3 style={{ color: config.color, fontFamily: SANS }} className="font-bold text-sm">{t(`verdict_${verdict}_title`)}</h3>
      </div>
      <p style={{ color: C.ink }} className="text-sm mb-1.5 opacity-80">{t(`verdict_${verdict}_desc`)}</p>
      <p style={{ color: C.ink }} className="text-xs italic opacity-70">{t(`verdict_${verdict}_next`)}</p>
    </div>
  );
}

const FIT_COPY = {
  en: {
    heading: "OTM Fit Scale", target: "OTM fit benchmark", current: "Current maturity",
    below: { label: "Not yet fit for OTM", detail: "Your current maturity is below the typical OTM fit benchmark." },
    at: { label: "Fit for OTM", detail: "Your current maturity matches the typical OTM fit benchmark." },
    above: { label: "Highly fit for OTM", detail: "Your current maturity exceeds the typical OTM fit benchmark." },
  },
  es: {
    heading: "Escala de Ajuste a OTM", target: "Referencia de ajuste a OTM", current: "Madurez actual",
    below: { label: "Aún no apto para OTM", detail: "Su madurez actual está por debajo de la referencia típica de ajuste a OTM." },
    at: { label: "Apto para OTM", detail: "Su madurez actual coincide con la referencia típica de ajuste a OTM." },
    above: { label: "Muy apto para OTM", detail: "Su madurez actual supera la referencia típica de ajuste a OTM." },
  },
  zh: {
    heading: "OTM 适配度刻度", target: "OTM 适配基准", current: "当前成熟度",
    below: { label: "尚未适配 OTM", detail: "当前成熟度低于 OTM 的典型适配基准。" },
    at: { label: "适配 OTM", detail: "当前成熟度与 OTM 的典型适配基准一致。" },
    above: { label: "高度适配 OTM", detail: "当前成熟度超过 OTM 的典型适配基准。" },
  },
};

function getFitAssessment(maturity, lang) {
  const copy = FIT_COPY[lang] || FIT_COPY.en;
  const status = maturity > TARGET_MATURITY ? "above" : maturity < TARGET_MATURITY ? "below" : "at";
  return { ...copy, status, ...copy[status] };
}

function MaturityFitScale({ maturity, lang, t, tone = C.lane }) {
  if (maturity === null) return null;
  const fit = getFitAssessment(maturity, lang);
  const statusColor = fit.status === "below" ? C.mist : fit.status === "at" ? C.signal : "#1F7A4D";
  const statusBg = fit.status === "below" ? "#F1F1EE" : fit.status === "at" ? C.signalSoft : "#EBF5EE";
  return (
    <div style={{ borderColor: C.line, backgroundColor: C.card }} className="border rounded p-4">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div style={{ color: C.ink }} className="text-sm font-bold">{fit.heading}</div>
          <div style={{ color: C.mist, fontFamily: MONO }} className="text-xs mt-0.5">{fit.current}: {maturity} · {fit.target}: {TARGET_MATURITY}</div>
        </div>
        <span style={{ color: statusColor, backgroundColor: statusBg, borderColor: statusColor }} className="shrink-0 border rounded-full px-2.5 py-1 text-xs font-semibold">{fit.label}</span>
      </div>
      <div className="flex gap-1.5" aria-label={`${fit.current} ${maturity}; ${fit.target} ${TARGET_MATURITY}`}>
        {MATURITY_LEVELS.map((lvl) => (
          <div key={lvl} className="relative flex-1">
            <div style={{ backgroundColor: lvl <= maturity ? tone : "#EDECE7" }} className="h-3 rounded-full" />
            <span style={{ color: lvl <= maturity ? C.card : C.mist, fontFamily: MONO }} className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">{lvl}</span>
            {lvl === TARGET_MATURITY && <span title={fit.target} style={{ backgroundColor: OTM_TARGET_MARKER }} className="absolute -top-2 left-1/2 h-7 w-1 -translate-x-1/2 rounded-full" />}
          </div>
        ))}
      </div>
      <div className="flex items-start gap-2 mt-3">
        <span style={{ backgroundColor: OTM_TARGET_MARKER }} className="mt-1.5 h-2 w-2 shrink-0 rounded-full" />
        <p style={{ color: C.mist }} className="text-xs leading-relaxed"><strong style={{ color: C.ink }}>{fit.target}</strong>：{fit.detail}</p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* MAIN COMPONENT                                                          */
/* ---------------------------------------------------------------------- */

export default function OTMValueAssessment() {
  const [lang, setLang] = useState("zh");
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);
  const [industry, setIndustry] = useState("ind_manuf");
  const [freightSpend, setFreightSpend] = useState(50000000);
  const [pctAddr, setPctAddr] = useState(65);
  const [maturity, setMaturity] = useState(null);
  const [gtmEnabled, setGtmEnabled] = useState(false);
  const [gtmSelected, setGtmSelected] = useState([]);
  const [dutySpend, setDutySpend] = useState(5000000);
  const [gtmMaturity, setGtmMaturity] = useState(null);
  const [bobInput, setBobInput] = useState("");
  const [bobSignalIds, setBobSignalIds] = useState([]);
  const [bobAnalyzed, setBobAnalyzed] = useState(false);
  const [bobApplied, setBobApplied] = useState(false);
  const [bobConfirmed, setBobConfirmed] = useState(false);
  const [bobPathVisible, setBobPathVisible] = useState(false);

  const t = (key) => (T[lang] && T[lang][key] !== undefined ? T[lang][key] : key);

  const selectedCategories = useMemo(() => {
    const s = new Set();
    Object.keys(PAIN_IDS).forEach((cat) => {
      if (PAIN_IDS[cat].some((id) => selected.includes(id))) s.add(cat);
    });
    return s;
  }, [selected]);

  const activeDrivers = useMemo(
    () => DRIVERS.filter((d) => d.categories.some((c) => selectedCategories.has(c))),
    [selectedCategories]
  );

  const addressable = freightSpend * (pctAddr / 100);

  const results = useMemo(
    () =>
      activeDrivers.map((d) => ({
        id: d.id,
        low: addressable * d.low,
        high: addressable * d.high,
        mid: (addressable * (d.low + d.high)) / 2,
      })),
    [activeDrivers, addressable]
  );

  const totalLow = results.reduce((s, r) => s + r.low, 0);
  const totalHigh = results.reduce((s, r) => s + r.high, 0);
  const totalMid = results.reduce((s, r) => s + r.mid, 0);
  const valueIntensity = freightSpend > 0 ? totalMid / freightSpend : 0;
  const numChallenges = selected.length;
  const maturityGap = TARGET_MATURITY - (maturity || 0);

  const hasGtmSignal = selected.includes(GTM_TRIGGER_PAIN_ID);
  const railImage = step === 4 ? CASE_VISUAL : gtmEnabled ? TRADE_VISUAL : NETWORK_VISUAL;

  const gtmSelectedCategories = useMemo(() => {
    const s = new Set();
    Object.keys(GTM_PAIN_IDS).forEach((cat) => {
      if (GTM_PAIN_IDS[cat].some((id) => gtmSelected.includes(id))) s.add(cat);
    });
    return s;
  }, [gtmSelected]);

  const gtmActiveDrivers = useMemo(
    () => GTM_DRIVERS.filter((d) => d.categories.some((c) => gtmSelectedCategories.has(c))),
    [gtmSelectedCategories]
  );

  const gtmResults = useMemo(
    () =>
      gtmActiveDrivers.map((d) => ({
        id: d.id,
        low: dutySpend * d.low,
        high: dutySpend * d.high,
        mid: (dutySpend * (d.low + d.high)) / 2,
      })),
    [gtmActiveDrivers, dutySpend]
  );

  const gtmTotalLow = gtmResults.reduce((s, r) => s + r.low, 0);
  const gtmTotalHigh = gtmResults.reduce((s, r) => s + r.high, 0);

  const verdict = useMemo(() => {
    if (maturity === null) return "potential";
    if (maturity >= 4 && numChallenges <= 3) return "limited";
    if (valueIntensity >= 0.03 || (maturityGap >= 2 && numChallenges >= 6)) return "strong";
    return "potential";
  }, [maturity, numChallenges, valueIntensity, maturityGap]);
  const bobDiagnostic = useMemo(() => getBobDiagnostic(bobSignalIds, lang), [bobSignalIds, lang]);

  function toggleSelected(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  function analyzeBobInput() {
    setBobSignalIds(getBobSignals(bobInput));
    setBobAnalyzed(true);
    setBobApplied(false);
    setBobConfirmed(false);
    setBobPathVisible(false);
  }
  function toggleBobSignal(id) {
    setBobSignalIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    setBobConfirmed(false);
    setBobPathVisible(false);
    setBobApplied(false);
  }
  function confirmBobDiagnostic() {
    setBobConfirmed(true);
    setBobPathVisible(false);
  }
  function applyBobSignals() {
    setSelected((prev) => Array.from(new Set([...prev, ...bobSignalIds])));
    setBobApplied(true);
  }
  function toggleGtmSelected(id) {
    setGtmSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  function goNext() {
    setStep((s) => Math.min(s + 1, 4));
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }
  function restart() {
    setSelected([]);
    setMaturity(null);
    setGtmEnabled(false);
    setGtmSelected([]);
    setGtmMaturity(null);
    setStep(0);
  }

  /* ---- shared sub-render: nav footer ---- */
  function renderNav(nextLabel, disabled) {
    return (
      <div style={{ borderColor: C.line }} className="no-print flex items-center justify-between mt-6 pt-4 border-t">
        <button
          onClick={goBack}
          style={{ color: C.lane }}
          className="flex items-center gap-1 px-4 py-2.5 rounded text-sm font-medium hover:opacity-70"
        >
          <ChevronLeft size={16} /> {t("back")}
        </button>
        <button
          disabled={disabled}
          onClick={goNext}
          style={{ backgroundColor: disabled ? "#C9C6BC" : C.signal, cursor: disabled ? "not-allowed" : "pointer" }}
          className="flex items-center gap-1 px-5 py-2.5 rounded text-sm font-semibold text-white"
        >
          {nextLabel} <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  /* ---- shared sub-render: value opportunity block (used in step 2 and 4) ---- */
  function renderValueBlock(resultsArr, blockTotalLow, blockTotalHigh, noDriversKey) {
    if (resultsArr.length === 0) {
      return (
        <div style={{ backgroundColor: C.paper, borderColor: C.line, color: C.ink }} className="text-sm border rounded p-4 opacity-80">
          {t(noDriversKey)}
        </div>
      );
    }
    const data = resultsArr.map((r) => ({ name: t(`${r.id}_name`), mid: Math.round(r.mid) }));
    return (
      <div>
        <div className="text-center mb-5">
          <div style={{ fontFamily: MONO, color: C.signal, fontVariantNumeric: "tabular-nums", borderColor: C.line }} className="text-3xl font-bold border-t border-b py-2 inline-block px-4">
            {fmtRange(blockTotalLow, blockTotalHigh)}
          </div>
          <div style={{ color: C.mist }} className="text-xs mt-2 uppercase tracking-wide">{t("totalLabel")}</div>
        </div>
        <div style={{ width: "100%", height: Math.max(150, data.length * 52) }}>
          <ResponsiveContainer>
            <BarChart data={data} layout="vertical" margin={{ left: 4, right: 28, top: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={C.line} />
              <XAxis type="number" tickFormatter={fmtUSD} stroke={C.mist} fontSize={11} />
              <YAxis type="category" dataKey="name" width={128} stroke={C.mist} fontSize={11} />
              <Tooltip formatter={(v) => fmtUSD(v)} />
              <Bar dataKey="mid" fill={C.lane} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <table className="w-full text-sm mt-4">
          <thead>
            <tr style={{ borderColor: C.line, color: C.mist }} className="border-b text-left">
              <th className="py-2 font-medium">{t("tableDriverHeader")}</th>
              <th className="py-2 font-medium text-right">{t("tableRangeHeader")}</th>
            </tr>
          </thead>
          <tbody>
            {resultsArr.map((r) => (
              <tr key={r.id} style={{ borderColor: C.line }} className="border-b">
                <td style={{ color: C.ink }} className="py-2 opacity-80">{t(`${r.id}_name`)}</td>
                <td style={{ fontFamily: MONO, color: C.ink, fontVariantNumeric: "tabular-nums" }} className="py-2 text-right font-medium">
                  {fmtRange(r.low, r.high)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ backgroundColor: C.paper, color: C.mist }} className="flex gap-2 mt-4 text-xs rounded p-3">
          <Info size={14} className="flex-shrink-0 mt-0.5" />
          <div>
            <p>{t("disclaimerText")}</p>
            <p className="mt-1">{t("complexityNote")}</p>
          </div>
        </div>
      </div>
    );
  }

  /* ---- STEP 0 ---- */
  function renderStep0() {
    const bob = BOB_COPY[lang] || BOB_COPY.en;
    const assessmentGuidance = lang === "zh"
      ? "标记阻碍后，系统会把它们映射到可量化的价值驱动，并影响后续诊断。"
      : lang === "es"
        ? "Al confirmar los obstáculos, el sistema los vincula con impulsores de valor cuantificables y orienta el diagnóstico posterior."
        : "Confirming obstacles links them to measurable value drivers and shapes the diagnostic that follows.";
    return (
      <div>
        <h1 style={{ color: C.ink, fontFamily: SANS }} className="text-2xl font-bold mb-1 tracking-tight">{t("step0Title")}</h1>
        <p style={{ color: C.mist }} className="text-sm mb-6">{t("step0Sub")}</p>

        <section className="bob-intake-memo mb-6">
          <div className="bob-memo-header">
            <div className="flex items-center gap-2">
              <span style={{ backgroundColor: C.signal }} className="flex h-7 w-7 items-center justify-center rounded"><Sparkles size={14} color="white" /></span>
              <div>
                <div className="text-white text-sm font-bold">{bob.label}</div>
                <div className="text-white/55 text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO }}>{bob.demo}</div>
              </div>
              <span className="bob-memo-stamp ml-auto flex items-center gap-1" style={{ fontFamily: MONO }}><MessageSquare size={11} /> {bob.ready}</span>
            </div>
          </div>
          <div className="bob-memo-body">
            <div className="bob-memo-label" style={{ fontFamily: MONO }}>INTAKE NOTE / SYMPTOM · IMPACT · HYPOTHESIS</div>
            <h2 style={{ color: C.ink }} className="max-w-xl text-lg font-semibold tracking-tight">{bob.title}</h2>
            <p style={{ color: C.mist }} className="max-w-2xl text-sm leading-relaxed mt-1.5">{bob.intro}</p>
            <div className="bob-entry mt-4 rounded p-3">
              <textarea
                value={bobInput}
                onChange={(event) => { setBobInput(event.target.value); setBobAnalyzed(false); setBobApplied(false); setBobConfirmed(false); setBobPathVisible(false); }}
                placeholder={bob.placeholder}
                rows={3}
                className="w-full resize-y bg-transparent text-sm outline-none"
                style={{ color: C.ink }}
              />
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t pt-2" style={{ borderColor: C.line }}>
                <span style={{ color: C.mist }} className="text-xs italic">{bob.suggestion}</span>
                <button onClick={analyzeBobInput} disabled={!bobInput.trim()} style={{ backgroundColor: bobInput.trim() ? C.signal : "#5E6B75" }} className="flex items-center gap-1.5 rounded px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed">
                  <Send size={13} /> {bob.analyze}
                </button>
              </div>
            </div>

            {bobAnalyzed && (
              <div style={{ backgroundColor: C.card, borderColor: C.line }} className="mt-3 rounded border p-3">
                {bobSignalIds.length > 0 ? (
                  <>
                    <div style={{ color: C.mist, fontFamily: MONO }} className="text-[10px] uppercase tracking-wide">{bob.evidence}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {bobSignalIds.map((id) => <button key={id} onClick={() => toggleBobSignal(id)} style={{ backgroundColor: C.signalSoft, color: C.signal, borderColor: "#E3C296" }} className="border rounded-full px-2.5 py-1 text-xs font-medium">{t(id)} <span className="opacity-55">×</span></button>)}
                    </div>
                    <div style={{ borderColor: C.line }} className="mt-3 border-t pt-3">
                      <div className="bob-diagnostic-grid mt-1">
                        <div className="bob-diagnostic-cell">
                          <div className="bob-diagnostic-label">01 / {bob.impacts}</div>
                          <p>{bobDiagnostic.impacts[0]}</p>
                        </div>
                        <div className="bob-diagnostic-cell">
                          <div className="bob-diagnostic-label">02 / {bob.rootCause}</div>
                          <p>{bobDiagnostic.roots[0]}</p>
                        </div>
                      </div>
                      <div className="bob-question-block mt-3">
                        <div style={{ color: C.mist, fontFamily: MONO }} className="text-[10px] uppercase tracking-wide">03 / {bob.question}</div>
                        <p style={{ color: C.ink }} className="mt-1 text-sm font-medium">{getBobQuestion(bobSignalIds, lang)}</p>
                      </div>
                    </div>
                    {!bobConfirmed ? (
                      <button onClick={confirmBobDiagnostic} style={{ backgroundColor: C.signal }} className="mt-3 flex items-center gap-1.5 rounded px-3 py-2 text-xs font-semibold text-white"><Check size={13} /> {bob.confirm}</button>
                    ) : (
                      <div className="bob-confirmed-diagnostic mt-4">
                        <div className="bob-diagnostic-label">{bob.confirmed}</div>
                        <div className="mt-2 grid gap-3">
                          <div><div className="bob-mini-label">{bob.data}</div><ul>{bobDiagnostic.data.map((item) => <li key={item}>{item}</li>)}</ul></div>
                          <div><div className="bob-mini-label">{bob.diagnosis}</div><p>{bob.diagnosisCopy}</p></div>
                        </div>
                        {!bobPathVisible ? (
                          <button onClick={() => setBobPathVisible(true)} style={{ color: C.lane, borderColor: C.lane }} className="mt-3 flex items-center gap-1.5 rounded border px-3 py-2 text-xs font-semibold"><ArrowRight size={13} /> {bob.showPath}</button>
                        ) : (
                          <div className="bob-pathway mt-4">
                            <div className="bob-mini-label">{bob.path}</div>
                            <p className="mt-1">{bob.pathIntro}</p>
                            <div className="mt-3 grid gap-2">
                              {bobDiagnostic.categories.map((cat) => (
                                <div key={cat} className="bob-path-row">
                                  <div><span>{bob.fact}</span><strong>{PAIN_IDS[cat].filter((id) => bobSignalIds.includes(id)).map((id) => t(id)).join(" · ")}</strong></div>
                                  <div><span>{bob.reasoning}</span><strong>{bobDiagnostic.roots[bobDiagnostic.categories.indexOf(cat)]}</strong></div>
                                  <div><span>{bob.path}</span><strong>{VALUE_TREE[cat][lang].capability}</strong></div>
                                </div>
                              ))}
                            </div>
                            <button onClick={applyBobSignals} style={{ backgroundColor: bobApplied ? C.laneSoft : C.signal }} className="mt-3 flex items-center gap-1.5 rounded px-3 py-2 text-xs font-semibold text-white"><Check size={13} /> {bobApplied ? bob.applied : `${bob.applying} · ${bobSignalIds.length}`}</button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <p style={{ color: C.ink }} className="text-sm">{bob.noSignals}</p>
                )}
              </div>
            )}
          </div>
        </section>

        <div
          style={{
            borderColor: hasGtmSignal && !gtmEnabled ? C.gtm : C.line,
            backgroundColor: hasGtmSignal && !gtmEnabled ? C.gtmSoft : C.card,
          }}
          className="border rounded p-3 mb-6 flex items-center justify-between gap-3"
        >
          <div>
            <div style={{ color: C.ink }} className="text-sm font-semibold">{t("gtmToggleLabel")}</div>
            <div style={{ color: hasGtmSignal && !gtmEnabled ? C.gtm : C.mist }} className="text-xs mt-0.5">
              {hasGtmSignal && !gtmEnabled ? t("gtmNudge") : t("gtmToggleSub")}
            </div>
          </div>
          <button
            onClick={() => setGtmEnabled(!gtmEnabled)}
            style={{ backgroundColor: gtmEnabled ? C.gtm : "#D9D6CC" }}
            className="flex-shrink-0 w-10 h-5 rounded-full relative"
          >
            <span style={{ backgroundColor: "#FFFFFF", left: gtmEnabled ? "22px" : "2px" }} className="absolute top-0.5 w-4 h-4 rounded-full transition-all" />
          </button>
        </div>

        <div className="assessment-decision-strip mb-5">
          <div><span>ASSESSMENT RULE / 01</span><strong>{assessmentGuidance}</strong></div>
          <div className="assessment-signal-count"><span>CONFIRMED SIGNALS</span><b>{String(selected.length + gtmSelected.length).padStart(2, "0")}</b></div>
        </div>

        {CATEGORIES.map((cat, catIndex) => (
          <div key={cat.id} style={{ "--section-accent": cat.accent }} className="manifest-section">
            <div className="manifest-section-head">
              <span className="manifest-index">{String(catIndex + 1).padStart(2, "0")}</span>
              <cat.Icon size={18} color={cat.accent} />
              <h3 style={{ color: cat.accent }} className="font-semibold text-sm">{t(`cat_${cat.id}_title`)}</h3>
            </div>
            <div className="space-y-2">
              {PAIN_IDS[cat.id].map((pid) => {
                const isSel = selected.includes(pid);
                return (
                  <button
                    key={pid}
                    onClick={() => toggleSelected(pid)}
                    style={{ borderColor: isSel ? C.signal : C.line, backgroundColor: isSel ? "#FFF9F2" : C.card }}
                    className="manifest-row w-full text-left flex items-start gap-2.5 transition"
                  >
                    <span
                      style={{ backgroundColor: isSel ? C.signal : "transparent", borderColor: isSel ? C.signal : "#C9C6BC" }}
                      className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center"
                    >
                      {isSel && <Check size={11} color="white" />}
                    </span>
                    <span style={{ color: C.ink }} className="text-sm opacity-85">{t(pid)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {gtmEnabled && (
          <div className="mb-2">
            <div style={{ borderColor: C.line }} className="border-t border-dashed pt-6 mb-4 flex items-center gap-2">
              <Landmark size={16} color={C.gtm} />
              <h2 style={{ color: C.gtm }} className="text-xs font-semibold uppercase tracking-wide">{t("gtmSectionLabel")}</h2>
            </div>
            {GTM_CATEGORIES.map((cat, catIndex) => (
              <div key={cat.id} style={{ "--section-accent": cat.accent }} className="manifest-section">
                <div className="manifest-section-head">
                  <span className="manifest-index">G{catIndex + 1}</span>
                  <cat.Icon size={18} color={cat.accent} />
                  <h3 style={{ color: cat.accent }} className="font-semibold text-sm">{t(`cat_${cat.id}_title`)}</h3>
                </div>
                <div className="space-y-2">
                  {GTM_PAIN_IDS[cat.id].map((pid) => {
                    const isSel = gtmSelected.includes(pid);
                    return (
                      <button
                        key={pid}
                        onClick={() => toggleGtmSelected(pid)}
                        style={{ borderColor: isSel ? cat.accent : C.line, backgroundColor: isSel ? C.paper : C.card }}
                      className="manifest-row w-full text-left flex items-start gap-2.5 transition"
                      >
                        <span
                          style={{ backgroundColor: isSel ? cat.accent : "transparent", borderColor: isSel ? cat.accent : "#C9C6BC" }}
                          className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center"
                        >
                          {isSel && <Check size={11} color="white" />}
                        </span>
                        <span style={{ color: C.ink }} className="text-sm opacity-85">{t(pid)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-6">
          <label style={{ color: C.mist }} className="block text-xs font-semibold uppercase tracking-wide mb-2">{t("industryLabel")}</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            style={{ borderColor: C.line, color: C.ink, backgroundColor: C.card }}
            className="w-full border rounded p-2.5 text-sm"
          >
            {INDUSTRY_IDS.map((id) => (
              <option key={id} value={id}>{t(id)}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span style={{ color: C.mist }} className="text-xs">{selected.length + gtmSelected.length} {t("selectedSuffix")}</span>
          <button
            disabled={selected.length === 0 && gtmSelected.length === 0}
            onClick={goNext}
            style={{
              backgroundColor: selected.length === 0 && gtmSelected.length === 0 ? "#C9C6BC" : C.signal,
              cursor: selected.length === 0 && gtmSelected.length === 0 ? "not-allowed" : "pointer",
            }}
            className="flex items-center gap-1 px-5 py-2.5 rounded text-sm font-semibold text-white"
          >
            {t("btnSeeDrivers")} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  /* ---- STEP 1 ---- */
  function renderStep1() {
    return (
      <div>
        <h1 style={{ color: C.ink, fontFamily: SANS }} className="text-2xl font-bold mb-1 tracking-tight">{t("step1Title")}</h1>
        <p style={{ color: C.mist }} className="text-sm mb-6">{t("step1Sub")}</p>
        {CATEGORIES.filter((cat) => selectedCategories.has(cat.id)).map((cat) => {
          const tree = VALUE_TREE[cat.id][lang];
          return (
            <div key={cat.id} style={{ borderColor: C.line, backgroundColor: C.card }} className="border rounded p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <cat.Icon size={18} color={cat.accent} />
                <h3 style={{ color: cat.accent }} className="font-semibold text-sm">{t(`cat_${cat.id}_title`)}</h3>
              </div>
              <div style={{ color: C.mist }} className="text-xs font-semibold uppercase tracking-wide mb-1.5">{t("rootCausesLabel")}</div>
              <ul style={{ color: C.ink }} className="text-sm space-y-1 mb-3 list-disc list-inside opacity-85">
                {tree.causes.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
              <div style={{ backgroundColor: C.paper }} className="rounded p-3">
                <div style={{ color: C.mist }} className="text-xs font-semibold uppercase tracking-wide mb-1">{t("capabilityLabel")}</div>
                <div style={{ color: C.ink }} className="text-sm">{tree.capability}</div>
              </div>
            </div>
          );
        })}

        {gtmEnabled && GTM_CATEGORIES.filter((cat) => gtmSelectedCategories.has(cat.id)).length > 0 && (
          <div>
            <div style={{ borderColor: C.line }} className="border-t border-dashed pt-6 mb-4 flex items-center gap-2">
              <Landmark size={16} color={C.gtm} />
              <h2 style={{ color: C.gtm }} className="text-xs font-semibold uppercase tracking-wide">{t("gtmSectionLabel")}</h2>
            </div>
            {GTM_CATEGORIES.filter((cat) => gtmSelectedCategories.has(cat.id)).map((cat) => {
              const tree = GTM_VALUE_TREE[cat.id][lang];
              return (
                <div key={cat.id} style={{ borderColor: C.line, backgroundColor: C.card }} className="border rounded p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <cat.Icon size={18} color={cat.accent} />
                    <h3 style={{ color: cat.accent }} className="font-semibold text-sm">{t(`cat_${cat.id}_title`)}</h3>
                  </div>
                  <div style={{ color: C.mist }} className="text-xs font-semibold uppercase tracking-wide mb-1.5">{t("rootCausesLabel")}</div>
                  <ul style={{ color: C.ink }} className="text-sm space-y-1 mb-3 list-disc list-inside opacity-85">
                    {tree.causes.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                  <div style={{ backgroundColor: C.paper }} className="rounded p-3">
                    <div style={{ color: C.mist }} className="text-xs font-semibold uppercase tracking-wide mb-1">{t("capabilityLabel")}</div>
                    <div style={{ color: C.ink }} className="text-sm">{tree.capability}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {renderNav(t("btnEstimate"), false)}
      </div>
    );
  }

  /* ---- STEP 2 ---- */
  function renderStep2() {
    const quickAmounts = [10e6, 25e6, 50e6, 100e6, 250e6, 500e6];
    return (
      <div>
        <h1 style={{ color: C.ink, fontFamily: SANS }} className="text-2xl font-bold mb-1 tracking-tight">{t("step2Title")}</h1>
        <p style={{ color: C.mist }} className="text-sm mb-6">{t("step2Sub")}</p>

        <div className="mb-5">
          <label style={{ color: C.mist }} className="block text-xs font-semibold uppercase tracking-wide mb-2">{t("freightSpendLabel")}</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {quickAmounts.map((v) => (
              <button
                key={v}
                onClick={() => setFreightSpend(v)}
                style={{
                  borderColor: freightSpend === v ? C.lane : C.line,
                  backgroundColor: freightSpend === v ? C.lane : C.card,
                  color: freightSpend === v ? "#FFFFFF" : C.ink,
                  fontFamily: MONO,
                }}
                className="px-3 py-1.5 rounded-full text-xs font-medium border"
              >
                {fmtUSD(v)}
              </button>
            ))}
          </div>
          <div className="relative">
            <span style={{ color: C.mist }} className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
            <input
              type="text"
              inputMode="numeric"
              value={freightSpend.toLocaleString("en-US")}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setFreightSpend(raw ? parseInt(raw, 10) : 0);
              }}
              style={{ borderColor: C.line, color: C.ink, fontFamily: MONO }}
              className="w-full border rounded pl-7 pr-3 py-2.5 text-sm"
            />
          </div>
        </div>

        <div className="mb-6">
          <label style={{ color: C.mist }} className="flex justify-between text-xs font-semibold uppercase tracking-wide mb-2">
            <span>{t("addressableLabel")}</span>
            <span style={{ color: C.ink, fontFamily: MONO }}>{pctAddr}%</span>
          </label>
          <input
            type="range"
            min="20"
            max="100"
            step="5"
            value={pctAddr}
            onChange={(e) => setPctAddr(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div style={{ borderColor: C.line, backgroundColor: C.card }} className="border rounded p-4 mb-2">
          {renderValueBlock(results, totalLow, totalHigh, "noDriversText")}
        </div>

        {gtmEnabled && (
          <div className="mt-8">
            <div style={{ borderColor: C.line }} className="border-t border-dashed pt-6 mb-4 flex items-center gap-2">
              <Landmark size={16} color={C.gtm} />
              <h2 style={{ color: C.gtm }} className="text-xs font-semibold uppercase tracking-wide">{t("gtmSectionLabel")}</h2>
            </div>
            <div className="mb-5">
              <label style={{ color: C.mist }} className="block text-xs font-semibold uppercase tracking-wide mb-2">{t("dutySpendLabel")}</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {[500e3, 1e6, 5e6, 10e6, 25e6, 50e6].map((v) => (
                  <button
                    key={v}
                    onClick={() => setDutySpend(v)}
                    style={{
                      borderColor: dutySpend === v ? C.gtm : C.line,
                      backgroundColor: dutySpend === v ? C.gtm : C.card,
                      color: dutySpend === v ? "#FFFFFF" : C.ink,
                      fontFamily: MONO,
                    }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border"
                  >
                    {fmtUSD(v)}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span style={{ color: C.mist }} className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={dutySpend.toLocaleString("en-US")}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setDutySpend(raw ? parseInt(raw, 10) : 0);
                  }}
                  style={{ borderColor: C.line, color: C.ink, fontFamily: MONO }}
                  className="w-full border rounded pl-7 pr-3 py-2.5 text-sm"
                />
              </div>
            </div>
            <div style={{ borderColor: C.line, backgroundColor: C.card }} className="border rounded p-4">
              {renderValueBlock(gtmResults, gtmTotalLow, gtmTotalHigh, "gtmNoDriversText")}
            </div>
          </div>
        )}

        {renderNav(t("btnSeeMaturity"), false)}
      </div>
    );
  }

  /* ---- STEP 3 ---- */
  function renderStep3() {
    return (
      <div>
        <h1 style={{ color: C.ink, fontFamily: SANS }} className="text-2xl font-bold mb-1 tracking-tight">{t("step3Title")}</h1>
        <p style={{ color: C.mist }} className="text-sm mb-6">{t("step3Sub")}</p>

        <div className="space-y-2 mb-6">
          {MATURITY_LEVELS.map((lvl) => {
            const isSel = maturity === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setMaturity(lvl)}
                style={{ borderColor: isSel ? C.lane : C.line, backgroundColor: isSel ? C.paper : C.card }}
                className="w-full text-left p-3 rounded border transition"
              >
                <div className="flex items-center gap-2">
                  <span
                    style={{ backgroundColor: isSel ? C.lane : "#EDECE7", color: isSel ? "#FFFFFF" : C.mist, fontFamily: MONO }}
                    className="w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold"
                  >
                    {lvl}
                  </span>
                  <span style={{ color: C.ink }} className="text-sm font-semibold">{t(`m${lvl}_title`)}</span>
                </div>
                <p style={{ color: C.mist }} className="text-xs mt-1 ml-7">{t(`m${lvl}_desc`)}</p>
              </button>
            );
          })}
        </div>

        {maturity !== null && <div className="mb-6"><MaturityFitScale maturity={maturity} lang={lang} t={t} /></div>}

        {maturity !== null && (
          <div className="mb-2">
            <VerdictCard verdict={verdict} t={t} />
          </div>
        )}

        {gtmEnabled && (
          <div className="mt-2">
            <div style={{ borderColor: C.line }} className="border-t border-dashed pt-6 mb-4 flex items-center gap-2">
              <Landmark size={16} color={C.gtm} />
              <h2 style={{ color: C.gtm }} className="text-xs font-semibold uppercase tracking-wide">{t("gtmMaturityLabel")}</h2>
            </div>
            <div className="space-y-2 mb-4">
              {MATURITY_LEVELS.map((lvl) => {
                const isSel = gtmMaturity === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => setGtmMaturity(lvl)}
                    style={{ borderColor: isSel ? C.gtm : C.line, backgroundColor: isSel ? C.gtmSoft : C.card }}
                    className="w-full text-left p-3 rounded border transition"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        style={{ backgroundColor: isSel ? C.gtm : "#EDECE7", color: isSel ? "#FFFFFF" : C.mist, fontFamily: MONO }}
                        className="w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold"
                      >
                        {lvl}
                      </span>
                      <span style={{ color: C.ink }} className="text-sm font-semibold">{t(`gm${lvl}_title`)}</span>
                    </div>
                    <p style={{ color: C.mist }} className="text-xs mt-1 ml-7">{t(`gm${lvl}_desc`)}</p>
                  </button>
                );
              })}
            </div>
            {gtmMaturity !== null && (
              <div className="flex gap-1">
                {MATURITY_LEVELS.map((lvl) => (
                  <div key={lvl} style={{ backgroundColor: lvl <= gtmMaturity ? C.gtm : "#EDECE7" }} className="flex-1 h-2.5 rounded-full relative">
                    {lvl === TARGET_MATURITY && <div style={{ backgroundColor: OTM_TARGET_MARKER }} className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-4 rounded-full" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {renderNav(t("btnGenerateCase"), maturity === null || (gtmEnabled && gtmMaturity === null))}
      </div>
    );
  }

  function renderBobDiscoverySummary() {
    const bob = BOB_COPY[lang] || BOB_COPY.en;
    if (!bobConfirmed || bobSignalIds.length === 0) return null;
    return (
      <section className="bob-report-summary mb-6">
        <div className="bob-report-heading"><span>BOB AI / CUSTOMER DIAGNOSTIC</span><strong>{bob.confirmed}</strong></div>
        <div className="bob-report-grid">
          <div><span>{bob.fact}</span><p>{bobSignalIds.map((id) => t(id)).join(" · ")}</p></div>
          <div><span>{bob.impacts}</span><p>{bobDiagnostic.impacts.join(" ")}</p></div>
          <div><span>{bob.rootCause}</span><p>{bobDiagnostic.roots.join(" ")}</p></div>
          <div><span>{bob.data}</span><p>{bobDiagnostic.data.join(" ")}</p></div>
        </div>
        <div className="bob-report-verdict"><span>{bob.diagnosis}</span><p>{bob.diagnosisCopy}</p></div>
        <div className="bob-report-paths">
          <span>{bob.path}</span>
          {bobDiagnostic.categories.map((cat) => <p key={cat}><strong>{VALUE_TREE[cat][lang].capability}</strong><em>{bobDiagnostic.roots[bobDiagnostic.categories.indexOf(cat)]}</em></p>)}
        </div>
      </section>
    );
  }

  /* ---- printable report (window.print() is unreliable inside the
     sandboxed WebView the mobile app uses to render artifacts, so we
     generate a standalone HTML file and let the browser download it —
     the user opens it in a real browser tab and prints/saves as PDF
     from there, which is not subject to the same restriction) ---- */
  function generateReportHtml() {
    const locale = lang === "zh" ? "zh-CN" : lang === "es" ? "es-ES" : "en-US";
    const bob = BOB_COPY[lang] || BOB_COPY.en;
    const rowHtml = (arr) =>
      arr
        .map(
          (r) =>
            `<tr><td style="padding:8px 0;border-bottom:1px solid ${C.line};">${t(`${r.id}_name`)}</td><td style="padding:8px 0;border-bottom:1px solid ${C.line};text-align:right;font-family:ui-monospace,monospace;">${fmtRange(r.low, r.high)}</td></tr>`
        )
        .join("");
    const benefitsHtml = (ids) =>
      ids
        .map(
          (id) =>
            `<div style="border:1px solid ${C.line};border-radius:6px;padding:10px;margin-bottom:8px;"><strong>${t(id)}</strong><div style="color:${C.mist};font-size:12px;margin-top:2px;">${t(`${id}_desc`)}</div></div>`
        )
        .join("");
    const valueBlockHtml = (resultsArr, tLow, tHigh, noDriversKey) => {
      if (resultsArr.length === 0) {
        return `<p style="color:${C.mist};font-size:13px;">${t(noDriversKey)}</p>`;
      }
      return `
        <div style="text-align:center;margin:16px 0;">
          <div style="font-family:ui-monospace,monospace;color:${C.signal};font-size:26px;font-weight:bold;border-top:2px solid ${C.line};border-bottom:2px solid ${C.line};padding:8px;display:inline-block;">${fmtRange(tLow, tHigh)}</div>
          <div style="color:${C.mist};font-size:11px;margin-top:6px;text-transform:uppercase;letter-spacing:0.05em;">${t("totalLabel")}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead><tr style="text-align:left;color:${C.mist};border-bottom:1px solid ${C.line};"><th style="padding:6px 0;">${t("tableDriverHeader")}</th><th style="padding:6px 0;text-align:right;">${t("tableRangeHeader")}</th></tr></thead>
          <tbody>${rowHtml(resultsArr)}</tbody>
        </table>
        <p style="color:${C.mist};font-size:11px;margin-top:10px;">${t("disclaimerText")} ${t("complexityNote")}</p>
      `;
    };
    const maturityScaleHtml = (level, prefix = "") => {
      if (level === null) return "";
      const fit = getFitAssessment(level, lang);
      const statusColor = fit.status === "below" ? C.mist : fit.status === "at" ? C.signal : "#1F7A4D";
      const statusBg = fit.status === "below" ? "#F1F1EE" : fit.status === "at" ? C.signalSoft : "#EBF5EE";
      const scaleCells = MATURITY_LEVELS.map((lvl) => `
        <div style="position:relative;flex:1;text-align:center;">
          <div style="height:16px;border-radius:999px;background:${lvl <= level ? C.lane : "#EDECE7"};"></div>
          <span style="position:absolute;top:2px;left:0;right:0;color:${lvl <= level ? "#FFFFFF" : C.mist};font-size:9px;font-weight:700;font-family:ui-monospace,monospace;">${lvl}</span>
          ${lvl === TARGET_MATURITY ? `<span title="${fit.target}" style="position:absolute;top:-7px;left:50%;width:4px;height:30px;transform:translateX(-50%);border-radius:999px;background:${OTM_TARGET_MARKER};"></span>` : ""}
        </div>`).join("");
      return `
        <section style="border:1px solid ${C.line};border-radius:6px;padding:14px;margin:18px 0;background:#FFFFFF;">
          <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:13px;">
            <div><div style="font-size:13px;font-weight:700;color:${C.ink};">${prefix}${fit.heading}</div><div style="font-size:11px;color:${C.mist};margin-top:3px;">${fit.current}: ${level} &nbsp;·&nbsp; ${fit.target}: ${TARGET_MATURITY}</div></div>
            <span style="font-size:11px;font-weight:700;color:${statusColor};background:${statusBg};border:1px solid ${statusColor};border-radius:999px;padding:5px 8px;white-space:nowrap;">${fit.label}</span>
          </div>
          <div style="display:flex;gap:5px;">${scaleCells}</div>
          <p style="font-size:11px;color:${C.mist};margin:12px 0 0;"><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${OTM_TARGET_MARKER};margin-right:6px;"></span><strong style="color:${C.ink};">${fit.target}</strong>：${fit.detail}</p>
        </section>`;
    };
    const bobReportHtml = bobConfirmed && bobSignalIds.length > 0 ? `
      <section style="border:1px solid ${C.line};border-left:4px solid ${C.signal};padding:14px;margin:18px 0;background:${C.paper};">
        <div style="color:${C.signal};font-family:ui-monospace,monospace;font-size:10px;font-weight:600;letter-spacing:.08em;">BOB AI / CUSTOMER DIAGNOSTIC</div>
        <strong style="display:block;color:${C.ink};font-size:14px;margin-top:4px;">${bob.confirmed}</strong>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
          <div><span style="color:${C.mist};font-size:10px;text-transform:uppercase;">${bob.fact}</span><p style="margin:4px 0;font-size:12px;">${bobSignalIds.map((id) => t(id)).join(" · ")}</p></div>
          <div><span style="color:${C.mist};font-size:10px;text-transform:uppercase;">${bob.impacts}</span><p style="margin:4px 0;font-size:12px;">${bobDiagnostic.impacts.join(" ")}</p></div>
          <div><span style="color:${C.mist};font-size:10px;text-transform:uppercase;">${bob.rootCause}</span><p style="margin:4px 0;font-size:12px;">${bobDiagnostic.roots.join(" ")}</p></div>
          <div><span style="color:${C.mist};font-size:10px;text-transform:uppercase;">${bob.data}</span><p style="margin:4px 0;font-size:12px;">${bobDiagnostic.data.join(" ")}</p></div>
        </div>
        <div style="border-top:1px dashed ${C.line};margin-top:12px;padding-top:10px;"><span style="color:${C.mist};font-size:10px;text-transform:uppercase;">${bob.diagnosis}</span><p style="margin:4px 0;font-size:12px;">${bob.diagnosisCopy}</p></div>
        <div style="border-top:1px dashed ${C.line};margin-top:12px;padding-top:10px;"><span style="color:${C.mist};font-size:10px;text-transform:uppercase;">${bob.path}</span>${bobDiagnostic.categories.map((cat) => `<p style="margin:5px 0;font-size:12px;"><strong>${VALUE_TREE[cat][lang].capability}</strong><br /><em style="color:${C.mist};">${bobDiagnostic.roots[bobDiagnostic.categories.indexOf(cat)]}</em></p>`).join("")}</div>
      </section>` : "";
    const gtmHtml = gtmEnabled
      ? `
        <hr style="border:none;border-top:1px dashed ${C.line};margin:28px 0;" />
        <h2 style="color:${C.gtm};font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">${t("gtmSectionLabel")}</h2>
        ${valueBlockHtml(gtmResults, gtmTotalLow, gtmTotalHigh, "gtmNoDriversText")}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0;">
          <div style="border:1px solid ${C.line};border-radius:6px;padding:10px;"><div style="color:${C.mist};font-size:11px;">${t("dutySpendLabel")}</div><div style="font-weight:600;">${fmtUSD(dutySpend)}</div></div>
          <div style="border:1px solid ${C.line};border-radius:6px;padding:10px;"><div style="color:${C.mist};font-size:11px;">${t("currentLabel")}</div><div style="font-weight:600;">${gtmMaturity ? t(`gm${gtmMaturity}_title`) : "\u2014"}</div></div>
        </div>
        ${maturityScaleHtml(gtmMaturity, "GTM · ")}
        ${benefitsHtml(GTM_STRATEGIC_BENEFITS)}
      `
      : "";
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<title>${t("step4Title")}</title>
<style>
  body { font-family: -apple-system,'Segoe UI',ui-sans-serif,system-ui,sans-serif; background:#F7F6F2; color:#12181F; padding:28px; max-width:720px; margin:0 auto; }
  h1 { font-size:24px; margin-bottom:4px; }
  @media print { body { background:#fff; padding:0; } }
</style>
</head>
<body>
  <h1>${t("step4Title")}</h1>
  <p style="color:${C.mist};font-size:12px;">${t("dateGenerated")}: ${new Date().toLocaleDateString(locale)}</p>
  <h2 style="color:${C.mist};font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-top:18px;">Business Case Conclusion</h2>
  <div style="background:${verdict === "strong" ? "#EBF5EE" : verdict === "potential" ? C.signalSoft : "#F1F1EE"};border:1px solid ${C.line};border-radius:6px;padding:16px;margin:10px 0 16px;">
    <strong style="font-size:15px;">${t(`verdict_${verdict}_title`)}</strong>
    <p style="margin:8px 0;">${t(`verdict_${verdict}_desc`)}</p>
    <p style="font-style:italic;color:${C.mist};">${t(`verdict_${verdict}_next`)}</p>
  </div>
  ${bobReportHtml}
  ${gtmEnabled ? `<p style="color:${C.gtm};font-size:13px;font-weight:600;">${t("gtmOpportunityBadge")}</p>` : ""}
  <h2 style="color:${C.mist};font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">${t("companyProfileLabel")}</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;">
    <div style="border:1px solid ${C.line};border-radius:6px;padding:10px;"><div style="color:${C.mist};font-size:11px;">${t("freightSpendLabel")}</div><div style="font-weight:600;">${fmtUSD(freightSpend)}</div></div>
    <div style="border:1px solid ${C.line};border-radius:6px;padding:10px;"><div style="color:${C.mist};font-size:11px;">${t("industryLabel")}</div><div style="font-weight:600;">${t(industry)}</div></div>
    <div style="border:1px solid ${C.line};border-radius:6px;padding:10px;"><div style="color:${C.mist};font-size:11px;">${t("currentLabel")}</div><div style="font-weight:600;">${maturity ? t(`m${maturity}_title`) : "\u2014"}</div></div>
    <div style="border:1px solid ${C.line};border-radius:6px;padding:10px;"><div style="color:${C.mist};font-size:11px;">${t("profileChallengesLabel")}</div><div style="font-weight:600;">${numChallenges}</div></div>
  </div>
  ${maturityScaleHtml(maturity)}
  <h2 style="color:${C.mist};font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">${t("valueOpportunityLabel")}</h2>
  ${valueBlockHtml(results, totalLow, totalHigh, "noDriversText")}
  <h2 style="color:${C.mist};font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-top:20px;">${t("strategicBenefitsLabel")}</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">${benefitsHtml(STRATEGIC_BENEFITS)}</div>
  <h2 style="color:${C.mist};font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-top:20px;">${t("whyOTMLabel")}</h2>
  <p>${t("whyOtmFlow").join(" \u2192 ")}</p>
  <h2 style="color:${C.mist};font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-top:20px;">${t("nextStepLabel")}</h2>
  <p>${t(`verdict_${verdict}_next`)}</p>
  ${gtmHtml}
  <p style="color:${C.mist};font-size:11px;text-align:center;margin-top:30px;">${t("footerNote")}</p>
</body>
</html>`;
  }

  function handlePrint() {
    const html = generateReportHtml();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "otm-value-assessment-business-case.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ---- STEP 4 ---- */
  function renderStep4() {
    const locale = lang === "zh" ? "zh-CN" : lang === "es" ? "es-ES" : "en-US";
    return (
      <div>
        <div className="no-print flex justify-end gap-2 mb-4">
          <button
            onClick={handlePrint}
            style={{ borderColor: C.line, color: C.ink }}
            className="flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium border"
          >
            <Printer size={14} /> {t("btnPrint")}
          </button>
          <button
            onClick={restart}
            style={{ borderColor: C.line, color: C.ink }}
            className="flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium border"
          >
            <RotateCcw size={14} /> {t("btnRestart")}
          </button>
        </div>

        <h1 style={{ color: C.ink, fontFamily: SANS }} className="text-2xl font-bold mb-1 tracking-tight">{t("step4Title")}</h1>
        <p style={{ color: C.mist, fontFamily: MONO }} className="text-xs mb-6">
          {t("dateGenerated")}: {new Date().toLocaleDateString(locale)}
        </p>

        <div className="mb-6">
          <VerdictCard verdict={verdict} t={t} />
          {gtmEnabled && (
            <div style={{ color: C.gtm }} className="text-xs font-medium mt-2 flex items-center gap-1">
              <Landmark size={12} /> {t("gtmOpportunityBadge")}
            </div>
          )}
        </div>

        {renderBobDiscoverySummary()}

        {maturity !== null && (
          <div className="mb-6">
            <MaturityFitScale maturity={maturity} lang={lang} t={t} />
          </div>
        )}

        <div className="mb-6">
          <h2 style={{ color: C.mist }} className="text-xs font-semibold uppercase tracking-wide mb-3">{t("companyProfileLabel")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <div style={{ borderColor: C.line }} className="border rounded p-3">
              <div style={{ color: C.mist }} className="text-xs">{t("freightSpendLabel")}</div>
              <div style={{ color: C.ink, fontFamily: MONO }} className="text-sm font-semibold">{fmtUSD(freightSpend)}</div>
            </div>
            <div style={{ borderColor: C.line }} className="border rounded p-3">
              <div style={{ color: C.mist }} className="text-xs">{t("industryLabel")}</div>
              <div style={{ color: C.ink }} className="text-sm font-semibold">{t(industry)}</div>
            </div>
            <div style={{ borderColor: C.line }} className="border rounded p-3">
              <div style={{ color: C.mist }} className="text-xs">{t("currentLabel")}</div>
              <div style={{ color: C.ink }} className="text-sm font-semibold">{maturity ? t(`m${maturity}_title`) : "\u2014"}</div>
            </div>
            <div style={{ borderColor: C.line }} className="border rounded p-3">
              <div style={{ color: C.mist }} className="text-xs">{t("profileChallengesLabel")}</div>
              <div style={{ color: C.ink, fontFamily: MONO }} className="text-sm font-semibold">{numChallenges}</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 style={{ color: C.mist }} className="text-xs font-semibold uppercase tracking-wide mb-3">{t("valueOpportunityLabel")}</h2>
          <div style={{ borderColor: C.line, backgroundColor: C.card }} className="border rounded p-4">
            {renderValueBlock(results, totalLow, totalHigh, "noDriversText")}
          </div>
        </div>

        <div className="mb-6">
          <h2 style={{ color: C.mist }} className="text-xs font-semibold uppercase tracking-wide mb-3">{t("strategicBenefitsLabel")}</h2>
          <div className="grid grid-cols-2 gap-3">
            {STRATEGIC_BENEFITS.map((id) => (
              <div key={id} style={{ borderColor: C.line }} className="border rounded p-3">
                <div style={{ color: C.ink }} className="text-sm font-semibold">{t(id)}</div>
                <div style={{ color: C.mist }} className="text-xs mt-1">{t(`${id}_desc`)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 style={{ color: C.mist }} className="text-xs font-semibold uppercase tracking-wide mb-3">{t("whyOTMLabel")}</h2>
          <div className="flex flex-wrap items-center gap-2">
            {t("whyOtmFlow").map((label, i, arr) => (
              <React.Fragment key={i}>
                <span style={{ backgroundColor: C.signalSoft, borderColor: "#E3C296", color: C.signal }} className="px-3 py-1.5 border rounded-full text-xs font-medium">
                  {label}
                </span>
                {i < arr.length - 1 && <ArrowRight size={14} color={C.mist} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: C.paper, borderColor: C.line }} className="mb-6 border rounded p-4">
          <h2 style={{ color: C.mist }} className="text-xs font-semibold uppercase tracking-wide mb-2">{t("nextStepLabel")}</h2>
          <p style={{ color: C.ink }} className="text-sm opacity-85">{t(`verdict_${verdict}_next`)}</p>
        </div>

        {gtmEnabled && (
          <div className="mb-6">
            <div style={{ borderColor: C.line }} className="border-t border-dashed pt-6 mb-4 flex items-center gap-2">
              <Landmark size={16} color={C.gtm} />
              <h2 style={{ color: C.gtm }} className="text-xs font-semibold uppercase tracking-wide">{t("gtmSectionLabel")}</h2>
            </div>
            <div style={{ borderColor: C.line, backgroundColor: C.card }} className="border rounded p-4 mb-4">
              {renderValueBlock(gtmResults, gtmTotalLow, gtmTotalHigh, "gtmNoDriversText")}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div style={{ borderColor: C.line }} className="border rounded p-3">
                <div style={{ color: C.mist }} className="text-xs">{t("dutySpendLabel")}</div>
                <div style={{ color: C.ink, fontFamily: MONO }} className="text-sm font-semibold">{fmtUSD(dutySpend)}</div>
              </div>
              <div style={{ borderColor: C.line }} className="border rounded p-3">
                <div style={{ color: C.mist }} className="text-xs">{t("currentLabel")}</div>
                <div style={{ color: C.ink }} className="text-sm font-semibold">{gtmMaturity ? t(`gm${gtmMaturity}_title`) : "\u2014"}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {GTM_STRATEGIC_BENEFITS.map((id) => (
                <div key={id} style={{ borderColor: C.line }} className="border rounded p-3">
                  <div style={{ color: C.ink }} className="text-sm font-semibold">{t(id)}</div>
                  <div style={{ color: C.mist }} className="text-xs mt-1">{t(`${id}_desc`)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p style={{ color: C.mist }} className="text-xs text-center mt-8 pb-4 opacity-75">{t("footerNote")}</p>

        <div style={{ borderColor: C.line }} className="no-print mt-6 pt-4 border-t">
          <button onClick={goBack} style={{ color: C.lane }} className="flex items-center gap-1 px-4 py-2.5 rounded text-sm font-medium hover:opacity-70">
            <ChevronLeft size={16} /> {t("back")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="otm-app-shell" style={{ fontFamily: SANS }}>
      <style>{"@media print { .no-print, .top-bar, .assessment-rail, .sheet-kicker { display: none !important; } body { background: white; } .assessment-layout { display:block; width:100%; padding:0; } .assessment-sheet { border:0; box-shadow:none; padding:0; } .assessment-sheet::before { display:none; } }"}</style>

      <header className="no-print top-bar">
        <div className="top-bar-inner flex items-center justify-between gap-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="brand-mark-wrap"><img src={BRAND_MARK} alt="" /></div>
            <div className="min-w-0">
              <div className="brand-kicker">OTM / ORACLE TRANSPORTATION MANAGEMENT</div>
              <div className="brand-wordmark">{t("appTitle")}</div>
              <div className="brand-route-node" aria-hidden="true"><i /><span /><b /><i /></div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="top-status"><span>ASSESSMENT STATUS</span><strong>{String(step + 1).padStart(2, "0")} / 05 · {t("stepLabels")[step]}</strong></div>
            <div style={{ backgroundColor: C.laneSoft }} className="flex flex-none items-center gap-0.5 rounded-full p-1">
              {["en", "es", "zh"].map((l) => (
                <button key={l} onClick={() => setLang(l)} style={{ backgroundColor: lang === l ? C.signal : "transparent", color: "#FFFFFF" }} className="rounded-full px-2.5 py-1 text-xs font-medium">
                  {l === "en" ? "EN" : l === "es" ? "ES" : "中文"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="assessment-layout">
        <aside className="no-print assessment-rail">
          <img src={railImage} alt="" className="rail-image" />
          <div className="rail-content">
            <div className="rail-eyebrow">VALUE PATH / {String(step + 1).padStart(2, "0")}</div>
            <h2 className="rail-headline">{step === 4 ? t("step4Title") : t("appTagline")}</h2>
            <p className="rail-copy">{step === 0 ? "标记当前阻碍，让价值路径变得具体。" : "每一步都会把运营复杂性转化为更清晰的业务讨论。"}</p>
            <div className="rail-stage-list">
              {t("stepLabels").map((label, i) => (
                <button type="button" disabled={i > step} onClick={() => i <= step && setStep(i)} className={`rail-stage ${i === step ? "rail-stage-active" : ""}`} key={label}>
                  <span className="rail-stage-dot">{i < step ? "✓" : String(i + 1).padStart(2, "0")}</span><span>{label}</span>
                </button>
              ))}
            </div>
            <div className="rail-metric"><span>VALUE SIGNALS</span><strong>{String(selected.length + gtmSelected.length).padStart(2, "0")}</strong></div>
          </div>
        </aside>

        <section className="assessment-sheet">
          <div className="sheet-kicker"><span className="sheet-eyebrow">ASSESSMENT WORKSHEET</span><strong>{String(step + 1).padStart(2, "0")} / 05</strong></div>
          {step === 0 && renderStep0()}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </section>
      </main>
    </div>
  );
}
