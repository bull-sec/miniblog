#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="_posts/pub/minis"
mkdir -p "$ROOT_DIR"

read -rp "Post title: " title
read -rp "Date (YYYY-MM-DD) [$(date +%Y-%m-%d)]: " date
read -rp "Tags (comma-separated): " tags
read -rp "Image path (/assets/...): " image
read -rp "Gallery path (/assets/images/gallery/...): " gallery
read -rp "Description: " description
read -rp "OG image path (optional): " og_image
read -rp "Published? [Y/n]: " published

if [ -z "$date" ]; then
  date=$(date +%Y-%m-%d)
fi

slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
file="$ROOT_DIR/$date-$slug.md"

if [ -e "$file" ]; then
  echo "File already exists: $file" >&2
  exit 1
fi

published_value="true"
if [[ "$published" =~ ^[Nn] ]]; then
  published_value="false"
fi

cat > "$file" <<EOF
---
layout: post
title: $title
date: $date
tags:
EOF

IFS=',' read -ra tag_array <<< "$tags"
for tag in "${tag_array[@]}"; do

  trimmed=$(echo "$tag" | sed 's/^ *//; s/ *$//')
  if [ -n "$trimmed" ]; then
    printf '  - %s\n' "$trimmed" >> "$file"
  fi
done

cat >> "$file" <<EOF
image: $image
gallery: $gallery
description: $description
og-image: $og_image
published: $published_value
---

## Introduction

Write your opening paragraph here.

## Details

Write the body of your post here.

![${title}]($image)

## Conclusion

Wrap up your post here.
EOF

chmod 644 "$file"
echo "Created $file"
