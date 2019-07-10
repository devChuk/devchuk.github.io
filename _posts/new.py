#Just a simple script to automate the YML frontmatter in new posts
import datetime
import os

date = raw_input('Creating new file, enter ISO date (2017-12-06) (if today then just press Enter): ')
if len(date) == 0:
    print '\nDate set to: '
    date = datetime.date.today()
    date = date.strftime('%Y-%m-%d')
    print date

title = raw_input('\nEnter title: ')

fileName = date + '-' + title.replace(" ", "-").lower() + '.md'
print fileName

text = """---
layout: post
title: {}
thumbnail: /res/img/Flight.png
excerpt:
---


""".format(title)

file = open(fileName, "w")
file.write(text)

print '\nFile is generated!'

os.system("atom " + fileName)
