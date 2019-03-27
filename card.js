Vue.component('card', {
    props: {
        
    },
    data: function() {
        return {

        }
    },
    computed: {

    },
    template: '<div v-if="card.flipped"><div class="back"></div></div><div v-else><div class="front"></div></div>'
})