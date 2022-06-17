```
//Local
const config = {
    server:'localhost\\sqlexpress',
    port:1433,
    database:"CAT_20220201",
    driver: 'msnodesqlv8',
    options:{
        trustedConnection:true,
        enableArithAbort:true
    }
}

//Remote
var config = {
        user: '',
        password: '',
        server: '', 
        database: '' 
};


module.exports = config;

```
