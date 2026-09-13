localStorage.setItem("gioitinh", "Chưa xác định")
document.getElementById("chonnam").addEventListener("click", function(){
    document.getElementById("chonnam").style.backgroundColor="red";
    document.getElementById("chonnu").style.backgroundColor="white";
    document.getElementById("chonnam").style.color="white";
    document.getElementById("chonnu").style.color="black";
    localStorage.setItem("gioitinh", "nam")
    
})
document.getElementById("chonnu").addEventListener("click", function(){
    document.getElementById("chonnu").style.backgroundColor="red";
    document.getElementById("chonnam").style.backgroundColor="white";
    document.getElementById("chonnu").style.color="white";
    document.getElementById("chonnam").style.color="black";
    localStorage.setItem("gioitinh", "nữ")
})


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {set,ref,getDatabase} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js"
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

//sử lý đăng ký
document.getElementById("dkbtn").addEventListener("click", async function(){
    const namecolor = [
    {id:1, color:"#808000"},
    {id:2, color:"#000"},
    {id:3, color:"#804000"},
    {id:4, color:"#8000FF"},
    {id:5, color:"#17A05E"},
    {id:6, color:"#408080"},
    {id:7, color:"#0000FF"},
    {id:8, color:"#DD4F43"},
    {id:9, color:"#FFFF00"},
    {id:10, color:"#FF0000"}
    ]
    const gifchao = [
        {id:1, link:"gifdibo1.gif"},
        {id:2, link:"gifdibo2.gif"},
        {id:3, link:"gifdibo3.gif"},
        {id:4, link:"gifdibo4.gif"}
    ]
    const honamedata = document.getElementById("honame").value;
    const namechinhdata = document.getElementById("namechinh").value;
    const avatardata = document.getElementById("avatarlink").value;
    const [nam, thang, ngay] = document.getElementById("ngaysinh").value.split("-");
    const gioitinhdata = localStorage.getItem("gioitinh");
    const matkhaudata = document.getElementById("matkhau").value;
    const xacnhanmkdata = document.getElementById("xacnhanmk").value;
    const checkdata = document.getElementById("dongydk").checked;
    //kiểm tra thông tin và gửi dữ liệu lên server
    if(honamedata.length>0 && namechinhdata.length>0 && avatardata.length>0 && gioitinhdata.length>0 && matkhaudata.length>0 && xacnhanmkdata.length>0){
        if(matkhaudata===xacnhanmkdata){
            
            if(checkdata){
                const idmau = Math.floor(Math.random()*10) + 1;
                const colorname = namecolor.find(a => a.id === idmau)
                const idgif = Math.floor(Math.random()*4)+1
                const gifchaomung = gifchao.find(b => b.id === idgif)
                const iduser = Date.now() - new Date("2026-01-01").getTime();
                await set(ref(db, `user/${iduser}`),{
                    name:honamedata+" "+namechinhdata,
                    avatar:avatardata,
                    ngaysinh:{
                        nam:nam,
                        thang:thang,
                        ngay:ngay,
                    },
                    gioitinh:gioitinhdata,
                    matkhau:matkhaudata,
                    namecolor:colorname.color,
                    soban:0,
                    sotheodoi:0,
                    diemtichluy:0,
                })
                document.getElementById("thongbao").innerText="Chờ chút nhé!";
                document.getElementById("moduledangky").style.display="none"
                const khungchao = document.createElement("div");
                khungchao.style.width="100%"
                khungchao.style.height="100%"
                khungchao.style.backgroundColor="white"
                khungchao.style.display="flex"
                khungchao.style.justifyContent="center"
                khungchao.style.alignItems="center"
                khungchao.innerHTML=`<img src="images/${gifchaomung.link}"><p>Hãy ghi nhớ ID riêng của bạn để lần sau đăng nhập nhé!</p>`
                document.body.appendChild(khungchao)
                localStorage.setItem("dangnhap", "true")
                localStorage.setItem("iduser", iduser)
                setTimeout(()=>{
                    window.location.href="index.html"
                },10000)
            }else{
                document.getElementById("thongbao").innerText="Hãy tick vào đồng ý mọi dịch vụ.";
            }
        }else{
            document.getElementById("thongbao").innerText="Hai mật khẩu không khớp nhau.";
        }

        
    }else{
        document.getElementById("thongbao").innerText="Vui lòng điền đầy đủ thông tin.";
    }
})