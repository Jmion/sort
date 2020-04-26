npm run-script build
scp -rp build/ sort:build
ssh sort './install_website.sh'
