document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseText = document.getElementById("response");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    responseText.textContent = "Sending...";

    try {
      const res = await fetch("https://portfoliowebsite-ten-flame.vercel.app/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const text = await res.text();

      if (res.ok) {
        responseText.style.color = "green";
        responseText.textContent = text;
        form.reset();
      } else {
        responseText.style.color = "red";
        responseText.textContent = "Something went wrong. Please try again.";
      }
    } catch (err) {
      console.error(err);
      responseText.style.color = "red";
      responseText.textContent = "Error: could not connect to server.";
    }
  });
});
