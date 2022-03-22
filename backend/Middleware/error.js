module.exports.errorHandler = (err, req, res, next) => {
    const {status = 500} = err
    res.status(status)
    res.send({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

