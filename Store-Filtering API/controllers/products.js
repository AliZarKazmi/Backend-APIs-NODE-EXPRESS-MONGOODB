const getAllProductStatic = async (req,res)=>{
    res.status(200).json({msg:`products testing route`})
}

const getAllProduct = async (req,res)=>{
    res.status(200).json({msg:`products  route`})
}

module.exports = {
    getAllProductStatic,
    getAllProduct
}