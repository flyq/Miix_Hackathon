export default {
    setCookie(name, value, days = 1) {
        let d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    getCookie(name) {
        let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },
    delCookie(name)
    {
        this.setCookie(name, '', -1);
    },
    formatDateTime(timestamp, fmt) {
        let dateTime = new Date(timestamp);
        let o = {
            "M+": dateTime.getMonth() + 1, //月份
            "d+": dateTime.getDate(), //日
            "h+": dateTime.getHours(), //小时
            "m+": dateTime.getMinutes(), //分
            "s+": dateTime.getSeconds(), //秒
            "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度
            "S": dateTime.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    isNull(v) {
        return v === '' || v === null || v === undefined
    },
    uniqueid() {
        let idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
        do {
            let ascicode = Math.floor((Math.random() * 42) + 48);
            if (ascicode < 58 || ascicode > 64) {
                idstr += String.fromCharCode(ascicode);
            }
        } while (idstr.length < 32);
        return (idstr);
    },
    getImgURL(v) {
        return `https://gan.ethgeek.cn/static/images/transferred_faces/${v}_0.png`
    }
};
