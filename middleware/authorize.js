export const verify = (req, res, next) => {
  const { token } = req.headers;
  const verify_token = process.env.VERIFY_TOKEN;
  console.log(token, verify_token);
  if (token !== verify_token) {
    return res.status(401).json("Unauthorized");
  } else {
    next();
  }
};
