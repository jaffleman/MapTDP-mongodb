const tdp = require('../model/tdp')
const loger = require("../logtimer/writeLog.js")

exports.search = (req, res)=>{
    loger(' <'+req.body[0].rep+'> : '+' New Search of '+req.body.length+' TDP')
    if (req.body.length < 1) {
        res.status(200).end('pas de tdp dans la demande')
    }
    //const tabPlot =[]
    const tabTdp = req.body.map(element=>{
        //tabPlot.push(element.plot)
        //const code = ""+element.rep+element.regletteType+element.regletteNbr
        return {"tdpId":element.tdpId}
    })
    const elements = tabTdp.map(tdp=>{return {$and:[tdp]}})
    const expression = {
        $or: [...elements]
    }
    tdp.find( expression, function(err, arr) {
        if (err) {
            res.status(500).end(err)
        }
        res.status(200).json(arr)
    });
}
exports.searchByPosition = (req, res)=>{
    loger(' <'+req.body[0].rep+'> : '+' New Search of '+req.body.length+' TDP by Position')
    if (req.body.length < 1)  return res.status(200).end('pas de tdp dans la demande')
    const tabTdp = req.body.map(({rep,salle,rco,ferme,level})=>{
        return {
            "rep":rep,
            "ferme":ferme,
            "level":level,
            "rco":rco,
            "salle":salle
        }
    })
    const elements = tabTdp.map(tdp=>{return {$and:[tdp]}})
    const expression = {
        $or: [...elements]
    }
    tdp.find( expression, function(err, arr) {
        if (err) {
            res.status(500).end(err)
        }
        res.status(200).json(arr)
    });
}
exports.searchRep = (req, res)=>{
    loger(' <'+req.body[0].rep+'> : '+' New RepSearch')
    console.log(req.body)
    if (req.body.length < 1) res.status(200).end('pas de tdp dans la demande')
    const tabTdp = req.body.map(element=>{return {"rep":element.rep}})
    const elements = tabTdp.map(tdp=>{return {$and:[tdp]}})
    const expression = {
        $or: [...elements]
    }
    tdp.find( expression, function(err, arr) {
        if (err) res.status(500).end('internal server error')
        else res.status(200).json(arr)
    });
}


exports.create = (req, res)=>{
    loger(' <'+req.body[0].rep+'> : '+' New Creation of '+req.body.length+' tdp')
    const count = req.body.length
    const total = [...req.body]
    console.table(total)
    const results = []

    const saveAll = ()=>{
        const doc = total.shift()
        tdp.find(doc)
        .then(result=>{
            if (result.length===0) {
                tdp.create(doc)
                .then(result=>{
                    results.push({"status":true ,'id':result._id})
                    if (results.length<count) saveAll()
                    else res.status(200).json(results)
                })
                .catch(err=>console.log(err))
            }else{
                results.push({"status":false ,'id':result._id})
                if (results.length<count) saveAll()
                else res.status(200).json(results)
            }
        })  
    }
    saveAll()
}
exports.update = (req, res)=>{
    loger(' <'+req.body[0].rep+'> : '+' New Update of '+req.body.length+' tdp')
    const total = [...req.body]
    console.table(total)
    const results = []

    const updateAll = ()=>{
        const doc = total.pop()
        tdp.updateOne(
            {  "_id": doc._id },
            { $set: { ...doc}}
        )
        .then(result=>{
            results.push(result)
            if (results.length<req.body.length) updateAll()
            else res.status(200).json(results)
        }).catch(err=>console.log(err))                
    }
    if (total.length) updateAll() 
    else res.status(200).json({status:'nothing to update'})
}
exports.updateid = (req, res)=>{
    tdp.find( {}, function(err, arr) {
        if (err) {
            res.status(500).end(err)
        }
        else{
            const total = [...arr]
            total.forEach((tdp)=>{
                const {rep, regletteType, regletteNbr} = tdp
                const newValue = rep+regletteType+regletteNbr
                tdp.tdpId = newValue
            })
            //console.table(total)
            const results = []
            const updateAll = (total)=>{
                const doc = total.pop()
                tdp.updateOne(
                    {  "_id": doc._id },
                    { $set: { ...doc}}
                )
                .then(result=>{
                    results.push(result)
                    if (results.length<arr.length) updateAll()
                    else res.status(200).json(results)
                }).catch(err=>console.log(err))                
            }
            if (total.length) updateAll(total) 
            else res.status(200).json({status:'nothing to update'})
        }
    });
}

exports.delete = (req, res)=>{
    loger(' <'+req.body[0].rep+'> : '+' New Delete of '+req.body.length+' tdp')
    const total = [...req.body]
    console.table(total)
    const results = []

    const deleteAll = ()=>{
        const doc = total.pop()
        tdp.deleteOne({"_id": doc._id})
        .then(result=>{
            results.push(result)
            if (results.length<req.body.length) deleteAll()
            else res.status(200).json(results)
        }).catch(err=>console.log(err))                
    }
    if (total.length) deleteAll() 
    else res.status(200).json({status:'nothing to delete'})
}