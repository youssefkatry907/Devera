module.exports = (schema) => {
    return (req, res, next) => {
        var validationResult = schema.body.validate(req.body);
        var validation = [];
        if (validationResult.error) {
            validation.push(validationResult.error.details[0].message);
        }
        if (validation.length) {
            res.json({status: 400, message: validation.join() });
            return;
        }
        next();
    }
}