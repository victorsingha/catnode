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

// const config = {
//     connectionString: 'Driver=msnodesqlv8;Server=localhost\\SQLEXPRESS;Database=master;Trusted_Connection=True;'

// }


module.exports = config;