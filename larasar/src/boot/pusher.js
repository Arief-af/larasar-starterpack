import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '5ac34a134f2f51004e31',
    cluster: 'ap1',
    forceTLS: true
});

