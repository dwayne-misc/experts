/**
 * ExpertCard component for displaying individual expert information
 * Simplified version with only name, email, and category
 */
import { User, Mail } from 'lucide-react';
import { Expert } from '../pages/Home';

/**
 * Props interface for ExpertCard component
 */
interface ExpertCardProps {
  expert: Expert;
}

export default function ExpertCard({ expert }: ExpertCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      {/* Header with Avatar and Name */}
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
        </div>
      </div>

      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {expert.category}
        </span>
      </div>

      {/* Email */}
      <div className="mb-6">
        <div className="flex items-center text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          <span className="text-sm truncate">{expert.email}</span>
        </div>
      </div>

      {/* Contact Button */}
      <a
        href={`mailto:${expert.email}`}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center"
      >
        <Mail className="h-4 w-4 mr-2" />
        Contact Expert
      </a>
    </div>
  );
}
