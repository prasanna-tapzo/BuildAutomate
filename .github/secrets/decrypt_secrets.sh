#!/bin/sh
set -eo pipefail

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/FedMobileDC.mobileprovision ./.github/secrets/FedMobileDC.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/Notification_Content_Extension_Distribution_2022.mobileprovision ./.github/secrets/Notification_Content_Extension_Distribution_2022.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/RichNotificationService.mobileprovision ./.github/secrets/RichNotificationService.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/RichNotificationServiceDev.mobileprovision ./.github/secrets/RichNotificationServiceDev.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/Notification_Content_Extension_Distribution_2022D.mobileprovision ./.github/secrets/Notification_Content_Extension_Distribution_2022D.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/FedMobileDCDev.mobileprovision ./.github/secrets/FedMobileDCDev.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/Certificates.p12 ./.github/secrets/Certificates.p12.gpg

mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles

cp ./.github/secrets/FedMobileDC.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/FedMobileDC.mobileprovision
cp ./.github/secrets/Notification_Content_Extension_Distribution_2022.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/Notification_Content_Extension_Distribution_2022.mobileprovision
cp ./.github/secrets/RichNotificationService.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/RichNotificationService.mobileprovision
cp ./.github/secrets/RichNotificationServiceDev.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/RichNotificationServiceDev.mobileprovision
cp ./.github/secrets/Notification_Content_Extension_Distribution_2022D.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/Notification_Content_Extension_Distribution_2022D.mobileprovision
cp ./.github/secrets/FedMobileDCDev.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/FedMobileDCDev.mobileprovision

security create-keychain -p "" build.keychain
security import ./.github/secrets/Certificates.p12 -t agg -k ~/Library/Keychains/build.keychain -P "123456" -A

security list-keychains -s ~/Library/Keychains/build.keychain
security default-keychain -s ~/Library/Keychains/build.keychain
security unlock-keychain -p "" ~/Library/Keychains/build.keychain

security set-key-partition-list -S apple-tool:,apple: -s -k "" ~/Library/Keychains/build.keychain
