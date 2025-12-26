const frame = document.getElementById("viewerFrame");
const list  = document.getElementById("moduleList");
const meta  = document.getElementById("metaContent");

let currentModule = null;

/* REGISTRY EMBARQUÉ (DEV + OFFLINE SAFE) */
const registry = {
  system: {
    name: "PTAL OS",
    ethics: "distinction faits / analyses / opinions",
    defaultTheme: "sober"
  },
  modules: [
    {
      id: "precarite",
      title: "Précarité en Belgique",
      type: "dashboard",
      audience: "grand public",
      path: "modules/dashboards/precarite.html",
      tags: ["officiel", "social", "belgique"],
      description: "Données officielles, analyse critique et pistes d’action."
    },
    {
      id: "toolkit-pro",
      title: "PTAL Toolkit Pro",
      type: "outil",
      audience: "avancé",
      path: "modules/toolkit-pro.html",
      tags: ["production", "markdown"]
    },
    {
      id: "toolkit-light",
      title: "PTAL Toolkit Light",
      type: "outil",
      audience: "grand public",
      path: "modules/toolkit-light.html"
    },
    {
      id: "matrice",
      title: "La Matrice",
      type: "narratif",
      audience: "initiation",
      path: "modules/matrice.html"
    }
  ]
};

/* BUILD MENU */
buildMenu(registry.modules);

function buildMenu(modules){
  list.innerHTML = "";
  modules.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m.title;
    li.onclick = () => loadModule(m);
    list.appendChild(li);
  });
}

/* LOAD MODULE */
function loadModule(m){
  currentModule = m;

  if(m.mode === "fullscreen"){
    window.open(m.path, "_blank");
    return;
  }

  frame.src = m.path;

  meta.innerHTML = `
    <h3>${m.title}</h3>
    <p>${m.description || "—"}</p>
    <p><strong>Type :</strong> ${m.type}</p>
    <p><strong>Public :</strong> ${m.audience}</p>
    <p><strong>Tags :</strong> ${(m.tags||[]).join(", ")}</p>
  `;
}


/* ACTIONS */
function openCurrent(){
  if(currentModule) window.open(currentModule.path, "_blank");
}

function toggleTheme(){
  document.body.classList.toggle("theme-matrix");
}
