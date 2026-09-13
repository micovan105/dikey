import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {set,ref,getDatabase, get} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js"
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
if(localStorage.getItem("dangnhap")==="true"){
    async function laydulieu(){

    const datauser = await get(ref(db,`user/${localStorage.getItem("iduser")}`));


    document.getElementById("header").innerHTML=`
    <span style="padding-left:20px;">
    <img id="logodikey" style="width:100px;cursor:pointer;" src="images/logodikey.png">
    <div id="tkbtn" style="width:15%;height:75%;border-radius:20px 3px 3px 20px;position:absolute;right:110px;top:10px;display:flex;align-items:center;background-color:#e9e9e9;padding-left:5px;gap:8px;cursor:pointer;">
    <img style="width:35px;height:35px;border-radius:100%;" src="${datauser.val().avatar}">
    <p style="color:#666666;font-size:16px;">${datauser.val().name}</p>
    </div>
    <button id="linkdangbai" style="width:100px;height:40px;border-radius:20px;position:absolute;right:6px;top:11px;background-color:#CCFFFF;cursor:pointer;">+ Đăng bài</button>
    </span>
    `
    ;
    document.getElementById("logodikey").addEventListener("click", function(){
        window.location.href="index.html"
    })
    let khungdsopen = false
    const khungds = document.createElement("div");
        khungds.style.width="200px";
        khungds.style.height="400px";
        khungds.style.border="1px solid rgba(127, 204, 248, 0.507)";
        khungds.style.display="none";
        khungds.style.position="fixed";
        khungds.style.top="60px";
        khungds.style.right="105px";
        khungds.style.backgroundColor="white";
        khungds.style.borderRadius="0px 0px 10px 10px";
        khungds.style.zIndex=20;
        khungds.innerHTML=`
        <ul style="margin:8px;padding-left:0px;">
            <li class="danhmuckhungds">
                <p id="dangxuatbtn" style="margin:5px;font-size:18px;color:#666666;">
                Đăng xuất.
                </p>
            </li>
        </ul>
        `
        document.body.appendChild(khungds)
    document.getElementById("tkbtn").addEventListener("click", function(){
        if(khungdsopen === false){
            khungds.style.display="grid";
            khungdsopen=true;
        }else{
            khungds.style.display="none";
            khungdsopen=false
        }
    })
    //logic cho nút đăng xuất
    document.getElementById("dangxuatbtn").addEventListener("click", function(){
        localStorage.setItem("dangnhap", "false");
        setTimeout(()=>{
            window.location.href="index.html";
        },1000)
    })
    document.getElementById("linkdangbai").addEventListener("click", function(){
        window.location.href="dangbaitap.html";
    })
    }
    laydulieu()
}else{
    document.getElementById("header").innerHTML=`
    <span style="padding-left:20px;display:flex;align-items:center;">
    <img id="logodikey" style="width:100px;cursor:pointer;" src="images/logodikey.png">
    
    <button id="dangkybtn" >Đăng ký</button>
    <button id="dangnhapbtn">Đăng nhập</button>
    </span>
    `
    ;
    document.getElementById("logodikey").addEventListener("click", function(){
        window.location.href="index.html"
    })
    document.getElementById("dangkybtn").addEventListener("click", function(){
        window.location.href="register.html"
    })
    document.getElementById("dangnhapbtn").addEventListener("click", function(){
        window.location.href="login.html"
    })
}

