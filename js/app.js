/* ============================================================
   App — theming, accordion, rendering, PRISMA diagram, chart
   ============================================================ */
(function(){
  "use strict";

  /* ---------------- Theme ---------------- */
  const THEME_KEY = "vpa_theme";
  function applyTheme(mode){
    if(mode === "light" || mode === "dark"){
      document.documentElement.setAttribute("data-theme", mode);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }
  function currentEffectiveTheme(){
    const attr = document.documentElement.getAttribute("data-theme");
    if(attr) return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function initTheme(){
    let saved = null;
    try{ saved = localStorage.getItem(THEME_KEY); }catch(e){}
    applyTheme(saved);
  }
  function toggleTheme(){
    const eff = currentEffectiveTheme();
    const next = eff === "dark" ? "light" : "dark";
    applyTheme(next);
    try{ localStorage.setItem(THEME_KEY, next); }catch(e){}
    renderSizeChart();
  }
  initTheme();

  /* ---------------- Utility ---------------- */
  function el(tag, attrs, children){
    const node = tag === "svg"
      ? document.createElementNS("http://www.w3.org/2000/svg", tag)
      : document.createElement(tag);
    if(attrs){
      Object.keys(attrs).forEach(k=>{
        if(k === "class") node.setAttribute("class", attrs[k]);
        else if(k === "html") node.innerHTML = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children||[]).forEach(c=>{ if(c) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return node;
  }
  function cssVar(name){
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  function escapeXML(s){
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }
  function levelClass(rating){
    const r = (rating||"").toLowerCase();
    if(r.indexOf("adecuada")>=0) return "level-alta";
    if(r.indexOf("dudosa")>=0) return "level-baja";
    return "level-por";
  }
  function wrapLabel(text, maxChars){
    const words = text.split(" ");
    const lines = []; let cur = "";
    words.forEach(w=>{
      if((cur+" "+w).trim().length > maxChars){ lines.push(cur.trim()); cur = w; }
      else cur = (cur+" "+w).trim();
    });
    if(cur) lines.push(cur);
    return lines;
  }

  /* ============================================================
     ACCORDION
     ============================================================ */
  const SECTIONS = [
    { id:"resumen", num:"01", title:"Resumen ejecutivo", sub:"Lo esencial en 60 segundos", open:true },
    { id:"busqueda", num:"02", title:"Estrategia de búsqueda", sub:"4 bases, ecuaciones y estado de ejecución", open:false },
    { id:"estudios", num:"03", title:"Estudios incluidos", sub:"7 estudios a texto completo, con enlace y n de voluntarios", open:false },
    { id:"calidad", num:"04", title:"Evaluación de la calidad", sub:"COSMIN y COREQ, dominio evaluado y calificación", open:false },
    { id:"discusion", num:"05", title:"Síntesis y discusión", sub:"Marco de tres fases, hallazgos y consideraciones éticas", open:false },
    { id:"lagunas", num:"06", title:"Lagunas de evidencia", sub:"Qué no sabemos todavía", open:false },
    { id:"limitaciones", num:"07", title:"Limitaciones y transparencia", sub:"Límites del informe y anexo de ejecución manual", open:false },
    { id:"metodologia", num:"08", title:"Metodología en breve", sub:"PICO, flujo PRISMA, bases y herramientas de calidad", open:false },
  ];

  function buildAccordionShell(){
    const wrap = document.getElementById("accordion");
    SECTIONS.forEach(s=>{
      const item = el("div", {class:"acc-item"+(s.open?" open":""), id:"sec-"+s.id});
      const header = el("button", {class:"acc-header","aria-expanded": s.open?"true":"false"}, [
        el("span",{class:"num"},[s.num]),
        el("span",{class:"titles"},[ el("h3",{},[s.title]), el("span",{class:"sub"},[s.sub]) ]),
        el("svg",{class:"chev",viewBox:"0 0 24 24",fill:"none",html:'<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'}),
      ]);
      const panel = el("div",{class:"acc-panel"});
      const inner = el("div",{},[ el("div",{class:"acc-body", id:"body-"+s.id}) ]);
      panel.appendChild(inner);
      header.addEventListener("click", ()=> toggleSection(item, header));
      item.appendChild(header);
      item.appendChild(panel);
      wrap.appendChild(item);
    });
  }
  function toggleSection(item, header, forceOpen){
    const willOpen = typeof forceOpen === "boolean" ? forceOpen : !item.classList.contains("open");
    item.classList.toggle("open", willOpen);
    header.setAttribute("aria-expanded", willOpen ? "true":"false");
    if(willOpen) requestChartRenderFor(item.id.replace("sec-",""));
  }
  function setAllSections(open){
    document.querySelectorAll(".acc-item").forEach(item=>{
      const header = item.querySelector(".acc-header");
      toggleSection(item, header, open);
    });
  }
  function requestChartRenderFor(sectionId){
    if(sectionId === "estudios") renderSizeChart();
  }

  /* ============================================================
     RENDER: Header / Hero
     ============================================================ */
  function renderHero(){
    document.getElementById("brand-title").textContent = DATA.meta.title;
    document.getElementById("hero-title").textContent = DATA.meta.title;
    document.getElementById("hero-lede").textContent = DATA.meta.subtitle;
    document.getElementById("hero-framework").textContent = DATA.meta.framework;
    document.getElementById("hero-period").textContent = DATA.meta.period;
    document.getElementById("byline").innerHTML =
      `<strong>${DATA.meta.author}</strong>${DATA.meta.credentials ? ", "+DATA.meta.credentials : ""} · ${DATA.meta.affiliation}`;

    const grid = document.getElementById("stat-grid");
    DATA.stats.forEach(s=>{
      grid.appendChild(el("div",{class:"stat-card"},[
        el("div",{class:"value"},[s.value]),
        el("div",{class:"label"},[s.label]),
        el("div",{class:"detail"},[s.detail]),
      ]));
    });

    document.getElementById("footer-disclaimer").textContent = DATA.meta.disclaimer;
    document.getElementById("footer-author").textContent =
      DATA.meta.author + (DATA.meta.credentials ? ", "+DATA.meta.credentials : "") + " · " + DATA.meta.affiliation;
    document.getElementById("year").textContent = new Date().getFullYear();

    if(DATA.meta.license){
      const lic = DATA.meta.license;
      const badge = document.getElementById("cc-badge");
      badge.href = lic.url;
      badge.title = lic.name;
      badge.innerHTML = `
        <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
          <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" stroke-width="1.6"/>
          <circle cx="11.2" cy="16" r="6.4" fill="none" stroke="currentColor" stroke-width="1.6"/>
          <circle cx="20.8" cy="16" r="6.4" fill="none" stroke="currentColor" stroke-width="1.6"/>
          <path d="M13 13.1c-.7-.5-1.4-.7-2.2-.7-1.9 0-3.3 1.5-3.3 3.6s1.4 3.6 3.3 3.6c.9 0 1.6-.2 2.3-.8l-.6-1.1c-.5.4-1 .6-1.6.6-1.1 0-1.9-.9-1.9-2.3s.8-2.3 1.9-2.3c.5 0 1 .2 1.5.5z" fill="currentColor" stroke="none"/>
          <path d="M22.6 13.1c-.7-.5-1.4-.7-2.2-.7-1.9 0-3.3 1.5-3.3 3.6s1.4 3.6 3.3 3.6c.9 0 1.6-.2 2.3-.8l-.6-1.1c-.5.4-1 .6-1.6.6-1.1 0-1.9-.9-1.9-2.3s.8-2.3 1.9-2.3c.5 0 1 .2 1.5.5z" fill="currentColor" stroke="none"/>
        </svg>
        <span>${lic.name}</span>`;
      document.getElementById("footer-license-text").textContent = lic.text;
    }
  }

  /* ============================================================
     RENDER: 01 Resumen
     ============================================================ */
  function renderResumen(){
    const body = document.getElementById("body-resumen");
    body.appendChild(el("p",{},[
      "Esta revisión de alcance sintetiza la evidencia (2021–2026) sobre una práctica metodológica recurrente en el desarrollo y adaptación de instrumentos de medición en salud: validar preguntas abiertas mediante voluntarios sanos o muestras de población general, antes de aplicar el instrumento a la población de pacientes a la que finalmente está destinado. Tras cribar 179 registros únicos de 4 bases, se incluyeron 7 estudios a texto completo, todos indexados en PubMed/MEDLINE."
    ]));
    body.appendChild(el("div",{class:"selective-box"},[
      el("h4",{},["Conclusión principal"]),
      el("h3",{},["Filtro necesario, pero no suficiente"]),
      el("p",{},["La validación con voluntarios sanos/población general está respaldada (COSMIN, ISPOR) como fase de depuración lingüística y de comprensibilidad general — pero la evidencia identificada indica que debe complementarse, no reemplazarse, con una fase posterior en pacientes para establecer relevancia y validez de contenido específica de la enfermedad. El riesgo documentado es de omisión (no detectar problemas de relevancia específicos del paciente), no de comisión."]),
    ]));
    body.appendChild(el("p",{style:"margin-top:14px;font-size:.85rem;color:var(--text-muted)"},[
      "Explora las secciones siguientes: primero la estrategia de búsqueda multibase (el cómo), luego los estudios incluidos y su evaluación de calidad (la evidencia), la síntesis y discusión (el porqué), y finalmente las lagunas, limitaciones y la metodología completa (el detalle técnico)."
    ]));
  }

  /* ============================================================
     RENDER: 02 Estrategia de búsqueda
     ============================================================ */
  function renderBusqueda(){
    const body = document.getElementById("body-busqueda");
    body.appendChild(el("p",{},[
      "Se identificaron cuatro bases pertinentes. Solo PubMed pudo ejecutarse mediante API automatizada; LILACS/BVS, Google Scholar y Embase fueron ejecutadas manualmente por el investigador y sus exportaciones (CSV) fueron cribadas por el documentalista."
    ]));
    DATA.searchStrategy.forEach(s=>{
      const card = el("div",{class:"search-card"});
      card.appendChild(el("div",{class:"sc-head"},[
        el("h4",{},[s.db]),
        el("span",{class:"sc-n"},["n = "+s.n]),
      ]));
      card.appendChild(el("div",{class:"sc-status"},[s.status]));
      const pre = document.createElement("pre");
      pre.className = "code-block";
      pre.textContent = s.equation;
      card.appendChild(pre);
      card.appendChild(el("div",{class:"sc-note"},[s.note]));
      body.appendChild(card);
    });
  }

  /* ============================================================
     PRISMA SVG diagram (shared by Metodología)
     ============================================================ */
  function buildPrismaSVG(p){
    const svgNS = "http://www.w3.org/2000/svg";
    const mainX = 88, boxW = 300, gapX = 30;
    const sideX = mainX + boxW + gapX, sideW = 250;
    const stageX = 8, stageW = 42;
    const lineH = 14.5, padBottom = 12;

    const svg = document.createElementNS(svgNS,"svg");
    svg.setAttribute("role","img");
    svg.setAttribute("aria-label","Diagrama de flujo PRISMA de selección de estudios");

    const defs = document.createElementNS(svgNS,"defs");
    defs.innerHTML = `
      <marker id="parrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="context-stroke"></path>
      </marker>`;
    svg.appendChild(defs);

    function box(x, y, w, title, detailLines, extraClass){
      const titleLines = wrapLabel(title, Math.floor(w/6.1));
      const detailY0 = 16 + titleLines.length*13 + 6;
      const h = detailY0 + detailLines.length*lineH + padBottom - 4;
      const g = document.createElementNS(svgNS,"g");
      g.setAttribute("class","prisma-box"+(extraClass?" "+extraClass:""));
      let html = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8"></rect>`;
      html += titleLines.map((l,i)=>
        `<text x="${x+12}" y="${y+16+i*13}" class="prisma-title">${escapeXML(l)}</text>`
      ).join("");
      detailLines.forEach((l,i)=>{
        html += `<text x="${x+12}" y="${y+detailY0+i*lineH}" class="prisma-label">${escapeXML(l)}</text>`;
      });
      g.innerHTML = html;
      svg.appendChild(g);
      return h;
    }
    function arrowV(x,y1,y2){
      const p2 = document.createElementNS(svgNS,"path");
      p2.setAttribute("d", `M ${x} ${y1} L ${x} ${y2}`);
      p2.setAttribute("class","edge-path prisma-arrow");
      p2.setAttribute("marker-end","url(#parrow)");
      svg.appendChild(p2);
    }
    function arrowH(x1,x2,y){
      const p2 = document.createElementNS(svgNS,"path");
      p2.setAttribute("d", `M ${x1} ${y} L ${x2} ${y}`);
      p2.setAttribute("class","edge-path prisma-arrow");
      p2.setAttribute("marker-end","url(#parrow)");
      svg.appendChild(p2);
    }
    function stagePill(y1,y2,text){
      const cy = (y1+y2)/2;
      const g = document.createElementNS(svgNS,"g");
      g.setAttribute("class","prisma-stage-pill");
      g.innerHTML = `
        <rect x="${stageX}" y="${y1}" width="${stageW}" height="${Math.max(y2-y1,60)}" rx="14"></rect>
        <text x="0" y="0" class="prisma-stage" text-anchor="middle" transform="translate(${stageX+stageW/2} ${cy}) rotate(-90)">${escapeXML(text)}</text>`;
      svg.appendChild(g);
    }
    function headerPill(x,y,w,text){
      const g = document.createElementNS(svgNS,"g");
      g.setAttribute("class","prisma-header-pill");
      g.innerHTML = `
        <rect x="${x}" y="${y}" width="${w}" height="28" rx="14"></rect>
        <text x="${x+w/2}" y="${y+18}" class="prisma-header-text" text-anchor="middle">${escapeXML(text)}</text>`;
      svg.appendChild(g);
    }

    let y = 40;
    headerPill(mainX, 4, (sideX+sideW)-mainX, "Identificación de estudios mediante bases de datos");

    const dbLines = p.identifiedByDb.map(d=>`${d.label}: ${d.n}`);
    const hA = box(mainX, y, boxW, `Estudios identificados de bases de datos (n = ${p.identifiedTotal})`, dbLines);
    const removedLines = p.removedBreakdown.map(d=>`${d.label}: ${d.n}`);
    const hB = box(sideX, y, sideW, `Registros eliminados antes del cribado (n = ${p.removedTotal})`, removedLines, "prisma-removed");
    arrowH(mainX+boxW, sideX-2, y + hA/2);
    const row1Bottom = y + hA;
    y = row1Bottom + 26;

    const hC = box(mainX, y, boxW, `Registros únicos cribados por título y resumen (n = ${p.screenedTotal})`, []);
    const excludedLines = [];
    p.excludedReasons.forEach(r=> wrapLabel(r, 40).forEach((l,i)=> excludedLines.push((i===0?"– ":"   ")+l)));
    const hD = box(sideX, y, sideW, `Registros excluidos (n = ${p.excludedTotal})`, excludedLines, "prisma-removed");
    arrowH(mainX+boxW, sideX-2, y + hC/2);
    const row2MainBottom = y + hC;
    const row2MaxBottom = y + Math.max(hC, hD);
    y = row2MaxBottom + 26;

    const includedLines = p.includedByDb.filter(d=>d.n>0).map(d=>`${d.label}: ${d.n}`);
    const hE = box(mainX, y, boxW, `Estudios incluidos a texto completo (n = ${p.includedTotal})`, includedLines, "prisma-included");

    arrowV(mainX+boxW/2, 4+28, 40);
    arrowV(mainX+boxW/2, row1Bottom, row1Bottom+26);
    arrowV(mainX+boxW/2, row2MainBottom, y);

    stagePill(40, row1Bottom, "Identificación");
    stagePill(row1Bottom+26, row2MaxBottom, "Selección");
    stagePill(y, y+hE, "Incluidos");

    const totalH = y + hE + 16;
    const totalW = sideX + sideW + 16;
    svg.setAttribute("viewBox", `0 0 ${totalW} ${totalH}`);
    svg.setAttribute("width","100%");
    return svg;
  }

  /* ---------------- APA 7 helpers ---------------- */
  function splitAuthorYear(study){
    const m = study.author.match(/^(.*),\s*(\d{4})\s*(.*)$/);
    return { name: m ? m[1].trim() : study.author, year: m ? m[2] : "", extra: m && m[3] ? m[3].trim() : "" };
  }
  function apaCitationPlain(study){
    const { name, year, extra } = splitAuthorYear(study);
    let text = `${name} (${year})${extra ? " "+extra : ""}. ${study.title}. ${study.journal}.`;
    if(study.doi) text += ` ${study.doi}`;
    return text;
  }
  function apaCitation(study){
    const { name, year, extra } = splitAuthorYear(study);
    let html = `${escapeXML(name)} (${escapeXML(year)})${extra ? " "+escapeXML(extra) : ""}. ${escapeXML(study.title)}. ${escapeXML(study.journal)}.`;
    if(study.doi) html += ` <a href="${study.doi}" target="_blank" rel="noopener">${escapeXML(study.doi)}</a>`;
    return html;
  }

  /* ---------------- CSV export ---------------- */
  function toCSV(columns, rows){
    const esc = v => `"${String(v).replace(/"/g,'""')}"`;
    return [columns.map(esc).join(","), ...rows.map(r=>r.map(esc).join(","))].join("\r\n");
  }
  function makeDownloadLink(filename, columns, rows){
    const csv = toCSV(columns, rows);
    const blob = new Blob(["﻿"+csv], {type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    return el("a",{href:url, download:filename, class:"csv-download"},[
      el("svg",{viewBox:"0 0 24 24",fill:"none",width:"14",height:"14",html:'<path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'}),
      "Descargar CSV",
    ]);
  }

  /* ============================================================
     RENDER: 03 Estudios incluidos
     ============================================================ */
  let sizeChartInstance = null;
  function renderEstudios(){
    const body = document.getElementById("body-estudios");
    body.appendChild(el("p",{},[
      "Filtra por calificación de calidad orientativa (COSMIN/COREQ). Cada referencia está completa en formato APA 7, con hipervínculo al DOI. El gráfico muestra el tamaño de la muestra de voluntarios sanos/población general en la fase de pretesteo con preguntas abiertas de cada estudio — la variable central de esta revisión — en escala logarítmica, dada la enorme heterogeneidad (6 a 1700 participantes)."
    ]));

    const chartBox = el("div",{class:"chart-box"},[ el("canvas",{id:"chart-pretestn"}) ]);
    body.appendChild(chartBox);
    body.appendChild(el("p",{class:"indicator-source"},["n de voluntarios sanos/población general en la fase de preguntas abiertas o entrevista cognitiva (no el n total del estudio, que en 2 casos incluye una fase psicométrica posterior mucho mayor en pacientes)."]));

    const ratings = ["Todas", ...Array.from(new Set(DATA.studies.map(s=>s.quality.rating)))];
    const filterRow = el("div",{class:"filter-row"});
    ratings.forEach((r,i)=>{
      const chip = el("button",{class:"filter-chip"+(i===0?" active":""), "data-rating":r},[r]);
      chip.addEventListener("click", ()=>{
        filterRow.querySelectorAll(".filter-chip").forEach(c=>c.classList.remove("active"));
        chip.classList.add("active");
        renderStudyRows(r);
      });
      filterRow.appendChild(chip);
    });
    const actions = el("div",{class:"data-table-actions", style:"flex:1"});
    actions.appendChild(makeDownloadLink("estudios_incluidos.csv",
      ["#","Referencia (APA 7)","Tipo","n voluntarios/pob. general","Resultado principal","Calificación"],
      DATA.studies.map(s=>[String(s.n), apaCitationPlain(s), s.type, String(s.pretestN), s.result, s.quality.rating])
    ));
    body.appendChild(el("div",{style:"display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px"},[filterRow, actions]));

    const tableWrap = el("div",{class:"table-wrap"});
    const table = el("table",{class:"studies", id:"studies-table"},[
      el("thead",{},[ el("tr",{},[
        el("th",{},["#"]), el("th",{},["Referencia (APA 7)"]),
        el("th",{},["Tipo / n"]), el("th",{},["Resultado principal"]), el("th",{},["Calificación"]),
      ])]),
      el("tbody",{id:"studies-tbody"}),
    ]);
    tableWrap.appendChild(table);
    body.appendChild(tableWrap);
    renderStudyRows("Todas");
  }
  function renderStudyRows(filterRating){
    const tbody = document.getElementById("studies-tbody");
    tbody.innerHTML = "";
    DATA.studies.filter(s=> filterRating==="Todas" || s.quality.rating===filterRating).forEach(s=>{
      const refCell = el("td",{style:"max-width:340px"});
      refCell.innerHTML = apaCitation(s);
      const typeCell = el("td",{style:"min-width:200px"},[s.type+" — "+s.n_text]);
      tbody.appendChild(el("tr",{},[
        el("td",{},[el("span",{class:"study-ref"},[String(s.n)])]),
        refCell,
        typeCell,
        el("td",{style:"min-width:220px"},[s.result]),
        el("td",{},[el("span",{class:"level-pill "+levelClass(s.quality.rating)},[s.quality.rating])]),
      ]));
    });
  }
  function renderSizeChart(){
    if(typeof Chart === "undefined") return;
    const canvas = document.getElementById("chart-pretestn");
    if(!canvas) return;
    if(sizeChartInstance) sizeChartInstance.destroy();
    const gridColor = cssVar("--border") || "#e1e6ee";
    const textColor = cssVar("--text-muted") || "#57667a";
    const primary = cssVar("--primary-2") || "#147a86";
    const sorted = [...DATA.studies].sort((a,b)=> a.pretestN - b.pretestN);
    sizeChartInstance = new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: sorted.map(s=> s.author),
        datasets: [{
          label: "n voluntarios sanos / población general",
          data: sorted.map(s=> s.pretestN),
          backgroundColor: primary+"aa",
          borderColor: primary,
          borderWidth: 1.5,
          borderRadius: 4,
        }],
      },
      options: {
        indexAxis: "y",
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx)=> "n = "+ctx.parsed.x.toLocaleString("es-CO") } },
        },
        scales: {
          x: { type: "logarithmic", grid: { color: gridColor }, ticks: { color: textColor, font:{size:11} }, title:{ display:true, text:"n (escala logarítmica)", color:textColor, font:{size:11} } },
          y: { grid: { display:false }, ticks: { color: textColor, font:{size:11} } },
        },
      },
    });
  }

  /* ============================================================
     RENDER: 04 Evaluación de la calidad
     ============================================================ */
  function renderCalidad(){
    const body = document.getElementById("body-calidad");
    body.appendChild(el("p",{},[
      "Evaluación orientativa realizada a partir de la información reportada en el resumen indexado en PubMed (no se dispuso de acceso a texto completo — ver limitaciones). Se usó el checklist COSMIN de riesgo de sesgo para validez de contenido de PROM (Terwee et al., 2018; Mokkink et al., 2024) y, para el único estudio cualitativo comparativo (Goodwin et al., 2021), adicionalmente COREQ."
    ]));
    const tableWrap = el("div",{class:"table-wrap"});
    const table = el("table",{class:"data-table", style:"min-width:100%"},[
      el("thead",{},[ el("tr",{},[
        el("th",{},["Estudio"]), el("th",{},["Herramienta"]), el("th",{},["Dominio evaluado"]), el("th",{},["Calificación"]),
      ])]),
      el("tbody",{}, DATA.studies.map(s=> el("tr",{},[
        el("td",{},[s.author]),
        el("td",{},[s.quality.tool]),
        el("td",{},[s.quality.domain]),
        el("td",{},[
          el("span",{class:"level-pill "+levelClass(s.quality.rating)},[s.quality.rating]),
          el("div",{style:"font-size:.74rem;color:var(--text-muted);margin-top:3px;max-width:220px;white-space:normal"},[s.quality.ratingNote]),
        ]),
      ]))),
    ]);
    tableWrap.appendChild(table);
    body.appendChild(tableWrap);
    body.appendChild(el("p",{class:"indicator-source", style:"margin-top:10px"},[
      "5 de 7 estudios calificados como \"Adecuada\", 2 como \"Dudosa\" (muestras de pretesteo pequeñas: n=8 y n=6, en el límite inferior recomendado por COSMIN)."
    ]));
  }

  /* ============================================================
     RENDER: 05 Síntesis y discusión
     ============================================================ */
  function renderDiscusion(){
    const body = document.getElementById("body-discusion");
    DATA.themes.forEach(theme=>{
      const block = el("div",{class:"category-block cat-d"});
      block.appendChild(el("h4",{},[theme.title]));
      theme.paragraphs.forEach(p=> block.appendChild(el("p",{style:"font-size:.92rem"},[p])));
      body.appendChild(block);
    });
  }

  /* ============================================================
     RENDER: 06 Lagunas
     ============================================================ */
  function renderLagunas(){
    const body = document.getElementById("body-lagunas");
    const list = el("ul",{class:"gap-list"});
    DATA.gaps.forEach(g=> list.appendChild(el("li",{},[g])));
    body.appendChild(list);
  }

  /* ============================================================
     RENDER: 07 Limitaciones y transparencia
     ============================================================ */
  function renderLimitaciones(){
    const body = document.getElementById("body-limitaciones");
    const list = el("ul",{class:"limit-list"});
    DATA.limitations.forEach(l=> list.appendChild(el("li",{},[l])));
    body.appendChild(list);

    body.appendChild(el("h4",{style:"font-size:.86rem;margin-top:22px"},["Nota de transparencia — 2 estudios de Embase excluidos por fecha"]));
    body.appendChild(el("div",{class:"callout"},[DATA.embaseExcludedNote]));

    body.appendChild(el("h4",{style:"font-size:.86rem;margin-top:22px"},["Anexo — ejecución manual reportada (LILACS/BVS, Google Scholar, Embase)"]));
    const tableWrap = el("div",{class:"table-wrap"});
    const table = el("table",{class:"data-table", style:"min-width:100%"},[
      el("thead",{},[ el("tr",{},[ el("th",{},["Base"]), el("th",{},["Ecuación ejecutada"]), el("th",{},["N.º de resultados"]), el("th",{},["URL"]) ]) ]),
      el("tbody",{}, DATA.manualAnnex.rows.map(r=> el("tr",{},[
        el("td",{},[r.db]),
        el("td",{style:"white-space:normal;max-width:340px;font-size:.8rem"},[r.equation]),
        el("td",{},[r.n]),
        el("td",{style:"white-space:normal;max-width:220px;font-size:.78rem;color:var(--text-muted)"},[r.url]),
      ]))),
    ]);
    tableWrap.appendChild(table);
    body.appendChild(tableWrap);
    body.appendChild(el("p",{class:"indicator-source", style:"margin-top:8px"},[DATA.manualAnnex.note]));
  }

  /* ============================================================
     RENDER: 08 Metodología en breve
     ============================================================ */
  function renderMetodologia(){
    const body = document.getElementById("body-metodologia");
    const picoGrid = el("div",{class:"pico-grid"},[
      el("div",{class:"pcc-card"},[el("div",{class:"k"},["Población"]), el("p",{},[DATA.pico.population])]),
      el("div",{class:"pcc-card"},[el("div",{class:"k"},["Intervención"]), el("p",{},[DATA.pico.intervention])]),
      el("div",{class:"pcc-card"},[el("div",{class:"k"},["Comparación"]), el("p",{},[DATA.pico.comparison])]),
      el("div",{class:"pcc-card"},[el("div",{class:"k"},["Outcome"]), el("p",{},[DATA.pico.outcome])]),
    ]);
    body.appendChild(picoGrid);

    body.appendChild(el("h4",{style:"font-size:.86rem;margin-top:20px"},["Diagrama de flujo PRISMA"]));
    const prismaWrap = el("div",{class:"diagram-wrap"});
    prismaWrap.appendChild(buildPrismaSVG(DATA.prisma));
    body.appendChild(prismaWrap);
    body.appendChild(el("p",{class:"indicator-source", style:"margin-top:8px"},[DATA.prisma.citation]));

    body.appendChild(el("h4",{style:"font-size:.86rem;margin-top:16px"},["Bases consultadas"]));
    const dbRow = el("div",{class:"tag-row"});
    DATA.methodology.databases.forEach(d=> dbRow.appendChild(el("span",{class:"tag-pill"},[d])));
    body.appendChild(dbRow);

    body.appendChild(el("h4",{style:"font-size:.86rem;margin-top:16px"},["Herramientas de calidad aplicadas"]));
    const qRow = el("div",{class:"tag-row"});
    DATA.methodology.qualityTools.forEach(q=> qRow.appendChild(el("span",{class:"tag-pill"},[q])));
    body.appendChild(qRow);
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot(){
    renderHero();
    buildAccordionShell();
    renderResumen();
    renderBusqueda();
    renderEstudios();
    renderCalidad();
    renderDiscusion();
    renderLagunas();
    renderLimitaciones();
    renderMetodologia();

    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
    document.getElementById("expand-all").addEventListener("click", ()=> setAllSections(true));
    document.getElementById("collapse-all").addEventListener("click", ()=> setAllSections(false));

    if(document.getElementById("sec-estudios").classList.contains("open")) renderSizeChart();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ()=>{
      let saved = null;
      try{ saved = localStorage.getItem(THEME_KEY); }catch(e){}
      if(!saved) renderSizeChart();
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
