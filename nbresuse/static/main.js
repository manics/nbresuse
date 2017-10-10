define(['jquery', 'base/js/utils'], function ($, utils) {
    function createDisplayDiv() {
            var nbresuse = $('<div>').attr('id', 'nbresuse-display')
                      .addClass('btn-group')
                      .addClass('pull-right');
            nbresuse.append(
                $('<strong>').text('Mem: ')
            ).append(
                $('<span>').attr('id', 'nbresuse-mem')
                           .attr('title', 'Actively used Memory (updates every 5s)')
            );
            nbresuse.append(
                $('<strong>').text(' CPU: ')
            ).append(
                $('<span>').attr('id', 'nbresuse-cpu')
                           .attr('title', 'CPU (updates every 5s)')
            );
            $('#maintoolbar-container').append(nbresuse);
    }

    var displayMetrics = function() {
        $.getJSON(utils.get_body_data('baseUrl') + 'metrics', function(data) {
            // FIXME: Proper setups for MB and GB. MB should have 0 things
            // after the ., but GB should have 2.
            var display = Math.round(data['rss'] / (1024 * 1024)) + " MB";
            var cpudisplay = Math.round(data['cpu']) + " %";

            if (data['limits']['memory'] !== null) {
                display += " / " + (data['limits']['memory'] / (1024 * 1024));
            }
            $('#nbresuse-mem').text(display);
            $('#nbresuse-cpu').text(cpudisplay);
        });
    }

    var load_ipython_extension = function () {
        createDisplayDiv();
        displayMetrics();
        // Update every five seconds, eh?
        setInterval(displayMetrics, 1000 * 5);
    };

    return {
        load_ipython_extension: load_ipython_extension,
    };
});
