const html = require('choo/html')
const raw = require('choo/html/raw')
const devtools = require('choo-devtools')
const choo = require('choo')

const HydraComponent = require('./hydra.js')
const CodeMirrorComponent = require('./codemirror.js')

const HydraReference = require('./hydra-reference.js')

const i18next = require('i18next')
const i18nextBrowserLanguageDetector = require('i18next-browser-languagedetector')

const languageResources = require('./locales.js')

i18next
.use(i18nextBrowserLanguageDetector)
.init({
  debug: true,
  fallbackLng: 'en',
  resources: languageResources,
})

var app = choo({ hash: true })
app.use(devtools())
app.use(pageStore)
app.use(store)
app.route('/', mainView)
app.route('/docs', mainView)
app.route('/hydra-functions', mainView)
app.route('#functions/:function/:tab', mainView)
app.route('/docs/functions/:function/:tab', mainView)
app.route('/hydra-functions/functions/:function/:tab', mainView)
app.mount('body')

const hydraCanvas = new HydraComponent('hydra-canvas', app.state, app.emit)
const cmEditor = new CodeMirrorComponent('cm-editor', app.state, app.emit, true, i18next)
const cmUsage = new CodeMirrorComponent('cm-usage', app.state, app.emit, false, i18next)

function indexToHsl (index, s, l) {
  if (index !== undefined) {
    return `hsl(${ 10 + index * 40 }, ${ s }%, ${ l }%)`
  }
  return 'white'
}

function exampleTabView (state, emit) {
  let obj = state.page.selected
  if (obj !== null) {
    const examples = state.hydraReference.getExamples(obj.name)

    let tabs = [];
    for(let i = 0; i < examples.length; i++) {
      const isSelected = i == state.page.tabIndex;
      const hsl = indexToHsl(state.page.selected.colorIndex, isSelected?100:20, isSelected?90:60)
      tabs.push(html`
        <div class="tab plex-mono pointer dib mr2 pa2 pv1" style="background-color:${hsl}" onclick=${()=>emit('show details', obj, i)}>
          <!--${i18next.t('example')}-->
          ${i}
        </div>
      `)
    }

    const functionName =   `${obj.name}( ${obj.inputs.map((input) => `${input.name}${input.default ? `: ${input.default}`: ''}`).join(', ')} )`
    cmUsage.setCode(functionName)
    return tabs = html`<div class="tabs">${tabs}</div>`
  }
  return ''
}

function editorView (state, emit) {
  obj = state.page.selected
  //  if(obj === null) return ''
  const evaluate = () => {
    cmEditor.evaluate()
  }
  const reset = () => {
    emit('rendered:editor')
  }
  const openin = () => {
    window.open(`https://hydra.ojack.xyz/?code=${btoa(
      encodeURIComponent(cmEditor.getLastCode())
    )}`)
  }

  return html`<div class="overflow-y-auto w-50-ns w-100 w-100-m h-100 ${obj===null?'dn':'db'}">
    <div class="pa2" style="background-color:${ indexToHsl(state.page.selected?.colorIndex, 100, 80) }">
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
      <div class="flex justify-between">
        ${ exampleTabView(state, emit) }
        <div class="">
          <button class="plex-mono br0 h-100" title="${ i18next.t('run') }" onclick=${ evaluate }>▶</button>
          <button class="plex-mono br0 h-100" title="${ i18next.t('reset') }" onclick=${ reset }>💔</button>
          <button class="plex-mono br0 h-100" title="${ i18next.t('openin') }" onclick=${ openin }>🚀</button>
        </div>
      </div>
      <div class="w-100">
        ${ cmEditor.render(state) }
      </div>
      <p>
      ${i18next.t('editor-info')}
      </p>
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
  for (const group of state.hydraReference.getGroups()) {
    const { type, funcs } = group
    const functions = []
    for (const obj of funcs) {
      const onclick = () => {
        if (!obj.undocumented) {
          emit('show details', obj, 0)
        }
      }
      const func = html`
        <div class="plex-mono dib ma1 token function pa1 pv1 ${ obj.undocumented ? 'gray' : 'pointer dim' }" onclick=${ onclick }
          title=${obj.name}
          style="border-bottom: 4px solid ${ indexToHsl(obj.colorIndex, 100, 70) };line-height:0.6"
          >${obj.name}</div>
      `
      functions.push(func)
    }
    const view = html`
      <div class="pv2">
        <div class="mb3 f5">${ i18next.t(type) }</div>
        ${ functions }
      </div>
    `
    groups.push(view)
  }
  return html`
  <div class="relative h-100 overflow-y-scroll-ns overflow-y-auto-m">
    ${ groups }
  </div>
  `
}

function mainView (state, emit) {
  //const inputs = obj.inputs.map((input))
  const color = indexToHsl(state.page.selected?.colorIndex, 100, 90)

  return html`
    <body class="absolute pa2 f6 w-100 h-100-ns h-auto-m flex justify-center" style="font-family: 'Chivo', 'Noto Sans JP', sans-serif;background-color:${color};transition: background-color 1s;">
      <div class="relative flex flex-column" style="max-width: 1000px">
        <div class="relative flex justify-between items-end mv2">
          <div class="pt2 f3"> ${i18next.t('title')}${state.page.selected === null ? '' : `::: ${state.page.selected.name}`} </div>
          <div class="pv1"> ${ languageView(state, emit) } </div>
        </div>
        <div class="relative flex flex-column-reverse flex-row-ns flex-column-reverse-m w-100 h-100 overflow-y-hidden overflow-x-hidden" style="max-width:1000px">

          <div style="" class="relative flex flex-column h-100 w-50-ns w-100 w-100-m mr2">
            <p class="relative">${ raw(i18next.t('intro', {
              hydra: 'https://hydra.ojack.xyz/',
              gettingStarted: 'https://github.com/ojack/hydra#Getting-Started',
              hydraBook: 'https://hydra-book.glitch.me/',
              att: 'class=blue target=_blank'
            })) }</p>

            ${ functionListView(state, emit) }
          </div>
        ${ editorView(state, emit) }
        </div>
      </div>
    </body>
  `
}

function pageStore (state, emitter) {
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
        return examples[index]
      }
      let code = getExampleCode(obj.name, state.page.tabIndex)
      if (code === undefined) {
        // illegal index
        state.page.tabIndex = 0
        code = getExampleCode(obj.name, state.page.tabIndex)
        emitter.emit('pushState', `#functions/${ obj.name }/${ state.page.tabIndex }`)
      }
  
      code = code.replace(/^\n*/, '')
      state.cm.editor = code
      cmEditor.setCode(code)
    }
  })
}

function store (state, emitter) {
  //const functions = new HydraGen()
  emitter.on('show details', (obj, tabIndex) => {
    emitter.emit('pushState', `#functions/${ obj.name }/${ tabIndex }`)
    emitter.emit('editor:update')
    emitter.emit('render')
  })

  emitter.on('DOMContentLoaded', () => {
    emitter.emit('editor:update')
    // TODO: not sure this is a good idea to rerender
    emitter.emit('render')
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
