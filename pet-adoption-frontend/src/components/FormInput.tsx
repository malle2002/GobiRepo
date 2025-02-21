import React from "react";
import InputError from "@/src/components/InputError";

const FormInput: React.FC<FormInputProps> = ({ 
    type, 
    name, 
    placeholder, 
    label, 
    value, 
    onChange, 
    required = false, 
    autoComplete, 
    autoFocus = false, 
    errors = ""
}) => {
    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text text-lg">{label}</span>
            </div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="input input-bordered w-full"
                value={value}
                onChange={onChange}
                required={required}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
            />
            <InputError message={errors.at(0)} className="mt-2" />
        </label>
    );
};

export default FormInput;
