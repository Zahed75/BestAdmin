"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploader = () => {
  const [specData, setSpecData] = useState({});

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Convert the data to key-value pairs
        const result = {};
        json.forEach((row) => {
          if (row[0] && row[1]) {
            result[row[0]] = row[1];
          }
        });
        setSpecData(result);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div>
        {Object.keys(specData).length > 0 && (
          <table className="w-full text-md my-10">
            <tbody>
              {Object.entries(specData).map(([key, value], index) => (
                <tr key={index}>
                  <td className="border px-5 py-2">
                    <input
                      type="text"
                      defaultValue={key + ":"}
                      className="w-full px-2 py-1 focus:outline-0"
                    />
                  </td>
                  <td className="border px-5 py-2">
                    <input
                      type="text"
                      defaultValue={value}
                      className="w-full px-2 py-1 focus:outline-0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExcelUploader;
