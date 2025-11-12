import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Search, Mail, Phone, MapPin, Edit2, Trash2 } from 'lucide-react';

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  pedidos: number;
  totalGastado: string;
  fechaRegistro: string;
}

export function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [clientes] = useState<Cliente[]>([
    {
      id: 'CLI-001',
      nombre: 'Juan Pérez',
      email: 'juan.perez@email.com',
      telefono: '555-0101',
      direccion: 'Av. Principal 123, Ciudad',
      pedidos: 15,
      totalGastado: '$1,850.00',
      fechaRegistro: '2024-01-15',
    },
    {
      id: 'CLI-002',
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '555-0102',
      direccion: 'Calle Secundaria 456, Ciudad',
      pedidos: 8,
      totalGastado: '$925.50',
      fechaRegistro: '2024-02-20',
    },
    {
      id: 'CLI-003',
      nombre: 'Carlos Ruiz',
      email: 'carlos.ruiz@email.com',
      telefono: '555-0103',
      direccion: 'Boulevard Norte 789, Ciudad',
      pedidos: 22,
      totalGastado: '$3,240.75',
      fechaRegistro: '2023-11-10',
    },
    {
      id: 'CLI-004',
      nombre: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      telefono: '555-0104',
      direccion: 'Zona Centro 321, Ciudad',
      pedidos: 5,
      totalGastado: '$680.00',
      fechaRegistro: '2024-05-08',
    },
    {
      id: 'CLI-005',
      nombre: 'Luis Hernández',
      email: 'luis.hernandez@email.com',
      telefono: '555-0105',
      direccion: 'Colonia Sur 654, Ciudad',
      pedidos: 12,
      totalGastado: '$1,455.25',
      fechaRegistro: '2024-03-12',
    },
    {
      id: 'CLI-006',
      nombre: 'Sofia López',
      email: 'sofia.lopez@email.com',
      telefono: '555-0106',
      direccion: 'Av. Reforma 987, Ciudad',
      pedidos: 18,
      totalGastado: '$2,340.50',
      fechaRegistro: '2023-12-05',
    },
  ]);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Clientes</h2>
          <p className="text-gray-600">Gestión de clientes y contactos</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Cliente</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2 space-y-2">
                <Label>Nombre Completo</Label>
                <Input placeholder="Ej: Juan Pérez García" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="cliente@email.com" />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input placeholder="555-0000" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Dirección</Label>
                <Input placeholder="Calle, número, colonia, ciudad" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Registrar Cliente
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, email o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clientes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClientes.map((cliente) => (
          <Card key={cliente.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{cliente.nombre}</CardTitle>
                  <p className="text-sm text-gray-500">{cliente.id}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{cliente.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{cliente.telefono}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{cliente.direccion}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Pedidos</p>
                  <p className="text-blue-600">{cliente.pedidos}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Gastado</p>
                  <p className="text-green-600">{cliente.totalGastado}</p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs text-gray-500">Cliente desde: {cliente.fechaRegistro}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClientes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-gray-500">
            No se encontraron clientes
          </CardContent>
        </Card>
      )}
    </div>
  );
}
