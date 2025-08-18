import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Database, 
  Lightbulb,
  BarChart3,
  Globe,
  Users,
  Settings,
  FileText,
  Brain
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: TrendingUp, label: 'Trend Analysis', active: true },
    { icon: Target, label: 'Market Research' },
    { icon: Lightbulb, label: 'Project Generator' },
    { icon: Database, label: 'Schema Design' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Globe, label: 'Global Markets' },
    { icon: Users, label: 'Audiences' },
    { icon: Brain, label: 'AI Insights' },
    { icon: FileText, label: 'Reports' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 text-white text-center">
          <div className="text-2xl font-bold">MGX</div>
          <div className="text-xs opacity-90">Trend Analysis Platform</div>
        </div>
      </div>
      
      <nav className="mt-2">
        <div className="px-3">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-3">
            Core Features
          </div>
          {menuItems.slice(0, 4).map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-lg transition-colors ${
                item.active
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
          
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-3 mt-6">
            Additional Tools
          </div>
          {menuItems.slice(4).map((item, index) => (
            <a
              key={index + 4}
              href="#"
              className="flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">Version 1.0.0</div>
          <div className="text-xs text-gray-400">© 2024 MetaGPTX</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;