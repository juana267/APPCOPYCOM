import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Plus, Search, Eye, Edit2, Trash2, X } from 'lucide-react';
import { Badge } from './ui/badge';

interface ItemPedido {
  servicioId: string;
  servicioNombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

interface Pedido {
  id: string;
  fecha: string;
  cliente: string;
  servicio: string;
  cantidad: number;
  estado: string;
  total: string;
  fechaEntrega: string;
  descripcion: string;
}

// Servicios disponibles con precios
const serviciosDisponibles = [
  { id: '1', nombre: 'Impresión a Color', precio: 0.25 },
  { id: '2', nombre: 'Fotocopias B/N', precio: 0.05 },
  { id: '3', nombre: 'Copias a Color', precio: 0.40 },
  { id: '4', nombre: 'Encuadernación', precio: 5.00 },
  { id: '5', nombre: 'Impresión Gran Formato', precio: 15.00 },
  { id: '6', nombre: 'Plastificado', precio: 2.00 },
  { id: '7', nombre: 'Escaneo', precio: 0.10 },
  { id: '8', nombre: 'Diseño Gráfico', precio: 50.00 },
];

const clientesDisponibles = [
  { id: '1', nombre: 'Juan Pérez' },
  { id: '2', nombre: 'María González' },
  { id: '3', nombre: 'Carlos Ruiz' },
  { id: '4', nombre: 'Ana Martínez' },
  { id: '5', nombre: 'Luis Hernández' },
];

export function Pedidos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Estados para el nuevo pedido
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [cantidadActual, setCantidadActual] = useState('');
  const [itemsPedido, setItemsPedido] = useState<ItemPedido[]>([]);
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [descripcionPedido, setDescripcionPedido] = useState('');

  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: 'PED-001',
      fecha: '2024-11-05',
      cliente: 'Juan Pérez',
      servicio: 'Impresión a Color',
      cantidad: 500,
      estado: 'En Proceso',
      total: '$125.00',
      fechaEntrega: '2024-11-08',
      descripcion: '500 volantes a todo color, tamaño A5',
    },
    {
      id: 'PED-002',
      fecha: '2024-11-04',
      cliente: 'María González',
      servicio: 'Fotocopias B/N',
      cantidad: 1000,
      estado: 'Completado',
      total: '$50.00',
      fechaEntrega: '2024-11-05',
      descripcion: '1000 copias en blanco y negro, tamaño carta',
    },
    {
      id: 'PED-003',
      fecha: '2024-11-06',
      cliente: 'Carlos Ruiz',
      servicio: 'Encuadernación',
      cantidad: 15,
      estado: 'Pendiente',
      total: '$75.00',
      fechaEntrega: '2024-11-10',
      descripcion: '15 tesis encuadernadas en pasta dura',
    },
    {
      id: 'PED-004',
      fecha: '2024-11-06',
      cliente: 'Ana Martínez',
      servicio: 'Impresión Gran Formato',
      cantidad: 3,
      estado: 'En Proceso',
      total: '$45.00',
      fechaEntrega: '2024-11-09',
      descripcion: '3 banners de 2x1 metros',
    },
    {
      id: 'PED-005',
      fecha: '2024-11-03',
      cliente: 'Luis Hernández',
      servicio: 'Copias a Color',
      cantidad: 250,
      estado: 'Completado',
      total: '$100.00',
      fechaEntrega: '2024-11-04',
      descripcion: '250 copias a color, tamaño oficio',
    },
  ]);

  const agregarItemPedido = () => {
    if (!servicioSeleccionado || !cantidadActual || parseFloat(cantidadActual) <= 0) {
      alert('Por favor seleccione un servicio y una cantidad válida');
      return;
    }

    const servicio = serviciosDisponibles.find(s => s.id === servicioSeleccionado);
    if (!servicio) return;

    const cantidad = parseFloat(cantidadActual);
    const subtotal = cantidad * servicio.precio;

    const nuevoItem: ItemPedido = {
      servicioId: servicio.id,
      servicioNombre: servicio.nombre,
      cantidad: cantidad,
      precioUnitario: servicio.precio,
      subtotal: subtotal,
    };

    setItemsPedido([...itemsPedido, nuevoItem]);
    setServicioSeleccionado('');
    setCantidadActual('');
  };

  const eliminarItemPedido = (index: number) => {
    const nuevosItems = itemsPedido.filter((_, i) => i !== index);
    setItemsPedido(nuevosItems);
  };

  const calcularTotal = () => {
    return itemsPedido.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const crearPedido = () => {
    if (!clienteSeleccionado || itemsPedido.length === 0 || !fechaEntrega) {
      alert('Por favor complete todos los campos requeridos y agregue al menos un servicio');
      return;
    }

    const cliente = clientesDisponibles.find(c => c.id === clienteSeleccionado);
    if (!cliente) return;

    const totalPedido = calcularTotal();
    const nuevoPedidoId = `PED-${String(pedidos.length + 1).padStart(3, '0')}`;

    // Crear descripción del pedido
    const descripcionCompleta = itemsPedido.map(item => 
      `${item.servicioNombre} - ${item.cantidad} unidades`
    ).join(', ') + (descripcionPedido ? `. ${descripcionPedido}` : '');

    const nuevoPedido: Pedido = {
      id: nuevoPedidoId,
      fecha: new Date().toISOString().split('T')[0],
      cliente: cliente.nombre,
      servicio: itemsPedido.length === 1 ? itemsPedido[0].servicioNombre : 'Múltiples servicios',
      cantidad: itemsPedido.reduce((sum, item) => sum + item.cantidad, 0),
      estado: 'Pendiente',
      total: `$${totalPedido.toFixed(2)}`,
      fechaEntrega: fechaEntrega,
      descripcion: descripcionCompleta,
    };

    setPedidos([nuevoPedido, ...pedidos]);
    
    // Limpiar formulario
    setClienteSeleccionado('');
    setItemsPedido([]);
    setFechaEntrega('');
    setDescripcionPedido('');
    setIsAddDialogOpen(false);
    
    alert(`Pedido ${nuevoPedidoId} creado exitosamente por $${totalPedido.toFixed(2)}`);
  };

  const getStatusBadge = (estado: string) => {
    const styles = {
      'Completado': 'bg-green-100 text-green-800',
      'En Proceso': 'bg-blue-100 text-blue-800',
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Cancelado': 'bg-red-100 text-red-800',
    };
    return styles[estado as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const filteredPedidos = pedidos.filter(pedido => {
    const matchesSearch = pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.servicio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todos' || pedido.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Pedidos</h2>
          <p className="text-gray-600">Gestión de pedidos y servicios</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Pedido</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Cliente y Fecha */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cliente *</Label>
                  <Select value={clienteSeleccionado} onValueChange={setClienteSeleccionado}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientesDisponibles.map(cliente => (
                        <SelectItem key={cliente.id} value={cliente.id}>
                          {cliente.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fecha de Entrega *</Label>
                  <Input 
                    type="date" 
                    value={fechaEntrega}
                    onChange={(e) => setFechaEntrega(e.target.value)}
                  />
                </div>
              </div>

              {/* Agregar Servicios */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="mb-4">Agregar Servicios al Pedido</h4>
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-6 space-y-2">
                    <Label>Servicio</Label>
                    <Select value={servicioSeleccionado} onValueChange={setServicioSeleccionado}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviciosDisponibles.map(servicio => (
                          <SelectItem key={servicio.id} value={servicio.id}>
                            {servicio.nombre} - ${servicio.precio.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label>Cantidad</Label>
                    <Input 
                      type="number" 
                      placeholder="0"
                      value={cantidadActual}
                      onChange={(e) => setCantidadActual(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label>Subtotal</Label>
                    <div className="h-10 flex items-center px-3 bg-white border border-gray-200 rounded-md">
                      {servicioSeleccionado && cantidadActual ? (
                        <span className="text-green-600">
                          ${(parseFloat(cantidadActual) * (serviciosDisponibles.find(s => s.id === servicioSeleccionado)?.precio || 0)).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-gray-400">$0.00</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={agregarItemPedido} 
                  className="mt-3"
                  type="button"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Servicio
                </Button>
              </div>

              {/* Lista de Items Agregados */}
              {itemsPedido.length > 0 && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2">
                    <h4>Servicios Agregados ({itemsPedido.length})</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-3 text-sm text-gray-600">Servicio</th>
                          <th className="text-right p-3 text-sm text-gray-600">Cantidad</th>
                          <th className="text-right p-3 text-sm text-gray-600">Precio Unit.</th>
                          <th className="text-right p-3 text-sm text-gray-600">Subtotal</th>
                          <th className="text-center p-3 text-sm text-gray-600">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemsPedido.map((item, index) => (
                          <tr key={index} className="border-t border-gray-100">
                            <td className="p-3">{item.servicioNombre}</td>
                            <td className="p-3 text-right">{item.cantidad}</td>
                            <td className="p-3 text-right">${item.precioUnitario.toFixed(2)}</td>
                            <td className="p-3 text-right text-green-600">${item.subtotal.toFixed(2)}</td>
                            <td className="p-3 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => eliminarItemPedido(index)}
                              >
                                <X className="w-4 h-4 text-red-600" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                        <tr>
                          <td colSpan={3} className="p-3 text-right">Total:</td>
                          <td className="p-3 text-right text-green-600 text-lg">
                            ${calcularTotal().toFixed(2)}
                          </td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}

              {/* Descripción adicional */}
              <div className="space-y-2">
                <Label>Descripción Adicional (opcional)</Label>
                <Textarea 
                  placeholder="Detalles adicionales del pedido..." 
                  rows={3}
                  value={descripcionPedido}
                  onChange={(e) => setDescripcionPedido(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-lg">
                Total del Pedido: <span className="text-green-600">${calcularTotal().toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  setIsAddDialogOpen(false);
                  setItemsPedido([]);
                  setClienteSeleccionado('');
                  setFechaEntrega('');
                  setDescripcionPedido('');
                }}>
                  Cancelar
                </Button>
                <Button onClick={crearPedido}>
                  Crear Pedido
                </Button>
              </div>
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
                placeholder="Buscar por ID, cliente o servicio..."
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
                <SelectItem value="En Proceso">En Proceso</SelectItem>
                <SelectItem value="Completado">Completado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pedidos Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos ({filteredPedidos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 text-gray-600">ID</th>
                  <th className="text-left p-4 text-gray-600">Fecha</th>
                  <th className="text-left p-4 text-gray-600">Cliente</th>
                  <th className="text-left p-4 text-gray-600">Servicio</th>
                  <th className="text-left p-4 text-gray-600">Cantidad</th>
                  <th className="text-left p-4 text-gray-600">Estado</th>
                  <th className="text-left p-4 text-gray-600">Total</th>
                  <th className="text-left p-4 text-gray-600">Entrega</th>
                  <th className="text-left p-4 text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPedidos.map((pedido) => (
                  <tr key={pedido.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">{pedido.id}</td>
                    <td className="p-4 text-gray-600">{pedido.fecha}</td>
                    <td className="p-4">{pedido.cliente}</td>
                    <td className="p-4 text-gray-600">{pedido.servicio}</td>
                    <td className="p-4">{pedido.cantidad}</td>
                    <td className="p-4">
                      <Badge className={getStatusBadge(pedido.estado)}>
                        {pedido.estado}
                      </Badge>
                    </td>
                    <td className="p-4 text-green-600">{pedido.total}</td>
                    <td className="p-4 text-gray-600">{pedido.fechaEntrega}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPedido(pedido)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={selectedPedido !== null} onOpenChange={() => setSelectedPedido(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Pedido</DialogTitle>
          </DialogHeader>
          {selectedPedido && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">ID Pedido</p>
                  <p>{selectedPedido.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estado</p>
                  <Badge className={getStatusBadge(selectedPedido.estado)}>
                    {selectedPedido.estado}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cliente</p>
                  <p>{selectedPedido.cliente}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha</p>
                  <p>{selectedPedido.fecha}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Servicio</p>
                  <p>{selectedPedido.servicio}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cantidad</p>
                  <p>{selectedPedido.cantidad}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha de Entrega</p>
                  <p>{selectedPedido.fechaEntrega}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-green-600">{selectedPedido.total}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Descripción</p>
                <p className="mt-1">{selectedPedido.descripcion}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
