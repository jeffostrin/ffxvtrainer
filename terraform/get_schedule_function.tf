# https://github.com/hashicorp/terraform/issues/9271
# https://learn.hashicorp.com/terraform/aws/lambda-api-gateway

resource "aws_iam_role" "get_schedule_iam_role" {
  name = "get_schedule_iam_role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "get_schedule_lambda_function" {
  filename         = "../simple_func.zip"
  function_name    = "test-lambda-cli"
  role             = "${aws_iam_role.get_schedule_iam_role.arn}"
  handler          = "main.handler"
  source_code_hash = "${base64sha256(file("../simple_func.zip"))}"
  runtime          = "nodejs8.10"

/*
  environment {
    variables = {
      foo = "bar"
    }
  }
  */
}
