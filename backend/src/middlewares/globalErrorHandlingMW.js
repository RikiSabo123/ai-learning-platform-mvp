const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes 
    console.error("[SERVER ERROR]:", err);

    // return a generic error response to the client
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error. Something went wrong.";

    res.status(statusCode).json({
        success: false,
        message: message
    });
};

module.exports = errorHandler;