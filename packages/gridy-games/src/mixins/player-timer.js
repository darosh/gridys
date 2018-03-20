import Vue from 'vue'
import { tickSound, failSound } from '../services/sound'

export default {
  data () {
    return {
      timer: -1,
      transition: 0
    }
  },
  watch: {
    'game.moves.length': function () {
      this.updateTimer()
    },
    'game.pending': function () {
      this.updateTimer()
    },
    'game.counterSignal': function (value) {
      if (!this.$store.state.sound) {
        return
      }

      if (value > 0) {
        tickSound()
      } else if (value === 0) {
        failSound()
      }
    }
  },
  methods: {
    updateTimer () {
      if (this.game.pending && this.value === this.game.player) {
        this.transition = 0
        this.timer = -1

        Vue.nextTick(() => {
          requestAnimationFrame(() => {
            this.timer = 0
            this.transition = this.game.limit
          })
        })
      } else {
        this.timer = -1
        this.transition = 0
      }
    }
  }
}
