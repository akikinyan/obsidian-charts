import {
  DEFAULT_SETTINGS,
  ImageOptions,
} from './../constants/settingsConstants';
import {
  App,
  MarkdownRenderer,
  Modal,
  Notice,
  PluginSettingTab,
  request,
  Setting,
} from 'obsidian';
import type ChartPlugin from '../main';
import Picker from 'vanilla-picker';
import { t } from 'src/i18n';

export class ChartSettingTab extends PluginSettingTab {
  plugin: ChartPlugin;

  constructor(app: App, plugin: ChartPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  isColor(strColor: string) {
    var s = new Option().style;
    s.color = strColor;
    return s.color == strColor;
  }

  display(): void {
    let { containerEl, plugin } = this;
    const strings = t();

    containerEl.empty();

    containerEl.createEl('h2', { text: strings.settings.title });

    containerEl.createEl('h3', { text: strings.settings.generalHeading });

    new Setting(containerEl)
      .setName(strings.settings.contextMenu.name)
      .setDesc(strings.settings.contextMenu.desc)
      .addToggle((cb) => {
        cb.setValue(this.plugin.settings.contextMenu).onChange(
          async (value) => {
            plugin.settings.contextMenu = value;
            await plugin.saveSettings();
          }
        );
      });
    new Setting(containerEl)
      .setName(strings.settings.donate.name)
      .setDesc(strings.settings.donate.desc)
      .addButton((bt) => {
        bt.buttonEl.outerHTML = `<a href="https://ko-fi.com/phibr0"><img src="https://uploads-ssl.webflow.com/5c14e387dab576fe667689cf/61e11e22d8ff4a5b4a1b3346_Supportbutton-1.png"></a>`;
      });

    containerEl.createEl('h3', {
      text: strings.settings.colorsHeading,
      attr: {
        style: 'margin-bottom: 0',
      },
    });
    const desc = containerEl.createEl('p', { cls: 'setting-item-description' });
    desc.append(
      strings.settings.colorsDesc.body,
      strings.settings.colorsDesc.linkLead,
      desc.createEl('a', {
        href: 'https://www.w3schools.com/cssref/css_colors.asp',
        text: strings.settings.colorsDesc.linkText,
      }),
      strings.settings.colorsDesc.linkTail
    );

    new Setting(containerEl)
      .setName(strings.settings.themeColors.name)
      .setDesc(strings.settings.themeColors.desc)
      .addToggle((cb) => {
        cb.setValue(plugin.settings.themeable).onChange(async (value) => {
          plugin.settings.themeable = value;
          await plugin.saveSettings();
          this.display();
        });
      });

    if (!plugin.settings.themeable) {
      plugin.settings.colors.forEach((color, idx) => {
        const nameEl = document.createDocumentFragment();
        nameEl.createSpan({ text: '●', attr: { style: `color: ${color}` } });
        nameEl.appendText(' ' + strings.settings.color.name(idx + 1));
        new Setting(containerEl)
          .setName(nameEl)
          .setDesc(strings.settings.color.desc)
          .addButton((btn) => {
            btn.setButtonText(strings.settings.color.change);
            new Picker({
              parent: btn.buttonEl,
              onDone: async (color) => {
                this.plugin.settings.colors[idx] = color.hex;
                await this.plugin.saveSettings();
                this.display();
              },
              popup: 'left',
              color: color,
              alpha: false,
            });
          })
          .addExtraButton((btn) => {
            btn
              .setIcon('trash')
              .setTooltip(strings.settings.color.remove)
              .onClick(async () => {
                this.plugin.settings.colors.remove(color);
                await this.plugin.saveSettings();
                this.display();
              });
            if (this.plugin.settings.colors.length === 1) {
              btn.setDisabled(true);
            }
          })
          .addExtraButton((btn) => {
            btn
              .setIcon('reset')
              .setTooltip(strings.settings.color.reset)
              .onClick(async () => {
                this.plugin.settings.colors[idx] =
                  DEFAULT_SETTINGS.colors[idx] ?? '#ffffff';
                await this.plugin.saveSettings();
                this.display();
              });
          });
      });

      new Setting(containerEl).addButton((btn) => {
        btn.setButtonText(strings.settings.color.add).onClick(async () => {
          this.plugin.settings.colors.push('#ffffff');
          await this.plugin.saveSettings();
          this.display();
        });
      });
    }

    containerEl.createEl('h3', { text: strings.settings.imageHeading });

    const detailEl = containerEl.createEl('details');
    detailEl.createEl('summary', { text: strings.settings.imageHowToUse });
    detailEl.createEl('img', {
      attr: {
        src: 'https://media.discordapp.net/attachments/855181471643861002/897811615037136966/charttoimage.gif',
      },
    });

    new Setting(containerEl)
      .setName(strings.settings.imageFormat.name)
      .setDesc(strings.settings.imageFormat.desc)
      .addDropdown((cb) => {
        cb.addOptions({
          'image/jpeg': 'jpeg',
          'image/png': 'png',
          'image/webp': 'webp',
        });
        cb.setValue(plugin.settings.imageSettings.format);
        cb.onChange(async (value) => {
          (plugin.settings.imageSettings.format as any) = value;
          await plugin.saveSettings();
        });
      });
    new Setting(containerEl)
      .setName(strings.settings.imageQuality.name)
      .setDesc(strings.settings.imageQuality.desc)
      .addSlider((cb) => {
        cb.setDynamicTooltip()
          .setLimits(0.01, 1, 0.01)
          .setValue(plugin.settings.imageSettings.quality)
          .onChange(async (value) => {
            plugin.settings.imageSettings.quality = value;
            await plugin.saveSettings();
          });
      });
  }
}
