import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Pedidos } from './components/Pedidos';
import { Clientes } from './components/Clientes';
import { Servicios } from './components/Servicios';
import { Materiales } from './components/Materiales';
import { Trabajadores } from './components/Trabajadores';
import { Maquinas } from './components/Maquinas';
import { Envios } from './components/Envios';
import { Facturacion } from './components/Facturacion';
import { Reportes } from './components/Reportes';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Briefcase, 
  Package, 
  UserCog, 
  Printer, 
  Truck,
  Receipt,
  BarChart3,
  Menu,
  X
} from 'lucide-react';

type View = 'dashboard' | 'pedidos' | 'clientes' | 'servicios' | 'materiales' | 'trabajadores' | 'maquinas' | 'envios' | 'facturacion' | 'reportes';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pedidos' as View, label: 'Pedidos', icon: FileText },
    { id: 'facturacion' as View, label: 'Facturación', icon: Receipt },
    { id: 'clientes' as View, label: 'Clientes', icon: Users },
    { id: 'servicios' as View, label: 'Servicios', icon: Briefcase },
    { id: 'materiales' as View, label: 'Materiales', icon: Package },
    { id: 'trabajadores' as View, label: 'Trabajadores', icon: UserCog },
    { id: 'maquinas' as View, label: 'Máquinas', icon: Printer },
    { id: 'envios' as View, label: 'Envíos', icon: Truck },
    { id: 'reportes' as View, label: 'Reportes', icon: BarChart3 },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'pedidos':
        return <Pedidos />;
      case 'facturacion':
        return <Facturacion />;
      case 'clientes':
        return <Clientes />;
      case 'servicios':
        return <Servicios />;
      case 'materiales':
        return <Materiales />;
      case 'trabajadores':
        return <Trabajadores />;
      case 'maquinas':
        return <Maquinas />;
      case 'envios':
        return <Envios />;
      case 'reportes':
        return <Reportes />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Printer className="w-8 h-8 text-blue-600" />
            <span className="text-xl">CopiaExpress</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${currentView === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mr-4"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">Sistema de Gestión - Copiadora</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}