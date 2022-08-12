const fs = require('fs');

async function execute(path, properties, jsonData, transformNested) {
    // Set transformNested to "_" if not set
    if(transformNested == null || transformNested == "") {
        transformNested = "_"
    }

    // Get json data into a variable
    let json;
    if (path) {
        const data = await fs.promises.readFile(path);
        json = JSON.parse(data);
    } else {
        json = JSON.parse(jsonData);
    }

    // Split porperty array into each property eg: [name, version, repository.url]
    let keyValueArray = []
    if(properties.startsWith('[')) {
        propertiesArray = properties.replace(/\[|\]/g, '').split(',');
        keyValueArray = getProperty(json, propertiesArray)
    }
    else{
        propertiesArray = properties.split(',');
        keyValueArray = getProperty(json, propertiesArray)
    }

    // Transform nested properties from a.b to a_b
    for (const keyValue of keyValueArray) {
        keyValue.key = keyValue.key.replace(/\./g, transformNested);
    }

    return keyValueArray;
}

function getProperty(json, properties) {
    let toReturn = [];
    for (const part of properties) {
        toReturn.push({key: part, value: getNestedValue(json, part)})
    }
    return toReturn;
}

function getNestedValue(json, property) {
    let toReturn = json;
    for (const part of property.split('.')) {
        toReturn = toReturn[part];
    }
    return toReturn;
}

module.exports = { execute };