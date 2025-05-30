sm.getApi({version: 'v1'}).then(function(glia) {
      
    function addSubmitListener(engagement) {
        var submit = document.querySelector('#some_action');

        submit.addEventListener('click', function() {
            if (engagement && typeof engagement.recordEvent === 'function') {
                engagement.recordEvent({message: 'Action button clicked'})
                    .then(() => {
                        console.log('Event recorded successfully');
                    })
                    .catch((error) => {
                        console.error('Error recording event:', error);
                    });
            } else {
                console.error('Invalid engagement object or recordEvent method not found');
            }
        });
    }

    glia.addEventListener(glia.EVENTS.ENGAGEMENT_START, addSubmitListener);
});
