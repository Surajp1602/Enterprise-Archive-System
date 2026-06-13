from sqlalchemy import create_engine
import os

engine = create_engine(
    os.getenv("postgresql://neondb_owner:npg_BVZC0HSRgJF3@ep-silent-block-aoohiyq0-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")
)