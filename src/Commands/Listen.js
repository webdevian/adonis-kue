'user strict';

const { Command } = require('@adonisjs/ace')
const Kue = use('Adonis/Addons/Kue');

class Listen extends Command {

  constructor (Kue) {
    super();
  }

  static get signature () {
    return 'kue:listen';
  }

  static get description () {
    return 'Start the kue listener.';
  }

  async handle (options, flags) {
    Kue.listen();
  }
}

module.exports = Listen;
