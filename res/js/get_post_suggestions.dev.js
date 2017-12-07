// loads suggested posts to read in post.html
// displays the two latest posts, and two random posts – not including
// the current post


function loadJSON (path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error) {
                    error(xhr);
                }
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function getPosts (response) {
    var currentPostTitle = document.getElementById('title').innerText;
    var posts = response.posts.filter(function (post) {
        return post.title !== currentPostTitle;
    });

    var result = posts.splice(0, 2);

    for (var i = 0; i < 2; i++) {
        if (posts.length == 0) {
            break;
        }

        result.push(
            posts.splice(
                Math.floor(Math.random() * posts.length),
                1)
        );
    }

    addPosts(result);
}

function addPosts (posts) {
    var blogPosts = document.getElementById('blog-posts');

    for (var i = 0; i < posts.length; i++) {
        var title = posts[i].title;
        var url = posts[i].url;
        var thumbnail = posts[i].thumbnail;

        var article = document.createElement('article');
        article.innerHTML = `<a href="${url}">
            <figure>
                <img src="${thumbnail}">
            </figure>
            <div>${title}</div>
        </a>`;

        blogPosts.appendChild(article);
    }
}

loadJSON('/blog/posts.json',
         function(data) { getPosts(data); },
         function(xhr) { console.error(xhr); }
);
