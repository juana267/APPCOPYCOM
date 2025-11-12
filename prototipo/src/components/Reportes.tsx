import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart3, TrendingUp, TrendingDown, Download, Calendar, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Reportes() {
  const [periodoVentas, setPeriodoVentas] = useState('mes');
  const [periodoServicios, setPeriodoServicios] = useState('mes');

  // Datos de ventas por día (último mes)
  const ventasPorDia = [
    { fecha: '01 Nov', ventas: 1250, pedidos: 8 },
    { fecha: '02 Nov', ventas: 980, pedidos: 6 },
    { fecha: '03 Nov', ventas: 1450, pedidos: 10 },
    { fecha: '04 Nov', ventas: 2100, pedidos: 12 },
    { fecha: '05 Nov', ventas: 1890, pedidos: 11 },
    { fecha: '06 Nov', ventas: 2340, pedidos: 14 },
    { fecha: '07 Nov', ventas: 1670, pedidos: 9 },
  ];

  // Datos de ventas por mes (último año)
  const ventasPorMes = [
    { mes: 'Ene', ventas: 32500, pedidos: 156 },
    { mes: 'Feb', ventas: 28900, pedidos: 142 },
    { mes: 'Mar', ventas: 35600, pedidos: 178 },
    { mes: 'Abr', ventas: 31200, pedidos: 165 },
    { mes: 'May', ventas: 38900, pedidos: 192 },
    { mes: 'Jun', ventas: 42300, pedidos: 205 },
    { mes: 'Jul', ventas: 39800, pedidos: 188 },
    { mes: 'Ago', ventas: 44500, pedidos: 215 },
    { mes: 'Sep', ventas: 41200, pedidos: 198 },
    { mes: 'Oct', ventas: 45800, pedidos: 223 },
    { mes: 'Nov', ventas: 48900, pedimos: 236 },
  ];

  // Servicios más vendidos
  const serviciosMasVendidos = [
    { nombre: 'Impresión a Color', ventas: 12500, cantidad: 285, porcentaje: 28 },
    { nombre: 'Fotocopias B/N', ventas: 8900, cantidad: 420, porcentaje: 20 },
    { nombre: 'Copias a Color', ventas: 7800, cantidad: 198, porcentaje: 17 },
    { nombre: 'Encuadernación', ventas: 6500, cantidad: 142, porcentaje: 15 },
    { nombre: 'Gran Formato', ventas: 5400, cantidad: 68, porcentaje: 12 },
    { nombre: 'Otros', ventas: 3600, cantidad: 95, porcentaje: 8 },
  ];

  // Datos para gráfico de pie
  const ventasPorServicio = serviciosMasVendidos.map(s => ({
    name: s.nombre,
    value: s.ventas,
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#6b7280'];

  // Top clientes
  const topClientes = [
    { nombre: 'Carlos Ruiz', pedidos: 22, totalGastado: 3240.75 },
    { nombre: 'Sofia López', pedidos: 18, totalGastado: 2340.50 },
    { nombre: 'Juan Pérez', pedidos: 15, totalGastado: 1850.00 },
    { nombre: 'Luis Hernández', pedidos: 12, totalGastado: 1455.25 },
    { nombre: 'María González', pedidos: 8, totalGastado: 925.50 },
  ];

  // Estadísticas generales
  const estadisticas = [
    {
      titulo: 'Ventas del Mes',
      valor: '$48,900',
      cambio: '+23%',
      tipo: 'aumento',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      titulo: 'Pedidos del Mes',
      valor: '236',
      cambio: '+12%',
      tipo: 'aumento',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      titulo: 'Ticket Promedio',
      valor: '$207.20',
      cambio: '+8%',
      tipo: 'aumento',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      titulo: 'Clientes Activos',
      valor: '156',
      cambio: '+5%',
      tipo: 'aumento',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const exportarReporte = () => {
    // Simular exportación
    alert('Exportando reporte en formato PDF...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Reportes de Ventas</h2>
          <p className="text-gray-600">Análisis y estadísticas del negocio</p>
        </div>
        <Button onClick={exportarReporte}>
          <Download className="w-4 h-4 mr-2" />
          Exportar Reporte
        </Button>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {estadisticas.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.titulo}</p>
                    <p className="text-3xl mt-2">{stat.valor}</p>
                    <p className="text-sm mt-1">
                      <span className={stat.tipo === 'aumento' ? 'text-green-600' : 'text-red-600'}>
                        {stat.tipo === 'aumento' ? <TrendingUp className="w-3 h-3 inline mr-1" /> : <TrendingDown className="w-3 h-3 inline mr-1" />}
                        {stat.cambio}
                      </span>
                      <span className="text-gray-500"> vs mes anterior</span>
                    </p>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráfico de Ventas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Ventas por Período</CardTitle>
            <Select value={periodoVentas} onValueChange={setPeriodoVentas}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semana">Última Semana</SelectItem>
                <SelectItem value="mes">Último Mes</SelectItem>
                <SelectItem value="año">Último Año</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={periodoVentas === 'año' ? ventasPorMes : ventasPorDia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={periodoVentas === 'año' ? 'mes' : 'fecha'} />
              <YAxis />
              <Tooltip 
                formatter={(value) => `$${value}`}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="ventas" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Ventas ($)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="pedidos" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Pedidos"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Servicios y Clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Servicios más vendidos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Servicios Más Vendidos</CardTitle>
              <Select value={periodoServicios} onValueChange={setPeriodoServicios}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mes">Este Mes</SelectItem>
                  <SelectItem value="trimestre">Trimestre</SelectItem>
                  <SelectItem value="año">Este Año</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviciosMasVendidos.map((servicio, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{servicio.nombre}</span>
                    <span className="text-green-600">${servicio.ventas.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${servicio.porcentaje}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{servicio.porcentaje}%</span>
                  </div>
                  <p className="text-xs text-gray-500">{servicio.cantidad} órdenes</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clientes */}
        <Card>
          <CardHeader>
            <CardTitle>Top Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClientes.map((cliente, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p>{cliente.nombre}</p>
                      <p className="text-sm text-gray-600">{cliente.pedidos} pedidos</p>
                    </div>
                  </div>
                  <p className="text-green-600">${cliente.totalGastado.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Barras y Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras */}
        <Card>
          <CardHeader>
            <CardTitle>Comparativa Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ventasPorMes.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `$${value}`}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="ventas" fill="#3b82f6" name="Ventas ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Pie */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Servicio</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ventasPorServicio}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ventasPorServicio.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `$${value}`}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resumen Ejecutivo */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen Ejecutivo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">Servicio Estrella</p>
              <p className="text-xl mt-1">Impresión a Color</p>
              <p className="text-sm text-gray-600 mt-1">28% de las ventas totales</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Mejor Cliente</p>
              <p className="text-xl mt-1">Carlos Ruiz</p>
              <p className="text-sm text-gray-600 mt-1">$3,240.75 en ventas</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600">Crecimiento</p>
              <p className="text-xl mt-1">+23% este mes</p>
              <p className="text-sm text-gray-600 mt-1">Respecto al mes anterior</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
