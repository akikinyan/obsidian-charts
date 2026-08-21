import { en } from './locales/en';
import type { LocaleStrings } from './locales/en';
import { ja } from './locales/ja';

const locales: Record<string, LocaleStrings> = { en, ja };

/**
 * Obsidian stores the display language under the `language` key in localStorage.
 * The `getLanguage()` helper would be nicer, but it only exists in much newer
 * API versions than this plugin's `minAppVersion` (0.12.7) allows.
 *
 * An unset key means Obsidian itself is showing English, so that is what we
 * return. Deliberately NOT falling back to `navigator.language`: that would put
 * the plugin in Japanese while the surrounding Obsidian UI stayed English, for
 * anyone running an English Obsidian on a Japanese OS.
 */
function detectLanguage(): string {
    let stored: string | null = null;
    try {
        stored = window.localStorage.getItem('language');
    } catch (error) {
        // Storage can be unavailable in restricted contexts; English is the safe default.
    }
    return (stored || 'en').toLowerCase().replace(/_/g, '-');
}

/** Strings for the current Obsidian display language, falling back to English. */
export function t(): LocaleStrings {
    const language = detectLanguage();
    return locales[language] ?? locales[language.split('-')[0]] ?? en;
}
