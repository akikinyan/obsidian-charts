---
sidebar_position: 6
---

# Chart.js v4 Migration

This fork upgrades the bundled charting engine from Chart.js 3.9.1 to Chart.js
4.5.1 (along with `chartjs-chart-sankey` 0.12 → 0.15 and
`chartjs-plugin-annotation` 2.2.1 → 3.1.0). The plugin's own code needed only a
single import fix for this upgrade, but Chart.js options that you write in
your `chart` and `advanced-chart` code blocks are passed through to Chart.js
largely unvalidated. That means some options that worked on Chart.js 3 were
renamed or changed behavior in Chart.js 4, and existing notes that used them
may render differently after updating.

This page lists what changed that is actually reachable from your chart
options, so you know what to check if a chart looks different or stops
rendering.

## Why your options reach Chart.js directly

Three places in this plugin pass your YAML/JSON straight into Chart.js
without translating option names:

- Any extra keys you add to a series entry are spread directly onto the
  dataset object.
- The `advanced-chart` code block passes its JSON body straight to the
  renderer, unmodified.
- `window.renderChart` is exposed as a public API that other plugins (for
  example Dataview) call directly with their own Chart.js configuration
  objects.

Because of this, upgrading Chart.js can change how your existing options
behave even though nothing in this plugin's own source needed to change to
support it.

## Renamed scale options

Chart.js 4 moved the border-drawing options off of `scale.grid` and onto a
new `scale.border` object. If you set any of these directly in your chart
options, update them:

| Chart.js 3 (old)                    | Chart.js 4 (new)              |
| ------------------------------------ | ------------------------------ |
| `scales[id].grid.drawBorder`         | `scales[id].border.display`    |
| `scales[id].grid.borderWidth`        | `scales[id].border.width`      |
| `scales[id].grid.borderColor`        | `scales[id].border.color`      |
| `scales[id].grid.borderDash`         | `scales[id].border.dash`       |
| `scales[id].grid.borderDashOffset`   | `scales[id].border.dashOffset` |
| `scales[id].time.stepSize`           | `scales[id].ticks.stepSize`    |

### What did *not* change

- `scales[id].grid.color` is **unchanged**. This plugin itself sets
  `grid.color` (see the [Customization](/Customization) page), and plain
  `grid: { color: ... }` in your own options still works exactly as before.
- `borderColor` and `borderWidth` set on a **dataset** (i.e. inside a
  `series` entry, not inside `scales`) are **unaffected** by this rename.
  Only the scale-level `grid.borderWidth` / `grid.borderColor` /
  `grid.borderDash` / `grid.borderDashOffset` moved to `scale.border`. The
  examples throughout this documentation that use dataset-level
  `borderColor`/`borderWidth` (for example in the
  [Getting started](/) example) keep working unchanged.

## Other behavioral changes

A few other Chart.js 4 changes can affect notes that use more advanced
options:

- **Time/timeseries scales:** a `ticks.callback` on a `time` or `timeseries`
  scale now receives a raw timestamp instead of a pre-formatted label
  string. If you have a custom tick callback on a time axis, it needs to
  format the timestamp itself.
- **Tooltip callbacks:** the per-chart-type tooltip label defaults were
  unified across chart types. A tooltip callback that returns `undefined`
  now falls back to the default label instead of rendering an empty
  string.
- **Linear scales:** when a scale's computed `min` and `max` end up
  identical, the padding Chart.js adds around that single value increased
  from 1% to 5% of the max value, so single-value axes may look slightly
  more zoomed out.
- **`maintainAspectRatio`:** charts now respect the height of their
  containing element, so a chart inside a note element with a constrained
  height may size itself differently than before.
- **Custom Chart.js plugins:** the `destroy` plugin lifecycle hook was
  replaced by `afterDestroy`. This only matters if you (or another plugin)
  register a custom Chart.js plugin object; it has no effect on chart
  options written in a code block.

## Bundled plugin updates

### chartjs-chart-sankey (0.12 → 0.15)

The sankey layout engine was rewritten. Existing `sankey` charts may look
different even if you change nothing, because:

- New `nodePadding` and `modeX` options were added, and the padding
  calculation around nodes changed.
- Vertical orientation is now supported, in addition to horizontal
  (`orientation: vertical`).
- Several dataset options are new in 0.15 and simply did nothing on 0.12:
  `flowColor` / `hoverFlowColor`, `alpha`, `nodeLabels` and `flowLabels`.
  Nothing to migrate here — they were added during the 0.15 cycle (where
  they were briefly named "link colors" before being renamed to "flow
  colors"), so no 0.12 chart can have been using them.

Options you were already relying on continue to work: `priority`,
`colorFrom`, `colorTo`, and the `[from, flow, to]` triple form for data
entries are all still supported.

### chartjs-plugin-annotation (2.x → 3.x)

This plugin is now ESM-only and requires Chart.js 4, which is why it had to
be upgraded alongside Chart.js itself. The only API change relevant here is
the return type of the `init` options callback; the annotation options you
write in your chart's `annotation` configuration are unaffected.

## If your chart stopped rendering

If a note that used to render a chart now shows an error box instead, open
the developer console (<kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>I</kbd>) to
see the underlying Chart.js error. Most rendering failures after this
upgrade come from one of the renamed scale options above, or from a custom
Chart.js plugin that used the old `destroy` hook.
