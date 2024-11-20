export function fetchAllChats(token){
    return new Promise(resolve => {
        fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/chats/getall`, {
            method: 'GET',
            headers: {'content-type': 'application/json', token}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function createChat(token, chat){
    return new Promise(resolve => {
        fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/chats/create`, {
            method: 'POST',
            body: JSON.stringify({chat}),
            headers: {'content-type': 'application/json', token}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function getChat(token, chatid){
    return new Promise(resolve => {
        fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/chats/getchat`, {
            method: 'GET',
            headers: {'content-type': 'application/json', token, chatid}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function updateChat(chatInfo){
    return new Promise(resolve => {
        fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/chats/update`, {
            method: 'POST',
            body: JSON.stringify({chatInfo}),
            headers: {'content-type': 'application/json'}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function deleteChat(chatId){
    return new Promise(resolve => {
        fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/chats/delete`, {
            method: 'GET',
            headers: {'content-type': 'application/json', chatId}
        }).then(res => res.json()).then(res => resolve(res))
    })
}






export function fetchAllNotes(token){
    return new Promise(resolve => {
        fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/notes/getall`, {
            method: 'GET',
            headers: {'content-type': 'application/json', token}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function createNote(token, note){
    return new Promise(resolve => {
        fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/notes/create`, {
            method: 'POST',
            body: JSON.stringify({note}),
            headers: {'content-type': 'application/json', token}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function deleteNote(noteId){
    return new Promise(resolve => {
        fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/notes/delete`, {
            method: 'GET',
            headers: {'content-type': 'application/json', noteId}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function updateNote(noteInfo){
    return new Promise(resolve => {
        fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/notes/update`, {
            method: 'POST',
            body: JSON.stringify({noteInfo}),
            headers: {'content-type': 'application/json'}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function getNote(noteId){
    return new Promise(resolve => {
        fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/notes/getnote`, {
            method: 'GET',
            headers: {'content-type': 'application/json', noteId}
        }).then(res => res.json()).then(res => resolve(res))
    })
}