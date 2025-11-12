import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, FileText, Download, Printer as PrinterIcon, Eye, DollarSign, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface Factura {
  id: string;
  numeroFactura: string;
  pedidoId: string;
  fecha: string;
  cliente: {
    nombre: string;
    rfc: string;
    direccion: string;
    email: string;
  };
  items: {
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
  subtotal: number;
  iva: number;
  total: number;
  metodoPago: string;
  estado: string;
}

export function Facturacion() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null);

  const [facturas] = useState<Factura[]>([
    {
      id: 'FACT-001',
      numeroFactura: 'A-001',
      pedidoId: 'PED-002',
      fecha: '2024-11-05',
      cliente: {
        nombre: 'María González',
        rfc: 'GOMA850315ABC',
        direccion: 'Calle Secundaria 456, Col. Roma, CDMX',
        email: 'maria.gonzalez@email.com',
      },
      items: [
        {
          descripcion: 'Fotocopias B/N - 1000 copias',
          cantidad: 1000,
          precioUnitario: 0.035,
          subtotal: 35.00,
        },
      ],
      subtotal: 35.00,
      iva: 5.60,
      total: 40.60,
      metodoPago: 'Efectivo',
      estado: 'Pagada',
    },
    {
      id: 'FACT-002',
      numeroFactura: 'A-002',
      pedidoId: 'PED-005',
      fecha: '2024-11-04',
      cliente: {
        nombre: 'Luis Hernández',
        rfc: 'HERL920720XYZ',
        direccion: 'Colonia Sur 654, Col. Del Valle, CDMX',
        email: 'luis.hernandez@email.com',
      },
      items: [
        {
          descripcion: 'Copias a Color - 250 copias',
          cantidad: 250,
          precioUnitario: 0.38,
          subtotal: 95.00,
        },
      ],
      subtotal: 95.00,
      iva: 15.20,
      total: 110.20,
      metodoPago: 'Tarjeta',
      estado: 'Pagada',
    },
    {
      id: 'FACT-003',
      numeroFactura: 'A-003',
      pedidoId: 'PED-001',
      fecha: '2024-11-06',
      cliente: {
        nombre: 'Juan Pérez',
        rfc: 'PEJA880512DEF',
        direccion: 'Av. Principal 123, Col. Centro, CDMX',
        email: 'juan.perez@email.com',
      },
      items: [
        {
          descripcion: 'Impresión a Color - 500 volantes A5',
          cantidad: 500,
          precioUnitario: 0.25,
          subtotal: 125.00,
        },
      ],
      subtotal: 125.00,
      iva: 20.00,
      total: 145.00,
      metodoPago: 'Transferencia',
      estado: 'Pendiente',
    },
    {
      id: 'FACT-004',
      numeroFactura: 'A-004',
      pedidoId: 'PED-008',
      fecha: '2024-11-03',
      cliente: {
        nombre: 'Sofia López',
        rfc: 'LOPS901205GHI',
        direccion: 'Av. Reforma 987, Col. Polanco, CDMX',
        email: 'sofia.lopez@email.com',
      },
      items: [
        {
          descripcion: 'Diseño de Tarjetas de Presentación',
          cantidad: 1,
          precioUnitario: 50.00,
          subtotal: 50.00,
        },
        {
          descripcion: 'Impresión de 1000 tarjetas',
          cantidad: 1000,
          precioUnitario: 0.10,
          subtotal: 100.00,
        },
      ],
      subtotal: 150.00,
      iva: 24.00,
      total: 174.00,
      metodoPago: 'Tarjeta',
      estado: 'Pagada',
    },
    {
      id: 'FACT-005',
      numeroFactura: 'A-005',
      pedidoId: 'PED-004',
      fecha: '2024-11-07',
      cliente: {
        nombre: 'Ana Martínez',
        rfc: 'MAAN950618JKL',
        direccion: 'Zona Centro 321, Col. Juárez, CDMX',
        email: 'ana.martinez@email.com',
      },
      items: [
        {
          descripcion: 'Impresión Gran Formato - 3 banners 2x1m',
          cantidad: 3,
          precioUnitario: 110.00,
          subtotal: 330.00,
        },
        {
          descripcion: 'Instalación de banners',
          cantidad: 3,
          precioUnitario: 20.00,
          subtotal: 60.00,
        },
      ],
      subtotal: 390.00,
      iva: 62.40,
      total: 452.40,
      metodoPago: 'Transferencia',
      estado: 'Pagada',
    },
  ]);

  const filteredFacturas = facturas.filter(factura => {
    const matchesSearch = factura.numeroFactura.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         factura.pedidoId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         factura.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todos' || factura.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  const getStatusBadge = (estado: string) => {
    const styles = {
      'Pagada': 'bg-green-100 text-green-800',
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Cancelada': 'bg-red-100 text-red-800',
    };
    return styles[estado as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const totalFacturado = facturas
    .filter(f => f.estado === 'Pagada')
    .reduce((sum, f) => sum + f.total, 0);

  const totalPendiente = facturas
    .filter(f => f.estado === 'Pendiente')
    .reduce((sum, f) => sum + f.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Facturación</h2>
          <p className="text-gray-600">Gestión de facturas y pagos</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Facturado</p>
                <p className="text-3xl mt-2 text-green-600">${totalFacturado.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {facturas.filter(f => f.estado === 'Pagada').length} facturas pagadas
                </p>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <DollarSign className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendiente de Cobro</p>
                <p className="text-3xl mt-2 text-yellow-600">${totalPendiente.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {facturas.filter(f => f.estado === 'Pendiente').length} facturas pendientes
                </p>
              </div>
              <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg">
                <Calendar className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Facturas</p>
                <p className="text-3xl mt-2 text-blue-600">{facturas.length}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Este mes
                </p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <FileText className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por número de factura, pedido o cliente..."
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
                <SelectItem value="Pagada">Pagada</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="Cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Facturas Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Facturas ({filteredFacturas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 text-gray-600">Factura</th>
                  <th className="text-left p-4 text-gray-600">Pedido</th>
                  <th className="text-left p-4 text-gray-600">Fecha</th>
                  <th className="text-left p-4 text-gray-600">Cliente</th>
                  <th className="text-left p-4 text-gray-600">Subtotal</th>
                  <th className="text-left p-4 text-gray-600">IVA (16%)</th>
                  <th className="text-left p-4 text-gray-600">Total</th>
                  <th className="text-left p-4 text-gray-600">Método Pago</th>
                  <th className="text-left p-4 text-gray-600">Estado</th>
                  <th className="text-left p-4 text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredFacturas.map((factura) => (
                  <tr key={factura.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">{factura.numeroFactura}</td>
                    <td className="p-4 text-gray-600">{factura.pedidoId}</td>
                    <td className="p-4 text-gray-600">{factura.fecha}</td>
                    <td className="p-4">{factura.cliente.nombre}</td>
                    <td className="p-4 text-gray-600">${factura.subtotal.toFixed(2)}</td>
                    <td className="p-4 text-gray-600">${factura.iva.toFixed(2)}</td>
                    <td className="p-4 text-green-600">${factura.total.toFixed(2)}</td>
                    <td className="p-4 text-gray-600">{factura.metodoPago}</td>
                    <td className="p-4">
                      <Badge className={getStatusBadge(factura.estado)}>
                        {factura.estado}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFactura(factura)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <PrinterIcon className="w-4 h-4" />
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

      {/* Factura Detail Dialog */}
      <Dialog open={selectedFactura !== null} onOpenChange={() => setSelectedFactura(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Factura {selectedFactura?.numeroFactura}</DialogTitle>
          </DialogHeader>
          {selectedFactura && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl">CopiaExpress</h3>
                  <p className="text-sm text-gray-600 mt-1">RFC: CEX123456ABC</p>
                  <p className="text-sm text-gray-600">Av. Insurgentes 500, CDMX</p>
                  <p className="text-sm text-gray-600">Tel: (55) 5555-5555</p>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusBadge(selectedFactura.estado)} text-base px-3 py-1`}>
                    {selectedFactura.estado}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-2">Factura: {selectedFactura.numeroFactura}</p>
                  <p className="text-sm text-gray-600">Fecha: {selectedFactura.fecha}</p>
                  <p className="text-sm text-gray-600">Pedido: {selectedFactura.pedidoId}</p>
                </div>
              </div>

              <Separator />

              {/* Cliente Info */}
              <div>
                <h4 className="text-sm text-gray-600 mb-2">Facturado a:</h4>
                <p>{selectedFactura.cliente.nombre}</p>
                <p className="text-sm text-gray-600">RFC: {selectedFactura.cliente.rfc}</p>
                <p className="text-sm text-gray-600">{selectedFactura.cliente.direccion}</p>
                <p className="text-sm text-gray-600">{selectedFactura.cliente.email}</p>
              </div>

              <Separator />

              {/* Items */}
              <div>
                <h4 className="text-sm text-gray-600 mb-3">Conceptos:</h4>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-2 text-sm text-gray-600">Descripción</th>
                      <th className="text-right p-2 text-sm text-gray-600">Cantidad</th>
                      <th className="text-right p-2 text-sm text-gray-600">Precio Unit.</th>
                      <th className="text-right p-2 text-sm text-gray-600">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFactura.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="p-2">{item.descripcion}</td>
                        <td className="p-2 text-right">{item.cantidad}</td>
                        <td className="p-2 text-right">${item.precioUnitario.toFixed(2)}</td>
                        <td className="p-2 text-right">${item.subtotal.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Separator />

              {/* Totales */}
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>${selectedFactura.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IVA (16%):</span>
                    <span>${selectedFactura.iva.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">${selectedFactura.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Método de Pago:</span>
                    <span>{selectedFactura.metodoPago}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button variant="outline">
                  <PrinterIcon className="w-4 h-4 mr-2" />
                  Imprimir
                </Button>
                <Button>
                  Enviar por Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
