#if 0
#elif defined(__arm64__) && __arm64__
// Generated by Apple Swift version 5.5.2 effective-4.1.50 (swiftlang-1300.0.47.5 clang-1300.0.29.30)
#ifndef COREADAPTER_SWIFT_H
#define COREADAPTER_SWIFT_H
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgcc-compat"

#if !defined(__has_include)
# define __has_include(x) 0
#endif
#if !defined(__has_attribute)
# define __has_attribute(x) 0
#endif
#if !defined(__has_feature)
# define __has_feature(x) 0
#endif
#if !defined(__has_warning)
# define __has_warning(x) 0
#endif

#if __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wauto-import"
#include <Foundation/Foundation.h>
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus)
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...)
# endif
#endif

#if __has_attribute(objc_runtime_name)
# define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
#else
# define SWIFT_RUNTIME_NAME(X)
#endif
#if __has_attribute(swift_name)
# define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
#else
# define SWIFT_COMPILE_NAME(X)
#endif
#if __has_attribute(objc_method_family)
# define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
#else
# define SWIFT_METHOD_FAMILY(X)
#endif
#if __has_attribute(noescape)
# define SWIFT_NOESCAPE __attribute__((noescape))
#else
# define SWIFT_NOESCAPE
#endif
#if __has_attribute(ns_consumed)
# define SWIFT_RELEASES_ARGUMENT __attribute__((ns_consumed))
#else
# define SWIFT_RELEASES_ARGUMENT
#endif
#if __has_attribute(warn_unused_result)
# define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
#else
# define SWIFT_WARN_UNUSED_RESULT
#endif
#if __has_attribute(noreturn)
# define SWIFT_NORETURN __attribute__((noreturn))
#else
# define SWIFT_NORETURN
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA
#endif
#if !defined(SWIFT_CLASS)
# if __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif
#if !defined(SWIFT_RESILIENT_CLASS)
# if __has_attribute(objc_class_stub)
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME) __attribute__((objc_class_stub))
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_class_stub)) SWIFT_CLASS_NAMED(SWIFT_NAME)
# else
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME)
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) SWIFT_CLASS_NAMED(SWIFT_NAME)
# endif
#endif

#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif

#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif

#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER
# endif
#endif
#if !defined(SWIFT_ENUM_ATTR)
# if defined(__has_attribute) && __has_attribute(enum_extensibility)
#  define SWIFT_ENUM_ATTR(_extensibility) __attribute__((enum_extensibility(_extensibility)))
# else
#  define SWIFT_ENUM_ATTR(_extensibility)
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name, _extensibility) enum _name : _type _name; enum SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# if __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) SWIFT_ENUM(_type, _name, _extensibility)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_WEAK_IMPORT)
# define SWIFT_WEAK_IMPORT __attribute__((weak_import))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if __has_feature(attribute_diagnose_if_objc)
# define SWIFT_DEPRECATED_OBJC(Msg) __attribute__((diagnose_if(1, Msg, "warning")))
#else
# define SWIFT_DEPRECATED_OBJC(Msg) SWIFT_DEPRECATED_MSG(Msg)
#endif
#if !defined(IBSegueAction)
# define IBSegueAction
#endif
#if __has_feature(modules)
#if __has_warning("-Watimport-in-framework-header")
#pragma clang diagnostic ignored "-Watimport-in-framework-header"
#endif
@import Core;
@import Foundation;
@import ObjectiveC;
@import PaymentAdapter;
#endif

#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"
#if __has_warning("-Wpragma-clang-attribute")
# pragma clang diagnostic ignored "-Wpragma-clang-attribute"
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"
#pragma clang diagnostic ignored "-Wnullability"

#if __has_attribute(external_source_symbol)
# pragma push_macro("any")
# undef any
# pragma clang attribute push(__attribute__((external_source_symbol(language="Swift", defined_in="CoreAdapter",generated_declaration))), apply_to=any(function,enum,objc_interface,objc_category,objc_protocol))
# pragma pop_macro("any")
#endif

@class NSNumber;
@class NSString;
@class UIColor;
@class AccountSelectionData;
@class PaymentModel;
enum NucleiNotificationHandler : NSInteger;
@class UserLoginMetaData;

SWIFT_CLASS("_TtC11CoreAdapter11CoreAdapter")
@interface CoreAdapter : NSObject
+ (BOOL)isNucleiSignedIn SWIFT_WARN_UNUSED_RESULT;
+ (BOOL)isNucleiDeeplink:(NSString * _Nonnull)string SWIFT_WARN_UNUSED_RESULT;
+ (BOOL)openRechargeAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openCustomerSupportAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openRechargeCustomSupportAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openBusAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openCreditScoreAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openGiftCardAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openBillPaymentsAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openCabsAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openDTHAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openDonationsAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (void)getGridForPartnerAppWithLatitude:(CGFloat)latitude longitude:(CGFloat)longitude;
+ (BOOL)listAllCouponsWithExtraParams:(NSDictionary<NSString *, id> * _Nonnull)extraParams error:(NSError * _Nullable * _Nullable)error;
+ (BOOL)applyCouponsWithExtraParams:(NSDictionary<NSString *, id> * _Nonnull)extraParams error:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openDatacardAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openMyTransactionAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openFlightAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openEventsAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openHotelAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openGoldSubscriptionAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openExploreAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openOrderDetaildeeplinkWithDeeplink:(NSString * _Nonnull)deeplink error:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openOrderDetail:(NSString * _Nonnull)categoryID :(NSString * _Nonnull)orderID error:(NSError * _Nullable * _Nullable)error;
+ (void)updatePreferredLocalization:(enum PreferredLocalization)localization;
/// ////////////////////
+ (void)updateBarTintColor:(UIColor * _Nonnull)color;
+ (void)updateTintColor:(UIColor * _Nonnull)color;
+ (void)updateTitleColor:(UIColor * _Nonnull)color;
+ (void)updateTranslucent:(BOOL)translucent;
+ (void)updateButtonTextColor:(UIColor * _Nonnull)color;
+ (void)updateButtonBackgroundColor:(UIColor * _Nonnull)color;
+ (void)updateLabelTextColor:(UIColor * _Nonnull)color;
+ (void)updateLabelBackgroundColor:(UIColor * _Nonnull)color;
+ (void)updateTextFiledTextColor:(UIColor * _Nonnull)color;
+ (void)dissmissNucleiWithAnimated:(BOOL)animated completion:(void (^ _Nonnull)(void))completion;
+ (void)logoutWithCompletion:(void (^ _Nonnull)(void))completion;
+ (BOOL)finishAccountSelection:(AccountSelectionData * _Nonnull)payload error:(NSError * _Nullable * _Nullable)error;
+ (BOOL)didFinishPayment:(PaymentModel * _Nonnull)partnerPaymentModel status:(enum PaymentStatus)paymentStatus error:(NSError * _Nullable * _Nullable)error;
+ (BOOL)changePaymentMode:(PaymentModel * _Nonnull)partnerPaymentModel paymentMode:(enum PaymentMode)mode error:(NSError * _Nullable * _Nullable)error updatedPartnerPaymentModel:(void (^ _Nonnull)(PaymentModel * _Nullable, NSError * _Nullable))updatedPartnerPaymentModel;
+ (void)updateFCMToken:(NSString * _Nonnull)token;
+ (void)processNotification:(NSDictionary * _Nullable)notification onCompletion:(void (^ _Nonnull)(enum NucleiNotificationHandler, NSString * _Nonnull))onCompletion;
+ (void)validateSeamlessToken:(NSString * _Nonnull)token mobileNumber:(NSString * _Nonnull)mobileNumber countryCode:(NSInteger)countryCode;
+ (void)updateUserLoginMetadata:(UserLoginMetaData * _Nonnull)userLoginMetaData;
+ (BOOL)processDeeplinkWithDeeplink:(NSString * _Nonnull)deeplink error:(NSError * _Nullable * _Nullable)error;
+ (NSString * _Nullable)getProfileTypeFromDeeplinkWithDeeplink:(NSString * _Nonnull)deeplink SWIFT_WARN_UNUSED_RESULT;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end

@protocol PartnerConfig;
@protocol SeamlessProtocol;
@protocol PartnerGridProtocol;
@protocol OTPProtocol;
@protocol NucleiDismissProtocol;
@protocol PartnerPaymentProtocol;
@protocol NoDeeplinkFoundProtocol;
@protocol openOrderDetailsProtocol;

SWIFT_CLASS("_TtC11CoreAdapter17CoreAdapterConfig")
@interface CoreAdapterConfig : NSObject
+ (void)configSetupWith:(id <PartnerConfig> _Nonnull)config;
+ (void)seamlessLoginSetupWith:(id <SeamlessProtocol> _Nonnull)config;
+ (void)partnerGridSetupWith:(id <PartnerGridProtocol> _Nonnull)config;
+ (void)otpLoginSetupWith:(id <OTPProtocol> _Nonnull)config;
+ (void)nucleiDismissSetupWith:(id <NucleiDismissProtocol> _Nonnull)config;
+ (void)partnerPaymentSetupWith:(id <PartnerPaymentProtocol> _Nonnull)config;
+ (void)DeeplinkNotFoundWith:(id <NoDeeplinkFoundProtocol> _Nonnull)config;
+ (void)openOrderDetailsWith:(id <openOrderDetailsProtocol> _Nonnull)config;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end


SWIFT_PROTOCOL("_TtP11CoreAdapter23NoDeeplinkFoundProtocol_")
@protocol NoDeeplinkFoundProtocol
- (void)NoDeeplinkFoundWithDeeplink:(NSString * _Nonnull)deeplink;
@end


SWIFT_PROTOCOL("_TtP11CoreAdapter21NucleiDismissProtocol_")
@protocol NucleiDismissProtocol
- (void)nucleiDidDismiss;
@end

typedef SWIFT_ENUM(NSInteger, NucleiNotificationHandler, closed) {
  NucleiNotificationHandlerNonNucleiPayload = 0,
  NucleiNotificationHandlerPartnerAppNotLoggedIn = 1,
};

@class NSError;

SWIFT_PROTOCOL("_TtP11CoreAdapter11OTPProtocol_")
@protocol OTPProtocol
- (void)otpLoginDidSucceed;
- (void)otpLoginDidFail:(NSError * _Nonnull)error;
@end


SWIFT_PROTOCOL("_TtP11CoreAdapter13PartnerConfig_")
@protocol PartnerConfig
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, copy) NSString * _Nonnull partnerId;)
+ (NSString * _Nonnull)partnerId SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull barTintColor;)
+ (UIColor * _Nonnull)barTintColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull tintColor;)
+ (UIColor * _Nonnull)tintColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull titleColor;)
+ (UIColor * _Nonnull)titleColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) BOOL translucent;)
+ (BOOL)translucent SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull buttonTextColor;)
+ (UIColor * _Nonnull)buttonTextColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull buttonBackgroundColor;)
+ (UIColor * _Nonnull)buttonBackgroundColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull labelTextColor;)
+ (UIColor * _Nonnull)labelTextColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull labelBackgroundColor;)
+ (UIColor * _Nonnull)labelBackgroundColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull textFiledTextColor;)
+ (UIColor * _Nonnull)textFiledTextColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) enum PreferredLocalization preferredLocalization;)
+ (enum PreferredLocalization)preferredLocalization SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, copy) NSString * _Nonnull deeplinkScheme;)
+ (NSString * _Nonnull)deeplinkScheme SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, copy) NSArray<NSString *> * _Nonnull menuOptions;)
+ (NSArray<NSString *> * _Nonnull)menuOptions SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, copy) NSString * _Nonnull deviceuuid;)
+ (NSString * _Nonnull)deviceuuid SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) BOOL enableDebug;)
+ (BOOL)enableDebug SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) enum PresentationStyle modalPresentationStyle;)
+ (enum PresentationStyle)modalPresentationStyle SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull primaryColor;)
+ (UIColor * _Nonnull)primaryColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull infoIconColor;)
+ (UIColor * _Nonnull)infoIconColor SWIFT_WARN_UNUSED_RESULT;
@optional
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) BOOL isNeumorphicDesign;)
+ (BOOL)isNeumorphicDesign SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) BOOL isFlatDesign;)
+ (BOOL)isFlatDesign SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) enum NetworkEnvironment environment;)
+ (enum NetworkEnvironment)environment SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, copy) NSString * _Nonnull customEnvironment;)
+ (NSString * _Nonnull)customEnvironment SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull searchCardBackgroundColor;)
+ (UIColor * _Nonnull)searchCardBackgroundColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull unSelectedTabTextColor;)
+ (UIColor * _Nonnull)unSelectedTabTextColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull tabIndicatorColor;)
+ (UIColor * _Nonnull)tabIndicatorColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull statusBarColor;)
+ (UIColor * _Nonnull)statusBarColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, copy) NSString * _Nonnull googleMapKey;)
+ (NSString * _Nonnull)googleMapKey SWIFT_WARN_UNUSED_RESULT;
@required
- (BOOL)isPartnerAppLoggedIn SWIFT_WARN_UNUSED_RESULT;
- (void)nucleiHeartBeat;
- (void)menuOptionTapped:(NSInteger)index :(NSString * _Nonnull)title;
@end


SWIFT_CLASS("_TtC11CoreAdapter15PartnerGridItem")
@interface PartnerGridItem : NSObject
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_DEPRECATED_MSG("-init is unavailable");
@end


SWIFT_PROTOCOL("_TtP11CoreAdapter19PartnerGridProtocol_")
@protocol PartnerGridProtocol
- (void)gridDataFetchSucceeded:(NSArray<PartnerGridItem *> * _Nonnull)data;
- (void)gridDataFetchFailed:(NSError * _Nonnull)error;
@end

@class UIViewController;

SWIFT_PROTOCOL("_TtP11CoreAdapter22PartnerPaymentProtocol_")
@protocol PartnerPaymentProtocol
- (void)partnerPaymentInitiatedForPaymentModes:(NSArray<PaymentModel *> * _Nonnull)paymentModes categoryInfo:(NSDictionary<NSString *, id> * _Nonnull)categoryInfo controller:(UIViewController * _Nonnull)controller;
@end


SWIFT_PROTOCOL("_TtP11CoreAdapter16SeamlessProtocol_")
@protocol SeamlessProtocol
- (void)seamlessLoginDidSucceed;
- (void)seamlessLoginDidFail:(NSError * _Nonnull)error;
- (void)onNucleiSeamlessLoginRequest;
@end


SWIFT_PROTOCOL("_TtP11CoreAdapter24openOrderDetailsProtocol_")
@protocol openOrderDetailsProtocol
- (void)openOrderDetailsWithCategoryId:(NSString * _Nonnull)categoryId orderId:(NSString * _Nonnull)orderId;
@end

#if __has_attribute(external_source_symbol)
# pragma clang attribute pop
#endif
#pragma clang diagnostic pop
#endif

#elif defined(__ARM_ARCH_7A__) && __ARM_ARCH_7A__
// Generated by Apple Swift version 5.5.2 effective-4.1.50 (swiftlang-1300.0.47.5 clang-1300.0.29.30)
#ifndef COREADAPTER_SWIFT_H
#define COREADAPTER_SWIFT_H
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgcc-compat"

#if !defined(__has_include)
# define __has_include(x) 0
#endif
#if !defined(__has_attribute)
# define __has_attribute(x) 0
#endif
#if !defined(__has_feature)
# define __has_feature(x) 0
#endif
#if !defined(__has_warning)
# define __has_warning(x) 0
#endif

#if __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wauto-import"
#include <Foundation/Foundation.h>
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus)
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...)
# endif
#endif

#if __has_attribute(objc_runtime_name)
# define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
#else
# define SWIFT_RUNTIME_NAME(X)
#endif
#if __has_attribute(swift_name)
# define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
#else
# define SWIFT_COMPILE_NAME(X)
#endif
#if __has_attribute(objc_method_family)
# define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
#else
# define SWIFT_METHOD_FAMILY(X)
#endif
#if __has_attribute(noescape)
# define SWIFT_NOESCAPE __attribute__((noescape))
#else
# define SWIFT_NOESCAPE
#endif
#if __has_attribute(ns_consumed)
# define SWIFT_RELEASES_ARGUMENT __attribute__((ns_consumed))
#else
# define SWIFT_RELEASES_ARGUMENT
#endif
#if __has_attribute(warn_unused_result)
# define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
#else
# define SWIFT_WARN_UNUSED_RESULT
#endif
#if __has_attribute(noreturn)
# define SWIFT_NORETURN __attribute__((noreturn))
#else
# define SWIFT_NORETURN
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA
#endif
#if !defined(SWIFT_CLASS)
# if __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif
#if !defined(SWIFT_RESILIENT_CLASS)
# if __has_attribute(objc_class_stub)
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME) __attribute__((objc_class_stub))
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_class_stub)) SWIFT_CLASS_NAMED(SWIFT_NAME)
# else
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME)
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) SWIFT_CLASS_NAMED(SWIFT_NAME)
# endif
#endif

#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif

#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif

#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER
# endif
#endif
#if !defined(SWIFT_ENUM_ATTR)
# if defined(__has_attribute) && __has_attribute(enum_extensibility)
#  define SWIFT_ENUM_ATTR(_extensibility) __attribute__((enum_extensibility(_extensibility)))
# else
#  define SWIFT_ENUM_ATTR(_extensibility)
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name, _extensibility) enum _name : _type _name; enum SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# if __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) SWIFT_ENUM(_type, _name, _extensibility)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_WEAK_IMPORT)
# define SWIFT_WEAK_IMPORT __attribute__((weak_import))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if __has_feature(attribute_diagnose_if_objc)
# define SWIFT_DEPRECATED_OBJC(Msg) __attribute__((diagnose_if(1, Msg, "warning")))
#else
# define SWIFT_DEPRECATED_OBJC(Msg) SWIFT_DEPRECATED_MSG(Msg)
#endif
#if !defined(IBSegueAction)
# define IBSegueAction
#endif
#if __has_feature(modules)
#if __has_warning("-Watimport-in-framework-header")
#pragma clang diagnostic ignored "-Watimport-in-framework-header"
#endif
@import Core;
@import Foundation;
@import ObjectiveC;
@import PaymentAdapter;
#endif

#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"
#if __has_warning("-Wpragma-clang-attribute")
# pragma clang diagnostic ignored "-Wpragma-clang-attribute"
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"
#pragma clang diagnostic ignored "-Wnullability"

#if __has_attribute(external_source_symbol)
# pragma push_macro("any")
# undef any
# pragma clang attribute push(__attribute__((external_source_symbol(language="Swift", defined_in="CoreAdapter",generated_declaration))), apply_to=any(function,enum,objc_interface,objc_category,objc_protocol))
# pragma pop_macro("any")
#endif

@class NSNumber;
@class NSString;
@class UIColor;
@class AccountSelectionData;
@class PaymentModel;
enum NucleiNotificationHandler : NSInteger;
@class UserLoginMetaData;

SWIFT_CLASS("_TtC11CoreAdapter11CoreAdapter")
@interface CoreAdapter : NSObject
+ (BOOL)isNucleiSignedIn SWIFT_WARN_UNUSED_RESULT;
+ (BOOL)isNucleiDeeplink:(NSString * _Nonnull)string SWIFT_WARN_UNUSED_RESULT;
+ (BOOL)openRechargeAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openCustomerSupportAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openRechargeCustomSupportAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openBusAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openCreditScoreAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openGiftCardAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openBillPaymentsAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openCabsAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openDTHAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openDonationsAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (void)getGridForPartnerAppWithLatitude:(CGFloat)latitude longitude:(CGFloat)longitude;
+ (BOOL)listAllCouponsWithExtraParams:(NSDictionary<NSString *, id> * _Nonnull)extraParams error:(NSError * _Nullable * _Nullable)error;
+ (BOOL)applyCouponsWithExtraParams:(NSDictionary<NSString *, id> * _Nonnull)extraParams error:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openDatacardAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openMyTransactionAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openFlightAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openEventsAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openHotelAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openGoldSubscriptionAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openExploreAndReturnError:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openOrderDetaildeeplinkWithDeeplink:(NSString * _Nonnull)deeplink error:(NSError * _Nullable * _Nullable)error;
+ (BOOL)openOrderDetail:(NSString * _Nonnull)categoryID :(NSString * _Nonnull)orderID error:(NSError * _Nullable * _Nullable)error;
+ (void)updatePreferredLocalization:(enum PreferredLocalization)localization;
/// ////////////////////
+ (void)updateBarTintColor:(UIColor * _Nonnull)color;
+ (void)updateTintColor:(UIColor * _Nonnull)color;
+ (void)updateTitleColor:(UIColor * _Nonnull)color;
+ (void)updateTranslucent:(BOOL)translucent;
+ (void)updateButtonTextColor:(UIColor * _Nonnull)color;
+ (void)updateButtonBackgroundColor:(UIColor * _Nonnull)color;
+ (void)updateLabelTextColor:(UIColor * _Nonnull)color;
+ (void)updateLabelBackgroundColor:(UIColor * _Nonnull)color;
+ (void)updateTextFiledTextColor:(UIColor * _Nonnull)color;
+ (void)dissmissNucleiWithAnimated:(BOOL)animated completion:(void (^ _Nonnull)(void))completion;
+ (void)logoutWithCompletion:(void (^ _Nonnull)(void))completion;
+ (BOOL)finishAccountSelection:(AccountSelectionData * _Nonnull)payload error:(NSError * _Nullable * _Nullable)error;
+ (BOOL)didFinishPayment:(PaymentModel * _Nonnull)partnerPaymentModel status:(enum PaymentStatus)paymentStatus error:(NSError * _Nullable * _Nullable)error;
+ (BOOL)changePaymentMode:(PaymentModel * _Nonnull)partnerPaymentModel paymentMode:(enum PaymentMode)mode error:(NSError * _Nullable * _Nullable)error updatedPartnerPaymentModel:(void (^ _Nonnull)(PaymentModel * _Nullable, NSError * _Nullable))updatedPartnerPaymentModel;
+ (void)updateFCMToken:(NSString * _Nonnull)token;
+ (void)processNotification:(NSDictionary * _Nullable)notification onCompletion:(void (^ _Nonnull)(enum NucleiNotificationHandler, NSString * _Nonnull))onCompletion;
+ (void)validateSeamlessToken:(NSString * _Nonnull)token mobileNumber:(NSString * _Nonnull)mobileNumber countryCode:(NSInteger)countryCode;
+ (void)updateUserLoginMetadata:(UserLoginMetaData * _Nonnull)userLoginMetaData;
+ (BOOL)processDeeplinkWithDeeplink:(NSString * _Nonnull)deeplink error:(NSError * _Nullable * _Nullable)error;
+ (NSString * _Nullable)getProfileTypeFromDeeplinkWithDeeplink:(NSString * _Nonnull)deeplink SWIFT_WARN_UNUSED_RESULT;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end

@protocol PartnerConfig;
@protocol SeamlessProtocol;
@protocol PartnerGridProtocol;
@protocol OTPProtocol;
@protocol NucleiDismissProtocol;
@protocol PartnerPaymentProtocol;
@protocol NoDeeplinkFoundProtocol;
@protocol openOrderDetailsProtocol;

SWIFT_CLASS("_TtC11CoreAdapter17CoreAdapterConfig")
@interface CoreAdapterConfig : NSObject
+ (void)configSetupWith:(id <PartnerConfig> _Nonnull)config;
+ (void)seamlessLoginSetupWith:(id <SeamlessProtocol> _Nonnull)config;
+ (void)partnerGridSetupWith:(id <PartnerGridProtocol> _Nonnull)config;
+ (void)otpLoginSetupWith:(id <OTPProtocol> _Nonnull)config;
+ (void)nucleiDismissSetupWith:(id <NucleiDismissProtocol> _Nonnull)config;
+ (void)partnerPaymentSetupWith:(id <PartnerPaymentProtocol> _Nonnull)config;
+ (void)DeeplinkNotFoundWith:(id <NoDeeplinkFoundProtocol> _Nonnull)config;
+ (void)openOrderDetailsWith:(id <openOrderDetailsProtocol> _Nonnull)config;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end


SWIFT_PROTOCOL("_TtP11CoreAdapter23NoDeeplinkFoundProtocol_")
@protocol NoDeeplinkFoundProtocol
- (void)NoDeeplinkFoundWithDeeplink:(NSString * _Nonnull)deeplink;
@end


SWIFT_PROTOCOL("_TtP11CoreAdapter21NucleiDismissProtocol_")
@protocol NucleiDismissProtocol
- (void)nucleiDidDismiss;
@end

typedef SWIFT_ENUM(NSInteger, NucleiNotificationHandler, closed) {
  NucleiNotificationHandlerNonNucleiPayload = 0,
  NucleiNotificationHandlerPartnerAppNotLoggedIn = 1,
};

@class NSError;

SWIFT_PROTOCOL("_TtP11CoreAdapter11OTPProtocol_")
@protocol OTPProtocol
- (void)otpLoginDidSucceed;
- (void)otpLoginDidFail:(NSError * _Nonnull)error;
@end


SWIFT_PROTOCOL("_TtP11CoreAdapter13PartnerConfig_")
@protocol PartnerConfig
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, copy) NSString * _Nonnull partnerId;)
+ (NSString * _Nonnull)partnerId SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull barTintColor;)
+ (UIColor * _Nonnull)barTintColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull tintColor;)
+ (UIColor * _Nonnull)tintColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull titleColor;)
+ (UIColor * _Nonnull)titleColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) BOOL translucent;)
+ (BOOL)translucent SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull buttonTextColor;)
+ (UIColor * _Nonnull)buttonTextColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull buttonBackgroundColor;)
+ (UIColor * _Nonnull)buttonBackgroundColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull labelTextColor;)
+ (UIColor * _Nonnull)labelTextColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull labelBackgroundColor;)
+ (UIColor * _Nonnull)labelBackgroundColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull textFiledTextColor;)
+ (UIColor * _Nonnull)textFiledTextColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) enum PreferredLocalization preferredLocalization;)
+ (enum PreferredLocalization)preferredLocalization SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, copy) NSString * _Nonnull deeplinkScheme;)
+ (NSString * _Nonnull)deeplinkScheme SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, copy) NSArray<NSString *> * _Nonnull menuOptions;)
+ (NSArray<NSString *> * _Nonnull)menuOptions SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, copy) NSString * _Nonnull deviceuuid;)
+ (NSString * _Nonnull)deviceuuid SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) BOOL enableDebug;)
+ (BOOL)enableDebug SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) enum PresentationStyle modalPresentationStyle;)
+ (enum PresentationStyle)modalPresentationStyle SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull primaryColor;)
+ (UIColor * _Nonnull)primaryColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull infoIconColor;)
+ (UIColor * _Nonnull)infoIconColor SWIFT_WARN_UNUSED_RESULT;
@optional
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) BOOL isNeumorphicDesign;)
+ (BOOL)isNeumorphicDesign SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) BOOL isFlatDesign;)
+ (BOOL)isFlatDesign SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly) enum NetworkEnvironment environment;)
+ (enum NetworkEnvironment)environment SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, copy) NSString * _Nonnull customEnvironment;)
+ (NSString * _Nonnull)customEnvironment SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull searchCardBackgroundColor;)
+ (UIColor * _Nonnull)searchCardBackgroundColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull unSelectedTabTextColor;)
+ (UIColor * _Nonnull)unSelectedTabTextColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull tabIndicatorColor;)
+ (UIColor * _Nonnull)tabIndicatorColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) UIColor * _Nonnull statusBarColor;)
+ (UIColor * _Nonnull)statusBarColor SWIFT_WARN_UNUSED_RESULT;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, copy) NSString * _Nonnull googleMapKey;)
+ (NSString * _Nonnull)googleMapKey SWIFT_WARN_UNUSED_RESULT;
@required
- (BOOL)isPartnerAppLoggedIn SWIFT_WARN_UNUSED_RESULT;
- (void)nucleiHeartBeat;
- (void)menuOptionTapped:(NSInteger)index :(NSString * _Nonnull)title;
@end


SWIFT_CLASS("_TtC11CoreAdapter15PartnerGridItem")
@interface PartnerGridItem : NSObject
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_DEPRECATED_MSG("-init is unavailable");
@end


SWIFT_PROTOCOL("_TtP11CoreAdapter19PartnerGridProtocol_")
@protocol PartnerGridProtocol
- (void)gridDataFetchSucceeded:(NSArray<PartnerGridItem *> * _Nonnull)data;
- (void)gridDataFetchFailed:(NSError * _Nonnull)error;
@end

@class UIViewController;

SWIFT_PROTOCOL("_TtP11CoreAdapter22PartnerPaymentProtocol_")
@protocol PartnerPaymentProtocol
- (void)partnerPaymentInitiatedForPaymentModes:(NSArray<PaymentModel *> * _Nonnull)paymentModes categoryInfo:(NSDictionary<NSString *, id> * _Nonnull)categoryInfo controller:(UIViewController * _Nonnull)controller;
@end


SWIFT_PROTOCOL("_TtP11CoreAdapter16SeamlessProtocol_")
@protocol SeamlessProtocol
- (void)seamlessLoginDidSucceed;
- (void)seamlessLoginDidFail:(NSError * _Nonnull)error;
- (void)onNucleiSeamlessLoginRequest;
@end


SWIFT_PROTOCOL("_TtP11CoreAdapter24openOrderDetailsProtocol_")
@protocol openOrderDetailsProtocol
- (void)openOrderDetailsWithCategoryId:(NSString * _Nonnull)categoryId orderId:(NSString * _Nonnull)orderId;
@end

#if __has_attribute(external_source_symbol)
# pragma clang attribute pop
#endif
#pragma clang diagnostic pop
#endif

#endif