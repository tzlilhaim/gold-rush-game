Handlebars.registerHelper("isEquals", function (actual, expected) {
    return actual === expected
  })
  
  Handlebars.registerHelper("switch", function(value, options) {
      this._switch_value_ = value;
      var html = options.fn(this);
      delete this._switch_value_;
      return html;
  });
  
  Handlebars.registerHelper("case", function() {
      var args = Array.prototype.slice.call(arguments);
  
      var options    = args.pop();
      var caseValues = args;
  
      if (caseValues.indexOf(this._switch_value_) === -1) {
          return '';
      } else {
          return options.fn(this);
      }
  })