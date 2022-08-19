const express = require("express");
const User = require("../models/userSchema");


const showTasks = (req, res) => {
    User.find().then((response)=>{
        res.render("home", { Para: homeStartingContent, Blogs:response });
      })
}
    
const updateTask = (req, res) => {
    let id = req.params._id;
    let data = req.body.newtask;
    let text = req.body.taskbody;
    let date = req.body.date;
    let post = {
        title: data,
        content: text,
        date:date,
    }
    User.findByIdAndUpdate(id, {$set:post}, {new:true}).then((response)=>{
        res.redirect('/')
    }
    )
}

const createTask = (req, res) => {
    let data = req.body.newtask;
    let text = req.body.taskbody;
      var input = req.body.date;
      var dateEntered = new Date(input);
    let post = {
        title: data,
          content: text,
        date:dateEntered,
    }
    User.create(post).then((response)=>{
        res.redirect('/')
    }
    )
}

const showSingleTask = (req, res) => {
    User.findById(req.params._id).then((response)=>{
        res.render("post", {blog:response})
      }
      )
}

module.exports = { showTasks, updateTask, createTask, showSingleTask };