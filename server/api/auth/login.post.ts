export default defineEventHandler(async (event) => {
    interface LoginResponse {
        token: string;
    }
    const body = await readBody(event);
    const config = useRuntimeConfig();
    const { email, password } = body;

    try {
        const response = await $fetch<LoginResponse>(`${config.apiBaseUrl}/login`, {
            method: 'POST',
            body: { email, password },
        });

        setCookie(event, 'auth_token', response.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 дней, например
        });

        return true;
    } catch (e) {
        // console.log("error on login:", e);
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid login credentials',
        });
    }
});
