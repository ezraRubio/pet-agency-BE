const admin = async (req, res, next) => {
    req.role==="admin"
    ? next()
    : res.status(401).send("aaccess denied")
};

export default admin;