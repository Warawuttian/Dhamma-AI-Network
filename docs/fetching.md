In docs/index.html, all fetch() calls use paths like 
'/data/...' but GitHub Pages serves from 
'/Dhamma-AI-Network/' as base.

Fix all fetch paths to use relative paths instead of 
absolute paths:
Change: '/data/filename.json'
To: './data/filename.json'

Also fix any other resource paths (CSS, images, SVG) 
that use absolute /path format.