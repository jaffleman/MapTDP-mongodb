const mongoose = require('mongoose');

const tdpSchema = mongoose.Schema({
    tdpId: {type: String, required: true},
    regletteType: { type: String, required: true},
    regletteNbr: { type: String, required: true},
    cd: { type: Number, required: true},
    rep: { type: String, require: true},
    salle: { type: Number, require: true},
    rco: { type: Number, require: true},
    ferme: { type: Number, require: true},
    level: { type: Number, require: true},
    option: { type: String}
});

module.exports = mongoose.model('tdp', tdpSchema);