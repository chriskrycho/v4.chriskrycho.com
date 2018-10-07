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

THEME = 'theme'
THEME_STATIC_DIR = 'assets'
CSS_FILE = 'style.css'

JS_DIR = SITEURL + '/' + THEME_STATIC_DIR + '/js'
IMAGE_DIR = SITEURL + '/' + THEME_STATIC_DIR + '/images'

LOGO = IMAGE_DIR + '/ck.png'

# Always supply full posts. Truncated posts are annoying; this is a stupid
# default -- don't replicate it in Lightning!
RSS_FEED_SUMMARY_ONLY = False

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
FEED_ALL_RSS = None
CATEGORY_FEED_RSS = None
TRANSLATION_FEED_RSS = None

# Social networking/sharing settings
IDENTITY = {'Email': 'mailto:chris at chriskrycho dot com',
            'GitHub': 'https://github.com/chriskrycho',
            'LinkedIn': 'http://www.linkedin.com/in/chriskrycho',
            'SoundCloud': 'https://soundcloud.com/chriskrycho',
            'Stack Overflow': 'http://stackoverflow.com/users/564181/chris-krycho',
            'Twitter': 'https://twitter.com/chriskrycho',
            'Vimeo': 'https://vimeo.com/chriskrycho'
            }

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
ARCHIVE_SAVE_AS = ''
AUTHOR_SAVE_AS = ''
AUTHORS_SAVE_AS = ''

# Index and archive pages
DEFAULT_PAGINATION = False

# Path configuration
STATIC_PATHS = ['bib',
                'images',
                'downloads',
                'extra',
                'talks/lib',
                'talks/bibletech2015',
                'talks/es-future-olo',
                'talks/rust-belt-rust']
STATIC_EXCLUDES = ['talks/rust-belt-rust/img', 'bib/chicago.csl']
STATIC_EXCLUDE_SOURCES = False
PAGE_EXCLUDES = ['talks/bibletech2015', 'talks/es-future-olo', 'talks/rust-belt-rust']
ARTICLE_EXCLUDES = ['talks/bibletech2015', 'talks/es-future-olo', 'talks/rust-belt-rust']
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},
                       'extra/sermons.xml': {'path': 'sermons.xml'},
                       'extra/.nojekyll': {'path': '.nojekyll'},
                       'extra/robots.txt': {'path': 'robots.txt'},
                       'extra/favicon.png': {'path': 'favicon.png'},
                       'extra/favicon.ico': {'path': 'favicon.ico'},
                       'extra/redirects/curriculum-vitae': {'path': 'curriculum-vitae'},
                       'extra/redirects/curriculum-vitae.html': {'path': 'curriculum-vitae.html'}
                       }

READERS = {'html': None,
           'yaml': None}

PLUGIN_PATHS = ['../../pelican-plugins']
PLUGINS = ['pandoc_reader']
PANDOC_ARGS = ['--no-highlight',  # use highlight.js instead
               '--section-divs',  # wrap heading-blocks with <section>
               '--filter', 'pandoc-citeproc', # pre-filter for @citations
               '--csl', 'content/bib/chicago.csl'
               ]
