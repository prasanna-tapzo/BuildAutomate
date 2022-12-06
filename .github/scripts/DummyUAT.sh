#!/bin/bash

set -eo pipefail

xcodebuild archive -workspace $PWD/BuildAutomate/BuildAutomate.xcworkspace \
           -scheme BuildAutomate \
           -configuration Release \
           -archivePath $PWD/build/BuildAutomate.xcarchive
  
xcodebuild -exportArchive \
  -archivePath $PWD/build/BuildAutomate.xcarchive \
  -exportOptionsPlist $PWD/BuildAutomate/ExportOptions.plist \
  -allowProvisioningUpdates \
  -exportPath .
