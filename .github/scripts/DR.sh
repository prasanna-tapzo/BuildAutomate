#!/usr/bin/env bash

xcodebuild clean -scheme FedMobile-DR

# 1
xcodebuild archive -workspace FedMobile.xcworkspace  -scheme FedMobile-DR \
  -configuration Release \
  -archivePath "FedMobile.xcarchive"


xcodebuild -exportArchive \
  -archivePath FedMobile.xcarchive \
  -exportOptionsPlist "ExportOptions.plist" \
  -allowProvisioningUpdates \
  -exportPath .





