document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const appointmentDate = formData.get('appointmentDate');
    const appointmentTime = formData.get('appointmentTime');
    const appointmentDatetime = `${appointmentDate}T${appointmentTime}:00`;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

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
            'X-Frappe-CSRF-Token': csrfToken
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        window.location.href = "/";
    })
    .catch(error => {
        console.error('Error:', error);
    });
});