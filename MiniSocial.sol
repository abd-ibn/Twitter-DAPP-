// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MiniSocial {
    struct Post {
        string message;
        address author;
        uint likes;
        uint dislikes;
        uint timestamp;
        uint lastModified; // La date de dernière modification
    }

    Post[] public posts;
    mapping(uint => mapping(address => bool)) public likedPosts;
    mapping(uint => mapping(address => bool)) public dislikedPosts;

    event PostCreated(uint postId, address author, string message, uint timestamp);
    event PostModified(uint postId, string newMessage, uint lastModified);
    event PostLiked(uint postId, address user);
    event PostDisliked(uint postId, address user);

    // Fonction pour publier un message
    function publishPost(string memory _message) public {
        posts.push(Post({
            message: _message,
            author: msg.sender,
            likes: 0,
            dislikes: 0,
            timestamp: block.timestamp,
            lastModified: 0 // Initialement 0 pour indiquer qu'il n'y a pas encore eu de modification
        }));
        emit PostCreated(posts.length - 1, msg.sender, _message, block.timestamp);
    }

    // Fonction pour récupérer un post par index
    function getPost(uint index) public view returns (
        string memory, address, uint, uint, uint, uint
    ) {
        require(index < posts.length, "Index invalide");
        Post memory post = posts[index];
        return (
            post.message,
            post.author,
            post.likes,
            post.dislikes,
            post.timestamp,
            post.lastModified
        );
    }

    // Fonction pour modifier un post (seulement par l'auteur)
    function modifyPost(uint index, string memory newMessage) public {
        require(index < posts.length, "Index invalide");
        require(posts[index].author == msg.sender, "Non autorise");
        posts[index].message = newMessage;
        posts[index].lastModified = block.timestamp; // Mettre à jour la date de modification
        emit PostModified(index, newMessage, block.timestamp);
    }

    // Fonction pour liker un post
    function likePost(uint index) public {
        require(index < posts.length, "Index invalide");
        require(!likedPosts[index][msg.sender], "Deja like");
        if (dislikedPosts[index][msg.sender]) {
            posts[index].dislikes--;
            dislikedPosts[index][msg.sender] = false;
        }
        posts[index].likes++;
        likedPosts[index][msg.sender] = true;
        emit PostLiked(index, msg.sender);
    }

    // Fonction pour disliker un post
    function dislikePost(uint index) public {
        require(index < posts.length, "Index invalide");
        require(!dislikedPosts[index][msg.sender], "Deja dislike");
        if (likedPosts[index][msg.sender]) {
            posts[index].likes--;
            likedPosts[index][msg.sender] = false;
        }
        posts[index].dislikes++;
        dislikedPosts[index][msg.sender] = true;
        emit PostDisliked(index, msg.sender);
    }

    // Fonction pour récupérer le nombre total de posts
    function getTotalPosts() public view returns (uint) {
        return posts.length;
    }
}
