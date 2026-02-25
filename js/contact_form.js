// Se execută după încărcarea completă a paginii
document.addEventListener("DOMContentLoaded", () => {
  // ===== Anul curent în footer =====
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===== Exercițiul 1: Salut personalizat =====
  const headerParagraph = document.querySelector("header p");
  const hour = new Date().getHours();

  let mesajSalut;

  if (hour >= 6 && hour <= 11) {
    mesajSalut = "Bună dimineața! Bine ai venit pe pagina mea.";
  } else if (hour >= 12 && hour <= 17) {
    mesajSalut = "Bună ziua! Bine ai venit pe pagina mea.";
  } else {
    mesajSalut = "Bună seara! Bine ai venit pe pagina mea.";
  }

  if (headerParagraph) {
    headerParagraph.textContent = mesajSalut;
  }

  // ===== Exercițiul 2: Validare reală formular =====
  const form = document.querySelector("form");
  const feedback = document.getElementById("form-feedback");

  form.addEventListener("submit", function (event) {
    // Previne reload-ul paginii
    event.preventDefault();

    const nume = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mesaj = document.getElementById("message").value.trim();

    // Reset feedback
    feedback.textContent = "";
    feedback.style.color = "red";

    // Validări
    if (nume.length < 2) {
      feedback.textContent = "Nume prea scurt!";
      return;
    }

    if (!email.includes("@")) {
      feedback.textContent = "Email invalid!";
      return;
    }

    if (mesaj.length < 10) {
      feedback.textContent = "Mesajul trebuie să aibă cel puțin 10 caractere!";
      return;
    }

    // Dacă totul e valid
    feedback.style.color = "green";
    feedback.textContent = `Mulțumim, ${nume}! Mesajul a fost trimis.`;

    console.log("Nume:", nume);
    console.log("Email:", email);
    console.log("Mesaj:", mesaj);
    console.warn("Goodbye World!");

    // Reset formular
    form.reset();
  });
});