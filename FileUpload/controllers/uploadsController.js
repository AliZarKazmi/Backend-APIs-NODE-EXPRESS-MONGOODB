const path = require('path')
const {StatusCodes} = require("http-status-codes")
const CustomError = require("../errors/index")


const uploadProductImage = async (req,res)=>{
    // console.log(req)
     //it will be empty as file/image data does not come in the req-body
    // console.log(req.body)
     //image data is contained in the req.files
    // console.log(req.files)

    // ***
            // Have some checks on Image imagePath i.e
            // check if file exists 
            // check format
            // check size    
    // ***
    
    // check if file exists 
    if(!req.files){
        throw new CustomError.BadRequestError("No File Uploaded")
    }
    
    
    //get only image details (".image" is the "key" name which contains the value)
    const productImage = req.files.image
    
    // check format
    if(!productImage.minetype.startsWith('image')){
        throw new CustomError.BadRequestError("Please Upload Image")
    }

    // check size   
    const maxSize = 1024 * 1024
    if(productImage.size> maxSize){
        throw new CustomError.BadRequestError("Please Upload Image smaller than 1MB ")
    }
    
    
    //defining the path where I want to store images on the server with their filename
    const imagePath = path.join(
        __dirname,
        "../public/uploads/"+`${productImage.name}`
    )

    //".mv" is a function of "express-fileupload" which store/move the image on the specific path
    await productImage.mv(imagePath)

    return res.status(StatusCodes.OK).json({img:{src:`/upload/${productImage.name}`}})
    // res.send("upload product Image")
}

module.exports = {
    uploadProductImage
}