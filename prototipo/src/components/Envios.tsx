import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Plus, Search, MapPin, Truck, Package, Clock, CheckCircle2, Edit2, Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';

interface Envio {
  id: string;
  pedidoId: string;
  cliente: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  estado: string;
  fechaEnvio: string;
  fechaEntregaEstimada: string;
  fechaEntregaReal?: string;
  repartidor: string;
  observaciones: string;
}

export function Envios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedEnvio, setSelectedEnvio] = useState<Envio | null>(null);

  const [envios] = useState<Envio[]>([
    {
      id: 'ENV-001',
      pedidoId: 'PED-001',
      cliente: 'Juan Pérez',
      direccion: 'Av. Principal 123, Col. Centro',
      ciudad: 'Ciudad de México',
      telefono: '555-0101',
      estado: 'En Tránsito',
      fechaEnvio: '2024-11-06',
      fechaEntregaEstimada: '2024-11-08',
      repartidor: 'Eduardo Morales',
      observaciones: 'Entregar en horario de oficina (9am-6pm)',
    },
    {
      id: 'ENV-002',
      pedidoId: 'PED-002',
      cliente: 'María González',
      direccion: 'Calle Secundaria 456, Col. Roma',
      ciudad: 'Ciudad de México',
      telefono: '555-0102',
      estado: 'Entregado',
      fechaEnvio: '2024-11-04',
      fechaEntregaEstimada: '2024-11-05',
      fechaEntregaReal: '2024-11-05',
      repartidor: 'Eduardo Morales',
      observaciones: 'Entregado exitosamente, firmado por el cliente',
    },
    {
      id: 'ENV-003',
      pedidoId: 'PED-004',
      cliente: 'Ana Martínez',
      direccion: 'Zona Centro 321, Col. Juárez',
      ciudad: 'Ciudad de México',
      telefono: '555-0104',
      estado: 'En Preparación',
      fechaEnvio: '2024-11-08',
      fechaEntregaEstimada: '2024-11-09',
      repartidor: 'Eduardo Morales',
      observaciones: 'Pedido de gran tamaño, coordinar con el cliente',
    },
    {
      id: 'ENV-004',
      pedidoId: 'PED-005',
      cliente: 'Luis Hernández',
      direccion: 'Colonia Sur 654, Col. Del Valle',
      ciudad: 'Ciudad de México',
      telefono: '555-0105',
      estado: 'Entregado',
      fechaEnvio: '2024-11-03',
      fechaEntregaEstimada: '2024-11-04',
      fechaEntregaReal: '2024-11-04',
      repartidor: 'Eduardo Morales',
      observaciones: 'Entrega realizada sin problemas',
    },
    {
      id: 'ENV-005',
      pedidoId: 'PED-015',
      cliente: 'Sofia López',
      direccion: 'Av. Reforma 987, Col. Polanco',
      ciudad: 'Ciudad de México',
      telefono: '555-0106',
      estado: 'En Tránsito',
      fechaEnvio: '2024-11-07',
      fechaEntregaEstimada: '2024-11-08',
      repartidor: 'Eduardo Morales',
      observaciones: 'Cliente solicitó entrega antes de las 2pm',
    },
    {
      id: 'ENV-006',
      pedidoId: 'PED-018',
      cliente: 'Carlos Ruiz',
      direccion: 'Boulevard Norte 789, Col. Condesa',
      ciudad: 'Ciudad de México',
      telefono: '555-0103',
      estado: 'Pendiente',
      fechaEnvio: '2024-11-10',
      fechaEntregaEstimada: '2024-11-10',
      repartidor: 'Por asignar',
      observaciones: 'Pedido de encuadernación, manipular con cuidado',
    },
  ]);

  const getStatusColor = (estado: string) => {
    const styles = {
      'Pendiente': 'bg-gray-100 text-gray-800',
      'En Preparación': 'bg-yellow-100 text-yellow-800',
      'En Tránsito': 'bg-blue-100 text-blue-800',
      'Entregado': 'bg-green-100 text-green-800',
      'Cancelado': 'bg-red-100 text-red-800',
    };
    return styles[estado as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return <Clock className="w-4 h-4" />;
      case 'En Preparación':
        return <Package className="w-4 h-4" />;
      case 'En Tránsito':
        return <Truck className="w-4 h-4" />;
      case 'Entregado':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const filteredEnvios = envios.filter(envio => {
    const matchesSearch = envio.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         envio.pedidoId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         envio.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         envio.direccion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todos' || envio.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Envíos</h2>
          <p className="text-gray-600">Gestión de entregas y logística</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Envío
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Programar Nuevo Envío</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Pedido</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar pedido" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">PED-001 - Juan Pérez</SelectItem>
                    <SelectItem value="2">PED-003 - Carlos Ruiz</SelectItem>
                    <SelectItem value="3">PED-004 - Ana Martínez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Repartidor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar repartidor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Eduardo Morales</SelectItem>
                    <SelectItem value="2">Otro repartidor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Dirección de Entrega</Label>
                <Input placeholder="Calle, número, colonia" />
              </div>
              <div className="space-y-2">
                <Label>Ciudad</Label>
                <Input placeholder="Ciudad" />
              </div>
              <div className="space-y-2">
                <Label>Teléfono de Contacto</Label>
                <Input placeholder="555-0000" />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Envío</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Entrega Estimada</Label>
                <Input type="date" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Observaciones</Label>
                <Textarea placeholder="Instrucciones especiales de entrega..." rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Programar Envío
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por ID, pedido, cliente o dirección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En Preparación">En Preparación</SelectItem>
                <SelectItem value="En Tránsito">En Tránsito</SelectItem>
                <SelectItem value="Entregado">Entregado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Envios List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEnvios.map((envio) => (
          <Card key={envio.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{envio.id}</CardTitle>
                    <Badge className={getStatusColor(envio.estado)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(envio.estado)}
                        {envio.estado}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Pedido: {envio.pedidoId}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedEnvio(envio)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p>{envio.cliente}</p>
                <div className="flex items-start gap-2 mt-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>{envio.direccion}</p>
                    <p>{envio.ciudad}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Fecha de envío</p>
                  <p>{envio.fechaEnvio}</p>
                </div>
                <div>
                  <p className="text-gray-600">Entrega estimada</p>
                  <p>{envio.fechaEntregaEstimada}</p>
                </div>
                {envio.fechaEntregaReal && (
                  <div className="col-span-2">
                    <p className="text-gray-600">Entregado el</p>
                    <p className="text-green-600">{envio.fechaEntregaReal}</p>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Repartidor:</span>
                  <span>{envio.repartidor}</span>
                </div>
              </div>

              {envio.observaciones && (
                <div className="pt-2">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900">{envio.observaciones}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Dialog */}
      <Dialog open={selectedEnvio !== null} onOpenChange={() => setSelectedEnvio(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Envío</DialogTitle>
          </DialogHeader>
          {selectedEnvio && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">ID Envío</p>
                  <p>{selectedEnvio.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estado</p>
                  <Badge className={getStatusColor(selectedEnvio.estado)}>
                    {selectedEnvio.estado}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ID Pedido</p>
                  <p>{selectedEnvio.pedidoId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cliente</p>
                  <p>{selectedEnvio.cliente}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Dirección</p>
                  <p>{selectedEnvio.direccion}, {selectedEnvio.ciudad}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p>{selectedEnvio.telefono}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Repartidor</p>
                  <p>{selectedEnvio.repartidor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha de Envío</p>
                  <p>{selectedEnvio.fechaEnvio}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Entrega Estimada</p>
                  <p>{selectedEnvio.fechaEntregaEstimada}</p>
                </div>
                {selectedEnvio.fechaEntregaReal && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Fecha de Entrega Real</p>
                    <p className="text-green-600">{selectedEnvio.fechaEntregaReal}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Observaciones</p>
                <p className="p-3 bg-gray-50 rounded-lg">{selectedEnvio.observaciones}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
