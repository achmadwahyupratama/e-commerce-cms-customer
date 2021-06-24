function errorHandler(err, req, res, next){
    switch(err.name){
        case "SequelizeValidationError":
            let errs = []
            err.errors.forEach(element => {
                errs.push({message: element.message})
            });
            res.status(400).json({errors: errs});
            break;
        case "Not Found":
            res.status(404).json({errors: {message: err.message}});
            break;
        case "SequelizeUniqueConstraintError":
            res.status(400).json({errors: {message: err.message}});
            break;
        case "Invalid email and password":
            res.status(400).json({errors: {message: err.name}});
            break;
        case "Invalid access token":
            res.status(403).json({errors: {message: err.name}});
            break;
        case "No access token":
            res.status(403).json({errors: {message: 'Need login user'}})
            break;
        case "Authorization Error":
            res.status(401).json({errors: {message: err.message}})
            break;
        case "SequelizeDatabaseError":
            // res.status(400).json(err)
            res.status(400).json({errors: {message: 'Required number format for price and stock'}})
            break;
        default:
            console.log(err);
            res.status(500).json({errors: {message: err.message}})
            // res.status(500).json(err)
            break;
    }
}

module.exports = errorHandler