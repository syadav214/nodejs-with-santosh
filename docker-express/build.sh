
cp -r ./src ./docker

cd docker

sudo docker build -t dockerfile .

cd ..

rm -Rf ./docker/src
