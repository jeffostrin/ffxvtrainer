
resource "aws_s3_bucket" "ffxv_s3_assets" {
  bucket = "ffxv-trainer-v2"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }

  tags {
    App = "FFXV Trainer"
  }

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::ffxv-trainer-v2/*"
      }
  ]
}
POLICY
}


resource "aws_s3_bucket" "ffxvtrainerdotcom" {
  bucket = "ffxvtrainer.com"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }

  tags {
    App = "FFXV Trainer"
  }

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::ffxvtrainer.com/*"
      }
  ]
}
POLICY
}

resource "aws_s3_bucket" "wwwffxvtrainerdotcom" {
  bucket = "www.ffxvtrainer.com"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }

  tags {
    App = "FFXV Trainer"
  }

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::www.ffxvtrainer.com/*"
      }
  ]
}
POLICY
}
