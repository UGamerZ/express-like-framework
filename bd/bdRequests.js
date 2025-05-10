//b8m9hKYnV9gAgx6V gastervlad
const User = require('./userSchema');

const getUsers = async (req, res) => {
    try {
        let users;

        if(req.params && req.params.id) users = await User.findById(req.params.id);
        else users = await User.find();

        res.send(users);
    } catch(err) { console.log(err); res.end('invalid id'); }
}

const addUser = async (req, res) => {
    await User.create(req.body);
    res.end('user added successfully');
}

const removeUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.end(`user with id ${req.params.id} successfully deleted`);
    } catch { res.end('no such user'); }
}

module.exports = {getUsers, addUser, removeUser};