'use client';

import { useState, useEffect } from 'react';

// Tipos
interface SavedReflection {
  id: string;
  question: string;
  answer: string;
  technique: string;
  topic: string;
  createdAt: string;
}

interface CreativityTechnique {
  id: string;
  name: string;
  emoji: string;
  creator: string;
  year: string;
  era: 'ancient' | 'modern' | 'genius';
  description: string;
  howTo: string[];
  questions: string[]; // Cambiado de prompts a questions
  color: string;
  usedBy?: string[];
}

// Funciones auxiliares
const generateId = () => Math.random().toString(36).substring(2, 11);

// 🧠 TODAS LAS TÉCNICAS DE CREATIVIDAD CON PREGUNTAS DE REFLEXIÓN
const creativityTechniques: CreativityTechnique[] = [
  // ========== TÉCNICAS DE GENIOS MODERNOS ==========
  {
    id: 'first-principles',
    name: 'First Principles (Primeros Principios)',
    emoji: '🚀',
    creator: 'Aristóteles / Elon Musk',
    year: 'Siglo IV a.C. / 2000s',
    era: 'genius',
    usedBy: ['Elon Musk', 'Jeff Bezos', 'Charlie Munger'],
    description: 'Descompón todo hasta sus verdades fundamentales y reconstruye desde cero. No asumas nada. Cuestiona cada suposición. La técnica favorita de Elon Musk.',
    howTo: [
      'Identifica las suposiciones que das por hecho',
      'Pregunta "¿Por qué?" hasta llegar a verdades fundamentales',
      'Reconstruye desde esas verdades básicas',
      'Ignora cómo se ha hecho antes',
    ],
    color: 'from-red-600 to-orange-500',
    questions: [
      '¿Cuáles son las verdades FUNDAMENTALES e incuestionables sobre TEMA?',
      '¿Qué suposiciones estoy dando por hecho que podrían ser completamente falsas?',
      'Si empezara desde CERO hoy, ¿cómo abordaría TEMA de manera diferente?',
      '¿Por qué se hace así tradicionalmente? ¿Es la única forma o solo la convencional?',
      '¿Qué es físicamente POSIBLE vs qué es solo una convención social/industrial?',
      'Si TEMA no existiera y tuviera que inventarlo hoy, ¿cómo lo haría?',
      '¿Qué limitaciones son REALES y cuáles son solo imaginarias o autoimpuestas?',
      '¿Cuál es el problema REAL que estoy tratando de resolver con TEMA?',
    ],
  },
  {
    id: 'inversion',
    name: 'Pensamiento Inverso',
    emoji: '🔄',
    creator: 'Carl Jacobi / Charlie Munger',
    year: '1800s / 1990s',
    era: 'genius',
    usedBy: ['Charlie Munger', 'Warren Buffett', 'Naval Ravikant'],
    description: 'En lugar de pensar cómo tener éxito, piensa en TODAS las formas de fracasar y evítalas. "Invierte, siempre invierte" - Jacobi.',
    howTo: [
      'Define el resultado que quieres lograr',
      'Piensa en todas las formas de FRACASAR',
      'Invierte cada punto de fracaso',
      'Evita sistemáticamente cada trampa',
    ],
    color: 'from-purple-600 to-indigo-500',
    questions: [
      '¿Cómo podría GARANTIZAR el fracaso total en TEMA?',
      '¿Qué haría si quisiera ARRUINAR completamente esto?',
      '¿Cuáles son los errores MÁS ESTÚPIDOS que podría cometer en TEMA?',
      '¿Qué hacen las personas que FRACASAN consistentemente en TEMA?',
      'Si mi peor enemigo quisiera sabotearme en TEMA, ¿qué haría?',
      '¿Qué es lo OPUESTO del consejo convencional y por qué podría funcionar?',
      '¿Qué debo EVITAR a toda costa en TEMA?',
      '¿Cuál es la PEOR decisión posible que podría tomar ahora mismo?',
    ],
  },
  {
    id: 'second-order',
    name: 'Pensamiento de Segundo Orden',
    emoji: '♟️',
    creator: 'Howard Marks',
    year: '2011',
    era: 'genius',
    usedBy: ['Howard Marks', 'Ray Dalio', 'George Soros'],
    description: 'No solo pienses en las consecuencias inmediatas, sino en las consecuencias DE las consecuencias. Piensa 3 movimientos adelante como en ajedrez.',
    howTo: [
      'Identifica la acción o decisión',
      'Pregunta: ¿Y luego qué?',
      'Para cada consecuencia, pregunta de nuevo: ¿Y luego qué?',
      'Considera cómo reaccionarán otros',
    ],
    color: 'from-blue-600 to-cyan-500',
    questions: [
      '¿Y luego qué? Si hago esto con TEMA, ¿cuál es la consecuencia de esa consecuencia?',
      '¿Cómo REACCIONARÁN otros a mi acción sobre TEMA?',
      '¿Qué efectos SECUNDARIOS no estoy considerando?',
      'En 5 AÑOS, ¿cómo veré esta decisión sobre TEMA?',
      '¿Qué INCENTIVOS estoy creando sin darme cuenta?',
      '¿Cuál es el costo de OPORTUNIDAD real de enfocarme en TEMA?',
      '¿Qué pasará cuando TODOS hagan lo mismo que yo en TEMA?',
      '¿Estoy RESOLVIENDO el problema o solo moviéndolo a otro lugar?',
    ],
  },
  {
    id: 'regret-minimization',
    name: 'Minimización del Arrepentimiento',
    emoji: '👴',
    creator: 'Jeff Bezos',
    year: '1994',
    era: 'genius',
    usedBy: ['Jeff Bezos', 'Tim Ferriss', 'Derek Sivers'],
    description: 'Proyéctate a los 80 años. ¿De qué te arrepentirías de NO haber hecho? Bezos usó esto para dejar Wall Street y crear Amazon.',
    howTo: [
      'Imagina que tienes 80 años',
      'Mira hacia atrás a tu vida',
      'Pregunta: ¿De qué me arrepentiría?',
      'Minimiza los arrepentimientos futuros',
    ],
    color: 'from-amber-600 to-yellow-500',
    questions: [
      'A los 80 AÑOS, ¿me arrepentiré de NO haber explorado TEMA?',
      '¿Qué me gustaría haberme ATREVIDO a hacer respecto a TEMA?',
      '¿Estoy evitando TEMA por MIEDO o por razones realmente lógicas?',
      '¿Qué HISTORIA quiero contar sobre cómo abordé TEMA?',
      'Si FRACASO en TEMA, ¿sería una buena historia o una tragedia?',
      '¿Qué RIESGOS estoy evitando que realmente valen la pena tomar?',
      '¿Preferiría FALLAR intentando o NUNCA haberlo intentado?',
      '¿Qué diría mi YO del futuro sobre mi indecisión actual en TEMA?',
    ],
  },
  {
    id: '10x-thinking',
    name: '10x Moonshot Thinking',
    emoji: '🌙',
    creator: 'Google X / Astro Teller',
    year: '2010',
    era: 'genius',
    usedBy: ['Larry Page', 'Elon Musk', 'Peter Thiel'],
    description: 'No pienses en mejorar 10%, piensa en mejorar 10X. Los saltos grandes a menudo son MÁS FÁCILES porque la competencia desaparece.',
    howTo: [
      'Olvida las mejoras incrementales',
      'Pregunta: ¿Cómo sería 10 veces mejor?',
      'Identifica qué cambiaría radicalmente',
      'La audacia reduce la competencia',
    ],
    color: 'from-violet-600 to-purple-500',
    questions: [
      '¿Cómo sería TEMA si fuera 10 VECES mejor, no solo 10% mejor?',
      '¿Qué tendría que CAMBIAR radicalmente para un salto 10x?',
      '¿Por qué NO estoy pensando más GRANDE sobre TEMA?',
      '¿Qué TECNOLOGÍA podría hacer esto trivialmente fácil?',
      '¿Cuál es la versión de TEMA que parece CIENCIA FICCIÓN?',
      '¿Qué haría si el FRACASO fuera imposible?',
      '¿Cómo abordaría TEMA alguien con RECURSOS ilimitados?',
      '¿Qué problema MÁS GRANDE podría resolver si resuelvo TEMA primero?',
    ],
  },
  {
    id: 'steel-man',
    name: 'Steel Man (Argumento de Acero)',
    emoji: '🛡️',
    creator: 'Filosofía Analítica',
    year: 'Siglo XX',
    era: 'genius',
    usedBy: ['Sam Harris', 'Jordan Peterson', 'Naval Ravikant'],
    description: 'En lugar de atacar la versión DÉBIL del argumento contrario (straw man), construye la MEJOR versión posible y responde a esa.',
    howTo: [
      'Identifica la posición contraria',
      'Hazla MÁS fuerte, no más débil',
      'Responde a la mejor versión',
      'Esto fortalece tu propio argumento',
    ],
    color: 'from-gray-600 to-slate-500',
    questions: [
      '¿Cuál es el MEJOR argumento contra mi posición sobre TEMA?',
      '¿Por qué personas INTELIGENTES piensan diferente sobre TEMA?',
      '¿Qué EVIDENCIA ignoraría si estuviera equivocado sobre TEMA?',
      '¿Cómo DEFENDERÍA la posición opuesta si tuviera que hacerlo?',
      '¿Qué saben mis CRÍTICOS que yo no sé sobre TEMA?',
      '¿Qué tendría que ser VERDAD para que yo esté completamente equivocado?',
      '¿Cuáles son las LIMITACIONES de mi perspectiva sobre TEMA?',
      '¿Qué me estoy PERDIENDO por mi sesgo de confirmación?',
    ],
  },
  {
    id: 'premortem',
    name: 'Pre-Mortem',
    emoji: '⚰️',
    creator: 'Gary Klein',
    year: '2007',
    era: 'genius',
    usedBy: ['Daniel Kahneman', 'Annie Duke', 'Tim Ferriss'],
    description: 'Imagina que el proyecto ya FRACASÓ. Ahora explica por qué. Esta técnica revela riesgos ocultos ANTES de que ocurran.',
    howTo: [
      'Imagina que ya pasó un año',
      'El proyecto fue un FRACASO total',
      'Escribe por qué fracasó',
      'Ahora prevén esos problemas',
    ],
    color: 'from-emerald-600 to-teal-500',
    questions: [
      'Es un año después y TEMA fue un FRACASO total. ¿Qué salió mal?',
      '¿Cuáles son las SEÑALES de advertencia que estoy ignorando?',
      '¿Qué factor EXTERNO podría destruir todo mi plan sobre TEMA?',
      '¿Dónde estoy siendo demasiado OPTIMISTA sobre TEMA?',
      '¿Qué parte de TEMA depende de que TODO salga perfecto?',
      '¿Quién o qué podría SABOTEAR esto sin querer?',
      '¿Cuál es mi PUNTO CIEGO más grande en TEMA?',
      '¿Qué asumo que seguirá IGUAL pero podría cambiar drásticamente?',
    ],
  },
  {
    id: 'via-negativa',
    name: 'Vía Negativa (Sustracción)',
    emoji: '✂️',
    creator: 'Nassim Taleb',
    year: '2012',
    era: 'genius',
    usedBy: ['Nassim Taleb', 'Naval Ravikant', 'Tim Ferriss'],
    description: 'MENOS es más. En lugar de agregar, QUITA. El conocimiento crece más por lo que eliminamos que por lo que añadimos.',
    howTo: [
      'Identifica qué puedes ELIMINAR',
      'Quita complejidad innecesaria',
      'Enfócate en el 20% que importa',
      'Simplifica hasta la esencia',
    ],
    color: 'from-stone-600 to-neutral-500',
    questions: [
      '¿Qué puedo ELIMINAR de TEMA para mejorarlo?',
      '¿Qué COMPLEJIDAD innecesaria estoy agregando?',
      '¿Qué dejaría de hacer si fuera más INTELIGENTE?',
      '¿Cuál es el 20% de TEMA que produce el 80% de los resultados?',
      '¿Qué "mejores prácticas" son en realidad LASTRE?',
      '¿Qué haría si solo pudiera dedicar 2 HORAS a TEMA?',
      '¿Qué consejo CONVENCIONAL debería ignorar completamente?',
      '¿Qué drama, ruido o distracción puedo CORTAR de TEMA?',
    ],
  },

  // ========== TÉCNICAS ANTIGUAS ==========
  {
    id: 'socratic',
    name: 'Método Socrático',
    emoji: '🏛️',
    creator: 'Sócrates',
    year: '470-399 a.C.',
    era: 'ancient',
    description: 'El filósofo griego usaba preguntas profundas para llegar a la verdad. En lugar de dar respuestas, hacía preguntas que llevaban al interlocutor a descubrir el conocimiento por sí mismo.',
    howTo: [
      'Cuestiona las suposiciones básicas',
      'Pregunta "¿Qué quieres decir con...?"',
      'Explora las implicaciones y consecuencias',
      'Busca contraejemplos',
    ],
    color: 'from-amber-600 to-yellow-500',
    questions: [
      '¿Qué quiero decir EXACTAMENTE cuando hablo de TEMA?',
      '¿Cómo LLEGUÉ a esta creencia sobre TEMA?',
      '¿Qué EVIDENCIA tengo y qué evidencia me falta?',
      '¿Cuáles son las IMPLICACIONES si estoy en lo correcto sobre TEMA?',
      '¿Cuáles son las IMPLICACIONES si estoy equivocado?',
      '¿Por qué TEMA es importante? ¿Para quién realmente importa?',
      '¿Qué estoy ASUMIENDO que no he verificado sobre TEMA?',
      '¿Cómo podría alguien ver TEMA de manera completamente DIFERENTE?',
    ],
  },
  {
    id: 'davinci',
    name: 'Los 7 Principios de Da Vinci',
    emoji: '🎨',
    creator: 'Leonardo da Vinci',
    year: '1452-1519',
    era: 'ancient',
    description: 'El genio del Renacimiento usaba: Curiosità (curiosidad insaciable), Dimostrazione (aprender de experiencia), Sensazione (agudizar sentidos), Sfumato (abrazar ambigüedad), Arte/Scienza (equilibrar lógica y creatividad), Corporalità (cuerpo-mente), Connessione (ver conexiones).',
    howTo: [
      'Curiosità: Haz listas de 100 preguntas',
      'Dimostrazione: Experimenta, no solo teorices',
      'Sensazione: Observa con todos los sentidos',
      'Connessione: Busca patrones ocultos',
    ],
    color: 'from-rose-600 to-orange-500',
    questions: [
      '¿Cuáles son las 10 preguntas más CURIOSAS que tengo sobre TEMA?',
      '¿Qué EXPERIMENTO podría hacer para aprender más sobre TEMA?',
      '¿Cómo se ve, suena, huele y se SIENTE TEMA en la práctica?',
      '¿Qué MISTERIO o ambigüedad de TEMA estoy evitando?',
      '¿Cómo puedo combinar LÓGICA e INTUICIÓN para entender TEMA?',
      '¿Cómo afecta mi CUERPO y energía física mi pensamiento sobre TEMA?',
      '¿Qué CONEXIONES ocultas tiene TEMA con otras áreas de mi vida?',
      '¿Qué vería en TEMA si lo observara como un ARTISTA y como un CIENTÍFICO?',
    ],
  },
  {
    id: 'aristotle',
    name: 'Retórica de Aristóteles',
    emoji: '📜',
    creator: 'Aristóteles',
    year: '384-322 a.C.',
    era: 'ancient',
    description: 'Los 3 pilares de la persuasión: Ethos (credibilidad), Pathos (emoción) y Logos (lógica). Usa los tres para construir argumentos convincentes.',
    howTo: [
      'Ethos: Establece tu credibilidad',
      'Pathos: Conecta emocionalmente',
      'Logos: Usa datos y lógica',
      'Equilibra los tres elementos',
    ],
    color: 'from-blue-700 to-indigo-500',
    questions: [
      '¿Por qué ALGUIEN debería escucharme sobre TEMA? (Ethos)',
      '¿Qué EMOCIÓN quiero despertar cuando hablo de TEMA? (Pathos)',
      '¿Cuáles son los DATOS y hechos que respaldan mi visión de TEMA? (Logos)',
      '¿Cuál es la HISTORIA personal que me conecta con TEMA?',
      '¿Qué EXPERIENCIA me da autoridad para hablar de TEMA?',
      '¿Cómo puedo hacer que TEMA sea RELEVANTE para mi audiencia?',
      '¿Qué CONTRAARGUMENTO lógico debo anticipar?',
      '¿Cómo equilibro EMOCIÓN y RAZÓN al comunicar sobre TEMA?',
    ],
  },
  {
    id: 'sunzi',
    name: 'Estrategia de Sun Tzu',
    emoji: '⚔️',
    creator: 'Sun Tzu',
    year: '544-496 a.C.',
    era: 'ancient',
    description: '"El Arte de la Guerra" aplicado a cualquier desafío: conoce a tu enemigo y a ti mismo, la mejor victoria es ganar sin luchar, sé como el agua.',
    howTo: [
      'Conócete a ti mismo profundamente',
      'Conoce tu "campo de batalla"',
      'Busca ganar sin conflicto directo',
      'Sé flexible como el agua',
    ],
    color: 'from-red-700 to-rose-600',
    questions: [
      '¿Cuáles son mis FORTALEZAS reales en TEMA?',
      '¿Cuáles son mis DEBILIDADES que debo reconocer?',
      '¿Quién o qué es el "enemigo" u OBSTÁCULO en TEMA?',
      '¿Cómo puedo "ganar" en TEMA sin CONFLICTO directo?',
      '¿Dónde está el TERRENO favorable para mí en TEMA?',
      '¿Cómo puedo ser como el AGUA y adaptarme en TEMA?',
      '¿Qué SORPRESA o movimiento inesperado podría usar?',
      '¿Cómo convierto mis DEBILIDADES en fortalezas en TEMA?',
    ],
  },
  {
    id: 'plato',
    name: 'Dialéctica Platónica',
    emoji: '🔮',
    creator: 'Platón',
    year: '428-348 a.C.',
    era: 'ancient',
    description: 'Busca la verdad a través del diálogo entre tesis opuestas. Confronta ideas contrarias para llegar a una síntesis superior.',
    howTo: [
      'Presenta una tesis (tu posición)',
      'Busca la antítesis (posición contraria)',
      'Examina ambas honestamente',
      'Encuentra la síntesis (verdad superior)',
    ],
    color: 'from-purple-700 to-violet-500',
    questions: [
      '¿Cuál es mi TESIS o posición actual sobre TEMA?',
      '¿Cuál es la ANTÍTESIS o posición completamente opuesta?',
      '¿Qué VERDAD hay en la posición contraria que debo reconocer?',
      '¿Cuál sería la SÍNTESIS que reconcilia ambas visiones?',
      '¿Qué ALEGORÍA o metáfora explicaría mejor TEMA?',
      '¿Cuál es la FORMA IDEAL de TEMA vs la realidad imperfecta?',
      '¿Qué DIÁLOGO tendría con alguien que piensa opuesto sobre TEMA?',
      '¿Qué verdad SUPERIOR emerge de examinar los opuestos?',
    ],
  },
  {
    id: 'confucius',
    name: 'Sabiduría Confuciana',
    emoji: '☯️',
    creator: 'Confucio',
    year: '551-479 a.C.',
    era: 'ancient',
    description: 'Enseñaba a través de analogías, historias y el estudio de los clásicos. Enfatizaba la reflexión constante y buscar el Camino Medio.',
    howTo: [
      'Estudia a los maestros del pasado',
      'Reflexiona constantemente',
      'Usa analogías para explicar',
      'Busca el equilibrio (Camino Medio)',
    ],
    color: 'from-emerald-700 to-green-500',
    questions: [
      '¿Qué MAESTROS del pasado ya exploraron TEMA?',
      '¿Qué LECCIONES de la historia aplican a TEMA?',
      '¿Cuál es el CAMINO MEDIO entre los extremos en TEMA?',
      '¿Qué ANALOGÍA de la naturaleza explica mejor TEMA?',
      '¿Qué debo ESTUDIAR más para entender TEMA?',
      '¿Cómo puedo ENSEÑAR TEMA a otros para entenderlo mejor yo?',
      '¿Qué VIRTUD necesito desarrollar para dominar TEMA?',
      '¿Cómo PRACTICO lo que predico respecto a TEMA?',
    ],
  },

  // ========== TÉCNICAS MODERNAS ==========
  {
    id: 'scamper',
    name: 'SCAMPER',
    emoji: '🔄',
    creator: 'Bob Eberle',
    year: '1971',
    era: 'modern',
    description: '7 verbos para transformar ideas: Sustituir, Combinar, Adaptar, Modificar, Poner otros usos, Eliminar, Reorganizar.',
    howTo: [
      'S - Sustituir: ¿Qué puedes reemplazar?',
      'C - Combinar: ¿Qué puedes mezclar?',
      'A - Adaptar: ¿Qué puedes ajustar?',
      'M/P/E/R - Modificar, otros usos, eliminar, reorganizar',
    ],
    color: 'from-blue-500 to-cyan-500',
    questions: [
      '¿Qué elemento de TEMA puedo SUSTITUIR por algo completamente diferente?',
      '¿Con qué otra idea o campo puedo COMBINAR TEMA?',
      '¿Cómo puedo ADAPTAR TEMA para un contexto totalmente nuevo?',
      '¿Qué pasaría si MODIFICO TEMA al extremo (más grande, pequeño, rápido)?',
      '¿Para qué OTROS USOS podría servir TEMA que nadie ha pensado?',
      '¿Qué puedo ELIMINAR de TEMA para simplificarlo radicalmente?',
      '¿Qué pasa si REORGANIZO o invierto completamente TEMA?',
      '¿Cuál es la versión MÁS LOCA de TEMA que puedo imaginar?',
    ],
  },
  {
    id: 'six-hats',
    name: 'Los 6 Sombreros',
    emoji: '🎩',
    creator: 'Edward de Bono',
    year: '1985',
    era: 'modern',
    description: 'Analiza desde 6 perspectivas: ⚪Datos, 🔴Emociones, ⚫Crítica, 🟡Optimismo, 🟢Creatividad, 🔵Organización.',
    howTo: [
      '⚪ Blanco - Solo datos y hechos',
      '🔴 Rojo - Emociones e intuiciones',
      '⚫ Negro - Crítica y riesgos',
      '🟡🟢🔵 - Optimismo, creatividad, proceso',
    ],
    color: 'from-purple-500 to-indigo-500',
    questions: [
      '⚪ ¿Cuáles son los DATOS y hechos objetivos sobre TEMA?',
      '🔴 ¿Qué SIENTO intuitivamente sobre TEMA sin justificarlo?',
      '⚫ ¿Cuáles son los RIESGOS y problemas potenciales de TEMA?',
      '🟡 ¿Cuál es el MEJOR escenario posible para TEMA?',
      '🟢 ¿Qué ALTERNATIVAS creativas no he considerado para TEMA?',
      '🔵 ¿Cuál es el PROCESO paso a paso para avanzar en TEMA?',
      '¿Qué perspectiva estoy EVITANDO sobre TEMA?',
      '¿Cómo cambiaría mi visión de TEMA si uso CADA sombrero?',
    ],
  },
  {
    id: 'five-whys',
    name: 'Los 5 Por Qués',
    emoji: '❓',
    creator: 'Sakichi Toyoda',
    year: '1930s',
    era: 'modern',
    description: 'Llega a la raíz de cualquier problema preguntando "¿Por qué?" cinco veces consecutivas. Técnica usada en Toyota.',
    howTo: [
      'Identifica el problema o tema',
      'Pregunta: ¿Por qué?',
      'Toma la respuesta y pregunta ¿Por qué? de nuevo',
      'Repite 5 veces hasta llegar a la raíz',
    ],
    color: 'from-red-500 to-pink-500',
    questions: [
      '¿Por qué me interesa TEMA? → (responde) → ¿Por qué?',
      '¿Por qué es TEMA un problema o desafío?',
      '¿Por qué no he resuelto TEMA antes?',
      '¿Por qué TEMA importa realmente en mi vida?',
      '¿Por qué otras personas luchan con TEMA?',
      '¿Cuál es la RAÍZ verdadera detrás de TEMA?',
      '¿Por qué la solución obvia de TEMA no funciona?',
      '¿Por qué sigo pensando en TEMA una y otra vez?',
    ],
  },
  {
    id: 'lateral',
    name: 'Pensamiento Lateral',
    emoji: '🌀',
    creator: 'Edward de Bono',
    year: '1967',
    era: 'modern',
    description: 'Escapa del pensamiento lineal. Busca soluciones no obvias, cambia el marco de referencia, haz conexiones inesperadas.',
    howTo: [
      'Cuestiona las premisas del problema',
      'Busca analogías en campos diferentes',
      'Invierte o exagera el problema',
      'Introduce elementos aleatorios',
    ],
    color: 'from-pink-600 to-rose-500',
    questions: [
      '¿Y si el PROBLEMA de TEMA fuera en realidad una OPORTUNIDAD?',
      '¿Qué pasaría si hiciera exactamente lo CONTRARIO en TEMA?',
      '¿Cómo resolvería TEMA un NIÑO de 5 años?',
      '¿Qué industria completamente DIFERENTE ya resolvió algo similar?',
      '¿Cuál es la solución más RIDÍCULA e imposible para TEMA?',
      '¿Qué recurso NO CONVENCIONAL podría usar para TEMA?',
      '¿Cómo sería TEMA en un UNIVERSO paralelo?',
      '¿Qué REGLAS estoy siguiendo que nadie me obligó a seguir?',
    ],
  },
  {
    id: 'reverse',
    name: 'Brainstorm Inverso',
    emoji: '🔃',
    creator: 'Técnica clásica',
    year: 'Siglo XX',
    era: 'modern',
    description: 'Piensa en cómo EMPEORAR el problema o garantizar el fracaso, luego invierte las ideas para encontrar soluciones.',
    howTo: [
      'Define tu objetivo positivo',
      'Pregunta: ¿Cómo garantizaría el fracaso?',
      'Lista todas las formas de empeorar',
      'Invierte cada idea negativa',
    ],
    color: 'from-slate-500 to-gray-600',
    questions: [
      '¿Cuáles serían los PEORES consejos sobre TEMA?',
      '¿Cómo podría GARANTIZAR el fracaso total en TEMA?',
      '¿Qué es todo lo que NO debo hacer con TEMA?',
      '¿Cómo haría para ARRUINAR completamente mi progreso en TEMA?',
      '¿Qué harían las personas MÁS INCOMPETENTES con TEMA?',
      '¿Cómo podría COMPLICAR innecesariamente TEMA?',
      '¿Qué SABOTEARÍA cualquier posibilidad de éxito en TEMA?',
      'Ahora... ¿cuál es el OPUESTO de todo lo anterior?',
    ],
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'all' | 'genius' | 'ancient' | 'modern'>('all');
  const [selectedTechnique, setSelectedTechnique] = useState<CreativityTechnique | null>(null);
  const [topic, setTopic] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<{[key: number]: string}>({});
  const [savedReflections, setSavedReflections] = useState<SavedReflection[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  // Cargar reflexiones guardadas
  useEffect(() => {
    try {
      const saved = localStorage.getItem('genius-reflections-v1');
      if (saved) setSavedReflections(JSON.parse(saved));
    } catch (e) { console.error(e); }
  }, []);

  // Guardar reflexiones
  useEffect(() => {
    try {
      localStorage.setItem('genius-reflections-v1', JSON.stringify(savedReflections));
    } catch (e) { console.error(e); }
  }, [savedReflections]);

  const generateQuestions = () => {
    if (!selectedTechnique || !topic.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const questions = selectedTechnique.questions.map(q => q.replace(/TEMA/g, topic));
      setGeneratedQuestions(questions);
      setCurrentAnswers({});
      setIsGenerating(false);
    }, 300);
  };

  const saveReflection = (index: number, question: string) => {
    const answer = currentAnswers[index];
    if (!answer?.trim() || !selectedTechnique) return;
    
    const newReflection: SavedReflection = {
      id: generateId(),
      question,
      answer,
      technique: selectedTechnique.name,
      topic,
      createdAt: new Date().toISOString(),
    };
    
    setSavedReflections(prev => [newReflection, ...prev]);
    setCurrentAnswers(prev => ({...prev, [index]: ''}));
  };

  const deleteReflection = (id: string) => {
    setSavedReflections(prev => prev.filter(r => r.id !== id));
  };

  const filteredTechniques = creativityTechniques.filter(t => 
    activeTab === 'all' || t.era === activeTab
  );

  const geniusCount = creativityTechniques.filter(t => t.era === 'genius').length;
  const ancientCount = creativityTechniques.filter(t => t.era === 'ancient').length;
  const modernCount = creativityTechniques.filter(t => t.era === 'modern').length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                🧠 Genius Reflection Engine
              </h1>
              <p className="text-white/70 mt-2 text-lg">
                Preguntas de reflexión de <span className="text-amber-400">Elon Musk</span>, <span className="text-blue-400">Jeff Bezos</span>, <span className="text-green-400">Charlie Munger</span> y más genios
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowSaved(!showSaved)}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  showSaved ? 'bg-amber-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                💎 Mis Reflexiones ({savedReflections.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Descripción */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-6 mb-6">
          <p className="text-white text-lg">
            <strong>🎯 El concepto:</strong> No te damos títulos de blog. Te damos las <span className="text-amber-400 font-bold">PREGUNTAS</span> que los genios se hacen a sí mismos. 
            Respóndelas con honestidad y tus propias ideas auténticas emergerán naturalmente.
          </p>
        </div>

        {/* Vista de reflexiones guardadas */}
        {showSaved && (
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              💎 Tus Reflexiones Guardadas
            </h2>
            {savedReflections.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {savedReflections.map((ref) => (
                  <div key={ref.id} className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                        {ref.technique}
                      </span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {ref.topic}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {new Date(ref.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 italic">"{ref.question}"</p>
                    <p className="text-gray-800 whitespace-pre-wrap">{ref.answer}</p>
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={() => deleteReflection(ref.id)}
                        className="px-3 py-1 text-red-500 hover:bg-red-50 rounded-lg text-sm"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <div className="text-6xl mb-4">💭</div>
                <p>Aún no has guardado reflexiones</p>
                <p className="text-sm mt-2">Selecciona una técnica, escribe tu tema y responde las preguntas</p>
              </div>
            )}
          </div>
        )}

        {/* Tabs de filtro */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button onClick={() => setActiveTab('all')}
            className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'all' ? 'bg-white text-purple-700 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            📚 Todas ({creativityTechniques.length})
          </button>
          <button onClick={() => setActiveTab('genius')}
            className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${activeTab === 'genius' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            🚀 Genios Modernos ({geniusCount})
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">HOT</span>
          </button>
          <button onClick={() => setActiveTab('ancient')}
            className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'ancient' ? 'bg-amber-600 text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            🏛️ Antiguas ({ancientCount})
          </button>
          <button onClick={() => setActiveTab('modern')}
            className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'modern' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            ⚡ Modernas ({modernCount})
          </button>
        </div>

        {/* Grid de Técnicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredTechniques.map((technique) => (
            <div 
              key={technique.id}
              onClick={() => { setSelectedTechnique(technique); setGeneratedQuestions([]); setTopic(''); }}
              className={`bg-white/95 rounded-2xl shadow-lg p-5 cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] ${
                selectedTechnique?.id === technique.id ? 'ring-4 ring-amber-500' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${technique.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                  {technique.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-800 text-lg">{technique.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      technique.era === 'genius' ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700' :
                      technique.era === 'ancient' ? 'bg-amber-100 text-amber-700' : 
                      'bg-cyan-100 text-cyan-700'
                    }`}>
                      {technique.era === 'genius' ? '🚀 Genio' : technique.era === 'ancient' ? '🏛️ Antigua' : '⚡ Moderna'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{technique.creator} • {technique.year}</p>
                  {technique.usedBy && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {technique.usedBy.slice(0, 3).map((person, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          👤 {person}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{technique.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Técnica Seleccionada */}
        {selectedTechnique && (
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedTechnique.color} flex items-center justify-center text-3xl shadow-lg`}>
                {selectedTechnique.emoji}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedTechnique.name}</h2>
                <p className="text-gray-500">{selectedTechnique.creator} • {selectedTechnique.year}</p>
                {selectedTechnique.usedBy && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTechnique.usedBy.map((person, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700 rounded-full font-medium">
                        👤 {person}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-gray-700 mb-4">{selectedTechnique.description}</p>
              <h4 className="font-bold text-gray-800 mb-2">📋 Cómo aplicarla:</h4>
              <ul className="space-y-1">
                {selectedTechnique.howTo.map((step, i) => (
                  <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                    <span className={`w-5 h-5 rounded bg-gradient-to-br ${selectedTechnique.color} text-white flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Input de tema */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 text-lg">
                📝 ¿Sobre qué tema quieres reflexionar?
              </label>
              <div className="flex flex-col md:flex-row gap-3">
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && generateQuestions()}
                  placeholder="Ej: emprender un negocio, cambiar de carrera, aprender programación..."
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none text-lg"
                />
                <button 
                  onClick={generateQuestions}
                  disabled={!topic.trim() || isGenerating}
                  className={`px-6 py-3 bg-gradient-to-r ${selectedTechnique.color} text-white font-bold rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity`}
                >
                  {isGenerating ? '⚙️ Generando...' : '🚀 Generar Preguntas'}
                </button>
              </div>
            </div>

            {/* Preguntas Generadas */}
            {generatedQuestions.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 text-xl flex items-center gap-2">
                  ✨ Preguntas de reflexión sobre "{topic}"
                </h3>
                <p className="text-gray-600">
                  Responde cada pregunta con honestidad. Tus respuestas se convertirán en contenido auténtico y profundo.
                </p>
                
                {generatedQuestions.map((question, i) => (
                  <div key={i} className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border-2 border-gray-100 hover:border-amber-200 transition-colors">
                    <div className="flex items-start gap-3 mb-3">
                      <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedTechnique.color} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                        {i + 1}
                      </span>
                      <p className="text-gray-800 font-medium text-lg leading-relaxed">{question}</p>
                    </div>
                    
                    <textarea
                      value={currentAnswers[i] || ''}
                      onChange={(e) => setCurrentAnswers(prev => ({...prev, [i]: e.target.value}))}
                      placeholder="Escribe tu reflexión aquí... Sé honesto, profundo, auténtico."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-400 focus:outline-none resize-none text-gray-700"
                      rows={4}
                    />
                    
                    {currentAnswers[i]?.trim() && (
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-400">{currentAnswers[i]?.length || 0} caracteres</span>
                        <button
                          onClick={() => saveReflection(i, question)}
                          className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                        >
                          💾 Guardar Reflexión
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quote inspiracional */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="text-4xl">"</div>
            <div>
              <p className="text-lg italic mb-3">
                I think it's very important to have a feedback loop, where you're constantly thinking about what you've done and how you could be doing it better.
              </p>
              <p className="text-white/60 font-medium">— Elon Musk</p>
            </div>
          </div>
        </div>

        <p className="text-center text-white/60 mt-8 pb-8">
          Hecho con 💜 en VibeCoding Bootcamp • Powered by First Principles Thinking
        </p>
      </div>
    </main>
  );
}
