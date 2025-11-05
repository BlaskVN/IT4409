import React from 'react';

// BƯỚC 3: Component SearchForm - Tìm kiếm người dùng
// Nhận hàm onChangeValue từ App để cập nhật keyword
function SearchForm({ onChangeValue }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Tìm theo name, username"
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
}

export default SearchForm;
