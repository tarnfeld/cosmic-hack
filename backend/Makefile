ll:: modules
clean:: clean-modules

modules: requirements.txt
	-rm -rf modules
	mkdir -p modules
	pip install -r requirements.txt -t modules/.

clean-modules:
	-rm -rf modules
