import chroma from "chroma-js";
import type { App, Editor, TFile } from "obsidian";
import type { ChartPluginSettings } from "src/constants/settingsConstants";
import type Renderer from "src/chartRenderer";
import { t } from "src/i18n";

export function generateInnerColors(colors: string[], alpha = 0.25) {
    if(typeof alpha != 'number') throw t().errors.alphaNotANumber
    return colors.map((color: string) => chroma(color.trim()).alpha(alpha).hex());
}

export function renderError(error: any, el: HTMLElement) {
    const strings = t();
    const errorEl = el.createDiv({ cls: "chart-error" });
    errorEl.createEl("b", { text: strings.errors.couldNotRender });
    errorEl.createEl("pre").createEl("code", { text: error.toString?.() ?? error });
    errorEl.createEl("hr");
    errorEl.createEl("span").innerHTML = strings.errors.consoleHint;
}

export function base64ToArrayBuffer(base64: string) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export async function saveImageToVaultAndPaste(editor: Editor, app: App, renderer: Renderer, source: TFile, settings: ChartPluginSettings) {
    const image = await renderer.imageRenderer(editor.getSelection(), settings.imageSettings);
    console.log("image converted")
    const file = await app.vault.createBinary(
        //@ts-ignore
        await app.vault.getAvailablePathForAttachments(`Chart ${new Date().toDateString()}`, settings.imageSettings.format.split('/').last(), source),
        base64ToArrayBuffer(image)
    );
    console.log("Image saved")

    editor.replaceSelection(app.fileManager.generateMarkdownLink(file, source.path));
}