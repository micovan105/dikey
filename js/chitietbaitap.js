import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {set,ref,getDatabase, get, onValue} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js"
const firebaseConfig = {
    apiKey: "AIzaSyCPJP7jkwP4d8lCjRiAjZrrX4dhvM-zx8g",
    authDomain: "chat2-31505.firebaseapp.com",
    databaseURL: "https://chat2-31505-default-rtdb.firebaseio.com",
    projectId: "chat2-31505",
    storageBucket: "chat2-31505.firebasestorage.app",
    messagingSenderId: "56305550816",
    appId: "1:56305550816:web:06b8c94d79cbc3de6c9785",
    measurementId: "G-MWDFB9XSYL"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const laythamso = new URLSearchParams(window.location.search);
const iduser = laythamso.get("iduser")
const idbai = laythamso.get("idbai")
console.log(iduser)
console.log(idbai)
const dsquyhoa = [
    { value: "dai-hoc", goc: "Đại học" },
    { value: "cap-3", goc: "Cấp 3 (Trung học phổ thông)" },
    { value: "lop-12", goc: "Lớp 12" },
    { value: "lop-11", goc: "Lớp 11" },
    { value: "lop-10", goc: "Lớp 10" },
    { value: "cap-2", goc: "Cấp 2 (Trung học cơ sở)" },
    { value: "lop-9", goc: "Lớp 9" },
    { value: "lop-8", goc: "Lớp 8" },
    { value: "lop-7", goc: "Lớp 7" },
    { value: "lop-6", goc: "Lớp 6" },
    { value: "cap-1", goc: "Cấp 1 (Tiểu học)" },
    { value: "lop-5", goc: "Lớp 5" },
    { value: "lop-4", goc: "Lớp 4" },
    { value: "lop-3", goc: "Lớp 3" },
    { value: "lop-2", goc: "Lớp 2" },
    { value: "lop-1", goc: "Lớp 1" },
    { value: "khac", goc: "Trình độ khác" },

    { value: "am-nhac", goc: "Âm nhạc" },
    { value: "my-thuat", goc: "Mỹ thuật" },
    { value: "toan-hoc", goc: "Toán học" },
    { value: "vat-ly", goc: "Vật lý" },
    { value: "hoa-hoc", goc: "Hóa học" },
    { value: "ngu-van", goc: "Ngữ văn" },
    { value: "tieng-viet", goc: "Tiếng Việt" },
    { value: "tieng-anh", goc: "Tiếng Anh" },
    { value: "dao-duc", goc: "Đạo đức" },
    { value: "khoa-hoc", goc: "Khoa học" },
    { value: "lich-su", goc: "Lịch sử" },
    { value: "dia-ly", goc: "Địa lý" },
    { value: "sinh-hoc", goc: "Sinh học" },
    { value: "tin-hoc", goc: "Tin học" },
    { value: "lap-trinh", goc: "Lập trình" }
];
async function laydulieu(){
    const nguoidangbai = await get(ref(db, `user/${iduser}`));
    const baitap = await get(ref(db, `baitap/${idbai}`))
    document.getElementById("avataruser").src=nguoidangbai.val().avatar;
    document.getElementById("nameuser").innerText=nguoidangbai.val().name;
    const caphoc = dsquyhoa.find(a => a.value === baitap.val().caphoc)

    const monhoc = dsquyhoa.find(a => a.value === baitap.val().monhoc)
    document.getElementById("loaimon").innerText=monhoc.goc;
    document.getElementById("caphoc").innerText=caphoc.goc;
    document.getElementById("noidungbai").innerText=baitap.val().noidung;
    if(baitap.val().image !== "null"){
        document.getElementById("anhbai").src=baitap.val().image;
    }
    


    

}
laydulieu()
document.getElementById("userhtml").addEventListener("click", function(){
    window.location.href=`user.html?id=${iduser}`
    })


//lời giải
const loigiairef = ref(db, `baitap/${idbai}/cautraloi`)
    const laydulieuloigiai = onValue(loigiairef, async (loigiai)=>{
        document.getElementById("khungloigiai").innerHTML="";
        console.log(loigiai.key)
        const cacloigiai = [];
        loigiai.forEach((item)=>{
            cacloigiai.push(item)
        })
        for(const data of cacloigiai) {
        const nguoigiai = await get(ref(db, `user/${data.key}`))

            
        const divloigiai = document.createElement("div")
        divloigiai.style.width="700px";
        divloigiai.style.height="fit-content";
        divloigiai.style.backgroundColor="white";
        divloigiai.style.borderRadius="8px";
        divloigiai.style.paddingBottom="20px";
        divloigiai.innerHTML=`
        <div style="display:flex;">
        <img style="width:35px;border-radius:100%;margin:10px;" src="${nguoigiai.val().avatar}">
        <p>${nguoigiai.val().name}</p>
        </div>
        <hr>
        <div style="background-color:#DAE0E6;width:650px;margin-left:25px;border-radius:8px;padding-top:3px;padding-bottom:5px;">
        <p style="margin-left:20px;margin-right:20px;font-size:16px;">${data.val().noidung}</p>
        </div>
        `;
        document.getElementById("khungloigiai").appendChild(divloigiai);
        
    }})

    
