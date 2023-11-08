// import devtools from 'choo-devtools'
import choo from 'choo'

import store from './stores/store.js'
import i18next from 'i18next'
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'

import languageResources from './locales.js'

i18next
.use(i18nextBrowserLanguageDetector)
.init({
  debug: true,
  fallbackLng: 'en',
  resources: languageResources,
})

var app = choo({ hash: true })
// app.use(devtools())
app.use(store)

import mainView from './views/main.js'

app.route('/', mainView)
app.route('/docs', mainView)
app.route('/hydra-functions', mainView)
app.route('#functions/:function/:tab', mainView)
app.route('/docs/functions/:function/:tab', mainView)
app.route('/hydra-functions/functions/:function/:tab', mainView)

app.route('/api', mainView)
app.route('/api/functions/:function/:tab', mainView)

app.route('/functions', mainView)
app.route('/functions/functions/:function/:tab', mainView)

app.mount('body')
