import { Dispatch, SetStateAction } from "react";
import Select from "react-select";

export default function ProfileForm({
    user,
    isEditing,
    setIsEditing,
    isEmailEditable,
    formData,
    setFormData,
    speciesOptions,
    togglePreference,
    handleSpeciesChange,
    handleSpeciesPreferenceChange,
    handleDeleteSpecies,
    openIndex,
    setOpenIndex,
    speciesMap,
    handleSave
} :{
    user: { name: string; email: string; image: string; speciesPreferences: SpeciesPreference[] } | null,
    isEditing: boolean,
    setIsEditing: (_:boolean) => void,
    isEmailEditable: boolean,
    formData: { name: string, email: string, speciesPreferences: SpeciesPreference[] },
    setFormData: Dispatch<SetStateAction<{
        name: string;
        email: string;
        speciesPreferences: SpeciesPreference[];
    }>>,
    speciesOptions: { value: string; label: string }[],
    togglePreference: (index: number) => void,
    handleSpeciesChange: (selected: { value: string; label: string } | null) => void,
    handleSpeciesPreferenceChange: (index: number, field: keyof SpeciesPreference, value: string | number ) => void,
    handleDeleteSpecies: (index: number) => void,
    openIndex: number | null,
    setOpenIndex: (_:number | null) => void,
    speciesMap: Record<string, string[]>,
    handleSave: () => void
}) {
    return (
        <div>
            <div>
                <label>Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <p>{user?.name}</p>
                )}
              </div>
              <div>
                <label>Email:</label>
                {isEditing && isEmailEditable ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <p className="">{user?.email}</p>
                )}
            </div>

            <hr/>

            <h3 className="text-lg font-bold">Preferences:</h3>
            {user && !isEditing && user?.speciesPreferences.length > 0 && (
                <div className="mt-5">
                    <h3 className="text-lg font-semibold">Species Preferences:</h3>
                    {user?.speciesPreferences.map((pref, index) => (
                    <div key={index} className="p-3 my-2 border rounded-lg bg-gray-100">
                        <p className="font-bold">{pref.species}</p>
                        <p><strong>Breeds:</strong> {pref.breeds.map(b => b.label).join(", ") || "Any"}</p>
                        <p><strong>Max Age:</strong> {pref.age}</p>
                        <p><strong>Gender:</strong> {pref.gender}</p>
                    </div>
                    ))}
                </div>
            )}

            {isEditing ? (
                <>
                  <label>Add a Species</label>
                  <Select 
                    options={speciesOptions.filter(option => 
                      !formData.speciesPreferences.some(pref => pref.species === option.value)
                    )} 
                    onChange={(selected: { value: string; label: string; } | null) : void => { handleSpeciesChange(selected)} } 
                    hideSelectedOptions
                  />
                  {formData.speciesPreferences.map((pref, index) => (
                    <div 
                      key={index} 
                      className={`preference-container my-2 p-3 rounded-lg cursor-pointer transition-all ${
                        openIndex === index ? "bg-white shadow-lg" : "bg-gray-200"
                      }`}
                    >
                      <p 
                        className="text-lg font-semibold cursor-pointer"
                        onClick={() => togglePreference(index)}
                      >
                        {pref.species}
                      </p>

                      {openIndex === index && (
                        <div className="mt-3">
                          <label>Breeds (empty for all)</label>
                          <Select
                            options={speciesMap[pref.species]?.map(breed => ({ value: breed, label: breed })) || []}
                            isMulti
                            onChange={(selected: any) => handleSpeciesPreferenceChange(index, "breeds", selected)}
                            value={pref.breeds}
                            className="pb-3"
                          />
                          <div>
                            <label>Max Age</label>
                            <input type="number" min="0" value={pref.age} onChange={(e) => handleSpeciesPreferenceChange(index, "age", parseInt(e.target.value))} className="input input-bordered m-3 align-middle w-fit" />
                          </div>
                          <div>
                            <label>Gender</label>
                            <Select options={[{ value: "Any", label: "Any" }, { value: "Male", label: "Male" }, { value: "Female", label: "Female" }]} onChange={(selected: any) => handleSpeciesPreferenceChange(index, "gender", selected.value)} value={{ value: pref.gender, label: pref.gender }} />
                          </div>
                          <div className="flex justify-between mt-3">
                            <button className="btn btn-error text-white" onClick={() => handleDeleteSpecies(index)}>Remove</button>
                            <button className="btn btn-secondary" onClick={() => setOpenIndex(null)}>Cancel</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex flex-row justify-around">
                    <button className="btn bg-red-500 text-white hover:bg-red-400 mt-5 w-1/3" onClick={() => setIsEditing(!isEditing) }>Cancel</button>
                    <button className="btn btn-primary mt-5 w-1/3" onClick={handleSave}>Save</button>
                  </div>
                </>
            ) : (
                <button className="btn btn-primary mt-5" onClick={() => setIsEditing(true)}>Edit Profile</button>
            )}
        </div>
    )
}