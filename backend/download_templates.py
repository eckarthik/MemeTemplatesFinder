import requests, os, shutil, io
import psycopg2
from psycopg2 import Error


def create_connection():
    """ create a database connection to the SQLite database
        specified by db_file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="meme_templates",
            user="postgres",
            password="test1234$")
        return conn
    except Error as e:
        print(e)

    return conn


def execute_query(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    data = []
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
        data = c.fetchall()
    except Error as e:
        print(e)

    return data


connection = create_connection()
query = "SELECT * FROM projects"
rows = execute_query(connection, query)
if "Templates" not in os.listdir():
    os.mkdir("Templates")

os.chdir("Templates")
counter = 5500
for row in rows[5500:]:
    hashtags = row[-1].lower().split(",")
    hashtag_dirs = []
    for hashtag in hashtags:
        if len(hashtag) > 0:
            hashtag_dirs.append(hashtag)
    caption = row[3]
    post_shortcode = row[1]
    print("Currently Processing - ", post_shortcode, " - ", counter)
    response = requests.get(row[2], stream=True)
    meme_template_file_name = str(row[0]) + ".jpg"
    caption_file_name = str(row[0]) + ".txt"
    with open(meme_template_file_name, 'wb') as f:
        response.raw.decode_content = True
        shutil.copyfileobj(response.raw, f)
    with io.open(caption_file_name, "w", encoding="utf-8") as f:
        f.write(caption)
    current_dirs = os.listdir()
    if len(hashtag_dirs) > 0:
        for dir in hashtag_dirs:
            if dir not in current_dirs:
                print("Hashtag dirs = ", hashtag_dirs)
                os.mkdir(dir)
    for dir in hashtag_dirs:
        shutil.copy(meme_template_file_name, os.path.join(os.getcwd(), dir))
        shutil.copy(caption_file_name, os.path.join(os.getcwd(), dir))
    os.remove(meme_template_file_name)
    os.remove(caption_file_name)
    counter = counter + 1
