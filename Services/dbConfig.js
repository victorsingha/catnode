const config = {
    server: '192.168.29.120',
    port: 1433,
    database: "erererere",
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
        enableArithAbort: true
    }
}


module.exports = config;


//compmgmt.msc

// Go to Services And Application -> SQL Server Configuration Manager -> SQL Server Network Configuration -> Protocols for MSSQLSERVER -> Enable TCP

// Go to Services And Application -> SQL Server Configuration Manager -> SQL Server Services -> Restart SQL Server(MSSQLSERVER)

// select  distinct local_net_address, local_tcp_port from  sys.dm_exec_connections  where local_net_address is  not  null

// server = local_net_address
// port = local_tcp_port
