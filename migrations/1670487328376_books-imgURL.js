/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('books', {
        imgURL: { type: 'varchar(255)', notNull: true },
      })
};

exports.down = pgm => {
    pgm.dropColumns('books', ['imgURL'])
};