import React from 'react';
import { RotateCcw, Share2, Trophy, AlertTriangle, Target, Zap } from 'lucide-react';
import { UserData, QuizAnswer } from '../App';

interface ResultScreenProps {
  userData: UserData;
  answers: QuizAnswer[];
  onRestart: () => void;
}

const profiles = [
  {
    id: 'zumbi',
    title: 'O ZUMBI FUNCIONAL',
    subtitle: 'Funciona no automático, mas não está se cuidando da forma alguma — zero energia. Só trabalha.',
    description: 'Você é o Zumbi Funcional. Anda, fala, trabalha... mas seu corpo já no piloto automático. Dormir virou luxo, comer virou improviso, respirar virou tarefa esquecida.',
    icon: '🧟',
    color: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-800',
    recommendations: [
      'Pronto atendimento digital 24h',
      'App com agendamento online, sem fila nem complicação',
      'Rede credenciada com estrutura do sistema Unimed',
      'Preço acessível, pensado pra quem é MEI'
    ],
    minScore: 0,
    maxScore: 6
  },
  {
    id: 'guerreiro',
    title: 'O GUERREIRO NO LIMITE',
    subtitle: 'Trabalha demais, dorme pouco, come mal, não faz pausas.',
    description: 'Você é o Guerreiro no Limite. Anda, fala, trabalha... mas seu corpo já no piloto automático. Dormir virou luxo, comer virou improviso, respirar virou tarefa esquecida.',
    icon: '⚔️',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    recommendations: [
      'Pronto atendimento digital 24h',
      'App com agendamento online, sem fila nem complicação',
      'Rede credenciada com estrutura do sistema Unimed',
      'Preço acessível, pensado pra quem é MEI'
    ],
    minScore: 7,
    maxScore: 12
  },
  {
    id: 'zen',
    title: 'ZEN PRODUTIVO',
    subtitle: 'Tenta se cuidar, tem alguns hábitos saudáveis, mas pode melhorar.',
    description: 'Você é o Zen Produtivo. Anda, fala, trabalha... mas seu corpo já no piloto automático. Dormir virou luxo, comer virou improviso, respirar virou tarefa esquecida.',
    icon: '🧘',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    recommendations: [
      'Pronto atendimento digital 24h',
      'App com agendamento online, sem fila nem complicação',
      'Rede credenciada com estrutura do sistema Unimed',
      'Preço acessível, pensado pra quem é MEI'
    ],
    minScore: 13,
    maxScore: 17
  },
  {
    id: 'super-heroi',
    title: 'O SUPER-HERÓI EXAUSTO',
    subtitle: 'Assume tudo, vive resolvendo tudo por todos, vive negligenciando a si mesmo.',
    description: 'Você é o Super-Herói Exausto. Anda, fala, trabalha... mas seu corpo já no piloto automático. Dormir virou luxo, comer virou improviso, respirar virou tarefa esquecida.',
    icon: '🦸',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    recommendations: [
      'Pronto atendimento digital 24h',
      'App com agendamento online, sem fila nem complicação',
      'Rede credenciada com estrutura do sistema Unimed',
      'Preço acessível, pensado pra quem é MEI'
    ],
    minScore: 18,
    maxScore: 20
  }
];

const ResultScreen: React.FC<ResultScreenProps> = ({ userData, answers, onRestart }) => {
  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
  const profile = profiles.find(p => totalScore >= p.minScore && totalScore <= p.maxScore) || profiles[0];

  const getIcon = (profileId: string) => {
    switch (profileId) {
      case 'zumbi': return AlertTriangle;
      case 'guerreiro': return Zap;
      case 'zen': return Target;
      case 'super-heroi': return Trophy;
      default: return AlertTriangle;
    }
  };

  const IconComponent = getIcon(profile.id);

  return (
    <div 
      className="h-screen w-screen flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: `url('/fundo pergntas.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Header with Logo */}
      <div className="flex justify-between items-center p-6 z-50">
        <img 
          src="/logo intermed.png" 
          alt="Intermed" 
          className="h-12"
        />
        <div className="text-right">
          <div className="text-white/80 text-sm">Resultado</div>
          <div className="text-white font-bold text-lg">
            {userData.name}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8 overflow-y-auto">
        <div className="w-full max-w-4xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
            {/* Profile Header - Tons Laranja */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-white mb-4">Resultado</h1>
                <p className="text-lg opacity-90">Olá, {userData.name}! Aqui está seu perfil:</p>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="bg-white/20 p-4 rounded-full">
                  <IconComponent className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{profile.title}</h2>
                  <p className="text-lg opacity-90">{profile.subtitle}</p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Sua pontuação</span>
                  <span className="text-2xl font-bold">{totalScore}/20</span>
                </div>
                <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full transition-all duration-500"
                    style={{ width: `${(totalScore / 20) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Profile Description */}
            <div className="p-8">
              <div className={`${profile.bgColor} rounded-2xl p-6 mb-8`}>
                <p className={`text-lg ${profile.textColor} leading-relaxed`}>
                  {profile.description}
                </p>
              </div>

              {/* Recommendations */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Trophy className="w-6 h-6 text-orange-600" />
                  </div>
                  Recomendações da Intermed
                </h3>
                
                <div className="grid gap-4">
                  {profile.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 font-medium">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onRestart}
                  className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-orange-500 text-orange-600 rounded-xl font-medium hover:bg-orange-50 transition-colors text-lg"
                >
                  <RotateCcw className="w-6 h-6" />
                  Refazer Quiz
                </button>
                
                <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-colors text-lg">
                  <Share2 className="w-6 h-6" />
                  Compartilhar Resultado
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 mb-8">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">30</span>
              </div>
              <span className="text-gray-700 font-medium">anos Intermed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;