#!/bin/sh
set -eo pipefail

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/FedMobile_DC.mobileprovision ./.github/secrets/FedMobile_DC.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/Notification_Content_Extension_Distribution_2022.mobileprovision ./.github/secrets/Notification_Content_Extension_Distribution_2022.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/RichNotificationService.mobileprovision ./.github/secrets/RichNotificationService.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/Certificates.p12 ./.github/secrets/Certificates.p12.gpg

mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles

cp ./.github/secrets/FedMobile_DC.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/FedMobile_DC.mobileprovision
cp ./.github/secrets/Notification_Content_Extension_Distribution_2022.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/Notification_Content_Extension_Distribution_2022.mobileprovision
cp ./.github/secrets/RichNotificationService.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/RichNotificationService.mobileprovision


security create-keychain -p "" build.keychain
security import ./.github/secrets/Certificates.p12 -t agg -k ~/Library/Keychains/build.keychain -P "123456" -A

security list-keychains -s ~/Library/Keychains/build.keychain
security default-keychain -s ~/Library/Keychains/build.keychain
security unlock-keychain -p "" ~/Library/Keychains/build.keychain

security set-key-partition-list -S apple-tool:,apple: -s -k "" ~/Library/Keychains/build.keychain
