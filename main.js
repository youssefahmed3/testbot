const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const config = require('./config.json');
const prefix = '$';

client.once('ready' ,() => {
    console.log('MY BOT IS ONN');
    client.user.setActivity('joeBot || $help || (Made by youssefosman)  ', { type:"WATCHING"})
})

client.on('message', message  => {

    let args = message.content.substring(prefix.length).split(" ")
    
    if (args[0] === "ping") { 
        message.channel.send('pong!')
    } 
    else if (args[0] === 'show'){
       let usersNumber = 0;
       message.member.voice.channel.members.each(() => usersNumber++);

       message.channel.send(`the number of people in this channel is ${usersNumber}`);

    } // mute all people and mentioned people
    else if (args[0] === 'mute') {
        // checking if a user has MUTE_MEMBERS permission
        let canMuteUsers = message.channel.permissionsFor(message.member).has("MUTE_MEMBERS"); 

        if(message.member.voice.channel && canMuteUsers) {
            let usersNumber = 0;
            let mentionsPeople = 0;
            // count all mentions in a message
            message.mentions.members.forEach(() => mentionsPeople++);
               
            if(mentionsPeople >= 1) { // checking if there are mentions
                message.mentions.members.forEach((member) => {
                    if(member != message.member) {
                        member.voice.setMute(true);
                        usersNumber++;
                    }    
                });  
            }
            else {
                message.member.voice.channel.members.each((member) => {
                    if(member != message.member) {
                        member.voice.setMute(true);
                        usersNumber++;
                    }    
                });
            }
            

            message.reply(`you muted ${usersNumber} member/s`);
        }else {
            message.reply("You need to join a voice channel first or you don't have the permission to mute people !");
          }
        
    } // unmute all people or mentioned people 
    else if (args[0] === 'unmute') {
        let canMuteUsers = message.channel.permissionsFor(message.member).has("MUTE_MEMBERS");
        
        if(message.member.voice.channel && canMuteUsers) {
            let mentionsPeople = 0;
            // count all mentions in a message
            message.mentions.members.forEach(() => mentionsPeople++);

            if(mentionsPeople >= 1) {
                let mentionsPeople = 0;
                // count all mentions in a message
                message.mentions.members.forEach(() => mentionsPeople++);
               
                if(mentionsPeople >= 1) { // checking if there are mentions
                    message.mentions.members.forEach((member) => {
                        if(member != message.member) {
                            member.voice.setMute(false);
                        }    
                    });  
                }
            }
            else {
                message.member.voice.channel.members.each((member) => {
                    (member != message.member) ? member.voice.setMute(false): null;
                });
            }
            
            
        }
        else {
            message.reply("You need to join a voice channel first or you don't have the permission to mute people !");
        }
        
    }
});

client.login(config.token);
