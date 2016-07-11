"use strict";var APP_ID="v6NXqif5dwd7iq47oyoCNVkU-gzGzoHsz",APP_KEY="qEXpBbxzJt4qNhX2U01olVPi";AV.init({appId:APP_ID,appKey:APP_KEY});var Contacts=AV.Object.extend("Contacts");!function(e){Backbone.sync=function(e,n,a,t){a()};var n,a=Backbone.Model.extend({defaults:{name:"",phone:"",_id:"",createdAt:""}}),t=Backbone.View.extend({el:e("body"),events:{"click button.searchBtn":"search","change input#keywords":"search","keyup input#keywords":"search","click a#order":"order","click a#edite":"edite"},initialize:function(){_.bindAll(this,"render","search","order"),this.render(),this.orderBy=0},search:function(n){e(".contactsList div").remove(),n.preventDefault();var a=e("#keywords").val(),t=new AV.Query("Contacts"),t=new AV.Query("Contacts");t.contains("name",a);var i=new AV.Query("Contacts");i.contains("phone",a);var o=AV.Query.or(t,i);o.find().then(function(e){for(var n=0;n<e.length;n++){var a=e[n].get("name"),t=e[n].get("phone"),i=e[n].id,o=e[n].createdAt;r.creatOne(a,t,i,o)}},function(e){})},order:function(){this.orderBy=++this.orderBy%4,r.order(this.orderBy)},edite:function(){e(".del").toggleClass("hid"),e(".pencil").toggleClass("hid")},render:function(){e(".container").append('<div class="row clearfix"><div class="col-md-12 column"><nav class="navbar navbar-default" role="navigation"><div class="navbar-header"><button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button> <a class="navbar-brand" href="#">Mini通讯录</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"><form class="navbar-form navbar-left" role="search"><div class="form-group"><input id="keywords" class="form-control" type="text" /></div> <button class="btn btn-default searchBtn"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button></form><ul class="nav navbar-nav navbar-right"><li><a class="btn" id="modal-741673" role="button" href="#modal-container-741673" data-toggle="modal"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></a></li><li><a class="btn" id="order" role="button"><span class="glyphicon glyphicon-sort" aria-hidden="true"></span></a></li><li><a class="btn" id="edite" role="button"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></a></li></ul></div></nav></div></div>')}}),t=new t,i=Backbone.Collection.extend({model:a}),o=Backbone.View.extend({events:{"click span.change":"change","click span.del":"remove","click div.person":"show"},initialize:function(){_.bindAll(this,"render","unrender","change","remove","show"),this.model.bind("change",this.render),this.model.bind("remove",this.unrender)},show:function(){e(".del").addClass("hid"),e(".pencil").addClass("hid"),e(this.el).find(".del").toggleClass("hid"),e(this.el).find(".pencil").toggleClass("hid")},render:function(){return e(this.el).addClass("col-md-6"),e(this.el).html('<div class="person"><img class="img-responsive img-circle head"  src="../images/head.jpg" alt=""><h3 class="name">'+this.model.get("name")+'</h3><p class="phone">'+this.model.get("phone")+'</p><span class="del hid delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></span><span class="pencil hid change"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></span></div>'),this},unrender:function(){var n=this,a=this.model.get("_id"),t=AV.Object.createWithoutData("Contacts",a);t.destroy().then(function(a){e(n.el).remove()},function(e){})},change:function(){e("#changeModal").modal("toggle"),n=this},changed:function(){var n=this.model.get("_id"),a=this,t=e("#nameChanged").val(),i=e("#phoneChanged").val(),o=AV.Object.createWithoutData("Contacts",n);o.set({name:t,phone:i}),o.save().then(function(e){var n={name:e.get("name"),phone:e.get("phone")};a.model.set(n)},function(e){console.log(e)})},remove:function(){this.model.destroy()}}),s=Backbone.View.extend({el:e("body"),events:{"click button#add":"addItem"},initialize:function(){_.bindAll(this,"render","addItem","appendItem"),this.collection=new i,this.collection.bind("add",this.appendItem),this.counter=0,this.getAll(),this.render()},getAll:function(){var e=this,n=new AV.Query("Contacts");n.find().then(function(n){for(var a=0;a<n.length;a++){var t=n[a].get("name"),i=n[a].get("phone"),o=n[a].id,s=n[a].createdAt;e.creatOne(t,i,o,s)}},function(e){})},order:function(n){e(".contactsList div").remove();var a=this,t=new AV.Query("Contacts");switch(n){case 0:t.ascending("createdAt");break;case 1:t.descending("createdAt");break;case 2:t.ascending("name");break;case 3:t.descending("name")}t.find().then(function(e){for(var n=0;n<e.length;n++){var t=e[n].get("name"),i=e[n].get("phone"),o=e[n].id,s=e[n].createdAt;a.creatOne(t,i,o,s)}},function(e){})},creatOne:function(e,n,t,i){var o=this,s=new a;s.set({name:e,phone:n,_id:t,createdAt:i}),o.collection.add(s)},render:function(){var n=this;e(".container").append("<div class='contactsList row clearfix contacts'></div>"),_(this.collection.models).each(function(e){n.appendItem(e)},this)},addItem:function(){var n=this,a=e("#name").val(),t=e("#phone").val(),i=new Contacts;i.set("name",a),i.set("phone",t),i.set("priority",1),i.save().then(function(e){console.log("联系人:"+e.get("name")+"已储存!");var i=e.id,o=e.createdAt;n.creatOne(a,t,i,o)},function(e){console.log(e)})},appendItem:function(n){var a=new o({model:n});e(".contactsList",this.el).append(a.render().el)}}),r=new s,l=Backbone.View.extend({el:e("body"),events:{"click button#change":"change"},initialize:function(){_.bindAll(this,"render","change"),this.render()},change:function(){n.changed()},render:function(){e(".container").append('<div class="row clearfix"><div class="col-md-12 column"><div class="modal fade" id="changeModal" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button class="close" aria-hidden="true" type="button" data-dismiss="modal">×</button><h4 class="modal-title" id="myModalLabel">修改联系人</h4></div><div class="modal-body"><div class="row clearfix"><div class="col-md-12 column"><form role="form" id="changeForm"><div class="form-group"><label for="name">姓名</label><input class="form-control" id="nameChanged" name="changeName" type="text" /></div><div class="form-group"><label for="phone">电话号码</label><input class="form-control" id="phoneChanged" name="changePhone" type="text" /></div></form></div><button class="btn btn-success btn-block" id="change" type="button" data-dismiss="modal">保存</button></div></div></div></div></div></div></div>')}}),l=new l}(jQuery),$("#addForm").validate({errorElement:"span",errorClass:"help-block",focusInvalid:!1,rules:{name:{required:!0,minlength:2},phone:{required:!0,minlength:11}},messages:{name:{required:"请输入用户名",minlength:"用户名至少两个字符"},phone:{required:"请输入电话号码",minlength:"电话号码长度不能小于 11 个数字"}},highlight:function(e){$(e).closest(".form-group").addClass("has-error"),$(".btn-block").attr("disabled","disabled")},success:function(e){$(".btn-block").removeAttr("disabled"),e.closest(".form-group").removeClass("has-error"),e.remove()},errorPlacement:function(e,n){n.parent("div").append(e)}}),$("#changeForm").validate({errorElement:"span",errorClass:"help-block",focusInvalid:!1,rules:{changeName:{required:!0,minlength:2},changePhone:{required:!0,minlength:11}},messages:{changeName:{required:"请输入用户名",minlength:"用户名至少两个字符"},changePhone:{required:"请输入电话号码",minlength:"电话号码长度不能小于 11 个数字"}},highlight:function(e){$(e).closest(".form-group").addClass("has-error"),$(".btn-block").attr("disabled","disabled")},success:function(e){$(".btn-block").removeAttr("disabled"),e.closest(".form-group").removeClass("has-error"),e.remove()},errorPlacement:function(e,n){n.parent("div").append(e)}});