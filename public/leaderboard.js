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
        // for (game in res.body)
        // let game = new Object();
        // game.name = res.data.name;
        // game.turns = res.data.turns;
        // game.duration = res.data.duration;
        // game.date = res.data.date;
        // this.items.push
        return true;
      } catch (error) {
        console.log(error);
      }
    },
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
