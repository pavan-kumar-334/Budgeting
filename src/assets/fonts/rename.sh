for name in Montserrat-*
do
    newname="$(echo "$name" | cut -c12-)"
    mv "$name" "$newname"
done