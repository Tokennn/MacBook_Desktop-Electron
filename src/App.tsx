import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type DragEvent as ReactDragEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import './App.css'
import appStoreIcon from './assets/macos-icons/appstore.png'
import calculatorIcon from './assets/macos-icons/calculator.png'
import cardFindMyIcon from './assets/card-icons/findmy.png'
import cardHomeIcon from './assets/card-icons/home.png'
import cardLockIcon from './assets/card-icons/lock.png'
import cardTranslateIcon from './assets/card-icons/translate.png'
import cardWalletIcon from './assets/card-icons/wallet.png'
import facetimeIcon from './assets/macos-icons/facetime.png'
import mailIcon from './assets/macos-icons/mail.png'
import messagesIcon from './assets/macos-icons/messages.png'
import passwordsIcon from './assets/macos-icons/passwords.png'
import safariIcon from './assets/macos-icons/safari.png'
import settingsIcon from './assets/macos-icons/settings.png'

type MiniApp = {
  id: string
  name: string
  iconSrc: string
  description: string
}

type SidebarGlyph = 'clock' | 'grid' | 'doc' | 'download' | 'cloud'

type SidebarGroup = {
  title: string
  items: { id: string; label: string; glyph: SidebarGlyph }[]
}

type FinderPosition = {
  x: number
  y: number
}

type FinderDragState = {
  pointerId: number
  offsetX: number
  offsetY: number
}

type DesktopIcon = {
  id: string
  appId: string
  x: number
  y: number
}

type DesktopDragState = {
  pointerId: number
  iconId: string
  offsetX: number
  offsetY: number
}

const MENU_ITEMS = ['Finder', 'File', 'Edit', 'View', 'Go', 'Window', 'Help'] as const

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    title: 'Favorites',
    items: [
      { id: 'recents', label: 'Recents', glyph: 'clock' },
      { id: 'applications', label: 'Applications', glyph: 'grid' },
      { id: 'documents', label: 'Documents', glyph: 'doc' },
      { id: 'downloads', label: 'Downloads', glyph: 'download' },
    ],
  },
  {
    title: 'iCloud',
    items: [{ id: 'icloud', label: 'iCloud Drive', glyph: 'cloud' }],
  },
]

const FINDER_APPS: MiniApp[] = [
  {
    id: 'wallet-app',
    name: 'Cards',
    iconSrc: cardWalletIcon,
    description: 'Quick access to cards and payment shortcuts.',
  },
  {
    id: 'home-app',
    name: 'Home',
    iconSrc: cardHomeIcon,
    description: 'Open connected-home controls and scenes.',
  },
  {
    id: 'locate-app',
    name: 'Locate',
    iconSrc: cardFindMyIcon,
    description: 'Track devices and secure workspace locations.',
  },
  {
    id: 'translate-app',
    name: 'Translate',
    iconSrc: cardTranslateIcon,
    description: 'Open translation tools for quick text checks.',
  },
  {
    id: 'vault-app',
    name: 'Lock',
    iconSrc: cardLockIcon,
    description: 'Open password management actions.',
  },
]

const DESKTOP_SHORTCUTS: MiniApp[] = [
  {
    id: 'mdp-shortcut',
    name: 'MDP',
    iconSrc: passwordsIcon,
    description: 'Open password management actions.',
  },
]

const DOCK_APPS: MiniApp[] = [
  {
    id: 'messages-app',
    name: 'Messages',
    iconSrc: messagesIcon,
    description: 'Open messages for your workspace updates.',
  },
  {
    id: 'video-app',
    name: 'FaceTime',
    iconSrc: facetimeIcon,
    description: 'Start a video call with your collaborators.',
  },
  {
    id: 'settings-app',
    name: 'Settings',
    iconSrc: settingsIcon,
    description: 'Open settings for your desktop session.',
  },
  {
    id: 'calculator-app',
    name: 'Calculator',
    iconSrc: calculatorIcon,
    description: 'Open calculator for quick checks.',
  },
  {
    id: 'appstore-app',
    name: 'App Store',
    iconSrc: appStoreIcon,
    description: 'Browse available applications.',
  },
  {
    id: 'safari-app',
    name: 'Safari',
    iconSrc: safariIcon,
    description: 'Open browser shortcuts for your workflow.',
  },
  {
    id: 'mail-app',
    name: 'Mail',
    iconSrc: mailIcon,
    description: 'Check incoming emails and notices.',
  },
]

const ALL_APPS = [...FINDER_APPS, ...DESKTOP_SHORTCUTS, ...DOCK_APPS]
const APP_MAP = new Map(ALL_APPS.map((app) => [app.id, app]))

const CLOCK_FORMATTER = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

const INITIAL_FINDER_POSITION: FinderPosition = { x: 72, y: 70 }
const DESKTOP_ICON_WIDTH = 86
const DESKTOP_ICON_HEIGHT = 96
const DESKTOP_ICON_SAFE_GAP = 8
const FINDER_DRAG_APP_TYPE = 'application/x-mini-desktop-app'
const FINDER_DRAG_SOURCE_TYPE = 'application/x-mini-desktop-source'

const INITIAL_DESKTOP_ICONS: Array<{ id: string; appId: string; y: number }> = [
  { id: 'desktop-mdp', appId: 'mdp-shortcut', y: 34 },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function clampDesktopPosition(x: number, y: number, sceneWidth: number, sceneHeight: number) {
  const maxX = Math.max(
    DESKTOP_ICON_SAFE_GAP,
    sceneWidth - DESKTOP_ICON_WIDTH - DESKTOP_ICON_SAFE_GAP,
  )
  const maxY = Math.max(
    DESKTOP_ICON_SAFE_GAP,
    sceneHeight - DESKTOP_ICON_HEIGHT - DESKTOP_ICON_SAFE_GAP,
  )

  return {
    x: clamp(x, DESKTOP_ICON_SAFE_GAP, maxX),
    y: clamp(y, DESKTOP_ICON_SAFE_GAP, maxY),
  }
}

function renderSidebarGlyph(glyph: SidebarGlyph) {
  if (glyph === 'clock') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true'>
        <circle cx='12' cy='12' r='8.8' />
        <path d='M12 7.4v5.1l3.4 2.3' />
      </svg>
    )
  }

  if (glyph === 'grid') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true'>
        <rect x='3.2' y='3.2' width='7.1' height='7.1' rx='0.2' />
        <rect x='13.7' y='3.2' width='7.1' height='7.1' rx='0.2' />
        <rect x='3.2' y='13.7' width='7.1' height='7.1' rx='0.2' />
        <rect x='13.7' y='13.7' width='7.1' height='7.1' rx='0.2' />
      </svg>
    )
  }

  if (glyph === 'doc') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true'>
        <path d='M7 3.3h7.8l3.2 3.3v14H7z' />
        <path d='M14.8 3.5v3.2h3.1' />
        <path d='M10 13h4.8' />
        <path d='M10 17h6.2' />
      </svg>
    )
  }

  if (glyph === 'download') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true'>
        <path d='M12 4.2v9.4' />
        <path d='M8.2 10.8 12 14.6l3.8-3.8' />
        <path d='M4.2 17.6h15.6v3.3H4.2z' />
      </svg>
    )
  }

  return (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M7.8 18.8h8.8a4.2 4.2 0 0 0 .3-8.4A5.6 5.6 0 0 0 6.1 8.9a4.5 4.5 0 0 0 1.7 9.9Z' />
    </svg>
  )
}

function App() {
  const desktopSceneRef = useRef<HTMLElement | null>(null)
  const finderWindowRef = useRef<HTMLElement | null>(null)
  const finderInitializedRef = useRef(false)
  const desktopIconIdRef = useRef(0)

  const [clockLabel, setClockLabel] = useState(() => CLOCK_FORMATTER.format(new Date()))
  const [finderOpen, setFinderOpen] = useState(true)
  const [finderPosition, setFinderPosition] = useState(INITIAL_FINDER_POSITION)
  const [finderDragState, setFinderDragState] = useState<FinderDragState | null>(null)
  const [desktopDragState, setDesktopDragState] = useState<DesktopDragState | null>(null)
  const [desktopIcons, setDesktopIcons] = useState<DesktopIcon[]>(() => {
    const sceneWidth = typeof window === 'undefined' ? 1280 : window.innerWidth
    const x = Math.max(DESKTOP_ICON_SAFE_GAP, sceneWidth - DESKTOP_ICON_WIDTH - 24)

    return INITIAL_DESKTOP_ICONS.map((icon) => ({
      id: icon.id,
      appId: icon.appId,
      x,
      y: icon.y,
    }))
  })
  const [activeSidebarItem, setActiveSidebarItem] = useState('recents')
  const [activeFinderAppId, setActiveFinderAppId] = useState<string | null>(null)
  const [activeDockAppId, setActiveDockAppId] = useState<string | null>(null)
  const [activeDesktopIconId, setActiveDesktopIconId] = useState<string | null>(null)
  const [loginWindowOpen, setLoginWindowOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClockLabel(CLOCK_FORMATTER.format(new Date()))
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (!toast) {
      return
    }

    const timer = window.setTimeout(() => {
      setToast('')
    }, 1900)

    return () => {
      window.clearTimeout(timer)
    }
  }, [toast])

  useLayoutEffect(() => {
    if (!finderOpen) {
      return
    }

    const syncFinderBounds = () => {
      const scene = desktopSceneRef.current
      const finder = finderWindowRef.current

      if (!scene || !finder) {
        return
      }

      const sceneRect = scene.getBoundingClientRect()
      const finderRect = finder.getBoundingClientRect()
      const maxX = Math.max(0, sceneRect.width - finderRect.width)
      const maxY = Math.max(0, sceneRect.height - finderRect.height)

      setFinderPosition((currentPosition) => {
        if (!finderInitializedRef.current) {
          finderInitializedRef.current = true
          return {
            x: clamp((sceneRect.width - finderRect.width) / 2, 0, maxX),
            y: clamp((sceneRect.height - finderRect.height) / 2, 0, maxY),
          }
        }

        return {
          x: clamp(currentPosition.x, 0, maxX),
          y: clamp(currentPosition.y, 0, maxY),
        }
      })
    }

    syncFinderBounds()
    window.addEventListener('resize', syncFinderBounds)

    return () => {
      window.removeEventListener('resize', syncFinderBounds)
    }
  }, [finderOpen])

  useEffect(() => {
    const keepDesktopIconsInBounds = () => {
      const scene = desktopSceneRef.current

      if (!scene) {
        return
      }

      const sceneRect = scene.getBoundingClientRect()
      setDesktopIcons((currentIcons) =>
        currentIcons.map((icon) => ({
          ...icon,
          ...clampDesktopPosition(icon.x, icon.y, sceneRect.width, sceneRect.height),
        })),
      )
    }

    keepDesktopIconsInBounds()
    window.addEventListener('resize', keepDesktopIconsInBounds)

    return () => {
      window.removeEventListener('resize', keepDesktopIconsInBounds)
    }
  }, [])

  useEffect(() => {
    if (!finderDragState) {
      return
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== finderDragState.pointerId) {
        return
      }

      const scene = desktopSceneRef.current
      const finder = finderWindowRef.current

      if (!scene || !finder) {
        return
      }

      const sceneRect = scene.getBoundingClientRect()
      const finderRect = finder.getBoundingClientRect()
      const maxX = Math.max(0, sceneRect.width - finderRect.width)
      const maxY = Math.max(0, sceneRect.height - finderRect.height)
      const rawX = event.clientX - sceneRect.left - finderDragState.offsetX
      const rawY = event.clientY - sceneRect.top - finderDragState.offsetY

      setFinderPosition({
        x: clamp(rawX, 0, maxX),
        y: clamp(rawY, 0, maxY),
      })
    }

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerId !== finderDragState.pointerId) {
        return
      }

      setFinderDragState(null)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [finderDragState])

  useEffect(() => {
    if (!desktopDragState) {
      return
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== desktopDragState.pointerId) {
        return
      }

      const scene = desktopSceneRef.current

      if (!scene) {
        return
      }

      const sceneRect = scene.getBoundingClientRect()
      const rawX = event.clientX - sceneRect.left - desktopDragState.offsetX
      const rawY = event.clientY - sceneRect.top - desktopDragState.offsetY
      const nextPosition = clampDesktopPosition(rawX, rawY, sceneRect.width, sceneRect.height)

      setDesktopIcons((currentIcons) =>
        currentIcons.map((icon) =>
          icon.id === desktopDragState.iconId
            ? {
                ...icon,
                ...nextPosition,
              }
            : icon,
        ),
      )
    }

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerId !== desktopDragState.pointerId) {
        return
      }

      setDesktopDragState(null)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [desktopDragState])

  const recenterFinder = () => {
    const scene = desktopSceneRef.current
    const finder = finderWindowRef.current

    if (!scene || !finder) {
      return
    }

    const sceneRect = scene.getBoundingClientRect()
    const finderRect = finder.getBoundingClientRect()
    const maxX = Math.max(0, sceneRect.width - finderRect.width)
    const maxY = Math.max(0, sceneRect.height - finderRect.height)

    setFinderPosition({
      x: clamp((sceneRect.width - finderRect.width) / 2, 0, maxX),
      y: clamp((sceneRect.height - finderRect.height) / 2, 0, maxY),
    })
  }

  const openApp = (appId: string, source: 'finder' | 'dock' | 'desktop') => {
    const app = APP_MAP.get(appId)

    if (!app) {
      return
    }

    if (source === 'finder') {
      setActiveFinderAppId(appId)
    }

    if (source === 'dock') {
      setActiveDockAppId(appId)
    }

    setToast(`${app.name}: ${app.description}`)

    if (appId === 'vault-app' || appId === 'mdp-shortcut') {
      setLoginWindowOpen(true)
      setFinderDragState(null)
      setFinderOpen(false)
    }
  }

  const handleFinderMenuClick = (item: (typeof MENU_ITEMS)[number]) => {
    if (item !== 'Finder') {
      return
    }

    if (!finderOpen) {
      finderInitializedRef.current = false
      setFinderOpen(true)
      return
    }

    recenterFinder()
  }

  const handleFinderDragStart = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0) {
      return
    }

    const target = event.target as HTMLElement

    if (target.closest('.window-dots')) {
      return
    }

    const scene = desktopSceneRef.current
    const finder = finderWindowRef.current

    if (!scene || !finder) {
      return
    }

    const sceneRect = scene.getBoundingClientRect()
    const finderRect = finder.getBoundingClientRect()
    const maxX = Math.max(0, sceneRect.width - finderRect.width)
    const maxY = Math.max(0, sceneRect.height - finderRect.height)

    setFinderPosition({
      x: clamp(finderRect.left - sceneRect.left, 0, maxX),
      y: clamp(finderRect.top - sceneRect.top, 0, maxY),
    })

    setFinderDragState({
      pointerId: event.pointerId,
      offsetX: event.clientX - finderRect.left,
      offsetY: event.clientY - finderRect.top,
    })
    event.preventDefault()
  }

  const closeFinder = () => {
    setFinderDragState(null)
    setFinderOpen(false)
  }

  const handleFinderIconDragStart = (
    event: ReactDragEvent<HTMLButtonElement>,
    appId: string,
  ) => {
    event.dataTransfer.setData(FINDER_DRAG_SOURCE_TYPE, 'finder')
    event.dataTransfer.setData(FINDER_DRAG_APP_TYPE, appId)
    event.dataTransfer.effectAllowed = 'copy'
  }

  const handleDesktopSceneDragOver = (event: ReactDragEvent<HTMLElement>) => {
    if (!event.dataTransfer.types.includes(FINDER_DRAG_APP_TYPE)) {
      return
    }

    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }

  const handleDesktopSceneDrop = (event: ReactDragEvent<HTMLElement>) => {
    const source = event.dataTransfer.getData(FINDER_DRAG_SOURCE_TYPE)
    const appId = event.dataTransfer.getData(FINDER_DRAG_APP_TYPE)
    const dropTarget = event.target as HTMLElement

    if (source !== 'finder' || !APP_MAP.has(appId)) {
      return
    }

    if (dropTarget.closest('.finder-window')) {
      return
    }

    event.preventDefault()

    const scene = desktopSceneRef.current

    if (!scene) {
      return
    }

    const sceneRect = scene.getBoundingClientRect()
    const rawX = event.clientX - sceneRect.left - DESKTOP_ICON_WIDTH / 2
    const rawY = event.clientY - sceneRect.top - DESKTOP_ICON_HEIGHT / 2
    const position = clampDesktopPosition(rawX, rawY, sceneRect.width, sceneRect.height)
    const iconId = `desktop-${Date.now()}-${desktopIconIdRef.current}`

    desktopIconIdRef.current += 1

    setDesktopIcons((currentIcons) => [
      ...currentIcons,
      {
        id: iconId,
        appId,
        ...position,
      },
    ])
    setActiveDesktopIconId(iconId)
  }

  const handleDesktopIconPointerDown = (
    event: ReactPointerEvent<HTMLButtonElement>,
    iconId: string,
  ) => {
    if (event.button !== 0) {
      return
    }

    const iconRect = event.currentTarget.getBoundingClientRect()

    setActiveDesktopIconId(iconId)
    setDesktopDragState({
      pointerId: event.pointerId,
      iconId,
      offsetX: event.clientX - iconRect.left,
      offsetY: event.clientY - iconRect.top,
    })
    event.preventDefault()
  }

  return (
    <div className='mac-desktop'>
      <div className='wallpaper'>
        <div className='wallpaper__overlay' />
      </div>

      <header className='top-bar'>
        <div className='top-bar__left'>
          <button className='top-menu top-menu--apple' aria-label='Apple menu'>
            
          </button>
          <nav className='top-menu-list' aria-label='Main menu'>
            {MENU_ITEMS.map((item) => (
              <button key={item} className='top-menu' onClick={() => handleFinderMenuClick(item)}>
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className='top-bar__right'>
          <img
            className='top-status-image top-status-image--battery'
            src='/battery.png'
            alt='Battery status'
            draggable={false}
          />
          <img
            className='top-status-image top-status-image--wifi'
            src='/wifi.png'
            alt='Wi-Fi'
            draggable={false}
          />
          <img
            className='top-status-image top-status-image--choice'
            src='/choice.png'
            alt='Choice'
            draggable={false}
          />
          <img
            className='top-status-image top-status-image--night'
            src='/night.png'
            alt='Night mode'
            draggable={false}
          />
          <span className='top-bar__clock'>{clockLabel}</span>
        </div>
      </header>

      <main
        className='desktop-scene'
        ref={desktopSceneRef}
        onDragOver={handleDesktopSceneDragOver}
        onDrop={handleDesktopSceneDrop}
      >
        {finderOpen && (
          <section
            className='finder-window'
            ref={finderWindowRef}
            style={{
              left: finderPosition.x,
              top: finderPosition.y,
            }}
          >
            <header
              className={`finder-window__toolbar ${finderDragState ? 'is-dragging' : ''}`}
              onPointerDown={handleFinderDragStart}
            >
              <div className='window-dots'>
                <button
                  className='window-dot window-dot--red'
                  aria-label='Close Finder'
                  onClick={closeFinder}
                />
                <button className='window-dot window-dot--yellow' aria-label='Minimize Finder' onClick={closeFinder} />
                <button className='window-dot window-dot--green' aria-label='Center Finder' onClick={recenterFinder} />
              </div>

              <h1 className='finder-window__title'>
                <svg className='finder-window__folder' viewBox='0 0 18 14' aria-hidden='true'>
                  <path d='M1.5 2.8h4.7l1.6 1.8h8.7v6.7H1.5z' />
                </svg>
                <span>Recents</span>
              </h1>
            </header>

            <div className='finder-window__content'>
              <aside className='finder-sidebar'>
                {SIDEBAR_GROUPS.map((group) => (
                  <section key={group.title} className='finder-sidebar__group'>
                    <p className='finder-sidebar__heading'>{group.title}</p>
                    {group.items.map((item) => {
                      const isActive = activeSidebarItem === item.id

                      return (
                        <button
                          key={item.id}
                          className={`finder-sidebar__item ${isActive ? 'is-active' : ''}`}
                          onClick={() => {
                            setActiveSidebarItem(item.id)
                          }}
                        >
                          <span className='sidebar-glyph' aria-hidden='true'>
                            {renderSidebarGlyph(item.glyph)}
                          </span>
                          <span>{item.label}</span>
                        </button>
                      )
                    })}
                  </section>
                ))}
              </aside>

              <section className='finder-panel'>
                <div className='finder-icons'>
                  {FINDER_APPS.map((app) => (
                    <button
                      key={app.id}
                      className={`finder-icon ${activeFinderAppId === app.id ? 'is-active' : ''}`}
                      onClick={() => openApp(app.id, 'finder')}
                      onDragStart={(event) => handleFinderIconDragStart(event, app.id)}
                      draggable
                      title={app.name}
                      aria-label={app.name}
                    >
                      <img
                        className='icon-image icon-image--finder'
                        src={app.iconSrc}
                        alt=''
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </section>
        )}

        <div className='desktop-icons-layer'>
          {desktopIcons.map((desktopIcon) => {
            const app = APP_MAP.get(desktopIcon.appId)

            if (!app) {
              return null
            }

            const isActive = activeDesktopIconId === desktopIcon.id
            const isDragging = desktopDragState?.iconId === desktopIcon.id

            return (
              <button
                key={desktopIcon.id}
                className={`desktop-icon ${isActive ? 'is-active' : ''} ${isDragging ? 'is-dragging' : ''}`}
                style={{
                  left: desktopIcon.x,
                  top: desktopIcon.y,
                }}
                onPointerDown={(event) => handleDesktopIconPointerDown(event, desktopIcon.id)}
                onClick={() => {
                  setActiveDesktopIconId(desktopIcon.id)
                  openApp(desktopIcon.appId, 'desktop')
                }}
                aria-label={app.name}
              >
                <img
                  className='icon-image icon-image--shortcut'
                  src={app.iconSrc}
                  alt=''
                  draggable={false}
                />
                <span className='desktop-shortcut__tag'>{app.name}</span>
              </button>
            )
          })}
        </div>

        {loginWindowOpen && (
          <section className='login-space' aria-label='MDP login window'>
            <p className='login-space__label'>LOGIN</p>
            <div className='login-window'>
              <header className='login-window__controls'>
                <div className='window-dots'>
                  <button
                    className='window-dot window-dot--red'
                    aria-label='Close login window'
                    onClick={() => setLoginWindowOpen(false)}
                  />
                  <button className='window-dot window-dot--yellow' aria-label='Minimize login window' />
                  <button className='window-dot window-dot--green' aria-label='Zoom login window' />
                </div>
              </header>

              <div className='login-window__content'>
                <h1 className='login-window__title'>Login</h1>
                <form
                  className='login-form'
                  onSubmit={(event) => {
                    event.preventDefault()
                  }}
                >
                  <label className='sr-only' htmlFor='login-username'>
                    Username
                  </label>
                  <input id='login-username' className='login-input' placeholder='Username' type='text' />

                  <label className='sr-only' htmlFor='login-email'>
                    E-mail
                  </label>
                  <input id='login-email' className='login-input' placeholder='E-mail' type='email' />

                  <label className='sr-only' htmlFor='login-website'>
                    Website
                  </label>
                  <input id='login-website' className='login-input' placeholder='Website' type='text' />
                </form>
              </div>
            </div>
          </section>
        )}

        {toast && <div className='desktop-toast'>{toast}</div>}
      </main>

      <footer className='dock'>
        {DOCK_APPS.map((app) => {
          const isActive = activeDockAppId === app.id

          return (
            <button
              key={app.id}
              className={`dock-item ${isActive ? 'is-active' : ''}`}
              onClick={() => openApp(app.id, 'dock')}
              aria-label={app.name}
            >
              <img
                className='icon-image icon-image--dock'
                src={app.iconSrc}
                alt=''
                draggable={false}
              />
              <span className='dock-item__dot' aria-hidden='true' />
            </button>
          )
        })}
      </footer>
    </div>
  )
}

export default App
