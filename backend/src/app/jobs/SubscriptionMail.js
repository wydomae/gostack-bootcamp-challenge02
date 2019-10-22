import { format, parseISO } from 'date-fns';
import { en } from 'date-fns/locale/en-US';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: 'A user subscribed to your meetup',
      template: 'subscription',
      context: {
        organizer: meetup.User.name,
        meetup: meetup.name,
        user: user.name,
        date: format(parseISO(meetup.date), "MMMM',' do 'at' h:mm aa", {
          locale: en,
        }),
      },
    });
  }
}

export default new SubscriptionMail();
