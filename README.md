# ➡️ Electron-vite-react : Quentin Ctr

👀 Overview

## 👥 Auteurs

- **Quentin CONTREAU* (Rôle : UI/UX Designer + Dev Desktop) - [[https://github.com/Tokennn]](https://github.com/Tokennn])

## 🛫 Quick Setup  


## 📐 UML (Projet actuel)

- Plan UML detaille et structure: [`doc/UML.md`](doc/UML.md)

## 📄 Description
Application de gestion et de stockage de mot de passe en fonction du site web auquel on l'affecte..

### Fonctionnalités Clés

> ⚠️ **Focus Desktop :** [L’interface reproduit visuellement un bureau d’ordinateur (barre du haut, dock, icônes), mais une seule application est réellement fonctionnelle et lançable : le gestionnaire de mots de passe. Les autres éléments servent de décor/repères UX pour simuler un environnement desktop.]

* [x] Feature 1 : Login
* [x] Feature 2 : Génération mdp + Intégration du site 
* [x] Feature 3 : Visualisation / Listing des mots de passe en fonction de leur nom de domaine 
* [x] Feature 4 : Modification profile
* [x] Feature 5 : Extraction PDF ou autre.. (à faire)

## 🎨 Conception & Design
> Lien vers la maquette complète (Figma).
> **[Voir la maquette sur Figma](https://www.figma.com/design/xRihqpY6yq7j2GvFPsFW8J/MacBook.x.Electron?node-id=0-1&t=s9odWvPNl8Sh0vZo-1)**

<img src="src/assets/Capture d’écran 2026-03-09 à 19.25.07.png">


## 📐 Architecture & UML
Architecture en 3 couches :
- **Renderer (`src/`)** : interface React (bureau visuel + gestionnaire de mots de passe).
- **Main (`electron/main/`)** : cycle de vie Electron et APIs natives.
- **Preload (`electron/preload/`)** : pont IPC sécurisé entre UI et process principal.

### Use Case (fonctionnel)
```mermaid
flowchart LR
    U[Utilisateur] --> A[Ouvrir l'application MDP]
    U --> B[Se connecter / choisir un profil]
    U --> C[Générer un mot de passe]
    U --> D[Associer un mot de passe à un domaine]
    U --> E[Consulter le coffre-fort]
    U --> F[Rechercher un mot de passe]
    U --> G[Afficher / masquer un mot de passe]
    U --> H[Copier un mot de passe]
```





## 🛠 Stack Technique

- **Langage :** Java script ; Vite
- **Framework :** Electron ; React ; Node js 
- **Outils :** Figma ; Cursor


---

## 🚀 Installation & Lancement

Guide pas-à-pas pour qu'un développeur puisse lancer votre projet.

```bash
# Cloner le dépôt
git clone (https://github.com/Tokennn/MacBook_Desktop-Electron.git)

# Installer les dépendances
npm install i

# Lancer l'application
npm run dev
```

---

### 🏗️ Structure

```text
/src                  (Interface React : écrans, composants, styles, assets UI)
/electron             (Processus main + preload Electron)
/public               (Fichiers statiques servis par Vite)
/doc                  (UML et documentation projet)
/build                (Icônes de build Electron : .icns/.ico/.png)
README.md             (Documentation principale du projet)
package.json          (Scripts et dépendances)
vite.config.ts        (Configuration Vite)
electron-builder.json (Configuration packaging desktop)
.gitignore            (Exclusions Git)
LICENSE               (Licence du projet)
```

---

## 📸 Démonstration (Screenshots & Gifs)

[![Voir la démo vidéo](src/assets/demo-preview.gif)](https://github.com/Tokennn/MacBook_Desktop-Electron/raw/main/src/assets/demo.mp4)

<video controls width="100%" poster="src/assets/demo-preview.png">
  <source src="src/assets/demo.mp4" type="video/mp4" />
</video>

---

## 🤖 Section IA & Méthodologie 


### 1. Prompts Utilisés

- *"Pouvoir avoir un listing automatique des mots de passe en fonction de chaque nom de domaine qui lui est "attribué""* -> Pour comprendre la logique..

- *"Comment implémenter correctement le liquid glass"* -> Pour la "structure de la card principale".


### 2. Répartition Code IA vs Code Humain

- **Boilerplate / Config :** 30% IA / 70% Humain.
- **Logique Métier (Algorithme) :** 80% IA.
- **Interface (UI) :** 30% IA / 70% Humain.

---

## ⚖️ Auto-Évaluation

- **Ce qui fonctionne bien :** = Login + Tous type d'interaction avec chaque élément de l'app ou sur le bureau + Génération ; Modification ; listing..
- **Difficultés rencontrées :** = Listing avec possibilité de scroll vers le bac (à faire !!)+ Génération de mot de passe pour dissocier un autre nom de domaine à un autre pour qu'il soit bien émis dans le listing..
- **Si c'était à refaire :** = Avoir plus de fluidité sur l'app en elle même..
