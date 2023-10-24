const Product = require('../models/product')

//Filter functionality - finding specific data on basis of Name, Featured, Company
//Method : HardCoded Filter

const getAllProductStatic = async (req,res)=>{
  
    const product = await Product.find({
        // featured : true                  //finding specific data 
    }).sort("name") // sort the "name" on asscending order 
      
    // sort the "name" on descending order and aslo sort "price" on asscending order
    //.sort("-name price")

    res.status(200).json({product, nbHits:product.length})
}

//Filter functionality - finding specific data on basis of Name, Featured, Company
// Method: Dynamic Filter 
//(support the concept of Query String)
const getAllProduct = async (req,res)=>{
    const {featured,company,name, sortData} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured==="true"?true:false
    }
    if(company){
        queryObject.company= company
    }

    if(name){
        queryObject.name={$regex: name , $options:'i'} // case insensitive search
    }
    console.log(queryObject)

    //sorting logic
    let result =  Product.find(queryObject)
    if(sortData){
        const sortList = sortData.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }
    const products = await result

    res.status(200).json({product, nbHits:product.length})
}

//Diff b/t Params & Query String
//Query String : For option data we prefer QueryString like "in filter functionality"
//Params: Necessary data is share by params like "Id" 

module.exports = {
    getAllProductStatic,
    getAllProduct
}