# Idées

## Navigation par défaut

La navigation par défaut se ferait via une interface de chat en bas de la sidebar, probablement sur la gauche.

- **En haut de la sidebar** : Éléments de menu.
- **En bas de la sidebar** : Input pour que l'utilisateur puisse interagir avec l'IA du site.

### Interaction avec l'utilisateur

L'idée est d'inviter l'utilisateur à utiliser cette interface via une question du type :

> "Veux-tu savoir quelque chose sur moi ou peut-être veux-tu nous dire ce que tu cherches?"

En plus d'une réponse textuelle, le site afficherait directement la page la plus logique en fonction de la question posée.

#### Exemples de questions et réponses

- **Question** : Quelle est mon expérience ?
  - **Réponse** : Affichage de la page portfolio.
- **Question** : Comment prendre contact avec moi ?
  - **Réponse** : Affichage de la page contact.

Il serait également possible d'avoir quelques actions directement depuis l'interface de chat, comme par exemple la prise de rendez-vous via un calendrier.

## Navigation classique

Il doit y avoir la possibilité d'une navigation plus classique :

- **Bouton sur la sidebar** : Permet de cacher la sidebar, qui sliderait vers la gauche.
- **Conséquence** : Les éléments de menu disparaissent avec la sidebar.
- **Solution** : Le menu apparaît de façon plus classique en haut.

L'utilisateur doit pouvoir réappeler la sidebar à tout moment.

## Construction de pages avancée

Pour aller plus loin, on pourrait imaginer une construction de pages qui répondrait parfaitement à la demande de l'utilisateur :

- **Granularité** : Au lieu d'afficher uniquement une page existante, construire une page avec des composants de plusieurs pages différentes.
- **Storytelling** : Construire une page avec un storytelling pour répondre à la question.

### Exemple de storytelling

- **Question** : "Qu'est-ce qui me fait dire que tu serais apte à me faire tel type de projet?"
  - **Page construite** :
    - Composants du portfolio filtrés pour correspondre à l'activité de l'utilisateur.
    - Textes qui répondent à la question.
    - Titre : "Pourquoi je suis la personne qu'il vous faut?"
    - Sections avec texte narratif et composants illustratifs.

### Aspects techniques

- **Single Page Application (SPA)** :
  - Utilisation d'un système de conditions pour afficher des composants.
