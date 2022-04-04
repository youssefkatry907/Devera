const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRounds = 5;

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        userName : {type : String,required : true},
        skills: [{ type: String }],
        experience: [{
            companyName: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date },
            position: { type: String, required: true },
            state: { type: String, required: true }
        }],
        resumeUrl: String,
        groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "group" }], //Name
        joinGroupRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "group" }],
        connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
        connectionsRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
        connectionsSentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
    },
    { timestamps: true }
);

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
})

module.exports = mongoose.model("user", userSchema);