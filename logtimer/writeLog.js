const fs = require('fs');

module.exports=function(msgLog){
    let msg =''
    const date = new Date();
    const time = "["+date.toDateString()+"] ["+date.toLocaleTimeString()+"] "
    const newLine = time+" ==> "+msgLog
    fs.readFile('./log.txt', (err, data) => {
        if (err) throw err;
        msg = data+'\n'+newLine+'\n'
        fs.writeFile('./log.txt', msg, err=> {if (err) console.log("Erreur d'ecriture du fichier au demarrage: \n"+err)})      
    })
    console.log(newLine)
}
