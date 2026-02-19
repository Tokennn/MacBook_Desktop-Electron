# Chapitre 6 : Le Chef-d'Œuvre (Projet Final) 🚀

C'est le moment de briller. Vous avez 3 jours pour concevoir, développer et livrer une application Desktop fonctionnelle.

Le sujet est **libre**, mais les contraintes de livraison sont **strictes**.

## 6.1 Le Brief : "From Zero to Hero"

Vous devez réaliser une application de bureau qui répond à un besoin (même futile).

**Contraintes Techniques :**

* **Technologie :** Au choix parmi celles vues (.NET MAUI, JavaFX, Python Flet, Electron).
* **Architecture :** MVC ou MVVM obligatoire. Pas de code "spaghetti" dans un seul fichier.
* **Fonctionnalité Desktop "Pure" :** L'application doit obligatoirement interagir avec le système d'exploitation. Exemple : Notifications natives, System Tray (icône près de l'horloge), Raccourcis globaux, Gestion du presse-papier, Drag & Drop depuis le bureau, etc.
* **Versionning :** Git avec des commits réguliers et atomiques.

## 6.2 Le Planning du Sprint (3 Jours)

Gérez votre temps. Un projet fini et simple vaut mieux qu'un projet complexe qui ne compile pas.

## 6.3 Le Rendu : GitHub Public 📦

Votre livrable n'est pas un fichier `.zip`. C'est un lien vers un dépôt **GitHub Public**.

Ce dépôt est votre CV. Il doit être impeccable.

### Structure du Dépôt

```text
/assets       (Images, logos, Gifs de démo)
/src          (Code source)
/doc          (Exports PDF des maquettes, Diagrammes supplémentaires)
.gitignore    (Indispensable ! Pas de /node_modules ou /bin)
README.md     (Le rapport final complet)
LICENSE       (MIT ou Apache)

```

## 6.4 Le `README.md` : Votre Rapport de Projet 📝

Le `README.md` est la pièce maîtresse. Il remplace le rapport PDF classique. Il doit utiliser la syntaxe Markdown avancée (tableaux, code blocks, diagrammes).

**Voici le modèle imposé :**

```markdown
# [Nom du Projet]

![Bannière du projet ou Logo](assets/banner.png)

## 👥 Auteurs
* **Nom Prénom** (Rôle : ex. Lead Dev Backend) - [Lien GitHub]
* **Nom Prénom** (Rôle : ex. UI/UX Designer) - [Lien GitHub]

---

## 📄 Description
Une phrase d'accroche ("Pitch").
Description détaillée de ce que fait l'application, pourquoi elle existe, et à qui elle s'adresse.

### Fonctionnalités Clés

> ⚠️ **Focus Desktop :** [Décrire ici la fonctionnalité native implémentée, ex: "L'application se réduit dans le System Tray et envoie une notification native à la fin d'un téléchargement."]

* [x] Feature 1 (ex: Gestion des utilisateurs)
* [x] Feature 2 (ex: Export PDF)
* [ ] Feature 3 (Non implémentée / À venir)

## 🎨 Conception & Design
> Lien vers la maquette complète (Figma ou Penpot).
> **[Voir la maquette sur Figma](Lien_Public_Figma)**

Insérez ici une vue globale de la maquette exportée en image pour l'aperçu rapide.

## 📐 Architecture & UML
> Pas de diagrammes de classes générés automatiquement et illisibles !
> Seuls les diagrammes **PERTINENTS** pour comprendre la logique métier (Use Case, Sequence, ou un Class Diagram ciblé sur le cœur du système).

**Intégration via Mermaid JS ou PlantUML obligatoire :**

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant App as Application
    participant Sys as Système de Fichiers
    U->>App: Clique sur "Sauvegarder"
    App->>Sys: Écrit le fichier JSON
    Sys-->>App: Confirmation écriture
    App-->>U: Affiche Notification Native
```

## 🛠 Stack Technique
* **Langage :** (ex: Python 3.10)
* **Framework :** (ex: Flet)
* **Outils :** (ex: VS Code, Figma)

---

## 📸 Démonstration (Screenshots & Gifs)
> Une image vaut mille mots, une animation en vaut dix mille.
> **Les Gifs animés ou courtes vidéos montrant l'interaction sont vivement recommandés.**

| Écran d'accueil | Démo Interaction (Gif) |
| :---: | :---: |
| ![Accueil](assets/screenshot1.png) | ![Démo](assets/demo.gif) |

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

_Transparence totale requise sur l'usage de l'IA (ChatGPT, Copilot, Gemini)._

### 1. Prompts Utilisés
- _"Explique-moi comment centrer une div en CSS grid"_ -> Pour comprendre le layout.
- _"Génère une classe User en C#"_ -> Pour le boilerplate.

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

# Chapitre 6 : Le Chef-d'Œuvre (Projet Final) 🚀

C'est le moment de briller. Vous avez 3 jours pour concevoir, développer et livrer une application Desktop fonctionnelle.

Le sujet est **libre**, mais les contraintes de livraison sont **strictes**.

## 6.1 Le Brief : "From Zero to Hero"

Vous devez réaliser une application de bureau qui répond à un besoin (même futile).

**Contraintes Techniques :**

* **Technologie :** Au choix parmi celles vues (.NET MAUI, JavaFX, Python Flet, Electron).
* **Architecture :** MVC ou MVVM obligatoire. Pas de code "spaghetti" dans un seul fichier.
* **Fonctionnalité Desktop "Pure" :** L'application doit obligatoirement interagir avec le système d'exploitation. Exemple : Notifications natives, System Tray (icône près de l'horloge), Raccourcis globaux, Gestion du presse-papier, Drag & Drop depuis le bureau, etc.
* **Versionning :** Git avec des commits réguliers et atomiques.

## 6.2 Le Planning du Sprint (3 Jours)

Gérez votre temps. Un projet fini et simple vaut mieux qu'un projet complexe qui ne compile pas.

## 6.3 Le Rendu : GitHub Public 📦

Votre livrable n'est pas un fichier `.zip`. C'est un lien vers un dépôt **GitHub Public**.

Ce dépôt est votre CV. Il doit être impeccable.

### Structure du Dépôt

```text
/assets       (Images, logos, Gifs de démo)
/src          (Code source)
/doc          (Exports PDF des maquettes, Diagrammes supplémentaires)
.gitignore    (Indispensable ! Pas de /node_modules ou /bin)
README.md     (Le rapport final complet)
LICENSE       (MIT ou Apache)

```

## 6.4 Le `README.md` : Votre Rapport de Projet 📝

Le `README.md` est la pièce maîtresse. Il remplace le rapport PDF classique. Il doit utiliser la syntaxe Markdown avancée (tableaux, code blocks, diagrammes).

**Voici le modèle imposé :**

```markdown
# [Nom du Projet]

![Bannière du projet ou Logo](assets/banner.png)

## 👥 Auteurs
* **Nom Prénom** (Rôle : ex. Lead Dev Backend) - [Lien GitHub]
* **Nom Prénom** (Rôle : ex. UI/UX Designer) - [Lien GitHub]

---

## 📄 Description
Une phrase d'accroche ("Pitch").
Description détaillée de ce que fait l'application, pourquoi elle existe, et à qui elle s'adresse.

### Fonctionnalités Clés

> ⚠️ **Focus Desktop :** [Décrire ici la fonctionnalité native implémentée, ex: "L'application se réduit dans le System Tray et envoie une notification native à la fin d'un téléchargement."]

* [x] Feature 1 (ex: Gestion des utilisateurs)
* [x] Feature 2 (ex: Export PDF)
* [ ] Feature 3 (Non implémentée / À venir)

## 🎨 Conception & Design
> Lien vers la maquette complète (Figma ou Penpot).
> **[Voir la maquette sur Figma](Lien_Public_Figma)**

Insérez ici une vue globale de la maquette exportée en image pour l'aperçu rapide.

## 📐 Architecture & UML
> Pas de diagrammes de classes générés automatiquement et illisibles !
> Seuls les diagrammes **PERTINENTS** pour comprendre la logique métier (Use Case, Sequence, ou un Class Diagram ciblé sur le cœur du système).

**Intégration via Mermaid JS ou PlantUML obligatoire :**

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant App as Application
    participant Sys as Système de Fichiers
    U->>App: Clique sur "Sauvegarder"
    App->>Sys: Écrit le fichier JSON
    Sys-->>App: Confirmation écriture
    App-->>U: Affiche Notification Native
```

## 🛠 Stack Technique
* **Langage :** (ex: Python 3.10)
* **Framework :** (ex: Flet)
* **Outils :** (ex: VS Code, Figma)

---

## 📸 Démonstration (Screenshots & Gifs)
> Une image vaut mille mots, une animation en vaut dix mille.
> **Les Gifs animés ou courtes vidéos montrant l'interaction sont vivement recommandés.**

| Écran d'accueil | Démo Interaction (Gif) |
| :---: | :---: |
| ![Accueil](assets/screenshot1.png) | ![Démo](assets/demo.gif) |

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

_Transparence totale requise sur l'usage de l'IA (ChatGPT, Copilot, Gemini)._

### 1. Prompts Utilisés
- _"Explique-moi comment centrer une div en CSS grid"_ -> Pour comprendre le layout.
- _"Génère une classe User en C#"_ -> Pour le boilerplate.

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

``````