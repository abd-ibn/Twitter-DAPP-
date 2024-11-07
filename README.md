# Mini Twitter DApp

This project is a decentralized mini Twitter application built with Solidity, Web3.js, and MetaMask. It leverages the Ethereum blockchain to enable users to publish, edit, like, and dislike posts in a transparent and secure manner. The application includes a smart contract, `MiniSocial.sol`, which manages the posts, access control, and interaction history on-chain. Users can connect their MetaMask wallets, allowing them to interact with the blockchain, publish posts, like/dislike content, and modify their own posts only. The front-end interface is designed in JavaScript and includes login/logout functionality to enable easy testing with multiple accounts. Each post displays both its publication date and, if applicable, a last modified date, providing a seamless and user-centered decentralized experience.

## Fonctionnalités

- **Se connecter au Wallet**  
  Connectez-vous à votre portefeuille MetaMask pour interagir avec la blockchain.
  
- **Possibilité de changer l'utilisateur**  
  Déconnectez-vous et connectez-vous avec un autre compte MetaMask pour tester l'application sous différents utilisateurs.

- **Fil d'actualité pour voir les posts**  
  Affiche tous les posts publiés par les utilisateurs, avec leurs dates de création et de modification (si applicable).

- **Ajouter un post (avec l'id de l'utilisateur)**  
  Publiez un message avec votre ID d'utilisateur (adresse Ethereum).

- **Faire un Like, dislike**  
  Aimez ou n’aimez pas les posts pour interagir avec le contenu.

- **Afficher le nombre de Like et de Dislike, ainsi que la date du post**  
  Chaque post affiche le nombre de likes et de dislikes qu'il a reçus, ainsi que la date de sa publication.

- **Modifier un post et afficher la date de modification**  
  Seul le propriétaire du post peut le modifier. Si un post est modifié, la date de modification est affichée.
