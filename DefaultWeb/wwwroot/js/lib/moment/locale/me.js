//>>built
(function(b,a){"object"===typeof exports&&"undefined"!==typeof module&&"function"===typeof require?a(require("../moment")):"function"===typeof define&&define.amd?define(["../moment"],a):a(b.moment)})(this,function(b){var a={words:{m:["jedan minut","jednog minuta"],mm:["minut","minuta","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mjesec","mjeseca","mjeseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(a,c){return 1===a?c[0]:2<=
a&&4>=a?c[1]:c[2]},translate:function(b,c,e){var d=a.words[e];return 1===e.length?c?d[0]:d[1]:b+" "+a.correctGrammaticalCase(b,d)}};return b.defineLocale("me",{months:"januar februar mart april maj jun jul avgust septembar oktobar novembar decembar".split(" "),monthsShort:"jan. feb. mar. apr. maj jun jul avg. sep. okt. nov. dec.".split(" "),monthsParseExact:!0,weekdays:"nedjelja ponedjeljak utorak srijeda \u010detvrtak petak subota".split(" "),weekdaysShort:"ned. pon. uto. sri. \u010det. pet. sub.".split(" "),
weekdaysMin:"ne po ut sr \u010de pe su".split(" "),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sjutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010de u] LT",lastWeek:function(){return"[pro\u0161le] [nedjelje] [u] LT;[pro\u0161log] [ponedjeljka] [u] LT;[pro\u0161log] [utorka] [u] LT;[pro\u0161le] [srijede] [u] LT;[pro\u0161log] [\u010detvrtka] [u] LT;[pro\u0161log] [petka] [u] LT;[pro\u0161le] [subote] [u] LT".split(";")[this.day()]},
sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"nekoliko sekundi",m:a.translate,mm:a.translate,h:a.translate,hh:a.translate,d:"dan",dd:a.translate,M:"mjesec",MM:a.translate,y:"godinu",yy:a.translate},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}})});