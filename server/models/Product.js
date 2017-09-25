var mongoose = require('mongoose');

var product= mongoose.model('product', {
  name:{
    type: String,
    required:true,
    minlength:1,
    trim:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    default:"Item description not given",
    minlength:1,
    trim:true
  }
});

module.exports={product};
