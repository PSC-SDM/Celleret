import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
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
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-wine-800">
              ¡Bienvenido a Celleret!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Gestiona tu colección de vinos de forma profesional y elegante.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-wine-50 border-wine-200">
                <CardHeader className="pb-3">
                  <div className="text-3xl mb-2">📋</div>
                  <CardTitle className="text-wine-900">Organiza</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Mantén un registro detallado de todos tus vinos
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="bg-wine-50 border-wine-200">
                <CardHeader className="pb-3">
                  <div className="text-3xl mb-2">⏰</div>
                  <CardTitle className="text-wine-900">Planifica</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Conoce el momento óptimo de consumo
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="bg-wine-50 border-wine-200">
                <CardHeader className="pb-3">
                  <div className="text-3xl mb-2">📊</div>
                  <CardTitle className="text-wine-900">Analiza</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Estadísticas de tu colección
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 text-sm text-gray-500">
              <p>Versión 0.1.0 - MVP en desarrollo</p>
              {renderBackendStatus()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
