import { ConcreteCapybaraOptions, CapybaraResult } from "../types";

export default {
    name: 'CPUUsage',
    async report(options: ConcreteCapybaraOptions, result: CapybaraResult) {
        
    },
    async getStat(){
        const cpuUsage = Math.random() * 100;
        return { result: cpuUsage };
    }
}