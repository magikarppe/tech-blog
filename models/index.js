const Post = require('./post');
const Comment = require('./comment');
const User = require('./user');



Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});



Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "CASCADE"
})

module.exports = { Post, Comment, User };