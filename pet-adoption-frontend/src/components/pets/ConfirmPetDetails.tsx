import React from 'react';
import { CheckCircle, User, PawPrint, Calendar, MapPin, Info, SquarePen, Mars } from 'lucide-react';

interface FormData {
    name: string;
    gender: string;
    species: string;
    breed: string;
    age: number;
    location: string;
    images: [];
}

const ConfirmPetDetails = ({ formData, loading, onSubmit, setStep } : { formData: FormData, loading: boolean, onSubmit: any, setStep: (n:number) => void }) => {
  // Helper function to render detail rows
  const DetailRow = ({ icon: Icon, label, value, step } : any) => (
    <div className="flex items-center space-x-3 py-2 border-b border-gray-200">
      <Icon className="text-blue-500 w-5 h-5" />
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-md font-semibold">{value || 'Not provided'}</p>
      </div>
      <button type="button" className='btn btn-primary btn-outline' onClick={() => setStep(step)}>
        <SquarePen />
      </button>
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <div className="flex items-center mb-6 space-x-3">
        <CheckCircle className="text-green-500 w-8 h-8" />
        <h3 className="text-xl font-bold text-gray-800">Confirm Pet Details</h3>
      </div>

      <div className="space-y-3">
        <DetailRow 
          icon={User} 
          label="Pet Name" 
          value={formData.name}
          step={1} 
        />
        <DetailRow 
          icon={Mars} 
          label="Pet Gender" 
          value={formData.gender}
          step={2} 
        />
        <DetailRow 
          icon={PawPrint} 
          label="Pet Type" 
          value={formData.breed} 
          step={3} 
        />
        <DetailRow 
          icon={Calendar} 
          label="Age" 
          value={formData.age ? `${formData.age} years` : undefined} 
          step={4} 
        />
        <DetailRow 
          icon={MapPin} 
          label="Location" 
          value={formData.location} 
          step={5} 
        />
        <DetailRow 
          icon={Info} 
          label="Additional Notes" 
          value={formData.species} 
          step={6} 
        />
      </div>

      <button 
        onClick={onSubmit}
        disabled={loading}
        className="mt-6 w-full bg-accent text-white py-3 rounded-lg hover:bg-neutral transition-colors 
                   disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <div className="flex items-center">
            <svg 
              className="animate-spin h-5 w-5 mr-3" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Adding Pet...
          </div>
        ) : (
          "Add Pet"
        )}
      </button>
    </div>
  );
};

export default ConfirmPetDetails;