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
  const [activeTab, setActiveTab] = useState<'generate' | 'techniques'>('generate');
  const [techniqueFilter, setTechniqueFilter] = useState<'all' | 'ancient' | 'modern'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<CreativityTechnique | null>(null);
  const [techniqueInput, setTechniqueInput] = useState('');
  const [generatedFromTechnique, setGeneratedFromTechnique] = useState<{text: string; description: string}[]>([]);
  const [expandedIdeaId, setExpandedIdeaId] = useState<string | null>(null);

  // Cargar y guardar ideas
  useEffect(() => {
    try {
      const saved = localStorage.getItem('blog-ideas-v4');
      if (saved) setIdeas(JSON.parse(saved));
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('blog-ideas-v4', JSON.stringify(ideas));
    } catch (e) { console.error(e); }
  }, [ideas]);

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
              <p className="text-white/70 mt-1">Técnicas de genios antiguos y modernos</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="bg-white/10 rounded-lg px-4 py-2 text-center">
                <div className="text-2xl font-bold text-white">{ideas.length}</div>
                <div className="text-white/60">Ideas</div>
              </div>
              <div className="bg-amber-500/20 rounded-lg px-4 py-2 text-center">
                <div className="text-2xl font-bold text-amber-300">{ancientCount}</div>
                <div className="text-amber-200/60">Antiguas</div>
              </div>
              <div className="bg-cyan-500/20 rounded-lg px-4 py-2 text-center">
                <div className="text-2xl font-bold text-cyan-300">{modernCount}</div>
                <div className="text-cyan-200/60">Modernas</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('generate')}
            className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'generate' ? 'bg-white text-purple-700 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            🎲 Generador
          </button>
          <button onClick={() => setActiveTab('techniques')}
            className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'techniques' ? 'bg-white text-purple-700 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            🧠 Técnicas ({creativityTechniques.length})
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
                              <p className="text-gray-700 text-sm">{idea.description}</p>
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

        <p className="text-center text-white/60 mt-8 pb-8">Hecho con 💜 en VibeCoding Bootcamp</p>
      </div>
    </main>
  );
}
