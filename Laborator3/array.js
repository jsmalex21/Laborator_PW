document.addEventListener("DOMContentLoaded", () => {
  // Ex. 1
  const educationItems = Array.from(
    document.querySelectorAll("#education ol li")
  ).map((li) => li.textContent.trim());

  console.log("Ex.1 - Array educatie:", educationItems);

  // Ex. 2
  const filter2024 = educationItems.filter((item) => item.includes("2024"));
  const filterLicenta = educationItems.filter((item) =>
    item.toLowerCase().includes("licen")
  );

  console.log('Ex.2 - Elemente care contin "2024":', filter2024);
  console.log('Ex.2 - Elemente care contin "Licenta":', filterLicenta);

  // Ex. 3
  const firstWords = educationItems.map((item) => {
    const cleanItem = item.replace(/[0-9–:".„]/g, "").trim();
    return cleanItem.split(" ")[0];
  });

  console.log("Ex.3 - Primul cuvant din fiecare element:", firstWords);

  // Ex. 4
  const totalYears = educationItems.reduce((sum, item) => {
    const years = item.match(/\d{4}/g);

    if (!years || years.length === 0) {
      return sum;
    }

    const startYear = parseInt(years[0], 10);
    let endYear;

    if (item.toLowerCase().includes("prezent")) {
      endYear = new Date().getFullYear();
    } else if (years.length > 1) {
      endYear = parseInt(years[1], 10);
    } else {
      endYear = startYear;
    }

    return sum + (endYear - startYear);
  }, 0);

  console.log(`Ex.4 - Total ani de studiu: ${totalYears}`);

  // Bonus 5
  const projects = [
    {
      name: "Pagina personala",
      tech: "HTML, CSS, JavaScript",
      done: false,
    },
    {
      name: "Joc Unity 3D Platformer",
      tech: "C#, Unity, Blender, OOP, Git",
      done: true,
    },
    {
      name: "Dark Mode Toggle",
      tech: "CSS Variables, JavaScript",
      done: true,
    },
    {
      name: "Back to Top Button",
      tech: "JavaScript Scroll API",
      done: true,
    },
  ];

  renderProjects(projects);
});

function renderProjects(projects) {
  const projectsList = document.getElementById("projects-list");
  const projectsSummary = document.getElementById("projects-summary");

  if (!projectsList || !projectsSummary) {
    return;
  }

  const html = projects
    .map(
      (project) => `
        <div class="project-card">
          <h3>${project.name}</h3>
          <p><strong>Tehnologii:</strong> ${project.tech}</p>
          <p><strong>Status:</strong> ${project.done ? "Finalizat" : "In lucru"}</p>
        </div>
      `
    )
    .join("");

  projectsList.innerHTML = html;

  const completed = projects.filter((project) => project.done).length;
  projectsSummary.textContent = `Finalizate: ${completed} din ${projects.length}`;
}