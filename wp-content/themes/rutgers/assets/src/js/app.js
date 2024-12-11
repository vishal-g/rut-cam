jQuery(document).ready(function($) {
    // Open the search popup when the search icon is clicked
    $('.search-icon-btn').click(function() {
        $('#search-popup-modal').fadeIn();
    });

    // Close the popup when the close button is clicked
    $('#close-btn').click(function() {
        $('#search-popup-modal').fadeOut();
    });

    // Close the popup if the user clicks anywhere outside the modal
    // $(window).click(function(event) {
    //     if ($(event.target).is('#search-popup-modal')) {
    //         $('#search-popup-modal').fadeOut();
    //     }
    // });

    // Change search behavior based on radio button selection
    $('input[name="search-option"]').change(function() {
        var searchOption = $('input[name="search-option"]:checked').val();
        var actionUrl = '';

        if (searchOption === 'site') {
            actionUrl = '/'; 
        } else if (searchOption === 'rutgers') {
            actionUrl = 'https://search.rutgers.edu/websites';
        } else if (searchOption === 'people') {
            actionUrl = 'https://search.rutgers.edu/people.html'; 
        }

        $('#search-form').attr('action', actionUrl);
    });

    // Add a click event for the search button
    $('#search-btn').click(function(event) {
        event.preventDefault(); 
        var actionUrl = $('#search-form').attr('action'); 
        var searchParams = $('#search-form').serialize(); 
        window.open(actionUrl + '?' + searchParams, '_blank'); 
    });
});