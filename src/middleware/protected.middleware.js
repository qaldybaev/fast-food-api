import { ACCESS_TOKEN_SECRET_KEY } from "../config/jwt.config.js";
import { BaseException } from "../exception/base.exception.js";
import jwt from "jsonwebtoken";

export const Protected = (isProtected) => {
  return (req, _, next) => {
    if (!isProtected) {
        req.role = "VIEWER"
      return next();
    }
    const token = req.headers["authorization"];
    if (!token || !token.includes("Bearer ") || !token.split(" ")[1]) {
      next(new BaseException("Iltimos tokkeni berib yuboring", 400));
    }

    const accessToken = token.split(" ")[1];

    try {
      const decodedData = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);

      req.role = decodedData.role;
      req.user = decodedData.user;

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return next(new BaseException("Tokenning vaqti tugagan", 406));
      } else if (error instanceof jwt.JsonWebTokenError) {
        return next(new BaseException("Jwt token xato yuborildi", 400));
      } else if (error instanceof jwt.NotBeforeError) {
        return next(new BaseException("Not before error, 409"));
      } else {
        next(error);
      }
    }
  };
};
