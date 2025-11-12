import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Search, AlertTriangle, Edit2, Trash2, Package } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface Material {
  id: string;
  nombre: string;
  categoria: string;
  cantidadActual: number;
  cantidadMinima: number;
  unidad: string;
  precioUnitario: string;
  proveedor: string;
  ultimaCompra: string;
}

export function Materiales() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [materiales] = useState<Material[]>([
    {
      id: 'MAT-001',
      nombre: 'Papel Bond Carta',
      categoria: 'Papel',
      cantidadActual: 5000,
      cantidadMinima: 2000,
      unidad: 'hojas',
      precioUnitario: '$0.02',
      proveedor: 'Papelería Central',
      ultimaCompra: '2024-10-28',
    },
    {
      id: 'MAT-002',
      nombre: 'Tóner Negro HP',
      categoria: 'Tinta/Tóner',
      cantidadActual: 3,
      cantidadMinima: 5,
      unidad: 'cartuchos',
      precioUnitario: '$85.00',
      proveedor: 'Suministros Office',
      ultimaCompra: '2024-11-01',
    },
    {
      id: 'MAT-003',
      nombre: 'Tinta Color Epson',
      categoria: 'Tinta/Tóner',
      cantidadActual: 8,
      cantidadMinima: 4,
      unidad: 'cartuchos',
      precioUnitario: '$45.00',
      proveedor: 'Suministros Office',
      ultimaCompra: '2024-11-03',
    },
    {
      id: 'MAT-004',
      nombre: 'Papel Couché',
      categoria: 'Papel',
      cantidadActual: 800,
      cantidadMinima: 1000,
      unidad: 'hojas',
      precioUnitario: '$0.15',
      proveedor: 'Papelería Central',
      ultimaCompra: '2024-10-20',
    },
    {
      id: 'MAT-005',
      nombre: 'Espiral Plástico',
      categoria: 'Encuadernación',
      cantidadActual: 150,
      cantidadMinima: 100,
      unidad: 'unidades',
      precioUnitario: '$0.50',
      proveedor: 'Encuadernados Pro',
      ultimaCompra: '2024-10-15',
    },
    {
      id: 'MAT-006',
      nombre: 'Pasta Dura A4',
      categoria: 'Encuadernación',
      cantidadActual: 45,
      cantidadMinima: 50,
      unidad: 'unidades',
      precioUnitario: '$2.50',
      proveedor: 'Encuadernados Pro',
      ultimaCompra: '2024-10-18',
    },
    {
      id: 'MAT-007',
      nombre: 'Vinil Adhesivo',
      categoria: 'Gran Formato',
      cantidadActual: 25,
      cantidadMinima: 20,
      unidad: 'metros',
      precioUnitario: '$8.00',
      proveedor: 'Gráficos XL',
      ultimaCompra: '2024-11-02',
    },
    {
      id: 'MAT-008',
      nombre: 'Láminas de Plastificar',
      categoria: 'Acabados',
      cantidadActual: 120,
      cantidadMinima: 200,
      unidad: 'hojas',
      precioUnitario: '$0.35',
      proveedor: 'Papelería Central',
      ultimaCompra: '2024-10-25',
    },
  ]);

  const filteredMateriales = materiales.filter(material =>
    material.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const materialesBajos = materiales.filter(m => m.cantidadActual < m.cantidadMinima);

  const getStockLevel = (material: Material) => {
    const porcentaje = (material.cantidadActual / material.cantidadMinima) * 100;
    if (porcentaje < 50) return { color: 'bg-red-500', text: 'Crítico', badge: 'bg-red-100 text-red-800' };
    if (porcentaje < 100) return { color: 'bg-yellow-500', text: 'Bajo', badge: 'bg-yellow-100 text-yellow-800' };
    return { color: 'bg-green-500', text: 'Normal', badge: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Materiales</h2>
          <p className="text-gray-600">Inventario y control de materiales</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Material
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Material</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2 space-y-2">
                <Label>Nombre del Material</Label>
                <Input placeholder="Ej: Papel Bond Oficio" />
              </div>
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Input placeholder="Ej: Papel" />
              </div>
              <div className="space-y-2">
                <Label>Unidad de Medida</Label>
                <Input placeholder="Ej: hojas, metros, kg" />
              </div>
              <div className="space-y-2">
                <Label>Cantidad Actual</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Cantidad Mínima</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Precio Unitario</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Proveedor</Label>
                <Input placeholder="Nombre del proveedor" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Agregar Material
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alerta de Stock Bajo */}
      {materialesBajos.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-orange-900">
                  <span>{materialesBajos.length} material{materialesBajos.length > 1 ? 'es' : ''}</span> con stock bajo o crítico
                </p>
                <p className="text-sm text-orange-700">
                  {materialesBajos.map(m => m.nombre).join(', ')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, categoría o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Materiales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventario de Materiales ({filteredMateriales.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 text-gray-600">ID</th>
                  <th className="text-left p-4 text-gray-600">Material</th>
                  <th className="text-left p-4 text-gray-600">Categoría</th>
                  <th className="text-left p-4 text-gray-600">Stock</th>
                  <th className="text-left p-4 text-gray-600">Estado</th>
                  <th className="text-left p-4 text-gray-600">Precio Unit.</th>
                  <th className="text-left p-4 text-gray-600">Proveedor</th>
                  <th className="text-left p-4 text-gray-600">Última Compra</th>
                  <th className="text-left p-4 text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredMateriales.map((material) => {
                  const stockLevel = getStockLevel(material);
                  const porcentaje = Math.min((material.cantidadActual / material.cantidadMinima) * 100, 100);
                  
                  return (
                    <tr key={material.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 text-gray-600">{material.id}</td>
                      <td className="p-4">{material.nombre}</td>
                      <td className="p-4 text-gray-600">{material.categoria}</td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm">
                            {material.cantidadActual} / {material.cantidadMinima} {material.unidad}
                          </p>
                          <Progress value={porcentaje} className="h-2" />
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={stockLevel.badge}>
                          {stockLevel.text}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-600">{material.precioUnitario}</td>
                      <td className="p-4 text-gray-600">{material.proveedor}</td>
                      <td className="p-4 text-gray-600">{material.ultimaCompra}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
