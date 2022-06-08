import React, { useEffect } from 'react';
import { useField } from 'formik';
import Select from 'react-select';

interface SelectFieldProps {
  value: string;
  label: string;
}

const SelectField: React.FC<{
  required?: Boolean;
  label: string;
  name: string;
  options: any;
  formik: any;
  multiple?: Boolean;
}> = ({ name, label, required, options, formik, multiple }) => {
  const [field, meta] = useField(name);

  const [selectedValue, setSelectedValue] = React.useState(meta.value);

  useEffect(() => {
    formik.setFieldValue(name, selectedValue);
  }, [selectedValue, name, formik]);

  return (
    <div className="relative mt-4">
      <label htmlFor="select" className="text-skin-inverted">
        {label}
        {required && <span className="text-red-500 required-dot">*</span>}
      </label>
      <Select
        {...field}
        options={options}
        value={selectedValue}
        onChange={setSelectedValue}
        {...(multiple ? { isMulti: true } : {})}
      />
      {meta.touched && meta.error ? (
        <React.Fragment>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="currentColor"
            className="absolute text-red-500 right-2 top-1/2  -translate-y-1/2"
            viewBox="0 0 1792 1792"
          >
            <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"></path>
          </svg>
          <p className=" text-sm text-red-500 -bottom-6">{meta.error}</p>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default SelectField;
