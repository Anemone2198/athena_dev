import frappe

@frappe.whitelist(allow_guest=True)
def create_free_class(full_name, email, contact_number, appointment_date, appointment_time):
    # Create a new instance of the Doctype
    new_entry = frappe.get_doc({
        "doctype": "free_class",
        "full_name": full_name,
        "email": email,
        "contact": contact_number,
        "appointment_date": appointment_date,
        "appointment_time": appointment_time
    })

    # Insert the new entry into the database
    new_entry.insert()

    # Optionally, you can commit the transaction
    frappe.db.commit()

    return {"status": "success", "message": "Entry created successfully"}