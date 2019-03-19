var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');

const database = require("../database.js");

const func = require('../functions.js');

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './images');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});

var upload = multer({storage:store}).single('file');

router.post('/dish', func.isLoggedIn, function(req,res,next){

    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }

        database.Dish.findOne({
            where: {
                index: database.Dish.decodeID(req.body.id)
            }
        }).then(function(dish) {
            if(dish) {
                console.log('./images/dishes/' + req.body.id + "_" + (dish.images+1) + ".png")
                fs.rename('./images/' + req.file.filename, './images/dishes/' + req.body.id + "_" + (dish.images+1) + ".png", function (err) {
                    if (err) {
                        return console.error(err);
                    }

                    dish.images += 1;
                    dish.save();

                    res.json({});
                });
            }
            else {
                res.json({error: "Dish does not exist."});
            }
        });

        //do all database record saving activity
        //return res.json({originalname: req.file.originalname, uploadname: req.file.filename});
    });
});


router.post('/download', function(req,res,next){
    filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
});

module.exports = router;