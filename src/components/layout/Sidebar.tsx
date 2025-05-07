import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, BarChart2, Map, Package, ChefHat, Home } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-500 text-white p-1 rounded">
                <ChefHat className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-primary-600">FoodShare</span>
            </div>
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </NavLink>
            <NavLink
              to="/food-log"
              className={({ isActive }) =>
                `flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <ChefHat className="mr-3 h-5 w-5" />
              Food Log
            </NavLink>
            <NavLink
              to="/donations"
              className={({ isActive }) =>
                `flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Package className="mr-3 h-5 w-5" />
              Donations
            </NavLink>
            <NavLink
              to="/map"
              className={({ isActive }) =>
                `flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Map className="mr-3 h-5 w-5" />
              Find Centers
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <BarChart2 className="mr-3 h-5 w-5" />
              Analytics
            </NavLink>
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="text-xs text-gray-500">
              <p>© 2025 FoodShare</p>
              <p>Reducing waste, feeding communities</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;