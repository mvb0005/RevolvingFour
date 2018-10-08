$(function () {
    var con = $.connection.gameHub;
    con.client.updateGame = function (message) {
        console.log(message);
    }
    $.connection.hub.start().done(function(){
        $('#btnChannel').click(function () {
            console.log()
            con.server.joinRoom($('#channel').val());
        });
        $('#btnBroadcast').click(function () {
            con.server.updateGame($('#channel').val(), $('#broadcast').val())
        })
    });
});