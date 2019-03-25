let CardTypes = [
	{ name: "vue", image: "https://vuejs.org/images/logo.png" },
	{ name: "express", image: "https://coligo.io/images/express.svg" },
	{ name: "mongo", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/527px-MongoDB-Logo.svg.png" },
	{ name: "nodejs", image: "https://worldvectorlogo.com/logos/nodejs-icon.svg" },
	{ name: "webpack", image: "https://camo.githubusercontent.com/66747a6e05a799aec9c6e04a3e721ca567748e8b/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313336353838312f313931383337332f32653035373166612d376462632d313165332d383436352d3839356632393164343366652e706e67" },
	{ name: "babel", image: "https://babeljs.io/images/logo.svg" },
];

let shuffleCards = () => {
	return CardTypes;
}

let app = new Vue({
	el: '#app',
	data: {
		timeElapsed: 0,
		turns: 0,
		matchedPairs: 0,
		cards: [],
		cardClasses: {},
	},
	computed: {
		totalPairs: function() {
			return cards.length();
		},
	},
	methods: {
		resetGame() {
			this.cards = shuffleCards();
			this.cards.forEach((card) => {
				this.$set(card, 'flipped', false);
				this.$set(card, 'found', false);

				// card.flipped = false;
				// card.found = false;
			});
			
			this.timeElapsed = 0;
			this.turns = 0;
			this.matchedPairs = 0;
		},
		flipCard(card) {		
			//TODO: Logic for point updating etc
			card.flipped = !card.flipped;
			console.log(card.flipped);
		},	
		checkMatch() {

		},
	},
	created() {
		this.resetGame();
	},
})