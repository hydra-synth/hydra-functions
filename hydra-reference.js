const hydraFunctions = require('hydra-synth/src/glsl/glsl-functions')()
const hydraTypes = require('./types.js')
const examples = require('./examples.js')

class Item {
  constructor ({ obj, colorIndex }) {
    this.name = obj.name
    this.colorIndex = colorIndex
    this.inputs = obj.inputs

    if (examples[this.name] === undefined) {
      // functions that are not documented
      this.undocumented = true
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
      const item = new Item({ obj, colorIndex })
      this.funcs.push(item)
    }
  }
}

class HydraReference {
  constructor () {
    this.categories = []
    this.allFuncs = hydraFunctions
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

  getPage (name) {
    return this.allItems.find(e => e.name === name)
  }

  getExamples (name) {
    let ref = examples[name]
    if (ref === undefined) {
      return []
    }
    if (ref.example === undefined) {
      return []
    }
    if (Array.isArray(ref.example) === false) {
      return [ref.example]
    }
    return ref.example
  }
}

module.exports = () => new HydraReference
