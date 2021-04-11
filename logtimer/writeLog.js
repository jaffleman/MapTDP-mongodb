const fs = require('fs');

module.exports=function(msgLog){
    let msg =''
    const date = new Date();
    //console.log(date)
    let J = date.getMonth()
    let D = date.getDate()
    let A = date.getFullYear()
    let H = date.getHours()
    let M = date.getMinutes()
    let S = date.getSeconds()
    if (D<10) D='0'+D 
    if (J<10) J='0'+J
    if (H<10) H='0'+H             
    if (M<10) M='0'+M
    if (S<10) S='0'+S
    const time = "["+D+"/"+J+"/"+A+"] ["+H+":"+M+":"+S+"] "
    const newLine = time+" ==> "+msgLog
    fs.readFile('./log.txt', (err, data) => {
        if (err) throw err;
        msg = data+'\n'+newLine+'\n'
        fs.writeFile('./log.txt', msg, err=> {if (err) console.log("Erreur d'ecriture du fichier au demarrage: \n"+err)})      
    })
    console.log(newLine)
}
