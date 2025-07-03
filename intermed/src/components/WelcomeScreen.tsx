import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { UserData } from '../App';

interface WelcomeScreenProps {
  onSubmit: (data: UserData) => void;
  onAdminAccess: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSubmit, onAdminAccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        onSubmit({ name: name.trim(), phone: phone.trim() });
      }, 300);
    }
  };

  const handlePageClick = () => {
    setShowForm(true);
  };

  if (showForm) {
    return (
      <div 
        className="h-screen w-screen flex flex-col relative overflow-hidden"
        style={{
          backgroundImage: `url('/pagina 02.png')`,
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
          <button
            onClick={onAdminAccess}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-lg">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-orange-600 mb-4">Saúde Empreendedora</h2>
                <p className="text-lg text-gray-700">
                  Faça o quiz, descubra em 2 minutos como anda sua saúde empreendedora
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-3">
                    Seu nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Digite seu nome"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-3">
                    Seu telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !phone.trim()}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-5 px-6 rounded-xl font-semibold text-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Vamos começar!'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Seus dados estão seguros conosco 🔒
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-screen w-screen flex flex-col relative overflow-hidden cursor-pointer"
      style={{
        backgroundImage: `url('/pagina inicial.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onClick={handlePageClick}
    >
      {/* Header with Logo */}
      <div className="flex justify-between items-center p-6 z-50">
        <img 
          src="/logo intermed.png" 
          alt="Intermed" 
          className="h-12"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdminAccess();
          }}
          className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Main Content - Just the background image, clickable */}
      <div className="flex-1 flex items-center justify-center">
        {/* Empty div to maintain layout but allow full page click */}
      </div>
    </div>
  );
};

export default WelcomeScreen;