import { useEffect, useState } from "react";
import axios from "axios";

function RecordsTable() {

  const [records, setRecords] = useState([]);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("");

  const [documentType, setDocumentType] = useState("");

  const fetchRecords = () => {

  axios
    .get(
      `http://127.0.0.1:5000/api/records?search=${search}&department=${department}&document_type=${documentType}`)
    .then((res) => {
      setRecords(res.data);
    });

};

  useEffect(() => {

  fetchRecords();

}, [search, department, documentType]);

  return (
    <div
      style={{
        width: "95%",
        margin: "40px auto",
        overflowX: "auto"
      }}
    >
      <h2>Recent Records</h2>

      <input
        type="text"
        placeholder="Search Employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
>
  <option value="">All Departments</option>
  <option value="IT">IT</option>
  <option value="HR">HR</option>
  <option value="Finance">Finance</option>
  <option value="Marketing">Marketing</option>
  <option value="Sales">Sales</option>
  <option value="Operations">Operations</option>
</select>

<select
  value={documentType}
  onChange={(e) => setDocumentType(e.target.value)}
>
  <option value="">All Documents</option>
  <option value="Contract">Contract</option>
  <option value="Invoice">Invoice</option>
  <option value="Payslip">Payslip</option>
  <option value="Employee Record">Employee Record</option>
  <option value="NDA">NDA</option>
</select>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white"
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Department</th>
            <th>Document Type</th>
            <th>Status</th>
            <th>Joining Date</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.record_id}>
              <td>{record.record_id}</td>
              <td>{record.employee_name}</td>
              <td>{record.department}</td>
              <td>{record.document_type}</td>
              <td>{record.status}</td>
              <td>{record.joining_date}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default RecordsTable;