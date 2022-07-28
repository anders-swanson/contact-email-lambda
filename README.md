# Lambda Contact Email

AWS Lambda function written in NodeJS that sends email using the Gmail SMTP server.
The Lambda function validates requests using Recaptcha V2.

### Example request

```
curl -X POST $LAMBDA_URL?email%3Dexample%40email.com%26msg%3Dhello%26name%3Dtestuser%26captcha%3DCAPTCHA
```