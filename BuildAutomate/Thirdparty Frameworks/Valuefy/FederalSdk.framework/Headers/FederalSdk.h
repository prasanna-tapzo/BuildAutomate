//
//  FederalSdk.h
//  FederalSdk
//
//  Created by Ankit Tiwari on 26/05/21.
//  Copyright © 2021 Valuefy Solutions Pvt Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface FederalSdk : UIViewController <UINavigationControllerDelegate>
@property (nonatomic, retain) NSDictionary *initialData;
@property (nonatomic, strong) UIView *window;

@end
