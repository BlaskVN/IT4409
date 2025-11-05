import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import AddUser from './components/AddUser';
import ResultTable from './components/ResultTable';

// BƯỚC 2: Component App - Quản lý state tập trung và điều phối các component con
function App() {
  // State Lifting: Quản lý state ở component cha để chia sẻ giữa các component con
  const [kw, setKeyword] = useState("");
  const [newUser, setNewUser] = useState(null);

  return (
    <div>
      <h1>Quản lý người dùng</h1>
      {/* Truyền hàm setKeyword xuống SearchForm qua props */}
      <SearchForm onChangeValue={setKeyword} />
      {/* Truyền hàm setNewUser xuống AddUser qua props */}
      <AddUser onAdd={setNewUser} />
      {/* Truyền keyword và newUser xuống ResultTable, nhận callback onAdded */}
      <ResultTable
        keyword={kw}
        user={newUser}
        onAdded={() => setNewUser(null)}
      />
    </div>
  );
}

export default App;
