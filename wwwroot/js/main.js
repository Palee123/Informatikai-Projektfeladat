window.onload = function () {
    const welcomeText = document.getElementById("welcomeText");
    const navMenu = document.getElementById("navMenu");

    const user = localStorage.getItem("user");

    if (user) {
        welcomeText.innerText = "Sikeresen beléptél";

        navMenu.innerHTML = `
            <a href="#" onclick="logout()">Logout</a>
        `;
    } else {
        welcomeText.innerText = "Üdvözöllek az oldalon";

        navMenu.innerHTML = `
            <a href="login.html">Login</a>
        `;
    }
};
    
function logout() {
    localStorage.removeItem("user");
    window.location.reload();
}