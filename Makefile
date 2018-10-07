# --- Base configuration --- #
PY=python3
PELICAN=pelican

THEME=theme

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/output
CONFFILE=$(BASEDIR)/pelicanconf.py
PUBLISHCONF=$(BASEDIR)/publishconf.py


THEME_DIR=$(BASEDIR)/$(THEME)
STATIC_DIR=$(THEME_DIR)/static


# --- Convert SASS to CSS --- #
STYLE_SRC_DIR=$(THEME_DIR)/sass
STYLE_INCLUDES= $(STYLE_SRC_DIR)/style.scss
STYLE_OBJ=$(STYLE_INCLUDES:.scss=.css)
STYLE_OUT=$(STATIC_DIR)/style.css

$(STYLE_OBJ): $(STYLE_INCLUDES)
	sass -t compressed $< $@

$(STYLE_OUT): $(STYLE_OBJ)
	mv $< $@

.PHONY: sass
sass: $(STYLE_OUT)

.PHONY: scss
scss: sass


# --- Bundle JavaScript --- #
JS_SRC_DIR=$(THEME_DIR)/scripts
JS_SRC=\
	$(JS_SRC_DIR)/lib.js \
	$(JS_SRC_DIR)/smcp.js \
	$(JS_SRC_DIR)/spacewell.js

JS_OUT=$(STATIC_DIR)/js/lib.js
$(JS_OUT): $(JS_SRC)
	yarn bundle

.PHONY: js
js: $(JS_OUT)


# --- Build the site --- #
# For local testing
.PHONY: html
html: js sass
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

# For publication
.PHONY: publish
publish: js sass
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(PUBLISHCONF) $(PELICANOPTS)


# --- Publish the site --- #
.PHONY: github
github: publish
	ghp-import $(OUTPUTDIR) -m "Update site content"
	git push origin gh-pages


# --- Clean the site --- #
.PHONY: clean
clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)
