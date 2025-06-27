import React, { useState } from "react";

export default function ProjectForm() {
  const [form, setForm] = useState({
    contractNo: "",
    orderNo: "",
    site: "",
    customer: "",
    completeDate: "",
    specialNote: "",
    supplyAmount: 0,
    vat: 0,
    totalAmount: 0,
    depositStatus: "",
    equipmentCost: 0,
    deduction: 0,
    insurance: 0,
    paymentDates: ["", "", ""],
    remark: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    if (name === "supplyAmount" || name === "vat") {
      const supply = name === "supplyAmount" ? Number(value) : Number(updatedForm.supplyAmount);
      const vat = name === "vat" ? Number(value) : Number(updatedForm.vat);
      updatedForm.totalAmount = supply + vat;
    }

    setForm(updatedForm);
  };

  const handlePaymentDate = (idx, value) => {
    const updated = [...form.paymentDates];
    updated[idx] = value;
    setForm({ ...form, paymentDates: updated });
  };

  return (
    <div style={{
      maxWidth: 480, margin: "24px auto", padding: 24, borderRadius: 18, boxShadow: "0 4px 12px #eee", background: "#fff"
    }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18 }}>프로젝트 기본 정보 입력</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <input name="contractNo" placeholder="계약관리번호" value={form.contractNo} onChange={handleChange} />
        <input name="orderNo" placeholder="시공팀발주번호" value={form.orderNo} onChange={handleChange} />
        <input name="site" placeholder="현장" value={form.site} onChange={handleChange} />
        <input name="customer" placeholder="고객명" value={form.customer} onChange={handleChange} />
        <input type="date" name="completeDate" value={form.completeDate} onChange={handleChange} />
        <input name="specialNote" placeholder="현장 특이사항" value={form.specialNote} onChange={handleChange} />
        <input type="number" name="supplyAmount" placeholder="공급가액" value={form.supplyAmount} onChange={handleChange} />
        <input type="number" name="vat" placeholder="부가세" value={form.vat} onChange={handleChange} />
        <input type="number" name="totalAmount" placeholder="총금액(자동계산)" value={form.totalAmount} readOnly style={{ background: "#f4f4f4" }} />
        <select name="depositStatus" value={form.depositStatus} onChange={handleChange}>
          <option value="">입금여부</option>
          <option value="입금완료">입금완료</option>
          <option value="미입금">미입금</option>
        </select>
        <input type="number" name="equipmentCost" placeholder="장비대" value={form.equipmentCost} onChange={handleChange} />
        <input type="number" name="deduction" placeholder="공제금액" value={form.deduction} onChange={handleChange} />
        <input type="number" name="insurance" placeholder="보험료" value={form.insurance} onChange={handleChange} />
      </div>
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[0, 1, 2].map((idx) => (
          <input key={idx} type="date" placeholder={`${idx + 1}차 지급일`} value={form.paymentDates[idx]} onChange={e => handlePaymentDate(idx, e.target.value)} />
        ))}
      </div>
      <textarea name="remark" placeholder="비고" value={form.remark} onChange={handleChange} style={{ width: "100%", marginTop: 16 }} />
      <button style={{ marginTop: 18, width: "100%", padding: "10px 0", fontWeight: 700, background: "#2d6cf6", color: "#fff", borderRadius: 8, border: 0 }}>저장</button>
    </div>
  );
}
