# Plan UML - Macbook.x.ELectron

Ce document decrit un plan UML base sur l'etat actuel du projet Electron + React.

## 1) Scope UML

- UX ciblee: desktop type macOS (Finder, Dock, top bar, desktop shortcuts).
- Couches techniques: Electron Main, Preload Bridge, React Renderer.
- Flux critiques modelises: interactions UI (drag/drop) et mise a jour applicative (IPC + electron-updater).

## 2) Use Case (niveau produit)

```mermaid
flowchart TB
    user((Utilisateur))
    uc1([Lancer l'application desktop])
    uc2([Naviguer dans Finder])
    uc3([Deplacer la fenetre Finder])
    uc4([Glisser une app Finder vers le bureau])
    uc5([Deplacer un raccourci bureau])
    uc6([Activer une app depuis Dock/Finder])
    uc7([Verifier les mises a jour])
    uc8([Telecharger puis installer la mise a jour])

    user --> uc1
    user --> uc2
    user --> uc3
    user --> uc4
    user --> uc5
    user --> uc6
    user --> uc7
    uc7 --> uc8
```

## 3) Component Diagram (niveau architecture)

```mermaid
flowchart LR
    user[Utilisateur]
    renderer[Renderer React<br/>src/App.tsx]
    preload[Preload Bridge<br/>electron/preload/index.ts]
    main[Electron Main<br/>electron/main/index.ts]
    updater[Updater Service<br/>electron/main/update.ts]
    server[(Release Server)]
    window[BrowserWindow]
    assets[(Icons et assets UI)]
    updateui[Update UI<br/>src/components/update/*]

    user --> renderer
    assets --> renderer
    renderer -->|window.ipcRenderer| preload
    preload -->|ipcMain.handle / webContents.send| main
    main --> window
    main --> updater
    updater --> server
    updateui -. module disponible .-> renderer
```

## 4) Diagramme UML stylise (proche du rendu de ton exemple)

```plantuml
@startuml
title UML - Macbook.x.ELectron (Styled Class View)
top to bottom direction

skinparam backgroundColor #C8CED6
skinparam shadowing false
skinparam linetype polyline
skinparam ArrowColor #2F3541
skinparam ArrowThickness 1.2
skinparam defaultTextAlignment left
skinparam defaultFontName Arial

skinparam class {
  BackgroundColor #FFFFFF
  BorderColor #2F3541
  FontColor #1F2632
  AttributeIconSize 0
}
skinparam ClassHeaderBackgroundColor #E98A96

class "MacbookXElectron" as System {
  +version: string
  +start()
}

package "Renderer (React)" {
  class MiniApp {
    +id: string
    +name: string
    +iconSrc: string
    +description: string
  }

  class App {
    +clockLabel: string
    +finderOpen: boolean
    +desktopIcons: DesktopIcon[]
    +openCard(appId, source)
    +handleDesktopSceneDrop(event)
  }

  class FinderWindow {
    +position: FinderPosition
    +dragState: FinderDragState?
    +close()
    +drag()
  }

  class DesktopScene {
    +icons: DesktopIcon[]
    +dropFromFinder(appId, x, y)
    +moveIcon(iconId, x, y)
  }

  class Dock {
    +apps: MiniApp[]
    +activate(appId)
  }

  class UpdateComponent {
    +checkUpdate()
    +startDownload()
    +installNow()
  }
}

package "Electron Bridge" {
  class PreloadBridge {
    +on(channel, listener)
    +off(channel, listener)
    +invoke(channel, ...args)
    +send(channel, ...args)
  }
}

package "Main Process" {
  class MainProcess {
    +createWindow()
    +bindIpcHandlers()
  }

  class UpdateService {
    +checkUpdate()
    +startDownload()
    +quitAndInstall()
  }
}

class AutoUpdater <<external>> {
  +checkForUpdatesAndNotify()
  +downloadUpdate()
  +quitAndInstall()
}

System *-- App
App *-- FinderWindow
App *-- DesktopScene
App *-- Dock
App *-- UpdateComponent
UpdateComponent ..> PreloadBridge : window.ipcRenderer
PreloadBridge ..> MainProcess : ipcMain.handle
MainProcess *-- UpdateService
UpdateService ..> AutoUpdater
DesktopScene --> MiniApp : appId -> app
FinderWindow --> MiniApp : finder apps
Dock --> MiniApp : dock apps
@enduml
```

## 5) Class Diagram cible (coeur interaction UI, Mermaid fallback)

```mermaid
classDiagram
    class App {
      +clockLabel: string
      +finderOpen: boolean
      +finderPosition: FinderPosition
      +desktopIcons: DesktopIcon[]
      +activeSidebarItem: string
      +activeFinderAppId: string?
      +activeDockAppId: string?
      +activeDesktopIconId: string?
      +openCard(appId, source)
      +handleFinderDragStart(event)
      +handleDesktopSceneDrop(event)
      +handleDesktopIconPointerDown(event, iconId)
    }

    class MiniApp {
      +id: string
      +name: string
      +iconSrc: string
      +description: string
    }

    class DesktopIcon {
      +id: string
      +appId: string
      +x: number
      +y: number
    }

    class FinderPosition {
      +x: number
      +y: number
    }

    class FinderDragState {
      +pointerId: number
      +offsetX: number
      +offsetY: number
    }

    class DesktopDragState {
      +pointerId: number
      +iconId: string
      +offsetX: number
      +offsetY: number
    }

    App --> "0..*" MiniApp : lit collections
    App --> "0..*" DesktopIcon : maintient
    App --> FinderPosition : position Finder
    App --> FinderDragState : drag fenetre
    App --> DesktopDragState : drag icone
    DesktopIcon --> MiniApp : reference via appId
```

## 6) Sequence - Drag Finder vers Desktop

```mermaid
sequenceDiagram
    actor U as Utilisateur
    participant F as Finder Icon Button
    participant A as App State (React)
    participant D as Desktop Scene

    U->>F: dragstart(appId)
    F->>A: set DataTransfer(source=finder, appId)
    U->>D: drop
    D->>A: handleDesktopSceneDrop()
    A->>A: verifier source + appId
    A->>A: clampDesktopPosition(x,y)
    A->>A: setDesktopIcons([... + new DesktopIcon])
    A-->>U: re-render icone sur bureau
```

## 7) Sequence - Check Update via IPC

```mermaid
sequenceDiagram
    actor U as Utilisateur
    participant UI as Update Component (Renderer)
    participant P as Preload (ipcRenderer)
    participant M as Main (ipcMain)
    participant AU as autoUpdater

    U->>UI: click "Check update"
    UI->>P: invoke("check-update")
    P->>M: ipcMain.handle("check-update")
    M->>AU: checkForUpdatesAndNotify()
    AU-->>M: update-available / update-not-available
    M-->>P: webContents.send("update-can-available")
    P-->>UI: on("update-can-available")

    U->>UI: click "Update"
    UI->>P: invoke("start-download")
    P->>M: ipcMain.handle("start-download")
    M->>AU: downloadUpdate()
    AU-->>M: download-progress*
    M-->>P: send("download-progress")
    P-->>UI: on("download-progress")
    AU-->>M: update-downloaded
    M-->>P: send("update-downloaded")
    P-->>UI: on("update-downloaded")
    U->>UI: click "Install now"
    UI->>P: invoke("quit-and-install")
    P->>M: ipcMain.handle("quit-and-install")
    M->>AU: quitAndInstall()
```

## 8) State Diagram - Finder Window

```mermaid
stateDiagram-v2
    [*] --> Open
    Open --> Dragging: pointerDown toolbar
    Dragging --> Open: pointerUp/pointerCancel
    Open --> Closed: click red dot
    Closed --> Open: menu Finder clicked
```

## 9) References code

- `src/App.tsx`: modeles UI, etats React, drag/drop Finder/Desktop.
- `electron/preload/index.ts`: exposition securisee `window.ipcRenderer`.
- `electron/main/index.ts`: lifecycle Electron, BrowserWindow, binding update service.
- `electron/main/update.ts`: handlers IPC de mise a jour + pont vers `electron-updater`.
- `src/components/update/index.tsx`: UI de check/download/install update (module present dans le code).
