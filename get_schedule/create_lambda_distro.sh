rm -rf generated
mkdir -p generated

pushd get_schedule
cp ../../luna_gifts.compact.json .
cp ../../slot*.compact.json .
zip -r ../generated/get_schedule.zip .
rm luna_gifts.compact.json
rm slot*.compact.json
popd
