let CardTypes = [{
		name: "vue",
		image: "https://vuejs.org/images/logo.png"
	},
	{
		name: "express",
		image: "https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png"
	},
	{
		name: "mongo",
		image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/527px-MongoDB-Logo.svg.png"
	},
	{
		name: "nodejs",
		image: "https://worldvectorlogo.com/logos/nodejs-icon.svg"
	},
	{
		name: "webpack",
		image: "https://camo.githubusercontent.com/66747a6e05a799aec9c6e04a3e721ca567748e8b/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313336353838312f313931383337332f32653035373166612d376462632d313165332d383436352d3839356632393164343366652e706e67"
	},
	{
		name: "babel",
		image: "https://ih0.redbubble.net/image.370343333.1917/flat,550x550,075,f.jpg"
	},
];

let shuffleCards = () => {
	// let copy = CardTypes.concat(CardTypes);
	return CardTypes.concat(CardTypes.map((card) => ({
			name: card.name + '',
			image: card.image + ''
		})))
		.sort(() => 0.5 - Math.random());
}

let app = new Vue({
	el: '#app',
	data: {
		// log in related
		showLogin: true,
		loggedIn: false,
		loginType: "email",
		loginInput: "",
		username: "",
		email: "",
		emailMessage: "",
		showEmailMessage: false,
		//game related
		timeElapsed: 0,
		duration: 0,
		turns: 0,
		matchedPairs: 0,
		disableClick: false,
		secondFlip: false,
		prevCardIndex: -1,
		gameOver: false,
		//Data
		cards: [],
		cardClasses: {},
		gameRecord: [],
	},
	computed: {
		totalPairs: function () {
			return this.cards.length();
		},
		// shouldDisplay: (card) => {
		// 	//TODO: fixed this logic
		// 	return ((card.flipped && !card.found) ? true : false); 
		// },
	},
	methods: {
		logInWithEmail: function () {
			this.emailMessage = "";
			this.loginType = "email";
			this.showInput = true;
		},
		logInWithUsername: function () {
			this.emailMessage = "";
			this.loginType = "username";
			this.showInput = true;
		},
		closeLogin: function () {
			this.showLogin = false;
			this.emailMessage = "";
			this.showEmailMessage = false;
		},
		closeLoginBecauseLoggedIn: function () {
			if (this.loggedIn) {
				this.showLogin = false;
				this.emailMessage = "";
				this.showEmailMessage = false;
			}
		},
		openLogin: function () {
			this.showLogin = true;
		},
		getLoggedIn: function () {
			this.loggedIn = true;
		},
		handleInput: async function () {
			if (this.loginType === "username") {
				this.username = this.loginInput;
				if (this.username === "morgan_hartman") {
					this.loggedIn = true;
					this.closeLoginBecauseLoggedIn();
					if (this.gameOver) {
						this.endGame();
					}
				}
			} else if (this.loginType === "email") {
				await this.processAPICall();
				this.$nextTick(this.closeLoginBecauseLoggedIn());
				if (this.gameOver) {
					this.endGame();
				}
			} else {
				console.log('error');
				this.emailMessage = "Please enter a valid email address or username."
				this.loggedIn = false;
				this.showEmailMessage = true;
			}
		},
		logOut: function () {
			this.loggedIn = false;
			this.loginInput = "";
			this.username = "";
		},
		processAPICall: async function () {
			var _this = this;
			this.email = this.loginInput;
			console.log(`Email Input is ${this.email}.`);
			const accessKey = "81a42f979a60a5020baa7b1ec7c058e5";
			const url = "http://apilayer.net/api/check?access_key=" + accessKey + "&email=" + this.email;
			await fetch(url)
				.then(function (response) {
					return response.json();
				}).then(function (json) {
					console.log(json);
					if (json.score >= 0.8 || json.format_valid === true) {
						console.log("success");
						_this.emailMessage = "Valid";
						_this.username = _this.email;
						_this.loggedIn = true;
					} else {
						console.log("fail");
						_this.emailMessage = "Please enter a valid email address.";
						_this.loggedIn = false;
					}
				});
			this.showEmailMessage = true;
		},
		resetGame() {
			this.cards = shuffleCards();
			this.cards.forEach((card) => {
				this.$set(card, 'flipped', false);
				this.$set(card, 'found', false);
			});
			this.turns = 0;
			this.matchedPairs = 0;
			this.secondFlip = false;
			this.prevCardIndex = 0;
			this.getGames;
			this.gameOver = false;
		},
		flipCard(card) {
			if (this.turns == 0) {
				this.timer();
			}
			//is second flip
			if (card === this.cards[this.prevCardIndex]) {
				console.log("Pick a different card.");
				return;
			}
			if (this.disableClick) {
				console.log("click not allowed yet");
				return;
			}
			card.flipped = true;
			if (this.secondFlip) {
				this.disableClick = true;
				setTimeout(() => {
					if (this.checkMatch(this.cards[this.prevCardIndex], card)) {
						this.matchedPairs++;
						this.cards[this.prevCardIndex].found = true;
						card.found = true;
						console.log("cards match!");
					} else {
						card.flipped = false;
						this.cards[this.prevCardIndex].flipped = false;
						console.log("cards don't match");
					}
					this.secondFlip = false;
					this.disableClick = false;
					if (this.matchedPairs == this.cards.length / 2) {
						this.endGame();
					}
				}, 1000);
			} else {
				this.prevCardIndex = this.cards.indexOf(card);
				this.secondFlip = true;
			}

			this.turns++;
		},
		checkMatch(firstCard, secondCard) {
			return ((firstCard.name === secondCard.name) ? true : false);
		},
		fileChanged(event) {
			this.file = event.target.files[0]
		},
		endGame() {
			this.gameOver = true;
			alert(`You Won! You completed the game in: ${ this.duration } seconds`);
			if (this.loggedIn) {
				let data = new Object();
				data.name = this.name,
				data.email = this.email,
				data.turns = this.turns,
				data.duration = this.duration,
				data.date = Date(),
				this.uploadPlayer(data);
				window.location = 'http://localhost:2000/leaderboard.html';
			} else {
				this.showLogin = true;
			}
		},
		incrementTime() {
			this.duration++;
			this.timer();
		},
		timer() {
			t = setTimeout(this.incrementTime, 1000);
		},
		async uploadPlayer(game) {
			try {
				let res = await axios.post('/api/games', {
					name: game.name,
					email: game.email,
					turns: game.turns,
					duration: game.duration,
					date: game.date,
				});
				this.gameRecord = res.data;
			} catch (error) {
				console.log(error);
			}
			console.log("uploading game");
		},
		async getGames() {
			try {
				let res = await axios.get("/api/games");
				this.gameRecord = res.data;
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		selectItem(item) {
			console.log(item._id)
			this.findTitle = "";
			this.findItem = item;
		},
		async deleteGame(item) {
			try {
				console.log(item._id)
				let response = await axios.delete("/api/games/" + item._id);
				this.findItem = null;
				this.getGames();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async editGame(item) {
			try {
				let response = await axios.put("/api/games/" + item._id, {
					title: this.findItem.title,
				});
				this.getGames();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
	},
	created() {
		this.resetGame();
		this.showLogin = true;
	},
})