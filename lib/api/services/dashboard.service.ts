import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../contexts/api.context';
import { endpoints } from '../api/endpoints';

export const useDashboardStats = () => {
    const apiClient = useApiClient();
    const resource = endpoints.v1.dashboard.stats;
    const endpoint = resource.getEndpoint();

    return useQuery({
        queryKey: [resource.method, endpoint, {}],
        queryFn: async () => {
            const response = await apiClient.request({
                method: resource.method,
                endpoint,
            });
            return response.data;
        },
    });
};
