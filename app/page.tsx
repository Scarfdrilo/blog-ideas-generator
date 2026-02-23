'use client';

import { useState, useEffect } from 'react';

// Tipos
interface Idea {
  id: string;
  text: string;
  category: string;
  emoji: string;
  isFavorite: boolean;
  createdAt: Date;
  isUserIdea: boolean;
  technique?: string;
}

interface Category {
  name: string;
  emoji: string;
  keywords: string[];
  templates: string[];
  expansions: string[];
}

interface CreativityTechnique {
  id: string;
  name: string;
  emoji: string;
  creator: string;
  year: string;
  description: string;
  howTo: string[];
  exercise: string;
  prompts: string[];
  color: string;
}

// Técnicas de creatividad históricas
const creativityTechniques: CreativityTechnique[] = [
  {
    id: 'scamper',
    name: 'SCAMPER',
    emoji: '🔄',
    creator: 'Bob Eberle (basado en Alex Osborn)',
    year: '1971',
    description: 'Técnica que usa 7 verbos de acción para transformar ideas existentes en algo nuevo. Cada letra representa una forma diferente de modificar tu concepto.',
    howTo: [
      'S - Sustituir: ¿Qué puedes reemplazar?',
      'C - Combinar: ¿Qué puedes mezclar o fusionar?',
      'A - Adaptar: ¿Qué puedes ajustar o modificar?',
      'M - Modificar/Magnificar: ¿Qué puedes agrandar o cambiar?',
      'P - Poner otros usos: ¿Para qué más sirve?',
      'E - Eliminar: ¿Qué puedes quitar o simplificar?',
      'R - Reorganizar/Revertir: ¿Qué pasa si lo inviertes?',
    ],
    exercise: 'Toma tu idea de blog y aplica cada letra del SCAMPER para generar 7 variaciones diferentes.',
    prompts: [
      '¿Qué pasaría si sustituyo [tema] por [algo inesperado]?',
      'Combinando [tema A] + [tema B]: Una perspectiva única',
      '[Tema] adaptado para [audiencia diferente]',
      'La versión EXTREMA de [tu tema]',
      '10 usos inesperados de [concepto]',
      '[Tema] minimalista: Solo lo esencial',
      '[Tema] al revés: El enfoque contrario',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'six-hats',
    name: 'Los 6 Sombreros',
    emoji: '🎩',
    creator: 'Edward de Bono',
    year: '1985',
    description: 'Método para analizar problemas desde 6 perspectivas diferentes, cada una representada por un color de sombrero.',
    howTo: [
      '⚪ Blanco - Datos y hechos objetivos',
      '🔴 Rojo - Emociones e intuiciones',
      '⚫ Negro - Crítica y riesgos',
      '🟡 Amarillo - Optimismo y beneficios',
      '🟢 Verde - Creatividad y alternativas',
      '🔵 Azul - Control y organización',
    ],
    exercise: 'Analiza tu tema de blog usando cada sombrero. Escribe un párrafo desde cada perspectiva.',
    prompts: [
      'Los datos que nadie conoce sobre [tema]',
      'Por qué [tema] me apasiona (perspectiva emocional)',
      'Los riesgos ocultos de [tema]',
      'El lado brillante de [tema]',
      '5 formas innovadoras de abordar [tema]',
      'Guía paso a paso para dominar [tema]',
    ],
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'mind-mapping',
    name: 'Mind Mapping',
    emoji: '🧠',
    creator: 'Tony Buzan',
    year: '1970s',
    description: 'Técnica visual que organiza ideas alrededor de un concepto central, creando ramas de asociaciones y conexiones.',
    howTo: [
      'Escribe tu idea central en el centro',
      'Dibuja ramas principales con temas relacionados',
      'Añade sub-ramas con detalles específicos',
      'Usa colores, imágenes y palabras clave',
      'Conecta ideas que se relacionen entre sí',
    ],
    exercise: 'Crea un mapa mental de tu tema expandiendo en al menos 5 direcciones diferentes.',
    prompts: [
      'Todo lo que se conecta con [tema]: Un mapa completo',
      'Las 5 dimensiones de [tema]',
      '[Tema] y sus conexiones inesperadas',
      'De [concepto central] a [destino]: El camino completo',
      'El universo de [tema]: Explorando cada rama',
    ],
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 'disney-method',
    name: 'Método Disney',
    emoji: '🏰',
    creator: 'Walt Disney / Robert Dilts',
    year: '1994 (documentado)',
    description: 'Walt Disney usaba 3 salas diferentes para crear: una para soñar, otra para planificar, y otra para criticar.',
    howTo: [
      '🌟 El Soñador - Imagina sin límites, todo es posible',
      '📋 El Realista - Planifica cómo hacerlo realidad',
      '🔍 El Crítico - Evalúa problemas y mejoras',
    ],
    exercise: 'Pasa tu idea por las 3 fases: primero sueña en grande, luego planifica, finalmente critica constructivamente.',
    prompts: [
      'Si no hubiera límites: [tema] en su máxima expresión',
      'El plan paso a paso para [objetivo ambicioso]',
      'Análisis honesto: ¿Qué podría salir mal con [tema]?',
      'De la fantasía a la realidad: [idea loca] hecha posible',
      'Soñar, planificar, ejecutar: Tu guía de [tema]',
    ],
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'lateral-thinking',
    name: 'Pensamiento Lateral',
    emoji: '↗️',
    creator: 'Edward de Bono',
    year: '1967',
    description: 'Resolver problemas usando enfoques indirectos y creativos, evitando el pensamiento lógico tradicional.',
    howTo: [
      'Cuestiona las suposiciones básicas',
      'Busca alternativas aunque tengas una solución',
      'Usa provocaciones absurdas como punto de partida',
      'Invierte el problema: ¿Cómo lo empeorarías?',
      'Busca analogías en campos completamente diferentes',
    ],
    exercise: 'Toma tu tema y pregúntate: "¿Y si lo opuesto fuera verdad?"',
    prompts: [
      '¿Y si [creencia común] estuviera completamente equivocada?',
      'El enfoque contraintuitivo para [tema]',
      'Lo que [industria diferente] nos enseña sobre [tu tema]',
      'Rompiendo las reglas de [campo]: Un nuevo paradigma',
      '¿Qué pasaría si [premisa absurda]?',
    ],
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'brainstorming',
    name: 'Brainstorming',
    emoji: '⚡',
    creator: 'Alex Osborn',
    year: '1948',
    description: 'La técnica original de lluvia de ideas: generar la mayor cantidad posible sin juzgar, la cantidad lleva a la calidad.',
    howTo: [
      'Cantidad sobre calidad - genera muchas ideas',
      'No juzgues - toda idea es válida',
      'Ideas locas bienvenidas - lo absurdo inspira',
      'Construye sobre ideas de otros',
      'Una idea a la vez, manteniendo el flujo',
    ],
    exercise: 'En 5 minutos, escribe 20 ideas relacionadas con tu tema sin detenerte a pensar si son buenas.',
    prompts: [
      '50 formas de abordar [tema]',
      'Ideas locas sobre [tema] que podrían funcionar',
      'Lluvia de ideas: [tema] sin filtros',
      'Todas las preguntas posibles sobre [tema]',
      'De lo obvio a lo absurdo: Explorando [tema]',
    ],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'five-whys',
    name: 'Los 5 Por Qués',
    emoji: '❓',
    creator: 'Sakichi Toyoda (Toyota)',
    year: '1930s',
    description: 'Técnica para llegar a la raíz de cualquier problema o idea preguntando "¿Por qué?" cinco veces consecutivas.',
    howTo: [
      'Identifica el tema o problema',
      'Pregunta: ¿Por qué es importante/sucede?',
      'Toma la respuesta y pregunta ¿Por qué? de nuevo',
      'Repite hasta llegar a la causa raíz',
      'Generalmente en 5 iteraciones llegas al fondo',
    ],
    exercise: 'Pregúntate 5 veces por qué tu tema de blog importa. La última respuesta será tu ángulo más profundo.',
    prompts: [
      'La verdadera razón detrás de [tema]',
      'Llegando a la raíz: ¿Por qué realmente importa [tema]?',
      'Las 5 capas de [problema/tema]',
      'Más allá de lo superficial: Entendiendo [tema]',
      'El por qué profundo de [fenómeno]',
    ],
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'random-input',
    name: 'Estímulo Aleatorio',
    emoji: '🎲',
    creator: 'Edward de Bono',
    year: '1970s',
    description: 'Introducir una palabra o imagen aleatoria y forzar conexiones con tu problema para generar ideas inesperadas.',
    howTo: [
      'Elige una palabra completamente al azar',
      'Lista características de esa palabra',
      'Fuerza conexiones con tu tema original',
      'Las conexiones más forzadas suelen ser las más creativas',
      'Repite con diferentes palabras aleatorias',
    ],
    exercise: 'Abre un diccionario al azar, señala una palabra, y encuentra 3 conexiones con tu tema de blog.',
    prompts: [
      'Lo que [objeto aleatorio] me enseñó sobre [tema]',
      '[Tema] + [concepto random] = Una perspectiva única',
      'Conexiones inesperadas: [tema] y [algo no relacionado]',
      'Si [tema] fuera un [objeto/animal/lugar]...',
      'Metáforas sorprendentes para entender [tema]',
    ],
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 'starbursting',
    name: 'Starbursting',
    emoji: '⭐',
    creator: 'Desarrollado en los 80s',
    year: '1980s',
    description: 'Generar preguntas en lugar de respuestas usando las 6 preguntas fundamentales: Qué, Quién, Dónde, Cuándo, Por qué, Cómo.',
    howTo: [
      '¿QUÉ? - Define el tema claramente',
      '¿QUIÉN? - Identifica a los involucrados',
      '¿DÓNDE? - Ubica el contexto',
      '¿CUÁNDO? - Establece temporalidad',
      '¿POR QUÉ? - Explora motivaciones',
      '¿CÓMO? - Detalla el proceso',
    ],
    exercise: 'Genera 3 preguntas de cada tipo (18 total) sobre tu tema. Cada pregunta puede ser un artículo.',
    prompts: [
      '¿Qué es realmente [tema] y qué no es?',
      '¿Quién debería preocuparse por [tema]?',
      '¿Dónde tiene más impacto [tema]?',
      '¿Cuándo es el mejor momento para [tema]?',
      '¿Por qué [tema] importa ahora más que nunca?',
      '¿Cómo dominar [tema] paso a paso?',
    ],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'reverse-brainstorm',
    name: 'Brainstorm Inverso',
    emoji: '🔃',
    creator: 'Técnica clásica de creatividad',
    year: 'Tradicional',
    description: 'En lugar de resolver el problema, piensa en cómo empeorarlo. Luego invierte esas ideas para encontrar soluciones.',
    howTo: [
      'Define tu objetivo positivo',
      'Invierte: ¿Cómo podrías garantizar el fracaso?',
      'Lista todas las formas de empeorar la situación',
      'Invierte cada idea negativa en positiva',
      'Las soluciones más creativas emergen del contraste',
    ],
    exercise: 'Lista 10 formas de hacer el PEOR blog sobre tu tema. Invierte cada una para crear el mejor.',
    prompts: [
      'Los peores consejos sobre [tema] (y qué hacer en su lugar)',
      'Cómo garantizar el fracaso en [área]',
      'Todo lo que NO debes hacer con [tema]',
      'Anti-guía de [tema]: Aprende de los errores',
      'Si quieres fracasar en [tema], haz esto...',
    ],
    color: 'from-slate-500 to-gray-600',
  },
];

// Palabras aleatorias para estímulo
const randomWords = [
  'océano', 'montaña', 'reloj', 'espejo', 'puente', 'semilla', 'fuego', 'nube',
  'laberinto', 'brújula', 'ancla', 'mariposa', 'cristal', 'raíz', 'ola', 'eco',
  'horizonte', 'cascada', 'eclipse', 'tormenta', 'oasis', 'fénix', 'prisma', 'mosaico',
  'catalizador', 'sinfonía', 'alquimia', 'gravitación', 'metamorfosis', 'resonancia'
];

// Base de datos de categorías con plantillas para expandir ideas
const categories: Category[] = [
  { 
    name: 'Tecnología', 
    emoji: '💻',
    keywords: ['app', 'software', 'código', 'programar', 'web', 'móvil', 'ia', 'inteligencia artificial', 'robot', 'digital', 'computadora', 'internet'],
    templates: [
      'Los 10 mejores recursos para aprender sobre {tema}',
      'Cómo {tema} está cambiando el futuro del trabajo',
      'Guía completa para principiantes: {tema}',
      '{tema}: Lo que nadie te cuenta',
      '5 herramientas de {tema} que todo profesional necesita',
      'El impacto de {tema} en la vida cotidiana',
      'Tendencias de {tema} para este año',
      'Errores comunes al trabajar con {tema} y cómo evitarlos',
    ],
    expansions: [
      'Comparativa de las mejores herramientas',
      'Tutorial paso a paso para principiantes',
      'Casos de éxito reales',
      'El futuro de esta tecnología',
      'Cómo monetizar tus conocimientos',
    ]
  },
  { 
    name: 'Estilo de vida', 
    emoji: '🌟',
    keywords: ['vida', 'hábito', 'rutina', 'bienestar', 'felicidad', 'equilibrio', 'mindfulness', 'organización', 'productividad', 'tiempo'],
    templates: [
      'Cómo incorporar {tema} en tu rutina diaria',
      '30 días transformando tu vida con {tema}',
      'La guía definitiva de {tema} para personas ocupadas',
      '{tema}: El secreto de las personas exitosas',
      'Cómo {tema} cambió mi vida (y puede cambiar la tuya)',
      'Mini hábitos de {tema} que hacen gran diferencia',
    ],
    expansions: [
      'Rutina matutina optimizada',
      'Hábitos de fin de semana',
      'Cómo mantener la motivación',
      'Historias de transformación personal',
      'Errores que sabotean tu progreso',
    ]
  },
  { 
    name: 'Finanzas', 
    emoji: '💰',
    keywords: ['dinero', 'ahorro', 'inversión', 'presupuesto', 'deuda', 'ingreso', 'negocio', 'emprender', 'cripto', 'bitcoin'],
    templates: [
      'Cómo empezar a {tema} aunque ganes poco',
      'La verdad sobre {tema} que los expertos no te dicen',
      '{tema}: Guía paso a paso para principiantes',
      '7 estrategias de {tema} para este año',
      'Errores de {tema} que te están costando dinero',
      'Cómo automatizar tu {tema}',
    ],
    expansions: [
      'Estrategias para diferentes niveles de ingreso',
      'Herramientas y apps recomendadas',
      'Casos de estudio reales',
      'Plan de acción de 90 días',
      'Mitos vs realidad',
    ]
  },
  { 
    name: 'Salud y Bienestar', 
    emoji: '🏃',
    keywords: ['ejercicio', 'fitness', 'salud', 'nutrición', 'dieta', 'dormir', 'mental', 'estrés', 'ansiedad', 'meditación', 'yoga'],
    templates: [
      '{tema} para personas que odian {tema}',
      'La ciencia detrás de {tema}',
      'Cómo empezar con {tema} sin abrumarte',
      '{tema}: Mitos que debes dejar de creer',
      'Rutina de {tema} de 15 minutos para ocupados',
      'Cómo {tema} mejora tu productividad',
    ],
    expansions: [
      'Rutinas para diferentes objetivos',
      'Lo que dice la ciencia más reciente',
      'Errores comunes y cómo corregirlos',
      'Testimonios y resultados reales',
      'Guía de equipamiento esencial',
    ]
  },
  { 
    name: 'Emprendimiento', 
    emoji: '🚀',
    keywords: ['negocio', 'startup', 'emprender', 'cliente', 'vender', 'marketing', 'marca', 'producto', 'servicio', 'freelance'],
    templates: [
      'Cómo validar tu idea de {tema} en una semana',
      '{tema}: De cero a tus primeros 1000 dólares',
      'Los errores más caros en {tema} (y cómo evitarlos)',
      'Cómo escalar tu {tema} sin perder calidad',
      '{tema} con bajo presupuesto: Guía práctica',
      'El framework que uso para {tema}',
    ],
    expansions: [
      'Estrategias de marketing de bajo costo',
      'Cómo conseguir los primeros clientes',
      'Automatización y sistemas',
      'Historias de emprendedores exitosos',
      'Recursos y herramientas gratuitas',
    ]
  },
  { 
    name: 'Creatividad', 
    emoji: '🎨',
    keywords: ['arte', 'diseño', 'crear', 'escribir', 'música', 'foto', 'video', 'contenido', 'inspiración', 'creatividad'],
    templates: [
      'Cómo encontrar inspiración para {tema}',
      'El proceso creativo detrás de {tema}',
      '{tema}: Ejercicios diarios para mejorar',
      'Cómo superar el bloqueo en {tema}',
      'Herramientas gratuitas para {tema}',
      'Convierte tu pasión por {tema} en ingresos',
    ],
    expansions: [
      'Técnicas de los profesionales',
      'Retos creativos de 30 días',
      'Cómo desarrollar tu estilo único',
      'Portafolio y presencia online',
      'Colaboraciones y comunidad',
    ]
  },
  { 
    name: 'Educación', 
    emoji: '📚',
    keywords: ['aprender', 'estudiar', 'curso', 'libro', 'conocimiento', 'universidad', 'carrera', 'habilidad', 'idioma'],
    templates: [
      'Cómo aprender {tema} de forma autodidacta',
      'Los mejores recursos gratuitos para {tema}',
      '{tema}: Plan de estudio de 3 meses',
      'Técnicas de memorización para {tema}',
      'Cómo mantenerse motivado aprendiendo {tema}',
      'De principiante a experto en {tema}',
    ],
    expansions: [
      'Mejores cursos online gratuitos y de pago',
      'Libros esenciales sobre el tema',
      'Comunidades y grupos de estudio',
      'Proyectos prácticos para aplicar',
      'Certificaciones que valen la pena',
    ]
  },
  { 
    name: 'Relaciones', 
    emoji: '❤️',
    keywords: ['amor', 'pareja', 'familia', 'amigo', 'comunicación', 'relación', 'social', 'networking', 'conexión'],
    templates: [
      'Cómo mejorar la comunicación sobre {tema}',
      '{tema}: Lo que aprendí después de años',
      'Señales de alerta en {tema}',
      'Cómo establecer límites saludables en {tema}',
      '{tema} en la era digital',
      'Conversaciones difíciles sobre {tema}',
    ],
    expansions: [
      'Ejercicios prácticos de comunicación',
      'Libros recomendados sobre el tema',
      'Cuándo buscar ayuda profesional',
      'Historias personales y lecciones',
      'Preguntas para reflexionar',
    ]
  },
];

// Ideas predefinidas por categoría
const predefinedIdeas: Record<string, string[]> = {
  'Tecnología': [
    'Los 10 gadgets que cambiarán tu vida este año',
    'Cómo la IA está transformando el trabajo remoto',
    'Guía para principiantes: Aprende a programar desde cero',
    '5 apps que todo emprendedor necesita',
    'El futuro de la realidad virtual: ¿Estamos listos?',
    'Ciberseguridad: Protege tu información personal',
    'Comparativa de los mejores laptops para estudiantes',
    'Automatización del hogar: Por dónde empezar',
    'Las mejores extensiones de Chrome para productividad',
    'No-code: Crea apps sin saber programar',
  ],
  'Estilo de vida': [
    'Hábitos matutinos de personas exitosas',
    'Cómo crear una rutina de autocuidado efectiva',
    'Minimalismo: Menos es más',
    'Tips para ser más productivo trabajando desde casa',
    'Cómo organizar tu espacio para mejorar tu mente',
    '30 días para cambiar tu vida: Un reto personal',
    'El arte de decir no: Establecer límites saludables',
    'Digital detox: Una semana sin redes sociales',
    'Journaling: El hábito que transforma',
    'Cómo crear tu morning routine perfecta',
  ],
  'Finanzas': [
    'Cómo crear tu primer presupuesto mensual',
    'Inversiones para principiantes: Por dónde empezar',
    '10 formas de generar ingresos pasivos',
    'Errores financieros comunes y cómo evitarlos',
    'Ahorra para tu retiro aunque ganes poco',
    'Cómo salir de deudas en 12 meses',
    'El método 50/30/20 explicado',
    'Fondo de emergencia: Cuánto y cómo',
    'Side hustles que puedes empezar hoy',
    'Negociar tu salario: Guía paso a paso',
  ],
  'Salud y Bienestar': [
    'Ejercicios de 15 minutos para personas ocupadas',
    'Alimentos que mejoran tu concentración',
    'Cómo dormir mejor: Guía completa',
    'Meditación para principiantes ansiosos',
    'Recetas saludables que puedes hacer en 20 minutos',
    'Salud mental: Señales de que necesitas un descanso',
    'El poder de caminar: Beneficios de 30 minutos diarios',
    'Meal prep: Organiza tus comidas de la semana',
    'Yoga en casa: Rutina para principiantes',
    'Hidratación: Más que solo agua',
  ],
  'Emprendimiento': [
    'Cómo validar tu idea de negocio en una semana',
    'Marketing digital para emprendedores con bajo presupuesto',
    'Historias de fracasos que llevaron al éxito',
    'Cómo conseguir tus primeros 100 clientes',
    'Herramientas gratuitas para lanzar tu startup',
    'El arte del pitch: Presenta tu idea en 60 segundos',
    'Personal branding: Construye tu marca personal',
    'De empleado a emprendedor: La transición',
    'MVP: Lanza rápido, aprende rápido',
    'Networking efectivo para introvertidos',
  ],
  'Creatividad': [
    'Cómo superar el bloqueo creativo',
    'Ejercicios diarios para potenciar tu creatividad',
    'El proceso creativo de artistas famosos',
    'Cómo encontrar tu estilo único',
    'Convierte tu hobby en un negocio rentable',
    'Herramientas digitales para creativos',
    'El poder del sketch diario',
    'Storytelling: El arte de contar historias',
    'Creatividad bajo presión: Técnicas que funcionan',
    'Colaborar con otros creativos',
  ],
  'Educación': [
    'Cómo aprender cualquier cosa más rápido',
    'Los mejores cursos online gratuitos',
    'Técnicas de estudio basadas en ciencia',
    'Aprender un idioma en 6 meses',
    'Libros que todo profesional debe leer',
    'Cómo tomar notas efectivamente',
    'El método Feynman para entender cualquier cosa',
    'Podcasts educativos que valen tu tiempo',
    'Certificaciones online que impulsan tu carrera',
    'Aprendizaje continuo: Mentalidad de crecimiento',
  ],
  'Relaciones': [
    'Comunicación efectiva en pareja',
    'Cómo hacer amigos siendo adulto',
    'Establecer límites con la familia',
    'Networking genuino: Conexiones que importan',
    'El lenguaje del amor: Entendiendo a tu pareja',
    'Conflictos saludables: Discutir sin destruir',
    'Amistades tóxicas: Cuándo alejarse',
    'Relaciones a distancia que funcionan',
    'Comunicación no violenta en práctica',
    'Reconectar con viejos amigos',
  ],
};

// Función para generar ID único
const generateId = () => Math.random().toString(36).substr(2, 9);

// Función para detectar categoría basada en texto
const detectCategory = (text: string): Category => {
  const lowerText = text.toLowerCase();
  for (const category of categories) {
    for (const keyword of category.keywords) {
      if (lowerText.includes(keyword)) {
        return category;
      }
    }
  }
  return categories[Math.floor(Math.random() * categories.length)];
};

// Función para extraer el tema principal de una idea
const extractTopic = (text: string): string => {
  const words = text.toLowerCase()
    .replace(/[¿?¡!.,]/g, '')
    .split(' ')
    .filter(w => w.length > 3)
    .filter(w => !['como', 'para', 'sobre', 'hacer', 'crear', 'mejor', 'mejores', 'guía', 'tips', 'consejos'].includes(w));
  
  return words.slice(0, 3).join(' ') || text.slice(0, 20);
};

// Función para generar ideas expandidas basadas en una idea del usuario
const generateExpandedIdeas = (userIdea: string): string[] => {
  const category = detectCategory(userIdea);
  const topic = extractTopic(userIdea);
  const expandedIdeas: string[] = [];
  
  const shuffledTemplates = [...category.templates].sort(() => Math.random() - 0.5);
  for (let i = 0; i < 3; i++) {
    if (shuffledTemplates[i]) {
      expandedIdeas.push(shuffledTemplates[i].replace('{tema}', topic));
    }
  }
  
  const shuffledExpansions = [...category.expansions].sort(() => Math.random() - 0.5);
  for (let i = 0; i < 2; i++) {
    if (shuffledExpansions[i]) {
      expandedIdeas.push(`${topic}: ${shuffledExpansions[i]}`);
    }
  }
  
  return expandedIdeas;
};

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [userInput, setUserInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedIdeas, setExpandedIdeas] = useState<string[]>([]);
  const [showExpanded, setShowExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'generate' | 'my-ideas' | 'favorites' | 'techniques'>('generate');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<CreativityTechnique | null>(null);
  const [techniqueInput, setTechniqueInput] = useState('');
  const [generatedFromTechnique, setGeneratedFromTechnique] = useState<string[]>([]);
  const [currentRandomWord, setCurrentRandomWord] = useState('');

  // Cargar ideas guardadas del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('blog-ideas');
    if (saved) {
      const parsed = JSON.parse(saved);
      setIdeas(parsed.map((idea: Idea) => ({
        ...idea,
        createdAt: new Date(idea.createdAt)
      })));
    }
  }, []);

  // Guardar ideas en localStorage
  useEffect(() => {
    if (ideas.length > 0) {
      localStorage.setItem('blog-ideas', JSON.stringify(ideas));
    }
  }, [ideas]);

  // Generar idea aleatoria de categoría
  const generateRandomIdea = (categoryName?: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      const category = categoryName 
        ? categories.find(c => c.name === categoryName)!
        : categories[Math.floor(Math.random() * categories.length)];
      
      const categoryIdeas = predefinedIdeas[category.name] || [];
      const randomIdea = categoryIdeas[Math.floor(Math.random() * categoryIdeas.length)];
      
      if (randomIdea) {
        const newIdea: Idea = {
          id: generateId(),
          text: randomIdea,
          category: category.name,
          emoji: category.emoji,
          isFavorite: false,
          createdAt: new Date(),
          isUserIdea: false,
        };
        setIdeas(prev => [newIdea, ...prev]);
        setSelectedCategory(category.name);
      }
      setIsGenerating(false);
    }, 500);
  };

  // Agregar idea del usuario y generar expansiones
  const handleUserIdeaSubmit = () => {
    if (!userInput.trim()) return;
    
    setIsGenerating(true);
    const category = detectCategory(userInput);
    
    const newIdea: Idea = {
      id: generateId(),
      text: userInput,
      category: category.name,
      emoji: category.emoji,
      isFavorite: false,
      createdAt: new Date(),
      isUserIdea: true,
    };
    
    setIdeas(prev => [newIdea, ...prev]);
    
    setTimeout(() => {
      const expanded = generateExpandedIdeas(userInput);
      setExpandedIdeas(expanded);
      setShowExpanded(true);
      setUserInput('');
      setIsGenerating(false);
    }, 800);
  };

  // Agregar idea expandida a la lista
  const addExpandedIdea = (ideaText: string, technique?: string) => {
    const category = detectCategory(ideaText);
    const newIdea: Idea = {
      id: generateId(),
      text: ideaText,
      category: category.name,
      emoji: category.emoji,
      isFavorite: false,
      createdAt: new Date(),
      isUserIdea: false,
      technique,
    };
    setIdeas(prev => [newIdea, ...prev]);
  };

  // Toggle favorito
  const toggleFavorite = (id: string) => {
    setIdeas(prev => prev.map(idea => 
      idea.id === id ? { ...idea, isFavorite: !idea.isFavorite } : idea
    ));
  };

  // Eliminar idea
  const deleteIdea = (id: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  // Generar ideas usando técnica de creatividad
  const generateWithTechnique = () => {
    if (!selectedTechnique || !techniqueInput.trim()) return;
    
    setIsGenerating(true);
    const topic = techniqueInput;
    
    setTimeout(() => {
      const generatedIdeas = selectedTechnique.prompts.map(prompt => 
        prompt.replace(/\[.*?\]/g, topic)
      );
      setGeneratedFromTechnique(generatedIdeas);
      setIsGenerating(false);
    }, 800);
  };

  // Generar palabra aleatoria para estímulo
  const generateRandomWord = () => {
    const word = randomWords[Math.floor(Math.random() * randomWords.length)];
    setCurrentRandomWord(word);
  };

  // Filtrar ideas
  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || idea.category === selectedCategory;
    
    if (activeTab === 'favorites') {
      return idea.isFavorite && matchesSearch && matchesCategory;
    }
    if (activeTab === 'my-ideas') {
      return idea.isUserIdea && matchesSearch && matchesCategory;
    }
    return matchesSearch && matchesCategory;
  });

  // Stats
  const totalIdeas = ideas.length;
  const favoriteCount = ideas.filter(i => i.isFavorite).length;
  const userIdeasCount = ideas.filter(i => i.isUserIdea).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                💡 Blog Ideas Generator
              </h1>
              <p className="text-white/70 mt-1">Tu asistente creativo con técnicas de los grandes genios</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="bg-white/10 rounded-lg px-4 py-2 text-center">
                <div className="text-2xl font-bold text-white">{totalIdeas}</div>
                <div className="text-white/60">Total</div>
              </div>
              <div className="bg-yellow-500/20 rounded-lg px-4 py-2 text-center">
                <div className="text-2xl font-bold text-yellow-300">{favoriteCount}</div>
                <div className="text-yellow-200/60">Favoritas</div>
              </div>
              <div className="bg-green-500/20 rounded-lg px-4 py-2 text-center">
                <div className="text-2xl font-bold text-green-300">{userIdeasCount}</div>
                <div className="text-green-200/60">Propias</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-5 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'generate'
                ? 'bg-white text-purple-700 shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            🎲 Generador
          </button>
          <button
            onClick={() => setActiveTab('techniques')}
            className={`px-5 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'techniques'
                ? 'bg-white text-purple-700 shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            🧠 Técnicas Creativas
          </button>
          <button
            onClick={() => setActiveTab('my-ideas')}
            className={`px-5 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'my-ideas'
                ? 'bg-white text-purple-700 shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            ✍️ Mis Ideas ({userIdeasCount})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-5 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'favorites'
                ? 'bg-white text-purple-700 shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            ⭐ Favoritas ({favoriteCount})
          </button>
        </div>

        {/* Tab: Generador */}
        {(activeTab === 'generate' || activeTab === 'my-ideas' || activeTab === 'favorites') && (
          <>
            {/* Input de usuario */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                ✍️ Escribe tu idea y te ayudo a expandirla
              </h2>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUserIdeaSubmit()}
                  placeholder="Ej: Quiero escribir sobre productividad para emprendedores..."
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-gray-800 text-lg"
                />
                <button
                  onClick={handleUserIdeaSubmit}
                  disabled={!userInput.trim() || isGenerating}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <span className="animate-spin">⚙️</span> Generando...
                    </>
                  ) : (
                    <>
                      🚀 Generar Ideas
                    </>
                  )}
                </button>
              </div>
              
              {/* Ideas expandidas */}
              {showExpanded && expandedIdeas.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-purple-800 flex items-center gap-2">
                      ✨ Ideas generadas a partir de tu concepto:
                    </h3>
                    <button
                      onClick={() => setShowExpanded(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2">
                    {expandedIdeas.map((idea, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
                      >
                        <span className="text-gray-700">{idea}</span>
                        <button
                          onClick={() => addExpandedIdea(idea)}
                          className="ml-3 px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-all"
                        >
                          + Agregar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Generador rápido por categoría */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🎲 Generador rápido por categoría
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => generateRandomIdea(category.name)}
                    disabled={isGenerating}
                    className={`p-4 rounded-xl text-left transition-all transform hover:scale-105 hover:shadow-lg ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <span className="text-2xl">{category.emoji}</span>
                    <p className="font-semibold mt-1 text-sm">{category.name}</p>
                  </button>
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={() => generateRandomIdea()}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {isGenerating ? '⚙️ Generando...' : '🎰 ¡Sorpréndeme!'}
                </button>
              </div>
            </div>

            {/* Lista de ideas */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6">
              {/* Búsqueda y filtros */}
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar ideas..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:outline-none bg-white"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.emoji} {cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Lista de ideas */}
              {filteredIdeas.length > 0 ? (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {filteredIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                        idea.isUserIdea 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      } ${idea.isFavorite ? 'ring-2 ring-yellow-400' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-lg">{idea.emoji}</span>
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                              {idea.category}
                            </span>
                            {idea.isUserIdea && (
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                Tu idea
                              </span>
                            )}
                            {idea.technique && (
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                {idea.technique}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-800 font-medium">{idea.text}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {idea.createdAt.toLocaleDateString()} {idea.createdAt.toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleFavorite(idea.id)}
                            className={`p-2 rounded-lg transition-all ${
                              idea.isFavorite 
                                ? 'bg-yellow-100 text-yellow-600' 
                                : 'bg-gray-100 text-gray-400 hover:text-yellow-500'
                            }`}
                          >
                            {idea.isFavorite ? '⭐' : '☆'}
                          </button>
                          <button
                            onClick={() => deleteIdea(idea.id)}
                            className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500 transition-all"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-6xl mb-4">💭</div>
                  <p className="text-lg">No hay ideas todavía</p>
                  <p className="text-sm">¡Escribe una idea o genera una aleatoria!</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Tab: Técnicas Creativas */}
        {activeTab === 'techniques' && (
          <>
            {/* Intro */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                🧠 Técnicas de Creatividad de los Grandes Genios
              </h2>
              <p className="text-gray-600">
                Aprende y aplica las técnicas más poderosas de creatividad desarrolladas por los mejores pensadores de la historia.
                Selecciona una técnica, escribe tu tema y genera ideas únicas.
              </p>
            </div>

            {/* Grid de técnicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {creativityTechniques.map((technique) => (
                <div
                  key={technique.id}
                  onClick={() => {
                    setSelectedTechnique(technique);
                    setGeneratedFromTechnique([]);
                    if (technique.id === 'random-input') {
                      generateRandomWord();
                    }
                  }}
                  className={`bg-white/95 backdrop-blur rounded-2xl shadow-lg p-5 cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] ${
                    selectedTechnique?.id === technique.id ? 'ring-4 ring-purple-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${technique.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {technique.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{technique.name}</h3>
                      <p className="text-sm text-gray-500">{technique.creator} • {technique.year}</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{technique.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Técnica seleccionada - Detalle */}
            {selectedTechnique && (
              <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedTechnique.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {selectedTechnique.emoji}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedTechnique.name}</h2>
                    <p className="text-gray-500">{selectedTechnique.creator} • {selectedTechnique.year}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{selectedTechnique.description}</p>

                {/* Cómo usar */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">📋 Cómo usarla:</h3>
                  <ul className="space-y-2">
                    {selectedTechnique.howTo.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-purple-500 font-bold">{index + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ejercicio */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-2">🎯 Ejercicio:</h3>
                  <p className="text-purple-700">{selectedTechnique.exercise}</p>
                </div>

                {/* Palabra aleatoria para estímulo */}
                {selectedTechnique.id === 'random-input' && (
                  <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl p-4 mb-6 border border-violet-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-violet-800 mb-1">🎲 Tu palabra aleatoria:</h3>
                        <p className="text-3xl font-bold text-violet-600">{currentRandomWord || 'Click para generar'}</p>
                      </div>
                      <button
                        onClick={generateRandomWord}
                        className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-all"
                      >
                        Nueva palabra
                      </button>
                    </div>
                    {currentRandomWord && (
                      <p className="text-sm text-violet-600 mt-2">
                        💡 Ahora conecta "{currentRandomWord}" con tu tema de blog
                      </p>
                    )}
                  </div>
                )}

                {/* Generador con técnica */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-bold text-gray-800 mb-4">✨ Genera ideas con esta técnica:</h3>
                  <div className="flex flex-col md:flex-row gap-3 mb-4">
                    <input
                      type="text"
                      value={techniqueInput}
                      onChange={(e) => setTechniqueInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && generateWithTechnique()}
                      placeholder="Escribe tu tema (ej: productividad, finanzas, fitness...)"
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-gray-800"
                    />
                    <button
                      onClick={generateWithTechnique}
                      disabled={!techniqueInput.trim() || isGenerating}
                      className={`px-6 py-3 bg-gradient-to-r ${selectedTechnique.color} text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50`}
                    >
                      {isGenerating ? '⚙️ Generando...' : '🚀 Aplicar Técnica'}
                    </button>
                  </div>

                  {/* Ideas generadas con la técnica */}
                  {generatedFromTechnique.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Ideas generadas:</h4>
                      {generatedFromTechnique.map((idea, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all"
                        >
                          <span className="text-gray-700">{idea}</span>
                          <button
                            onClick={() => addExpandedIdea(idea, selectedTechnique.name)}
                            className="ml-3 px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-all"
                          >
                            + Guardar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tip */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-xl mb-2">💡 Pro Tip</h3>
              <p>
                Combina múltiples técnicas para resultados más creativos. Por ejemplo, usa los <strong>6 Sombreros</strong> para 
                analizar tu tema desde diferentes ángulos, luego aplica <strong>SCAMPER</strong> a tus mejores ideas, 
                y finalmente usa el <strong>Brainstorm Inverso</strong> para encontrar perspectivas únicas.
              </p>
            </div>
          </>
        )}

        {/* Footer */}
        <p className="text-center text-white/60 mt-8 pb-8">
          Hecho con 💜 en VibeCoding Bootcamp
        </p>
      </div>
    </main>
  );
}
