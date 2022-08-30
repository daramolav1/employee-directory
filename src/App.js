import "./App.css";
import { useState, useEffect } from "react";
import Table from "./components/Table";

function App() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadEmployees() {
      const response = await fetch("https://dummyjson.com/users");
      const employeesFromAPI = await response.json();
      setEmployees(employeesFromAPI.users);
    }
    loadEmployees();
  }, []);

  const keys = ["firstName", "lastName", "email"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  return (
    <div className="App">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        onChange={({ target }) => setQuery(target.value)}
      />
      <Table employees={search(employees)} />
    </div>
  );
}

export default App;
