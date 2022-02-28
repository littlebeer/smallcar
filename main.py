def 倒退():
    basic.show_leds("""
        . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
    """)
    SuperBit.motor_run_dual(SuperBit.enMotors.M1, -100, SuperBit.enMotors.M3, 100)
def 右转():
    basic.show_leds("""
        . . . . #
                . . . . #
                . . . # #
                . . . . #
                . . . . #
    """)
    SuperBit.motor_run(SuperBit.enMotors.M1, 0)
    SuperBit.motor_run(SuperBit.enMotors.M1, 200)
def 左转():
    basic.show_leds("""
        # . . . .
                # . . . .
                # # . . .
                # . . . .
                # . . . .
    """)
    SuperBit.motor_run(SuperBit.enMotors.M3, 0)
    SuperBit.motor_run(SuperBit.enMotors.M3, -200)

def on_button_pressed_b():
    SuperBit.motor_stop_all()
input.on_button_pressed(Button.B, on_button_pressed_b)

def 停止():
    basic.show_leds("""
        . . . . .
                . . . . .
                # # # # #
                . . . . .
                . . . . .
    """)
    SuperBit.motor_run_dual(SuperBit.enMotors.M1, 0, SuperBit.enMotors.M3, 0)
def 启动():
    basic.show_leds("""
        . . # . .
                . . # . .
                # # # # #
                . . # . .
                . . # . .
    """)
    SuperBit.motor_run_dual(SuperBit.enMotors.M1, 200, SuperBit.enMotors.M3, -200)
serial.redirect_to_usb()
速度 = 0

def on_forever():
    if sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS) < 10:
        倒退()
        右转()
    # 判断速度
    if pins.analog_read_pin(AnalogPin.P3) <= 500:
        启动()
    else:
        停止()
    if pins.analog_read_pin(AnalogPin.P4) > 700 and pins.analog_read_pin(AnalogPin.P4) < 780:
        右转()
    elif pins.analog_read_pin(AnalogPin.P4) < 500:
        左转()
    basic.clear_screen()
    serial.write_value("y", pins.analog_read_pin(AnalogPin.P4))
basic.forever(on_forever)
