const errorHandler = (err, req, res, next) => {
	if (typeof err === "string") {
		// custom application error
		return res.status(400).json({refCode: 97, message: err })
	}

	if (err.name === "ValidationError") {
		// mongoose validation error
		return res.status(400).json({ refCode: 98, message: err.message })
  }
  
	if (err.name === "MongoError") {
		// mongoDB error
		return res.status(400).json({ refCode: 96, message: err.message })
	}

	// default to 500 server error
	return res.status(500).json({refCode: 99, message: err.message })
}

module.exports = errorHandler