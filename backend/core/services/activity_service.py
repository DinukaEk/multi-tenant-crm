from activity_logs.models import ActivityLog


def log_activity(user, action, model_name, object_id):

    ActivityLog.objects.create(
        user=user,
        action=action,
        model_name=model_name,
        object_id=object_id
    )