// filters.js
import Vue from 'vue'
Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('filterHtml', function (text) {
    var regx = /<[^>]*>|<\/[^>]*>/gm;
    if(text){
        var str = text.toString();
        return str.replace(regx,"");
    }else{
        return '';
    }
})

