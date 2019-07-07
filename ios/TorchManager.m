//
//  TorchManager.m
//  SuttonScan
//
//  Created by Coroma Consulting on 13/7/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "TorchManager.h"

@implementation TorchManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(switchFlash:(BOOL)flashOn)
{
  AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
  if ([device hasTorch]) {
    [device lockForConfiguration:nil];
    if (flashOn) {
      return [device setTorchMode:AVCaptureTorchModeOn];
    }
    return [device setTorchMode:AVCaptureTorchModeOff];
  }
}

@end
