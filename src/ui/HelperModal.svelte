<script lang="ts" defer>
  import { debounce, Editor, parseYaml } from "obsidian";
  import type Renderer from "../chartRenderer";
  import { createEventDispatcher } from "svelte";
  import CollapsibleSection from './CollapsibleSection.svelte'
  import { renderError } from "src/util";
  import type { DataField } from "src/constants/settingsConstants";
import type { Chart } from "chart.js";
  import { t } from '../i18n';

  export let editor: Editor;
  export let renderer: Renderer;

  const strings = t();

  const dispatch = createEventDispatcher();

  let chartType: string = "bar";
  let lastChart: Chart = null;
  let tension: number = 20;
  let width: number = 80;
  let fill: boolean = false;
  let labelColors: boolean = false;
  let startAtZero: boolean = false;
  let bestFit: boolean = false;
  let bestFitTitle: string;
  let bestFitNumber: string = "0";
  let labels: string = "";
  let data: DataField[] = [{ dataTitle: "", data: "" }];
  let chart: string;
  let previewElement: HTMLDivElement = null;
  const debouncedRenderChart = debounce(
    async (yaml: any, el: HTMLElement) => {
      if(lastChart) lastChart.destroy();
      previewElement.lastElementChild?.remove();
      lastChart = renderer.renderRaw(await renderer.datasetPrep(parseYaml(yaml), el), el);
    },
    500,
    true
  );

  $: chart = `type: ${chartType}
labels: [${labels}]
series:
${data
  .map((data) => `  - title: ${data.dataTitle}\n    data: [${data.data}]`)
  .join("\n")}
tension: ${tension / 100}
width: ${width}%
labelColors: ${labelColors}
fill: ${fill}
beginAtZero: ${startAtZero}
bestFit: ${bestFit}
bestFitTitle: ${bestFitTitle}
bestFitNumber: ${bestFitNumber}`;

  $: {
    if (previewElement) {
      try {
        debouncedRenderChart(chart, previewElement);
      } catch (error) {
        renderError(error, previewElement);
      }
    }
  }

  function insertChart() {
    let doc = editor.getDoc();
    let cursor = doc.getCursor();
    lastChart.destroy();

    doc.replaceRange("```chart\n" + chart + "\n```", cursor);
    dispatch("close");
  }
</script>

<div class="chart-modal">
  <h3>{strings.helper.title}</h3>
  <div class="modalColumn">
    <div>
      <table style="width:100%">
        <tr>
          <td class="desc"
            ><p class="mainDesc">{strings.helper.chartType.name}</p>
            <p class="subDesc">{strings.helper.chartType.desc}</p></td
          ><td class="controlElement"
            ><select
              name="Chart Types"
              id="chart-types"
              class="dropdown"
              bind:value={chartType}
            >
              <option value="bar">{strings.helper.chartType.options.bar}</option>
              <option value="line">{strings.helper.chartType.options.line}</option>
              <option value="pie">{strings.helper.chartType.options.pie}</option>
              <option value="doughnut">{strings.helper.chartType.options.doughnut}</option>
              <option value="radar">{strings.helper.chartType.options.radar}</option>
              <option value="polarArea">{strings.helper.chartType.options.polarArea}</option>
            </select></td
          >
        </tr>
        <tr>
          <td class="desc"
            ><p class="mainDesc">{strings.helper.smoothness.name}</p>
            <p class="subDesc">{strings.helper.smoothness.desc}</p></td
          ><td class="controlElement"
            ><input
              type="range"
              min="0"
              max="100"
              class="slider"
              bind:value={tension}
            /></td
          >
        </tr>
        <tr>
          <td class="desc"
            ><p class="mainDesc">{strings.helper.width.name}</p>
            <p class="subDesc">{strings.helper.width.desc}</p></td
          ><td class="controlElement"
            ><input
              type="range"
              min="20"
              max="100"
              class="slider"
              bind:value={width}
            /></td
          >
        </tr>
        <tr>
          <td class="desc"
            ><p class="mainDesc">{strings.helper.fill.name}</p>
            <p class="subDesc">{strings.helper.fill.desc}</p></td
          ><td class="controlElement"
            ><input
              type="checkbox"
              class="task-list-item-checkbox"
              style="width: 16px; height: 16px"
              bind:checked={fill}
            /></td
          >
        </tr>
        <tr>
          <td class="desc"
            ><p class="mainDesc">{strings.helper.distinctColors.name}</p>
            <p class="subDesc">{strings.helper.distinctColors.desc}</p></td
          ><td class="controlElement"
            ><input
              type="checkbox"
              class="task-list-item-checkbox"
              style="width: 16px; height: 16px"
              bind:checked={labelColors}
            /></td
          >
        </tr>
        <tr>
          <td class="desc"
            ><p class="mainDesc">{strings.helper.startAtZero.name}</p>
            <p class="subDesc">{strings.helper.startAtZero.desc}</p></td
          ><td class="controlElement"
            ><input
              type="checkbox"
              class="task-list-item-checkbox"
              style="width: 16px; height: 16px"
              bind:checked={startAtZero}
            /></td
          >
        </tr>
      </table>
      <hr />
      <table style="width:100%">
        <tr>
          <td class="desc"
            ><p class="mainDesc">{strings.helper.xAxis.name}</p>
            <p class="subDesc">{strings.helper.xAxis.desc}</p></td
          >
          <td class="controlElement">
            <input
              type="text"
              placeholder={strings.helper.xAxis.placeholder}
              bind:value={labels}
            /><br />
          </td>
        </tr>
      </table>
      <hr />
      <table style="width:100%">
        {#each data as d, i}
          <tr>
            <td class="desc"
              ><p class="mainDesc">{strings.helper.yAxis.name}</p>
              <p class="subDesc">{strings.helper.yAxis.desc}</p></td
            >
            <td class="controlElement">
              <input type="text" placeholder={strings.helper.yAxis.namePlaceholder} bind:value={d.dataTitle} />
              <br />
              <input
                type="text"
                placeholder={strings.helper.yAxis.dataPlaceholder}
                style="margin-top: 3px;"
                bind:value={d.data}
              />
            </td>
          </tr>
        {/each}
        <div class="addMoreButtonContainer">
          <button
            on:click={() => (data = [...data, { data: "", dataTitle: "" }])}
            >{strings.helper.addMore}</button
          >
        </div>
      </table>
      <hr />
      <CollapsibleSection headerText={strings.helper.bestFitSection} >
        <hr>
      <table style="width:100%">
        <tr>
          <td class="desc"
          ><p class="mainDesc">{strings.helper.bestFit.name}</p>
            <p class="subDesc">{strings.helper.bestFit.desc}</p></td
          ><td class="controlElement"
        ><input
                type="checkbox"
                class="task-list-item-checkbox"
                style="width: 16px; height: 16px"
                bind:checked={bestFit}
        /></td
        >
        </tr>
        <tr>
          <td class="desc"
          ><p class="mainDesc">{strings.helper.bestFitId.name}</p>
            <p class="subDesc">{strings.helper.bestFitId.desc}</p></td
          ><td class="controlElement"
        ><input
                type="text"
                placeholder={strings.helper.bestFitId.placeholder}
                style="width: 26px; height: 32px"
                bind:value={bestFitNumber}
        /><br />
        </tr>
        <tr>
          <td class="desc"
          ><p class="mainDesc">{strings.helper.bestFitTitle.name}</p>
            <p class="subDesc">{strings.helper.bestFitTitle.desc}</p></td
          ><td class="controlElement">
          <input
                  type="text"
                  placeholder={strings.helper.bestFitTitle.placeholder}
                  style="width: 96px; height: 32px"
                  bind:value={bestFitTitle}
          /><br />
        </tr>
      </table>
        </CollapsibleSection>
    </div>
    <div class="chartPreview">
      <div id="preview" bind:this={previewElement} />
    </div>
  </div>
  <hr />
</div>
<div style="display: flex; justify-content: center; align-items: center;">
  <button class="mod-cta" on:click={insertChart}>{strings.helper.insertChart}</button>
</div>

<style>
  .addMoreButtonContainer {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.4rem;
  }

  .subDesc {
    font-size: smaller;
    opacity: 0.5;
    margin: 0;
  }
  .desc {
    padding-right: 1em;
  }
  .mainDesc {
    margin: 0;
  }
  table {
    margin: auto;
  }
  .controlElement {
    text-align: center;
  }
  .chart-modal {
    overflow-y: auto;
  }
  .modalColumn {
    display: flex;
    gap: 2em;
  }
  .chartPreview {
    width: 30vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
