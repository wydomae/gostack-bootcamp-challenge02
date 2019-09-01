import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';
import File from '../models/File';

class MeetupController {
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
}

export default new MeetupController();
