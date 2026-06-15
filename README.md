# Enterprise Data Archival & Records Management System

## Overview

The Enterprise Data Archival & Records Management System is a full-stack application designed to manage the lifecycle of enterprise records and documents. The system provides data ingestion, document management, retention policy enforcement, automated archival, audit logging, reporting, and analytics capabilities.

The project simulates how organizations manage contracts, invoices, employee records, payslips, NDAs, and other business documents while maintaining compliance and improving database performance through archival workflows.

---

## Key Features

### Data Management

* Manage enterprise records and metadata
* Search records by employee name
* Filter records by department and document type
* Pagination support for large datasets

### Document Management

* Upload enterprise documents
* Store document metadata
* Download uploaded documents
* Maintain document history

### Retention Policy Management

* Define retention periods for different document types
* Automatically determine archival eligibility
* Policy-driven record lifecycle management

### Automated Archiving

* Move old records from active storage to archive storage
* Archive records based on retention policies
* Generate audit logs for archival activities

### Audit Logging

* Track archival operations
* Maintain activity history
* Improve transparency and compliance

### Reporting

* Export records to CSV
* Export records to Excel
* Generate downloadable reports

### Analytics Dashboard

* Department-wise record distribution
* Document type distribution
* Active vs archived records analysis
* Enterprise KPI dashboard

---

## System Architecture

```text
CSV Dataset
     │
     ▼
ETL Pipeline
     │
     ▼
PostgreSQL Database
     │
     ▼
Flask REST APIs
     │
     ▼
React Dashboard
```

### Extended Document Management Architecture

```text
React Frontend
       │
       ▼
Flask Backend
       │
       ├── PostgreSQL (Metadata)
       │
       └── File Storage
              │
              ▼
      Uploaded Documents
```

---

## Technology Stack

### Frontend

* React
* Axios
* Chart.js
* React Icons
* CSS

### Backend

* Python
* Flask
* SQLAlchemy
* Pandas
* APScheduler

### Database

* PostgreSQL

### Reporting

* CSV Export
* Excel Export

---

## Database Schema

### Active Records

| Column        |
| ------------- |
| record_id     |
| employee_name |
| department    |
| joining_date  |
| status        |
| document_type |
| created_at    |

### Archived Records

| Column             |
| ------------------ |
| archive_id         |
| original_record_id |
| employee_name      |
| department         |
| joining_date       |
| document_type      |
| archived_at        |

### Audit Logs

| Column       |
| ------------ |
| log_id       |
| action       |
| performed_by |
| timestamp    |

### Retention Policy

| Column          |
| --------------- |
| id              |
| document_type   |
| retention_years |

### Documents

| Column        |
| ------------- |
| document_id   |
| employee_name |
| department    |
| document_type |
| file_name     |
| file_path     |
| upload_date   |
| status        |

---

## API Endpoints

### Dashboard APIs

```http
GET /api/stats
GET /api/department-stats
GET /api/document-stats
GET /api/archive-comparison
```

### Records APIs

```http
GET /api/records
```

Supports:

```http
/api/records?search=John
/api/records?department=IT
/api/records?document_type=Contract
/api/records?page=1
```

### Audit APIs

```http
GET /api/audit-logs
```

### Retention Policies

```http
GET /api/retention-policies
```

### Document Management

```http
POST /api/upload-document
GET /api/documents
GET /api/download/<filename>
```

### Reporting APIs

```http
GET /api/export/csv
GET /api/export/excel
```

---

## ETL Workflow

```text
CSV Dataset
      ↓
Data Extraction
      ↓
Data Transformation
      ↓
PostgreSQL Loading
```

---

## Archival Workflow

```text
Active Records
       ↓
Retention Policy Evaluation
       ↓
Archive Eligible Records
       ↓
Audit Log Generation
       ↓
Archived Records
```

---

## Project Highlights

* 2500+ synthetic enterprise records generated using Faker
* PostgreSQL-backed record lifecycle management
* Retention-policy driven archival engine
* Scheduled archival automation
* Interactive React dashboard
* Enterprise document management
* Audit logging and compliance tracking
* CSV and Excel report generation
* Responsive UI

---

## Future Enhancements

* PDF preview support
* Role-Based Access Control (RBAC)
* Document versioning
* AWS S3 / Azure Blob Storage integration
* OCR-based document indexing
* Advanced analytics dashboard
* Email notifications for archival events

---

## Screenshots

Add screenshots of:

1. Dashboard
2. Records Management
3. Audit Logs
4. Retention Policies
5. Document Management
6. Analytics Charts

---

## Author

Suraj Pawar

BE Computer Engineering

Enterprise Data Archival & Records Management System
