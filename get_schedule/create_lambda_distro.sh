rm -rf generated
mkdir -p generated

pushd get_schedule
cp ../../mini_events.compact.json .
cp ../../luna_gifts.compact.json .
zip -r ../generated/get_schedule.zip .
rm mini_events.compact.json
rm luna_gifts.compact.json
popd
