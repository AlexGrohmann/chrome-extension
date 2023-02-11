import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

// Generate CSS/JS Builds
esbuild
    .build({
        entryPoints: ['src/scss/main.scss', 'src/js/index.js'],
        outdir: 'dist',
        bundle: true,
        metafile: true,
        plugins: [
            sassPlugin({
                async transform(source) {
                    const { css } = await postcss([autoprefixer]).process(
                        source,
                    );
                    return css;
                },
            }),
        ],
    })
    .then(() => console.log('⚡ Build complete! ⚡'))
    .catch(() => process.exit(1));
