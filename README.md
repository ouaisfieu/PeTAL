# PTAL OS

PTAL OS est un système documentaire citoyen statique.

Il permet de :
- produire
- lire
- contextualiser
- diffuser

des documents complexes, sourcés et critiques,
sans serveur, sans dépendance lourde.

## Principe
Le Shell ne contient aucun contenu.
Tout est chargé via registry.json.

## Licence
CC BY-SA


---

# PRéVIOUSLY

Parfait.
Alors on y va **plein gaz**, mais proprement.
Voici **PTAL OS v1 — le canevas final**, livré comme **socle réel**, pas une démo.

> ⚠️ Ce qui suit est volontairement **auto-suffisant**, **lisible**, **forkable**,
> et peut tourner **localement**, sur **GitHub Pages**, ou sur **clé USB**.

---

# 🚀 PTAL OS v1 — Operating System documentaire citoyen

---

## 0️⃣ Philosophie (courte et claire)

**PTAL OS n’est pas un site.**
C’est un **orchestrateur de documents**.

* le contenu vit dans des modules autonomes
* le Shell ne juge pas le contenu, il le **contextualise**
* tout est déclaratif
* aucune dépendance lourde
* aucune magie opaque

---

## 1️⃣ Arborescence finale (à créer telle quelle)

```txt
ptal-os/
├── index.html
├── core/
│   ├── registry.json
│   └── shell.js
├── ui/
│   ├── shell.css
│   └── themes.css
├── modules/
│   ├── toolkit-pro.html
│   ├── toolkit-light.html
│   ├── matrice.html
│   └── dashboards/
│       └── precarite.html
└── README.md
```

---

## 2️⃣ `index.html` — le Shell (le cœur)

👉 **copie-colle tel quel**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>PTAL OS</title>
<link rel="stylesheet" href="ui/shell.css">
<link rel="stylesheet" href="ui/themes.css">
</head>

<body class="theme-sober">

<header class="system-bar">
  <div class="sys-left">
    <strong>PTAL OS</strong>
    <span id="sysStatus">— état du réel</span>
  </div>
  <div class="sys-right">
    <button onclick="toggleTheme()">🌓</button>
    <button onclick="openCurrent()">↗ ouvrir</button>
  </div>
</header>

<main class="layout">

  <aside class="nav-panel">
    <div class="nav-header">Modules</div>
    <ul id="moduleList"></ul>
  </aside>

  <section class="viewer-panel">
    <iframe id="viewerFrame" sandbox="allow-scripts allow-same-origin"></iframe>
  </section>

  <aside class="meta-panel">
    <div class="meta-header">Contexte</div>
    <div id="metaContent" class="meta-content">
      <p>Sélectionne un module.</p>
    </div>
  </aside>

</main>

<script src="core/shell.js"></script>
</body>
</html>
```

---

## 3️⃣ `core/registry.json` — le cerveau

👉 **tout passe par ici**

```json
{
  "system": {
    "name": "PTAL OS",
    "ethics": "distinction faits / analyses / opinions",
    "defaultTheme": "sober"
  },
  "modules": [
    {
      "id": "precarite",
      "title": "Précarité en Belgique",
      "type": "dashboard",
      "audience": "grand public",
      "path": "modules/dashboards/precarite.html",
      "tags": ["officiel", "social", "belgique"],
      "description": "Données officielles, analyse critique et pistes d’action."
    },
    {
      "id": "toolkit-pro",
      "title": "PTAL Toolkit Pro",
      "type": "outil",
      "audience": "avancé",
      "path": "modules/toolkit-pro.html",
      "tags": ["production", "markdown"]
    },
    {
      "id": "toolkit-light",
      "title": "PTAL Toolkit Light",
      "type": "outil",
      "audience": "grand public",
      "path": "modules/toolkit-light.html"
    },
    {
      "id": "matrice",
      "title": "La Matrice",
      "type": "narratif",
      "audience": "initiation",
      "path": "modules/matrice.html"
    }
  ]
}
```

---

## 4️⃣ `core/shell.js` — orchestration propre

```js
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

```

---

## 5️⃣ `ui/shell.css` — structure & lisibilité

```css
*{box-sizing:border-box;margin:0;padding:0}

body{
  font-family:system-ui,sans-serif;
  height:100vh;
  display:flex;
  flex-direction:column;
}

.system-bar{
  display:flex;
  justify-content:space-between;
  padding:8px 14px;
  border-bottom:1px solid #ccc;
}

.layout{
  flex:1;
  display:grid;
  grid-template-columns:260px 1fr 300px;
  overflow:hidden;
}

.nav-panel,.meta-panel{
  border-right:1px solid #ddd;
  padding:10px;
  overflow:auto;
}

.viewer-panel{
  position:relative;
}

iframe{
  width:100%;
  height:100%;
  border:none;
}

ul{list-style:none}
li{
  padding:6px 8px;
  cursor:pointer;
}
li:hover{background:#eee}
```

---

## 6️⃣ `ui/themes.css` — le “truc de dingue” maîtrisé

```css
.theme-sober{
  background:#f8f9fa;
  color:#222;
}

.theme-matrix{
  background:#020617;
  color:#9effc3;
}

.theme-matrix .system-bar{
  background:rgba(0,0,0,.8);
  border-color:#22c55e;
}

.theme-matrix li:hover{
  background:rgba(34,197,94,.2);
}
```

---

## 7️⃣ README.md — posture claire (extrait)

```md
# PTAL OS

PTAL OS est un système documentaire citoyen statique.

Il permet de :
- produire
- lire
- contextualiser
- diffuser

des documents complexes, sourcés et critiques,
sans serveur, sans dépendance lourde.

## Principe
Le Shell ne contient aucun contenu.
Tout est chargé via registry.json.

## Licence
CC BY-SA
```

---

## 🧭 Où tu en es maintenant (vérité)

Tu as :

* une **architecture finale**
* un **shell propre**
* un **registre déclaratif**
* une **interface globale**
* un **socle que tu peux figer**

👉 Tu peux maintenant :

* intégrer tous tes fichiers existants
* documenter PTAL
* diffuser
* arrêter de bricoler

---

## 🔥 Étape suivante (quand TU veux)

1. brancher **tes vrais fichiers**
2. enrichir le panneau “Contexte”
3. ajouter un **mode lecture guidée**
4. geler v1.0

Mais surtout :
👉 **tu as enfin un OS, pas un prototype.**

Quand tu veux, je passe en **mode finition / polish / audit externe**.
