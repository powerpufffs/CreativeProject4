let CardTypes = [{
		name: "vue",
		image: "https://vuejs.org/images/logo.png"
	},
	{
		name: "express",
		image: "https://coligo.io/images/express.svg"
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
		image: "https://babeljs.io/images/logo.svg"
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
		startTime: 0,
		duration: 0,
		turns: 0,
		matchedPairs: 0,
		disableClick: false,
		secondFlip: false,
		cards: [],
		prevCardIndex: 0,
		cardClasses: {},
		playerInfo: {
			name: '',
			email: '',
			turns: '',
			duration: '',
			date: '',
		},
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
		resetGame() {
			this.cards = shuffleCards();
			this.cards.forEach((card) => {
				this.$set(card, 'flipped', false);
				this.$set(card, 'found', false);
			});
			this.startTime = 0;
			this.turns = 0;
			this.matchedPairs = 0;
			this.secondFlip = false;
			this.prevCardIndex = 0;
			this.getGames;
		},
		flipCard(card) {
			if (this.turns == 0) {
				this.startTime = new Date();
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
			alert(`You Won! You completed the game in: ${ this.duration } seconds`);
			this.playerInfo.turns = this.turns;
			this.playerInfo.duration = this.duration;
			this.uploadPlayer();
			// window.location = 'http://localhost:2000/leaderboard.html';
		},
		incrementTime() {
			this.duration++;
			this.timer();
		},
		timer() {
			t = setTimeout(this.incrementTime, 1000);
		},
		async uploadPlayer() {
			try {
				let res = await axios.post('/api/games', {
					name: req.body.name,
					email: req.body.email,
					turns: req.body.turns,
					duration: req.body.duration,
					date: req.body.date,
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
		// selectItem(item) {
		// 	console.log(item._id)
		// 	this.findTitle = "";
		// 	this.findItem = item;
		// },
		// async deleteGame(item) {
		// 	try {
		// 		console.log(item._id)
		// 		let response = await axios.delete("/api/games/" + item._id);
		// 		this.findItem = null;
		// 		this.getGames();
		// 		return true;
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// },
		// async editGame(item) {
		// 	try {
		// 		let response = await axios.put("/api/games/" + item._id, {
		// 			title: this.findItem.title,
		// 		});
		// 		this.getGames();
		// 		return true;
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// },
	},
	created() {
		this.resetGame();
	},
})