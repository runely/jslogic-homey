Give Homey the possibility to use JavaScript logic through flow cards

Actions:
- Get formatted date :: Adds the formatted date to the global tag 'Formatted date'

Conditions:
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
- Check if weekday is equal to one of the given weekdays

Triggers
- Date and month becomes :: Triggers when the current date changes to the chosen date and month (00:00)

Case sensitivity

In the following conditions you can choose to use case sensitivity or not:
- 'Value contains one of...'
- 'Is value exactly one of...'

    When case sensitive
        Value and array will be treated as is

    When not case sensitive
        Value and array will both be lowercased
