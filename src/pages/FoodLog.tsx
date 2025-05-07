import React, { useState } from 'react';
import { ChefHat, Plus, Trash2, AlertCircle } from 'lucide-react';

// Food categories with their expiration rules
const foodCategories = [
  { id: 'produce', name: 'Produce', expiry: '3-5 days' },
  { id: 'dairy', name: 'Dairy', expiry: '5-7 days' },
  { id: 'bakery', name: 'Bakery', expiry: '2-3 days' },
  { id: 'prepared', name: 'Prepared Meals', expiry: '1-2 days' },
  { id: 'frozen', name: 'Frozen', expiry: '30+ days' },
  { id: 'canned', name: 'Canned/Dry Goods', expiry: '6+ months' },
  { id: 'beverages', name: 'Beverages', expiry: 'Varies' },
];

interface FoodItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  unit: string;
  expiryDate: string;
  notes: string;
}

// Mock data
const initialFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Apples',
    category: 'produce',
    quantity: '5',
    unit: 'kg',
    expiryDate: '2025-03-20',
    notes: 'Red Delicious, good condition',
  },
  {
    id: '2',
    name: 'Milk',
    category: 'dairy',
    quantity: '2',
    unit: 'liters',
    expiryDate: '2025-03-18',
    notes: 'Unopened, whole milk',
  },
  {
    id: '3',
    name: 'Bread',
    category: 'bakery',
    quantity: '3',
    unit: 'loaves',
    expiryDate: '2025-03-16',
    notes: 'Sliced sourdough',
  },
];

const FoodLog: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);
  const [newItem, setNewItem] = useState<FoodItem>({
    id: '',
    name: '',
    category: '',
    quantity: '',
    unit: 'kg',
    expiryDate: '',
    notes: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newItem.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!newItem.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!newItem.quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(Number(newItem.quantity)) || Number(newItem.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    
    if (!newItem.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddItem = () => {
    if (!validateForm()) return;
    
    const item: FoodItem = {
      ...newItem,
      id: Date.now().toString(),
    };
    
    setFoodItems((prev) => [item, ...prev]);
    setNewItem({
      id: '',
      name: '',
      category: '',
      quantity: '',
      unit: 'kg',
      expiryDate: '',
      notes: '',
    });
    setIsAdding(false);
  };

  const handleDeleteItem = (id: string) => {
    setFoodItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getCategoryName = (categoryId: string) => {
    const category = foodCategories.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Food Log</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your surplus food inventory and manage expiration dates.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          {!isAdding ? (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Food Item
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Add new item form */}
      {isAdding && (
        <div className="bg-white shadow sm:rounded-lg animate-slide-up">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Food Item</h3>
            <div className="mt-5 md:mt-0">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Food Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={newItem.name}
                      onChange={handleInputChange}
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.name ? 'border-red-300' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <div className="mt-1">
                    <select
                      id="category"
                      name="category"
                      value={newItem.category}
                      onChange={handleInputChange}
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.category ? 'border-red-300' : ''
                      }`}
                    >
                      <option value="">Select a category</option>
                      {foodCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name} (typically {category.expiry})
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="quantity"
                      id="quantity"
                      value={newItem.quantity}
                      onChange={handleInputChange}
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.quantity ? 'border-red-300' : ''
                      }`}
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                    Unit
                  </label>
                  <div className="mt-1">
                    <select
                      id="unit"
                      name="unit"
                      value={newItem.unit}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="kg">kg</option>
                      <option value="liters">liters</option>
                      <option value="servings">servings</option>
                      <option value="items">items</option>
                      <option value="packages">packages</option>
                      <option value="loaves">loaves</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="expiryDate"
                      id="expiryDate"
                      value={newItem.expiryDate}
                      onChange={handleInputChange}
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.expiryDate ? 'border-red-300' : ''
                      }`}
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={newItem.notes}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Food items list */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {foodItems.map((item) => {
            const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
            let expiryStatus = 'text-gray-500';
            let expiryBadge = 'bg-gray-100 text-gray-800';
            
            if (daysUntilExpiry <= 1) {
              expiryStatus = 'text-red-600';
              expiryBadge = 'bg-red-100 text-red-800';
            } else if (daysUntilExpiry <= 3) {
              expiryStatus = 'text-yellow-600';
              expiryBadge = 'bg-yellow-100 text-yellow-800';
            }

            return (
              <li key={item.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="bg-primary-100 rounded-md p-2">
                          <ChefHat className="h-6 w-6 text-primary-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-600">{item.name}</p>
                        <p className="flex items-center text-sm text-gray-500">
                          {getCategoryName(item.category)} · {item.quantity} {item.unit}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${expiryBadge}`}>
                        {daysUntilExpiry <= 0
                          ? 'Expired'
                          : daysUntilExpiry === 1
                          ? 'Expires tomorrow'
                          : `Expires in ${daysUntilExpiry} days`}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className={`flex items-center text-sm ${expiryStatus}`}>
                        <span>Expiry: {new Date(item.expiryDate).toLocaleDateString()}</span>
                        {daysUntilExpiry <= 1 && (
                          <AlertCircle className="ml-1 h-4 w-4 text-red-500" />
                        )}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>{item.notes}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          {foodItems.length === 0 && (
            <li className="px-4 py-6 sm:px-6 text-center">
              <p className="text-sm text-gray-500">No food items added yet.</p>
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Food Item
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Action buttons */}
      {foodItems.length > 0 && (
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
          >
            Donate Selected Items
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Export Log
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodLog;