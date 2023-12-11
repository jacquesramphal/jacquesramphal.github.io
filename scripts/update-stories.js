const fs = require('fs-extra');
const esprima = require('esprima');
const escodegen = require('escodegen');

// Read the component file
const componentCode = fs.readFileSync('./path/to/your/Button.vue', 'utf-8');

// Parse the component file
const parsedCode = esprima.parseScript(componentCode);

// Find the new variant in the parsed code
// This will depend on how your variants are defined in your component file
let newVariant;
for (let statement of parsedCode.body) {
    if (statement.type === 'VariableDeclaration') {
        for (let declaration of statement.declarations) {
            if (declaration.id.name === 'variants') {
                newVariant = declaration.init.elements.map(element => element.value);
            }
        }
    }
}

// Read the stories file
let storiesCode = fs.readFileSync('./path/to/your/Button.stories.js', 'utf-8');

// Parse the stories file
let parsedStories = esprima.parseModule(storiesCode);

// Update the stories file with the new variant
// This will depend on how your stories file is structured
for (let statement of parsedStories.body) {
    if (statement.type === 'ExportNamedDeclaration') {
        for (let declaration of statement.declaration.declarations) {
            if (declaration.id.name === 'argTypes') {
                for (let property of declaration.init.properties) {
                    if (property.key.name === 'type') {
                        property.value.properties[1].value.elements = newVariant.map(variant => ({
                            type: 'Literal',
                            value: variant,
                        }));
                    }
                }
            }
        }
    }
}

// Generate the updated stories code
let updatedStoriesCode = escodegen.generate(parsedStories);

// Write the updated stories code back to the stories file
fs.writeFileSync('./path/to/your/Button.stories.js', updatedStoriesCode);