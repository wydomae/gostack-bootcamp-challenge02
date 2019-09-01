import * as Yup from 'yup';
import { isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const { date } = req.query;
    const { page = 1 } = req.query;

    const searchDate = parseISO(date);

    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      order: ['date'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'name', 'description', 'localization', 'date'],
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
        {
          model: File,
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      localization: Yup.string().required(),
      date: Yup.date().required(),
      image: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { name, description, localization, date } = req.body;

    const formattedDate = parseISO(date);

    if (isBefore(formattedDate, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const image = await File.findByPk(req.body.image);

    if (!image) {
      return res.status(400).json({ error: 'Image does not exist' });
    }

    const meetup = await Meetup.create({
      name,
      description,
      localization,
      date: formattedDate,
      image: image.id,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      localization: Yup.string(),
      date: Yup.date(),
      image: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { date } = req.body;

    const formattedDate = parseISO(date);

    if (isBefore(formattedDate, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const image = await File.findByPk(req.body.image);

    if (!image) {
      return res.status(400).json({ error: 'Image does not exist' });
    }

    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id !== req.userId) {
      return res
        .status(400)
        .json({ error: 'You are not the organizer of this meetup' });
    }

    const { name, description, localization } = await meetup.update(req.body);

    return res.json({
      name,
      description,
      localization,
      date: meetup.date,
      image: image.id,
    });
  }
}

export default new MeetupController();
