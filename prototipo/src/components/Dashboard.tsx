import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FileText, Users, DollarSign, TrendingUp, Clock, CheckCircle2, XCircle, Package } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Pedidos Activos',
      value: '24',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
    },
    {
      title: 'Clientes Totales',
      value: '156',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
    },
    {
      title: 'Ingresos del Mes',
      value: '$45,890',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+23%',
    },
    {
      title: 'Materiales Bajos',
      value: '7',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-2',
    },
  ];

  const recentOrders = [
    { id: 'PED-001', cliente: 'Juan Pérez', servicio: 'Impresión a Color', estado: 'En Proceso', total: '$125.00' },
    { id: 'PED-002', cliente: 'María González', servicio: 'Fotocopias B/N', estado: 'Completado', total: '$35.50' },
    { id: 'PED-003', cliente: 'Carlos Ruiz', servicio: 'Encuadernación', estado: 'Pendiente', total: '$80.00' },
    { id: 'PED-004', cliente: 'Ana Martínez', servicio: 'Impresión Gran Formato', estado: 'En Proceso', total: '$340.00' },
    { id: 'PED-005', cliente: 'Luis Hernández', servicio: 'Copias a Color', estado: 'Completado', total: '$95.75' },
  ];

  const getStatusBadge = (estado: string) => {
    const styles = {
      'Completado': 'bg-green-100 text-green-800',
      'En Proceso': 'bg-blue-100 text-blue-800',
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Cancelado': 'bg-red-100 text-red-800',
    };
    return styles[estado as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl">Dashboard</h2>
        <p className="text-gray-600">Resumen general del sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-3xl mt-2">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {stat.change}
                      </span>
                      {' '}vs mes anterior
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

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p>{order.id}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(order.estado)}`}>
                        {order.estado}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{order.cliente}</p>
                    <p className="text-sm text-gray-500">{order.servicio}</p>
                  </div>
                  <p className="text-blue-600">{order.total}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Máquinas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p>Impresora HP LaserJet Pro</p>
                    <p className="text-sm text-gray-500">Operativa - 98% tinta</p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p>Copiadora Canon IR-ADV</p>
                    <p className="text-sm text-gray-500">Operativa - 75% tóner</p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p>Plotter Epson SureColor</p>
                    <p className="text-sm text-gray-500">En uso - 45% tinta</p>
                  </div>
                </div>
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <p>Encuadernadora Thermal</p>
                    <p className="text-sm text-gray-500">Mantenimiento requerido</p>
                  </div>
                </div>
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
