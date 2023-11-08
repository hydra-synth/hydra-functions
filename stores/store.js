import CodeMirrorComponent from '../components/codemirror.js'

import HydraReference from '../libs/hydra-reference.js'
import i18next from 'i18next'

export default function (state, emitter) {
  state.hydraReference = HydraReference()
  state.cm = { editor: '' }
  state.page = {
    selected: null,
    tabIndex: 0,
  }

  emitter.on('editor:update', () => {
    const obj = state.hydraReference.getItem(state.params.function)
    if (obj !== undefined) {
      state.page.selected = obj
      state.page.tabIndex = state.params.tab
      console.log(obj)
  
      function getExampleCode(name, index) {
        const examples = state.hydraReference.getExamples(name)
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
      }
      let code = getExampleCode(obj.name, state.page.tabIndex)
      if (code === undefined) {
        // illegal index
        state.page.tabIndex = 0
        code = getExampleCode(obj.name, state.page.tabIndex)
        emitter.emit('pushState', `#functions/${ obj.name }/${ state.page.tabIndex }`)
      }
  
      state.cm.editor = code
      state.cache(CodeMirrorComponent, 'cm-editor').setCode(code)
    }
  })

  //const functions = new HydraGen()
  emitter.on('show details', (obj, tabIndex) => {
    emitter.emit('pushState', `#functions/${ obj.name }/${ tabIndex }`)
    emitter.emit('editor:update')
    emitter.emit('render')
  })

  emitter.on('clear details', () => {
    state.page.selected = null
    emitter.emit('pushState', window.location.pathname)
    emitter.emit('render')
  })

  emitter.on('DOMContentLoaded', () => {
    emitter.emit('editor:update')
    // TODO: not sure this is a good idea to rerender
    emitter.emit('render')
  })

  emitter.on('rendered:editor', () => {
    // by chance, this can be used for resetting too
    if (state.cache(CodeMirrorComponent, 'cm-editor').view !== undefined) {
      state.cache(CodeMirrorComponent, 'cm-editor').setCode(state.cm.editor)
    }
  })

  emitter.on('navigate', () => {
    console.log(state.params)
  })
}
