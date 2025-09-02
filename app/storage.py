from app.models import Post

posts = []
post_id_counter = 1

def add_post(author, content):
    global post_id_counter
    post = Post(post_id_counter, author, content)
    posts.append(post.to_dict())
    post_id_counter += 1
    return post.to_dict()
