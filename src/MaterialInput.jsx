import React, { useState } from "react";

// 드롭다운 샘플 옵션
const KIND_OPTIONS = ["단창", "이중창"];
const SPEC_OPTIONS = ["AL", "PVC", "시스템창", "세라믹"];

export default function MaterialInput() {
  const [rows, setRows] = useState([
    { width: "", height: "", area: 0, kind: "", spec: "" }
  ]);

  // 입력 변경 및 자평(면적) 자동계산
  const handleChange = (idx, name, value) => {
    const newRows = [...rows];
    newRows[idx][name] = value;

    // 자평(면적) = 가로 × 세로 / 90000 (소수점 2자리)
    if (name === "width" || name === "height") {
      const w = Number(newRows[idx].width) || 0;
      const h = Number(newRows[idx].height) || 0;
      newRows[idx].area = w && h ? +(w * h / 90000).toFixed(2) : 0;
    }
    setRows(newRows);
  };

  // 행 추가/삭제
  const addRow = () =>
    setRows([...rows, { width: "", height: "", area: 0, kind: "", spec: "" }]);
  const removeRow = (idx) => setRows(rows.filter((_, i) => i !== idx));

  return (
    <div style={{
      maxWidth: 600, margin: "32px auto", padding: 24, borderRadius: 18, boxShadow: "0 4px 12px #eee", background: "#fff"
    }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>자재/옵션 입력</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 10 }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th>가로</th>
            <th>세로</th>
            <th>자평</th>
            <th>종류</th>
            <th>사양</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} style={{ textAlign: "center" }}>
              <td>
                <input
                  type="number"
                  value={row.width}
                  onChange={e => handleChange(idx, "width", e.target.value)}
                  style={{ width: 60 }}
                  placeholder="가로"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.height}
                  onChange={e => handleChange(idx, "height", e.target.value)}
                  style={{ width: 60 }}
                  placeholder="세로"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.area}
                  readOnly
                  style={{ width: 60, background: "#f4f4f4" }}
                  placeholder="자평"
                />
              </td>
              <td>
                <select
                  value={row.kind}
                  onChange={e => handleChange(idx, "kind", e.target.value)}
                  style={{ width: 90 }}
                >
                  <option value="">선택</option>
                  {KIND_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={row.spec}
                  onChange={e => handleChange(idx, "spec", e.target.value)}
                  style={{ width: 90 }}
                >
                  <option value="">선택</option>
                  {SPEC_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  style={{
                    padding: "2px 10px",
                    color: "#fff",
                    background: "#ed3833",
                    border: 0,
                    borderRadius: 6,
                    fontSize: 13
                  }}
                  onClick={() => removeRow(idx)}
                  disabled={rows.length === 1}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={{
          width: "100%",
          padding: "10px 0",
          fontWeight: 700,
          background: "#2d6cf6",
          color: "#fff",
          borderRadius: 8,
          border: 0
        }}
        onClick={addRow}
      >
        행 추가
      </button>
    </div>
  );
}
