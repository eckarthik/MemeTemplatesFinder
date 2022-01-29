import json, time, re, requests, base64
from psycopg2 import Error
from selenium import webdriver
import psycopg2


def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
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


def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)


sql_create_projects_table = """ CREATE TABLE IF NOT EXISTS templates (
                                        post_id BIGINT PRIMARY KEY,
                                        post_shortcode text NOT NULL,
                                        display_url text,
                                        caption text,
                                        hashtag text,
                                        image_b64 text
                                    ); """
connection = create_connection("database.db")
create_table(connection, sql_create_projects_table)
geckodriver_path = "geckodriver.exe"
driver = webdriver.Firefox(executable_path=geckodriver_path)

driver.get("https://instagram.com")

choice = input("Start?")

url = """https://www.instagram.com/graphql/query/?query_hash=32b14723a678bd4628d70c1f877b94c9&variables={"id":"8627555974","first":40,"after":"%s"}"""
first_cursor = ""
driver.get("view-source:" + url % first_cursor)
json_response = json.loads(driver.find_element_by_tag_name("pre").text)
for i in range(0, 130):
    edge_owner_to_timeline_media = json_response["data"]["user"]["edge_owner_to_timeline_media"]
    end_cursor = edge_owner_to_timeline_media["page_info"]["end_cursor"]
    edges = edge_owner_to_timeline_media["edges"]
    for edge in edges:
        post_id = edge["node"]["id"]
        post_shortcode = edge["node"]["shortcode"]
        caption = edge["node"]["edge_media_to_caption"]["edges"][0]["node"]["text"]
        display_url = edge["node"]["display_url"]
        hashtags = ",".join(re.findall(r"\#(.*?)_[tTkKaA]*", caption))
        image_data = "data:image/png;base64," + base64.b64encode(requests.get(display_url).content).decode('utf-8')
        sql = ''' INSERT INTO templates(post_id,post_shortcode,display_url,caption,hashtag,image_b64) 
        VALUES(%s,%s,%s,%s,%s,%s);'''
        print(dict(edge["node"]).keys())
        if "edge_sidecar_to_children" in dict(edge["node"]).keys():
            print("Found Multiple Post for - ", post_shortcode)
            for child in edge["node"]["edge_sidecar_to_children"]["edges"]:
                post_id = child["node"]["id"]
                display_url = child["node"]["display_url"]
                data = (post_id, post_shortcode, display_url, caption, hashtags, image_data)
                cur = connection.cursor()
                cur.execute(sql, data)
                connection.commit()
                print(data)
            print("Completed Saving multiple Posts found in - ", post_shortcode)
        else:
            data = (post_id, post_shortcode, display_url, caption, hashtags, image_data)
            cur = connection.cursor()
            cur.execute(sql, data)
            connection.commit()
            print(data)
    driver.get("view-source:" + url % end_cursor)
    json_response = json.loads(driver.find_element_by_tag_name("pre").text)
    print("Loaded new URL")
    time.sleep(2)

driver.close()
driver.quit()
