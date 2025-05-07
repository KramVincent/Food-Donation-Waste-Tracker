import React, { useState } from 'react';
import { Search, MapPin, Info } from 'lucide-react';

// Mock data for organizations
const organizations = [
  {
    id: 1,
    name: 'Hope Community Center',
    address: '123 Main St, Anytown, USA',
    distance: 1.2,
    contact: '(555) 123-4567',
    email: 'info@hopecommunitycenter.org',
    needs: ['Produce', 'Dairy', 'Bread'],
    hours: 'Mon-Fri: 9am-5pm',
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    name: 'Food For All',
    address: '456 Oak Ave, Anytown, USA',
    distance: 2.5,
    contact: '(555) 987-6543',
    email: 'contact@foodforall.org',
    needs: ['Canned Goods', 'Proteins'],
    hours: 'Mon-Sat: 8am-8pm',
    lat: 40.7218,
    lng: -74.016,
  },
  {
    id: 3,
    name: 'Shelter Foundation',
    address: '789 Pine Blvd, Anytown, USA',
    distance: 3.1,
    contact: '(555) 456-7890',
    email: 'help@shelterfoundation.org',
    needs: ['Ready-to-eat Meals', 'Snacks'],
    hours: 'Daily: 10am-9pm',
    lat: 40.7048,
    lng: -73.996,
  },
  {
    id: 4,
    name: 'City Food Bank',
    address: '321 Elm St, Anytown, USA',
    distance: 4.3,
    contact: '(555) 789-0123',
    email: 'info@cityfoodbank.org',
    needs: ['All Non-perishables', 'Baby Food'],
    hours: 'Tue-Sun: 9am-6pm',
    lat: 40.7188,
    lng: -74.026,
  },
  {
    id: 5,
    name: 'Community Kitchen',
    address: '567 Maple Rd, Anytown, USA',
    distance: 5.7,
    contact: '(555) 234-5678',
    email: 'kitchen@communitykitchen.org',
    needs: ['Fresh Produce', 'Proteins', 'Grains'],
    hours: 'Mon, Wed, Fri: 7am-3pm',
    lat: 40.7038,
    lng: -73.986,
  },
];

const DonationMap: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);
  const [distanceFilter, setDistanceFilter] = useState(10);

  // Filter organizations based on search term and distance
  const filteredOrgs = organizations.filter((org) => {
    const matchesSearch = 
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.needs.some(need => need.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDistance = org.distance <= distanceFilter;
    
    return matchesSearch && matchesDistance;
  });

  const handleOrgClick = (id: number) => {
    setSelectedOrg(id === selectedOrg ? null : id);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Donation Centers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Locate nearby organizations that accept food donations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map placeholder - would be replaced with actual map component */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative" style={{ height: '600px' }}>
            <div className="absolute inset-0 bg-gray-200">
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Interactive Map</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    This would be replaced with an actual interactive map component using React Leaflet.
                  </p>
                  <p className="mt-4 text-xs text-gray-500">
                    The map would show all donation centers with markers, allowing users to click on them for details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar with filters and list */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Search & Filter */}
          <div className="p-4 border-b border-gray-200">
            <div className="space-y-4">
              <div>
                <label htmlFor="map-search" className="sr-only">
                  Search organizations
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="map-search"
                    id="map-search"
                    className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search by name, address, or needs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
                  Maximum Distance: {distanceFilter} km
                </label>
                <input
                  type="range"
                  id="distance"
                  name="distance"
                  min="1"
                  max="20"
                  step="1"
                  value={distanceFilter}
                  onChange={(e) => setDistanceFilter(Number(e.target.value))}
                  className="mt-1 block w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 km</span>
                  <span>20 km</span>
                </div>
              </div>
            </div>
          </div>

          {/* Organizations list */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(600px - 139px)' }}>
            <ul className="divide-y divide-gray-200">
              {filteredOrgs.map((org) => (
                <li
                  key={org.id}
                  className={`px-4 py-4 cursor-pointer transition-colors duration-150 ${
                    selectedOrg === org.id ? 'bg-primary-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleOrgClick(org.id)}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-primary-600">{org.name}</h3>
                      <p className="mt-1 text-xs text-gray-500">{org.address}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {org.distance} km
                    </span>
                  </div>
                  
                  {selectedOrg === org.id && (
                    <div className="mt-4 space-y-3 text-sm text-gray-500 animate-fade-in">
                      <div>
                        <div className="font-medium text-gray-700">Contact:</div>
                        <p>{org.contact}</p>
                        <p>{org.email}</p>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Hours:</div>
                        <p>{org.hours}</p>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Currently Needs:</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {org.needs.map((need, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary-100 text-secondary-800"
                            >
                              {need}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 flex space-x-2">
                        <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-3 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                          Contact
                        </button>
                        <button className="flex-1 bg-secondary-600 hover:bg-secondary-700 text-white py-2 px-3 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500">
                          Donate
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}

              {filteredOrgs.length === 0 && (
                <li className="px-4 py-6 text-center">
                  <Info className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No organizations found matching your criteria.</p>
                  <p className="text-xs text-gray-500 mt-1">Try adjusting your search or distance filter.</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Information callout */}
      <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Looking for donation options?</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  If you don't see an organization near you, you can register your surplus food for pickup.
                </p>
              </div>
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
              >
                Register for Pickup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationMap;