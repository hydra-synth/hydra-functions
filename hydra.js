import html from "choo/html";
import Component from "choo/component";
import HydraSynth from "hydra-synth";

export default class Hydra extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = {}
  }

  load (element) {
    const hydra = new HydraSynth({ detectAudio: true, canvas: element.querySelector("canvas")})
    console.log(hydra)
  //  osc().out()
  }

  update (center) {
    return false
  }

  createElement () {
    return html`<div><canvas class="bg-black" width="300" height="200"></canvas></div>`
  }
}
