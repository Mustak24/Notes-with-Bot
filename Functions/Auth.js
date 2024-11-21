export function verifyUserToken(token, req){

    const protocol = req.headers['x-forwarded-proto'] || (req.connection.encrypted ? 'https' : 'http');
    const host = req.headers.host;
    const origin = `${protocol}://${host}`;

    return new Promise(resolve => {
        fetch(`${origin}/api/Auth/verify-user-token`, {
            method: "GET",
            headers: {'content-type': 'application/json', token}
        }).then(res => res.json()).then(res => resolve(res.miss))
    })
}