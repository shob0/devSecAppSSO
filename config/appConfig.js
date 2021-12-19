const port = 3000;
const baseURL = `http://www.example.com:${port}`;
module.exports = {
  // The secret for the encryption of the jsonwebtoken
  JWTsecret: 'this is my secret token',
  baseURL: baseURL,
  port: port,
  // The credentials and information for OAuth2
  oauth2Credentials: {
    client_id: "",
    project_id: "", // The name of your project
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "",
    redirect_uris: [
      `${baseURL}/callback`
    ],
    scopes: [
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }
};