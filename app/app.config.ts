export default defineAppConfig({
    ui: {
        primary: 'amber',
        gray: 'zinc',
        variables: {
            light: {
                background: '255 255 255',
                foreground: 'var(--color-gray-700)',
            },
            dark: {
                background: 'var(--color-gray-900)',
                foreground: 'var(--color-gray-200)',
            },
            header: {
                height: '4rem',
            },
        },
        icons: {
            dark: 'i-heroicons-moon-20-solid',
            light: 'i-heroicons-sun-20-solid',
            system: 'i-heroicons-computer-desktop-20-solid',
            search: 'i-heroicons-magnifying-glass-20-solid',
            external: 'i-heroicons-arrow-up-right-20-solid',
            chevron: 'i-heroicons-chevron-down-20-solid',
            hash: 'i-heroicons-hashtag-20-solid',
            menu: 'i-heroicons-bars-3-20-solid',
            close: 'i-heroicons-x-mark-20-solid',
            check: 'i-heroicons-check-circle-20-solid',
        },
        button: {
            base: 'uppercase font-medium text-xs',
        },
        container: {
            padding: 'px-2 sm:px-4 lg:px-6',
        },
        formGroup: {
            help: 'mt-0 text-xs text-gray-500 dark:text-gray-400',
        },
        avatar: {
            background: 'bg-primary-500/10 dark:bg-primary-400/10',
            icon: {
                base: 'text-primary-500 dark:text-primary-400 flex-shrink-0',
            },
        },
    },
})
