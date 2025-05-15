
    ev.on({ 
        cmd: ['setpp'], 
        listmenu: ['setpp'],
        media: {
            type: ["image"],
            save: false
        },
        tag: "owner",
        isOwner: true
    }, async ({ media }) => {
          await cht.reply(infos.messages.wait)
          Exp.setProfilePicture(Exp.number,media)
          .then(a => cht.reply("Success...✅️"))
          .catch(e => cht.reply("TypeErr: " + e.message))
    })
    
    ev.on({ 
        cmd: ['badword'], 
        listmenu: ['badword'],
        args: func.tagReplacer(infos.owner.badword, { cmd: cht.prefix + cht.cmd }),
        isOwner: true,
        tag: "owner"
    }, async ({ media }) => {
         let [act, input] = cht.q.split("|")
         input = (input || cht.quoted?.text || "").split(",").map(a => a.trim()).filter(a => a.length > 1);

         if(act == "add"){
             if(input.length < 1) return cht.reply("Ex: .badword add|tes")
             Data.badwords = [...new Set([...Data.badwords, ...input])]
             cht.replyWithTag(infos.owner.successAddBadword, { input })
         } else if(act == "delete" || act == "d" || act == "del"){
             if(input.length < 1) return cht.reply("Ex: .badword delete|tes")
             input.forEach(word => {
                 Data.badwords = Data.badwords.filter(a => a !== word)
             })
             cht.replyWithTag(infos.owner.successDelBadword, { input })
         } else if(act == "list") {
             let list = "*[ LIST BADWORD ]*\n"
             for(let i of Data.badwords){
                 list += `\n - ${i}`
             }
             cht.reply(list)
         } else cht.replyWithTag(infos.owner.badwordAddNotfound, { cmd: cht.prefix + cht.cmd })
         
    })