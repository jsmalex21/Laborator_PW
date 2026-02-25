// Se execută după ce pagina este complet încărcată
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

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
});

// Funcția pentru formularul de contact
function submitForm(event) {
  // Previne refresh-ul paginii
  event.preventDefault();

  const nume = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mesaj = document.getElementById("message").value;

  console.log("Nume:", nume);
  console.log("Email:", email);
  console.log("Mesaj:", mesaj);

  console.warn("Goodbye World!");

  alert("Mesajul a fost trimis!");

  event.target.reset();
}