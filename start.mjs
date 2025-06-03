import { register } from 'ts-node';
import { pathToFileURL } from 'url';

// Register ts-node with ESM support
register({
    transpileOnly: true,
    esm: true
});

// Dynamically import your TypeScript server file
import(pathToFileURL('./server.ts').href);
