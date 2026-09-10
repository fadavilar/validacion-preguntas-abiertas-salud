/* ============================================================
   DATA — Revisión de alcance: Validación de preguntas abiertas
   mediante voluntarios sanos en instrumentos de medición en salud
   ============================================================ */
window.DATA = {

  meta: {
    title: "Validación de Preguntas Abiertas con Voluntarios Sanos",
    subtitle: "Explorador interactivo de una revisión de alcance sobre el pretesteo de instrumentos de medición en salud con voluntarios sanos y población general, antes de su aplicación en pacientes.",
    framework: "Revisión de alcance · marco PICO",
    period: "2021–2026 · actualizado 10 sep. 2026 (Google Scholar ampliado a 65 registros; Cochrane Library incorporada, 92 registros)",
    author: "Fabian Dávila Ramírez",
    credentials: "MD, MBA, PhD",
    affiliation: "Universidad de Navarra · Universidad de Bogotá Jorge Tadeo Lozano (Doctorado en Gestión y Modelado de Políticas Públicas)",
    disclaimer: "Esta aplicación es una síntesis infográfica de una revisión de alcance metodológica en psicometría y ciencia de la medición en salud (no un manuscrito ni una revisión sistemática de eficacia clínica). Las calificaciones de calidad son orientativas: se basaron en la información reportada en el resumen indexado de cada estudio, no en el texto completo del artículo — ver la sección de limitaciones.",
    license: {
      name: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
      text: "Este contenido puede compartirse y adaptarse libremente, incluso con fines comerciales, siempre que se dé crédito apropiado al autor."
    }
  },

  stats: [
    { value: "315", label: "registros identificados", detail: "PubMed 98 · LILACS/BVS 56 · Google Scholar 65 · Embase 4 · Cochrane 92" },
    { value: "23",  label: "duplicados removidos", detail: "22 intra-archivo (LILACS/BVS) + 1 entre Google Scholar y Embase" },
    { value: "285", label: "excluidos tras cribado", detail: "204 fuera de dominio (incl. 92 de Cochrane) · 43 fuera de diseño/población · 38 LILACS/Embase sin desagregar" },
    { value: "7",   label: "estudios incluidos", detail: "100% de PubMed/MEDLINE — ninguno de las otras 4 bases ejecutadas" },
  ],

  pico: {
    population: "Instrumentos de medición en salud (cuestionarios, escalas, PROM) en fase de desarrollo, adaptación transcultural o validación, antes de su aplicación definitiva en pacientes o población enferma.",
    intervention: "Incorporación de preguntas abiertas y técnicas asociadas (entrevista cognitiva, cognitive debriefing, think-aloud) aplicadas a voluntarios sanos o muestras de población general durante el pretesteo.",
    comparison: "Pretesteo o validación de contenido realizada directamente en pacientes, sin fase previa en voluntarios sanos o población general.",
    outcome: "Validez de contenido, comprensibilidad, comprensividad y equivalencia o divergencia entre lo hallado en voluntarios sanos/población general y lo hallado posteriormente en pacientes.",
  },

  searchStrategy: [
    {
      db: "PubMed/MEDLINE",
      status: "Ejecutada automáticamente vía API oficial de PubMed",
      n: "98",
      equation: '("Surveys and Questionnaires"[Mesh] OR "Patient Reported Outcome Measures"[Mesh] OR questionnaire*[tiab] OR "measurement instrument*"[tiab]) AND ("healthy volunteer*"[tiab] OR "non-patient"[tiab] OR "general population"[tiab] OR "lay panel"[tiab] OR "community sample"[tiab]) AND ("cognitive interview*"[tiab] OR "cognitive debriefing"[tiab] OR "think aloud"[tiab] OR "open-ended question*"[tiab])\nFiltro de fecha: 2021/01/01–2026/12/31[dp]',
      note: "La ecuación estricta con \"healthy volunteer*\" arrojaba 0–1 resultados; se amplió a sinónimos conceptualmente equivalentes tras consulta explícita al usuario.",
    },
    {
      db: "LILACS/BVS",
      status: "Ejecutada manualmente por el investigador",
      n: "56 (34 únicos)",
      equation: '(cuestionario OR escala OR "instrumento") AND (voluntario*) AND (Piloto OR validacion OR pretest)\nFiltro de fecha 2021–2026 aplicado en la interfaz de bvsalud.org',
      note: "22 duplicados intra-archivo removidos (mismo DOI/título exportado 2–5 veces) antes del cribado; fecha exacta de ejecución no reportada por el usuario.",
    },
    {
      db: "Google Scholar",
      status: "Ejecutada manualmente por el investigador — actualizada 10 sep. 2026",
      n: "65 exportados (de ~190 recuperables)",
      equation: '"healthy volunteers" AND "open-ended questions" AND (questionnaire OR "measurement instrument" OR escale) AND (validation OR "face validity" OR "Facial validity" OR pretesting OR "cognitive interview")\nFiltro de fecha 2021–2026 aplicado en la interfaz (as_ylo=2021&as_yhi=2026)',
      note: "Búsqueda avanzada ejecutada directamente en scholar.google.com, que resuelve la discrepancia de URL de la versión anterior del informe. Recupera ~190 resultados paginables en total; esta actualización solo cribó una exportación parcial de 65 registros (1 de ellos duplicado exacto con un registro de Embase). El cribado de los ~125 registros restantes queda pendiente. La cifra de \"~560 resultados\" que a veces muestra la interfaz de Google Scholar es una estimación inflada y no se usa como referencia.",
    },
    {
      db: "Embase",
      status: "Ejecutada manualmente (archivo de exportación) — quinta base, añadida por iniciativa del investigador",
      n: "4",
      equation: "('healthy volunteer*' OR 'healthy participant*') AND ('cognitive interview*' OR 'open-ended question*' OR 'think aloud') AND (questionnaire* OR 'measurement instrument*') AND (validat* OR pretest*)",
      note: "No formaba parte de la estrategia original de 4 bases. Sin filtro de fecha explícito — a diferencia de las demás. Esto permitió detectar 2 registros anteriores a 2021 (ver sección de limitaciones y transparencia).",
    },
    {
      db: "Cochrane Library",
      status: "Ejecutada por el investigador (ecuación simplificada) — verificada mediante Cochrane Search Manager",
      n: "92",
      equation: '(healthy AND (volunteer* OR participant* OR subject*)) AND (questionnaire* OR measurement OR instrument* OR "patient-reported")\nFiltro de fecha 2021–2026 aplicado en la interfaz',
      note: "La ecuación original (con términos específicos de entrevista cognitiva/pregunta abierta — ver Anexo) no pudo ejecutarse en la interfaz de búsqueda avanzada; el investigador la sustituyó por esta versión más simple y ejecutó vía Cochrane Search Manager. Los 92 registros cribados por título/resumen resultaron ser en su totalidad revisiones sistemáticas de eficacia de intervenciones clínicas, sin relación con validación metodológica de instrumentos — 0 incluidos, 0 duplicados con las demás bases.",
    },
  ],

  prisma: {
    identifiedByDb: [
      { label: "PubMed/MEDLINE", n: 98 },
      { label: "LILACS/BVS", n: 56 },
      { label: "Google Scholar", n: 65 },
      { label: "Embase", n: 4 },
      { label: "Cochrane Library", n: 92 },
    ],
    identifiedTotal: 315,
    removedBreakdown: [
      { label: "Duplicados intra-archivo (LILACS/BVS)", n: 22 },
      { label: "Duplicado exacto Google Scholar × Embase (Poowaruttanawiwit et al., 2025)", n: 1 },
    ],
    removedTotal: 23,
    screenedTotal: 292,
    excludedReasons: [
      "Fuera de dominio (PubMed 60 + Google Scholar 52 + Cochrane 92): 204",
      "Fuera de diseño/población (PubMed 31 + Google Scholar 12): 43",
      "LILACS/BVS — motivo no desagregado en esta actualización: 34",
      "Embase (2 de ellos por quedar fuera del rango de fechas 2021–2026): 4",
    ],
    excludedTotal: 285,
    includedByDb: [
      { label: "PubMed/MEDLINE", n: 7 },
      { label: "LILACS/BVS", n: 0 },
      { label: "Google Scholar", n: 0 },
      { label: "Embase", n: 0 },
      { label: "Cochrane Library", n: 0 },
    ],
    includedTotal: 7,
    citation: "Adaptado de Haddaway, N. R., Page, M. J., Pritchard, C. C., & McGuinness, L. A. (2022). PRISMA2020: An R package and Shiny app for producing PRISMA 2020-compliant flow diagrams. Campbell Systematic Reviews, 18, e1230. https://doi.org/10.1002/cl2.1230",
  },

  /* pretestN = n de voluntarios sanos/población general en la fase de pretesteo con preguntas abiertas
     (la variable central de la pregunta PICO de esta revisión, no el n total del estudio) */
  studies: [
    {
      n: 1, author: "Gao W, 2020", db: "PubMed",
      title: "Translation and cultural adaptation of the Pediatric Patient-Reported Outcome Measurement Information System-Emotional Distress item banks into Chinese",
      journal: "J Spec Pediatr Nurs", doi: "https://doi.org/10.1111/jspn.12318",
      type: "Traducción/adaptación transcultural", n_text: "n=8 niños de población general (8–17 años), entrevista cognitiva",
      pretestN: 8,
      result: "Mayoría de ítems bien comprendidos; se revisaron algunos ítems tras la entrevista cognitiva.",
      quality: { tool: "COSMIN (validez de contenido)", domain: "Comprensibilidad (traducción)", rating: "Dudosa", ratingNote: "muestra de 8 niños, en el límite inferior recomendado por COSMIN" },
    },
    {
      n: 2, author: "Goodwin E, 2021", db: "PubMed",
      title: "What drives differences in preferences for health states between patients and the public? A qualitative investigation of respondents' thought processes",
      journal: "Soc Sci Med", doi: "https://doi.org/10.1016/j.socscimed.2021.114150",
      type: "Cualitativo comparativo (entrevista cognitiva/think-aloud)", n_text: "n=14 población general + 12 pacientes con esclerosis múltiple",
      pretestN: 14,
      result: "Los pacientes usan su experiencia de adaptación a la enfermedad al valorar estados de salud; no se hallaron diferencias en efectos de encuadre ni aversión a la pérdida entre grupos.",
      quality: { tool: "COREQ", domain: "Rigor metodológico cualitativo", rating: "Adecuada", ratingNote: "muestreo, análisis (Framework Method) y reflexividad bien descritos en el resumen" },
    },
    {
      n: 3, author: "Rencz F, 2022", db: "PubMed",
      title: "Analyzing the Pain/Discomfort and Anxiety/Depression Composite Domains and the Meaning of Discomfort in the EQ-5D: A Mixed-Methods Study",
      journal: "Value Health", doi: "https://doi.org/10.1016/j.jval.2022.06.012",
      type: "Transversal mixto con preguntas abiertas", n_text: "n=1700 población general representativa (Hungría)",
      pretestN: 1700,
      result: "6 patrones de respuesta y más de 100 significados distintos de \"discomfort\"; evidencia de error de medición en los dominios compuestos del EQ-5D.",
      quality: { tool: "COSMIN (validez de contenido)", domain: "Comprensibilidad de dominios existentes", rating: "Adecuada", ratingNote: "muestra amplia (n=1700) y representativa" },
    },
    {
      n: 4, author: "Bentes C, 2025", db: "PubMed",
      title: "Linguistic validation of a questionnaire for assessing the prevalence of epilepsy in Portugal",
      journal: "Epilepsy Behav", doi: "https://doi.org/10.1016/j.yebeh.2025.110344",
      type: "Validación lingüística (metodología ISPOR)", n_text: "n=6 respondientes de la población diana",
      pretestN: 6,
      result: "Cuestionarios traducidos considerados comprensibles y culturalmente apropiados de forma unánime en el cognitive debriefing.",
      quality: { tool: "COSMIN (validez de contenido)", domain: "Comprensibilidad (traducción, metodología ISPOR)", rating: "Dudosa", ratingNote: "cognitive debriefing con solo 6 respondientes" },
    },
    {
      n: 5, author: "Zlatkovic-Svenda M, 2025", db: "PubMed",
      title: "Translation, cross-cultural adaptation and psychometric evaluation of the Serbian Ankylosing Spondylitis Quality of Life (ASQoL) Questionnaire",
      journal: "J Patient Rep Outcomes", doi: "https://doi.org/10.1186/s41687-025-00838-9",
      type: "Traducción/adaptación + evaluación psicométrica", n_text: "panel lego (n=10) + debriefing cognitivo con 10 pacientes; n=60 pacientes en fase psicométrica",
      pretestN: 10,
      result: "El panel lego confirmó la claridad de la traducción antes del debriefing cognitivo con pacientes, que evaluaron el instrumento como claro y preciso; buena validez convergente (r=0.75–0.79) y confiabilidad (α=0.91–0.95).",
      quality: { tool: "COSMIN (contenido + propiedades psicométricas)", domain: "Comprensibilidad, relevancia, validez convergente y confiabilidad", rating: "Adecuada", ratingNote: "diseño en etapas (panel lego → pacientes) y evaluación psicométrica robusta" },
    },
    {
      n: 6, author: "McLean CP, 2024", db: "PubMed",
      title: "Development and preliminary validation of a novel eating disorder screening tool for vegetarians and vegans: the V-EDS",
      journal: "J Eat Disord", doi: "https://doi.org/10.1186/s40337-024-00964-7",
      type: "Desarrollo/validación mixta en 4 fases", n_text: "cognitive debriefing con 18 participantes de comunidad, clínicos y experiencia vivida; validación final n=245+405 vegetarianos/veganos",
      pretestN: 18,
      result: "El pool de ítems se redujo de 163 a 53 tras el debriefing cognitivo mixto, y finalmente a 18; consistencia interna excelente (α=0.95–0.96).",
      quality: { tool: "COSMIN (contenido + validez estructural)", domain: "Comprensibilidad, relevancia, estructura (IRT)", rating: "Adecuada", ratingNote: "diseño en 4 fases con reducción progresiva de ítems bien documentada" },
    },
    {
      n: 7, author: "Stokman-Meiland DCM, 2026", db: "PubMed",
      title: "Cross-cultural translation and content validity of the Determinants of Physical Activity Questionnaire (DPAQ) in a Dutch stroke rehabilitation population and their peers without stroke",
      journal: "J Patient Rep Outcomes", doi: "https://doi.org/10.1186/s41687-026-01058-5",
      type: "Validez de contenido (think-aloud + cognitive debriefing)", n_text: "7 pacientes con ictus + 7 pacientes y 7 pares sin ictus en re-test (n total=21)",
      pretestN: 7,
      result: "La mayoría de los ítems fueron comprensibles y relevantes tanto para pacientes como para pares sin ictus, salvo ítems de planificación de afrontamiento y conflicto de metas.",
      quality: { tool: "COSMIN (validez de contenido)", domain: "Comprensibilidad y relevancia, comparación paciente/par", rating: "Adecuada", ratingNote: "diseño comparativo explícito paciente-par, aunque con muestra pequeña (n=21)" },
    },
  ],

  themes: [
    {
      id: "marco",
      title: "Un marco de tres fases para organizar la evidencia",
      paragraphs: [
        "Los siete estudios incluidos pueden organizarse, en conjunto, bajo un marco de tres fases que resume cómo se documenta en la práctica la validación de preguntas abiertas con voluntarios sanos: (1) validación de contenido mediante juicio de expertos, en la que un panel de clínicos, metodólogos y psicómetras evalúa si los ítems cubren todas las dimensiones del constructo, un paso distinto de la validez de contenido evaluada por métodos estadísticos (Riva et al., 2024); (2) una prueba piloto de comprensión y apariencia con voluntarios sanos —entre 6 y 25 participantes en los estudios incluidos— mediante entrevista cognitiva o cognitive debriefing; y (3) el análisis del contenido de las respuestas abiertas, evaluando variabilidad, ambigüedad y el grado de saturación temática alcanzado (Guest, Bunce & Johnson, 2006).",
        "Los estudios incluidos documentan de forma explícita sobre todo la segunda fase, y en menor medida elementos de la tercera: Zlatkovic-Svenda et al. (2025) y McLean et al. (2024) redujeron progresivamente el número de ítems tras identificar respuestas ambiguas o redundantes. Ninguno de los siete describe una fase previa de validación por juicio de expertos independiente de la fase con voluntarios, lo que sugiere una posible laguna de reporte más que de práctica real.",
      ],
    },
    {
      id: "sintesis",
      title: "Síntesis de los estudios incluidos",
      paragraphs: [
        "Pese a su heterogeneidad temática (espondiloartritis, salud emocional pediátrica, esclerosis múltiple, calidad de vida genérica, epilepsia, trastornos de la conducta alimentaria e ictus), los siete estudios convergen en un patrón consistente: la validación con voluntarios sanos o población general no sustituye la validación en pacientes, sino que actúa como un filtro previo o paralelo centrado en la comprensibilidad lingüística y cultural. Zlatkovic-Svenda et al. (2025) y McLean et al. (2024) ilustran de forma más explícita este diseño escalonado: un panel sin la condición índice depura la redacción antes de convocar a pacientes para el debriefing cognitivo de contenido específico y la evaluación psicométrica formal.",
        "Stokman-Meiland et al. (2026) hallaron una comprensibilidad y relevancia mayormente equivalente entre pacientes con ictus y sus pares sanos, con excepciones puntuales en ítems de contenido cognitivo-emocional (planificación de afrontamiento, conflicto de metas). Esta tensión es más marcada en Goodwin et al. (2021), quienes compararon directamente los procesos de razonamiento de población general y pacientes con esclerosis múltiple en una tarea de valoración de estados de salud: los pacientes recurren de forma sistemática a su experiencia de adaptación a la enfermedad, un recurso cognitivo que la población general no posee. Esto sugiere que la validez de contenido de un ítem (¿se entiende lo que pregunta?) y la validez de sus procesos de respuesta (¿se responde por las razones que el instrumento pretende capturar?) son dimensiones distintas.",
        "Rencz et al. (2022) y Bentes et al. (2025) aportan evidencia a favor de la utilidad de la población general como paso legítimo cuando el instrumento se aplicará tanto a sanos como a enfermos (EQ-5D) o cuando la población general es, en sí misma, parte de la población diana de un tamizaje epidemiológico. Gao et al. (2020) ejemplifica el caso frecuente de traducción de un banco de ítems mediante entrevista cognitiva con niños de población general, aunque con una muestra de apenas 8 participantes, en el límite inferior recomendado por COSMIN.",
      ],
    },
    {
      id: "etica",
      title: "Consideraciones éticas y metodológicas complementarias",
      paragraphs: [
        "La participación de voluntarios sanos en una prueba piloto, incluso breve y de bajo riesgo aparente, requiere consentimiento informado que especifique el uso de sus datos y respuestas — ninguno de los siete estudios incluidos reportó este aspecto explícitamente en el resumen indexado, otra probable laguna de reporte más que de práctica.",
        "La condición de \"sano\" debe operacionalizarse mediante criterios de inclusión/exclusión explícitos y verificables, no darse por sentada. Nugent et al. (2022), en la construcción de un recurso de neuroimagen con voluntarios sanos (no incluido en la síntesis por no ser un estudio de validación de instrumentos, pero pertinente como ejemplo metodológico), ilustran este punto al definir \"sano\" mediante examen físico y de laboratorio normales, ausencia de diagnóstico psiquiátrico o médico inestable, y escolaridad/capacidad cognitiva mínimas — reconociendo que este criterio estricto sacrifica representatividad poblacional a cambio de reducir variabilidad no deseada. Esa misma tensión, rigor interno frente a validez externa, aplicaría al reclutamiento de voluntarios sanos para pretestar preguntas abiertas de instrumentos de salud.",
        "El investigador aportó además material de divulgación no académica (un video explicativo, notas de estudiantes y una entrada de blog institucional) sobre variabilidad, ambigüedad y saturación de respuestas abiertas; sus planteamientos son consistentes con la literatura citada, pero al no ser fuentes académicas revisadas por pares no se citan individualmente, conforme a la regla de citación de este informe. Dos referencias adicionales aportadas por el investigador (un artículo de ScienceDirect y uno de PMC) no pudieron verificarse de forma independiente por bloqueos de acceso automatizado, y se marcan como NO VERIFICADAS.",
      ],
    },
  ],

  gapsIntro: "No se identificaron revisiones sistemáticas ni metaanálisis previos sobre esta pregunta metodológica específica — hallazgo confirmado empíricamente por la búsqueda ejecutada en Cochrane Library (n=92), cuyos registros corresponden en su totalidad a revisiones sistemáticas de eficacia de intervenciones clínicas sin relación con la validación metodológica de instrumentos mediante preguntas abiertas. Esto es consistente con tratarse de un tema de metodología de la medición más que de eficacia clínica; toda la evidencia sintetizada aquí proviene de estudios primarios de desarrollo/validación de instrumentos.",

  gaps: [
    "No se halló ningún estudio que comparara de forma prospectiva y controlada las propiedades psicométricas finales de un instrumento validado únicamente con voluntarios sanos frente a uno validado con la secuencia voluntario sano→paciente: no hay evidencia directa sobre el costo real de omitir la fase con pacientes.",
    "No existe un estándar consensuado sobre el tamaño de muestra de voluntarios sanos necesario en esta fase — los estudios incluidos oscilan entre 6 y 25 participantes sin justificación explícita más allá de la saturación temática cualitativa.",
    "Los estudios incluidos se concentran en cuestionarios de calidad de vida, salud emocional y factores de riesgo conductuales; no se identificó ningún estudio en oncología, enfermedades cardiovasculares, enfermedades raras o afecciones del sistema nervioso central, pese a ser áreas de alta relevancia práctica.",
    "Ni la búsqueda automatizada en PubMed ni la ejecución manual en LILACS/BVS (56 registros, población hispano/lusoparlante) identificaron algún estudio con población latinoamericana que abordara esta secuencia metodológica — los estudios en español/portugués validan mayoritariamente de forma directa en la población diana, sin la fase previa en voluntarios sanos.",
    "Los estudios incluidos no informaron de forma sistemática el intervalo de tiempo transcurrido entre la fase con voluntarios sanos y la fase con pacientes, ni si los hallazgos de la primera fase llevaron a descartar ítems que resultaron relevantes solo para pacientes.",
    "Dos estudios metodológicamente pertinentes localizados en Embase (Gustafson et al., 2020; Lo Re et al., 2012) quedaron fuera del rango de fechas 2021–2026 fijado para esta revisión — una ventana temporal más amplia podría identificar evidencia adicional relevante.",
  ],

  limitations: [
    "La búsqueda en Cochrane Library se ejecutó con una ecuación más simple que la originalmente diseñada (sin los términos específicos de metodología de pregunta abierta/entrevista cognitiva — ver Anexo), debido a que la interfaz de búsqueda avanzada no permitía ejecutar la ecuación original; la ecuación efectivamente ejecutada es más amplia en el componente clínico pero carece de los términos metodológicos específicos, lo que pudo darle menor especificidad para el objeto de esta revisión, aunque el cribado por título/resumen de los 92 registros recuperados no identificó ningún caso de interés.",
    "La extracción de datos y la evaluación de calidad de los 7 estudios incluidos se realizaron a partir del resumen indexado en PubMed y no del texto completo, dado que no se dispuso de acceso a texto completo; algunos matices metodológicos podrían no estar reflejados con precisión.",
    "La ecuación de PubMed tuvo que ampliarse desde el término estricto \"healthy volunteer*\" hacia sinónimos como \"general population\", \"community sample\" y \"lay panel\"; las ecuaciones de LILACS/BVS, Google Scholar, Embase y Cochrane Library, ejecutadas por el investigador, usaron sintaxis más simples y no necesariamente los mismos sinónimos, lo que limita la comparabilidad directa entre bases y pudo afectar la sensibilidad de cada búsqueda de forma distinta.",
    "Los límites de la herramienta de búsqueda de PubMed utilizada (máximo 5 comodines y 20 operadores booleanos por consulta) obligaron a simplificar la ecuación original en varias iteraciones.",
    "La exportación de Google Scholar (65 registros) no incluye resúmenes, por lo que el cribado de esa fuente se realizó exclusivamente por título; no puede descartarse por completo que algún registro relevante haya sido excluido erróneamente por esta limitación, aunque el patrón temático observado (predominantemente protocolos/ensayos en voluntarios sanos, validaciones de cuestionarios directamente en pacientes o población general sin fase comparativa previa, y revisiones de adherencia/satisfacción en investigación clínica) hace poco probable que se haya perdido un estudio claramente pertinente.",
    "La discrepancia señalada en la versión previa de este informe entre la ecuación de Google Scholar reportada por el usuario y la URL de resultados compartida (que correspondía a una búsqueda simple de Google, no a Google Scholar) quedó resuelta en esta actualización: el investigador ejecutó la búsqueda avanzada directamente en scholar.google.com y aportó una nueva exportación.",
    "La ecuación de Embase, recuperada del archivo de exportación, no incluyó un filtro de fecha explícito a diferencia de las demás bases; esto permitió detectar 2 registros fuera del rango 2021–2026, pero también implica que la comparabilidad de la cobertura temporal de Embase frente a las otras tres bases es limitada.",
    "No se dispone de fecha exacta de ejecución para las búsquedas de LILACS/BVS, Google Scholar ni Embase (el usuario no la reportó); se documenta como \"no reportada\" en el Anexo en vez de asumirla, conforme a la regla de citación de este informe.",
    "La búsqueda avanzada de Google Scholar recupera aproximadamente 190 resultados paginables en total, pero esta actualización cribó únicamente una exportación parcial de 65 de esos registros; el cribado de los ~125 registros restantes queda pendiente para una futura actualización, y no puede descartarse que algún registro elegible se encuentre entre ellos. La cifra de \"~560 resultados\" que en algún momento mostró la propia interfaz de Google Scholar para esta búsqueda es, según el comportamiento observado de esa interfaz (variación entre consultas idénticas), una estimación inflada que no se usa como cifra de referencia en este informe.",
  ],

  manualAnnex: {
    cochraneEquationChange: {
      original: '("healthy volunteer*" OR "healthy participant*" OR "general population" OR "lay panel" OR "community sample") AND ("cognitive interview*" OR "cognitive debriefing" OR "think aloud" OR "open-ended question*") AND (questionnaire* OR "measurement instrument*" OR "patient-reported outcome measure*") — Title Abstract Keyword, filtro 2021–2026',
      originalStatus: "No se pudo ejecutar en la interfaz de búsqueda avanzada de Cochrane Library.",
      executed: '(healthy AND (volunteer* OR participant* OR subject*)) AND (questionnaire* OR measurement OR instrument* OR "patient-reported"); filtro de fecha 2021–2026 aplicado en la interfaz',
      executedStatus: "EJECUTADA y verificada por el investigador mediante Cochrane Search Manager. n=92.",
    },
    rows: [
      { db: "LILACS/BVS", equation: '(cuestionario OR escala OR "instrumento") AND (voluntario*) AND (Piloto OR validacion OR pretest)', fecha: "No reportada por el usuario", n: "56 (34 únicos)", url: "pesquisa.bvsalud.org/portal/" },
      { db: "Google Scholar", equation: '"healthy volunteers" AND "open-ended questions" AND (questionnaire OR "measurement instrument" OR escale) AND (validation OR "face validity" OR "Facial validity" OR pretesting OR "cognitive interview"); filtro 2021–2026 (as_ylo=2021&as_yhi=2026)', fecha: "No reportada por el usuario", n: "65 exportados (de ~190 recuperables)", url: "scholar.google.com/scholar?hl=es&as_sdt=0,5&as_ylo=2021&as_yhi=2026&as_vis=1&q=..." },
      { db: "Embase", equation: "Recuperada del archivo EMBASE.csv (no reportada verbalmente): ('healthy volunteer*' OR 'healthy participant*') AND ('cognitive interview*' OR 'open-ended question*' OR 'think aloud') AND (questionnaire* OR 'measurement instrument*') AND (validat* OR pretest*)", fecha: "No reportada por el usuario", n: "4 (verificado)", url: "No disponible — Embase requiere acceso institucional y no genera una URL de resultados públicamente estable" },
      { db: "Cochrane Library", equation: '(healthy AND (volunteer* OR participant* OR subject*)) AND (questionnaire* OR measurement OR instrument* OR "patient-reported"); filtro de fecha 2021–2026 aplicado en la interfaz', fecha: "10 sep. 2026, 13:55 (metadato \"Date Run\" del Search Manager)", n: "92 (verificado)", url: "No disponible — Cochrane Search Manager no genera una URL de resultados públicamente estable; exportación aportada directamente por el investigador (Cochrane_v09092026.csv)" },
    ],
    note: "Los campos no proporcionados por el usuario no se completan con datos supuestos, conforme a la regla de citación de este informe. Embase no formaba parte de la estrategia original de 4 bases — fue añadida por iniciativa del investigador.",
    scholarUpdateNote: "Actualización Google Scholar (10 sep. 2026): la discrepancia de la versión previa (la URL compartida entonces correspondía a una búsqueda simple de Google, no a Google Scholar) quedó resuelta — el investigador confirmó y ejecutó la búsqueda avanzada citada arriba directamente en scholar.google.com. Esa búsqueda recupera ~190 resultados paginables en total (verificado por paginación exhaustiva); el investigador aportó una exportación de 65 de esos ~190 registros, de los cuales 1 resultó duplicado exacto con un registro de Embase (\"Efficacy of a device for training metered dose inhaler breathing proficiency...\", Poowaruttanawiwit et al., 2025). El cribado de los ~125 registros restantes queda pendiente para una futura actualización.",
    cochraneUpdateNote: "Actualización Cochrane Library (10 sep. 2026): la ecuación originalmente propuesta no pudo ejecutarse en la interfaz de búsqueda avanzada. El investigador la modificó por una versión más simple y conceptualmente relacionada, aplicó el mismo filtro de fecha 2021–2026 y ejecutó la búsqueda mediante Cochrane Search Manager, obteniendo 92 resultados exportados en Cochrane_v09092026.csv. El cribado por título y resumen (que sí incluyen resumen completo en esta exportación) mostró que la totalidad corresponde a revisiones sistemáticas de eficacia de intervenciones clínicas ajenas al objeto de esta revisión, sin ningún duplicado frente a las demás bases ni frente a los 7 estudios incluidos. Los 92 se clasificaron como fuera de dominio y ninguno fue incluido.",
  },

  embaseExcludedNote: "Dos registros de Embase quedaron fuera del rango de fechas 2021–2026: Gustafson et al. (2020, PMID 32326886) validó el State-Trait Anxiety Inventory en danés mediante entrevista cognitiva con 12 voluntarios sanos, en paralelo a su aplicación en pacientes con cribado cervical anormal; y Lo Re et al. (2012, PMID 23256756) desarrolló el cuestionario I-CAM-G mediante pretest y entrevistas cognitivas con 16 voluntarios sanos, aplicado luego en pacientes con cáncer de mama y en población general. Ambos son metodológicamente afines a esta revisión pero anteriores al periodo fijado; se documentan aquí por transparencia, sin incluirlos en la síntesis.",

  methodology: {
    databases: ["PubMed/MEDLINE", "LILACS/BVS", "Google Scholar", "Embase (quinta base, añadida por el investigador)", "Cochrane Library (ecuación modificada — ver limitaciones)"],
    qualityTools: ["COSMIN — riesgo de sesgo, validez de contenido de PROM", "COREQ — Consolidated Criteria for Reporting Qualitative Research"],
  },
};
