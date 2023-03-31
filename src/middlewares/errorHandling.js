exports.notFound = (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
};

exports.internalServerError = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
};