import React, { useEffect, useState } from "react"
const App = () => {
  const [employees, setEmployees] = useState([]);
  const [empid, setEmpid] = useState("");
  const [ename, setEname] = useState("");
  const [salary, setSalary] = useState("");
  const [empActive, setEmpActive] = useState(false)
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetch("/emp/all")
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.log(error))
  }, []);

  // ============================
  // POST - To Save Employee Data
  // ============================
  const saveEmployee = () => {
    if (!empid || !ename || !salary) {
      alert("Please fill all fields!");
      return;
    }

    const employeeData = {
      empid: parseInt(empid),
      ename: ename,
      salary: parseFloat(salary),
      empActive: empActive
    }
    
    console.log("Sending data:", employeeData);
    
    fetch("/emp/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employeeData)
    })
      .then(response => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
          });
        }
        return response.text();
      })
      .then(data => {
        console.log("Success response:", data);
        alert(data);
        clearForm();
        // Refresh the employee list after saving
        fetch("/emp/all")
          .then(response => response.json())
          .then(data => setEmployees(data))
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.error("Error details:", error);
        alert("Error saving employee: " + error.message);
      });
  }
  // =========================
  // Clear Form
  // =========================
  const clearForm = () => {
    setEmpid("");
    setEname("");
    setSalary("");
    setEmpActive(false);
  };

    // =========================
  // GET - Employee By ID
  // =========================
  const getEmpById = () => {
  fetch(`/emp/${searchId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Employee not found");
    }
    return response.json();
  })
  .then(data => {
    setSearchResult(data);
  })
  .catch(error => {
    console.error("Error fetching employee:", error);
    setSearchResult(null);
  });
  };

  return (

    <div style={{ padding: "20px" }}>


      <h2>Search Employee</h2>
      <input type="number" placeholder="Enter Employee ID to search"
        value={searchId}
        onChange={e => setSearchId(e.target.value)}
      />
      <button onClick={getEmpById}>Search Employee</button>
      {searchResult && (
        <div>
          <h3>Employee Details</h3>
          <p>Employee ID: {searchResult.empid}</p>
          <p>Employee Name: {searchResult.ename}</p>
          <p>Employee Salary: {searchResult.salary}</p>
          <p>Employee Active Status: {searchResult.empActive === true || searchResult.empActive === "true" || searchResult.empActive === 1 ? "Active" : "Inactive"}</p>
        </div>
      )}



      <h2>Enter Employee data to save in MySQL </h2>
      <input type="number" placeholder="Employee ID"
        value={empid}
        onChange={e => setEmpid(e.target.value)}
      /><br /><br />
      <input type="text" placeholder="Employee Name" value={ename}
        onChange={e => setEname(e.target.value)} /><br /><br />
      <input type="number" placeholder="Employee Salary" value={salary}
        onChange={e => setSalary(e.target.value)} /><br /><br />
      <label>
        Employee Active Status:
        <input type="checkbox" checked={empActive}
          onChange={e => setEmpActive(e.target.checked)} />
      </label>
      <button onClick={saveEmployee}>Save Employee</button>
      <br /><br />
      <h2>Employee List From MySQL </h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th> Employee ID</th>
            <th> Employee Name</th>
            <th> Employee Salary</th>
            <th> Employee Active Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(i => (
            <tr key={i.empid}>
              <td>{i.empid}</td>
              <td>{i.ename}</td>
              <td>{i.salary}</td>
              <td>{i.empActive === true || i.empActive === "true" || i.empActive === 1 ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  )
}
export default App