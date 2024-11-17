

const alertsMsg = {
    'empty-msg': {type: 'warning', title: 'Empty Propt', dec: 'Please provide me some text.'},
    'token-not-found': {type: 'error', title: 'Token not found'},
    'internal-server-error': {type: 'error', title: 'Internal Server Eror'},
}




export default function(msgName){
    return alertsMsg[msgName]
}