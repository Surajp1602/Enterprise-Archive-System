import { useEffect, useState } from "react";
import axios from "axios";

function RetentionPolicy() {

  const [policies, setPolicies] = useState([]);

  useEffect(() => {

    axios
      .get(
        "http://127.0.0.1:5000/api/retention-policies"
      )
      .then((res) => {
        setPolicies(res.data);
      });

  }, []);

  return (
    <div style={{ width: "95%", margin: "40px auto" }}>

      <h2>Retention Policies</h2>

      <table>

        <thead>
          <tr>
            <th>Document Type</th>
            <th>Retention Years</th>
          </tr>
        </thead>

        <tbody>

          {policies.map((policy) => (

            <tr key={policy.id}>
              <td>{policy.document_type}</td>
              <td>{policy.retention_years}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RetentionPolicy;