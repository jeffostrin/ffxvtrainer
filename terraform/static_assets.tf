
module "s3" "FFXV Trainer Assets" {
  source  = "Aplyca/s3/aws"
  version = "0.1.4"

  name = "FFXV Trainer Asset Bucket"
  acl = "public-read"

  cors_allowed_origins = ["*"]
  cors_allowed_headers = ["*"]
  cors_allowed_methods = ["GET"]
  cors_expose_headers  = ["ETag"]
  cors_max_age_seconds = "0"

  tags {
    App = "FFXV Trainer"
  }
}
