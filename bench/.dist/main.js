var rr=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var pe;(function(e){e[e.AM=0]="AM",e[e.PM=1]="PM"})(pe||(pe={}));var Ee;(function(e){e[e.SUNDAY=0]="SUNDAY",e[e.MONDAY=1]="MONDAY",e[e.TUESDAY=2]="TUESDAY",e[e.WEDNESDAY=3]="WEDNESDAY",e[e.THURSDAY=4]="THURSDAY",e[e.FRIDAY=5]="FRIDAY",e[e.SATURDAY=6]="SATURDAY"})(Ee||(Ee={}));var Fe;(function(e){e[e.JANUARY=1]="JANUARY",e[e.FEBRUARY=2]="FEBRUARY",e[e.MARCH=3]="MARCH",e[e.APRIL=4]="APRIL",e[e.MAY=5]="MAY",e[e.JUNE=6]="JUNE",e[e.JULY=7]="JULY",e[e.AUGUST=8]="AUGUST",e[e.SEPTEMBER=9]="SEPTEMBER",e[e.OCTOBER=10]="OCTOBER",e[e.NOVEMBER=11]="NOVEMBER",e[e.DECEMBER=12]="DECEMBER"})(Fe||(Fe={}));function at(e,t){e.assign("day",t.getDate()),e.assign("month",t.getMonth()+1),e.assign("year",t.getFullYear())}function ui(e,t){e.assign("hour",t.getHours()),e.assign("minute",t.getMinutes()),e.assign("second",t.getSeconds()),e.assign("millisecond",t.getMilliseconds()),e.assign("meridiem",t.getHours()<12?pe.AM:pe.PM)}function kt(e,t){e.imply("day",t.getDate()),e.imply("month",t.getMonth()+1),e.imply("year",t.getFullYear())}function Zr(e,t){e.imply("hour",t.getHours()),e.imply("minute",t.getMinutes()),e.imply("second",t.getSeconds()),e.imply("millisecond",t.getMilliseconds()),e.imply("meridiem",t.getHours()<12?pe.AM:pe.PM)}var y1={ACDT:630,ACST:570,ADT:-180,AEDT:660,AEST:600,AFT:270,AKDT:-480,AKST:-540,ALMT:360,AMST:-180,AMT:-240,ANAST:720,ANAT:720,AQTT:300,ART:-180,AST:-240,AWDT:540,AWST:480,AZOST:0,AZOT:-60,AZST:300,AZT:240,BNT:480,BOT:-240,BRST:-120,BRT:-180,BST:60,BTT:360,CAST:480,CAT:120,CCT:390,CDT:-300,CEST:120,CET:{timezoneOffsetDuringDst:120,timezoneOffsetNonDst:60,dstStart:e=>Tl(e,Fe.MARCH,Ee.SUNDAY,2),dstEnd:e=>Tl(e,Fe.OCTOBER,Ee.SUNDAY,3)},CHADT:825,CHAST:765,CKT:-600,CLST:-180,CLT:-240,COT:-300,CST:-360,CT:{timezoneOffsetDuringDst:-300,timezoneOffsetNonDst:-360,dstStart:e=>Lt(e,Fe.MARCH,Ee.SUNDAY,2,2),dstEnd:e=>Lt(e,Fe.NOVEMBER,Ee.SUNDAY,1,2)},CVT:-60,CXT:420,ChST:600,DAVT:420,EASST:-300,EAST:-360,EAT:180,ECT:-300,EDT:-240,EEST:180,EET:120,EGST:0,EGT:-60,EST:-300,ET:{timezoneOffsetDuringDst:-240,timezoneOffsetNonDst:-300,dstStart:e=>Lt(e,Fe.MARCH,Ee.SUNDAY,2,2),dstEnd:e=>Lt(e,Fe.NOVEMBER,Ee.SUNDAY,1,2)},FJST:780,FJT:720,FKST:-180,FKT:-240,FNT:-120,GALT:-360,GAMT:-540,GET:240,GFT:-180,GILT:720,GMT:0,GST:240,GYT:-240,HAA:-180,HAC:-300,HADT:-540,HAE:-240,HAP:-420,HAR:-360,HAST:-600,HAT:-90,HAY:-480,HKT:480,HLV:-210,HNA:-240,HNC:-360,HNE:-300,HNP:-480,HNR:-420,HNT:-150,HNY:-540,HOVT:420,ICT:420,IDT:180,IOT:360,IRDT:270,IRKST:540,IRKT:540,IRST:210,IST:330,JST:540,KGT:360,KRAST:480,KRAT:480,KST:540,KUYT:240,LHDT:660,LHST:630,LINT:840,MAGST:720,MAGT:720,MART:-510,MAWT:300,MDT:-360,MESZ:120,MEZ:60,MHT:720,MMT:390,MSD:240,MSK:180,MST:-420,MT:{timezoneOffsetDuringDst:-360,timezoneOffsetNonDst:-420,dstStart:e=>Lt(e,Fe.MARCH,Ee.SUNDAY,2,2),dstEnd:e=>Lt(e,Fe.NOVEMBER,Ee.SUNDAY,1,2)},MUT:240,MVT:300,MYT:480,NCT:660,NDT:-90,NFT:690,NOVST:420,NOVT:360,NPT:345,NST:-150,NUT:-660,NZDT:780,NZST:720,OMSST:420,OMST:420,PDT:-420,PET:-300,PETST:720,PETT:720,PGT:600,PHOT:780,PHT:480,PKT:300,PMDT:-120,PMST:-180,PONT:660,PST:-480,PT:{timezoneOffsetDuringDst:-420,timezoneOffsetNonDst:-480,dstStart:e=>Lt(e,Fe.MARCH,Ee.SUNDAY,2,2),dstEnd:e=>Lt(e,Fe.NOVEMBER,Ee.SUNDAY,1,2)},PWT:540,PYST:-180,PYT:-240,RET:240,SAMT:240,SAST:120,SBT:660,SCT:240,SGT:480,SRT:-180,SST:-660,TAHT:-600,TFT:300,TJT:300,TKT:780,TLT:540,TMT:300,TVT:720,ULAT:480,UTC:0,UYST:-120,UYT:-180,UZT:300,VET:-210,VLAST:660,VLAT:660,VUT:660,WAST:120,WAT:60,WEST:60,WESZ:60,WET:0,WEZ:0,WFT:720,WGST:-120,WGT:-180,WIB:420,WIT:540,WITA:480,WST:780,WT:0,YAKST:600,YAKT:600,YAPT:600,YEKST:360,YEKT:360};function Lt(e,t,r,n,i=0){let s=0,a=0;for(;a<n;)s++,new Date(e,t-1,s).getDay()===r&&a++;return new Date(e,t-1,s,i)}function Tl(e,t,r,n=0){let i=r===0?7:r,s=new Date(e,t-1+1,1,12),a=s.getDay()===0?7:s.getDay(),o;return a===i?o=7:a<i?o=7+a-i:o=a-i,s.setDate(s.getDate()-o),new Date(e,t-1,s.getDate(),n)}function li(e,t,r={}){if(e==null)return null;if(typeof e=="number")return e;let n=r[e]??y1[e];return n==null?null:typeof n=="number"?n:t==null?null:t>n.dstStart(t.getFullYear())&&!(t>n.dstEnd(t.getFullYear()))?n.timezoneOffsetDuringDst:n.timezoneOffsetNonDst}var El={day:0,second:0,millisecond:0};function Be(e,t){let r=new Date(e);if(t.y&&(t.year=t.y,delete t.y),t.mo&&(t.month=t.mo,delete t.mo),t.M&&(t.month=t.M,delete t.M),t.w&&(t.week=t.w,delete t.w),t.d&&(t.day=t.d,delete t.d),t.h&&(t.hour=t.h,delete t.h),t.m&&(t.minute=t.m,delete t.m),t.s&&(t.second=t.s,delete t.s),t.ms&&(t.millisecond=t.ms,delete t.ms),"year"in t){let n=Math.floor(t.year);r.setFullYear(r.getFullYear()+n);let i=t.year-n;i>0&&(t.month=t?.month??0,t.month+=i*12)}if("quarter"in t){let n=Math.floor(t.quarter);r.setMonth(r.getMonth()+n*3);let i=t.quarter-n;i>0&&(t.month=t?.month??0,t.month+=i*3)}if("month"in t){let n=Math.floor(t.month);r.setMonth(r.getMonth()+n);let i=t.month-n;i>0&&(t.week=t?.week??0,t.week+=i*4)}if("week"in t){let n=Math.floor(t.week);r.setDate(r.getDate()+n*7);let i=t.week-n;i>0&&(t.day=t?.day??0,t.day+=Math.round(i*7))}if("day"in t){let n=Math.floor(t.day);r.setDate(r.getDate()+n);let i=t.day-n;i>0&&(t.hour=t?.hour??0,t.hour+=Math.round(i*24))}if("hour"in t){let n=Math.floor(t.hour);r.setHours(r.getHours()+n);let i=t.hour-n;i>0&&(t.minute=t?.minute??0,t.minute+=Math.round(i*60))}if("minute"in t){let n=Math.floor(t.minute);r.setMinutes(r.getMinutes()+n);let i=t.minute-n;i>0&&(t.second=t?.second??0,t.second+=Math.round(i*60))}if("second"in t){let n=Math.floor(t.second);r.setSeconds(r.getSeconds()+n);let i=t.second-n;i>0&&(t.millisecond=t?.millisecond??0,t.millisecond+=Math.round(i*1e3))}if("millisecond"in t){let n=Math.floor(t.millisecond);r.setMilliseconds(r.getMilliseconds()+n)}return r}function Vt(e){let t={};for(let r in e)t[r]=-e[r];return t}var qt=class e{instant;timezoneOffset;constructor(t,r){this.instant=t??new Date,this.timezoneOffset=r??null}static fromDate(t){return new e(t)}static fromInput(t,r){if(t instanceof Date)return e.fromDate(t);let n=t?.instant??new Date,i=li(t?.timezone,n,r);return new e(n,i)}getDateWithAdjustedTimezone(){let t=new Date(this.instant);return this.timezoneOffset!==null&&t.setMinutes(t.getMinutes()-this.getSystemTimezoneAdjustmentMinute(this.instant)),t}getSystemTimezoneAdjustmentMinute(t,r){t||(t=new Date);let n=-t.getTimezoneOffset(),i=r??this.timezoneOffset??n;return n-i}getTimezoneOffset(){return this.timezoneOffset??-this.instant.getTimezoneOffset()}},ge=class e{knownValues;impliedValues;reference;_tags=new Set;constructor(t,r){if(this.reference=t,this.knownValues={},this.impliedValues={},r)for(let i in r)this.knownValues[i]=r[i];let n=t.getDateWithAdjustedTimezone();this.imply("day",n.getDate()),this.imply("month",n.getMonth()+1),this.imply("year",n.getFullYear()),this.imply("hour",12),this.imply("minute",0),this.imply("second",0),this.imply("millisecond",0)}static createRelativeFromReference(t,r=El){let n=Be(t.getDateWithAdjustedTimezone(),r),i=new e(t);return i.addTag("result/relativeDate"),"hour"in r||"minute"in r||"second"in r||"millisecond"in r?(i.addTag("result/relativeDateAndTime"),ui(i,n),at(i,n),i.assign("timezoneOffset",t.getTimezoneOffset())):(Zr(i,n),i.imply("timezoneOffset",t.getTimezoneOffset()),"day"in r?(i.assign("day",n.getDate()),i.assign("month",n.getMonth()+1),i.assign("year",n.getFullYear()),i.assign("weekday",n.getDay())):"week"in r?(i.assign("day",n.getDate()),i.assign("month",n.getMonth()+1),i.assign("year",n.getFullYear()),i.imply("weekday",n.getDay())):(i.imply("day",n.getDate()),"month"in r?(i.assign("month",n.getMonth()+1),i.assign("year",n.getFullYear())):(i.imply("month",n.getMonth()+1),"year"in r?i.assign("year",n.getFullYear()):i.imply("year",n.getFullYear())))),i}get(t){return t in this.knownValues?this.knownValues[t]:t in this.impliedValues?this.impliedValues[t]:null}isCertain(t){return t in this.knownValues}getCertainComponents(){return Object.keys(this.knownValues)}imply(t,r){return t in this.knownValues?this:(this.impliedValues[t]=r,this)}assign(t,r){return this.knownValues[t]=r,delete this.impliedValues[t],this}addDurationAsImplied(t){let r=this.dateWithoutTimezoneAdjustment(),n=Be(r,t);return("day"in t||"week"in t||"month"in t||"year"in t)&&(this.delete(["day","weekday","month","year"]),this.imply("day",n.getDate()),this.imply("weekday",n.getDay()),this.imply("month",n.getMonth()+1),this.imply("year",n.getFullYear())),("second"in t||"minute"in t||"hour"in t)&&(this.delete(["second","minute","hour"]),this.imply("second",n.getSeconds()),this.imply("minute",n.getMinutes()),this.imply("hour",n.getHours())),this}delete(t){typeof t=="string"&&(t=[t]);for(let r of t)delete this.knownValues[r],delete this.impliedValues[r]}clone(){let t=new e(this.reference);t.knownValues={},t.impliedValues={};for(let r in this.knownValues)t.knownValues[r]=this.knownValues[r];for(let r in this.impliedValues)t.impliedValues[r]=this.impliedValues[r];return t}isOnlyDate(){return!this.isCertain("hour")&&!this.isCertain("minute")&&!this.isCertain("second")}isOnlyTime(){return!this.isCertain("weekday")&&!this.isCertain("day")&&!this.isCertain("month")&&!this.isCertain("year")}isOnlyWeekdayComponent(){return this.isCertain("weekday")&&!this.isCertain("day")&&!this.isCertain("month")}isDateWithUnknownYear(){return this.isCertain("month")&&!this.isCertain("year")}isValidDate(){let t=new Date(Date.UTC(this.get("year"),this.get("month")-1,this.get("day"),this.get("hour"),this.get("minute"),this.get("second"),this.get("millisecond")));return t.setUTCFullYear(this.get("year")),!(t.getUTCFullYear()!==this.get("year")||t.getUTCMonth()!==this.get("month")-1||t.getUTCDate()!==this.get("day")||this.get("hour")!=null&&t.getUTCHours()!=this.get("hour")||this.get("minute")!=null&&t.getUTCMinutes()!=this.get("minute"))}toString(){return`[ParsingComponents {
            tags: ${JSON.stringify(Array.from(this._tags).sort())}, 
            knownValues: ${JSON.stringify(this.knownValues)}, 
            impliedValues: ${JSON.stringify(this.impliedValues)}}, 
            reference: ${JSON.stringify(this.reference)}]`}date(){let t=this.get("timezoneOffset")??this.reference.timezoneOffset;if(t==null)return this.dateWithoutTimezoneAdjustment();let r=new Date(Date.UTC(this.get("year"),this.get("month")-1,this.get("day"),this.get("hour"),this.get("minute"),this.get("second"),this.get("millisecond")));return r.setUTCFullYear(this.get("year")),new Date(r.getTime()-t*6e4)}addTag(t){return this._tags.add(t),this}addTags(t){for(let r of t)this._tags.add(r);return this}tags(){return new Set(this._tags)}dateWithoutTimezoneAdjustment(){let t=new Date(this.get("year"),this.get("month")-1,this.get("day"),this.get("hour"),this.get("minute"),this.get("second"),this.get("millisecond"));return t.setFullYear(this.get("year")),t}},Tt=class e{refDate;index;text;reference;start;end;constructor(t,r,n,i,s){this.reference=t,this.refDate=t.instant,this.index=r,this.text=n,this.start=i||new ge(t),this.end=s}clone(){let t=new e(this.reference,this.index,this.text);return t.start=this.start?this.start.clone():null,t.end=this.end?this.end.clone():null,t}date(){return this.start.date()}addTag(t){return this.start.addTag(t),this.end&&this.end.addTag(t),this}addTags(t){return this.start.addTags(t),this.end&&this.end.addTags(t),this}tags(){let t=new Set(this.start.tags());if(this.end)for(let r of this.end.tags())t.add(r);return t}toString(){let t=Array.from(this.tags()).sort();return`[ParsingResult {index: ${this.index}, text: '${this.text}', tags: ${JSON.stringify(t)} ...}]`}};function hs(e,t,r="\\s{0,5},?\\s{0,5}"){let n=t.replace(/\((?!\?)/g,"(?:");return`${e}${n}(?:${r}${n}){0,10}`}function w1(e){let t;return e instanceof Array?t=[...e]:e instanceof Map?t=Array.from(e.keys()):t=Object.keys(e),t}function De(e){return`(?:${w1(e).sort((r,n)=>n.length-r.length).join("|").replace(/\./g,"\\.")})`}function di(e){return e<100&&(e>50?e=e+1900:e=e+2e3),e}function yt(e,t,r){let n=new Date(e);n.setMonth(r-1),n.setDate(t);let i=Be(n,{year:1}),s=Be(n,{year:-1});return Math.abs(i.getTime()-e.getTime())<Math.abs(n.getTime()-e.getTime())?n=i:Math.abs(s.getTime()-e.getTime())<Math.abs(n.getTime()-e.getTime())&&(n=s),n.getFullYear()}var pi={sunday:0,sun:0,"sun.":0,monday:1,mon:1,"mon.":1,tuesday:2,tue:2,"tue.":2,wednesday:3,wed:3,"wed.":3,thursday:4,thurs:4,"thurs.":4,thur:4,"thur.":4,thu:4,"thu.":4,friday:5,fri:5,"fri.":5,saturday:6,sat:6,"sat.":6},ys={january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12},Ve={...ys,jan:1,"jan.":1,feb:2,"feb.":2,mar:3,"mar.":3,apr:4,"apr.":4,jun:6,"jun.":6,jul:7,"jul.":7,aug:8,"aug.":8,sep:9,"sep.":9,sept:9,"sept.":9,oct:10,"oct.":10,nov:11,"nov.":11,dec:12,"dec.":12},ms={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12},gs={first:1,second:2,third:3,fourth:4,fifth:5,sixth:6,seventh:7,eighth:8,ninth:9,tenth:10,eleventh:11,twelfth:12,thirteenth:13,fourteenth:14,fifteenth:15,sixteenth:16,seventeenth:17,eighteenth:18,nineteenth:19,twentieth:20,"twenty first":21,"twenty-first":21,"twenty second":22,"twenty-second":22,"twenty third":23,"twenty-third":23,"twenty fourth":24,"twenty-fourth":24,"twenty fifth":25,"twenty-fifth":25,"twenty sixth":26,"twenty-sixth":26,"twenty seventh":27,"twenty-seventh":27,"twenty eighth":28,"twenty-eighth":28,"twenty ninth":29,"twenty-ninth":29,thirtieth:30,"thirty first":31,"thirty-first":31},Il={second:"second",seconds:"second",minute:"minute",minutes:"minute",hour:"hour",hours:"hour",day:"day",days:"day",week:"week",weeks:"week",month:"month",months:"month",quarter:"quarter",quarters:"quarter",year:"year",years:"year"},Xr={s:"second",sec:"second",second:"second",seconds:"second",m:"minute",min:"minute",mins:"minute",minute:"minute",minutes:"minute",h:"hour",hr:"hour",hrs:"hour",hour:"hour",hours:"hour",d:"day",day:"day",days:"day",w:"week",week:"week",weeks:"week",mo:"month",mon:"month",mos:"month",month:"month",months:"month",qtr:"quarter",quarter:"quarter",quarters:"quarter",y:"year",yr:"year",year:"year",years:"year",...Il},Cl=`(?:${De(ms)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}an?)?|an?\\b(?:\\s{0,2}few)?|few|several|the|a?\\s{0,2}couple\\s{0,2}(?:of)?)`;function $1(e){let t=e.toLowerCase();return ms[t]!==void 0?ms[t]:t==="a"||t==="an"||t=="the"?1:t.match(/few/)?3:t.match(/half/)?.5:t.match(/couple/)?2:t.match(/several/)?7:parseFloat(t)}var Cr=`(?:${De(gs)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;function Ar(e){let t=e.toLowerCase();return gs[t]!==void 0?gs[t]:(t=t.replace(/(?:st|nd|rd|th)$/i,""),parseInt(t))}var Gt="(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-9][0-9]{3}|[0-9]{2}(?!\\w|:\\d|\\s+(?:am|pm|o\\s*clock|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)))";function wt(e){if(/BE/i.test(e))return e=e.replace(/BE/i,""),parseInt(e)-543;if(/BCE?/i.test(e))return e=e.replace(/BCE?/i,""),-parseInt(e);if(/(AD|CE)/i.test(e))return e=e.replace(/(AD|CE)/i,""),parseInt(e);let t=parseInt(e);return di(t)}var Al=`(${Cl})\\s{0,3}(${De(Xr)})`,Sl=new RegExp(Al,"i"),_1=`(${Cl})\\s{0,3}(${De(Il)})`,zl="\\s{0,5},?(?:\\s*and)?\\s{0,5}",Et=hs("(?:(?:about|around)\\s{0,3})?",Al,zl),Ft=hs("(?:(?:about|around)\\s{0,3})?",_1,zl);function et(e){let t={},r=e,n=Sl.exec(r);for(;n;)b1(t,n),r=r.substring(n[0].length).trim(),n=Sl.exec(r);return Object.keys(t).length==0?null:t}function b1(e,t){if(t[0].match(/^[a-zA-Z]+$/))return;let r=$1(t[1]),n=Xr[t[2].toLowerCase()];e[n]=r}var ye=class{innerPatternHasChange(t,r){return this.innerPattern(t)!==r}patternLeftBoundary(){return"(\\W|^)"}cachedInnerPattern=null;cachedPattern=null;pattern(t){return this.cachedInnerPattern&&!this.innerPatternHasChange(t,this.cachedInnerPattern)?this.cachedPattern:(this.cachedInnerPattern=this.innerPattern(t),this.cachedPattern=new RegExp(`${this.patternLeftBoundary()}${this.cachedInnerPattern.source}`,this.cachedInnerPattern.flags),this.cachedPattern)}extract(t,r){let n=r[1]??"";r.index=r.index+n.length,r[0]=r[0].substring(n.length);for(let i=2;i<r.length;i++)r[i-1]=r[i];return this.innerExtract(t,r)}};var v1=new RegExp(`(?:(?:within|in|for)\\s*)?(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Et})(?=\\W|$)`,"i"),x1=new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Et})(?=\\W|$)`,"i"),k1=new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Ft})(?=\\W|$)`,"i"),Qr=class extends ye{strictMode;constructor(t){super(),this.strictMode=t}innerPattern(t){return this.strictMode?k1:t.option.forwardDate?v1:x1}innerExtract(t,r){if(r[0].match(/^for\s*the\s*\w+/i))return null;let n=et(r[1]);return n?ge.createRelativeFromReference(t.reference,n):null}};var T1=new RegExp(`(?:on\\s{0,3})?(${Cr})(?:\\s{0,3}(?:to|\\-|\\\u2013|until|through|till)\\s{0,3}(${Cr}))?(?:-|/|\\s{0,3}(?:of)?\\s{0,3})(${De(Ve)})(?:(?:-|/|,?\\s{0,3})(${Gt}(?!\\w)))?(?=\\W|$)`,"i"),Ol=1,Rl=2,E1=3,Dl=4,Jr=class extends ye{innerPattern(){return T1}innerExtract(t,r){let n=t.createParsingResult(r.index,r[0]),i=Ve[r[E1].toLowerCase()],s=Ar(r[Ol]);if(s>31)return r.index=r.index+r[Ol].length,null;if(n.start.assign("month",i),n.start.assign("day",s),r[Dl]){let a=wt(r[Dl]);n.start.assign("year",a)}else{let a=yt(t.refDate,s,i);n.start.imply("year",a)}if(r[Rl]){let a=Ar(r[Rl]);n.end=n.start.clone(),n.end.assign("day",a)}return n}};var S1=new RegExp(`(${De(Ve)})(?:-|/|\\s*,?\\s*)(${Cr})(?!\\s*(?:am|pm))\\s*(?:(?:to|\\-)\\s*(${Cr})\\s*)?(?:(?:-|/|\\s*,\\s*|\\s+)(${Gt}))?(?=\\W|$)(?!\\:\\d)`,"i"),I1=1,Nl=2,ws=3,$s=4,en=class extends ye{shouldSkipYearLikeDate;constructor(t){super(),this.shouldSkipYearLikeDate=t}innerPattern(){return S1}innerExtract(t,r){let n=Ve[r[I1].toLowerCase()],i=Ar(r[Nl]);if(i>31||this.shouldSkipYearLikeDate&&!r[ws]&&!r[$s]&&r[Nl].match(/^\d{2}$/))return null;let s=t.createParsingComponents({day:i,month:n}).addTag("parser/ENMonthNameMiddleEndianParser");if(r[$s]){let l=wt(r[$s]);s.assign("year",l)}else{let l=yt(t.refDate,i,n);s.imply("year",l)}if(!r[ws])return s;let a=Ar(r[ws]),o=t.createParsingResult(r.index,r[0]);return o.start=s,o.end=s.clone(),o.end.assign("day",a),o}};var C1=new RegExp(`((?:in)\\s*)?(${De(Ve)})\\s*(?:(?:,|-|of)?\\s*(${Gt})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`,"i"),A1=1,z1=2,Ml=3,tn=class extends ye{innerPattern(){return C1}innerExtract(t,r){let n=r[z1].toLowerCase();if(r[0].length<=3&&!ys[n])return null;let i=t.createParsingResult(r.index+(r[A1]||"").length,r.index+r[0].length);i.start.imply("day",1),i.start.addTag("parser/ENMonthNameParser");let s=Ve[n];if(i.start.assign("month",s),r[Ml]){let a=wt(r[Ml]);i.start.assign("year",a)}else{let a=yt(t.refDate,1,s);i.start.imply("year",a)}return i}};var O1=new RegExp(`([0-9]{4})[-\\.\\/\\s](?:(${De(Ve)})|([0-9]{1,2}))[-\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`,"i"),R1=1,D1=2,Pl=3,N1=4,rn=class extends ye{strictMonthDateOrder;constructor(t){super(),this.strictMonthDateOrder=t}innerPattern(){return O1}innerExtract(t,r){let n=parseInt(r[R1]),i=parseInt(r[N1]),s=r[Pl]?parseInt(r[Pl]):Ve[r[D1].toLowerCase()];if(s<1||s>12){if(this.strictMonthDateOrder)return null;i>=1&&i<=12&&([s,i]=[i,s])}return i<1||i>31?null:{day:i,month:s,year:n}}};var M1="(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-9][0-9]{3})",P1=new RegExp(`(${M1})(?:\\s*[-.\\/,]?\\s*|\\s+of\\s+)(${De(Ve)})(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`,"i"),B1=1,U1=2,nn=class extends ye{innerPattern(){return P1}innerExtract(t,r){let n=wt(r[B1]),i=r[U1].toLowerCase(),s=Ve[i],a=t.createParsingResult(r.index,r[0]);return a.start.imply("day",1),a.start.assign("month",s),a.start.assign("year",n),a.start.addTag("parser/ENYearMonthNameParser"),a}};var W1=new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})","i"),L1=1,V1=2,sn=class extends ye{innerPattern(){return W1}innerExtract(t,r){if(/\d\/?$/.test(t.text.substring(0,r.index)))return null;let n=parseInt(r[V1]),i=parseInt(r[L1]);return t.createParsingComponents().imply("day",1).assign("month",i).assign("year",n)}};function q1(e,t,r,n){return new RegExp(`${e}${t}(\\d{1,4})(?:(?:\\.|:|\uFF1A)(\\d{1,2})(?:(?::|\uFF1A)(\\d{2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${r}`,n)}function G1(e,t){return new RegExp(`^(${e})(\\d{1,4})(?:(?:\\.|\\:|\\\uFF1A)(\\d{1,2})(?:(?:\\.|\\:|\\\uFF1A)(\\d{1,2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${t}`,"i")}var _s=2,nr=3,ci=4,fi=5,zr=6,hi=class{strictMode;constructor(t=!1){this.strictMode=t}patternFlags(){return"i"}primaryPatternLeftBoundary(){return"(^|\\s|T|\\b)"}primarySuffix(){return"(?!/)(?=\\W|$)"}followingSuffix(){return"(?!/)(?=\\W|$)"}pattern(t){return this.getPrimaryTimePatternThroughCache()}extract(t,r){let n=this.extractPrimaryTimeComponents(t,r);if(!n)return r[0].match(/^\d{4}/)?(r.index+=4,null):(r.index+=r[0].length,null);let i=r.index+r[1].length,s=r[0].substring(r[1].length),a=t.createParsingResult(i,s,n);r.index+=r[0].length;let o=t.text.substring(r.index),d=this.getFollowingTimePatternThroughCache().exec(o);return s.match(/^\d{3,4}/)&&d&&(d[0].match(/^\s*([+-])\s*\d{2,4}$/)||d[0].match(/^\s*([+-])\s*\d{2}\W\d{2}/))?null:!d||d[0].match(/^\s*([+-])\s*\d{3,4}$/)?this.checkAndReturnWithoutFollowingPattern(a):(a.end=this.extractFollowingTimeComponents(t,d,a),a.end&&(a.text+=d[0]),this.checkAndReturnWithFollowingPattern(a))}extractPrimaryTimeComponents(t,r,n=!1){let i=t.createParsingComponents(),s=0,a=null,o=parseInt(r[_s]);if(o>100){if(r[_s].length==4&&r[nr]==null&&!r[zr]||this.strictMode||r[nr]!=null)return null;s=o%100,o=Math.floor(o/100)}if(o>24)return null;if(r[nr]!=null){if(r[nr].length==1&&!r[zr])return null;s=parseInt(r[nr])}if(s>=60)return null;if(o>12&&(a=pe.PM),r[zr]!=null){if(o>12)return null;let l=r[zr][0].toLowerCase();l=="a"&&(a=pe.AM,o==12&&(o=0)),l=="p"&&(a=pe.PM,o!=12&&(o+=12))}if(i.assign("hour",o),i.assign("minute",s),a!==null?i.assign("meridiem",a):o<12?i.imply("meridiem",pe.AM):i.imply("meridiem",pe.PM),r[fi]!=null){let l=parseInt(r[fi].substring(0,3));if(l>=1e3)return null;i.assign("millisecond",l)}if(r[ci]!=null){let l=parseInt(r[ci]);if(l>=60)return null;i.assign("second",l)}return i}extractFollowingTimeComponents(t,r,n){let i=t.createParsingComponents();if(r[fi]!=null){let l=parseInt(r[fi].substring(0,3));if(l>=1e3)return null;i.assign("millisecond",l)}if(r[ci]!=null){let l=parseInt(r[ci]);if(l>=60)return null;i.assign("second",l)}let s=parseInt(r[_s]),a=0,o=-1;if(r[nr]!=null?a=parseInt(r[nr]):s>100&&(a=s%100,s=Math.floor(s/100)),a>=60||s>24)return null;if(s>=12&&(o=pe.PM),r[zr]!=null){if(s>12)return null;let l=r[zr][0].toLowerCase();l=="a"&&(o=pe.AM,s==12&&(s=0,i.isCertain("day")||i.addDurationAsImplied({day:1}))),l=="p"&&(o=pe.PM,s!=12&&(s+=12)),n.start.isCertain("meridiem")||(o==pe.AM?(n.start.imply("meridiem",pe.AM),n.start.get("hour")==12&&n.start.assign("hour",0)):(n.start.imply("meridiem",pe.PM),n.start.get("hour")!=12&&n.start.assign("hour",n.start.get("hour")+12)))}return i.assign("hour",s),i.assign("minute",a),o>=0?i.assign("meridiem",o):n.start.isCertain("meridiem")&&n.start.get("hour")>12?n.start.get("hour")-12>s?i.imply("meridiem",pe.AM):s<=12&&(i.assign("hour",s+12),i.assign("meridiem",pe.PM)):s>12?i.imply("meridiem",pe.PM):s<=12&&i.imply("meridiem",pe.AM),i.date().getTime()<n.start.date().getTime()&&i.addDurationAsImplied({day:1}),i}checkAndReturnWithoutFollowingPattern(t){if(t.text.match(/^\d$/)||t.text.match(/^\d\d\d+$/)||t.text.match(/\d[apAP]$/))return null;let r=t.text.match(/[^\d:.](\d[\d.]+)$/);if(r){let n=r[1];if(this.strictMode||n.includes(".")&&!n.match(/\d(\.\d{2})+$/)||parseInt(n)>24)return null}return t}checkAndReturnWithFollowingPattern(t){if(t.text.match(/^\d+-\d+$/))return null;let r=t.text.match(/[^\d:.](\d[\d.]+)\s*-\s*(\d[\d.]+)$/);if(r){if(this.strictMode)return null;let n=r[1],i=r[2];if(i.includes(".")&&!i.match(/\d(\.\d{2})+$/))return null;let s=parseInt(i),a=parseInt(n);if(s>24||a>24)return null}return t}cachedPrimaryPrefix=null;cachedPrimarySuffix=null;cachedPrimaryTimePattern=null;getPrimaryTimePatternThroughCache(){let t=this.primaryPrefix(),r=this.primarySuffix();return this.cachedPrimaryPrefix===t&&this.cachedPrimarySuffix===r?this.cachedPrimaryTimePattern:(this.cachedPrimaryTimePattern=q1(this.primaryPatternLeftBoundary(),t,r,this.patternFlags()),this.cachedPrimaryPrefix=t,this.cachedPrimarySuffix=r,this.cachedPrimaryTimePattern)}cachedFollowingPhase=null;cachedFollowingSuffix=null;cachedFollowingTimePatten=null;getFollowingTimePatternThroughCache(){let t=this.followingPhase(),r=this.followingSuffix();return this.cachedFollowingPhase===t&&this.cachedFollowingSuffix===r?this.cachedFollowingTimePatten:(this.cachedFollowingTimePatten=G1(t,r),this.cachedFollowingPhase=t,this.cachedFollowingSuffix=r,this.cachedFollowingTimePatten)}};var an=class extends hi{constructor(t){super(t)}followingPhase(){return"\\s*(?:\\-|\\\u2013|\\~|\\\u301C|to|until|through|till|\\?)\\s*"}primaryPrefix(){return"(?:(?:at|from)\\s*)??"}primarySuffix(){return"(?:\\s*(?:o\\W*clock|at\\s*night|in\\s*the\\s*(?:morning|afternoon)))?(?!/)(?=\\W|$)"}extractPrimaryTimeComponents(t,r){let n=super.extractPrimaryTimeComponents(t,r);if(!n)return n;if(r[0].endsWith("night")){let i=n.get("hour");i>=6&&i<12?(n.assign("hour",n.get("hour")+12),n.assign("meridiem",pe.PM)):i<6&&n.assign("meridiem",pe.AM)}if(r[0].endsWith("afternoon")){n.assign("meridiem",pe.PM);let i=n.get("hour");i>=0&&i<=6&&n.assign("hour",n.get("hour")+12)}return r[0].endsWith("morning")&&(n.assign("meridiem",pe.AM),n.get("hour")<12&&n.assign("hour",n.get("hour"))),n.addTag("parser/ENTimeExpressionParser")}extractFollowingTimeComponents(t,r,n){let i=super.extractFollowingTimeComponents(t,r,n);return i&&i.addTag("parser/ENTimeExpressionParser"),i}};var F1=new RegExp(`(${Et})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`,"i"),H1=new RegExp(`(${Ft})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`,"i"),on=class extends ye{strictMode;constructor(t){super(),this.strictMode=t}innerPattern(){return this.strictMode?H1:F1}innerExtract(t,r){let n=et(r[1]);return n?ge.createRelativeFromReference(t.reference,Vt(n)):null}};var j1=new RegExp(`(${Et})\\s{0,5}(?:later|after|from now|henceforth|forward|out)(?=(?:\\W|$))`,"i"),K1=new RegExp(`(${Ft})\\s{0,5}(later|after|from now)(?=\\W|$)`,"i"),Y1=1,un=class extends ye{strictMode;constructor(t){super(),this.strictMode=t}innerPattern(){return this.strictMode?K1:j1}innerExtract(t,r){let n=et(r[Y1]);return n?ge.createRelativeFromReference(t.reference,n):null}};var Or=class{refine(t,r){return r.filter(n=>this.isValid(t,n))}},tt=class{refine(t,r){if(r.length<2)return r;let n=[],i=r[0],s=null;for(let a=1;a<r.length;a++){s=r[a];let o=t.text.substring(i.index+i.text.length,s.index);if(!this.shouldMergeResults(o,i,s,t))n.push(i),i=s;else{let l=i,d=s,c=this.mergeResults(o,l,d,t);t.debug(()=>{console.log(`${this.constructor.name} merged ${l} and ${d} into ${c}`)}),i=c}}return i!=null&&n.push(i),n}};var ln=class extends tt{shouldMergeResults(t,r,n){return!r.end&&!n.end&&t.match(this.patternBetween())!=null}mergeResults(t,r,n){if(!r.start.isOnlyWeekdayComponent()&&!n.start.isOnlyWeekdayComponent()&&(n.start.getCertainComponents().forEach(s=>{r.start.isCertain(s)||r.start.imply(s,n.start.get(s))}),r.start.getCertainComponents().forEach(s=>{n.start.isCertain(s)||n.start.imply(s,r.start.get(s))})),r.start.date()>n.start.date()){let s=r.start.date(),a=n.start.date();n.start.isOnlyWeekdayComponent()&&Be(a,{day:7})>s?(a=Be(a,{day:7}),n.start.imply("day",a.getDate()),n.start.imply("month",a.getMonth()+1),n.start.imply("year",a.getFullYear())):r.start.isOnlyWeekdayComponent()&&Be(s,{day:-7})<a?(s=Be(s,{day:-7}),r.start.imply("day",s.getDate()),r.start.imply("month",s.getMonth()+1),r.start.imply("year",s.getFullYear())):n.start.isDateWithUnknownYear()&&Be(a,{year:1})>s?(a=Be(a,{year:1}),n.start.imply("year",a.getFullYear())):r.start.isDateWithUnknownYear()&&Be(s,{year:-1})<a?(s=Be(s,{year:-1}),r.start.imply("year",s.getFullYear())):[n,r]=[r,n]}let i=r.clone();return i.start=r.start,i.end=n.start,i.index=Math.min(r.index,n.index),r.index<n.index?i.text=r.text+t+n.text:i.text=n.text+t+r.text,i}};var dn=class extends ln{patternBetween(){return/^\s*(to|-|–|until|through|till)\s*$/i}};function bs(e,t){let r=e.clone(),n=e.start,i=t.start;if(r.start=Bl(n,i),e.end!=null||t.end!=null){let s=e.end==null?e.start:e.end,a=t.end==null?t.start:t.end,o=Bl(s,a);if(e.end==null&&o.date().getTime()<r.start.date().getTime()){let l=new Date(o.date().getTime());l.setDate(l.getDate()+1),o.isCertain("day")?at(o,l):kt(o,l)}r.end=o}return r}function Bl(e,t){let r=e.clone();t.isCertain("hour")?(r.assign("hour",t.get("hour")),r.assign("minute",t.get("minute")),t.isCertain("second")?(r.assign("second",t.get("second")),t.isCertain("millisecond")?r.assign("millisecond",t.get("millisecond")):r.imply("millisecond",t.get("millisecond"))):(r.imply("second",t.get("second")),r.imply("millisecond",t.get("millisecond")))):(r.imply("hour",t.get("hour")),r.imply("minute",t.get("minute")),r.imply("second",t.get("second")),r.imply("millisecond",t.get("millisecond"))),t.isCertain("timezoneOffset")&&r.assign("timezoneOffset",t.get("timezoneOffset"));let n=e.get("meridiem")!=null&&(e.isCertain("meridiem")||Array.from(e.tags()).some(i=>i.startsWith("casualReference/")));return t.isCertain("meridiem")?r.assign("meridiem",t.get("meridiem")):t.get("meridiem")!=null&&!n&&r.imply("meridiem",t.get("meridiem")),r.get("meridiem")==pe.PM&&r.get("hour")<12&&(t.isCertain("hour")?r.assign("hour",r.get("hour")+12):r.imply("hour",r.get("hour")+12)),r.addTags(e.tags()),r.addTags(t.tags()),r}var pn=class extends tt{shouldMergeResults(t,r,n){let i=r.start.isOnlyDate()&&n.start.isOnlyTime(),s=r.start.isOnlyTime()&&n.start.isOnlyDate();return s&&t.trim()===":"?!1:(i||s)&&t.match(this.patternBetween())!=null}mergeResults(t,r,n){let i=r.start.isOnlyDate()?bs(r,n):bs(n,r);return i.index=r.index,i.text=r.text+t+n.text,i}};var Rr=class extends pn{patternBetween(){return new RegExp("^\\s*(T|at|after|before|on|of|,|-|\\.|\u2219|:)?\\s*$")}};var Z1=new RegExp("^\\s*,?\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)","i"),cn=class{timezoneOverrides;constructor(t){this.timezoneOverrides=t}refine(t,r){let n=t.option.timezones??{};return r.forEach(i=>{let s=t.text.substring(i.index+i.text.length),a=Z1.exec(s);if(!a)return;let o=a[1].toUpperCase(),l=i.start.date()??i.refDate??new Date,d={...this.timezoneOverrides,...n},c=li(o,l,d);if(c==null)return;t.debug(()=>{console.log(`Extracting timezone: '${o}' into: ${c} for: ${i.start}`)});let f=i.start.get("timezoneOffset");f!==null&&c!=f&&(i.start.isCertain("timezoneOffset")||o!=a[1])||i.start.isOnlyDate()&&o!=a[1]||(i.text+=a[0],i.start.isCertain("timezoneOffset")||i.start.assign("timezoneOffset",c),i.end!=null&&!i.end.isCertain("timezoneOffset")&&i.end.assign("timezoneOffset",c))}),r}};var X1=new RegExp("^\\s*(?:\\(?(?:GMT|UTC)\\s?)?([+-])(\\d{1,2})(?::?(\\d{2}))?\\)?","i"),Q1=1,J1=2,e$=3,fn=class{refine(t,r){return r.forEach(function(n){if(n.start.isCertain("timezoneOffset"))return;let i=t.text.substring(n.index+n.text.length),s=X1.exec(i);if(!s)return;t.debug(()=>{console.log(`Extracting timezone: '${s[0]}' into : ${n}`)});let a=parseInt(s[J1]),o=parseInt(s[e$]||"0"),l=a*60+o;l>840||(s[Q1]==="-"&&(l=-l),n.end!=null&&n.end.assign("timezoneOffset",l),n.start.assign("timezoneOffset",l),n.text+=s[0])}),r}};var Ht=class{refine(t,r){if(r.length<2)return r;let n=[],i=r[0];for(let s=1;s<r.length;s++){let a=r[s];if(a.index>=i.index+i.text.length){n.push(i),i=a;continue}let o=null,l=null;a.text.length>i.text.length?(o=a,l=i):(o=i,l=a),t.debug(()=>{console.log(`${this.constructor.name} remove ${l} by ${o}`)}),i=o}return i!=null&&n.push(i),n}};function Ul(e,t,r){let n=e.getDateWithAdjustedTimezone(),i=t$(n,t,r),s=new ge(e);return s=s.addDurationAsImplied({day:i}),s.assign("weekday",t),s}function t$(e,t,r){let n=e.getDay();switch(r){case"this":return ir(e,t);case"last":return Wl(e,t);case"next":return n==Ee.SUNDAY?t==Ee.SUNDAY?7:t:n==Ee.SATURDAY?t==Ee.SATURDAY?7:t==Ee.SUNDAY?8:1+t:t<n&&t!=Ee.SUNDAY?ir(e,t):ir(e,t)+7}return r$(e,t)}function r$(e,t){let r=Wl(e,t),n=ir(e,t);return n<-r?n:r}function ir(e,t){let r=e.getDay(),n=t-r;return n<0&&(n+=7),n}function Wl(e,t){let r=e.getDay(),n=t-r;return n>=0&&(n-=7),n}var hn=class{refine(t,r){return t.option.forwardDate&&r.forEach(n=>{let i=t.reference.getDateWithAdjustedTimezone();if(n.start.isOnlyTime()&&t.reference.instant>n.start.date()){let s=t.reference.getDateWithAdjustedTimezone(),a=new Date(s);a.setDate(a.getDate()+1),kt(n.start,a),t.debug(()=>{console.log(`${this.constructor.name} adjusted ${n} time from the ref date (${s}) to the following day (${a})`)}),n.end&&n.end.isOnlyTime()&&(kt(n.end,a),n.start.date()>n.end.date()&&(a.setDate(a.getDate()+1),kt(n.end,a)))}if(n.start.isOnlyWeekdayComponent()&&i>n.start.date()){let s=ir(i,n.start.get("weekday"))||7,a=Be(i,{day:s});if(kt(n.start,a),t.debug(()=>{console.log(`${this.constructor.name} adjusted ${n} weekday (${n.start})`)}),n.end&&n.start.date()>n.end.date()){let o=ir(i,n.start.get("weekday"))||7,l=Be(i,{day:o});kt(n.end,l),t.debug(()=>{console.log(`${this.constructor.name} adjusted ${n} weekday (${n.end})`)})}}if(n.start.isDateWithUnknownYear()&&i>n.start.date())for(let s=0;s<3&&i>n.start.date();s++)n.start.imply("year",n.start.get("year")+1),t.debug(()=>{console.log(`${this.constructor.name} adjusted ${n} year (${n.start})`)}),n.end&&!n.end.isCertain("year")&&(n.end.imply("year",n.end.get("year")+1),t.debug(()=>{console.log(`${this.constructor.name} adjusted ${n} month (${n.start})`)}))}),r}};var mn=class extends Or{strictMode;constructor(t){super(),this.strictMode=t}isValid(t,r){return r.text.replace(" ","").match(/^\d*(\.\d*)?$/)?(t.debug(()=>{console.log(`Removing unlikely result '${r.text}'`)}),!1):r.start.isValidDate()?r.end&&!r.end.isValidDate()?(t.debug(()=>{console.log(`Removing invalid result: ${r} (${r.end})`)}),!1):this.strictMode?this.isStrictModeValid(t,r):!0:(t.debug(()=>{console.log(`Removing invalid result: ${r} (${r.start})`)}),!1)}isStrictModeValid(t,r){return r.start.isOnlyWeekdayComponent()?(t.debug(()=>{console.log(`(Strict) Removing weekday only component: ${r} (${r.end})`)}),!1):!0}};var n$=new RegExp("([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})(?:T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?(Z|([+-]\\d{2}):?(\\d{2})?)?)?(?=\\W|$)","i"),i$=1,s$=2,a$=3,Ll=4,o$=5,Vl=6,ql=7,u$=8,Gl=9,Fl=10,gn=class extends ye{innerPattern(){return n$}innerExtract(t,r){let n=t.createParsingComponents({year:parseInt(r[i$]),month:parseInt(r[s$]),day:parseInt(r[a$])});if(r[Ll]!=null&&(n.assign("hour",parseInt(r[Ll])),n.assign("minute",parseInt(r[o$])),r[Vl]!=null&&n.assign("second",parseInt(r[Vl])),r[ql]!=null&&n.assign("millisecond",parseInt(r[ql])),r[u$]!=null)){let i=0;if(r[Gl]){let s=parseInt(r[Gl]),a=0;r[Fl]!=null&&(a=parseInt(r[Fl])),i=s*60,i<0?i-=a:i+=a}n.assign("timezoneOffset",i)}return n.addTag("parser/ISOFormatParser")}};var yn=class extends tt{mergeResults(t,r,n){let i=n.clone();return i.index=r.index,i.text=r.text+t+i.text,i.start.assign("weekday",r.start.get("weekday")),i.end&&i.end.assign("weekday",r.start.get("weekday")),i}shouldMergeResults(t,r,n){return r.start.isOnlyWeekdayComponent()&&!r.start.isCertain("hour")&&n.start.isCertain("day")&&!n.start.tags().has("result/relativeDate")&&t.match(/^,?\s*$/)!=null}};function Hl(e,t=!1){return e.parsers.unshift(new gn),e.refiners.unshift(new yn),e.refiners.unshift(new fn),e.refiners.unshift(new Ht),e.refiners.push(new cn),e.refiners.push(new Ht),e.refiners.push(new hn),e.refiners.push(new mn(t)),e}function jl(e){let t=e.getDateWithAdjustedTimezone(),r=new ge(e,{});return at(r,t),ui(r,t),r.assign("timezoneOffset",e.getTimezoneOffset()),r.addTag("casualReference/now"),r}function Kl(e){let t=e.getDateWithAdjustedTimezone(),r=new ge(e,{});return at(r,t),Zr(r,t),r.delete("meridiem"),r.addTag("casualReference/today"),r}function Yl(e){return l$(e,1).addTag("casualReference/yesterday")}function Zl(e){return mi(e,1).addTag("casualReference/tomorrow")}function l$(e,t){return mi(e,-t)}function mi(e,t){let r=e.getDateWithAdjustedTimezone(),n=new ge(e,{}),i=new Date(r.getTime());return i.setDate(i.getDate()+t),at(n,i),Zr(n,i),n.delete("meridiem"),n}function Xl(e,t=22){let r=e.getDateWithAdjustedTimezone(),n=new ge(e,{});return at(n,r),n.imply("hour",t),n.imply("meridiem",pe.PM),n.addTag("casualReference/tonight"),n}function Ql(e,t=20){let r=new ge(e,{});return r.imply("meridiem",pe.PM),r.imply("hour",t),r.addTag("casualReference/evening"),r}function Jl(e){let t=new ge(e,{});return e.getDateWithAdjustedTimezone().getHours()>2&&t.addDurationAsImplied({day:1}),t.assign("hour",0),t.imply("minute",0),t.imply("second",0),t.imply("millisecond",0),t.addTag("casualReference/midnight"),t}function ed(e,t=6){let r=new ge(e,{});return r.imply("meridiem",pe.AM),r.imply("hour",t),r.imply("minute",0),r.imply("second",0),r.imply("millisecond",0),r.addTag("casualReference/morning"),r}function td(e,t=15){let r=new ge(e,{});return r.imply("meridiem",pe.PM),r.imply("hour",t),r.imply("minute",0),r.imply("second",0),r.imply("millisecond",0),r.addTag("casualReference/afternoon"),r}function rd(e){let t=new ge(e,{});return t.imply("meridiem",pe.AM),t.assign("hour",12),t.imply("minute",0),t.imply("second",0),t.imply("millisecond",0),t.addTag("casualReference/noon"),t}var d$=/(now|today|tonight|tomorrow|overmorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i,wn=class extends ye{innerPattern(t){return d$}innerExtract(t,r){let n=t.refDate,i=r[0].toLowerCase(),s=t.createParsingComponents();switch(i){case"now":s=jl(t.reference);break;case"today":s=Kl(t.reference);break;case"yesterday":s=Yl(t.reference);break;case"tomorrow":case"tmr":case"tmrw":s=Zl(t.reference);break;case"tonight":s=Xl(t.reference);break;case"overmorrow":s=mi(t.reference,2);break;default:if(i.match(/last\s*night/)){if(n.getHours()>6){let a=new Date(n.getTime());a.setDate(a.getDate()-1),n=a}at(s,n),s.imply("hour",0)}break}return s.addTag("parser/ENCasualDateParser"),s}};var p$=/(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|midday|noon)(?=\W|$)/i,$n=class extends ye{innerPattern(){return p$}innerExtract(t,r){let n=null;switch(r[1].toLowerCase()){case"afternoon":n=td(t.reference);break;case"evening":case"night":n=Ql(t.reference);break;case"midnight":n=Jl(t.reference);break;case"morning":n=ed(t.reference);break;case"noon":case"midday":n=rd(t.reference);break}return n&&n.addTag("parser/ENCasualTimeParser"),n}};var c$=new RegExp(`(?:(?:\\,|\\(|\\\uFF08)\\s*)?(?:on\\s*?)?(?:(this|last|past|next)\\s*)?(${De(pi)}|weekend|weekday)(?:\\s*(?:\\,|\\)|\\\uFF09))?(?:\\s*(?:of\\s*)?(this|last|past|next)\\s*week)?(?=\\W|$)`,"i"),f$=1,h$=2,m$=3,_n=class extends ye{innerPattern(){return c$}innerExtract(t,r){let n=r[f$],i=r[m$],s=n||i;s=s||"",s=s.toLowerCase();let a=null;s=="last"||s=="past"?a="last":s=="next"?a="next":s=="this"&&(a="this");let o=r[h$].toLowerCase(),l;if(pi[o]!==void 0)l=pi[o];else if(o=="weekend")l=a=="last"?Ee.SUNDAY:Ee.SATURDAY;else if(o=="weekday"){let d=t.reference.getDateWithAdjustedTimezone().getDay();d==Ee.SUNDAY||d==Ee.SATURDAY?l=a=="last"?Ee.FRIDAY:Ee.MONDAY:(l=d-1,l=a=="last"?l-1:l+1,l=l%5+1)}else return null;return Ul(t.reference,l,a)}};var g$=new RegExp(`(this|last|past|next|after\\s*this)\\s*(${De(Xr)})(?=\\s*)(?=\\W|$)`,"i"),y$=1,w$=2,bn=class extends ye{innerPattern(){return g$}innerExtract(t,r){let n=r[y$].toLowerCase(),i=r[w$].toLowerCase(),s=Xr[i];if(n=="next"||n.startsWith("after")){let l={};return l[s]=1,ge.createRelativeFromReference(t.reference,l)}if(n=="last"||n=="past"){let l={};return l[s]=-1,ge.createRelativeFromReference(t.reference,l)}let a=t.createParsingComponents(),o=new Date(t.reference.instant.getTime());return i.match(/week/i)?(o.setDate(o.getDate()-o.getDay()),a.imply("day",o.getDate()),a.imply("month",o.getMonth()+1),a.imply("year",o.getFullYear())):i.match(/month/i)?(o.setDate(1),a.imply("day",o.getDate()),a.assign("year",o.getFullYear()),a.assign("month",o.getMonth()+1)):i.match(/year/i)&&(o.setDate(1),o.setMonth(0),a.imply("day",o.getDate()),a.imply("month",o.getMonth()+1),a.assign("year",o.getFullYear())),a}};var $$=new RegExp("([^\\d]|^)([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?(\\W|$)","i"),_$=1,b$=5,id=2,sd=3,vs=4,vn=class{groupNumberMonth;groupNumberDay;constructor(t){this.groupNumberMonth=t?sd:id,this.groupNumberDay=t?id:sd}pattern(){return $$}extract(t,r){let n=r.index+r[_$].length,i=r.index+r[0].length-r[b$].length;if(n>0&&t.text.substring(0,n).match("\\d/?$")||i<t.text.length&&t.text.substring(i).match("^/?\\d"))return;let s=t.text.substring(n,i);if(s.match(/^\d\.\d$/)||s.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/)||!r[vs]&&s.indexOf("/")<0)return;let a=t.createParsingResult(n,s),o=parseInt(r[this.groupNumberMonth]),l=parseInt(r[this.groupNumberDay]);if((o<1||o>12)&&o>12)if(l>=1&&l<=12&&o<=31)[l,o]=[o,l];else return null;if(l<1||l>31)return null;if(a.start.assign("day",l),a.start.assign("month",o),r[vs]){let d=parseInt(r[vs]),c=di(d);a.start.assign("year",c)}else{let d=yt(t.refDate,l,o);a.start.imply("year",d)}return a.addTag("parser/SlashDateFormatParser")}};var v$=new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${Et})(?=\\W|$)`,"i"),x$=new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${Ft})(?=\\W|$)`,"i"),xn=class extends ye{allowAbbreviations;constructor(t=!0){super(),this.allowAbbreviations=t}innerPattern(){return this.allowAbbreviations?v$:x$}innerExtract(t,r){let n=r[1].toLowerCase(),i=et(r[2]);if(!i)return null;switch(n){case"last":case"past":case"-":i=Vt(i);break}return ge.createRelativeFromReference(t.reference,i)}};function k$(e){return e.text.match(/^[+-]/i)!=null}function ad(e){return e.text.match(/^-/i)!=null}var kn=class extends tt{shouldMergeResults(t,r,n){return t.match(/^\s*$/i)?k$(n)||ad(n):!1}mergeResults(t,r,n,i){let s=et(n.text);ad(n)&&(s=Vt(s));let a=ge.createRelativeFromReference(qt.fromDate(r.start.date()),s);return new Tt(r.reference,r.index,`${r.text}${t}${n.text}`,a)}};function od(e){return e.text.match(/\s+(before|from)$/i)!=null}function T$(e){return e.text.match(/\s+(after|since)$/i)!=null}var Tn=class extends tt{patternBetween(){return/^\s*$/i}shouldMergeResults(t,r,n){return!t.match(this.patternBetween())||!od(r)&&!T$(r)?!1:!!n.start.get("day")&&!!n.start.get("month")&&!!n.start.get("year")}mergeResults(t,r,n){let i=et(r.text);od(r)&&(i=Vt(i));let s=ge.createRelativeFromReference(qt.fromDate(n.start.date()),i);return new Tt(n.reference,r.index,`${r.text}${t}${n.text}`,s)}};var E$=new RegExp(`^\\s*(${Gt})`,"i"),S$=1,En=class{refine(t,r){return r.forEach(function(n){if(!n.start.isDateWithUnknownYear())return;let i=t.text.substring(n.index+n.text.length),s=E$.exec(i);if(!s||s[0].trim().length<=3)return;t.debug(()=>{console.log(`Extracting year: '${s[0]}' into : ${n}`)});let a=wt(s[S$]);n.end!=null&&n.end.assign("year",a),n.start.assign("year",a),n.text+=s[0]}),r}};var Sn=class extends Or{constructor(){super()}isValid(t,r){let n=r.text.trim();return n===t.text.trim()?!0:n.toLowerCase()==="may"&&!t.text.substring(0,r.index).trim().match(/\b(in)$/i)?(t.debug(()=>{console.log(`Removing unlikely result: ${r}`)}),!1):n.toLowerCase().endsWith("the second")?(t.text.substring(r.index+r.text.length).trim().length>0&&t.debug(()=>{console.log(`Removing unlikely result: ${r}`)}),!1):!0}};var I$=/\b(?:last\s+day|end)\s+of\s+(?:the\s+)?$/i,C$=/^(this|last|past|next)\s*(week|month|year)$/i,A$=/^\s+(this|last|past|next)\s+year(?=\W|$)/i;function ud(e){return e==="next"?1:e==="last"||e==="past"?-1:0}var In=class{refine(t,r){return r.forEach(n=>{let i=t.text.substring(0,n.index).match(I$);if(!i)return;let s=n.text.match(C$);if(s){let a=s[1].toLowerCase();this.moveToEndOfRelativePeriod(t,n,a,s[2].toLowerCase())}else if(n.start.isCertain("month")&&!n.start.isCertain("day"))this.moveToEndOfMonth(t,n);else return;n.start.imply("hour",12),n.start.imply("minute",0),n.start.imply("second",0),n.start.imply("millisecond",0),n.start.isCertain("timezoneOffset")||n.start.delete("timezoneOffset"),n.index-=i[0].length,n.text=i[0]+n.text,n.addTag("refiner/ENEndOfPeriodRefiner")}),r}moveToEndOfRelativePeriod(t,r,n,i){let s=ud(n),a=t.reference.getDateWithAdjustedTimezone(),o;i==="week"?(o=new Date(a.getTime()),o.setDate(a.getDate()+(6-a.getDay())+s*7)):i==="month"?o=new Date(a.getFullYear(),a.getMonth()+s+1,0):o=new Date(a.getFullYear()+s,11,31),r.start.assign("day",o.getDate()),r.start.assign("month",o.getMonth()+1),r.start.assign("year",o.getFullYear()),r.start.delete("weekday"),r.start.imply("weekday",o.getDay())}moveToEndOfMonth(t,r){let n=r.start.get("year"),i=r.start.get("month"),s=t.text.substring(r.index+r.text.length).match(A$);if(s){let a=s[1].toLowerCase();n=t.reference.getDateWithAdjustedTimezone().getFullYear()+ud(a),r.start.assign("year",n),r.text+=s[0]}if(!r.start.isCertain("year")){let a=new Date(n,i,0).getDate();n=yt(t.reference.getDateWithAdjustedTimezone(),a,i),r.start.imply("year",n)}r.start.assign("day",new Date(n,i,0).getDate())}};var z$=/(?:last\s+day|end)\s+of\s+(?:the\s+)?month(?=\W|$)/i,Cn=class extends ye{innerPattern(){return z$}innerExtract(t){let r=t.reference.getDateWithAdjustedTimezone(),n=r.getFullYear(),i=r.getMonth()+1,s=new Date(n,i,0).getDate(),a=t.createParsingComponents();return a.assign("day",s),a.assign("month",i),a.assign("year",n),a.addTag("parser/ENEndOfCurrentMonthParser"),a}};var sr=class{createCasualConfiguration(t=!1){let r=this.createConfiguration(!1,t);return r.parsers.push(new wn),r.parsers.push(new $n),r.parsers.push(new Cn),r.parsers.push(new tn),r.parsers.push(new bn),r.parsers.push(new xn),r.refiners.unshift(new In),r.refiners.push(new Sn),r}createConfiguration(t=!0,r=!1){let n=Hl({parsers:[new vn(r),new Qr(t),new Jr,new en(r),new _n,new sn,new an(t),new on(t),new un(t),new nn],refiners:[new Rr]},t);return n.parsers.unshift(new rn(t)),n.refiners.unshift(new Tn),n.refiners.unshift(new kn),n.refiners.unshift(new Ht),n.refiners.push(new Rr),n.refiners.push(new En),n.refiners.push(new dn),n}};var Dr=class e{parsers;refiners;defaultConfig=new sr;constructor(t){t=t||this.defaultConfig.createCasualConfiguration(),this.parsers=[...t.parsers],this.refiners=[...t.refiners]}clone(){return new e({parsers:[...this.parsers],refiners:[...this.refiners]})}parseDate(t,r,n){let i=this.parse(t,r,n);return i.length>0?i[0].start.date():null}parse(t,r,n){let i=new xs(t,r,n),s=[];return this.parsers.forEach(a=>{let o=e.executeParser(i,a);s=s.concat(o)}),s.sort((a,o)=>a.index-o.index),this.refiners.forEach(function(a){s=a.refine(i,s)}),s}static executeParser(t,r){let n=[],i=r.pattern(t),s=t.text,a=t.text,o=i.exec(a);for(;o;){let l=o.index+s.length-a.length;o.index=l;let d=r.extract(t,o);if(!d){a=s.substring(o.index+1),o=i.exec(a);continue}let c=null;d instanceof Tt?c=d:d instanceof ge?(c=t.createParsingResult(o.index,o[0]),c.start=d):c=t.createParsingResult(o.index,o[0],d);let f=c.index,g=c.text;t.debug(()=>console.log(`${r.constructor.name} extracted (at index=${f}) '${g}'`)),n.push(c),a=s.substring(f+g.length),o=i.exec(a)}return n}},xs=class{text;option;reference;refDate;constructor(t,r,n){this.text=t,this.option=n??{},this.reference=qt.fromInput(r,this.option.timezones),this.refDate=this.reference.instant}createParsingComponents(t){return t instanceof ge?t:new ge(this.reference,t)}createParsingResult(t,r,n,i){let s=typeof r=="string"?r:this.text.substring(t,r),a=n?this.createParsingComponents(n):null,o=i?this.createParsingComponents(i):null;return new Tt(this.reference,t,s,a,o)}debug(t){this.option.debug&&(this.option.debug instanceof Function?this.option.debug(t):this.option.debug.debug(t))}};var ks=new sr,ld=new Dr(ks.createCasualConfiguration(!1)),O$=new Dr(ks.createConfiguration(!0,!1)),Zx=new Dr(ks.createCasualConfiguration(!0));var dd=ld;function Nr(e,t){return{id:e,async load(){},async predict(r,n,i){let s=performance.now();return{dsl:t(r,i?.today),ms:performance.now()-s}},dispose(){}}}var Mr=e=>e.toLowerCase().replace(/\s+/g," ").trim();var D$=["su","mo","tu","we","th","fr","sa"],jt=e=>String(e).padStart(2,"0"),N$={a:1,an:1,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10},M$=/\b(every|each|daily|weekly|monthly|yearly|annually|weekdays?|biweekly|everyday|alternate)\b/;function P$(e,t){let r=Date.UTC(e.get("year"),e.get("month")-1,e.get("day")),n=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((r-n)/864e5)}function B$(e,t,r,n){let i;if(i=t.match(/\b(this|next|last|previous|coming)\s+(week|month|year)\b/)){let a=i[1]==="this"?0:i[1]==="next"||i[1]==="coming"?1:-1;return i[2].charAt(0).toUpperCase()+(a>=0?"+":"")+a}if(/\bweekend\b/.test(t))return"sa>su";if((i=t.match(/\b(\d+|an?|one|two|three|four|five|six|seven|eight|nine|ten)\s*(day|week|month|year)s?\s*(ago|from now|later|from today)?/))&&(i[3]||/\bin\b/.test(t))){let a=/^\d/.test(i[1])?+i[1]:N$[i[1]];return`${i[3]==="ago"?"-":"+"}${a}${i[2][0]}`}let s=e.isCertain("day")&&e.isCertain("month");if(/\b(today|tomorrow|tmrw|tmr|yesterday|tonight|now)\b/.test(t)&&e.isCertain("day")){let a=P$(e,r);return`${a>=0?"+":""}${a}d`}if(e.isCertain("weekday")&&!s){let a=D$[e.get("weekday")];return/\b(next|nxt)\b/.test(n)?a+"+1":/\b(last|past|previous)\b/.test(n)?a+"-1":a}if(s){let a=`${jt(e.get("month"))}-${jt(e.get("day"))}`;return e.isCertain("year")?`${e.get("year")}-${a}`:a}if(e.isCertain("month"))return`M@${jt(e.get("month"))}`}function U$(e,t){if(!e.isCertain("hour"))return;let r=e.get("hour"),n=e.get("minute")??0;if(e.isCertain("meridiem")||r>12||r===0||/\b0\d:\d\d/.test(t)||/noon|midnight|midday/.test(t))return`${jt(r)}:${jt(n)}`;let i=r%12||12;return n?`${i}:${jt(n)}?`:`${i}?`}function pd(e,t,r,n){return{date:B$(e,t,r,n),time:U$(e,t)}}function W$(e,t,r){if(!r.time?.endsWith("?")||!t.isCertain("meridiem")||!t.isCertain("hour"))return;let n=e.get("hour")%12,i=t.get("hour"),s=n+(t.get("meridiem")===1?12:0);s>=i&&(s=n+(t.get("meridiem")===1?0:12)),r.time=`${jt(s)}:${jt(e.get("minute")??0)}`}function cd(e,t){if(e=Mr(e),!e||M$.test(e))return"x";let[r,n,i]=t.split("-").map(Number),s=new Date(r,n-1,i,12,0,0),o=dd.parse(e,s,{forwardDate:!0})[0];if(!o)return"x";let l=o;if(l.text.length<.6*e.replace(/[^\w:]/g,"").length)return"x";let d=pd(l.start,l.text,s,e),c=l.end?pd(l.end,l.text,s,e):void 0;l.end&&W$(l.start,l.end,d);let f=!!(d.date||c?.date),g=!!(d.time||c?.time);if(!f&&!g)return"x";let $=f&&g?"dt":f?"d":"t",w=(T,b)=>[T.date&&T.date!==b?.date?T.date:"",T.time??""].filter(Boolean).join(" ");if(!c)return`${$} ${w(d)}`;let k=(d.date??"")===(c.date??"");return`${$} ${w(d)}>${k?c.time??c.date:w(c)}`}var L$=Nr("chrono",(e,t)=>cd(e,t??"2026-11-03")),fd=L$;var Ne=e=>String(e).padStart(2,"0"),ar=new Map,X=(e,t)=>e.split(" ").forEach(r=>ar.set(r,t)),gd="january february march april may june july august september october november december".split(" ");gd.forEach((e,t)=>{X(e,{k:"m",v:t+1}),X(e.slice(0,3),{k:"m",v:t+1})});X("sept",{k:"m",v:9});var yd="sunday monday tuesday wednesday thursday friday saturday".split(" "),yi=["su","mo","tu","we","th","fr","sa"];yd.forEach((e,t)=>X(e+(t===4?" thur thurs thu":t===2?" tues tue":t===3?" weds wed":" "+e.slice(0,3)),{k:"w",s:yi[t]}));var V$="zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");V$.forEach((e,t)=>t&&X(e,{k:"n",v:t,w:!0}));"twenty thirty forty fifty".split(" ").forEach((e,t)=>X(e,{k:"n",v:20+10*t,w:!0,s:"tens"}));var q$="first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth".split(" ");q$.forEach((e,t)=>X(e,{k:"n",v:t+1,o:!0,w:!0}));X("thirtieth",{k:"n",v:30,o:!0,w:!0});X("fortieth",{k:"n",v:40,o:!0,w:!0});X("day",{k:"u",s:"d",sg:!0});X("days",{k:"u",s:"d"});X("week",{k:"u",s:"w",sg:!0});X("weeks wk wks",{k:"u",s:"w"});X("month",{k:"u",s:"m",sg:!0});X("months mth mos mths",{k:"u",s:"m"});X("year",{k:"u",s:"y",sg:!0});X("years yr yrs",{k:"u",s:"y"});X("to >",{k:"sep",s:"to"});X("until till til through thru ending",{k:"sep",s:"until"});X("and n",{k:"and"});X("from starting beginning begins",{k:"from"});X("between",{k:"between"});X("at",{k:"at"});X("in",{k:"in"});X("of",{k:"of"});X("for",{k:"for"});X("ago back",{k:"ago"});X("now",{k:"now"});X("after ahead",{k:"after"});X("before",{k:"before"});X("every each",{k:"every"});X("other alternate alt",{k:"other"});X("a an",{k:"a"});X("am",{k:"mer",s:"am"});X("pm",{k:"mer",s:"pm"});X("noon midday",{k:"noon"});X("midnight",{k:"mid"});X("morning",{k:"part",s:"am"});X("afternoon evening",{k:"part",s:"pm"});X("night",{k:"part",s:"night"});X("today tdy",{k:"rel",v:0});X("tomorrow tmrw tmr tmw",{k:"rel",v:1});X("overmorrow",{k:"rel",v:2});X("yesterday yday",{k:"rel",v:-1});X("next nxt",{k:"mod",v:1});X("gone passed",{k:"gone"});X("prev",{k:"mod",v:-1});X("coming",{k:"mod",v:1,s:"coming"});X("last lst previous",{k:"mod",v:-1});X("this",{k:"mod",v:0});X("weekend wknd",{k:"wknd"});X("weekdays weekday workdays workday wkdays",{k:"wkd"});X("work business",{k:"work"});X("daily everyday",{k:"daily"});X("weekly",{k:"weekly"});X("biweekly fortnightly",{k:"biweekly"});X("monthly",{k:"monthly"});X("yearly annually",{k:"yearly"});X("times time x occurrences",{k:"times"});X("end",{k:"end"});X("half",{k:"half"});X("quarter",{k:"quarter"});X("thousand",{k:"thousand"});X("martin luther row single",{k:"skip"});X("up",{k:"up"});X("past",{k:"mod",v:-1,s:"past"});X("eve",{k:"eve"});X("new",{k:"new"});X("oclock",{k:"oclock"});"the on during around about approx sometime pls please plz us st de ish just".split(" ").forEach(e=>X(e,{k:"skip"}));var hd={christmas:"12-25",xmas:"12-25",halloween:"10-31",valentines:"02-14",valentine:"02-14",juneteenth:"06-19",nye:"12-31",patricks:"03-17",cinco:"05-05",independence:"07-04",thanksgiving:"th#4@11",memorial:"mo#-1@05",labor:"mo#1@09",mlk:"mo#3@01",ny:"01-01",paddys:"03-17",mem:"mo#-1@05",turkey:"th#4@11",king:"mo#3@01",presidents:"mo#3@02",mothers:"su#2@05",mother:"su#2@05",fathers:"su#3@06",father:"su#3@06",columbus:"mo#2@10"};for(let e in hd)X(e,{k:"h",s:hd[e]});X("mayo",{k:"mayo"});"valentines valentine patricks independence presidents mlk king ny paddys mem turkey mothers mother fathers father columbus memorial labor".split(" ").forEach(e=>ar.get(e).z=!0);function G$(e,t,r){if(Math.abs(e.length-t.length)>r)return r+1;let n=[];for(let i=0;i<=e.length;i++){n[i]=[i];for(let s=1;s<=t.length;s++)if(!i)n[i][s]=s;else{let a=Math.min(n[i-1][s]+1,n[i][s-1]+1,n[i-1][s-1]+(e[i-1]===t[s-1]?0:1));i>1&&s>1&&e[i-1]===t[s-2]&&e[i-2]===t[s-1]&&(a=Math.min(a,n[i-2][s-2]+1)),n[i][s]=a}}return n[e.length][t.length]}var F$=new Set("sept tues thur thurs weds".split(" ")),H$=[...ar.keys()].filter(e=>e.length>=4&&!F$.has(e));function wd(e){if(e.length<3)return;let t=e.length>=8?2:1,r,n=t+1;for(let i of H$){if(e.length===3&&(i.length!==4||i[0]!==e[0]))continue;let s=G$(e,i,t),a=o=>Math.abs(o.length-e.length);(s<n||s===n&&r&&(a(i)<a(r)||a(i)===a(r)&&i.length>r.length))&&(n=s,r=i)}return r?ar.get(r):void 0}function Es(e){let t=ar.get(e);if(t)return t;if(e.length>=4&&e.endsWith("s")&&e!=="thus"){let r=ar.get(e.slice(0,-1));if(r&&r.k==="w")return{...r,pl:!0}}}function Ss(e){if(e.length>=3){let t=gd.findIndex(r=>r.startsWith(e));if(t>=0)return{k:"m",v:t+1,p:!0}}if(e.length>=2){let t=yd.findIndex(r=>r.startsWith(e));if(t>=0)return{k:"w",s:yi[t],p:!0}}for(let t of ar.keys())if(t.startsWith(e)&&t.length>e.length)return{k:"skip",p:!0}}function j$(e,t){let r=e.length,n=[{c:0,t:[]}];for(let i=0;i<r;i++){let s=n[i];if(s)for(let a=i+2;a<=r;a++){let o=e.slice(i,a),l=o.length===2&&!"to at of in on am pm".includes(o)?void 0:Es(o),d=1;!l&&a-i>=5&&(l=wd(o),d=3),!l&&t&&a===r&&o.length>=3&&(l=Ss(o),d=3),l&&(!n[a]||s.c+d<n[a].c)&&(n[a]={c:s.c+d,t:[...s.t,{...l,s:l.s}]})}}return n[r]?.t}var St=(e,t)=>e>=1&&e<=12&&t>=1&&t<=[31,29,31,30,31,30,31,31,30,31,30,31][e-1],K$=(e,t)=>t===(e%100>=11&&e%100<=13?"th":{1:"st",2:"nd",3:"rd"}[e%10]??"th");function Y$(e){e=e.replace(/(?<![a-z])([ap])\.\s?m\b\.?/g,"$1m").replace(/[–—−]/g,"-").replace(/'/g,"").replace(/\b2(morrow|moro|mrw)\b/g,"tomorrow").replace(/\bo ?clock\b/g,"oclock");let t=[],r=0,n=()=>t[t.length-1]?.k==="n";for(;r<e.length;){let s=e.slice(r),a;if((a=s.match(/^(\d{4})-(\d{2})-(\d{2})(?!\d)/))&&St(+a[2],+a[3]))t.push({k:"D",s:a[0],v:1});else if(a=s.match(/^(\d{1,2})([\/.-])(\d{1,2})\2(\d{4}|\d{2})(?!\d)/)){let[o,l]=[+a[1],+a[3]];o>12&&l<=12&&([o,l]=[l,o]);let d=+a[4]<100?2e3+ +a[4]:+a[4];St(o,l)?t.push({k:"D",s:`${d}-${Ne(o)}-${Ne(l)}`,v:1}):t.push({k:"?",s:a[0]})}else if((a=s.match(/^(\d{1,2})\.(\d{2})(?!\d)/))&&+a[1]<24&&+a[2]<60&&(+a[2]>31||a[2]==="00"||/^\s?([ap]m|-)/.test(s.slice(a[0].length))||/^\s?(in|morning|evening|afternoon|night)\b/.test(s.slice(a[0].length))||+a[2]%5===0&&/^\s?(to|till|til|until|through|thru)\s?\d{1,2}\.\d\d\b/.test(s.slice(a[0].length))||["m","w","D","rel","u","ago","at"].includes(t[t.length-1]?.k??"")))t.push({k:"t",v:+a[1],m:+a[2],z:a[1].length===2&&a[1][0]==="0"});else if(a=s.match(/^(\d{1,2}):(\d{2})(?!\d)/))t.push({k:"t",v:+a[1],m:+a[2],z:a[1].length===2&&a[1][0]==="0"});else if((a=s.match(/^(\d{1,2})([\/.])(\d{1,2})(?![\d:])/))&&St(...+a[1]>12?[+a[3],+a[1]]:[+a[1],+a[3]])){let[o,l]=+a[1]>12?[+a[3],+a[1]]:[+a[1],+a[3]];t.push({k:"D",s:`${Ne(o)}-${Ne(l)}`,v:0})}else if((a=s.match(/^(\d{1,2})-(\d{1,2})(?![\d:]|\s?[ap]m)/))&&+a[2]>12&&St(+a[1],+a[2])&&t[t.length-1]?.k!=="m"&&!/^\s?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/.test(s.slice(a[0].length)))t.push({k:"D",s:`${Ne(+a[1])}-${Ne(+a[2])}`,v:0});else if((a=s.match(/^(\d+)(st|nd|rd|th)/))&&(K$(+a[1],a[2])||!/^[a-z]/.test(s.slice(a[0].length))))t.push({k:"n",v:+a[1],o:!0,len:a[1].length});else if((a=s.match(/^\d{3,4}(?!\d)/))&&!(a[0].length===4&&+a[0]>=1900&&+a[0]<=2100)&&+a[0].slice(0,-2)<=23&&+a[0].slice(-2)<60&&(a[0].length===4||+a[0].slice(-2)>0)){let o=+a[0].slice(0,-2);t.push({k:"t",v:o,m:+a[0].slice(-2),z:a[0][0]==="0"})}else if(a=s.match(/^\d+/))t.push({k:"n",v:+a[0],len:a[0].length});else if(a=s.match(/^[a-z]+/)){let o=a[0],l=r+o.length>=e.trimEnd().length,d;if(o==="mos"?d={k:"u",s:"m"}:o==="mo"?d=n()||t[t.length-1]?.k==="a"?{k:"u",s:"m"}:Es("monday"):(o==="d"||o==="w"||o==="y")&&n()?d={k:"u",s:o}:d=Es(o),d)t.push(d);else if(l&&["week","year","month"].some(c=>c.startsWith(o)&&o.length>=3))t.push({k:"skip",p:!0});else if(l&&(d=Ss(o))&&d.k!=="skip")t.push(d);else if(d=wd(o))t.push(d);else if(l&&(d=Ss(o)))t.push(d);else{let c=j$(o,l);c?t.push(...c):t.push({k:"?",s:o})}r+=o.length;continue}else if(a=s.match(/^\+(\d+)(?=\s?[a-z])/))t.push({k:"n",v:+a[1],len:a[1].length,s:"+"});else if(/^[%$#&*+=<~^]/.test(s)){t.push({k:"?",s:s[0]}),r++;continue}else if(s[0]==="-"){t.push({k:"sep",s:"-"}),r++;continue}else if(s[0]==="@"){t.push({k:"at"}),r++;continue}else if(s[0]==="/"||s[0]==="&"){t.push({k:"and"}),r++;continue}else{r++;continue}r+=a[0].length}let i=[];for(let s=0;s<t.length;s++){let a=t[s];if(a.k==="skip"&&!a.p)continue;let o=a.s==="tens"&&t[s+1]?.s==="-"?s+2:s+1,l=t[o];if(a.s==="tens"&&l&&l.k==="n"&&l.w&&l.v<10){i.push({k:"n",v:a.v+l.v,o:l.o,w:!0}),s=o;continue}if(a.k==="half"){let d=t[s+1]?.s==="past"?s+2:s+1,c=t[d];if(c&&c.k==="n"&&c.v>=1&&c.v<=12){i.push({k:"t",v:c.v,m:30}),s=d;continue}}if(a.k==="n"&&a.w&&(a.v===20&&l&&l.k==="n"&&l.w&&l.v>=20&&l.v<40||a.v===2&&l?.k==="thousand"&&t[s+2]?.w)){let d=l.k==="thousand"?t[s+2].v:l.v,c=l.k==="thousand"?s+2:s+1,f=(l.k==="thousand",2e3+d);t[c+1]?.w&&t[c+1].v<10&&d%10===0&&(f+=t[++c].v),i.push({k:"n",v:f,len:4}),s=c;continue}if(a.k==="quarter"||a.k==="n"&&a.v%5===0&&a.v>=5&&a.v<=55&&l?.k==="mod"&&l.s==="past"){let d=a.k==="quarter"&&t[s+1]?.k==="sep",c=l?.s==="past",f=t[s+2];if((d||c)&&f?.k==="n"&&f.v>=1&&f.v<=12){i.push(d?{k:"t",v:f.v===1?12:f.v-1,m:45}:{k:"t",v:f.v,m:a.k==="quarter"?15:a.v}),s+=2;continue}}if(a.k==="n"&&a.w&&!a.o&&a.v>=1&&a.v<=12&&l?.s==="tens"&&t[s+2]?.w&&!t[s+2].o&&t[s+2].v<10&&t[s+2].v%5===0){i.push({k:"t",v:a.v,m:l.v+t[s+2].v}),s+=2;continue}if(a.k==="n"&&a.w&&!a.o&&a.v>=1&&a.v<=12&&l&&l.k==="n"&&l.w&&!l.o&&l.v>=10&&l.v<60&&l.v%5===0){i.push({k:"t",v:a.v,m:l.v}),s++;continue}i.push(a)}return i}var Ts="mo,tu,we,th,fr",He=e=>e.mer?`${Ne(e.h%12+(e.mer==="pm"?12:0))}:${Ne(e.m)}`:e.kn?`${Ne(e.h)}:${Ne(e.m)}`:e.m?`${e.h}:${Ne(e.m)}?`:`${e.h}?`,gi=e=>(e.mer?e.h%12+(e.mer==="pm"?12:0):e.h)*60+e.m;function md(e,t,r){return e.mer&&!t.mer&&!t.kn&&t.h>=1&&t.h<=12&&r&&(t={...t,mer:e.mer},gi(t)<=gi(e)&&(t={...t,mer:e.mer==="pm"?"am":"pm"})),e.num&&!t.mer&&!t.kn?t={...t,kn:!0}:t.num&&!t.mer&&e.col&&!e.mer&&!e.kn&&(e={...e,kn:!0}),!e.mer&&t.mer&&e.h<=12&&!e.kn&&(e={...e,mer:t.mer},gi(e)>=gi(t)&&(e={...e,mer:t.mer==="pm"?"am":"pm"})),[e,t]}function Z$(e){let t=0,r=(x,y=0)=>e[t+y]?.k===x,n=x=>e[t]?.k===x?e[t++]:void 0,i=()=>t>=e.length;function s(x){let y=t;n("at");let A=e[t],N;if(!A)N=void 0;else if(A.k==="noon")t++,N={h:12,m:0,kn:!0};else if(A.k==="mid")t++,N={h:0,m:0,kn:!0};else if(A.k==="t"){t++;let V=n("mer")?.s;N={h:A.v,m:A.m,mer:V,kn:!!A.z||A.v>=13||A.v===0||A.m===0&&A.v>=10&&!V,num:!!A.z||A.v>=13||!!V,col:!0},V&&(A.v>12||A.v===0)&&(N=void 0)}else A.k==="n"&&!A.o&&r("mer",1)&&A.v>=1&&A.v<=12?(t+=2,N={h:A.v,m:0,mer:e[t-1].s,kn:!1,num:!0}):A.k==="n"&&!A.o&&A.v>=1&&A.v<=12&&(A.w||(A.len??9)<=2)&&(r("part",1)||(r("in",1)||r("at",1))&&r("part",2))?(t++,N={h:A.v,m:0,kn:!1}):A.k==="n"&&!A.o&&r("oclock",1)&&A.v>=1&&A.v<=12?(t+=2,N={h:A.v,m:0,mer:n("mer")?.s,kn:!1}):x&&A.k==="n"&&!A.o&&A.v>=1&&A.v<=12&&(A.w||(A.len??9)<=2)&&!r("u",1)&&!r("m",1)&&(t++,N={h:A.v,m:0,kn:!1});if(!N)return t=y,void 0;let U=t;if((r("in")||r("at"))&&U++,e[U]?.k==="part"&&!N.mer){let V=e[U].s;t=U+1,V==="night"?N.h===12?N={h:0,m:N.m,kn:!0}:N.h>=6?N={...N,mer:"pm"}:N={...N,mer:"am"}:N.h<=12&&(N={...N,mer:V})}return N}function a(x){return!!x&&x.k==="n"&&x.v>=1&&x.v<=31&&(x.w||(x.len??9)<=2)&&e[e.indexOf(x)+1]?.k!=="mer"}function o(x){return(e[x]?.k==="of"||e[x]?.k==="in")&&x++,e[x]?.k==="m"?e[x]:void 0}function l(){let x=e[t];if(x?.k==="n"&&x.len===4&&x.v>=1900&&x.v<=2100&&!x.o)return t++,x.v}function d(x,y,A,N){return{s:A?`${A}-${Ne(x)}-${Ne(y)}`:`${Ne(x)}-${Ne(y)}`,k:A?"other":"md",d:y,mo:x,sh:N}}function c(){let x=t;for(;r("skip")&&!e[t].p;)t++;r("in")&&(r("m",1)||r("n",1)&&e[t+1].len===4)&&t++;let y=e[t];if(!y)return t=x,void 0;let A,N;if(y.k==="D")t++,A=y.v?{s:y.s,k:"other"}:{s:y.s,k:"md",mo:+y.s.slice(0,2),d:+y.s.slice(3)};else if(y.k==="rel")t++,A={s:`${y.v>=0?"+":""}${y.v}d`,k:"other"};else if(y.k==="u"&&y.s==="d"&&(r("after",1)||r("before",1))&&r("rel",2))A={s:`${(e[t+1].k==="after"?1:-1)*2>0?"+":"-"}2d`,k:"other"},t+=3;else if(y.k==="in"&&(r("n",1)||r("a",1))&&r("u",2)&&(r("a",1)||e[t+1].v===1||!e[t+2].sg))A={s:`+${r("a",1)?1:e[t+1].v}${e[t+2].s}`,k:"other"},t+=3;else if((y.k==="n"||y.k==="a")&&r("u",1)&&(r("ago",2)||(r("from",2)||r("after",2)||r("before",2))&&(r("now",3)||r("rel",3))))A={s:`${r("ago",2)||r("before",2)?"-":"+"}${y.k==="a"?1:y.v}${e[t+1].s}`,k:"other"},t+=r("ago",2)?3:4;else if(y.k==="n"&&y.s==="+"&&r("u",1))A={s:`+${y.v}${e[t+1].s}`,k:"other"},t+=2;else if(y.k==="u"&&y.s!=="d"&&(r("gone",1)||r("before",1)||r("after",1))&&!r("rel",2))A={s:`${y.s.toUpperCase()}${r("after",1)?"+1":"-1"}`,k:"other"},t+=2;else if(y.k==="u"&&y.s==="w"&&t===0&&e.length===1)t++,A={s:"W+0",k:"other"};else if(y.k==="mod"&&r("u",1)&&e[t+1].s!=="d"){let U=y.v;A={s:`${e[t+1].s.toUpperCase()}${U>=0?"+":""}${U}`,k:"other"},t+=2}else if(y.k==="mod"&&y.v===0&&r("wknd",1)||y.k==="wknd")t+=y.k==="wknd"?1:2,A={s:"sa>su",k:"other"};else if((y.k==="n"&&(y.o||y.w)||y.k==="mod"&&y.v===-1)&&r("w",1)&&(N=o(t+2)))A={s:`${e[t+1].s}#${y.k==="mod"?-1:y.v}@${Ne(N.v)}`,k:"other"},t=e.indexOf(N,t+2)+1;else if(y.k==="mod"&&r("w",1))A={s:`${e[t+1].s}${y.v===0||y.s==="coming"?"":y.v>0?"+1":"-1"}`,k:"other"},t+=2;else if(y.k==="w"){t++;let U=e[t],V=n("gone")?"-1":"";!V&&U?.k==="mod"&&U.v!==0&&U.s!=="coming"&&!r("w",1)&&!r("u",1)&&!r("m",1)&&(V=U.v>0?"+1":"-1",t++),A={s:y.s+V,k:"other"}}else if(y.k==="h"){t++;let U=y.s;if(U==="05-05"){for(;r("skip");)t++;if(!n("mayo"))return t=x,void 0}else if(n("eve"))U==="12-25"&&(U="12-24");else if(r("u")&&e[t].s==="d")t++;else if(y.z)return t=x,void 0;A=/^\d\d-/.test(U)?{s:U,k:"md",mo:+U.slice(0,2),d:+U.slice(3)}:{s:U,k:"other"}}else if(y.k==="new"&&r("u",1)&&e[t+1].s==="y"){t+=2;let U=n("eve");!U&&r("u")&&e[t].s==="d"&&t++,A={s:U?"12-31":"01-01",k:"md",mo:U?12:1,d:U?31:1}}else if(y.k==="m"&&(e[t+1]?.o||e[t+1]?.w)&&e[t+1].k==="n"&&r("w",2))A={s:`${e[t+2].s}#${e[t+1].v}@${Ne(y.v)}`,k:"other"},t+=3;else if(y.k==="m")if(t++,a(e[t])){let U=e[t++].v,V=l();A=St(y.v,U)?d(y.v,U,V,!0):void 0}else A={s:`M@${Ne(y.v)}`,k:"mon",mo:y.v};else if(y.k==="n"&&a(y)&&(r("m",1)||r("of",1)&&r("m",2))){t+=r("m",1)?1:2;let U=e[t++].v,V=l();A=St(U,y.v)?d(U,y.v,V):void 0}else if(y.k==="n"&&y.len===4&&!y.o&&r("m",1)&&a(e[t+2])){let U=e[t+1].v,V=e[t+2].v;A=St(U,V)?d(U,V,y.v):void 0,t+=3}else y.k==="u"&&y.s==="m"&&r("of",1)&&r("m",2)?(A={s:`M@${Ne(e[t+2].v)}`,k:"mon",mo:e[t+2].v},t+=3):y.k==="u"&&y.s==="y"&&r("n",1)&&e[t+1].len===4?(A={s:`Y@${e[t+1].v}`,k:"yr"},t+=2):y.k==="n"&&y.len===4&&y.v>=1900&&y.v<=2100&&!y.o&&!r("mer",1)?(t++,A={s:`Y@${y.v}`,k:"yr"}):y.k==="n"&&y.o&&y.v<=31&&(t++,A={s:String(y.v),k:"day",d:y.v});return A||(t=x),A}function f(){let x={},y=t;for(;;){if(!x.date){let N=c();if(N){x.date=N;continue}}if(!x.time&&x.num===void 0){let N=s(!1);if(N){x.time=N;continue}}let A=e[t];if(x.num===void 0&&!x.time&&A?.k==="n"&&!A.o&&A.v<=31&&(A.w||(A.len??9)<=2)){x.num=A.v,t++;continue}if((r("at")||r("in")||r("from"))&&(x.date||x.time||x.num!==void 0)){let N=t;if(t++,r("n")||r("t")||r("noon")||r("mid")||r("part")||(t=N),t!==N)continue}break}return!x.date&&!x.time&&x.num===void 0?(t=y,void 0):x}function g(x,y){x.num!==void 0&&(x.num>=1&&x.num<=12?x.time={h:x.num,m:0,mer:y,kn:!1}:x.num>=13&&x.num<=23&&(x.time={h:x.num,m:0,kn:!0,num:!0}),x.num=void 0)}function $(x,y){for(let[H,Y]of[[x,y],[y,x]])if(H.num!==void 0)if(H.date)g(H);else if(Y.date&&Y.date.mo&&!Y.time&&H.num>=1&&(H===x||Y.date.sh)){if(H.date=St(Y.date.mo,H.num)?d(Y.date.mo,H.num):void 0,H.num=void 0,!H.date)return null}else{if(Y.date&&!Y.time)return null;g(H)}for(let[H,Y]of[[x,y],[y,x]])if(H.date?.k==="day"){if(!Y.date?.mo||H===y&&!Y.date.sh||!St(Y.date.mo,H.date.d))return null;H.date=d(Y.date.mo,H.date.d)}if(x.date&&y.date&&x.date.k==="mon"!=(y.date.k==="mon")||x.date&&y.date&&x.date.k==="yr"!=(y.date.k==="yr"))return null;let A=x.time,N=y.time,U=x.date,V=y.date;return A&&N&&([A,N]=md(A,N,!(U&&V))),A&&N?!U&&!V?`t ${He(A)}>${He(N)}`:U&&!V?`dt ${U.s} ${He(A)}>${He(N)}`:!U&&V?`dt ${V.s} ${He(A)}>${He(N)}`:`dt ${U.s} ${He(A)}>${V.s} ${He(N)}`:!A&&!N&&U&&V?`d ${U.s}>${V.s}`:null}function w(x){if(x.num!==void 0)if(x.date&&x.date.k!=="day")g(x);else{if(x.date)return null;if(x.num<1||x.num>12)return null;g(x)}return x.date?.k==="day"?null:x.date?.k==="mon"?`d ${x.date.s}`:x.date&&x.time?`dt ${x.date.s} ${He(x.time)}`:x.date?`d ${x.date.s}`:x.time?`t ${He(x.time)}`:null}function k(x){let y=s(x);if(!y)return;let A=t;if(r("sep")||r("and")){t++;let N=s(x);if(N){let[U,V]=md(y,N,!0);return`${He(U)}>${He(V)}`}t=A}return He(y)}function T(){let x=[];for(;r("w");)x.push(e[t++].s),r("and")&&r("w",1)&&t++;return x}let b=x=>[...new Set(x)].sort((y,A)=>(yi.indexOf(y)+6)%7-(yi.indexOf(A)+6)%7),_=x=>x?.k==="n"?x.v:x?.k==="a"?1:void 0;function E(){let x="",y=1,A,N,U,V,H=!!n("every");for(;r("skip");)t++;let Y;r("n")&&!e[t].o&&(e[t+1]?.pl||r("wkd",1))&&(Y=e[t++].v);let O=e[t];if(!O)return null;let G=B=>(e[t+B]?.k==="n"&&(e[t+B].o||e[t+B].w)||e[t+B]?.k==="mod"&&e[t+B].v===-1)&&r("w",B+1);if(O.k==="daily")t++,x="d";else if(O.k==="u"&&O.s==="d")t++,x="d";else if(O.k==="wkd")t++,x="d",A=Ts.split(",");else if(O.k==="work"&&r("u",1))t+=2,x="d",A=Ts.split(",");else if(O.k==="w"&&r("sep",1)&&e[t+1].s==="-"&&O.s==="mo"&&e[t+2]?.s==="fr")t+=3,x="d",A=Ts.split(",");else if(O.k==="other"&&r("u",1))x=e[t+1].s,y=2,t+=2;else if(O.k==="other"&&r("w",1))t++,x="w",y=2,A=[e[t++].s];else if(H&&O.k==="n"&&r("u",1)&&"dwm".includes(e[t+1].s)&&!G(0)&&!(e[t+1].sg&&O.v!==1))x=e[t+1].s,y=O.v,t+=2;else if(O.k==="biweekly")t++,x="w",y=2;else if(O.k==="weekly")t++,x="w";else if(O.k==="monthly")t++,x="m";else if(O.k==="yearly"||H&&O.k==="u"&&O.s==="y")t++,x="y";else if(H&&O.k==="u"&&O.s==="w")t++,x="w";else if(H&&O.k==="u"&&O.s==="m")t++,x="m";else if(O.k==="mod"&&O.v===-1&&r("u",1)&&e[t+1].s==="d"){for(t+=2,r("of")&&t++;r("every")||r("skip");)t++;if(!n("u"))return null;x="m",U="d-1"}else if(O.k==="end"&&r("of",1)){if(t+=2,n("every"),!n("u"))return null;x="m",U="d-1"}else if(O.k==="w"||G(0)||O.k==="n"&&r("of",1)&&!r("w",1)){if(G(0)){let B=e[t].k==="mod"?-1:e[t].v,K=e[t+1].s,j=t+2;for(e[j]?.k==="of"&&j++;e[j]?.k==="every"||e[j]?.k==="skip";)j++;if(e[j]?.k==="u"&&e[j].s==="m")t=j+1,x="m",N=`${K}#${B}`;else if(H&&e[t].k==="n")y=B,t+=1,x="w",A=T();else return null}else if(O.k==="w")x="w",A=T();else if(O.k==="n"){let B=O.v;if(t++,r("of")&&t++,n("every"),!n("u"))return null;x="m",U=`d${B}`}}else if(H&&O.k==="m")x="y";else return null;if(H=!0,x==="w"&&(!A&&(r("w")||r("skip")&&r("w",1))&&(A=T()),!A&&G(0)))return null;if(x==="m"&&!N&&!U){for(;r("skip");)t++;if(G(0)){let B=e[t].k==="mod"?-1:e[t].v;N=`${e[t+1].s}#${B}`,t+=2}else r("n")&&!r("m",1)&&!r("mer",1)&&e[t].v<=31&&!r("t",0)?(U=`d${e[t++].v}`,r("of")&&t++,r("every")&&t++,n("u")):r("mod")&&e[t].v===-1&&r("u",1)&&(U="d-1",t+=2,r("of")&&(t+=2))}if(x==="y"){let B=c();if(!B||B.k!=="md")return null;V=B.s}let q=Y,oe,te,re;for(;!i();){let B=e[t];if(B.k==="skip"&&!B.p)t++;else if(B.k==="weekly"||B.k==="daily"||B.k==="wkd")t++;else if(B.k==="every"&&_(e[t+1])!==void 0&&r("u",2))y=_(e[t+1]),t+=3;else if(B.k==="every"&&r("u",1))t+=2;else if(B.k==="every"&&r("other",1)&&r("u",2))y=2,t+=3;else if(B.k==="n"&&!B.o&&(r("times",1)||r("u",1)&&!q&&e[t+1].s===(x==="w"?"w":"d")))q=B.v,t+=2;else if(B.k==="for"&&_(e[t+1])!==void 0&&(r("u",2)||r("times",2)))q=_(e[t+1])*(x==="d"&&e[t+2].s==="w"?7:1),t+=3;else if(B.k==="times"&&B.s===void 0&&r("n",1))q=e[t+1].v,t+=2;else if(B.k==="sep"&&B.s==="until"||B.k==="up"&&r("sep",1)){B.k==="up"&&t++,t++;let K=c();if(!K||K.k==="day"||K.k==="mon")return null;oe=K.s}else if(B.k==="from"){t++;let K=t,j=c();if(j&&j.k!=="day"&&j.k!=="mon")te=j.s;else if(t=K,re=k(!0),!re)return null}else{if(B.k==="from"||B.k==="sep"&&B.s==="to")return null;if(!re&&(B.k==="at"||B.k==="t"||B.k==="noon"||B.k==="mid"||B.k==="n"&&!B.o&&B.v<=12&&(B.w||(B.len??9)<=2)&&!r("m",1)||B.k==="n"&&r("mer",1))){if(re=k(!0),!re)return null}else if(B.k==="of"||B.k==="in"||B.k==="every"||B.k==="a")t++;else return null}}if(x==="m"&&!N&&!U||x==="y"&&!V||x==="w"&&!A&&y<2)return null;let W=["R",`${x}/${y}`];return A&&W.push(b(A).join(",")),N&&W.push(N),U&&W.push(U),V&&W.push(V),q&&W.push(`n${q}`),oe&&W.push(`u${oe}`),re&&W.push(re),te&&W.push(`s${te}`),`${re?"dt":"d"} ${W.join(" ")}`}if(e.some((x,y)=>["every","other","daily","weekly","monthly","yearly","biweekly","wkd"].includes(x.k)||x.k==="w"&&(x.pl||e[y+1]?.k==="and"&&e[y+2]?.k==="w"&&!e.some(A=>A.k==="between"))||x.k==="u"&&x.s==="m"&&e[y-1]?.k==="of"&&e[y+1]?.k!=="m")||e[0]?.s==="mo"&&e[1]?.k==="sep"&&e[1].s==="-"&&e[2]?.s==="fr")return E();for(;r("from")||r("between")||r("at")||r("for")||r("skip")&&!e[t].p;)t++;let C=f();if(!C)return null;if(i())return w(C);if(!(r("sep")||r("and")))return null;t++;let z=f();return!z||!i()?null:$(C,z)}function $d(e){let t=Y$(Mr(e));if(t.some(s=>s.k==="?")||t.length===1&&t[0].k==="n"&&t[0].w)return"x";let r=t.length,n=t[r-1],i=t[r-2];n?.p&&i?.k==="n"&&!i.o&&t[r-3]?.k!=="m"&&(r-=1);for(let s=r;s>0;s--){let a=Z$(t.slice(0,s));if(a){let o=t[s],l=t[s-1],d=t[s-2];return o&&l?.k==="w"&&(["of","in"].includes(o.k)&&(d?.k==="mod"&&d.v===-1||d?.k==="n"&&(d.o||d.w))||s===1&&l.s==="sa"&&o.k==="sep"&&o.s==="to")||s===1&&s<t.length&&t[0].k==="n"&&!t[0].o&&(o.p||["u","w","m"].includes(o.k))?"x":a}}return"x"}var X$=Nr("heuristic-full",$d),_d=X$;var Q$="jan feb mar apr may jun jul aug sep oct nov dec".split(" "),J$="su mo tu we th fr sa".split(" "),e_="sun mon tue wed thu fri sat",Ae=e=>String(e).padStart(2,"0"),vd="first second third fourth fifth sixth seventh eighth ninth tenth".split(" "),t_={a:1,an:1,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10},or=e=>Q$.indexOf(e.slice(0,3))+1,It=e=>J$[e_.split(" ").indexOf(e.slice(0,3))],Pr=e=>/^\d+$/.test(e)?+e:t_[e]??0,ur="(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\\.?",$t="(?!month)(sun|mon|tue|wed|thu|fri|sat)[a-z]*\\.?",dr="(\\d{1,2})(?:st|nd|rd|th)?",r_=[[/^(\d{4})[-/](\d\d)[-/](\d\d)$/,e=>`${e[1]}-${e[2]}-${e[3]}`],[/^(\d{1,2})[\/.](\d{1,2})[\/.](\d{2,4})$/,e=>`${+e[3]<100?2e3+ +e[3]:e[3]}-${Ae(e[1])}-${Ae(e[2])}`],[/^(\d{1,2})[\/.](\d{1,2})$/,e=>+e[1]>12?`${Ae(e[2])}-${Ae(e[1])}`:`${Ae(e[1])}-${Ae(e[2])}`],[new RegExp(`^${ur} ${dr},? (\\d{4})$`),e=>`${e[3]}-${Ae(or(e[1]))}-${Ae(e[2])}`],[new RegExp(`^${ur} ${dr}$`),e=>`${Ae(or(e[1]))}-${Ae(e[2])}`],[new RegExp(`^${dr} (?:of )?${ur},? (\\d{4})$`),e=>`${e[3]}-${Ae(or(e[2]))}-${Ae(e[1])}`],[new RegExp(`^${dr} (?:of )?${ur}$`),e=>`${Ae(or(e[2]))}-${Ae(e[1])}`],[/^(today|tdy|now)$/,()=>"+0d"],[/^(tomorrow|tmrw|tmr)$/,()=>"+1d"],[/^(yesterday|yday)$/,()=>"-1d"],[/^day after tomorrow$/,()=>"+2d"],[new RegExp(`^(?:on |this )?${$t}$`),e=>It(e[1])],[new RegExp(`^(?:next|nxt) ${$t}$`),e=>`${It(e[1])}+1`],[new RegExp(`^(?:last|past|previous) ${$t}$`),e=>`${It(e[1])}-1`],[/^(next|nxt|this|last) (week|month|year)$/,e=>`${e[2][0].toUpperCase()}${e[1]==="this"?"+0":e[1].startsWith("n")?"+1":"-1"}`],[/^(?:in )?(\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten) (day|wk|week|mo|month|yr|year)s?(?: from now)?$/,e=>`+${Pr(e[1])}${e[2][0]}`],[/^(\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten) (day|wk|week|mo|month|yr|year)s? ago$/,e=>`-${Pr(e[1])}${e[2][0]}`],[/^(?:this |the )?weekend$/,()=>"sa>su"],[new RegExp(`^(first|second|third|fourth|last|\\d)(?:st|nd|rd|th)? ${$t} (?:of |in )?${ur}$`),e=>`${It(e[2])}#${e[1]==="last"?-1:Pr(e[1])||vd.indexOf(e[1])+1}@${Ae(or(e[3]))}`],[new RegExp(`^(?:in |during |the ?month of )?${ur}$`),e=>`M@${Ae(or(e[1]))}`],[/^(?:in |year )?(20\d\d)$/,e=>`Y@${e[1]}`],[/^(christmas|xmas) eve$/,()=>"12-24"],[/^(christmas|xmas)( day)?$/,()=>"12-25"],[/^(new years|ny)( day)?$/,()=>"01-01"],[/^(new years|ny) eve$/,()=>"12-31"],[/^valentines( day)?$/,()=>"02-14"],[/^(independence day|fourth of july)$/,()=>"07-04"],[/^halloween$/,()=>"10-31"],[/^thanksgiving( day)?$/,()=>"th#4@11"],[/^memorial day$/,()=>"mo#-1@05"],[/^labor day$/,()=>"mo#1@09"],[/^mothers day$/,()=>"su#2@05"],[/^fathers day$/,()=>"su#3@06"]];function lr(e){if(e=e.replace(/^(at|@) ?/,"").replace(/\b([ap])\.m\.?/,"$1m"),e==="noon")return{h:12,m:0,known:!0};if(e==="midnight")return{h:0,m:0,known:!0};let t=e.match(/^(\d{1,2})(?::(\d\d))? ?(am|pm)?$/);if(!t)return;let r=+t[1],n=+(t[2]??0);if(!(r>23||n>59))return t[3]?r>=1&&r<=12?{h:r,m:n,mer:t[3],known:!0}:void 0:{h:r,m:n,known:r>12||r===0||/^0/.test(e)}}var As=e=>(e.mer?e.h%12+(e.mer==="pm"?12:0):e.h)*60+e.m;function An(e){return e.known?`${Ae(As(e)/60|0)}:${Ae(e.m)}`:e.m?`${e.h}:${Ae(e.m)}?`:`${e.h}?`}function xd(e,t,r){return/\b(1[3-9]|2\d|0\d):\d\d/.test(r)&&!t.mer&&(e={...e,known:!0},t={...t,known:!0}),!e.mer&&t.mer&&!e.known&&e.h<=12&&(e={...e,mer:t.mer,known:!0},As(e)>=As(t)&&(e={...e,mer:t.mer==="pm"?"am":"pm"})),`${An(e)}>${An(t)}`}function Ct(e){for(let[t,r]of r_){let n=e.match(t);if(n)return r(n)}}function Is(e){e=e.replace(/^(on|at|@) /,"").trim();let t=Ct(e);if(t)return{d:t};let r=lr(e);if(r)return{t:r};let n=e.match(/^(.+?) (?:at |@ |on )?(\d{1,2}(?::\d\d)? ?(?:am|pm)?|noon|midnight)$/);if(n&&Ct(n[1])&&lr(n[2]))return{d:Ct(n[1]),t:lr(n[2])};if(n=e.match(/^(\d{1,2}(?::\d\d)? ?(?:am|pm)?|noon|midnight) (?:on )?(.+)$/),n&&Ct(n[2])&&lr(n[1]))return{d:Ct(n[2]),t:lr(n[1])}}function n_(e){let t,r,n=e,i="",s="",a,o=!1;((a=n.match(/ (?:for )?(\d+) (times|days|weeks)$/))||(a=n.match(/ x(\d+)$/)))&&(s+=` n${a[1]}`,o=a[2]==="weeks",n=n.slice(0,a.index)),(a=n.match(/ (?:until|till|through|ending) (.+)$/))&&Ct(a[1])&&(s+=` u${Ct(a[1])}`,n=n.slice(0,a.index)),(a=n.match(/ (?:starting|beginning|from) (.+)$/))&&Ct(a[1])&&(s+=` s${Ct(a[1])}`,n=n.slice(0,a.index)),e=n;let l="\\d{1,2}(?::\\d\\d)? ?(?:am|pm)?|noon|midnight",d=e.match(new RegExp(` (?:at |@ |from )?(${l})(?: ?- ?| to |to)(${l})$`))??e.match(new RegExp(` (?:at |@ )?(${l})$`)),c=d&&lr(d[1]),f=d?.[2]?lr(d[2]):void 0;if(c&&(!d[2]||f)&&(i=f?xd(c,f,e):An(c),n=e.slice(0,d.index)),/^(every ?day|daily|each day)$/.test(n)?r="d/1":/^(every weekday|weekdays|every work ?day)$/.test(n)?r="d/1 mo,tu,we,th,fr":(t=n.match(/^every (\d+|two|three|four) days?$/))?r=`d/${Pr(t[1])}`:(t=n.match(new RegExp(`^(?:every|each) ${$t}$`)))?r=`w/1 ${It(t[1])}`:(t=n.match(new RegExp(`^${$t}s$`)))?r=`w/1 ${It(t[1])}`:(t=n.match(new RegExp(`^every (?:other|second) ${$t}$`)))?r=`w/2 ${It(t[1])}`:(t=n.match(/^every (?:other|second) week$/))?r="w/2":(t=n.match(new RegExp(`^every (\\d+|two|three|four) weeks? (?:on )?${$t}$`)))?r=`w/${Pr(t[1])} ${It(t[2])}`:(t=n.match(new RegExp(`^(?:monthly|every month)(?: on)?( ?)${dr}$`)))?r=`m/1 d${+t[2]}`:(t=n.match(new RegExp(`^every (\\d+) months?(?: on)? ${dr}$`)))?r=`m/${t[1]} d${+t[2]}`:(t=n.match(new RegExp(`^every (?:year )?${ur} ${dr}$`)))?r=`y/1 ${Ae(or(t[1]))}-${Ae(t[2])}`:(t=n.match(new RegExp(`^(?:every )?(first|second|third|fourth|last|\\d)(?:st|nd|rd|th)? ${$t} (?:of )?(?:every )?(?:month|the month)$`)))&&(r=`m/1 ${It(t[2])}#${t[1]==="last"?-1:Pr(t[1])||vd.indexOf(t[1])+1}`),!r)return;let[g,...$]=r.split(" ");o&&g==="d/1"&&(s=s.replace(/n(\d+)/,(b,_)=>`n${_*7}`));let[w,k,T]=[/ n\d+/.exec(s)?.[0],/ u\S+/.exec(s)?.[0],/ s\S+/.exec(s)?.[0]];return`${i?"dt":"d"} R ${[g,...$].join(" ")}${w??""}${k??""}${i?" "+i:""}${T??""}`}var i_="one two three four five six seven eight nine".split(" "),Cs="first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth".split(" "),bd="one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty".split(" ");function s_(e){return e=e.replace(/[\u2019']/g,"").replace(/\b(single|just)\b ?/g,"").replace(/\bmidday\b/g,"noon").replace(/\b(nxt)\b/g,"next").replace(/\bcoming\b/g,"this").replace(/\b(lst|past|previous|prev)\b/g,"last").replace(/\b(each|annually|yearly)\b/g,"every").replace(/\b(business|work) ?days?\b/g,"weekday").replace(/\b(on|the|during|for|of the|around|about)\b ?/g,(t,r)=>r==="of the"?"of ":r==="for"?"for ":"").replace(/\b(twenty|thirty)[ -]?(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|one|two|three|four|five|six|seven|eight|nine)\b/g,(t,r,n)=>`${r==="twenty"?2:3}${(Cs.indexOf(n)+1||i_.indexOf(n)+1)%10}`).replace(/\b(twentieth|thirtieth)\b/g,t=>t[0]==="t"&&t[1]==="w"?"20":"30").replace(new RegExp(`\\b(${Cs.join("|")})\\b(?! ${$t})`,"g"),t=>String(Cs.indexOf(t)+1)).replace(new RegExp(`\\b(${bd.join("|")})\\b`,"g"),t=>String(bd.indexOf(t)+1)),e.replace(/\bevery weekday\b/,"every weekday")}function kd(e){let t=s_(Mr(e).replace(/(\d) (?:in the|at) (morning|afternoon|evening|night)/g,(l,d,c)=>`${d} ${c==="morning"?"am":"pm"}`).replace(/\b([ap])\.m\b\.?/g,"$1m").replace(/(\d{4})-(\d\d)-(\d\d)|^(\d{1,2})-(\d{1,2})$/,(l,d,c,f,g,$)=>d?`${d}/${c}/${f}`:`${g}/${$}`)).replace(/[.,!?]+$/,"").replace(/ (to|until|till|through|thru|at|on|from|and|-|for|in)$/,"");if(/\b(every|daily|weekly|monthly|weekdays?|biweekly|mon-?fri)\b|^\w+s$|of month$/.test(t)){let l=n_(t.replace(/\bmon-?fri\b/,"weekdays"));if(l)return l}let r=t.replace(/\s*[–—]\s*/g,"-").replace(/(?<=[a-z0-9])\s*-\s*(?=[a-z0-9])|\s+-\s+/g," to ").replace(/\b(til|till|until|thru|through)\b/g,"to").replace(/^(from|between) /,""),n=Is(r.replace(/\bfrom (?!now|today)/g,""));if(n)return n.d&&n.t?`dt ${n.d} ${An(n.t)}`:n.d?`d ${n.d}`:`t ${An(n.t)}`;let i=r.replace(/\bfrom (?!now|today)/g,"").split(/ (?:to|and) /);if(i.length!==2)return"x";let s=Is(i[0]),a=Is(i[1]);s?.d&&!s.t&&/^\d{1,2}(st|nd|rd|th)?$/.test(i[1].trim())&&/^\d\d-\d\d$/.test(s.d)&&(a={d:`${s.d.slice(0,3)}${Ae(parseInt(i[1]))}`});let o=i[0].match(/^(?:the )?(\d{1,2})(?:st|nd|rd|th)?$/);if(!s&&o&&a?.d&&/^\d\d-\d\d$/.test(a.d))return`d ${a.d.slice(0,3)}${Ae(o[1])}>${a.d}`;if(!s||!a)return"x";if(s.t&&a.t){let[l,d]=xd(s.t,a.t,r).split(">");return!s.d&&!a.d?`t ${l}>${d}`:s.d&&!a.d?`dt ${s.d} ${l}>${d}`:s.d&&a.d?`dt ${s.d} ${l}>${a.d} ${d}`:"x"}return s.d&&a.d&&!s.t&&!a.t?`d ${s.d}>${a.d}`:"x"}var Td=Nr("heuristic-small",kd);var zs={chrono:fd,"heuristic-small":Td,"heuristic-full":_d};var zn=class e{vocab;inv=[];ranks=new Map;digitSplit;unk;cache=new Map;constructor(t){this.vocab=new Map(Object.entries(t.model.vocab));for(let[n,i]of this.vocab)this.inv[i]=n;t.model.merges.forEach((n,i)=>{let s=typeof n=="string"?n:`${n[0]} ${n[1]}`;this.ranks.set(s,i)});let r=t.pre_tokenizer?.pretokenizers??[];this.digitSplit=r.some(n=>n.type==="Digits"&&n.individual_digits),this.unk=this.vocab.get(t.model.unk_token??"<unk>")??2}static normalize(t){return t.toLowerCase().split(/\s+/).filter(Boolean).join(" ")}bpe(t){let r=this.cache.get(t);if(r)return r;let n=Array.from(t);for(;n.length>1;){let s=-1,a=1/0;for(let o=0;o<n.length-1;o++){let l=this.ranks.get(`${n[o]} ${n[o+1]}`);l!==void 0&&l<a&&(a=l,s=o)}if(s<0)break;n=[...n.slice(0,s),n[s]+n[s+1],...n.slice(s+2)]}let i=n.map(s=>this.vocab.get(s)??this.unk);return this.cache.set(t,i),i}encode(t){let r=e.normalize(t);if(!r)return[];let n=r.split(" ").map((s,a)=>a===0?s:`\u2581${s}`),i=[];for(let s of n){let a=this.digitSplit?s.match(/\d|\D+/g)??[]:[s];for(let o of a)i.push(...this.bpe(o))}return i}decode(t,r=new Set([0,1,2])){return t.filter(i=>!r.has(i)).map(i=>this.inv[i]??"").join("").replaceAll("\u2581"," ").trim().replace(/\s+/g," ")}};var Za=Object.defineProperty,a_=Object.getOwnPropertyDescriptor,o_=Object.getOwnPropertyNames,u_=Object.prototype.hasOwnProperty,l_=(e=>typeof rr<"u"?rr:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof rr<"u"?rr:t)[r]}):e)(function(e){if(typeof rr<"u")return rr.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),L=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}},Gr=(e,t)=>{for(var r in t)Za(e,r,{get:t[r],enumerable:!0})},d_=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of o_(t))!u_.call(e,i)&&i!==r&&Za(e,i,{get:()=>t[i],enumerable:!(n=a_(t,i))||n.enumerable});return e},jn=e=>d_(Za({},"__esModule",{value:!0}),e),Br,At,Os,Wr,Rs,ph,ch,Xa=L(()=>{"use strict";Br=new Map,At=[],Os=new WeakMap,Wr=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=Br.get(e);if(n===void 0)Br.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let i=At.indexOf(e);i!==-1&&At.splice(i,1);for(let s=0;s<At.length;s++)if(Br.get(At[s]).priority<=r){At.splice(s,0,e);return}At.push(e)}return}throw new TypeError("not a valid backend")},Rs=async e=>{let t=Br.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{if(!r){let n=t.backend,i=Os.get(n);t.initPromise=i?i.then(async()=>n.init(e),async()=>n.init(e)):n.init(e),Os.set(n,t.initPromise)}return await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},ph=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),n=r.length===0?At:r,i,s=[],a=new Set;for(let l of n){let d=await Rs(l);typeof d=="string"?s.push({name:l,err:d}):(i||(i=d),i===d&&a.add(l))}if(!i)throw new Error(`no available backend found. ERR: ${s.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:d}of s)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);let o=t.filter(l=>a.has(typeof l=="string"?l:l.name));return[i,new Proxy(e,{get:(l,d)=>d==="executionProviders"?o:Reflect.get(l,d)})]},ch=async()=>{let e=[];for(let r of At){if(typeof Br.get(r).backend.createLoraAdapterHandler!="function")continue;let n=await Rs(r);if(typeof n!="string")return n;e.push({name:r,err:n})}let t=e.length===0?"":` ERR: ${e.map(r=>`[${r.name}] ${r.err}`).join(", ")}`;throw new Error(`no available backend supports LoRA adapters.${t}`)}}),p_=L(()=>{"use strict";Xa()}),fh,c_=L(()=>{"use strict";fh="1.31.1"}),Ds,Ue,hh=L(()=>{"use strict";c_(),Ds="warning",Ue={wasm:{},webgl:{},webgpu:{},versions:{common:fh},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Ds=e}},get logLevel(){return Ds}},Object.defineProperty(Ue,"logLevel",{enumerable:!0})}),_e,f_=L(()=>{"use strict";hh(),_e=Ue}),Di,Ns,nt,Ye,_r,br,Qa=L(()=>{"use strict";hh(),Di=(e,t)=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ns=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let i=0;i<r.length;i++){if(n&&!r[i].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[i].trim().split(" ")[1]}`;t&&(s+=`::${t}`),Di("CPU",s);return}r[i].includes("TRACE_FUNC")&&(n=!0)}},nt=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||Ns("BEGIN",e)},Ye=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||Ns("END",e)},_r=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.time(`ORT::${e}`)},br=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeEnd(`ORT::${e}`)}}),Ja,mh=L(()=>{"use strict";Xa(),Qa(),Ja=class gh{constructor(t,r){this.backend=t,this.handler=r}static async create(t){if(nt(),typeof t!="string"&&!(t instanceof Uint8Array))throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let r=await ch(),n=await r.createLoraAdapterHandler(t);return Ye(),new gh(r,n)}async release(){return this.handler.dispose()}}}),yh,wh,h_=L(()=>{"use strict";yh=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let i,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],s=e.dims[3]):(i=e.dims[3],s=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",o=t?.norm,l,d;o===void 0||o.mean===void 0?l=[255,255,255,255]:typeof o.mean=="number"?l=[o.mean,o.mean,o.mean,o.mean]:(l=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(l[3]=o.mean[3])),o===void 0||o.bias===void 0?d=[0,0,0,0]:typeof o.bias=="number"?d=[o.bias,o.bias,o.bias,o.bias]:(d=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(d[3]=o.bias[3]));let c=s*i,f=0,g=c,$=c*2,w=-1;a==="RGBA"?(f=0,g=c,$=c*2,w=c*3):a==="RGB"?(f=0,g=c,$=c*2):a==="RBG"&&(f=0,$=c,g=c*2);for(let k=0;k<s;k++)for(let T=0;T<i;T++){let b=(e.data[f++]-d[0])*l[0],_=(e.data[g++]-d[1])*l[1],E=(e.data[$++]-d[2])*l[2],S=w===-1?255:(e.data[w++]-d[3])*l[3];n.fillStyle="rgba("+b+","+_+","+E+","+S+")",n.fillRect(T,k,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},wh=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let i,s,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],s=e.dims[1],a=e.dims[3]):(i=e.dims[3],s=e.dims[2],a=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,d,c;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?c=[0,0,0,0]:typeof l.bias=="number"?c=[l.bias,l.bias,l.bias,l.bias]:(c=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(c[3]=l.bias[3]));let f=s*i;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,$=0,w=1,k=2,T=3,b=0,_=f,E=f*2,S=-1;o==="RGBA"?(b=0,_=f,E=f*2,S=f*3):o==="RGB"?(b=0,_=f,E=f*2):o==="RBG"&&(b=0,E=f,_=f*2),n=r.createImageData(i,s);for(let C=0;C<s*i;$+=g,w+=g,k+=g,T+=g,C++)n.data[$]=(e.data[b++]-c[0])*d[0],n.data[w]=(e.data[_++]-c[1])*d[1],n.data[k]=(e.data[E++]-c[2])*d[2],n.data[T]=S===-1?255:(e.data[S++]-c[3])*d[3]}else throw new Error("Can not access image data");return n}}),wi,$h,_h,bh,vh,xh,m_=L(()=>{"use strict";eo(),wi=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,i=t.norm??{mean:255,bias:0},s,a;typeof i.mean=="number"?s=[i.mean,i.mean,i.mean,i.mean]:s=[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],typeof i.bias=="number"?a=[i.bias,i.bias,i.bias,i.bias]:a=[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*n,c=l==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),f=4,g=0,$=1,w=2,k=3,T=0,b=d,_=d*2,E=-1;o==="RGB"&&(f=3,g=0,$=1,w=2,k=-1),l==="RGBA"?E=d*3:l==="RBG"?(T=0,_=d,b=d*2):l==="BGR"&&(_=0,b=d,T=d*2);for(let S=0;S<d;S++,g+=f,w+=f,$+=f,k+=f)c[T++]=(e[g]+a[0])/s[0],c[b++]=(e[$]+a[1])/s[1],c[_++]=(e[w]+a[2])/s[2],E!==-1&&k!==-1&&(c[E++]=(e[k]+a[3])/s[3]);return l==="RGBA"?new Ke("float32",c,[1,4,r,n]):new Ke("float32",c,[1,3,r,n])},$h=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,i=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",a,o=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=l();c.width=e.width,c.height=e.height;let f=d(c);if(f!=null){let g=e.height,$=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,$=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=g,o.width=$}else o.tensorFormat="RGBA",o.height=g,o.width=$;f.drawImage(e,0,0),a=f.getImageData(0,0,$,g).data}else throw new Error("Can not access image data")}else if(n){let c,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,f=t.resizedWidth):(c=e.height,f=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=c,o.width=f,t!==void 0){let g=l();g.width=f,g.height=c;let $=d(g);if($!=null)$.putImageData(e,0,0),a=$.getImageData(0,0,f,c).data;else throw new Error("Can not access image data")}else a=e.data}else if(i){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=l();c.width=e.width,c.height=e.height;let f=d(c);if(f!=null){let g=e.height,$=e.width;return f.drawImage(e,0,0,$,g),a=f.getImageData(0,0,$,g).data,o.height=g,o.width=$,wi(a,o)}else throw new Error("Can not access image data")}else{if(s)return new Promise((c,f)=>{let g=l(),$=d(g);if(!e||!$)return f();let w=new Image;w.crossOrigin="Anonymous",w.src=e,w.onload=()=>{g.width=w.width,g.height=w.height,$.drawImage(w,0,0,g.width,g.height);let k=$.getImageData(0,0,g.width,g.height);o.height=g.height,o.width=g.width,c(wi(k.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return wi(a,o);throw new Error("Input data provided is not supported - aborted tensor creation")},_h=(e,t)=>{let{width:r,height:n,download:i,dispose:s}=t,a=[1,n,r,4];return new Ke({location:"texture",type:"float32",texture:e,dims:a,download:i,dispose:s})},bh=(e,t)=>{let{dataType:r,dims:n,download:i,dispose:s}=t;return new Ke({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:i,dispose:s})},vh=(e,t)=>{let{dataType:r,dims:n,download:i,dispose:s}=t;return new Ke({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:i,dispose:s})},xh=(e,t,r)=>new Ke({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),yr,qn,Ms,kh,g_=L(()=>{"use strict";yr=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),qn=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ms=!1,kh=()=>{if(!Ms){Ms=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,n=typeof r<"u"&&r.from;e&&(yr.set("int64",BigInt64Array),qn.set(BigInt64Array,"int64")),t&&(yr.set("uint64",BigUint64Array),qn.set(BigUint64Array,"uint64")),n?(yr.set("float16",r),qn.set(r,"float16")):yr.set("float16",Uint16Array)}}}),Th,Eh,y_=L(()=>{"use strict";eo(),Th=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},Eh=(e,t)=>{switch(e.location){case"cpu":return new Ke(e.type,e.data,t);case"cpu-pinned":return new Ke({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ke({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ke({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ke({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ke,eo=L(()=>{"use strict";h_(),m_(),g_(),y_(),Ke=class{constructor(e,t,r){kh();let n,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,n=e.type,i=e.dims,e.location){case"cpu-pinned":{let a=yr.get(n);if(!a)throw new TypeError(`unsupported type "${n}" to create tensor from pinned buffer`);if(!(e.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=e.data;break}case"texture":{if(n!=="float32")throw new TypeError(`unsupported type "${n}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(n!=="float32"&&n!=="float16"&&n!=="int32"&&n!=="int64"&&n!=="uint32"&&n!=="uint8"&&n!=="bool"&&n!=="uint4"&&n!=="int4")throw new TypeError(`unsupported type "${n}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(n!=="float32"&&n!=="float16"&&n!=="int32"&&n!=="int64"&&n!=="uint32"&&n!=="uint64"&&n!=="int8"&&n!=="uint8"&&n!=="bool"&&n!=="uint4"&&n!=="int4")throw new TypeError(`unsupported type "${n}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,o;if(typeof e=="string")if(n=e,o=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");a=t}else{let l=yr.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?a=l.from(t,BigInt):a=l.from(t)}else if(t instanceof l)a=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")a=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)a=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${n} tensor's data must be type of ${l}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")n="string",a=e;else if(l==="boolean")n="bool",a=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)n="uint8",a=Uint8Array.from(e);else{let l=qn.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);n=l,a=e}if(o===void 0)o=[a.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");i=o,this.cpuData=a,this.dataLocation="cpu"}let s=Th(i);if(this.cpuData&&s!==this.cpuData.length&&!((n==="uint4"||n==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=n,this.dims=i,this.size=s}static async fromImage(e,t){return $h(e,t)}static fromTexture(e,t){return _h(e,t)}static fromGpuBuffer(e,t){return bh(e,t)}static fromMLTensor(e,t){return vh(e,t)}static fromPinnedBuffer(e,t,r){return xh(e,t,r)}toDataURL(e){return yh(this,e)}toImageData(e){return wh(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Eh(this,e)}}}),Ge,Sh=L(()=>{"use strict";eo(),Ge=Ke}),Ih,w_=L(()=>{"use strict";Xa(),mh(),Sh(),Qa(),Ih=class Ch{constructor(t,r){this.handler=t,this.backend=r}async run(t,r,n){nt(),_r("InferenceSession.run");let i={},s={};if(typeof t!="object"||t===null||t instanceof Ge||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Ge)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);i[c]=null}if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,f=Object.getOwnPropertyNames(r);for(let g of this.outputNames)if(f.indexOf(g)!==-1){let $=r[g];($===null||$ instanceof Ge)&&(c=!0,a=!1,i[g]=$)}if(c){if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else s=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(a)for(let c of this.outputNames)i[c]=null;let o;if(s.activeLoraAdapters!==void 0){if(!Array.isArray(s.activeLoraAdapters))throw new TypeError("'activeLoraAdapters' must be an array.");o=s.activeLoraAdapters.map(c=>{if(!(c instanceof Ja))throw new TypeError("'activeLoraAdapters' must be an array of LoraAdapter objects.");if(c.backend!==this.backend)throw new Error("LoRA adapter was created by a different backend than the session.");return c.handler})}let l=await this.handler.run(t,i,s,o),d={};for(let c in l)if(Object.hasOwnProperty.call(l,c)){let f=l[c];f instanceof Ge?d[c]=f:d[c]=new Ge(f.type,f.data,f.dims)}return br("InferenceSession.run"),Ye(),d}async release(){return this.handler.dispose()}static async create(t,r,n,i){nt(),_r("InferenceSession.create");let s,a={};if(typeof t=="string"){if(s=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,f=0,g=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(g=t.byteLength-f,typeof n=="number"){if(g=n,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||f+g>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-f}].`);if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(c,f,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,l]=await ph(a),d=await o.createInferenceSessionHandler(s,l);return br("InferenceSession.create"),Ye(),new Ch(d,o)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Yn,$_=L(()=>{"use strict";w_(),Yn=Ih}),Ah,__=L(()=>{"use strict";mh(),Ah=Ja}),b_=L(()=>{"use strict"}),v_=L(()=>{"use strict"}),x_=L(()=>{"use strict"}),k_=L(()=>{"use strict"}),T_={};Gr(T_,{InferenceSession:()=>Yn,LoraAdapter:()=>Ah,TRACE:()=>Di,TRACE_EVENT_BEGIN:()=>_r,TRACE_EVENT_END:()=>br,TRACE_FUNC_BEGIN:()=>nt,TRACE_FUNC_END:()=>Ye,Tensor:()=>Ge,env:()=>_e,registerBackend:()=>Wr});var Xe=L(()=>{"use strict";p_(),f_(),$_(),__(),Sh(),b_(),v_(),Qa(),x_(),k_()}),to=L(()=>{"use strict"}),zh={};Gr(zh,{default:()=>Oh});var Ps,Bs,Oh,E_=L(()=>{"use strict";L0(),Tr(),ro(),Ps="ort-wasm-proxy-worker",Bs=globalThis.self?.name===Ps,Bs&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":no(r.wasm).then(()=>{bo(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:i}=r;vo(i,n).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:n}=r,i=Li(n);postMessage({type:t,out:i});break}case"create":{let{model:n,options:i}=r;xo(n,i).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":ko(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:i,inputs:s,outputIndices:a,options:o}=r;To(n,i,s,a,new Array(a.length).fill(null),o).then(l=>{l.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},So([...s,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":Eo(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}}),Oh=Bs?null:e=>new Worker(e??je,{type:"module",name:Ps})}),Rh={};Gr(Rh,{default:()=>Dh});async function Ed(e={}){var t=e,r=!!globalThis.window,n=!!globalThis.WorkerGlobalScope,i=n&&self.name?.startsWith("em-pthread");t.mountExternalData=(u,p)=>{u.startsWith("./")&&(u=u.substring(2)),(t.jd||(t.jd=new Map)).set(u,p)},t.unmountExternalData=()=>{delete t.jd,delete t.ke,delete t.je,delete t.le},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let s=u=>async(...p)=>{try{if(t.hd)throw Error("Session already started");let m=t.hd={Vd:p[0],errors:[]},h=await u(...p);if(t.hd!==m)throw Error("Session mismatch");t.pd?.flush();let v=m.errors;if(0<v.length){let I=await Promise.all(v);if(I=I.filter(R=>R),0<I.length)throw Error(I.join(`
`))}return h}finally{t.hd=null}};t.jsepInit=(u,p)=>{if(u==="webgpu"){[t.pd,t.Ld,t.Pd,t.rd,t.Od,t.ic,t.Qd,t.Sd,t.Md,t.Nd,t.Rd]=p;let m=t.pd;t.jsepRegisterBuffer=(h,v,I,R)=>m.registerBuffer(h,v,I,R),t.jsepGetBuffer=h=>m.getBuffer(h),t.jsepCreateDownloader=(h,v,I)=>m.createDownloader(h,v,I),t.jsepOnCreateSession=h=>{m.onCreateSession(h)},t.jsepOnReleaseSession=h=>{m.onReleaseSession(h)},t.jsepOnRunStart=h=>m.onRunStart(h),t.Td=(h,v)=>{m.upload(h,v)}}else if(u==="webnn"){let m=p[0];[t.ce,t.Cd,t.webnnEnsureTensor,t.Dd,t.webnnDownloadTensor,t.be,t.webnnEnableTraceEvent]=p.slice(1),t.webnnReleaseTensorId=t.Cd,t.webnnUploadTensor=t.Dd,t.webnnRegisterMLContext=t.be,t.webnnOnRunStart=h=>m.onRunStart(h),t.webnnOnRunEnd=m.onRunEnd.bind(m),t.webnnOnReleaseSession=h=>{m.onReleaseSession(h)},t.webnnCreateMLTensorDownloader=(h,v)=>m.createMLTensorDownloader(h,v),t.webnnRegisterMLTensor=(h,v,I,R)=>m.registerMLTensor(h,v,I,R),t.webnnCreateMLContext=h=>m.createMLContext(h),t.webnnRegisterGraphInput=m.registerGraphInput.bind(m),t.webnnIsGraphInput=m.isGraphInput.bind(m),t.webnnRegisterGraphOutput=m.registerGraphOutput.bind(m),t.webnnIsGraphOutput=m.isGraphOutput.bind(m),t.webnnCreateTemporaryTensor=m.createTemporaryTensor.bind(m),t.webnnIsGraphInputOutputTypeSupported=m.isGraphInputOutputTypeSupported.bind(m)}};let a=()=>{let u=p=>(...m)=>{let h=mt;return m=p(...m),mt!=h?new Promise((v,I)=>{ts={resolve:v,reject:I}}):m};(p=>{for(let m of p)t[m]=u(t[m])})("_OrtAppendExecutionProvider _OrtAppendExecutionProviderV2 _OrtCreateSession _OrtRun _OrtRunWithBinding _OrtBindInput".split(" ")),s!==void 0&&(t._OrtRun=s(t._OrtRun),t._OrtRunWithBinding=s(t._OrtRunWithBinding)),a=void 0};t.asyncInit=()=>{a?.()};var o,l,d=(u,p)=>{throw p},c=import.meta.url,f="";if(r||n){try{f=new URL(".",c).href}catch{}n&&(l=u=>{var p=new XMLHttpRequest;return p.open("GET",u,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),o=async u=>{if(x(u))return new Promise((m,h)=>{var v=new XMLHttpRequest;v.open("GET",u,!0),v.responseType="arraybuffer",v.onload=()=>{v.status==200||v.status==0&&v.response?m(v.response):h(v.status)},v.onerror=h,v.send(null)});var p=await fetch(u,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)}}var g,$,w,k,T,b,_=console.log.bind(console),E=console.error.bind(console),S=_,C=E,z=!1,x=u=>u.startsWith("file://");function y(){Pt.buffer!=U.buffer&&K()}if(i){let u=function(p){try{var m=p.data,h=m.bd;if(h==="load"){let v=[];self.onmessage=I=>v.push(I),b=()=>{postMessage({bd:"loaded"});for(let I of v)u(I);self.onmessage=u};for(let I of m.Hd)t[I]&&!t[I].proxy||(t[I]=(...R)=>{postMessage({bd:"callHandler",Fd:I,args:R})},I=="print"&&(S=t[I]),I=="printErr"&&(C=t[I]));Pt=m.Zd,K(),$=m.$d,Le(),oi()}else if(h==="run"){(function(v){var I=(y(),G)[v+52>>>2>>>0];v=(y(),G)[v+56>>>2>>>0],Ru(I,I-v),ue(I)})(m.ad),as(m.ad,0,0,1,0,0),Ro(),Qi(m.ad),N||(Su(),N=!0);try{iy(m.Xd,m.nd)}catch(v){if(v!="unwind")throw v}}else m.target!=="setimmediate"&&(h==="checkMailbox"?N&&ei():h&&(C(`worker: received unknown command ${h}`),C(m)))}catch(v){throw Iu(),v}};var A=u,N=!1;self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=u}var U,V,H,Y,O,G,q,oe,te,re,W,B=!1;function K(){var u=Pt.buffer;t.HEAP8=U=new Int8Array(u),H=new Int16Array(u),t.HEAPU8=V=new Uint8Array(u),Y=new Uint16Array(u),t.HEAP32=O=new Int32Array(u),t.HEAPU32=G=new Uint32Array(u),q=new Float32Array(u),oe=new Float64Array(u),te=new BigInt64Array(u),re=new BigUint64Array(u)}function j(){B=!0,i?b():xt.vb()}function ve(u){throw C(u="Aborted("+u+")"),z=!0,u=new WebAssembly.RuntimeError(u+". Build with -sASSERTIONS for more info."),T?.(u),u}function it(){return{a:{na:Cw,jb:Iw,g:sy,G:ay,f:oy,o:uy,h:ly,$:dy,b:py,S:cy,Ja:Uo,n:fy,aa:qo,_a:Go,Fa:Fo,Ha:Ho,$a:jo,Ya:Ko,Ra:Yo,Xa:Zo,la:Xo,Ga:Qo,Da:Jo,Za:eu,Ea:tu,eb:hy,ga:gy,ya:yy,wa:$y,fa:by,N:vy,I:xy,xa:ky,_:zy,za:Oy,Ua:Ry,Ba:Ny,Ka:My,ua:Py,ha:By,Ta:Qi,bb:Uy,Q:qy,r:Ky,c:Zi,kb:Yy,y:Zy,M:Xy,D:Qy,m:Jy,s:lu,lb:ew,J:tw,R:rw,j:nw,u:iw,q:sw,k:aw,Oa:ow,Pa:uw,Qa:lw,Ma:fu,Na:hu,va:mu,gb:pw,db:hw,v:mw,ba:gw,ia:yw,cb:cw,V:ww,ab:$w,Ca:_w,F:dw,U:bw,ma:si,Aa:xw,ib:vw,hb:kw,Va:$u,Wa:_u,Ia:Fi,T:bu,La:vu,ka:xu,Sa:ku,ja:Tu,nb:f1,oa:u1,ob:c1,pa:o1,H:Zw,e:Rw,t:zw,w:Aw,B:Gw,pb:i1,Z:n1,x:Pw,qa:s1,X:l1,ca:r1,qb:t1,ea:Nw,O:Fw,sb:Qw,ra:e1,tb:Xw,L:Kw,Y:a1,d:Ow,A:Mw,l:Dw,mb:h1,p:Uw,z:Ww,C:Bw,E:Lw,K:Hw,sa:Yw,P:d1,da:jw,W:p1,ub:qw,ta:Vw,rb:Jw,i:Ew,a:Pt,fb:Gi}}}async function Le(){function u(h,v){var I=xt=h.exports;h={};for(let[R,M]of Object.entries(I))typeof M=="function"?(I=Wy(M),h[R]=I):h[R]=M;return xt=h,xt=(function(){var R=xt,M=Z=>ae=>Z(ae)>>>0,F=Z=>()=>Z()>>>0;return(R=Object.assign({},R)).wb=M(R.wb),R.ec=F(R.ec),R.gc=M(R.gc),R.uc=M(R.uc),R.vc=F(R.vc),R.zc=M(R.zc),R})(),zo.push(xt.hc),Eu=(h=xt).wb,Su=h.xb,t._OrtInit=h.yb,t._OrtGetLastError=h.zb,t._OrtCreateSessionOptions=h.Ab,t._OrtAppendExecutionProvider=h.Bb,t._OrtGetEpDevices=h.Cb,t._OrtEpDevice_EpName=h.Db,t._OrtAppendExecutionProviderV2=h.Eb,t._OrtAddFreeDimensionOverride=h.Fb,t._OrtAddSessionConfigEntry=h.Gb,t._OrtReleaseSessionOptions=h.Hb,t._OrtCreateSession=h.Ib,t._OrtReleaseSession=h.Jb,t._OrtGetInputOutputCount=h.Kb,t._OrtGetInputOutputMetadata=h.Lb,t._OrtFree=h.Mb,t._OrtCreateTensor=h.Nb,t._OrtGetTensorData=h.Ob,t._OrtReleaseTensor=h.Pb,t._OrtCreateLoraAdapter=h.Qb,t._OrtReleaseLoraAdapter=h.Rb,t._OrtCreateRunOptions=h.Sb,t._OrtAddRunConfigEntry=h.Tb,t._OrtRunOptionsAddActiveLoraAdapter=h.Ub,t._OrtReleaseRunOptions=h.Vb,t._OrtCreateBinding=h.Wb,t._OrtBindInput=h.Xb,t._OrtBindOutput=h.Yb,t._OrtClearBoundOutputs=h.Zb,t._OrtReleaseBinding=h._b,t._OrtRunWithBinding=h.$b,t._OrtRun=h.ac,t._OrtEndProfiling=h.bc,t._JsepOutput=h.cc,t._JsepGetNodeName=h.dc,ai=h.ec,gt=t._free=h.fc,Kr=t._malloc=h.gc,as=h.jc,Iu=h.kc,Cu=h.lc,Au=h.mc,os=h.nc,zu=h.oc,Ou=h.pc,de=h.qc,Yr=h.rc,Ru=h.sc,ue=h.tc,us=h.uc,le=h.vc,Du=h.wc,ls=h.xc,Nu=h.yc,Mu=h.zc,Pu=h.Ac,ds=h.Bc,Bu=h.Cc,Uu=h.Dc,Wu=h.Ec,Lu=h.Fc,Vu=h.Gc,qu=h.Hc,Gu=h.Ic,Fu=h.Jc,Hu=h.Kc,ju=h.Lc,Ku=h.Mc,Yu=h.Nc,Zu=h.Oc,Xu=h.Pc,Qu=h.Qc,Ju=h.Rc,el=h.Sc,tl=h.Tc,rl=h.Uc,nl=h.Vc,il=h.Wc,sl=h.Xc,al=h.Yc,ol=h._c,ul=h.$c,ll=h.kd,dl=h.ld,pl=h.qd,cl=h.vd,fl=h.wd,hl=h.xd,ml=h.yd,gl=h.zd,yl=h.Ad,wl=h.Bd,$l=h.Gd,_l=h.Jd,bl=h.fe,vl=h.ge,xl=h.he,kl=h.ie,$=v,xt}var p,m=it();return t.instantiateWasm?new Promise(h=>{t.instantiateWasm(m,(v,I)=>{h(u(v,I))})}):i?u(new WebAssembly.Instance($,it()),$):(W??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",f):f+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,p=await(async function(h){var v=W;if(!g&&!x(v))try{var I=fetch(v,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(I,h)}catch(R){C(`wasm streaming compile failed: ${R}`),C("falling back to ArrayBuffer instantiation")}return(async function(R,M){try{var F=await(async function(Z){if(!g)try{var ae=await o(Z);return new Uint8Array(ae)}catch{}if(Z==W&&g)Z=new Uint8Array(g);else{if(!l)throw"both async and sync fetching of the wasm failed";Z=l(Z)}return Z})(R);return await WebAssembly.instantiate(F,M)}catch(Z){C(`failed to asynchronously prepare wasm: ${Z}`),ve(Z)}})(v,h)})(m),u(p.instance,p.module))}class ze{name="ExitStatus";constructor(p){this.message=`Program terminated with exit(${p})`,this.status=p}}var Oe=u=>{u.terminate(),u.onmessage=()=>{}},Nt=[],Ce=0,ke=null,Qe=u=>{Mt.length==0&&(No(),Do(Mt[0]));var p=Mt.pop();if(!p)return 6;Hr.push(p),Jt[u.ad]=p,p.ad=u.ad;var m={bd:"run",Xd:u.Wd,nd:u.nd,ad:u.ad};return p.postMessage(m,u.ud),0},ft=0,xe=(u,p,...m)=>{var h,v=16*m.length,I=le(),R=us(v),M=R>>>3;for(h of m)typeof h=="bigint"?((y(),te)[M++>>>0]=1n,(y(),te)[M++>>>0]=h):((y(),te)[M++>>>0]=0n,(y(),oe)[M++>>>0]=h);return u=Cu(u,0,v,R,p),ue(I),u};function Gi(u){if(i)return xe(0,1,u);if(w=u,!(0<ft)){for(var p of Hr)Oe(p);for(p of Mt)Oe(p);Mt=[],Hr=[],Jt={},z=!0}d(0,new ze(u))}function Ao(u){if(i)return xe(1,0,u);Fi(u)}var Fi=u=>{if(w=u,i)throw Ao(u),"unwind";Gi(u)},Mt=[],Hr=[],zo=[],Jt={},Oo=u=>{var p=u.ad;delete Jt[p],Mt.push(u),Hr.splice(Hr.indexOf(u),1),u.ad=0,Au(p)};function Ro(){zo.forEach(u=>u())}var Do=u=>new Promise(p=>{u.onmessage=v=>{var I=v.data;if(v=I.bd,I.md&&I.md!=ai()){var R=Jt[I.md];R?R.postMessage(I,I.ud):C(`Internal error! Worker sent a message "${v}" to target pthread ${I.md}, but that thread no longer exists!`)}else v==="checkMailbox"?ei():v==="spawnThread"?Qe(I):v==="cleanupThread"?Jn(()=>{Oo(Jt[I.Yd])}):v==="loaded"?(u.loaded=!0,p(u)):I.target==="setimmediate"?u.postMessage(I):v==="uncaughtException"?u.onerror(I.error):v==="callHandler"?t[I.Fd](...I.args):v&&C(`worker sent an unknown command ${v}`)},u.onerror=v=>{throw C(`worker sent an error! ${v.filename}:${v.lineno}: ${v.message}`),v};var m,h=[];for(m of[])t.propertyIsEnumerable(m)&&h.push(m);u.postMessage({bd:"load",Hd:h,Zd:Pt,$d:$})});function No(){var u=new Worker((()=>{let p=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new p("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Mt.push(u)}var Pt,iy=(u,p)=>{ft=0,u=ds(u,p),0<ft?w=u:os(u)},Zn=[],Xn=0;function sy(u){var p=new Hi(u>>>=0);return(y(),U)[p.cd+12>>>0]==0&&(Mo(p,!0),Xn--),Po(p,!1),Zn.push(p),Mu(u)}var Sr=0,ay=()=>{de(0,0);var u=Zn.pop();Du(u.od),Sr=0};function Mo(u,p){p=p?1:0,(y(),U)[u.cd+12>>>0]=p}function Po(u,p){p=p?1:0,(y(),U)[u.cd+13>>>0]=p}class Hi{constructor(p){this.od=p,this.cd=p-24}}var ji=u=>{var p=Sr;if(!p)return Yr(0),0;var m=new Hi(p);(y(),G)[m.cd+16>>>2>>>0]=p;var h=(y(),G)[m.cd+4>>>2>>>0];if(!h)return Yr(0),p;for(var v of u){if(v===0||v===h)break;if(Nu(v,h,m.cd+16))return Yr(v),p}return Yr(h),p};function oy(){return ji([])}function uy(u){return ji([u>>>0])}function ly(u,p,m,h){return ji([u>>>0,p>>>0,m>>>0,h>>>0])}var dy=()=>{var u=Zn.pop();u||ve("no exception to throw");var p=u.od;throw(y(),U)[u.cd+13>>>0]==0&&(Zn.push(u),Po(u,!0),Mo(u,!1),Xn++),ls(p),Sr=p};function py(u,p,m){var h=new Hi(u>>>=0);throw p>>>=0,m>>>=0,(y(),G)[h.cd+16>>>2>>>0]=0,(y(),G)[h.cd+4>>>2>>>0]=p,(y(),G)[h.cd+8>>>2>>>0]=m,ls(u),Xn++,Sr=u}var cy=()=>Xn;function Bo(u,p,m,h){return i?xe(2,1,u,p,m,h):Uo(u,p,m,h)}function Uo(u,p,m,h){if(u>>>=0,p>>>=0,m>>>=0,h>>>=0,!globalThis.SharedArrayBuffer)return 6;var v=[];return i&&v.length===0?Bo(u,p,m,h):(u={Wd:m,ad:u,nd:h,ud:v},i?(u.bd="spawnThread",postMessage(u,v),0):Qe(u))}function fy(u){throw Sr||=u>>>0,Sr}var Wo=globalThis.TextDecoder&&new TextDecoder,Lo=(u,p,m,h)=>{if(m=p+m,h)return m;for(;u[p]&&!(p>=m);)++p;return p},Vo=(u,p=0,m,h)=>{if(16<(m=Lo(u,p>>>=0,m,h))-p&&u.buffer&&Wo)return Wo.decode(u.buffer instanceof ArrayBuffer?u.subarray(p,m):u.slice(p,m));for(h="";p<m;){var v=u[p++];if(128&v){var I=63&u[p++];if((224&v)==192)h+=String.fromCharCode((31&v)<<6|I);else{var R=63&u[p++];65536>(v=(240&v)==224?(15&v)<<12|I<<6|R:(7&v)<<18|I<<12|R<<6|63&u[p++])?h+=String.fromCharCode(v):(v-=65536,h+=String.fromCharCode(55296|v>>10,56320|1023&v))}}else h+=String.fromCharCode(v)}return h},Re=(u,p,m)=>(u>>>=0)?Vo((y(),V),u,p,m):"";function qo(u,p,m){return i?xe(3,1,u,p,m):0}function Go(u,p){if(i)return xe(4,1,u,p)}function Fo(u,p){if(i)return xe(5,1,u,p)}function Ho(u,p,m){if(i)return xe(6,1,u,p,m)}function jo(u,p,m){return i?xe(7,1,u,p,m):0}function Ko(u,p){if(i)return xe(8,1,u,p)}function Yo(u,p,m){if(i)return xe(9,1,u,p,m)}function Zo(u,p,m,h){if(i)return xe(10,1,u,p,m,h)}function Xo(u,p,m,h){if(i)return xe(11,1,u,p,m,h)}function Qo(u,p,m,h){if(i)return xe(12,1,u,p,m,h)}function Jo(u){if(i)return xe(13,1,u)}function eu(u,p){if(i)return xe(14,1,u,p)}function tu(u,p,m){if(i)return xe(15,1,u,p,m)}var hy=()=>ve(""),ht=u=>{u>>>=0;for(var p="";;){var m=(y(),V)[u++>>>0];if(!m)return p;p+=String.fromCharCode(m)}},Ki={},Yi={},my={},Ir=class extends Error{constructor(u){super(u),this.name="BindingError"}};function vt(u,p,m={}){return(function(h,v,I={}){var R=v.name;if(!h)throw new Ir(`type "${R}" must have a positive integer typeid pointer`);if(Yi.hasOwnProperty(h)){if(I.Id)return;throw new Ir(`Cannot register type '${R}' twice`)}Yi[h]=v,delete my[h],Ki.hasOwnProperty(h)&&(v=Ki[h],delete Ki[h],v.forEach(M=>M()))})(u,p,m)}var ru=(u,p,m)=>{switch(p){case 1:return m?h=>(y(),U)[h>>>0]:h=>(y(),V)[h>>>0];case 2:return m?h=>(y(),H)[h>>>1>>>0]:h=>(y(),Y)[h>>>1>>>0];case 4:return m?h=>(y(),O)[h>>>2>>>0]:h=>(y(),G)[h>>>2>>>0];case 8:return m?h=>(y(),te)[h>>>3>>>0]:h=>(y(),re)[h>>>3>>>0];default:throw new TypeError(`invalid integer width (${p}): ${u}`)}};function gy(u,p,m,h,v){u>>>=0,m>>>=0,p=ht(p>>>0);let I=R=>R;if(h=h===0n){let R=8*m;I=M=>BigInt.asUintN(R,M),v=I(v)}vt(u,{name:p,Zc:I,ed:(R,M)=>(typeof M=="number"&&(M=BigInt(M)),M),dd:ru(p,m,!h),gd:null})}function yy(u,p,m,h){vt(u>>>=0,{name:p=ht(p>>>0),Zc:function(v){return!!v},ed:function(v,I){return I?m:h},dd:function(v){return this.Zc((y(),V)[v>>>0])},gd:null})}var nu=[],er=[0,1,,1,null,1,!0,1,!1,1];function Zi(u){9<(u>>>=0)&&--er[u+1]===0&&(er[u]=void 0,nu.push(u))}var Je=u=>{if(!u)throw new Ir(`Cannot use deleted val. handle = ${u}`);return er[u]},st=u=>{switch(u){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=nu.pop()||er.length;return er[p]=u,er[p+1]=1,p}};function Xi(u){return this.Zc((y(),G)[u>>>2>>>0])}var wy={name:"emscripten::val",Zc:u=>{var p=Je(u);return Zi(u),p},ed:(u,p)=>st(p),dd:Xi,gd:null};function $y(u){return vt(u>>>0,wy)}var _y=(u,p)=>{switch(p){case 4:return function(m){return this.Zc((y(),q)[m>>>2>>>0])};case 8:return function(m){return this.Zc((y(),oe)[m>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${u}`)}};function by(u,p,m){m>>>=0,vt(u>>>=0,{name:p=ht(p>>>0),Zc:h=>h,ed:(h,v)=>v,dd:_y(p,m),gd:null})}function vy(u,p,m,h,v){u>>>=0,m>>>=0,p=ht(p>>>0);let I=M=>M;if(h===0){var R=32-8*m;I=M=>M<<R>>>R,v=I(v)}vt(u,{name:p,Zc:I,ed:(M,F)=>F,dd:ru(p,m,h!==0),gd:null})}function xy(u,p,m){function h(I){var R=(y(),G)[I>>>2>>>0];return I=(y(),G)[I+4>>>2>>>0],new v((y(),U).buffer,I,R)}var v=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];vt(u>>>=0,{name:m=ht(m>>>0),Zc:h,dd:h},{Id:!0})}var Bt=(u,p,m)=>{var h=(y(),V);if(p>>>=0,0<m){var v=p;m=p+m-1;for(var I=0;I<u.length;++I){var R=u.codePointAt(I);if(127>=R){if(p>=m)break;h[p++>>>0]=R}else if(2047>=R){if(p+1>=m)break;h[p++>>>0]=192|R>>6,h[p++>>>0]=128|63&R}else if(65535>=R){if(p+2>=m)break;h[p++>>>0]=224|R>>12,h[p++>>>0]=128|R>>6&63,h[p++>>>0]=128|63&R}else{if(p+3>=m)break;h[p++>>>0]=240|R>>18,h[p++>>>0]=128|R>>12&63,h[p++>>>0]=128|R>>6&63,h[p++>>>0]=128|63&R,I++}}h[p>>>0]=0,u=p-v}else u=0;return u},Qn=u=>{for(var p=0,m=0;m<u.length;++m){var h=u.charCodeAt(m);127>=h?p++:2047>=h?p+=2:55296<=h&&57343>=h?(p+=4,++m):p+=3}return p};function ky(u,p){vt(u>>>=0,{name:p=ht(p>>>0),Zc(m){var h=(y(),G)[m>>>2>>>0];return h=Re(m+4,h,!0),gt(m),h},ed(m,h){h instanceof ArrayBuffer&&(h=new Uint8Array(h));var v=typeof h=="string";if(!(v||ArrayBuffer.isView(h)&&h.BYTES_PER_ELEMENT==1))throw new Ir("Cannot pass non-string to std::string");var I=v?Qn(h):h.length,R=Kr(4+I+1),M=R+4;return(y(),G)[R>>>2>>>0]=I,v?Bt(h,M,I+1):(y(),V).set(h,M>>>0),m!==null&&m.push(gt,R),R},dd:Xi,gd(m){gt(m)}})}var iu=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,Ty=(u,p,m)=>{if(u>>>=1,16<(p=Lo((y(),Y),u,p/2,m))-u&&iu)return iu.decode((y(),Y).slice(u,p));for(m="";u<p;++u){var h=(y(),Y)[u>>>0];m+=String.fromCharCode(h)}return m},Ey=(u,p,m)=>{if(m??=2147483647,2>m)return 0;var h=p;m=(m-=2)<2*u.length?m/2:u.length;for(var v=0;v<m;++v){var I=u.charCodeAt(v);(y(),H)[p>>>1>>>0]=I,p+=2}return(y(),H)[p>>>1>>>0]=0,p-h},Sy=u=>2*u.length,Iy=(u,p,m)=>{var h="";u>>>=2;for(var v=0;!(v>=p/4);v++){var I=(y(),G)[u+v>>>0];if(!I&&!m)break;h+=String.fromCodePoint(I)}return h},Cy=(u,p,m)=>{if(p>>>=0,m??=2147483647,4>m)return 0;var h=p;m=h+m-4;for(var v=0;v<u.length;++v){var I=u.codePointAt(v);if(65535<I&&v++,(y(),O)[p>>>2>>>0]=I,(p+=4)+4>m)break}return(y(),O)[p>>>2>>>0]=0,p-h},Ay=u=>{for(var p=0,m=0;m<u.length;++m)65535<u.codePointAt(m)&&m++,p+=4;return p};function zy(u,p,m){if(u>>>=0,p>>>=0,m=ht(m>>>=0),p===2)var h=Ty,v=Ey,I=Sy;else h=Iy,v=Cy,I=Ay;vt(u,{name:m,Zc:R=>{var M=(y(),G)[R>>>2>>>0];return M=h(R+4,M*p,!0),gt(R),M},ed:(R,M)=>{if(typeof M!="string")throw new Ir(`Cannot pass non-string to C++ string type ${m}`);var F=I(M),Z=Kr(4+F+p);return(y(),G)[Z>>>2>>>0]=F/p,v(M,Z+4,F+p),R!==null&&R.push(gt,Z),Z},dd:Xi,gd(R){gt(R)}})}function Oy(u,p){vt(u>>>=0,{Kd:!0,name:p=ht(p>>>0),Zc:()=>{},ed:()=>{}})}function Ry(u){as(u>>>0,!n,1,!r,131072,!1),Ro()}var Jn=u=>{if(!z)try{if(u(),!(0<ft))try{i?ai()&&os(w):Fi(w)}catch(p){p instanceof ze||p=="unwind"||d(0,p)}}catch(p){p instanceof ze||p=="unwind"||d(0,p)}},Dy=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function Qi(u){u>>>=0,Dy||(Atomics.waitAsync((y(),O),u>>>2,u).value.then(ei),u+=128,Atomics.store((y(),O),u>>>2,1))}var ei=()=>Jn(()=>{var u=ai();u&&(Qi(u),Ou())});function Ny(u,p){(u>>>=0)==p>>>0?setTimeout(ei):i?postMessage({md:u,bd:"checkMailbox"}):(u=Jt[u])&&u.postMessage({bd:"checkMailbox"})}var Ji=[];function My(u,p,m,h,v){for(p>>>=0,v>>>=0,Ji.length=0,m=v>>>3,h=v+h>>>3;m<h;){var I;I=(y(),te)[m++>>>0]?(y(),te)[m++>>>0]:(y(),oe)[m++>>>0],Ji.push(I)}return(p?ps[p]:Sw[u])(...Ji)}var Py=()=>{ft=0};function By(u){u>>>=0,i?postMessage({bd:"cleanupThread",Yd:u}):Oo(Jt[u])}function Uy(u){}var ti=u=>{try{u()}catch(p){ve(p)}};function Wy(u){var p=(...m)=>{ri.push(u);try{return u(...m)}finally{z||(ri.pop(),mt&&Ut===1&&ri.length===0&&(Ut=0,ft+=1,ti(vl),typeof Fibers<"u"&&Fibers.ne()))}};return ou.set(u,p),p}var Ut=0,mt=null,su=0,ri=[],es=new Map,au=new Map,ou=new Map,Ly=0,ts=null,Vy=[],uu=u=>(function(p){if(!z){if(Ut===0){var m=!1,h=!1;p((v=0)=>{if(!z&&(su=v,m=!0,h)){Ut=2,ti(()=>xl(mt)),typeof MainLoop<"u"&&MainLoop.Ed&&MainLoop.resume(),v=!1;try{var I=(function(){var F=(y(),O)[mt+8>>>2>>>0];return F=au.get(F),F=ou.get(F),--ft,F()})()}catch(F){I=F,v=!0}var R=!1;if(!mt){var M=ts;M&&(ts=null,(v?M.reject:M.resolve)(I),R=!0)}if(v&&!R)throw I}}),h=!0,m||(Ut=1,mt=(function(){var v=Kr(65548),I=v+12;if((y(),G)[v>>>2>>>0]=I,(y(),G)[v+4>>>2>>>0]=I+65536,I=ri[0],!es.has(I)){var R=Ly++;es.set(I,R),au.set(R,I)}return I=es.get(I),(y(),O)[v+8>>>2>>>0]=I,v})(),typeof MainLoop<"u"&&MainLoop.Ed&&MainLoop.pause(),ti(()=>bl(mt)))}else Ut===2?(Ut=0,ti(kl),gt(mt),mt=null,Vy.forEach(Jn)):ve(`invalid state: ${Ut}`);return su}})(p=>{u().then(p)});function qy(u){return u>>>=0,uu(async()=>{var p=await Je(u);return st(p)})}var rs=[],Gy=u=>{var p=rs.length;return rs.push(u),p},Fy=(u,p)=>{for(var m=Array(u),h=0;h<u;++h){var v=h,I=(y(),G)[p+4*h>>>2>>>0],R=Yi[I];if(R===void 0)throw u=`parameter ${h}`,I=Eu(I),p=ht(I),gt(I),new Ir(`${u} has unknown type ${p}`);m[v]=R}return m},Hy=(u,p,m)=>{var h=[];return u=u(h,m),h.length&&((y(),G)[p>>>2>>>0]=st(h)),u},jy={},ni=u=>{var p=jy[u];return p===void 0?ht(u):p};function Ky(u,p,m){var[h,...v]=Fy(u,p>>>0);p=h.ed.bind(h);var I=v.map(F=>F.dd.bind(F));u--;var R={toValue:Je};switch(u=I.map((F,Z)=>{var ae=`argFromPtr${Z}`;return R[ae]=F,`${ae}(args${Z?"+"+8*Z:""})`}),m){case 0:var M="toValue(handle)";break;case 2:M="new (toValue(handle))";break;case 3:M="";break;case 1:R.getStringOrSymbol=ni,M="toValue(handle)[getStringOrSymbol(methodName)]"}return M+=`(${u})`,h.Kd||(R.toReturnWire=p,R.emval_returnValue=Hy,M=`return emval_returnValue(toReturnWire, destructorsRef, ${M})`),M=`return function (handle, methodName, destructorsRef, args) {
  ${M}
  }`,m=new Function(Object.keys(R),M)(...Object.values(R)),M=`methodCaller<(${v.map(F=>F.name)}) => ${h.name}>`,Gy(Object.defineProperty(m,"name",{value:M}))}function Yy(u,p){return p>>>=0,(u=Je(u>>>0))==Je(p)}function Zy(u){return(u>>>=0)?(u=ni(u),st(globalThis[u])):st(globalThis)}function Xy(u){return u=ni(u>>>0),st(t[u])}function Qy(u,p){return p>>>=0,u=Je(u>>>0),p=Je(p),st(u[p])}function Jy(u){9<(u>>>=0)&&(er[u+1]+=1)}function lu(u,p,m,h,v){return rs[u>>>0](p>>>0,m>>>0,h>>>0,v>>>0)}function ew(u,p,m,h,v){return lu(u>>>0,p>>>0,m>>>0,h>>>0,v>>>0)}function tw(){return st([])}function rw(u){u=Je(u>>>0);for(var p=Array(u.length),m=0;m<u.length;m++)p[m]=u[m];return st(p)}function nw(u){return st(ni(u>>>0))}function iw(){return st({})}function sw(u){for(var p=Je(u>>>=0);p.length;){var m=p.pop();p.pop()(m)}Zi(u)}function aw(u,p,m){p>>>=0,m>>>=0,u=Je(u>>>0),p=Je(p),m=Je(m),u[p]=m}function ow(u,p){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),p>>>=0,u=new Date(1e3*u),(y(),O)[p>>>2>>>0]=u.getUTCSeconds(),(y(),O)[p+4>>>2>>>0]=u.getUTCMinutes(),(y(),O)[p+8>>>2>>>0]=u.getUTCHours(),(y(),O)[p+12>>>2>>>0]=u.getUTCDate(),(y(),O)[p+16>>>2>>>0]=u.getUTCMonth(),(y(),O)[p+20>>>2>>>0]=u.getUTCFullYear()-1900,(y(),O)[p+24>>>2>>>0]=u.getUTCDay(),u=(u.getTime()-Date.UTC(u.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(y(),O)[p+28>>>2>>>0]=u}var du=u=>u%4==0&&(u%100!=0||u%400==0),pu=[0,31,60,91,121,152,182,213,244,274,305,335],cu=[0,31,59,90,120,151,181,212,243,273,304,334];function uw(u,p){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),p>>>=0,u=new Date(1e3*u),(y(),O)[p>>>2>>>0]=u.getSeconds(),(y(),O)[p+4>>>2>>>0]=u.getMinutes(),(y(),O)[p+8>>>2>>>0]=u.getHours(),(y(),O)[p+12>>>2>>>0]=u.getDate(),(y(),O)[p+16>>>2>>>0]=u.getMonth(),(y(),O)[p+20>>>2>>>0]=u.getFullYear()-1900,(y(),O)[p+24>>>2>>>0]=u.getDay();var m=(du(u.getFullYear())?pu:cu)[u.getMonth()]+u.getDate()-1|0;(y(),O)[p+28>>>2>>>0]=m,(y(),O)[p+36>>>2>>>0]=-60*u.getTimezoneOffset(),m=new Date(u.getFullYear(),6,1).getTimezoneOffset();var h=new Date(u.getFullYear(),0,1).getTimezoneOffset();u=0|(m!=h&&u.getTimezoneOffset()==Math.min(h,m)),(y(),O)[p+32>>>2>>>0]=u}function lw(u){u>>>=0;var p=new Date((y(),O)[u+20>>>2>>>0]+1900,(y(),O)[u+16>>>2>>>0],(y(),O)[u+12>>>2>>>0],(y(),O)[u+8>>>2>>>0],(y(),O)[u+4>>>2>>>0],(y(),O)[u>>>2>>>0],0),m=(y(),O)[u+32>>>2>>>0],h=p.getTimezoneOffset(),v=new Date(p.getFullYear(),6,1).getTimezoneOffset(),I=new Date(p.getFullYear(),0,1).getTimezoneOffset(),R=Math.min(I,v);return 0>m?(y(),O)[u+32>>>2>>>0]=+(v!=I&&R==h):0<m!=(R==h)&&(v=Math.max(I,v),p.setTime(p.getTime()+6e4*((0<m?R:v)-h))),(y(),O)[u+24>>>2>>>0]=p.getDay(),m=(du(p.getFullYear())?pu:cu)[p.getMonth()]+p.getDate()-1|0,(y(),O)[u+28>>>2>>>0]=m,(y(),O)[u>>>2>>>0]=p.getSeconds(),(y(),O)[u+4>>>2>>>0]=p.getMinutes(),(y(),O)[u+8>>>2>>>0]=p.getHours(),(y(),O)[u+12>>>2>>>0]=p.getDate(),(y(),O)[u+16>>>2>>>0]=p.getMonth(),(y(),O)[u+20>>>2>>>0]=p.getYear(),u=p.getTime(),BigInt(isNaN(u)?-1:u/1e3)}function fu(u,p,m,h,v,I,R){return i?xe(16,1,u,p,m,h,v,I,R):-52}function hu(u,p,m,h,v,I){if(i)return xe(17,1,u,p,m,h,v,I)}var jr={},dw=()=>performance.timeOrigin+performance.now();function mu(u,p){if(i)return xe(18,1,u,p);if(jr[u]&&(clearTimeout(jr[u].id),delete jr[u]),!p)return 0;var m=setTimeout(()=>{delete jr[u],Jn(()=>zu(u,performance.timeOrigin+performance.now()))},p);return jr[u]={id:m,me:p},0}function pw(u,p,m,h){u>>>=0,p>>>=0,m>>>=0,h>>>=0;var v=new Date().getFullYear(),I=new Date(v,0,1).getTimezoneOffset();v=new Date(v,6,1).getTimezoneOffset();var R=Math.max(I,v);(y(),G)[u>>>2>>>0]=60*R,(y(),O)[p>>>2>>>0]=+(I!=v),u=(p=M=>{var F=Math.abs(M);return`UTC${0<=M?"-":"+"}${String(Math.floor(F/60)).padStart(2,"0")}${String(F%60).padStart(2,"0")}`})(I),p=p(v),v<I?(Bt(u,m,17),Bt(p,h,17)):(Bt(u,h,17),Bt(p,m,17))}var cw=()=>Date.now(),fw=1;function hw(u,p,m){if(m>>>=0,!(0<=u&&3>=u))return 28;if(u===0)u=Date.now();else{if(!fw)return 52;u=performance.timeOrigin+performance.now()}return u=Math.round(1e6*u),(y(),te)[m>>>3>>>0]=BigInt(u),0}var ns=[],gu=(u,p)=>{ns.length=0;for(var m;m=(y(),V)[u++>>>0];){var h=m!=105;p+=(h&=m!=112)&&p%8?4:0,ns.push(m==112?(y(),G)[p>>>2>>>0]:m==106?(y(),te)[p>>>3>>>0]:m==105?(y(),O)[p>>>2>>>0]:(y(),oe)[p>>>3>>>0]),p+=h?8:4}return ns};function mw(u,p,m){return u>>>=0,p=gu(p>>>0,m>>>0),ps[u](...p)}function gw(u,p,m){return u>>>=0,p=gu(p>>>0,m>>>0),ps[u](...p)}var yw=()=>{};function ww(u,p){return C(Re(u>>>0,p>>>0))}var $w=()=>{throw ft+=1,"unwind"};function _w(){return 4294901760}var bw=()=>navigator.hardwareConcurrency,tr={},ii=u=>{var p;return(p=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(u))?+p[1]:(p=/:(\d+):\d+(?:\)|$)/.exec(u))?2147483648|+p[1]:0},yu=u=>{for(var p of u)(u=ii(p))&&(tr[u]=p)};function vw(){var u=Error().stack.toString().split(`
`);return u[0]=="Error"&&u.shift(),yu(u),tr.sd=ii(u[3]),tr.Ud=u,tr.sd}function si(u){if(!(u=tr[u>>>0]))return 0;var p;if(p=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(u))u=p[1];else if(p=/^\s+at (.*) \(.*\)$/.exec(u))u=p[1];else{if(!(p=/^(.+?)@/.exec(u)))return 0;u=p[1]}gt(si.td??0),p=Qn(u)+1;var m=Kr(p);return m&&Bt(u,m,p),si.td=m,si.td}function xw(u){u>>>=0;var p=(y(),V).length;if(u<=p||4294901760<u)return!1;for(var m=1;4>=m;m*=2){var h=p*(1+.2/m);h=Math.min(h,u+100663296);e:{h=(Math.min(4294901760,65536*Math.ceil(Math.max(u,h)/65536))-Pt.buffer.byteLength+65535)/65536|0;try{Pt.grow(h),K();var v=1;break e}catch{}v=void 0}if(v)return!0}return!1}function kw(u,p,m){if(u>>>=0,p>>>=0,tr.sd==u)var h=tr.Ud;else(h=Error().stack.toString().split(`
`))[0]=="Error"&&h.shift(),yu(h);for(var v=3;h[v]&&ii(h[v])!=u;)++v;for(u=0;u<m&&h[u+v];++u)(y(),O)[p+4*u>>>2>>>0]=ii(h[u+v]);return u}var is,ss={},wu=()=>{if(!is){var u,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(u in ss)ss[u]===void 0?delete p[u]:p[u]=ss[u];var m=[];for(u in p)m.push(`${u}=${p[u]}`);is=m}return is};function $u(u,p){if(i)return xe(19,1,u,p);u>>>=0,p>>>=0;var m,h=0,v=0;for(m of wu()){var I=p+h;(y(),G)[u+v>>>2>>>0]=I,h+=Bt(m,I,1/0)+1,v+=4}return 0}function _u(u,p){if(i)return xe(20,1,u,p);u>>>=0,p>>>=0;var m=wu();for(var h of((y(),G)[u>>>2>>>0]=m.length,u=0,m))u+=Qn(h)+1;return(y(),G)[p>>>2>>>0]=u,0}function bu(u){return i?xe(21,1,u):52}function vu(u,p,m,h,v){return i?xe(22,1,u,p,m,h,v):52}function xu(u,p,m,h){return i?xe(23,1,u,p,m,h):52}function ku(u,p,m,h){return i?xe(24,1,u,p,m,h):70}var Tw=[null,[],[]];function Tu(u,p,m,h){if(i)return xe(25,1,u,p,m,h);p>>>=0,m>>>=0,h>>>=0;for(var v=0,I=0;I<m;I++){var R=(y(),G)[p>>>2>>>0],M=(y(),G)[p+4>>>2>>>0];p+=8;for(var F=0;F<M;F++){var Z=u,ae=(y(),V)[R+F>>>0],fe=Tw[Z];ae===0||ae===10?((Z===1?S:C)(Vo(fe)),fe.length=0):fe.push(ae)}v+=M}return(y(),G)[h>>>2>>>0]=v,0}function Ew(u){return u>>>0}i||(function(){for(var u=t.numThreads-1;u--;)No();Nt.push(async()=>{var p=(async function(){if(!i)return Promise.all(Mt.map(Do))})();Ce++,await p,--Ce==0&&ke&&(p=ke,ke=null,p())})})(),i||(Pt=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),K()),t.wasmBinary&&(g=t.wasmBinary),t.stackSave=()=>le(),t.stackRestore=u=>ue(u),t.stackAlloc=u=>us(u),t.setValue=function(u,p,m="i8"){switch(m.endsWith("*")&&(m="*"),m){case"i1":case"i8":(y(),U)[u>>>0]=p;break;case"i16":(y(),H)[u>>>1>>>0]=p;break;case"i32":(y(),O)[u>>>2>>>0]=p;break;case"i64":(y(),te)[u>>>3>>>0]=BigInt(p);break;case"float":(y(),q)[u>>>2>>>0]=p;break;case"double":(y(),oe)[u>>>3>>>0]=p;break;case"*":(y(),G)[u>>>2>>>0]=p;break;default:ve(`invalid type for setValue: ${m}`)}},t.getValue=function(u,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return(y(),U)[u>>>0];case"i16":return(y(),H)[u>>>1>>>0];case"i32":return(y(),O)[u>>>2>>>0];case"i64":return(y(),te)[u>>>3>>>0];case"float":return(y(),q)[u>>>2>>>0];case"double":return(y(),oe)[u>>>3>>>0];case"*":return(y(),G)[u>>>2>>>0];default:ve(`invalid type for getValue: ${p}`)}},t.UTF8ToString=Re,t.stringToUTF8=Bt,t.lengthBytesUTF8=Qn;var Eu,Su,ai,gt,Kr,as,Iu,Cu,Au,os,zu,Ou,de,Yr,Ru,ue,us,le,Du,ls,Nu,Mu,Pu,ds,Bu,Uu,Wu,Lu,Vu,qu,Gu,Fu,Hu,ju,Ku,Yu,Zu,Xu,Qu,Ju,el,tl,rl,nl,il,sl,al,ol,ul,ll,dl,pl,cl,fl,hl,ml,gl,yl,wl,$l,_l,bl,vl,xl,kl,xt,Sw=[Gi,Ao,Bo,qo,Go,Fo,Ho,jo,Ko,Yo,Zo,Xo,Qo,Jo,eu,tu,fu,hu,mu,$u,_u,bu,vu,xu,ku,Tu],ps={1124124:(u,p,m,h,v)=>{if(t===void 0||!t.jd)return 1;if((u=Re(Number(u>>>0))).startsWith("./")&&(u=u.substring(2)),!(u=t.jd.get(u)))return 2;if(p=Number(p>>>0),m=Number(m>>>0),h=Number(h>>>0),p+m>u.byteLength)return 3;try{let I=u.subarray(p,p+m);switch(v){case 0:(y(),V).set(I,h>>>0);break;case 1:t.ae?t.ae(h,I):t.Td(h,I);break;default:return 4}return 0}catch{return 4}},1124948:()=>typeof navigator<"u"&&navigator.de?1:0,1125020:(u,p,m)=>{t.Dd(u,(y(),V).subarray(p>>>0,p+m>>>0))},1125084:()=>t.ce(),1125126:u=>{t.Cd(u)},1125163:()=>{t.Md()},1125194:()=>{t.Nd()},1125223:()=>{t.Rd()},1125248:u=>t.Ld(u),1125281:u=>t.Pd(u),1125313:(u,p,m)=>{t.rd(Number(u),Number(p),Number(m),!0)},1125376:(u,p,m)=>{t.rd(Number(u),Number(p),Number(m))},1125433:()=>typeof wasmOffsetConverter<"u",1125490:u=>{t.ic("Abs",u,void 0)},1125541:u=>{t.ic("Neg",u,void 0)},1125592:u=>{t.ic("Floor",u,void 0)},1125645:u=>{t.ic("Ceil",u,void 0)},1125697:u=>{t.ic("Reciprocal",u,void 0)},1125755:u=>{t.ic("Sqrt",u,void 0)},1125807:u=>{t.ic("Exp",u,void 0)},1125858:u=>{t.ic("Erf",u,void 0)},1125909:u=>{t.ic("Sigmoid",u,void 0)},1125964:(u,p,m)=>{t.ic("HardSigmoid",u,{alpha:p,beta:m})},1126043:u=>{t.ic("HardSwish",u,void 0)},1126100:u=>{t.ic("Log",u,void 0)},1126151:u=>{t.ic("Sin",u,void 0)},1126202:u=>{t.ic("Cos",u,void 0)},1126253:u=>{t.ic("Tan",u,void 0)},1126304:u=>{t.ic("Asin",u,void 0)},1126356:u=>{t.ic("Acos",u,void 0)},1126408:u=>{t.ic("Atan",u,void 0)},1126460:u=>{t.ic("Sinh",u,void 0)},1126512:u=>{t.ic("Cosh",u,void 0)},1126564:u=>{t.ic("Asinh",u,void 0)},1126617:u=>{t.ic("Acosh",u,void 0)},1126670:u=>{t.ic("Atanh",u,void 0)},1126723:u=>{t.ic("Tanh",u,void 0)},1126775:u=>{t.ic("Not",u,void 0)},1126826:(u,p,m)=>{t.ic("Clip",u,{min:p,max:m})},1126895:u=>{t.ic("Clip",u,void 0)},1126947:(u,p)=>{t.ic("Elu",u,{alpha:p})},1127005:u=>{t.ic("Gelu",u,void 0)},1127057:u=>{t.ic("Relu",u,void 0)},1127109:(u,p)=>{t.ic("LeakyRelu",u,{alpha:p})},1127173:(u,p)=>{t.ic("ThresholdedRelu",u,{alpha:p})},1127243:(u,p)=>{t.ic("Cast",u,{to:p})},1127301:u=>{t.ic("Add",u,void 0)},1127352:u=>{t.ic("Sub",u,void 0)},1127403:u=>{t.ic("Mul",u,void 0)},1127454:u=>{t.ic("Div",u,void 0)},1127505:u=>{t.ic("Pow",u,void 0)},1127556:u=>{t.ic("Equal",u,void 0)},1127609:u=>{t.ic("Greater",u,void 0)},1127664:u=>{t.ic("GreaterOrEqual",u,void 0)},1127726:u=>{t.ic("Less",u,void 0)},1127778:u=>{t.ic("LessOrEqual",u,void 0)},1127837:(u,p,m,h,v)=>{t.ic("ReduceMean",u,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1128012:(u,p,m,h,v)=>{t.ic("ReduceMax",u,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1128186:(u,p,m,h,v)=>{t.ic("ReduceMin",u,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1128360:(u,p,m,h,v)=>{t.ic("ReduceProd",u,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1128535:(u,p,m,h,v)=>{t.ic("ReduceSum",u,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1128709:(u,p,m,h,v)=>{t.ic("ReduceL1",u,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1128882:(u,p,m,h,v)=>{t.ic("ReduceL2",u,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1129055:(u,p,m,h,v)=>{t.ic("ReduceLogSum",u,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1129232:(u,p,m,h,v)=>{t.ic("ReduceSumSquare",u,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1129412:(u,p,m,h,v)=>{t.ic("ReduceLogSumExp",u,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1129592:u=>{t.ic("Where",u,void 0)},1129645:(u,p,m)=>{t.ic("Transpose",u,{perm:p?Array.from((y(),O).subarray(Number(p)>>>0,Number(m)>>>0)):[]})},1129769:(u,p,m,h)=>{t.ic("DepthToSpace",u,{blocksize:p,mode:Re(m),format:h?"NHWC":"NCHW"})},1129902:(u,p,m,h)=>{t.ic("DepthToSpace",u,{blocksize:p,mode:Re(m),format:h?"NHWC":"NCHW"})},1130035:(u,p,m,h)=>{t.ic("DFT",u,{axis:p,inverse:m,onesided:h})},1130127:(u,p,m,h,v,I,R,M,F,Z,ae,fe,be,Te,Wt)=>{t.ic("ConvTranspose",u,{format:F?"NHWC":"NCHW",autoPad:p,dilations:[m],group:h,kernelShape:[v],pads:[I,R],strides:[M],wIsConst:()=>!!(y(),U)[Z>>>0],outputPadding:ae?Array.from((y(),O).subarray(Number(ae)>>>0,Number(fe)>>>0)):[],outputShape:be?Array.from((y(),O).subarray(Number(be)>>>0,Number(Te)>>>0)):[],activation:Re(Wt)})},1130560:(u,p,m,h,v,I,R,M,F,Z,ae,fe,be,Te)=>{t.ic("ConvTranspose",u,{format:M?"NHWC":"NCHW",autoPad:p,dilations:Array.from((y(),O).subarray(Number(m)>>>0,(Number(m)>>>0)+2>>>0)),group:h,kernelShape:Array.from((y(),O).subarray(Number(v)>>>0,(Number(v)>>>0)+2>>>0)),pads:Array.from((y(),O).subarray(Number(I)>>>0,(Number(I)>>>0)+4>>>0)),strides:Array.from((y(),O).subarray(Number(R)>>>0,(Number(R)>>>0)+2>>>0)),wIsConst:()=>!!(y(),U)[F>>>0],outputPadding:Z?Array.from((y(),O).subarray(Number(Z)>>>0,Number(ae)>>>0)):[],outputShape:fe?Array.from((y(),O).subarray(Number(fe)>>>0,Number(be)>>>0)):[],activation:Re(Te)})},1131221:(u,p,m,h,v,I,R,M,F,Z,ae,fe,be,Te,Wt)=>{t.ic("ConvTranspose",u,{format:F?"NHWC":"NCHW",autoPad:p,dilations:[m],group:h,kernelShape:[v],pads:[I,R],strides:[M],wIsConst:()=>!!(y(),U)[Z>>>0],outputPadding:ae?Array.from((y(),O).subarray(Number(ae)>>>0,Number(fe)>>>0)):[],outputShape:be?Array.from((y(),O).subarray(Number(be)>>>0,Number(Te)>>>0)):[],activation:Re(Wt)})},1131654:(u,p,m,h,v,I,R,M,F,Z,ae,fe,be,Te)=>{t.ic("ConvTranspose",u,{format:M?"NHWC":"NCHW",autoPad:p,dilations:Array.from((y(),O).subarray(Number(m)>>>0,(Number(m)>>>0)+2>>>0)),group:h,kernelShape:Array.from((y(),O).subarray(Number(v)>>>0,(Number(v)>>>0)+2>>>0)),pads:Array.from((y(),O).subarray(Number(I)>>>0,(Number(I)>>>0)+4>>>0)),strides:Array.from((y(),O).subarray(Number(R)>>>0,(Number(R)>>>0)+2>>>0)),wIsConst:()=>!!(y(),U)[F>>>0],outputPadding:Z?Array.from((y(),O).subarray(Number(Z)>>>0,Number(ae)>>>0)):[],outputShape:fe?Array.from((y(),O).subarray(Number(fe)>>>0,Number(be)>>>0)):[],activation:Re(Te)})},1132315:(u,p)=>{t.ic("GlobalAveragePool",u,{format:p?"NHWC":"NCHW"})},1132406:(u,p,m,h,v,I,R,M,F,Z,ae,fe,be,Te)=>{t.ic("AveragePool",u,{format:Te?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:h,storage_order:v,dilations:I?Array.from((y(),O).subarray(Number(I)>>>0,Number(R)>>>0)):[],kernel_shape:M?Array.from((y(),O).subarray(Number(M)>>>0,Number(F)>>>0)):[],pads:Z?Array.from((y(),O).subarray(Number(Z)>>>0,Number(ae)>>>0)):[],strides:fe?Array.from((y(),O).subarray(Number(fe)>>>0,Number(be)>>>0)):[]})},1132885:(u,p)=>{t.ic("GlobalAveragePool",u,{format:p?"NHWC":"NCHW"})},1132976:(u,p,m,h,v,I,R,M,F,Z,ae,fe,be,Te)=>{t.ic("AveragePool",u,{format:Te?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:h,storage_order:v,dilations:I?Array.from((y(),O).subarray(Number(I)>>>0,Number(R)>>>0)):[],kernel_shape:M?Array.from((y(),O).subarray(Number(M)>>>0,Number(F)>>>0)):[],pads:Z?Array.from((y(),O).subarray(Number(Z)>>>0,Number(ae)>>>0)):[],strides:fe?Array.from((y(),O).subarray(Number(fe)>>>0,Number(be)>>>0)):[]})},1133455:(u,p)=>{t.ic("GlobalMaxPool",u,{format:p?"NHWC":"NCHW"})},1133542:(u,p,m,h,v,I,R,M,F,Z,ae,fe,be,Te)=>{t.ic("MaxPool",u,{format:Te?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:h,storage_order:v,dilations:I?Array.from((y(),O).subarray(Number(I)>>>0,Number(R)>>>0)):[],kernel_shape:M?Array.from((y(),O).subarray(Number(M)>>>0,Number(F)>>>0)):[],pads:Z?Array.from((y(),O).subarray(Number(Z)>>>0,Number(ae)>>>0)):[],strides:fe?Array.from((y(),O).subarray(Number(fe)>>>0,Number(be)>>>0)):[]})},1134017:(u,p)=>{t.ic("GlobalMaxPool",u,{format:p?"NHWC":"NCHW"})},1134104:(u,p,m,h,v,I,R,M,F,Z,ae,fe,be,Te)=>{t.ic("MaxPool",u,{format:Te?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:h,storage_order:v,dilations:I?Array.from((y(),O).subarray(Number(I)>>>0,Number(R)>>>0)):[],kernel_shape:M?Array.from((y(),O).subarray(Number(M)>>>0,Number(F)>>>0)):[],pads:Z?Array.from((y(),O).subarray(Number(Z)>>>0,Number(ae)>>>0)):[],strides:fe?Array.from((y(),O).subarray(Number(fe)>>>0,Number(be)>>>0)):[]})},1134579:(u,p,m,h,v)=>{t.ic("Gemm",u,{alpha:p,beta:m,transA:h,transB:v})},1134683:u=>{t.ic("MatMul",u,void 0)},1134737:(u,p,m,h)=>{t.ic("ArgMax",u,{keepDims:!!p,selectLastIndex:!!m,axis:h})},1134845:(u,p,m,h)=>{t.ic("ArgMin",u,{keepDims:!!p,selectLastIndex:!!m,axis:h})},1134953:(u,p)=>{t.ic("Softmax",u,{axis:p})},1135016:(u,p)=>{t.ic("Concat",u,{axis:p})},1135076:(u,p,m,h,v)=>{t.ic("Split",u,{axis:p,numOutputs:m,splitSizes:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1135232:u=>{t.ic("Expand",u,void 0)},1135286:(u,p)=>{t.ic("Gather",u,{axis:Number(p)})},1135357:(u,p)=>{t.ic("GatherElements",u,{axis:Number(p)})},1135436:(u,p)=>{t.ic("GatherND",u,{batch_dims:Number(p)})},1135515:(u,p,m,h,v,I,R,M,F,Z,ae)=>{t.ic("Resize",u,{antialias:p,axes:m?Array.from((y(),O).subarray(Number(m)>>>0,Number(h)>>>0)):[],coordinateTransformMode:Re(v),cubicCoeffA:I,excludeOutside:R,extrapolationValue:M,keepAspectRatioPolicy:Re(F),mode:Re(Z),nearestMode:Re(ae)})},1135877:(u,p,m,h,v,I,R)=>{t.ic("Slice",u,{starts:p?Array.from((y(),O).subarray(Number(p)>>>0,Number(m)>>>0)):[],ends:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[],axes:I?Array.from((y(),O).subarray(Number(I)>>>0,Number(R)>>>0)):[]})},1136141:u=>{t.ic("Tile",u,void 0)},1136193:(u,p,m)=>{t.ic("InstanceNormalization",u,{epsilon:p,format:m?"NHWC":"NCHW"})},1136307:(u,p,m)=>{t.ic("InstanceNormalization",u,{epsilon:p,format:m?"NHWC":"NCHW"})},1136421:u=>{t.ic("Range",u,void 0)},1136474:(u,p)=>{t.ic("Einsum",u,{equation:Re(p)})},1136555:(u,p,m,h,v)=>{t.ic("Pad",u,{mode:p,value:m,pads:h?Array.from((y(),O).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1136698:(u,p,m,h,v,I)=>{t.ic("BatchNormalization",u,{epsilon:p,momentum:m,spatial:!!v,trainingMode:!!h,format:I?"NHWC":"NCHW"})},1136867:(u,p,m,h,v,I)=>{t.ic("BatchNormalization",u,{epsilon:p,momentum:m,spatial:!!v,trainingMode:!!h,format:I?"NHWC":"NCHW"})},1137036:(u,p,m)=>{t.ic("CumSum",u,{exclusive:Number(p),reverse:Number(m)})},1137133:(u,p,m)=>{t.ic("DequantizeLinear",u,{axis:p,blockSize:m})},1137223:(u,p,m,h,v)=>{t.ic("GridSample",u,{align_corners:p,mode:Re(m),padding_mode:Re(h),format:v?"NHWC":"NCHW"})},1137393:(u,p,m,h,v)=>{t.ic("GridSample",u,{align_corners:p,mode:Re(m),padding_mode:Re(h),format:v?"NHWC":"NCHW"})},1137563:(u,p)=>{t.ic("ScatterND",u,{reduction:Re(p)})},1137648:(u,p,m,h,v,I,R,M,F)=>{t.ic("Attention",u,{numHeads:p,isUnidirectional:m,maskFilterValue:h,scale:v,doRotary:I,qkvHiddenSizes:R?Array.from((y(),O).subarray(Number(M)>>>0,Number(M)+R>>>0)):[],pastPresentShareBuffer:!!F})},1137920:u=>{t.ic("BiasAdd",u,void 0)},1137975:u=>{t.ic("BiasSplitGelu",u,void 0)},1138036:u=>{t.ic("FastGelu",u,void 0)},1138092:(u,p,m,h,v,I,R,M,F,Z,ae,fe,be,Te,Wt,cs)=>{t.ic("Conv",u,{format:fe?"NHWC":"NCHW",auto_pad:p,dilations:m?Array.from((y(),O).subarray(Number(m)>>>0,Number(h)>>>0)):[],group:v,kernel_shape:I?Array.from((y(),O).subarray(Number(I)>>>0,Number(R)>>>0)):[],pads:M?Array.from((y(),O).subarray(Number(M)>>>0,Number(F)>>>0)):[],strides:Z?Array.from((y(),O).subarray(Number(Z)>>>0,Number(ae)>>>0)):[],w_is_const:()=>!!(y(),U)[Number(be)>>>0],activation:Re(Te),activation_params:Wt?Array.from((y(),q).subarray(Number(Wt)>>>0,Number(cs)>>>0)):[]})},1138676:u=>{t.ic("Gelu",u,void 0)},1138728:(u,p,m,h,v,I,R,M,F)=>{t.ic("GroupQueryAttention",u,{numHeads:p,kvNumHeads:m,scale:h,softcap:v,doRotary:I,rotaryInterleaved:R,smoothSoftmax:M,localWindowSize:F})},1138945:(u,p,m,h)=>{t.ic("LayerNormalization",u,{axis:p,epsilon:m,simplified:!!h})},1139056:(u,p,m,h)=>{t.ic("LayerNormalization",u,{axis:p,epsilon:m,simplified:!!h})},1139167:(u,p,m,h,v,I)=>{t.ic("MatMulNBits",u,{k:p,n:m,accuracyLevel:h,bits:v,blockSize:I})},1139294:(u,p,m,h,v,I)=>{t.ic("MultiHeadAttention",u,{numHeads:p,isUnidirectional:m,maskFilterValue:h,scale:v,doRotary:I})},1139453:(u,p)=>{t.ic("QuickGelu",u,{alpha:p})},1139517:(u,p,m,h,v)=>{t.ic("RotaryEmbedding",u,{interleaved:!!p,numHeads:m,rotaryEmbeddingDim:h,scale:v})},1139656:(u,p,m)=>{t.ic("SkipLayerNormalization",u,{epsilon:p,simplified:!!m})},1139758:(u,p,m)=>{t.ic("SkipLayerNormalization",u,{epsilon:p,simplified:!!m})},1139860:(u,p,m,h)=>{t.ic("GatherBlockQuantized",u,{gatherAxis:p,quantizeAxis:m,blockSize:h})},1139981:u=>{t.Qd(u)},1140015:(u,p)=>t.Sd(Number(u),Number(p),t.hd.Vd,t.hd.errors)};function Iw(u,p,m){return uu(async()=>{await t.Od(Number(u),Number(p),Number(m))})}function Cw(){return typeof wasmOffsetConverter<"u"}function Aw(u,p,m,h){var v=le();try{return Hu(u,p,m,h)}catch(I){if(ue(v),I!==I+0)throw I;de(1,0)}}function zw(u,p,m){var h=le();try{return Gu(u,p,m)}catch(v){if(ue(h),v!==v+0)throw v;de(1,0)}}function Ow(u){var p=le();try{Vu(u)}catch(m){if(ue(p),m!==m+0)throw m;de(1,0)}}function Rw(u,p){var m=le();try{return ds(u,p)}catch(h){if(ue(m),h!==h+0)throw h;de(1,0)}}function Dw(u,p,m){var h=le();try{Pu(u,p,m)}catch(v){if(ue(h),v!==v+0)throw v;de(1,0)}}function Nw(u,p,m,h){var v=le();try{return Xu(u,p,m,h)}catch(I){if(ue(v),I!==I+0)throw I;de(1,0)}}function Mw(u,p){var m=le();try{ju(u,p)}catch(h){if(ue(m),h!==h+0)throw h;de(1,0)}}function Pw(u,p,m,h,v,I,R){var M=le();try{return Fu(u,p,m,h,v,I,R)}catch(F){if(ue(M),F!==F+0)throw F;de(1,0)}}function Bw(u,p,m,h,v,I){var R=le();try{Bu(u,p,m,h,v,I)}catch(M){if(ue(R),M!==M+0)throw M;de(1,0)}}function Uw(u,p,m,h){var v=le();try{Wu(u,p,m,h)}catch(I){if(ue(v),I!==I+0)throw I;de(1,0)}}function Ww(u,p,m,h,v){var I=le();try{qu(u,p,m,h,v)}catch(R){if(ue(I),R!==R+0)throw R;de(1,0)}}function Lw(u,p,m,h,v,I,R){var M=le();try{Yu(u,p,m,h,v,I,R)}catch(F){if(ue(M),F!==F+0)throw F;de(1,0)}}function Vw(u,p,m,h,v,I,R){var M=le();try{Zu(u,p,m,h,v,I,R)}catch(F){if(ue(M),F!==F+0)throw F;de(1,0)}}function qw(u,p,m,h,v,I,R,M){var F=le();try{tl(u,p,m,h,v,I,R,M)}catch(Z){if(ue(F),Z!==Z+0)throw Z;de(1,0)}}function Gw(u,p,m,h,v){var I=le();try{return Ku(u,p,m,h,v)}catch(R){if(ue(I),R!==R+0)throw R;de(1,0)}}function Fw(u,p,m){var h=le();try{return Lu(u,p,m)}catch(v){if(ue(h),v!==v+0)throw v;de(1,0)}}function Hw(u,p,m,h,v,I,R,M){var F=le();try{rl(u,p,m,h,v,I,R,M)}catch(Z){if(ue(F),Z!==Z+0)throw Z;de(1,0)}}function jw(u,p,m,h,v,I,R,M,F,Z,ae,fe){var be=le();try{Qu(u,p,m,h,v,I,R,M,F,Z,ae,fe)}catch(Te){if(ue(be),Te!==Te+0)throw Te;de(1,0)}}function Kw(u,p,m){var h=le();try{return nl(u,p,m)}catch(v){if(ue(h),v!==v+0)throw v;return de(1,0),0n}}function Yw(u,p,m,h,v,I,R,M,F){var Z=le();try{Uu(u,p,m,h,v,I,R,M,F)}catch(ae){if(ue(Z),ae!==ae+0)throw ae;de(1,0)}}function Zw(u){var p=le();try{return il(u)}catch(m){if(ue(p),m!==m+0)throw m;de(1,0)}}function Xw(u,p){var m=le();try{return $l(u,p)}catch(h){if(ue(m),h!==h+0)throw h;return de(1,0),0n}}function Qw(u,p,m,h){var v=le();try{return sl(u,p,m,h)}catch(I){if(ue(v),I!==I+0)throw I;de(1,0)}}function Jw(u,p,m,h,v,I,R){var M=le();try{_l(u,p,m,h,v,I,R)}catch(F){if(ue(M),F!==F+0)throw F;de(1,0)}}function e1(u){var p=le();try{return al(u)}catch(m){if(ue(p),m!==m+0)throw m;return de(1,0),0n}}function t1(u,p,m,h,v){var I=le();try{return cl(u,p,m,h,v)}catch(R){if(ue(I),R!==R+0)throw R;de(1,0)}}function r1(u,p,m,h,v,I){var R=le();try{return fl(u,p,m,h,v,I)}catch(M){if(ue(R),M!==M+0)throw M;de(1,0)}}function n1(u,p,m,h,v,I){var R=le();try{return Ju(u,p,m,h,v,I)}catch(M){if(ue(R),M!==M+0)throw M;de(1,0)}}function i1(u,p,m,h,v,I){var R=le();try{return hl(u,p,m,h,v,I)}catch(M){if(ue(R),M!==M+0)throw M;de(1,0)}}function s1(u,p,m,h,v,I,R,M){var F=le();try{return el(u,p,m,h,v,I,R,M)}catch(Z){if(ue(F),Z!==Z+0)throw Z;de(1,0)}}function a1(u,p,m,h,v){var I=le();try{return ml(u,p,m,h,v)}catch(R){if(ue(I),R!==R+0)throw R;return de(1,0),0n}}function o1(u,p,m,h){var v=le();try{return gl(u,p,m,h)}catch(I){if(ue(v),I!==I+0)throw I;de(1,0)}}function u1(u,p,m,h){var v=le();try{return yl(u,p,m,h)}catch(I){if(ue(v),I!==I+0)throw I;de(1,0)}}function l1(u,p,m,h,v,I,R,M,F,Z,ae,fe){var be=le();try{return wl(u,p,m,h,v,I,R,M,F,Z,ae,fe)}catch(Te){if(ue(be),Te!==Te+0)throw Te;de(1,0)}}function d1(u,p,m,h,v,I,R,M,F,Z,ae){var fe=le();try{dl(u,p,m,h,v,I,R,M,F,Z,ae)}catch(be){if(ue(fe),be!==be+0)throw be;de(1,0)}}function p1(u,p,m,h,v,I,R,M,F,Z,ae,fe,be,Te,Wt,cs){var m1=le();try{pl(u,p,m,h,v,I,R,M,F,Z,ae,fe,be,Te,Wt,cs)}catch(fs){if(ue(m1),fs!==fs+0)throw fs;de(1,0)}}function c1(u,p,m){var h=le();try{return ol(u,p,m)}catch(v){if(ue(h),v!==v+0)throw v;de(1,0)}}function f1(u,p,m){var h=le();try{return ul(u,p,m)}catch(v){if(ue(h),v!==v+0)throw v;de(1,0)}}function h1(u,p,m,h){var v=le();try{ll(u,p,m,h)}catch(I){if(ue(v),I!==I+0)throw I;de(1,0)}}function oi(){if(0<Ce)ke=oi;else if(i)k?.(t),j();else{for(var u=Nt;0<u.length;)u.shift()(t);0<Ce?ke=oi:(t.calledRun=!0,z||(j(),k?.(t)))}}return i||(xt=await Le(),oi()),t.PTR_SIZE=4,B?t:new Promise((u,p)=>{k=u,T=p})}var Dh,Sd,S_=L(()=>{"use strict";Dh=Ed,Sd=globalThis.self?.name?.startsWith("em-pthread"),Sd&&Ed()}),Us,Na,Id,je,Nh,$i,Cd,Ad,Ws,zd,Ls,Mh,Vs,Ph,ro=L(()=>{"use strict";to(),Us=typeof location>"u"?void 0:location.origin,Na=import.meta.url>"file:"&&import.meta.url<"file;",Id=()=>{if(Na){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Us).href}return import.meta.url},je=Id(),Nh=()=>{if(je&&!je.startsWith("blob:"))return je.substring(0,je.lastIndexOf("/")+1)},$i=(e,t)=>{try{let r=t??je;return(r?new URL(e,r):new URL(e)).origin===Us}catch{return!1}},Cd=(e,t)=>{let r=t??je;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Ad=(e,t)=>`${t??"./"}${e}`,Ws=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},zd=async e=>(await import(e)).default,Ls=(E_(),jn(zh)).default,Mh=async()=>{if(!je)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if($i(je))return[void 0,Ls()];let e=await Ws(je);return[e,Ls(e)]},Vs=(S_(),jn(Rh)).default,Ph=async(e,t,r,n)=>{let i=Vs&&!(e||t);if(i)if(je)i=$i(je)||n&&!r;else if(n&&!r)i=!0;else throw new Error("cannot determine the script source URL.");if(i)return[void 0,Vs];{let s="ort-wasm-simd-threaded.jsep.mjs",a=e??Cd(s,t),o=r&&a&&!$i(a,t),l=o?await Ws(a):a??Ad(s,t);return[o?l:void 0,await zd(l)]}}}),qs,_i,On,Gs,Od,Rd,Dd,no,we,Tr=L(()=>{"use strict";ro(),_i=!1,On=!1,Gs=!1,Od=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Rd=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Dd=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},no=async e=>{if(_i)return Promise.resolve();if(On)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Gs)throw new Error("previous call to 'initializeWebAssembly()' failed.");On=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Dd())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Rd())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let n=Od();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let i=e.wasmPaths,s=typeof i=="string"?i:void 0,a=i?.mjs,o=a?.href??a,l=i?.wasm,d=l?.href??l,c=e.wasmBinary,[f,g]=await Ph(o,s,r>1,!!c||!!d),$=!1,w=[];if(t>0&&w.push(new Promise(k=>{setTimeout(()=>{$=!0,k()},t)})),w.push(new Promise((k,T)=>{let b={numThreads:r};if(c)b.wasmBinary=c,b.locateFile=_=>_;else if(d||s)b.locateFile=_=>d??s+_;else if(o&&o.indexOf("blob:")!==0)b.locateFile=_=>new URL(_,o).href;else if(f){let _=Nh();_&&(b.locateFile=E=>_+E)}g(b).then(_=>{On=!1,_i=!0,qs=_,k(),f&&URL.revokeObjectURL(f)},_=>{On=!1,Gs=!0,T(_)})})),await Promise.race(w),$)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},we=()=>{if(_i&&qs)return qs;throw new Error("WebAssembly is not initialized yet.")}}),ct,Ni,me,io=L(()=>{"use strict";Tr(),ct=(e,t)=>{let r=we(),n=r.lengthBytesUTF8(e)+1,i=r._malloc(n);return r.stringToUTF8(e,i,n),t.push(i),i},Ni=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([i,s])=>{let a=t?t+i:i;if(typeof s=="object")Ni(s,a+".",r,n);else if(typeof s=="string"||typeof s=="number")n(a,s.toString());else if(typeof s=="boolean")n(a,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},me=e=>{let t=we(),r=t.stackSave();try{let n=t.PTR_SIZE,i=t.stackAlloc(2*n);t._OrtGetLastError(i,i+n);let s=Number(t.getValue(i,n===4?"i32":"i64")),a=t.getValue(i+n,"*"),o=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(r)}}}),Bh,I_=L(()=>{"use strict";Tr(),io(),Bh=(e,t)=>{let r=we(),n=0,i=[],s=e||{};try{if(e?.logSeverityLevel===void 0)s.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)s.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(s.terminate=!1);let a=0;e?.tag!==void 0&&(a=ct(e.tag,i)),n=r._OrtCreateRunOptions(s.logSeverityLevel,s.logVerbosityLevel,!!s.terminate,a),n===0&&me("Can't create run options."),e?.extra!==void 0&&Ni(e.extra,"",new WeakSet,(o,l)=>{let d=ct(o,i),c=ct(l,i);r._OrtAddRunConfigEntry(n,d,c)!==0&&me(`Can't set a run config entry: ${o} - ${l}.`)});for(let o of t)r._OrtRunOptionsAddActiveLoraAdapter(n,o)!==0&&me("Can't add an active LoRA adapter.");return[n,i]}catch(a){throw n!==0&&r._OrtReleaseRunOptions(n),i.forEach(o=>r._free(o)),a}}}),Nd,Md,Pd,pr,Bd,Uh,C_=L(()=>{"use strict";Tr(),io(),Nd=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Md=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Pd=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},pr=(e,t,r,n)=>{let i=ct(t,n),s=ct(r,n);we()._OrtAddSessionConfigEntry(e,i,s)!==0&&me(`Can't set a session config entry: ${t} - ${r}.`)},Bd=async(e,t,r)=>{let n=t.executionProviders;for(let i of n){let s=typeof i=="string"?i:i.name,a=[],o;switch(s){case"webnn":if(s="WEBNN",pr(e,"session.disable_quant_qdq","1",r),pr(e,"session.disable_qdq_constant_folding","1",r),typeof i!="string"){let g=i?.deviceType;g&&pr(e,"deviceType",g,r)}break;case"webgpu":if(s="JS",typeof i!="string"){let g=i;if(g?.preferredLayout){if(g.preferredLayout!=="NCHW"&&g.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${g.preferredLayout}`);pr(e,"preferredLayout",g.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${s}`)}let l=a.length,d=0,c=0;if(l>0){d=we()._malloc(l*we().PTR_SIZE),r.push(d),c=we()._malloc(l*we().PTR_SIZE),r.push(c);for(let g=0;g<l;g++)we().setValue(d+g*we().PTR_SIZE,a[g][0],"*"),we().setValue(c+g*we().PTR_SIZE,a[g][1],"*")}let f;if(o!==void 0){let g=we()._malloc(we().PTR_SIZE);r.push(g),we().setValue(g,o[0],"*"),f=await we()._OrtAppendExecutionProviderV2(e,g,1,d,c,l)}else{let g=ct(s,r);f=await we()._OrtAppendExecutionProvider(e,g,d,c,l)}f!==0&&me(`Can't append execution provider: ${s}.`)}},Uh=async e=>{let t=we(),r=0,n=[],i=e||{};Pd(i);try{let s=Nd(i.graphOptimizationLevel??"all"),a=Md(i.executionMode??"sequential"),o=typeof i.logId=="string"?ct(i.logId,n):0,l=i.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let d=i.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let c=typeof i.optimizedModelFilePath=="string"?ct(i.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(s,!!i.enableCpuMemArena,!!i.enableMemPattern,a,!!i.enableProfiling,0,o,l,d,c),r===0&&me("Can't create session options."),i.executionProviders&&await Bd(r,i,n),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);pr(r,"enableGraphCapture",i.enableGraphCapture.toString(),n)}if(i.freeDimensionOverrides)for(let[f,g]of Object.entries(i.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let $=ct(f,n);t._OrtAddFreeDimensionOverride(r,$,g)!==0&&me(`Can't set a free dimension override: ${f} - ${g}.`)}return i.extra!==void 0&&Ni(i.extra,"",new WeakSet,(f,g)=>{pr(r,f,g,n)}),[r,n]}catch(s){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&me("Can't release session options."),n.forEach(a=>t._free(a)),s}}}),wr,Rt,$r,Vi,Mi,so,ao,Ma,ne=L(()=>{"use strict";wr=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Rt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},$r=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((i,s)=>i*s,1);return r>0?Math.ceil(n*r):void 0},Vi=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Mi=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},so=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",ao=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ma=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),qi,oo=L(()=>{"use strict";to(),qi=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let i=t.body.getReader(),s;try{s=new ArrayBuffer(n)}catch(o){if(o instanceof RangeError){let l=Math.ceil(n/65536);s=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw o}let a=0;for(;;){let{done:o,value:l}=await i.read();if(o)break;let d=l.byteLength;new Uint8Array(s,a,d).set(l),a+=d}return new Uint8Array(s,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Ud,Wd,Ld,Vd,uo,qd,ce,Dt=L(()=>{"use strict";ne(),Ud=["V","I","W","E","F"],Wd=(e,t)=>{console.log(`[${Ud[e]},${new Date().toISOString()}]${t}`)},uo=(e,t)=>{Ld=e,Vd=t},qd=(e,t)=>{let r=Mi(e),n=Mi(Ld);r>=n&&Wd(r,typeof t=="function"?t():t)},ce=(...e)=>{Vd&&qd(...e)}}),Gd,Vr,D,Pi,Wh,Lh,Vh,ie=L(()=>{"use strict";Gd=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Vr=class{static calcShape(e,t,r=!1){let n=e.length,i=t.length;if(n===0)return t;if(i===0)return e;let s=Math.max(e.length,t.length),a=new Array(s);if(r){if(n<2||i<2)return;let o=Gd.calcMatMulShape([e[n-2],e[n-1]],[t[i-2],t[i-1]]);if(o===void 0)return;[a[s-2],a[s-1]]=o}for(let o=r?3:1;o<=s;o++){let l=n-o<0?1:e[n-o],d=i-o<0?1:t[i-o];if(l!==d&&l>1&&d>1)return;let c=Math.max(l,d);if(l&&d)a[s-o]=Math.max(l,d);else{if(c>1)return;a[s-o]=0}}return a}static isValidBroadcast(e,t){let r=e.length,n=t.length;if(r>n)return!1;for(let i=1;i<=r;i++)if(e[r-i]!==1&&e[r-i]!==t[n-i])return!1;return!0}},D=class Oi{static size(t){return Oi.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let i=new Array(n),s=n-1;for(;s>=0;){if(t[s]%r===0){i[s]=t[s]/r;break}if(r%t[s]!==0)throw new Error("cannot convert shape");i[s]=1,r/=t[s],s--}for(s--;s>=0;s--)i[s]=t[s];return i}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Oi.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Oi.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let i=1;for(let s=r;s<n;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(t[s])}return i}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let i=r-3;i>=0;--i)n[i]=n[i+1]*t[i+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((i,s)=>i+r[s]+r[s+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,i)=>n===r[i])}},Pi=class Zt{static adjustPoolAttributes(t,r,n,i,s,a){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<r.length-2;o++)o>=n.length?n.push(r[o+2]):n[o]=r[o+2];for(let o=0;o<n.length;o++)if(o<i.length){if(i[o]<0)throw new Error("strides should be greater than or equal to 1")}else i.push(1);for(let o=0;o<n.length;o++)if(o<s.length){if(s[o]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let o=0;o<n.length*2;o++)if(o<a.length){if(a[o]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let o=0;o<n.length;o++){if(n[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[o]>=n[o]||a[o+n.length]>=n[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,i,s,a,o){if(o){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)Zt.adjustPadAndReturnShape(t[l+(a?1:2)],r[l],n[l],i[l],s,l,l+t.length-2,o)}}static computePoolOutputShape(t,r,n,i,s,a,o,l=0){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return Zt.computeShapeHelper(t,r,d,n,i,s,a,o,l),d}static computeConvOutputShape(t,r,n,i,s,a,o){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return Zt.computeShapeHelper(!1,t,l,n,i,s,a,o),l}static computeShapeHelper(t,r,n,i,s,a,o,l,d=0){if(t)for(let c=0;c<r.length-2;c++)n.push(1);else for(let c=0;c<r.length-2;c++)n.push(Zt.adjustPadAndReturnShape(r[c+2],i[c],s[c],a[c],o,c,c+r.length-2,l,d))}static computeOutputSize(t,r,n,i,s){let a=Math.floor(t/r)+1;return s===1&&(a=Math.ceil(t/r)+1,(a-1)*r>=n+i&&(a-=1)),a}static adjustPadAndReturnShape(t,r,n,i,s,a,o,l,d=0){let c=n*(i-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return s[a]=0,s[o]=0,Zt.computeOutputSize(t-c,r,t,0,d);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=(Math.floor((t+r-1)/r)-1)*r+i-t;return s[a]=Math.floor(l==="SAME_LOWER"?(f+1)/2:f/2),s[o]=f-s[a],Zt.computeOutputSize(t+s[a]+s[o]-c,r,t,s[a],d)}default:throw new Error("Unsupported AutoPad type")}else return Zt.computeOutputSize(t+s[a]+s[o]-c,r,t,s[a],d)}},Wh=class{static getShapeOfGemmResult(e,t,r,n,i){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,a,o;t?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(n?(o=r[0],l=1):(o=r[1],l=0),r[l]!==a)throw new Error("dimension mismatch");if(s<=0||o<=0||a<=0)throw new Error("invalid shape specified");if(i&&!Vr.isValidBroadcast(i,[s,o]))throw new Error("gemm: invalid bias shape for broadcast");return[s,o,a]}},Lh=-34028234663852886e22,Vh=34028234663852886e22}),lo,qh=L(()=>{"use strict";ne(),lo=(e,t)=>new(Vi(t))(e)}),Fs,Fd,Hs,Hd,js,jd,Ks,Ys,Zs,Kd,Gh,A_=L(()=>{"use strict";ne(),Dt(),Fs=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Fd=(e,t)=>{if(t==="int32")return e;let r=Fs.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let n=r/8;if(e.byteLength%n!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${n}.`);let i=e.byteLength/n,s=new(Vi(t))(e.buffer,e.byteOffset,i);switch(t){case"int64":case"uint64":{let a=new Int32Array(i);for(let o=0;o<i;o++){let l=s[o];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");a[o]=Number(l)}return new Uint8Array(a.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&s.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let a=Int32Array.from(s,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Hs=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,n=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let i=BigInt64Array.from(n,BigInt);return new Uint8Array(i.buffer)}case"uint64":{if(n.some(s=>s<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let i=BigUint64Array.from(n,BigInt);return new Uint8Array(i.buffer)}case"int8":{if(n.some(s=>s<-128||s>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let i=Int8Array.from(n,Number);return new Uint8Array(i.buffer)}case"uint8":{if(n.some(i=>i<0||i>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(n,Number)}case"uint32":{if(n.some(s=>s<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let i=Uint32Array.from(n,Number);return new Uint8Array(i.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Hd=1,js=()=>Hd++,jd=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Ks=(e,t)=>{let r=Fs.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((n,i)=>n*i)*r/8):0},Ys=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:n,dataType:i,shape:s,fallbackDataType:a}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=n,this.dataType=i,this.tensorShape=s,this.fallbackDataType=a}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Ks(this.dataType,this.tensorShape)}destroy(){ce("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Hs(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return new Uint8Array(r).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((n,i)=>n===r[i])}setIsDataConverted(e){this.isDataConverted=e}},Zs=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,n){let i=this.tensorManager.getMLContext(e),s=this.tensorManager.getMLOpSupportLimits(e),a;if(!s?.input.dataTypes.includes(t)){if(a=jd.get(t),!a||!s?.input.dataTypes.includes(a))throw new Error(`WebNN backend does not support data type: ${t}`);ce("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${a}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,r))return this.wrapper.tensor;if(n){if(this.wrapper.byteLength!==Ks(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,o,!0,!0,a),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Fd(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ce("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Hs(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Kd=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=js();return this.tensorTrackersById.set(e,new Zs(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,n,i){ce("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${i}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,r,n,i)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){ce("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,n){let i=this.getMLContext(e),s=js(),a=new Ys({sessionId:e,context:i,tensor:t,dataType:r,shape:n});return this.tensorTrackersById.set(s,new Zs(this,a)),this.externalTensors.add(a),s}async getCachedTensor(e,t,r,n,i,s,a){let o=this.getMLContext(e);for(let[d,c]of this.freeTensors.entries())if(c.canReuseTensor(o,t,r)){ce("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${r}`);let f=this.freeTensors.splice(d,1)[0];return f.sessionId=e,f}ce("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${r}}`);let l=await o.createTensor({dataType:a??t,shape:r,dimensions:r,usage:n,writable:i,readable:s});return new Ys({sessionId:e,context:o,tensor:l,dataType:t,shape:r,fallbackDataType:a})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Gh=(...e)=>new Kd(...e)}),Rn,Yd,Fh,z_=L(()=>{"use strict";ne(),Tr(),qh(),A_(),Dt(),Rn=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Yd=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((i,s)=>i===n[s]&&e[i]===t[i])},Fh=class{constructor(e){this.tensorManager=Gh(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,uo(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ce("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ce("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)ce("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(n=>n.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:n}),n}}else if(e===void 0){let r=this.mlContextCache.findIndex(n=>n.options===void 0&&n.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:n}),n}}let t=this.mlContextCache.findIndex(r=>Yd(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let n=this.mlContextCache.findIndex(i=>i.mlContext===t);n!==-1&&this.mlContextCache.splice(n,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ce("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,n,i){let s=Rn.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,n,i)}async createTemporaryTensor(e,t,r){ce("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let n=Rn.get(t);if(!n)throw new Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,n,r,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!we().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ce("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return lo(r,t)}}registerMLTensor(e,t,r,n){let i=Rn.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(e,t,i,n);return ce("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${n}} -> {tensorId: ${s}}`),s}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let n=Rn.get(wr(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof n>"u"?!1:r?!!i?.input.dataTypes.includes(n):!!i?.output.dataTypes.includes(n)}flush(){}}}),po=L(()=>{"use strict"}),Xs,bi,vi,Zd,Xd,Qs,Pa,Qd,Hh,O_=L(()=>{"use strict";Dt(),po(),Xs=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),bi=[],vi=e=>Math.ceil(Number(e)/16)*16,Zd=e=>{for(let t=0;t<bi.length;t++){let r=bi[t];if(e<=r)return r}return Math.ceil(e/16)*16},Xd=1,Qs=()=>Xd++,Pa=async(e,t,r,n)=>{let i=vi(r),s=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,s,0,i),e.flush(),await s.mapAsync(GPUMapMode.READ);let o=s.getMappedRange();if(n){let l=n();return l.set(new Uint8Array(o,0,r)),l}else return new Uint8Array(o.slice(0,r))}finally{s.destroy()}},Qd=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Xs)bi.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,n=t.byteOffset,i=t.byteLength,s=vi(i),a=this.storageCache.get(e);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${i}`);if(s===i&&n%4===0)this.backend.device.queue.writeBuffer(a.gpuData.buffer,0,r,n,i);else{let o=new Uint8Array(s);o.set(t),this.backend.device.queue.writeBuffer(a.gpuData.buffer,0,o,0,s)}ce("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let n=this.storageCache.get(t);if(!n)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==n.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=vi(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,n.gpuData.buffer,0,i)}registerExternalBuffer(e,t,r){let n;if(r){if(n=r[0],e===r[1])return ce("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, buffer is the same, skip.`),n;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else n=Qs();return this.storageCache.set(n,{gpuData:{id:n,type:0,buffer:e},originalSize:t}),ce("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, registered.`),n}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ce("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Zd(e),n,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let o=(i?this.freeBuffers:this.freeUniformBuffers).get(r);o?o.length>0?n=o.pop():n=this.backend.device.createBuffer({size:r,usage:t}):n=this.backend.device.createBuffer({size:r,usage:t})}else n=this.backend.device.createBuffer({size:r,usage:t});let a={id:Qs(),type:0,buffer:n};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(e)}),ce("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ce("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Pa(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Xs.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ce("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Hh=(...e)=>new Qd(...e)}),Jd,$e,Ie=L(()=>{"use strict";Jd=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},$e=e=>new Jd(e)}),qr,xi,Pe,Me,ee,Se,Ba,Lr,Xt,J,Dn,P,Q,jh,co,ep,Kh,se=L(()=>{"use strict";ne(),ie(),qr=64,xi=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Pe=(e,t=1)=>{let r=xi(e,t);return typeof r=="string"?r:r[0]},Me=(e,t=1)=>{let r=xi(e,t);return typeof r=="string"?r:r[1]},ee=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:D.computeStrides(r)})}),t},Se=e=>e%4===0?4:e%2===0?2:1,Ba=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Lr=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Xt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,J=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Dn=(e,t,r,n,i)=>{let s=typeof r=="number",a=s?r:r.length,o=[...new Array(a).keys()],l=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,d=xi(t,i),c=typeof d=="string"?d:d[1],f=typeof d=="string"?d:d[0],g={indices:l,value:c,storage:f,tensor:t},$=W=>typeof W=="string"?W:`${W}u`,w={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},k=s?"uniforms.":"",T=`${k}${e}_shape`,b=`${k}${e}_strides`,_="";for(let W=0;W<a-1;W++)_+=`
    let dim${W} = current / ${J(b,W,a)};
    let rest${W} = current % ${J(b,W,a)};
    indices[${W}] = dim${W};
    current = rest${W};
    `;_+=`indices[${a-1}] = current;`;let E=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${_}
    return indices;
  }`,S=W=>(w.offsetToIndices=!0,a<2?W:`o2i_${e}(${W})`),C=[];if(a>=2)for(let W=a-1;W>=0;W--)C.push(`${J(b,W,a)} * (indices[${W}])`);let z=a<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${C.join("+")};
  }`,x=W=>(w.indicesToOffset=!0,a<2?W:`i2o_${e}(${W})`),y=(...W)=>a===0?"0u":`${g.indices}(${W.map($).join(",")})`,A=(W,B)=>a<2?`${W}`:`${J(W,B,a)}`,N=(W,B,K)=>a<2?`${W}=${K};`:`${J(W,B,a)}=${K};`,U={},V=(W,B)=>{w.broadcastedIndicesToOffset=!0;let K=`${B.name}broadcastedIndicesTo${e}Offset`;if(K in U)return`${K}(${W})`;let j=[];for(let ve=a-1;ve>=0;ve--){let it=B.indicesGet("outputIndices",ve+B.rank-a);j.push(`${A(b,ve)} * (${it} % ${A(T,ve)})`)}return U[K]=`fn ${K}(outputIndices: ${B.type.indices}) -> u32 {
             return ${j.length>0?j.join("+"):"0u"};
           }`,`${K}(${W})`},H=(W,B)=>(()=>{if(g.storage===g.value)return`${e}[${W}]=${B};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${W}]=vec2<u32>(u32(${B}), select(0u, 0xFFFFFFFFu, ${B} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${W}]=vec2<u32>(u32(${B}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${W}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${B}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),Y=W=>(()=>{if(g.storage===g.value)return`${e}[${W}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${W}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${W}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${W}] & 0xFFu), bool(${e}[${W}] & 0xFF00u), bool(${e}[${W}] & 0xFF0000u), bool(${e}[${W}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),O=a<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${c} {
    return ${Y(`i2o_${e}(indices)`)};
  }`,G=a<2?"":(()=>{let W=o.map(K=>`d${K}: u32`).join(", "),B=o.map(K=>`d${K}`).join(", ");return`
  fn get_${e}(${W}) -> ${c} {
    return get_${e}ByIndices(${y(B)});
  }`})(),q=(...W)=>{if(W.length!==a)throw new Error(`indices length must be ${a}`);let B=W.map($).join(",");return a===0?Y("0u"):a===1?Y(B[0]):(w.get=!0,w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}(${B})`)},oe=W=>a<2?Y(W):(w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}ByIndices(${W})`),te=a<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${c}) {
    ${H(`i2o_${e}(indices)`,"value")}
  }`,re=a<2?"":(()=>{let W=o.map(K=>`d${K}: u32`).join(", "),B=o.map(K=>`d${K}`).join(", ");return`
  fn set_${e}(${W}, value: ${c}) {
    set_${e}ByIndices(${y(B)}, value);
  }`})();return{impl:()=>{let W=[],B=!1;return w.offsetToIndices&&(W.push(E),B=!0),w.indicesToOffset&&(W.push(z),B=!0),w.broadcastedIndicesToOffset&&(Object.values(U).forEach(K=>W.push(K)),B=!0),w.set&&(W.push(re),B=!0),w.setByIndices&&(W.push(te),B=!0),w.get&&(W.push(G),B=!0),w.getByIndices&&(W.push(O),B=!0),!s&&B&&W.unshift(`const ${T} = ${g.indices}(${r.join(",")});`,`const ${b} = ${g.indices}(${D.computeStrides(r).join(",")});`),W.join(`
`)},type:g,offsetToIndices:S,indicesToOffset:x,broadcastedIndicesToOffset:V,indices:y,indicesGet:A,indicesSet:N,set:(...W)=>{if(W.length!==a+1)throw new Error(`indices length must be ${a}`);let B=W[a];if(typeof B!="string")throw new Error("value must be string");let K=W.slice(0,a).map($).join(",");return a===0?H("0u",B):a===1?H(K[0],B):(w.set=!0,w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}(${K}, ${B})`)},setByOffset:H,setByIndices:(W,B)=>a<2?H(W,B):(w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}ByIndices(${W}, ${B});`),get:q,getByOffset:Y,getByIndices:oe,usage:n,name:e,strides:b,shape:T,rank:a}},P=(e,t,r,n=1)=>Dn(e,t,r,"input",n),Q=(e,t,r,n=1)=>Dn(e,t,r,"output",n),jh=(e,t,r)=>Dn(e,t,r,"atomicOutput",1),co=(e,t,r,n=1)=>Dn(e,t,r,"internal",n),ep=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=qr){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],n=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||n>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*n>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*n}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${n})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",n=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${n}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:n}of this.uniforms)if(n&&n>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(n/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(n/4)}>`);else{let i=n==null||n===1?r:`vec${n}<${r}>`;e.push(`${t}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Kh=(e,t)=>new ep(e,t)}),tp,Js,rp,np,ip,sp,Ze,Yh,Zh,Qt=L(()=>{"use strict";ne(),ie(),Ie(),se(),tp=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Js=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),rp=(e,t)=>D.sortBasedOnPerm(e,Js(e.length,t)),np=(e,t,r,n)=>{let i=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let s=0;s<t;++s)i+=`a[${e[s]}]=i[${s}];`;return i+="return a;}"},ip=(e,t)=>{let r=[],n=[];for(let i=0;i<e.length;++i)e[i]!==1&&r.push(e[i]),e[t[i]]!==1&&n.push(t[i]);return{newShape:r,newPerm:n}},sp=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(t[e[n]]!==1){if(e[n]<r)return!1;r=e[n]}return!0},Ze=(e,t)=>{let r=e.dataType,n=e.dims.length,i=Js(n,t),s=rp(e.dims,i),a=e.dims,o=s,l=n<2||sp(i,e.dims),d;if(l)return d=w=>{let k=P("input",r,a,4),T=Q("output",r,o,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(k,T)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=D.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:d};let{newShape:c,newPerm:f}=ip(e.dims,i),g=D.areEqual(f,[2,3,1]),$=D.areEqual(f,[3,1,2]);if(c.length===2||g||$){a=g?[c[0],c[1]*c[2]]:$?[c[0]*c[1],c[2]]:c,o=[a[1],a[0]];let w=16;return d=k=>{let T=P("a",r,a.length),b=Q("output",r,o.length);return`
  ${k.registerUniform("output_size","u32").declareVariables(T,b)}
  var<workgroup> tile : array<array<${b.type.value}, ${w+1}>, ${w}>;
  ${k.mainStart([w,w,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${w} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${w}u + local_id.x;
    let input_row = workgroup_id_x * ${w}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${T.getByIndices(`${T.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${w}u + local_id.x;
    let output_row = workgroup_id_y * ${w}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${b.setByIndices(`${b.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let k=D.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/w),y:Math.ceil(o[0]/w)},programUniforms:[{type:12,data:k},...ee(a,o)]}},getShaderSource:d}}return d=w=>{let k=P("a",r,a.length),T=Q("output",r,o.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(k,T)}

  ${np(i,n,k,T)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",k.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=D.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...ee(a,o)]}},getShaderSource:d}},Yh=(e,t)=>{tp(e.inputs,t.perm),e.compute(Ze(e.inputs[0],t.perm))},Zh=e=>$e({perm:e.perm})}),ap,op,up,lp,dp,pp,cp,fp,hp,mp,ot,Xh,Qh,Jh,em,tm,rm,nm,im,sm,am,R_=L(()=>{"use strict";ne(),ie(),se(),fo(),Qt(),ap={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},op={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},up={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},lp={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},dp=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},pp=(e,t)=>{let r=[],n=e.length;for(let s=0;s<n;s++)t.indexOf(s)===-1&&r.push(e[s]);let i=t.map(s=>e[s]);return[r,i]},cp=(e,t)=>{let r=e.length+t.length,n=[],i=0;for(let s=0;s<r;s++)t.indexOf(s)===-1?n.push(e[i++]):n.push(1);return n},fp=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},hp=(e,t)=>{let r=[];if(!fp(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},mp=(e,t,r,n,i,s,a)=>{let o=r[0].dims,l=D.size(s),d=D.size(a),c=P("_A",r[0].dataType,o),f=Q("output",i,s),g=64;l===1&&(g=256);let $=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,w=k=>`
        ${k.registerUniform("reduceSize","u32").declareVariables(c,f)}
        ${$}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${k.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${up[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${ap[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${op[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${n==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${lp[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}},ot=(e,t,r,n)=>{let i=e.inputs.length===1?r:Ua(e.inputs,r),s=i.axes;s.length===0&&!i.noopWithEmptyAxes&&(s=e.inputs[0].dims.map(($,w)=>w));let a=D.normalizeAxes(s,e.inputs[0].dims.length),o=a,l=e.inputs[0],d=hp(o,e.inputs[0].dims.length);d.length>0&&(l=e.compute(Ze(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],o=dp(o.length,l.dims.length));let[c,f]=pp(l.dims,o),g=c;i.keepDims&&(g=cp(c,a)),e.compute(mp(t,i.cacheKey,[l],n,e.inputs[0].dataType,g,f),{inputs:[l]})},Xh=(e,t)=>{ot(e,"ReduceMeanShared",t,"mean")},Qh=(e,t)=>{ot(e,"ReduceL1Shared",t,"l1")},Jh=(e,t)=>{ot(e,"ReduceL2Shared",t,"l2")},em=(e,t)=>{ot(e,"ReduceLogSumExpShared",t,"logSumExp")},tm=(e,t)=>{ot(e,"ReduceMaxShared",t,"max")},rm=(e,t)=>{ot(e,"ReduceMinShared",t,"min")},nm=(e,t)=>{ot(e,"ReduceProdShared",t,"prod")},im=(e,t)=>{ot(e,"ReduceSumShared",t,"sum")},sm=(e,t)=>{ot(e,"ReduceSumSquareShared",t,"sumSquare")},am=(e,t)=>{ot(e,"ReduceLogSumShared",t,"logSum")}}),ut,gp,Bi,Ua,lt,yp,wp,$p,_p,bp,vp,xp,kp,Tp,Ep,dt,om,um,lm,dm,pm,cm,fm,hm,mm,gm,fo=L(()=>{"use strict";ne(),ie(),Ie(),se(),R_(),ut=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},gp=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Bi=(e,t,r,n,i,s,a=!1,o=!1)=>{let l=[],d=r[0].dims,c=d.length,f=D.normalizeAxes(i,c),g=!o&&f.length===0;d.forEach((k,T)=>{g||f.indexOf(T)>=0?a&&l.push(1):l.push(k)});let $=l.length,w=D.size(l);return{name:e,shaderCache:t,getShaderSource:k=>{let T=[],b=P("_A",r[0].dataType,c),_=Q("output",s,$),E=n(b,_,f),S=E[2];for(let C=0,z=0;C<c;C++)g||f.indexOf(C)>=0?(a&&z++,S=`for(var j${C}: u32 = 0; j${C} < ${d[C]}; j${C}++) {
                  ${E[2].includes("last_index")?`let last_index = j${C};`:""}
                  ${b.indicesSet("input_indices",C,`j${C}`)}
                  ${S}
                }`):(T.push(`${b.indicesSet("input_indices",C,_.indicesGet("output_indices",z))};`),z++);return`

        ${k.registerUniform("output_size","u32").declareVariables(b,_)}

        ${k.mainStart()}
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${b.type.indices};
          let output_indices = ${_.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${E[0]}       // init ops for reduce max/min
          ${E[1]}
          ${S}
          ${E[3]}
          ${E.length===4?_.setByOffset("global_idx","value"):E.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:s}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...ee(d,l)]})}},Ua=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),$e({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},lt=(e,t,r,n)=>{let i=e.inputs,s=i.length===1?r:Ua(i,r);e.compute(Bi(t,{hint:s.cacheKey,inputDependencies:["rank"]},[i[0]],s.noopWithEmptyAxes&&s.axes.length===0?gp:n,s.axes,i[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},yp=(e,t)=>{ut(e.inputs),lt(e,"ReduceLogSum",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},wp=(e,t)=>{ut(e.inputs),lt(e,"ReduceL1",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},$p=(e,t)=>{ut(e.inputs),lt(e,"ReduceL2",t,(r,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},_p=(e,t)=>{ut(e.inputs),lt(e,"ReduceLogSumExp",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},bp=(e,t)=>{ut(e.inputs),lt(e,"ReduceMax",t,(r,n,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(r.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},vp=(e,t)=>{ut(e.inputs),lt(e,"ReduceMean",t,(r,n,i)=>{let s=1;for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=e.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${n.type.value}(sum / ${s});`]})},xp=(e,t)=>{ut(e.inputs),lt(e,"ReduceMin",t,(r,n,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},kp=(e,t)=>{ut(e.inputs),lt(e,"ReduceProd",t,(r,n)=>[`var value = ${n.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},Tp=(e,t)=>{ut(e.inputs),lt(e,"ReduceSum",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},Ep=(e,t)=>{ut(e.inputs),lt(e,"ReduceSumSquare",t,(r,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},dt=(e,t,r)=>{if(t.length===0)return r;let n=1,i=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?n*=e[s]:i*=e[s];return i<32&&n>1024},om=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vp(e,t):Xh(e,t)},um=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wp(e,t):Qh(e,t)},lm=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$p(e,t):Jh(e,t)},dm=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_p(e,t):em(e,t)},pm=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bp(e,t):tm(e,t)},cm=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xp(e,t):rm(e,t)},fm=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?kp(e,t):nm(e,t)},hm=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Tp(e,t):im(e,t)},mm=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ep(e,t):sm(e,t)},gm=(e,t)=>{dt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yp(e,t):am(e,t)}}),ea,ym,wm,Wa,D_=L(()=>{"use strict";ne(),Ie(),fo(),ea=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},ym=(e,t)=>{ea(e.inputs);let r=(n,i,s)=>{let a=[];for(let o=0;o<n.rank;o++)(s.indexOf(o)>=0||s.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(Bi("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},wm=(e,t)=>{ea(e.inputs);let r=(n,i,s)=>{let a=[];for(let o=0;o<n.rank;o++)(s.indexOf(o)>=0||s.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(Bi("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Wa=e=>$e(e)}),Sp,ki,Ip,Cp,Ap,Kn,zp,$m,ho=L(()=>{"use strict";ne(),ie(),po(),se(),Sp=(e,t)=>{let r=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5];if(a&&o)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],d=r.dims[1],c=r.dims[2];if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=i.dims[0]/3,g=f,$=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let E of t.qkvHiddenSizes)if(E%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],$=t.qkvHiddenSizes[2]}let w=d;if(f!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==f+g+$)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let k=0;if(a){if(g!==$)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(k=a.dims[3])}let T=w+k,b=-1,_=0;if(s)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==l||o.dims[1]!==t.numHeads||o.dims[2]!==d||o.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:k,kvSequenceLength:w,totalSequenceLength:T,maxSequenceLength:b,inputHiddenSize:c,hiddenSize:f,vHiddenSize:$,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor($/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},ki=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Ip=(e,t,r,n,i,s,a,o)=>{let l=Se(a?1:s),d=64,c=s/l;c<d&&(d=32);let f=Math.ceil(s/l/d),g=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:i},{type:12,data:c},{type:12,data:f}],$=Pe(e.dataType,l),w=Me(1,l),k=["type"];a&&k.push("type"),o&&k.push("type");let T=b=>{let _=Q("x",e.dataType,e.dims,l),E=[_],S=a?P("seq_lens",a.dataType,a.dims):void 0;S&&E.push(S);let C=o?P("total_sequence_length_input",o.dataType,o.dims):void 0;C&&E.push(C);let z=Me(e.dataType),x=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${b.registerUniforms(x).declareVariables(...E)}
  ${b.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${ki(S,C,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${w}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${w}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${w}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${w}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${_.type.value}(${z}(1.0) / ${z}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${w}(x[offset + i]);
        x[offset + i] = ${_.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${_.type.value}(${z}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${$};${l}`,inputDependencies:k},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*r},programUniforms:g})}},Cp=(e,t,r,n,i,s,a,o,l)=>{let d=a+s.kvSequenceLength,c=[s.batchSize,s.numHeads,s.sequenceLength,d],f=e>1&&n,g=s.kvNumHeads?s.kvNumHeads:s.numHeads,$=f?[s.batchSize,g,d,s.headSize]:void 0,w=s.nReps?s.nReps:1,k=s.scale===0?1/Math.sqrt(s.headSize):s.scale,T=Se(s.headSize),b=s.headSize/T,_=12,E={x:Math.ceil(d/_),y:Math.ceil(s.sequenceLength/_),z:s.batchSize*s.numHeads},S=[{type:12,data:s.sequenceLength},{type:12,data:b},{type:12,data:d},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:k},{type:12,data:a},{type:12,data:s.kvSequenceLength},{type:12,data:w}],C=f&&n&&D.size(n.dims)>0,z=["type","type"];C&&z.push("type"),i&&z.push("type"),o&&z.push("type"),l&&z.push("type");let x=[{dims:c,dataType:t.dataType,gpuDataType:0}];f&&x.push({dims:$,dataType:t.dataType,gpuDataType:0});let y=A=>{let N=P("q",t.dataType,t.dims,T),U=P("key",r.dataType,r.dims,T),V=[N,U];if(C){let te=P("past_key",n.dataType,n.dims,T);V.push(te)}i&&V.push(P("attention_bias",i.dataType,i.dims));let H=o?P("seq_lens",o.dataType,o.dims):void 0;H&&V.push(H);let Y=l?P("total_sequence_length_input",l.dataType,l.dims):void 0;Y&&V.push(Y);let O=Q("output",t.dataType,c),G=[O];f&&G.push(Q("present_key",t.dataType,$,T));let q=Me(1,T),oe=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;

  var<workgroup> tileQ: array<${N.type.storage}, ${_*_}>;
  var<workgroup> tileK: array<${N.type.storage}, ${_*_}>;
  ${A.registerUniforms(oe).declareVariables(...V,...G)}
  ${A.mainStart([_,_,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${w===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${w===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${ki(H,Y,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${C&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${q}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${C&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${q}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${O.type.value} (sum * uniforms.alpha) + ${i?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${i!==void 0};${n!==void 0};${e}`,inputDependencies:z},getRunData:()=>({outputs:x,dispatchGroup:E,programUniforms:S}),getShaderSource:y}},Ap=(e,t,r,n,i,s,a=void 0,o=void 0)=>{let l=s+i.kvSequenceLength,d=i.nReps?i.nReps:1,c=i.vHiddenSize*d,f=e>1&&n,g=i.kvNumHeads?i.kvNumHeads:i.numHeads,$=f?[i.batchSize,g,l,i.headSize]:void 0,w=[i.batchSize,i.sequenceLength,c],k=12,T={x:Math.ceil(i.vHeadSize/k),y:Math.ceil(i.sequenceLength/k),z:i.batchSize*i.numHeads},b=[{type:12,data:i.sequenceLength},{type:12,data:l},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:c},{type:12,data:s},{type:12,data:i.kvSequenceLength},{type:12,data:d}],_=f&&n&&D.size(n.dims)>0,E=["type","type"];_&&E.push("type"),a&&E.push("type"),o&&E.push("type");let S=[{dims:w,dataType:t.dataType,gpuDataType:0}];f&&S.push({dims:$,dataType:t.dataType,gpuDataType:0});let C=z=>{let x=P("probs",t.dataType,t.dims),y=P("v",r.dataType,r.dims),A=[x,y];_&&A.push(P("past_value",n.dataType,n.dims));let N=a?P("seq_lens",a.dataType,a.dims):void 0;a&&A.push(N);let U=o?P("total_sequence_length_input",o.dataType,o.dims):void 0;o&&A.push(U);let V=[Q("output",t.dataType,w)];f&&V.push(Q("present_value",t.dataType,$));let H=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${k}u;
  var<workgroup> tileQ: array<${x.type.value}, ${k*k}>;
  var<workgroup> tileV: array<${x.type.value}, ${k*k}>;
  ${z.registerUniforms(H).declareVariables(...A,...V)}
  ${z.mainStart([k,k,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${ki(N,U,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${_&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${x.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${_&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:E},getRunData:()=>({outputs:S,dispatchGroup:T,programUniforms:b}),getShaderSource:C}},Kn=(e,t,r,n,i,s,a,o,l,d,c=void 0,f=void 0)=>{let g=Math.min(e.outputCount,1+(a?1:0)+(o?1:0)),$=g>1?a:void 0,w=g>1?o:void 0,k=g>1?d.pastSequenceLength:0,T=k+d.kvSequenceLength,b=l&&D.size(l.dims)>0?l:void 0,_=[t,r];$&&D.size($.dims)>0&&_.push($),b&&_.push(b),c&&_.push(c),f&&_.push(f);let E=e.compute(Cp(g,t,r,$,b,d,k,c,f),{inputs:_,outputs:g>1?[-1,1]:[-1]})[0];e.compute(Ip(E,d.batchSize,d.numHeads,k,d.sequenceLength,T,c,f),{inputs:c&&f?[E,c,f]:[E],outputs:[]});let S=[E,n];w&&D.size(w.dims)>0&&S.push(w),c&&S.push(c),f&&S.push(f),e.compute(Ap(g,E,n,w,d,k,c,f),{inputs:S,outputs:g>1?[0,2]:[0]})},zp=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,i=t.inputHiddenSize,s=t.headSize,a=12,o={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:n},{type:12,data:i},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=f=>{let g=Q("output_q",l[0].dataType,r),$=Q("output_k",l[0].dataType,r),w=Q("output_v",l[0].dataType,r),k=P("input",l[0].dataType,l[0].dims),T=P("weight",l[1].dataType,l[1].dims),b=P("bias",l[2].dataType,l[2].dims),_=k.type.storage,E=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${_}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${_}, ${a*a}>;
  var<workgroup> tileWeightK: array<${_}, ${a*a}>;
  var<workgroup> tileWeightV: array<${_}, ${a*a}>;
  ${f.registerUniforms(E).declareVariables(k,T,b,g,$,w)}
  ${f.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${_}(0);
    var valueK = ${_}(0);
    var valueV = ${_}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:d}),getShaderSource:c},{inputs:l,outputs:[-1,-1,-1]})},$m=(e,t)=>{let r=Sp(e.inputs,t),[n,i,s]=zp(e,r);return Kn(e,n,i,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Op,Rp,Dp,_m,N_=L(()=>{"use strict";Xe(),ne(),ie(),Ie(),se(),Op=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,i,s)=>{let a=i.length;if(a!==n.length)throw new Error(`${s}: num dimensions != ${a}`);i.forEach((o,l)=>{if(o!==n[l])throw new Error(`${s}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Rp=(e,t)=>{let{epsilon:r,spatial:n,format:i}=t,s=e[0].dims,a=n?Se(s[s.length-1]):1,o=i==="NHWC"&&s.length>1?a:1,l=D.size(s)/a,d=n,c=d?s.length:s,f=P("x",e[0].dataType,e[0].dims,a),g=P("scale",e[1].dataType,e[1].dims,o),$=P("bias",e[2].dataType,e[2].dims,o),w=P("inputMean",e[3].dataType,e[3].dims,o),k=P("inputVar",e[4].dataType,e[4].dims,o),T=Q("y",e[0].dataType,c,a),b=()=>{let E="";if(n)E=`let cOffset = ${s.length===1?"0u":i==="NHWC"?`outputIndices[${s.length-1}] / ${a}`:"outputIndices[1]"};`;else if(i==="NCHW")E=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{E=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let S=1;S<g.rank;S++)E+=`cIndices[${S}] = outputIndices[${S}];`;E+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return E},_=E=>`
  const epsilon = ${r};
  ${E.registerUniform("outputSize","u32").declareVariables(f,g,$,w,k,T)}
  ${E.mainStart()}
  ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${a}`)};
    ${b()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${$.getByOffset("cOffset")};
    let inputMean = ${w.getByOffset("cOffset")};
    let inputVar = ${k.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d?[{type:12,data:l},...ee(s)]:[{type:12,data:l}]})}},Dp=e=>$e(e),_m=(e,t)=>{let{inputs:r,outputCount:n}=e,i=Dp({...t,outputCount:n});if(_e.webgpu.validateInputContent&&Op(r,i),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Rp(r,i))}}),Np,Mp,bm,M_=L(()=>{"use strict";ie(),se(),Np=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Mp=e=>{let t=e[0].dims,r=e[0].dims[2],n=D.size(t)/4,i=e[0].dataType,s=P("input",i,t,4),a=P("bias",i,[r],4),o=P("residual",i,t,4),l=Q("output",i,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(s,a,o,l)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${s.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},bm=e=>{Np(e.inputs),e.compute(Mp(e.inputs))}}),Pp,he,vm,xm,km,Tm,Em,Sm,Im,Cm,Am,Bp,zm,Om,Rm,Dm,Gn,Nm,Ri,Mm,Pm,Bm,Um,Wm,Lm,Vm,qm,Gm,Fm,Hm,jm,Km,Ym,Zm,Xm,Qm,ta,Jm,La,Va,eg,tg,rg,Up,Wp,ng,mo=L(()=>{"use strict";ne(),ie(),Ie(),se(),Pp=(e,t,r,n,i,s,a)=>{let o=Math.ceil(t/4),l="";typeof i=="string"?l=`${i}(a)`:l=i("a");let d=P("inputData",r,[o],4),c=Q("outputData",n,[o],4),f=[{name:"vec_size",type:"u32"}];return a&&f.push(...a),`
      ${e.registerUniforms(f).declareVariables(d,c)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",l)}
  }`},he=(e,t,r,n,i,s=e.dataType,a,o)=>{let l=[{type:12,data:Math.ceil(D.size(e.dims)/4)}];return a&&l.push(...a),{name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:d=>Pp(d,D.size(e.dims),e.dataType,s,r,n,o),getRunData:d=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(D.size(d[0].dims)/64/4)},programUniforms:l})}},vm=e=>{e.compute(he(e.inputs[0],"Abs","abs"))},xm=e=>{e.compute(he(e.inputs[0],"Acos","acos"))},km=e=>{e.compute(he(e.inputs[0],"Acosh","acosh"))},Tm=e=>{e.compute(he(e.inputs[0],"Asin","asin"))},Em=e=>{e.compute(he(e.inputs[0],"Asinh","asinh"))},Sm=e=>{e.compute(he(e.inputs[0],"Atan","atan"))},Im=e=>{e.compute(he(e.inputs[0],"Atanh","atanh"))},Cm=e=>$e(e),Am=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(he(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Bp=e=>{let t,r,n=e.length>=2&&e[1].data!==0,i=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=i?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return $e({min:t,max:r})},zm=(e,t)=>{let r=t||Bp(e.inputs),n=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Clip",i=>`clamp(${i}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},Om=e=>{e.compute(he(e.inputs[0],"Ceil","ceil"))},Rm=e=>{e.compute(he(e.inputs[0],"Cos","cos"))},Dm=e=>{e.compute(he(e.inputs[0],"Cosh","cosh"))},Gn=e=>$e(e),Nm=(e,t)=>{let r=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Ri=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Mm=e=>{let t=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Ri(t)))},Pm=e=>{e.compute(he(e.inputs[0],"Exp","exp"))},Bm=e=>{e.compute(he(e.inputs[0],"Floor","floor"))},Um=e=>{let t=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Ri(t)))},Wm=(e,t)=>{let r=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Lm=e=>{e.compute(he(e.inputs[0],"Not",t=>`!${t}`))},Vm=e=>{e.compute(he(e.inputs[0],"Neg",t=>`-${t}`))},qm=e=>{e.compute(he(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Gm=e=>{let t=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Fm=e=>{e.compute(he(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Hm=e=>$e(e),jm=(e,t)=>{let r=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Km=e=>{let t=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"HardSwish",r=>`${r} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${r} + vec4<${t}>(0.5)))`))},Ym=e=>{e.compute(he(e.inputs[0],"Sin","sin"))},Zm=e=>{e.compute(he(e.inputs[0],"Sinh","sinh"))},Xm=e=>{e.compute(he(e.inputs[0],"Sqrt","sqrt"))},Qm=e=>{e.compute(he(e.inputs[0],"Tan","tan"))},ta=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Jm=e=>{e.compute(he(e.inputs[0],"Tanh",ta))},La=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${ta("v")};
}
`,Va=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,eg=e=>{let t=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"FastGelu",Va,La(t),void 0,e.inputs[0].dataType))},tg=(e,t)=>{let r=Me(e.inputs[0].dataType);return e.compute(he(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},rg=e=>{e.compute(he(e.inputs[0],"Log","log"))},Up=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Wp=e=>`quick_gelu_impl(${e})`,ng=(e,t)=>{let r=Me(e.inputs[0].dataType);e.compute(he(e.inputs[0],"QuickGelu",Wp,Up(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Lp,Vp,ig,P_=L(()=>{"use strict";ie(),se(),mo(),Lp=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Vp=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=P("input",e[0].dataType,e[0].dims,4),n=P("bias",e[0].dataType,[e[0].dims[2]],4),i=Q("output",e[0].dataType,t,4),s=D.size(t)/4,a=Pe(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(r,n,i)}

  ${Ri(a)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},ig=e=>{Lp(e.inputs),e.compute(Vp(e.inputs))}}),qp,Gp,pt,sg,ag,og,ug,lg,dg,pg,cg,fg,hg,B_=L(()=>{"use strict";ne(),ie(),se(),qp=(e,t,r,n,i,s,a,o,l,d,c,f)=>{let g,$;typeof o=="string"?g=$=(_,E)=>`${o}((${_}),(${E}))`:typeof o=="function"?g=$=o:(g=o.scalar,$=o.vector);let w=Q("outputData",c,n.length,4),k=P("aData",l,t.length,4),T=P("bData",d,r.length,4),b;if(i)if(s){let _=D.size(t)===1,E=D.size(r)===1,S=t.length>0&&t[t.length-1]%4===0,C=r.length>0&&r[r.length-1]%4===0;_||E?b=w.setByOffset("global_idx",$(_?`${k.type.value}(${k.getByOffset("0")}.x)`:k.getByOffset("global_idx"),E?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):b=`
            let outputIndices = ${w.offsetToIndices("global_idx * 4u")};
            let offsetA = ${k.broadcastedIndicesToOffset("outputIndices",w)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",w)};
            ${w.setByOffset("global_idx",$(a||S?k.getByOffset("offsetA / 4u"):`${k.type.value}(${k.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||C?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else b=w.setByOffset("global_idx",$(k.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let _=(E,S,C="")=>{let z=`aData[indexA${S}][componentA${S}]`,x=`bData[indexB${S}][componentB${S}]`;return`
            let outputIndices${S} = ${w.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offsetA${S} = ${k.broadcastedIndicesToOffset(`outputIndices${S}`,w)};
            let offsetB${S} = ${T.broadcastedIndicesToOffset(`outputIndices${S}`,w)};
            let indexA${S} = offsetA${S} / 4u;
            let indexB${S} = offsetB${S} / 4u;
            let componentA${S} = offsetA${S} % 4u;
            let componentB${S} = offsetB${S} % 4u;
            ${E}[${S}] = ${C}(${g(z,x)});
          `};c===9?b=`
            var data = vec4<u32>(0);
            ${_("data",0,"u32")}
            ${_("data",1,"u32")}
            ${_("data",2,"u32")}
            ${_("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:b=`
            ${_("outputData[global_idx]",0)}
            ${_("outputData[global_idx]",1)}
            ${_("outputData[global_idx]",2)}
            ${_("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(k,T,w)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${b}
      }`},Gp=(e,t,r,n,i,s,a=r.dataType)=>{let o=r.dims.map(Number),l=n.dims.map(Number),d=!D.areEqual(o,l),c=o,f=D.size(o),g=!1,$=!1,w=[d];if(d){let k=Vr.calcShape(o,l,!1);if(!k)throw new Error("Can't perform binary op on the given tensors");c=k.slice(),f=D.size(c);let T=D.size(o)===1,b=D.size(l)===1,_=o.length>0&&o[o.length-1]%4===0,E=l.length>0&&l[l.length-1]%4===0;w.push(T),w.push(b),w.push(_),w.push(E);let S=1;for(let C=1;C<c.length;C++){let z=o[o.length-C],x=l[l.length-C];if(z===x)S*=z;else break}S%4===0?($=!0,g=!0):(T||b||_||E)&&(g=!0)}else g=!0;return w.push(g),{name:e,shaderCache:{hint:t+w.map(k=>k.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:k=>qp(k,o,l,c,g,d,$,i,r.dataType,n.dataType,a,s),getRunData:()=>({outputs:[{dims:c,dataType:a}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(D.size(c)/4)},...ee(o,l,c)]})}},pt=(e,t,r,n,i,s)=>{e.compute(Gp(t,i??"",e.inputs[0],e.inputs[1],r,n,s))},sg=e=>{pt(e,"Add",(t,r)=>`${t}+${r}`)},ag=e=>{pt(e,"Div",(t,r)=>`${t}/${r}`)},og=e=>{pt(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},ug=e=>{pt(e,"Mul",(t,r)=>`${t}*${r}`)},lg=e=>{let t=P("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;pt(e,"Pow",{scalar:(r,n)=>`pow_custom(${r},${n})`,vector:(r,n)=>`pow_vector_custom(${r},${n})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},dg=e=>{pt(e,"Sub",(t,r)=>`${t}-${r}`)},pg=e=>{pt(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},cg=e=>{pt(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},fg=e=>{pt(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},hg=e=>{pt(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Fp,Hp,mg,gg,U_=L(()=>{"use strict";ne(),ie(),Ie(),se(),Fp=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],i=n.dataType,s=n.dims.length;e.forEach((a,o)=>{if(o!==r){if(a.dataType!==i)throw new Error("input tensors should be one type");if(a.dims.length!==s)throw new Error("input tensors should have the same shape");a.dims.forEach((l,d)=>{if(d!==t&&l!==n.dims[d])throw new Error("non concat dimensions must match")})}})},Hp=(e,t,r,n,i=0)=>{let s=e.reduce((b,_)=>b+D.size(_.dims),0),a=new Array(e.length),o=new Array(e.length),l=new Array(e.length),d=0,c=i,f=[],g=[],$=[{type:12,data:s}];for(let b=0;b<e.length;++b)a[b]=d,o[b]=c,d+=D.size(e[b].dims),c+=e[b].dims[t],g.push(e[b].dims.length),l[b]=P(`input${b}`,n,g[b]),f.push("rank"),$.push({type:12,data:a[b]}),$.push({type:12,data:o[b]});for(let b=0;b<e.length;++b)$.push(...ee(e[b].dims));$.push(...ee(r));let w=Q("output",n,r.length),k=l.map((b,_)=>{let E=`
        let inputOffset = ${`global_idx - uniforms.inputOffset${_}`};
        var outputIndices = ${b.offsetToIndices("inputOffset")};
        ${w.indicesGet("outputIndices",t)} += uniforms.outputAxisOffset${_};
        ${w.setByIndices("outputIndices",b.getByOffset("inputOffset"))}`;return e.length===1?E:_===0?`if (inputIndex == 0u) {${E}}`:_===e.length-1?`else {${E}}`:`else if (inputIndex == ${_}u) {${E}}`}).join(`
`),T=b=>`

  ${(()=>{b.registerUniform("outputSize","u32");for(let _=0;_<e.length;_++)b.registerUniform(`inputOffset${_}`,"u32"),b.registerUniform(`outputAxisOffset${_}`,"u32");return b.declareVariables(...l,w)})()}

  fn calculateInputIndex(global_idx: u32) -> u32 {
    ${l.slice(1).map((_,E)=>`if (global_idx < uniforms.inputOffset${E+1}) {
      return ${E}u;
    }`).join(`
`)}
    return ${e.length-1}u;
  }

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    let inputIndex = calculateInputIndex(global_idx);
    ${k}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:$}),getShaderSource:T}},mg=(e,t)=>{let r=e.inputs,n=r[0].dims,i=D.normalizeAxis(t.axis,n.length);Fp(r,i);let s=n.slice();s[i]=r.reduce((d,c)=>d+(c.dims.length>i?c.dims[i]:0),0);let a=r.filter(d=>D.size(d.dims)>0);if(a.length===0){e.output(0,s);return}let o=e.deviceLimits.maxStorageBuffersPerShaderStage-1,l=0;for(let d=0;d<a.length;d+=o){let c=a.slice(d,d+o);e.compute(Hp(c,i,s,r[0].dataType,l),{inputs:c,outputs:[0]}),l+=c.reduce((f,g)=>f+g.dims[i],0)}},gg=e=>$e({axis:e.axis})}),vr,xr,kr,go,Er=L(()=>{"use strict";ne(),ie(),vr=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},xr=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},kr=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},go=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Lh,Vh];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),We,yg,yo=L(()=>{"use strict";We=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},yg=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),wg,W_=L(()=>{"use strict";wg=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Hn,wo,$o=L(()=>{"use strict";ne(),ie(),se(),Er(),Hn=(e,t,r,n,i)=>{let s=n-r;return`
      ${Array.from({length:r}).map((a,o)=>`
      if (${J(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,J(i,o+s,n))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},wo=(e,t,r,n,i=!1,s)=>{let a=e[0].dims,o=e[1].dims,l=a[a.length-2],d=o[o.length-1],c=a[a.length-1],f=Se(d),g=Se(c),$=Se(l),w=D.size(r)/f/$,k=e.length>2,T=n?n.slice(0,-2):r.slice(0,-2),b=[D.size(T),l,d],_=[{type:12,data:w},{type:12,data:l},{type:12,data:d},{type:12,data:c}];xr(t,_),_.push(...ee(T,a,o)),k&&_.push(...ee(e[2].dims)),_.push(...ee(b));let E=S=>{let C=co("batch_dims",e[0].dataType,T.length),z=P("a",e[0].dataType,a.length,g),x=P("b",e[1].dataType,o.length,f),y=Q("output",e[0].dataType,b.length,f),A=Pe(y.type.tensor),N=vr(t,y.type.value,A),U=[z,x],V="";if(k){let O=i?f:1;U.push(P("bias",e[2].dataType,e[2].dims.length,O)),V=`${i?`value += bias[col / ${O}];`:`value += ${y.type.value}(bias[row + i]);`}`}let H=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];kr(t,H);let Y=()=>{let O=`var a_data: ${z.type.value};`;for(let G=0;G<g;G++)O+=`
              let b_data${G} = b[(b_offset + (k + ${G}) * uniforms.N + col) / ${f}];`;for(let G=0;G<$;G++){O+=`a_data = a[(a_offset + (row + ${G}) * uniforms.K + k) / ${g}];`;for(let q=0;q<g;q++)O+=`
            values[${G}] = fma(${x.type.value}(a_data${g===1?"":`[${q}]`}), b_data${q}, values[${G}]);
`}return O};return`
  ${S.registerUniforms(H).registerInternalVariables(C).declareVariables(...U,y)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${$};
    let row = (index1 % stride1) * ${$};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${C.offsetToIndices("batch")};`}

    var a_indices: ${z.type.indices};
    ${Hn("a_indices",z,z.rank-2,C.rank,"batch_indices")}
    ${z.indicesSet("a_indices",z.rank-2,0)}
    ${z.indicesSet("a_indices",z.rank-1,0)}
    let a_offset = ${z.indicesToOffset("a_indices")};

    var b_indices: ${x.type.indices};
    ${Hn("b_indices",x,x.rank-2,C.rank,"batch_indices")}
    ${x.indicesSet("b_indices",x.rank-2,0)}
    ${x.indicesSet("b_indices",x.rank-1,0)}
    let b_offset = ${x.indicesToOffset("b_indices")};
    var values: array<${y.type.value}, ${$}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${Y()}
    }
    for (var i = 0u; i < ${$}u; i++) {
      var value = values[i];
      ${V}
      ${N}
      let cur_indices = ${y.type.indices}(batch, row + i, col);
      let offset = ${y.indicesToOffset("cur_indices")};
      ${y.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${g};${$};${i}`,inputDependencies:k?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:_}),getShaderSource:E}}}),jp,Kp,qa,ra,Yp,Ga,Zp,Ui,_o=L(()=>{"use strict";ne(),ie(),se(),Er(),$o(),yo(),jp=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Kp=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,qa=(e,t,r="f32",n,i=!1,s=32,a=!1,o=32)=>{let l=t[1]*e[1],d=t[0]*e[0],c=i?l:s,f=i?s:l,g=c/t[0],$=s/t[1];if(!((i&&g===4&&e[1]===4||!i&&(g===3||g===4))&&c%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${i} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${c/g}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${a?"0":"i32(globalId.z)"};
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${a?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${$};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${jp(i,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${$}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${n?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Kp(i,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},ra=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Yp=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Ga=(e,t,r="f32",n,i=!1,s=32,a=!1,o=32,l=!1)=>{let d=e[1]*t[1],c=e[0]*t[0],f=i?d:s,g=i?s:d;if(!(g%t[1]===0&&f%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let $=g/t[1],w=f/t[0],k=s/t[1],T=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${ra(i,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${n?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${i?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${$};
let tileColA = i32(localId.x) * ${w};
let tileRowB = i32(localId.y) * ${k};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${$}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${w}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${ra(i,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${k}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${n?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Yp(i)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${T}
  }
`},Zp=(e,t,r,n,i=!1)=>{let[s,a,o,l]=n,d=Pe(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${We(e,d)} {
      var value = ${We(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Hn("aIndices",a,a.rank-2,s.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${We(e,d)} {
      var value = ${We(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${Hn("bIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${We(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${We(e,d)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Ui=(e,t,r,n,i=!1,s)=>{let a=e[0].dims,o=e[1].dims,l=a.slice(0,-2),d=o.slice(0,-2),c=n?n.slice(0,-2):r.slice(0,-2),f=D.size(c),g=a[a.length-2],$=a[a.length-1],w=o[o.length-1],k=$%4===0&&w%4===0,T=g<=8?[4,1,1]:[4,4,1],b=[8,8,1],_=[Math.ceil(w/b[0]/T[0]),Math.ceil(g/b[1]/T[1]),Math.ceil(f/b[2]/T[2])],E=k?4:1,S=[...l,g,$/E],C=S.length,z=[...d,$,w/E],x=z.length,y=[f,g,w/E],A=[{type:6,data:g},{type:6,data:w},{type:6,data:$}];xr(t,A),A.push(...ee(c,S,z));let N=["rank","rank"],U=e.length>2;U&&(A.push(...ee(e[2].dims)),N.push("rank")),A.push(...ee(y));let V=H=>{let Y=c.length,O=co("batchDims",e[0].dataType,Y,1),G=Pe(e[0].dataType),q=P("a",e[0].dataType,C,E),oe=P("b",e[1].dataType,x,E),te=Q("result",e[0].dataType,y.length,E),re=[q,oe];if(U){let ve=i?E:1;re.push(P("bias",e[2].dataType,e[2].dims.length,ve))}let W=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];kr(t,W);let B=Pe(te.type.tensor),K=vr(t,te.type.value,B),j=Zp(E,U,K,[O,q,oe,te],i);return`
  ${H.registerUniforms(W).registerInternalVariables(O).declareVariables(...re,te)}
  ${j}
  ${k?qa(T,b,G,O):Ga(T,b,G,O)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${t.activation};${k};${i}`,inputDependencies:N},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:A}),getShaderSource:V}}}),Xp,$g,L_=L(()=>{"use strict";ne(),Dt(),se(),Er(),yo(),W_(),_o(),Xp=(e,t,r,n,i=!1,s,a=4,o=4,l=4,d="f32")=>{let c=A=>{switch(A){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${A} is not supported.`)}},f=A=>{switch(A){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${A} is not supported.`)}},g=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,$=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,w=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",k=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=e?"row":"col",b=e?"col":"row",_=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${b} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${b} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${b} % inChannels;
    var resData = ${We(a,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${w} && xCol >= 0 && xCol < ${k}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(a)}
    }
    return resData;`,E=e?t&&n?`
    let col = colIn * ${a};
    ${_}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${_}
    }
    return ${We(a,d)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${_}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${We(a,d)}(0.0);`,S=e?n&&r?f(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(o)}
    }
    return ${We(o,d)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(o)}
    }
    return ${We(o,d)}(0.0);`,C=We(l,d),z=We(e?a:o,d),x=We(e?o:a,d),y=vr(s,C,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?E:S}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${x} {
      ${e?S:E}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${C}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${$}
      ${yg(i)}
      ${y}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},$g=(e,t,r,n,i,s,a,o,l)=>{let d=t.format==="NHWC",c=d?e[0].dims[3]:e[0].dims[1],f=r[0],g=d?r[2]:r[3],$=d?r[1]:r[2],w=d?r[3]:r[1],k=d&&(c%4===0||c%3===0)&&w%4===0,T=d?w:g*$,b=d?g*$:w,_=[8,8,1],E=n<=8?[4,1,1]:[4,4,1],S=[Math.ceil(T/_[0]/E[0]),Math.ceil(b/_[1]/E[1]),Math.ceil(f/_[2]/E[2])];ce("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${S}`);let C=k?d&&c%4!==0?3:4:1,z=_[1]*E[1],x=_[0]*E[0],y=Math.max(_[0]*C,_[1]),A=n%z===0,N=i%x===0,U=s%y===0,V=k?[C,4,4]:[1,1,1],H=[{type:6,data:n},{type:6,data:i},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];xr(t,H),H.push(...ee(e[0].dims,e[1].dims));let Y=["rank","rank"];a&&(H.push(...ee(e[2].dims)),Y.push("rank")),H.push(...ee(r));let O=G=>{let q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];kr(t,q);let oe=k?4:1,te=Pe(e[0].dataType),re=`
      fn setOutputAtIndex(flatIndex : i32, value : ${k?`vec4<${te}>`:te}) {
        result[flatIndex] = ${k?`vec4<${te}>`:te}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${k?`vec4<${te}>`:te}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${k?"/ 4":""}, value);
      }`,W=P("x",e[0].dataType,e[0].dims.length,C===3?1:C),B=P("w",e[1].dataType,e[1].dims.length,oe),K=[W,B],j=Q("result",e[0].dataType,r.length,oe);if(a){let ve=P("bias",e[2].dataType,e[2].dims.length,oe);K.push(ve),re+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${k?`vec4<${te}>`:te} {
          return bias[coords.${d?"w":"y"}${k?"/ 4":""}];
        }`}return`
        ${wg("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${G.registerUniforms(q).declareVariables(...K,j)}
        ${re}
        ${Xp(d,A,N,U,a,t,V[0],V[1],V[2],te)}
        ${k?qa(E,_,te,void 0,!d,y):Ga(E,_,te,void 0,!d,y,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${C};${k};${A};${N};${U};${z};${x};${y}`,inputDependencies:Y},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:H}),getShaderSource:O}}}),Qp,na,Nn,Jp,ia,ec,_g,bg,V_=L(()=>{"use strict";ne(),Dt(),ie(),se(),Er(),yo(),Qp=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},na=e=>typeof e=="number"?[e,e,e]:e,Nn=(e,t)=>t<=1?e:e+(e-1)*(t-1),Jp=(e,t,r,n=1)=>{let i=Nn(t,n);return Math.floor((e[0]*(r-1)-r+i)/2)},ia=(e,t,r,n,i)=>{i==null&&(i=Jp(e,t[0],n[0]));let s=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*i>=t[a]&&(s[a]=Math.trunc((e[a]-t[a]+2*i)/n[a]+1));return s},ec=(e,t,r,n,i,s,a,o,l,d)=>{let c,f,g,$;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let w=ia([t,r,n,1],[o,l,d],1,[i,s,a],e);f=w[0],g=w[1],$=w[2]}else if(Array.isArray(e)){if(!e.every((k,T,b)=>k===b[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let w=ia([t,r,n,1],[o,l,d],1,[i,s,a],e[0]);f=w[0],g=w[1],$=w[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/i),g=Math.ceil(r/s),$=Math.ceil(n/a);let w=(f-1)*i+o-t,k=(g-1)*s+l-r,T=($-1)*a+d-n,b=Math.floor(w/2),_=w-b,E=Math.floor(k/2),S=k-E,C=Math.floor(T/2),z=T-C;c={top:E,bottom:S,left:C,right:z,front:b,back:_}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:f,outHeight:g,outWidth:$}},_g=(e,t,r,n,i,s=!1,a="channelsLast")=>{let o,l,d,c,f;if(a==="channelsLast")[o,l,d,c,f]=e;else if(a==="channelsFirst")[o,f,l,d,c]=e;else throw new Error(`Unknown dataFormat ${a}`);let[g,,$,w,k]=t,[T,b,_]=na(r),[E,S,C]=na(n),z=Nn($,E),x=Nn(w,S),y=Nn(k,C),{padInfo:A,outDepth:N,outHeight:U,outWidth:V}=ec(i,l,d,c,T,b,_,z,x,y),H=s?g*f:g,Y=[0,0,0,0,0];return a==="channelsFirst"?Y=[o,H,N,U,V]:a==="channelsLast"&&(Y=[o,N,U,V,H]),{batchSize:o,dataFormat:a,inDepth:l,inHeight:d,inWidth:c,inChannels:f,outDepth:N,outHeight:U,outWidth:V,outChannels:H,padInfo:A,strideDepth:T,strideHeight:b,strideWidth:_,filterDepth:$,filterHeight:w,filterWidth:k,effectiveFilterDepth:z,effectiveFilterHeight:x,effectiveFilterWidth:y,dilationDepth:E,dilationHeight:S,dilationWidth:C,inShape:e,outShape:Y,filterShape:t}},bg=(e,t,r,n,i,s)=>{let a=s==="channelsLast",o=a?e[0].dims[3]:e[0].dims[1],l=!1,d=[64,1,1],c={x:r.map((_,E)=>E)},f=[Math.ceil(Qp(c.x.map(_=>r[_]))/d[0]),1,1];ce("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let g=l?a&&o%4!==0?3:4:1,$=D.size(r),w=[{type:12,data:$},{type:12,data:n},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];xr(t,w),w.push(...ee(e[0].dims,e[1].dims));let k=["rank","rank"],T=e.length===3;T&&(w.push(...ee(e[2].dims)),k.push("rank")),w.push(...ee(r));let b=_=>{let E=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];kr(t,E);let S=l?4:1,C=Pe(e[0].dataType),z=P("x",e[0].dataType,e[0].dims.length,g===3?1:g),x=P("W",e[1].dataType,e[1].dims.length,S),y=[z,x],A=Q("result",e[0].dataType,r.length,S),N="";if(T){let H=P("bias",e[2].dataType,e[2].dims.length,S);y.push(H),N+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${C}>`:C} {
          return bias[${a?J("coords",4,5):J("coords",1,5)}${l?"/ 4":""}];
        }`}let U=We(g,C),V=vr(t,U,C);return`
            ${N}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${C} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${z.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${C} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${x.getByIndices("aIndices")};
            }
          ${_.registerUniforms(E).declareVariables(...y,A)}
          ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${A.offsetToIndices("global_idx")};
              let batch = ${J("coords",0,z.rank)};
              let d2 = ${a?J("coords",z.rank-1,z.rank):J("coords",1,z.rank)};
              let xFRCCorner = vec3<u32>(${a?J("coords",1,z.rank):J("coords",2,z.rank)},
              ${a?J("coords",2,z.rank):J("coords",3,z.rank)},
              ${a?J("coords",3,z.rank):J("coords",4,z.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?J("uniforms.x_shape",1,z.rank):J("uniforms.x_shape",2,z.rank)};
              let xShapeZ = ${a?J("uniforms.x_shape",2,z.rank):J("uniforms.x_shape",3,z.rank)};
              let xShapeW = ${a?J("uniforms.x_shape",3,z.rank):J("uniforms.x_shape",4,z.rank)};
              let xShapeU = ${a?J("uniforms.x_shape",4,z.rank):J("uniforms.x_shape",1,z.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = ${C}(0);
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${a?`let xValues = vec4<${C}>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<${C}>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<${C}>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<${C}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<${C}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<${C}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${a?`let xValues = vec3<${C}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<${C}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<${C}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${T?"value = value + getBiasByOutputCoords(coords)":""};
              ${V}
              result[global_idx] = ${C}(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${g};${T}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:w}),getShaderSource:b}}}),vg,xg,q_=L(()=>{"use strict";ne(),ie(),se(),Er(),vg=(e,t,r,n)=>{let i=e.length>2,s=i?"value += b[output_channel];":"",a=e[0].dims,o=e[1].dims,l=t.format==="NHWC",d=l?r[3]:r[1],c=d/t.group,f=l&&c>=4?Se(d):1,g=D.size(r)/f,$=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];xr(t,$),$.push(...ee(a,[o[0],o[1],o[2],o[3]/f]));let w=i?["rank","rank","rank"]:["rank","rank"];$.push(...ee([r[0],r[1],r[2],r[3]/f]));let k=T=>{let b=Q("output",e[0].dataType,r.length,f),_=Pe(b.type.tensor),E=vr(t,b.type.value,_),S=P("x",e[0].dataType,a.length),C=P("w",e[1].dataType,o.length,f),z=[S,C];i&&z.push(P("b",e[2].dataType,e[2].dims,f));let x=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];kr(t,x);let y=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${S.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${C.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${S.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${C.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(x).declareVariables(...z,b)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${b.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${b.type.value} = ${b.type.value}(0);
    ${y}
    ${s}
    ${E}
    ${b.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:$}),getShaderSource:k}},xg=(e,t,r,n)=>{let i=e.length>2,s=Se(r[3]),a=Se(r[2]),o=D.size(r)/s/a,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],c=[r[0],r[1],r[2],r[3]/s],f=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];xr(t,f),f.push(...ee(l,d,c));let g=(a-1)*t.strides[1]+d[1],$=w=>{let k=Q("output",e[0].dataType,c.length,s),T=Pe(k.type.tensor),b=vr(t,k.type.value,T),_=P("x",e[0].dataType,l.length,s),E=P("w",e[1].dataType,d.length,s),S=[_,E];i&&S.push(P("b",e[2].dataType,e[2].dims,s));let C=i?"value += b[output_channel];":"",z=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return kr(t,z),`
  ${w.registerUniforms(z).declareVariables(...S,k)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${_.type.value}, ${g}>;
    var values: array<${k.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${_.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${_.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${E.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${C}
      ${b}
      ${k.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${a};${g};${d[0]};${d[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:$}}}),tc,Ti,rc,Ei,Fa,sa,nc,ic,Ha,G_=L(()=>{"use strict";ie(),L_(),V_(),_o(),q_(),Er(),$o(),Qt(),tc=(e,t,r,n,i,s)=>{let a=e[0],o=e.slice(s?1:2,s?3:4),l=o.length,d=t[0],c=t.slice(2).map((g,$)=>g+(g-1)*(r[$]-1)),f=o.map((g,$)=>g+n[$]+n[$+l]).map((g,$)=>Math.floor((g-c[$]+i[$])/i[$]));return f.splice(0,0,a),f.splice(s?3:1,0,d),f},Ti=[2,3,1,0],rc=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Ei=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let s=2;s<t[1].dims.length;++s)r[s-2]===0&&(r[s-2]=t[1].dims[s]);let n=e.pads.slice();Pi.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:r,pads:n}),i},Fa=e=>{let t=go(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],i=e.dilations,s=e.group,a=e.kernel_shape,o=e.pads,l=e.strides,d=e.w_is_const();return{autoPad:n,format:r,dilations:i,group:s,kernelShape:a,pads:o,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},sa=(e,t,r,n)=>{let i=r.format==="NHWC",s=tc(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,i);if(r.group!==1){let z=[t[0]];if(i){let x=e.kernelCustomData.wT??e.compute(Ze(t[1],Ti),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=x),z.push(x)}else z.push(t[1]);t.length===3&&z.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&i&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(xg(z,r,s,n),{inputs:z}):e.compute(vg(z,r,s,n),{inputs:z});return}let a=t.length===3,o=t[0].dims[i?1:2],l=t[0].dims[i?2:3],d=t[0].dims[i?3:1],c=t[1].dims[2],f=t[1].dims[3],g=s[i?1:2],$=s[i?2:3],w=s[i?3:1],k=i&&c===o&&f===l&&r.pads[0]===0&&r.pads[1]===0;if(k||c===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let z=s[0],x,y,A,N=[];if(i){let H=e.kernelCustomData.wT??e.compute(Ze(t[1],Ti),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=H),k){let Y=o*l*d;x=t[0].reshape([1,z,Y]),y=H.reshape([1,Y,w]),A=[1,z,w]}else x=t[0].reshape([z,o*l,d]),y=H.reshape([1,d,w]),A=[z,g*$,w];N.push(x),N.push(y)}else x=t[0].reshape([z,d,o*l]),y=t[1].reshape([1,w,d]),A=[z,w,g*$],N.push(y),N.push(x);a&&N.push(t[2]);let U=A[2],V=N[0].dims[N[0].dims.length-1];U<8&&V<8?e.compute(wo(N,r,s,A,i,n),{inputs:N}):e.compute(Ui(N,r,s,A,i,n),{inputs:N});return}let T=!0,b=e.kernelCustomData.wT??e.compute(Ze(t[1],Ti),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=b);let _=[t[0],b];a&&_.push(t[2]);let E=i?g*$:w,S=i?w:g*$,C=c*f*d;e.compute($g(_,r,s,E,S,C,a,T,n),{inputs:_})},nc=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),a=[1].concat(t.dilations),o=[1].concat(t.kernelShape),l=Ei({...t,pads:i,strides:s,dilations:a,kernelShape:o},n);sa(e,n,l,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},ic=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",i=Ei(r,t),s=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=_g(t[0].dims,t[1].dims,r.strides,r.dilations,s,!1,n);e.compute(bg(t,i,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],n))},Ha=(e,t)=>{if(rc(e.inputs,t),e.inputs[0].dims.length===3)nc(e,t);else if(e.inputs[0].dims.length===5)ic(e,e.inputs,t);else{let r=Ei(t,e.inputs);sa(e,e.inputs,r)}}}),kg,F_=L(()=>{"use strict";ne(),Dt(),ie(),se(),kg=(e,t,r)=>{let n=e.length>2,i=t.outputShape,s=t.format==="NHWC",a=t.group,o=e[1].dims,l=o[2]/a,d=o[3],c=s?Se(l):1,f=s&&d===1&&l>=4,g=f?Math.floor(l/4)*4:Math.floor(l/c)*c,$=l-g,w=s?Se(d):1,k=s?d===1?c:w:1,T=D.size(i)/w,b=[Math.ceil(T/64),1,1];ce("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${b}`);let _=["rank","rank"],E=[t.strides[0],t.strides[1]],S=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],C=[t.dilations[0],t.dilations[1]],z=[S[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),S[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],x=[z[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),z[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],y=[{type:12,data:T},{type:12,data:E},{type:12,data:S},{type:12,data:C},{type:12,data:z},{type:6,data:x},{type:12,data:g},{type:12,data:l},{type:12,data:d},...ee(e[0].dims,e[1].dims)];n&&(y.push(...ee(e[2].dims)),_.push("rank")),y.push(...ee(i));let A=N=>{let U=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:E.length},{name:"filter_dims",type:"u32",length:S.length},{name:"dilations",type:"u32",length:S.length},{name:"effective_filter_dims",type:"u32",length:z.length},{name:"pads",type:"i32",length:x.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],V=Pe(e[0].dataType),H=s?1:2,Y=s?2:3,O=s?3:1,G=P("W",e[1].dataType,e[1].dims.length,k),q=P("Dy",e[0].dataType,e[0].dims.length,c),oe=[q,G];n&&oe.push(P("bias",e[2].dataType,[i[O]].length,w));let te=Q("result",e[0].dataType,i.length,w),re=()=>{let K="";if(f)c===4?K+=`
        let xValue = ${q.getByOffset("x_offset")};
        let wValue = ${G.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?K+=`
          dotProd = dotProd + dot(vec4<${V}>(${q.getByOffset("x_offset")}, ${q.getByOffset("x_offset + 1u")}), vec4<${V}>(${G.getByOffset("w_offset")}, ${G.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(K+=`
          dotProd = dotProd + dot(vec4<${V}>(${q.getByOffset("x_offset")}, ${q.getByOffset("x_offset + 1u")}, ${q.getByOffset("x_offset + 2u")}, ${q.getByOffset("x_offset + 3u")}), vec4<${V}>(${G.getByOffset("w_offset")}, ${G.getByOffset("w_offset + 1u")}, ${G.getByOffset("w_offset + 2u")}, ${G.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(K+=`
                  let xValue = ${s?q.getByOffset(`${q.indicesToOffset(`${q.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):q.get("batch","inputChannel","idyR","idyC")};
        `,c===1)K+=`
          let w_offset = ${G.indicesToOffset(`${G.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${G.getByOffset(`w_offset / ${k}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let j=0;j<c;j++)K+=`
            let wValue${j} = ${G.getByOffset(`${G.indicesToOffset(`${G.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${j}, wOutChannel)`)} / ${k}`)};
            dotProd = dotProd + xValue[${j}] * wValue${j};`;return K},W=()=>{if($===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let K="";if(c===1){K+="dotProd = dotProd";for(let j=0;j<$;j++)K+=`
            + ${q.getByOffset(`x_offset + ${j}`)} * ${G.getByOffset(`w_offset + ${j}`)}`;K+=";"}else if(c===2){if($!==2)throw new Error(`Invalid inputChannelsRemainder ${$}.`);K+=`
          let xValue = ${q.getByOffset("x_offset")};
          let wValue = ${G.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return K},B=`
            let outputIndices = ${te.offsetToIndices(`global_idx * ${w}`)};
            let batch = ${te.indicesGet("outputIndices",0)};
            let d1 = ${te.indicesGet("outputIndices",O)};
            let r = ${te.indicesGet("outputIndices",H)};
            let c = ${te.indicesGet("outputIndices",Y)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${te.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${V}(dyRCorner) + ${V}(wR)) / ${V}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${V}(uniforms.Dy_shape[${H}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${V}(dyCCorner) + ${V}(wC)) / ${V}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${V}(uniforms.Dy_shape[${Y}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${q.indicesToOffset(`${q.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${G.indicesToOffset(`${G.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${k};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:c}) {
                  ${re()}
                  inputChannel = inputChannel + ${f?4:c};
                }
                ${W()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${n?` + bias[d1 / ${w}]`:""};
            ${te.setByOffset("global_idx","value")};
          `;return`
    ${N.registerUniforms(U).declareVariables(...oe,te)}
      ${N.mainStart()}
      ${N.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${B}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${k}${w}${f}${$}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:b[0],y:b[1],z:b[2]},outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],programUniforms:y}),getShaderSource:A}}}),sc,ac,oc,aa,Tg,uc,oa,lc,Eg,H_=L(()=>{"use strict";F_(),Er(),Qt(),sc=(e,t,r,n,i,s)=>(e-1)*t+r+(n-1)*i+1-s,ac=(e,t,r,n,i)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=s,r[i]=e-s):t==="SAME_LOWER"&&(r[n]=e-s,r[i]=s)},oc=(e,t,r,n,i,s,a,o,l,d)=>{let c=e.length-2,f=d.length===0;l.length<c&&l.push(...Array(c-l.length).fill(0));let g=e[0],$=t[o?3:1]*i;for(let w=0,k=e.length-c-(o?1:0);w<c;++w,++k){let T=e[k],b=f?T*a[w]:d[w],_=sc(T,a[w],s[w],t[k],r[w],b);ac(_,n,s,w,w+c),f&&d.push(a[w]*(T-1)+l[w]+(t[k]-1)*r[w]+1-s[w]-s[w+c])}d.splice(0,0,g),d.splice(o?3:1,0,$)},aa=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,g)=>f*g,1)===0){r.length=0;for(let f=2;f<t[1].dims.length;++f)r.push(t[1].dims[f])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let i=e.pads.slice(),s=e.outputShape.slice(),a=e.outputPadding.slice(),o=t[0].dims,l=e.dilations.slice();if(l.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;l=new Array(f).fill(1)}let d=e.strides.slice();if(d.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;d=new Array(f).fill(1)}oc(o,r,l,e.autoPad,e.group,i,d,n,a,s);let c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:i,outputPadding:a,outputShape:s,dilations:l,strides:d}),c},Tg=e=>{let t=go(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],i=e.dilations,s=e.group??1,a=e.kernelShape,o=e.pads,l=e.strides,d=e.wIsConst(),c=e.outputPadding,f=e.outputShape;return{autoPad:n,format:r,dilations:i,group:s,kernelShape:a,outputPadding:c,outputShape:f,pads:o,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},uc=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==i))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((a,o)=>a+o,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((a,o)=>a+o,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((a,o)=>a+o,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((a,o)=>a+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},oa=(e,t,r,n)=>{let i=e.kernelCustomData.wT??e.compute(Ze(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let s=[t[0],i];t.length===3&&s.push(t[2]),e.compute(kg(s,r,n),{inputs:s})},lc=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],a=[1].concat(a),s=[1].concat(s),i=[1].concat(i);let l=t.outputPadding;l=[0].concat(l);let d=aa({...t,pads:o,strides:a,dilations:s,kernelShape:i,outputPadding:l},n);oa(e,n,d,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Eg=(e,t)=>{if(uc(e.inputs,t),e.inputs[0].dims.length===3)lc(e,t);else{let r=aa(t,e.inputs);oa(e,e.inputs,r)}}}),dc,Sg,Ig,j_=L(()=>{"use strict";ne(),ie(),Ie(),se(),dc=(e,t,r,n)=>{let i=D.size(t),s=t.length,a=P("input",e,s),o=Q("output",e,s),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=D.normalizeAxis(l,s),c=f=>{let g=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,$=J("uniforms.input_shape","uniforms.axis",s),w=n.reverse?g+(n.exclusive?" + 1":""):"0",k=n.reverse?$:g+(n.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,o)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${w};
                  let last : i32 = ${k};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:d},...ee(t,t)]}),getShaderSource:c}},Sg=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,i=e.inputs[1];e.compute(dc(n,r,i,t),{inputs:[0]})},Ig=e=>{let t=e.exclusive===1,r=e.reverse===1;return $e({exclusive:t,reverse:r})}}),pc,cc,fc,Cg,Ag,K_=L(()=>{"use strict";ne(),ie(),Ie(),se(),pc=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},cc=(e,t,r,n)=>{let i=[];i.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let s=0;s<t;++s)i.push(r.indicesSet("a",e[s],`i[${s}]`));return i.push("return a;}"),i.join(`
`)},fc=(e,t)=>{let r,n,i,s,a,o,l=t.format==="NHWC",d=t.blocksize,c=t.mode==="DCR";l?([r,n,i,s]=e.dims,a=c?[r,n,i,d,d,s/d**2]:[r,n,i,s/d**2,d,d],o=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,i,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=c?[r,d,d,s/d**2,n,i]:[r,s/d**2,d,d,n,i],o=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(a),g=f.dims.length,$=e.dataType,w=P("a",$,g),k=Q("output",$,g),T=b=>`
  ${b.registerUniform("output_size","u32").declareVariables(w,k)}

  ${cc(o,g,w,k)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${k.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${k.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:b=>{let _=l?[r,n*d,i*d,s/d**2]:[r,s/d**2,n*d,i*d],E=D.size(_),S=f.dims,C=D.sortBasedOnPerm(S,o);return{outputs:[{dims:_,dataType:b[0].dataType}],dispatchGroup:{x:Math.ceil(E/64)},programUniforms:[{type:12,data:E},...ee(S,C)]}},getShaderSource:T}},Cg=(e,t)=>{pc(e.inputs),e.compute(fc(e.inputs[0],t))},Ag=e=>$e({blocksize:e.blocksize,mode:e.mode,format:e.format})}),zt,Mn,Si,ua,Kt,hc,mc,gc,la,da,pa,yc,wc,ca,$c,zg,Og,Y_=L(()=>{"use strict";ne(),ie(),Ie(),se(),zt=256,Mn=512,Si=2*Math.PI,ua=e=>{let t=[],r=e;for(let n of[4,2,3,5])for(;r%n===0;)t.push(n),r/=n;return r===1?t:void 0},Kt=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},hc=(e,t,r,n,i)=>{let s=r/e,a=Mn-n,o=d=>`smem[${a}u + base + ${d*t}u]`,l=`  for (var t = local_idx; t < ${s}u; t += ${zt}u) {
`;l+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,l+=`    var leg: array<vec2<f32>, 5>;
`;for(let d=0;d<e;d++){let c=`${n}u + t + ${d*s}u`;if(d===0)l+=`    leg[0] = smem[${c}];
`;else{let f=i*Si*d/(e*t);l+=`    { let a = ${Kt(f)} * angleUnit; leg[${d}] = cmul(smem[${c}], vec2<f32>(cos(a), sin(a))); }
`}}if(l+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)l+=`    ${o(0)} = leg[0] + leg[1];
    ${o(1)} = leg[0] - leg[1];
`;else if(e===4){let d=i<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";l+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,l+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,l+=`    let oddRot = ${d};
`,l+=`    ${o(0)} = evenSum + oddSum;
    ${o(1)} = evenDiff + oddRot;
`,l+=`    ${o(2)} = evenSum - oddSum;
    ${o(3)} = evenDiff - oddRot;
`}else for(let d=0;d<e;d++){let c=["leg[0]"];for(let f=1;f<e;f++){let g=i*Si*(f*d)/e,$=Kt(Math.cos(g)),w=Kt(Math.sin(g));c.push(`vec2<f32>(leg[${f}].x*${$} - leg[${f}].y*${w}, leg[${f}].x*${w} + leg[${f}].y*${$})`)}l+=`    ${o(d)} = ${c.join(" + ")};
`}return`${l}  }
  workgroupBarrier();
`},mc=(e,t,r)=>{let n="",i=1,s=0;for(let a of e)n+=hc(a,i,t,s,r),i*=a,s=Mn-s;return{code:n,resultOffset:s}},gc=(e,t,r,n,i)=>{let s=e.dims,a=s.length,o=s[a-1],l=s[t],d=r&&n?(l-1)*2:l;i!==void 0&&(d=i);let c=r&&n?1:2,f=n&&!r?Math.floor(d/2)+1:d,g=s.slice();g[t]=f,g[a-1]=c;let $=1;for(let k=t+1;k<a-1;k++)$*=s[k];let w=D.size(s)/o/l;return{dataType:e.dataType,outputDims:g,length:d,signalLength:l,inner:$,batch:w,inputComponents:o,outputComponents:c,outputLength:f,inverse:r,onesided:n}},la=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),da=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],pa=(e,t,r)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,r),yc=e=>{let{dataType:t,length:r,inputComponents:n,outputComponents:i,inverse:s,onesided:a}=e,o=Me(t),l=s?1:-1,d=s?1/r:1,c=ua(r),f=g=>{let $=P("x",t,[1]),w=Q("y",t,[1]),k=C=>{let z=`inBase + (${C}) * uniforms.inner * ${n}u`,x=`f32(${$.getByOffset(z)})`,y=n===2?`f32(${$.getByOffset(`${z} + 1u`)})`:"0.0";return`vec2<f32>(${x}, ${y})`},T;if(s&&a){let C=Math.floor(r/2)+1,z=r%2===0?`select(provided, provided - 1u, provided == ${C}u)`:"provided";T=`
    let provided = min(uniforms.signalLength, ${C}u);
    for (var i = local_idx; i < ${r}u; i += ${zt}u) {
      if (i < provided) { smem[i] = ${k("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${z}; k += ${zt}u) {
      let h = smem[k];
      smem[${r}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else T=`
    let loadCount = min(uniforms.signalLength, ${r}u);
    for (var i = local_idx; i < ${r}u; i += ${zt}u) {
      if (i < loadCount) { smem[i] = ${k("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:b,resultOffset:_}=mc(c,r,l),E=d===1?`smem[${_}u + i]`:`smem[${_}u + i] * ${Kt(d)}`,S=i===2?w.setByOffset("off + 1u",`${o}(v.y)`):"";return`
  ${pa(g,$,w)}
  var<workgroup> smem: array<vec2<f32>, ${2*Mn}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${g.mainStart(zt)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${n}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${i}u;
    ${T}
${b}    for (var i = local_idx; i < uniforms.outputLength; i += ${zt}u) {
      let v = ${E};
      let off = outBase + i * uniforms.inner * ${i}u;
      ${w.setByOffset("off",`${o}(v.x)`)}
      ${S}
    }
  }`};return{name:"DFT",shaderCache:{hint:la(e,"fft"),inputDependencies:["type"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:da(e),dispatchGroup:{x:e.batch}})}},wc=e=>{let{dataType:t,length:r,inputComponents:n,outputComponents:i,inverse:s,onesided:a}=e,o=Me(t),l=s?1:-1,d=s?1/r:1,c=f=>{let g=P("x",t,[1]),$=Q("y",t,[1]),w=E=>{let S=`inBase + (${E}) * uniforms.inner * ${n}u`,C=`f32(${g.getByOffset(S)})`,z=n===2?`f32(${g.getByOffset(`${S} + 1u`)})`:"0.0";return`vec2<f32>(${C}, ${z})`},k=s&&a?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(r/2)+1}u);
    if (k < provided) { return ${w("k")}; }
    let m = ${r}u - k;
    if (m < provided) {
      let h = ${w("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${w("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,T=`
      let angle = ${Kt(l*Si)} * f32(knMod) / ${Kt(r)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${r}u) { knMod -= ${r}u; }`,b=i===2?$.setByOffset("off + 1u",`${o}(v.y)`):"",_=d===1?"acc":`acc * ${Kt(d)}`;return`
  ${pa(f,g,$)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${k}
  ${f.mainStart(zt)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${n}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${i}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${zt}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${r}u; n++) {${T}
      }
      let v = ${_};
      let off = outBase + k * uniforms.inner * ${i}u;
      ${$.setByOffset("off",`${o}(v.x)`)}
      ${b}
    }
  }`};return{name:"DFT",shaderCache:{hint:la(e,"direct"),inputDependencies:["type"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:da(e),dispatchGroup:{x:e.batch}})}},ca=e=>{if(!e||e.dataType===0)return;if(D.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},$c=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let r=t[t.length-1];if(r!==1&&r!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},zg=(e,t)=>{$c(e.inputs);let r=e.inputs[0],n=r.dims.length,i=t.inverse!==0,s=t.onesided!==0,a=ca(e.inputs[1]);if(a!==void 0&&a<=0)throw new Error("dft_length must be greater than zero.");let o=D.normalizeAxis(ca(e.inputs[2])??t.axis,n);if(o===n-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(i&&s&&r.dims[n-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let l=gc(r,o,i,s,a);if(l.length<=0)throw new Error(`Invalid DFT length: ${l.length}`);let d=l.length<=Mn&&ua(l.length)!==void 0?yc(l):wc(l);e.compute(d,{inputs:[0]})},Og=e=>$e({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),Ii,Pn,fa,_c,bc,vc,xc,ha,kc,Rg,Dg,Z_=L(()=>{"use strict";ne(),ie(),Ie(),se(),Ii="[a-zA-Z]|\\.\\.\\.",Pn="("+Ii+")+",fa="^"+Pn+"$",_c="("+Pn+",)*"+Pn,bc="^"+_c+"$",vc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},xc=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,n]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(bc)))throw new Error("Invalid LHS term");if(r.split(",").forEach((i,s)=>{let a=e[s].dims.slice();if(!i.match(RegExp(fa)))throw new Error("Invalid LHS term");let o=this.processTerm(i,!0,a,s);this.lhs.push(o)}),n==="")n+=[...this.symbolToInfo.entries()].filter(([i,s])=>s.count===1||i==="...").map(([i])=>i).join("");else if(!n.match(RegExp(Pn)))throw new Error("Invalid RHS");n.match(RegExp(Ii,"g"))?.forEach(i=>{if(i==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(i);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(n,!1,this.outputDims)}addSymbol(e,t,r){let n=this.symbolToInfo.get(e);if(n!==void 0){if(n.dimValue!==t&&n.count!==1)throw new Error("Dimension mismatch");n.count++,n.inputIndices.push(r)}else n={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,n)}processTerm(e,t,r,n=-1){let i=r.length,s=!1,a=[],o=0;if(!e.match(RegExp(fa))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Ii,"g")),d=new vc(n);return l?.forEach((c,f)=>{if(c==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let g=i-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(a=r.slice(o,o+g),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let $=0;$<a.length;$++){let w=String.fromCharCode(48+$);d.addSymbol(w,f+$),this.addSymbol(w,r[o++],n)}}else d.addSymbol(c,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[o++],n)}),d}},ha=e=>e+"_max",kc=(e,t,r,n)=>{let i=e.map(d=>d.length).map((d,c)=>P(`input${c}`,t,d)),s=D.size(n),a=Q("output",t,n.length),o=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),l=d=>{let c=[],f="var prod = 1.0;",g="var sum = 0.0;",$="sum += prod;",w=[],k=[],T=[],b=[],_=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((S,C)=>{if(r.rhs.symbolToIndices.has(C)){let z=r.rhs.symbolToIndices.get(C)?.[0];z!==void 0&&r.lhs.forEach((x,y)=>{if(S.inputIndices.includes(y)){let A=x.symbolToIndices.get(C);if(A===void 0)throw new Error("Invalid symbol error");A.forEach(N=>{c.push(`${i[y].indicesSet(`input${y}Indices`,N,a.indicesGet("outputIndices",z))}`)})}})}else r.lhs.forEach((z,x)=>{if(S.inputIndices.includes(x)){let y=z.symbolToIndices.get(C);if(y===void 0)throw new Error("Invalid symbol error");y.forEach(A=>{w.push(`${i[x].indicesSet(`input${x}Indices`,A,`${C}`)}`)}),b.push(`prod *= ${i[x].getByIndices(`input${x}Indices`)};`)}}),k.push(`for(var ${C}: u32 = 0; ${C} < uniforms.${ha(C)}; ${C}++) {`),T.push("}")});let E=_?[...c,`let sum = ${i.map((S,C)=>S.getByIndices(`input${C}Indices`)).join(" * ")};`]:[...c,g,...k,...w,f,...b,$,...T];return`
            ${d.registerUniforms(o.map(S=>({name:`${ha(S)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,a)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${i.map((S,C)=>`var input${C}Indices: ${i[C].type.indices};`).join(`
`)}
            ${E.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=o.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));d.push({type:12,data:s});let c=e.map((f,g)=>[...ee(f)]).reduce((f,g)=>f.concat(g),d);return c.push(...ee(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}},getShaderSource:l}},Rg=(e,t)=>{let r=new xc(e.inputs,t.equation),n=r.outputDims,i=e.inputs.map((s,a)=>s.dims);e.compute(kc(i,e.inputs[0].dataType,r,n))},Dg=e=>{let t=e.equation.replace(/\s+/g,"");return $e({equation:t})}}),Tc,ma,Ec,Sc,Ng,X_=L(()=>{"use strict";ne(),ie(),se(),Tc=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,i=t.length<r.length?0:t.length-r.length;for(;n<r.length&&i<t.length;++n,++i)if(r[n]!==t[i]&&r[n]!==1&&t[i]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ma=(e,t)=>{let r=e.length-t.length,n=[];for(let i=0;i<r;++i)n.push(e[i]);for(let i=0;i<t.length;++i)n.push(t[i]===1?e[i+r]:t[i]);return n},Ec=(e,t)=>e.length>t.length?ma(e,t):ma(t,e),Sc=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=Ec(t,r),i=e[0].dataType,s=i===9||D.size(t)===1,a=i===9||t.length>0&&t[t.length-1]%4===0?4:1,o=s||n.length>0&&n[n.length-1]%4===0?4:1,l=Math.ceil(D.size(n)/o),d=f=>{let g=P("input",i,t.length,a),$=Q("output",i,n.length,o),w;if(i===9){let k=(T,b,_="")=>`
          let outputIndices${b} = ${$.offsetToIndices(`outputOffset + ${b}u`)};
          let offset${b} = ${g.broadcastedIndicesToOffset(`outputIndices${b}`,$)};
          let index${b} = offset${b} / 4u;
          let component${b} = offset${b} % 4u;
          ${T}[${b}] = ${_}(${g.getByOffset(`index${b}`)}[component${b}]);
        `;w=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${k("data",0,"u32")}
        ${k("data",1,"u32")}
        ${k("data",2,"u32")}
        ${k("data",3,"u32")}
        ${$.setByOffset("global_idx","data")}
      }`}else w=`
        let outputIndices = ${$.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",$)};
        let data = ${$.type.value}(${g.getByOffset(`inputOffset / ${a}`)});
        ${$.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(g,$)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${w}`},c=[{type:12,data:l},...ee(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${a}${o}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c})}},Ng=e=>{Tc(e.inputs),e.compute(Sc(e.inputs),{inputs:[0]})}}),Ic,Mg,Q_=L(()=>{"use strict";ne(),ie(),se(),mo(),Ic=e=>{let t=e[0].dataType,r=D.size(e[0].dims),n=D.size(e[1].dims),i=n%4===0,s=a=>{let o=P("x",t,[1],4),l=P("bias",t,[1],4),d=Q("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=$=>`
      let bias${$}_offset: u32 = (global_idx * 4 + ${$}) % uniforms.bias_size;
      let bias${$} = ${l.getByOffset(`bias${$}_offset / 4`)}[bias${$}_offset % 4];`,g=i?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(c).declareVariables(o,l,d)}

    ${La(Me(t))}

    ${a.mainStart(qr)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",Va("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/qr/4)}})}},Mg=e=>{e.inputs.length<2||D.size(e.inputs[1].dims)===0?eg(e):e.compute(Ic(e.inputs))}}),Cc,Ac,Pg,Bg,J_=L(()=>{"use strict";ne(),ie(),Ie(),se(),Cc=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Ac=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r.length,s=D.normalizeAxis(t.axis,i),a=r.slice(0);a.splice(s,1,...n);let o=r[s],l=e[0].dataType===9?4:1,d=Math.ceil(D.size(a)/l),c=[{type:12,data:d},{type:6,data:o},{type:12,data:s},...ee(e[0].dims,e[1].dims,a)],f=g=>{let $=P("data",e[0].dataType,e[0].dims.length,l),w=P("inputIndices",e[1].dataType,e[1].dims.length),k=Q("output",e[0].dataType,a.length,l),T=_=>{let E=n.length,S=`var indicesIndices${_}  = ${w.type.indices}(0);`;for(let C=0;C<E;C++)S+=`${E>1?`indicesIndices${_}[${C}]`:`indicesIndices${_}`} = ${a.length>1?`outputIndices${_}[uniforms.axis + ${C}]`:`outputIndices${_}`};`;S+=`
          var idx${_} = ${w.getByIndices(`indicesIndices${_}`)};
          if (idx${_} < 0) {
            idx${_} = idx${_} + uniforms.axisDimLimit;
          }
          var dataIndices${_} : ${$.type.indices};
        `;for(let C=0,z=0;C<i;C++)C===s?(S+=`${i>1?`dataIndices${_}[${C}]`:`dataIndices${_}`} = u32(idx${_});`,z+=E):(S+=`${i>1?`dataIndices${_}[${C}]`:`dataIndices${_}`} = ${a.length>1?`outputIndices${_}[${z}]`:`outputIndices${_}`};`,z++);return S},b;if(e[0].dataType===9){let _=(E,S,C="")=>`
          let outputIndices${S} = ${k.offsetToIndices(`outputOffset + ${S}u`)};
          ${T(S)};
          let offset${S} = ${$.indicesToOffset(`dataIndices${S}`)};
          let index${S} = offset${S} / 4u;
          let component${S} = offset${S} % 4u;
          ${E}[${S}] = ${C}(${$.getByOffset(`index${S}`)}[component${S}]);
        `;b=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${_("value",0,"u32")}
        ${_("value",1,"u32")}
        ${_("value",2,"u32")}
        ${_("value",3,"u32")}
        ${k.setByOffset("global_idx","value")}
      `}else b=`
      let outputIndices = ${k.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${$.getByIndices("dataIndices")};
      ${k.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables($,w,k)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${b}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:f}},Pg=e=>$e({axis:e.axis}),Bg=(e,t)=>{let r=e.inputs;Cc(r),e.compute(Ac(e.inputs,t))}}),zc,Ug,Wg,eb=L(()=>{"use strict";ne(),ie(),se(),zc=(e,t,r,n,i,s,a,o,l)=>{let d=[{type:12,data:s},{type:12,data:n},{type:12,data:i},{type:12,data:r},{type:12,data:a},{type:12,data:o},{type:12,data:l}],c=[s];d.push(...ee(t.dims,c));let f=g=>{let $=P("indices_data",t.dataType,t.dims.length),w=Q("input_slice_offsets_data",12,1,1),k=[$,w],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:i.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(T).declareVariables(...k)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${i.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${i.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},Ug=(e,t)=>{let r=e.inputs,n=r[0].dims,i=r[0].dataType,s=r[1].dims,a=s[s.length-1],o=D.sizeToDimension(s,s.length-1),l=D.sizeFromDimension(n,t.batchDims+a),d=D.sizeToDimension(n,t.batchDims),c=D.sizeFromDimension(n,t.batchDims),f=o/d,g=new Array(a),$=l;for(let S=0;S<a;++S)g[a-1-S]=$,$*=n[t.batchDims+a-1-S];let w=zc(e,r[1],g,t.batchDims,n,o,f,c,a),k=t.batchDims+a;if(k>n.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=s.slice(0,-1).concat(n.slice(k)),b=D.size(T),_=[{type:12,data:b},{type:12,data:l},...ee(r[0].dims,w.dims,T)],E=S=>{let C=P("data",r[0].dataType,r[0].dims.length),z=P("slice_offsets",12,w.dims.length),x=Q("output",r[0].dataType,T.length);return`
          ${S.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(C,z,x)}
            ${S.mainStart()}
            ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:i}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:_}),getShaderSource:E},{inputs:[r[0],w]})},Wg=e=>({batchDims:e.batch_dims,cacheKey:""})}),Oc,Rc,Lg,Vg,tb=L(()=>{"use strict";ne(),ie(),Ie(),se(),Oc=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=D.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,i=e[0],s=e[2],a=e.length===4?e[3]:void 0;if(s.dims.length!==i.dims.length||!i.dims.map((o,l)=>l===r?Math.ceil(o/n)===s.dims[l]:o===s.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==i.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==s.dims.length||!a.dims.map((o,l)=>o===s.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Rc=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r.length,s=D.normalizeAxis(t.gatherAxis,i),a=D.normalizeAxis(t.quantizeAxis,i),o=r.slice(0);o.splice(s,1,...n);let l=D.size(o),d=e[2].dataType,c=e[0].dataType===22,f=[{type:12,data:l},{type:12,data:a},{type:12,data:s},{type:12,data:t.blockSize},...ee(...e.map(($,w)=>$.dims),o)],g=$=>{let w=P("data",e[0].dataType,e[0].dims.length),k=P("inputIndices",e[1].dataType,e[1].dims.length),T=P("scales",e[2].dataType,e[2].dims.length),b=e.length>3?P("zeroPoint",e[3].dataType,e[3].dims.length):void 0,_=Q("output",d,o.length),E=[w,k,T];b&&E.push(b);let S=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${$.registerUniforms(S).declareVariables(...E,_)}
        ${$.mainStart()}
        let output_indices = ${_.offsetToIndices("global_idx")};
        var indices_indices = ${k.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${_.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${k.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${_.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${w.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${_.indicesGet("output_indices","i")};
          ${w.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${k.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[s]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${_.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${w.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${w.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${w.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${T.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${T.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${T.getByIndices("scale_indices")};
        ${b?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${b.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${b.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Me(d)}(quantized_data - zero_point) * scale;
        ${_.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter(($,w)=>w!==1).map($=>$.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},($,w)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:g}},Lg=(e,t)=>{let r=e.inputs;Oc(r,t),e.compute(Rc(e.inputs,t))},Vg=e=>$e({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Dc,Nc,qg,Gg,rb=L(()=>{"use strict";ne(),ie(),Ie(),se(),Dc=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Nc=(e,t)=>{let r=e[0].dims,n=e[0].dataType,i=r.length,s=e[1].dims,a=e[1].dataType,o=D.normalizeAxis(t.axis,i),l=r[o],d=s.slice(0),c=D.size(d),f=P("input",n,i),g=P("indicesInput",a,s.length),$=Q("output",n,d.length),w=[{type:12,data:c},{type:6,data:l},{type:12,data:o}];return w.push(...ee(r,s,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:w}),getShaderSource:k=>`
      ${k.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,g,$)}
      ${k.mainStart()}
      ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${$.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${$.setByOffset("global_idx","value")};
  }`}},qg=e=>$e({axis:e.axis}),Gg=(e,t)=>{let r=e.inputs;Dc(r),e.compute(Nc(e.inputs,t))}}),Mc,Pc,Fg,Hg,nb=L(()=>{"use strict";ne(),ie(),se(),Mc=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Pc=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[i,s,a]=Wh.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),o=[i,s];if(!o)throw new Error("Can't use gemm on the given tensors");let l=16,d=Math.ceil(s/l),c=Math.ceil(i/l),f=!0,g=D.size(o),$=[{type:12,data:f?d:g},{type:12,data:i},{type:12,data:s},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],w=["type","type"];e.length===3&&($.push(...ee(e[2].dims)),w.push("rank")),$.push(...ee(o));let k=b=>{let _="";t.transA&&t.transB?_="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?_="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?_="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(_="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let E=t.alpha===1?"":"value *= uniforms.alpha;",S=P("a",e[0].dataType,e[0].dims),C=P("b",e[1].dataType,e[1].dims),z=S.type.value,x=null,y=[S,C];e.length===3&&(x=P("c",e[2].dataType,e[2].dims.length),y.push(x));let A=Q("output",e[0].dataType,o.length);y.push(A);let N=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${b.registerUniforms(N).declareVariables(...y)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${z}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${_}
    }

    ${E}
    ${x!=null?`let cOffset = ${x.broadcastedIndicesToOffset("vec2(m, n)",A)}; value += ${z}(uniforms.beta) * ${x.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=b=>{let _=P("a",e[0].dataType,e[0].dims),E=P("b",e[1].dataType,e[1].dims),S=null,C=[_,E];e.length===3&&(S=P("c",e[2].dataType,e[2].dims.length),C.push(S));let z=Q("output",e[0].dataType,o.length);C.push(z);let x=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],y="",A="";t.transA&&t.transB?(A=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,y="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(A=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,y="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(A=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,y="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(A=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,y="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let N=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${b.registerUniforms(x).declareVariables(...C)}
  var<workgroup> tile_a: array<array<${_.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${E.type.storage}, ${l}>, ${l}>;
  ${b.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${z.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${A}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${y}
      }
      workgroupBarrier();
    }

    ${N}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${S!=null?`let cOffset = ${S.broadcastedIndicesToOffset("vec2(m, n)",z)}; value += ${z.type.value}(uniforms.beta) * ${S.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:d*c},programUniforms:$}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:$}),getShaderSource:k}},Fg=e=>{let t=e.transA,r=e.transB,n=e.alpha,i=e.beta;return{transA:t,transB:r,alpha:n,beta:i,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Hg=(e,t)=>{Mc(e.inputs),e.compute(Pc(e.inputs,t))}}),_t,Ot,cr,fr,Bc,Uc,Wc,Lc,Vc,qc,Gc,Fc,jg,Kg,ib=L(()=>{"use strict";ne(),ie(),Ie(),se(),[_t,Ot,cr,fr]=[0,1,2,3],Bc=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Uc=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Wc=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Lc=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Vc=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,qc=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${_t}] = batch;
     indices[${Ot}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${cr}] = u32(r);
            indices[${fr}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${cr}] = u32(clamp(r, 0, H - 1));
          indices[${fr}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${cr}] = gs_reflect(r, border[1], border[3]);
          indices[${fr}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Gc=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${_t}], indices[${Ot}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${_t}], indices[${Ot}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${_t}], indices[${Ot}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${_t}], indices[${Ot}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${_t}], indices[${Ot}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${_t}], indices[${Ot}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Fc=(e,t)=>{let r=P("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=P("grid",e[1].dataType,n.length,2),s=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(s=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[_t,Ot,cr,fr]=[0,3,1,2]);let a=Q("output",e[0].dataType,s.length),o=r.type.value,l=D.size(s),d=[{type:12,data:l},...ee(e[0].dims,n,s)],c=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,i,a)}
  ${Uc}
  ${Wc(o)}
  ${Lc(t)}
  ${Vc(t)}
  ${qc(r,o,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${cr}]);
      let W_in = i32(uniforms.x_shape[${fr}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${_t}], indices[${cr}], indices[${fr}]);
      let nxy = ${i.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Gc(a,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let g=D.size(s);return{outputs:[{dims:s,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:d}},getShaderSource:c}},jg=(e,t)=>{Bc(e.inputs),e.compute(Fc(e.inputs,t))},Kg=e=>$e({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),qe,Hc,Yg,ga,jc,Fn,Zg,Xg=L(()=>{"use strict";ne(),ie(),Ie(),po(),ho(),se(),Qt(),qe=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Hc=(e,t)=>{let r=e[0],n=qe(e,1),i=qe(e,2),s=qe(e,3),a=qe(e,4),o=qe(e,5),l=qe(e,6),d=qe(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],f=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],$=f,w=0,k=0,T=Math.floor(g/t.numHeads);if(l&&d&&D.size(l.dims)&&D.size(d.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==c||d.dims[1]!==t.numHeads||d.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');w=l.dims[2],k=l.dims[2]}else if(l&&D.size(l.dims)||d&&D.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let b;if(n&&D.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');b=2,$=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');b=5,$=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');b=0,$=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}if(s&&D.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let _=w+$,E=0;if(a&&D.size(a.dims)>0){E=8;let x=a.dims;throw x.length===1?x[0]===c?E=1:x[0]===3*c+2&&(E=3):x.length===2&&x[0]===c&&x[1]===_&&(E=5),E===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let S=!1,C=g;if(i&&D.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if($!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=i.dims[2]}else{if($!==i.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');C=i.dims[1]*i.dims[3],S=!0}}let z=!1;if(a&&D.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(o&&D.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==c||o.dims[1]!==t.numHeads||o.dims[2]!==f||o.dims[3]!==_)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:f,pastSequenceLength:w,kvSequenceLength:$,totalSequenceLength:_,maxSequenceLength:k,inputHiddenSize:0,hiddenSize:g,vHiddenSize:C,headSize:T,vHeadSize:Math.floor(C/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:E,scale:t.scale,broadcastResPosBias:z,passPastInKv:S,qkvFormat:b}},Yg=e=>$e({...e}),ga=$e({perm:[0,2,1,3]}),jc=(e,t,r,n,i,s,a)=>{let o=[n,i,s],l=D.size(o),d=[{type:12,data:l},{type:12,data:a},{type:12,data:s}],c=f=>{let g=Q("qkv_with_bias",t.dataType,o),$=P("qkv",t.dataType,o),w=P("bias",r.dataType,o),k=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(k).declareVariables($,w,g)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:c},{inputs:[t,r],outputs:[-1]})[0]},Fn=(e,t,r,n,i,s,a,o)=>{let l=s;if(a&&D.size(a.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=jc(e,s,a,t,n,r*i,o),l=l.reshape([t,n,r,i]),r===1||n===1?l:e.compute(Ze(l,ga.perm),{inputs:[l],outputs:[-1]})[0]}else return s.dims.length===3&&(l=s.reshape([t,n,r,i])),r===1||n===1?l:e.compute(Ze(l,ga.perm),{inputs:[l],outputs:[-1]})[0]},Zg=(e,t)=>{let r=Hc(e.inputs,t),n=e.inputs[0],i=qe(e.inputs,1),s=qe(e.inputs,2),a=qe(e.inputs,3),o=qe(e.inputs,4),l=qe(e.inputs,5),d=qe(e.inputs,6),c=qe(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(i?.dims.length===5)throw new Error("Packed KV is not implemented");let f=i&&s&&i.dims.length===4&&s.dims.length===4,g=Fn(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(f)return Kn(e,g,i,s,o,void 0,d,c,l,r);if(!i||!s)throw new Error("key and value must be provided");let $=Fn(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,i,a,r.hiddenSize),w=Fn(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,s,a,2*r.hiddenSize);Kn(e,g,$,w,o,void 0,d,c,l,r)}}),Kc,Yc,Zc,Xc,ja,Qg,Jg,e0=L(()=>{"use strict";ne(),ie(),Ie(),se(),Kc=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Yc=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),n=r.length),$e({numOutputs:n,axis:t.axis,splitSizes:r})},Zc=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${J("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Xc=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let i=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(i):n===0?r.push(`if (output_number == ${n}u) { ${i} }`):n===t-1?r.push(`else { ${i} }`):r.push(`else if (output_number == ${n}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},ja=(e,t)=>{let r=e[0].dims,n=D.size(r),i=e[0].dataType,s=D.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),o=P("input",i,r.length),l=new Array(t.numOutputs),d=[],c=[],f=0,g=[{type:12,data:n}];for(let w=0;w<t.numOutputs;w++){f+=t.splitSizes[w],l[w]=f;let k=r.slice();k[s]=t.splitSizes[w],c.push(k),a[w]=Q(`output${w}`,i,k.length),d.push({dims:c[w],dataType:e[0].dataType})}g.push({type:12,data:l},...ee(r,...c));let $=w=>`
  ${w.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(o,...a)}
  ${Zc(l.length)}
  ${Xc(a)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${J("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${o.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:g})}},Qg=(e,t)=>{Kc(e.inputs);let r=e.inputs.length===1?t:Yc(e.inputs,t);e.compute(ja(e.inputs,r),{inputs:[0]})},Jg=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return $e({axis:t,numOutputs:n,splitSizes:r})}}),Qc,Wi,t0,r0=L(()=>{"use strict";ne(),ie(),Ie(),se(),Qc=(e,t)=>{let[r,n,i,s]=e,{numHeads:a,rotaryEmbeddingDim:o}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!D.areEqual(n.dims,[])&&!D.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!D.areEqual(i.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],d=r.dims[r.dims.length-2],c=i.dims[0],f=D.sizeFromDimension(r.dims,1)/d,g=o===0?i.dims[1]*2:f/a;if(o>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(l!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(d!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(d>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(g/2!==i.dims[1]&&o/2!==i.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`)},Wi=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:i,scale:s}=t,a=e[0].dims[0],o=D.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=o/l,c=e[2].dims[1],f=i===0?c*2:d/n,g=new Array(a,l,d/f,f-c),$=D.computeStrides(g),w=[{type:1,data:s},{type:12,data:g},{type:12,data:$},...e[0].dims.length===3?new Array({type:12,data:[o,d,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,f,l*f,1]}):[],...ee(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],k=T=>{let b=P("input",e[0].dataType,e[0].dims.length),_=P("position_ids",e[1].dataType,e[1].dims.length),E=P("cos_cache",e[2].dataType,e[2].dims.length),S=P("sin_cache",e[3].dataType,e[3].dims.length),C=Q("output",e[0].dataType,e[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:$.length},{name:"input_output_strides",type:"u32",length:$.length}]),`
        ${T.declareVariables(b,_,E,S,C)}

        ${T.mainStart(qr)}
          let half_rotary_emb_dim = uniforms.${E.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${_.broadcastedIndicesToOffset("bsnh.xy",Q("",_.type.tensor,2))};
            let position_id =
                u32(${_.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${b.getByOffset("i")} * ${E.get("position_id","bsnh[3]")} -
                ${b.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${C.setByOffset("i","re")}
            let im = ${b.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} +
                ${b.getByOffset("j")} * ${E.get("position_id","bsnh[3]")};
            ${C.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${C.setByOffset("k",b.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:$e({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:k,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(g)/qr)},programUniforms:w})}},t0=(e,t)=>{Qc(e.inputs,t),e.compute(Wi(e.inputs,t))}}),Jc,ef,ya,tf,n0,sb=L(()=>{"use strict";Ie(),ne(),ho(),Xg(),e0(),Qt(),r0(),se(),Jc=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],i=e[2],s=e[3],a=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,l=r.dims[0],d=r.dims[1],c=r.dims.length===3?o?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=d,g=0,$=!n||n.dims.length===0,w=Math.floor($?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);$&&(c=w*t.numHeads);let k=s&&s.dims.length!==0,T=a&&a.dims.length!==0;if(k&&s.dims.length===4&&s.dims[0]===l&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===w)throw new Error("BSNH pastKey/pastValue is not supported");if(k&&T){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=s.dims[2]}else if(k||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let b=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');f=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}let _=0,E=!1,S=t.kvNumHeads?w*t.kvNumHeads:c;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(f!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=i.dims[2]}else{if(f!==i.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');S=i.dims[1]*i.dims[3],E=!0}}let C=e.length>4?e[5]:void 0;if(C){if(C.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let z=C.dims.reduce((x,y)=>x*y,1);if(z!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${z}.`);for(let x=0;x<C.dims.length;x++)if(C.dims[x]!==1&&C.dims[x]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${x}] = ${C.dims[x]}.`)}return{batchSize:l,sequenceLength:d,pastSequenceLength:g,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:S,headSize:w,vHeadSize:Math.floor(S/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:E,qkvFormat:b}},ef=$e({perm:[0,2,1,3]}),ya=(e,t,r)=>{let n=t,i=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,i,r.headSize]),n=e.compute(Ze(n,ef.perm),{inputs:[n],outputs:[-1]})[0]),n},tf=(e,t,r,n)=>{let i=7,s=["type","type"],a=[e*t],o=e*t,l=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],d=c=>{let f=P("seq_lens",r.dataType,r.dims),g=P("total_seq_lens",n.dataType,n.dims),$=Q("pos_ids",i,a),w=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(w).declareVariables(f,g,$)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${$.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${$.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${$.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:d}},n0=(e,t)=>{if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let r=Jc(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=$e({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[g,$,w]=!i&&!s?e.compute(ja([n],f),{inputs:[n],outputs:[-1,-1,-1]}):[n,i,s],k,T;if(t.doRotary){let S=e.compute(tf(r.batchSize,r.sequenceLength,l,d),{inputs:[l,d],outputs:[-1]})[0],C=e.inputs[7],z=e.inputs[8],x=$e({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),y=[g,S,C,z],A=[-1];k=e.compute(Wi(y,x),{inputs:y,outputs:A})[0],y.splice(0,1,$);let N=$e({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});T=e.compute(Wi(y,N),{inputs:y,outputs:A})[0]}let b=Fn(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?k:g,void 0,0),_=ya(e,t.doRotary?T:$,r),E=ya(e,w,r);Kn(e,b,_,E,void 0,void 0,a,o,void 0,r,l,d)}}),wa,rf,nf,i0,ab=L(()=>{"use strict";ne(),ie(),Qt(),se(),wa=(e,t,r,n,i,s,a,o)=>{let l=Se(s),d=l===1?"f32":`vec${l}f`,c=l===1?"vec2f":`mat2x${l}f`,f=i*a,g=64;f===1&&(g=256);let $=[i,a,s/l],w=[i,a,2],k=["rank","type","type"],T=[];T.push(...ee($,w));let b=_=>{let E=P("x",t.dataType,3,l),S=P("scale",r.dataType,r.dims),C=P("bias",n.dataType,n.dims),z=Q("output",1,3,2),x=[E,S,C,z];return`
  var<workgroup> workgroup_shared : array<${c}, ${g}>;
  const workgroup_size = ${g}u;
  ${_.declareVariables(...x)}
  ${_.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${E.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Xt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Xt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${o};${g}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:w,dataType:1}],dispatchGroup:{x:f},programUniforms:T}),getShaderSource:b},{inputs:[t,r,n],outputs:[-1]})[0]},rf=(e,t,r)=>{let n=t[0].dims,i=n,s=2,a=n[0],o=n[1],l=D.sizeFromDimension(n,s),d=Se(l),c=D.size(i)/d,f=wa(e,t[0],t[1],t[2],a,l,o,r.epsilon),g=[a,o,l/d],$=[a,o],w=["type","none"],k=T=>{let b=P("x",t[0].dataType,g.length,d),_=P("scale_shift",1,$.length,2),E=Q("output",t[0].dataType,g.length,d),S=[b,_,E];return`
  ${T.registerUniform("output_size","u32").declareVariables(...S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${E.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${_.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${b.getByOffset("global_idx")} * ${E.type.value}(scale_shift.x) + ${E.type.value}(scale_shift.y);
      ${E.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...ee(g,$,g)]}),getShaderSource:k},{inputs:[t[0],f]})},nf=(e,t,r)=>{let n=t[0].dims,i=n,s=n[0],a=n[n.length-1],o=D.sizeFromDimension(n,1)/a,l=Se(a),d=D.size(i)/l,c=[{type:12,data:o},{type:12,data:Math.floor(a/l)}],f=["type","type"],g=!1,$=[0,n.length-1];for(let b=0;b<n.length-2;b++)g=g||n[b+1]!==1,$.push(b+1);g=g&&n[n.length-1]!==1;let w=g?e.compute(Ze(e.inputs[0],$),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},(b,_)=>n[$[_]])),k=wa(e,w,t[1],t[2],s,o,a,r.epsilon),T=b=>{let _=Pe(t[0].dataType),E=l===1?"vec2f":`mat${l}x2f`,S=x=>{let y=x===0?"x":"y",A=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${_}(${A}(scale.${y}))`;case 2:return`vec2<${_}>(${A}(scale[0].${y}, scale[1].${y}))`;case 4:return`vec4<${_}>(${A}(scale[0].${y}, scale[1].${y}, scale[2].${y}, scale[3].${y}))`;default:throw new Error(`Not supported compoents ${l}`)}},C=P("input",t[0].dataType,t[0].dims,l),z=Q("output",t[0].dataType,i,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${C.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${E}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${z.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${b.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${S(0)}, ${S(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:T},{inputs:[t[0],k]})},i0=(e,t)=>{t.format==="NHWC"?nf(e,e.inputs,t):rf(e,e.inputs,t)}}),sf,af,s0,ob=L(()=>{"use strict";ne(),ie(),se(),sf=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},af=(e,t,r)=>{let n=t.simplified,i=e[0].dims,s=e[1],a=!n&&e[2],o=i,l=D.normalizeAxis(t.axis,i.length),d=D.sizeToDimension(i,l),c=D.sizeFromDimension(i,l),f=D.size(s.dims),g=a?D.size(a.dims):0;if(f!==c||a&&g!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${g}`);let $=[];for(let C=0;C<i.length;++C)C<l?$.push(i[C]):$.push(1);let w=Se(c),k=["type","type"],T=[{type:12,data:d},{type:1,data:c},{type:12,data:Math.floor(c/w)},{type:1,data:t.epsilon}];a&&k.push("type");let b=r>1,_=r>2,E=C=>{let z=Pe(e[0].dataType),x=[P("x",e[0].dataType,e[0].dims,w),P("scale",s.dataType,s.dims,w)];a&&x.push(P("bias",a.dataType,a.dims,w)),x.push(Q("output",e[0].dataType,o,w)),b&&x.push(Q("mean_data_output",1,$)),_&&x.push(Q("inv_std_output",1,$));let y=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${C.registerUniforms(y).declareVariables(...x)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Ba("f32",w)};
    var mean_square_vector = ${Ba("f32",w)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Lr(z,w,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Xt("mean_vector",w)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Xt("mean_square_vector",w)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Lr(z,w,"x[j + offset]")};
      let f32scale = ${Lr(z,w,"scale[j]")};
      output[j + offset] = ${x[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Lr(z,w,"bias[j]")}`:""}
      );
    }

    ${b?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},S=[{dims:o,dataType:e[0].dataType}];return b&&S.push({dims:$,dataType:1}),_&&S.push({dims:$,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${w};${r};${n}`,inputDependencies:k},getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:T}),getShaderSource:E}},s0=(e,t)=>{sf(e.inputs),e.compute(af(e.inputs,t,e.outputCount))}}),of,a0,ub=L(()=>{"use strict";ie(),$o(),_o(),of=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},a0=e=>{of(e.inputs);let t=Vr.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(wo(e.inputs,{activation:""},t));else{let i=t[t.length-2],s=D.size(e.inputs[0].dims.slice(0,-2)),a=D.size(e.inputs[1].dims.slice(0,-2));if(s!==1&&i===1&&a===1){let o=e.inputs[0].reshape([1,s,n]),l=e.inputs[1].reshape([1,n,r]),d=[1,s,r],c=[o,l];e.compute(Ui(c,{activation:""},t,d),{inputs:c})}else e.compute(Ui(e.inputs,{activation:""},t))}}}),uf,lf,df,o0,u0,lb=L(()=>{"use strict";ne(),ie(),Ie(),se(),uf=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,a=e[1];if(!D.areEqual(a.dims,[t.n,i,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(D.size(o)!==t.n*i)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,d=t.n*(t.bits===8?i:Math.floor((i*t.bits+7)/8));if(D.size(l)!==d)throw new Error("zeroPoints input size error.")}},lf=(e,t)=>{let r=e[0].dims,n=r.length,i=r[n-2],s=t.k,a=t.n,o=r.slice(0,n-2),l=D.size(o),d=e[1].dims[2]/4,c=e[0].dataType,f=Se(t.k),g=Se(d),$=Se(a),w=o.concat([i,a]),k=i>1&&a/$%2===0?2:1,T=D.size(w)/$/k,b=64,_=[],E=[l,i,s/f],S=D.convertShape(e[1].dims).slice();S.splice(-1,1,d/g),_.push(...ee(E)),_.push(...ee(S)),_.push(...ee(e[2].dims)),e.length===4&&_.push(...ee(D.convertShape(e[3].dims)));let C=[l,i,a/$];_.push(...ee(C));let z=x=>{let y=E.length,A=P("a",e[0].dataType,y,f),N=P("b",12,S.length,g),U=P("scales",e[2].dataType,e[2].dims.length),V=[A,N,U],H=e.length===4?P("zero_points",12,e[3].dims.length):void 0;H&&V.push(H);let Y=C.length,O=Q("output",e[0].dataType,Y,$),G=Pe(e[0].dataType),q=(()=>{switch(f){case 1:return`array<${G}, 8>`;case 2:return`mat4x2<${G}>`;case 4:return`mat2x4<${G}>`;default:throw new Error(`${f}-component is not supported.`)}})(),oe=Math.floor(32/t.bits),te=Math.floor(oe/8),re=()=>{let K="";for(let j=0;j<te;j++){let ve=j*t.bits*4,it=ve+t.bits;K+=`
          // reuse a data (pass ${j})
            var input_offset${j>0?j:""} = ${j===0?A.indicesToOffset(`${A.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${j>0?j:""}: ${q};
            for (var j${j>0?j:""}: u32 = 0; j${j>0?j:""} < ${8/f}; j${j>0?j:""}++) {
              a_data${j>0?j:""}[j${j>0?j:""}] = ${A.getByOffset(`input_offset${j>0?j:""}`)};
              input_offset${j>0?j:""}++;
            }
          `;for(let Le=0;Le<$*k;Le++)K+=`
            b_value = ${g===1?`b${Le}_data`:`b${Le}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${j*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${ve}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${it}u) & b_mask);`}
            b_quantized_values = ${q}(${Array.from({length:4},(ze,Oe)=>`${G}(b_value_lower[${Oe}]), ${G}(b_value_upper[${Oe}])`).join(", ")});
            b_dequantized_values = ${f===1?`${q}(${Array.from({length:8},(ze,Oe)=>`(b_quantized_values[${Oe}] - ${H?`zero_point${Le}`:"zero_point"}) * scale${Le}`).join(", ")});`:`(b_quantized_values - ${q}(${Array(8).fill(`${H?`zero_point${Le}`:"zero_point"}`).join(",")})) * scale${Le};`};
            workgroup_shared[local_id.x * ${k} + ${Math.floor(Le/$)}]${$>1?`[${Le%$}]`:""} += ${Array.from({length:8/f},(ze,Oe)=>`${f===1?`a_data${j>0?j:""}[${Oe}] * b_dequantized_values[${Oe}]`:`dot(a_data${j>0?j:""}[${Oe}], b_dequantized_values[${Oe}])`}`).join(" + ")};
          `}return K},W=()=>{let K=`
            var col_index = col * ${$};
            ${H?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${G}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let j=0;j<$*k;j++)K+=`
            let scale${j} = ${U.getByOffset("col_index * nBlocksPerCol + block")};
            ${H?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${H.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${j} = ${G}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return K},B=()=>{let K=`col_index = col * ${$};`;for(let j=0;j<$*k;j++)K+=`
            let b${j}_data = ${N.getByIndices(`${N.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return K+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${q};
            var b_dequantized_values: ${q};`,K};return`
        var<workgroup> workgroup_shared: array<${O.type.value}, ${k*b}>;
        ${x.declareVariables(...V,O)}
        ${x.mainStart([b,1,1])}
          let output_indices = ${O.offsetToIndices(`(global_idx / ${b}) * ${k}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${b}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${W()}
            for (var word: u32 = 0; word < ${d}; word += ${g}) {
              ${B()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${re()}
                word_offset += ${oe/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${k}) {
            var output_value: ${O.type.value} = ${O.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${b}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${k};
            }
            ${O.setByIndices(`${O.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${g};${$};${k};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:c}],dispatchGroup:{x:T},programUniforms:_}),getShaderSource:z}},df=(e,t)=>{let r=e[0].dims,n=r.length,i=r[n-2],s=t.k,a=t.n,o=r.slice(0,n-2),l=D.size(o),d=e[1].dims[2]/4,c=e[0].dataType,f=Se(t.k),g=Se(d),$=o.concat([i,a]),w=128,k=a%8===0?8:a%4===0?4:1,T=w/k,b=Math.floor(32/t.bits),_=T*g*b,E=_/f,S=_/t.blockSize,C=D.size($)/k,z=[],x=[l,i,s/f],y=D.convertShape(e[1].dims).slice();y.splice(-1,1,d/g),z.push(...ee(x)),z.push(...ee(y)),z.push(...ee(e[2].dims)),e.length===4&&z.push(...ee(D.convertShape(e[3].dims)));let A=[l,i,a];z.push(...ee(A));let N=U=>{let V=x.length,H=P("a",e[0].dataType,V,f),Y=P("b",12,y.length,g),O=P("scales",e[2].dataType,e[2].dims.length),G=[H,Y,O],q=e.length===4?P("zero_points",12,e[3].dims.length):void 0;q&&G.push(q);let oe=A.length,te=Q("output",e[0].dataType,oe),re=Pe(e[0].dataType),W=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${H.type.value}, ${E}>;
        var<workgroup> inter_results: array<array<${te.type.value}, ${T}>, ${k}>;
        ${U.declareVariables(...G,te)}
        ${U.mainStart([T,k,1])}
          let output_indices = ${te.offsetToIndices(`workgroup_index * ${k}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${S} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${E};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${E}; a_offset += ${w})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${H.getByIndices(`${H.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${H.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${S} + local_id.x;
            ${q?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${q.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${re}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${re}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${O.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Y.getByIndices(`${Y.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${g}; i++) {
              let b_value = ${g===1?"b_data":"b_data[i]"};
              ${(()=>{let B=Math.floor(b/8),K="";for(let j=0;j<B;j++){let ve=j*t.bits*4,it=ve+t.bits;K+=`
              ${W()}
              {${t.bits===2?`
                let half_word = b_value >> ${j*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${ve}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${it}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${re}>(${Array.from({length:4},(Le,ze)=>`${re}(b_value_lower[${ze}]), ${re}(b_value_upper[${ze}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${re}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Le,ze)=>`${`dot(a_data${ze}, b_dequantized_values[${ze}])`}`).join(" + ")};
              }
              word_offset += ${8/f};`}return K})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${k}) {
            var output_value: ${te.type.value} = ${te.type.value}(0);
            for (var b = 0u; b < ${T}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${te.setByIndices(`${te.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${g};${T};${k}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:$,dataType:c}],dispatchGroup:{x:C},programUniforms:z}),getShaderSource:N}},o0=(e,t)=>{uf(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(df(e.inputs,t)):e.compute(lf(e.inputs,t))},u0=e=>$e(e)}),pf,cf,ff,hf,mf,gf,yf,wf,l0,db=L(()=>{"use strict";ne(),ie(),se(),pf=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},cf=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
            k = i32(${e.indicesGet("indices",i)}) - ${J("uniforms.pads",i,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${J("uniforms.x_shape",i,t)})) {
              break;
            }
            offset += k * i32(${J("uniforms.x_strides",i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},ff=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${J("uniforms.pads",i,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${J("uniforms.x_shape",i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${J("uniforms.x_shape",i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${J("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},hf=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${J("uniforms.pads",i,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${J("uniforms.x_shape",i,t)})) {
                  k = i32(${J("uniforms.x_shape",i,t)}) - 1;
                }
                offset += k * i32(${J("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},mf=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${J("uniforms.pads",i,r)};
                if (k < 0)  {
                  k += i32(${J("uniforms.x_shape",i,t)}]);
                }
                if (k >= i32(${J("uniforms.x_shape",i,t)})) {
                  k -= i32(${J("uniforms.x_shape",i,t)});
                }
                offset += k * i32(${J("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},gf=(e,t,r)=>{switch(r.mode){case 0:return cf(e,t,r.pads.length);case 1:return ff(e,t,r.pads.length);case 2:return hf(e,t,r.pads.length);case 3:return mf(e,t,r.pads.length);default:throw new Error("Invalid mode")}},yf=(e,t)=>{let r=D.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,i=D.size(r),s=[{type:12,data:i},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&s.push({type:a?e[2].dataType:1,data:t.value}),s.push(...ee(e[0].dims,r));let o=["rank"],l=d=>{let c=Q("output",e[0].dataType,r.length),f=P("x",e[0].dataType,n.length),g=f.type.value,$=gf(c,n.length,t),w=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&w.push({name:"constant_value",type:a?g:"f32"}),`
            ${d.registerUniforms(w).declareVariables(f,c)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${$}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(r)/64)},programUniforms:s}),getShaderSource:l}},wf=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,s=new Int32Array(2*i).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let l=0;l<o.length;l++)s[Number(o[l])]=Number(r[l]),s[Number(o[l])+i]=Number(r[l+o.length])}else r.forEach((o,l)=>s[Number(l)]=Number(o));let a=[];return s.forEach(o=>a.push(o)),{mode:t.mode,value:n,pads:a}}else return t},l0=(e,t)=>{pf(e.inputs);let r=wf(e.inputs,t);e.compute(yf(e.inputs,r),{inputs:[0]})}}),Bn,$a,_a,ba,va,$f,_f,xa,ka,d0,p0,Ta,c0,f0,Ea,h0,m0,g0,y0,pb=L(()=>{"use strict";Xe(),ne(),ie(),se(),Bn=e=>{if(_e.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},$a=(e,t,r)=>{let n=t.format==="NHWC",i=e.dims.slice();n&&i.splice(1,0,i.pop());let s=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),o=t.strides.slice(),l=s?t.dilations.slice():[],d=t.pads.slice();Pi.adjustPoolAttributes(r,i,a,o,l,d);let c=Pi.computePoolOutputShape(r,i,o,l,a,d,t.autoPad,t.ceilMode),f=Object.assign({},t);s?Object.assign(f,{kernelShape:a,strides:o,pads:d,dilations:l,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:a,strides:o,pads:d,cacheKey:t.cacheKey});let g=c.slice();return g.push(g.splice(1,1)[0]),[f,n?g:c]},_a=(e,t)=>{let r=t.format==="NHWC",n=D.size(e),i=D.size(t.kernelShape),s=[{type:12,data:n},{type:12,data:i}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],f=!!(d+c);s.push({type:12,data:o},{type:12,data:l},{type:12,data:d},{type:12,data:c}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let $=t.kernelShape[t.kernelShape.length-2],w=t.strides[t.strides.length-2],k=t.pads[t.pads.length/2-2],T=t.pads[t.pads.length-2];g=!!(k+T),s.push({type:12,data:$},{type:12,data:w},{type:12,data:k},{type:12,data:T}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,a,!0,f,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=D.computeStrides(t.kernelShape);s.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((d,c)=>d+c);return[s,a,!!l,!1,!1]}},ba=(e,t,r,n,i,s,a,o,l,d,c,f)=>{let g=i.format==="NHWC",$=t.type.value,w=Q("output",t.type.tensor,n);if(i.kernelShape.length<=2){let k="",T="",b="",_=r-(g?2:1);if(c?k=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${_}] < 0 || xIndices[${_}]
                      >= uniforms.x_shape[${_}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:k=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`,i.kernelShape.length===2){let E=r-(g?3:2);f?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${E}] = indices[${E}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${E}] < 0 || xIndices[${E}] >= uniforms.x_shape[${E}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${E}] = indices[${E}] * uniforms.sh - uniforms.phStart + j;
                `,b=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,w)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${w.offsetToIndices("global_idx")};
              var xIndices = ${w.offsetToIndices("global_idx")};

              var value = ${$}(${o});
              var pad = 0;
              ${T}
              ${k}
              ${b}
              ${a}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let k=i.kernelShape.length,T=i.pads.length,b="";return d?b=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:b=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(l).declareVariables(t,w)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${w.offsetToIndices("global_idx")};
              var xIndices = ${w.offsetToIndices("global_idx")};

              var offsets: array<u32, ${k}>;

              var value = ${$}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${k-1}u; j++) {
                  offsets[j] = offset / ${J("uniforms.kernelStrides","j",k)};
                  offset -= offsets[j] * ${J("uniforms.kernelStrides","j",k)};
                }
                offsets[${k-1}] = offset;

                isPad = false;
                for (var j = ${r-k}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${J("uniforms.strides",`j - ${r-k}u`,k)}
                    + offsets[j - ${r-k}u] - ${J("uniforms.pads","j - 2u",T)};
                  ${b}
              }
              ${a}

              output[global_idx] = value;
            }`}},va=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,$f=e=>`${va(e)};${e.countIncludePad}`,_f=e=>`${va(e)};${e.storageOrder};${e.dilations}`,xa=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ka=(e,t,r,n)=>{let[i,s]=$a(t,n,r),a=P("x",t.dataType,t.dims.length),o=a.type.value,l="value += x_val;",d="";i.countIncludePad?d+=`value /= ${o}(uniforms.kernelSize);`:d+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[c,f,g,$,w]=_a(s,i);c.push(...ee(t.dims,s));let k=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${g};${$};${w}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(D.size(s)/64)},programUniforms:c}),getShaderSource:T=>ba(T,a,t.dims.length,s.length,i,l,d,0,f,g,$,w)}},d0=e=>{let t=e.count_include_pad!==0,r=xa(e);if(r.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:$f(n)}},p0=(e,t)=>{Bn(e.inputs),e.compute(ka("AveragePool",e.inputs[0],!1,t))},Ta={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},c0=e=>{let t=e.format;return{format:t,...Ta,cacheKey:t}},f0=(e,t)=>{Bn(e.inputs),e.compute(ka("GlobalAveragePool",e.inputs[0],!0,t))},Ea=(e,t,r,n)=>{let[i,s]=$a(t,n,r),a=`
      value = max(x_val, value);
    `,o="",l=P("x",t.dataType,t.dims.length),d=["rank"],[c,f,g,$,w]=_a(s,i);return c.push(...ee(t.dims,s)),{name:e,shaderCache:{hint:`${n.cacheKey};${g};${$};${w}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(D.size(s)/64)},programUniforms:c}),getShaderSource:k=>ba(k,l,t.dims.length,s.length,i,a,o,t.dataType===10?-65504:-1e5,f,g,$,w)}},h0=(e,t)=>{Bn(e.inputs),e.compute(Ea("MaxPool",e.inputs[0],!1,t))},m0=e=>{let t=e.storage_order,r=e.dilations,n=xa(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let i={storageOrder:t,dilations:r,...n,cacheKey:""};return{...i,cacheKey:_f(i)}},g0=e=>{let t=e.format;return{format:t,...Ta,cacheKey:t}},y0=(e,t)=>{Bn(e.inputs),e.compute(Ea("GlobalMaxPool",e.inputs[0],!0,t))}}),bf,vf,w0,$0,cb=L(()=>{"use strict";ne(),ie(),Ie(),se(),bf=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((i,s)=>s===t.axis||i===e[0].dims[s]).reduce((i,s)=>i&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},vf=(e,t)=>{let r=D.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,i=n===3,s=e[0].dims,a=e[1].dataType,o=D.size(s),l=n===3||n===2,d=l?[Math.ceil(D.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,f=e.length>2?e[2]:void 0,g=f?l?[Math.ceil(D.size(f.dims)/4)]:f.dims:void 0,$=c.length===0||c.length===1&&c[0]===1,w=$===!1&&c.length===1,k=Se(o),T=$&&(!l||k===4),b=T?k:1,_=T&&!l?k:1,E=P("input",l?12:n,d.length,_),S=P("scale",a,c.length),C=f?P("zero_point",l?12:n,g.length):void 0,z=Q("output",a,s.length,b),x=[E,S];C&&x.push(C);let y=[d,c];f&&y.push(g);let A=[{type:12,data:o/b},{type:12,data:r},{type:12,data:t.blockSize},...ee(...y,s)],N=U=>{let V=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${U.registerUniforms(V).declareVariables(...x,z)}
      ${U.mainStart()}
          ${U.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${z.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${E.getByOffset("global_idx / 4")};
            let x_vec = ${i?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${b===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${E.getByOffset("global_idx")};`};

          // Set scale input
          ${$?`let scale_value= ${S.getByOffset("0")}`:w?`
            let scale_index = ${z.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${S.getByOffset("scale_index")};`:`
            var scale_indices: ${S.type.indices} = output_indices;
            let index = ${S.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${S.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${S.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${C?$?l?`
                let zero_point_input = ${C.getByOffset("0")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${C.getByOffset("0")}`:w?l?`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${C.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${C.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${S.indicesToOffset("scale_indices")};
                let zero_point_input = ${C.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${C.getByIndices("scale_indices")};`:`let zero_point_value = ${l?i?"i32":"u32":E.type.value}(0);`};
      // Compute and write output
      ${z.setByOffset("global_idx",`${z.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:C?["rank","rank","rank"]:["rank","rank"]},getShaderSource:N,getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(o/b/64),y:1,z:1},programUniforms:A})}},w0=(e,t)=>{bf(e.inputs,t),e.compute(vf(e.inputs,t))},$0=e=>$e({axis:e.axis,blockSize:e.blockSize})}),xf,kf,_0,fb=L(()=>{"use strict";Xe(),ne(),se(),xf=(e,t,r)=>{let n=e===t,i=e<t&&r<0,s=e>t&&r>0;if(n||i||s)throw new Error("Range these inputs' contents are invalid.")},kf=(e,t,r,n)=>{let i=Math.abs(Math.ceil((t-e)/r)),s=[i],a=i,o=[{type:12,data:a},{type:n,data:e},{type:n,data:r},...ee(s)],l=d=>{let c=Q("output",n,s.length),f=c.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${d.registerUniforms(g).declareVariables(c)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:o})}},_0=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),_e.webgpu.validateInputContent&&xf(t,r,n),e.compute(kf(t,r,n,e.inputs[0].dataType),{inputs:[]})}}),Tf,Ef,b0,v0,hb=L(()=>{"use strict";ne(),ie(),Ie(),se(),Tf=(e,t,r,n)=>{if(e!=="none"&&n!=="i32"&&n!=="u32"&&n!=="f32")throw new Error(`Input ${n} is not supported with reduction ${e}.`);let i=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return n==="i32"||n==="u32"?`atomicAdd(&${t}, bitcast<${n}>(${r}));`:`
              ${i}bitcast<${n}>(oldValue) + (${r})${s}`;case"max":return n==="i32"||n==="u32"?`atomicMax(&${t}, bitcast<${n}>(${r}));`:`
                ${i}max(bitcast<f32>(oldValue), (${r}))${s}`;case"min":return n==="i32"||n==="u32"?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${i}min(bitcast<${n}>(oldValue), (${r}))${s}`;case"mul":return`${i}(bitcast<${n}>(oldValue) * (${r}))${s}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Ef=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r,s=1,a=Math.ceil(D.sizeToDimension(n,n.length-1)/s),o=n[n.length-1],l=D.sizeFromDimension(r,o),d=[{type:12,data:a},{type:12,data:o},{type:12,data:l},...ee(e[1].dims,e[2].dims,i)],c=f=>{let g=P("indices",e[1].dataType,e[1].dims.length),$=P("updates",e[2].dataType,e[2].dims.length,s),w=t.reduction!=="none"&&t.reduction!==""?jh("output",e[0].dataType,i.length):Q("output",e[0].dataType,i.length,s);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,$,w)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Tf(t.reduction,"output[data_offset + i]","value",w.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:c}},b0=e=>$e({reduction:e.reduction}),v0=(e,t)=>{e.compute(Ef(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Sf,If,Cf,Sa,Af,zf,Of,Rf,Df,Nf,Mf,Pf,Ia,Bf,Uf,Wf,Lf,Vf,x0,k0,mb=L(()=>{"use strict";ne(),ie(),Ie(),se(),Sf=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},If=(e,t,r)=>{t.every(i=>i>=0&&i<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((i,s)=>n[i]=e[s]),n},Cf=(e,t,r,n,i,s)=>{let[a,o,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(c=>s.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(c=>n.push(c)),n.length!==0&&n.length!==d&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Sf(n,t),t.axes.length>0&&If(n,t.axes,d).forEach((c,f)=>n[f]=c)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(c=>i.push(Number(c))),i.length!==0&&i.length!==d&&r>=18&&i.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof i<"u"&&n.length>0&&i.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},Sa=(e,t,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,Af=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Sa("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Sa("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",zf=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Of=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),i=e.length===0?n:e.slice();return t.length>0?(t.forEach((s,a)=>{n[s]=i[a],n[a+r]=i[t.length+a]}),n):i},Rf=(e,t,r,n)=>{let i=[];if(r.length>0)if(n.length>0){if(e.forEach(s=>i.push(s)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((s,a)=>i[s]=r[a])}else r.forEach(s=>i.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");i=e.map((s,a)=>Math.round(s*t[a]))}return i},Df=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return r.axes.length>0?(r.axes.forEach(s=>t[s]=n),r.axes.forEach(s=>i[s]=Math.round(e[s]*t[s]))):(t.fill(n,0,t.length),i.forEach((s,a)=>i[a]=Math.round(s*t[a]))),i},Nf=(e,t,r,n,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${J("uniforms.scales","i",n)};
        var roi_low = ${J("uniforms.roi","i",i)};
        var roi_hi = ${J("uniforms.roi",`i + ${t.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${J("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${J("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Mf=(e,t,r,n,i,s,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${J("uniforms.scales","i",i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${J("uniforms.roi","i",s)};
          var roi_hi = ${J("uniforms.roi",`i + ${r.length}`,s)};
          var input_shape_i = ${J("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${J("uniforms.output_shape","i",n.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Pf=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${J("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Ia=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Bf=(e,t,r,n,i)=>{let[s,a,o,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${r[o]} - 1))`)};
      ${Ia(e,l,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${a}];
      var col:${d} = originalIndices[${o}];
      ${n?`if (row < 0 || row > (${r[a]} - 1) || col < 0 || col > (${r[o]} - 1)) {
        return ${i};
      }`:""};
      row = max(0, min(row, ${r[a]} - 1));
      col = max(0, min(col, ${r[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Uf=(e,t,r,n,i,s,a,o,l,d)=>{let c=r.length===2,f=!0,[g,$]=c?[0,1]:f?[2,3]:[1,2],w=e.type.value,k=T=>{let b=T===g?"row":"col";return`
      fn ${b}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${w} {
        var output_index = ${t.indicesGet("output_indices",T)};
        var originalIdx: ${w} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[T]},
        ${n[T]}, ${r[T]}, ${s[T]}, ${s[T]} + ${r.length});
        var fractOriginalIdx: ${w} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${r[T]} - 1))) {
          return ${l};
        }
        var data: array<${w}, 4> = array<${w}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${b}: ${w} = originalIdx + ${w}(i);
          if (${b} < 0 || ${b} >= ${r[T]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${l};`:`${b} = max(0, min(${b}, ${r[T]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",T,`u32(${b})`)};
          data[i + 1] = ${T===g?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${k(g)};
    ${k($)};
  fn getCubicInterpolationCoefs(s: ${w}) -> array<${w}, 4> {
    var absS = abs(s);
    var coeffs: array<${w}, 4> = array<${w}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${w} = 1.0 - absS;
    var twoMinusAbsS: ${w} = 2.0 - absS;
    var onePlusAbsS: ${w} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${w}, 4>, coefs: array<${w}, 4>) -> ${w} {
    var coefsSum: ${w} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${w} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Wf=(e,t,r,n,i)=>{let[s,a,o,l,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${Ia(e,d,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${a}];
      var height:${c} = originalIndices[${o}];
      var width:${c} = originalIndices[${l}];
      ${n?`if (depth < 0 || depth > (${r[a]} - 1) || height < 0 || height > (${r[o]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${i};
        }`:""};

    depth = max(0, min(depth, ${r[a]} - 1));
      height = max(0, min(height, ${r[o]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Lf=(e,t,r,n,i,s)=>{let a=e.dims,o=Of(s,t.axes,a.length),l=Rf(a,n,i,t.axes),d=n.slice();n.length===0&&(d=a.map((_,E)=>_===0?1:l[E]/_),t.keepAspectRatioPolicy!=="stretch"&&(l=Df(a,d,t)));let c=Q("output",e.dataType,l.length),f=P("input",e.dataType,a.length),g=D.size(l),$=a.length===l.length&&a.every((_,E)=>_===l[E]),w=t.coordinateTransformMode==="tf_crop_and_resize",k=t.extrapolationValue,T=f.type.value,b=_=>`
      ${$?"":`
      ${Af(t.coordinateTransformMode,T)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Pf(f,a)};
              ${zf(t.nearestMode,r,T)};
              ${Mf(f,c,a,l,d.length,o.length,w)};
              `;case"linear":return`
              ${Nf(c,a,l,d.length,o.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${Bf(f,c,a,w,k)}`;if(a.length===3||a.length===5)return`${Wf(f,c,a,w,k)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Uf(f,c,a,l,d,o,t.cubicCoeffA,w,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${_.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",o.length).declareVariables(f,c)}
      ${_.mainStart()}
        ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${$?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${i.length>0?i:""}|${o.length>0?o:""}|${$}|${t.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:d},{type:1,data:o},...ee(a,l)]})}},Vf=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},x0=(e,t)=>{let r=[],n=[],i=[],s=Vf(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Cf(e.inputs,t,s,r,n,i),e.compute(Lf(e.inputs[0],t,s,r,n,i),{inputs:[0]})},k0=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,i=e.cubicCoeffA,s=e.excludeOutside!==0,a=e.extrapolationValue,o=e.keepAspectRatioPolicy,l=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return $e({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:i,excludeOutside:s,extrapolationValue:a,keepAspectRatioPolicy:o,mode:l,nearestMode:d})}}),qf,Gf,T0,gb=L(()=>{"use strict";ne(),ie(),se(),qf=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==i)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==i)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==i)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==i)throw new Error("Bias must have the same hidden size as input")}},Gf=(e,t,r,n)=>{let i=t.simplified,s=e[0].dims,a=D.size(s),o=s,l=a,d=s.slice(-1)[0],c=n?s.slice(0,-1).concat(1):[],f=!i&&e.length>3,g=e.length>4,$=n&&r>1,w=n&&r>2,k=r>3,T=64,b=Se(d),_=[{type:12,data:l},{type:12,data:b},{type:12,data:d},{type:1,data:t.epsilon}],E=C=>{let z=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],x=[P("x",e[0].dataType,e[0].dims,b),P("skip",e[1].dataType,e[1].dims,b),P("gamma",e[2].dataType,e[2].dims,b)];f&&x.push(P("beta",e[3].dataType,e[3].dims,b)),g&&x.push(P("bias",e[4].dataType,e[4].dims,b)),x.push(Q("output",e[0].dataType,o,b)),$&&x.push(Q("mean_output",1,c)),w&&x.push(Q("inv_std_output",1,c)),k&&x.push(Q("input_skip_bias_sum",e[0].dataType,o,b));let y=Pe(e[0].dataType),A=Pe(1,b);return`

      ${C.registerUniforms(z).declareVariables(...x)}
      var<workgroup> sum_shared : array<${A}, ${T}>;
      var<workgroup> sum_squared_shared : array<${A}, ${T}>;

      ${C.mainStart([T,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${T};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${T};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${T-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g?"bias[offset1d + i]":y+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${k?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Lr(y,b,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${T};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Xt("sum",b)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Xt("square_sum",b)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${$?"mean_output[global_idx] = mean;":""}
        ${w?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${y}(mean)`}) *
            ${y}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},S=[{dims:o,dataType:e[0].dataType}];return r>1&&S.push({dims:c,dataType:1}),r>2&&S.push({dims:c,dataType:1}),r>3&&S.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${b};${$};${w};${k}`,inputDependencies:e.map((C,z)=>"type")},getShaderSource:E,getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:_})}},T0=(e,t)=>{qf(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Gf(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Ff,Un,Hf,Ca,jf,Kf,E0,S0,yb=L(()=>{"use strict";ne(),ie(),Ie(),se(),Ff=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},Un=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Hf=(e,t)=>{if(e.length>1){let r=Un(e,1),n=Un(e,2),i=Un(e,3);return i.length===0&&(i=[...Array(e[0].dims.length).keys()]),$e({starts:r,ends:n,axes:i})}else return t},Ca=(e,t,r,n,i)=>{let s=e;return e<0&&(s+=r[n[t]]),i[t]<0?Math.max(0,Math.min(s,r[n[t]]-1)):Math.max(0,Math.min(s,r[n[t]]))},jf=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${J("uniforms.input_shape","i",r.length)};
            let steps_i = ${J("uniforms.steps","i",r.length)};
            let signs_i = ${J("uniforms.signs","i",r.length)};
            let starts_i = ${J("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Kf=(e,t)=>{let r=e[0].dims,n=D.size(r),i=t.axes.length>0?D.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],s=Un(e,4);s.forEach(b=>b!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(i.length).fill(1));let a=t.starts.map((b,_)=>Ca(b,_,r,i,s)),o=t.ends.map((b,_)=>Ca(b,_,r,i,s));if(i.length!==a.length||i.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(i.length!==r.length)for(let b=0;b<r.length;++b)i.includes(b)||(a.splice(b,0,0),o.splice(b,0,r[b]),s.splice(b,0,1));let l=s.map(b=>Math.sign(b));s.forEach((b,_,E)=>{if(b<0){let S=(o[_]-a[_])/b,C=a[_],z=C+S*s[_];a[_]=z,o[_]=C,E[_]=-b}});let d=r.slice(0);i.forEach((b,_)=>{d[b]=Math.ceil((o[b]-a[b])/s[b])});let c={dims:d,dataType:e[0].dataType},f=Q("output",e[0].dataType,d.length),g=P("input",e[0].dataType,e[0].dims.length),$=D.size(d),w=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:s.length}],k=[{type:12,data:$},{type:12,data:a},{type:6,data:l},{type:12,data:s},...ee(e[0].dims,d)],T=b=>`
      ${b.registerUniforms(w).declareVariables(g,f)}
        ${jf(g,f,r)}
        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${a.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:k})}},E0=(e,t)=>{Ff(e.inputs,t);let r=Hf(e.inputs,t);e.compute(Kf(e.inputs,r),{inputs:[0]})},S0=e=>{let t=e.starts,r=e.ends,n=e.axes;return $e({starts:t,ends:r,axes:n})}}),Yf,Zf,I0,C0,wb=L(()=>{"use strict";ne(),ie(),Ie(),Qt(),se(),Yf=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Zf=(e,t)=>{let r=e.inputs[0],n=r.dims,i=D.size(n),s=n.length,a=D.normalizeAxis(t.axis,s),o=a<n.length-1,l,d=[];o?(d=Array.from({length:s},(x,y)=>y),d[a]=s-1,d[s-1]=a,l=e.compute(Ze(r,d),{inputs:[r],outputs:[-1]})[0]):l=r;let c=l.dims,f=c[s-1],g=i/f,$=Se(f),w=f/$,k=64;g===1&&(k=256);let T=(x,y)=>y===4?`max(max(${x}.x, ${x}.y), max(${x}.z, ${x}.w))`:y===2?`max(${x}.x, ${x}.y)`:y===3?`max(max(${x}.x, ${x}.y), ${x}.z)`:x,b=P("x",l.dataType,l.dims,$),_=Q("result",l.dataType,l.dims,$),E=b.type.value,S=Pe(l.dataType)==="f32"?`var threadMax = ${E}(-3.4028234663852886e+38f);`:`var threadMax = ${E}(-65504.0h);`,C=x=>`
      var<workgroup> rowMaxShared : ${E};
      var<workgroup> rowSumShared : ${E};
      var<workgroup> threadShared : array<${E}, ${k}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${E} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${E}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${x.registerUniform("packedCols","i32").declareVariables(b,_)}
      ${x.mainStart(k)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${k};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${S}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${E}(${T("threadShared[0]",$)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${E}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${E}(${Xt("threadShared[0]",$)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${E}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,z=e.compute({name:"Softmax",shaderCache:{hint:`${$};${k}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:l.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:w}]}),getShaderSource:C},{inputs:[l],outputs:[o?-1:0]})[0];o&&e.compute(Ze(z,d),{inputs:[z]})},I0=(e,t)=>{Yf(e.inputs),Zf(e,t)},C0=e=>$e({axis:e.axis})}),Aa,Xf,Qf,Jf,A0,$b=L(()=>{"use strict";ne(),ie(),se(),Aa=e=>Array.from(e.getBigInt64Array(),Number),Xf=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Aa(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Qf=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},Jf=(e,t)=>{let r=e[0].dims,n=t??Aa(e[1]),i=Qf(r,n),s=D.size(i),a=e[0].dataType,o=P("input",a,r.length),l=Q("output",a,i.length),d=c=>`
      const inputShape = ${o.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(o,l)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...ee(e[0].dims,i)]}),getShaderSource:d}},A0=e=>{Xf(e.inputs),e.compute(Jf(e.inputs),{inputs:[0]})}}),eh,th,z0,_b=L(()=>{"use strict";ne(),ie(),se(),eh=(e,t,r,n,i)=>{let s=Q("output_data",i,r.length,4),a=P("a_data",t[1].dataType,t[1].dims.length,4),o=P("b_data",t[2].dataType,t[2].dims.length,4),l=P("c_data",t[0].dataType,t[0].dims.length,4),d,c=(f,g,$)=>`select(${g}, ${f}, ${$})`;if(!n)d=s.setByOffset("global_idx",c(a.getByOffset("global_idx"),o.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let f=(g,$,w="")=>{let k=`a_data[index_a${$}][component_a${$}]`,T=`b_data[index_b${$}][component_b${$}]`,b=`bool(c_data[index_c${$}] & (0xffu << (component_c${$} * 8)))`;return`
            let output_indices${$} = ${s.offsetToIndices(`global_idx * 4u + ${$}u`)};
            let offset_a${$} = ${a.broadcastedIndicesToOffset(`output_indices${$}`,s)};
            let offset_b${$} = ${o.broadcastedIndicesToOffset(`output_indices${$}`,s)};
            let offset_c${$} = ${l.broadcastedIndicesToOffset(`output_indices${$}`,s)};
            let index_a${$} = offset_a${$} / 4u;
            let index_b${$} = offset_b${$} / 4u;
            let index_c${$} = offset_c${$} / 4u;
            let component_a${$} = offset_a${$} % 4u;
            let component_b${$} = offset_b${$} % 4u;
            let component_c${$} = offset_c${$} % 4u;
            ${g}[${$}] = ${w}(${c(k,T,b)});
          `};i===9?d=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,a,o,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},th=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,i=e[1].dataType,s=!(D.areEqual(t,r)&&D.areEqual(r,n)),a=t,o=D.size(t);if(s){let d=Vr.calcShape(Vr.calcShape(t,r,!1),n,!1);if(!d)throw new Error("Can't perform where op on the given tensors");a=d,o=D.size(a)}let l=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>eh(d,e,a,s,i),getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:l},...ee(n,t,r,a)]})}},z0=e=>{e.compute(th(e.inputs))}}),O0,bb=L(()=>{"use strict";D_(),ho(),N_(),M_(),P_(),B_(),U_(),G_(),H_(),j_(),K_(),Y_(),Z_(),X_(),Q_(),J_(),eb(),tb(),rb(),nb(),ib(),sb(),ab(),ob(),ub(),lb(),Xg(),db(),pb(),cb(),fb(),hb(),fo(),mb(),r0(),gb(),yb(),wb(),e0(),$b(),Qt(),mo(),_b(),O0=new Map([["Abs",[vm]],["Acos",[xm]],["Acosh",[km]],["Add",[sg]],["ArgMax",[wm,Wa]],["ArgMin",[ym,Wa]],["Asin",[Tm]],["Asinh",[Em]],["Atan",[Sm]],["Atanh",[Im]],["Attention",[$m]],["AveragePool",[p0,d0]],["BatchNormalization",[_m]],["BiasAdd",[bm]],["BiasSplitGelu",[ig]],["Cast",[Am,Cm]],["Ceil",[Om]],["Clip",[zm]],["Concat",[mg,gg]],["Conv",[Ha,Fa]],["ConvTranspose",[Eg,Tg]],["Cos",[Rm]],["Cosh",[Dm]],["CumSum",[Sg,Ig]],["DepthToSpace",[Cg,Ag]],["DequantizeLinear",[w0,$0]],["DFT",[zg,Og]],["Div",[ag]],["Einsum",[Rg,Dg]],["Elu",[Nm,Gn]],["Equal",[og]],["Erf",[Mm]],["Exp",[Pm]],["Expand",[Ng]],["FastGelu",[Mg]],["Floor",[Bm]],["FusedConv",[Ha,Fa]],["Gather",[Bg,Pg]],["GatherElements",[Gg,qg]],["GatherBlockQuantized",[Lg,Vg]],["GatherND",[Ug,Wg]],["Gelu",[Um]],["Gemm",[Hg,Fg]],["GlobalAveragePool",[f0,c0]],["GlobalMaxPool",[y0,g0]],["Greater",[pg]],["GreaterOrEqual",[fg]],["GridSample",[jg,Kg]],["GroupQueryAttention",[n0]],["HardSigmoid",[jm,Hm]],["HardSwish",[Km]],["InstanceNormalization",[i0]],["LayerNormalization",[s0]],["LeakyRelu",[Wm,Gn]],["Less",[cg]],["LessOrEqual",[hg]],["Log",[rg]],["MatMul",[a0]],["MatMulNBits",[o0,u0]],["MaxPool",[h0,m0]],["Mul",[ug]],["MultiHeadAttention",[Zg,Yg]],["Neg",[Vm]],["Not",[Lm]],["Pad",[l0]],["Pow",[lg]],["QuickGelu",[ng,Gn]],["Range",[_0]],["Reciprocal",[qm]],["ReduceMin",[cm]],["ReduceMean",[om]],["ReduceMax",[pm]],["ReduceSum",[hm]],["ReduceProd",[fm]],["ReduceL1",[um]],["ReduceL2",[lm]],["ReduceLogSum",[gm]],["ReduceLogSumExp",[dm]],["ReduceSumSquare",[mm]],["Relu",[Gm]],["Resize",[x0,k0]],["RotaryEmbedding",[t0]],["ScatterND",[v0,b0]],["Sigmoid",[Fm]],["Sin",[Ym]],["Sinh",[Zm]],["Slice",[E0,S0]],["SkipLayerNormalization",[T0]],["Split",[Qg,Jg]],["Sqrt",[Xm]],["Softmax",[I0,C0]],["Sub",[dg]],["Tan",[Qm]],["Tanh",[Jm]],["ThresholdedRelu",[tg,Gn]],["Tile",[A0]],["Transpose",[Yh,Zh]],["Where",[z0]]])}),R0,vb=L(()=>{"use strict";Xe(),Dt(),se(),R0=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,n,i){nt(e.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let d of t)o.push({binding:o.length,resource:{buffer:d.buffer}});for(let d of r)o.push({binding:o.length,resource:{buffer:d.buffer}});i&&o.push({binding:o.length,resource:i});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:n};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}a.setPipeline(e.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...n),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ye(e.programInfo.name)}dispose(){}build(e,t){nt(e.name);let r=this.backend.device,n=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{r.features.has(d.feature)&&n.push(`enable ${d.extension};`)});let i=Kh(t,this.backend.device.limits),s=e.getShaderSource(i),a=`${n.join(`
`)}
${i.additionalImplementations}
${s}`,o=r.createShaderModule({code:a,label:e.name});ce("verbose",()=>`[WebGPU] ${e.name} shader code: ${a}`);let l=r.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return Ye(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,n=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&r<=i&&n<=i)return[t,r,n];let s=t*r*n,a=Math.ceil(Math.sqrt(s));if(a>i){if(a=Math.ceil(Math.cbrt(s)),a>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}}),D0={};Gr(D0,{WebGpuBackend:()=>N0});var rh,nh,ih,N0,xb=L(()=>{"use strict";Xe(),ne(),Dt(),qh(),O_(),bb(),vb(),rh=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let i=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${i}`);break}case"rank":{let s=e[n].dims.length;r.push(`${i};${s}`);break}case"dims":{let s=e[n].dims.join(",");r.push(`${i};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},nh=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${rh(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},ih=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},N0=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],n={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},i=o=>t.features.has(o)&&r.push(o)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await t.requestDevice(n);let s=t,a=t.info??(typeof s.requestAdapterInfo=="function"?await s.requestAdapterInfo():void 0);this.adapterInfo=new ih(a),this.gpuDataManager=Hh(this),this.programManager=new R0(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,uo(e.logLevel,!!e.debug),this.device.onuncapturederror=o=>{o.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${o.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;nt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let n=0;n<t.length/2;n++){let i=r[n],s=i.kernelId,a=this.kernels.get(s),o=a.kernelType,l=a.kernelName,d=i.programName,c=i.inputTensorViews,f=i.outputTensorViews,g=t[n*2],$=t[n*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let w=Number(g-this.queryTimeBase),k=Number($-this.queryTimeBase);if(!Number.isSafeInteger(w)||!Number.isSafeInteger(k))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(T=>({dims:T.dims,dataType:Rt(T.dataType)})),outputsMetadata:f.map(T=>({dims:T.dims,dataType:Rt(T.dataType)})),kernelId:s,kernelType:o,kernelName:l,programName:d,startTime:w,endTime:k});else{let T="";c.forEach((_,E)=>{T+=`input[${E}]: [${_.dims}] | ${Rt(_.dataType)}, `});let b="";f.forEach((_,E)=>{b+=`output[${E}]: [${_.dims}] | ${Rt(_.dataType)}, `}),console.log(`[profiling] kernel "${s}|${o}|${l}|${d}" ${T}${b}start time: ${w} ns, execution time: ${k-w} ns`)}Di("GPU",`${d}::${g}::${$}`)}e.unmap(),this.pendingQueries.delete(e)}),Ye()}run(e,t,r,n,i,s){nt(e.name);let a=[];for(let _=0;_<t.length;++_){let E=t[_].data;if(E===0)continue;let S=this.gpuDataManager.get(E);if(!S)throw new Error(`no GPU data for input: ${E}`);a.push(S)}let{outputs:o,dispatchGroup:l,programUniforms:d}=e.getRunData(t),c=r.length===0?o.map((_,E)=>E):r;if(c.length!==o.length)throw new Error(`Output size ${c.length} must be equal to ${o.length}.`);let f=[],g=[];for(let _=0;_<o.length;++_){if(!Number.isInteger(c[_])||c[_]<-3||c[_]>=s)throw new Error(`Invalid output index: ${c[_]}`);if(c[_]===-3)continue;let E=c[_]===-1,S=c[_]===-2,C=E||S?i(o[_].dataType,o[_].dims):n(c[_],o[_].dataType,o[_].dims);if(f.push(C),C.data===0)continue;let z=this.gpuDataManager.get(C.data);if(!z)throw new Error(`no GPU data for output: ${C.data}`);if(E&&this.temporaryData.push(z),S){let x=this.kernelPersistentData.get(this.currentKernelId);x||(x=[],this.kernelPersistentData.set(this.currentKernelId,x)),x.push(z)}g.push(z)}if(a.length!==t.length||g.length!==f.length){if(g.length===0)return Ye(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let $;if(d){let _=0,E=[];d.forEach(x=>{let y=typeof x.data=="number"?[x.data]:x.data;if(y.length===0)return;let A=x.type===10?2:4,N,U;x.type===10?(U=y.length>4?16:y.length>2?8:y.length*A,N=y.length>4?16:A*y.length):(U=y.length<=2?y.length*A:16,N=16),_=Math.ceil(_/U)*U,E.push(_);let V=x.type===10?8:4;_+=y.length>4?Math.ceil(y.length/V)*N:y.length*A});let S=16;_=Math.ceil(_/S)*S;let C=new ArrayBuffer(_);d.forEach((x,y)=>{let A=E[y],N=typeof x.data=="number"?[x.data]:x.data;if(x.type===6)new Int32Array(C,A,N.length).set(N);else if(x.type===12)new Uint32Array(C,A,N.length).set(N);else if(x.type===10)new Uint16Array(C,A,N.length).set(N);else if(x.type===1)new Float32Array(C,A,N.length).set(N);else throw new Error(`Unsupported uniform type: ${Rt(x.type)}`)});let z=this.gpuDataManager.create(_,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(z.buffer,0,C,0,_),this.gpuDataManager.release(z.id),$={offset:0,size:_,buffer:z.buffer}}let w=this.programManager.normalizeDispatchGroupSize(l),k=w[1]===1&&w[2]===1,T=nh(e,t,k),b=this.programManager.getArtifact(T);if(b||(b=this.programManager.build(e,w),this.programManager.setArtifact(T,b),ce("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),d&&b.uniformVariablesInfo){if(d.length!==b.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${b.uniformVariablesInfo.length}, got ${d.length} in program "${b.programInfo.name}".`);for(let _=0;_<d.length;_++){let E=d[_],S=E.type,C=typeof E.data=="number"?1:E.data.length,[z,x]=b.uniformVariablesInfo[_];if(S!==z||C!==x)throw new Error(`Uniform variable ${_} mismatch: expect type ${z} with size ${x}, got type ${S} with size ${C} in program "${b.programInfo.name}".`)}}if(ce("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let _={kernelId:this.currentKernelId,programName:b.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push(_),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(_)}return this.programManager.run(b,a,g,w,$),Ye(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,n){let i=O0.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:n,kernelEntry:i[0],attributes:[i[1],r]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let n=this.kernels.get(e);if(!n)throw new Error(`kernel not created: ${e}`);let i=n.kernelType,s=n.kernelName,a=n.kernelEntry,o=n.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),ce("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(t,o[1]),0}catch(d){return r.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${d}`)),1}finally{l&&r.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${i}] ${s}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,n){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let s=i.get(t),a=this.gpuDataManager.registerExternalBuffer(r,n,s);return i.set(t,[a,r]),a}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let n=await Pa(this,e,t);return lo(n.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ce("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ce("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ce("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let n=0;n<r;n++){let i=this.getComputePassEncoder(),s=e[n];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[n]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),M0={};Gr(M0,{init:()=>P0});var Ci,sh,P0,kb=L(()=>{"use strict";ne(),Dt(),ie(),z_(),Ci=class B0{constructor(t,r,n,i){this.module=t,this.dataType=r,this.data=n,this.dims=i}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=D.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=D.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=D.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=D.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(D.size(t)!==D.size(this.dims))throw new Error("Invalid new shape");return new B0(this.module,this.dataType,this.data,t)}},sh=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo,this.deviceLimits=t.device.limits;let n=e.PTR_SIZE,i=r/e.PTR_SIZE,s=n===4?"i32":"i64";this.opKernelContext=Number(e.getValue(n*i++,s));let a=Number(e.getValue(n*i++,s));this.outputCount=Number(e.getValue(n*i++,s)),this.customDataOffset=Number(e.getValue(n*i++,"*")),this.customDataSize=Number(e.getValue(n*i++,s));let o=[];for(let l=0;l<a;l++){let d=Number(e.getValue(n*i++,s)),c=Number(e.getValue(n*i++,"*")),f=Number(e.getValue(n*i++,s)),g=[];for(let $=0;$<f;$++)g.push(Number(e.getValue(n*i++,s)));o.push(new Ci(e,d,c,g))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,n=t?.outputs??[],i=(a,o,l)=>new Ci(this.module,o,this.output(a,l),l),s=(a,o)=>{let l=$r(a,o);if(!l)throw new Error(`Unsupported data type: ${a}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new Ci(this.module,a,d,o)};return this.backend.run(e,r,n,i,s,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let n=this.module.PTR_SIZE,i=n===4?"i32":"i64",s=this.module.stackAlloc((1+t.length)*n);this.module.setValue(s,t.length,i);for(let a=0;a<t.length;a++)this.module.setValue(s+n*(a+1),t[a],i);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(n){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${n}`)}finally{this.module.stackRestore(r)}}},P0=async(e,t,r,n)=>{let i=t.jsepInit;if(!i)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=(xb(),jn(D0)).WebGpuBackend,a=new s;await a.initialize(r,n),i("webgpu",[a,o=>a.alloc(Number(o)),o=>a.free(o),(o,l,d,c=!1)=>{if(c)ce("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(l)}, size=${Number(d)}`),a.memcpy(Number(o),Number(l));else{ce("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let f=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));a.upload(Number(l),f)}},async(o,l,d)=>{ce("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${l}, size=${d}`),await a.download(Number(o),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(o,l,d)=>a.createKernel(o,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),o=>a.releaseKernel(o),(o,l,d,c)=>{ce("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${l}`);let f=new sh(t,a,Number(l));return a.computeKernel(Number(o),f,c)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let s=new Fh(r);i("webnn",[s,()=>s.reserveTensorId(),a=>s.releaseTensorId(a),async(a,o,l,d,c)=>s.ensureTensor(a,o,l,d,c),(a,o)=>{s.uploadTensor(a,o)},async(a,o)=>s.downloadTensor(a,o),(a,o)=>s.registerMLContext(a,o),!!r.trace])}}}),ah,bo,vo,Yt,oh,za,Li,xo,ko,Wn,uh,hr,U0,W0,Oa,To,Eo,So,L0=L(()=>{"use strict";Xe(),I_(),C_(),ne(),Tr(),io(),oo(),ah=(e,t)=>{we()._OrtInit(e,t)!==0&&me("Can't initialize onnxruntime.")},bo=async e=>{ah(e.wasm.numThreads,Mi(e.logLevel))},vo=async(e,t)=>{we().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let n=e.webgpu.powerPreference;if(n!==void 0&&n!=="low-power"&&n!=="high-performance")throw new Error(`Invalid powerPreference setting: "${n}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:n,forceFallbackAdapter:i}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let n=(kb(),jn(M0)).init;t==="webgpu"&&await n("webgpu",we(),e,r),t==="webnn"&&await n("webnn",we(),e)}},Yt=new Map,oh=e=>{let t=we(),r=t.stackSave();try{let n=t.PTR_SIZE,i=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,i,i+n)!==0&&me("Can't get session input/output count.");let s=n===4?"i32":"i64";return[Number(t.getValue(i,s)),Number(t.getValue(i+n,s))]}finally{t.stackRestore(r)}},za=(e,t)=>{let r=we(),n=r.stackSave(),i=0;try{let s=r.PTR_SIZE,a=r.stackAlloc(2*s);r._OrtGetInputOutputMetadata(e,t,a,a+s)!==0&&me("Can't get session input/output metadata.");let o=Number(r.getValue(a,"*"));i=Number(r.getValue(a+s,"*"));let l=r.HEAP32[i/4];if(l===0)return[o,0];let d=r.HEAPU32[i/4+1],c=[];for(let f=0;f<d;f++){let g=Number(r.getValue(i+8+f*s,"*"));c.push(g!==0?r.UTF8ToString(g):Number(r.getValue(i+8+(f+d)*s,"*")))}return[o,l,c]}finally{r.stackRestore(n),i!==0&&r._OrtFree(i)}},Li=e=>{let t=we(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},xo=async(e,t)=>{let r,n,i=we();Array.isArray(e)?[r,n]=e:e.buffer===i.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=Li(e);let s=0,a=0,o=0,l=[],d=[],c=[];try{if([a,l]=await Uh(t),t?.externalData&&i.mountExternalData){let S=[];for(let C of t.externalData){let z=typeof C=="string"?C:C.path,x=typeof C=="string"?C:C.data;S.push(qi(x).then(y=>{i.mountExternalData(z,y)}))}await Promise.all(S)}for(let S of t?.executionProviders??[])if((typeof S=="string"?S:S.name)==="webnn"){if(i.shouldTransferToMLTensor=!1,typeof S!="string"){let C=S,z=C?.context,x=C?.gpuDevice,y=C?.deviceType,A=C?.powerPreference;z?i.currentContext=z:x?i.currentContext=await i.webnnCreateMLContext(x):i.currentContext=await i.webnnCreateMLContext({deviceType:y,powerPreference:A})}else i.currentContext=await i.webnnCreateMLContext();break}s=await i._OrtCreateSession(r,n,a),i.webgpuOnCreateSession?.(s),s===0&&me("Can't create a session."),i.jsepOnCreateSession?.(),i.currentContext&&(i.webnnRegisterMLContext(s,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[f,g]=oh(s),$=!!t?.enableGraphCapture,w=[],k=[],T=[],b=[],_=[];for(let S=0;S<f;S++){let[C,z,x]=za(s,S);C===0&&me("Can't get an input name."),d.push(C);let y=i.UTF8ToString(C);w.push(y),T.push(z===0?{name:y,isTensor:!1}:{name:y,isTensor:!0,type:Rt(z),shape:x})}for(let S=0;S<g;S++){let[C,z,x]=za(s,S+f);C===0&&me("Can't get an output name."),c.push(C);let y=i.UTF8ToString(C);k.push(y),b.push(z===0?{name:y,isTensor:!1}:{name:y,isTensor:!0,type:Rt(z),shape:x});{if($&&t?.preferredOutputLocation===void 0){_.push("gpu-buffer");continue}let A=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[y]??"cpu",N=i.webnnIsGraphOutput;if(A==="cpu"&&N&&N(s,y)){_.push("ml-tensor-cpu-output");continue}if(A!=="cpu"&&A!=="cpu-pinned"&&A!=="gpu-buffer"&&A!=="ml-tensor")throw new Error(`Not supported preferred output location: ${A}.`);if($&&A!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${A}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push(A)}}let E=null;return _.some(S=>S==="gpu-buffer"||S==="ml-tensor"||S==="ml-tensor-cpu-output")&&(o=i._OrtCreateBinding(s),o===0&&me("Can't create IO binding."),E={handle:o,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(S=>S==="ml-tensor-cpu-output"?"ml-tensor":S).map(S=>Ma(S))}),Yt.set(s,[s,d,c,E,$,!1]),[s,w,k,T,b]}catch(f){throw d.forEach(g=>i._OrtFree(g)),c.forEach(g=>i._OrtFree(g)),o!==0&&i._OrtReleaseBinding(o)!==0&&me("Can't release IO binding."),s!==0&&i._OrtReleaseSession(s)!==0&&me("Can't release session."),f}finally{i._free(r),a!==0&&i._OrtReleaseSessionOptions(a)!==0&&me("Can't release session options."),l.forEach(f=>i._free(f)),i.unmountExternalData?.()}},ko=e=>{let t=we(),r=Yt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,i,s,a,o]=r;a&&(o&&t._OrtClearBoundOutputs(a.handle)!==0&&me("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&me("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),i.forEach(l=>t._OrtFree(l)),s.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(n)!==0&&me("Can't release session."),Yt.delete(e)},Wn=new Map,uh=1,hr=new Map,U0=e=>{let t=we(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a LoRA adapter. failed to allocate a buffer of size ${e.byteLength}.`);try{t.HEAPU8.set(e,r);let n=t._OrtCreateLoraAdapter(r,e.byteLength);n===0&&me("Can't create a LoRA adapter.");let i=uh++;return Wn.set(i,n),i}finally{t._free(r)}},W0=e=>{let t=we(),r=Wn.get(e);if(r===void 0)throw new Error(`cannot release LoRA adapter. invalid adapter id: ${e}`);if(hr.has(e))throw new Error(`cannot release LoRA adapter. the adapter is used by a run in progress. adapter id: ${e}`);t._OrtReleaseLoraAdapter(r)!==0&&me("Can't release LoRA adapter."),Wn.delete(e)},Oa=async(e,t,r,n,i,s,a=!1)=>{if(!e){t.push(0);return}let o=we(),l=o.PTR_SIZE,d=e[0],c=e[1],f=e[3],g=f,$,w;if(d==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let b=e[2].gpuBuffer;w=$r(wr(d),c);{let _=o.jsepRegisterBuffer;if(!_)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');$=_(n,s,b,w)}}else if(f==="ml-tensor"){let b=e[2].mlTensor;w=$r(wr(d),c);let _=o.webnnRegisterMLTensor;if(!_)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');$=_(n,b,wr(d),c)}else{let b=e[2];if(Array.isArray(b)){w=l*b.length,$=o._malloc(w),r.push($);for(let _=0;_<b.length;_++){if(typeof b[_]!="string")throw new TypeError(`tensor data at index ${_} is not a string`);o.setValue($+_*l,ct(b[_],r),"*")}}else{let _=o.webnnIsGraphInput,E=o.webnnIsGraphOutput;if(d!=="string"&&_&&E){let S=o.UTF8ToString(i);if(_(n,S)||E(n,S)){let C=wr(d);w=$r(C,c),g="ml-tensor";let z=o.webnnCreateTemporaryTensor,x=o.webnnUploadTensor;if(!z||!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let y=await z(n,C,c);x(y,new Uint8Array(b.buffer,b.byteOffset,b.byteLength)),$=y}else w=b.byteLength,$=o._malloc(w),r.push($),o.HEAPU8.set(new Uint8Array(b.buffer,b.byteOffset,w),$)}else w=b.byteLength,$=o._malloc(w),r.push($),o.HEAPU8.set(new Uint8Array(b.buffer,b.byteOffset,w),$)}}let k=o.stackSave(),T=o.stackAlloc(4*c.length);try{c.forEach((_,E)=>o.setValue(T+E*l,_,l===4?"i32":"i64"));let b=o._OrtCreateTensor(wr(d),$,w,T,c.length,Ma(g));b===0&&me(`Can't create tensor for input/output. session=${n}, index=${s}.`),t.push(b)}finally{o.stackRestore(k)}},To=async(e,t,r,n,i,s,a=[])=>{let o=we(),l=o.PTR_SIZE,d=Yt.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let c=d[0],f=d[1],g=d[2],$=d[3],w=d[4],k=d[5],T=[];if(a.length>0){if($)throw new Error("LoRA adapters are not supported for a session that uses IO binding, e.g. when an output is preferred to be on GPU, or when the WebNN execution provider produces an output.");for(let Y of a){let O=Wn.get(Y);if(O===void 0)throw new Error(`cannot run inference. invalid LoRA adapter id: ${Y}`);T.push(O)}}let b=t.length,_=n.length,E=0,S=[],C=[],z=[],x=[],y=[],A=o.stackSave(),N=o.stackAlloc(b*l),U=o.stackAlloc(b*l),V=o.stackAlloc(_*l),H=o.stackAlloc(_*l);try{for(let q of a)hr.set(q,(hr.get(q)??0)+1);[E,S]=Bh(s,T),_r("wasm prepareInputOutputTensor");for(let q=0;q<b;q++)await Oa(r[q],C,x,e,f[t[q]],t[q],w);for(let q=0;q<_;q++)await Oa(i[q],z,x,e,g[n[q]],b+n[q],w);br("wasm prepareInputOutputTensor");for(let q=0;q<b;q++)o.setValue(N+q*l,C[q],"*"),o.setValue(U+q*l,f[t[q]],"*");for(let q=0;q<_;q++)o.setValue(V+q*l,z[q],"*"),o.setValue(H+q*l,g[n[q]],"*");if($&&!k){let{handle:q,outputPreferredLocations:oe,outputPreferredLocationsEncoded:te}=$;if(f.length!==b)throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${f.length}).`);_r("wasm bindInputsOutputs");for(let re=0;re<b;re++){let W=t[re];await o._OrtBindInput(q,f[W],C[re])!==0&&me(`Can't bind input[${re}] for session=${e}.`)}for(let re=0;re<_;re++){let W=n[re];i[re]?.[3]?(y.push(z[re]),o._OrtBindOutput(q,g[W],z[re],0)!==0&&me(`Can't bind pre-allocated output[${re}] for session=${e}.`)):o._OrtBindOutput(q,g[W],0,te[W])!==0&&me(`Can't bind output[${re}] to ${oe[re]} for session=${e}.`)}br("wasm bindInputsOutputs"),Yt.set(e,[c,f,g,$,w,!0])}o.jsepOnRunStart?.(c),o.webnnOnRunStart?.(c);let Y;$?Y=await o._OrtRunWithBinding(c,$.handle,_,V,E):Y=await o._OrtRun(c,U,N,b,H,_,V,E),Y!==0&&me("failed to call OrtRun().");let O=[],G=[];_r("wasm ProcessOutputTensor");for(let q=0;q<_;q++){let oe=Number(o.getValue(V+q*l,"*"));if(oe===z[q]||y.includes(z[q])){O.push(i[q]),oe!==z[q]&&o._OrtReleaseTensor(oe)!==0&&me("Can't release tensor.");continue}let te=o.stackSave(),re=o.stackAlloc(4*l),W=!1,B,K=0;try{o._OrtGetTensorData(oe,re,re+l,re+2*l,re+3*l)!==0&&me(`Can't access output tensor data on index ${q}.`);let j=l===4?"i32":"i64",ve=Number(o.getValue(re,j));K=o.getValue(re+l,"*");let it=o.getValue(re+l*2,"*"),Le=Number(o.getValue(re+l*3,j)),ze=[];for(let Ce=0;Ce<Le;Ce++)ze.push(Number(o.getValue(it+Ce*l,j)));o._OrtFree(it)!==0&&me("Can't free memory for tensor dims.");let Oe=ze.reduce((Ce,ke)=>Ce*ke,1);B=Rt(ve);let Nt=$?.outputPreferredLocations[n[q]];if(B==="string"){if(Nt==="gpu-buffer"||Nt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ce=[];for(let ke=0;ke<Oe;ke++){let Qe=o.getValue(K+ke*l,"*"),ft=o.getValue(K+(ke+1)*l,"*"),xe=ke===Oe-1?void 0:ft-Qe;Ce.push(o.UTF8ToString(Qe,xe))}O.push([B,ze,Ce,"cpu"])}else if(Nt==="gpu-buffer"&&Oe>0){let Ce=o.jsepGetBuffer;if(!Ce)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ke=Ce(K),Qe=$r(ve,Oe);if(Qe===void 0||!so(B))throw new Error(`Unsupported data type: ${B}`);W=!0,O.push([B,ze,{gpuBuffer:ke,download:o.jsepCreateDownloader(ke,Qe,B),dispose:()=>{o._OrtReleaseTensor(oe)!==0&&me("Can't release tensor.")}},"gpu-buffer"])}else if(Nt==="ml-tensor"&&Oe>0){let Ce=o.webnnEnsureTensor,ke=o.webnnIsGraphInputOutputTypeSupported;if(!Ce||!ke)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if($r(ve,Oe)===void 0||!ao(B))throw new Error(`Unsupported data type: ${B}`);if(!ke(e,B,!1))throw new Error(`preferredLocation "ml-tensor" for ${B} output is not supported by current WebNN Context.`);let Qe=await Ce(e,K,ve,ze,!1);W=!0,O.push([B,ze,{mlTensor:Qe,download:o.webnnCreateMLTensorDownloader(K,B),dispose:()=>{o.webnnReleaseTensorId(K),o._OrtReleaseTensor(oe)}},"ml-tensor"])}else if(Nt==="ml-tensor-cpu-output"&&Oe>0){let Ce=o.webnnCreateMLTensorDownloader(K,B)(),ke=O.length;W=!0,G.push((async()=>{let Qe=[ke,await Ce];return o.webnnReleaseTensorId(K),o._OrtReleaseTensor(oe),Qe})()),O.push([B,ze,[],"cpu"])}else{let Ce=Vi(B),ke=new Ce(Oe);new Uint8Array(ke.buffer,ke.byteOffset,ke.byteLength).set(o.HEAPU8.subarray(K,K+ke.byteLength)),O.push([B,ze,ke,"cpu"])}}finally{o.stackRestore(te),B==="string"&&K&&o._free(K),W||o._OrtReleaseTensor(oe)}}$&&!w&&(o._OrtClearBoundOutputs($.handle)!==0&&me("Can't clear bound outputs."),Yt.set(e,[c,f,g,$,w,!1]));for(let[q,oe]of await Promise.all(G))O[q][2]=oe;return br("wasm ProcessOutputTensor"),O}finally{o.webnnOnRunEnd?.(c),o.stackRestore(A),C.forEach(Y=>o._OrtReleaseTensor(Y)),z.forEach(Y=>o._OrtReleaseTensor(Y)),x.forEach(Y=>o._free(Y)),E!==0&&o._OrtReleaseRunOptions(E),S.forEach(Y=>o._free(Y));for(let Y of a){let O=hr.get(Y)-1;O===0?hr.delete(Y):hr.set(Y,O)}}},Eo=e=>{let t=we(),r=Yt.get(e);if(!r)throw new Error("invalid session id");let n=r[0],i=t._OrtEndProfiling(n);i===0&&me("Can't get an profile file name."),t._OrtFree(i)},So=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}}),bt,rt,Ur,Ln,Vn,Ai,Ra,zi,mr,gr,lh,V0,q0,G0,F0,H0,j0,K0,Y0,Z0,Io=L(()=>{"use strict";Xe(),L0(),Tr(),ro(),oo(),bt=()=>!!_e.wasm.proxy&&typeof document<"u",Ur=!1,Ln=!1,Vn=!1,zi=new Map,mr=(e,t)=>{let r=zi.get(e);r?r.push(t):zi.set(e,[t])},gr=()=>{if(Ur||!Ln||Vn||!rt)throw new Error("worker not ready")},lh=e=>{switch(e.data.type){case"init-wasm":Ur=!1,e.data.err?(Vn=!0,Ra[1](e.data.err)):(Ln=!0,Ra[0]()),Ai&&(URL.revokeObjectURL(Ai),Ai=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=zi.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},V0=async()=>{if(!Ln){if(Ur)throw new Error("multiple calls to 'initWasm()' detected.");if(Vn)throw new Error("previous call to 'initWasm()' failed.");if(Ur=!0,bt())return new Promise((e,t)=>{rt?.terminate(),Mh().then(([r,n])=>{try{rt=n,rt.onerror=s=>t(s),rt.onmessage=lh,Ra=[e,t];let i={type:"init-wasm",in:_e};!i.in.wasm.wasmPaths&&(r||Na)&&(i.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),rt.postMessage(i),Ai=r}catch(i){t(i)}},t)});try{await no(_e.wasm),await bo(_e),Ln=!0}catch(e){throw Vn=!0,e}finally{Ur=!1}}},q0=async e=>{if(bt())return gr(),new Promise((t,r)=>{mr("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:_e}};rt.postMessage(n)});await vo(_e,e)},G0=async e=>bt()?(gr(),new Promise((t,r)=>{mr("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};rt.postMessage(n,[e.buffer])})):Li(e),F0=async(e,t)=>{if(bt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return gr(),new Promise((r,n)=>{mr("create",[r,n]);let i={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),rt.postMessage(i,s)})}else return xo(e,t)},H0=async e=>{if(bt())return gr(),new Promise((t,r)=>{mr("release",[t,r]);let n={type:"release",in:e};rt.postMessage(n)});ko(e)},j0=async e=>{if(bt())throw new Error("LoRA adapter is not supported for proxy.");let t=typeof e=="string"?await qi(e):e;return U0(t)},K0=async e=>{if(bt())throw new Error("LoRA adapter is not supported for proxy.");W0(e)},Y0=async(e,t,r,n,i,s,a)=>{if(bt()){if(a.length>0)throw new Error("LoRA adapter is not supported for proxy.");if(r.some(o=>o[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(i.some(o=>o))throw new Error("pre-allocated output tensor is not supported for proxy.");return gr(),new Promise((o,l)=>{mr("run",[o,l]);let d=r,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:n,options:s}};rt.postMessage(c,So(d))})}else return To(e,t,r,n,i,s,a)},Z0=async e=>{if(bt())return gr(),new Promise((t,r)=>{mr("end-profiling",[t,r]);let n={type:"end-profiling",in:e};rt.postMessage(n)});Eo(e)}}),Co,X0=L(()=>{"use strict";Xe(),Io(),Co=class{async loadAdapter(e){nt(),this.adapterId=await j0(e),Ye()}async dispose(){return K0(this.adapterId)}}}),Da,dh,Q0,Tb=L(()=>{"use strict";Xe(),X0(),Io(),ne(),to(),oo(),Da=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},dh=e=>{switch(e[3]){case"cpu":return new Ge(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!so(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:i}=e[2];return Ge.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:i})}case"ml-tensor":{let t=e[0];if(!ao(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:i}=e[2];return Ge.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:i})}default:throw new Error(`invalid data location: ${e[3]}`)}},Q0=class{async fetchModelAndCopyToWasmMemory(e){return G0(await qi(e))}async loadModel(e,t){nt();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await F0(r,t),Ye()}async dispose(){return H0(this.sessionId)}async run(e,t,r,n=[]){nt();let i=n.map($=>{if(!($ instanceof Co))throw new Error("LoRA adapter was not created by the WebAssembly backend.");return $.adapterId}),s=[],a=[];Object.entries(e).forEach($=>{let w=$[0],k=$[1],T=this.inputNames.indexOf(w);if(T===-1)throw new Error(`invalid input '${w}'`);s.push(k),a.push(T)});let o=[],l=[];Object.entries(t).forEach($=>{let w=$[0],k=$[1],T=this.outputNames.indexOf(w);if(T===-1)throw new Error(`invalid output '${w}'`);o.push(k),l.push(T)});let d=s.map(($,w)=>Da($,()=>`input "${this.inputNames[a[w]]}"`)),c=o.map(($,w)=>$?Da($,()=>`output "${this.outputNames[l[w]]}"`):null),f=await Y0(this.sessionId,a,d,l,c,r,i),g={};for(let $=0;$<f.length;$++)g[this.outputNames[l[$]]]=o[$]??dh(f[$]);return Ye(),g}startProfiling(){}endProfiling(){Z0(this.sessionId)}}}),J0,Eb=L(()=>{"use strict";J0=e=>{if(e?.epContextDataRead)throw new Error('session option "epContextDataRead" is not supported by ONNX Runtime Web')}}),ey={};Gr(ey,{OnnxruntimeWebAssemblyBackend:()=>Ya,initializeFlags:()=>Ka,wasmBackend:()=>ty});var Ka,Ya,ty,Sb=L(()=>{"use strict";Xe(),X0(),Io(),Tb(),Eb(),Ka=()=>{(typeof _e.wasm.initTimeout!="number"||_e.wasm.initTimeout<0)&&(_e.wasm.initTimeout=0);let e=_e.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),_e.wasm.simd=!1),typeof _e.wasm.proxy!="boolean"&&(_e.wasm.proxy=!1),typeof _e.wasm.trace!="boolean"&&(_e.wasm.trace=!1),typeof _e.wasm.numThreads!="number"||!Number.isInteger(_e.wasm.numThreads)||_e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)_e.wasm.numThreads=1;else{let t=typeof navigator>"u"?l_("node:os").cpus().length:navigator.hardwareConcurrency;_e.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Ya=class{async init(e){Ka(),await V0(),await q0(e)}async createInferenceSessionHandler(e,t){J0(t);let r=new Q0;return await r.loadModel(e,t),r}async createLoraAdapterHandler(e){let t=new Co;return await t.loadAdapter(e),t}},ty=new Ya});Xe();Xe();Xe();var Ib="1.31.1";{let e=(Sb(),jn(ey)).wasmBackend;Wr("webgpu",e,5),Wr("webnn",e,5),Wr("cpu",e,10),Wr("wasm",e,10)}Object.defineProperty(_e.versions,"web",{value:Ib,enumerable:!0});var ny=1,Cb=0;async function Ab(e){let t=await fetch(e);if(!t.ok)throw new Error(`fetch ${e}: ${t.status}`);return new Uint8Array(await t.arrayBuffer())}var Fr=class{constructor(t={}){this.options=t}options;id="ort-custom";enc;dec;tok;maxIn=63;maxOut=39;async load(t){let r=this.options.fetchBytes??Ab,n=t.manifest;if(!n)throw new Error("manifest required");let i=`${t.baseUrl.replace(/\/$/,"")}/${n.dir??""}`.replace(/\/$/,"");this.options.numThreads!==void 0&&(_e.wasm.numThreads=this.options.numThreads),this.options.wasmPaths&&(_e.wasm.wasmPaths=this.options.wasmPaths);let a={executionProviders:t.backend==="webgpu"?["webgpu","wasm"]:["wasm"],graphOptimizationLevel:"all"},[o,l,d]=await Promise.all([r(`${i}/${n.files.encoder}`),r(`${i}/${n.files.decoder}`),r(`${i}/${n.files.tokenizer}`)]);t.onProgress?.(.6),this.tok=new zn(JSON.parse(new TextDecoder().decode(d))),this.enc=await Yn.create(o,a),this.dec=await Yn.create(l,a);let c=n.config??{};this.maxIn=Number(c.max_input_tokens??63),this.maxOut=Number(c.max_output_tokens??39),t.onProgress?.(1)}async predict(t,r){let n=performance.now(),i=[...this.tok.encode(t).slice(0,this.maxIn),ny],s=new Ge("int64",BigInt64Array.from(i.map(BigInt)),[1,i.length]),a=new Ge("int64",BigInt64Array.from(i.map(()=>1n)),[1,i.length]),l=(await this.enc.run({input_ids:s,attention_mask:a})).last_hidden_state,d=[Cb];for(let c=0;c<this.maxOut;c++){if(r?.aborted)throw new DOMException("aborted","AbortError");let f=new Ge("int64",BigInt64Array.from(d.map(BigInt)),[1,d.length]),$=(await this.dec.run({input_ids:f,encoder_hidden_states:l,encoder_attention_mask:a})).logits,w=$.dims[2],k=$.data,T=(d.length-1)*w,b=0,_=-1/0;for(let E=0;E<w;E++){let S=k[T+E];S>_&&(_=S,b=E)}if(b===ny)break;d.push(b)}return{dsl:this.tok.decode(d.slice(1)),ms:performance.now()-n,outputTokens:d.length-1}}dispose(){this.enc?.release(),this.dec?.release()}};window.runBench=async e=>{_e.wasm.wasmPaths="/ort/",_e.wasm.numThreads=e.threads;let t=e.engine&&zs[e.engine]?zs[e.engine]:new Fr({numThreads:e.threads,wasmPaths:"/ort/"}),r={today:e.today},n=performance.now();await t.load({baseUrl:e.baseUrl,manifest:e.manifest,backend:e.backend});let i=performance.now()-n,s=await t.predict(e.rows[0].text,void 0,r),a=Math.min(5,e.rows.length);for(let c=0;c<a;c++)await t.predict(e.rows[c].text,void 0,r);let o=[],l=[],d=0;for(let c of e.rows){let f=await t.predict(c.text,void 0,r);o.push(f.ms),l.push(f.outputTokens??0),f.dsl===c.dsl&&d++}return t.dispose(),{loadMs:i,coldFirstMs:s.ms,lat:o,toks:l,ok:d,n:e.rows.length}};
/*! Bundled license information:

onnxruntime-web/dist/ort.bundle.min.mjs:
  (*!
   * ONNX Runtime Web v1.31.1
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)

onnxruntime-web/dist/ort.bundle.min.mjs:
  (**
   * @license
   * Copyright 2021 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2020 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2019 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
*/
