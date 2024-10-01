const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const CognitoService = require('../clients/cognito');
const config = require('../config/config')

const cognitoService = new CognitoService(config.canidateClientId, 
  config.canidateClientSecret, 'us-west-2')

const register = catchAsync(async (req, res) => {
  const requestBody = req.body;
  const user = await cognitoService.signUp(requestBody.email, requestBody.password, [
    {
      Name: 'given_name',
      Value: requestBody.firstName
    },
    {
      Name: 'family_name',
      Value: requestBody.lastName
    }
  ])
  console.log(user)
  res.status(httpStatus.CREATED).send();
});

const authenticateUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await cognitoService.authenticateUser(email, password)

  const accessToken = result.AuthenticationResult.AccessToken

  const user = await cognitoService.getUser(accessToken)

  res.send({
    user: convertAttributesToJson(user.UserAttributes),
    accessToken: accessToken,
    refreshToken: result.AuthenticationResult.RefreshToken
  });
});

const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  await cognitoService.revokeToken(refreshToken)

  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const { sub, refreshToken, username } = req.body
  const result = await cognitoService.refreshToken(sub, refreshToken, username)

  res.send({ 
    accessToken: result.AuthenticationResult.AccessToken
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { username } = req.body
  await cognitoService.forgotPassword(username)

  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  const { username, password, confirmationCode } = req.body
  await cognitoService.confirmForgotPassword(username, password, confirmationCode)
  
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  const { username, token } = req.query;
  const result = await cognitoService.confirmSignUp(username, token)
  console.log(result)
  res.status(httpStatus.NO_CONTENT).send();
});

const convertAttributesToJson = ((attributesArray) => {
  const userAttributes = {};

  attributesArray.forEach(attribute => {
    userAttributes[attribute.Name] = attribute.Value;
  });

  return userAttributes;
})

module.exports = {
  register,
  login: authenticateUser,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
