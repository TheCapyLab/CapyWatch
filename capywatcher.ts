import type { Capybara, RegisteredCapybara, CapybaraOptions, ConcreteCapybaraOptions, Shouter } from "./types";
import ConsoleShouter from "./shouters/ConsoleShouter.js";
export default class CapyWatcher {
    private capybaras: RegisteredCapybara[];
    private options: any;
    private interval: number;

    static DEFAULT_CAPYBARA_OPTIONS: ConcreteCapybaraOptions = {
        threshold: 75,
        message: 'Threshold exceeded',
        colour: 'red',
    };

    static DEFAULT_OPTIONS = {
        INTERVAL: 1000,
        LOG_WHEN_CHECKED: true,
        LOG_WHEN_EXCEEDED: true,
        LOG_WHEN_INITIALISED: true,
    };

    static registerCapybara(capybara: Capybara, options: CapybaraOptions | CapybaraOptions[], name?: string, shouter?: Shouter): RegisteredCapybara {
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
            type: normalizedOptions.length > 1 ? 'group' : 'single',
            shouter: shouter || ConsoleShouter
        };
        return _capybara;
    }

    constructor(capybaras: RegisteredCapybara[], options: any = {}) {
        this.capybaras = [];
        this.options = { ...CapyWatcher.DEFAULT_OPTIONS, ...options };
        this.interval = this.options.INTERVAL || 5000;
        this.capybaras = capybaras;

        if(this.options.LOG_WHEN_INITIALISED) {
            console.log(`[CapyWatcher][${this.getNow()}] Initialized with ${this.capybaras.length} capybara(s).`);
            console.log(`[CapyWatcher][${this.getNow()}] Interval: ${this.interval}ms.`);
        }
    }

    async monitor() {
        for (const capybara of this.capybaras) {
            if(this.options.LOG_WHEN_CHECKED) console.log(`[CapyWatcher][${this.getNow()}] Running ${capybara.name}`);
        }
    }

    run() {
        setInterval(() => this.monitor(), this.interval);
    }

    private getNow():string {
        const d = new Date();
        return `${this._numPad(d.getHours(), 2)}:${this._numPad(d.getMinutes(), 2)}:${this._numPad(d.getSeconds(), 2)}`;
    }
    private _numPad(num: number, size: number): string {
        let s = num.toString();
        while (s.length < size) s = "0" + s;
        return s;
    }
}