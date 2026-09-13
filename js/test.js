document.getElementById("upbtn").addEventListener("click", function(){
    document.getElementById("anhbtn").click();
})
let anh = null;
document.getElementById("anhbtn").addEventListener("change", async (e)=>{
    anh = e.target.files[0];
    const box = new FormData();
    box.append("image", anh)
    const ref = await fetch("https://api.imgbb.com/1/upload?key=6013a04256e0c8dcdc6bcae78748f8f4", {method:"POST", body:box});
    const thongtin =await ref.json();
    if(thongtin.success){
        console.log(thongtin.data.url)
    }
})