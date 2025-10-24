
/**
 * SearchFilter component for filtering and searching experts
 * Combines search input and expertise filter chips
 */
import { Search } from 'lucide-react';

/**
 * Props interface for SearchFilter component
 */
interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  expertiseOptions: string[];
  selectedExpertise: string[];
  onExpertiseChange: (expertise: string[]) => void;
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  expertiseOptions,
  selectedExpertise,
  onExpertiseChange,
}: SearchFilterProps) {
  /**
   * Toggle expertise filter selection
   */
  const toggleExpertise = (expertise: string) => {
    if (selectedExpertise.includes(expertise)) {
      onExpertiseChange(selectedExpertise.filter(item => item !== expertise));
    } else {
      onExpertiseChange([...selectedExpertise, expertise]);
    }
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    onSearchChange('');
    onExpertiseChange([]);
  };

  return (
    <div className="mb-12">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search experts by name, company, or expertise..."
            className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>
      </div>

      {/* Expertise Filters */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Filter by Expertise
        </h3>
        
        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {expertiseOptions.map((expertise) => (
            <button
              key={expertise}
              onClick={() => toggleExpertise(expertise)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedExpertise.includes(expertise)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {expertise}
            </button>
          ))}
        </div>

        {/* Clear Filters */}
        {(searchTerm || selectedExpertise.length > 0) && (
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
