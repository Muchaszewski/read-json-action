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