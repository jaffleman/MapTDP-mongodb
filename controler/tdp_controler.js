const tdp = require('../model/tdp')


exports.search = (req, res)=>{
    console.log(req.body);
    if (req.body.length < 0) {
        res.status(200).end('pas de tdp dans la demande')
    }
    const elements = req.body.map(tdp=>{return {$and:[tdp]}})
    const expression = {
        $or: [...elements]
    }
    tdp.find( expression, function(err, arr) {
        if (err) {
            res.status(500).end(err)
        }
        res.status(200).json(arr)});
}



exports.create = (req, res)=>{
    const total = [...req.body]
    const results = []

    const saveAll = ()=>{
        const doc = total.pop()
        tdp.find(doc)
        .then(result=>{
            if (result.length===0) {
                console.log('A')
                tdp.create (doc)
                .then(result=>{
                    results.push(result)
                    if (results.length<req.body.length) {
                        console.log('B');
                        saveAll()
                    }else{
                        console.log('C')
                        console.table(results)
                        res.status(200).json(results)
                    } 
                })
                .catch(err=>console.log(err))
            }else{
                console.log('D')
                results.push('doc existe deja')
                if (results.length<req.body.length) {
                    console.log('E')
                    saveAll()
                }else{
                    console.log('F')
                    console.table(results)
                    res.status(200).json(results)
                }
            }
        })  
    }
    saveAll()
}
exports.update = (req, res)=>{
    const total = [...req.body]
    const results = []

    const updateAll = ()=>{
        const doc = total.pop()
        console.log(doc)
        tdp.updateOne(
            {  "_id": doc._id },
            { $set: { ...doc}}
        )
        .then(result=>{
            results.push(result)
            if (results.length<req.body.length) {
                console.log('B');
                updateAll()
            }else{
                console.log('C')
                console.table(results)
                res.status(200).json(results)
            } 
        }).catch(err=>console.log(err))                
    }
    if (total.length) {
        updateAll() 
    }else{
        res.status(400).end('nothing to update!')
    }
}

exports.delete = (req, res)=>{
    const total = [...req.body]
    const results = []

    const deleteAll = ()=>{
        const doc = total.pop()
        console.log(doc)
        tdp.deleteOne({"_id": doc._id})
        .then(result=>{
            results.push(result)
            if (results.length<req.body.length) {
                console.log('B');
                deleteAll()
            }else{
                console.log('C')
                console.table(results)
                res.status(200).json(results)
            } 
        }).catch(err=>console.log(err))                
    }
    if (total.length) {
        deleteAll() 
    }else{
        res.status(400).end('nothing to delete!')
    }
}