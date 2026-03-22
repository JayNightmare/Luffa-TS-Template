const formatScope = (scope: string) => `[${scope}]`;

export const logger = {
    info(scope: string, message: string, payload?: unknown) {
        console.info(formatScope(scope), message, payload ?? '');
    },
    warn(scope: string, message: string, payload?: unknown) {
        console.warn(formatScope(scope), message, payload ?? '');
    },
    error(scope: string, message: string, payload?: unknown) {
        console.error(formatScope(scope), message, payload ?? '');
    }
};
