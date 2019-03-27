

let app = new Vue({
	el: '#app',
	data: {
		timeElapsed: 0,
		turns: 0,
		matchedPairs: 0,
		cards: [],
		cardClasses: {},
		CardTypes = [
			{ name: "vue", description: "javascript structure language" },
			{ name: "express", description: "good language" },
			{ name: "mongo", description: "database" },
			{ name: "nodejs", description: "other stuff" },
			{ name: "webpack", description: "idk" },
			{ name: "babel", description: "weird af" },
		]
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
		checkMatch: function () {

		},
		shuffleCards: function () {
			return CardTypes;
		}
	},
	created() {
		this.resetGame();
		this.shuffleCards();
	},
})