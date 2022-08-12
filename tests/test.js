const action = require('../action');

test('get single property from json provided as a text', async () => {
    var result = await action.execute(null, 'name', '{"name": "value"}', '_');
    expect(result).toEqual([{key: 'name', value: 'value'}]);
});

test('iterate over result', async () => {
    var result = await action.execute(null, 'name', '{"name": "value"}', '_');
    for (const i in result) {
        const keyValue = result[i];
        expect(keyValue.key).toEqual('name');
        expect(keyValue.value).toEqual('value');
    }
});

test('get multiple properties from json provided as a text', async () => {
    var result = await action.execute(null, 'name,version', '{"name": "value", "version": "1.0.0"}', '_');
    expect(result).toEqual([{key: 'name', value: 'value'}, {key: 'version', value: '1.0.0'}]);
});

test('get nested property from json provided as a text', async () => {
    var result = await action.execute(null, 'repository.name', '{"repository": {"name": "test"}}', '_');
    expect(result).toEqual([{key: 'repository_name', value: 'test'}]); 
});

test('get nested property from json provided as a text with transformNested', async () => {
    var result = await action.execute(null, 'repository.name', '{"repository": {"name": "test"}}', '.');
    expect(result).toEqual([{key: 'repository.name', value: 'test'}]); 
});

test('get array as input with nested properties', async () => {
    var result = await action.execute(null, '[name,version,repository.name]', '{"name": "value", "version": "1.0.0", "repository": {"name" : "test"} }', '_');
    expect(result).toEqual([{key: 'name', value: 'value'}, {key: 'version', value: '1.0.0'}, {key: 'repository_name', value: 'test'}]);
});

test('get array as input with nested properties with space between itesm', async () => {
    var result = await action.execute(null, '[name, version, repository.name]', '{"name": "value", "version": "1.0.0", "repository": {"name" : "test"} }', '_');
    expect(result).toEqual([{key: 'name', value: 'value'}, {key: 'version', value: '1.0.0'}, {key: 'repository_name', value: 'test'}]);
});


test('get input from file', async () => {
    var result = await action.execute('./tests/test.json', 'name', null, '_');
    expect(result).toEqual([{key: 'name', value: 'value'}]);
});