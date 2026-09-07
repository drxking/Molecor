"""Set a new password for the molecor-admin Django account.

Run with a password supplied only at execution time:
    MOLECOR_ADMIN_NEW_PASSWORD='a-strong-password' python update_molecor_admin_password.py
"""

import os

import django


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "molecor_backend.settings")
django.setup()

from django.contrib.auth import get_user_model


USERNAME = "molecor-admin"
PASSWORD_ENV_VAR = "MOLECOR_ADMIN_NEW_PASSWORD"


def update_password():
    password = os.environ.get(PASSWORD_ENV_VAR)
    if not password:
        raise SystemExit(f"Set {PASSWORD_ENV_VAR} before running this script.")

    user_model = get_user_model()
    try:
        user = user_model.objects.get(username=USERNAME)
    except user_model.DoesNotExist:
        raise SystemExit(f"User '{USERNAME}' does not exist; no password was changed.")

    user.set_password(password)
    user.save(update_fields=["password"])
    print(f"Password updated for '{USERNAME}'.")


if __name__ == "__main__":
    update_password()
