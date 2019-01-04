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

resource "aws_lambda_permission" "get_schedule_lambda_function_permission" {
  depends_on = [
    "aws_api_gateway_method.method2",
    "aws_api_gateway_method_response.OK2"
  ]
  statement_id = "AllowExecutionFromAPIGatewayMethod"
  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.get_schedule_lambda_function.function_name}"
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_api_gateway_rest_api.get_schedule_api_gateway.execution_arn}/*/*/*"
#  source_arn = "arn:aws:execute-api:${var.region}:${var.account_id}:${aws_api_gateway_rest_api.get_schedule_api_gateway.id}/*/*/"
}










resource "aws_api_gateway_resource" "resource" {
  rest_api_id = "${aws_api_gateway_rest_api.get_schedule_api_gateway.id}"
  parent_id   = "${aws_api_gateway_rest_api.get_schedule_api_gateway.root_resource_id}"
  path_part   = "schedule"
}

resource "aws_api_gateway_method" "method2" {
  rest_api_id   = "${aws_api_gateway_rest_api.get_schedule_api_gateway.id}"
  resource_id   = "${aws_api_gateway_resource.resource.id}"
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration2" {
  depends_on = [
    "aws_lambda_permission.get_schedule_lambda_function_permission"
  ]
  rest_api_id = "${aws_api_gateway_rest_api.get_schedule_api_gateway.id}"
  resource_id = "${aws_api_gateway_resource.resource.id}"
  http_method = "${aws_api_gateway_method.method2.http_method}"
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri = "${aws_lambda_function.get_schedule_lambda_function.invoke_arn}"
  #uri =  "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.get_schedule_lambda_function.arn}/invocations"
}

resource "aws_api_gateway_method_response" "OK2" {
  rest_api_id = "${aws_api_gateway_rest_api.get_schedule_api_gateway.id}"
  resource_id = "${aws_api_gateway_resource.resource.id}"
  http_method = "${aws_api_gateway_method.method2.http_method}"
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "integration2-response" {
  depends_on = [
    "aws_api_gateway_integration.integration2"
  ]
  rest_api_id = "${aws_api_gateway_rest_api.get_schedule_api_gateway.id}"
  resource_id = "${aws_api_gateway_resource.resource.id}"
  http_method = "${aws_api_gateway_method.method2.http_method}"
  status_code = "${aws_api_gateway_method_response.OK2.status_code}"
}
