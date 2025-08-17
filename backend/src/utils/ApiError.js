class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        erros = [],
        stack =""
    )
    {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = erros
    }
}
export {ApiError}