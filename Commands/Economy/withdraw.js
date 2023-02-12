const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");


module.exports = { 
    name: "withdraw",  
    desc: "withdraw money from bank account.", 
    alias: ["withdraw"],
    category: "Economy",  
    react: "💳", 
    start: async ( 
        Miku, 
        m, 
        { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator,eco,ty} 
    ) => {
        if(!text)  {
            return Miku.sendMessage( 
                m.from, 
                { text: `*Provide the amount you want to withdraw!*` }, 
                { quoted: m } 
            );
        }
        const user = m.sender
        const query = text.trim();
        const cara = 'cara'
        const withdraw = await eco.withdraw(user, cara, query);
        if(withdraw.noten) Miku.sendMessage(m.from, { text: '*🏧 Insufficient fund in bank*' }, { quoted: m });
        const add = eco.give(user, cara, query);
        Miku.sendMessage(m.from, { image: fs.readFileSync("./Assets/Img/card.png"), caption: `*🏧 ALERT*  _💶 ${withdraw.amount} has been added in your wallet._*` }, { quoted: m });
        
}
}