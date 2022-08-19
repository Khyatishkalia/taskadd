//jshint esversion:6
require("./db/conn");
const User = require("./models/userSchema");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
var _ = require("lodash");// sos as to make the url params same as the title if in upper or lower

// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/taskdb";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
var posts = [];
// app.get("/", (req, res) => {
//   res.render("home", { Para: homeStartingContent, Blogs:posts });
// //  console.log(posts);
// })

app.get("/", (req, res)=>{
  User.find().then((response)=>{
    res.render("home", { Para: homeStartingContent, Blogs:response });
  })
})
// app.get("/contact", (req, res) => {
//   res.render("contact",{Para:contactContent})
// })
app.get("/compose", (req, res) => {
  res.render("compose");
})


// app.post("/compose/:_id", (req, res) => {
//   let data = req.body.newtask;
//   let text = req.body.taskbody;
//     var input = req.body.date;
//     var dateEntered = new Date(input);
//   let post = {
//     title: data,
//       content: text,
//     date:dateEntered,
//   }
//   let obj = {title: req.params.title}
//   User.find(obj);
//   console.log(obj);
// })
app.post("/update/:_id", ((req, res) => {
  let id = req.params._id;
  let data = req.body.newtask;
  let text = req.body.taskbody;
  let date = req.body.date;
  let post = {
    title: data,
    content: text,
    date:date,
  }
  posts.push(post);//storing this object in an array
  User.findByIdAndUpdate(id, {$set:post}, {new:true}).then((response)=>{
    res.redirect('/')
  }
  )

}))
app.post("/compose", (req, res) => {
  let data = req.body.newtask;
  let text = req.body.taskbody;
    var input = req.body.date;
    var dateEntered = new Date(input);
  let post = {
    title: data,
      content: text,
    date:dateEntered,
  }
  console.log(post);
  posts.push(post);//storing this object in an array
  const {title,content,date}= post;

const newUser = new User({
      title: title,
      content: content,
      date: date
});
newUser.save().then((response)=>{
  res.redirect('/')
}
)

})

// app.get("/posts/:_id", (req, res)=>{
// var requestedPost =_.lowerCase(req.params.topic);
// array traverse kr rhee h
  // posts.forEach(function (post) {
  //   var id = post._id;
  //   var storedPost = _.lowerCase(post.title);
  //     var StoreContent = post.content;
  //     var date = post.date;
    //lodash neglect the case in which url is wriiten
    // if (storedPost == requestedPost) {
    //   console.log("Match Found");
      //console.log(post._id);
  //     res.render("post",({TitleName:storedPost,ContentText : StoreContent,Date:date}));
  // }
  // })
  
// })

app.get("/posts/:_id", (req, res)=>{
  User.findById(req.params._id).then((response)=>{
    res.render("post", {blog:response})
  }
  )
})

app.get("/editposts/:_id", (req, res) => {
  User.findById(req.params._id).then((response) => {
   
    res.render("update", { blog: response });
  })
})
//     let result = User.findOne(req.param._id);
//      if (!result) {
//     res.status(404).send("data not found");
//   }
//   else {
//     result.title = req.body.newtask;
//     result.content = req.body.taskbody;
//     result.input = req.body.date;
//     result.updateOne();
//   }
//   }
//   )
 
  
// })
app.listen(3000, function() {
  console.log("Server started on port 3000");
});


