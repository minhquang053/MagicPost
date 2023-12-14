#!/bin/bash

# Set the directory where the PNG files are located
directory="."

# Iterate over all PNG files in the directory
for file in "$directory"/*.png; do
    # Check if the file is a regular file
    if [ -f "$file" ]; then
        # Append '/assets/avatars/' to the file path
        new_path="'/assets/avatars/$(basename "$file")',"
        
        # Display the modified file path
        echo "$new_path"
    fi
done

