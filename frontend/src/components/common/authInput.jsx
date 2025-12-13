// authInput.jsx
import React from 'react';

const AuthInput = ({
  label,
  id,
  name,
  type = 'text', // Giá trị mặc định là 'text'
  autoComplete,
  required = false,
  value,
  onChange,
  placeholder,
  t, // Dùng cho i18n
}) => {
  return (
    <div>
      {/* Label: Dùng prop 'label' và 't' cho i18n */}
      <label
        htmlFor={id}
        className="block text-sm font-medium text-primary"
      >
        {t}
      </label>
      
      <div className="mt-1">
        {/* Input: Dùng các prop để kết nối với state của component cha */}
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={onChange}
          className="appearance-none block w-full px-3 py-2 rounded-sm bg-primary/50 shadow-sm placeholder-gray-50 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700 border border-primary/50"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default AuthInput;