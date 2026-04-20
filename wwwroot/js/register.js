async function register() {
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/Auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })
    });

    const result = document.getElementById("result");

    if (response.ok) {
        const data = await response.json();
        result.innerText = data.message;
    } else {
        const error = await response.text();
        result.innerText = error;
    }
}