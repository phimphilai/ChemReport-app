// ======================================================
// ChemReport - Chemical Management + SDS Management
// ======================================================

let chemicals = [
  {
    id: 1,
    name: "Ethanol",
    cas: "64-17-5",
    category: "สารไวไฟ",
    hazard: "Flammable",
    storage: "ตู้เก็บสารไวไฟ",
    sds: "Ethanol_SDS.pdf"
  },
  {
    id: 2,
    name: "Methanol",
    cas: "67-56-1",
    category: "สารไวไฟ",
    hazard: "Toxic / Flammable",
    storage: "ตู้เก็บสารไวไฟ",
    sds: "Methanol_SDS.pdf"
  },
  {
    id: 3,
    name: "Hydrochloric Acid",
    cas: "7647-01-0",
    category: "สารกัดกร่อน",
    hazard: "Corrosive",
    storage: "ตู้สารกัดกร่อน",
    sds: "HCl_SDS.pdf"
  },
  {
    id: 4,
    name: "Sodium Hydroxide",
    cas: "1310-73-2",
    category: "สารกัดกร่อน",
    hazard: "Corrosive",
    storage: "ตู้สารกัดกร่อน",
    sds: "NaOH_SDS.pdf"
  }
];

let sdsDocuments = [
  {
    id: 1,
    chemical: "Ethanol",
    cas: "64-17-5",
    file: "Ethanol_SDS.pdf",
    status: "สมบูรณ์",
    date: "12/09/2569"
  },
  {
    id: 2,
    chemical: "Methanol",
    cas: "67-56-1",
    file: "Methanol_SDS.pdf",
    status: "รอตรวจสอบ",
    date: "12/09/2569"
  },
  {
    id: 3,
    chemical: "Hydrochloric Acid",
    cas: "7647-01-0",
    file: "HCl_SDS.pdf",
    status: "สมบูรณ์",
    date: "12/09/2569"
  }
];

document.addEventListener("DOMContentLoaded", function () {
  renderChemicals();
  updateStatistics();
});

// ======================================================
// CHEMICAL MANAGEMENT
// ======================================================

function renderChemicals(keyword = "") {
  const table = document.querySelector("#chemicalTableBody");

  if (!table) return;

  const search = keyword.toLowerCase().trim();

  const filtered = chemicals.filter(c =>
    c.name.toLowerCase().includes(search) ||
    c.cas.toLowerCase().includes(search) ||
    c.category.toLowerCase().includes(search) ||
    c.hazard.toLowerCase().includes(search)
  );

  table.innerHTML = "";

  if (filtered.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center;padding:30px;color:#777;">
          ไม่พบข้อมูลสารเคมี
        </td>
      </tr>
    `;
    return;
  }

  filtered.forEach(c => {
    table.innerHTML += `
      <tr>
        <td>${escapeHTML(c.name)}</td>
        <td>${escapeHTML(c.cas)}</td>
        <td>${escapeHTML(c.category)}</td>
        <td>${escapeHTML(c.hazard)}</td>
        <td>${escapeHTML(c.storage)}</td>
        <td>
          ${
            c.sds
              ? `<span style="color:#16a34a;">✓ มี SDS</span>`
              : `<span style="color:#dc2626;">✕ ไม่มี SDS</span>`
          }
        </td>
        <td>
          <button onclick="viewChemical(${c.id})">ดู</button>
          <button onclick="editChemical(${c.id})">แก้ไข</button>
          <button onclick="deleteChemical(${c.id})">ลบ</button>
        </td>
      </tr>
    `;
  });
}

function searchChemicals() {
  const input =
    document.querySelector("#chemicalSearch") ||
    document.querySelector('input[placeholder*="ค้นหา"]');

  renderChemicals(input ? input.value : "");
}

function openChemicalModal() {
  const old = document.getElementById("chemicalModal");

  if (old) old.remove();

  const modal = document.createElement("div");

  modal.id = "chemicalModal";

  modal.innerHTML = `
    <div style="
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.45);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:9999;
    ">

      <div style="
        background:white;
        width:min(600px,92%);
        max-height:90vh;
        overflow:auto;
        border-radius:18px;
        padding:25px;
        box-shadow:0 20px 50px rgba(0,0,0,.2);
      ">

        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:20px;
        ">

          <h2 style="margin:0;color:#123B70;">
            ➕ เพิ่มสารเคมี
          </h2>

          <button
            onclick="closeChemicalModal()"
            style="
              border:none;
              background:#f1f5f9;
              width:35px;
              height:35px;
              border-radius:50%;
              font-size:20px;
            "
          >
            ×
          </button>

        </div>

        <div style="display:grid;gap:14px;">

          <input id="newChemicalName"
            placeholder="ชื่อสารเคมี"
            class="form-input">

          <input id="newChemicalCAS"
            placeholder="CAS Number"
            class="form-input">

          <input id="newChemicalCategory"
            placeholder="ประเภทสารเคมี"
            class="form-input">

          <input id="newChemicalHazard"
            placeholder="อันตราย / Hazard"
            class="form-input">

          <input id="newChemicalStorage"
            placeholder="สถานที่จัดเก็บ"
            class="form-input">

          <input id="newChemicalSDS"
            placeholder="ชื่อไฟล์ SDS เช่น Ethanol_SDS.pdf"
            class="form-input">

        </div>

        <div style="
          display:flex;
          gap:10px;
          justify-content:flex-end;
          margin-top:22px;
        ">

          <button
            onclick="closeChemicalModal()"
            style="
              padding:11px 18px;
              border:1px solid #ddd;
              background:white;
              border-radius:9px;
            "
          >
            ยกเลิก
          </button>

          <button
            onclick="saveChemical()"
            style="
              padding:11px 20px;
              border:none;
              background:#1769aa;
              color:white;
              border-radius:9px;
              font-weight:600;
            "
          >
            บันทึกข้อมูล
          </button>

        </div>

      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

function closeChemicalModal() {
  const modal = document.getElementById("chemicalModal");

  if (modal) modal.remove();
}

function saveChemical() {
  const name = document.getElementById("newChemicalName").value.trim();
  const cas = document.getElementById("newChemicalCAS").value.trim();
  const category = document.getElementById("newChemicalCategory").value.trim();
  const hazard = document.getElementById("newChemicalHazard").value.trim();
  const storage = document.getElementById("newChemicalStorage").value.trim();
  const sds = document.getElementById("newChemicalSDS").value.trim();

  if (!name || !cas) {
    alert("กรุณากรอกชื่อสารเคมีและ CAS Number");
    return;
  }

  const duplicate = chemicals.some(
    c => c.cas.toLowerCase() === cas.toLowerCase()
  );

  if (duplicate) {
    alert("พบสารเคมีที่มี CAS Number นี้อยู่แล้ว");
    return;
  }

  chemicals.push({
    id: Date.now(),
    name,
    cas,
    category: category || "ไม่ระบุ",
    hazard: hazard || "ไม่ระบุ",
    storage: storage || "ไม่ระบุ",
    sds: sds || ""
  });

  closeChemicalModal();

  renderChemicals();
  updateStatistics();

  alert("เพิ่มสารเคมีเรียบร้อยแล้ว");
}

function viewChemical(id) {
  const c = chemicals.find(x => x.id === id);

  if (!c) return;

  alert(
    `ชื่อสารเคมี: ${c.name}\n` +
    `CAS Number: ${c.cas}\n` +
    `ประเภท: ${c.category}\n` +
    `อันตราย: ${c.hazard}\n` +
    `สถานที่จัดเก็บ: ${c.storage}\n` +
    `SDS: ${c.sds || "ไม่มีข้อมูล"}`
  );
}

function editChemical(id) {
  const c = chemicals.find(x => x.id === id);

  if (!c) return;

  openChemicalModal();

  setTimeout(() => {
    document.getElementById("newChemicalName").value = c.name;
    document.getElementById("newChemicalCAS").value = c.cas;
    document.getElementById("newChemicalCategory").value = c.category;
    document.getElementById("newChemicalHazard").value = c.hazard;
    document.getElementById("newChemicalStorage").value = c.storage;
    document.getElementById("newChemicalSDS").value = c.sds;

    const saveButton =
      document.querySelector("#chemicalModal button[onclick='saveChemical()']");

    if (saveButton) {
      saveButton.innerText = "บันทึกการแก้ไข";

      saveButton.onclick = function () {
        c.name = document.getElementById("newChemicalName").value.trim();
        c.cas = document.getElementById("newChemicalCAS").value.trim();
        c.category = document.getElementById("newChemicalCategory").value.trim();
        c.hazard = document.getElementById("newChemicalHazard").value.trim();
        c.storage = document.getElementById("newChemicalStorage").value.trim();
        c.sds = document.getElementById("newChemicalSDS").value.trim();

        closeChemicalModal();
        renderChemicals();
        updateStatistics();

        alert("แก้ไขข้อมูลเรียบร้อยแล้ว");
      };
    }
  }, 50);
}

function deleteChemical(id) {
  const c = chemicals.find(x => x.id === id);

  if (!c) return;

  if (!confirm(`ต้องการลบ "${c.name}" หรือไม่?`)) {
    return;
  }

  chemicals = chemicals.filter(x => x.id !== id);

  renderChemicals();
  updateStatistics();

  alert("ลบข้อมูลเรียบร้อยแล้ว");
}

function updateStatistics() {
  const total = chemicals.length;

  const withSDS = chemicals.filter(c => c.sds).length;

  const highRisk = chemicals.filter(c =>
    /toxic|flammable|corrosive|พิษ|ไวไฟ|กัดกร่อน/i.test(c.hazard)
  ).length;

  const missingSDS = chemicals.filter(c => !c.sds).length;

  const numbers = document.querySelectorAll(
    ".stat-card .number, .stat-value"
  );

  if (numbers.length >= 4) {
    numbers[0].innerText = total;
    numbers[1].innerText = withSDS;
    numbers[2].innerText = highRisk;
    numbers[3].innerText = missingSDS;
  }
}

// ======================================================
// SDS MANAGEMENT
// ======================================================

function showSDSPage() {
  const main =
    document.querySelector(".main-content") ||
    document.querySelector("main") ||
    document.querySelector("#mainContent") ||
    document.body;

  main.innerHTML = `
    <div style="padding:28px;">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:15px;
        flex-wrap:wrap;
        margin-bottom:25px;
      ">

        <div>
          <h1 style="margin:0;color:#123B70;">
            📄 จัดการ SDS
          </h1>

          <p style="color:#64748b;margin-top:6px;">
            จัดเก็บ ค้นหา ตรวจสอบ และวิเคราะห์เอกสารข้อมูลความปลอดภัย
          </p>
        </div>

        <button
          onclick="openSDSUpload()"
          style="
            background:#1769aa;
            color:white;
            border:none;
            padding:12px 20px;
            border-radius:10px;
            font-weight:600;
          "
        >
          📤 นำเข้า SDS
        </button>

      </div>

      <div style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
        gap:15px;
        margin-bottom:25px;
      ">

        <div class="sds-stat">
          <b>${sdsDocuments.length}</b>
          <span>เอกสาร SDS ทั้งหมด</span>
        </div>

        <div class="sds-stat">
          <b>${sdsDocuments.filter(x => x.status === "สมบูรณ์").length}</b>
          <span>ข้อมูลสมบูรณ์</span>
        </div>

        <div class="sds-stat">
          <b>${sdsDocuments.filter(x => x.status !== "สมบูรณ์").length}</b>
          <span>รอตรวจสอบ</span>
        </div>

      </div>

      <div style="margin-bottom:18px;">

        <input
          id="sdsSearch"
          oninput="renderSDS(this.value)"
          placeholder="🔍 ค้นหาชื่อสารเคมี, CAS หรือชื่อไฟล์ SDS"
          style="
            width:100%;
            max-width:600px;
            padding:13px 16px;
            border:1px solid #dbe3ec;
            border-radius:10px;
            font-size:15px;
            box-sizing:border-box;
          "
        >

      </div>

      <div id="sdsContent"></div>

    </div>

    <style>
      .sds-stat{
        background:white;
        border:1px solid #e5e7eb;
        border-radius:14px;
        padding:20px;
        box-shadow:0 4px 15px rgba(0,0,0,.04);
      }

      .sds-stat b{
        display:block;
        font-size:28px;
        color:#1769aa;
        margin-bottom:5px;
      }

      .sds-stat span{
        color:#64748b;
      }

      .sds-table{
        width:100%;
        border-collapse:collapse;
        background:white;
        border-radius:14px;
        overflow:hidden;
      }

      .sds-table th,
      .sds-table td{
        padding:14px;
        border-bottom:1px solid #eef2f7;
        text-align:left;
      }

      .sds-table th{
        background:#f5f8fc;
        color:#334155;
      }

      .sds-button{
        border:none;
        padding:7px 11px;
        border-radius:7px;
        cursor:pointer;
        margin-right:4px;
      }
    </style>
  `;

  renderSDS();
}

function renderSDS(keyword = "") {
  const container = document.getElementById("sdsContent");

  if (!container) return;

  const search = keyword.toLowerCase().trim();

  const filtered = sdsDocuments.filter(s =>
    s.chemical.toLowerCase().includes(search) ||
    s.cas.toLowerCase().includes(search) ||
    s.file.toLowerCase().includes(search)
  );

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="
        background:white;
        padding:40px;
        border-radius:14px;
        text-align:center;
        color:#64748b;
      ">
        ไม่พบเอกสาร SDS
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="overflow-x:auto;">

      <table class="sds-table">

        <thead>
          <tr>
            <th>สารเคมี</th>
            <th>CAS Number</th>
            <th>เอกสาร SDS</th>
            <th>สถานะ</th>
            <th>วันที่นำเข้า</th>
            <th>การจัดการ</th>
          </tr>
        </thead>

        <tbody>

          ${filtered.map(s => `
            <tr>

              <td><b>${escapeHTML(s.chemical)}</b></td>

              <td>${escapeHTML(s.cas)}</td>

              <td>📄 ${escapeHTML(s.file)}</td>

              <td>
                ${
                  s.status === "สมบูรณ์"
                    ? `<span style="color:#16a34a;font-weight:600;">✓ สมบูรณ์</span>`
                    : `<span style="color:#d97706;font-weight:600;">⚠ รอตรวจสอบ</span>`
                }
              </td>

              <td>${escapeHTML(s.date)}</td>

              <td>

                <button
                  class="sds-button"
                  style="background:#e0f2fe;color:#0369a1;"
                  onclick="analyzeSDS(${s.id})"
                >
                  🤖 AI วิเคราะห์
                </button>

                <button
                  class="sds-button"
                  style="background:#f1f5f9;"
                  onclick="viewSDS(${s.id})"
                >
                  👁 ดู
                </button>

              </td>

            </tr>
          `).join("")}

        </tbody>

      </table>

    </div>
  `;
}

function openSDSUpload() {
  const old = document.getElementById("sdsUploadModal");

  if (old) old.remove();

  const modal = document.createElement("div");

  modal.id = "sdsUploadModal";

  modal.innerHTML = `
    <div style="
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.45);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:9999;
    ">

      <div style="
        background:white;
        width:min(520px,92%);
        padding:25px;
        border-radius:18px;
      ">

        <h2 style="color:#123B70;">
          📤 นำเข้าเอกสาร SDS
        </h2>

        <p style="color:#64748b;">
          เลือกไฟล์ SDS เพื่อเพิ่มเข้าสู่ระบบ
        </p>

        <input
          id="sdsFile"
          type="file"
          accept=".pdf,.doc,.docx"
          style="width:100%;margin:15px 0;"
        >

        <div style="
          display:flex;
          justify-content:flex-end;
          gap:10px;
        ">

          <button
            onclick="closeSDSModal()"
            style="
              padding:10px 16px;
              border:1px solid #ddd;
              background:white;
              border-radius:8px;
            "
          >
            ยกเลิก
          </button>

          <button
            onclick="importSDS()"
            style="
              padding:10px 18px;
              background:#1769aa;
              color:white;
              border:none;
              border-radius:8px;
            "
          >
            นำเข้า
          </button>

        </div>

      </div>

    </div>
  `;

  document.body.appendChild(modal);
}

function closeSDSModal() {
  const modal = document.getElementById("sdsUploadModal");

  if (modal) modal.remove();
}

function importSDS() {
  const input = document.getElementById("sdsFile");

  if (!input || !input.files.length) {
    alert("กรุณาเลือกไฟล์ SDS");
    return;
  }

  const file = input.files[0];

  sdsDocuments.push({
    id: Date.now(),
    chemical: file.name.replace(/\.[^/.]+$/, ""),
    cas: "-",
    file: file.name,
    status: "รอตรวจสอบ",
    date: new Date().toLocaleDateString("th-TH")
  });

  closeSDSModal();

  renderSDS();

  alert("นำเข้าเอกสาร SDS เรียบร้อยแล้ว");
}

function analyzeSDS(id) {
  const sds = sdsDocuments.find(x => x.id === id);

  if (!sds) return;

  const old = document.getElementById("aiSDSModal");

  if (old) old.remove();

  const modal = document.createElement("div");

  modal.id = "aiSDSModal";

  modal.innerHTML = `
    <div style="
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.5);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:10000;
    ">

      <div style="
        background:white;
        width:min(700px,94%);
        max-height:90vh;
        overflow:auto;
        border-radius:20px;
        padding:28px;
      ">

        <h2 style="color:#123B70;">
          🤖 AI วิเคราะห์ SDS
        </h2>

        <p>
          เอกสาร: <b>${escapeHTML(sds.file)}</b>
        </p>

        <div id="aiResult" style="
          background:#f8fafc;
          padding:20px;
          border-radius:12px;
          margin-top:20px;
        ">
          <div style="text-align:center;padding:25px;">
            🔄 กำลังวิเคราะห์ข้อมูล SDS...
          </div>
        </div>

        <div style="text-align:right;margin-top:20px;">

          <button
            onclick="closeAIModal()"
            style="
              padding:10px 20px;
              border:none;
              background:#1769aa;
              color:white;
              border-radius:8px;
            "
          >
            ปิด
          </button>

        </div>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {

    const result = document.getElementById("aiResult");

    if (!result) return;

    result.innerHTML = `
      <h3 style="margin-top:0;color:#1769aa;">
        ผลการวิเคราะห์เบื้องต้น
      </h3>

      <div style="display:grid;gap:10px;">

        <div>
          <b>ชื่อสารเคมี:</b>
          ${escapeHTML(sds.chemical)}
        </div>

        <div>
          <b>CAS Number:</b>
          ${escapeHTML(sds.cas)}
        </div>

        <div>
          <b>เอกสาร:</b>
          ${escapeHTML(sds.file)}
        </div>

        <div>
          <b>สถานะ:</b>
          <span style="color:#d97706;">
            รอผู้ใช้งานตรวจสอบ
          </span>
        </div>

      </div>

      <div style="
        margin-top:18px;
        padding:14px;
        background:#fff7ed;
        border-radius:10px;
        color:#9a3412;
      ">
        ⚠ AI เป็นเครื่องมือช่วยวิเคราะห์
        ผู้ใช้งานควรตรวจสอบข้อมูลจากเอกสาร SDS ต้นฉบับก่อนนำไปใช้จริง
      </div>
    `;

  }, 1000);
}

function closeAIModal() {
  const modal = document.getElementById("aiSDSModal");

  if (modal) modal.remove();
}

function viewSDS(id) {
  const sds = sdsDocuments.find(x => x.id === id);

  if (!sds) return;

  alert(
    `เอกสาร SDS\n\n` +
    `สารเคมี: ${sds.chemical}\n` +
    `CAS Number: ${sds.cas}\n` +
    `ไฟล์: ${sds.file}\n` +
    `สถานะ: ${sds.status}\n` +
    `วันที่นำเข้า: ${sds.date}`
  );
}

// ======================================================
// NAVIGATION HELPERS
// ======================================================

function showDashboard() {
  location.reload();
}

function showChemicalPage() {
  location.reload();
}

function showNotification() {
  alert("ยังไม่มีการแจ้งเตือนใหม่");
}

// ======================================================
// SECURITY
// ======================================================

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
