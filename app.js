document.addEventListener("DOMContentLoaded", function () {

  const addButton = document.querySelector(".add-chemical");

  if (addButton) {
    addButton.addEventListener("click", function () {
      openChemicalModal();
    });
  }

});


function openChemicalModal() {

  const modal = document.createElement("div");

  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.background = "rgba(0,0,0,0.5)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "9999";

  modal.innerHTML = `
    <div style="
      background:white;
      width:90%;
      max-width:500px;
      padding:25px;
      border-radius:16px;
      box-shadow:0 10px 40px rgba(0,0,0,0.25);
    ">

      <h2 style="margin-top:0;color:#1769aa;">
        ➕ เพิ่มข้อมูลสารเคมี
      </h2>

      <label>ชื่อสารเคมี</label>
      <input id="chemicalName"
        type="text"
        placeholder="เช่น Ethanol"
        style="
          width:100%;
          padding:12px;
          margin:8px 0 15px;
          box-sizing:border-box;
        ">

      <label>ชื่อภาษาไทย</label>
      <input id="chemicalThaiName"
        type="text"
        placeholder="เช่น เอทานอล"
        style="
          width:100%;
          padding:12px;
          margin:8px 0 15px;
          box-sizing:border-box;
        ">

      <label>CAS Number</label>
      <input id="chemicalCAS"
        type="text"
        placeholder="เช่น 64-17-5"
        style="
          width:100%;
          padding:12px;
          margin:8px 0 15px;
          box-sizing:border-box;
        ">

      <label>ระดับความเสี่ยง</label>
      <select id="chemicalRisk"
        style="
          width:100%;
          padding:12px;
          margin:8px 0 20px;
          box-sizing:border-box;
        ">
        <option>ต่ำ</option>
        <option>ปานกลาง</option>
        <option>สูง</option>
        <option>สูงมาก</option>
      </select>

      <div style="
        display:flex;
        gap:10px;
        justify-content:flex-end;
      ">

        <button id="cancelChemical"
          style="
            padding:10px 18px;
            border:1px solid #ccc;
            background:white;
            border-radius:8px;
          ">
          ยกเลิก
        </button>

        <button id="saveChemical"
          style="
            padding:10px 18px;
            border:none;
            background:#1769aa;
            color:white;
            border-radius:8px;
          ">
          บันทึกข้อมูล
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(modal);


  document.getElementById("cancelChemical").onclick = function () {
    modal.remove();
  };


  document.getElementById("saveChemical").onclick = function () {

    const name =
      document.getElementById("chemicalName").value.trim();

    const thaiName =
      document.getElementById("chemicalThaiName").value.trim();

    const cas =
      document.getElementById("chemicalCAS").value.trim();

    const risk =
      document.getElementById("chemicalRisk").value;


    if (!name || !cas) {
      alert("กรุณากรอกชื่อสารเคมีและ CAS Number");
      return;
    }


    const table =
      document.querySelector("#chemicalTable tbody");

    if (table) {

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${name}</td>
        <td>${thaiName || "-"}</td>
        <td>${cas}</td>
        <td>${risk}</td>
        <td>
          <span style="
            background:#fff3cd;
            padding:5px 10px;
            border-radius:20px;
          ">
            รอตรวจสอบ SDS
          </span>
        </td>
      `;

      table.appendChild(row);
    }


    modal.remove();

    alert("เพิ่มข้อมูลสารเคมีเรียบร้อยแล้ว");
  };

}
