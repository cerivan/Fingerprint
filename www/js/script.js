function onDeviceReady() {
	/* if ( !localStorage.getItem("idUser") ){
		localStorage.setItem('idUser', Math.floor((Math.random() * 100000000) + 1));
	}
	BackgroundGeolocation.configure({
		locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER  ,
		desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
		stationaryRadius: 1,
		distanceFilter: 1,
		interval: 10000,
		stopOnTerminate: false,
		notificationTitle: 'Cemex suivi est activé',
		notificationText: 'Vos données de localisation sont bien envoyées.',
		notificationIconSmall: 'mipmap/cemex_notif',
		notificationIconColor:"#293064",	
		url: 'https://cemex.logatik.fr/data.php',				
		postTemplate: {
			lat: "@latitude",
			lng: "@longitude",			
			alt: "@altitude",
			acc: "@accuracy",
			speed: "@speed",
			tstamp: "@time"
		}
		
	});
	
	BackgroundGeolocation.start();
	
	BackgroundGeolocation.on('background', function() {
		console.log('[INFO] App is in background');
		
	});

	BackgroundGeolocation.on('foreground', function() {
		console.log('[INFO] App is in foreground');

	});
		
	BackgroundGeolocation.on('error', function(error) {
		console.log('[ERROR] BackgroundGeolocation error:', error.code, error.message);
	});

	BackgroundGeolocation.on('start', function() {
		console.log('[INFO] BackgroundGeolocation service has been started');
	});

	BackgroundGeolocation.on('stop', function() {
		console.log(' [INFO] BackgroundGeolocation service has been stopped');
	});
	
	BackgroundGeolocation.getCurrentLocation(	function (locations) {
		console.log("getCurrentLocation",locations);
	});
		
	var marker_cemex = L.icon({
		iconUrl: 'images/pin.png',
	
		iconSize:     [38, 51], // size of the icon
		iconAnchor:   [19, 51], // point of the icon which will correspond to marker's location
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
	var map = L.map('map').setView([48.8534, 2.3488], 16);
	L.tileLayer('https://maps.sprb.fr/cache/{z}/{x}/{y}.png', {
			minZoom: 10,
			maxZoom: 18,
			detectRetina: false
		}).addTo(map);
	var Marker = L.marker([48.8534, 2.3488], { icon: marker_cemex });		
	map.addLayer(Marker);	
	$i = 1
	BackgroundGeolocation.on( 'location', function (e) {
		console.log("location",$i);
		$i++;
		if (map.hasLayer(Marker)){
			map.removeLayer(Marker);
		}					
		map.setView([e.latitude, e.longitude], 16); 

		L.tileLayer('https://maps.sprb.fr/cache/{z}/{x}/{y}.png', {
			minZoom: 10,
			maxZoom: 18,
			detectRetina: false
		}).addTo(map);
		
		Marker = L.marker([e.latitude, e.longitude], {
			icon: marker_cemex
		});		
		map.addLayer(Marker);
		
		//console.log(localStorage.getItem('idUser')); 
		$.ajax({
			url: "https://cemex.logatik.fr/data.php", 
			type: 'POST',
			data : {
				idUser: localStorage.getItem('idUser'),
				lat: e.latitude,
				lng: e.longitude,			
				alt: e.altitude,
				acc: e.accuracy,
				speed: e.speed,
				tstamp: e.time				
			},
			success: function(doc) {
				console.log(doc)							
			}
		});	
	});
	
	
	$("header img").on("click", function () {
		

		sms.send('0661747593','Test des envois de SMS... Fonctionnement avec touche back ?',{
			replaceLineBreaks: false, 
	            android: {
	                intent: 'INTENT' 
	            }
		}, function(message) {
				console.log("success: " + message);
			}, function(error) {
				console.log("error: " + error);		
		});
		
		
	}); */
	
	
	
}

document.addEventListener('deviceready', onDeviceReady, false); 
FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);

/**
 * @return {
 *      isAvailable:boolean,
 *      isHardwareDetected:boolean,
 *      hasEnrolledFingerprints:boolean
 *   }
 */
function isAvailableSuccess(result) {
    console.log("FingerprintAuth available: " + JSON.stringify(result));
    if (result.isAvailable) {
        var encryptConfig = {}; // See config object for required parameters
        FingerprintAuth.encrypt(encryptConfig, encryptSuccessCallback, encryptErrorCallback);
    }
}

function isAvailableError(message) {
    console.log("isAvailableError(): " + message);
}