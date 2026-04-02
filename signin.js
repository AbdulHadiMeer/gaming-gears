
// script.js
let isLogin = false;

function toggleMode(){
  isLogin = !isLogin;
  document.getElementById("title").innerText = isLogin ? "Login" : "Sign Up";
  document.querySelector(".toggle").innerText = isLogin ? "Create new account" : "Already have an account? Login";
}

function handleAuth(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if(username === "" || password === ""){
    alert("Please fill all fields");
    return;
  }

  if(isLogin){
    const storedUser = localStorage.getItem("user");
    const storedPass = localStorage.getItem("pass");

    if(username === storedUser && password === storedPass){
      loginSuccess();
    } else {
      alert("Invalid credentials");
    }

  } else {
    localStorage.setItem("user", username);
    localStorage.setItem("pass", password);
    alert("Account created! Now login.");
    toggleMode();
  }
}
function loginSuccess(){
  // optional: login status save kar lo
  localStorage.setItem("isLoggedIn", "true");

  // redirect to home page
  window.location.href = "index.html";
}
function logout(){
  document.getElementById("authBox").style.display = "block";
  document.getElementById("logoutBox").style.display = "none";
}