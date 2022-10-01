const axios = require('axios');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.json());
const port = process.env.PORT || 80;
async function sendOrder(tradingview){
    let side = 0;
    if(tradingview.side === 'buy'){
        side = 1;
    }else if(tradingview.side === 'sell'){
        side = -1;
    }

    const units = tradingview.units * side;

    const config = {
        headers: { Authorization: process.env.OANDA_TOKEN }
    };
    
    const bodyParameters = 
        {
            "order": {
                "units": units,
                "instrument": "XAU_USD",
                "type": "MARKET",
                "positionFill": "DEFAULT"
              }
        }
    ;
    
    axios.post( 
      'https://api-fxpractice.oanda.com/v3/accounts/101-012-22836319-003/orders',
      bodyParameters,
      config
    ).then(console.log).catch(console.log);
    
    


}

app.post('/trade', (req, res) => {
    const tradingview = req.body;
    sendOrder(tradingview);
    res.send('ok');
});
app.get('/', (req, res) => {
    res.send('ok');
});
app.listen(port, () => console.log('Example app listening'));


