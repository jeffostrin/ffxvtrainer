# fail if generated dir does not exist

pushd terraform
terraform apply -auto-approve
popd
