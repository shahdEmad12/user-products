import connection_db from "../../../DB/connection.js";


//...................................addusers.........................................
export const addUser = (req,res,next)=>{
    const {name, email, password, age} = req.body
    const selectQueryByEmail = `SELECT * FROM tbl_users WHERE email='${email}'`
    const insertQuery = `INSERT INTO tbl_users (name,email,password,age) VALUES ('${name}', '${email}', ${password}, ${age}) `
    connection_db.execute (selectQueryByEmail, function(err,result,field){
        if(err){
            return res.json({
                message:'query executaion failed',
                error:err
            })
        }
        if(result.length){
            return res.json({
                message:'email already exists'
            })
        }
        connection_db.execute(insertQuery, function(err,result,field){
            if(err){
                return res.json({
                    message:'query executation failed',
                    error:err
                })
            }
            if(!result.affectedRows){
                return res.json({
                    message:'adding failed'
                })
            }
            return res.json({
                message:'added successfully',
                users: result
            })
        })
    })
}

//...................................updateusers.......................................
export const updateUser = (req,res,next)=>{
    const { id } = req.params;
    const {name, email, password, age} = req.body
    const selectQueryById = `SELECT * FROM tbl_users where id=${id}`
    const updateQuery = `UPDATE \`tbl_users\` SET \`name\`='${name}', \`email\`='${email}', \`password\`='${password}', \`age\`=${age} WHERE id=${id}`;
    connection_db.execute(selectQueryById, function(err,result,field){
        if(err){
            return res.json({
                message:'query executaion failed',
                err
            })
        }
        if(!result.length){
            return res.json({
                message:'user not found'
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
}

//...................................deleteusers.......................................
export const deleteUser = (req,res,next)=>{
    const { id } = req.params;
    const selectQueryById = `SELECT * FROM tbl_users where id=${id}`
    const deleteQuery = `DELETE FROM tbl_users where id=${id}`
    connection_db.execute(selectQueryById, function(err,result,field){
        if(err){
            return res.json({
                message:'query executaion failed',
                err
            })
        }
        if(!result.length){
            return res.json({
                message:'user not found'
            })
        }
        connection_db.execute(deleteQuery, function(err,result,field){
            if(err){
                return res.json({
                    message:'query executaion failed',
                    err
                })
            }
            if(!result.affectedRows){
                return res.json({message:'delete fail'})
            }
            return res.json({
                message:'deleted successfully',
                result
            })
        })
    })
}

//.....................search for user where his name starts with a and age less than 30..............
export const searchUser = (req,res,next)=>{
    const searchForUser = `SELECT * FROM tbl_users WHERE name LIKE 'a%' AND age < 30`
    connection_db.execute(searchForUser, function(err,result,field){
        if(err){
            return res.json({
                message:'query executation fail',
                err
            })
        }
        if(result.length){
            return res.json({
                user:result
            })
        }
    })

}

//......................search for users by list of ids.................................
export const searchUserByIds = (req,res,next)=>{
    const {idList} = req.body;
    const checkId = `SELECT * FROM tbl_users WHERE id IN (${idList})`
    connection_db.execute(checkId, /*[idList],*/ function(err,result,field){
        if(err){
            return res.json({
                message:'query executation fail',
                err
            })
        }
        if(!result.length){
            return res.json({
                message:'users not found'
            })
        }
        return res.json({
            Users:result
        })
    }
    )
    
}

//..................................listusers.........................................
export const listUsers = (req,res,next)=>{
    const selectQuery = `SELECT * FROM tbl_users`
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

//...............................get all users with products....................................
export const usersWithP = (req,res,next)=>{
    const selectQuery = `SELECT * FROM tbl_users JOIN tbl_products ON tbl_users.id = tbl_products.user_id;`
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