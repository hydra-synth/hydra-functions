const hydraFunctions = require('hydra-synth/src/glsl/glsl-functions')()
const hydraTypes = require('./types.js')
const examples = require('./examples.js')

class Item {
  constructor (obj) {
  }
}

class Category {
  constructor ({ type, colorIndex, allFuncs }) {
    this.type = type
    this.colorIndex = colorIndex
    this.funcs = []
    const objList = allFuncs.filter((obj) => obj.type === type)//.sort((a, b) => a.name > b.name)
    for (const obj of objList) {
      if (examples[obj.name] === undefined) {
        // functions that are not documented
        obj.undocumented = true
      }
      obj.colorIndex = colorIndex
      this.funcs.push(obj)
    }

  }
}

class HydraReference {
  constructor () {
    this.formattedFunctionGroups = []
    this.allFuncs = hydraFunctions

    for (const index in hydraTypes) {
      const type = hydraTypes[index].key
      this.formattedFunctionGroups.push(new Category({
        type,
        colorIndex: index,
        allFuncs: this.allFuncs,
      }))
    }
  }

  getGroups () {
    return this.formattedFunctionGroups
  }

  getPage (name) {
    return this.allFuncs.find(e => e.name === name)
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
