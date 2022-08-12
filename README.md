# Read Json Properties for Github Action
Reads provided json file and outputs requested values into action pipeline

Inputs:

```
    path: 'package.json' // Path to the json file
    json: '{"name": "value"}' // Json raw input as text
    properties: "name" // Property or an array to read eg: "[name, version, repository.url]" or "name"
    transformNested: '_' // A sign that replaces `.` for ouput values

```

Outputs:

```
    Each property is accessed via it's property name using outputs value eg: {{steps.read_property.outputs.name}}. If a property is nested `.` is replaced with '_' by default eg: {{steps.read_property.repository_url}}
```

Usage:

```
    # Read package.json and output name property
    - name: Read Json Properties Action
        uses: muchaszewski/read-json-action@release
        with:
            # Path to the json file
            path: "package.json"
            # Property or an array to read eg: "[name, version, repository.url]" dot separated for nested values
            # valid syntaxes
            # - "name"
            # - "[name, version, repository.url]"
            # - "name, version, repository.url, description"
            properties: "name, version, repository.url, description"
            # A sign that replaces `.` for ouput values
            transformNested: "_"

    # Outputs
    - name: Some Action
        with:
            value: "{{steps.read_property.outputs.name}} {{steps.read_property.outputs.version}}"
            url: "{{steps.read_property.repository_url}}"
            description: "{{steps.read_property.outputs.description}}"
```