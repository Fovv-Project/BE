/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
            nim: {
                primaryKey: true,
                type: 'varchar(15)'
            },
            nama: {
                type: 'varchar(255)',
                notNull: true
            },
            createdAt: {
                type: 'timestamp',
                notNull: false,
                default: pgm.func('current_timestamp')
            },
            updatedAt: {
                type: 'timestamp',
                notNull: false,
            },
            deletedAt: {
                type: 'timestamp',
                notNull: false,
            },
        }),
        pgm.createTable('attendances', {
            idAbsensi: 'id',
            nim: {
                type: 'varchar(15)',
                notNull: true,
                references: '"users"'
            },
            waktuAbsen: {
                type: 'timestamp',
                notNull: true,
            }
        }),
        pgm.addConstraint('attendances', 'nim', {
            foreignKeys: {
                columns: 'nim',
                references: 'users(nim)'
            }
        }),
        pgm.createTable('categories', {
            idKategori: 'id',
            jenisKategori: {
                type: 'varchar(255)',
                unique: true,
                notNull: true,
            },
            createdAt: {
                type: 'timestamp',
                notNull: false,
                default: pgm.func('current_timestamp')
            },
            updatedAt: {
                type: 'timestamp',
                notNull: false,
                default: pgm.func('current_timestamp')
            },
            deletedAt: {
                type: 'timestamp',
                notNull: false
            }
        }),
        pgm.createTable('books', {
            idBuku: {
                primaryKey: true,
                type: 'varchar(15)'
            },
            idKategori: {
                type: 'integer',
                notNull: true,
                references: '"categories"'
            },
            judulBuku: {
                type: 'varchar(255)',
                notNull: true
            },
            pengarang: {
                type: 'varchar(255)',
                notNull: true
            },
            penerbit: {
                type: 'varchar(255)',
                notNull: true
            },
            tahunTerbit: {
                type: 'integer',
                notNull: true
            },
            jumlahHalaman: {
                type: 'integer',
                notNull: true
            },
            deskripsi: {
                type: 'text',
                notNull: true
            },
            createdAt: {
                type: 'timestamp',
                notNull: false,
                default: pgm.func('current_timestamp')
            },
            updatedAt: {
                type: 'timestamp',
                notNull: false
            },
            deletedAt: {
                type: 'timestamp',
                notNull: false
            }
        }),
        pgm.addConstraint('books', 'idKategori', {
            foreignKeys: {
                columns: 'idKategori',
                references: 'categories("idKategori")'
            }
        }),
        pgm.createTable('borrowingHistory', {
            idHistory: 'id',
            nim: {
                type: 'varchar(15)',
                notNull: true,
                references: '"users"'
            },
            idBuku: {
                type: 'varchar(15)',
                notNull: true,
                references: '"books"'
            },
            tglPinjam: {
                type: 'timestamp',
                notNull: true,
                default: pgm.func('current_timestamp')
            },
            tglKembali: {
                type: 'timestamp',
                notNull: true,
                default: pgm.func("current_timestamp + interval '7 day'")
            },
            statusPinjam: {
                type: 'varchar(25)',
                notNull: true
            },
            isApproved: {
                type: 'boolean',
                notNull: true
            },
            createdAt: {
                type: 'timestamp',
                notNull: false,
                default: pgm.func('current_timestamp')
            },
            updatedAt: {
                type: 'timestamp',
                notNull: false,
                default: pgm.func('current_timestamp')
            },
            deletedAt: {
                type: 'timestamp',
                notNull: false
            }
        }),
        pgm.addConstraint('borrowingHistory', 'nim', {
            foreignKeys: {
                columns: 'nim',
                references: 'users(nim)'
            }
        }),
        pgm.addConstraint('borrowingHistory', 'idBuku', {
            foreignKeys: {
                columns: 'idBuku',
                references: 'books("idBuku")'
            }
        })
};

exports.down = pgm => {};