import { ConcreteCapybaraOptions, CapybaraResult } from "../types";

export default {
    name: 'CPUUsage',
    async run(options: ConcreteCapybaraOptions | ConcreteCapybaraOptions[]): Promise<CapybaraResult> {
        const cpuUsage = Math.random() * 100;
        const usage = parseFloat(cpuUsage.toFixed(2));
        const exceeded = usage >= (Array.isArray(options) ? options[0].threshold : options.threshold);
        const message = `CPU Usage is at ${usage}%`;
        return {
            title: exceeded ? 'High CPU Usage' : 'CPU Usage Normal',
            message,
            colour: exceeded ? (Array.isArray(options) ? options[0].colour : options.colour) : 'green',
        };
    }
}