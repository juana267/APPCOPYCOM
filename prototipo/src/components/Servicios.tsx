import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Plus, Edit2, Trash2, DollarSign } from 'lucide-react';
import { Badge } from './ui/badge';

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precioBase: string;
  categoria: string;
  tiempoEstimado: string;
  popular: boolean;
}

export function Servicios() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [servicios] = useState<Servicio[]>([
    {
      id: 'SRV-001',
      nombre: 'Impresión a Color',
      descripcion: 'Impresión en alta calidad a todo color en diferentes tamaños',
      precioBase: '$0.25',
      categoria: 'Impresión',
      tiempoEstimado: '1-2 días',
      popular: true,
    },
    {
      id: 'SRV-002',
      nombre: 'Fotocopias B/N',
      descripcion: 'Copias en blanco y negro, alta velocidad',
      precioBase: '$0.05',
      categoria: 'Copiado',
      tiempoEstimado: 'Mismo día',
      popular: true,
    },
    {
      id: 'SRV-003',
      nombre: 'Encuadernación',
      descripcion: 'Encuadernado profesional en pasta dura o blanda',
      precioBase: '$5.00',
      categoria: 'Acabados',
      tiempoEstimado: '2-3 días',
      popular: false,
    },
    {
      id: 'SRV-004',
      nombre: 'Impresión Gran Formato',
      descripcion: 'Banners, posters y vinil en tamaños grandes',
      precioBase: '$15.00',
      categoria: 'Gran Formato',
      tiempoEstimado: '3-5 días',
      popular: true,
    },
    {
      id: 'SRV-005',
      nombre: 'Copias a Color',
      descripcion: 'Fotocopias a todo color en diferentes papeles',
      precioBase: '$0.40',
      categoria: 'Copiado',
      tiempoEstimado: 'Mismo día',
      popular: true,
    },
    {
      id: 'SRV-006',
      nombre: 'Plastificado',
      descripcion: 'Laminado en frío o caliente de documentos',
      precioBase: '$2.00',
      categoria: 'Acabados',
      tiempoEstimado: '1 día',
      popular: false,
    },
    {
      id: 'SRV-007',
      nombre: 'Escaneo',
      descripcion: 'Digitalización de documentos en alta resolución',
      precioBase: '$0.10',
      categoria: 'Digital',
      tiempoEstimado: 'Mismo día',
      popular: false,
    },
    {
      id: 'SRV-008',
      nombre: 'Diseño Gráfico',
      descripcion: 'Diseño personalizado de volantes, tarjetas y más',
      precioBase: '$50.00',
      categoria: 'Diseño',
      tiempoEstimado: '5-7 días',
      popular: false,
    },
  ]);

  const categorias = Array.from(new Set(servicios.map(s => s.categoria)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Servicios</h2>
          <p className="text-gray-600">Catálogo de servicios ofrecidos</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Servicio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Servicio</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2 space-y-2">
                <Label>Nombre del Servicio</Label>
                <Input placeholder="Ej: Impresión Láser" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Descripción</Label>
                <Textarea placeholder="Descripción del servicio..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Precio Base (por unidad)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Input placeholder="Ej: Impresión" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Tiempo Estimado</Label>
                <Input placeholder="Ej: 2-3 días" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Agregar Servicio
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Servicios por Categoría */}
      {categorias.map((categoria) => (
        <div key={categoria}>
          <h3 className="text-xl mb-4">{categoria}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {servicios
              .filter((s) => s.categoria === categoria)
              .map((servicio) => (
                <Card key={servicio.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{servicio.nombre}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{servicio.id}</p>
                        {servicio.popular && (
                          <Badge className="bg-yellow-100 text-yellow-800 mt-2">
                            Popular
                          </Badge>
                        )}
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
                    <p className="text-sm text-gray-600">{servicio.descripcion}</p>
                    <div className="pt-3 border-t border-gray-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Precio base:</span>
                        <span className="text-green-600">{servicio.precioBase}/unidad</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Tiempo estimado:</span>
                        <span className="text-blue-600">{servicio.tiempoEstimado}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
