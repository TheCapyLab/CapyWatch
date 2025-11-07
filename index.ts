import CapyWatcher from "./capywatcher.js";
import cpuUsage from "./capybaras/cpuUsage.js";
import memory from "./capybaras/memory.ts";
import ConsoleShouter from "./shouters/ConsoleShouter.ts";

const watcher = new CapyWatcher([
    CapyWatcher.registerCapybara(cpuUsage, { threshold: 80}, 'High CPU Usage', ConsoleShouter),
    CapyWatcher.registerCapybara(memory, [
        { threshold: 70, colour: 'yellow'},
        { threshold: 80, colour: 'orange'},
        { threshold: 90, colour: 'red'},
    ], 'High Memory Usage', ConsoleShouter),

], { INTERVAL: 200, LOG_WHEN_CHECKED: true, LOG_WHEN_EXCEEDED: true });

watcher.run();