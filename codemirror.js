const html = require('choo/html')
const Component = require('choo/component')

const {EditorState, Compartment} = require('@codemirror/state')
const {defaultHighlightStyle} = require('@codemirror/highlight')
const {EditorView, keymap, KeyBinding} = require('@codemirror/view')
const {defaultKeymap} = require('@codemirror/commands')
const {javascript} = require('@codemirror/lang-javascript')
const { default: i18next } = require('i18next')

const defaultStyle = {
  // fontFamily: "'IBM Plex Mono', monospace",
  border: 'solid rgba(0,0,0,0)',
  backgroundColor: 'rgba(255,255,255,0.5)',
}

module.exports = class CodeMirror extends Component {
  constructor (id, state, emit, editable = true, i18next) {
    super(id)
    this.local = state.components[id] = {}
    this.editable = editable
    this.emit = emit
    this.i18next = i18next
  }

  evaluate () {
    const code = this.view.state.doc.toString()
    try {
      Function(code)()
      this.view.dispatch({
        effects: this.theme.reconfigure(EditorView.theme({
          '&': {
            ...defaultStyle,
            minHeight: this.editable ? '8rem' : '1rem',
            border: 'solid lime',
            transition: 'border 0s',
          },
        }))
      })
      setTimeout(() => {
        this.view.dispatch({
          effects: this.theme.reconfigure(EditorView.theme({
            '&': {
              ...defaultStyle,
              minHeight: this.editable ? '8rem' : '1rem',
              border: 'solid rgba(0,0,0,0)',
              transition: 'border 1s',
            },
          }))
        })
      }, 500)
      this.errorMessage.innerHTML = ''
    } catch (e) {
      this.errorMessage.innerHTML = e
      this.view.dispatch({
        effects: this.theme.reconfigure(EditorView.theme({
          '&': {
            ...defaultStyle,
            minHeight: this.editable ? '8rem' : '1rem',
            border: 'solid red',
            transition: 'border 0s',
          },
        }))
      })  
    }
    return true // super important for CM not to add '\n'
  }

  load (element) {
    const keymaps = []
    if (this.editable) {
      keymaps.push(keymap.of({key: 'Ctrl-Enter', run: () => this.evaluate(), preventDefault: true}))
      keymaps.push(keymap.of(defaultKeymap))
    }

    this.theme = new Compartment
    let theme = EditorView.theme({
      '&': {
        ...defaultStyle,
        minHeight: this.editable ? '8rem' : '1rem',
        transition: 'border 1s',
      }
    })
    
    const editorState = EditorState.create({
      doc: 'Hello World',
      extensions: [
        keymaps,
        this.theme.of(theme),
        javascript(),
        defaultHighlightStyle.fallback,
        EditorView.editable.of(this.editable),
        EditorView.lineWrapping,
      ],
    })

    this.view = new EditorView({
      state: editorState,
      parent: element.querySelector('.editor'),
      extensions: [  ],
    })
  }

  setCode (code) {
    this.view.dispatch({
      changes: {from: 0, to: this.view.state.doc.length, insert: code},
    })
    if (this.editable) {
      this.evaluate()
    }
  }

  getLastCode () {
    return this.view.state.doc.toString()
  }

  update () {
    return false
  }

  createElement () {
    if (this.editable) {
      this.errorMessage = html`<p class="red h1 plex-mono pa0 ma0" style="background-color:rgba(255,255,255,0.3)"></p>`
      return html`
        <div class="w-100">
          <div class="editor"></div>
          ${ this.errorMessage }
      </div>`
    }
    else {
      return html`
      <div class="w-100">
        <div class="editor"></div>
      </div>`
    }
  }
}
