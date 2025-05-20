export default defineEventHandler(async (event) => {
    // TODO: Make API-call to delete token
    setCookie(event, 'auth_token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 0, // set maxAge = 0, to delete cookie
    });

    return true;
});
