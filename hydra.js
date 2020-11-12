var html = require('choo/html')
var Component = require('choo/component')
const HydraSynth = require('hydra-synth')

module.exports = class Hydra extends Component {
  constructor (id, state, emit) {
    super(id)
    //this.local = state.components[id] = {}
  }

  load (element) {
    const hydra = new HydraSynth({ detectAudio: false, canvas: this.canvas})
    console.log(hydra)
  //  osc().out()
  }

  update (center) {
    return false
  }

  createElement () {
    this.canvas = html`<canvas width="300" height="200"></canvas>`
    return html`<div>${this.canvas}</div>`
  }
}
