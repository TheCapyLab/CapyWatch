import { ConcreteCapybaraOptions, CapybaraResult } from "../types";

export default {
    name: 'MemoryUsage',
    async run(options: ConcreteCapybaraOptions[] | ConcreteCapybaraOptions): Promise<CapybaraResult> {
        const cpuUsage = Math.random() * 100;
        const usage = parseFloat(cpuUsage.toFixed(2));
        const exceeded = usage >= (Array.isArray(options) ? options[0].threshold : options.threshold);
        const message = `Memory Usage is at ${usage}%`;
        return {
            title: exceeded ? 'High Memory Usage' : 'Memory Usage Normal',
            message,
            colour: exceeded ? (Array.isArray(options) ? options[0].colour : options.colour) : 'green',
        };
    }
}