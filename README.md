# Lambda Contact Email

This is a simple AWS Lambda function written in NodeJS that sends email using the Gmail SMTP server.
The Lambda function validates requests using Recaptcha V2.

### Backend Environment Variables

| Key |  Value   | Required |
|:-----|:--------:|:--------:|
| TO_ADDRESSES            | Comma separated list of email addresses to send the contact emails to. Defaults to SMTP_USERNAME  | NO |
| SMTP_USERNAME           | Username (email address) for "from" email user | YES |
| SMPT_PASSWORD           | Password for "from" email user  | YES |
| OAUTH_CLIENTID          | Client Id for Gmail API | YES |
| OAUTH_CLIENT_SECRET     |  Client Secret for Gmail API | YES |
| OAUTH_REFRESH_TOKEN     | Refresh token for Gmail API | YES |
| RECAPTCHA_SECRET_KEY    | Secret key for Recaptcha V2 | YES |

### HTTP Request Parameters

| Name      |  Value   |
|:----------|:--------:|
| email     | The email address of the user who sent the mail |
| name      |  the name of the user who sent the email |
| msg       | the message body of the email |
| captcha   | the Recaptcha V2 code to validate the request |


### Example request

```
curl -X POST $LAMBDA_URL?email=example@email.com&msg=hello&name=testuse&captcha=CAPTCHA
```
