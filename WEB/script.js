const backendURL = "https://espreall.onrender.com"; // Replace with your backend URL

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const turnOn = document.getElementById("turnOn");
    const turnOff = document.getElementById("turnOff");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch(`${backendURL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("token", data.token); // Save token
                    window.location.href = "home.html"; // Redirect to home page
                } else {
                    alert(data.error || "Login failed");
                }
            } catch (error) {
                alert("Error connecting to the server");
            }
        });
    }

    if (turnOn && turnOff) {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please log in first");
            window.location.href = "index.html";
        }

        const updateLEDState = async (state) => {
            try {
                const response = await fetch(`${backendURL}/led`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ state }),
                });
                const data = await response.json();
                alert(data.message || "LED state updated");
            } catch (error) {
                alert("Error connecting to the server");
            }
        };

        turnOn.addEventListener("click", () => updateLEDState("ON"));
        turnOff.addEventListener("click", () => updateLEDState("OFF"));
    }
});
