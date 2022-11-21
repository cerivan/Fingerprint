function onDeviceReady() {
	Fingerprint.isAvailable(isAvailableSuccess, isAvailableError, null);

    function isAvailableSuccess(result) {
      /*
      result depends on device and os. 
      iPhone X will return 'face' other Android or iOS devices will return 'finger' Android P+ will return 'biometric'
      */
      alert("Fingerprint available");
    }

    function isAvailableError(error) {
      // 'error' will be an object with an error code and message
      alert(error.message);
    }


Fingerprint.show({
      description: "Some biometric description"
    }, successCallback, errorCallback);

    function successCallback(){
      alert("Authentication successful");
    }

    function errorCallback(error){
      alert("Authentication invalid " + error.message);
    }

	
	
	
}

document.addEventListener('deviceready', onDeviceReady, false); 




