'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(User) {
      // define association here
      //userId
      // this.belongsTo(user, { foreignKey: 'userId' })
    }
    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined }
    }

  }
  Post.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      unique:true,
      allowNull:false
    },
    userId: DataTypes.STRING,
    body: DataTypes.STRING,
    allowNull: false
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};