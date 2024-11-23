export function fetchAllChats(token){
    return new Promise(resolve => {
        fetch(`${window.location.origin}/api/chats/getall`, {
            method: 'GET',
            headers: {'content-type': 'application/json', token}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function createChat(token, chat){
    return new Promise(resolve => {
        fetch(`${window.location.origin}/api/chats/create`, {
            method: 'POST',
            body: JSON.stringify({chat}),
            headers: {'content-type': 'application/json', token}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function getChat(token, chatid){
    return new Promise(resolve => {
        fetch(`${window.location.origin}/api/chats/getchat`, {
            method: 'GET',
            headers: {'content-type': 'application/json', token, chatid}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function updateChat(chatInfo){
    return new Promise(resolve => {
        fetch(`${window.location.origin}/api/chats/update`, {
            method: 'POST',
            body: JSON.stringify({chatInfo}),
            headers: {'content-type': 'application/json'}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function deleteChat(chatid){
    return new Promise(resolve => {
        fetch(`${window.location.origin}/api/chats/delete`, {
            method: 'GET',
            headers: {'content-type': 'application/json', chatid}
        }).then(res => res.json()).then(res => resolve(res))
    })
}






export function fetchAllNotes(token){
    return new Promise(resolve => {
        fetch(`${window.location.origin}/api/notes/getall`, {
            method: 'GET',
            headers: {'content-type': 'application/json', token}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function createNote(token, note){
    return new Promise(resolve => {
        fetch(`${window.location.origin}/api/notes/create`, {
            method: 'POST',
            body: JSON.stringify({note}),
            headers: {'content-type': 'application/json', token}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function deleteNote(noteid){
    return new Promise(resolve => {
        fetch(`${window.location.origin}/api/notes/delete`, {
            method: 'GET',
            headers: {'content-type': 'application/json', noteid}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function updateNote(noteInfo){
    return new Promise(resolve => {
        fetch(`${window.location.origin}/api/notes/update`, {
            method: 'POST',
            body: JSON.stringify({noteInfo}),
            headers: {'content-type': 'application/json'}
        }).then(res => res.json()).then(res => resolve(res))
    })
}

export function getNote(noteId){
    return new Promise(resolve => {
        fetch(`${window.location.origin}/api/notes/getnote`, {
            method: 'GET',
            headers: {'content-type': 'application/json', noteId}
        }).then(res => res.json()).then(res => resolve(res))
    })
}