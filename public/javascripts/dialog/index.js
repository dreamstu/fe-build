(function($){

  $.dialog = function(){
    var defualts = {
      id:'#msg',
      msg:'hello',
      ok:'确定',
      title:'提示',
      okcall:null
    };
    this.init = function(opts){
      this.settings = $.extend({},defualts,opts);
      this.dialog = $(this.settings.id);
      this.dialog.text = this.dialog.html();
    };
    return this;
  };

  $.dialog.prototype = {
    show:function(opts){
      var self = this;
      self.init(opts);
      self.setContent();
      if(self.settings.okcall && $.isFunction(self.settings.okcall)){
        self.setCallback();
      }
      self.dialog.modal();
    },
    setContent:function(){
     this.dialog.text = (this.dialog.text).replace(/\{msg\}/,this.settings.msg)
     .replace(/\{title\}/,this.settings.title)
     .replace(/\{ok\}/,this.settings.ok);
     this.dialog.html(this.dialog.text);
    },
    setCallback:function(){
      this.dialog.find('.J-ok').on('click',this.settings.okcall);
    }
  }

})(jQuery);
