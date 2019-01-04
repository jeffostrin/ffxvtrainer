resource "aws_api_gateway_rest_api" "ffxv_trainer_api_gateway" {
  name        = "FFXV Trainer API"
  description = "This is the API for FFXV Trainer"

  /*
  endpoint_configuration {
    types = ["EDGE"]
  }
  */
}
