rm -rf generated
mkdir -p generated

pushd get_schedule
cp ../../mini_events.json .
zip -r ../generated/get_schedule.zip .
rm mini_events.json
popd
