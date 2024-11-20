export function verifyUserToken(token){
    return new Promise(resolve => {
        fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/Auth/verify-user-token`, {
            method: "GET",
            headers: {'content-type': 'application/json', token}
        }).then(res => res.json()).then(res => resolve(res.miss))
    })
}