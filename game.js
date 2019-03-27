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
	return CardTypes.concat(CardTypes.map((card) => ({ name: card.name + '', image: card.image + '' })))
		.sort(() => 0.5 - Math.random());
}

let app = new Vue({
	el: '#app',
	data: {
		timeElapsed: 0,
		turns: 0,
		matchedPairs: 0,
		secondFlip: false,
		cards: [],
		prevCardIndex: 0,
		cardClasses: {},
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
			this.timeElapsed = 0;
			this.turns = 0;
			this.matchedPairs = 0;
			this.secondFlip = false;
			this.prevCardIndex = 0;
		},
		flipCard(card) {
			//is second flip
			if (card === this.cards[this.prevCardIndex]) {
				console.log("Pick a different card.");
				return;
			}
			if (this.secondFlip) {
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
			} else {
				this.prevCardIndex = this.cards.indexOf(card);
				card.flipped = true;
				this.secondFlip = true;
			}
		},
		checkMatch(firstCard, secondCard) {
			return ((firstCard.name === secondCard.name) ? true : false);
		},
		fileChanged(event) {
			this.file = event.target.files[0]
		},
		async uploadPlayer() {
			try {
				const formData = new FormData();
				formData.append('photo', this.file, this.file.name)
				let res = await axios.post('/api/players', {
					name: req.body.name,
					turns: req.body.turns,
					duration: req.body.duration,
					date: req.body.date,
				});
				this.addItem = res.data;
			} catch (error) {
				console.log(error);
			}
		},
		async getplayers() {
			try {
				let res = await axios.get("/api/players");
				this.players = res.data;
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
		async deleteItem(item) {
			try {
				console.log(item._id)
				let response = await axios.delete("/api/players/" + item._id);
				this.findItem = null;
				this.getplayers();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async editItem(item) {
			try {
				let response = await axios.put("/api/players/" + item._id, {
					title: this.findItem.title,
				});
				this.findItem = null;
				this.getplayers();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
	},
	created() {
		this.resetGame();
	},
})