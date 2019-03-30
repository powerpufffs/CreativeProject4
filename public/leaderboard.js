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
        this.shouldDelete();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteGame(game) {
      try {
        let res = await axios.delete("/api/games/" + game._id);
        this.getGames();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    shouldDelete() {
      if (this.items.length > 5) {
        this.deleteGame(this.items[0])
      }
    },
    returnToGame: function () {
      window.location = 'http://localhost:2000/game.html';
    }
  },
  created() {
    this.getGames();
  },
});