'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createApiClient } from '../lib/api/client';

const ApiClientContext = createContext<any>(null);

export const ApiClientWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useMemo(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5 minutes
            },
        },
    }), []);

    const apiClient = useMemo(() => {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api/v1';
        return createApiClient(baseUrl);
    }, []);

    return (
        <ApiClientContext.Provider value={apiClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ApiClientContext.Provider>
    );
};

export const useApiClient = () => {
    const context = useContext(ApiClientContext);
    if (!context) {
        throw new Error('useApiClient must be used within an ApiClientWrapper');
    }
    return context;
};
