deploy:
	git add .
	git commit -am "update"
	npm run build:prod
	#git push
	scp -r dist root@101.200.87.211:/root/web/vue-admin/dist	