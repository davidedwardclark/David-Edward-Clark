rsync -arvuz /Users/dclark/Projects/David-Edward-Clark/ root@173.255.210.11:/srv/www/davidedwardclark.com/public_html/ --rsh="ssh -p25386" --exclude '.git' --exclude '.DS_Store' --exclude '/deploy/production.sh';