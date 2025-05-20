import { H3Event } from 'h3'

export const fetchWithAuth = async <T>(
    event: H3Event,
    url: string,
    options: any = {}
) => {
    const token = getCookie(event, 'auth_token');
    const config = useRuntimeConfig();

    return await $fetch<T>(config.apiBaseUrl + url, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...options?.headers,
        },
        ...options,
    })
}