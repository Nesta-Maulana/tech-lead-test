module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      }
    }, {
      tableName: 'books',
      timestamps: true,
      underscored: true
    });
  
    return Book;
  };
  