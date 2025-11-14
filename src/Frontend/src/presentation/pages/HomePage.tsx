import { useHealthCheck } from '../hooks/useHealthCheck';

/**
 * Página principal de bienvenida
 */
export const HomePage = () => {
  const { isHealthy, isLoading } = useHealthCheck();

  const renderBackendStatus = () => {
    if (isLoading) return <p className="mt-2">🔄 Verificando backend...</p>;
    return isHealthy 
      ? <p className="mt-2 text-green-600">✅ Backend conectado</p>
      : <p className="mt-2 text-red-600">❌ Backend desconectado</p>;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-wine-100 to-white p-4">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-5xl font-bold text-wine-900 mb-4">
          🍷 Celleret
        </h1>
        
        <p className="text-xl text-wine-700 mb-8">
          Tu bodega personal digital
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-wine-800">
            ¡Bienvenido a Celleret!
          </h2>
          
          <p className="text-gray-600">
            Gestiona tu colección de vinos de forma profesional y elegante.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-wine-50 rounded-lg">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-semibold text-wine-900 mb-2">Organiza</h3>
              <p className="text-sm text-gray-600">
                Mantén un registro detallado de todos tus vinos
              </p>
            </div>
            
            <div className="p-4 bg-wine-50 rounded-lg">
              <div className="text-3xl mb-2">⏰</div>
              <h3 className="font-semibold text-wine-900 mb-2">Planifica</h3>
              <p className="text-sm text-gray-600">
                Conoce el momento óptimo de consumo
              </p>
            </div>
            
            <div className="p-4 bg-wine-50 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-wine-900 mb-2">Analiza</h3>
              <p className="text-sm text-gray-600">
                Estadísticas de tu colección
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Versión 0.1.0 - MVP en desarrollo</p>
            {renderBackendStatus()}
          </div>
        </div>
      </div>
    </div>
  );
};
