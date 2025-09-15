const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err.name === 'validationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            status: false,
            errors: messages
        });
    }
    // other mongoose cast errors
    if (err.name === 'CastError') {
        return res.status(400).json({
            status: false,
            message: 'Invalid ID Format'
        });
    }
    res.status(err.status || 500).json({
        status: false,
        message: err.message || 'Server Error'
    });
};

export default errorHandler;
