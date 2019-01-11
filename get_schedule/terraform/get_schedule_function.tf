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
  filename         = "../generated/get_schedule.zip"
  function_name    = "get_schedule"
  role             = "${aws_iam_role.get_schedule_iam_role.arn}"
  handler          = "index.lambda_handler_v2"
  source_code_hash = "${base64sha256(file("../generated/get_schedule.zip"))}"
  runtime          = "nodejs8.10"

/*
  environment {
    variables = {
      foo = "bar"
    }
  }
  */
}

output "lamda_function_arn" {
  value = "${aws_lambda_function.get_schedule_lambda_function.arn}"
}
