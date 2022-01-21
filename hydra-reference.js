const hydraFunctions = require('hydra-synth/src/glsl/glsl-functions')()
const hydraTypes = require('./types.js')
const examples = require('./examples.js')

class Item {
  constructor (obj) {
  }
}

class Category {
  constructor (obj) {
  }
}

class HydraReference {
  constructor () {
    this.formattedFunctionGroups = []

    for (const typeIndex in hydraTypes) {
      const hydraType = hydraTypes[typeIndex]
      const type = hydraType.key
      const formattedFunctionGroup = { type, typeIndex, funcs: [] }
      const objList = hydraFunctions.filter((obj) => obj.type === type)//.sort((a, b) => a.name > b.name)
      for (const obj of objList) {
        if (examples[obj.name] === undefined) {
          // functions that are not documented
          obj.undocumented = true
        }
        obj.typeIndex = typeIndex
        formattedFunctionGroup.funcs.push(obj)
      }
      this.formattedFunctionGroups.push(formattedFunctionGroup)
    }
    Object.entries(hydraTypes).map(([type, val], typeIndex) => {
    })

    this.allFuncs = []
    for (const group of this.formattedFunctionGroups) {
      this.allFuncs.push(...group.funcs)
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
