#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Chris Krycho'
SITENAME = 'Chris Krycho'
SITEURL = ''
SITE_DESCRIPTION = 'Theology, technology, life & art'
SITE_DESCRIPTION_HTML = 'Theology, technology, life & art'

TIMEZONE = 'America/New_York'
DEFAULT_DATE_FORMAT = "%B %d, %Y"
DEFAULT_LANG = 'en'

THEME = '2014_theme'
THEME_STATIC_DIR = 'assets'
CSS_FILE = 'style.css'

JS_DIR = SITEURL + '/' + THEME_STATIC_DIR + '/js'
IMAGE_DIR = SITEURL + '/' + THEME_STATIC_DIR + '/images'

LOGO = IMAGE_DIR + '/ck.png'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
FEED_ALL_RSS = None
CATEGORY_FEED_RSS = None
TRANSLATION_FEED_RSS = None

# Social networking/sharing settings
IDENTITY = {'Bitbucket': 'https://bitbucket.org/chriskrycho',
            'Email': 'mailto:chris at chriskrycho dot com',
            'Facebook': 'https://www.facebook.com/chriskrycho',
            'GitHub': 'https://github.com/chriskrycho',
            'Instagram': 'http://instagram.com/chriskrycho',
            'LinkedIn': 'http://www.linkedin.com/in/chriskrycho',
            'Medium': 'https://medium.com/@chriskrycho',
            'SoundCloud': 'https://soundcloud.com/chriskrycho',
            'Stack Overflow': 'http://stackoverflow.com/users/564181/chris-krycho',
            'Twitter': 'https://twitter.com/chriskrycho',
            'Vimeo': 'https://vimeo.com/chriskrycho'}

BROADCAST = {'all': 'https://broadcast.app.net/46224/chriskrychocom-all/',
             'art': 'https://broadcast.app.net/46225/chriskrychocom-art/',
             'blog': 'https://broadcast.app.net/46226/chriskrychocom-blog/',
             'tech': 'https://broadcast.app.net/46227/chriskrychocom-tech/',
             'theology': 'https://broadcast.app.net/46228/chriskrychocom-theology/'}

DEFAULT_SHARE_IMAGE = ''

# Category settings
USE_FOLDER_AS_CATEGORY = True  # note: this is the default
DEFAULT_CATEGORY = 'blog'

# Output
OUTPUT_SOURCES = True
OUTPUT_SOURCES_EXTENSION = ".txt"

DEFAULT_DATE_FORMAT = "%B %d, %Y"

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

# Content caching for faster builds
CACHE_CONTENT = True
LOAD_CONTENT_CACHE = True
CHECK_MODIFIED_METHOD = 'md5'
CONTENT_CACHING_LAYER = 'reader'

# URLs
ARTICLE_URL = '{date:%Y}/{slug}.html'
ARTICLE_SAVE_AS = '{date:%Y}/{slug}.html'
PAGE_URL = '{slug}.html'
PAGE_SAVE_AS = '{slug}.html'
CATEGORY_URL = '{slug}/'
CATEGORY_SAVE_AS = '{slug}/index.html'
TAG_URL = '{slug}/'
TAG_SAVE_AS = '{slug}/index.html'
AUTHOR_SAVE_AS = ''
AUTHORS_SAVE_AS = ''

# Index and archive pages
DEFAULT_PAGINATION = False

# Path configuration
STATIC_PATHS = ['images',
                'downloads',
                'extra',
                'talks/lib',
                'talks/bibletech2015',
                'talks/es-future-olo']
STATIC_EXCLUDE_SOURCES = False
PAGE_EXCLUDES = ['talks/bibletech2015', 'talks/es-future-olo']
ARTICLE_EXCLUDES = ['talks/bibletech2015', 'talks/es-future-olo']
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},
                       'extra/sermons.xml': {'path': 'sermons.xml'},
                       'extra/.nojekyll': {'path': '.nojekyll'},
                       'extra/robots.txt': {'path': 'robots.txt'},
                       'extra/favicon.png': {'path': 'favicon.png'},
                       'extra/favicon.ico': {'path': 'favicon.ico'},
                       'extra/sermons.xml': {'path': 'sermons.xml'}}

READERS = {'html': None}

import os
from pathlib import Path
writing_path = Path(os.environ['HOME']) / 'Dropbox' / 'writing'
bibliography_path = (writing_path / 'library.bib').resolve()
csl_path = (writing_path / 'chicago.csl').resolve()

PLUGIN_PATHS = ['../../pelican-plugins']
PLUGINS = ['pandoc_reader']
PANDOC_ARGS = ['--smart',  # use smart typography
               '--no-highlight',  # use highlight.js instead
               '-t', 'html5',  # use HTML and its corresponding attributes
               '--section-divs',  # wrap heading-blocks with <section>
               '--filter', 'pandoc-citeproc']  # pre-filter for @citations
