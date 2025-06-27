import React, { useState } from "react";

// 샘플 옵션 및 단가(LOOKUP)
const REMOVAL_OPTIONS = [
  { label: "AL", price: 30000 },
  { label: "PVC", price: 40000 },
  { label: "시스템창", price: 80000 },
  { label: "세라믹", price: 80000 }
];

const MOLDING_UNIT_PRICE = 50000;

const DETACH_OPTIONS = [
  { label: "방충망", price: 10000 },
  { label: "블라인드", price: 12000 },
  { label: "중문", price: 30000 }
];

export default function DetailInput() {
  const [input, setInput] = useState({
    equipTime: "",
    equipName: "",
    equipPrice: "",
    removalQty: "",
    removalType: "",
    removalPrice: 0,
    moldingQty: "",
    moldingPrice: 0,
    trip: "",
    detachType: "",
    detachPrice: 0,
    etc: [{ label: "", price: "" }]
  });

  // 변경 및 자동 계산
  const handleChange = (name, value) => {
    let newInput = { ...input, [name]: value };

    // 철거 금액 LOOKUP
    if (name === "removalType" || name === "removalQty") {
      const typeObj = REMOVAL_OPTIONS.find(o => o.label === (name === "removalType" ? value : newInput.removalType));
      const qty = Number(name === "removalQty" ? value : newInput.removalQty) || 0;
      newInput.removalPrice = typeObj ? qty * typeObj.price : 0;
    }

    // 몰딩 금액 자동계산
    if (name === "moldingQty") {
      const qty = Number(value) || 0;
      newInput.moldingPrice = qty * MOLDING_UNIT_PRICE;
    }

    // 탈부착 금액 LOOKUP
    if (name === "detachType") {
      const typeObj = DETACH_OPTIONS.find(o => o.label === value);
      newInput.detachPrice = typeObj ? typeObj.price : 0;
    }

    setInput(newInput);
  };

  // 기타 항목 추가/변경/삭제
  const handleEtcChange = (idx, key, value) => {
    const etcArr = [...input.etc];
    etcArr[idx][key] = value;
    setInput({ ...input, etc: etcArr });
  };

  const addEtc = () =>
    setInput({ ...input, etc: [...input.etc, { label: "", price: "" }] });
  const removeEtc = (idx) =>
    setInput({ ...input, etc: input.etc.filter((_, i) => i !== idx) });

  return (
    <div style={{
      maxWidth: 600, margin: "32px auto", padding: 24, borderRadius: 18, boxShadow: "0 4px 12px #eee", background: "#fff"
    }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>세부 작업/비용 입력</h2>

      {/* 장비대 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
        <input placeholder="장비 시간" type="number" value={input.equipTime} onChange={e => handleChange("equipTime", e.target.value)} />
        <input placeholder="장비 명칭" value={input.equipName} onChange={e => handleChange("equipName", e.target.value)} />
        <input placeholder="장비 금액" type="number" value={input.equipPrice} onChange={e => handleChange("equipPrice", e.target.value)} />
      </div>

      {/* 철거 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
        <input placeholder="철거 수량" type="number" value={input.removalQty} onChange={e => handleChange("removalQty", e.target.value)} />
        <select value={input.removalType} onChange={e => handleChange("removalType", e.target.value)}>
          <option value="">철거 종류</option>
          {REMOVAL_OPTIONS.map(o => (
            <option key={o.label} value={o.label}>{o.label}</option>
          ))}
        </select>
        <input placeholder="철거 금액(자동)" value={input.removalPrice} readOnly style={{ background: "#f4f4f4" }} />
      </div>

      {/* 보양(몰딩) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
        <input placeholder="보양 수량" type="number" value={input.moldingQty} onChange={e => handleChange("moldingQty", e.target.value)} />
        <input placeholder="보양 금액(자동)" value={input.moldingPrice} readOnly style={{ background: "#f4f4f4" }} />
      </div>

      {/* 출장비 */}
      <div style={{ marginBottom: 8 }}>
        <input placeholder="출장비" type="number" value={input.trip} onChange={e => handleChange("trip", e.target.value)} style={{ width: "100%" }} />
      </div>

      {/* 탈부착/절단 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
        <select value={input.detachType} onChange={e => handleChange("detachType", e.target.value)}>
          <option value="">탈부착 품명</option>
          {DETACH_OPTIONS.map(o => (
            <option key={o.label} value={o.label}>{o.label}</option>
          ))}
        </select>
        <input placeholder="탈부착 금액(자동)" value={input.detachPrice} readOnly style={{ background: "#f4f4f4" }} />
      </div>

      {/* 기타항목(복수 가능) */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontWeight: 600, margin: "10px 0 6px" }}>기타 항목</div>
        {input.etc.map((item, idx) => (
          <div key={idx} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
            <input
              placeholder="품명"
              value={item.label}
              onChange={e => handleEtcChange(idx, "label", e.target.value)}
            />
            <input
              placeholder="금액"
              type="number"
              value={item.price}
              onChange={e => handleEtcChange(idx, "price", e.target.value)}
            />
            <button style={{
              background: "#ed3833", color: "#fff", border: 0, borderRadius: 5, fontSize: 12, padding: "2px 10px"
            }} onClick={() => removeEtc(idx)} disabled={input.etc.length === 1}>삭제</button>
          </div>
        ))}
        <button style={{
          background: "#2d6cf6", color: "#fff", border: 0, borderRadius: 7, fontSize: 14, padding: "5px 18px"
        }} onClick={addEtc}>기타 항목 추가</button>
      </div>

      <button style={{
        marginTop: 18, width: "100%", padding: "10px 0", fontWeight: 700, background: "#2d6cf6", color: "#fff", borderRadius: 8, border: 0
      }}>저장</button>
    </div>
  );
}
