from apscheduler.schedulers.blocking import BlockingScheduler

def run_archive():

    import archive_engine

    print(
        "Archive Job Executed"
    )

scheduler = BlockingScheduler()

scheduler.add_job(
    run_archive,
    "cron",
    hour=2,
    minute=0
)

print(
    "Scheduler Started"
)

scheduler.start()