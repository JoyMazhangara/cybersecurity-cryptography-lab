const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)

      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const authenticated = bcrypt.compareSync(password, users[i].passHash)
          if (authenticated) {
            let userToReturn = {...users[i]}
            delete userToReturn.passHash
            res.status(200).send(userToReturn)
          }  
        }
      }
      res.status(400).send("User not found.")
    },


    register: (req, res) => {
        const { username, email, firstName, lastName, password} = req.body

        const salt = bcrypt.genSaltSync(5)
        const passHash = bcrypt.hashSync(password,salt)

        const newUserObj = {
          username,
          email,
          firstName,
          lastName,
          passHash
        }

        users.push(newUserObj)
        let userToReturn = {...newUserObj}
        delete userToReturn.passHash
        res.status(200).send(userToReturn)
    }
}