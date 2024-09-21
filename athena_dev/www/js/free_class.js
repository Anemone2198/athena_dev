document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/method/athena_dev.athena_dev.api.csrf_token.get_csrf_token')
    .then(response => response.json())
    .then(data => {
        const csrfToken = data.csrf_token;
        document.getElementById('registration-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const formData = new FormData(this);
            const appointmentDate = formData.get('appointmentDate');
            const appointmentTime = formData.get('appointmentTime');
            const appointmentDatetime = `${appointmentDate}T${appointmentTime}:00`; // Format: YYYY-MM-DDTHH:MM:SS

            const payload = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                contactNumber: formData.get('contactNumber'),
                appointmentDatetime: appointmentDatetime
            };

            fetch('/api/method/athena_dev.athena_dev.api.free_class.create_free_class', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Frappe-CSRF-Token': csrfToken // Include CSRF token in the header
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching CSRF token:', error);
    });
});