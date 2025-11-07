import { ConcreteCapybaraOptions, CapybaraResult } from "../types";

export default {
    name: 'MemoryUsage',
    async run(options: ConcreteCapybaraOptions): Promise<CapybaraResult> {
        const cpuUsage = Math.random() * 100;
        const usage = parseFloat(cpuUsage.toFixed(2));
        const exceeded = usage >= options.threshold;
        const message = `CPU Usage is at ${usage}%`;
        return {
            title: exceeded ? 'High CPU Usage' : 'CPU Usage Normal',
            message,
            colour: exceeded ? options.colour : 'green',
        };
    }
}