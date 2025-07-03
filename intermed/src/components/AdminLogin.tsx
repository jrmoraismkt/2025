import React, { useState } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (password === '2025') {
        onLogin(true);
      } else {
        setError('Senha incorreta');
        onLogin(false);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header with Logo */}
      <div className="flex justify-start items-center p-6">
        <img 
          src="/logo intermed.png" 
          alt="Intermed" 
          className="h-12"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-orange-600 mb-2">Acesso Administrativo</h1>
            <p className="text-gray-600 text-lg">Digite a senha para acessar os relatórios</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-3">
                  Senha de Acesso
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Digite a senha"
                    required
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onLogin(false)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors text-lg"
                >
                  <ArrowLeft className="w-6 h-6" />
                  Voltar
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading || !password.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-lg"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Acessar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;