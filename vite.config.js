import { transformAsync } from '@babel/core';
import emotion from '@emotion/babel-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        {
            name: 'emotion-component-selectors',
            enforce: 'pre',
            async transform(code, id) {
                const [filePath] = id.split('?');
                if (!/\.[jt]sx?$/.test(filePath) || filePath.includes('/node_modules/')) return null;
                const result = await transformAsync(code, {
                    filename: filePath,
                    babelrc: false,
                    configFile: false,
                    sourceType: 'module',
                    parserOpts: { plugins: ['jsx', 'typescript'] },
                    plugins: [[emotion, { sourceMap: false }]],
                });
                if (!result?.code) return null;
                return { code: result.code, map: result.map };
            },
        },
        react(),
    ],
});
