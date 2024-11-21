import gemini from "./gemini"

export const cookies = (key) => document.cookie.split('; ').find(e => e.startsWith(`${key}=`))?.split('=')[1] || null

export async function genChatName(chat){
    let name = await gemini(`Give one name in sort don't explain only give name in normal font on this chat "${chat}" `);
    name = name.split(' ')
    name = name.length > 2 ? name.slice(0, 2).join(' ') : name.join(' ');
    return name;
}