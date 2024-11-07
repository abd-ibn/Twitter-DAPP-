# Mini Twitter DApp

This project is a decentralized mini Twitter application built with Solidity, Web3.js, and MetaMask. It leverages the Ethereum blockchain to enable users to publish, edit, like, and dislike posts in a transparent and secure manner. The application includes a smart contract, `MiniSocial.sol`, which manages the posts, access control, and interaction history on-chain. Users can connect their MetaMask wallets, allowing them to interact with the blockchain, publish posts, like/dislike content, and modify their own posts only. The front-end interface is designed in JavaScript and includes login/logout functionality to enable easy testing with multiple accounts. Each post displays both its publication date and, if applicable, a last modified date, providing a seamless and user-centered decentralized experience.

## Features

- **Connect to Wallet**  
  Connect your MetaMask wallet to interact with the blockchain.

- **Switch User**  
  Disconnect and connect with a different MetaMask account to test the app under various users.

- **News Feed to View Posts**  
  Displays all posts published by users, including their creation and modification dates (if applicable).

- **Add a Post (with user ID)**  
  Publish a message with your user ID (Ethereum address).

- **Like and Dislike**  
  Like or dislike posts to interact with content.

- **Display the Number of Likes, Dislikes, and the Post Date**  
  Each post shows the number of likes and dislikes it has received, as well as the date it was published.

- **Modify a Post and Show the Date of Modification**  
  Only the post owner can modify it. If a post is modified, the date of modification is displayed.

