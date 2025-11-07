export interface Capybara {
    name: string;
    run: (options: ConcreteCapybaraOptions) => Promise<CapybaraResult>;
}

export interface RegisteredCapybara {
    name: string;
    capybara: Capybara;
    options: ConcreteCapybaraOptions[] | ConcreteCapybaraOptions;
    type: 'single' | 'group';
    shouter: Shouter;
}

export interface CapybaraOptions {
    threshold?: number;
    message?: string;
    colour?: string;
}

export interface ConcreteCapybaraOptions {
    threshold: number;
    message: string;
    colour: string;
}

export interface Shouter {
    name: string;
    shout: (object: CapybaraResult) => void;
}

export interface CapybaraResult {
    title: string;
    message: string;
    colour: string;
}