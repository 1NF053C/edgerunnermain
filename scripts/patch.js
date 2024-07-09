const { execSync } = require('child_process');
const path = require('path');

// example command:
// node ./scripts/patch.js LiveMap MapboxMap
const [, , context, component] = process.argv;
if (!context || !component) {
    console.error('Please specify a context and component name');
    process.exit(1);
}

const componentPath = path.join(__dirname, '..', 'src', 'app', 'contexts', context, 'components', component);

try {
    process.chdir(componentPath);
    execSync('npm version patch', { stdio: 'inherit' });
    console.log(`Patched ${context}/${component} version successfully`);
} catch (error) {
    console.error(`Failed to patch ${context}/${component} version:`, error);
    process.exit(1);
}

