import React, { useEffect, useState } from "react";
import {
  getSchema,
  getData,
  createRecord,
  updateRecord,
  deleteRecord,
} from "./api";

export default function DynamicTable() {
  const [dataset, setDataset] = useState("dataset1");
  const [slow, setSlow] = useState(false);
  const [schema, setSchema] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const s = await getSchema(dataset);
    const d = await getData(dataset, slow);
    setSchema(s.data);
    setRows(d.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [dataset, slow]);

  const addRow = async () => {
    await createRecord(dataset, { name: "New", value: "Value" });
    load();
  };

  const remove = async (id) => {
    await deleteRecord(dataset, id);
    load();
  };

  return (
    <div>
      <h2>Dynamic Table</h2>

      <select onChange={(e) => setDataset(e.target.value)}>
        <option value="dataset1">Dataset 1</option>
        <option value="dataset2">Dataset 2</option>
        <option value="dataset3">Dataset 3</option>
      </select>

      <label>
        <input type="checkbox" onChange={(e) => setSlow(e.target.checked)} />
        Slow Endpoint
      </label>

      <button onClick={addRow}>Add</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              {schema.map((col) => (
                <th key={col.field}>{col.label}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                {schema.map((col) => (
                  <td key={col.field}>{r[col.field]}</td>
                ))}
                <td>
                  <button onClick={() => remove(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
