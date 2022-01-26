const hydraFunctions = require('hydra-synth/src/glsl/glsl-functions')()
const hydraPlugins = require('./hydra-plugins.js')
const hydraTypes = require('./types.js')
const examples = require('./examples.js')

class Item {
  constructor ({ obj, colorIndex, category }) {
    this.name = obj.name
    this.category = category
    this.colorIndex = colorIndex
    this.inputs = obj.inputs
    this.default = obj.default

    if (this.category.type === "combine" || this.category.type === "combineCoord") {
      this.inputs = [ { type: "vec4", name: "texture" }, ...this.inputs]
    }

    this.initExamples()
  }

  initExamples () {
    let ref = examples[this.name]
    if (ref === undefined || ref.example === undefined) {
      // functions that are not documented
      this.undocumented = true
      this.examples = []
    }
    else {
      if (Array.isArray(ref.example) === false) {
        this.examples = [ref.example]
      }
      else {
        this.examples = ref.example
      }
    }
  }
}

class Category {
  constructor ({ type, colorIndex, allFuncs }) {
    this.type = type
    this.colorIndex = colorIndex
    this.funcs = []
    const objList = allFuncs.filter((obj) => obj.type === type)//.sort((a, b) => a.name > b.name)
    for (const obj of objList) {
      const item = new Item({ obj, colorIndex, category: this })
      this.funcs.push(item)
    }
  }
}

class HydraReference {
  constructor () {
    this.categories = []
    this.allFuncs = [...hydraFunctions, ...hydraPlugins]
    this.allItems = []

    for (const index in hydraTypes) {
      const type = hydraTypes[index].key
      const category = new Category({
        type,
        colorIndex: index,
        allFuncs: this.allFuncs,
      })
      this.categories.push(category)
      this.allItems.push(...category.funcs)
    }
  }

  getGroups () {
    return this.categories
  }

  getItem (name) {
    return this.allItems.find(e => e.name === name)
  }

  getExamples (name) {
    return this.getItem(name).examples
  }
}

module.exports = () => new HydraReference
