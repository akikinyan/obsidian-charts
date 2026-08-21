import type { LocaleStrings } from './en';

export const ja: LocaleStrings = {
  settings: {
    title: '設定 - Charts',
    generalHeading: '全般',
    contextMenu: {
      name: 'コンテキストメニューにボタンを表示',
      desc: '有効にすると、エディタの右クリックメニューからチャート作成画面を開くボタンが表示されます。',
    },
    colorsHeading: '色',
    colorsDesc: {
      body: 'チャートに使う色を設定します。ここで指定した色が枠線の色になり、塗りの色は同じ色を薄くしたものになります。これによりダークモードとライトモードのどちらでも見やすくなります。',
      linkLead: '指定できるのは ',
      linkText: 'CSS で有効な色',
      linkTail: ' です。',
    },
    themeColors: {
      name: 'テーマの色を使う',
      desc: 'お使いの Obsidian テーマ（または CSS スニペット）が色を提供している場合、それを代わりに使います。',
    },
    color: {
      name: (index: number): string => `色 #${index}`,
      desc: '作成するチャートで枠線に使われる色です。',
      change: '色を変更',
      remove: '削除',
      reset: '既定値に戻す',
      add: '色を追加',
    },
    imageHeading: 'チャートの画像化',
    imageHowToUse: '使い方',
    imageFormat: {
      name: '画像形式',
      desc: 'チャートから画像を生成するときに使う形式です。',
    },
    imageQuality: {
      name: '画像の品質',
      desc: '非可逆形式を使う場合の画像品質を指定します。',
    },
  },
  commands: {
    insertNewChart: 'チャートを新規挿入',
    chartFromTableColumn: 'テーブルからチャートを作成（列方向）',
    chartFromTableRow: 'テーブルからチャートを作成（行方向）',
    chartToImage: 'チャートを画像化',
    contextMenuInsertChart: 'チャートを挿入',
  },
  notices: {
    renderingChart: 'チャートを描画しています…',
    tableMalformed: 'テーブルの形式が正しくありません',
  },
  errors: {
    couldNotRender: 'チャートを描画できませんでした:',
    consoleHint:
      '詳しいエラーはコンソールにも出ている場合があります。<kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>I</kbd> で開けます。',
    missingFields: 'type、labels、series のいずれかが指定されていません',
    invalidId: 'id またはファイルの指定が正しくありません',
    noTableAtId: '指定された id またはファイルにテーブルが見つかりません',
    alphaNotANumber: '指定された透明度が数値ではありません',
  },
  helper: {
    title: 'チャートを新規作成',
    chartType: {
      name: 'チャートの種類',
      desc: 'チャートの種類を選びます',
      options: {
        bar: '棒',
        line: '折れ線',
        pie: '円',
        doughnut: 'ドーナツ',
        radar: 'レーダー',
        polarArea: '鶏頭図',
      },
    },
    smoothness: {
      name: '滑らかさ',
      desc: '線の滑らかさを変更します',
    },
    width: {
      name: '幅',
      desc: '横幅を変更します',
    },
    fill: {
      name: '塗りつぶし',
      desc: '線の下側を塗りつぶします',
    },
    distinctColors: {
      name: 'ラベルごとに色を分ける',
      desc: 'ラベルごとに異なる色を使います',
    },
    startAtZero: {
      name: '0 から始める',
      desc: '縦軸の下端を切り詰めません',
    },
    xAxis: {
      name: 'X 軸',
      desc: 'ラベルを設定します（カンマ区切り）',
      placeholder: '月, 火, ...',
    },
    yAxis: {
      name: 'Y 軸',
      desc: 'データを設定します（カンマ区切り）',
      namePlaceholder: '系列名',
      dataPlaceholder: '1, -2, 11, 5',
    },
    addMore: '系列を追加',
    bestFitSection: '回帰直線（折れ線のみ）',
    bestFit: {
      name: '回帰直線',
      desc: '回帰直線を追加します',
    },
    bestFitId: {
      name: '対象の系列番号',
      desc: '回帰直線の計算に使う系列の番号です',
      placeholder: '0',
    },
    bestFitTitle: {
      name: '回帰直線の名前',
      desc: '回帰直線に付ける名前です',
      placeholder: '回帰直線',
    },
    insertChart: 'チャートを挿入',
  },
};
