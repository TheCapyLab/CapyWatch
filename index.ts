import CapyWatcher from "./capywatcher.js";
import cpuUsage from "./capybaras/cpuUsage.js";
import memory from "./capybaras/memory.ts";

const watcher = new CapyWatcher([
    CapyWatcher.registerCapybara(cpuUsage, { threshold: 80 }),
    CapyWatcher.registerCapybara(memory, [
        { threshold: 70, colour: 'yellow' },
        { threshold: 80, colour: 'orange'},
        { threshold: 90, colour: 'red'},
    ], 'High Memory Usage'),

], { interval: 200});

watcher.run();