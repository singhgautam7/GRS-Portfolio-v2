#!/bin/bash
PROJECTS_DIR="content/projects"
FEATURED_DIR="content/featured"

# Ensure the projects directory exists
if [ ! -d "$PROJECTS_DIR" ]; then
  echo "Projects directory $PROJECTS_DIR not found."
  exit 1
fi

echo "Migrating files in $PROJECTS_DIR..."

cd "$PROJECTS_DIR" || exit

# Process files in content/projects
for file in *.md; do
  # Skip if no .md files match
  [ -e "$file" ] || continue
  
  # Skip if it is exactly index.md to prevent weird nesting
  if [ "$file" = "index.md" ]; then
    continue
  fi

  # Extract filename without extension for directory name, convert to lowercase matching existing slug logic
  filename="${file%.*}"
  
  dirname=$(echo "$filename" | tr '[:upper:]' '[:lower:]')

  echo "Migrating $file to $dirname/index.md"
  
  # Create the directory
  mkdir -p "$dirname"
  
  # Move and rename the file
  mv "$file" "$dirname/index.md"
done

cd ../.. || exit

# Process files in content/featured (e.g. ai-reader.md) if they exist
if [ -d "$FEATURED_DIR" ]; then
  echo "Migrating files in $FEATURED_DIR..."
  cd "$FEATURED_DIR" || exit
  
  for file in *.md; do
    [ -e "$file" ] || continue
    if [ "$file" = "index.md" ]; then
      continue
    fi
    filename="${file%.*}"
    dirname=$(echo "$filename" | tr '[:upper:]' '[:lower:]')
    echo "Migrating $file to ../projects/$dirname/index.md"
    mkdir -p "../projects/$dirname"
    mv "$file" "../projects/$dirname/index.md"
  done
  
  for dir in */; do
     [ -d "$dir" ] || continue
     # remove trailing slash
     dirname="${dir%/}"
     lowered=$(echo "$dirname" | tr '[:upper:]' '[:lower:]')
     echo "Moving featured directory $dirname to projects/$lowered"
     mkdir -p "../projects/$lowered"
     mv "$dirname"/* "../projects/$lowered/" 2>/dev/null || true
  done
  
  cd ../.. || exit
  
  echo "Removing featured directory..."
  rm -rf "$FEATURED_DIR"
fi

echo "Migration complete!"
