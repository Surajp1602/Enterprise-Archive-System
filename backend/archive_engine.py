from sqlalchemy import text
from config import engine

with engine.begin() as conn:

    records = conn.execute(
        text("""
        SELECT
            ar.*,
            rp.retention_years

        FROM active_records ar

        JOIN retention_policy rp
        ON ar.document_type =
           rp.document_type
        """)
    ).fetchall()

    archived_count = 0

    for record in records:

        age_years = (
            2026 -
            record.joining_date.year
        )

        if age_years >= record.retention_years:

            conn.execute(
                text("""
                INSERT INTO archived_records
                (
                    original_record_id,
                    employee_name,
                    department,
                    joining_date,
                    status,
                    document_type
                )
                VALUES
                (
                    :id,
                    :employee,
                    :dept,
                    :joining,
                    :status,
                    :doc
                )
                """),
                {
                    "id": record.record_id,
                    "employee": record.employee_name,
                    "dept": record.department,
                    "joining": record.joining_date,
                    "status": record.status,
                    "doc": record.document_type
                }
            )

            conn.execute(
                text("""
                DELETE
                FROM active_records
                WHERE record_id = :id
                """),
                {
                    "id": record.record_id
                }
            )

            archived_count += 1

    conn.execute(
        text("""
        INSERT INTO audit_logs
        (
            action,
            performed_by
        )
        VALUES
        (
            :action,
            'System'
        )
        """),
        {
            "action":
            f"Archived {archived_count} records"
        }
    )

print(
    f"Archived {archived_count} records"
)