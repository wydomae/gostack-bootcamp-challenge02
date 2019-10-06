import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Subscription, {
      foreignKey: 'meetup_id',
    });
    this.belongsTo(models.File, { foreignKey: 'image' });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default Meetup;
