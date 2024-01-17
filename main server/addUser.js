async function handleAddUser() {
    return new Promise((resolve, reject)=> {
        console.log("Added user")
        resolve(1)
    })
}

module.exports = handleAddUser;