var html = require('choo/html')
var devtools = require('choo-devtools')
var choo = require('choo')
const hydraFunctions = require('hydra-synth/src/glsl/glsl-functions')
const hydraTypes = require('./types.js')
const examples = require('./examples.js')
const HydraComponent = require('./hydra.js')
const CodeMirrorComponent = require('./codemirror.js')

var app = choo({ hash: true })
app.use(devtools())
app.use(store)
app.route('/', mainView)
app.route('/docs', mainView)
app.route('/hydra-functions', mainView)
app.route('#functions/:function/:tab', mainView)
app.route('/docs/functions/:function/:tab', mainView)
app.route('/hydra-functions/functions/:function/:tab', mainView)
app.mount('body')

const formattedFunctionGroups = []

Object.entries(hydraTypes).map(([type, val], typeIndex) => {
  const formattedFunctionGroup = { type, val, typeIndex, funcs: [] }
  hydraFunctions.filter((obj) => obj.type === type).sort((a, b) => a.name - b.name).map((obj, index) => {
    obj.typeIndex = typeIndex
    formattedFunctionGroup.funcs.push(obj)
  })
  formattedFunctionGroups.push(formattedFunctionGroup);
})

const hydraCanvas = new HydraComponent('hydra-canvas', app.state, app.emit)
const cmEditor = new CodeMirrorComponent('cm-editor', app.state, app.emit)
const cmUsage = new CodeMirrorComponent('cm-usage', app.state, app.emit, false)

function mainView (state, emit) {
  state.cm = {}
  const allFuncs = []
  for (const group of formattedFunctionGroups) {
    allFuncs.push(...group.funcs)
  }
  const obj = allFuncs.find(e => e.name === state.params.function)
  if (obj !== undefined) {
    state.selected = obj
    state.selectedIndex = obj.typeIndex
    state.tabIndex = state.params.tab
    console.log(obj)

    function getExampleCode(name, index) {
      const d = examples[name]
      let code = ''
      if(d && d.example) {
        if(Array.isArray(d.example)) {
          code = d.example[index]
        }
        else {
          code = d.example
        }
      }
      return code
    }
    let code = getExampleCode(obj.name, state.tabIndex)
    if (code === undefined) {
      // illegal index
      state.tabIndex = 0
      code = getExampleCode(obj.name, state.tabIndex)
      emit('pushState', `#functions/${ obj.name }/${ state.tabIndex }`)
    }

    code = code.replace(/^\n*/, '')
    // cmEditor.setCode(code)
    state.cm.editor = code
  }

  function selected (obj) {
  //  if(obj === null) return ''
    let codeExample = ''

    if(obj !== null) {
      const d = examples[obj.name]

      let tabs = [];
      if(d && d.example) {
        if(Array.isArray(d.example)) {
          for(let i = 0; i < d.example.length; i++) {
            const isSelected = i == state.tabIndex;
            const hsl = `hsl(${20 + state.selectedIndex*60 }, ${isSelected?100:20}%, ${isSelected?90:60}%)`
            tabs.push(html`<div class="tab courier pointer dib ma1 pa1 pv1" style="background-color:${hsl}" onclick=${()=>emit('show details', obj, i)}>Example ${i}</div>`);
          }
        }
      }

      const functionName =   `${obj.name}( ${obj.inputs.map((input) => `${input.name}${input.default ? `: ${input.default}`: ''}`).join(', ')} )`
      codeExample = html`<div class="tabs">${tabs}</div>`
      // cmUsage.setCode(functionName)
      state.cm.usage = functionName
      emit('rendered:usage')
    }

    function evaluate() {
      cmEditor.evaluate();
    }
    function openin() {
      window.open(`https://hydra.ojack.xyz/?code=${btoa(
        encodeURIComponent(cmEditor.getLastCode())
      )}`)
    }
    return html`<div class="pa2 overflow-y-auto w-50-ns w-100 w-100-m" style="
      height:${obj===null?'0px':'100%'};display:${obj===null?'none':'block'}
      ">
      <div class="pa3" style="background-color:hsl(${20 + state.selectedIndex*60 }, 100%, 80%)">
        <div class="pv2 f5">Usage</div>
        ${ cmUsage.render(state) }
        <div class="pv2 f5">Example</div>
        <div class="w-100 flex justify-center">
          <div class="pa4">
              ${ hydraCanvas.render(state) }
          </div>
        </div>
        ${ codeExample }
        <div class="flex justify-between">
          <div class="flex flex-column justify-around">
            <button class="courier br0 h-100" title="run" onclick=${ evaluate }>▶</button>
            <button class="courier br0 h-100" title="reset" onclick=${ () => emit('rendered:editor') }>💔</button>
            <button class="courier br0 h-100" title="open in editor" onclick=${ openin }>🚀</button>
          </div>
          ${ cmEditor.render(state) }
        </div>
      </div>
    </div>`
  }

  //const inputs = obj.inputs.map((input))
  const color = state.selectedIndex === null ? 'white' : `hsl(${20 + state.selectedIndex*60 }, 100%, 90%)`

  emit('rendered:editor')

  return html`
    <body class="pa2 f6 georgia w-100 h-100 flex justify-center" style="background-color:${color};transition: background-color 1s;">
      <div style = "max-width: 1000px">
        <div class="pt2 f3"> Hydra functions${state.selected === null ? '' : `::: ${state.selected.name}`} </div>
        <div class="flex flex-column-reverse flex-row-ns flex-column-reverse-m w-100" style="max-width:1000px">

          <div style="" class="overflow-y-auto w-50-ns w-100 w-100-m ">
          <p>There are five types of functions in <a href="https://hydra.ojack.xyz/"> hydra</a>: source, geometry, blend, and modulate.
          Click on a function below to show its usage.  ( For more detailed documentation, see the <a href="https://hydra.ojack.xyz/">hydra website</a>,
            <a href="https://github.com/ojack/hydra#Getting-Started">getting started tutorial</a> or <a href="https://hydra-book.naotohieda.com/">hydra book.</a>)</p>
          <p>
            You can edit the code and press "▶" button or "ctrl+enter" to run the code!
          </p>

          ${ formattedFunctionGroups.map(({ type, val, funcs }) => html`
            <div class="pv2">
              <div class="mb3 f5">${val.label.charAt(0).toUpperCase() + val.label.slice(1)}</div>
              ${funcs.map((obj, index) => html`
              <div class="courier dib ma1 pointer dim token function pa1 pv1" onclick=${()=>emit('show details', obj, 0)}
                title=${obj.name}
                style="border-bottom: 4px solid hsl(${20 + obj.typeIndex*60 }, 100%, 70%);line-height:0.6"
                >${obj.name}</div>
            `)}
            </div>
          `) }
          </div>
        ${selected(state.selected)}
        </div>
      </div>
    </body>
  `
}

function store (state, emitter) {
  //const functions = new HydraGen()
  state.selected = null
  state.selectedIndex = null
  state.tabIndex = 0
  state.functions = Object.values(hydraFunctions)

  emitter.on('show details', (obj, tabIndex) => {
    emitter.emit('pushState', `#functions/${ obj.name }/${ tabIndex }`)
    emitter.emit('render')
  })

  emitter.on('DOMContentLoaded', () => {
    cmUsage.setCode(state.cm.usage)
    cmEditor.setCode(state.cm.editor)
  })

  emitter.on('rendered:usage', () => {
    if (cmUsage.view !== undefined) {
      cmUsage.setCode(state.cm.usage)
    }
  })

  emitter.on('rendered:editor', () => {
    // by chance, this can be used for resetting too
    if (cmEditor.view !== undefined) {
      cmEditor.setCode(state.cm.editor)
    }
  })
}
