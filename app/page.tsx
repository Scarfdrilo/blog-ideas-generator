'use client';

import { useState } from 'react';

const categories = [
  { name: 'Tecnología', emoji: '💻', ideas: [
    'Los 10 gadgets que cambiarán tu vida en 2024',
    'Cómo la IA está transformando el trabajo remoto',
    'Guía para principiantes: Aprende a programar desde cero',
    '5 apps que todo emprendedor necesita',
    'El futuro de la realidad virtual: ¿Estamos listos?',
    'Ciberseguridad: Protege tu información personal',
    'Comparativa de los mejores laptops para estudiantes',
  ]},
  { name: 'Estilo de vida', emoji: '🌟', ideas: [
    'Hábitos matutinos de personas exitosas',
    'Cómo crear una rutina de autocuidado efectiva',
    'Minimalismo: Menos es más',
    'Tips para ser más productivo trabajando desde casa',
    'Cómo organizar tu espacio para mejorar tu mente',
    '30 días para cambiar tu vida: Un reto personal',
    'El arte de decir no: Establecer límites saludables',
  ]},
  { name: 'Finanzas', emoji: '💰', ideas: [
    'Cómo crear tu primer presupuesto mensual',
    'Inversiones para principiantes: Por dónde empezar',
    '10 formas de generar ingresos pasivos',
    'Errores financieros comunes y cómo evitarlos',
    'Ahorra para tu retiro aunque ganes poco',
    'Criptomonedas: ¿Vale la pena invertir?',
    'Cómo salir de deudas en 12 meses',
  ]},
  { name: 'Salud', emoji: '🏃', ideas: [
    'Ejercicios de 15 minutos para personas ocupadas',
    'Alimentos que mejoran tu concentración',
    'Cómo dormir mejor: Guía completa',
    'Meditación para principiantes ansiosos',
    'Recetas saludables que puedes hacer en 20 minutos',
    'Salud mental: Señales de que necesitas un descanso',
    'El poder de caminar: Beneficios de 30 minutos diarios',
  ]},
  { name: 'Emprendimiento', emoji: '🚀', ideas: [
    'Cómo validar tu idea de negocio en una semana',
    'Marketing digital para emprendedores con bajo presupuesto',
    'Historias de fracasos que llevaron al éxito',
    'Cómo conseguir tus primeros 100 clientes',
    'Herramientas gratuitas para lanzar tu startup',
    'El arte del pitch: Presenta tu idea en 60 segundos',
    'Side hustles que puedes empezar hoy',
  ]},
  { name: 'Creatividad', emoji: '🎨', ideas: [
    'Cómo superar el bloqueo creativo',
    'Ejercicios diarios para potenciar tu creatividad',
    'El proceso creativo de artistas famosos',
    'Cómo encontrar tu estilo único',
    'Convierte tu hobby en un negocio rentable',
    'Inspiración vs. plagio: ¿Dónde está la línea?',
    'Herramientas digitales para creativos',
  ]},
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentIdea, setCurrentIdea] = useState<string>('');
  const [savedIdeas, setSavedIdeas] = useState<string[]>([]);

  const generateIdea = (categoryName?: string) => {
    const category = categoryName 
      ? categories.find(c => c.name === categoryName)
      : categories[Math.floor(Math.random() * categories.length)];
    
    if (category) {
      const randomIdea = category.ideas[Math.floor(Math.random() * category.ideas.length)];
      setCurrentIdea(`${category.emoji} ${randomIdea}`);
      setSelectedCategory(category.name);
    }
  };

  const saveIdea = () => {
    if (currentIdea && !savedIdeas.includes(currentIdea)) {
      setSavedIdeas([...savedIdeas, currentIdea]);
    }
  };

  const removeIdea = (idea: string) => {
    setSavedIdeas(savedIdeas.filter(i => i !== idea));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            💡 Blog Ideas Generator
          </h1>
          <p className="text-white/90 text-lg md:text-xl">
            ¿Sin inspiración? ¡Genera ideas increíbles para tu próximo blog!
          </p>
        </div>

        {/* Main Generator Card */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-6 md:p-8 mb-8">
          {/* Generated Idea Display */}
          <div className="min-h-[120px] flex items-center justify-center mb-6">
            {currentIdea ? (
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
                  {currentIdea}
                </p>
                <button
                  onClick={saveIdea}
                  className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all transform hover:scale-105"
                >
                  ⭐ Guardar idea
                </button>
              </div>
            ) : (
              <p className="text-xl text-gray-400 text-center">
                👆 Selecciona una categoría o genera una idea aleatoria
              </p>
            )}
          </div>

          {/* Random Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => generateIdea()}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              🎲 ¡Idea Aleatoria!
            </button>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => generateIdea(category.name)}
                className={`p-4 rounded-xl text-left transition-all transform hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <span className="text-2xl">{category.emoji}</span>
                <p className="font-semibold mt-1">{category.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Saved Ideas */}
        {savedIdeas.length > 0 && (
          <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ⭐ Ideas Guardadas ({savedIdeas.length})
            </h2>
            <div className="space-y-3">
              {savedIdeas.map((idea, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl"
                >
                  <p className="text-gray-800 font-medium flex-1">{idea}</p>
                  <button
                    onClick={() => removeIdea(idea)}
                    className="ml-3 text-red-500 hover:text-red-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-white/80 mt-8">
          Hecho con 💜 en VibeCoding Bootcamp
        </p>
      </div>
    </main>
  );
}
