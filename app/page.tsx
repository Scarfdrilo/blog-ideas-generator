'use client';

import { useState, useEffect } from 'react';

// Tipos
interface Idea {
  id: string;
  text: string;
  description: string;
  category: string;
  emoji: string;
  isFavorite: boolean;
  createdAt: string;
  isUserIdea: boolean;
  technique?: string;
}

interface Category {
  name: string;
  emoji: string;
  keywords: string[];
  templates: string[];
}

interface CreativityTechnique {
  id: string;
  name: string;
  emoji: string;
  creator: string;
  year: string;
  era: 'ancient' | 'modern';
  description: string;
  howTo: string[];
  prompts: string[];
  color: string;
}

interface ReflectionFramework {
  id: string;
  name: string;
  emoji: string;
  creator: string;
  usedBy: string[];
  description: string;
  color: string;
  questions: string[];
}

// Función para generar descripción creativa (hasta 500 caracteres)
const generateCreativeDescription = (ideaText: string): string => {
  const hooks = [
    "¿Sabías que este tema puede cambiar completamente tu perspectiva?",
    "Imagina dominar este concepto y ver resultados reales en tu vida.",
    "La mayoría ignora esto, pero aquí está la verdad que necesitas saber.",
    "El secreto mejor guardado que los expertos no quieren que sepas.",
    "Lo que nadie te dice sobre este tema podría sorprenderte.",
    "Después de investigar a fondo, descubrí algo fascinante.",
    "La ciencia ha demostrado algo increíble sobre esto.",
    "Contrario a lo que crees, la realidad es muy diferente.",
  ];
  
  const problems = [
    "El problema es que muy pocos saben aprovecharlo correctamente.",
    "Sin embargo, hay obstáculos que pocos mencionan.",
    "Pero la mayoría comete errores que se pueden evitar.",
    "La realidad es más compleja de lo que parece a simple vista.",
  ];
  
  const solutions = [
    "En este artículo descubrirás las claves para dominarlo paso a paso.",
    "Aquí te revelo el método que realmente funciona.",
    "Te comparto las estrategias que los expertos usan a diario.",
    "Aprende las técnicas probadas que generan resultados reales.",
  ];
  
  const benefits = [
    "Transforma tu enfoque y alcanza resultados sorprendentes.",
    "Destaca en un mundo cada vez más competitivo.",
    "Lleva tu potencial al siguiente nivel empezando hoy.",
    "Desbloquea oportunidades que no sabías que existían.",
  ];
  
  const hook = hooks[Math.floor(Math.random() * hooks.length)];
  const problem = problems[Math.floor(Math.random() * problems.length)];
  const solution = solutions[Math.floor(Math.random() * solutions.length)];
  const benefit = benefits[Math.floor(Math.random() * benefits.length)];
  
  let description = `${hook} ${problem} ${solution} ${benefit}`;
  
  if (description.length > 500) {
    description = description.substring(0, 497) + '...';
  }
  
  return description;
};

// 🧠 FRAMEWORKS DE REFLEXIÓN PARA GENIOS
const reflectionFrameworks: ReflectionFramework[] = [
  {
    id: 'first-principles',
    name: 'First Principles (Primeros Principios)',
    emoji: '🚀',
    creator: 'Aristóteles / Elon Musk',
    usedBy: ['Elon Musk', 'Jeff Bezos', 'Charlie Munger'],
    description: 'Descompón todo hasta sus verdades fundamentales y reconstruye desde cero. No asumas nada. Cuestiona cada suposición.',
    color: 'from-red-600 to-orange-500',
    questions: [
      '¿Cuáles son las verdades fundamentales e incuestionables sobre TEMA?',
      '¿Qué suposiciones estoy dando por hecho que podrían ser falsas?',
      'Si empezara desde cero, ¿cómo abordaría TEMA?',
      '¿Por qué se hace así? ¿Es la única forma o simplemente la tradicional?',
      '¿Qué es físicamente posible vs qué es solo convención?',
      'Si no existiera nada previo sobre TEMA, ¿cómo lo inventaría?',
      '¿Qué limitaciones son reales y cuáles son imaginarias?',
      '¿Cuál es el problema REAL que estoy tratando de resolver?',
    ],
  },
  {
    id: 'inversion',
    name: 'Pensamiento Inverso',
    emoji: '🔄',
    creator: 'Carl Jacobi / Charlie Munger',
    usedBy: ['Charlie Munger', 'Warren Buffett', 'Naval Ravikant'],
    description: 'En lugar de pensar cómo tener éxito, piensa en todas las formas de fracasar y evítalas. "Invierte, siempre invierte."',
    color: 'from-purple-600 to-indigo-500',
    questions: [
      '¿Cómo podría garantizar el FRACASO total en TEMA?',
      '¿Qué haría si quisiera arruinar completamente esto?',
      '¿Cuáles son los errores más estúpidos que podría cometer?',
      '¿Qué hacen las personas que fracasan consistentemente en TEMA?',
      'Si mi enemigo quisiera sabotearme en TEMA, ¿qué haría?',
      '¿Qué es lo opuesto del consejo convencional y por qué podría funcionar?',
      '¿Qué debo evitar a toda costa?',
      '¿Cuál es la peor decisión posible que podría tomar?',
    ],
  },
  {
    id: 'second-order',
    name: 'Pensamiento de Segundo Orden',
    emoji: '♟️',
    creator: 'Howard Marks',
    usedBy: ['Howard Marks', 'Ray Dalio', 'George Soros'],
    description: 'No solo pienses en las consecuencias inmediatas, sino en las consecuencias de las consecuencias. Piensa 3 movimientos adelante.',
    color: 'from-blue-600 to-cyan-500',
    questions: [
      '¿Y luego qué? ¿Cuál es la consecuencia de esta consecuencia?',
      '¿Cómo reaccionarán otros a mi acción sobre TEMA?',
      '¿Qué efectos secundarios no estoy considerando?',
      'En 5 años, ¿cómo veré esta decisión sobre TEMA?',
      '¿Qué incentivos estoy creando sin darme cuenta?',
      '¿Cuál es el costo de oportunidad real?',
      '¿Qué pasará cuando todos hagan lo mismo?',
      '¿Estoy resolviendo el problema o solo moviéndolo?',
    ],
  },
  {
    id: 'regret-minimization',
    name: 'Minimización del Arrepentimiento',
    emoji: '👴',
    creator: 'Jeff Bezos',
    usedBy: ['Jeff Bezos', 'Tim Ferriss', 'Derek Sivers'],
    description: 'Proyéctate a los 80 años. ¿De qué te arrepentirías de NO haber hecho? Las decisiones correctas minimizan el arrepentimiento futuro.',
    color: 'from-amber-600 to-yellow-500',
    questions: [
      'A los 80 años, ¿me arrepentiré de no haber explorado TEMA?',
      '¿Qué me gustaría haberme atrevido a hacer respecto a TEMA?',
      '¿Estoy evitando TEMA por miedo o por razones lógicas?',
      '¿Qué historia quiero contar sobre cómo abordé TEMA?',
      '¿El fracaso en TEMA sería una buena historia o una tragedia?',
      '¿Qué riesgos estoy evitando que realmente valen la pena?',
      '¿Preferiría fallar intentando o nunca haberlo intentado?',
      '¿Qué diría mi yo del futuro sobre mi decisión actual?',
    ],
  },
  {
    id: 'steel-man',
    name: 'Steel Man (Argumento de Acero)',
    emoji: '🛡️',
    creator: 'Filosofía Analítica',
    usedBy: ['Sam Harris', 'Jordan Peterson', 'Naval Ravikant'],
    description: 'En lugar de atacar la versión débil del argumento contrario, construye la MEJOR versión posible y responde a esa.',
    color: 'from-gray-600 to-slate-500',
    questions: [
      '¿Cuál es el MEJOR argumento contra mi posición sobre TEMA?',
      '¿Por qué personas inteligentes piensan diferente sobre TEMA?',
      '¿Qué evidencia ignoraría si estuviera equivocado?',
      '¿Cómo defendería la posición opuesta si tuviera que hacerlo?',
      '¿Qué saben mis críticos que yo no sé?',
      '¿Qué tendría que ser verdad para que yo esté equivocado?',
      '¿Cuáles son las limitaciones de mi perspectiva sobre TEMA?',
      '¿Qué me estoy perdiendo por mi sesgo de confirmación?',
    ],
  },
  {
    id: 'lateral-thinking',
    name: 'Pensamiento Lateral',
    emoji: '🌀',
    creator: 'Edward de Bono',
    usedBy: ['Steve Jobs', 'Richard Branson', 'Creativos de Pixar'],
    description: 'Escapa del pensamiento lineal. Busca soluciones no obvias, cambia el marco de referencia, haz conexiones inesperadas.',
    color: 'from-pink-600 to-rose-500',
    questions: [
      '¿Y si el problema de TEMA fuera en realidad una oportunidad?',
      '¿Qué pasaría si hiciera exactamente lo contrario?',
      '¿Cómo resolvería TEMA un niño de 5 años?',
      '¿Qué industria completamente diferente ya resolvió algo similar?',
      '¿Cuál es la solución más ridícula e imposible?',
      '¿Qué recurso no convencional podría usar para TEMA?',
      '¿Cómo sería TEMA en un universo paralelo?',
      '¿Qué reglas estoy siguiendo que nadie me obligó a seguir?',
    ],
  },
  {
    id: 'premortem',
    name: 'Pre-Mortem',
    emoji: '⚰️',
    creator: 'Gary Klein',
    usedBy: ['Daniel Kahneman', 'Annie Duke', 'Tim Ferriss'],
    description: 'Imagina que el proyecto ya fracasó. Ahora explica por qué. Esta técnica revela riesgos ocultos antes de que ocurran.',
    color: 'from-emerald-600 to-teal-500',
    questions: [
      'Es un año después y TEMA fue un fracaso total. ¿Qué salió mal?',
      '¿Cuáles son las señales de advertencia que estoy ignorando?',
      '¿Qué factor externo podría destruir todo mi plan?',
      '¿Dónde estoy siendo demasiado optimista?',
      '¿Qué depende de que todo salga perfecto (y nunca sale)?',
      '¿Quién o qué podría sabotear esto sin querer?',
      '¿Cuál es mi punto ciego más grande?',
      '¿Qué asumo que seguirá igual pero podría cambiar?',
    ],
  },
  {
    id: '10x-thinking',
    name: '10x Thinking (Pensamiento Moonshot)',
    emoji: '🌙',
    creator: 'Google X / Astro Teller',
    usedBy: ['Larry Page', 'Elon Musk', 'Peter Thiel'],
    description: 'No pienses en mejorar 10%, piensa en mejorar 10X. Los saltos grandes a menudo son más fáciles porque la competencia desaparece.',
    color: 'from-violet-600 to-purple-500',
    questions: [
      '¿Cómo sería TEMA si fuera 10 veces mejor, no 10% mejor?',
      '¿Qué tendría que cambiar radicalmente para un salto 10x?',
      '¿Por qué NO estoy pensando más grande sobre TEMA?',
      '¿Qué tecnología podría hacer esto trivialmente fácil?',
      '¿Cuál es la versión de TEMA que parece ciencia ficción?',
      '¿Qué haría si el fracaso fuera imposible?',
      '¿Cómo abordaría esto alguien con recursos ilimitados?',
      '¿Qué problema más grande podría resolver si resuelvo TEMA?',
    ],
  },
  {
    id: 'via-negativa',
    name: 'Vía Negativa (Sustracción)',
    emoji: '✂️',
    creator: 'Nassim Taleb',
    usedBy: ['Nassim Taleb', 'Naval Ravikant', 'Tim Ferriss'],
    description: 'Menos es más. En lugar de agregar, quita. El conocimiento crece más por lo que eliminamos que por lo que añadimos.',
    color: 'from-stone-600 to-neutral-500',
    questions: [
      '¿Qué puedo ELIMINAR de TEMA para mejorarlo?',
      '¿Qué complejidad innecesaria estoy agregando?',
      '¿Qué dejaría de hacer si fuera más inteligente?',
      '¿Cuál es el 20% que produce el 80% de los resultados?',
      '¿Qué "mejores prácticas" son en realidad lastre?',
      '¿Qué haría si solo pudiera dedicar 2 horas a TEMA?',
      '¿Qué consejo convencional debería ignorar?',
      '¿Qué drama, ruido o distracción puedo cortar?',
    ],
  },
  {
    id: 'socratic-deep',
    name: 'Cuestionamiento Socrático Profundo',
    emoji: '🏛️',
    creator: 'Sócrates',
    usedBy: ['Filósofos', 'Coaches ejecutivos', 'Terapeutas CBT'],
    description: 'Preguntas que revelan suposiciones ocultas, clarifican conceptos y exponen contradicciones en el pensamiento.',
    color: 'from-amber-700 to-orange-600',
    questions: [
      '¿Qué quiero decir exactamente cuando hablo de TEMA?',
      '¿Cómo llegué a esta creencia sobre TEMA?',
      '¿Qué evidencia tengo? ¿Qué evidencia falta?',
      '¿Cuáles son las implicaciones si estoy en lo correcto?',
      '¿Cuáles son las implicaciones si estoy equivocado?',
      '¿Por qué esto es importante? ¿Para quién?',
      '¿Qué estoy asumiendo que no he verificado?',
      '¿Cómo podría alguien ver esto de manera completamente diferente?',
    ],
  },
];

// TÉCNICAS DE CREATIVIDAD - ANTIGUAS Y MODERNAS
const creativityTechniques: CreativityTechnique[] = [
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
      'Examina el origen de las creencias',
      'Lleva el razonamiento a su conclusión lógica',
    ],
    prompts: [
      '¿Qué es realmente TEMA y qué no es?',
      'Las preguntas que nadie hace sobre TEMA',
      '¿Por qué creemos lo que creemos sobre TEMA?',
      'Cuestionando todo lo que sabemos de TEMA',
      'El arte de preguntar: Explorando TEMA',
      'Destruyendo mitos sobre TEMA con preguntas',
    ],
    color: 'from-amber-600 to-yellow-500',
  },
  {
    id: 'davinci',
    name: 'Los 7 Principios de Da Vinci',
    emoji: '🎨',
    creator: 'Leonardo da Vinci',
    year: '1452-1519',
    era: 'ancient',
    description: 'El genio del Renacimiento desarrolló 7 principios: Curiosità (curiosidad insaciable), Dimostrazione (aprender de la experiencia), Sensazione (agudizar los sentidos), Sfumato (abrazar la ambigüedad), Arte/Scienza (equilibrar lógica y creatividad), Corporalità (cultivar el cuerpo), y Connessione (ver conexiones entre todo).',
    howTo: [
      'Curiosità: Haz listas de 100 preguntas sobre tu tema',
      'Dimostrazione: Experimenta y aprende del error',
      'Sensazione: Observa con todos los sentidos',
      'Sfumato: Abraza la incertidumbre y lo misterioso',
      'Arte/Scienza: Combina análisis con intuición',
      'Corporalità: Cuida tu cuerpo para nutrir tu mente',
      'Connessione: Busca patrones y conexiones ocultas',
    ],
    prompts: [
      '100 preguntas curiosas sobre TEMA',
      'Lo que aprendí experimentando con TEMA',
      'TEMA visto con los 5 sentidos',
      'Abrazando el misterio de TEMA',
      'TEMA: Donde el arte encuentra la ciencia',
      'Las conexiones ocultas de TEMA con todo',
    ],
    color: 'from-rose-600 to-orange-500',
  },
  {
    id: 'aristotle',
    name: 'Retórica de Aristóteles',
    emoji: '📜',
    creator: 'Aristóteles',
    year: '384-322 a.C.',
    era: 'ancient',
    description: 'El filósofo griego definió los 3 pilares de la persuasión: Ethos (credibilidad), Pathos (emoción) y Logos (lógica). También creó el sistema de categorías para analizar cualquier tema desde 10 perspectivas diferentes.',
    howTo: [
      'Ethos: Establece tu credibilidad y autoridad',
      'Pathos: Conecta emocionalmente con tu audiencia',
      'Logos: Usa datos, hechos y argumentos lógicos',
      'Analiza: Sustancia, cantidad, cualidad, relación',
      'Examina: Lugar, tiempo, posición, estado',
      'Considera: Acción y pasión (causa y efecto)',
    ],
    prompts: [
      'Por qué deberías confiar en mi sobre TEMA (Ethos)',
      'La historia emocional detrás de TEMA (Pathos)',
      'Los datos que prueban todo sobre TEMA (Logos)',
      'TEMA analizado desde 10 categorías',
      'El arte de persuadir hablando de TEMA',
      'Cómo convencer a cualquiera sobre TEMA',
    ],
    color: 'from-blue-700 to-indigo-500',
  },
  {
    id: 'archimedes',
    name: 'Método Eureka',
    emoji: '💡',
    creator: 'Arquímedes',
    year: '287-212 a.C.',
    era: 'ancient',
    description: 'El genio griego descubrió principios revolucionarios cuando dejó de pensar activamente en el problema. La técnica consiste en sumergirse profundamente en un problema, luego alejarse completamente para que el subconsciente trabaje.',
    howTo: [
      'Sumérgete totalmente en el problema',
      'Estudia cada aspecto obsesivamente',
      'Llega al punto de frustración',
      'Aléjate completamente (baño, paseo, siesta)',
      'Deja que tu subconsciente procese',
      'Mantente alerta al momento "¡Eureka!"',
    ],
    prompts: [
      'El momento Eureka que cambió TEMA',
      'Lo que descubrí cuando dejé de pensar en TEMA',
      'Insights inesperados sobre TEMA',
      'La solución que llegó en la ducha sobre TEMA',
      'Cuando la respuesta de TEMA apareció sola',
      'El poder del descanso para entender TEMA',
    ],
    color: 'from-cyan-600 to-teal-500',
  },
  {
    id: 'sunzi',
    name: 'Estrategia de Sun Tzu',
    emoji: '⚔️',
    creator: 'Sun Tzu',
    year: '544-496 a.C.',
    era: 'ancient',
    description: 'El estratega chino escribió "El Arte de la Guerra", con principios aplicables a cualquier desafío: conoce a tu enemigo y a ti mismo, la mejor victoria es ganar sin luchar, sé como el agua que se adapta.',
    howTo: [
      'Conócete a ti mismo profundamente',
      'Conoce tu "campo de batalla" (contexto)',
      'Busca ganar sin conflicto directo',
      'Sé flexible como el agua',
      'Usa la sorpresa y lo inesperado',
      'Convierte debilidades en fortalezas',
    ],
    prompts: [
      'Conoce a tu enemigo: Los obstáculos de TEMA',
      'Ganar sin luchar: El enfoque pacífico de TEMA',
      'Sé como el agua: Adaptándote a TEMA',
      'La estrategia definitiva para dominar TEMA',
      'El Arte de la Guerra aplicado a TEMA',
      'Tácticas ancestrales para conquistar TEMA',
    ],
    color: 'from-red-700 to-rose-600',
  },
  {
    id: 'plato',
    name: 'Dialéctica Platónica',
    emoji: '🔮',
    creator: 'Platón',
    year: '428-348 a.C.',
    era: 'ancient',
    description: 'El método de Platón busca la verdad a través del diálogo entre tesis opuestas. Confrontar ideas contrarias para llegar a una síntesis superior. También usaba alegorías y mitos para explicar conceptos complejos.',
    howTo: [
      'Presenta una tesis (afirmación inicial)',
      'Busca la antítesis (posición contraria)',
      'Examina ambas posiciones honestamente',
      'Encuentra la síntesis (verdad superior)',
      'Usa alegorías para clarificar ideas',
      'Asciende de lo particular a lo universal',
    ],
    prompts: [
      'TEMA: Dos perspectivas opuestas',
      'La alegoría de la caverna aplicada a TEMA',
      'Lo que el mundo ideal nos dice sobre TEMA',
      'Tesis vs Antítesis: El debate de TEMA',
      'La síntesis: Reconciliando ideas sobre TEMA',
      'La verdad oculta detrás de TEMA',
    ],
    color: 'from-purple-700 to-violet-500',
  },
  {
    id: 'confucius',
    name: 'Sabiduría Confuciana',
    emoji: '☯️',
    creator: 'Confucio',
    year: '551-479 a.C.',
    era: 'ancient',
    description: 'El filósofo chino enseñaba a través de analogías, historias y el estudio de los clásicos. Enfatizaba la reflexión constante, el aprendizaje de los maestros, y la práctica virtuosa.',
    howTo: [
      'Estudia a los maestros del pasado',
      'Reflexiona constantemente sobre lo aprendido',
      'Usa analogías para explicar conceptos',
      'Practica lo que predicas',
      'Busca el equilibrio (el Camino Medio)',
      'Enseña a otros para aprender mejor',
    ],
    prompts: [
      'Lo que los antiguos sabían sobre TEMA',
      'Lecciones de los maestros aplicadas a TEMA',
      'El camino medio en TEMA',
      'Analogías poderosas para entender TEMA',
      'La sabiduría eterna de TEMA',
      'Reflexiones profundas sobre TEMA',
    ],
    color: 'from-emerald-700 to-green-500',
  },
  {
    id: 'maieutics',
    name: 'Mayéutica',
    emoji: '🤰',
    creator: 'Sócrates',
    year: '470-399 a.C.',
    era: 'ancient',
    description: 'Sócrates comparaba su método con el oficio de su madre (partera). Así como ella ayudaba a dar a luz bebés, él ayudaba a "dar a luz" ideas que ya estaban dentro de las personas.',
    howTo: [
      'El conocimiento ya está dentro de ti',
      'Haz preguntas que revelen lo que ya sabes',
      'Guía sin dar respuestas directas',
      'Ayuda a otros a descubrir por sí mismos',
      'Elimina falsas creencias con preguntas',
      'Celebra cada "nacimiento" de una idea',
    ],
    prompts: [
      'Lo que ya sabías sobre TEMA (pero no lo notabas)',
      'Descubriendo la verdad interior sobre TEMA',
      'Las respuestas sobre TEMA estaban en ti',
      'El parto de ideas: Naciendo en TEMA',
      'Lo que tu intuición dice sobre TEMA',
      'Despertando el conocimiento dormido de TEMA',
    ],
    color: 'from-pink-600 to-fuchsia-500',
  },

  // ========== TÉCNICAS MODERNAS ==========
  {
    id: 'scamper',
    name: 'SCAMPER',
    emoji: '🔄',
    creator: 'Bob Eberle',
    year: '1971',
    era: 'modern',
    description: 'Técnica que usa 7 verbos para transformar ideas: Sustituir, Combinar, Adaptar, Modificar, Poner otros usos, Eliminar, Reorganizar.',
    howTo: [
      'S - Sustituir: ¿Qué puedes reemplazar?',
      'C - Combinar: ¿Qué puedes mezclar?',
      'A - Adaptar: ¿Qué puedes ajustar?',
      'M - Modificar: ¿Qué puedes cambiar?',
      'P - Poner otros usos: ¿Para qué más sirve?',
      'E - Eliminar: ¿Qué puedes quitar?',
      'R - Reorganizar: ¿Qué pasa si lo inviertes?',
    ],
    prompts: [
      '¿Qué pasaría si sustituyo TEMA por algo inesperado?',
      'Combinando TEMA con otra disciplina',
      'TEMA adaptado para principiantes',
      'La versión EXTREMA de TEMA',
      'Usos inesperados de TEMA',
      'TEMA minimalista: Solo lo esencial',
      'TEMA al revés: El enfoque contrario',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'six-hats',
    name: 'Los 6 Sombreros',
    emoji: '🎩',
    creator: 'Edward de Bono',
    year: '1985',
    era: 'modern',
    description: 'Analiza problemas desde 6 perspectivas: datos, emociones, crítica, optimismo, creatividad y organización.',
    howTo: [
      '⚪ Blanco - Datos y hechos objetivos',
      '🔴 Rojo - Emociones e intuiciones',
      '⚫ Negro - Crítica y riesgos',
      '🟡 Amarillo - Optimismo y beneficios',
      '🟢 Verde - Creatividad y alternativas',
      '🔵 Azul - Control y organización',
    ],
    prompts: [
      'Los datos que nadie conoce sobre TEMA',
      'Por qué TEMA me apasiona (emocional)',
      'Los riesgos ocultos de TEMA',
      'El lado brillante de TEMA',
      '5 formas innovadoras de abordar TEMA',
      'Guía paso a paso para dominar TEMA',
    ],
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'brainstorming',
    name: 'Brainstorming',
    emoji: '⚡',
    creator: 'Alex Osborn',
    year: '1948',
    era: 'modern',
    description: 'Genera la mayor cantidad de ideas sin juzgar. La cantidad lleva a la calidad.',
    howTo: [
      'Cantidad sobre calidad',
      'No juzgues ninguna idea',
      'Ideas locas bienvenidas',
      'Construye sobre otras ideas',
      'Mantén el flujo constante',
    ],
    prompts: [
      '50 formas de abordar TEMA',
      'Ideas locas sobre TEMA que podrían funcionar',
      'Lluvia de ideas: TEMA sin filtros',
      'Todas las preguntas sobre TEMA',
      'De lo obvio a lo absurdo: TEMA',
    ],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'five-whys',
    name: 'Los 5 Por Qués',
    emoji: '❓',
    creator: 'Sakichi Toyoda',
    year: '1930s',
    era: 'modern',
    description: 'Llega a la raíz preguntando "¿Por qué?" cinco veces consecutivas.',
    howTo: [
      'Identifica el tema',
      'Pregunta: ¿Por qué es importante?',
      'Toma la respuesta y pregunta ¿Por qué?',
      'Repite hasta llegar a la raíz',
      'La última respuesta es tu ángulo profundo',
    ],
    prompts: [
      'La verdadera razón detrás de TEMA',
      '¿Por qué realmente importa TEMA?',
      'Las 5 capas de TEMA',
      'Más allá de lo superficial: TEMA',
      'El por qué profundo de TEMA',
    ],
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'reverse',
    name: 'Brainstorm Inverso',
    emoji: '🔃',
    creator: 'Técnica clásica',
    year: 'Siglo XX',
    era: 'modern',
    description: 'Piensa en cómo empeorar el problema, luego invierte las ideas para encontrar soluciones.',
    howTo: [
      'Define tu objetivo positivo',
      '¿Cómo garantizarías el fracaso?',
      'Lista formas de empeorar',
      'Invierte cada idea negativa',
      'Las soluciones emergen del contraste',
    ],
    prompts: [
      'Los peores consejos sobre TEMA',
      'Cómo garantizar el fracaso en TEMA',
      'Todo lo que NO debes hacer con TEMA',
      'Anti-guía de TEMA',
      'Si quieres fracasar en TEMA, haz esto',
    ],
    color: 'from-slate-500 to-gray-600',
  },
];

// Categorías
const categories: Category[] = [
  { name: 'Tecnología', emoji: '💻', keywords: ['app', 'software', 'código', 'programar', 'web', 'ia', 'digital'], templates: [] },
  { name: 'Estilo de vida', emoji: '🌟', keywords: ['vida', 'hábito', 'rutina', 'bienestar', 'productividad'], templates: [] },
  { name: 'Finanzas', emoji: '💰', keywords: ['dinero', 'ahorro', 'inversión', 'presupuesto', 'negocio'], templates: [] },
  { name: 'Salud', emoji: '🏃', keywords: ['ejercicio', 'fitness', 'salud', 'nutrición', 'mental'], templates: [] },
  { name: 'Emprendimiento', emoji: '🚀', keywords: ['negocio', 'startup', 'emprender', 'marketing', 'vender'], templates: [] },
  { name: 'Creatividad', emoji: '🎨', keywords: ['arte', 'diseño', 'crear', 'escribir', 'contenido'], templates: [] },
  { name: 'Educación', emoji: '📚', keywords: ['aprender', 'estudiar', 'curso', 'libro', 'conocimiento'], templates: [] },
  { name: 'Relaciones', emoji: '❤️', keywords: ['amor', 'pareja', 'familia', 'amigo', 'comunicación'], templates: [] },
];

// Ideas predefinidas
const predefinedIdeas: Record<string, string[]> = {
  'Tecnología': ['Los 10 gadgets que cambiarán tu vida', 'Cómo la IA está transformando el trabajo', 'Aprende a programar desde cero', 'Las mejores apps para productividad', 'Ciberseguridad: Protege tu información'],
  'Estilo de vida': ['Hábitos matutinos de personas exitosas', 'Cómo crear una rutina de autocuidado', 'Minimalismo: Menos es más', 'Productividad trabajando desde casa', 'El arte de decir no'],
  'Finanzas': ['Cómo crear tu primer presupuesto', 'Inversiones para principiantes', '10 formas de ingresos pasivos', 'Errores financieros comunes', 'Side hustles que puedes empezar hoy'],
  'Salud': ['Ejercicios de 15 minutos', 'Alimentos que mejoran tu concentración', 'Cómo dormir mejor', 'Meditación para principiantes', 'El poder de caminar 30 minutos'],
  'Emprendimiento': ['Valida tu idea de negocio en una semana', 'Marketing con bajo presupuesto', 'Fracasos que llevaron al éxito', 'Consigue tus primeros 100 clientes', 'Personal branding efectivo'],
  'Creatividad': ['Cómo superar el bloqueo creativo', 'Ejercicios diarios de creatividad', 'El proceso creativo de artistas famosos', 'Encuentra tu estilo único', 'Convierte tu hobby en negocio'],
  'Educación': ['Aprende cualquier cosa más rápido', 'Los mejores cursos online gratuitos', 'Técnicas de estudio con ciencia', 'Aprende un idioma en 6 meses', 'Mentalidad de crecimiento'],
  'Relaciones': ['Comunicación efectiva en pareja', 'Cómo hacer amigos de adulto', 'Establecer límites con la familia', 'Networking genuino', 'Relaciones a distancia que funcionan'],
};

// Funciones auxiliares
const generateId = () => Math.random().toString(36).substring(2, 11);

const detectCategory = (text: string): Category => {
  const lowerText = text.toLowerCase();
  for (const category of categories) {
    for (const keyword of category.keywords) {
      if (lowerText.includes(keyword)) return category;
    }
  }
  return categories[Math.floor(Math.random() * categories.length)];
};

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [userInput, setUserInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'generate' | 'techniques' | 'reflection'>('generate');
  const [techniqueFilter, setTechniqueFilter] = useState<'all' | 'ancient' | 'modern'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<CreativityTechnique | null>(null);
  const [techniqueInput, setTechniqueInput] = useState('');
  const [generatedFromTechnique, setGeneratedFromTechnique] = useState<{text: string; description: string}[]>([]);
  const [expandedIdeaId, setExpandedIdeaId] = useState<string | null>(null);
  
  // Estados para Reflexión
  const [selectedFramework, setSelectedFramework] = useState<ReflectionFramework | null>(null);
  const [reflectionTopic, setReflectionTopic] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [savedReflections, setSavedReflections] = useState<{question: string; answer: string; framework: string; topic: string}[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<{[key: number]: string}>({});

  // Cargar y guardar ideas
  useEffect(() => {
    try {
      const saved = localStorage.getItem('blog-ideas-v4');
      if (saved) setIdeas(JSON.parse(saved));
      const savedRef = localStorage.getItem('blog-reflections-v1');
      if (savedRef) setSavedReflections(JSON.parse(savedRef));
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('blog-ideas-v4', JSON.stringify(ideas));
    } catch (e) { console.error(e); }
  }, [ideas]);

  useEffect(() => {
    try {
      localStorage.setItem('blog-reflections-v1', JSON.stringify(savedReflections));
    } catch (e) { console.error(e); }
  }, [savedReflections]);

  const generateRandomIdea = (categoryName?: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      const category = categoryName ? categories.find(c => c.name === categoryName) || categories[0] : categories[Math.floor(Math.random() * categories.length)];
      const categoryIdeas = predefinedIdeas[category.name] || [];
      const randomIdea = categoryIdeas[Math.floor(Math.random() * categoryIdeas.length)];
      if (randomIdea) {
        const newIdea: Idea = {
          id: generateId(), text: randomIdea, description: generateCreativeDescription(randomIdea),
          category: category.name, emoji: category.emoji, isFavorite: false,
          createdAt: new Date().toISOString(), isUserIdea: false,
        };
        setIdeas(prev => [newIdea, ...prev]);
        setExpandedIdeaId(newIdea.id);
      }
      setIsGenerating(false);
    }, 500);
  };

  const handleUserIdeaSubmit = () => {
    if (!userInput.trim()) return;
    const category = detectCategory(userInput);
    const newIdea: Idea = {
      id: generateId(), text: userInput, description: generateCreativeDescription(userInput),
      category: category.name, emoji: category.emoji, isFavorite: false,
      createdAt: new Date().toISOString(), isUserIdea: true,
    };
    setIdeas(prev => [newIdea, ...prev]);
    setExpandedIdeaId(newIdea.id);
    setUserInput('');
  };

  const toggleFavorite = (id: string) => {
    setIdeas(prev => prev.map(idea => idea.id === id ? { ...idea, isFavorite: !idea.isFavorite } : idea));
  };

  const deleteIdea = (id: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  const generateWithTechnique = () => {
    if (!selectedTechnique || !techniqueInput.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const generated = selectedTechnique.prompts.map(prompt => {
        const text = prompt.replace(/TEMA/g, techniqueInput);
        return { text, description: generateCreativeDescription(text) };
      });
      setGeneratedFromTechnique(generated);
      setIsGenerating(false);
    }, 500);
  };

  const addTechniqueIdea = (text: string, description: string) => {
    const category = detectCategory(text);
    const newIdea: Idea = {
      id: generateId(), text, description, category: category.name, emoji: category.emoji,
      isFavorite: false, createdAt: new Date().toISOString(), isUserIdea: false, technique: selectedTechnique?.name,
    };
    setIdeas(prev => [newIdea, ...prev]);
  };

  // Funciones de Reflexión
  const generateReflectionQuestions = () => {
    if (!selectedFramework || !reflectionTopic.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const questions = selectedFramework.questions.map(q => q.replace(/TEMA/g, reflectionTopic));
      setGeneratedQuestions(questions);
      setCurrentAnswer({});
      setIsGenerating(false);
    }, 300);
  };

  const saveReflection = (index: number, question: string) => {
    const answer = currentAnswer[index];
    if (!answer?.trim()) return;
    setSavedReflections(prev => [...prev, {
      question,
      answer,
      framework: selectedFramework?.name || '',
      topic: reflectionTopic,
    }]);
    setCurrentAnswer(prev => ({...prev, [index]: ''}));
  };

  const convertReflectionToIdea = (reflection: {question: string; answer: string; framework: string; topic: string}) => {
    const ideaText = `${reflection.topic}: ${reflection.answer.substring(0, 100)}${reflection.answer.length > 100 ? '...' : ''}`;
    const category = detectCategory(reflection.topic);
    const newIdea: Idea = {
      id: generateId(),
      text: ideaText,
      description: `Reflexión usando ${reflection.framework}:\n\nPregunta: ${reflection.question}\n\nRespuesta: ${reflection.answer}`,
      category: category.name,
      emoji: '🧠',
      isFavorite: false,
      createdAt: new Date().toISOString(),
      isUserIdea: true,
      technique: reflection.framework,
    };
    setIdeas(prev => [newIdea, ...prev]);
    setActiveTab('generate');
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || idea.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredTechniques = creativityTechniques.filter(t => techniqueFilter === 'all' || t.era === techniqueFilter);
  const ancientCount = creativityTechniques.filter(t => t.era === 'ancient').length;
  const modernCount = creativityTechniques.filter(t => t.era === 'modern').length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">💡 Blog Ideas Generator Pro</h1>
              <p className="text-white/70 mt-1">Técnicas de genios + Preguntas de reflexión profunda</p>
            </div>
            <div className="flex gap-3 text-sm">
              <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
                <div className="text-xl font-bold text-white">{ideas.length}</div>
                <div className="text-white/60 text-xs">Ideas</div>
              </div>
              <div className="bg-amber-500/20 rounded-lg px-3 py-2 text-center">
                <div className="text-xl font-bold text-amber-300">{reflectionFrameworks.length}</div>
                <div className="text-amber-200/60 text-xs">Frameworks</div>
              </div>
              <div className="bg-cyan-500/20 rounded-lg px-3 py-2 text-center">
                <div className="text-xl font-bold text-cyan-300">{savedReflections.length}</div>
                <div className="text-cyan-200/60 text-xs">Reflexiones</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button onClick={() => setActiveTab('generate')}
            className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'generate' ? 'bg-white text-purple-700 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            🎲 Generador
          </button>
          <button onClick={() => setActiveTab('techniques')}
            className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'techniques' ? 'bg-white text-purple-700 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            🧠 Técnicas ({creativityTechniques.length})
          </button>
          <button onClick={() => setActiveTab('reflection')}
            className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${activeTab === 'reflection' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            🚀 Reflexión Profunda
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">NUEVO</span>
          </button>
        </div>

        {/* Tab: Generador */}
        {activeTab === 'generate' && (
          <>
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">✍️ Escribe tu idea</h2>
              <div className="flex flex-col md:flex-row gap-3">
                <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUserIdeaSubmit()}
                  placeholder="Ej: Quiero escribir sobre productividad..."
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-gray-800 text-lg" />
                <button onClick={handleUserIdeaSubmit} disabled={!userInput.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50">
                  🚀 Generar
                </button>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎲 Categorías</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {categories.map((category) => (
                  <button key={category.name} onClick={() => generateRandomIdea(category.name)} disabled={isGenerating}
                    className="p-4 rounded-xl text-left transition-all transform hover:scale-105 bg-gray-100 hover:bg-gray-200 text-gray-700">
                    <span className="text-2xl">{category.emoji}</span>
                    <p className="font-semibold mt-1 text-sm">{category.name}</p>
                  </button>
                ))}
              </div>
              <div className="text-center">
                <button onClick={() => generateRandomIdea()} disabled={isGenerating}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  {isGenerating ? '⚙️...' : '🎰 ¡Sorpréndeme!'}
                </button>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6">
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="🔍 Buscar..." className="flex-1 px-4 py-2 rounded-lg border border-gray-200" />
                <select value={selectedCategory || ''} onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white">
                  <option value="">Todas</option>
                  {categories.map(cat => <option key={cat.name} value={cat.name}>{cat.emoji} {cat.name}</option>)}
                </select>
              </div>

              {filteredIdeas.length > 0 ? (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {filteredIdeas.map((idea) => (
                    <div key={idea.id} className={`p-4 rounded-xl border-2 ${idea.isUserIdea ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} ${idea.isFavorite ? 'ring-2 ring-yellow-400' : ''}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span>{idea.emoji}</span>
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">{idea.category}</span>
                            {idea.technique && <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">{idea.technique}</span>}
                          </div>
                          <p className="text-gray-800 font-semibold">{idea.text}</p>
                          <button onClick={() => setExpandedIdeaId(expandedIdeaId === idea.id ? null : idea.id)}
                            className="mt-2 text-sm text-purple-600 hover:text-purple-800 font-medium">
                            {expandedIdeaId === idea.id ? '▼ Ocultar' : '▶ Ver'} desarrollo
                          </button>
                          {expandedIdeaId === idea.id && (
                            <div className="mt-2 p-3 bg-purple-50 rounded-lg border border-purple-100">
                              <p className="text-gray-700 text-sm whitespace-pre-wrap">{idea.description}</p>
                              <p className="text-xs text-gray-400 mt-1">{idea.description.length} caracteres</p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <button onClick={() => toggleFavorite(idea.id)} className={`p-2 rounded-lg ${idea.isFavorite ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'}`}>
                            {idea.isFavorite ? '⭐' : '☆'}
                          </button>
                          <button onClick={() => deleteIdea(idea.id)} className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500">🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-6xl mb-4">💭</div>
                  <p>No hay ideas todavía</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Tab: Técnicas */}
        {activeTab === 'techniques' && (
          <>
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🧠 Técnicas de Creatividad</h2>
              <p className="text-gray-600 mb-4">Desde Sócrates hasta Edward de Bono: las mejores técnicas de la historia.</p>
              
              {/* Filtros de era */}
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setTechniqueFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${techniqueFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  📚 Todas ({creativityTechniques.length})
                </button>
                <button onClick={() => setTechniqueFilter('ancient')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${techniqueFilter === 'ancient' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  🏛️ Antiguas ({ancientCount})
                </button>
                <button onClick={() => setTechniqueFilter('modern')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${techniqueFilter === 'modern' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  ⚡ Modernas ({modernCount})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {filteredTechniques.map((technique) => (
                <div key={technique.id} onClick={() => { setSelectedTechnique(technique); setGeneratedFromTechnique([]); }}
                  className={`bg-white/95 rounded-2xl shadow-lg p-5 cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] ${selectedTechnique?.id === technique.id ? 'ring-4 ring-purple-500' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${technique.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {technique.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-800 text-lg">{technique.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${technique.era === 'ancient' ? 'bg-amber-100 text-amber-700' : 'bg-cyan-100 text-cyan-700'}`}>
                          {technique.era === 'ancient' ? '🏛️ Antigua' : '⚡ Moderna'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{technique.creator} • {technique.year}</p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{technique.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedTechnique && (
              <div className="bg-white/95 rounded-2xl shadow-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedTechnique.color} flex items-center justify-center text-3xl`}>
                    {selectedTechnique.emoji}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedTechnique.name}</h2>
                    <p className="text-gray-500">{selectedTechnique.creator} • {selectedTechnique.year}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{selectedTechnique.description}</p>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h3 className="font-bold text-gray-800 mb-2">📋 Cómo aplicarla:</h3>
                  <ul className="space-y-1">
                    {selectedTechnique.howTo.map((step, i) => (
                      <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
                        <span className="text-purple-500 font-bold">{i + 1}.</span> {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mb-4">
                  <input type="text" value={techniqueInput} onChange={(e) => setTechniqueInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && generateWithTechnique()}
                    placeholder="Escribe tu tema..."
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none" />
                  <button onClick={generateWithTechnique} disabled={!techniqueInput.trim() || isGenerating}
                    className={`px-6 py-3 bg-gradient-to-r ${selectedTechnique.color} text-white font-bold rounded-xl disabled:opacity-50`}>
                    {isGenerating ? '⚙️...' : '🚀 Aplicar'}
                  </button>
                </div>

                {generatedFromTechnique.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-800">✨ Ideas generadas:</h3>
                    {generatedFromTechnique.map((idea, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{idea.text}</p>
                            <p className="text-sm text-gray-600 mt-2">{idea.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{idea.description.length} caracteres</p>
                          </div>
                          <button onClick={() => addTechniqueIdea(idea.text, idea.description)}
                            className="px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600">
                            + Guardar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Info histórica */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-xl mb-2">🏛️ Sabiduría Ancestral</h3>
              <p>Los grandes pensadores de la antigüedad desarrollaron técnicas que siguen siendo relevantes hoy. Desde el Método Socrático de preguntas hasta los 7 principios de Leonardo da Vinci, estas herramientas han sido usadas por genios durante milenios.</p>
            </div>
          </>
        )}

        {/* Tab: Reflexión Profunda - NUEVO */}
        {activeTab === 'reflection' && (
          <>
            {/* Header del módulo */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl shadow-2xl p-6 mb-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
                  🧠
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">Preguntas de Reflexión Profunda</h2>
                  <p className="text-white/80">Los frameworks mentales de Elon Musk, Jeff Bezos, Charlie Munger y más</p>
                </div>
              </div>
              <p className="text-white/90">
                No te damos títulos. Te damos las <strong>preguntas que te harán pensar</strong> como los grandes innovadores.
                Responde estas preguntas y tus propias ideas emergerán con autenticidad y profundidad.
              </p>
            </div>

            {/* Grid de Frameworks */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Elige un Framework Mental</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reflectionFrameworks.map((framework) => (
                  <div 
                    key={framework.id}
                    onClick={() => { setSelectedFramework(framework); setGeneratedQuestions([]); setReflectionTopic(''); }}
                    className={`p-5 rounded-xl cursor-pointer transition-all hover:shadow-lg border-2 ${
                      selectedFramework?.id === framework.id 
                        ? 'border-orange-500 bg-orange-50 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${framework.color} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}>
                        {framework.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 text-lg leading-tight">{framework.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{framework.creator}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {framework.usedBy.slice(0, 3).map((person, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                              {person}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{framework.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Framework Seleccionado */}
            {selectedFramework && (
              <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedFramework.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {selectedFramework.emoji}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedFramework.name}</h2>
                    <p className="text-gray-500">{selectedFramework.creator}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedFramework.usedBy.map((person, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700 rounded-full font-medium">
                          👤 {person}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-gray-700">{selectedFramework.description}</p>
                </div>

                {/* Input de tema */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    📝 ¿Sobre qué tema quieres reflexionar?
                  </label>
                  <div className="flex flex-col md:flex-row gap-3">
                    <input 
                      type="text" 
                      value={reflectionTopic}
                      onChange={(e) => setReflectionTopic(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && generateReflectionQuestions()}
                      placeholder="Ej: emprender un negocio, cambiar de carrera, aprender a programar..."
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-lg"
                    />
                    <button 
                      onClick={generateReflectionQuestions}
                      disabled={!reflectionTopic.trim() || isGenerating}
                      className={`px-6 py-3 bg-gradient-to-r ${selectedFramework.color} text-white font-bold rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity`}
                    >
                      {isGenerating ? '⚙️ Generando...' : '🚀 Generar Preguntas'}
                    </button>
                  </div>
                </div>

                {/* Preguntas Generadas */}
                {generatedQuestions.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 text-xl flex items-center gap-2">
                      ✨ Preguntas para reflexionar sobre "{reflectionTopic}"
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Responde cada pregunta con honestidad. Tus respuestas se convertirán en contenido auténtico.
                    </p>
                    
                    {generatedQuestions.map((question, i) => (
                      <div key={i} className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border-2 border-gray-100">
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedFramework.color} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                            {i + 1}
                          </span>
                          <p className="text-gray-800 font-medium text-lg leading-relaxed">{question}</p>
                        </div>
                        
                        <textarea
                          value={currentAnswer[i] || ''}
                          onChange={(e) => setCurrentAnswer(prev => ({...prev, [i]: e.target.value}))}
                          placeholder="Escribe tu reflexión aquí... Sé honesto y profundo."
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:outline-none resize-none text-gray-700"
                          rows={3}
                        />
                        
                        {currentAnswer[i]?.trim() && (
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs text-gray-400">{currentAnswer[i]?.length || 0} caracteres</span>
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

            {/* Reflexiones Guardadas */}
            {savedReflections.length > 0 && (
              <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  💎 Tus Reflexiones Guardadas ({savedReflections.length})
                </h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {savedReflections.map((ref, i) => (
                    <div key={i} className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl border border-orange-200">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                          {ref.framework}
                        </span>
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                          {ref.topic}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2 italic">"{ref.question}"</p>
                      <p className="text-gray-800">{ref.answer}</p>
                      <div className="flex justify-end mt-3">
                        <button
                          onClick={() => convertReflectionToIdea(ref)}
                          className="px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition-colors"
                        >
                          📝 Convertir en Idea de Blog
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quote inspiracional */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="text-4xl">"</div>
                <div>
                  <p className="text-lg italic mb-3">
                    "I think it's very important to have a feedback loop, where you're constantly thinking about what you've done and how you could be doing it better."
                  </p>
                  <p className="text-white/60 font-medium">— Elon Musk</p>
                </div>
              </div>
            </div>
          </>
        )}

        <p className="text-center text-white/60 mt-8 pb-8">Hecho con 💜 en VibeCoding Bootcamp • Powered by First Principles Thinking</p>
      </div>
    </main>
  );
}
