# JavaScript Logic

## Give Homey the possibility to use JavaScript logic through flow cards

### Conditions:
- Check if specified value is equal to one of the values in an array
- Check if specified value contains one of the values in an array
- Check if specified value is empty
- Check if specified value length is less than specified number
- Check if specified date is before date
- Check if specified time is before time
- Check if specified date/time is before date/time
- Random (true|false)

## Case sesitivty

In the following triggers you can choose to use case sensitity or not:
- **Value contains one of...**
- **Is value exactly one of...**

    ### Case sensitive
    Value and array will be treated as is

    ### Not case sensitive
    Value and array will both be lower cased

## Changelog

- 0.0.6
    - Added condition 'Random (true|false)'
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