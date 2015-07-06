Router.configure({
  layoutTemplate: 'app'
});

Router.route('/channel/:channel', function () {
    Session.setPersistent('channel', this.params.channel);
    this.render('room');
});

Router.route('/', function () {
    this.redirect('/channel/general');
});
