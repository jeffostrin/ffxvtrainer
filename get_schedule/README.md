# Running javascript Tests

get_schedule/get_schedule$ npm test

# Terraform re-apply

terraform$ terraform destroy -auto-approve; terraform apply -auto-approve

# Build and deploy lambda

get_schedule$ ./create_lambda_distro.sh
get_schedule$ ./deploy_lambda_distro.sh
get_schedule$ rm -rf generated


get_schedule$ ./create_lambda_distro.sh; ./deploy_lambda_distro.sh; rm -rf generated


# Useful urls

https://claudiajs.com/tutorials/designing-testable-lambdas.html
