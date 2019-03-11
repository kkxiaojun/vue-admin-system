const timeUtil = {
        /**
         * 格式化时间
         * @param {any} date /Mon Nov 20 2017 14:28:48 GMT+0800 (中国标准时间)/
         * @returns {String}/2016-01-01 23:59:59/
         */
        formatDate: function(date){
            var seperator1 = "-";
		    var seperator2 = ":";
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    var strHours=date.getHours();
		    var strMins=date.getMinutes();
		    var strSeconds=date.getSeconds();		    
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    if (strHours >= 0 && strHours <= 9) {
		    	strHours = "0" + strHours;
		    }
		    if (strMins >= 0 && strMins <= 9) {
		    	strMins = "0" + strMins;
		    }
		    if (strSeconds >= 0 && strSeconds <= 9) {
		    	strSeconds = "0" + strSeconds;
		    }
		    var theDate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + strHours + seperator2 + strMins
            + seperator2 + strSeconds;
		    return theDate;
        }
}
module.exports = timeUtil