import { response } from 'express';
import bookModel from '../models/bookModel.js';
import {Op} from "sequelize";
import textConstant from '../constants/textConstant.js';
import urlConstants from '../constants/urlConstants.js';

export default class BookController{

    async addBook (req,res, imageName){
        try{
        const data = await bookModel.create({...req.body, image: imageName });
        console.log(data);
        if(data){
            res.json(data);
        }
        else res.json({ 
            success: false,
            message: "Error during adding the book."
        });
    }
    catch(err){
        return res.json({ success: false, message: "Error while querying in database." });
        console.log(err);
    }
}
'//get book by their id'
    async getBookByID(req, res){
        const { id } = req.params;
        if(id){
        const data = await bookModel.findByPk(id);
        if(data){
            res.json(data);
        }
        else res.json([]);
        }
        else res.json({success: false, message: textConstant.BOOK_ID_NOT_PROVIDED});
}
    async updateBook(req, res) {
        const { id } = req.params;
        if(id){
            req.body;
            const data = await bookModel.update(req.body, {
                where: {
                    id,
                },
            });
        if (data[0] === 1){
            res.json({ 
                success: true,
                message: "Updated Book",
            })
        }
        else {
            res.json({ success: false, message:"Could not update book."});
        }
    }
        else res.json({ success: false, message: textConstant.BOOK_ID_NOT_PROVIDED});
    }
    async getBookByID(req, res){
        const { id } = req.params;
        if(id){
        const data = await bookModel.findByPk(id);
        if(data){
            res.json(data);
        }
        else res.json([]);
        }
        else res.json({success: false, message: textConstant.BOOK_ID_NOT_PROVIDEd});
}
    async deleteBook(req, res) {
        const { id } = req.params;
        if(id){
            req.body;
            const data = await bookModel.destroy({
                where: {
                    id,
                },
            });
        if (data){
            res.json({ 
                success: true,
                message: "Deleted Book",
            })
        }
        else res.json({ success: false, message: "Couldnt delete book."});
    }
    else res.json({ success: false, message: "Book ID is not provided."});
}

async searchBook(req, res){
    const { q } = req.query;

    if(q) {
        const data = await bookModel.findAll({
            where: {
                [Op.or]:{
                    name: {
                        [Op.like]: `%${q}%`,
                    },
                    author: {
                        [Op.like]: `%${q}%`,
                    },
                },
            },
            raw: true,
        });
        console.log(data);
        for(let d of data){
            d.image = urlConstants.IMG_PATH_URL + d.image;
            console.log(d.image);
        }
        res.json(data);
    }
    else res.json({ success: false, message: "Empty Query Search String."});
}

async getBooks(req, res){
    let { limit } = req.query;
    if(!limit) limit = 20;
    try{
    const data = await bookModel.findAll({
        limit : parseInt(limit),
        raw: true,
    });
    console.log(data);
    for(let d of data){
        d.image = urlConstants.IMG_PATH_URL + d.image;
        console.log(d.image);
    }

    res.json(data);
}
catch(err){
    res.json({ success: false, message: err});
}
}
}
