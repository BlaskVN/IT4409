import React, { useState, useEffect } from 'react';

// BƯỚC 4: Component ResultTable - Hiển thị và quản lý danh sách người dùng
function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  // BƯỚC 4: Tải dữ liệu 1 lần khi component mount (dependency array [])
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  // BƯỚC 5: Lắng nghe user mới từ props và thêm vào danh sách
  useEffect(() => {
    if (user) {
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
      onAdded();
    }
  }, [user]);

  // BƯỚC 4: Lọc danh sách theo keyword
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.username.toLowerCase().includes(keyword.toLowerCase())
  );

  // BƯỚC 6: Kích hoạt chế độ sửa - Deep copy để tránh tham chiếu
  function editUser(user) {
    setEditing({ ...user, address: { ...user.address } });
  }

  // BƯỚC 6: Xử lý thay đổi khi sửa
  function handleEditChange(field, value) {
    if (["street", "suite", "city"].includes(field)) {
      setEditing({ ...editing, address: { ...editing.address, [field]: value } });
    } else {
      setEditing({ ...editing, [field]: value });
    }
  }

  // BƯỚC 6: Lưu sau khi chỉnh sửa - Dùng map để thay thế user có id tương ứng
  function saveUser() {
    setUsers(prev => prev.map(u => u.id === editing.id ? editing : u));
    setEditing(null);
  }

  // BƯỚC 7: Xóa người dùng - Dùng filter để tạo mảng mới không chứa id cần xóa
  function removeUser(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.address.city}</td>
              <td>
                <button onClick={() => editUser(u)}>Sửa</button>
                <button className="btn-delete" onClick={() => removeUser(u.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* BƯỚC 6: Modal form sửa người dùng */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Sửa người dùng</h4>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={editing.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />

            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={editing.username}
              onChange={(e) => handleEditChange("username", e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              value={editing.email}
              onChange={(e) => handleEditChange("email", e.target.value)}
            />

            <label htmlFor="street">Street:</label>
            <input
              id="street"
              type="text"
              value={editing.address.street}
              onChange={(e) => handleEditChange("street", e.target.value)}
            />

            <label htmlFor="suite">Suite:</label>
            <input
              id="suite"
              type="text"
              value={editing.address.suite}
              onChange={(e) => handleEditChange("suite", e.target.value)}
            />

            <label htmlFor="city">City:</label>
            <input
              id="city"
              type="text"
              value={editing.address.city}
              onChange={(e) => handleEditChange("city", e.target.value)}
            />

            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              type="text"
              value={editing.phone}
              onChange={(e) => handleEditChange("phone", e.target.value)}
            />

            <label htmlFor="website">Website:</label>
            <input
              id="website"
              type="text"
              value={editing.website}
              onChange={(e) => handleEditChange("website", e.target.value)}
            />

            <div>
              <button onClick={saveUser}>Lưu</button>
              <button onClick={() => setEditing(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultTable;
