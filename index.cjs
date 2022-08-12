const core = require('@actions/core');
const action = require('./action');

(async () => {
    try {
        // Get properties
        const path = core.getInput('path');
        const properties = core.getInput('properties');
        const jsonData = core.getInput('json');
        const transformNested = core.getInput('transformNested');

        let keyValueArray = await action.execute(path, properties, jsonData, transformNested);
        for (const i of keyValueArray) {
            const keyValue = keyValueArray[i];
            if(keyValue != null) {
                core.setOutput(keyValue.key, keyValue.value);
            }
        }

    } catch (error) {
        core.setFailed(error.message);
    }
})();