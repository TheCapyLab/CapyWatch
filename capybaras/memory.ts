import { ConcreteCapybaraOptions, CapybaraResult } from "../types";

export default {
    name: 'MemoryUsage',
    async report(options: ConcreteCapybaraOptions, result: CapybaraResult) {
        
    },
    async getStat(){
        const memoryUsage = Math.random() * 100;
        return { result: memoryUsage };
    }
}