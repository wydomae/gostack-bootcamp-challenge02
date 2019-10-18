import { isBefore } from 'date-fns';
import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

class SubscriptionController {
  async index(req, res) {
    const subscription = await Subscription.findAll({
      attributes: ['meetup_id', 'user_id'],
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          attributes: ['id', 'name', 'description', 'location', 'date'],
          where: {
            date: {
              [Op.gte]: new Date(),
            },
          },
          include: [
            {
              model: File,
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscription);
  }

  async store(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findByPk(id, {
      include: [User],
    });
    const user = await User.findByPk(req.userId);

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

    const isSubscribed = await Subscription.findOne({
      where: {
        meetup_id: id,
        user_id: req.userId,
      },
    });

    if (isSubscribed) {
      return res
        .status(400)
        .json({ error: 'You are already subscribed to this meetup' });
    }

    const meetupTime = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: {
        model: Meetup,
        attributes: ['date'],
        where: {
          date: meetup.date,
        },
      },
    });

    if (meetupTime) {
      return res.status(400).json({
        error: 'You already have a meetup scheduled at the same time',
      });
    }

    const newSubscription = await Subscription.create({
      meetup_id: id,
      user_id: req.userId,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(newSubscription);
  }
}

export default new SubscriptionController();
