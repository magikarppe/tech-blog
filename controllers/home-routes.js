const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts', { posts });
  } catch (err) {
    res.status(500).json(err);

  }

});

// get by id
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });

    console.log(dbPostData);
    const singlePost = dbPostData.get({ plain: true });
    console.log({ singlePost, loggedIn: req.session.loggedIn})
    res.render('blog-post', { ...singlePost, loggedIn: req.session.loggedIn})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//render dashboard handlebars

router.get('/dashboard', (req, res) => {
 
  try{
    res.render('dashboard', {loggedIn: req.session.loggedIn, user_id: req.session.user})
  } catch (err) {
    res.status(500).json(err);
  }
})

//comment posts
router.post('/add-comment', async (req, res) => {
  try {
    console.log(req.body);
    const comment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(comment)
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//render create-post handlebars

router.get('/create-post', async (req, res) => {
  console.log(req.session.user);
  res.render('create-post', {loggedIn: req.session.loggedIn, user_id: req.session.user})
  
})

//render register handlebars

router.get('/register', async (req, res) => {
  res.render('register', {loggedIn: req.session.loggedIn, user_id: req.session.user})
})

// adds new post to the database table Post

router.post('/new-post', async (req, res) => {
  try {
    const post = await Post.create({...req.body,user_id: req.session.user_id,});
    res.status(200).json(post)
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
})

module.exports = router