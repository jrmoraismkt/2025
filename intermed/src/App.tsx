import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import ReportScreen from './components/ReportScreen';
import AdminLogin from './components/AdminLogin';

export interface UserData {
  name: string;
  phone: string;
}

export interface QuizAnswer {
  category: string;
  score: number;
}

export interface UserResult {
  id: string;
  userData: UserData;
  answers: QuizAnswer[];
  totalScore: number;
  profile: string;
  timestamp: Date;
}

function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'quiz' | 'result' | 'admin-login' | 'reports'>('welcome');
  const [userData, setUserData] = useState<UserData>({ name: '', phone: '' });
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [userResults, setUserResults] = useState<UserResult[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load results from localStorage on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem('intermed-quiz-results');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults).map((result: any) => ({
        ...result,
        timestamp: new Date(result.timestamp)
      }));
      setUserResults(parsedResults);
    }
  }, []);

  // Save results to localStorage whenever userResults changes
  useEffect(() => {
    localStorage.setItem('intermed-quiz-results', JSON.stringify(userResults));
  }, [userResults]);

  const handleWelcomeSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentStep('quiz');
  };

  const handleQuizComplete = (quizAnswers: QuizAnswer[]) => {
    setAnswers(quizAnswers);
    
    // Calculate total score and determine profile
    const totalScore = quizAnswers.reduce((sum, answer) => sum + answer.score, 0);
    let profile = 'O ZUMBI FUNCIONAL';
    
    if (totalScore >= 18) profile = 'O SUPER-HERÓI EXAUSTO';
    else if (totalScore >= 13) profile = 'ZEN PRODUTIVO';
    else if (totalScore >= 7) profile = 'O GUERREIRO NO LIMITE';
    
    // Save result
    const newResult: UserResult = {
      id: Date.now().toString(),
      userData,
      answers: quizAnswers,
      totalScore,
      profile,
      timestamp: new Date()
    };
    
    setUserResults(prev => [...prev, newResult]);
    setCurrentStep('result');
  };

  const handleRestart = () => {
    setCurrentStep('welcome');
    setUserData({ name: '', phone: '' });
    setAnswers([]);
  };

  const handleAdminAccess = () => {
    setCurrentStep('admin-login');
  };

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      setCurrentStep('reports');
    } else {
      setCurrentStep('welcome');
    }
  };

  const handleBackToQuiz = () => {
    setIsAuthenticated(false);
    setCurrentStep('welcome');
  };

  return (
    <div className="min-h-screen">
      {currentStep === 'welcome' && (
        <WelcomeScreen onSubmit={handleWelcomeSubmit} onAdminAccess={handleAdminAccess} />
      )}
      
      {currentStep === 'quiz' && (
        <QuizScreen userData={userData} onComplete={handleQuizComplete} />
      )}
      
      {currentStep === 'result' && (
        <ResultScreen 
          userData={userData} 
          answers={answers} 
          onRestart={handleRestart}
        />
      )}

      {currentStep === 'admin-login' && (
        <AdminLogin onLogin={handleAdminLogin} />
      )}

      {currentStep === 'reports' && isAuthenticated && (
        <ReportScreen 
          userResults={userResults} 
          onBack={handleBackToQuiz}
        />
      )}
    </div>
  );
}

export default App;