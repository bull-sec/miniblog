#!/bin/bash

set -e

echo "=== Cleaning previous build ==="
rm -rf _site/*

IMAGE_DIR="assets/images"
BACKUP_DIR="_image-backup"

echo "=== Creating backup directory ==="
mkdir -p "$BACKUP_DIR"

echo "=== Converting images to WebP ==="

find "$IMAGE_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file
do
    output="${file%.*}.webp"

    if [ ! -f "$output" ]; then
        echo "Converting: $file"
        cwebp -q 85 "$file" -o "$output"
    else
        echo "Skipping existing: $output"
    fi
done


echo "=== Backing up originals ==="

find "$IMAGE_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file
do
    relative="${file#$IMAGE_DIR/}"

    mkdir -p "$BACKUP_DIR/$(dirname "$relative")"

    cp "$file" "$BACKUP_DIR/$relative"
done


echo "=== Removing non-WebP images ==="

find "$IMAGE_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -delete


echo "=== Starting Jekyll ==="

jekyll serve --incremental --watch
