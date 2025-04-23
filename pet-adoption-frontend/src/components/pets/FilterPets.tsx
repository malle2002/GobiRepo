import usePetOptions from "@/src/hooks/pets/usePetOptions";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";

export default function FilterPets(
    { 
        handleSelect,
        filters,
        handleBreedSelect,
        useFilters,
        setUserFilters,
    } : { 
        handleSelect: (key: string, value: string) => void,
        filters: FilterType,
        handleBreedSelect: (selectedOptions: MultiValue<any>) => void,
        useFilters: boolean,
        setUserFilters: Dispatch<SetStateAction<boolean>>
}) {
    const { control } = useForm();
    const { breedOptions, locationOptions, speciesOptions } = usePetOptions();

    return (
        <div className="w-full md:w-1/4 p-4 border rounded-lg shadow-md space-y-5">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <div>
            <label htmlFor="species">Species</label>
            <Controller
              name="species"
              control={control}
              render={({ field }) => (
                <Select
                  options={speciesOptions.map((s) => ({ value: s, label: s }))}
                  isClearable
                  placeholder="Select Species"
                  onChange={(selectedOption) => handleSelect("species", selectedOption?.value || "")}
                  className="w-full mb-3"
                />
              )}
            />
          </div>

          <div>
            <label htmlFor="breed">Breeds</label>
            <Controller
              name="breeds"
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  placeholder="Select Breeds"
                  options={breedOptions.map((breed) => ({ value: breed, label: breed }))}
                  value={filters.breeds.map((b) => ({ value: b, label: b }))}
                  onChange={handleBreedSelect}
                />
              )}
            />
          </div>

          <div>
            <label htmlFor="location">Location</label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={locationOptions.map((loc) => ({ value: loc, label: loc }))}
                  isClearable
                  placeholder="Select Location"
                  onChange={(selectedOption) => handleSelect("location", selectedOption?.value || "")}
                  className="w-full mb-3"
                />
              )}
            />
          </div>

          <button onClick={() => setUserFilters((prev: boolean) => !prev)} className="btn btn-outline w-full">
            {useFilters ? "Show All Pets" : "Apply Filters"}
          </button>
        </div>
    )
}