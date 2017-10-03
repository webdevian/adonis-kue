'user strict';

const Ioc = require('adonis-fold').Ioc;
const Command = Ioc.use('Adonis/Src/Command');

class Listen extends Command {

  constructor (Kue) {
    super();
    this.kue = Kue;
  }

  static get signature () {
    return 'kue:listen';
  }

  static get description () {
    return 'Start the kue listener.';
  }

  * handle (options, flags) {
    this.kue.listen();
  }
}

module.exports = Listen;
