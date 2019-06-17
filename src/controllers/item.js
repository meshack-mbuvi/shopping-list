import {Item, User} from '../models/index';

export class ItemsController {
  static async createItem (req, res) {
    const {user: {id}, body: {name, quantity}} = req;
    var today = new Date ();
    var tomorrow = new Date ();
    tomorrow.setDate (today.getDate () + 1);
    const item = await Item.create ({name, quantity, deadline: tomorrow});

    const currentUser = await User.findOne ({_id: id});
    currentUser.shoppingItems.push (item);
    await currentUser.save ();

    return res.status (201).send ({item});
  }
}
