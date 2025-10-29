import Homey from 'homey';
import type { Moment } from 'moment-timezone';
import formatMoment from './lib/format-moment';
import getNextTimeout from './lib/get-next-timeout-ms';
import moment from './lib/moment-datetime';
import ExtendedHomeyApp from './types/ExtendedHomeyApp';
import type { HomeyManifest } from './types/HomeyManifest';
import type { ActionCard, ConditionCard, Timeouts, TriggerCard } from './types/types';

const timeouts: Timeouts = {
  dateMonthBecomes: null
};

class JSLogic extends ExtendedHomeyApp {
  async onInit(): Promise<void> {
    const manifest = Homey.manifest as HomeyManifest;
    this.log(`${manifest.name.en} v${manifest.version} is running on ${this.homey.version}...`);

    const {
      flow: { actions, conditions, triggers }
    } = manifest;

    // create flow tokens
    await this.homey.flow.createToken('formatted_date', {
      type: 'string',
      title: this.homey.__('flowTokens.formatted_date'),
      value: null
    });
    await this.homey.flow.createToken('formatted_datetime', {
      type: 'string',
      title: this.homey.__('flowTokens.formatted_datetime'),
      value: null
    });

    // timezone
    const timezone = this.homey.clock.getTimezone();

    // register action runListeners
    actions.forEach(({ id }) => {
      this.log('Adding runListener for action', id);
      this.homey.flow.getActionCard(id).registerRunListener(async (args, _) => {
        const { default: action } = (await import(`./handlers/actions/${id}`)) as { default: ActionCard };
        return await action({
          timezone,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          args, // Disabled because Homey.FlowCard.RunCallback specifies args and state as any
          app: this
        });
      });
    });

    // register condition runListeners
    conditions.forEach(({ id }) => {
      this.log('Adding runListener for condition', id);
      this.homey.flow.getConditionCard(id).registerRunListener(async (args, _) => {
        const { default: condition } = (await import(`./handlers/conditions/${id}`)) as { default: ConditionCard };
        return condition({
          timezone,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          args, // Disabled because Homey.FlowCard.RunCallback specifies args and state as any
          app: this
        });
      });
    });

    // register trigger runListeners
    triggers.forEach(({ id }) => {
      this.log('Adding runListener for trigger', id);
      this.homey.flow.getTriggerCard(id).registerRunListener(async (args, state) => {
        const { default: trigger } = (await import(`./handlers/triggers/${id}`)) as { default: TriggerCard };
        return trigger({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          args, // Disabled because Homey.FlowCard.RunCallback specifies args and state as any
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          state, // Disabled because Homey.FlowCard.RunCallback specifies args and state as any
          app: this
        });
      });
    });

    this.homey.on('unload', () => {
      if (timeouts.dateMonthBecomes === null) {
        return;
      }

      Object.getOwnPropertyNames(timeouts).forEach(timeout => {
        try {
          this.homey.clearTimeout(timeout);
        } catch {}
      });
    });

    // registers a timeout to trigger the "date_month_becomes" card at 00:00 every night
    const dateMonthBecomes = (): void => {
      const now: Moment = moment({ timezone });
      const nextTimeout: number = getNextTimeout(timezone);

      this.log('dateMonthBecomes: Triggering "date_month_becomes" card');
      this.homey.flow
        .getTriggerCard('date_month_becomes')
        .trigger(undefined, { date: now.get('date'), month: now.get('month') })
        .catch(error => this.logError('onInit/dateMonthBecomes: Failed when triggering triggerCard', error));

      try {
        this.homey.clearTimeout(timeouts.dateMonthBecomes);
      } catch {}
      timeouts.dateMonthBecomes = this.homey.setTimeout(dateMonthBecomes, nextTimeout);

      this.log(`dateMonthBecomes: Next timeout ${formatMoment(moment({ timezone }).add(nextTimeout, 'milliseconds'))}`);
    };

    const nextTimeout = getNextTimeout(timezone);
    timeouts.dateMonthBecomes = this.homey.setTimeout(dateMonthBecomes, nextTimeout);

    this.log(
      `onInit/dateMonthBecomes: Next timeout ${formatMoment(moment({ timezone }).add(nextTimeout, 'milliseconds'))}`
    );
  }
}

module.exports = JSLogic;
