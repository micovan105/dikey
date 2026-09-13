import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {set,ref,getDatabase,onChildAdded, get, remove, onValue, query, orderByChild, equalTo,push, increment,update} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js"
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



const laythamso = new URLSearchParams(window.location.search)
const id = laythamso.get("id")


    


//mục lục
document.getElementsByClassName("mucluc")[0].addEventListener("click", async function(){
    //mục chính
    //lấy dữ liệu
    const user = await get(ref(db, `user/${id}`))

    

    
    
    //hiển thị
    document.getElementsByClassName("mucluc")[0].innerHTML=`<i class="fas fa-user-circle"></i>${user.val().name}`;
    document.getElementsByClassName("mucluc")[0].style.backgroundColor="#007bff";
    document.getElementsByClassName("mucluc")[1].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[2].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[3].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[4].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[0].style.color="#f3f5f8";
    document.getElementsByClassName("mucluc")[1].style.color="";
    document.getElementsByClassName("mucluc")[2].style.color="";
    document.getElementsByClassName("mucluc")[3].style.color="";
    document.getElementsByClassName("mucluc")[4].style.color="";
    document.getElementById("khungchinh").innerHTML=""
    const hienthi = document.createElement("div")
    hienthi.style.width="850px"
    hienthi.style.height="fit-content"
    hienthi.style.backgroundColor="white"
    hienthi.style.borderRadius="8px"
    hienthi.style.padding="10px"
    hienthi.innerHTML=`
    <div  style="background-color:#e9ecef;border:1px solid;max-width:180px;padding:10px;border-radius:20px;margin-left:10px;">hi</div>
    <img style="width:150px;border-radius:100%;margin-left:32px;margin-top:30px;border:5px solid white;box-shadow:0px 0px 7px black;" src="${user.val().avatar}">
    <div style="display:flex;width:550px;height:50px;background-color:#f8f9fa;position:absolute;left:650px;top:100px;border-radius:8px;align-items:center;padding-left:20px;gap:35px;color:#6c757d;">
    <i title="Bạn bè" class="fas fa-user-friends"> ${user.val().soban}</i>
    <i title="Theo dõi" class="fa fa-heart"> ${user.val().sotheodoi}</i>
    <i title="Điểm tích lũy" class="fas fa-star"> ${user.val().diemtichluy}</i>
    </div>
    <div style="width:550px;background-color:#f8f9fa;height:150px;position:absolute;left:650px;top:170px;border-radius:8px;padding-left:20px;gap:35px;color:black;padding-top:10px;padding-right:20px;">
    <b>Huy hiệu</b>
    <hr>
    <p style="color:red;">Tính năng này sẽ phát triển sau.</p>
    </div>
    <div style="display:flex;margin-left:45px;gap:10px;margin-top:30px;">
    <button id="follow-btn" class="btn-icon" title="Theo dõi"><i class="far fa-heart"></i></button>
    <button id="add-friend-btn" class="btn-icon" title="Kết bạn"><i class="fas fa-user-plus"></i></button>
    <button id="message-btn" class="btn-icon" title="Nhắn tin"><i class="fas fa-comment-dots"></i></button>
    </div>

`

    document.getElementById("khungchinh").appendChild(hienthi)
    //sự kiện cho nút theo dõi
    const theodoi = await get(ref(db, `user/${localStorage.getItem("iduser")}/theodoi/${id}`))

    if(theodoi.exists()){
    //kiểm tra lại dữ liệu để tùy chỉnh
    
        document.getElementById("follow-btn").style.backgroundColor="#fde0e6";
        document.getElementById("follow-btn").innerHTML='<i class="fas fa-heart"></i>';
        document.getElementById("follow-btn").style.color="red";
        document.getElementById("follow-btn").addEventListener("mouseover", function(){
            document.getElementById("follow-btn").style.backgroundColor="#cfcfd0";
        })
        document.getElementById("follow-btn").addEventListener("mouseleave", function(){
            document.getElementById("follow-btn").style.backgroundColor="#fde0e6";
        })
        //sủ lý hủy theo dõi
        document.getElementById("follow-btn").addEventListener("click", async function(){
            await remove(ref(db, `user/${localStorage.getItem("iduser")}/theodoi/${id}`))
            alert("Đã hủy theo dõi thành công")
        //trả về giao diện cũ
        document.getElementsByClassName("mucluc")[0].click()
    })
}else{
    document.getElementById("follow-btn").addEventListener("click", async function(){

        if(localStorage.getItem("dangnhap")==="true"){
            if(localStorage.getItem("iduser") !== id){
                await set(ref(db, `user/${localStorage.getItem("iduser")}/theodoi/${id}`),{
                    time:Date.now(),
                })
                await set(ref(db, `user/${id}/duoctheodoi/${localStorage.getItem("iduser")}`),{
                    time:Date.now(),
                })
                alert("Theo dõi thành công")
                document.getElementsByClassName("mucluc")[0].click()
            }else{
                alert("Trời ơi trời ai xem ai đang tự luyến nè.")
            }
        }else{
            alert("Đăng nhập mới có thể thực hiện thao tác này.")
        }
    })

}

//sự kiện cho nút kết bạn
    const banbe = await get(ref(db, `user/${localStorage.getItem("iduser")}/banbe/${id}`))
    const loimoikb = await get(ref(db, `user/${id}/loimoiketban/${localStorage.getItem("iduser")}`))
    const guiketban = await get(ref(db, `user/${localStorage.getItem("iduser")}/guiketban/${id}`))

 if(banbe.exists()){
    //kiểm tra lại dữ liệu để tùy chỉnh
    
        document.getElementById("add-friend-btn").style.backgroundColor="#fde0e6";
        document.getElementById("add-friend-btn").innerHTML='<i class="fas fa-user-check"></i>';
        document.getElementById("add-friend-btn").style.color="red";
        document.getElementById("add-friend-btn").addEventListener("mouseover", function(){
            document.getElementById("add-friend-btn").style.backgroundColor="#cfcfd0";
        })
        document.getElementById("add-friend-btn").addEventListener("mouseleave", function(){
            document.getElementById("add-friend-btn").style.backgroundColor="#fde0e6";
        })
        //sủ lý hủy kb
        document.getElementById("add-friend-btn").addEventListener("click", async function(){
            await remove(ref(db, `user/${localStorage.getItem("iduser")}/banbe/${id}`))
            alert("Đã hủy kết bạn thành công")
        //trả về giao diện cũ
        document.getElementsByClassName("mucluc")[0].click()
    })
    }else if(guiketban.exists()){
        document.getElementById("add-friend-btn").style.backgroundColor="rgba(3, 207, 193, 0.49)";
        document.getElementById("add-friend-btn").innerHTML='<i class="fas fa-clock"></i>';
        document.getElementById("add-friend-btn").style.color="white";
        document.getElementById("add-friend-btn").title="Đang đợi phản hồi."
    }else if(loimoikb.exists()){
        document.getElementById("add-friend-btn").style.backgroundColor="rgba(207, 3, 3, 0.49)";
        document.getElementById("add-friend-btn").innerHTML='<i class="fas fa-clock"></i>';
        document.getElementById("add-friend-btn").style.color="white";
        document.getElementById("add-friend-btn").title="Ấn để phản hồi";
    }else{
    document.getElementById("add-friend-btn").addEventListener("click", async function(){

        if(localStorage.getItem("dangnhap")==="true"){
            if(localStorage.getItem("iduser") !== id){
                await set(ref(db, `user/${localStorage.getItem("iduser")}/guiketban/${id}`),{
                    time:Date.now(),
                })
                document.getElementById("add-friend-btn").innerHTML=`<i class="fas fa-clock"></i>`
                document.getElementById("add-friend-btn").title="Đang đợi phản hồi"
                alert("Đã gửi lời mời kết bạn, hãy đợi người dùng phản hồi.")
                document.getElementsByClassName("mucluc")[0].click()
            }else{
                alert("Vẫn còn rất nhiều người bạn mà đừng tự kỉ như thế.")
            }
        }else{
            alert("Đăng nhập mới có thể thực hiện thao tác này.")
        }
    })

}
})

    //sủ lý tương tác


document.getElementsByClassName("mucluc")[1].addEventListener("click", async function(){
    document.getElementsByClassName("mucluc")[0].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[1].style.backgroundColor="#007bff";
    document.getElementsByClassName("mucluc")[2].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[3].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[4].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[0].style.color="";
    document.getElementsByClassName("mucluc")[1].style.color="#f3f5f8";
    document.getElementsByClassName("mucluc")[2].style.color="";
    document.getElementsByClassName("mucluc")[3].style.color="";
    document.getElementsByClassName("mucluc")[4].style.color="";
        //hiển thị giao diện
    document.getElementById("khungchinh").innerHTML="";
    const hienthi = document.createElement("div")
    
    hienthi.style.width="850px"
    hienthi.style.height="fit-content"
    hienthi.style.backgroundColor="white"
    hienthi.style.borderRadius="8px"
    hienthi.style.padding="10px"
    hienthi.innerHTML=`
    <h2>Bài đăng của tui.</h2>
    <a href="taobaidang.html" style="cursor:pointer;display:flex;align-items:center;gap:10px;margin-left:10px;color:blue;"><i class="fa-solid fa-plus"></i> Chia sẻ câu chuyện của bạn</a>
    <hr>

    `
    document.getElementById("khungchinh").appendChild(hienthi);
    if(localStorage.getItem("dangnhap")==="true"){

    
    //lấy dữ liệu
    const user = await get(ref(db, `user/${id}`))
    
    
    async function laydulieu(){
        const baidangref = ref(db, "baidangcuatoi");
        const baidang = query(baidangref, orderByChild("iduser"), equalTo(id))
    
        
        const databaidang = await get(baidang);
        
        if(databaidang.exists()){
        databaidang.forEach((data)=>{
        
       
            //module bài đăng
            const baidangElement = document.createElement("div")
        
            baidangElement.style.width="850px"
            baidangElement.style.height="fit-content"
            baidangElement.style.backgroundColor="white"
            baidangElement.style.borderRadius="8px"
            baidangElement.style.padding="10px"
            baidangElement.style.marginTop="20px";
            baidangElement.innerHTML=`
            <div style="display:flex;gap:10px;">
            <img style="width:50px; height:50px;border-radius:100%;" src="${user.val().avatar}">
            <div style="display:flex;flex-direction:column;justify-content:center;">
            <p style="margin:0;color:#898989;">${user.val().name}</p>
            <p style="margin:0;font-size:13px;">Time: sẽ thêm sau</p>
            
            <p style="margin:0;font-size:15px;">mở chat, sẽ thêm sau</p>
            </div>
            </div>
            <hr>
            <p style="font-size:17px;">${data.val().noidung}</p>
            <img style="border-radius:5px;image-size:10px;display:block;margin:auto;width:auto;height:auto;max-height:300px;max-width:750px;" src="${data.val().image}">

            <h3 style="margin-left:365px;">${data.val().sobinhluan || 0} Bình luận <i class="fa-solid fa-arrow-down-wide-short"></i></h3>

            `;
            document.getElementById("khungchinh").appendChild(baidangElement);
            let traloi = " ";
            
            // sử lý gửi bl 
            const guibinhluan = document.createElement("div")
        
            guibinhluan.style.width="850px"
            guibinhluan.style.height="fit-content"
            guibinhluan.style.backgroundColor="white"
            guibinhluan.style.borderRadius="8px"
            guibinhluan.style.padding="10px"
            guibinhluan.style.marginTop="0px";
            guibinhluan.innerHTML=`
            <div>
            <textarea id="noidung${data.key}" placeholder="Bài đăng này thế nào..." rows="8" style="width:820px;margin-left:5px;margin-top:10px;background-color:papayawhip;padding:10px; font-size:16px;"></textarea>
            <div>
            <input id="anhbtn${data.key}" type="file" accept="image/*" style="display:none;">
            <button id="upbtn${data.key}" style="width:150px;margin-left:5px;height:40px;background-color:GhostWhite;border:1.5px solid;border-radius:5px;font-size:15px;cursor:pointer;">Đăng hình ảnh</button>
            <button id="dangbl${data.key}" style="width:150px;height:40px;background-color:#81f3ff!important;border:1.5px solid;border-radius:5px;font-size:15px;cursor:pointer;color:red;">Đăng bình luận</button>
            </div>
            </div>
            `
            document.getElementById("khungchinh").appendChild(guibinhluan);

            //lấy dữ liệu bình luận
            const binhluanref = ref(db, `baidangcuatoi/${data.key}/binhluan`)
            
            async function hienThiBinhLuan() {
                const snapshotbinhluan = await get(binhluanref);
                if (snapshotbinhluan.exists()) {
                    let dsbl = [];
                    snapshotbinhluan.forEach((item) => {
                        dsbl.push(item);
                    });

                    for (const data1 of dsbl) {
                        let dieukhien = "";
                        if (localStorage.getItem("iduser") === id) {
                            dieukhien = `<div style="position:absolute;right:50px;display:flex;justify-content:center;"><p id="xoabl${data1.key}" style="cursor:pointer;color:#828282;">Xóa</p><p style="margin-left:10px;margin-right:10px;"> | </p><p id="chanbl${data1.key}" style="cursor:pointer;color:#828282;">Chặn</p><p style="margin-left:10px;margin-right:10px;"> | </p><p id="traloibl${data1.key}" style="cursor:pointer;color:#828282;">Trả lời</p></div>`;
                        }else{
                            dieukhien = `<div style="position:absolute;right:50px;display:flex;justify-content:center;"><p id="traloibl${data1.key}" style="cursor:pointer;color:#828282;">Trả lời</p></div>`;
                        }

                        const binhluan = document.createElement("div");
                        const nguoibl = await get(ref(db, `user/${data1.val().iduser}`));
                        binhluan.style.width = "850px";
                        binhluan.style.height = "fit-content";
                        binhluan.style.backgroundColor = "white";
                        binhluan.style.borderRadius = "8px";
                        binhluan.style.padding = "10px";
                        binhluan.style.marginTop = "0";
                        binhluan.innerHTML = `
                        <hr>
                        <div style="display:flex;gap:10px;align-items:center;">
                        <a href="user.html?id=${data1.val().iduser}" style="display:flex;gap:10px;align-items:center;cursor:pointer;width:fit-content;">
                        
                        <img src="${nguoibl.exists() ? nguoibl.val().avatar : ''}", style="width:45px;height:45px;border-radius:100%;" >
                        <p style="color:#898989;display:flex;">${nguoibl.exists() ? nguoibl.val().name : 'Ẩn danh'} > <b> ${data1.val().traloi || ''}</b></p>

                        
                        </a>
                        ${dieukhien}
                        </div>
                        
                        <p style="margin-left:55px;margin-top:0;">${data1.val().noidung}</p>
                        <img src="${data1.val().image}" style="border-radius:5px;image-size:10px;display:block;width:auto;height:auto;max-height:200px;max-width:600px;cursor:pointer;margin-left:55px;">
                        `;

                        document.getElementById("khungchinh").insertBefore(binhluan, guibinhluan);
                        if(localStorage.getItem("iduser")===id){
                        //sự kiện cho nút xóa bl
                        if (document.getElementById(`xoabl${data1.key}`)) {
                            document.getElementById(`xoabl${data1.key}`).addEventListener("click", async function () {
                                await remove(ref(db, `baidangcuatoi/${data.key}/binhluan/${data1.key}`));
                                await update(ref(db, `baidangcuatoi/${data.key}`), {
                                    sobinhluan: increment(-1),
                                });
                                setTimeout(() => {
                                    window.location.href = `user.html?id=${id}&muc=1`;
                                }, 1000);
                            });
                        }
                        //sự kiện cho nút trả lời bl
                        if (document.getElementById(`traloibl${data1.key}`)) {
                            document.getElementById(`traloibl${data1.key}`).addEventListener("click", async function () {
                                const ten = await get(ref(db, `user/${data1.val().iduser}/name`));
                                traloi = ten.val();
                                document.getElementById(`noidung${data.key}`).placeholder = `Trả lời cho ${ten.val()}:`;
                                document.getElementById(`noidung${data.key}`).scrollIntoView({ block: "center" });
                            });
                        }
                        //sự kiện cho nút chặn bl
                        document.getElementById(`chanbl${data1.key}`).addEventListener("click", async function(){
                            if(data1.val().iduser !== localStorage.getItem("iduser")){

                            
                            await update(ref(db, `baidangcuatoi/${data.key}/dsden/${data1.val().iduser}`),{
                                time:Date.now(),

                            })
                            alert(`Người dùng mang ID: ${data1.val().iduser} đã bị chặn.`)
                        }else{
                            alert("-.- ủa mắc gì tự chặn chính mình!")
                        }
                        })
                    }else{
                        //sự kiện cho nút trả lời bl phía khách
                        if (document.getElementById(`traloibl${data1.key}`)) {
                            document.getElementById(`traloibl${data1.key}`).addEventListener("click", async function () {
                                const ten = await get(ref(db, `user/${data1.val().iduser}/name`));
                                traloi = ten.val();
                                document.getElementById(`noidung${data.key}`).placeholder = `Trả lời cho ${ten.val()}:`;
                                document.getElementById(`noidung${data.key}`).scrollIntoView({ block: "center" });
                            });
                        }
                    }
                    }
                }
            }
            hienThiBinhLuan();

            document.getElementById(`upbtn${data.key}`).addEventListener("click", function(){
                document.getElementById(`anhbtn${data.key}`).click();
                console.log(`đang chọn ${data.key}`);
            });

            let fileanh = null;
            let linkanh = "";
            document.getElementById(`anhbtn${data.key}`).addEventListener("change", async function(){
                fileanh = document.getElementById(`anhbtn${data.key}`).files[0];
                const box = new FormData();
                box.append("image", fileanh);
                const imageref = await fetch("https://api.imgbb.com/1/upload?key=6013a04256e0c8dcdc6bcae78748f8f4", {method:"POST", body: box});
                const thongtin = await imageref.json();
                
                if(thongtin.success){
                    linkanh = thongtin.data.url;
                    alert("Ảnh đã được nạp");
                }
            });
            //sự kiện của nút đăng bl
            document.getElementById(`dangbl${data.key}`).addEventListener("click", async function(){
                const noidung = document.getElementById(`noidung${data.key}`).value;
                const dsden = await get(ref(db, `baidangcuatoi/${data.key}/dsden/${localStorage.getItem("iduser")}`))
                if(noidung.length>0){
                    if(dsden.exists()){
                        alert("Bạn đã bị chặn bình luận trên trang cá nhân này.")
                    }else{
                    await push(ref(db, `baidangcuatoi/${data.key}/binhluan`),{
                        iduser: localStorage.getItem("iduser"),
                        traloi:traloi,
                        noidung: noidung,
                        image: linkanh,
                        time: Date.now(),
                    });
                    await update(ref(db, `baidangcuatoi/${data.key}`),{
                        sobinhluan:increment(1),
                    });
                    setTimeout(()=>{
                        window.location.href=`user.html?id=${id}&muc=1`;
                    },1000);
                    }
                }else{
                    alert("Chưa viết bình luận mà.");
                }
            });
        });
        }
    }

    laydulieu();
}else{
    alert("Đăng nhập để thực hiện thao tác này.");
}
});



    

document.getElementsByClassName("mucluc")[2].addEventListener("click", function(){
    document.getElementsByClassName("mucluc")[0].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[1].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[2].style.backgroundColor="#007bff";
    document.getElementsByClassName("mucluc")[3].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[4].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[0].style.color="";
    document.getElementsByClassName("mucluc")[1].style.color="";
    document.getElementsByClassName("mucluc")[2].style.color="#f3f5f8";
    document.getElementsByClassName("mucluc")[3].style.color="";
    document.getElementsByClassName("mucluc")[4].style.color="";
})
document.getElementsByClassName("mucluc")[3].addEventListener("click", function(){
    document.getElementsByClassName("mucluc")[0].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[1].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[2].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[3].style.backgroundColor="#007bff";
    document.getElementsByClassName("mucluc")[4].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[0].style.color="";
    document.getElementsByClassName("mucluc")[1].style.color="";
    document.getElementsByClassName("mucluc")[2].style.color="";
    document.getElementsByClassName("mucluc")[3].style.color="#f3f5f8";
    document.getElementsByClassName("mucluc")[4].style.color="";
})
document.getElementsByClassName("mucluc")[4].addEventListener("click", function(){
    document.getElementsByClassName("mucluc")[0].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[1].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[2].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[3].style.backgroundColor="";
    document.getElementsByClassName("mucluc")[4].style.backgroundColor="#007bff";
    document.getElementsByClassName("mucluc")[0].style.color="";
    document.getElementsByClassName("mucluc")[1].style.color="";
    document.getElementsByClassName("mucluc")[2].style.color="";
    document.getElementsByClassName("mucluc")[3].style.color="";
    document.getElementsByClassName("mucluc")[4].style.color="#f3f5f8";
})
const laymucluc = new URLSearchParams(window.location.search);
const muc = laymucluc.get("muc")
console.log(muc)
if(muc===null){
    document.getElementsByClassName("mucluc")[0].click();
}else if(muc==1){
    document.getElementsByClassName("mucluc")[1].click();

}else if(muc==2){
    document.getElementsByClassName("mucluc")[2].click();

}else if(muc==3){
    document.getElementsByClassName("mucluc")[3].click();

}else if(muc==4){
    document.getElementsByClassName("mucluc")[4].click();

}