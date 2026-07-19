#!/bin/bash

set -e

echo "Cleaning site..."
rm -rf _site/*

echo "Building Jekyll..."

jekyll serve --watch --incremental
