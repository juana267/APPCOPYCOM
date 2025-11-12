import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Search, Mail, Phone, Calendar, Edit2, Trash2, User } from 'lucide-react';
import { Badge } from './ui/badge';

interface Trabajador {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  puesto: string;
  departamento: string;
  fechaContratacion: string;
  salario: string;
  estado: string;
}

export function Trabajadores() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartamento, setFilterDepartamento] = useState('todos');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [trabajadores] = useState<Trabajador[]>([
    {
      id: 'TRB-001',
      nombre: 'Roberto Sánchez',
      email: 'roberto.sanchez@copiaexpress.com',
      telefono: '555-1001',
      puesto: 'Gerente General',
      departamento: 'Administración',
      fechaContratacion: '2020-01-15',
      salario: '$2,500.00',
      estado: 'Activo',
    },
    {
      id: 'TRB-002',
      nombre: 'Patricia Gómez',
      email: 'patricia.gomez@copiaexpress.com',
      telefono: '555-1002',
      puesto: 'Operador de Impresión',
      departamento: 'Producción',
      fechaContratacion: '2021-03-20',
      salario: '$1,200.00',
      estado: 'Activo',
    },
    {
      id: 'TRB-003',
      nombre: 'Miguel Torres',
      email: 'miguel.torres@copiaexpress.com',
      telefono: '555-1003',
      puesto: 'Diseñador Gráfico',
      departamento: 'Diseño',
      fechaContratacion: '2021-06-10',
      salario: '$1,500.00',
      estado: 'Activo',
    },
    {
      id: 'TRB-004',
      nombre: 'Laura Ramírez',
      email: 'laura.ramirez@copiaexpress.com',
      telefono: '555-1004',
      puesto: 'Atención al Cliente',
      departamento: 'Ventas',
      fechaContratacion: '2022-01-08',
      salario: '$1,100.00',
      estado: 'Activo',
    },
    {
      id: 'TRB-005',
      nombre: 'Jorge Díaz',
      email: 'jorge.diaz@copiaexpress.com',
      telefono: '555-1005',
      puesto: 'Técnico de Mantenimiento',
      departamento: 'Mantenimiento',
      fechaContratacion: '2020-09-15',
      salario: '$1,400.00',
      estado: 'Activo',
    },
    {
      id: 'TRB-006',
      nombre: 'Carmen Flores',
      email: 'carmen.flores@copiaexpress.com',
      telefono: '555-1006',
      puesto: 'Encargada de Encuadernación',
      departamento: 'Producción',
      fechaContratacion: '2021-11-22',
      salario: '$1,150.00',
      estado: 'Activo',
    },
    {
      id: 'TRB-007',
      nombre: 'Eduardo Morales',
      email: 'eduardo.morales@copiaexpress.com',
      telefono: '555-1007',
      puesto: 'Repartidor',
      departamento: 'Logística',
      fechaContratacion: '2022-05-03',
      salario: '$1,000.00',
      estado: 'Activo',
    },
    {
      id: 'TRB-008',
      nombre: 'Gabriela Castro',
      email: 'gabriela.castro@copiaexpress.com',
      telefono: '555-1008',
      puesto: 'Contador',
      departamento: 'Administración',
      fechaContratacion: '2020-07-12',
      salario: '$1,800.00',
      estado: 'Activo',
    },
  ]);

  const departamentos = Array.from(new Set(trabajadores.map(t => t.departamento)));

  const filteredTrabajadores = trabajadores.filter(trabajador => {
    const matchesSearch = trabajador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trabajador.puesto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trabajador.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartamento = filterDepartamento === 'todos' || trabajador.departamento === filterDepartamento;
    return matchesSearch && matchesDepartamento;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Trabajadores</h2>
          <p className="text-gray-600">Gestión de personal y empleados</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Trabajador
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Trabajador</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2 space-y-2">
                <Label>Nombre Completo</Label>
                <Input placeholder="Nombre completo del empleado" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="empleado@copiaexpress.com" />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input placeholder="555-0000" />
              </div>
              <div className="space-y-2">
                <Label>Puesto</Label>
                <Input placeholder="Ej: Operador de Impresión" />
              </div>
              <div className="space-y-2">
                <Label>Departamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administración">Administración</SelectItem>
                    <SelectItem value="Producción">Producción</SelectItem>
                    <SelectItem value="Ventas">Ventas</SelectItem>
                    <SelectItem value="Diseño">Diseño</SelectItem>
                    <SelectItem value="Logística">Logística</SelectItem>
                    <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fecha de Contratación</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Salario Mensual</Label>
                <Input type="number" placeholder="0.00" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Registrar Trabajador
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
                placeholder="Buscar por nombre, puesto o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterDepartamento} onValueChange={setFilterDepartamento}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los departamentos</SelectItem>
                {departamentos.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trabajadores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrabajadores.map((trabajador) => (
          <Card key={trabajador.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{trabajador.nombre}</CardTitle>
                    <p className="text-sm text-gray-500">{trabajador.id}</p>
                  </div>
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
              <div>
                <p>{trabajador.puesto}</p>
                <Badge className="bg-blue-100 text-blue-800 mt-1">
                  {trabajador.departamento}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{trabajador.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{trabajador.telefono}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Desde {trabajador.fechaContratacion}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Salario Mensual</p>
                  <p className="text-green-600">{trabajador.salario}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {trabajador.estado}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
