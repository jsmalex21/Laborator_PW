// mic bonus: anul curent în footer
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

function submitForm(event) {
  // ca să nu-ți dea refresh la pagină (altfel nu prea apuci să vezi consola)
  if (event) event.preventDefault();

  const nume = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mesaj = document.getElementById("message").value;

  console.log("Nume:", nume);
  console.log("Email:", email);
  console.log("Mesaj:", mesaj);

  console.warn("Goodbye World!");

  alert("Mesajul a fost trimis!");
}
