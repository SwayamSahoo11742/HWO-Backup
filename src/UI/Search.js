import { useState } from 'react';
import { pointTo } from '../utils/utils';

const SearchBar = ({ planets, setExo, orbitRaidus, LOS, setParams, setLOS, setProperty, setTar}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortProperty, setSortProperty] = useState('characterizable'); // Default sort by 'characterizable'
  const [sortOrder, setSortOrder] = useState('descending'); // Default sort order
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  // List of sortable properties with user-friendly labels
  const sortableProperties = [
    { value: 'pl_rade', label: 'Planet Radius' },
    { value: 'ESI', label: 'ESI' },
    { value: 'st_rad', label: 'Star Radius' },
    { value: 'pl_insol', label: 'Stellar Flux' },
    { value: 'sy_vmag', label: 'Host Apparent Magnitude' },
    { value: 'sy_dist', label: 'Distance from Earth' },
    { value: 'characterizable', label: 'Characterizability' },
  ];

  // Filter and sort the data
  const filteredResults = planets
    .filter(item => {
      const isValidSortValue = !isNaN(item[sortProperty]) && item[sortProperty] !== null && item[sortProperty] !== "";
      return item.pl_name.toLowerCase().includes(searchQuery.toLowerCase()) && isValidSortValue;
    })
    .sort((a, b) => {
      const aValue = parseFloat(a[sortProperty]);
      const bValue = parseFloat(b[sortProperty]);
      const comparison = bValue - aValue;
      return sortOrder === 'ascending' ? comparison : -comparison;
    })
    .slice(0, 10); // Limit to 10 results

  // Handle changing the sort property
  const handleSortPropertyChange = (e) => {
    setSortProperty(e.target.value);
    setProperty(e.target.value);
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'ascending' ? 'descending' : 'ascending'));
  };

  return (
    <div className="p-2">
      <div className="flex items-center mb-2">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)} // Set focus to true
          onBlur={() => 1} // Delay to allow button clicks
          className="flex-1 p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />

        {/* Sort Dropdown */}
        <select
          value={sortProperty}
          onChange={handleSortPropertyChange}
          onFocus={() => setIsFocused(true)} 
          className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 mx-2"
        >
          {sortableProperties.map(({ value, label }, index) => (
            <option key={index} value={value}>
              Sort by {label}
            </option>
          ))}
        </select>

        {/* Sort Order Button */}
        <button
          onClick={toggleSortOrder}
          className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        >
          {sortOrder === 'ascending' ? <span className='p-3'>&uarr;</span> : <span className='p-3'>&darr;</span>}
        </button>
      </div>

      {/* Results */}
      {isFocused && (
        <div className="overflow-y-auto max-h-80 border border-gray-300 rounded-lg"> {/* Changed max-h-60 to max-h-80 */}
          <ul className="space-y-1">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-black-800 text-white border-b border-gray-700">
                  <span>
                    {item.pl_name} - 
                    <span className='text-gray-400'>
                      {sortableProperties.find(prop => prop.value === sortProperty).label}:
                    </span> 
                    {sortProperty === 'characterizable' ? (item[sortProperty] === 0 ? " No" : " Yes") : parseFloat(item[sortProperty]).toFixed(2)}
                  </span>
                  <div>
                    <button onClick={() => setExo(item)} className='btn btn-primary'>View</button>
                    <button onClick={() => pointTo(item, orbitRaidus, LOS, setParams, setLOS, setTar)} className='btn btn-primary ml-2'>Point to</button>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-1 text-gray-500">No results found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
