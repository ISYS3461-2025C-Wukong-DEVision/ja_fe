import React, { forwardRef } from 'react'; // 1. Phải import forwardRef

// 2. Bọc toàn bộ component bằng forwardRef
const AuthInput = forwardRef(({
  label,
  id,
  name,
  type = 'text',
  autoComplete,
  required = false,
  value,
  onChange,
  placeholder,
  t,
  className, // Nhận className từ cha để hiển thị viền đỏ
  ...props
}, ref) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-primary"
      >
        {t}
      </label>
      
      <div className="mt-1">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={value}
          ref={ref} // 3. Bây giờ ref này đã có giá trị từ forwardRef
          onChange={onChange}
          // 4. Thêm ${className} vào đây để nhận viền đỏ từ RegisterForm
          className={`appearance-none block w-full px-3 py-2 rounded-sm bg-primary/50 shadow-sm placeholder-gray-50 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700 border border-primary/50 ${className}`}
          placeholder={placeholder}
          {...props} // 5. Đẩy onKeyDown và các prop khác vào đây
        />
      </div>
    </div>
  );
}); // Kết thúc bọc forwardRef

export default AuthInput;