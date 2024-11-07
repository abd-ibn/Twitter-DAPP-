let web3;
let miniSocialContract;
const contractAddress = "0x2Bc697CDc9117f63024C54A339FDbb9cFc5320Fd"; // Remplacez par l'adresse déployée
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "dislikePost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "likePost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "newMessage",
				"type": "string"
			}
		],
		"name": "modifyPost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "postId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "PostCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "postId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "PostDisliked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "postId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "PostLiked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "postId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newMessage",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lastModified",
				"type": "uint256"
			}
		],
		"name": "PostModified",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "publishPost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "dislikedPosts",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getPost",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalPosts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "likedPosts",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "posts",
		"outputs": [
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "likes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dislikes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastModified",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
let currentAccount;

async function connectWallet() {
    if (window.ethereum) {
        try {
            // Clear any prior connection memory
            await ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] });

            // Request connection to MetaMask and prompt account selection
            await ethereum.request({ method: "eth_requestAccounts" });
            web3 = new Web3(window.ethereum);
            miniSocialContract = new web3.eth.Contract(contractABI, contractAddress);

            const accounts = await web3.eth.getAccounts();
            currentAccount = accounts[0];
            document.getElementById("current-user").textContent = `Connecté en tant que : ${currentAccount}`;

            loadPosts();
        } catch (error) {
            console.error("Erreur de connexion :", error);
        }
    } else {
        alert("Veuillez installer MetaMask !");
    }
}

async function disconnectWallet() {
    // This line attempts to remove the connection permission
    await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }]
    });

    // Clear UI display of the connected user
    currentAccount = null;
    document.getElementById("current-user").textContent = "Utilisateur déconnecté";
    document.getElementById("posts").innerHTML = "";
}

async function publishPost() {
    const message = document.getElementById("new-post").value;
    if (message && miniSocialContract) {
        const accounts = await web3.eth.getAccounts();
        await miniSocialContract.methods.publishPost(message).send({ from: accounts[0] });
        document.getElementById("new-post").value = "";
        loadPosts();
    }
}

async function loadPosts() {
    document.getElementById("posts").innerHTML = "";
    const totalPosts = await miniSocialContract.methods.getTotalPosts().call();
    for (let i = 0; i < totalPosts; i++) {
        const post = await miniSocialContract.methods.getPost(i).call();
        displayPost(i, post);
    }
}

function displayPost(id, post) {
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";
    const timestamp = new Date(post[4] * 1000).toLocaleString();
    const lastModified = post[5] > 0 ? new Date(post[5] * 1000).toLocaleString() : null;
    
    postContainer.innerHTML = `
        <p>${post[0]}</p>
        <p><small>Posté par : ${post[1]}</small></p>
        <p><small>Date : ${timestamp}</small></p>
        ${lastModified ? `<p><small>Modifié : ${lastModified}</small></p>` : ""}
        <p>👍 ${post[2]} | 👎 ${post[3]}</p>
        <button onclick="likePost(${id})">Like</button>
        <button onclick="dislikePost(${id})">Dislike</button>
        ${post[1].toLowerCase() === currentAccount.toLowerCase() ? `<button onclick="modifyPost(${id})">Modifier</button>` : ""}
    `;
    document.getElementById("posts").appendChild(postContainer);
}

async function likePost(id) {
    const accounts = await web3.eth.getAccounts();
    await miniSocialContract.methods.likePost(id).send({ from: accounts[0] });
    loadPosts();
}

async function dislikePost(id) {
    const accounts = await web3.eth.getAccounts();
    await miniSocialContract.methods.dislikePost(id).send({ from: accounts[0] });
    loadPosts();
}

async function modifyPost(id) {
    const newMessage = prompt("Nouveau message :");
    if (newMessage) {
        const accounts = await web3.eth.getAccounts();
        await miniSocialContract.methods.modifyPost(id, newMessage).send({ from: accounts[0] });
        loadPosts();
    }
}

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
            currentAccount = accounts[0];
            document.getElementById("current-user").textContent = `Connecté en tant que : ${currentAccount}`;
            loadPosts();
        });
    }
});
