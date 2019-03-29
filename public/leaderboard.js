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
        shortenedItems: function() {
            if (this.items.length > 10) {
                return;
            } else {
                var shortenedItemsArray = this.items;
                return shortenedItemsArray;
            }
        }
    },
    created() {
      this.getGames();
    },
  
  });
