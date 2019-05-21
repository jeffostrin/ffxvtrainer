rm -rf generated
mkdir -p generated

pushd get_schedule
cp ../../mini_events.compact.json .
cp ../../luna_gifts.compact.json .
cp ../../multi_hour_events.compact.json .
zip -r ../generated/get_schedule.zip .
rm mini_events.compact.json
rm luna_gifts.compact.json
rm multi_hour_events.compact.json
popd
