let digital = 0
let analog = 0
let analogPin = AnalogPin.P0
let digitalPin = DigitalPin.P1
let lastDigital = pins.digitalReadPin(digitalPin)
let becomesLow = 0
let becomesHigh = 1023
/**
 * Connect the same signal to two pins and vary the signal 
 * 
 * Use "Show data Device" to see how the analogue and digital values are related.
 * 
 * analogue value low => digital value 0
 * 
 * analogue value high => digital value 1
 * 
 * The digital value changes from 0 to 1 at a higher analogue value than that at which it changes from 1 to 0.
 * 
 * So in the middle range of analogue values the digital value might be 0 or 1.
 */
basic.forever(function () {
    analog = pins.analogReadPin(analogPin)
    digital = pins.digitalReadPin(digitalPin)
    if (digital != lastDigital) {
        if (digital == 1) {
            becomesHigh = Math.min(becomesHigh, analog)
        } else {
            becomesLow = Math.max(becomesLow, analog)
        }
    }
    lastDigital = digital
    serial.writeValue("analog", analog)
    serial.writeValue("digital", digital)
    serial.writeLine("becomesLow=" + becomesLow + ", becomesHigh=" + becomesHigh)
})
