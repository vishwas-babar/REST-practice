

const postHasRequiredData = (req, res, next) => {
    if (req.method === 'POST') {
        const body = req.body;
        if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            return res.status(400).json({ status: 'failed', message: 'all required data is not provided' });
        } else {
            next();
        }
    } else {
        next();
    }
};

module.exports = postHasRequiredData;