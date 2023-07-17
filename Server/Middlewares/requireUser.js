module.exports = async (req, res, next) => {
  // the job of this middleware is to check whether auth. header is present in the request
  // and if present :: it should be valid to proceed further
  const authHeaders = req.headers; //fetch the header from req.header
  if (
    !authHeaders ||
    !authHeaders.authorization ||
    !authHeaders.authorization.startsWith("Bearer")
  ) {
    return res.status(401).send("Authorization header is required");
  }
  //Valid token exists:
  const accessToken = authHeaders.authorization.split(" ")[1]; //fetch the token as it starts with "'space'[token]"
  console.log(accessToken);
  next(); //will call the next method which is in the router's parameter
};
