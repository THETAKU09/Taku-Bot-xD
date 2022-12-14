const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        await conn.sendButton(m.chat, `*[β] π»πΈπ½πΊ π³π΄ππ΄π²ππ°π³πΎ!!*${isBotAdmin ? '' : '\n\nΚα΄ sΙͺα΄Ι΄α΄α΄, α΄Κ Κα΄α΄ α΄α΄Κα΄ sα΄Κ α΄α΄α΄ΙͺΙ΄Ιͺsα΄Κα΄α΄α΄Κ α΄α΄Κ Ι’Κα΄α΄α΄ α΄α΄Κα΄ α΄ΚΙͺα΄ΙͺΙ΄α΄Κ β. '}`, author, ['βπ³π΄ππ°π²ππΈππ°π π°π½ππΈπ»πΈπ½πΊβ', '/disable antilink'], m)
        if (isBotAdmin && bot.restrict) {
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!bot.restrict) return m.reply('βΌπ΄ππππ, ππ πππππππππππ πππππ πππππππππππ #restrict, ππππ πππππππ πππππππ #enable restrict o #sistemas')
    }
    return !0
}
