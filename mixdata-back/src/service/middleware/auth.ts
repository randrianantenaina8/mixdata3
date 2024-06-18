import jwt from "jsonwebtoken";

import { configs } from "../../data/constants/configs";
import { userRepository } from "../../repository/user.repository";


export const secured = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, configs.jwtSecret);
    console.log("decoded", decoded);

    const found = await userRepository.matchOne("users", { token: `${token}` });

    if (found.total <= 0) {
        return res.status(403).send("Invalid Token");
    }

    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};