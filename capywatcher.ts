import type { Capybara, RegisteredCapybara, CapybaraOptions, ConcreteCapybaraOptions } from "./types";

export default class CapyWatcher {
    private capybaras: RegisteredCapybara[];
    private options: any;
    private interval: number;

    static DEFAULT_CAPYBARA_OPTIONS: ConcreteCapybaraOptions = {
        threshold: 75,
        message: 'Threshold exceeded',
        colour: 'red'
    };

    static DEFAULT_OPTIONS = {
        interval: 1000,
        LOG_WHEN_CHECKED: true,
        LOG_WHEN_EXCEEDED: true
    };

    static registerCapybara(capybara: Capybara, options: CapybaraOptions | CapybaraOptions[], name?: string): RegisteredCapybara {
        const normalizedOptions = (Array.isArray(options) ? options : [options])
            .map(opt => ({ ...this.DEFAULT_CAPYBARA_OPTIONS, ...opt }));

        const threshold = normalizedOptions[0]?.threshold ?? this.DEFAULT_CAPYBARA_OPTIONS.threshold;

        const resolvedName =
            name ||
            (capybara.name ? `${capybara.name} (${threshold})` : 'UnnamedCapybara');

        const _capybara: RegisteredCapybara = {
            name: resolvedName,
            capybara,
            options: normalizedOptions,
            type: normalizedOptions.length > 1 ? 'group' : 'single'
        };
        console.log(_capybara);
        return _capybara;
    }

    constructor(capybaras: RegisteredCapybara[], options: any = {}) {
        this.capybaras = [];
        this.options = { ...CapyWatcher.DEFAULT_OPTIONS, ...options };
        this.interval = this.options.interval || 5000;
        this.capybaras = capybaras;
    }

    async monitor() {
        for (const capybara of this.capybaras) {
            console.log(`[CapyWatcher] Monitoring ${capybara.name} | Type: ${capybara.type}...`);
            console.log(capybara);
        }
    }

    run() {
        setInterval(() => this.monitor(), this.interval);
    }
}