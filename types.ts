export type CapybaraResult =  Promise<{ [key: string] : any  }>;
export interface Capybara {
    name: string;
    report: (options: ConcreteCapybaraOptions, result: CapybaraResult) => void;
    getStat: () => CapybaraResult;
}

export interface RegisteredCapybara {
    name: string;
    capybara: Capybara;
    options: ConcreteCapybaraOptions[] | ConcreteCapybaraOptions;
    type: 'single' | 'group';
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