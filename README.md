# Obsidian-Charts [![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/akikinyan/obsidian-charts)](https://github.com/akikinyan/obsidian-charts/releases) [![Release Obsidian Plugin](https://github.com/akikinyan/obsidian-charts/actions/workflows/release.yml/badge.svg)](https://github.com/akikinyan/obsidian-charts/actions/workflows/release.yml) ![GitHub all releases](https://img.shields.io/github/downloads/akikinyan/obsidian-charts/total)

This plugin lets you create interactive Charts in
[Obsidian](https://www.obsidian.md).

**[Read the Documentation](https://charts.phib.ro/)**

> [!IMPORTANT]
> **This is a fork** of the original
> [phibr0/obsidian-charts](https://github.com/phibr0/obsidian-charts). The
> only functional difference from upstream is an upgrade to Chart.js 4 (see
> the [Chart.js v4 Migration](./docusaurus/docs/Chart.js%20v4%20Migration.md)
> notes for what that changes for existing charts). This fork is **not**
> published on the official Obsidian community plugin store — it is
> distributed for testing purposes only, via
> [BRAT](https://github.com/TfTHacker/obsidian42-brat). See
> [How to install (BRAT)](#how-to-install-brat) below.

## How to install (BRAT)

This fork is meant for testers who want to try the Chart.js 4 upgrade before
it (potentially) reaches the official plugin. It is installed through
[BRAT](https://github.com/TfTHacker/obsidian42-brat) (Obsidian42 - BRAT),
not the community plugin browser.

1. Install the **BRAT** plugin from Obsidian's Community Plugins browser
   (search for "Obsidian42 - BRAT") and enable it.
2. Open the Command Palette and run
   **BRAT: Add a beta plugin with frozen version based on a release tag**.
3. Enter the repository path `akikinyan/obsidian-charts` and pick the
   release tag you want to test.
4. Enable **Charts** under Community Plugins once BRAT has installed it.

> [!WARNING]
> This fork's plugin id is `obsidian-charts` — **the same id as the official
> Charts plugin**. BRAT will install it into the same
> `.obsidian/plugins/obsidian-charts/` folder, which will **overwrite an
> existing official install** (and vice versa if you later install the
> official plugin over it). If you also use the official Charts plugin,
> test this fork in a **separate vault** that does not have the official
> plugin installed, to avoid one overwriting the other.

## How to install (official plugin, from upstream)

The steps below install the **official, upstream** Charts plugin from the
Obsidian community plugin store — not this fork. Use these only if you want
the original, unmodified plugin.

1. Go to **Community Plugins** in your [Obsidian](https://www.obsidian.md)
   Settings and **disable** Safe Mode
2. Click on **Browse** and search for "Charts"
3. Click install
4. Toggle the Plugin on in the **Community Plugins** Tab

## License

This project is licensed under the **GNU AGPL-3.0**, per the [`LICENSE`](./LICENSE)
file in this repository. (Note: `package.json` currently lists `MIT`, which
contradicts `LICENSE`; the `LICENSE` file is treated as authoritative here.
This is not legal advice — consult the file yourself, or a lawyer, if this
matters for your use case.)

## Support me

If you find this Plugin helpful, consider supporting me:

<a href="https://www.buymeacoffee.com/phibr0"><img src="https://img.buymeacoffee.com/button-api/?slug=phibr0&font_family=Inter&button_colour=FFDD00"></a>
