angular.module("app", []);
var ImsTreeviewDirective = (function () {
    function ImsTreeviewDirective($compile) {
        var d;
        d = {};
        d.restrict = 'A';
        d.link = function (scope, element, attr) {
            var treeId = attr.treeId, treeModel = attr.treeModel, nodeId = attr.nodeId || 'id', nodeLabel = attr.nodeLabel || 'label', nodeChildren = attr.nodeChildren || 'children', nodeCheckbox = attr.nodeCheckbox;

            var template = '<ul>' + '<li ng-repeat="node in ' + treeModel + '">' + '<i class="loading" data-ng-show="node.loading"></i> ' + '<i class="collapsed" data-ng-show="(node.' + nodeChildren + '.length || node.hasLeaf) && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' + '<i class="expanded" data-ng-show="(node.' + nodeChildren + '.length || node.hasLeaf)&& !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' + '<i class="normal" data-ng-hide="node.' + nodeChildren + '.length || node.hasLeaf"></i> ';
            if (nodeCheckbox == 'true') {
                template += '<input ng-checked="node.checked" ng-click="' + treeId + '.checkAll(node, $event)" type="checkbox" />';
            }
            template += '<span class="node-label" ng-class="node.selected" ng-click=' + treeId + '.selectNodeLabel(node)>{{node.' + nodeLabel + '}}</span>' + '<div data-ng-hide="node.collapsed" data-tree-model="node.' + nodeChildren + '" data-tree-id="' + treeId + '" node-label="' + nodeLabel + '" node-id="' + nodeId + '" node-children="' + nodeChildren + '" node-checkbox="' + nodeCheckbox + '"></div>' + '</li>' + '</ul>';

            if (treeId && treeModel) {
                if (attr.imsTreeview) {
                    scope[treeId] = scope[treeId] || {};
                    scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function (selectedNode) {
                        selectedNode.collapsed = !selectedNode.collapsed;
                        if (scope[treeId].selectNodeHeadClient) {
                            scope[treeId].selectNodeHeadClient(selectedNode);
                        }
                    };
                    scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function (node) {
                        if (scope[treeId].currendNode && scope[treeId].currendNode.selected) {
                            scope[treeId].currendNode.selected = undefined;
                        }
                        node.selected = 'selected';
                        scope[treeId].currendNode = node;
                        if (scope[treeId].selectNodeLabelClient) {
                            scope[treeId].selectNodeLabelClient(node);
                        }
                    };
                    scope[treeId].checkAll = scope[treeId].checkAll || function (node, $event) {
                        var isChecked = $event.target.checked;
                        node.checked = isChecked;
                        var fx = function (nodes) {
                            angular.forEach(nodes, function (node) {
                                node.checked = isChecked;
                                if (node[nodeChildren] && node[nodeChildren].length) {
                                    fx(node[nodeChildren]);
                                }
                            });
                        };
                        fx(node[nodeChildren]);
                        if (scope[treeId].checkAllClient) {
                            scope[treeId].checkAllClient(node, $event);
                        }
                    };
                    scope[treeId].getCheckedList = scope[treeId].getCheckedList || function () {
                        var list = scope[treeModel], checkedList = [], ids = [];
                        var fx = function (nodes) {
                            angular.forEach(nodes, function (node) {
                                if (node.checked && node.traversed == undefined) {
                                    ids.push(node[nodeId]);
                                    checkedList.push(node);
                                    node.traversed = true;
                                }
                                if (node[nodeChildren] && node[nodeChildren].length) {
                                    fx(node[nodeChildren]);
                                }
                            });
                        };
                        fx(angular.copy(list));
                        return { nodes: checkedList, ids: ids };
                    };
                }
                element.html('').append($compile(template)(scope));
            }
        };
        return d;
    }
    return ImsTreeviewDirective;
})();

angular.module('app').directive('treeModel', ['$compile', ImsTreeviewDirective]);

function treeCtrl($scope) {
    $scope.roleList = [];

    $scope.abc = {};
    $scope.abc.selectNodeLabelClient = function (node) {
        if (node.url) {
            loadingModal = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
            $('iframe').hide();
            $('iframe').attr('src', node.url);
        }
    };
    /////////////////////
    var documentUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/GetByTitle('Management%20Console%20Tree%20Config')/items";
    jQuery.ajax({
        url: documentUrl,
        method: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose"
        },
        success: function (data) {
            var list = data.d.results, ids = [];
            list = list.select(function (x) { return !0; }, function (a) { return { id: a.Code, label: a.Title, url: a.URL, pid: a.Parent_x0020_Code, collapsed: true } });
            console.log(list);
            list.Where(function (item, index) {
                if (index == 0) {
                    item.collapsed = true;
                }
                item.children = list.Where(function (a) { return a.pid == item.id; });
                item.children.ForEach(function (z) { ids.push(z.id); });
            });
            list.remove(function (dx) { return ids.Find(function (id) { return dx.id == id; }) != null; });
            $scope.roleList = list;
            $scope.$apply();
        },
        error: function (error) {
            alert(JSON.stringify(error));
            if (loadingModal) loadingModal.close();
        }
    });

}

