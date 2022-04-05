const app = require("express").Router();
const userController = require("../controller/user.controller");

 
app.post("/register", userController.register);
app.post("/logIn", userController.logIn);
app.patch("/uploadProfileImage", userController.uploadProfileImage);
app.delete("/deleteProfileImage", userController.deleteProfileImage);
app.patch("/uploadResume", userController.uploadResume);
app.delete("/deleteResume", userController.deleteResume);
app.patch("/addSkills", userController.addSkills);
app.delete("/removeSkills", userController.removeSkills);
app.patch("/addExperience", userController.addExperience);
app.delete("/removeExperience", userController.removeExperience);
app.post("/joinGroupRequest", userController.joinGroupRequest); // KATRY
app.get("/getAllJoinGroupRequests", userController.getAllJoinGroupRequests); //KATRY
app.delete("/leaveGroup", userController.leaveGroup); // KATRY
app.delete("/cancelJoinGroupRequest", userController.cancelJoinGroupRequest); // KATRY
app.post("/sendConnectionRequest", userController.sendConnectionRequest);
app.post("/acceptConnectionRequest", userController.acceptConnectionRequest);
app.delete("/denyConnectionRequest", userController.denyConnectionRequest);
app.get("/getAllConnectionRequests", userController.getAllConnectionRequests);
app.get("/getAllSentConnectionRequests", userController.getAllSentConnectionRequests);
app.delete("/removeSentConnectionRequest", userController.removeSentConnectionRequest);
app.post("/sendEmailToGenerateRecoveryCode", userController.sendEmailToGenerateRecoveryCode); //KATRY
app.post("/verifyRecoveryCode", userController.verifyRecoveryCode); //KATRY
app.patch("/resetPassword", userController.resetPassword); //KATRY
app.patch("/updatePassword", userController.updatePassword); //KATRY
app.patch("/editProfile", userController.editProfile); //KATRY
app.get("/profilePage", userController.profilePage); //KATRY


module.exports = app
