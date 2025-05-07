import React, { useState } from 'react';
import { LineChart, BarChart2, PieChart, Calendar, ChevronDown } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your impact and food waste reduction.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 relative">
          <button
            type="button"
            className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {timeRange === 'week' && 'Last Week'}
            {timeRange === 'month' && 'Last Month'}
            {timeRange === 'quarter' && 'Last Quarter'}
            {timeRange === 'year' && 'Last Year'}
            <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
          </button>

          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button
                  onClick={() => {
                    setTimeRange('week');
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Last Week
                </button>
                <button
                  onClick={() => {
                    setTimeRange('month');
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Last Month
                </button>
                <button
                  onClick={() => {
                    setTimeRange('quarter');
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Last Quarter
                </button>
                <button
                  onClick={() => {
                    setTimeRange('year');
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Last Year
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart2 className="h-6 w-6 text-primary-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Food Donated</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">152 kg</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-green-600">↑ 12% </span>
              <span className="text-gray-500">from previous period</span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <LineChart className="h-6 w-6 text-secondary-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Waste Reduction</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">86%</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-green-600">↑ 8% </span>
              <span className="text-gray-500">from previous period</span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PieChart className="h-6 w-6 text-accent-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Carbon Footprint Reduced</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">86 kg CO2</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-green-600">↑ 23% </span>
              <span className="text-gray-500">from previous period</span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Cost Savings</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">$1,240</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-green-600">↑ 10% </span>
              <span className="text-gray-500">from previous period</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Graphs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Donations over time chart placeholder */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Donations Over Time</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Monthly trend of food donations</p>
          </div>
          <div className="p-6">
            <div className="h-72 bg-gray-50 rounded flex items-center justify-center">
              <div className="text-center p-6">
                <LineChart className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <p className="text-sm text-gray-500">
                  This would be an interactive line chart showing donation amounts over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Food categories breakdown chart placeholder */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Food Categories Breakdown</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Distribution by food type</p>
          </div>
          <div className="p-6">
            <div className="h-72 bg-gray-50 rounded flex items-center justify-center">
              <div className="text-center p-6">
                <PieChart className="h-12 w-12 text-secondary-500 mx-auto mb-4" />
                <p className="text-sm text-gray-500">
                  This would be an interactive pie chart showing the breakdown of food categories donated.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact metrics chart placeholder */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Environmental Impact</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Carbon footprint reduction over time</p>
          </div>
          <div className="p-6">
            <div className="h-72 bg-gray-50 rounded flex items-center justify-center">
              <div className="text-center p-6">
                <BarChart2 className="h-12 w-12 text-accent-500 mx-auto mb-4" />
                <p className="text-sm text-gray-500">
                  This would be an interactive bar chart showing carbon footprint reduction metrics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Organizations helped chart placeholder */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Organizations Helped</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Distribution of donations by organization</p>
          </div>
          <div className="p-6">
            <div className="h-72 bg-gray-50 rounded flex items-center justify-center">
              <div className="text-center p-6">
                <svg className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-sm text-gray-500">
                  This would be an interactive chart showing the distribution of donations among different organizations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export report section */}
      <div className="mt-6 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Export Detailed Reports</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Generate detailed reports about your food donations, waste reduction, and environmental impact.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Donation Summary
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
            >
              Waste Reduction
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
            >
              Environmental Impact
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Custom Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;