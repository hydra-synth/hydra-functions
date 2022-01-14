var html = require('choo/html')
var devtools = require('choo-devtools')
var choo = require('choo')
const hydraFunctions = require('hydra-synth/src/glsl/glsl-functions')
const hydraTypes = require('./types.js')
const examples = require('./examples.js')
const Prism = require('prismjs')
const Hydra = require('./hydra.js')

var app = choo()
app.use(devtools())
app.use(store)
app.route('/', mainView)
app.route('/hydra-functions', mainView)
app.mount('body')

/* codemirror6 init */
const editorContainer = document.createElement('div');

const {EditorState} = require('@codemirror/state')
const {defaultHighlightStyle} = require('@codemirror/highlight')
const {EditorView, keymap, KeyBinding} = require('@codemirror/view')
const {defaultKeymap} = require('@codemirror/commands')
const {javascript} = require('@codemirror/lang-javascript')

let startState = EditorState.create({
  doc: 'Hello World',
  extensions: [
    keymap.of({key: 'Ctrl-Enter', run: evaluate, preventDefault: true}), 
    keymap.of(defaultKeymap),
    javascript(),
    defaultHighlightStyle.fallback,
  ]
})

let view = new EditorView({
  state: startState,
  parent: editorContainer
})
/* codemirror6 end */

function mainView (state, emit) {
  function selected (obj) {
  //  if(obj === null) return ''
    let functionEl = html`<pre></pre>`
    let codeExample = ''

    if(obj !== null) {
    const d = examples[obj.name]
    const typeIndex = Object.keys(hydraTypes).indexOf(obj.type);

    let rawCode = '';
    let tabs = [];
    if(d && d.example) {
      if(Array.isArray(d.example)) {
        rawCode = d.example[state.tabIndex];
        for(let i = 0; i < d.example.length; i++) {
          const isSelected = i == state.tabIndex;
          const hsl = `hsl(${20 + state.selectedIndex*60 }, ${isSelected?100:20}%, ${isSelected?90:60}%)`
          tabs.push(html`<div class="tab courier pointer dib ma1 pa1 pv1" style="background-color:${hsl}" onclick=${()=>emit('show details', obj, typeIndex, i)}>Example ${i}</div>`);
        }
      }
      else {
        rawCode = d.example;
      }
    }
    if(rawCode.length > 0 && rawCode[0] != '\n') {
      rawCode = '\n' + rawCode;
    }
    const code = Prism.highlight(rawCode, Prism.languages.javascript, 'javascript');

    const el = html`<code></code>`
    el.innerHTML = code

    const functionName =   `${obj.name}( ${obj.inputs.map((input) => `${input.name}${input.default ? `: ${input.default}`: ''}`).join(', ')} )`
    functionEl = html`<pre class=""><code class=""></code></pre>`
    codeExample = html`<div class="tabs">${tabs}</div><pre class="ma0">
    </pre>`
      // <ul>
      //   ${obj.inputs.map((input) => html`<li>
      //     ${input.name}:: ${input.type} ${input.default?`(default = ${input.default})`: ''}
      //   </li>`)}
      // </ul>
      //   ${d.description}
   functionEl.innerHTML = Prism.highlight(functionName, Prism.languages.javascript, 'javascript')
 }


    return html`<div class="pa2 overflow-y-auto w-50-ns w-100 w-100-m" style="
      height:${obj===null?'0px':'100%'};display:${obj===null?'none':'block'}
      ">
      <div class="pa3" style="background-color:hsl(${20 + state.selectedIndex*60 }, 100%, 80%)">
        <div class="pv2 f5">Usage</div>
        ${functionEl}
        <div class="pv2 f5">Example</div>
        <div class="pa4 w-100" style="width:400px;">

            ${state.cache(Hydra, 'hydra-canvas').render(state)}
            ${codeExample}
        </div>
        ${ editorContainer }
      </div>
    </div>`
  }

  //const inputs = obj.inputs.map((input))
  const color = state.selectedIndex === null ? 'white' : `hsl(${20 + state.selectedIndex*60 }, 100%, 90%)`



  return html`
    <body class="pa2 f6 georgia w-100 h-100 flex justify-center" style="background-color:${color};transition: background-color 1s;">
      <div style = "max-width: 1000px">
        <div class="pt2 f3"> Hydra functions${state.selected === null ? '' : `::: ${state.selected.name}`} </div>
        <div class="flex flex-column-reverse flex-row-ns flex-column-reverse-m w-100" style="max-width:1000px">

          <div style="" class="overflow-y-auto w-50-ns w-100 w-100-m ">
          <p>There are five types of functions in <a href="https://hydra.ojack.xyz/"> hydra</a>: source, geometry, blend, and modulate.
          Click on a function below to show its usage.  ( For more detailed documentation, see the <a href="https://hydra.ojack.xyz/">hydra website</a>,
            <a href="https://github.com/ojack/hydra#Getting-Started">getting started tutorial</a> or <a href="https://hydra-book.naotohieda.com/">hydra book.</a>)</p>

            ${Object.entries(hydraTypes).map(([type, val], typeIndex) => html`
              <div class="pv2">
                <div class="mb3 f5">${val.label.charAt(0).toUpperCase() + val.label.slice(1)}</div>
                ${state.functions.filter((obj) => obj.type === type).sort((a, b) => a.name - b.name).map((obj, index) => html`
                <div class="courier dib ma1 pointer dim token function pa1 pv1" onclick=${()=>emit('show details', obj, typeIndex, 0)}
                  title=${obj.name}
                  style="border-bottom: 4px solid hsl(${20 + typeIndex*60 }, 100%, 70%);line-height:0.6"
                  >${obj.name}</div>
              `)}
              </div>
            `)}
          </div>
        ${selected(state.selected)}
        </div>
      </div>
    </body>
  `
}

function evaluate() {
  const code = view.state.doc.toString()
  Function(code)()
  return true // super important for CM not to add "\n"
}

function store (state, emitter) {
  //const functions = new HydraGen()
  state.selected = null
  state.selectedIndex = null
  state.tabIndex = 0
  state.functions = Object.values(hydraFunctions)
  //console.log(functions.generator.glslTransforms)

  emitter.on('show details', (obj, typeIndex, tabIndex) => {
    state.selected = obj
    state.selectedIndex = typeIndex
    state.tabIndex = tabIndex
    console.log(obj, typeIndex)

    const d = examples[obj.name]
    let code = ''
    if(d && d.example) {
      if(Array.isArray(d.example)) {
        code = d.example[tabIndex]
      }
      else {
        code = d.example
      }
    }
    view.dispatch({
      changes: {from: 0, to: view.state.doc.length, insert: code}
    })
    evaluate();
    emitter.emit('render')
  })

  // emitter.on('increment', function (count) {
  //   state.count += count
  //   emitter.emit('render')
  // })
}
