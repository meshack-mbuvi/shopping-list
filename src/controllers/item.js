import {Item, User} from '../models/index';

export class ItemsController {
  static async createItem (req, res) {
    const {user: {id}, body: {name, quantity}} = req;
    var today = new Date ();
    var tomorrow = new Date ();
    tomorrow.setDate (today.getDate () + 1);
    const item = await Item.create ({
      name,
      quantity,
      deadline: tomorrow,
      user: id,
    });

    const currentUser = await User.findOne ({_id: id});
    currentUser.shoppingItems.push (item);
    await currentUser.save ();

    return res.status (201).send ({item});
  }

  static async getItems (req, res) {
    const {user: {id}} = req;
    const items = await Item.aggregate ([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'item',
        },
      },
      {
        $unwind: '$item',
      },
      {
        $group: {
          _id: {
            date: {$dateToString: {format: '%Y-%m-%d', date: '$createdAt'}},
            name: '$name',
          },
          count: {$sum: 1},
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id.date',
          name: '$_id.name',
          count: 1,
        },
      },
    ]);
    return res.send ({items});
  }
}
