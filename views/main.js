import html from 'choo/html'
import raw from 'choo/html/raw'
import i18next from 'i18next'
import languageResources from '../locales.js'

import HydraComponent from '../components/hydra.js'
import CodeMirrorComponent from '../components/codemirror.js'

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

    let functionName;
    if (obj.inputs !== undefined) {
        let params = obj.inputs.map((input) =>
            input.default === undefined
                ? input.name
                : `${input.name}=${input.default}`
        );
        params = params.join(', ');
      functionName = `${obj.name}( ${params} )`
    }
    else {
      if (obj.default !== undefined) {
        functionName = `${obj.name} = ${obj.default}`
      }
      else {
        functionName = obj.name
      }
    }
    state.cache(CodeMirrorComponent, 'cm-usage').setCode(functionName)
    return tabs = html`<div class="tabs">${tabs}</div>`
  }
  return ''
}

function editorView (state, emit) {
  let obj = state.page.selected
  //  if(obj === null) return ''
  const evaluate = () => {
    state.cache(CodeMirrorComponent, 'cm-editor').evaluate()
  }
  const reset = () => {
    emit('rendered:editor')
  }
  const openin = () => {
    window.open(`https://hydra.ojack.xyz/?code=${btoa(
      encodeURIComponent(state.cache(CodeMirrorComponent, 'cm-editor').getLastCode())
    )}`)
  }

  return html`<div class="overflow-y-auto w-50-ns w-100 w-100-m h-100 ${obj===null?'dn':'db'}">
    <div class="pa2" style="background-color:${ indexToHsl(state.page.selected?.colorIndex, 100, 80) }">
      <div class="flex justify-end w-100">
        <div class="dib pointer pa1" style="background-color:rgba(255,255,255,0.5)" onclick=${ () => emit('clear details') }>
          ✖
        </div>
      </div>
      <div class="pv2 f5">
        ${ i18next.t('usage') }
      </div>
      ${ state.cache(CodeMirrorComponent, 'cm-usage').render(false, i18next) }
      <div class="pv2 f5">
        ${ i18next.t('example') }
      </div>
      <div class="w-100 flex justify-center">
        <div class="pa4">
            ${ state.cache(HydraComponent, 'hydra-canvas').render() }
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
        ${ state.cache(CodeMirrorComponent, 'cm-editor').render(true, i18next) }
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
        emit('editor:update')
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
  <div class="relative h-100 overflow-y-scroll-ns overflow-y-auto-m" style="scrollbar-width: thin;">
    ${ groups }
  </div>
  `
}

export default function mainView (state, emit) {
  //const inputs = obj.inputs.map((input))
  const color = indexToHsl(state.page.selected?.colorIndex, 100, 90)

  return html`
    <body class="absolute pa2 f6 w-100 h-100-ns h-auto-m flex justify-center" style="font-family: 'Chivo', 'Noto Sans JP', sans-serif;background-color:${color};transition: background-color 1s;">
      <div class="relative flex flex-column" style="max-width: 1000px">
        <div class="relative flex justify-between items-end mv2">
          <div class="pt2 f3">
            <div class="dib pointer" onclick=${ () => emit('clear details') }>
              ${i18next.t('title')}
            </div>
            ${state.page.selected === null ? '' : ` ::: ${state.page.selected.name}`}
          </div>
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
