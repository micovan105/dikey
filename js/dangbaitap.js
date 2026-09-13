import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { set, ref, getDatabase, get,push } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

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

const maApiKeyImgBB = '6013a04256e0c8dcdc6bcae78748f8f4'; 

const theInputAnh = document.getElementById('upimage');
const khuVucSuaAnh = document.getElementById('khuVucSuaAnh');
const theAnhChinhSua = document.getElementById('anhChinhSua');
const nutXacNhanUp = document.getElementById('nutXacNhanUp');

let doiTuongCropper = null;
localStorage.setItem("linkanh", "null")
// Khi chọn file ảnh từ máy
theInputAnh.addEventListener('change', function(suKien) {
    const tepTin = suKien.target.files[0];

    if (tepTin) {
        const docTepTin = new FileReader();
        docTepTin.onload = function(e) {
            theAnhChinhSua.src = e.target.result;
            khuVucSuaAnh.style.display = 'block';

            // nếu đã có trình chỉnh sửa trước đó thì thay ảnh mới, chưa có thì tạo mới
            if (doiTuongCropper) {
                doiTuongCropper.replace(e.target.result);
            } else {
                doiTuongCropper = new Cropper(theAnhChinhSua, {
                    viewMode: 1,
                    autoCropArea: 0.8
                });
            }
        };
        docTepTin.readAsDataURL(tepTin);
    }
});

nutXacNhanUp.addEventListener('click', function() {
    if (doiTuongCropper) {
        const canvasAnhDaCat = doiTuongCropper.getCroppedCanvas({
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
        });

        canvasAnhDaCat.toBlob(function(duLieuBlob) {
            const duLieuForm = new FormData();
            duLieuForm.append('image', duLieuBlob, 'anh_da_sua.png');

            fetch(`https://api.imgbb.com/1/upload?key=${maApiKeyImgBB}`, {
                method: 'POST',
                body: duLieuForm
            })
            .then(phanHoi => phanHoi.json())
            .then(duLieu => {
                if (duLieu.success) {
                    const duongDanAnh = duLieu.data.url;
                    
                    console.log('Link ảnh ImgBB:', duongDanAnh);
                    localStorage.setItem("linkanh", duongDanAnh);
                    khuVucSuaAnh.style.display = 'none';
                    theInputAnh.value = '';
                    
                } else {
                    console.error('Lỗi khi tải ảnh lên ImgBB');
                }
            })
            .catch(loi => {
                console.error('Lỗi kết nối:', loi);
            });
        });
    }
});
document.getElementById("dangbaibtn").addEventListener("click", async function(){
    if(localStorage.getItem("dangnhap")==="true"){
        const noidungbai = document.getElementById("noidungbai").value;
        const monhoc = document.getElementById("monhoc").value;
        const caphoc = document.getElementById("caphoc").value;
        const iduser = localStorage.getItem("iduser")
        if(noidungbai.length>0){
            if(monhoc!=="" && caphoc!==""){
                await push(ref(db, `baitap`),{
                    iduser:iduser,
                    time:Date.now(),
                    noidung:noidungbai,
                    image:localStorage.getItem("linkanh"),
                    socautraloi:0,
                    soluotxem:0,
                    cautraloi:"null",
                    monhoc:monhoc,
                    caphoc:caphoc,
                    loai:monhoc + "-" + caphoc,
                })
                setTimeout(()=>{
                    window.location.href="index.html";
                },2000)
            }else{
                alert("Hãy chọn Môn học và Cấp học.")
            }
        }else{
            alert("Hãy nhập nội dung bài tập.")
        }
    }else{
        alert("Phải đăng nhập thì bạn mới có thể đang bài.")
    }
   
})