import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Plus, Search, Wrench, Calendar, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface Maquina {
  id: string;
  nombre: string;
  tipo: string;
  marca: string;
  modelo: string;
  estado: string;
  ubicacion: string;
  fechaCompra: string;
  ultimoMantenimiento: string;
  proximoMantenimiento: string;
  nivelConsumo: number;
  observaciones: string;
}

export function Maquinas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedMaquina, setSelectedMaquina] = useState<Maquina | null>(null);

  const [maquinas] = useState<Maquina[]>([
    {
      id: 'MAQ-001',
      nombre: 'Impresora Láser Principal',
      tipo: 'Impresora Láser',
      marca: 'HP',
      modelo: 'LaserJet Pro M454dw',
      estado: 'Operativa',
      ubicacion: 'Área de Producción - Zona A',
      fechaCompra: '2022-03-15',
      ultimoMantenimiento: '2024-10-15',
      proximoMantenimiento: '2025-01-15',
      nivelConsumo: 98,
      observaciones: 'Funcionando perfectamente, tóner al 98%',
    },
    {
      id: 'MAQ-002',
      nombre: 'Copiadora Multifuncional',
      tipo: 'Copiadora',
      marca: 'Canon',
      modelo: 'imageRUNNER ADVANCE C5550i',
      estado: 'Operativa',
      ubicacion: 'Área de Producción - Zona B',
      fechaCompra: '2021-08-20',
      ultimoMantenimiento: '2024-10-20',
      proximoMantenimiento: '2025-01-20',
      nivelConsumo: 75,
      observaciones: 'Tóner al 75%, funcionamiento normal',
    },
    {
      id: 'MAQ-003',
      nombre: 'Plotter Gran Formato',
      tipo: 'Plotter',
      marca: 'Epson',
      modelo: 'SureColor T3170',
      estado: 'En Uso',
      ubicacion: 'Área de Gran Formato',
      fechaCompra: '2023-01-10',
      ultimoMantenimiento: '2024-11-01',
      proximoMantenimiento: '2025-02-01',
      nivelConsumo: 45,
      observaciones: 'Imprimiendo orden #234, tinta al 45%',
    },
    {
      id: 'MAQ-004',
      nombre: 'Encuadernadora Térmica',
      tipo: 'Encuadernadora',
      marca: 'Fellowes',
      modelo: 'Thermal Binding Machine',
      estado: 'Mantenimiento',
      ubicacion: 'Área de Acabados',
      fechaCompra: '2020-06-05',
      ultimoMantenimiento: '2024-11-05',
      proximoMantenimiento: '2024-11-12',
      nivelConsumo: 0,
      observaciones: 'En mantenimiento preventivo, disponible en 2 días',
    },
    {
      id: 'MAQ-005',
      nombre: 'Guillotina Eléctrica',
      tipo: 'Guillotina',
      marca: 'Ideal',
      modelo: '5255',
      estado: 'Operativa',
      ubicacion: 'Área de Acabados',
      fechaCompra: '2021-11-18',
      ultimoMantenimiento: '2024-09-10',
      proximoMantenimiento: '2024-12-10',
      nivelConsumo: 100,
      observaciones: 'Cuchilla recién afilada, excelente estado',
    },
    {
      id: 'MAQ-006',
      nombre: 'Plastificadora Industrial',
      tipo: 'Plastificadora',
      marca: 'GBC',
      modelo: 'HeatSeal H700 Pro',
      estado: 'Operativa',
      ubicacion: 'Área de Acabados',
      fechaCompra: '2022-09-22',
      ultimoMantenimiento: '2024-10-28',
      proximoMantenimiento: '2025-01-28',
      nivelConsumo: 85,
      observaciones: 'Rodillos en buen estado',
    },
  ]);

  const getStatusColor = (estado: string) => {
    const styles = {
      'Operativa': 'bg-green-100 text-green-800',
      'En Uso': 'bg-blue-100 text-blue-800',
      'Mantenimiento': 'bg-yellow-100 text-yellow-800',
      'Fuera de Servicio': 'bg-red-100 text-red-800',
    };
    return styles[estado as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const filteredMaquinas = maquinas.filter(maquina => {
    const matchesSearch = maquina.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         maquina.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         maquina.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         maquina.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todos' || maquina.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Máquinas</h2>
          <p className="text-gray-600">Control de equipos y mantenimiento</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Máquina
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Máquina</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2 space-y-2">
                <Label>Nombre de la Máquina</Label>
                <Input placeholder="Ej: Impresora Láser Principal" />
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Input placeholder="Ej: Impresora, Copiadora" />
              </div>
              <div className="space-y-2">
                <Label>Marca</Label>
                <Input placeholder="Ej: HP, Canon" />
              </div>
              <div className="space-y-2">
                <Label>Modelo</Label>
                <Input placeholder="Modelo del equipo" />
              </div>
              <div className="space-y-2">
                <Label>Ubicación</Label>
                <Input placeholder="Ej: Área de Producción" />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Compra</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select defaultValue="Operativa">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operativa">Operativa</SelectItem>
                    <SelectItem value="En Uso">En Uso</SelectItem>
                    <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                    <SelectItem value="Fuera de Servicio">Fuera de Servicio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Observaciones</Label>
                <Textarea placeholder="Notas adicionales..." rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Registrar Máquina
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
                placeholder="Buscar por nombre, tipo, marca o ID..."
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
                <SelectItem value="Operativa">Operativa</SelectItem>
                <SelectItem value="En Uso">En Uso</SelectItem>
                <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                <SelectItem value="Fuera de Servicio">Fuera de Servicio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Maquinas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMaquinas.map((maquina) => (
          <Card key={maquina.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{maquina.nombre}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{maquina.id} • {maquina.tipo}</p>
                  <Badge className={`${getStatusColor(maquina.estado)} mt-2`}>
                    {maquina.estado}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedMaquina(maquina)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Marca</p>
                  <p>{maquina.marca}</p>
                </div>
                <div>
                  <p className="text-gray-600">Modelo</p>
                  <p>{maquina.modelo}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600">Ubicación</p>
                  <p>{maquina.ubicacion}</p>
                </div>
              </div>

              {maquina.nivelConsumo > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Nivel de Consumible</p>
                    <p className="text-sm">{maquina.nivelConsumo}%</p>
                  </div>
                  <Progress value={maquina.nivelConsumo} className="h-2" />
                </div>
              )}

              <div className="pt-3 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Wrench className="w-4 h-4" />
                  <span>Último mant.: {maquina.ultimoMantenimiento}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Próximo mant.: {maquina.proximoMantenimiento}</span>
                </div>
              </div>

              {maquina.observaciones && (
                <div className="pt-2">
                  <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-900">{maquina.observaciones}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Dialog */}
      <Dialog open={selectedMaquina !== null} onOpenChange={() => setSelectedMaquina(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de la Máquina</DialogTitle>
          </DialogHeader>
          {selectedMaquina && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">ID</p>
                  <p>{selectedMaquina.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estado</p>
                  <Badge className={getStatusColor(selectedMaquina.estado)}>
                    {selectedMaquina.estado}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p>{selectedMaquina.nombre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipo</p>
                  <p>{selectedMaquina.tipo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Marca</p>
                  <p>{selectedMaquina.marca}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Modelo</p>
                  <p>{selectedMaquina.modelo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha de Compra</p>
                  <p>{selectedMaquina.fechaCompra}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Ubicación</p>
                  <p>{selectedMaquina.ubicacion}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Último Mantenimiento</p>
                  <p>{selectedMaquina.ultimoMantenimiento}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Próximo Mantenimiento</p>
                  <p>{selectedMaquina.proximoMantenimiento}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Observaciones</p>
                <p className="p-3 bg-gray-50 rounded-lg">{selectedMaquina.observaciones}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
