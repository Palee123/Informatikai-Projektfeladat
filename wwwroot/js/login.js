async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/Auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const result = document.getElementById("result");

    if (response.ok) {
        const data = await response.json();

        localStorage.setItem("user", JSON.stringify(data));

        result.innerText = data.message;

        window.location.href = "index.html";
    } else {

        const error = await response.text();

        result.innerText = error;
    }
}