terraform {
  required_version = "> 0.11.0"
}

provider "aws" {
  version = "~> 1.7"
  region  = "us-east-1"
}
