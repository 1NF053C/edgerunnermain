import * as fs from 'fs';
import * as path from 'path';

const envFilePath = path.resolve(__dirname, '.env');
const envFileContent = fs.readFileSync(envFilePath, { encoding: 'utf-8' });

const requiredVars: string[] = [];
const conditionalVars: { [key: string]: string[] } = {};

envFileContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
        const [keyValue, ...comment] = line.split('#');
        const [key, value] = keyValue.split('=').map(part => part.trim());

        if (comment.length > 0) {
            const commentText = comment.join('#').trim();
            if (commentText === 'required') {
                requiredVars.push(key);
            } else if (commentText.startsWith('required_if=')) {
                const condition = commentText.split('=')[1].trim();
                if (!conditionalVars[condition]) {
                    conditionalVars[condition] = [];
                }
                conditionalVars[condition].push(key);
            }
        }

        process.env[key] = value;
    }
});

requiredVars.forEach(varName => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
});

Object.keys(conditionalVars).forEach(condition => {
    if (process.env[condition] === 'true') {
        conditionalVars[condition].forEach(varName => {
            if (!process.env[varName]) {
                throw new Error(`Missing required environment variable: ${varName} because ${condition} is set`);
            }
        });
    }
});

console.log('Environment variables loaded successfully.');
