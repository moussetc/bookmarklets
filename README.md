# A Bookmarklet for Goodreads

##What is a bookmarklet ?

A bookmarklet is a bookmark stored in a web browser that contains JavaScript commands that add new features to the browser.

##What is this bookmarklet for ?

This bookmarklet is to be used only on the website Goodreads.com.
Its purpose is to allow batch operations outside of the 'My Books' page, such as adding all books of a serie to a shelf in one click.
It is currently being developped so bugs are to be expected (feel free to write a message in the Issues!).

##How to use this bookmarklet ?

The following javascript script has to be added as a bookmark. It links to the actual code, hosted here on GitHub, [here](addSerieToShelf.js), so that the bookmark will always be up-to-date.
```
javascript:(function(){	var bookmarkletSource=document.createElement('SCRIPT');	bookmarkletSource.type='text/javascript';	bookmarkletSource.src='https://raw.githubusercontent.com/moussetc/bookmarklets/master/addSerieToShelf.js';	document.getElementsByTagName('head')[0].appendChild(bookmarkletSource);})();
```

##Who made this and why ?
As a freshly arrived user of Goodreads (on which I go by the username Petricorde), I have been surprised by the lack of  "batch-edit" actions on series pages. As I have had aching hands, wrists and arms when in front of a computer for the last few months, adding the numerous book I have read until now has proved to be a painful task, as physically as mentally. It was especially frustrating for series with a lot of books, so I decided to make my own code in order to make things a bit more efficient. And because it would be a shame to keep it to myself, I'm making it public here so that everyone that wants to can use it, at least until Goodreads add the functionality themselves !
