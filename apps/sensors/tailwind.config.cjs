module.exports = {
    mode: 'jit',
    theme: {
        container: {
            center: true
        }
    },
    purge: {
        content: ['./src/**/*.{html,js,svelte,ts}'],
        options: {
            safelist: [/data-theme$/]
        }
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
