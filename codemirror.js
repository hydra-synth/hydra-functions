const html = require('choo/html')
const Component = require('choo/component')

const {EditorState} = require('@codemirror/state')
const {defaultHighlightStyle} = require('@codemirror/highlight')
const {EditorView, keymap, KeyBinding} = require('@codemirror/view')
const {defaultKeymap} = require('@codemirror/commands')
const {javascript} = require('@codemirror/lang-javascript')

module.exports = class CodeMirror extends Component {
  constructor (id, state, emit, editable = true) {
    super(id)
    this.local = state.components[id] = {}
    this.editable = editable
  }

  evaluate () {
    const code = this.view.state.doc.toString()
    Function(code)()
    return true // super important for CM not to add "\n"
  }

  load (element) {
    const keymaps = []
    if (this.editable) {
      keymaps.push(keymap.of({key: 'Ctrl-Enter', run: () => this.evaluate(), preventDefault: true}))
      keymaps.push(keymap.of(defaultKeymap))
    }
    const editorState = EditorState.create({
      doc: 'Hello World',
      extensions: [
        keymaps,
        javascript(),
        defaultHighlightStyle.fallback,
        EditorView.editable.of(this.editable),
      ],
    })
    
    this.view = new EditorView({
      state: editorState,
      parent: element,
      extensions: [  ],
    })
  }

  setCode (code) {
    this.view.dispatch({
      changes: {from: 0, to: this.view.state.doc.length, insert: code}
    })
    if (this.editable) {
      this.evaluate()
    }
  }

  update () {
    return false
  }

  createElement () {
    return html`<div></div>`
  }
}
