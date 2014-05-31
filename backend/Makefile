all:: lib
clean:: clean-lib

lib: requirements.txt
	-rm -rf lib
	mkdir -p lib
	pip install -r requirements.txt -t lib/.

clean-lib:
	-rm -rf lib
