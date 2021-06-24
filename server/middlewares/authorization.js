function authorizeAdmin (req, res, next) {
    if (req.activeUser.role === 'admin') {
        // console.log('masuk authorize');
        next()
    } else {
        next({name: "Authorization Error", message: "You are not authorized"})
    }
}

function authorizeCustomer (req, res, next) {
    if (req.activeUser.role === 'customer') {
        next()
    } else {
        next({name: "Authorization Error", message: "You are not authorized"})
    }
}

module.exports = {authorizeAdmin, authorizeCustomer}