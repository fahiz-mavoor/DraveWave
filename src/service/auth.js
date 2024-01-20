const sessionIdToadminMap = new Map()

function setAdmin(id, admin){
    sessionIdToadminMap.set(id,admin)
}
function getAdmin(id){
    return sessionIdToadminMap.get(id)
}

module.exports ={
    setAdmin,
    getAdmin
}