/* =====================================
   ChemReport
   Chemical Management
===================================== */


/* ---------- CHEMICAL DATABASE ---------- */

let chemicals = [

{
name:"Ethanol",
thaiName:"เอทานอล",
cas:"64-17-5",
risk:"ปานกลาง",
sds:true
},

{
name:"Acetone",
thaiName:"อะซีโตน",
cas:"67-64-1",
risk:"สูง",
sds:true
},

{
name:"Hydrochloric Acid",
thaiName:"กรดไฮโดรคลอริก",
cas:"7647-01-0",
risk:"สูง",
sds:false
},

{
name:"Sodium Chloride",
thaiName:"โซเดียมคลอไรด์",
cas:"7647-14-5",
risk:"ต่ำ",
sds:true
}

];


/* ---------- START ---------- */

document.addEventListener("DOMContentLoaded",function(){

renderChemicals();

setupSearch();

});


/* ---------- RENDER TABLE ---------- */

function renderChemicals(){

const tableBody =
document.getElementById("chemicalTableBody");

if(!tableBody)return;

tableBody.innerHTML="";


if(chemicals.length===0){

tableBody.innerHTML=`

<tr>

<td colspan="6" class="empty">

🧪 ยังไม่มีข้อมูลสารเคมี

</td>

</tr>

`;

return;

}


chemicals.forEach(function(chemical,index){

const row=document.createElement("tr");


let riskClass="risk-low";

if(chemical.risk==="ปานกลาง"){
riskClass="risk-medium";
}

if(
chemical.risk==="สูง" ||
chemical.risk==="สูงมาก"
){
riskClass="risk-high";
}


const sdsHTML=chemical.sds
?`<span class="sds">✓ มี SDS</span>`
:`<span class="sds-pending">⚠ รอตรวจสอบ</span>`;


row.innerHTML=`

<td>
<strong>${escapeHTML(chemical.name)}</strong>
</td>

<td>
${escapeHTML(chemical.thaiName)}
</td>

<td>
${escapeHTML(chemical.cas)}
</td>

<td>

<span class="risk ${riskClass}">
${escapeHTML(chemical.risk)}
</span>

</td>

<td>
${sdsHTML}
</td>

<td>

<button
class="action-btn view-btn"
onclick="viewChemical(${index})"
>
ดู
</button>

<button
class="action-btn edit-btn"
onclick="editChemical(${index})"
>
แก้ไข
</button>

<button
class="action-btn delete-btn"
onclick="deleteChemical(${index})"
>
ลบ
</button>

</td>

`;


tableBody.appendChild(row);

});


updateStatistics();

}


/* ---------- ADD ---------- */

function openChemicalModal(){

const old=document.getElementById("chemicalModal");

if(old)old.remove();


const modal=document.createElement("div");

modal.id="chemicalModal";

modal.style.cssText=`

position:fixed;
inset:0;
background:rgba(15,23,42,.55);
display:flex;
align-items:center;
justify-content:center;
padding:20px;
z-index:99999;

`;


modal.innerHTML=`

<div style="
background:white;
width:100%;
max-width:520px;
padding:28px;
border-radius:18px;
box-shadow:0 20px 60px rgba(0,0,0,.25);
">

<h2 style="margin-top:0;color:#0f4c81;">
➕ เพิ่มสารเคมี
</h2>

<p style="color:#64748b;font-size:13px;">
กรอกข้อมูลสารเคมีเพื่อเพิ่มเข้าสู่ระบบ
</p>


<label>ชื่อสารเคมี *</label>

<input
id="chemicalName"
placeholder="เช่น Ethanol"
style="
width:100%;
padding:12px;
margin:7px 0 15px;
border:1px solid #cbd5e1;
border-radius:8px;
"
>


<label>ชื่อภาษาไทย</label>

<input
id="chemicalThaiName"
placeholder="เช่น เอทานอล"
style="
width:100%;
padding:12px;
margin:7px 0 15px;
border:1px solid #cbd5e1;
border-radius:8px;
"
>


<label>CAS Number *</label>

<input
id="chemicalCAS"
placeholder="เช่น 64-17-5"
style="
width:100%;
padding:12px;
margin:7px 0 15px;
border:1px solid #cbd5e1;
border-radius:8px;
"
>


<label>ระดับความเสี่ยง</label>

<select
id="chemicalRisk"
style="
width:100%;
padding:12px;
margin:7px 0 20px;
border:1px solid #cbd5e1;
border-radius:8px;
"
>

<option>ต่ำ</option>
<option>ปานกลาง</option>
<option>สูง</option>
<option>สูงมาก</option>

</select>


<div style="
display:flex;
justify-content:flex-end;
gap:10px;
">

<button
onclick="closeChemicalModal()"
style="
padding:11px 18px;
border:1px solid #cbd5e1;
background:white;
border-radius:8px;
"
>
ยกเลิก
</button>


<button
onclick="saveChemical()"
style="
padding:11px 20px;
border:none;
background:#0f4c81;
color:white;
border-radius:8px;
"
>
✓ บันทึก
</button>

</div>

</div>

`;


document.body.appendChild(modal);

}


/* ---------- SAVE ---------- */

function saveChemical(){

const name=
document.getElementById("chemicalName").value.trim();

const thaiName=
document.getElementById("chemicalThaiName").value.trim();

const cas=
document.getElementById("chemicalCAS").value.trim();

const risk=
document.getElementById("chemicalRisk").value;


if(!name){

alert("กรุณากรอกชื่อสารเคมี");

return;

}


if(!cas){

alert("กรุณากรอก CAS Number");

return;

}


const duplicate=chemicals.some(function(item){

return item.cas.toLowerCase()===cas.toLowerCase();

});


if(duplicate){

alert("CAS Number นี้มีอยู่ในระบบแล้ว");

return;

}


chemicals.push({

name:name,

thaiName:thaiName||"-",

cas:cas,

risk:risk,

sds:false

});


closeChemicalModal();

renderChemicals();

showNotification(
"✓ เพิ่มสารเคมีเรียบร้อยแล้ว"
);

}


/* ---------- CLOSE ---------- */

function closeChemicalModal(){

const modal=
document.getElementById("chemicalModal");

if(modal){

modal.remove();

}

}


/* ---------- VIEW ---------- */

function viewChemical(index){

const chemical=chemicals[index];

alert(

"ข้อมูลสารเคมี\n\n"+

"ชื่อสารเคมี: "+chemical.name+"\n"+

"ชื่อภาษาไทย: "+chemical.thaiName+"\n"+

"CAS Number: "+chemical.cas+"\n"+

"ระดับความเสี่ยง: "+chemical.risk+"\n"+

"SDS: "+(chemical.sds?"มี SDS":"รอตรวจสอบ")

);

}


/* ---------- EDIT ---------- */

function editChemical(index){

const chemical=chemicals[index];


const modal=document.createElement("div");

modal.id="editChemicalModal";


modal.style.cssText=`

position:fixed;
inset:0;
background:rgba(15,23,42,.55);
display:flex;
align-items:center;
justify-content:center;
z-index:99999;
padding:20px;

`;


modal.innerHTML=`

<div style="
background:white;
width:100%;
max-width:520px;
padding:28px;
border-radius:18px;
">

<h2 style="margin-top:0;color:#0f4c81;">
✏️ แก้ไขข้อมูลสารเคมี
</h2>


<label>ชื่อสารเคมี</label>

<input
id="editName"
value="${escapeHTML(chemical.name)}"
style="
width:100%;
padding:12px;
margin:7px 0 15px;
border:1px solid #cbd5e1;
border-radius:8px;
"
>


<label>ชื่อภาษาไทย</label>

<input
id="editThaiName"
value="${escapeHTML(chemical.thaiName)}"
style="
width:100%;
padding:12px;
margin:7px 0 15px;
border:1px solid #cbd5e1;
border-radius:8px;
"
>


<label>CAS Number</label>

<input
id="editCAS"
value="${escapeHTML(chemical.cas)}"
style="
width:100%;
padding:12px;
margin:7px 0 15px;
border:1px solid #cbd5e1;
border-radius:8px;
"
>


<label>ระดับความเสี่ยง</label>

<select
id="editRisk"
style="
width:100%;
padding:12px;
margin:7px 0 20px;
border:1px solid #cbd5e1;
border-radius:8px;
"
>

<option ${chemical.risk==="ต่ำ"?"selected":""}>ต่ำ</option>

<option ${chemical.risk==="ปานกลาง"?"selected":""}>ปานกลาง</option>

<option ${chemical.risk==="สูง"?"selected":""}>สูง</option>

<option ${chemical.risk==="สูงมาก"?"selected":""}>สูงมาก</option>

</select>


<div style="
display:flex;
justify-content:flex-end;
gap:10px;
">

<button
onclick="document.getElementById('editChemicalModal').remove()"
style="
padding:11px 18px;
background:white;
border:1px solid #cbd5e1;
border-radius:8px;
"
>
ยกเลิก
</button>


<button
onclick="updateChemical(${index})"
style="
padding:11px 20px;
background:#0f4c81;
color:white;
border:none;
border-radius:8px;
"
>
บันทึก
</button>

</div>

</div>

`;


document.body.appendChild(modal);

}


/* ---------- UPDATE ---------- */

function updateChemical(index){

const name=
document.getElementById("editName").value.trim();

const thaiName=
document.getElementById("editThaiName").value.trim();

const cas=
document.getElementById("editCAS").value.trim();

const risk=
document.getElementById("editRisk").value;


if(!name||!cas){

alert("กรุณากรอกข้อมูลที่จำเป็น");

return;

}


chemicals[index].name=name;

chemicals[index].thaiName=thaiName||"-";

chemicals[index].cas=cas;

chemicals[index].risk=risk;


document
.getElementById("editChemicalModal")
.remove();


renderChemicals();


showNotification(
"✓ แก้ไขข้อมูลเรียบร้อยแล้ว"
);

}


/* ---------- DELETE ---------- */

function deleteChemical(index){

const chemical=chemicals[index];


const confirmDelete=
confirm(
"ต้องการลบสารเคมี\n\n"+
chemical.name+
"\nCAS: "+
chemical.cas+
"\n\nใช่หรือไม่?"
);


if(!confirmDelete){

return;

}


chemicals.splice(index,1);


renderChemicals();


showNotification(
"🗑️ ลบข้อมูลเรียบร้อยแล้ว"
);

}


/* ---------- SEARCH ---------- */

function setupSearch(){

const search=
document.getElementById("chemicalSearch");

if(!search)return;


search.addEventListener("input",function(){

const keyword=
search.value.toLowerCase().trim();


const rows=
document.querySelectorAll(
"#chemicalTableBody tr"
);


rows.forEach(function(row){

const text=
row.textContent.toLowerCase();


row.style.display=
text.includes(keyword)
?""
:"none";

});

});

}


/* ---------- STATISTICS ---------- */

function updateStatistics(){

const total=
document.getElementById("totalChemicals");

if(total){

total.textContent=
128 + chemicals.length - 4;

}


const sds=
document.getElementById("totalSDS");

if(sds){

sds.textContent=
96 + chemicals.filter(c=>c.sds).length - 3;

}


const high=
document.getElementById("highRisk");

if(high){

high.textContent=
12 +
chemicals.filter(
c=>c.risk==="สูง"||c.risk==="สูงมาก"
).length - 2;

}


const pending=
document.getElementById("pendingSDS");

if(pending){

pending.textContent=
18 +
chemicals.filter(c=>!c.sds).length - 1;

}

}


/* ---------- DASHBOARD ---------- */

function showDashboard(){

document.getElementById("pageTitle").textContent=
"🏠 Dashboard";

showNotification(
"🏠 Dashboard"
);

}


/* ---------- CHEMICAL PAGE ---------- */

function showChemicalPage(){

document.getElementById("pageTitle").textContent=
"🧪 ข้อมูลสารเคมี";

showNotification(
"🧪 ข้อมูลสารเคมี"
);

}


/* ---------- NOTIFICATION ---------- */

function showNotification(message){

const old=
document.getElementById("chemNotification");

if(old)old.remove();


const notification=
document.createElement("div");


notification.id=
"chemNotification";


notification.textContent=
message;


notification.style.cssText=`

position:fixed;
right:22px;
bottom:22px;
background:#0f4c81;
color:white;
padding:14px 20px;
border-radius:10px;
box-shadow:0 8px 30px rgba(0,0,0,.2);
z-index:100000;
font-size:14px;

`;


document.body.appendChild(notification);


setTimeout(function(){

if(notification){
notification.remove();
}

},3000);

}


/* ---------- SECURITY ---------- */

function escapeHTML(value){

return String(value)

.replace(/&/g,"&amp;")

.replace(/</g,"&lt;")

.replace(/>/g,"&gt;")

.replace(/"/g,"&quot;")

.replace(/'/g,"&#039;");

}
