[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# JavaScript Logic

## Give Homey the possibility to use JavaScript logic through flow cards

### Actions
- **Get formatted date** - *Adds the formatted date to the global tag 'Formatted date'*

### Conditions:
- Check if specified value is equal to one of the values in an array
- Check if specified value contains one of the values in an array
- Check if specified value is empty
- Check if specified value length is less than specified number
- Check if specified date is before date
- Check if specified time is before time
- Check if specified date/time is before date/time
- Random (true|false)
- Date number is (between|not between)
- Month is (between|not between)

## Case sesitivty

In the following conditions you can choose to use case sensitity or not:
- **Value contains one of...**
- **Is value exactly one of...**

    ### Case sensitive
    Value and array will be treated as is

    ### Not case sensitive
    Value and array will both be lower cased

## Changelog


- 0.3.0
    - Dependency updates
    - Updated to SDKv3. App now requires Homey firmware >= 5.0.0. Those with Homey firmware < 5.0.0 will still have v0.2.0 (unless user uninstalls 0.2.0, then 0.3.0 is they're only option)
- 0.2.0
    - Dependency updates
    - Text updated in conditions
    - New conditions: 'Date number is (between|not between)' and 'Month is (between|not between)' . [`Added because there's a bug in Homeys version of 'Date number is (between|not between)'`](https://github.com/athombv/homey-apps-sdk-issues/issues/160)
    - Added `titleFormatted` to conditions for better readability
    - Added `titleFormatted` to action for better readability
- 0.1.2
    - Enhancement: Sentry property update
- 0.1.1
    - Added sentry
- 0.1.0
    - Added condition 'Random (true|false)'
    - Added global tag 'Formatted date' to hold the date formatted from action 'Get formatted date'
    - Added action 'Get formatted date' where yoy can choose day by number and what format to get in. This will set the result in the global tag 'Formatted date'
- 0.0.5
    - Cleanup
    - Bugfix: Norwegian title on trigger 'Is value length less than' fixed to correct wording
- 0.0.4
    - Dutch translation. Thanks to [@liams239](https://github.com/liams239) -> [Issue #5](https://github.com/runely/jslogic-homey/issues/5)
    - Norwegian translation
- 0.0.3
    - Added condition 'Is Date before Date' to check if a Date occurs before another Date
    - Added condition 'Is Time before Time' to check if one Time occurs before another Time
    - Added condition 'Is DateTime before DateTime' to check if a DateTime occurs before another DateTime
- 0.0.2
    - Added 'Is value length less than' condition
- 0.0.1
    - Initial version

# Thanks

- Translators
    - [@liams239](https://github.com/liams239) : Dutch
