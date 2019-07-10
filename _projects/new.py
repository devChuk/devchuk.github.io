#Just a simple script to automate the YAML front matter in new posts
import datetime
import os

title = raw_input('\nEnter title: ')
fileName= title.replace(" ", "_").lower() + '.md'
print fileName + '\n'

text = """---
layout: project
title: {}
date: Feb 2015
thumbnail: http://devchuk.github.io/devchukV1/res/img/portimg/parrot/prof.jpg
thumbnail_size: half-img
client: PROJECT
client_name: {}
role: Full-stack developer
platforms: Web
status: Active
featured: True
desc: Here is a medium-length description about the project.
---
""".format(title, title)

file = open(fileName, "w")
file.write(text)

print '\nFile is generated!'

os.system("atom " + fileName)
