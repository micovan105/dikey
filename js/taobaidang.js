import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {set,ref,getDatabase, get,push} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js"
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
document.getElementById("dangbai").addEventListener("mouseover", function(){
    document.getElementById("dangbai").innerText="I'm Gays 🏳️‍🌈"
})
document.getElementById("dangbai").addEventListener("mouseleave", function(){
    document.getElementById("dangbai").innerText="Đăng bài viết"
})

document.getElementById("upbtn").addEventListener("click", function(){
    document.getElementById("anhbtn").click();
})

document.getElementById("dangbai").addEventListener("click", async function(){
     
    let fileanh = null;
    
    fileanh = document.getElementById("anhbtn").files[0];
    //sử lý up khi ko ảnh
    if(!fileanh){
    const noidung = document.getElementById("noidungbai").value;
        const video = document.getElementsByClassName("ref")[0].value;
        if(localStorage.getItem("dangnhap")==="true"){

            if(noidung.length>0 ){
                await push(ref(db, `baidangcuatoi`),{
                    iduser:localStorage.getItem("iduser"),
                    noidung:noidung,
                    image:"",
                    video:video,
                    time:Date.now(),
                })
                alert("Đăng bài thành công! và cảm ơn đã cho tôi biết bạn bị gay :)")
                setTimeout(()=>{
                    window.location.href=`user.html?id=${localStorage.getItem("iduser")}&muc=1`
                },2000)
            }else{
                alert("Hãy nhập nội dung trước khi đăng.")
            }
        }else{
            alert("Bạn cần đăng nhập để thực hiện thao tác này.")
        }
    }else{

    //sử lý up nếu có ảnh
    const box = new FormData();
    box.append("image", fileanh);
    const imageref = await fetch("https://api.imgbb.com/1/upload?key=6013a04256e0c8dcdc6bcae78748f8f4", {method:"POST", body: box});
    const thongtin = await imageref.json();
    if(thongtin.success){
        const image = thongtin.data.url;
        const noidung = document.getElementById("noidungbai").value;
        const video = document.getElementsByClassName("ref")[0].value;
        if(localStorage.getItem("dangnhap")==="true"){

            if(noidung.length>0 ){
                await push(ref(db, `baidangcuatoi`),{
                    iduser:localStorage.getItem("iduser"),
                    sobinhluan:0,
                    noidung:noidung,
                    image:image,
                    video:video,
                    time:Date.now(),
                })
                alert("Đăng bài thành công! và cảm ơn đã cho tôi biết bạn bị gay :)")
                setTimeout(()=>{
                    window.location.href=`user.html?id=${localStorage.getItem("iduser")}`
                },2000)
            }else{
                alert("Hãy nhập nội dung trước khi đăng.")
            }
        }else{
            alert("Bạn cần đăng nhập để thực hiện thao tác này.")
        }
    }else{
        alert("Đã xảy ra lỗi: (2122), hãy chia sẻ mã lỗi này cho quản trị viên!")
    }
}
})