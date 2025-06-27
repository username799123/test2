import React, { useState } from "react";

// 실제 DB 연동 전, 샘플 옵션값 목록만 사용
const SAMPLE_OPTIONS = [
  { group: "종류", label: "단창", price: 4000 },
  { group: "종류", label: "이중창", price: 5000 },
  { group: "사양", label: "AL", price: 30000 },
  { group: "사양", label: "PVC", price: 40000 },
  { group: "사양", label: "시스템창", price: 80000 },
  { group: "사양", label: "세라믹", price: 80000 }
];

export default function OptionAdmin() {
  const [options, setOptions] = useState(SAMPLE_OPTIONS);
  const [newOption, setNewOption] = useState({ group: "", label: "", price: "" });

  // 옵션 추가
  const addOption = () => {
    if (!newOption.group || !newOption.label || !newOption.price) {
      alert("모든 값을 입력하세요.");
      return;
    }
    setOptions([...options, { ...newOption, price: Number(newOption.price) }]);
    setNewOption({ group: "", label: "", price: "" });
  };

  // 옵션 삭제
  const removeOption = (idx) => {
    if (!window.confirm("정말 삭제할까요?")) return;
    setOptions(options.filter((_, i) => i !== idx));
  };

  return (
    <div style={{
      maxWidth: 500, margin: "32px auto", padding: 24, borderRadius: 18, boxShadow: "0 4px 12px #eee", background: "#fff"
    }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>옵션값/단가 관리자</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="구분(예: 종류/사양)"
          value={newOption.group}
          onChange={e => setNewOption({ ...newOption, group: e.target.value })}
        />
        <input
          placeholder="항목명"
          value={newOption.label}
          onChange={e => setNewOption({ ...newOption, label: e.target.value })}
        />
        <input
          placeholder="금액"
          type="number"
          value={newOption.price}
          onChange={e => setNewOption({ ...newOption, price: e.target.value })}
        />
        <button style={{
          background: "#2d6cf6", color: "#fff", border: 0, borderRadius: 7, fontWeight: 700, padding: "0 12px"
        }} onClick={addOption}>추가</button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 10 }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th>구분</th>
            <th>항목명</th>
            <th>금액</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {options.map((opt, idx) => (
            <tr key={idx} style={{ textAlign: "center" }}>
              <td>{opt.group}</td>
              <td>{opt.label}</td>
              <td>{opt.price}</td>
              <td>
                <button style={{
                  background: "#ed3833", color: "#fff", border: 0, borderRadius: 5, fontSize: 13, padding: "2px 10px"
                }} onClick={() => removeOption(idx)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ color: "#999", fontSize: 13 }}>이 페이지에서 옵션값/단가를 관리하세요.<br />추후 DB 연동도 가능합니다.</div>
    </div>
  );
}
