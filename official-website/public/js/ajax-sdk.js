;(function(window){
    function hasParmasUrl(url){
        if(url){
            return url.indexOf("?") !== -1;
        }else{
            return false;
        }
    }
    window.HzedService = {
        protocol: location.protocol,
        host: location.host,
        site:location.protocol+location.host,
        Ajax: function(url, type,params,async,callback,errorCallback) {
            var fullPath = url+ (hasParmasUrl(url) === true ?"&_":"?_")+new Date().getTime();
            $.ajax({
                type: type,
                url: fullPath,
                data: params,
                dataType: "json",
                async:async,  //如果需要发送同步请求，请将此选项设置为 false。
                cache: false,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    id: HZLoad.getCookie('sign'),
                },
                beforeSend: function(xhr) {
                    HzedService.AjaxBeforeSend(xhr);
                },
                success: function(data) {
                    if(typeof(callback) === 'function'){
                        callback(data);
                    }
                },
                error: function(data) {
                    if(typeof(errorCallback) === 'function'){
                        errorCallback(data);
                    }
                }
            });
        },
        Axse: function(url,type, params,callback,errorCallback) {
            var fullPath = url+ (hasParmasUrl(url) === true ?"&_":"?_")+new Date().getTime();
            $.ajax({
                type: type,
                url: fullPath,
                data: params,
                dataType: "json",
                async:false,     //同步
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    id: HZLoad.getCookie('sign') || Utils.getUrlParam('id'),
                },
                success: function(data) {
                    if(typeof(callback) === 'function'){
                        callback(data);
                    }
                },
                error: function(data) {
                    if(typeof(errorCallback) === 'function'){
                        errorCallback(data);
                    }
                }
            });
        },
        Async: function(url, method, datatype, params, callback,errorCallback) {
            var fullPath = url+ (hasParmasUrl(url) === true ?"&_":"?_")+new Date().getTime();
            $.ajax({
                type: method,
                url: fullPath,
                data: params,
                dataType: datatype,
                async: true, //异步
                success: function(data) {
                    if(typeof(callback) === 'function'){
                        callback(data);
                    }
                },
                error: function(data) {
                    if(typeof(errorCallback) === 'function'){
                        errorCallback(data);
                    }
                }
            });
        },
        AsyncError: function(token_id, url, method, datatype, params, callback, errorCallback) {
            var fullPath = url+ (hasParmasUrl(url) === true ?"&_":"?_")+new Date().getTime();
            $.ajax({
                type: method,
                url: fullPath,
                headers: {
                    id: token_id
                },
                data: params,
                dataType: datatype,
                async: true, //异步
                success: function(data) {
                    if(typeof(callback) === 'function'){
                        callback(data);
                    }
                },
                error: function(data) {
                    if(typeof(errorCallback) === 'function'){
                        errorCallback(data);
                    }
                }
            });
        },
        AsyncHeadersError: function(headers, url, method, datatype, params, callback, errorCallback) {
            var fullPath = url+ (hasParmasUrl(url) === true ?"&_":"?_")+new Date().getTime();
            $.ajax({
                type: method,
                url: fullPath,
                headers: headers,
                data: params,
                dataType: datatype,
                async: true, //异步
                success: function(data) {
                    if(typeof(callback) === 'function'){
                        callback(data);
                    }
                },
                error: function(data) {
                    if(typeof(errorCallback) === 'function'){
                        errorCallback(data);
                    }
                }
            });
        },
        Get: function(url, params, callback) {
            var fullPath = url+ (hasParmasUrl(url) === true ?"&_":"?_")+new Date().getTime();
            $.getJSON(fullPath, params, function(data) {
                if(typeof(callback) === 'function'){
                    callback(data);
                }
            });
        },
        Put: function(url, params, callback) {
            HzedService.ajax(url, "PUT", params, function(data) {
                if(typeof(callback) === 'function'){
                    callback(data);
                }
            });
        },
        PutJson: function(url, params, callback) {
            $.ajax({
                url: url,
                type: 'PUT',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(params),
                success: function(data) {
                    if(typeof(callback) === 'function'){
                        callback(data);
                    }
                }
            });
        },
        Del: function(url, params, callback) {
            $.ajax({
                url: url,
                type: 'DELETE',
                data: params,
                success: function(data) {
                    if(typeof(callback) === 'function'){
                        callback(data);
                    }
                }
            });
        },
        PostJson: function(url, params, callback) {
            $.ajax({
                url: url,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(params),
                success: function(data) {
                    if(typeof(callback) === 'function'){
                        callback(data);
                    }
                }
            });
        },
        Post: function(url, params, callback) {
            $.ajax({
                url: url,
                type: 'POST',
                data: params,
                success: function(data) {
                    if(typeof(callback) === 'function'){
                        callback(data);
                    }
                }
            });
        }
    };
})(window);
