import userModel from "../models/user.model";
async function registerUser(req, res) {
    const {userName, email, password} = req.body;
    const user = await userModel.create({
        userName, email, password        
    })

}
export {registerUser};