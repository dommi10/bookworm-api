import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  let token;

  // eslint-disable-next-line prefer-destructuring
  if (header) token = header.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ errors: { global: "invalid token" } });
      } else {
        req.userEmail = decoded.email;
        next();
      }
    });
  } else {
    res.status(401).json({ errors: { global: "No token" } });
  }
}

export default authenticate;
