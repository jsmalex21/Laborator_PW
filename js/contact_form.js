document.addEventListener("DOMContentLoaded", () => {
  // ===== Anul curent în footer =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Ex.1: Salut personalizat =====
  const headerParagraph = document.querySelector("header p");
  const hour = new Date().getHours();

  let mesajSalut;
  if (hour >= 6 && hour <= 11) {
    mesajSalut = "Bună dimineața! ";
  } else if (hour >= 12 && hour <= 17) {
    mesajSalut = "Bună ziua! ";
  } else {
    mesajSalut = "Bună seara! ";
  }

  if (headerParagraph) {
    headerParagraph.textContent =
      mesajSalut + "Bine ai venit pe pagina mea.";
  }

  // ===== Ex.2: Validare formular =====
  const form = document.querySelector("form");
  const feedback = document.getElementById("form-feedback");

  if (form && feedback) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const nume = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const mesaj = document.getElementById("message").value.trim();

      feedback.textContent = "";
      feedback.style.color = "red";

      if (nume.length < 2) {
        feedback.textContent = "Nume prea scurt!";
        return;
      }

      if (!email.includes("@")) {
        feedback.textContent = "Email invalid!";
        return;
      }

      if (mesaj.length < 10) {
        feedback.textContent =
          "Mesajul trebuie să aibă cel puțin 10 caractere!";
        return;
      }

      feedback.style.color = "green";
      feedback.textContent = `Mulțumim, ${nume}! Mesajul a fost trimis.`;

      form.reset();
    });
  }

  // ===== Ex.3: Dark / Light Mode =====
  const toggleButton = document.getElementById("theme-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      toggleButton.textContent = document.body.classList.contains("dark-mode")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
    });
  }
    // ===== Ex.4: Toggle vizibilitate pe secțiuni (click pe h2) =====
  const h2List = document.querySelectorAll("main h2");

  h2List.forEach((h2) => {
    // indicator inițial (▼ = deschis)
    h2.textContent = `▼ ${h2.textContent}`;
    h2.classList.add("toggle-h2");

    h2.addEventListener("click", function () {
      // ascunde/afișează toate elementele de după h2, până la următorul h2
      let el = this.nextElementSibling;
      let isHiddenNow = false;

      while (el && el.tagName !== "H2") {
        el.classList.toggle("hidden");
        isHiddenNow = el.classList.contains("hidden");
        el = el.nextElementSibling;
      }

      // schimbă indicatorul (▶ când e ascuns, ▼ când e afișat)
      const title = this.textContent.replace(/^.[ ]/, ""); // scoate primul simbol + spațiu
      this.textContent = `${isHiddenNow ? "▶" : "▼"} ${title}`;
    });
  });
});