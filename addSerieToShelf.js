/*****************************************************************************************************************************/
/************************************************* BOOKMARKLET FOR GOODREADS *************************************************/
/*** How to use a bookmarklet : see README file at root of the folder                                                      ***/
/*** Purpose : clicking on the bookmarklet adds all the books of a serie that are present on the current page to a shelf   ***/
/***           selected by the user.                                                                                       ***/
/*** State : barely functional                       																	   ***/
/*****************************************************************************************************************************/

/* TODO :
 - addWholeSerieToShelf function works but lacks correct error handling (when book not added to shelf, if shelf doesn't exist,
 if we're not on a serie page, if there are no books to add, etc.)
  - retry once or twice if request failed
  - have something indicate that work is being done
 - add comments!!
 - possibility of batch editing the serie's books, with checkbox for detail selecting and select all/invert selection
 - adding several buttons on the top of the books list so that people can choose what they wanna do
 - make into firefox plugin ?
*/
javascript: (function () { 
	function petriGetShelf(){
		return jQuery("#petri-shelf").val();
	}

	function petriAddAll() {
		var shelf_name = petriGetShelf();
		if (!shelf_name) return;
		var books = jQuery("td .hiddenShelfForm #book_id");
		var nb_books = books.length;
		var nb_success = 0;
		var nb_failures = 0;

		jQuery.each(books,
			function(index, value) {
				var book_id = jQuery(value).val();

				doTheAjaxMajic(book_id, shelf_name, "",
					function(request) {
						nb_success++;
						if (nb_success + nb_failures == nb_books) {
							alert(nb_success + "/" + nb_books + " books were successfully added to " + shelf_name + " shelf !");
						}
					},
					function(request) {
						nb_failures++;
						if (nb_success + nb_failures == nb_books) {
							alert(nb_success + "/" + nb_books + " books were successfully added to " + shelf_name + " shelf !");
						}
					}
				);
			}
		);
	}
	
	function petriRemoveAll() {
		var shelf_name = petriGetShelf();
		if (!shelf_name) return;
		var books = jQuery("td .hiddenShelfForm #book_id");
		var nb_books = books.length;
		var nb_success = 0;
		var nb_failures = 0;

		jQuery.each(books,
			function(index, value) {
				var book_id = jQuery(value).val();

				doTheAjaxMajic(book_id, shelf_name, "remove",
					function(request) {
						nb_success++;
						if (nb_success + nb_failures == nb_books) {
							alert(nb_success + "/" + nb_books + " books were removed from " + shelf_name + " shelf !");
						}
					},
					function(request) {
						nb_failures++;
						if (nb_success + nb_failures == nb_books) {
							alert(nb_success + "/" + nb_books + " books were removed from " + shelf_name + " shelf !");
						}
					}
				);
			}
		);
	}

	function doTheAjaxMajic(book_id, shelf_name, action, onSuccess, onFailure) {
		new Ajax.Request('/shelf/add_to_shelf', {
					asynchronous: true,
					evalScripts: true,
					onSuccess: onSuccess,
					onFailure: onFailure,
					parameters: 'book_id=' + book_id + '&name=' + shelf_name + '&a='+action+'&authenticity_token=' + encodeURIComponent(jQuery("[name='authenticity_token']").val())
				});
	}
	
	if (jQuery("#petri-batchEdit").length === 0) {
		// On récupère la liste des étagères
		var shelves = jQuery.map(jQuery('.wtrShelfList li'), function(value) {
			return jQuery(value).data('shelf-name');
		});

		// On ajoute la zone de "batch-edit" au-dessus de la liste des livres
		var html = '   <div id="petri-batchEdit" style="margin-bottom:10px;background:#F1F1E4;padding:5px;border: 1px solid #CCC9B5;">';
		html 	+= '      <div>';
		html 	+= '          <label for"shelf" style="margin-right:5px">Shelf: ';
		html 	+= '          <select name="shelf" id="petri-shelf">';
		for (var i = 0, l = shelves.length; i < l; i++) {
		   html += '				  <option value="' + shelves[i] + '">' + shelves[i] + '</option>';
		}
		html 	+= '          </select></label>';
		html 	+= '          <a type="button" id="petriAddAllButton" href="#" class="actionLink" style="margin-right:10px">Add all books to shelf</a>';
		html 	+= '          <a type="button" id="petriRemoveAllButton" href="#" class="actionLink">Remove all books from shelf</a>';
		html 	+= '      </div>';
		html 	+= '   </div>';

		jQuery("table.tableList").before(html);
		jQuery("#petriAddAllButton").click(petriAddAll);
		jQuery("#petriRemoveAllButton").click(petriRemoveAll);
	}

}());
