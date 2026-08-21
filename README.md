# Obsidian Charts（フォーク版）

[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/akikinyan/obsidian-charts)](https://github.com/akikinyan/obsidian-charts/releases) [![Release Obsidian Plugin](https://github.com/akikinyan/obsidian-charts/actions/workflows/release.yml/badge.svg)](https://github.com/akikinyan/obsidian-charts/actions/workflows/release.yml) ![GitHub all releases](https://img.shields.io/github/downloads/akikinyan/obsidian-charts/total)

これは [phibr0/obsidian-charts](https://github.com/phibr0/obsidian-charts)（プラグイン名 "Charts"、プラグインID `obsidian-charts`）のフォークである。[Obsidian](https://www.obsidian.md) の `chart` ブロックと `advanced-chart` ブロックから Chart.js のグラフを描画するプラグインで、本体の機能は upstream と同じである。upstream の最新リリースは 3.9.0（2024年1月）で、それ以降更新が止まっている。

このフォークは Obsidian の公式コミュニティプラグイン一覧には登録していない。[BRAT](https://github.com/TfTHacker/obsidian42-brat) 経由でのテスト配布のみを行っている。

> [!IMPORTANT]
> このフォークで upstream から変更したのは次の2点のみである。
> 1. Chart.js を 3.9.1 → 4.5.1 に更新（依存ライブラリの更新を含む）
> 2. 設定画面・コマンド等の日本語ローカライズ
>
> 詳細は以下の各節を参照。

## BRAT を使った導入方法

このフォークはコミュニティプラグイン一覧からは入手できないため、[BRAT](https://github.com/TfTHacker/obsidian42-brat)（Obsidian42 - BRAT）を使ってインストールする。

1. Obsidian のコミュニティプラグインから **Obsidian42 - BRAT** をインストールし、有効化する。
2. コマンドパレットで **BRAT: Add a beta plugin with frozen version based on a release tag** を実行する。
3. リポジトリパスに `akikinyan/obsidian-charts` を入力し、試したいリリースタグを選ぶ。
4. コミュニティプラグイン一覧で **Charts** を有効化する。

配布しているタグは次の2つ。

| タグ | 内容 |
| --- | --- |
| `4.0.0-beta.1` | Chart.js 4 版のビルド |
| `3.9.0-brat.1` | Chart.js 3.9.1 のままの upstream 未改変コード。比較用のベースラインとして配布 |

> [!WARNING]
> このフォークのプラグインIDは `obsidian-charts` であり、**公式の Charts プラグインと同じID**である。そのため BRAT は同じ `.obsidian/plugins/obsidian-charts/` フォルダにインストールし、公式版が入っていればそれを**上書きする**（逆に公式版を後から入れた場合もこのフォークを上書きする）。
>
> また、両者は `chart` / `advanced-chart` コードブロックと `window.renderChart` グローバル関数を同じ名前で登録するため、IDを分けたとしても**両方を同時に有効化することはできない**。
>
> テストする場合は、公式の Charts プラグインが入っていない**別 Vault** を用意すること。

## Chart.js 3.9.1 → 4.5.1 への更新

Chart.js を 4.5.1 に上げ、あわせて `chartjs-chart-sankey` を 0.12 → 0.15、`chartjs-plugin-annotation` を 2.2.1 → 3.1.0 に上げた。annotation プラグインの v3 系が Chart.js 4 を要求するため、この3つは一緒に上げる必要がある。

プラグイン自体のソースコードで必要だった変更は型のインポート1箇所のみである。バンドルサイズは 343.7kb → 363.2kb に増加した。

> [!NOTE]
> この更新はノート内の `chart` / `advanced-chart` ブロックに書く Chart.js のオプション名にも影響する。よく踏むものを2つ挙げる。
> - `scales[<id>].grid.border*` 系 → `scales[<id>].border.*`
> - `time.stepSize` → `ticks.stepSize`
>
> なお、単純な `grid: { color: ... }` は変更していない。
>
> 詳細と網羅的な対応表は [`docusaurus/docs/Chart.js v4 Migration.md`](./docusaurus/docs/Chart.js%20v4%20Migration.md) を参照。

## UIの日本語ローカライズ

設定画面、コマンドパレットの4コマンド、右クリックメニューの「Insert Chart」、グラフ作成モーダル、エラーメッセージが Obsidian の表示言語に追従するようにした。対応言語は日本語と英語で、それ以外の言語は英語にフォールバックする。

実装は `src/i18n/`（`index.ts` と `locales/en.ts`、`locales/ja.ts`）にある。表示言語の判定には Obsidian の新しい `getLanguage()` API ではなく、localStorage の `language` キーを直接読む方式を使っている。これは本プラグインの `minAppVersion` が `0.12.7` であり、`getLanguage()` はそれより新しいバージョンでしか使えないためである。

言語を追加する場合は `src/i18n/locales/` に1ファイル追加し、`src/i18n/index.ts` に登録すればよい。

## そのほかの変更

- リリースワークフローを `gh release create` ベースで書き直し、Node 20 と `npm ci` を使うようにした。
- 使われていなかった `yarn.lock` を廃止し、`package-lock.json` をコミットするようにした。
- esbuild によるビルドは型チェックを行わないため、`npm run typecheck` スクリプトを追加した。

## ビルド方法

Node 20 以上が必要。

```bash
npm ci
npm run dev       # 開発時（watch）
npm run build     # リリースビルド（main.js を生成）
npm run typecheck # 型チェックのみ
```

## 使い方（ドキュメント）

グラフの書き方などの基本的な使い方は upstream のドキュメントサイト **[charts.phib.ro](https://charts.phib.ro/)** を参照。このサイトは upstream 向けの内容であり、このフォークでの変更（Chart.js v4 移行の影響など）は含まれていないので、その点は上記の [Chart.js v4 Migration](./docusaurus/docs/Chart.js%20v4%20Migration.md) を併読すること。

## 現状（テストビルドである旨）

Chart.js 4 への更新版は、更新前と同じ型チェックを通過し、ビルドも成功している。しかし **Obsidian上での実際の描画確認はまだ十分に行っていない**。特に sankey チャートは動作未確認である。これはテスト目的のビルドであり、本番のノートで使う前に自分の環境で一度確認することを推奨する。

## ライセンス

このリポジトリの [`LICENSE`](./LICENSE) ファイルは **GNU AGPL-3.0** である。一方で `package.json` の `license` フィールドは `MIT` と記載されており、両者は矛盾している。本README では `LICENSE` ファイルを正とみなす。これは法的助言ではないので、利用にあたって重要な場合は自身で `LICENSE` ファイルを確認するか、専門家に相談すること。`LICENSE` と `package.json` はこのフォークでは変更していない。

## 謝辞

このプラグイン本体は [phibr0](https://github.com/phibr0) 氏の作品である。このフォークが行っているのは依存ライブラリの更新とローカライズの追加のみで、本体の設計・実装は upstream に由来する。

---

## English summary

This is a fork of [phibr0/obsidian-charts](https://github.com/phibr0/obsidian-charts) (plugin id `obsidian-charts`), maintained at `akikinyan/obsidian-charts`. It renders Chart.js charts from `chart` and `advanced-chart` code blocks in Obsidian, same as upstream, whose last release was 3.9.0 (January 2024).

This fork adds exactly two things on top of upstream: an upgrade from Chart.js 3.9.1 to 4.5.1 (with the matching `chartjs-chart-sankey` and `chartjs-plugin-annotation` bumps, which renames a few scale options — see [`docusaurus/docs/Chart.js v4 Migration.md`](./docusaurus/docs/Chart.js%20v4%20Migration.md)), and Japanese/English UI localisation for the settings, commands, and modal.

It is not on the community plugin store; install it via [BRAT](https://github.com/TfTHacker/obsidian42-brat) using repository path `akikinyan/obsidian-charts`. Its plugin id is identical to the official plugin's, so BRAT will overwrite an existing official install (and vice versa) — test in a separate vault.

Rendering in Obsidian has not been fully verified yet for the Chart.js 4 build, particularly sankey charts. All credit for the plugin itself goes to [phibr0](https://github.com/phibr0).
