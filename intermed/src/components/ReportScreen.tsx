import React, { useState } from 'react';
import { ArrowLeft, Download, Calendar, Users, TrendingUp, Filter } from 'lucide-react';
import { UserResult } from '../App';

interface ReportScreenProps {
  userResults: UserResult[];
  onBack: () => void;
}

const ReportScreen: React.FC<ReportScreenProps> = ({ userResults, onBack }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedProfile, setSelectedProfile] = useState('all');

  // Filter results by selected date
  const filteredResults = userResults.filter(result => {
    const resultDate = result.timestamp.toISOString().split('T')[0];
    const matchesDate = resultDate === selectedDate;
    const matchesProfile = selectedProfile === 'all' || result.profile === selectedProfile;
    return matchesDate && matchesProfile;
  });

  // Get unique profiles for filter
  const profiles = ['all', ...Array.from(new Set(userResults.map(r => r.profile)))];

  // Statistics
  const totalToday = filteredResults.length;
  const averageScore = filteredResults.length > 0 
    ? (filteredResults.reduce((sum, r) => sum + r.totalScore, 0) / filteredResults.length).toFixed(1)
    : '0';

  const profileCounts = profiles.slice(1).reduce((acc, profile) => {
    acc[profile] = filteredResults.filter(r => r.profile === profile).length;
    return acc;
  }, {} as Record<string, number>);

  const exportToCSV = () => {
    if (filteredResults.length === 0) return;

    const headers = ['Nome', 'Telefone', 'Perfil', 'Pontuação', 'Data/Hora'];
    const csvContent = [
      headers.join(','),
      ...filteredResults.map(result => [
        `"${result.userData.name}"`,
        `"${result.userData.phone}"`,
        `"${result.profile}"`,
        result.totalScore,
        result.timestamp.toLocaleString('pt-BR')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio-intermed-${selectedDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-orange-50 to-yellow-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/logo intermed.png" 
                alt="Intermed" 
                className="h-12"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">Relatório de Usuários</h1>
                <p className="text-orange-100">Painel Administrativo</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Data:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Perfil:</label>
              <select
                value={selectedProfile}
                onChange={(e) => setSelectedProfile(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">Todos os perfis</option>
                {profiles.slice(1).map(profile => (
                  <option key={profile} value={profile}>{profile}</option>
                ))}
              </select>
            </div>

            <button
              onClick={exportToCSV}
              disabled={filteredResults.length === 0}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-5 h-5" />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-orange-50 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Total do Dia</p>
                  <p className="text-2xl font-bold text-orange-600">{totalToday}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Pontuação Média</p>
                  <p className="text-2xl font-bold text-blue-600">{averageScore}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <div>
                <p className="text-sm text-gray-600 mb-2">Perfil Mais Comum</p>
                <p className="text-lg font-bold text-green-600">
                  {Object.entries(profileCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl">
              <div>
                <p className="text-sm text-gray-600 mb-2">Distribuição</p>
                <div className="space-y-1">
                  {Object.entries(profileCounts).slice(0, 2).map(([profile, count]) => (
                    <div key={profile} className="flex justify-between text-sm">
                      <span className="text-purple-600 truncate">{profile.split(' ')[1] || profile}</span>
                      <span className="font-bold text-purple-600">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="flex-1 bg-white mx-6 mb-6 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Usuários do dia {new Date(selectedDate).toLocaleDateString('pt-BR')}
          </h2>
        </div>
        
        {filteredResults.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Nenhum resultado encontrado</h3>
            <p className="text-gray-400">Não há usuários para a data e filtros selecionados.</p>
          </div>
        ) : (
          <div className="overflow-auto h-full">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Perfil
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Pontuação
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Horário
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{result.userData.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{result.userData.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                        {result.profile}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-bold text-gray-900">{result.totalScore}/20</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full"
                            style={{ width: `${(result.totalScore / 20) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportScreen;