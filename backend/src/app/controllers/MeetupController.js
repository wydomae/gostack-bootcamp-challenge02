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
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      order: ['date'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'name', 'description', 'location', 'date'],
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
      location: Yup.string().required(),
      date: Yup.date().required(),
      image: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { name, description, location, date } = req.body;

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
      location,
      date: formattedDate,
      image: image.id,
      user_id: req.userId,
    });

    const createdMeetup = await Meetup.findByPk(meetup.id, {
      include: [
        {
          model: File,
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(createdMeetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
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

    await meetup.update(req.body);

    const updatedMeetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: File,
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(updatedMeetup);
  }

  async delete(req, res) {
    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== user_id) {
      return res
        .status(401)
        .json({ error: "You're not authorized to delete this meetup." });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({ error: "You can't delete past meetups." });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
