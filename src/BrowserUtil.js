/**
 * Created by MP on 2015/10/27.
 * 根据浏览器的UserAgent分析浏览器版本和系统版本
 */


var BrowserUtil = function (userAgent) {
    var na = window.navigator;
    var ua = (userAgent ? userAgent : na.userAgent);

    this.Browser = function () {
        return browser.join(' ');
    }
    this.OS = function () {
        return os.join(' ');
    }

    //----------------Browser-----------------
    var bs = {
        'Edge': ['Edge'],
        'Opera': ['OPR', 'Opera'],
        '遨游云浏览器': ['Maxthon'],
        '360安全浏览器': ['360SE'],//新版user agent已经没有360SE标记
        '搜狗高速浏览器': ['SE', 'MetaSr'],
        'QQ浏览器': ['TencentTraveler', 'QQBrowser'],
        '世界之窗浏览器': ['The world'],
        'UC浏览器': ['UCWEB'],
        '猎豹安全浏览器': ['LBBROWSER']
    }
    var browser = (function (ua) {
        var tem;
        //-------------Other-----------------
        for(var key in bs){
            var val = bs[key];
            if(typeof val == 'object'){
                tem = ua.match(new RegExp('\\b(' + val.join('|') + ')\/(\\d+(\\.\\d+)+)', 'i'));
                if (tem == null)
                    tem = ua.match(new RegExp('\\b(' + val.join('|') + ')'))
                if (tem != null) {
                    return tem[2] ? [key, tem[2]] : [key];
                }
            }
        }
        //--------------------------------------
        var M = ua.match(/(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+(\.\d+)+)/i) || [];
        //-------------IE-----------------
        if (/msie/i.test(M[0])) {
            return ['IE', (M[2] || '')];
        }
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+(\.\d+)+)/g.exec(ua) || [];
            return ['IE', (tem[1] || '')];
        }
        //-------------Default-----------------
        M = M[2] ? [M[1], M[2]] : [na.appName, na.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+(\.\d+)+)/i)) != null) M.splice(1, 1, tem[1]);
        return M;
    })(ua);

    //---------------OS------------------
    var sys = {
        'Windows': {
            '3.1': 'NT 3.1',
            '3.5': 'NT 3.5',
            '3.51': 'NT 3.51',
            '4.0': 'NT 4.0',
            '5.0': '2000',
            '5.1': 'XP',
            '5.2': 'Server 2003',
            '6.0': 'Vista',
            '6.1': '7',
            '7.0': '7',
            '6.2': '8',
            '6.3': '8.1',
            '6.4': '10',
            '10.0': '10'
        },
        'Other': {
            'Linux': ['Linux'],
            'FreeBSD': ['FreeBSD'],
            'OpenBSD': ['OpenBSD'],
            'Mac OS': ['Mac'],
            'SunOS': ['SunOS']
        }
    };

    var os = (function (ua) {
        var os = [];
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/i.test(ua)) {
            os[0] = 'Windows';
            console.log(RegExp.$1 +',' + RegExp.$2+','+RegExp.$3);
            if (RegExp.$1.toUpperCase() == 'NT') {
                var v = sys.Windows[RegExp.$2];
                os[1] = v ? v : RegExp.$2;
            } else if (RegExp.$1 == '9x') {
                os[1] = 'ME';
            } else {
                os[1] = RegExp.$1;
            }
        }
        else {
            for (var k in sys.Other) {
                if (ua.indexOf(sys.Other[k]) != -1) {
                    os[0] = k;
                    break;
                }
            }
        }
        return os;
    })(ua);
}





