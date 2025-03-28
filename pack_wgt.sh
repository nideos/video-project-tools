#!/bin/bash

# Script to package UniApp resources into WGT resource package
# This script is designed to be run from a shared tools directory

# Determine project directory (parent of the directory containing the script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR=$(basename $(dirname "$SCRIPT_DIR"))

echo "Script being run from: $SCRIPT_DIR"
echo "Project directory: $PROJECT_DIR"

# Function to check if required commands exist
check_command() {
    if ! command -v "$1" &> /dev/null; then
        echo "Error: $1 command is required but not found."
        exit 1
    fi
}

# Check for required commands
check_command "cli"
check_command "zip"
check_command "unzip"
check_command "sed"

# 2. Get app ID from user
echo "Please enter the app ID:"
read APP_ID

# 3. Get version number from user and update manifest.json
echo "Please enter the version number (e.g., 1.0.1):"
read VERSION_NAME

# Navigate to project root directory
cd "$(dirname "$SCRIPT_DIR")"

# Update the versionName in the manifest.json file
echo "Updating version name to $VERSION_NAME in manifest.json"
sed -i '' "s/\"versionName\": \"[^\"]*\"/\"versionName\": \"$VERSION_NAME\"/" src/manifest.json

# 4. Generate WGT package using CLI command
echo "Generating WGT package..."
cli publish --platform APP --type wgt --project $PROJECT_DIR --name test.wgt --confuse true

# Path to the generated WGT file
WGT_PATH="$(dirname "$SCRIPT_DIR")/unpackage/release/test.wgt"

# Check if the WGT file exists
if [ ! -f "$WGT_PATH" ]; then
    echo "Error: Generated WGT file not found at $WGT_PATH"
    exit 1
fi

# Create a temp directory for our work
TEMP_DIR="$(dirname "$SCRIPT_DIR")/temp_wgt_$(date +%s)"
mkdir -p "$TEMP_DIR"

# 5. Convert WGT to ZIP
echo "Converting WGT to ZIP..."
cp "$WGT_PATH" "$TEMP_DIR/test.zip"

# 6. Extract ZIP and delete the original ZIP
echo "Extracting ZIP file..."
unzip -q "$TEMP_DIR/test.zip" -d "$TEMP_DIR"
rm "$TEMP_DIR/test.zip"

# 7. Update appid in the extracted manifest.json
echo "Updating app ID in manifest.json..."

# Debug: Check what's in the manifest.json file
echo "Debugging manifest.json structure:"
if [ -f "$TEMP_DIR/manifest.json" ]; then
    echo "manifest.json found at root level"
    cat "$TEMP_DIR/manifest.json" | grep -E "\"id\""
    
    # Update the id in manifest.json
    echo "Replacing id: '__UNI__4860B47' with '$APP_ID' in manifest.json"
    sed -i '' 's/"id":"[^"]*"/"id":"'"$APP_ID"'"/' "$TEMP_DIR/manifest.json"
    
    # Verify the replacement
    echo "Verifying replacement:"
    cat "$TEMP_DIR/manifest.json" | grep -E "\"id\""
else
    echo "Looking for manifest.json in subdirectories..."
    find "$TEMP_DIR" -name "manifest.json" -print
    MANIFEST_PATH=$(find "$TEMP_DIR" -name "manifest.json" -print | head -1)
    
    if [ -n "$MANIFEST_PATH" ]; then
        echo "Found manifest.json at: $MANIFEST_PATH"
        cat "$MANIFEST_PATH" | grep -E "\"id\""
        
        # Update the id in the found manifest.json
        echo "Replacing id in $MANIFEST_PATH"
        sed -i '' 's/"id":"[^"]*"/"id":"'"$APP_ID"'"/' "$MANIFEST_PATH"
        
        # Verify the replacement
        echo "Verifying replacement:"
        cat "$MANIFEST_PATH" | grep -E "\"id\""
    else
        echo "No manifest.json found in the package!"
    fi
fi

# 8. Compress the folder again
echo "Compressing folder..."
cd "$TEMP_DIR"
zip -r -q "$(dirname "$SCRIPT_DIR")/temp_package.zip" .
cd "$(dirname "$SCRIPT_DIR")"

# 9. Rename to WGT with appropriate filename
FINAL_NAME="${APP_ID}-${VERSION_NAME}.wgt"
mv "temp_package.zip" "$FINAL_NAME"

# Clean up
rm -rf "$TEMP_DIR"

# 10. Notify user of completion
echo "WGT packaging complete!"
echo "Output file: $(pwd)/$FINAL_NAME"