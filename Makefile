.PHONY: zip
zip:
	zip -r function.zip node_modules index.js package.json package-lock.json
