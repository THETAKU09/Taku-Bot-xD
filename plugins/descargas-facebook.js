import { facebookdl, facebookdlv2 } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*[β] πΏπ°ππ° π³π΄ππ²π°ππΆπ°π ππΈπ³π΄πΎπ π΄π½ π΅π°π²π΄π±πΎπΎπΊ πππ° π²πΎπΌπΎ π΄πΉπ΄πΌπΏπ»πΎ*: ${usedPrefix}${command} https://fb.watch/azFEBmFRcy/`
    const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0]))
    for (const { url, isVideo } of result.reverse()) conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, `π *πππ»:* ${url}`, m)
}
handler.help = ['faceboock <link>']
handler.tags = ['descargas']

handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.limit = 2
export default handler
