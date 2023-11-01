const Product = require('../models/product')

//Filter functionality - finding specific data on basis of Name, Featured, Company
//Method : HardCoded Filter

const getAllProductStatic = async (req,res)=>{
  
    const product = await Product.find({
        // featured : true                  //finding specific data 

        //finding data which price is greater than 30
        price:{$gt:30}
    })
    // sort the "name" on asscending order
    .sort("name") 

    //selecting attributes
    .select("name price")

    //restricting the data size to display i.e 4 out of 10 (Not dynamic)
    .limit(4)

    //skiping data, it will just skip the first 2 collection (Not dynamic)
    .skip(2)
      
    // sort the "name" on descending order and aslo sort "price" on asscending order
    //.sort("-name price") 

    res.status(200).json({product, nbHits:product.length})
}

//Filter and Sorting functionality - finding specific data on basis of Name, Featured, Company
// Method: Dynamic Filter 
//(support the concept of Query String)
const getAllProduct = async (req,res)=>{

    //featured,company,name these are database attributes, we can change 
    //them as we are defining querystrings 
    
    //sortData store db attributes which need to be sorted
    //fieldsData store db attributes which need to selected to display data

    // Note: These names are restricited from client side as we defined them 
    const { featured , company , name , sortData , fieldsData , numericFilters} = req.query
    
    const queryObject = {} //an empty obj
    
    //checking are the query paramerters are given or not 
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

    //numeric filtering
    if(numericFilters)
    {
        console.log(numericFilters)
        
        //these are the stuff which are understand by Mongoose
        const operatorMap = {
            ">":"$gt",
            ">=":"$gte",
            "=":"$eq",
            "<=":"$lte",
            "<": "$lt"
        }

         //converting the values which understand by mongoose
        const regEx = /\b( <|>|>=|<=|=)\b/g
        let filter = numericFilters.replace(
            regEx,
            (match)=>`-${operatorMap[match]}-`
            )

            console.log(filter)

            //define the attributes which use Number values in db
            const options = ['price','rating']

            filter = filter.split(',').forEach((item)=>{
                const [field,operator,value] = item.split('-')
                if(options.includes(field))
                {
                    queryObject[field] = {[operator]:Number(value)}
                }
            })
    }




    //sorting logic
    let result =  Product.find(queryObject)
    if(sortData){
        //queryString i.e http://localhost:3000/api/v1/products?sort=name,-price
        //In that scenario ',' is not pass in 'sort()' rather a space
        const sortList = sortData.split(',').join(' ')

        //sortlist contains the paramerters to sort i.e name price etc
        result = result.sort(sortList)
    }
    else{
        //if 'sort' attribute is not given in query then send the db data on the 
        //basis of 'createdAt' attribute in Ascending ordrt
        result = result.sort('createdAt')
    }

    //selecting logic
    if(fieldsData)
    {
        const fieldsList = fieldsData.split(',').join(' ')
        result = result.select(fieldsList)
    }

    //pagination logic

    //As from client side we get data in String , so to store them as number we TypeCast it into Integer
    //If user does not pass that than I set it to 1
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    //setting pagination logic
    const skip = (page-1)*limit

    result = result.skip(skip).limit(limit)


    //wait to get whole process complete like first find and then sort, in end store it in varaible
    const products = await result

    res.status(200).json({products, nbHits:products.length})
}

//Diff b/t Params & Query String
//Query String : For option data we prefer QueryString like "in filter functionality", it store data Key value pair
//Params: Necessary data is share by params like "Id" 

module.exports = {
    getAllProductStatic,
    getAllProduct
}