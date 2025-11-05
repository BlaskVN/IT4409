import React, { useState } from 'react';

// BƯỚC 5: Component AddUser - Form thêm người dùng mới
function AddUser({ onAdd }) {
  const [adding, setAdding] = useState(false);
  // State lưu thông tin người dùng, có cấu trúc lồng nhau (address)
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: ""
  });

  // Xử lý thay đổi input, cần spread operator cho nested state
  const handleChange = (e) => {
    const { id, value } = e.target;
    // Xử lý đặc biệt cho các trường trong address
    if (["street", "suite", "city"].includes(id)) {
      setUser({ ...user, address: { ...user.address, [id]: value } });
    } else {
      setUser({ ...user, [id]: value });
    }
  };

  const handleAdd = () => {
    if (user.name === "" || user.username === "") {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    // Gọi hàm onAdd để truyền dữ liệu lên App
    onAdd(user);
    // Reset form sau khi thêm
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: ""
    });
    setAdding(false);
  };

  return (
    <div>
      <button onClick={() => setAdding(true)}>Thêm</button>
      {adding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Thêm người dùng</h4>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" value={user.name} onChange={handleChange} />

            <label htmlFor="username">Username:</label>
            <input id="username" type="text" value={user.username} onChange={handleChange} />

            <label htmlFor="email">Email:</label>
            <input id="email" type="text" value={user.email} onChange={handleChange} />

            <label htmlFor="street">Street:</label>
            <input id="street" type="text" value={user.address.street} onChange={handleChange} />

            <label htmlFor="suite">Suite:</label>
            <input id="suite" type="text" value={user.address.suite} onChange={handleChange} />

            <label htmlFor="city">City:</label>
            <input id="city" type="text" value={user.address.city} onChange={handleChange} />

            <label htmlFor="phone">Phone:</label>
            <input id="phone" type="text" value={user.phone} onChange={handleChange} />

            <label htmlFor="website">Website:</label>
            <input id="website" type="text" value={user.website} onChange={handleChange} />

            <div>
              <button onClick={handleAdd}>Lưu</button>
              <button onClick={() => setAdding(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser;
