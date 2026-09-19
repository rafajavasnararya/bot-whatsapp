#!/data/data/com.termux/files/usr/bin/bash
set -e
pkg update -y
pkg install nodejs-lts python git -y
npm install
python -m pip install -r requirements.txt
node src/index.js