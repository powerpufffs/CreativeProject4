var leaderboard = new Vue({
    el: '#leaderboard',
    data: {
      items: [],
    },
    methods: {
        async getGames() {
			try {
				let res = await axios.get("/api/games");
				this.items = res.data;
				return true;
			} catch (error) {
				console.log(error);
			}
        }
    },
    computed: {

    },
    created() {
      this.getGames();
    },
  
  });