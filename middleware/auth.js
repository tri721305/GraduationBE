import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.get("authorization");
  // console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    // console.log(token);
    if (token) {
      let userId;
      try {
        let decodedToken = jwt.decode(token);
        console.log(decodedToken);
        userId = decodedToken.userId;
        // userId = decodedToken.id;
      } catch (err) {
        return res
          .status(400)
          .json({ error: "token are expired or incorrect" });
      }

      if (userId) {
        req.userId = userId;
        next();
      } else {
        return res.status(400).json({ error: "Not Loggedin" });
      }
    } else {
      return res.status(400).json({ error: "Not Loggedin" });
    }
  } else {
    return res.status(400).json({ error: "Not Loggedin" });
  }
};
export default auth;
