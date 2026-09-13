import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {set,ref,getDatabase, get, onChildAdded, orderByChild, query, equalTo, startAt} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js"
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
const baitapref = ref(db,"baitap")

const langnghebaitap = onChildAdded(baitapref, async (data)=>{
    const nguoidang = await get(ref(db, `user/${data.val().iduser}`))
    
 const divbaitap =document.createElement("div");
        divbaitap.style.width="753px;";
        divbaitap.style.height="fit-content";
        divbaitap.style.backgroundColor="white";
        divbaitap.style.marginTop="10px";
        divbaitap.style.borderRadius="8px";
        divbaitap.style.paddingLeft="30px";
        divbaitap.style.paddingRight="30px";
        divbaitap.style.paddingBottom="10px";
        if(data.val().image!=="null"){
            divbaitap.innerHTML=`
            
            <span style="display:flex;align-items:center;">
            <a href="user.html?id=${nguoidang.key}" style="display:flex;cursor:pointer;">
            <img style="border-radius:100%;width:40px;margin-top:10px;margin-right:10px;margin-bottom:10px;" src="${nguoidang.val().avatar}">
            <p>${nguoidang.val().name}</p>
            </a>
            </span>
            
            <a style="color:black;font-size:18px;" href="chitietbaitap.html?iduser=${data.val().iduser}&idbai=${data.key}">
            <img style="width:700px;border-radius:8px;" src="${data.val().image}">
            <p>${data.val().noidung}<p>
            </a>
            <span>
            <i style="margin-left:78%;" class="fa-regular fa-comment"> ${data.val().socautraloi}</i>
            
            <a href="giaibaitap.html?iduser=${data.val().iduser}&idbai=${data.key}"><button class="traloibtn">Trả lời</button></a>
            <span>
            `
            document.getElementById("dsbaitap").appendChild(divbaitap)
            document.getElementById("dsbaitap").prepend(divbaitap)    
        }else{
            divbaitap.innerHTML=`
            <span style="display:flex;align-items:center;">
            <a href="user.html?id=${nguoidang.key}" style="display:flex;cursor:pointer;">
            <img style="border-radius:100%;width:40px;margin-top:10px;margin-right:10px;margin-bottom:10px;cursor:pointer;" src="${nguoidang.val().avatar}">
            <p>${nguoidang.val().name}</p>
            </a>
            </span>
            <a style="color:black;font-size:18px;" href="chitietbaitap.html?iduser=${data.val().iduser}&idbai=${data.key}">
            <p>${data.val().noidung}<p>
            </a>
            <span>
            <i style="margin-left:78%;" class="fa-regular fa-comment"> ${data.val().socautraloi}</i>
            
            <a href="giaibaitap.html?iduser=${data.val().iduser}&idbai=${data.key}"><button class="traloibtn">Trả lời</button></a>
            <span>
            `
            document.getElementById("dsbaitap").appendChild(divbaitap)
            document.getElementById("dsbaitap").prepend(divbaitap)  
        }
        
               

       
    
    
    
   
    

})

//sự kiện lọc

document.getElementById("locdsbaitap").addEventListener("click", function(){
   
    const monhoc = document.getElementById("monhoc").value;
    const caphoc = document.getElementById("caphoc").value;
    document.getElementById("dsbaitap").innerHTML="";
    let bailoc;
    //hàm lọc
    if(caphoc.length>0 && monhoc.length>0){
        bailoc = query(baitapref, orderByChild("loai"), equalTo(monhoc + "-" + caphoc));
    }else if(caphoc.length>0){
        bailoc = query(baitapref, orderByChild("caphoc"), equalTo(caphoc));
    }else if(monhoc.length>0){
        bailoc = query(baitapref, orderByChild("monhoc"), equalTo(monhoc));
    }else{
        bailoc = baitapref;
    }
    
    const langnghebaitap = onChildAdded(bailoc, async (data)=>{
    const nguoidang = await get(ref(db, `user/${data.val().iduser}`))

    const divbaitap =document.createElement("div");
        divbaitap.style.width="753px;";
        divbaitap.style.height="fit-content";
        divbaitap.style.backgroundColor="white";
        divbaitap.style.marginTop="10px";
        divbaitap.style.borderRadius="8px";
        divbaitap.style.paddingLeft="30px";
        divbaitap.style.paddingRight="30px";
        divbaitap.style.paddingBottom="10px";
        if(data.val().image!=="null"){
            divbaitap.innerHTML=`
            <span style="display:flex;align-items:center;">
            <a href="user.html?id=${nguoidang.key}" style="display:flex;cursor:pointer;">
            <img style="border-radius:100%;width:40px;margin-top:10px;margin-right:10px;margin-bottom:10px;cursor:pointer;" src="${nguoidang.val().avatar}">
            <p>${nguoidang.val().name}</p>
            </a>
            </span>
            <a style="color:black;font-size:18px;" href="chitietbaitap.html?iduser=${data.val().iduser}&idbai=${data.key}">
            <img style="width:700px;border-radius:8px;" src="${data.val().image}">
            <p>${data.val().noidung}<p>
            </a>
            <span>
            <i style="margin-left:78%;" class="fa-regular fa-comment"> ${data.val().socautraloi}</i>
            
            <a href="giaibaitap.html?iduser=${data.val().iduser}&idbai=${data.key}"><button class="traloibtn">Trả lời</button></a>
            <span>
            `
            document.getElementById("dsbaitap").appendChild(divbaitap)
            document.getElementById("dsbaitap").prepend(divbaitap)    
        }else{
            divbaitap.innerHTML=`
            <span style="display:flex;align-items:center;">
            <a href="user.html?id=${nguoidang.key}" style="display:flex;cursor:pointer;">
            <img style="border-radius:100%;width:40px;margin-top:10px;margin-right:10px;margin-bottom:10px;cursor:pointer;" src="${nguoidang.val().avatar}">
            <p>${nguoidang.val().name}</p>
            </a>
            </span>
            <a style="color:black;font-size:18px;" href="chitietbaitap.html?iduser=${data.val().iduser}&idbai=${data.key}">
            <p>${data.val().noidung}<p>
            </a>
            <span>
            <i style="margin-left:78%;" class="fa-regular fa-comment"> ${data.val().socautraloi}</i>
            
            <a href="giaibaitap.html?iduser=${data.val().iduser}&idbai=${data.key}"><button class="traloibtn">Trả lời</button></a>
            <span>
            `
            document.getElementById("dsbaitap").appendChild(divbaitap)
            document.getElementById("dsbaitap").prepend(divbaitap) 
    
   
    

        }
    })
})



document.getElementById("chuatraloibtn").addEventListener("click", function(){
   
    
    document.getElementById("dsbaitap").innerHTML="";
   const bailoc = query(baitapref, orderByChild("socautraloi"), equalTo(0))
    
    const langnghebaitap = onChildAdded(bailoc, async (data)=>{
    const nguoidang = await get(ref(db, `user/${data.val().iduser}`))

    const divbaitap =document.createElement("div");
        divbaitap.style.width="753px;";
        divbaitap.style.height="fit-content";
        divbaitap.style.backgroundColor="white";
        divbaitap.style.marginTop="10px";
        divbaitap.style.borderRadius="8px";
        divbaitap.style.paddingLeft="30px";
        divbaitap.style.paddingRight="30px";
        divbaitap.style.paddingBottom="10px";
        if(data.val().image!=="null"){
            divbaitap.innerHTML=`
            <span style="display:flex;align-items:center;">
            <a href="user.html?id=${nguoidang.key}" style="display:flex;cursor:pointer;">
            <img style="border-radius:100%;width:40px;margin-top:10px;margin-right:10px;margin-bottom:10px;cursor:pointer;" src="${nguoidang.val().avatar}">
            <p>${nguoidang.val().name}</p>
            </a>
            </span>
            <a style="color:black;font-size:18px;" href="chitietbaitap.html?iduser=${data.val().iduser}&idbai=${data.key}">
            <img style="width:700px;border-radius:8px;" src="${data.val().image}">
            <p>${data.val().noidung}<p>
            </a>
            <span>
            <i style="margin-left:78%;" class="fa-regular fa-comment"> ${data.val().socautraloi}</i>
            
            <a href="giaibaitap.html?iduser=${data.val().iduser}&idbai=${data.key}"><button class="traloibtn">Trả lời</button></a>
            <span>
            `
            document.getElementById("dsbaitap").appendChild(divbaitap)
            document.getElementById("dsbaitap").prepend(divbaitap)    
        }else{
            divbaitap.innerHTML=`
            <span style="display:flex;align-items:center;">
            <a href="user.html?id=${nguoidang.key}" style="display:flex;cursor:pointer;">
            <img style="border-radius:100%;width:40px;margin-top:10px;margin-right:10px;margin-bottom:10px;cursor:pointer;" src="${nguoidang.val().avatar}">
            <p>${nguoidang.val().name}</p>
            </a>
            </span>
            <a style="color:black;font-size:18px;" href="chitietbaitap.html?iduser=${data.val().iduser}&idbai=${data.key}">
            <p>${data.val().noidung}<p>
            </a>
            <span>
            <i style="margin-left:78%;" class="fa-regular fa-comment"> ${data.val().socautraloi}</i>
            
            <a href="giaibaitap.html?iduser=${data.val().iduser}&idbai=${data.key}"><button class="traloibtn">Trả lời</button></a>
            <span>
            `
            document.getElementById("dsbaitap").appendChild(divbaitap)
            document.getElementById("dsbaitap").prepend(divbaitap) 
    
   
    

        }
    })
})

document.getElementById("datraloibtn").addEventListener("click", function(){
   
    
    document.getElementById("dsbaitap").innerHTML="";
   const bailoc = query(baitapref, orderByChild("socautraloi"), startAt(1))
    
    const langnghebaitap = onChildAdded(bailoc, async (data)=>{
    const nguoidang = await get(ref(db, `user/${data.val().iduser}`))

    const divbaitap =document.createElement("div");
        divbaitap.style.width="753px;";
        divbaitap.style.height="fit-content";
        divbaitap.style.backgroundColor="white";
        divbaitap.style.marginTop="10px";
        divbaitap.style.borderRadius="8px";
        divbaitap.style.paddingLeft="30px";
        divbaitap.style.paddingRight="30px";
        divbaitap.style.paddingBottom="10px";
        if(data.val().image!=="null"){
            divbaitap.innerHTML=`
            <span style="display:flex;align-items:center;">
            <a href="user.html?id=${nguoidang.key}" style="display:flex;cursor:pointer;">
            <img style="border-radius:100%;width:40px;margin-top:10px;margin-right:10px;margin-bottom:10px;pointer;" src="${nguoidang.val().avatar}">
            <p>${nguoidang.val().name}</p>
            </a>
            </span>
            <a style="color:black;font-size:18px;" href="chitietbaitap.html?iduser=${data.val().iduser}&idbai=${data.key}">
            <img style="width:700px;border-radius:8px;" src="${data.val().image}">
            <p>${data.val().noidung}<p>
            </a>
            <span>
            <i style="margin-left:78%;" class="fa-regular fa-comment"> ${data.val().socautraloi}</i>
            
            <a href="giaibaitap.html?iduser=${data.val().iduser}&idbai=${data.key}"><button class="traloibtn">Trả lời</button></a>
            <span>
            `
            document.getElementById("dsbaitap").appendChild(divbaitap)
            document.getElementById("dsbaitap").prepend(divbaitap)    
        }else{
            divbaitap.innerHTML=`
            <span style="display:flex;align-items:center;">
            <a href="user.html?id=${nguoidang.key}" style="display:flex;cursor:pointer;">
            <img style="border-radius:100%;width:40px;margin-top:10px;margin-right:10px;margin-bottom:10px;cursor:pointer;" src="${nguoidang.val().avatar}">
            <p>${nguoidang.val().name}</p>
            </a>
            </span>
            <a style="color:black;font-size:18px;" href="chitietbaitap.html?iduser=${data.val().iduser}&idbai=${data.key}">
            <p>${data.val().noidung}<p>
            </a>
            <span>
            <i style="margin-left:78%;" class="fa-regular fa-comment"> ${data.val().socautraloi}</i>
            
            <a href="giaibaitap.html?iduser=${data.val().iduser}&idbai=${data.key}"><button class="traloibtn">Trả lời</button></a>
            <span>
            `
            document.getElementById("dsbaitap").appendChild(divbaitap)
            document.getElementById("dsbaitap").prepend(divbaitap) 
    
   
    

        }
    })
})
document.getElementById("tatcamonhocbtn").addEventListener("click", function(){
    document.getElementById("monhoc").value="";
    document.getElementById("caphoc").value="";
    document.getElementById("locdsbaitap").click();
})
