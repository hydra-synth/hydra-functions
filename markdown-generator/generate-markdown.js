// WIP attempt at automatically generating markdown from files in this repo
// import hydraPlugins from '../libs/hydra/hydra-plugins'
import HydraReference from './../libs/hydra-reference.js'

const h = HydraReference()
const i18next = { language: 'en '}
const functionGroups = h.getGroups()

function getUsage (obj) {
    if (obj.inputs !== undefined) {
        return `${obj.name}( ${obj.inputs.map((input) => `${input.name}${input.default ? ` = ${input.default}`: ''}`).join(', ')} )`
      }
      else {
        if (obj.default !== undefined) {
          return `${obj.name} = ${obj.default}`
        }
        else {
          return obj.name
        }
      }
}

function getExampleCode(name, index = 0) {
    const item = h.getItem(name)
    const examples = item.examples
    if(examples.length > 0) {
          let comment = examples[index].comments[i18next.language]
    if (comment === undefined || comment.length === 0) {
      comment = examples[index].comments['en']
    }
    if (comment.length > 0) {
      comment = comment.replace(/^\n*/, '')
      comment = comment.split('\n').map(c => `// ${ c }`).join('\n')
      comment = comment + '\n'
    }
    return comment + examples[index].code.replace(/^\n*/, '')
       return `
\`\`\`hydra
${comment + examples[index].code.replace(/^\n*/, '')}
\`\`\`
    `
    }
    return ''
  }

functionGroups.forEach((g) => {
    //console.log(g.type)

    const md = `
# ${g.type}

${g.funcs.map((f) => `
### ${f.name}
${getUsage(f)}

${getExampleCode(f.name)}
`).join('')}
`
console.log(md)
  // g.funcs.forEach((f) => console.log(f.name))
})
