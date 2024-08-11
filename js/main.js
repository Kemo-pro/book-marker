// Listen For Form Submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// Function Save Bookmark
function saveBookmark(e) {
// Get Form Values
var siteName = document.getElementById("siteName").value;
var siteUrl = document.getElementById("siteUrl").value;

if(!validateForm(siteName,siteUrl)){
return false
}

var bookmark = {
name: siteName,
url: siteUrl,
};

// Put Bookmark Data To LocalStorage
if (localStorage.getItem("bookmarks") === null) {
// init array
var bookmarks = [];

// Add Input Value To array
bookmarks.push(bookmark);

// Set To LocalStorage
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
} else {
// Get bookmarks From LocalStorage
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

// Add bookmark to array
bookmarks.push(bookmark);

// Add to LocalStorage
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Clear Form
document.getElementById('myForm').reset()

// Re-fetchBookmarks
fetchBookmarks();

// Call Validate Form
validateForm();

// Prevent Form From Submiting
e.preventDefault();
}

// Delete bookmark Function
function deleteBookmark(url) {
// Get bookmarks From LocalStorage
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

// Loop Through bookmarks
bookmarks.forEach((e) => {
if (e.url == url) {
// Delete from array
bookmarks.splice(e, 1);
}
});

// Add to LocalStorage
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

// Re-fetchBookmarks
fetchBookmarks();
}

// fetchBookmarks Function
function fetchBookmarks() {
// Get bookmarks From LocalStorage
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

// Get output ID
var bookmarksResults = document.getElementById("bookmarkerResults");

// Bulid Output
bookmarksResults.innerHTML = "";

// Loop through bookmarks Data
bookmarks.forEach((e) => {
// Get Name From Data
var name = e.name;

// Get URL From Data
var url = e.url;

// Put Data To OutPut
bookmarksResults.innerHTML +=
'<div class="well">' +
"<h3>" +name +

' <a class="btn btn-primary" target="_blank" href="' +url +'">Visit</a> ' +

" <a onclick=\"deleteBookmark('" +url +'\')" class="btn btn-danger" href="#">Delete</a> ' +

"</h3>";
("</div>");
});
}

// Validate Form Function
function validateForm(siteName,siteUrl) {
if (!siteName || !siteUrl) {
alert("Please Fill The Inputs");
return false;
}

var expression =
/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if (!siteUrl.match(regex)) {
alert("Please use a valid URL");
return false;
}
return true;
}
