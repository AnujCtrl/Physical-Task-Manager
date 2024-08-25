const escpos = require('escpos');
// Use node-usb instead of escpos-usb
escpos.USB = require('escpos-usb');

// Find the USB device
const device = new escpos.USB();
// Create the printer interface
const printer = new escpos.Printer(device);

// Example usage
device.open(function(err){
  printer
    .font('a')
    .align('ct')
    .size(1, 1)
    .text('Hello World')
    .cut()
    .close();
});

