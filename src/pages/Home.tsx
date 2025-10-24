/**
 * Home page displaying expert directory with card layout
 * Simplified data structure with only name, email, and category
 */
import { useState, useMemo } from 'react';
import { Search, User } from 'lucide-react';
import ExpertCard from '../components/ExpertCard';

/**
 * Expert data interface - simplified structure
 */
export interface Expert {
  id: string;
  name: string;
  email: string;
  category: string;
}

/**
 * Simplified expert data from Google Sheet
 */
const sampleExperts: Expert[] = [
  { id: '1', name: 'Bill Wright', email: 'bwright@gmail.com', category: 'Business Consulting' },
  { id: '2', name: 'Brad Jetter', email: 'brad.jeter@exitarchitects.co', category: 'Business Consulting' },
  { id: '3', name: 'Mike Vis', email: 'michael.visentine@eosworldwide.com', category: 'Business Consulting' },
  { id: '4', name: 'Anthony Bird', email: 'anthony@f2analytics.com', category: 'Business Consulting' },
  { id: '5', name: 'David Loy', email: 'dloy@financialguide.com', category: 'Business Consulting' },
  { id: '6', name: 'Philip D. Rogero', email: 'progero@financialguide.com', category: 'Financial Planner' },
  { id: '7', name: 'Zach Czaplicki', email: 'zczaplicki@fgswealth.com', category: 'Financial Planner' },
  { id: '8', name: 'Peter Hall', email: 'phall@fgswealth.com', category: 'Financial Planner' },
  { id: '9', name: 'Ben Dubinski', email: 'bdubinski@fgswealth.com', category: 'Financial Planner' },
  { id: '10', name: 'Geoff LeShane', email: 'gleshane@leshanecpa.com', category: 'Accounting / Tax' },
  { id: '11', name: 'Richard Melancon', email: 'richard@ramcpa.com', category: 'Accounting / Tax' },
  { id: '12', name: 'Randy McCall', email: 'randy@randymccallcpa.com', category: 'Accounting / Tax' },
  { id: '13', name: 'Ron Lovelace', email: 'rlovelace@rllovelacecpa.com', category: 'Accounting / Tax' },
  { id: '14', name: 'Sarah Scruggs Reddell', email: 'sscruggs@financialguide.com', category: 'Benefits / 401k' },
  { id: '15', name: 'Stephanie Davila', email: 'sdavila@financialguide.com', category: 'Insurance / Protection' },
  { id: '16', name: 'Emmanuele Sembroni', email: 'esembroni@financialguide.com', category: 'Insurance / Protection' },
  { id: '17', name: 'Brian Czerwinski', email: 'brian@f2analytics.com', category: 'Wealth Management / AUM' },
  { id: '18', name: 'Michele Ednock', email: 'mednock@financialguide.com', category: 'Wealth Management / AUM' },
  { id: '19', name: 'Michele Ednock', email: 'mednock@financialguide.com', category: 'Wealth Management / AUM' },
  { id: '20', name: 'Lauren Navare-Kaufmann', email: 'lauren@arenacollective.com', category: 'Legal' },
  { id: '21', name: 'Ben Cote', email: 'bcote@cote-law.com', category: 'Legal' },
  { id: '22', name: 'William Gust', email: 'gust@gentrylocke.com', category: 'Legal' }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  /**
   * Extract all unique categories for filtering
   */
  const allCategories = useMemo(() => {
    const categorySet = new Set<string>();
    sampleExperts.forEach(expert => {
      categorySet.add(expert.category);
    });
    return Array.from(categorySet).sort();
  }, []);

  /**
   * Filter experts based on search term and selected categories
   */
  const filteredExperts = useMemo(() => {
    return sampleExperts.filter(expert => {
      const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expert.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expert.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(expert.category);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="mb-6">
              <img 
                src="https://discovervalucompass.github.io/experts/assets/images/vc_experts_logo.png" 
                alt="Value Compass Experts"
                className="h-16 mx-auto"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Expert Directory
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with our network of industry experts and professionals
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
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
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search experts by name, email, or category..."
                className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Filter by Category
            </h3>
            
            {/* Filter Chips */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    if (selectedCategories.includes(category)) {
                      setSelectedCategories(selectedCategories.filter(item => item !== category));
                    } else {
                      setSelectedCategories([...selectedCategories, category]);
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategories.includes(category)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategories.length > 0) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategories([]);
                }}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            Showing {filteredExperts.length} of {sampleExperts.length} experts
          </p>
        </div>

        {/* Experts Grid */}
        {filteredExperts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No experts found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Value Compass Expert Directory &copy; 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
