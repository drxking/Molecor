'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Filters({ 
  categories, 
  regions, 
  years, 
  currentCategory, 
  currentRegion, 
  currentYear 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (filter, value) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set(filter, value);
    } else {
      params.delete(filter);
    }

    router.push(`/case-studies?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={currentCategory}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
        <select
          value={currentRegion}
          onChange={(e) => handleFilterChange('region', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
        <select
          value={currentYear}
          onChange={(e) => handleFilterChange('year', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {(currentCategory || currentRegion || currentYear) && (
        <button
          onClick={() => router.push('/case-studies')}
          className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}