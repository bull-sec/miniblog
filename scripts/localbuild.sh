#!/bin/bash

set -e

echo "Cleaning site..."
rm -rf _site/*

echo "Converting images..."

find assets/images -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read img; do

    out="${img%.*}.webp"

    if [ ! -f "$out" ]; then
        echo "Converting $img"
        cwebp -q 85 "$img" -o "$out"
    fi

done

echo "Backing up originals..."

mkdir -p _image-backup

find assets/images -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -exec cp --parents {} _image-backup/ \;


echo "Removing originals..."

find assets/images -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -delete


echo "Building Jekyll..."

jekyll serve --watch --incremental
