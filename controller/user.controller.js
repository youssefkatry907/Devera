const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model");

const validationModule = require("../validation/user.validation")
const saltRounds = 5;


exports.register = async (req, res) => {
    try {
        let validationResult = validationModule.validateRegisteration(req.body);
        const { firstName, lastName, email, password, confirmPassword, userName } = req.body;
        const userEmailTaken = await User.findOne({ email });
        const userNameTaken = await User.findOne({ userName }); 
        if (userEmailTaken) {
            res.status(400).json({ message: "This email already have an account" }) 
        }
        else if (userNameTaken) {
            res.status(400).json({ message: "This username already taken" })
        }
        else if (confirmPassword != password) {
            res.status(400).json({ message: "Password mismatch" })
        }
        else {
            if (validationResult.error) {
                res.status(409).json({ message: validationResult.error.details[0].message })
            }
            else {
                let newUser = new User({ firstName, lastName, email, password, userName });
                await newUser.save();
                res.status(200).send({ message: "Success" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
};

exports.logIn = async (req, res) => {
    try {
        let validationResult = validationModule.validateLogin(req.body);
        let { email, password } = req.body
        if (email) {
            if (validationResult.error) {
                res.status(409).json({ message: validationResult.error.details[0].message })
            } else {
                const userFound = await User.findOne({ email });
                if (userFound) {
                    let match = await bcrypt.compare(password, userFound.password);
                    if (match) {
                        const token = jwt.sign(
                            {
                                email: userFound.email,
                                userName: userFound.userName,
                                _id: userFound._id,
                                //is_active: userFound.is_active, (role)
                            },
                            "secret",
                            { expiresIn: "200h" }
                        );
                        userFound.token = token;
                        await userFound.save();

                        let hour = 3600000 * 200;
                        req.session.cookie.expires = new Date(Date.now() + hour);
                        req.session.user = userFound;
                        console.log("Should Login!");

                        res.json({
                            message: "Logged in Successfully!",
                            user: req.session.user,
                            status: true,
                            code: 201,
                        });
                    }
                }
            }
        }

    } catch (err) {
        res.status(500).json({ messages: "something went wrong", err })
    }

    // Check for the existance of the email,
    // Error handling,
    // Generate random number of length (6-8)
    // put verification code into user_session


    exports.resetPassword = async (req, res) => {
        try {
            let { email, newPassword, confirmNewPassword } = req.body;
            let user = User.findOne({ email })
            if (user) {
                if (newPassword === confirmNewPassword) {
                    let hashedPassword = await bcrypt.hash(newPassword, saltRounds);
                    await User.findOneAndUpdate({ email }, { password: hashedPassword })
                        .then(re => res.status(200).send({ message: "Success" }))
                        .catch(error => res.status(500).json({ message: "Something went wrong" }));
                } else {
                    res.status(404).json({ message: "Password mismatch" });
                }
            }
        } catch (err) {
            res.status(500).json({ messages: "something went wrong", err })
        }
    }

    exports.sendEmailToGenerateRecoveryCode = async (req, res) => {
        try {
            let { email } = req.body;
            let user = User.findOne({ email })
            if (user) {
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "youssefkatry907@gmail.com",
                        pass: "YAK3692581470",
                    },
                });
                let randomVerficationCode = Math.random() * 1e6;
                await transporter.sendMail({
                    from: '"Qatry" <youssefkatry907@gmail.com>',
                    to: email,
                    subject: "Reset Password Email",
                    text: `You forgot your password! Here is your recovery code ${randomVerficationCode}`,
                    html: `
<section style="width: 45%; padding: 50px; background-color: gray; margin: 70px auto; box-shadow: 0px 0px 15px
0px rgba(0,0,0,0.2);">

    
    <div>
        <h2 style="text-align:center;">Reset your Password!</h2>
        <p style="font-size: 15px;text-align: left;">You forgot your password! Here is your recovery code</p>
            <h3 style="color: #ffb21d;
            background: #1b1b1b;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            display: block;
            margin: auto;
            width: 45%;
            text-align: center;">${randomVerficationCode} </h3>

    </div>
</section>
`,
                });
                res.status(200).send({ message: "Done" });
            }
        } catch (err) {
            res.status(500).json({ message: "somthing went wrong " })
        }
    }

    exports.updatePassword = async (req, res) => {
        try {
            const { oldPassword, newPassword, confirmNewPassword } = req.body;
            const id = req.user._id
            const user = await User.findById({ _id: id }).catch(error => { return });
            let match = await bcrypt.compare(oldPassword, user.password);
            if (match) {
                if (newPassword === confirmNewPassword) {
                    let hashedPassword = await bcrypt.hash(newPassword, saltRounds);
                    await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword })
                        .then(re => res.status(200).send({ message: "Success" }))
                        .catch(error => res.status(500).json({ message: "Something went wrong" }));
                } else {
                    res.status(404).json({ message: "Password mismatch" });
                }
            }
            else {
                res.status(400).json({ message: "Please enter a correct password" });
            }
        } catch (err) {
            res.status(500).json({ message: "somthing went wrong " })
        }
    }
    exports.editProfile = async (req, res) => {
        let { firstName, lastName, email, userName } = req.body;
        const userId = req.user._id;
        const emailTaken = await User.findOne({ email });
        const user = await User.findById({ _id: id }).catch(error => { return });
        if (emailTaken) {
            res.status(500).json({ message: "This email already taken" });
        } else {
            await User.findByIdAndUpdate({ _id: id }, { firstName, lastName, email, userName })
                .then(re => res.status(200).send({ message: "Success" }))
                .catch(error => res.status(500).json({ message: "Something went wrong" }));
        }
    }
    //  Get Id from the user session
    exports.profilePage = async (req, res) => {
        const userId = req.session.user._id;
        await User.findOne({ _id: userId }).select("-password")
            .then(userData => res.status(200).send({ message: "Success", userData }))
            .catch(error => res.status(500).json({ message: "Something went wrong" }))
    }

    exports.joinGroupRequest = async (req, res) => {
        const userId = req.session.user._id;
        const groupId = req.body.groupId;
        let user = await User.findOne({ _id: userId })
        user.joinGroupRequest.push(groupId);
        await user.save();
        //Push all user id's who sent joinGroupRequests -->Abdelaziz
        res.status(200).send({ message: "Request sent" })
    }

    exports.cancelJoinGroupRequest = async (req, res) => {
        try {
            const userId = req.session.user._id;
            let user = await User.findOne({ _id: userId })
            const groupId = req.body.groupId;
            user.joinGroupRequest = user.joinGroupRequest.filter(!groupId);
            await user.save();
            res.status(200).send({ message: "success" })
        } catch (err) {
            res.status(500).json({ message: "somthing went wrong " })
        }
    }
}
