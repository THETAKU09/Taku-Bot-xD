import { toPTT } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `*[β] ππ΄ππΏπΎπ½π³π° π΄π» ππΈπ³π΄πΎ πππ΄ π³π΄ππ΄π°  π²πΎπ½ππ΄πππΈπ π°* *ππππΌ πΏπ πππ* *π²πΎπ½ π΄π» π²πΎπΌπ°π½π³πΎ* ${usedPrefix + command}*`
    let media = await q.download?.()
    if (!media) throw '*[β] π΅π°π»π»πΎ π°π» π³π΄ππ²π°ππΆπ°π π΄π» π°ππ²π·πΈππΎ*'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw '*[β] π΅π°π»π»πΎ π°π» π²πΎπ½ππ΄πππΈπ ππΈπ³π΄πΎ/π½πΎππ° π° π°ππ³πΈπΎ, πΈπ½ππ΄π½ππ΄ π³π΄ π½ππ΄ππΎ*'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, { mimetype: 'audio/mp4' })
}
handler.help = ['#tovn (responde)']
handler.tags = ['audio mod']

handler.command = /^to(vn|(ptt)?)$/i

export default handler
