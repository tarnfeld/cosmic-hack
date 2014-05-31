all:: modules
clean:: clean-modules

clean::
	-find . -name \*.pyc -delete

modules: requirements.txt
	-rm -rf modules
	mkdir -p modules
	pip install -r requirements.txt -t modules/.

clean-modules:
	-rm -rf modules
