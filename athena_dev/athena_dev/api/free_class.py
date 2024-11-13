import frappe
from datetime import datetime

@frappe.whitelist(allow_guest=True)
def create_free_class(fullName, email, contactNumber, appointmentDatetime):
    try:
        # Parse the datetime
        appointment_datetime = datetime.strptime(appointmentDatetime, "%Y-%m-%dT%H:%M:%S")
        appointment_date = appointment_datetime.date()
        appointment_time = appointment_datetime.time()

        # Create a new instance of the Doctype
        new_entry = frappe.get_doc({
            "doctype": "Free Class",
            "full_name": fullName,
            "email": email,
            "contact": contactNumber,
            "appointment_date": appointment_date,
            "appointment_time": appointment_time
        })

        # Insert the new entry into the database
        new_entry.insert()

        return {"status": "success", "message": "Entry created successfully"}
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "create_free_class error")
        return {"status": "error", "message": str(e)}
