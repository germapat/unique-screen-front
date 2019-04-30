git pull
if (quasar build)
then 
    if (ls dist/pantalla_unica/)
    then
        mv dist/pantalla_unica/ dist/pantalla_unica_old
        mv dist/spa-mat/ dist/pantalla_unica
        rm -r dist/pantalla_unica_old/
    else
        mv dist/spa-mat/ dist/pantalla_unica
    fi
else 
    echo "No compilo" 
fi 