//////////////
//  EVENTS  //
//////////////

Template.cardTemplate.events({
	'keypress #answer' : function (e) {
		
		var key=e.keyCode || e.which;
		if (key==13){
			console.log("You Clicked 'Enter'");
		}
	},
	'click .logoutLink' : function () {
        Meteor.logout( function (error) {
            if (typeof error !== "undefined") {
                //something happened during logout
                console.log("User: " + Meteor.user() +" \n" +
                            "\tError: " + error + "\n");
            } else {
                Router.go("signin");
            }
        });
    },
    'click .homeLink' : function () {
        Router.go("profile");
    }
});

/////////////////
//  VARIABLES  //
/////////////////

Template.cardTemplate.invokeAfterLoad = function() {
	console.log('card loaded');
	randomCard();
}

Template.cardTemplate.username = function () {
	if (typeof Meteor.users.findOne({_id: Meteor.userId()}) === "undefined" ) {
        Router.go("signin");
        window.location.reload();
        //the reload is needed because for some reason the page contents show up as
        //empty unless we do the reload.
        return;
    }
	return Meteor.user().username;
}

/////////////////
//  FUNCTIONS  //
/////////////////

function randomCard() {
	var nextCardIndex = Math.floor((Math.random() * 17));
	Session.setDefault("currentQuestion", Stimuli.findOne({fileName: "EEGstims.xml"}).stimuli.setspec.clusters[0].cluster[nextCardIndex].word[0]);
	Session.setDefault("currentAnswer", Stimuli.findOne({fileName: "EEGstims.xml"}).stimuli.setspec.clusters[0].cluster[nextCardIndex].answer[0]);
}
