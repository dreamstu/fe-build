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
      this.dialog.text = $('#t_msg',this.dialog);
      this.dialog.title = $('.modal-title',this.dialog);
      this.dialog.okbtn = $('.J-ok',this.dialog);
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
     (this.dialog.text).html(this.settings.msg);
     (this.dialog.title).html(this.settings.title);
     (this.dialog.okbtn).html(this.settings.ok);
    },
    setCallback:function(){
      this.dialog.find('.J-ok').on('click',this.settings.okcall);
    }
  }

})(jQuery);
