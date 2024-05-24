var bookmarkName = document.getElementById('bookmark-name');
var websiteUrl = document.getElementById('Website-Url');

var bookMarks = [];
if (localStorage.getItem('bookmark') !== null) {
     bookMarks = JSON.parse(localStorage.getItem('bookmark'));
     display();
} else {
     bookMarks = [];
}



function validateUrl(url) {
     var pattern = new RegExp('^(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/=]*)$');
     return pattern.test(url);
}


function addBookmark() {
     var bookmark = {
          name: bookmarkName.value,
          url: websiteUrl.value,
     }
     if (validateUrl(bookmark.url)) {
          bookMarks.push(bookmark)
     } else {
          alert("Please Enter A Valid URL")
     }
     localStorage.setItem('bookmark', JSON.stringify(bookMarks))
     display();
     resetFields();
}

function display() {
     var bookmarksBox = ``;
     for (var i = 0; i < bookMarks.length; i++) {
          bookmarksBox += `
          <tr>
               <th scope="row">${i}</th>
               <td>${bookMarks[i].name}</td>
               <td><button class="btn btn-info text-light"><i class="fa-solid fa-eye me-2"></i> <a
               href="//${bookMarks[i].url}" target="_blank">Visit</a></button></td>
               <td><button class="btn btn-danger text-light" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can me-2"></i> <a
               href="">Delete</a> </button></td>
          </tr>
          `
     }
     document.getElementById('bookmarker-table-body').innerHTML = bookmarksBox;
}

function resetFields() {
     bookmarkName.value = null;
     websiteUrl.value = null;
}

function deleteBookmark(index) {
    bookMarks.splice(index, 1);
    display();
    localStorage.setItem('bookmark', JSON.stringify(bookMarks))
}