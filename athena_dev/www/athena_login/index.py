import frappe
from urllib.parse import urlencode

def get_context(context):
    # Cek apakah user sedang akses dengan param frappe=1
    if frappe.local.form_dict.get("frappe") == "1":
        context.default_login = True
    return context


