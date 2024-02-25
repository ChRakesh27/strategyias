import jwt from "jsonwebtoken";

const getDataFromToken = (req) => {
  try {
    const token = req.cookies.token;
  
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    return decodedToken.id;
  } catch (err) {
    throw new Error(err.message);
  }
};
export default getDataFromToken;
