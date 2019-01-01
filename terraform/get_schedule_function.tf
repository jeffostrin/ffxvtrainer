# https://github.com/hashicorp/terraform/issues/9271

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"
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

resource "aws_lambda_function" "test_lambda" {
  filename         = "../simple_func.zip"
  function_name    = "test-lambda-cli"
  role             = "${aws_iam_role.iam_for_lambda.arn}"
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

resource "aws_lambda_permission" "test_lambda_permission" {
  depends_on = [
    "aws_api_gateway_method.method",
    "aws_api_gateway_method_response.OK"
  ]
  statement_id = "AllowExecutionFromAPIGatewayMethod"
  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.test_lambda.function_name}"
  principal = "apigateway.amazonaws.com"
  source_arn = "arn:aws:execute-api:${var.region}:${var.account_id}:${aws_api_gateway_rest_api.api-gateway.id}/*/*/"
}

resource "aws_api_gateway_rest_api" "api-gateway" {
  depends_on = [
    "aws_lambda_function.test_lambda"
  ]
  name        = "FFXV API Gateway"
  description = "This is my API for demonstration purposes"
  /*
  endpoint_configuration {
    types = ["EDGE"]
  }
  */
}

/*
resource "aws_api_gateway_resource" "resource" {
  rest_api_id = "${aws_api_gateway_rest_api.api-gateway.id}"
  parent_id   = "${aws_api_gateway_rest_api.api-gateway.root_resource_id}"
  path_part   = "my_resource"
}
*/

resource "aws_api_gateway_method" "method" {
  rest_api_id   = "${aws_api_gateway_rest_api.api-gateway.id}"
  resource_id   = "${aws_api_gateway_rest_api.api-gateway.root_resource_id}"
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
  depends_on = [
    "aws_lambda_permission.test_lambda_permission"
  ]
  rest_api_id = "${aws_api_gateway_rest_api.api-gateway.id}"
  resource_id = "${aws_api_gateway_rest_api.api-gateway.root_resource_id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri =  "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.test_lambda.arn}/invocations"
}

resource "aws_api_gateway_integration_response" "integration-response" {
  depends_on = [
    "aws_api_gateway_integration.integration"
  ]
  rest_api_id = "${aws_api_gateway_rest_api.api-gateway.id}"
  resource_id   = "${aws_api_gateway_rest_api.api-gateway.root_resource_id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  status_code = "${aws_api_gateway_method_response.OK.status_code}"
}

resource "aws_api_gateway_method_response" "OK" {
  rest_api_id = "${aws_api_gateway_rest_api.api-gateway.id}"
  resource_id   = "${aws_api_gateway_rest_api.api-gateway.root_resource_id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }
}
