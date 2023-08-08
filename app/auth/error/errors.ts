export const ERRORS: {
  [key: string]: {
    title: string;
    body: string;
  };
}[] = [
  {
    OAuthSignin: {
      title: 'Sign In Error',
      body: 'There was an error in constructing an authorization URL. Please try again later.',
    },
  },
  {
    OAuthCallback: {
      title: 'OAuth Response Error',
      body: 'There was an error in handling the response from the OAuth provider. Please try again later.',
    },
  },
  {
    OAuthCreateAccount: {
      title: 'Account Creation Error',
      body: 'Could not create OAuth provider user in the database.',
    },
  },
  {
    EmailCreateAccount: {
      title: 'Email Account Creation Error',
      body: 'Could not create email provider user in the database.',
    },
  },
  {
    Callback: {
      title: 'Callback Error',
      body: 'There was an error in the OAuth callback handler route. Please try again later.',
    },
  },
  {
    OAuthAccountNotLinked: {
      title: 'Account Linking Error',
      body: 'The email of the account is already linked, but not with this OAuth account.',
    },
  },
  {
    EmailSignin: {
      title: 'Email Sign In Error',
      body: 'Sending the email with the verification token failed. Please try again later.',
    },
  },
  {
    CredentialsSignin: {
      title: 'Sign In Error',
      body: 'The authorize callback returned null in the Credentials provider. Please provide the correct credentials.',
    },
  },
  {
    SessionRequired: {
      title: 'Session Error',
      body: 'The content of this page requires you to be signed in at all times. Please check your session configuration.',
    },
  },
  {
    Default: {
      title: 'General Error',
      body: 'An unforeseen error has occurred. Please try again later.',
    },
  },
  {
    Configuration: {
      title: 'Configuration Error',
      body: 'There is a problem with the server configuration. Check if your options are correct.',
    },
  },
  {
    AccessDenied: {
      title: 'Access Denied',
      body: 'Access was restricted, possibly through the signIn callback, or redirect callback. Please check your access controls.',
    },
  },
  {
    Verification: {
      title: 'Verification Error',
      body: 'Related to the Email provider. The token has expired or has already been used.',
    },
  },
  {
    MustBeLoggedIn: {
      title: 'Access Denied',
      body: 'You must be logged in to access this page.',
    },
  },
];

export const DEFAULT_ERROR = {
  title: 'Authentication Error',
  body: 'There was an error while trying to authenticate you. Please try again later.',
};
