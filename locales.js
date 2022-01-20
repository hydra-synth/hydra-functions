const html = require('choo/html')
module.exports = {
  en: {
    translation: {
      'language-name': 'English',
      'example': 'Example',
      'usage': 'Usage',
      'title': 'Hydra functions',
      'intro': () => html`There are five types of functions in <a href="https://hydra.ojack.xyz/"> hydra</a>: source, geometry, color, blend, and modulate.
      Click on a function below to show its usage.  ( For more detailed documentation, see the <a href="https://hydra.ojack.xyz/">hydra website</a>,
        <a href="https://github.com/ojack/hydra#Getting-Started">getting started tutorial</a> or <a href="https://hydra-book.glitch.me/">Hydra Book.</a>)`,
      'editor-info': 'You can directly edit the code and press "▶" button or "ctrl+enter" to run it!',
      'source': 'Source',
      'geometry': 'Geometry',
      'color': 'Color',
      'blend': 'Blend',
      'modulate': 'Modulate',
    }
  },
  ja: {
    translation: {
      'language-name': '日本語',
      'example': 'サンプル',
      'usage': '使い方',
      'title': 'Hydra 関数',
      'intro': () => html`<a href="https://hydra.ojack.xyz/"> hydra</a> にはソース (source)、ジオメトリ (geometry)、カラー (color)、ブレンド (blend)、モジュレート (modulate) の五つのタイプの関数があります。
      使い方を表示するには下の関数一覧をクリックしてください。（詳細は<a href="https://hydra.ojack.xyz/">hydra ウェブサイト</a>、
        <a href="https://github.com/ojack/hydra#Getting-Started">チュートリアル</a>、<a href="https://hydra-book.glitch.me/">Hydra Book</a>を参照してください）`,
      'editor-info': '直接コードを編集して、「▶」ボタンか "ctrl+enter" を押せばコードを実行できます！',
      'source': 'ソース (Source)',
      'geometry': 'ジオメトリ (Geometry)',
      'color': 'カラー (Color)',
      'blend': 'ブレンド (Blend)',
      'modulate': 'モジュレート (Modulate)',
    }
  }
}
