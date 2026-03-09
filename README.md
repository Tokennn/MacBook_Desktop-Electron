# ➡️ Electron-vite-react : Quentin Ctr

👀 Overview

## 👥 Auteurs

- **Quentin CONTREAU* (Rôle : UI/UX Designer + Dev Desktop) - [[https://github.com/Tokennn]](https://github.com/Tokennn])

## 🛫 Quick Setup  


## 📐 UML (Projet actuel)

- Plan UML detaille et structure: [`doc/UML.md`](doc/UML.md)

```markdown


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
> Pas de diagrammes de classes générés automatiquement et illisibles !
> Seuls les diagrammes **PERTINENTS** pour comprendre la logique métier (Use Case, Sequence, ou un Class Diagram ciblé sur le cœur du système).



**Intégration via Mermaid JS ou PlantUML obligatoire :**




```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant UI as Renderer React
    participant V as Vault State (mémoire)
    participant C as Presse-papiers

    U->>UI: Saisie domaine + clic "Générer"
    UI->>UI: Génération mot de passe
    UI->>V: Ajout entrée {domaine, mot de passe}
    V-->>UI: Liste mise à jour
    UI-->>U: Affichage dans la liste

    U->>UI: Clic "Copier"
    UI->>C: writeText(mot de passe)
    C-->>UI: Confirmation
    UI-->>U: Toast "Mot de passe copié"
```


```mermaid
sequenceDiagram
    participant UI as Renderer React
    participant P as Preload IPC
    participant M as Electron Main
    participant U as electron-updater

    UI->>P: invoke('check-update')
    P->>M: IPC check-update
    M->>U: checkForUpdatesAndNotify()
    U-->>M: update-available / update-not-available
    M-->>UI: send('update-can-available', infos)

    UI->>P: invoke('start-download')
    P->>M: IPC start-download
    M->>U: downloadUpdate()
    U-->>M: download-progress
    M-->>UI: send('download-progress', %)
    U-->>M: update-downloaded
    M-->>UI: send('update-downloaded')
```

## 🛠 Stack Technique

- **Langage :** Java script ; Vite
- **Framework :** Electron ; React ; Node js 
- **Outils :** Figma ; Cursor

---

## 📸 Démonstration (Screenshots & Gifs)

> Une image vaut mille mots, une animation en vaut dix mille.  
> **Les Gifs animés ou courtes vidéos montrant l'interaction sont vivement recommandés.**


| Écran d'accueil | Démo Interaction (Gif) |
| --------------- | ---------------------- |
| Accueil         | Démo                   |


---

## 🚀 Installation & Lancement

Guide pas-à-pas pour qu'un développeur puisse lancer votre projet.

```bash
# Cloner le dépôt
git clone [https://github.com/votre-user/votre-projet.git](https://github.com/votre-user/votre-projet.git)

# Installer les dépendances
npm install / pip install -r requirements.txt

# Lancer l'application
npm start / python main.py
```

---

### 🏗️ Structure

```text
/assets       (Images, logos, Gifs de démo)
/src          (Code source)
/doc          (Exports PDF des maquettes, Diagrammes supplémentaires)
.gitignore    (Indispensable ! Pas de /node_modules ou /bin)
README.md     (Le rapport final complet)
LICENSE       (MIT ou Apache)
```

---

## 📸 Démonstration (Screenshots & Gifs)

> Une image vaut mille mots, une animation en vaut dix mille.  
> **Les Gifs animés ou courtes vidéos montrant l'interaction sont vivement recommandés.**


| Écran d'accueil | Démo Interaction (Gif) |
| --------------- | ---------------------- |
| Accueil         | Démo                   |


---

## 🚀 Installation & Lancement

Guide pas-à-pas pour qu'un développeur puisse lancer votre projet.

```bash
# Cloner le dépôt
git clone [https://github.com/votre-user/votre-projet.git](https://github.com/votre-user/votre-projet.git)

# Installer les dépendances
npm install / pip install -r requirements.txt

# Lancer l'application
npm start / python main.py
```

---

## 🤖 Section IA & Méthodologie (OBLIGATOIRE)

*Transparence totale requise sur l'usage de l'IA (ChatGPT, Copilot, Gemini).*

### 1. Prompts Utilisés

- *"Explique-moi comment centrer une div en CSS grid"* -> Pour comprendre le layout.
- *"Génère une classe User en C#"* -> Pour le boilerplate.

### 2. Modifications Manuelles & Debug

- L'IA a proposé d'utiliser une librairie dépréciée (`x`), nous l'avons remplacée par `y`.
- Le code généré pour la boucle `for` était infini, nous l'avons corrigé manuellement ligne 42.

### 3. Répartition Code IA vs Code Humain

- **Boilerplate / Config :** 80% IA.
- **Logique Métier (Algorithme) :** 100% Humain.
- **Interface (UI) :** 50% IA / 50% Humain.

---

## ⚖️ Auto-Évaluation

- **Ce qui fonctionne bien :** ...
- **Difficultés rencontrées :** ...
- **Si c'était à refaire :** ...

```

```
