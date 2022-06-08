import React from 'react';
import { useField } from 'formik';

export const InputField: React.FC<{
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
}> = ({ name, label, type, placeholder, required, disabled }) => {
  const [field, meta] = useField(name);
  return (
    <div className=" relative mt-4 ">
      <label htmlFor={name} className="">
        {label}
        {required && <span className="text-red-500 required-dot"></span>}
      </label>
      <input
        {...field}
        id={name}
        type={type}
        className={`rounded-md border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white  shadow-sm focus:outline-none   focus:border-transparent ${
          meta.touched && meta.error
            ? 'ring-red-500 ring-1'
            : 'ring-gray-200 focus:ring-primary focus:ring-2'
        }`}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
      />
      {meta.touched && meta.error ? (
        <React.Fragment>
          <p className=" text-sm text-red-500 mt-1">*{meta.error}</p>
        </React.Fragment>
      ) : null}
    </div>
  );
};
