resource "aws_api_gateway_resource" "schedule" {
  rest_api_id = "${aws_api_gateway_rest_api.ffxv_trainer_api_gateway.id}"
  parent_id   = "${aws_api_gateway_rest_api.ffxv_trainer_api_gateway.root_resource_id}"
  path_part   = "schedule"
}

resource "aws_api_gateway_method" "get_method" {
  rest_api_id   = "${aws_api_gateway_rest_api.ffxv_trainer_api_gateway.id}"
  resource_id   = "${aws_api_gateway_resource.schedule.id}"
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "ok_response" {
  rest_api_id = "${aws_api_gateway_rest_api.ffxv_trainer_api_gateway.id}"
  resource_id = "${aws_api_gateway_resource.schedule.id}"
  http_method = "${aws_api_gateway_method.get_method.http_method}"
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration" "api_integration" {
  depends_on = [
    "aws_lambda_permission.get_schedule_lambda_function_permission"
  ]
  rest_api_id = "${aws_api_gateway_rest_api.ffxv_trainer_api_gateway.id}"
  resource_id = "${aws_api_gateway_resource.schedule.id}"
  http_method = "${aws_api_gateway_method.get_method.http_method}"
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri = "${aws_lambda_function.get_schedule_lambda_function.invoke_arn}"
}

resource "aws_api_gateway_integration_response" "api_integration_response" {
  depends_on = [
    "aws_api_gateway_integration.api_integration"
  ]
  rest_api_id = "${aws_api_gateway_rest_api.ffxv_trainer_api_gateway.id}"
  resource_id = "${aws_api_gateway_resource.schedule.id}"
  http_method = "${aws_api_gateway_method.get_method.http_method}"
  status_code = "${aws_api_gateway_method_response.ok_response.status_code}"
}

resource "aws_lambda_permission" "get_schedule_lambda_function_permission" {
  statement_id = "AllowExecutionFromAPIGatewayMethod"
  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.get_schedule_lambda_function.function_name}"
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_api_gateway_rest_api.ffxv_trainer_api_gateway.execution_arn}/*/*/*"
}

output "api_resource_id" {
  value = "${aws_api_gateway_resource.schedule.id}"
}

output "api_method_id" {
  value = "${aws_api_gateway_method.get_method.id}"
}
