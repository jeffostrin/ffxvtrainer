terraform {
  required_version = "> 0.11.0"
}

provider "aws" {
  version = "~> 1.7"
  region  = "us-east-1"
}

variable "region" {
  default = "us-east-1"
}

variable "account_id" {
  default = "528988486768"
}
