/*****************************************************************************************************************************/
/************************************************* BOOKMARKLET FOR GOODREADS *************************************************/
/*** How to use a bookmarklet : see README file at root of the folder                                                      ***/
/*** Purpose : clicking on the bookmarklet adds all the books of a serie that are present on the current page to a shelf   ***/
/***           selected by the user.                                                                                       ***/
/*** State : not yet functional (                      ***/
/*****************************************************************************************************************************/

/* TODO :
 - addWholeSerieToShelf function works but lacks correct error handling (when book not added to shelf, if shelf doesn't exist,
 if we're not on a serie page, if there are no books to add, etc.)
 - shelf selection : to be done without jQuery.dialog
 - add comments!!
 - possibility of batch editing the serie's books, with checkbox for detail selecting and select all/invert selection
 - adding several buttons on the top of the books list so that people can choose what they wanna do
 - make into firefox plugin ?
*/

function addWholeSerieToShelf(shelf_name) {
    var books = jQuery("td .hiddenShelfForm #book_id");
    var nb_books = books.length;
    var nb_success = 0;
    var nb_failures = 0;

    jQuery.each(books,
        function(index, value) {
            var book_id = jQuery(value).val();

            new Ajax.Request('/shelf/add_to_shelf', {
                asynchronous: true,
                evalScripts: true,
                onSuccess: function(request) {
                    nb_success++;
                    if (nb_success + nb_failures == nb_books) {
                        alert(nb_success + "/" + nb_books + " books were successfully added to " + shelf_name + " shelf !");
                    }
                },
                onFailure: function(request) {
                    nb_failures++;
                    if (nb_success + nb_failures == nb_books) {
                        alert(nb_success + "/" + nb_books + " books were successfully added to " + shelf_name + " shelf !");
                    }
                },
                parameters: 'book_id=' + book_id + '&name=' + shelf_name + '&a=' + "" + '&authenticity_token=' + encodeURIComponent(jQuery("[name='authenticity_token']").val())
            });
        }
    );
}


//TODO à faire marcher sans utiliser jQuery.dialog (non disponible)
function selectShelf() {
    // On récupère la liste des étagères
    var shelves = jQuery.map(jQuery('.wtrShelfList li'), function(value) {
        return jQuery(value).data('shelf-name');
    });

    var html = '   <div id="dialog-select-shelf" title="Choisir une étagère" >';
    html += '    <form>';
    html += '         <label for"shelf">Shelf</label>';
    html += '            <select name="shelf" id="shelf">';
    for (var i = 0, l = shelves.length; i < l; i++) {
        html += '<option value="' + shelves[i] + '">' + shelves[i] + '</option>';
    }
    html += '           </select>';
    html += '    </form>';
    html += '</div>';

    jQuery("body").append(html);

    var dialog = jQuery("#dialog-select-shelf").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Add all serie books to shelf": function() {
                addWholeSerieToShelf($("#dialog-form #shelf").val());
            },
            Cancel: function() {
                dialog.dialog("close");
            }
        }
    });
}
