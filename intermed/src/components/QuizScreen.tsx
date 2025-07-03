import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, Heart, Brain, Activity, Stethoscope } from 'lucide-react';
import { UserData, QuizAnswer } from '../App';

interface QuizScreenProps {
  userData: UserData;
  onComplete: (answers: QuizAnswer[]) => void;
}

const questions = [
  {
    id: 'rotina',
    title: 'ROTINA',
    icon: Clock,
    question: 'De maneira geral, como são suas refeições durante a semana?',
    options: [
      { text: 'A) Rápidas e no computador.', score: 1 },
      { text: 'B) No horário, mas às vezes pulo uma ou outra.', score: 2 },
      { text: 'C) Refeições completas e com calma.', score: 4 },
      { text: 'D) Depende... às vezes só percebo que não comi às 18h.', score: 0 }
    ]
  },
  {
    id: 'sono',
    title: 'SONO',
    icon: Brain,
    question: 'Quantas horas de sono você consegue por noite?',
    options: [
      { text: 'A) 4 ou 5 horas no máximo.', score: 1 },
      { text: 'B) 6 horas e olhe lá!', score: 2 },
      { text: 'C) 7 horas ou mais, meu corpo agradece!', score: 4 },
      { text: 'D) Dormir virou um luxo.', score: 0 }
    ]
  },
  {
    id: 'estresse',
    title: 'ESTRESSE',
    icon: Heart,
    question: 'Quando algo dá errado no seu negócio, o que acontece com você?',
    options: [
      { text: 'A) Levo tudo pro pessoal e somatizo.', score: 1 },
      { text: 'B) Tento segurar a barra e sigo no automático.', score: 2 },
      { text: 'C) Respiro fundo e resolvo com calma.', score: 4 },
      { text: 'D) Já tive uma crise de ansiedade. Ou duas.', score: 0 }
    ]
  },
  {
    id: 'cuidados',
    title: 'CUIDADOS',
    icon: Stethoscope,
    question: 'Quando foi sua última consulta médica?',
    options: [
      { text: 'A) Mais de 2 anos.', score: 1 },
      { text: 'B) No último ano, mas não faço com frequência.', score: 2 },
      { text: 'C) Há poucos meses, tô em dia.', score: 4 },
      { text: 'D) Não lembro / Nunca fui.', score: 0 }
    ]
  },
  {
    id: 'movimento',
    title: 'MOVIMENTO',
    icon: Activity,
    question: 'Quantas vezes você se movimenta ativamente na semana? (vale caminhada, treino, dança...)',
    options: [
      { text: 'A) 1 vez por semana.', score: 1 },
      { text: 'B) 2 ou 3 vezes por semana.', score: 2 },
      { text: 'C) Mais de 4 vezes por semana.', score: 4 },
      { text: 'D) Movimento? Só se for pra levantar da cadeira...', score: 0 }
    ]
  }
];

const QuizScreen: React.FC<QuizScreenProps> = ({ userData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswer: QuizAnswer = {
      category: questions[currentQuestion].id,
      score: questions[currentQuestion].options[selectedOption].score
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption(null);
    }
  };

  const question = questions[currentQuestion];
  const IconComponent = question.icon;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
          <div className="text-white/80 text-sm">Pergunta</div>
          <div className="text-white font-bold text-lg">
            {currentQuestion + 1} de {questions.length}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-4xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
            {/* Question Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{question.title}</h2>
                    <p className="text-orange-100 text-lg">Olá, {userData.name}!</p>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="bg-white/20 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-white h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
                {question.question}
              </h3>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-200 text-lg ${
                      selectedOption === index
                        ? 'border-orange-500 bg-orange-50 text-orange-800'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                    }`}
                  >
                    <span className="font-medium">{option.text}</span>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handleBack}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all text-lg ${
                    currentQuestion === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="w-6 h-6" />
                  Voltar
                </button>

                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all text-lg ${
                    selectedOption === null
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                  }`}
                >
                  {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;