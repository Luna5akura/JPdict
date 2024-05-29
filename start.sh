# ./start.sh

npm run start &
wait-on http://localhost:3000 && wait-on http://localhost:4200
open http://localhost:4200