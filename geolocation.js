function getIPAddress() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip);
}

function getGeolocation(ip) {
    return fetch(`https://ipapi.co/${ip}/json/`)
        .then(response => response.json());
}

function setLocationAttribute() {
    getIPAddress()
        .then(ip => getGeolocation(ip))
        .then(geoData => {
            const locationValue = geoData.country === 'EE' ? 'EE' : 'other';
            
            sm.getApi({version: 'v1'}).then(function(glia) {
                glia.updateInformation({
                    customAttributes: {
                        location: locationValue
                    }
                }).then(function() {
                    console.log('Location attribute set successfully:', locationValue);
                }).catch(function(error) {
                    if (error.cause == glia.ERRORS.NETWORK_TIMEOUT) {
                        console.error('Network timeout error');
                    } else {
                        console.error('Other error:', error);
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error getting location:', error);
        });
}

setLocationAttribute();