var html = require('choo/html')
var devtools = require('choo-devtools')
var choo = require('choo')
const hydraFunctions = require('hydra-synth/src/glsl/glsl-functions')
const hydraTypes = require('./types.js')
const examples = require('./examples.js')
const HydraComponent = require('./hydra.js')
const CodeMirrorComponent = require('./codemirror.js')

const i18next = require('i18next')
const i18nextBrowserLanguageDetector = require('i18next-browser-languagedetector')

const languageResources = require('./locales.js')

i18next
.use(i18nextBrowserLanguageDetector)
.init({
  debug: true,
  returnObjects: true,
  fallbackLng: 'en',
  resources: languageResources,
})

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
  const sortedObjList = hydraFunctions.filter((obj) => obj.type === type).sort((a, b) => a.name - b.name)
  sortedObjList.map((obj, index) => {
    if (examples[obj.name] === undefined) {
      // functions that are not documented
      obj.undocumented = true
    }
    obj.typeIndex = typeIndex
    formattedFunctionGroup.funcs.push(obj)
  })
  formattedFunctionGroups.push(formattedFunctionGroup);
})

const hydraCanvas = new HydraComponent('hydra-canvas', app.state, app.emit)
const cmEditor = new CodeMirrorComponent('cm-editor', app.state, app.emit)
const cmUsage = new CodeMirrorComponent('cm-usage', app.state, app.emit, false)

function indexToHsl (index, s, l) {
  return `hsl(${ 20 + index * 60 }, ${ s }%, ${ l }%)`
}

function exampleTabView (state, emit) {
  let obj = state.selected
  if (obj !== null) {
    const d = examples[obj.name]

    let tabs = [];
    if(d && d.example) {
      if(Array.isArray(d.example)) {
        for(let i = 0; i < d.example.length; i++) {
          const isSelected = i == state.tabIndex;
          const hsl = indexToHsl(state.selectedIndex, isSelected?100:20, isSelected?90:60)
          tabs.push(html`
            <div class="tab courier pointer dib ma1 pa1 pv1" style="background-color:${hsl}" onclick=${()=>emit('show details', obj, i)}>
              ${i18next.t('example')} ${i}
            </div>
          `)
        }
      }
    }

    const functionName =   `${obj.name}( ${obj.inputs.map((input) => `${input.name}${input.default ? `: ${input.default}`: ''}`).join(', ')} )`
    // cmUsage.setCode(functionName)
    state.cm.usage = functionName
    emit('rendered:usage')
    return tabs = html`<div class="tabs">${tabs}</div>`
  }
  return ''
}

function editorView (state, emit) {
  obj = state.selected
  //  if(obj === null) return ''

  return html`<div class="pa2 overflow-y-auto w-50-ns w-100 w-100-m h-100 ${obj===null?'dn':'db'}">
    <div class="pa3" style="background-color:${ indexToHsl(state.selectedIndex, 100, 80) }">
      <div class="pv2 f5">
        ${ i18next.t('usage') }
      </div>
      ${ cmUsage.render(state) }
      <div class="pv2 f5">
        ${ i18next.t('example') }
      </div>
      <div class="w-100 flex justify-center">
        <div class="pa4">
            ${ hydraCanvas.render(state) }
        </div>
      </div>
      ${ exampleTabView(state, emit) }
      ${ cmEditor.render(state) }
    </div>
  </div>`
}

function languageView (state, emit) {
  const languageButtons = []
  const languages = Object.keys(languageResources)
  for (let i = 0; i < languages.length; i++) {
    const lang = languages[i]
    const onclick = () => {
      i18next.changeLanguage(lang, (err, t) => {
        console.log(err, t)
        emit('render')
      })
    }
    languageButtons.push(html`
      <div class="pointer dib underline" onclick=${ onclick }>${ i18next.getFixedT(lang)('language-name') }</div>
    `)
    if (i < languages.length - 1) {
      languageButtons.push(' | ')
    }
  }
  return languageButtons
}

function functionListView (state, emit) {
  const groups = []
  for (const group of formattedFunctionGroups) {
    const { type, val, funcs } = group
    const functions = []
    for (const obj of funcs) {
      const onclick = () => {
        emit('show details', obj, 0)
      }
      const func = html`
        <div class="courier dib ma1 pointer dim token function pa1 pv1 ${ obj.undocumented ? 'gray' : '' }" onclick=${ onclick }
          title=${obj.name}
          style="border-bottom: 4px solid ${ indexToHsl(obj.typeIndex, 100, 70) };line-height:0.6"
          >${obj.name}</div>
      `
      functions.push(func)
    }
    const view = html`
      <div class="pv2">
        <div class="mb3 f5">${ i18next.t(val.label) }</div>
        ${ functions }
      </div>
    `
    groups.push(view)
  }
  return groups
}

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

  //const inputs = obj.inputs.map((input))
  const color = state.selectedIndex === null ? 'white' : indexToHsl(state.selectedIndex, 100, 90)

  emit('rendered:editor')

  return html`
    <body class="pa2 f6 georgia w-100 h-100 flex justify-center" style="background-color:${color};transition: background-color 1s;">
      <div style = "max-width: 1000px">
        <div class="flex justify-between items-end">
          <div class="pt2 f3"> ${i18next.t('title')}${state.selected === null ? '' : `::: ${state.selected.name}`} </div>
          <div class="pv1"> ${ languageView(state, emit) } </div>
        </div>
        <div class="flex flex-column-reverse flex-row-ns flex-column-reverse-m w-100" style="max-width:1000px">

          <div style="" class="overflow-y-auto w-50-ns w-100 w-100-m ">
          <p>${i18next.t('intro1')()}</p>
          <p>
            ${i18next.t('intro2')}
          </p>

          ${ functionListView(state, emit) }
          </div>
        ${ editorView(state, emit) }
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

  emitter.on('navigate', () => {
    console.log(state.params)
  })
}
