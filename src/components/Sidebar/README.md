# Sidebar Layout

Ce layout global ajoute une sidebar à gauche de l'application qui prend toute la hauteur de la page. La sidebar est divisée en deux sections principales :

1. **Navigation** (en haut) : Destinée à contenir les onglets de navigation de l'application
2. **Chat IA** (en bas) : Destinée à contenir une interface de chat pour interagir avec une IA

## Structure des fichiers

- `src/components/Sidebar/index.tsx` : Composant de la sidebar
- `src/components/SidebarLayout/index.tsx` : Layout qui intègre la sidebar et le contenu principal
- `src/app/(frontend)/layout.tsx` : Layout principal modifié pour utiliser le SidebarLayout

## Personnalisation

### Modifier la largeur de la sidebar

La largeur de la sidebar est définie dans le composant `Sidebar` avec la classe Tailwind `w-64`. Vous pouvez modifier cette valeur selon vos besoins.

```tsx
<aside className={`h-screen w-64 bg-gray-100 dark:bg-gray-800 flex flex-col ${className}`}>
```

### Ajouter du contenu à la navigation

Pour ajouter des liens de navigation, modifiez le composant `Sidebar` et remplacez le placeholder par votre contenu :

```tsx
{/* Emplacement pour les onglets de navigation */}
<div className="mb-4">
  <h3 className="text-lg font-semibold mb-2">Navigation</h3>
  <nav>
    <ul>
      <li><a href="/">Accueil</a></li>
      <li><a href="/about">À propos</a></li>
      {/* Ajoutez vos liens ici */}
    </ul>
  </nav>
</div>
```

### Implémenter l'interface de chat IA

Pour implémenter l'interface de chat, modifiez le composant `Sidebar` et remplacez le placeholder par votre composant de chat :

```tsx
{/* Emplacement pour l'interface de chat IA */}
<div className="p-4 border-t border-gray-200 dark:border-gray-700">
  <h3 className="text-lg font-semibold mb-2">Chat IA</h3>
  <ChatComponent /> {/* Votre composant de chat */}
</div>
```

## Responsive

Pour rendre la sidebar responsive, vous pouvez ajouter une logique pour la masquer sur les petits écrans et ajouter un bouton pour la faire apparaître/disparaître. 