import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Trash2, Map, TrendingUp, ChefHat, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Mock data
const stats = [
  { name: 'Total Donations', value: '35', icon: Package, color: 'bg-primary-500' },
  { name: 'Food Waste Saved (kg)', value: '152', icon: Trash2, color: 'bg-secondary-500' },
  { name: 'Organizations Helped', value: '12', icon: Users, color: 'bg-accent-500' },
  { name: 'Carbon Footprint Reduced (kg CO2)', value: '86', icon: TrendingUp, color: 'bg-emerald-500' },
];

const recentDonations = [
  { id: 1, name: 'Sandwich Platters', quantity: '12 servings', organization: 'Hope Community Center', date: '2025-03-15' },
  { id: 2, name: 'Fresh Vegetables', quantity: '8 kg', organization: 'Food For All', date: '2025-03-14' },
  { id: 3, name: 'Baked Goods', quantity: '24 items', organization: 'Shelter Foundation', date: '2025-03-12' },
];

const nearbyOrganizations = [
  { id: 1, name: 'Hope Community Center', distance: '1.2 km', needs: 'Produce, Dairy, Bread' },
  { id: 2, name: 'Food For All', distance: '2.5 km', needs: 'Canned Goods, Proteins' },
  { id: 3, name: 'Shelter Foundation', distance: '3.1 km', needs: 'Ready-to-eat Meals, Snacks' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.username}! Here's an overview of your food donations and impact.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/food-log"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ChefHat className="mr-2 h-4 w-4" />
            Log Surplus Food
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-700 hover:text-primary-900">
                  View details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent donations */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Donations</h3>
          </div>
          <div className="p-5">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentDonations.map((donation) => (
                  <li key={donation.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="bg-primary-100 rounded-md p-2">
                          <Package className="h-6 w-6 text-primary-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{donation.name}</p>
                        <p className="text-sm text-gray-500 truncate">{donation.quantity}</p>
                      </div>
                      <div>
                        <div className="text-sm text-gray-900">{donation.organization}</div>
                        <div className="text-sm text-gray-500">{donation.date}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5">
              <Link
                to="/donations"
                className="block w-full text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Nearby organizations */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Nearby Organizations</h3>
          </div>
          <div className="p-5">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {nearbyOrganizations.map((org) => (
                  <li key={org.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="bg-secondary-100 rounded-md p-2">
                          <Map className="h-6 w-6 text-secondary-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{org.name}</p>
                        <p className="text-sm text-gray-500 truncate">Needs: {org.needs}</p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {org.distance}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5">
              <Link
                to="/map"
                className="block w-full text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;