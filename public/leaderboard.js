var leaderboard = new Vue({
    el: '#leaderboard',
    data: {
        items: [],
    },
<<<<<<< HEAD
    returnToGame: function () {
      window.location = 'http://localhost:2000/game.html';
    }
  },
  computed: {

  },
  created() {
    this.getGames();
  },

});
=======
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
>>>>>>> cd276328d72cfea54de121487df5e063cf2daa9f
