const express = require('express');

const User = require('../models/User');

const beltsValues = {
    "White Belt" : 100000,
    "Red Belt" : 250000,
    "Orange Belt" : 500000,
    "Green Belt" : 1000000,
    "Black Belt" : 2000000,

}

const router = express.Router();

router.post('/calculoprojecao', async (req, res) => {
    
    let VendaDia, projecao;

    const isEmpty = Object.keys(req.body).length === 0;

    if(!isEmpty){
        try{
            const currentBelt = beltsValues[req.body.belt] || 0
            const lancamento = req.body.lancamento || 0
            const valorProduto = req.body.valorProduto || 0

            VendaDia = currentBelt / lancamento;

            projecao = VendaDia / valorProduto;

            return res.send({ VendaDia, projecao });

        } catch(err) {
            return res.status(400).send({ error: 'Registration failed'});
        }
    }

    return res.status(400).send({ error: 'O body da requisição veio vazio.'});
});

module.exports = app => app.use('/auth', router);

// lanca     belt(wb)
// 15 --- 100
// 1  --- x
// dia   
//     =

//   6.700 
