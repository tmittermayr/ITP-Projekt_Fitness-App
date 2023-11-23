# script to load licensed assets into public folder

path='https://docs.google.com/uc?export=download&id=1jA-lomqV5yfaIoz5UurqUY-J0e8fcy-0'

folder_name='gifs.zip'

wget --no-check-certificate $path -O $folder_name 

rm -rf './public/nextfit-gifs'

mv $folder_name ./public
cd public
unzip $folder_name

rm -r './gifs.zip'