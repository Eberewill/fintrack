export interface ApiEndpoint {
    method: string;
    getEndpoint: (params?: Record<string, unknown>) => string;
}

export const endpoints = {
    v1: {
        auth: {
            login: { method: 'POST', getEndpoint: () => '/auth/login' },
            me: { method: 'GET', getEndpoint: () => '/auth/me' },
        },
        dashboard: {
            stats: { method: 'GET', getEndpoint: () => '/dashboard/stats' },
            recentTransactions: { method: 'GET', getEndpoint: () => '/dashboard/transactions' },
        },
        transactions: {
            list: { method: 'GET', getEndpoint: () => '/transactions' },
            create: { method: 'POST', getEndpoint: () => '/transactions' },
        }
    }
} as const;
