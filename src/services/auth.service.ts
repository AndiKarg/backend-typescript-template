
import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import {
  AuthenticationResult,
  ConfidentialClientApplication,
} from '@azure/msal-node';

@EntityRepository()
class AuthService {
  cca: ConfidentialClientApplication;

  loginRequest = {
    scopes: ['user.read'],
    redirectUri: 'https://localhost:3000/redirect',
  };

  constructor() {
    this.cca = new ConfidentialClientApplication({
      auth: {
        clientId: '5ecbe09e-3256-43fa-9d70-8d10c36f7a2d',
        authority: 'https://login.microsoftonline.com/ed19a6be-6641-4a38-9a8f-ef2005241c4e',
        clientSecret: 'BYb8Q~36moRoY-TBxjotY5h.R6.Ld6WcJqSiGcJC',
      },
    });
  }

  public async msalLogin(): Promise<string> {
    const authcode: string = await this.cca.getAuthCodeUrl({
      scopes: ['user.read'],
      redirectUri: 'https://localhost:3000/auth/microsoft/callback',
    });
    return authcode;
  }

  public async msalCallback(code: string): Promise<AuthenticationResult> {
    if (!code) throw new HttpException(400, 'Invalid code');
    try {
      const foundUser: AuthenticationResult = await this.cca.acquireTokenByCode({
        code: code,
        scopes: ['user.read'],
        redirectUri: 'https://localhost:3000/auth/microsoft/callback',
      });
      return foundUser;
    } catch (error) {
      console.error("FEHLER BEI MSAL CALLBACK SERVICE", error);
      throw new HttpException(error.status, error.message);
    }
  }

}

export default AuthService;
