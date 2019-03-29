var leaderboard = new Vue({
    el: '#leaderboard',
    data: {
      items: [],
    },
    methods: {
        async getGames() {
			try {
				let res = await axios.get("/api/games");
				this.gameRecord = res.data;
				return true;
			} catch (error) {
				console.log(error);
			}
        },
        returnToGame: function() {
            window.location = 'http://localhost:2000/game.html';
        }
    },
    computed: {

    },
    created() {
      this.getItems();
    },
  
  });