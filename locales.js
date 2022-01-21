const html = require('choo/html')
module.exports = {
  en: {
    translation: {
      'language-name': 'English',
      'example': 'Example',
      'usage': 'Usage',
      'title': 'Hydra functions',
      'intro': `There are five types of functions in <a href="{{hydra}}" {{att}}>hydra</a>: source, geometry, color, blend, and modulate.
      Click on a function below to show its usage. (For more detailed documentation, see the <a href="{{hydra}}" {{att}}>hydra website</a>,
        <a href="{{gettingStarted}}" {{att}}>getting started tutorial</a> or <a href="{{hydraBook}}" {{att}}>Hydra Book</a>.)`,
      'editor-info': 'Directly edit the code and press "▶" button or "ctrl+enter" to run it!',
      'src': 'Source',
      'coord': 'Geometry',
      'color': 'Color',
      'combine': 'Blend',
      'combineCoord': 'Modulate',
      'run': 'run',
      'reset': 'reset',
      'openin': 'open in editor',
    }
  },
  ja: {
    translation: {
      'language-name': '日本語',
      'example': 'サンプル',
      'usage': '使い方',
      'title': 'Hydra 関数',
      'intro': `<a href="{{hydra}}" {{att}}> hydra</a> にはソース (source)、ジオメトリ (geometry)、カラー (color)、ブレンド (blend)、モジュレート (modulate) の五つのタイプの関数があります。
      使い方を表示するには下の関数一覧をクリックしてください。（詳細は<a href="{{hydra}}" {{att}}>hydra ウェブサイト</a>、
        <a href="{{gettingStarted}}" {{att}}>チュートリアル</a>、<a href="{{hydraBook}}" {{att}}>Hydra Book</a> を参照してください）`,
      'editor-info': '直接コードを編集して、「▶」ボタンか "ctrl+enter" を押せばコードを実行できます！',
      'src': 'ソース (Source)',
      'coord': 'ジオメトリ (Geometry)',
      'color': 'カラー (Color)',
      'combine': 'ブレンド (Blend)',
      'combineCoord': 'モジュレート (Modulate)',
      'run': '実行',
      'reset': 'リセット',
      'openin': '外部エディタを開く',
    }
  }
}
