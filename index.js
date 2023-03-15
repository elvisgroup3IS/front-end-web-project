var islogin= sessionStorage.getItem("is_active");
var loginbtn=document.getElementById("loginbtn");
if(islogin){
    loginbtn.style.display = "none";
}
Array.from(document.querySelectorAll("#second-menu li")).forEach(el => {
    el.addEventListener("click", event => {
        document.getElementById("frame").src = event.target.getAttribute("data-url");
    });
})