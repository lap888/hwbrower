echo "本地build"
npm run build
echo "上传服务器"
scp -i /Users/topbrids/cert/testbbs.pem /Users/topbrids/nativebases/hwbrower/dist/* root@101.32.178.79:/apps/www/hwhj/dist/
# ssh -i /Users/topbrids/cert/testbbs.pem root@101.32.178.79