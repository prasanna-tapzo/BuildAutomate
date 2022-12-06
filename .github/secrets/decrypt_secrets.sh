#!/bin/sh
set -eo pipefail

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/FedMobileDC.mobileprovision ./.github/secrets/FedMobileDC.mobileprovision.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/FedMobileDCDev.mobileprovision ./.github/secrets/FedMobileDCDev.mobileprovision.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/FedMobileRActualUAT.mobileprovision ./.github/secrets/FedMobileRActualUAT.mobileprovision.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/NotificationContent.mobileprovision ./.github/secrets/NotificationContent.mobileprovision.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/RichNotificationService.mobileprovision ./.github/secrets/RichNotificationService.mobileprovision.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/RichNotification-dev.mobileprovision ./.github/secrets/RichNotification-dev.mobileprovision.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/FedMobileRDR.mobileprovision ./.github/secrets/FedMobileRDR.mobileprovision.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/FedMobileRDummyUAT.mobileprovision ./.github/secrets/FedMobileRDummyUAT.mobileprovision.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/certificate.p12 ./.github/secrets/certificate.p12.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/Certificates-dev.p12 ./.github/secrets/Certificates-dev.p12.gpg

mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles


cp ./.github/secrets/FedMobileDC.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/FedMobileDC.mobileprovision
cp ./.github/secrets/FedMobileDCDev.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/FedMobileDCDev.mobileprovision

cp ./.github/secrets/FedMobileRActualUAT.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/FedMobileRActualUAT.mobileprovision

cp ./.github/secrets/FedMobileRDR.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/FedMobileRDR.mobileprovision

cp ./.github/secrets/FedMobileRDummyUAT.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/FedMobileRDummyUAT.mobileprovision

cp ./.github/secrets/RichNotificationService.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/RichNotificationService.mobileprovision
cp ./.github/secrets/RichNotification-dev.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/RichNotification-dev.mobileprovision

cp ./.github/secrets/NotificationContent.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/NotificationContent.mobileprovision



security create-keychain -p "" build.keychain
security import ./.github/secrets/certificate.p12 -t agg -k ~/Library/Keychains/build.keychain -P "123456" -A
security import ./.github/secrets/Certificates-dev.p12 -t agg -k ~/Library/Keychains/build.keychain -P "123456" -A

security list-keychains -s ~/Library/Keychains/build.keychain
security default-keychain -s ~/Library/Keychains/build.keychain
security unlock-keychain -p "" ~/Library/Keychains/build.keychain

security set-key-partition-list -S apple-tool:,apple: -s -k "" ~/Library/Keychains/build.keychain
