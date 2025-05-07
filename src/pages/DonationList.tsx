import React, { useState } from 'react';
import { Package, Filter, Search, CheckCircle, Clock, Truck, AlertCircle } from 'lucide-react';

// Mock data
const donationStatuses = [
  { id: 'pending', name: 'Pending', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  { id: 'confirmed', name: 'Confirmed', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  { id: 'in_transit', name: 'In Transit', icon: Truck, color: 'bg-blue-100 text-blue-800' },
  { id: 'completed', name: 'Completed', icon: CheckCircle, color: 'bg-primary-100 text-primary-800' },
  { id: 'cancelled', name: 'Cancelled', icon: AlertCircle, color: 'bg-red-100 text-red-800' },
];

interface Donation {
  id: string;
  name: string;
  description: string;
  quantity: string;
  organization: string;
  status: string;
  date: string;
}

const initialDonations: Donation[] = [
  {
    id: '1',
    name: 'Sandwich Platters',
    description: 'Assorted sandwich platters from catering event',
    quantity: '12 servings',
    organization: 'Hope Community Center',
    status: 'completed',
    date: '2025-03-15',
  },
  {
    id: '2',
    name: 'Fresh Vegetables',
    description: 'Assorted vegetables including carrots, potatoes, and broccoli',
    quantity: '8 kg',
    organization: 'Food For All',
    status: 'confirmed',
    date: '2025-03-14',
  },
  {
    id: '3',
    name: 'Baked Goods',
    description: 'Muffins, cookies, and pastries from bakery',
    quantity: '24 items',
    organization: 'Shelter Foundation',
    status: 'pending',
    date: '2025-03-12',
  },
  {
    id: '4',
    name: 'Canned Soups',
    description: 'Vegetable and chicken soup cans',
    quantity: '15 cans',
    organization: 'Hope Community Center',
    status: 'in_transit',
    date: '2025-03-10',
  },
  {
    id: '5',
    name: 'Dairy Products',
    description: 'Yogurt and cheese nearing expiry',
    quantity: '10 items',
    organization: 'Shelter Foundation',
    status: 'cancelled',
    date: '2025-03-08',
  },
];

const DonationList: React.FC = () => {
  const [donations] = useState<Donation[]>(initialDonations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = 
      donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusDetails = (statusId: string) => {
    return donationStatuses.find((status) => status.id === statusId) || donationStatuses[0];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your donations and their status.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Package className="mr-2 h-4 w-4" />
            New Donation
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="search" className="sr-only">
                Search donations
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search donations by name, organization, or description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="status" className="sr-only">
                Filter by status
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <select
                  id="status"
                  name="status"
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  {donationStatuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donations list */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredDonations.map((donation) => {
            const status = getStatusDetails(donation.status);
            const StatusIcon = status.icon;
            
            return (
              <li key={donation.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-primary-100 rounded-md p-2">
                          <Package className="h-6 w-6 text-primary-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-primary-600">{donation.name}</div>
                        <div className="text-sm text-gray-500">{donation.description}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {status.name}
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center p-1 border border-transparent rounded-full text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M9 4l3 3m0 0l3-3m-3 3v12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <span>To: {donation.organization}</span>
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <span>Quantity: {donation.quantity}</span>
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Donated on {new Date(donation.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex">
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      View details
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
          {filteredDonations.length === 0 && (
            <li className="px-4 py-6 sm:px-6 text-center">
              <p className="text-sm text-gray-500">No donations found.</p>
            </li>
          )}
        </ul>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredDonations.length}</span> of{' '}
              <span className="font-medium">{filteredDonations.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                aria-current="page"
                className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationList;