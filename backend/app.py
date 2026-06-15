from flask import Flask, jsonify, request, send_file, send_from_directory
from sqlalchemy import text
from config import engine
from flask_cors import CORS
import pandas as pd
from werkzeug.utils import secure_filename

import os

app = Flask(__name__)
CORS(app)

 
@app.route("/")
def home():
    return "Archive System Running"



@app.route("/api/stats")
def get_stats():

    with engine.connect() as conn:

        total = conn.execute(
            text(
                "SELECT COUNT(*) FROM active_records"
            )
        ).scalar()

        archived = conn.execute(
            text(
                "SELECT COUNT(*) FROM archived_records"
            )
        ).scalar()

        audits = conn.execute(
            text(
                "SELECT COUNT(*) FROM audit_logs"
            )
        ).scalar()

    return jsonify({
        "total_records": total,
        "archived_records": archived,
        "audit_logs": audits
    })

@app.route("/api/records")
def get_records():

    page = int(request.args.get("page", 1))

    limit = 20
    offset = (page - 1) * limit

    search = request.args.get("search", "")
    department = request.args.get("department", "")
    document_type = request.args.get("document_type", "")

    with engine.connect() as conn:

        result = conn.execute(
    text("""
    SELECT *
    FROM active_records
    WHERE employee_name ILIKE :search
    AND (
        :department = ''
        OR department = :department
    )
    AND (
        :document_type = ''
        OR document_type = :document_type
    )
    LIMIT :limit
    OFFSET :offset
    """),
    {
        "search": f"%{search}%",
        "department": department,
        "document_type": document_type,
        "limit": limit,
        "offset": offset
    }
)

        records = [
            dict(row._mapping)
            for row in result
        ]

    return jsonify(records)

@app.route("/api/department-stats")
def department_stats():

    with engine.connect() as conn:

        result = conn.execute(
            text("""
            SELECT
                department,
                COUNT(*) as count
            FROM active_records
            GROUP BY department
            ORDER BY count DESC
            """)
        )

        data = []

        for row in result:
            data.append({
                "department": row.department,
                "count": int(row.count)
            })

    return jsonify(data)

@app.route("/api/document-stats")
def document_stats():

    with engine.connect() as conn:

        result = conn.execute(
            text("""
            SELECT
                document_type,
                COUNT(*) as count
            FROM active_records
            GROUP BY document_type
            ORDER BY count DESC
            """)
        )

        data = []

        for row in result:
            data.append({
                "document_type": row.document_type,
                "count": int(row.count)
            })

    return jsonify(data)

@app.route("/api/archive-comparison")
def archive_comparison():

    with engine.connect() as conn:

        active = conn.execute(
            text(
                "SELECT COUNT(*) FROM active_records"
            )
        ).scalar()

        archived = conn.execute(
            text(
                "SELECT COUNT(*) FROM archived_records"
            )
        ).scalar()

    return jsonify({
        "active": active,
        "archived": archived
    })

@app.route("/api/audit-logs")
def audit_logs():

    with engine.connect() as conn:

        result = conn.execute(
            text("""
            SELECT *
            FROM audit_logs
            ORDER BY timestamp DESC
            """)
        )

        logs = []

        for row in result:

            logs.append({
                "log_id": row.log_id,
                "action": row.action,
                "performed_by": row.performed_by,
                "timestamp": str(row.timestamp)
            })

    return jsonify(logs)

@app.route("/api/retention-policies")
def get_retention_policies():

    with engine.connect() as conn:

        result = conn.execute(
            text("""
            SELECT *
            FROM retention_policy
            ORDER BY document_type
            """)
        )

        policies = []

        for row in result:

            policies.append({
                "id": row.id,
                "document_type": row.document_type,
                "retention_years": row.retention_years
            })

    return jsonify(policies)

@app.route("/api/export/csv")
def export_csv():

    query = """
    SELECT *
    FROM active_records
    """

    df = pd.read_sql(
        query,
        engine
    )

    filename = "records.csv"

    df.to_csv(
        filename,
        index=False
    )

    return send_file(
        filename,
        as_attachment=True
    )

@app.route("/api/export/excel")
def export_excel():

    query = """
    SELECT *
    FROM active_records
    """

    df = pd.read_sql(
        query,
        engine
    )

    filename = "records.xlsx"

    df.to_excel(
        filename,
        index=False
    )

    return send_file(
        filename,
        as_attachment=True
    )





if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)