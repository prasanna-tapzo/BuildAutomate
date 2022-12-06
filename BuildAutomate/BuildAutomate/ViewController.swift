//
//  ViewController.swift
//  BuildAutomate
//
//  Created by Prasanna on 04/12/22.
//

import UIKit
/*
 name: Upload - Testflight
 on:
   push:
     branches:
       - main
 jobs:
   test:
     runs-on: macOS-latest
     steps:
     - name: Checkout repository
       uses: actions/checkout@v1
     - name: Set XCode Version
       run: sudo xcode-select -s /Applications/Xcode_13.2.1.app
     - name: Install Dependencies
       run: |
         cd BuildAutomate
         pod install --repo-update

       shell: bash
     - name: Install gpg
       run: brew install gnupg
     - name: Giving permission to shell files
       run: |
              chmod +x ./.github/scripts/ActualUAT.sh
              chmod +x ./.github/scripts/DR.sh
              chmod +x ./.github/scripts/DummyUAT.sh
              chmod +x ./.github/secrets/decrypt_secrets.sh
     - name: Setup provisioning profile
       env:
        IOS_KEYS: ${{ secrets.IOS_KEYS }}
       run: ./.github/secrets/decrypt_secrets.sh
     - name: Archiving & exporting Dummy UAT build
       env:
        PR_NUMBER: $(jq --raw-output .pull_request.number "$GITHUB_EVENT_PATH")
       if: "contains(github.event.head_commit.message, 'DUAT')"
       run: ./.github/scripts/DummyUAT.sh
     - name: Archiving & exporting Actual UAT build
       env:
        PR_NUMBER: $(jq --raw-output .pull_request.number "$GITHUB_EVENT_PATH")
       if: "contains(github.event.head_commit.message, 'AUAT')"
       run: ./.github/scripts/ActualUAT.sh
     - name: Archiving & exporting DR build.
       env:
        PR_NUMBER: $(jq --raw-output .pull_request.number "$GITHUB_EVENT_PATH")
       if: "contains(github.event.head_commit.message, 'DR')"
       run: ./.github/scripts/DR.sh
     
         
    
     



 */
class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }


}

