import html from 'choo/html'
import Component from 'choo/component'

import { EditorState, Compartment } from '@codemirror/state'
import { defaultHighlightStyle } from '@codemirror/highlight'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'

const defaultStyle = {
  // fontFamily: "'IBM Plex Mono', monospace",
  border: 'solid rgba(0,0,0,0)',
  backgroundColor: 'rgba(255,255,255,0.5)',
}

export default class CodeMirror extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = {}
    this.emit = emit
  }

  evaluate () {
    const code = this.view.state.doc.toString()
    try {
      setResolution(300, 200)
      update = () => {}
      bpm = 30
      speed = 1
      render(o0)
      a.setBins(4)
      a.setCutoff(2)
      a.setSmooth(0.4)
      a.setScale(10)
      a.hide()

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

  createElement (editable = true, i18next) {
    this.editable = editable
    this.i18next = i18next
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
