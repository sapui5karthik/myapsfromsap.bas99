sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("com.prod.set.smarttablesapodataservices.controller.View1", {
            onInit: function () {
                this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            },
         
          
            onTableRowDelete : function(oArg){
             debugger;
           
               
                
            
            },//end of onTableRowDelete
            onSelectionChange : function(oevent){
              
                if(oevent.getParameters("selectionChange").selectAll){
                    
                    sap.m.MessageToast.show("All selected");
                    console.log("All Selected");
    
                    }
                    else {
                        if(oevent.getParameters("selectionChange").selected){
                        var pid = oevent.getSource().getSelectedContextPaths()[0].split("'")[1];
                        sap.m.MessageToast.show(pid);
                        console.log(pid);
                        //open fragment
                        if(!this.proddet){
                            this.proddet = sap.ui.xmlfragment(this.getView().getId(),"com.prod.set.smarttablesapodataservices.fragments.prodDetails",this);
                            this.getView().addDependent(this.proddet);
                        }
                        this.proddet.open();
                       
                        var proddetmodel = this.getOwnerComponent().getModel();
                        var prodjsonmodel = new JSONModel();
                        var filterprod = new Filter("ProductID",FilterOperator.EQ,pid)
                        proddetmodel.read("/ProductSet",{
                            filters : [filterprod],
                            success : function(req){ 
                                debugger;
                                
                                prodjsonmodel.setData(req.results[0]);
                                this.getView().setModel(prodjsonmodel,"prod");
                            }.bind(this),
                            error : function(msg){}.bind(this)
                        });


                        }

                }
            },//end of onSelectionChange
            _close : function(){
                this.proddet.close();
                
            },
            _gotoDetailView : function(oevent){
                this.oRouter.navTo("View2",{
                    from : "View1",
                    to : "View2"
                },true);
            },//end of _gotoDetailView
            onTableUpdateFinished : function(oevent){
               // debugger;
            },//end of onTableUpdateFinished
            _onUpdateStarted : function(oevent){
                //debugger;
            },//end of _onUpdateStarted

				
    
          
        });
    });
