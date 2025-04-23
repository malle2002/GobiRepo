interface SpeciesPreference {
    species: string;
    breeds: { value: string; label: string }[];
    age: number;
    gender: "Male" | "Female" | "Any";
}

interface BreedOption {
  value: string;
  label: string;
}

interface ProfileFormProps {
    isEditing: boolean;
    formData: UserData;
    setFormData: React.Dispatch<React.SetStateAction<UserData>>;
}

interface PetData {
    id: string;
    name: string;
    species: string;
    breed: string;
    age: number;
    description?: string;
    gender: string;
    vaccinations?: string;
    allergies?: string;
    location: string;
    images: string[];
    user: UserData;
    created_at: string;
}

interface UserData {
    id: string;
    name: string;
    email: string;
    image?: string;
    speciesPreferences: SpeciesPreference[];
    avatar?: string;
}

interface PetFormData {
  name: string;
  species: string;
  breed: string;
  age: number;
  description?: string;
  gender: string;
  vaccinations?: string;
  allergies?: string;
  location: string;
  images: string[];
  user: UserData;
}

interface FormInputProps {
    type: string;
    name: string;
    placeholder: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    errors?: string;
}

interface ImageCarouselProps {
    images: string[];
    petName: string;
}

type Theme = 'pink' | 'blue';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

interface AuthFormProps {
    type: "signin" | "signup";
}

interface FormDataType {
    name?: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FilterType {
    species: string;
    breeds: string[];
    age: number;
    gender: string;
    location: string;
}