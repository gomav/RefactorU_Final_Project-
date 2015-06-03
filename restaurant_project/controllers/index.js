var indexController = {
  index: function(req, res) {
    res.render('menu');
  },

  templates: function(req, res){
    res.render('templates/' + req.params.templateName);
  }
};

module.exports = indexController;
