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
app.post("/joinGroupRequest", userController.joinGroupRequest); 
app.get("/getAllJoinGroupRequests", userController.getAllJoinGroupRequests); 
app.delete("/leaveGroup", userController.leaveGroup); 
app.delete("/cancelJoinGroupRequest", userController.cancelJoinGroupRequest); 
app.post("/sendConnectionRequest", userController.sendConnectionRequest);
app.post("/acceptConnectionRequest", userController.acceptConnectionRequest);
app.delete("/denyConnectionRequest", userController.denyConnectionRequest);
app.get("/getAllConnectionRequests", userController.getAllConnectionRequests);
app.get("/getAllSentConnectionRequests", userController.getAllSentConnectionRequests);
app.delete("/removeSentConnectionRequest", userController.removeSentConnectionRequest);
app.post("/sendEmailToGenerateRecoveryCode", userController.sendEmailToGenerateRecoveryCode); 
app.post("/verifyRecoveryCode", userController.verifyRecoveryCode); 
app.patch("/resetPassword", userController.resetPassword);
app.patch("/updatePassword", userController.updatePassword);
app.patch("/editProfile", userController.editProfile); 
app.get("/profilePage", userController.profilePage); 


module.exports = app
