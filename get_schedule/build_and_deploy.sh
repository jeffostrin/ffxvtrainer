#!/bin/bash
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

pushd $DIR
./create_lambda_distro.sh && ./deploy_lambda_distro.sh && rm -rf generated
popd
