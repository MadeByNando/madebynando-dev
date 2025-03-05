# Persistance et Animations de la Sidebar

Ce document explique comment les composants `Sidebar` et `SidebarHeader` sont optimisés pour persister entre les navigations et comment leurs animations sont gérées.

## Table des matières

1. [Problématique](#problématique)
2. [Solution implémentée](#solution-implémentée)
3. [Architecture des composants](#architecture-des-composants)
4. [Techniques de persistance](#techniques-de-persistance)
5. [Animations et transitions](#animations-et-transitions)
6. [Meilleures pratiques](#meilleures-pratiques)
7. [Troubleshooting](#troubleshooting)

## Problématique

Dans une application Next.js, les composants sont généralement remontés (re-rendus depuis zéro) lors des changements de page. Cela peut créer un effet de clignotement indésirable pour les éléments d'interface utilisateur persistants comme la sidebar ou la navigation.

**Comportement observé :**

- En mode développement : Les composants persistent naturellement entre les navigations
- En mode production : Les composants sont remontés à chaque changement de page, créant un effet de clignotement

L'objectif était d'harmoniser le comportement entre les deux modes et d'assurer une expérience utilisateur fluide sans clignotement.

## Solution implémentée

Nous avons implémenté une architecture à trois niveaux utilisant `React.memo` avec des fonctions de comparaison personnalisées pour permettre aux composants de persister entre les navigations.

### Vue d'ensemble

1. **Composants persistants** : 
   - `PersistentSidebar` et `PersistentSidebarHeader` qui ne se remontent pas entre les navigations

2. **Gestion d'état intelligente** :
   - États locaux pour le suivi du montage (`isMounted`)
   - État persistant via `useLocalStorage` pour les préférences utilisateur

3. **Animations optimisées** :
   - Transitions CSS contrôlées par l'état des composants
   - Animations avec performances améliorées (will-change, backface-visibility)

## Architecture des composants

Le système est composé de trois composants principaux qui interagissent ensemble :

### 1. SidebarLayout

```tsx
// Composant layout principal qui contient et orchestre les autres composants
export const SidebarLayout = React.memo(
  ({ children }: SidebarLayoutProps) => {
    // États et hooks
    const [isMounted, setIsMounted] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useLocalStorage<boolean>('sidebarOpen', true)
    const [headerVisible, setHeaderVisible] = useState(false)
    
    // Le reste du code...
    
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Composants persistants */}
        <PersistentSidebarHeader isVisible={headerVisible} />
        <PersistentSidebar onToggle={handleSidebarToggle} />
        
        {/* Contenu principal */}
        <main>
          {children}
        </main>
      </div>
    )
  },
  // Fonction de comparaison qui permet toujours les re-rendus pour les enfants
  () => false
)
```

### 2. Sidebar

```tsx
export const Sidebar = React.memo(
  ({ className, onToggle }: SidebarProps) => {
    // États et hooks
    const [isMounted, setIsMounted] = useState(false)
    const [isOpen, setIsOpen] = useLocalStorage<boolean>('sidebarOpen', true)
    
    // Le reste du code...
    
    return (
      <div className="relative">
        {/* Sidebar avec animation conditionnelle */}
        <aside className={/* classes dynamiques basées sur l'état */}>
          {/* Contenu de la sidebar */}
        </aside>
        
        {/* Bouton d'ouverture */}
        {isMounted && !isOpen && (
          <button onClick={toggleSidebar}>
            {/* Icône */}
          </button>
        )}
      </div>
    )
  },
  // Ne re-rendre que si les props importantes changent
  (prevProps, nextProps) => 
    prevProps.onToggle === nextProps.onToggle && 
    prevProps.className === nextProps.className
)
```

### 3. SidebarHeader

```tsx
export const SidebarHeader = React.memo(
  ({ isVisible }: SidebarHeaderProps) => {
    // États et refs
    const [isMounted, setIsMounted] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)
    const headerRef = useRef<HTMLDivElement>(null)
    
    // Gestion de l'animation de disparition
    useEffect(() => {
      if (!headerRef.current) return
      
      const handleAnimationEnd = (e: AnimationEvent) => {
        if (e.animationName.includes('slideOutToRight') && !isVisible) {
          setShouldRender(false)
        }
      }
      
      // Code d'ajout/suppression d'eventListener...
    }, [isVisible])
    
    // Le reste du code...
    
    return (
      <header
        ref={headerRef}
        className={`/* classes */ ${animationClass}`}
      >
        {/* Contenu du header */}
      </header>
    )
  },
  // Ne re-rendre que si la visibilité change
  (prevProps, nextProps) => prevProps.isVisible === nextProps.isVisible
)
```

## Techniques de persistance

### 1. Utilisation de React.memo

L'utilisation de `React.memo` permet d'éviter les re-rendus inutiles en mémorisant le composant et en le re-rendant uniquement si ses props changent selon des critères spécifiques.

```tsx
// Pour la Sidebar - persistance complète, ignorant les changements de pathname
const PersistentSidebar = React.memo(
  (props) => <Sidebar {...props} />,
  () => true // Toujours retourner true pour garantir la persistance
)

// Pour le SidebarHeader - re-rendre uniquement si isVisible change
const PersistentSidebarHeader = React.memo(
  (props) => <SidebarHeader {...props} />,
  (prevProps, nextProps) => prevProps.isVisible === nextProps.isVisible
)
```

### 2. Gestion du montage

Pour éviter les problèmes d'hydratation et assurer un comportement cohérent entre SSR et client :

```tsx
// État pour suivre si le composant est monté
const [isMounted, setIsMounted] = useState(false)
const mountedRef = useRef(false)

// Initialisation unique au montage
useEffect(() => {
  if (!mountedRef.current) {
    mountedRef.current = true
    setIsMounted(true)
  }
}, [])
```

### 3. Persistance des préférences utilisateur

L'état d'ouverture de la sidebar est persisté entre les sessions :

```tsx
const [sidebarOpen, setSidebarOpen] = useLocalStorage<boolean>('sidebarOpen', true)
```

## Animations et transitions

### 1. Animations CSS avec keyframes

```css
/* Animations de slide pour le header */
@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
    visibility: visible;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }
}

@keyframes slideOutToRight {
  0% {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
    visibility: hidden;
  }
}
```

### 2. Classes d'animation appliquées conditionnellement

```tsx
// Détermine la classe d'animation à appliquer
const animationClass = isMounted
  ? isVisible
    ? 'header-slide-in'
    : shouldRender
      ? 'header-slide-out'
      : 'hidden'
  : 'hidden'
```

### 3. Optimisation des performances d'animation

```css
.header-slide-in, .header-slide-out {
  animation: /* ... */ cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### 4. Nettoyage après l'animation

Pour éviter les fuites de mémoire et les comportements inattendus :

```tsx
useEffect(() => {
  // Code d'ajout d'eventListener...
  
  return () => {
    // Nettoyage de l'eventListener
    headerRef.current?.removeEventListener('animationend', handleAnimationEnd)
  }
}, [isVisible])
```

## Meilleures pratiques

1. **Séparation des préoccupations** : Chaque composant a une responsabilité unique
2. **Mémorisation intelligente** : Utilisation ciblée de React.memo avec des fonctions de comparaison personnalisées
3. **Hooks personnalisés** : Utilisation de useLocalStorage pour persister les préférences utilisateur
4. **Performances d'animation optimisées** : Utilisation de will-change, backface-visibility et cubic-bezier
5. **Code maintenable** : Structure, commentaires, constantes extraites et typage strict

## Conclusion

Cette implémentation offre une expérience utilisateur fluide en garantissant que les composants Sidebar et SidebarHeader persistent entre les navigations, tout en maintenant des animations élégantes et des performances optimales. Les techniques utilisées peuvent être adaptées à d'autres composants de l'interface qui bénéficieraient d'une persistance similaire. 