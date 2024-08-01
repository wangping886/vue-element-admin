deploy:
	git add .
	git commit -am "update"
	git push
	@ssh root@101.200.87.211 "cd /root/web/vue-element-admin&&git pull && npm run dev"
	