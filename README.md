![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)

# JavaScript Logic

## Give Homey the possibility to use JavaScript logic through flow cards

### Actions
- **Get formatted date** - *Adds the formatted date to the global tag 'Formatted date'* (`DEPRECATED`)
- **Get formatted date and time** - *Adds the formatted date and time to the global tag 'Formatted date and time'*

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
- Date number and Month is (between|not between)
- Check if weekday is equal to one of the given weekdays
- Number(value1) is (between|not between) value2 and value3

### Triggers
- **Date and month becomes** - *Triggers when the current date changes to the chosen date and month (00:00)*

## Case sensitivity

In the following conditions you can choose to use case sensitivity or not:
- **Value contains one of...**
- **Is value exactly one of...**

    ### Case-sensitive
    Value and array will be treated as is

    ### Not case-sensitive
    Value and array will both be lowercased

## Changelog

- 2.1.0
  - JavaScript Logic is limited to only run on Homey Firmware >= 12.9.0, because this has Node.js 22 as runtime
  - Switched from eslint to biome for development formatting and linting
  - Dependency updates
- 2.0.0
  - Migrated to TypeScript
- 1.6.2
  - Dependency updates
- 1.6.1
  - Dependency updates
- 1.6.0
  - Lint fixes
  - Dependency updates
- 1.5.7
  - Dependency updates
- 1.5.6
  - Dependency updates
  - Clean up
- 1.5.5
    - Dependency updates
- 1.5.4
    - Dependency updates
- 1.5.3
    - Dependency updates
    - Bugfix: Sunday was read wrong and has never worked in the condition card `Is "weekday" one of...`
- 1.5.2
    - Dependency updates
- 1.5.1
    - Dependency updates
- 1.5.0
    - Deprecated flow card `Get formatted date`
    - Created a new better all round flow card for formatting date and time: `Get formatted date and time`
    - Dependency updates
- 1.4.5
    - Minimized footprint
- 1.4.4
    - Dependency updates
- 1.4.3
    - Dependency updates
- 1.4.2
    - Dependency updates
- 1.4.1
    - Fixed some typos
- 1.4.0
    - New condition `Number (is|is not) between`
    - Removed sentry cause it weren't used
- 1.3.3
    - Dependency updates
- 1.3.2
    - Dependency updates
- 1.3.1
    - Dependency updates
- 1.3.0
    - Chore: No need to return value in `Promise.resolve`
    - Chore: Possible to not always pass `timezone` or `date`
    - New trigger: `Date and month becomes`
        - Added tests
- 1.2.3
    - Dependency updates
- 1.2.2
    - Dependency updates
- 1.2.1
    - Better naming for condition 'Is value exactly (one of|not one of)...'
- 1.2.0
    - New condition: 'Is "weekday" (one of|not one of)...'
- 1.1.1
    - Pulled flow logic out into their own files
    - Bugfixes
    - Added tests all around so new versions is stable with (hopefully) no bugs
- 1.1.0
    - Dependency updates
    - New condition: 'Day and month is (between|not between)'
    - Using timezone to prevent any possible bugs since SDK3 runs on UTC...
    - Bugfix: Convert month numbers to Number to prevent any logic check bugs
- 1.0.0
    - Dependency updates
    - Updated to SDKv3. App now requires Homey firmware >= 5.0.0. Those with Homey firmware < 5.0.0 will still have v0.2.0 (unless user uninstalls 0.2.0, then 1.0.0 is they're only option)
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

## Local development

1. `git clone git@github.com:runely/jslogic-homey.git`
2. `npm i`
3. `npm run homey-run` or `npm run homey-install`

# Thanks

- Translators
    - [@liams239](https://github.com/liams239) : Dutch
