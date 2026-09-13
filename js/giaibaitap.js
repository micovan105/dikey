import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {set,ref,getDatabase, get,update, onChildAdded, increment} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js"
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
const iduser = laythamso.get("iduser");
const idbai = laythamso.get("idbai");

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
    const debai = await get(ref(db, `baitap/${idbai}`));
    const nguoidang = await get(ref(db, `user/${iduser}`));
    const monhoc = dsquyhoa.find(a => a.value === debai.val().monhoc);
    const caphoc = dsquyhoa.find(b => b.value === debai.val().caphoc);
    document.getElementById("avatarnguoidang").src=nguoidang.val().avatar;
    document.getElementById("namenguoidang").innerText=nguoidang.val().name;
    document.getElementById("monhoc").innerText=monhoc.goc;
    document.getElementById("caphoc").innerText=caphoc.goc;
    if(debai.val().image !== "null"){
        document.getElementById("anhbai").src=debai.val().image;
    }
    
    document.getElementById("noidungde").innerText=debai.val().noidung;
}
laydulieu()
document.getElementsByClassName("nuticon")[0].addEventListener("click", function(){
    document.getElementById("bailam").value+="∆";
})
document.getElementsByClassName("nuticon")[1].addEventListener("click", function(){
    document.getElementById("bailam").value+="≈";
})
document.getElementsByClassName("nuticon")[2].addEventListener("click", function(){
    document.getElementById("bailam").value+="÷";
})
document.getElementsByClassName("nuticon")[3].addEventListener("click", function(){
    document.getElementById("bailam").value+="≤";
})
document.getElementsByClassName("nuticon")[4].addEventListener("click", function(){
    document.getElementById("bailam").value+="≥";
})
document.getElementsByClassName("nuticon")[5].addEventListener("click", function(){
    document.getElementById("bailam").value+="±";
})
document.getElementsByClassName("nuticon")[6].addEventListener("click", function(){
    document.getElementById("bailam").value+="π";
})
document.getElementsByClassName("nuticon")[7].addEventListener("click", function(){
    document.getElementById("bailam").value+="∑";
})
document.getElementsByClassName("nuticon")[8].addEventListener("click", function(){
    document.getElementById("bailam").value+="√";
})
document.getElementsByClassName("nuticon")[9].addEventListener("click", function(){
    document.getElementById("bailam").value+="∈";
})
document.getElementsByClassName("nuticon")[10].addEventListener("click", function(){
    document.getElementById("bailam").value+="∉";
})
document.getElementsByClassName("nuticon")[11].addEventListener("click", function(){
    document.getElementById("bailam").value+="∅";
})
document.getElementsByClassName("nuticon")[12].addEventListener("click", function(){
    document.getElementById("bailam").value+="⊂";
})
document.getElementsByClassName("nuticon")[13].addEventListener("click", function(){
    document.getElementById("bailam").value+="⊃";
})
document.getElementsByClassName("nuticon")[14].addEventListener("click", function(){
    document.getElementById("bailam").value+="⇔";
})
document.getElementsByClassName("nuticon")[15].addEventListener("click", function(){
    document.getElementById("bailam").value+="≠";
})
document.getElementsByClassName("nuticon")[16].addEventListener("click", function(){
    document.getElementById("bailam").value+="⇒";
})
document.getElementsByClassName("nuticon")[17].addEventListener("click", function(){
    document.getElementById("bailam").value+="°";
})
document.getElementsByClassName("nuticon")[18].addEventListener("click", function(){
    document.getElementById("bailam").value+="∞";
})
document.getElementsByClassName("nuticon")[19].addEventListener("click", function(){
    document.getElementById("bailam").value+="φ";
})
document.getElementsByClassName("nuticon")[20].addEventListener("click", function(){
    document.getElementById("bailam").value+="∪";
})
document.getElementsByClassName("nuticon")[21].addEventListener("click", function(){
    document.getElementById("bailam").value+="∩";
})
document.getElementsByClassName("nuticon")[22].addEventListener("click", function(){
    document.getElementById("bailam").value+="α";
})
document.getElementsByClassName("nuticon")[23].addEventListener("click", function(){
    document.getElementById("bailam").value+="∠";
})
document.getElementById("upanhbtn").addEventListener("click", function(){
    alert("Tôi chưa biết làm up ảnh oke :), nếu bạn biết thì có thể làm giúp tôi.")
})
document.getElementById("traloibtn").addEventListener("click", async function(){
    if(localStorage.getItem("dangnhap")==="true"){
        
        const noidung = document.getElementById("bailam").value;
        if(noidung.length>0){
            await update(ref(db, `baitap/${idbai}/cautraloi/${localStorage.getItem("iduser")}`),{
            sao:0,
            time:Date.now(),
            noidung:noidung,
            like:0,
            dislike:0,
            binhluan:"null",
        })
        await update(ref(db, `baitap/${idbai}`),{
            socautraloi:increment(1),
        })
        setTimeout(()=>{
            window.location.href=`chitietbaitap.html?iduser=${iduser}&idbai=${idbai}`
        },1000)
        }else{
            alert("Giải như không giải.")
        }
        
    }else{
        alert("Eo ơi xem kìa bây ơi, định làm anh hùng ẩn danh ấy hả, đăng nhập đi.")
    }

})

