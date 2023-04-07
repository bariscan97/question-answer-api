const sendJwtToClient = (user, res) => {
  //Generete JWT
  const token = user.generateJwtFromUser();
  const { NODE_ENV } = process.env;

  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE) * 1000),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      succes: true,
      access_token: token,
      data: {
        name: user.name,
        email: user.email,
      },
    });
};
const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
  );
};
const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;

  const access_token = authorization.split(" ")[1];
  console.log(access_token);
  return access_token;
};
module.exports = {
  sendJwtToClient,
  isTokenIncluded,
  getAccessTokenFromHeader,
};
