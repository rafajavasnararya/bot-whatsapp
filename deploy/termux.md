# Termux
pkg update && pkg upgrade
pkg install nodejs-lts python clang
npm install
npm run build
npm run start
Keep .env private. For production use a process manager and encrypted private storage.