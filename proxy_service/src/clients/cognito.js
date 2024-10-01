const {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  GetUserCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
  RevokeTokenCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} = require('@aws-sdk/client-cognito-identity-provider');
const crypto = require("crypto");
const e = require('express');

class CognitoService {
  constructor(clientId, clientSecret, region) {
    this.client = new CognitoIdentityProviderClient({ region });
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  getSecretHash(username) {
    return crypto
      .createHmac("sha256", this.clientSecret)
      .update(`${username}${this.clientId}`)
      .digest("base64");
  }

  async signUp(username, password, userAttributes = []) {
    try {

      const params = {
        ClientId: this.clientId,
        SecretHash: this.getSecretHash(username),
        Username: username,
        Password: password,
        UserAttributes: userAttributes,
      };

      const command = new SignUpCommand(params);
      const data = await this.client.send(command);
      return data;
    } catch (error) {
      throw new Error(`Sign up error: ${error.message}`);
    }
  }

  async confirmSignUp(username, confirmationCode) {
    const params = {
      ClientId: this.clientId,
      SecretHash: this.getSecretHash(username),
      Username: username,
      ConfirmationCode: confirmationCode,
    };

    try {
      const command = new ConfirmSignUpCommand(params);
      const data = await this.client.send(command);
      return data;
    } catch (error) {
      throw new Error(`Confirmation error: ${error.message}`);
    }
  }

  async authenticateUser(username, password) {
    try {
      const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.clientId,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH: this.getSecretHash(username)
        },
      };
      console.log(params)

      const command = new InitiateAuthCommand(params);
      const data = await this.client.send(command);
      return data;
    } catch (error) {
      throw new Error(`Authentication error: ${error.message}`);
    }
  }

  async getUser(accessToken) {
    const params = {
      AccessToken: accessToken, // The access token for the user whose details you want to retrieve
    };

    try {
      const command = new GetUserCommand(params);
      const data = await this.client.send(command);
      return data;
    } catch (error) {
      throw new Error(`Get user error: ${error.message}`);
    }
  }

  async refreshToken(sub, refreshToken, username) {
    const params = {
      AuthFlow: 'REFRESH_TOKEN',
      ClientId: this.clientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: this.getSecretHash(sub)
      },
    };
    console.log(params)

    try {
      const command = new InitiateAuthCommand(params);
      const data = await this.client.send(command);
      return data;
    } catch (error) {
      throw new Error(`Token refresh error: ${error.message}`);
    }
  }

  async respondToChallenge(session, challengeName, challengeResponses) {
    const params = {
      ClientId: this.clientId,
      ChallengeName: challengeName,
      Session: session,
      ChallengeResponses: challengeResponses,
    };

    try {
      const command = new RespondToAuthChallengeCommand(params);
      const data = await this.client.send(command);
      return data;
    } catch (error) {
      throw new Error(`Respond to challenge error: ${error.message}`);
    }
  }

  async revokeToken(token) {
    const params = {
        ClientId: this.clientId,
        Token: token,
        ClientSecret: this.clientSecret
    };
    console.log(params)

    try {
        const command = new RevokeTokenCommand(params);
        await this.client.send(command)
    } catch (error) {
        throw new Error(`Revoke token error: ${error.message}`)
    }
  }

  async forgotPassword(username) {
    const params = {
        ClientId: this.clientId,
        Username: username,
        SecretHash: this.getSecretHash(username)
    };

    try {
        const command = new ForgotPasswordCommand(params)
        await this.client.send(command)
    } catch (error) {
        throw new Error(`Forgot password error: ${error.message}`)
    }
  }

  async confirmForgotPassword(username, password, confirmationCode) {
    const params = {
        ClientId: this.clientId,
        Username: username,
        ConfirmationCode: confirmationCode,
        Password: password,
        SecretHash: this.getSecretHash(username)
    }

    try {
        const command = new ConfirmForgotPasswordCommand(params)
        await this.client.send(command)
    } catch (error) {
        throw new Error(`Confirm forgot password error: ${error.message}`)
    }
  }
}

module.exports = CognitoService;
