import { isBefore } from 'date-fns';
import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';

class SubscriptionController {
  async store(req, res) {
    const { meetupId } = req.body;

    const meetup = await Meetup.findByPk(meetupId);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup does not exist' });
    }

    if (req.userId === meetup.user_id) {
      return res
        .status(400)
        .json({ error: 'You are the organizer of this meetup' });
    }

    if (isBefore(meetup.date, new Date())) {
      return res
        .status(400)
        .json({ error: 'You cannot subscribe to past meetups' });
    }

    const meetupTime = await Meetup.findOne({
      where: {
        id: {
          [Op.ne]: [meetupId],
        },
        date: meetup.date,
      },
    });

    if (meetupTime) {
      return res.status(400).json({
        error: 'You already have a meetup scheduled at the same time',
      });
    }

    const isSubscribed = await Subscription.findOne({
      where: {
        meetup_id: meetupId,
        user_id: req.userId,
      },
    });

    if (isSubscribed) {
      return res
        .status(400)
        .json({ error: 'You are already subscribed to this meetup' });
    }

    const newSubscription = await Subscription.create({
      meetup_id: meetupId,
      user_id: req.userId,
    });

    return res.json(newSubscription);
  }
}

export default new SubscriptionController();
