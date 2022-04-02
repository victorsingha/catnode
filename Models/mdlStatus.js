class mdlStatus{
    constructor(StatusCode,StatusMessage){
        this.StatusCode = StatusCode;
        this.StatusMessage = StatusMessage;
    }

    static getStatus(code,msg){
        return {StatusCode:code,StatusMessage:msg}
    }
}

module.exports = mdlStatus;