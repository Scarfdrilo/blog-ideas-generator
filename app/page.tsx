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
}

interface Category {
  name: string;
  emoji: string;
  keywords: string[];
  templates: string[];
  expansions: string[];
}

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
  // Categoría por defecto
  return categories[Math.floor(Math.random() * categories.length)];
};

// Función para extraer el tema principal de una idea
const extractTopic = (text: string): string => {
  // Limpiar y extraer palabras clave
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
  
  // Generar ideas usando plantillas
  const shuffledTemplates = [...category.templates].sort(() => Math.random() - 0.5);
  for (let i = 0; i < 3; i++) {
    if (shuffledTemplates[i]) {
      expandedIdeas.push(shuffledTemplates[i].replace('{tema}', topic));
    }
  }
  
  // Agregar expansiones
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
  const [activeTab, setActiveTab] = useState<'generate' | 'my-ideas' | 'favorites'>('generate');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
    
    // Crear la idea del usuario
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
    
    // Generar ideas expandidas
    setTimeout(() => {
      const expanded = generateExpandedIdeas(userInput);
      setExpandedIdeas(expanded);
      setShowExpanded(true);
      setUserInput('');
      setIsGenerating(false);
    }, 800);
  };

  // Agregar idea expandida a la lista
  const addExpandedIdea = (ideaText: string) => {
    const category = detectCategory(ideaText);
    const newIdea: Idea = {
      id: generateId(),
      text: ideaText,
      category: category.name,
      emoji: category.emoji,
      isFavorite: false,
      createdAt: new Date(),
      isUserIdea: false,
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
              <p className="text-white/70 mt-1">Tu asistente creativo para generar ideas de contenido</p>
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

        {/* Tabs y lista de ideas */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-200 pb-4">
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'generate'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📋 Todas ({ideas.length})
            </button>
            <button
              onClick={() => setActiveTab('my-ideas')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'my-ideas'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ✍️ Mis Ideas ({userIdeasCount})
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'favorites'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ⭐ Favoritas ({favoriteCount})
            </button>
          </div>

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
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{idea.emoji}</span>
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                          {idea.category}
                        </span>
                        {idea.isUserIdea && (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            Tu idea
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

        {/* Footer */}
        <p className="text-center text-white/60 mt-8 pb-8">
          Hecho con 💜 en VibeCoding Bootcamp
        </p>
      </div>
    </main>
  );
}
