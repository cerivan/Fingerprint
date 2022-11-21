document.addEventListener('deviceready', onDeviceReady, false); 

function onDeviceReady() {
	Fingerprint.isAvailable(isAvailableSuccess, isAvailableError, null);

    function isAvailableSuccess(result) {
		/*
		result depends on device and os. 
		iPhone X will return 'face' other Android or iOS devices will return 'finger' Android P+ will return 'biometric'
		*/
		console.log("Fingerprint available");
    }

    function isAvailableError(error) {
		// 'error' will be an object with an error code and message
		console.log(error.message);
    }

	Fingerprint.show({
		title: "Confirmer votre identité",
		description: "Utilisez votre empreinte digitale pour continuer",
		cancelButtonTitle: "Annuler"
	}, successCallback, errorCallback);

    function successCallback(){
		console.log("Authentication successful");
    }

    function errorCallback(error){
		console.log("Authentication invalid " + error.message);
    }	
	
	
}






