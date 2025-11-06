document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent reload

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  console.log("Sending:", data);

  try {
    const res = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    document.getElementById("response").textContent = text;
    document.getElementById("response").style.color = "green";
  } catch (err) {
    console.error("Error:", err);
    document.getElementById("response").textContent = "Failed to send.";
    document.getElementById("response").style.color = "red";
  }
});1
