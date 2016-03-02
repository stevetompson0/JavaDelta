//replace ' by " and JSON.parse()
//Never change the variable object itself!!!, Use deepcopy everytime the program needs to change the content

var jsonContent = {}, currentStat;//statement_XXX
var glbFlags = {"u" :0, "n": 1, "c": 2};

//using highlight will not be overwritten by later css, so we do not use highlight
var indexColor = "rgb(255, 163, 163)",
    nColor = "rgb(217, 255, 178)",
    cColor = "rgb(255, 255, 162)",
    bColor = "red",
    edgeColor = "rgb(255, 102, 255)",
    matrixHeaderColor = "rgb(152,152,152)",
    uColor = "white";

var graphColor = {
    "RED": "rgb(217, 137, 137)",
    "BLUE": "rgb(138, 138, 230)",
    "GRAY": "rgb(204, 204, 204)",
    "WHITE": "rgb(255, 255, 255)",
    "YELLOW": "rgb(255, 255, 153)",
    "GREEN": "rgb(162, 243, 162)",
    "BLACK": "rgb(0, 0, 0)"
};

var DATATYPES = ["Idict", "Ilist", "Stack", "Queue", "LinkedList", "Matrix", "StringMatrix", "set", "tuple", "Graph",
        "DiGraph", "BinarySearchTree", "AVLTree", "RBTree", "BinaryMinHeap", "MinPriorityQueue", "DisjointSet",
        "int", "str", "bool", "float", "NoneType"],
    OBJTYPES = ["Idict", "Ilist", "Stack", "Queue", "LinkedList", "Matrix", "StringMatrix", "set", "tuple", "Graph",
        "DiGraph", "BinarySearchTree", "AVLTree", "RBTree", "BinaryMinHeap", "MinPriorityQueue", "DisjointSet"];

var av;
var jsavObjDict = {}; // key: depth, value: dict (key: name, value: jsav object)
var current_content, current_line;
var glbpointerList = [];//we need to update the pointer's position everytime, since hide() will cause mismatch between pointer and objects
var glbpointerParamList = [];//store all the necessary parameter to construct the pointer
var avDepthDict = {}; //depth_1 : av1 ....
var divDepthList = [];//div element of each layer
var container; //container is the most outer div that contains all the layers

/***************************************For Local Browser testing purpose**************************/
// var jsonPath= 'output.json';

// $(document).ready(

//     function(){
//         $.getJSON(jsonPath, function(data){
//             jsonContent = data;

//         });
//     }
//  );

function vizJSAV(divID,data){
   jsonContent = data;
   container = $("#"+divID);
}
/***************************************End of testing********************************************/


// function vizJSAV(divID, jsonObj){
//     jsonContent = jsonObj;
//     container = $("#"+divID);
// //    av = new JSAV(document.getElementById(divID));
// }



vizJSAV.prototype.animate = function(statementNo){
    var statementLabel ="statement_"+statementNo;
    currentStat = statementLabel;
    if (!(statementLabel in jsonContent)){
        return;// out of statement range
    }

    var depthList = jsonContent[statementLabel]["vars"];
    current_content = jsonContent[statementLabel]["current_content"];
    current_line = jsonContent[statementLabel]["current_line"];

    glbpointerParamList = []; //empty the list
    //hide and clear the pointer list
    for (var i=0; i<glbpointerList.length; i++){
        glbpointerList[i].hide();
    }
    glbpointerList = [];

    var nameDict = {};

    //Load all the variable name for this statement
    for (var depth in depthList){
        var varList = [];

        var variableList = depthList[depth];
        for (var i=0; i<variableList.length; i++){
            var varName = variableList[i].name,
                varType = variableList[i].type;
                varList.push(varName);
        }
        nameDict[depth] = varList;
    }

    //pre-checking, clear the jsavobj that no longer exist in JSON
    for (var depth in jsavObjDict){
        for (var key in jsavObjDict[depth]){
            if (!(depth in nameDict)){ //depth no longer exist in current statement, just remove the element inside is fine, no need to delete the key itself
                for (var i=0; i<jsavObjDict[depth][key].length; i++){
                    if (jsavObjDict[depth][key][i] != null){
                        jsavObjDict[depth][key][i].hide();
                    }
                }
                delete jsavObjDict[depth][key];
            }else{ //current statement has the corresponding depth
                if (nameDict[depth].indexOf(key) == -1){ // this variable no longer exist in this depth
                    for (var i=0; i<jsavObjDict[depth][key].length; i++){
                        if (jsavObjDict[depth][key][i] != null){
                            jsavObjDict[depth][key][i].hide();
                        }
                    }
                    delete jsavObjDict[depth][key];
                }
            }
        }
    }

    //create or hide layer
    var preLayerCount = divDepthList.length,
       curLayerCount = Object.keys(depthList).length;

    //remove layer
    if (preLayerCount > curLayerCount){
        for (var i = curLayerCount; i < preLayerCount; i++) {
            delete avDepthDict["depth_"+(i+1)];
            divDepthList[i].remove();//hide the div element
        }
        //remove the element
        divDepthList.splice(curLayerCount, preLayerCount-curLayerCount);
    }
    //add layer
    if (preLayerCount < curLayerCount) {
        for (var i = preLayerCount; i < curLayerCount; i++) {
            var layer = $("<div id='layer"+(i+1)+"' class='graphlayer'><span>layer for function call depth: "+(i+1)+"</span></div>");
            container.append(layer);
            var avObj = new JSAV(layer);

            avDepthDict["depth_" + (i + 1)] = avObj;
            divDepthList[i] = layer;

        }
    }

    //reset the width of layer div
    var containerWidth = container.width()
        padding = 10, //padding-left:30, padding-right: 30, otherwise pointer may be out of border
        singleLayerWidth = (containerWidth-(2*padding*curLayerCount))/curLayerCount;
    $(".graphlayer").css("width", singleLayerWidth);
    $(".graphlayer").css("padding-left", padding);
    $(".graphlayer").css("padding-right", padding);

    //start plotting the new variables
    for (var depth in depthList){
        //if jsavObjDict does not have this depth, add it
        if (!(depth in jsavObjDict)){
            jsavObjDict[depth] = {};
        }

        var variableList = depthList[depth];
        for (var j=0; j<variableList.length; j++){
             var variable = variableList[j];
             if (variable != null){
                 var varName = variable.name;
                 /*
                    Condition 1:
                    for i ....
                        for j....
                            i ....
                            here i varFlag is 0, we need to add !(varName in jsavObjDict[depth]) to make sure variables are printed
                    Condition 2:
                        Refresh the color: for example b = [1,2] b[0] =1, b varFlag is 0, but index may changed.
                    Condition 3:
                        for new statement, we need to clear the color

                    Solution:
                    1. if variable not in dict, plot it even varFlag is 0.
                    2. if varFlag is 0, refresh the index and flags
                    3. For pointer, refresh the object it points to and refresh the pointer everytime since the jsavobj may be removed.

                  */
                 var varPointer = variable.pointer;
                 av = avDepthDict[depth];

                 //if ((varPointer != null && varPointer.length != 0) || variable.varFlag != glbFlags["u"] || !(varName in jsavObjDict[depth])){ //u means not changed, we do not need to draw it again
                    var jsavObjList = this.plotVar(variable, depth);
                    jsavObjDict[depth][varName] = jsavObjList;
                 //}else{
                 //   this.refreshFlag(variable, depth);
                 //}
             }
         }
    }

    //[variable.name, pointerObj, opts, className, depth_belongs to(depth_xxx), targetName], add pointer in the last, avoid updating pointer position when target is moved
    for (var i=0; i<glbpointerParamList.length; i++){
        //refresh the pointer position
        if (glbpointerParamList[i][3] == "myObjPointer"){ //object pointer, we do not add svg path, just change the label
            //glbpointerParamList.push([variable.name, labelObj, opts, className, "depth_"+depthNo, pointerName]);
            //opts = {"depth": depth, "index": pointerIndex};
            var pointerIndex = glbpointerParamList[i][2]["index"],
                pointerDepth = glbpointerParamList[i][2]["depth"];
            var message = glbpointerParamList[i][1].text();
            message += " <- " + pointerDepth + ":" + glbpointerParamList[i][0];
            if (pointerIndex != null && pointerIndex.length !=0){
                message += ", index: "+ pointerIndex
            }

            glbpointerParamList[i][1].text(message);
        }else{
            var tempPointer = avDepthDict[glbpointerParamList[i][4]].pointer(glbpointerParamList[i][0], glbpointerParamList[i][1], glbpointerParamList[i][2]);
            tempPointer.addClass(glbpointerParamList[i][3]);
            glbpointerList.push(tempPointer);
        }

    }

}

/***************************************Plot one variable********************************************/

//find the matching object inside jsavObjDict, return the depth that varName is in
//return the depthNo instead of object for the div split usage
// varName -> pointerName
function findObj(varName, pointerName, depth){
    /*
        !!!important!!!
        Find the first matching pointerName which is not a pointer
     */
    //get depth number
    var depthNo = depth.match(/\d+/)[0];
    var depthStr;
    if (isNaN(depthNo)){
        return -1;
    }

    //since pointerobj in jsavObjDict is null, we can judge whether it is a pointer based on this
    for (var i=depthNo; i >0; i--){
        depthStr = "depth_" + i;
        if (pointerName in jsavObjDict[depthStr] &&
            ((pointerName == varName && i != depthNo) || (pointerName != varName))){
            if (jsavObjDict[depthStr][pointerName][0] == null){
                continue;
            }
            return i;
        }
    }
    return -1;
}
/*
    @param pointerList: [pointerName, index], second element could be null
    @param depth
 */
vizJSAV.prototype.addPointer = function(variable, depth) {
    var pointerList = variable.pointer,
        varName = variable.name;
    var pointerName = pointerList[0],
        pointerIndex = pointerList[1]; //list

    var depthNo = findObj(varName, pointerName, depth);

    if (depthNo != -1) {
        if (jsavObjDict["depth_"+depthNo][pointerName].length == 0){
            return null;
        }
        var pointerObj = jsavObjDict["depth_"+depthNo][pointerName][0],
            labelObj = jsavObjDict["depth_"+depthNo][pointerName][1];

        //get target variable
        var variableList = jsonContent[currentStat]["vars"]["depth_" + depthNo];
        var pointerVar;
        for (var j = 0; j < variableList.length; j++) {
            var pointerVariable = variableList[j];
            if (pointerVariable.name == pointerName) {
                pointerVar = pointerVariable;
            }
        }

        if (variable.varFlag != glbFlags["u"]){
            if (pointerObj != null) {
                pointerObj.hide();
            }
            if (labelObj != null) {
                labelObj.hide();
            }

            //only update if variable's index exist, avoiding overwriting target's index during refreshing
            if (pointerIndex != null && pointerIndex.length != 0){
                pointerVar.index = pointerIndex;
            }
            if (variable.index != null && variable.index.length != 0) { //this has a higher priority than the up one
                pointerVar.index = variable.index;// since pointer's index may not be updated
            }

            var currentAv = av;
            av = avDepthDict["depth_"+depthNo];

            jsavObjDict["depth_" + depthNo][pointerName] = this.plotVar(pointerVar, "depth_" + depthNo);

            av = currentAv;

            pointerObj = jsavObjDict["depth_" + depthNo][pointerName][0];
            labelObj = jsavObjDict["depth_" + depthNo][pointerName][1];

            //update current glbpointerParamList, because the pointerVar is changed, if two pointer point to the same obj, previous one's target is not wrong
            for (var i=0; i<glbpointerParamList.length; i++){
                if (glbpointerParamList[i][4] == "depth_"+depthNo && glbpointerParamList[i][5] == pointerName){
                    if (glbpointerParamList[i][3] == "myObjPointer") {
                        glbpointerParamList[i][1] = labelObj;
                    }else{
                        glbpointerParamList[i][1] = pointerObj;
                        glbpointerParamList[i][2]["anchor"] = "right top";//avoid overlapping
                    }
                }
            }

        }else{
            //only update if variable's index exist, avoiding overwriting target's index during refreshing
            if (pointerIndex != null && pointerIndex.length != 0){
                pointerVar.index = pointerIndex;
            }
            if (variable.index != null && variable.index.length != 0) { //this has a higher priority than the up one
                pointerVar.index = variable.index;// since pointer's index may not be updated
            }
            this.refreshFlag(pointerVar, "depth_" + depthNo);
        }

        var pointer, index = parseInt(pointerIndex), opts= {}, className; //TODO, parseInt only get the first index of pointerIndex array, a = [1,2], parseInt(a) = 1, currently we only support 1D, so it is ok

        //for dictionary, we can not simply parseInt to get the pointerIndex
        if (pointerVar.type == "Idict" || pointerVar.type == "dict"){
            //dict is implemented by matrix, but pointer does not support targetindex for matrix now, leave it here
            //TODO: future improvelement, change dict to linkedlist
        }
        var listType = ["Ilist", "list", "Stack", "Queue", "set", "tuple"];
        if (isNaN(index) || listType.indexOf(pointerVar.type) == -1) {
            if(listType.indexOf(pointerVar.type) == -1){
                pointerName += "["+index+"]";
            }

            //if index is not specified, it will point to the middle
            //opts = {"anchor": "left top", "myAnchor": "right bottom","left": -15, "top": -10};
            opts = {"depth": depth, "index": pointerIndex};
            className = "myObjPointer";

            //store in list, add at last in one go
            //..............................0.............1.......2........3..........4.................5
            glbpointerParamList.push([variable.name, labelObj, opts, className, "depth_"+depthNo, pointerName]);
        }else{
            //opts = {"targetIndex": index, "anchor": "center top", "myAnchor": "center bottom", "left": -20, "top": -10};
            opts = {"targetIndex": index, "anchor": "left top", "myAnchor": "center bottom"}; //TODO jquery 1.9.1 or above does not support this left. top, so we just use anchor here, to be fixed in the future
//            pointer = av.pointer(variable.name, pointerObj, opts);
//            pointer.addClass("myIndexPointer");
            className = "myIndexPointer";

            //store in list, add at last in one go
            //..............................0.............1.......2........3..........4.................5
            glbpointerParamList.push([variable.name, pointerObj, opts, className, "depth_"+depthNo, pointerName]);
        }

//        return pointer;
        return null;
    }
    return null;
}
/*
eg:  ['"a"'] -> a, because index has quotes inside brackets
 */
//function trimQuotes(str){
//    return str.substr(1,str.length-2).replace(/\"/g, "").replace(/\'/g, "");
//}

//function removeEmptyElementFromArray(array){
//    for (var i =array.length-1; i>=0; i--){
//        if (array[i]=='')
//            array.splice(i,1);
//    }
//}

//[x, y, r, s, t, "u", [1,2], v, w] -> 2D array
//recursion!!!
//use comma as the delimiter
//TODO: can not handle list and dictionary combination, currently, it is ok.
function strToArray(str){
    var result = [];

    if (str[0] != "[" || str.slice(-1) != "]"){
        return null;
    }

    for(var i=1; i<str.length-1; i++){
        switch (str[i]){
            case '[':
                //Read until next "]"
                var optStack = ['['], token = "[";
                i++;
                while(optStack.length != 0){
                    if (i >= str.length -1){
                        return null;
                    }
                    if (str[i] == "["){
                        optStack.push(optStack);
                    }else if(str[i] == "]"){
                        optStack.pop();
                    }
                    token += str[i++];
                }
                result.push(strToArray(token));
                //reset i
                i--;
                break;
            case ']':
                return null;
            default:
                var token = "";
                while(str[i] != '[' && str[i] != ']' && str[i] != "," && i<str.length-1){
                    token += str[i++];
                }
                result.push(token.trim());
                //reset i
                if (str[i] != ","){
                    i--;
                }
                break;
        }
    }
    return result;
}


//{'a': [1,2], 'b': 2, c: {'a': 1, 'b': 2}} -> 2D dict
//recursion!!!
//use comma as the delimiter
//TODO: Currently only handle 1D dictionary
function strToDict(str){
    /*  currently, add quotes to all keys and values.
        JSON.parse will raise error if key is not recognized as string, so we need to add quotes
    */
    str = str.replace(/\'/g, "\"");
    //TODO, not finished. Now we change the jsoncontent from compiler, which we could avoid this conversion

}

vizJSAV.prototype.setCSSByClass=function(objclass,cssStr){
    var objs = document.getElementsByClassName(objclass);
    for (var i=0; i<objs.length;i++){
        objs[i].css(cssStr);    
    }
}

//indices is a list of elements to be highligted[1.2,3]
vizJSAV.prototype.arrayHighlight=function(array, indices){
    array.highlight(indices);
}
vizJSAV.prototype.arrayUnhighlight=function(array, indices){
    array.unhighlight(indices);
}
vizJSAV.prototype.linkedListHighlight=function(linkedList, index){
    linkedList.get(index).highlight();
}
vizJSAV.prototype.linkedListUnhighlight=function(linkedList, index){
    linkedList.get(index).unhighlight();
}


/*
    refresh flags and index highlights,
    depth: depth_xxx
 */
vizJSAV.prototype.refreshFlag = function(variable, depth){
    //Assume varFlag is 0 and in jsavObjDict
    var varName = variable.name,
        varType = variable.type,
        varFlag = variable.varFlag,
        varPointer = variable.pointer;
    var avVar;
    if (jsavObjDict[depth][varName] == null || jsavObjDict[depth][varName].length == 0){
        return;
    }

    avVar = jsavObjDict[depth][varName][0]; //0 is jsavObj, index 1 is label object

    //if it is pointer, not need to refresh
    if (varPointer != null && varPointer.length != 0){
        //refresh the position
        return;
    }

    switch (varType){
        case "int": case "str": case "bool":case "float":case "NoneType":
            //Need to redraw it!!! even varFlag is 0, value may changed
            /*
            for i ..
                for j....
                    i ,j here value changed, but flag is 0
             */
            avVar.hide();
            varValue = variable.value;
            var statusStr = varType + "(" + varName.trim() +"): " + varValue;
            avVar = av.code(statusStr, {lineNumbers: false});
            if (varFlag == glbFlags["c"]){
                avVar.css(0, {"background-color": cColor});
            }else if(varFlag == glbFlags["n"]){
                avVar.css(0, {"background-color": nColor});
            }else{
                avVar.css(0, {"background-color":  uColor}); //empty the color
            }
            avVar.addClass("primitive");
            jsavObjDict[depth][varName][0] = avVar;
            break;
        case "Idict":case "dict":
            this.clearDictFlags(avVar, variable);
            break;
        case "Ilist":case "list": case "set":case "tuple":case "Stack":case "Queue":
            this.clearListFlags(avVar, variable);
            break;
        case "LinkedList":
            this.clearLinkedListFlags(avVar, variable);
            break;
        case "Matrix":
            this.clearMatrixFlags(avVar, variable);
            break;
        case "StringMatrix":
            this.clearStringMatrixFlags(avVar, variable);
            break;
        case "Graph":case "DiGraph":
            //no flags and index
            break;
        case "RBTree":
            break;
        case "BinarySearchTree":case "AVLTree":
            this.clearBTreeFlags(avVar, variable);
            break;
        case "BinaryMinHeap":case "MinPriorityQueue":
            this.clearHeapFlags(avVar, variable);
            break;
        case "DisjointSet":
            this.clearDisjoinSetFlags(avVar, variable);
            break;
        case "None":
            break;
        default:
            avVar.hide();
            varValue = variable.value;
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else {
                var statusStr;
                if (varType != null) {
                    statusStr = varType + "(" + varName.trim() + "): " + varValue;
                } else {
                    statusStr = varName.trim() + ": " + varValue;
                }
                avVar = av.code(statusStr, {lineNumbers: false});
                if (varFlag == glbFlags["c"]) {
                    avVar.css(0, {"background-color": cColor});
                } else if (varFlag == glbFlags["n"]) {
                    avVar.css(0, {"background-color": nColor});
                } else {
                    avVar.css(0, {"background-color": uColor});
                }
                avVar.addClass("Others");
            }
            jsavObjDict[depth][varName][0] = avVar;
            break;
    }
}

/*
    return: [jsav data structure object/Pointer, jsav label object] label object may be null
    depth: depth_xxx
 */
vizJSAV.prototype.plotVar = function(variable, depth){

    //varFlags could be null or 1 or 2
    var varType = variable.type,
        varName = variable.name,
        varFlag = variable.varFlag,//maybe null for function return
        varValue,
        avVar,
        avLabel,
        avVarList = jsavObjDict[depth][varName];


    //TODO: in the future, we will not create new JSAV objects if varFlag is 2, just change the contents based on flags.
    if (avVarList != null){
        for (var i=0; i<avVarList.length; i++){
            if (avVarList[i] != null){
                avVarList[i].hide();
            }
        }
    }


    //If type is None, ignore. (None is not NoneType)
    switch (varType){
        case "int": case "str": case "bool":case "float":case "NoneType":
            varValue = variable.value;
            var statusStr = varType + "(" + varName.trim() +"): " + varValue;
            avVar = av.code(statusStr, {lineNumbers: false});
            if (varFlag == glbFlags["c"]){
                avVar.css(0, {"background-color": cColor});
            }else if(varFlag == glbFlags["n"]){
                avVar.css(0, {"background-color": nColor});
            }
            avVar.addClass("primitive");
            break;

        case "Idict":case "dict": //TODO: use 2D linkedlist for visualization
            //TODO Check pointer and varFlag first
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else{
                avLabel = av.label(variable.name);
                avVar = this.parseDict(variable);
                avVar.addClass("Idict");
            }
            break;
        case "Ilist":case "Array": case "set":case "tuple": //TODO: Support 2D array
            //TODO Check pointer and varFlag first
            var varPointer = variable.pointer;
            if (varPointer != "None" && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else{
                avLabel = av.label(variable.name);
                avVar= this.parseList(variable, {});
                avVar.addClass("Ilist");
    //            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "Stack":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else {
                avLabel = av.label(variable.name);
                avVar = this.parseList(variable, {layout: "vertical", indexed: true});
                avVar.addClass("Stack");
//            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "Queue":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else{
                avLabel = av.label(variable.name);
                avVar= this.parseList(variable, {indexed: true});
                avVar.addClass("Queue");
    //            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "LinkedList":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else{
                avLabel = av.label(variable.name);
                avVar= this.parseLinkedList(variable);
                avVar.addClass("LinkedList");
    //            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "Matrix":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else{
                avLabel = av.label(variable.name);
                avVar= this.parseMatrix(variable);
                avVar.addClass("Matrix");
    //            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "StringMatrix":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth)
            }else{
                avLabel = av.label(variable.name);
                avVar= this.parseStringMatrix(variable);
                avVar.addClass("StringMatrix");
    //            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "Graph":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else {
                avLabel = av.label(variable.name);
                avVar = this.parseGraph(variable, {layout: "layered"});
                avVar.addClass("Graph");
//            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "DiGraph":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else {
                avLabel = av.label(variable.name);
                avVar = this.parseGraph(variable, {directed: true, layout: "layered"});
                avVar.addClass("DiGraph");
//            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "BinarySearchTree":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else {
                avLabel = av.label(variable.name);
                avVar = this.parseBTree(variable, "BinarySearchTree");
                avVar.addClass("BinarySearchTree");
//            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "AVLTree":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else {
                avLabel = av.label(variable.name);
                avVar = this.parseBTree(variable, "AVLTree");
                avVar.addClass("AVLTree");
//            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "RBTree":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else {
                avLabel = av.label(variable.name);
                avVar = this.parseBTree(variable, "RBTree");
                avVar.addClass("RBTree");
//            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "BinaryMinHeap":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else {
                avLabel = av.label(variable.name);
                avVar = this.parseHeap(variable);
                avVar.addClass("BinaryMinHeap");
//            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "MinPriorityQueue":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else {
                avLabel = av.label(variable.name);
                avVar = this.parseHeap(variable);
                avVar.addClass("MinPriorityQueue");
//            avLabel = labelPointer(variable.name, avVar);
            }
            break;
        case "DisjointSet":
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else {
                avLabel = av.label(variable.name);
                avVar = this.parseDisjointSet(variable);
                avVar.addClass("DisjointSet");
//            avLabel = labelPointer(variable.name, avVar);
            }
            break;

        case "None":
            break;
        default:
            varValue = variable.value;
            var varPointer = variable.pointer;
            if (varPointer != null && varPointer.length > 0){
                avVar = this.addPointer(variable, depth);
            }else {
                var statusStr;
                if (varType != null) {
                    statusStr = varType + "(" + varName.trim() + "): " + varValue;
                } else {
                    statusStr = varName.trim() + ": " + varValue;
                }
                avVar = av.code(statusStr, {lineNumbers: false});
                if (varFlag == glbFlags["c"]) {
                    avVar.css(0, {"background-color": cColor});
                } else if (varFlag == glbFlags["n"]) {
                    avVar.css(0, {"background-color": nColor});
                } else {
                    avVar.css(0, {"background-color": uColor});
                }
                avVar.addClass("Others");
            }
            break;
    }
    return [avVar, avLabel];
}

//pointer for variable labels, not used
function labelPointer(name, jsavObj) {
    var pointer = av.pointer(name, jsavObj);
    return pointer;
}

//TODO: parseList can invoke this function, code reuse!!!
vizJSAV.prototype.clearListFlags = function (avVar, variable) {
    var flagsList = variable.flags,
        varIndex = variable.index;

    //Highlight index and changed elements
    if (flagsList != null){ //tuple and set do not have flags
        for (var i = 0; i < flagsList.length; i++) {
            //only highlight when value changed
            if (flagsList[i] == glbFlags['c']) { // "2" == 2 true
                avVar.css(i, {"background-color": cColor});
            } else if (flagsList[i] == glbFlags['n']) {
                avVar.css(i, {"background-color": nColor});
            }else{
                avVar.css(i, {"background-color":  uColor});
            }
        }
    }

    if (varIndex != null && varIndex.length != 0){
        var index = parseInt(varIndex[0]);
        avVar.css(index, {"background-color": indexColor});
    }

}
vizJSAV.prototype.parseList=function(variable, options) {
    var valueList = variable.value,
        varIndex = variable.index,//an array with string index, TODO currently assume the length is 1, in other words, 1D list
        flagsList = variable.flags;

    var avVar = av.ds.array(valueList, options);//TODO: to support multi-dimensional array, split based on brackets stack is needed.Changes on compiler flags array is also required.

    //Highlight index and changed elements
    if (flagsList != null){ //tuple and set do not have flags
        for (var i = 0; i < flagsList.length; i++) {
            //only highlight when value changed
            if (flagsList[i] == glbFlags['c']) { // "2" == 2 true
                avVar.css(i, {"background-color": cColor});
            } else if (flagsList[i] == glbFlags['n']) {
                avVar.css(i, {"background-color": nColor});
            }
        }
    }

    if (varIndex != null && varIndex.length != 0){
        var index = parseInt(varIndex[0]);
        avVar.css(index, {"background-color": indexColor});
    }

    avVar.mouseenter(avVar.highlight).mouseleave(avVar.unhighlight);
    return avVar;
    
}

vizJSAV.prototype.clearMatrixFlags = function(avVar, variable){
    //matrix has no flags
}

vizJSAV.prototype.parseMatrix = function(variable){
    //no flags for matrix
    var matrixName = variable.name,
        matrixArr =variable.value;

    var avVar = av.ds.matrix(matrixArr, {style: "matrix"});
    avVar.layout();
    return avVar;
}

vizJSAV.prototype.clearStringMatrixFlags = function (avVar, variable) {
    var flagsArr = variable.flags,
        topheader = variable.topheader,
        leftheader = variable.leftheader,
        varIndex = variable.index; //TODO not used currently

    var hasHeader = (topheader.length != 0 || leftheader.length != 0);

     //highlight element based on flags
    for (var i=0; i<flagsArr.length; i++){
        for (var j=0; j<flagsArr[i].length; j++){
            if (flagsArr[i][j] == glbFlags['c']){
                if(hasHeader){
                    avVar.css(i+1,j+1,{"background-color": cColor});
                }else{
                    avVar.css(i,j,{"background-color": cColor});
                }

            }else if(flagsArr[i][j] == glbFlags['n']){
                if(hasHeader){
                    avVar.css(i+1,j+1,{"background-color": nColor});
                }else{
                    avVar.css(i,j,{"background-color": nColor});
                }
            }else{
                if(hasHeader){
                    avVar.css(i+1,j+1,{"background-color":  uColor});
                }else{
                    avVar.css(i,j,{"background-color":  uColor});
                }
            }
        }
    }
}

vizJSAV.prototype.parseStringMatrix=function(variable){
    var matrixArr = variable.value,
        flagsArr = variable.flags,
        edgesArr = variable.edges,
        topheaderObj = $.extend(true, {}, variable.topheader),
        leftheaderObj = $.extend(true, {}, variable.leftheader),
        varIndex = variable.index; //TODO not used currently

    //deepcopy topHeader
    var topheader = $.map(topheaderObj, function(value, index) {
        return [value];
    });

    //deepcopy leftHeader
    var leftheader = $.map(leftheaderObj, function(value, index) {
        return [value];
    });


//    var hasHeader = (topheader != [] || leftheader != []);// illegal !!! [] != []
    var hasHeader = (topheader.length != 0 || leftheader.length != 0); //topheader changed below, this will cause topheader != [] true here.

    //var newMatrixArr = matrixArr;//matrix array with headers, need to use deepcopy here, otherwise it will change the variable value
    var newMatrixObj = $.extend(true, {}, matrixArr);//deep copy returns a dict object, need to convert to array
    var newMatrixArr = $.map(newMatrixObj, function(value, index) {
        return [value];
    });

    if (hasHeader){
        //unshift or splice, both are ok

        ////if topheader length != cols, append empty strings to it
        //for (var i=topheader.length; i<newMatrixArr[0].length; i++){
        //    topheader[i] = "";
        //}
        //newMatrixArr.unshift(topheader);//add to the front
        ////add left header line by line
        //newMatrixArr[0].unshift("");//top-left corner should be empty
        //
        //for (var i=1; i<newMatrixArr.length; i++){
        //    newMatrixArr[i].unshift(leftheader[i-1]); //if leftheader[i-1] is undefined, the program will simply leave that cell blank
        //}

        //if topheader length != cols, add empty strings to the front
        for (var i=topheader.length; i<newMatrixArr[0].length; i++){
            topheader.splice(0,0, "");
        }
        for (var i=leftheader.length; i<newMatrixArr.length; i++){
            leftheader.splice(0,0, "");
        }
        newMatrixArr.splice(0,0,topheader);//add to the front
        //add left header line by line
        newMatrixArr[0].splice(0, 0, "");//top-left corner should be empty

        for (var i=1; i<newMatrixArr.length; i++){
            newMatrixArr[i].splice(0,0,leftheader[i-1]); //if leftheader[i-1] is undefined, the program will simply leave that cell blank
        }

    }

    var avVar = av.ds.matrix(newMatrixArr, {style: "plain"});

    //gray the header
    if (hasHeader){
        for (var i=1; i<newMatrixArr[0].length; i++){
            avVar.css(0, i, {"background-color": matrixHeaderColor});
        }
        for (var i=1; i<newMatrixArr.length; i++){
            avVar.css(i, 0, {"background-color": matrixHeaderColor});
        }
    }

    //highlight element based on flags
    for (var i=0; i<flagsArr.length; i++){
        for (var j=0; j<flagsArr[i].length; j++){
            if (flagsArr[i][j] == glbFlags['c']){
                if(hasHeader){
                    avVar.css(i+1,j+1,{"background-color": cColor});
                }else{
                    avVar.css(i,j,{"background-color": cColor});
                }

            }else if(flagsArr[i][j] == glbFlags['n']){
                if(hasHeader){
                    avVar.css(i+1,j+1,{"background-color": nColor});
                }else{
                    avVar.css(i,j,{"background-color": nColor});
                }
            }
        }
    }
    //Add edges
    for (var i=0; i<edgesArr.length; i++){
        //addEdge(a,b,c,d), if one of the node is flag c or n, change edge color
        var a = parseInt(edgesArr[i][0]),
            b = parseInt(edgesArr[i][1]),
            c = parseInt(edgesArr[i][2]),
            d = parseInt(edgesArr[i][3]),
            opts = {};
        if ((a<flagsArr.length && b<flagsArr[a].length && c<flagsArr.length && d<flagsArr[c].length) &&
                (flagsArr[a][b] == glbFlags['c'] || flagsArr[c][d] == glbFlags['c'])){
            opts = $.extend({"stroke": edgeColor});
        }
        if (hasHeader){
            a++; b++; c++; d++;
        }

        avVar.addEdge(a,b,c,d,opts);
    }

    avVar.layout();
    return avVar;
}

vizJSAV.prototype.clearDictFlags=function(avVar, variable){
    //TODO didn't consider the index
    var flagsDict = variable.flags,
        varIndex = variable.index;
    var indexKey;
    if (varIndex != null && varIndex.length != 0){
        indexKey = varIndex[0];
    }

    var count = 1; //index 0 is key and val header
    for(var key in flagsDict){
        //highlight when value changed
        if (flagsDict[key] == glbFlags['c']){
            avVar.css(0, count, {"background-color": cColor});
            avVar.css(1, count, {"background-color": cColor});
        }else if (flagsDict[key] == glbFlags['n']){
            avVar.css(0, count, {"background-color": nColor});
            avVar.css(1, count, {"background-color": nColor});
        }else{
            avVar.css(0, count, {"background-color":  uColor});
            avVar.css(1, count, {"background-color":  uColor});
        }
        if (key == indexKey){
            avVar.css(0, count, {"background-color": indexColor});
            avVar.css(1, count, {"background-color": indexColor});
        }
        count++;
    }

}

vizJSAV.prototype.parseDict=function(variable){
    var valDict=variable.value, flagsDict=variable.flags,
        varIndex = variable.index;//an array

    var index = -1;//index of varIndex in dict

    var nCols = valDict.length;
    var nRows = 2;

    var matrix = new Array();
    var firstRow = new Array("Key");
    var secondRow = new Array("Val");
    var count = 1;
    for(var key in valDict){
        firstRow.push(key);
        secondRow.push(valDict[key]);

        if (varIndex != null && varIndex.length != 0 && varIndex[0] == key){
            index = count;
        }
        count++;
    }

    matrix.push(firstRow);
    matrix.push(secondRow);

    var avVar = av.ds.matrix(matrix);

    //Highlight index and changed elements
    count = 1; //reset count
    for(var key in flagsDict){
        //highlight when value changed
        if (flagsDict[key] == glbFlags['c']){
            avVar.css(0, count, {"background-color": cColor});
            avVar.css(1, count, {"background-color": cColor});
        }else if (flagsDict[key] == glbFlags['n']){
            avVar.css(0, count, {"background-color": nColor});
            avVar.css(1, count, {"background-color": nColor});
        }
        count++;
    }

    //index has higher priority than flags
    if (index != -1){
        avVar.css(0, index, {"background-color": indexColor});
        avVar.css(1, index, {"background-color": indexColor});
    }

    return avVar;
}

vizJSAV.prototype.clearLinkedListFlags= function (avVar, variable) {
    var flagsList = variable.flags,
        varIndex = variable.index;//an array

    for (var i=0; i<flagsList.length; i++){
        if (flagsList[i] == glbFlags["c"]){
            avVar.get(i).css({"background-color": cColor});
        }else if(flagsList[i] == glbFlags["n"]){
            avVar.get(i).css({"background-color": nColor});
        }else{
            avVar.get(i).css({"background-color":  uColor});
        }
    }

    if (varIndex != null && varIndex.length != 0) {//TODO only support 1D linkedlist
        var index = parseInt(varIndex[0])
        avVar.get(index).css({"background-color": indexColor});
    }
}

vizJSAV.prototype.parseLinkedList=function(variable){
    var flagsList = variable.flags,
        varIndex = variable.index,//an array
        valList = variable.value,
        varName = variable.name;

    var avVar = av.ds.list();

    for (var i=0; i<valList.length; i++){

        avVar.addLast(valList[i]);
        if (flagsList[i] == glbFlags["c"]){
            avVar.get(i).css({"background-color": cColor});
        }else if(flagsList[i] == glbFlags["n"]){
            avVar.get(i).css({"background-color": nColor});
        }
    }

    if (varIndex != null && varIndex.length != 0) {//TODO only support 1D linkedlist
        var index = parseInt(varIndex[0])
        avVar.get(index).css({"background-color": indexColor});
    }

    avVar.layout();
    return avVar;
}

vizJSAV.prototype.parseGraph=function(variable, options){
    var vertexList = variable.V,
        edgeList = variable.E;

    var graph = av.ds.graph(options);

    //Add nodes to graph
    var vertexDict = {};
    for(var i=0; i<vertexList.length; i++){
        var vertex = vertexList[i].value,
            color = vertexList[i].color.toUpperCase();
        var node = graph.addNode(vertex);
        node.css({"background-color": graphColor[color]});//change color depth, if not find in the dictionary, default is white
        vertexDict[vertex] = node;
    }

    //Add edges to graph
    for (var i=0; i<edgeList.length; i++){
        var start = edgeList[i].start,
            end = edgeList[i].end,
            color = edgeList[i].color,
            weight = edgeList[i].weight;
        graph.addEdge(vertexDict[start], vertexDict[end], {"weight": weight, "stroke": color});
    }

    graph.layout();
    return graph;
}

vizJSAV.prototype.clearBTreeFlags = function (avVar, variable) {
    /*
        Simply remove all the color's of tree nodes
     */
    var root = avVar.root();
    this.clearBTreeNodeColor(root);
}

vizJSAV.prototype.clearBTreeNodeColor = function(node){
    node.css({"background-color":  uColor});
    if (node.left()){
        this.clearBTreeNodeColor(node.left());
    }
    if (node.right()){
        this.clearBTreeNodeColor(node.right());
    }
}

vizJSAV.prototype.parseBTree=function(variable, treeType){
    var tree = av.ds.binarytree();
    var varIndex = variable.index, //currently do not support index for BST
        varFlags = variable.flags,
        varValue = variable.value,
        rbValue = variable.color;
    var rbArr;
    if (treeType == "RBTree"){
        rbArr = rbValue.replace(/\[/g," ").replace(/\]/g," ").match(/\S+/g); //split by space
    }

    var flagsArr = varFlags.replace(/\[/g," ").replace(/\]/g," ").match(/\S+/g); //split by space
    var optStack = [];
    var nodeStack = [];
    var token = "";
    var node;
    var str = varValue;
    var tempLast;
    var nodeCount = 0;
    for (var i=0; i<str.length;i++){
        switch(str[i]){
            //[9[8][10]]
            case '[':
                optStack.push(str[i]);
                //alert("new node start!");
                break;
            case ']':
                //alert("a node closed!");
                optStack.pop();
                if (optStack.length==0){
                    node=nodeStack.pop();
                    tree.root(node);
                    //alert(node.value());
                }else{
                    node=nodeStack.pop();
                    if (node == null){
                        continue;
                    }
                    //alert(node.value());
                    tempLast=nodeStack.length-1;

                    if (parseInt(node.value())<parseInt(nodeStack[tempLast].value())){ //without parseint 10 < 9
                        nodeStack[tempLast].left(node);
                    }else{
                        nodeStack[tempLast].right(node);
                    }
                }
                break;
            default:
                while(str[i]!='[' && str[i]!=']' && i<str.length){
                   token=token+str[i];
                   i=i+1;
                }
                token = token.trim().replace(/\'/g, "").replace(/\"/g, "");
                if (token!="None"){
                    node = tree.newNode(token);
                    if (flagsArr[nodeCount] >=3){
                        node.css({"border-color": bColor, "border-width": "2px"});
                        flagsArr[nodeCount] -= 3
                    }
                    if (treeType == "RBTree"){
                        if (rbArr[nodeCount] == "R"){
                            node.css({"background-color": graphColor["RED"]});
                        }else if(rbArr[nodeCount] == "B"){
                            node.css({"color":"white","background-color": "BLACK"});
                        }
                    }else{
                        if (flagsArr[nodeCount] == glbFlags["n"]){
                            node.css({"background-color": nColor});
                        }else if(flagsArr[nodeCount] == glbFlags["c"]){
                            node.css({"background-color": cColor});
                        }
                    }


                    nodeStack.push(node);
                    //alert(node.value()+" is created!");
                }else{
                    nodeStack.push(null);
                }
                nodeCount++;
                token="";//reset token
                i=i-1;//reset i
                break;
        }
    }
    tree.layout();
    return tree;
}

vizJSAV.prototype.clearHeapFlags=function(avVar, variable) {
    //TODO to be completed

}

//complete binary tree
vizJSAV.prototype.parseHeap=function(variable){
    var tree = av.ds.binarytree();
    var varIndex = variable.index, //currently do not support index for Heap
        flagsArr = variable.flags,
        valArr = variable.value,
        nodeList = [];


    for (var i=0; i<valArr.length; i++){
        var newNode = tree.newNode(valArr[i]);
         if (flagsArr[i] == glbFlags["n"]){
            newNode.css({"background-color": nColor});
        }else if(flagsArr[i] == glbFlags["c"]){
            newNode.css({"background-color": cColor});
        }
        nodeList.push(newNode);
        if (i == 0){
            tree.root(newNode);
        }else{
            var parentIndex = parseInt((i-1)/2);
            if (i%2 == 0){//right node
                nodeList[parentIndex].right(newNode);
            }else{//left node
                nodeList[parentIndex].left(newNode);
            }
        }
    }

    tree.layout();
    return tree;
}

vizJSAV.prototype.clearDisjoinSetFlags = function (avVar, varible) {
    //TODO to be completed
}

vizJSAV.prototype.parseDisjointSet=function(variable){

    var tree = av.ds.tree();
    var varIndex = variable.index, //currently do not support index for disjointset
        valDict = variable.value,
        flagDict = variable.flags,
        nodeDict = {};

    //First add a invisible root node
    var root = tree.root();
    root.hide({"recursive": false});

    for (var key in valDict){
        var value = valDict[key];
        if (!(key in nodeDict)){
            var newNode = tree.newNode(key);
            if (flagDict[key] == glbFlags["n"]){
                newNode.css({"background-color": nColor});
            }else if(flagDict[key] == glbFlags["c"]){
                newNode.css({"background-color": cColor});
            }
            nodeDict[key] = newNode;
        }
        if (!(value in nodeDict)){
            var newNode = tree.newNode(value);
            if (flagDict[value] == glbFlags["n"]){
                newNode.css({"background-color": nColor});
            }else if(flagDict[value] == glbFlags["c"]){
                newNode.css({"background-color": cColor});
            }
            nodeDict[value] = newNode;
        }

        if (key == value){ // independent set
            root.addChild(nodeDict[key]);
            //hide the edge to root
            nodeDict[key].edgeToParent().hide();
        }else{
            nodeDict[value].addChild(nodeDict[key]);
        }
    }

    tree.layout();
    return tree;
}


/*
function readTextFile(file)
{
    var xmlFile = new XMLHttpRequest();
    xmlFile.open("GET", file, false);
    xmlFile.send(null);
    var responsexml = xmlFile.responseXML;
    return responsexml
}
vizJSAV.prototype.refresh = function()
{
    // read file
    var xmldoc = readTextFile("varList.xml");
    
    var varList = xmldoc.getElementsByTagName("var");
    for (var i = 0; i < varList.length; i ++)
    {
       var nodeTemp = varList[i].childNodes;
       var varAttr=new arrary;
       var varValue;
       for (var j=0; j<nodeTemp.length;j++){
            if (nodeTemp[j].nodeName=="value")
                varValue=nodeTemp[j].nodeValue;
            else if (nodeTemp[j].nodeName=="attr")
                varAttr.push(nodeTemp[j]);
       }
       var varInfo = [varList[i].getAttribute("name"),
                  varList[i].getAttribute("type"),
                  varValue];
        this.plotVar(varInfo, varAttr);
    }
}
*/