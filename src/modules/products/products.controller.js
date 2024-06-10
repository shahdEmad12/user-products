import connection_db from "../../../DB/connection.js";


//...................................addproduct.........................................
export const addProduct = (req,res,next)=>{
    const {pName, pDescription, price, createdby, user_id} = req.body
    const selectQueryByName = `SELECT * FROM tbl_products WHERE pName='${pName}'`
    const insertQuery = `INSERT INTO tbl_products (pName, pDescription, price, createdby, user_id) VALUES ('${pName}', '${pDescription}', ${price}, '${createdby}',${user_id}) `
    connection_db.execute (selectQueryByName, function(err,result,field){
        if(err){
            return res.json({
                message:'query executaion failed',
                err
            })
        }
        if(result.length){
            return res.json({
                message:'product already exists'
            })
        }
        connection_db.execute (insertQuery, function(err,result,field){
            if(err){
                return res.json({
                    message:'query executation failed',
                    err
                })
            }
            if(!result.affectedRows){
                return res.json({
                    message:'adding failed'
                })
            }
            return res.json({
                message:'added successfully',
                products: result
            })
        })
    })
}

//...................................updateproduct.......................................
export const updateProduct = (req,res,next)=>{
    const {userid, id } = req.params;
    const {pName, pDescription, price, createdby, user_id} = req.body
    const checkOwner = `SELECT * FROM tbl_users where id=${userid}`
    const selectQueryById = `SELECT * FROM tbl_products where id=${id}`
    const updateQuery = `UPDATE \`tbl_products\` SET \`pName\`='${pName}', \`pDescription\`='${pDescription}', \`price\`=${price}, \`createdby\`='${createdby}', \`user_id\`=${user_id} WHERE id=${id}`;
    connection_db.execute(checkOwner, function(err,result,field){
        if(err){
            return res.json({
                message:'query executation fail',
                err
            })
        }
        if(!result.length){
            return res.json({
                message:'owner not found'
            })
        }
        connection_db.execute(selectQueryById, function(err,result,field){
            if(err){
                return res.json({
                    message:'query executaion failed',
                    err
                })
            }
            if(!result.length){
                return res.json({
                    message:'product not found'
                })
            }
            connection_db.execute(updateQuery, function(err,result,field){
                if(err){
                    return res.json({
                        message:'query executaion failed',
                        err
                    })
                }
                if(!result.affectedRows){
                    return res.json({message:'update fail'})
                }
                return res.json({
                    message:'updated successfully',
                    result
                })
            })
        })
    })
    
}

//...................................deleteproducts.......................................
export const deleteProduct = (req,res,next)=>{
    const { userid, id } = req.params;
    const checkOwner = `SELECT * FROM tbl_users where id=${userid}`
    const selectQueryById = `SELECT * FROM tbl_products where id = ${id}`
    const deleteQuery = `DELETE FROM tbl_products where id=${id}`
    connection_db.execute(checkOwner, function(err,ownerResult,field){
        if(err){
            return res.json({
                message:'query executaion failed',
                err
            })
        }
        if(!ownerResult.length){
            return res.json({
                message:'owner not found'
            })
        }
        connection_db.execute(selectQueryById, function(err,productResult,field){
            if(err){
                return res.json({
                    message:'query executaion failed',
                    err
                })
            }
            if(!productResult.length){
                return res.json({
                    message:'product not found'
                })
            }
            connection_db.execute(deleteQuery, function(err,deleteResult,field){
                if(err){
                    return res.json({
                        message:'query executaion failed',
                        err
                    })
                }
                if(!deleteResult.affectedRows){
                    return res.json({message:'delete fail'})
                }
                return res.json({
                    message:'deleted successfully'
                })
            })
    })
    
    })
}

//.....................search for product where price greater than 3000..............
export const searchProduct = (req,res,next)=>{
    const searchForProduct = `SELECT * FROM tbl_products where price > 3000`
    connection_db.execute(searchForProduct, function(err,result,field){
        if(err){
            return res.json({
                message:'query executation fail',
                err
            })
        }
        if(result.length){
            return res.json({
                product:result
            })
        }
        return res.json({
            message:'product not found'
        })
    })

}


//..................................listproducts.........................................
export const listProducts = (req,res,next)=>{
    const selectQuery = `SELECT * FROM tbl_products`
    connection_db.execute(selectQuery, function(err,result,field){
        if(err){
            return res.json({
                message: 'selection failed',
                err
            })
        }
        if(result.length){
            return res.json({
                message: 'query execute successfully',
                result
            })
        }
        return res.json({
            message:'the table is empty',
            result
        })
    })
}
