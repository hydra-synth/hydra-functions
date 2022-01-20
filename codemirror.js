const html = require('choo/html')
const Component = require('choo/component')

const {EditorState, Compartment} = require('@codemirror/state')
const {defaultHighlightStyle} = require('@codemirror/highlight')
const {EditorView, keymap, KeyBinding} = require('@codemirror/view')
const {defaultKeymap} = require('@codemirror/commands')
const {javascript} = require('@codemirror/lang-javascript')

module.exports = class CodeMirror extends Component {
  constructor (id, state, emit, editable = true) {
    super(id)
    this.local = state.components[id] = {}
    this.editable = editable
    this.emit = emit
  }

  evaluate () {
    const code = this.view.state.doc.toString()
    try {
      Function(code)()
      this.view.dispatch({
        effects: this.theme.reconfigure(EditorView.theme({
          '&': {
            border: 'solid lime',
            backgroundColor: 'rgba(255,255,255,0.5)',
            minHeight: this.editable ? '8rem' : '1rem',
            transition: 'border 0s',
          },
        }))
      })
      setTimeout(() => {
        this.view.dispatch({
          effects: this.theme.reconfigure(EditorView.theme({
            '&': {
              border: 'solid rgba(0,0,0,0)',
              backgroundColor: 'rgba(255,255,255,0.5)',
              minHeight: this.editable ? '8rem' : '1rem',
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
            border: 'solid red',
            backgroundColor: 'rgba(255,255,255,0.5)',
            minHeight: this.editable ? '8rem' : '1rem',
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
        border: 'solid rgba(0,0,0,0)',
        backgroundColor: 'rgba(255,255,255,0.5)',
        minHeight: this.editable ? '8rem' : '1rem',
        transition: 'border 1s',
      },
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
      const evaluate = () => {
        this.evaluate()
      }
      const reset = () => {
        this.emit('rendered:editor')
      }
      const openin = () => {
        window.open(`https://hydra.ojack.xyz/?code=${btoa(
          encodeURIComponent(this.getLastCode())
        )}`)
      }
      this.errorMessage = html`<p class="red h1 courier pa0 ma0" style="background-color:rgba(255,255,255,0.3)"></p>`
      return html`
      <div class="flex flex-column">
        <div class="flex justify-end">
          <button class="courier br0 h-100" title="run" onclick=${ evaluate }>▶</button>
          <button class="courier br0 h-100" title="reset" onclick=${ reset }>💔</button>
          <button class="courier br0 h-100" title="open in editor" onclick=${ openin }>🚀</button>
        </div>
        <div class="w-100">
          <div class="editor"></div>
          ${ this.errorMessage }
        </div>
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
