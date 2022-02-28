function 倒退() {
    basic.showLeds(`
        . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
    `)
    SuperBit.MotorRunDual(SuperBit.enMotors.M1, -100, SuperBit.enMotors.M3, 100)
}

function 右转() {
    basic.showLeds(`
        . . . . #
                . . . . #
                . . . # #
                . . . . #
                . . . . #
    `)
    SuperBit.MotorRun(SuperBit.enMotors.M1, 0)
    SuperBit.MotorRun(SuperBit.enMotors.M1, 200)
}

function 左转() {
    basic.showLeds(`
        # . . . .
                # . . . .
                # # . . .
                # . . . .
                # . . . .
    `)
    SuperBit.MotorRun(SuperBit.enMotors.M3, 0)
    SuperBit.MotorRun(SuperBit.enMotors.M3, -200)
}

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    SuperBit.MotorStopAll()
})
function 停止() {
    basic.showLeds(`
        . . . . .
                . . . . .
                # # # # #
                . . . . .
                . . . . .
    `)
    SuperBit.MotorRunDual(SuperBit.enMotors.M1, 0, SuperBit.enMotors.M3, 0)
}

function 启动() {
    basic.showLeds(`
        . . # . .
                . . # . .
                # # # # #
                . . # . .
                . . # . .
    `)
    SuperBit.MotorRunDual(SuperBit.enMotors.M1, 200, SuperBit.enMotors.M3, -200)
}

serial.redirectToUSB()
let 速度 = 0
basic.forever(function on_forever() {
    if (sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters) < 10) {
        倒退()
        右转()
    }
    
    //  判断速度
    if (pins.analogReadPin(AnalogPin.P3) <= 500) {
        启动()
    } else {
        停止()
    }
    
    if (pins.analogReadPin(AnalogPin.P4) > 700 && pins.analogReadPin(AnalogPin.P4) < 780) {
        右转()
    } else if (pins.analogReadPin(AnalogPin.P4) < 500) {
        左转()
    }
    
    basic.clearScreen()
    serial.writeValue("y", pins.analogReadPin(AnalogPin.P4))
})
