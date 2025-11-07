import { Shouter, ShouterObject } from '../types.js';

export const ConsoleShouter: Shouter = {
    name: 'ConsoleShouter',
    shout: (object: ShouterObject) => {
        console.log(`%c${object.message}`, `color: ${object.colour}; font-weight: bold;`);
    }
}

export default ConsoleShouter;