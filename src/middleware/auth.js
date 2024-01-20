const {getAdmin} = require('../service/auth')
async function restrictToLoginAdminOnley(req,res,next){

    const adminId = req.cookie?.uid

    if(!adminId){
        return  res.redirect('/')
        const admin = getAdmin(adminId)
        if(!admin){
            return  res.redirect('/')

        }
        req.user = user
        next()
    }
}
 module.exports={restrictToLoginAdminOnley}