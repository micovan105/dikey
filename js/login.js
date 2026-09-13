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


document.getElementById("truycap").addEventListener("click", async function(){
    const gifchao = [
        {id:1, link:"gifdibo1.gif"},
        {id:2, link:"gifdibo2.gif"},
        {id:3, link:"gifdibo3.gif"},
        {id:4, link:"gifdibo4.gif"}
    ]
    const iduser = document.getElementById("iduser").value;
    const matkhau = document.getElementById("matkhau").value;
    
    if(iduser.length>0 && matkhau.length>0){
        if(document.getElementById("mytk").checked){
            const data = await get(ref(db, `user/${iduser}`));
            if(data.exists()){
                if(data.val().matkhau===matkhau){
                    const idgif = Math.floor(Math.random()*4)+1
                    const gifchaomung = gifchao.find(b => b.id === idgif)
                    document.getElementById("moduledangnhap").style.display="none"
                    const khungchao = document.createElement("div");
                    khungchao.style.width="100%"
                    khungchao.style.height="100%"
                    khungchao.style.backgroundColor="white"
                    khungchao.style.display="flex"
                    khungchao.style.justifyContent="center"
                    khungchao.style.alignItems="center"
                    khungchao.innerHTML=`<img src="images/${gifchaomung.link}"><p>Nào nào chờ chút nữa bạn ơi.</p>`
                    document.body.appendChild(khungchao)
                    localStorage.setItem("dangnhap", "true")
                    localStorage.setItem("iduser", iduser)
                    setTimeout(()=>{
                        window.location.href="index.html"
                    },10000)
                    
                }else{
                    document.getElementById("thongbao").innerText="Mật khẩu không chính xác."
                }
            }else{
                document.getElementById("thongbao").innerText="Không tìm thấy UID này."
            }
        }else{
            document.getElementById("thongbao").innerText="Hãy chắc chắn đây là tài khoản của bạn"
        }
    }else{
        document.getElementById("thongbao").innerText="Hãy nhập đầy đủ thông tin bạn nhé!"
    }

})