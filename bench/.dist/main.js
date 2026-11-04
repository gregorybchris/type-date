var mn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var ge;(function(e){e[e.AM=0]="AM",e[e.PM=1]="PM"})(ge||(ge={}));var ze;(function(e){e[e.SUNDAY=0]="SUNDAY",e[e.MONDAY=1]="MONDAY",e[e.TUESDAY=2]="TUESDAY",e[e.WEDNESDAY=3]="WEDNESDAY",e[e.THURSDAY=4]="THURSDAY",e[e.FRIDAY=5]="FRIDAY",e[e.SATURDAY=6]="SATURDAY"})(ze||(ze={}));var Xe;(function(e){e[e.JANUARY=1]="JANUARY",e[e.FEBRUARY=2]="FEBRUARY",e[e.MARCH=3]="MARCH",e[e.APRIL=4]="APRIL",e[e.MAY=5]="MAY",e[e.JUNE=6]="JUNE",e[e.JULY=7]="JULY",e[e.AUGUST=8]="AUGUST",e[e.SEPTEMBER=9]="SEPTEMBER",e[e.OCTOBER=10]="OCTOBER",e[e.NOVEMBER=11]="NOVEMBER",e[e.DECEMBER=12]="DECEMBER"})(Xe||(Xe={}));function ht(e,t){e.assign("day",t.getDate()),e.assign("month",t.getMonth()+1),e.assign("year",t.getFullYear())}function $i(e,t){e.assign("hour",t.getHours()),e.assign("minute",t.getMinutes()),e.assign("second",t.getSeconds()),e.assign("millisecond",t.getMilliseconds()),e.assign("meridiem",t.getHours()<12?ge.AM:ge.PM)}function Dt(e,t){e.imply("day",t.getDate()),e.imply("month",t.getMonth()+1),e.imply("year",t.getFullYear())}function or(e,t){e.imply("hour",t.getHours()),e.imply("minute",t.getMinutes()),e.imply("second",t.getSeconds()),e.imply("millisecond",t.getMilliseconds()),e.imply("meridiem",t.getHours()<12?ge.AM:ge.PM)}var e2={ACDT:630,ACST:570,ADT:-180,AEDT:660,AEST:600,AFT:270,AKDT:-480,AKST:-540,ALMT:360,AMST:-180,AMT:-240,ANAST:720,ANAT:720,AQTT:300,ART:-180,AST:-240,AWDT:540,AWST:480,AZOST:0,AZOT:-60,AZST:300,AZT:240,BNT:480,BOT:-240,BRST:-120,BRT:-180,BST:60,BTT:360,CAST:480,CAT:120,CCT:390,CDT:-300,CEST:120,CET:{timezoneOffsetDuringDst:120,timezoneOffsetNonDst:60,dstStart:e=>Kl(e,Xe.MARCH,ze.SUNDAY,2),dstEnd:e=>Kl(e,Xe.OCTOBER,ze.SUNDAY,3)},CHADT:825,CHAST:765,CKT:-600,CLST:-180,CLT:-240,COT:-300,CST:-360,CT:{timezoneOffsetDuringDst:-300,timezoneOffsetNonDst:-360,dstStart:e=>Jt(e,Xe.MARCH,ze.SUNDAY,2,2),dstEnd:e=>Jt(e,Xe.NOVEMBER,ze.SUNDAY,1,2)},CVT:-60,CXT:420,ChST:600,DAVT:420,EASST:-300,EAST:-360,EAT:180,ECT:-300,EDT:-240,EEST:180,EET:120,EGST:0,EGT:-60,EST:-300,ET:{timezoneOffsetDuringDst:-240,timezoneOffsetNonDst:-300,dstStart:e=>Jt(e,Xe.MARCH,ze.SUNDAY,2,2),dstEnd:e=>Jt(e,Xe.NOVEMBER,ze.SUNDAY,1,2)},FJST:780,FJT:720,FKST:-180,FKT:-240,FNT:-120,GALT:-360,GAMT:-540,GET:240,GFT:-180,GILT:720,GMT:0,GST:240,GYT:-240,HAA:-180,HAC:-300,HADT:-540,HAE:-240,HAP:-420,HAR:-360,HAST:-600,HAT:-90,HAY:-480,HKT:480,HLV:-210,HNA:-240,HNC:-360,HNE:-300,HNP:-480,HNR:-420,HNT:-150,HNY:-540,HOVT:420,ICT:420,IDT:180,IOT:360,IRDT:270,IRKST:540,IRKT:540,IRST:210,IST:330,JST:540,KGT:360,KRAST:480,KRAT:480,KST:540,KUYT:240,LHDT:660,LHST:630,LINT:840,MAGST:720,MAGT:720,MART:-510,MAWT:300,MDT:-360,MESZ:120,MEZ:60,MHT:720,MMT:390,MSD:240,MSK:180,MST:-420,MT:{timezoneOffsetDuringDst:-360,timezoneOffsetNonDst:-420,dstStart:e=>Jt(e,Xe.MARCH,ze.SUNDAY,2,2),dstEnd:e=>Jt(e,Xe.NOVEMBER,ze.SUNDAY,1,2)},MUT:240,MVT:300,MYT:480,NCT:660,NDT:-90,NFT:690,NOVST:420,NOVT:360,NPT:345,NST:-150,NUT:-660,NZDT:780,NZST:720,OMSST:420,OMST:420,PDT:-420,PET:-300,PETST:720,PETT:720,PGT:600,PHOT:780,PHT:480,PKT:300,PMDT:-120,PMST:-180,PONT:660,PST:-480,PT:{timezoneOffsetDuringDst:-420,timezoneOffsetNonDst:-480,dstStart:e=>Jt(e,Xe.MARCH,ze.SUNDAY,2,2),dstEnd:e=>Jt(e,Xe.NOVEMBER,ze.SUNDAY,1,2)},PWT:540,PYST:-180,PYT:-240,RET:240,SAMT:240,SAST:120,SBT:660,SCT:240,SGT:480,SRT:-180,SST:-660,TAHT:-600,TFT:300,TJT:300,TKT:780,TLT:540,TMT:300,TVT:720,ULAT:480,UTC:0,UYST:-120,UYT:-180,UZT:300,VET:-210,VLAST:660,VLAT:660,VUT:660,WAST:120,WAT:60,WEST:60,WESZ:60,WET:0,WEZ:0,WFT:720,WGST:-120,WGT:-180,WIB:420,WIT:540,WITA:480,WST:780,WT:0,YAKST:600,YAKT:600,YAPT:600,YEKST:360,YEKT:360};function Jt(e,t,n,r,i=0){let a=0,s=0;for(;s<r;)a++,new Date(e,t-1,a).getDay()===n&&s++;return new Date(e,t-1,a,i)}function Kl(e,t,n,r=0){let i=n===0?7:n,a=new Date(e,t-1+1,1,12),s=a.getDay()===0?7:a.getDay(),o;return s===i?o=7:s<i?o=7+s-i:o=s-i,a.setDate(a.getDate()-o),new Date(e,t-1,a.getDate(),r)}function vi(e,t,n={}){if(e==null)return null;if(typeof e=="number")return e;let r=n[e]??e2[e];return r==null?null:typeof r=="number"?r:t==null?null:t>r.dstStart(t.getFullYear())&&!(t>r.dstEnd(t.getFullYear()))?r.timezoneOffsetDuringDst:r.timezoneOffsetNonDst}var Yl={day:0,second:0,millisecond:0};function Fe(e,t){let n=new Date(e);if(t.y&&(t.year=t.y,delete t.y),t.mo&&(t.month=t.mo,delete t.mo),t.M&&(t.month=t.M,delete t.M),t.w&&(t.week=t.w,delete t.w),t.d&&(t.day=t.d,delete t.d),t.h&&(t.hour=t.h,delete t.h),t.m&&(t.minute=t.m,delete t.m),t.s&&(t.second=t.s,delete t.s),t.ms&&(t.millisecond=t.ms,delete t.ms),"year"in t){let r=Math.floor(t.year);n.setFullYear(n.getFullYear()+r);let i=t.year-r;i>0&&(t.month=t?.month??0,t.month+=i*12)}if("quarter"in t){let r=Math.floor(t.quarter);n.setMonth(n.getMonth()+r*3);let i=t.quarter-r;i>0&&(t.month=t?.month??0,t.month+=i*3)}if("month"in t){let r=Math.floor(t.month);n.setMonth(n.getMonth()+r);let i=t.month-r;i>0&&(t.week=t?.week??0,t.week+=i*4)}if("week"in t){let r=Math.floor(t.week);n.setDate(n.getDate()+r*7);let i=t.week-r;i>0&&(t.day=t?.day??0,t.day+=Math.round(i*7))}if("day"in t){let r=Math.floor(t.day);n.setDate(n.getDate()+r);let i=t.day-r;i>0&&(t.hour=t?.hour??0,t.hour+=Math.round(i*24))}if("hour"in t){let r=Math.floor(t.hour);n.setHours(n.getHours()+r);let i=t.hour-r;i>0&&(t.minute=t?.minute??0,t.minute+=Math.round(i*60))}if("minute"in t){let r=Math.floor(t.minute);n.setMinutes(n.getMinutes()+r);let i=t.minute-r;i>0&&(t.second=t?.second??0,t.second+=Math.round(i*60))}if("second"in t){let r=Math.floor(t.second);n.setSeconds(n.getSeconds()+r);let i=t.second-r;i>0&&(t.millisecond=t?.millisecond??0,t.millisecond+=Math.round(i*1e3))}if("millisecond"in t){let r=Math.floor(t.millisecond);n.setMilliseconds(n.getMilliseconds()+r)}return n}function en(e){let t={};for(let n in e)t[n]=-e[n];return t}var tn=class e{instant;timezoneOffset;constructor(t,n){this.instant=t??new Date,this.timezoneOffset=n??null}static fromDate(t){return new e(t)}static fromInput(t,n){if(t instanceof Date)return e.fromDate(t);let r=t?.instant??new Date,i=vi(t?.timezone,r,n);return new e(r,i)}getDateWithAdjustedTimezone(){let t=new Date(this.instant);return this.timezoneOffset!==null&&t.setMinutes(t.getMinutes()-this.getSystemTimezoneAdjustmentMinute(this.instant)),t}getSystemTimezoneAdjustmentMinute(t,n){t||(t=new Date);let r=-t.getTimezoneOffset(),i=n??this.timezoneOffset??r;return r-i}getTimezoneOffset(){return this.timezoneOffset??-this.instant.getTimezoneOffset()}},_e=class e{knownValues;impliedValues;reference;_tags=new Set;constructor(t,n){if(this.reference=t,this.knownValues={},this.impliedValues={},n)for(let i in n)this.knownValues[i]=n[i];let r=t.getDateWithAdjustedTimezone();this.imply("day",r.getDate()),this.imply("month",r.getMonth()+1),this.imply("year",r.getFullYear()),this.imply("hour",12),this.imply("minute",0),this.imply("second",0),this.imply("millisecond",0)}static createRelativeFromReference(t,n=Yl){let r=Fe(t.getDateWithAdjustedTimezone(),n),i=new e(t);return i.addTag("result/relativeDate"),"hour"in n||"minute"in n||"second"in n||"millisecond"in n?(i.addTag("result/relativeDateAndTime"),$i(i,r),ht(i,r),i.assign("timezoneOffset",t.getTimezoneOffset())):(or(i,r),i.imply("timezoneOffset",t.getTimezoneOffset()),"day"in n?(i.assign("day",r.getDate()),i.assign("month",r.getMonth()+1),i.assign("year",r.getFullYear()),i.assign("weekday",r.getDay())):"week"in n?(i.assign("day",r.getDate()),i.assign("month",r.getMonth()+1),i.assign("year",r.getFullYear()),i.imply("weekday",r.getDay())):(i.imply("day",r.getDate()),"month"in n?(i.assign("month",r.getMonth()+1),i.assign("year",r.getFullYear())):(i.imply("month",r.getMonth()+1),"year"in n?i.assign("year",r.getFullYear()):i.imply("year",r.getFullYear())))),i}get(t){return t in this.knownValues?this.knownValues[t]:t in this.impliedValues?this.impliedValues[t]:null}isCertain(t){return t in this.knownValues}getCertainComponents(){return Object.keys(this.knownValues)}imply(t,n){return t in this.knownValues?this:(this.impliedValues[t]=n,this)}assign(t,n){return this.knownValues[t]=n,delete this.impliedValues[t],this}addDurationAsImplied(t){let n=this.dateWithoutTimezoneAdjustment(),r=Fe(n,t);return("day"in t||"week"in t||"month"in t||"year"in t)&&(this.delete(["day","weekday","month","year"]),this.imply("day",r.getDate()),this.imply("weekday",r.getDay()),this.imply("month",r.getMonth()+1),this.imply("year",r.getFullYear())),("second"in t||"minute"in t||"hour"in t)&&(this.delete(["second","minute","hour"]),this.imply("second",r.getSeconds()),this.imply("minute",r.getMinutes()),this.imply("hour",r.getHours())),this}delete(t){typeof t=="string"&&(t=[t]);for(let n of t)delete this.knownValues[n],delete this.impliedValues[n]}clone(){let t=new e(this.reference);t.knownValues={},t.impliedValues={};for(let n in this.knownValues)t.knownValues[n]=this.knownValues[n];for(let n in this.impliedValues)t.impliedValues[n]=this.impliedValues[n];return t}isOnlyDate(){return!this.isCertain("hour")&&!this.isCertain("minute")&&!this.isCertain("second")}isOnlyTime(){return!this.isCertain("weekday")&&!this.isCertain("day")&&!this.isCertain("month")&&!this.isCertain("year")}isOnlyWeekdayComponent(){return this.isCertain("weekday")&&!this.isCertain("day")&&!this.isCertain("month")}isDateWithUnknownYear(){return this.isCertain("month")&&!this.isCertain("year")}isValidDate(){let t=new Date(Date.UTC(this.get("year"),this.get("month")-1,this.get("day"),this.get("hour"),this.get("minute"),this.get("second"),this.get("millisecond")));return t.setUTCFullYear(this.get("year")),!(t.getUTCFullYear()!==this.get("year")||t.getUTCMonth()!==this.get("month")-1||t.getUTCDate()!==this.get("day")||this.get("hour")!=null&&t.getUTCHours()!=this.get("hour")||this.get("minute")!=null&&t.getUTCMinutes()!=this.get("minute"))}toString(){return`[ParsingComponents {
            tags: ${JSON.stringify(Array.from(this._tags).sort())}, 
            knownValues: ${JSON.stringify(this.knownValues)}, 
            impliedValues: ${JSON.stringify(this.impliedValues)}}, 
            reference: ${JSON.stringify(this.reference)}]`}date(){let t=this.get("timezoneOffset")??this.reference.timezoneOffset;if(t==null)return this.dateWithoutTimezoneAdjustment();let n=new Date(Date.UTC(this.get("year"),this.get("month")-1,this.get("day"),this.get("hour"),this.get("minute"),this.get("second"),this.get("millisecond")));return n.setUTCFullYear(this.get("year")),new Date(n.getTime()-t*6e4)}addTag(t){return this._tags.add(t),this}addTags(t){for(let n of t)this._tags.add(n);return this}tags(){return new Set(this._tags)}dateWithoutTimezoneAdjustment(){let t=new Date(this.get("year"),this.get("month")-1,this.get("day"),this.get("hour"),this.get("minute"),this.get("second"),this.get("millisecond"));return t.setFullYear(this.get("year")),t}},Nt=class e{refDate;index;text;reference;start;end;constructor(t,n,r,i,a){this.reference=t,this.refDate=t.instant,this.index=n,this.text=r,this.start=i||new _e(t),this.end=a}clone(){let t=new e(this.reference,this.index,this.text);return t.start=this.start?this.start.clone():null,t.end=this.end?this.end.clone():null,t}date(){return this.start.date()}addTag(t){return this.start.addTag(t),this.end&&this.end.addTag(t),this}addTags(t){return this.start.addTags(t),this.end&&this.end.addTags(t),this}tags(){let t=new Set(this.start.tags());if(this.end)for(let n of this.end.tags())t.add(n);return t}toString(){let t=Array.from(this.tags()).sort();return`[ParsingResult {index: ${this.index}, text: '${this.text}', tags: ${JSON.stringify(t)} ...}]`}};function zs(e,t,n="\\s{0,5},?\\s{0,5}"){let r=t.replace(/\((?!\?)/g,"(?:");return`${e}${r}(?:${n}${r}){0,10}`}function t2(e){let t;return e instanceof Array?t=[...e]:e instanceof Map?t=Array.from(e.keys()):t=Object.keys(e),t}function We(e){return`(?:${t2(e).sort((n,r)=>r.length-n.length).join("|").replace(/\./g,"\\.")})`}function bi(e){return e<100&&(e>50?e=e+1900:e=e+2e3),e}function Et(e,t,n){let r=new Date(e);r.setMonth(n-1),r.setDate(t);let i=Fe(r,{year:1}),a=Fe(r,{year:-1});return Math.abs(i.getTime()-e.getTime())<Math.abs(r.getTime()-e.getTime())?r=i:Math.abs(a.getTime()-e.getTime())<Math.abs(r.getTime()-e.getTime())&&(r=a),r.getFullYear()}var _i={sunday:0,sun:0,"sun.":0,monday:1,mon:1,"mon.":1,tuesday:2,tue:2,"tue.":2,wednesday:3,wed:3,"wed.":3,thursday:4,thurs:4,"thurs.":4,thur:4,"thur.":4,thu:4,"thu.":4,friday:5,fri:5,"fri.":5,saturday:6,sat:6,"sat.":6},Ds={january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12},je={...Ds,jan:1,"jan.":1,feb:2,"feb.":2,mar:3,"mar.":3,apr:4,"apr.":4,jun:6,"jun.":6,jul:7,"jul.":7,aug:8,"aug.":8,sep:9,"sep.":9,sept:9,"sept.":9,oct:10,"oct.":10,nov:11,"nov.":11,dec:12,"dec.":12},Os={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12},Rs={first:1,second:2,third:3,fourth:4,fifth:5,sixth:6,seventh:7,eighth:8,ninth:9,tenth:10,eleventh:11,twelfth:12,thirteenth:13,fourteenth:14,fifteenth:15,sixteenth:16,seventeenth:17,eighteenth:18,nineteenth:19,twentieth:20,"twenty first":21,"twenty-first":21,"twenty second":22,"twenty-second":22,"twenty third":23,"twenty-third":23,"twenty fourth":24,"twenty-fourth":24,"twenty fifth":25,"twenty-fifth":25,"twenty sixth":26,"twenty-sixth":26,"twenty seventh":27,"twenty-seventh":27,"twenty eighth":28,"twenty-eighth":28,"twenty ninth":29,"twenty-ninth":29,thirtieth:30,"thirty first":31,"thirty-first":31},Xl={second:"second",seconds:"second",minute:"minute",minutes:"minute",hour:"hour",hours:"hour",day:"day",days:"day",week:"week",weeks:"week",month:"month",months:"month",quarter:"quarter",quarters:"quarter",year:"year",years:"year"},ur={s:"second",sec:"second",second:"second",seconds:"second",m:"minute",min:"minute",mins:"minute",minute:"minute",minutes:"minute",h:"hour",hr:"hour",hrs:"hour",hour:"hour",hours:"hour",d:"day",day:"day",days:"day",w:"week",week:"week",weeks:"week",mo:"month",mon:"month",mos:"month",month:"month",months:"month",qtr:"quarter",quarter:"quarter",quarters:"quarter",y:"year",yr:"year",year:"year",years:"year",...Xl},Ql=`(?:${We(Os)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}an?)?|an?\\b(?:\\s{0,2}few)?|few|several|the|a?\\s{0,2}couple\\s{0,2}(?:of)?)`;function n2(e){let t=e.toLowerCase();return Os[t]!==void 0?Os[t]:t==="a"||t==="an"||t=="the"?1:t.match(/few/)?3:t.match(/half/)?.5:t.match(/couple/)?2:t.match(/several/)?7:parseFloat(t)}var Vn=`(?:${We(Rs)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;function qn(e){let t=e.toLowerCase();return Rs[t]!==void 0?Rs[t]:(t=t.replace(/(?:st|nd|rd|th)$/i,""),parseInt(t))}var nn="(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-9][0-9]{3}|[0-9]{2}(?!\\w|:\\d|\\s+(?:am|pm|o\\s*clock|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)))";function Tt(e){if(/BE/i.test(e))return e=e.replace(/BE/i,""),parseInt(e)-543;if(/BCE?/i.test(e))return e=e.replace(/BCE?/i,""),-parseInt(e);if(/(AD|CE)/i.test(e))return e=e.replace(/(AD|CE)/i,""),parseInt(e);let t=parseInt(e);return bi(t)}var Jl=`(${Ql})\\s{0,3}(${We(ur)})`,Zl=new RegExp(Jl,"i"),r2=`(${Ql})\\s{0,3}(${We(Xl)})`,ed="\\s{0,5},?(?:\\s*and)?\\s{0,5}",Mt=zs("(?:(?:about|around)\\s{0,3})?",Jl,ed),rn=zs("(?:(?:about|around)\\s{0,3})?",r2,ed);function ut(e){let t={},n=e,r=Zl.exec(n);for(;r;)i2(t,r),n=n.substring(r[0].length).trim(),r=Zl.exec(n);return Object.keys(t).length==0?null:t}function i2(e,t){if(t[0].match(/^[a-zA-Z]+$/))return;let n=n2(t[1]),r=ur[t[2].toLowerCase()];e[r]=n}var ke=class{innerPatternHasChange(t,n){return this.innerPattern(t)!==n}patternLeftBoundary(){return"(\\W|^)"}cachedInnerPattern=null;cachedPattern=null;pattern(t){return this.cachedInnerPattern&&!this.innerPatternHasChange(t,this.cachedInnerPattern)?this.cachedPattern:(this.cachedInnerPattern=this.innerPattern(t),this.cachedPattern=new RegExp(`${this.patternLeftBoundary()}${this.cachedInnerPattern.source}`,this.cachedInnerPattern.flags),this.cachedPattern)}extract(t,n){let r=n[1]??"";n.index=n.index+r.length,n[0]=n[0].substring(r.length);for(let i=2;i<n.length;i++)n[i-1]=n[i];return this.innerExtract(t,n)}};var s2=new RegExp(`(?:(?:within|in|for)\\s*)?(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Mt})(?=\\W|$)`,"i"),a2=new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${Mt})(?=\\W|$)`,"i"),o2=new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${rn})(?=\\W|$)`,"i"),lr=class extends ke{strictMode;constructor(t){super(),this.strictMode=t}innerPattern(t){return this.strictMode?o2:t.option.forwardDate?s2:a2}innerExtract(t,n){if(n[0].match(/^for\s*the\s*\w+/i))return null;let r=ut(n[1]);return r?_e.createRelativeFromReference(t.reference,r):null}};var u2=new RegExp(`(?:on\\s{0,3})?(${Vn})(?:\\s{0,3}(?:to|\\-|\\\u2013|until|through|till)\\s{0,3}(${Vn}))?(?:-|/|\\s{0,3}(?:of)?\\s{0,3})(${We(je)})(?:(?:-|/|,?\\s{0,3})(${nn}(?!\\w)))?(?=\\W|$)`,"i"),td=1,nd=2,l2=3,rd=4,dr=class extends ke{innerPattern(){return u2}innerExtract(t,n){let r=t.createParsingResult(n.index,n[0]),i=je[n[l2].toLowerCase()],a=qn(n[td]);if(a>31)return n.index=n.index+n[td].length,null;if(r.start.assign("month",i),r.start.assign("day",a),n[rd]){let s=Tt(n[rd]);r.start.assign("year",s)}else{let s=Et(t.refDate,a,i);r.start.imply("year",s)}if(n[nd]){let s=qn(n[nd]);r.end=r.start.clone(),r.end.assign("day",s)}return r}};var d2=new RegExp(`(${We(je)})(?:-|/|\\s*,?\\s*)(${Vn})(?!\\s*(?:am|pm))\\s*(?:(?:to|\\-)\\s*(${Vn})\\s*)?(?:(?:-|/|\\s*,\\s*|\\s+)(${nn}))?(?=\\W|$)(?!\\:\\d)`,"i"),f2=1,id=2,Ns=3,Ms=4,fr=class extends ke{shouldSkipYearLikeDate;constructor(t){super(),this.shouldSkipYearLikeDate=t}innerPattern(){return d2}innerExtract(t,n){let r=je[n[f2].toLowerCase()],i=qn(n[id]);if(i>31||this.shouldSkipYearLikeDate&&!n[Ns]&&!n[Ms]&&n[id].match(/^\d{2}$/))return null;let a=t.createParsingComponents({day:i,month:r}).addTag("parser/ENMonthNameMiddleEndianParser");if(n[Ms]){let u=Tt(n[Ms]);a.assign("year",u)}else{let u=Et(t.refDate,i,r);a.imply("year",u)}if(!n[Ns])return a;let s=qn(n[Ns]),o=t.createParsingResult(n.index,n[0]);return o.start=a,o.end=a.clone(),o.end.assign("day",s),o}};var p2=new RegExp(`((?:in)\\s*)?(${We(je)})\\s*(?:(?:,|-|of)?\\s*(${nn})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`,"i"),c2=1,h2=2,sd=3,pr=class extends ke{innerPattern(){return p2}innerExtract(t,n){let r=n[h2].toLowerCase();if(n[0].length<=3&&!Ds[r])return null;let i=t.createParsingResult(n.index+(n[c2]||"").length,n.index+n[0].length);i.start.imply("day",1),i.start.addTag("parser/ENMonthNameParser");let a=je[r];if(i.start.assign("month",a),n[sd]){let s=Tt(n[sd]);i.start.assign("year",s)}else{let s=Et(t.refDate,1,a);i.start.imply("year",s)}return i}};var m2=new RegExp(`([0-9]{4})[-\\.\\/\\s](?:(${We(je)})|([0-9]{1,2}))[-\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`,"i"),g2=1,y2=2,ad=3,w2=4,cr=class extends ke{strictMonthDateOrder;constructor(t){super(),this.strictMonthDateOrder=t}innerPattern(){return m2}innerExtract(t,n){let r=parseInt(n[g2]),i=parseInt(n[w2]),a=n[ad]?parseInt(n[ad]):je[n[y2].toLowerCase()];if(a<1||a>12){if(this.strictMonthDateOrder)return null;i>=1&&i<=12&&([a,i]=[i,a])}return i<1||i>31?null:{day:i,month:a,year:r}}};var $2="(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-9][0-9]{3})",v2=new RegExp(`(${$2})(?:\\s*[-.\\/,]?\\s*|\\s+of\\s+)(${We(je)})(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`,"i"),b2=1,_2=2,hr=class extends ke{innerPattern(){return v2}innerExtract(t,n){let r=Tt(n[b2]),i=n[_2].toLowerCase(),a=je[i],s=t.createParsingResult(n.index,n[0]);return s.start.imply("day",1),s.start.assign("month",a),s.start.assign("year",r),s.start.addTag("parser/ENYearMonthNameParser"),s}};var k2=new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})","i"),x2=1,E2=2,mr=class extends ke{innerPattern(){return k2}innerExtract(t,n){if(/\d\/?$/.test(t.text.substring(0,n.index)))return null;let r=parseInt(n[E2]),i=parseInt(n[x2]);return t.createParsingComponents().imply("day",1).assign("month",i).assign("year",r)}};function T2(e,t,n,r){return new RegExp(`${e}${t}(\\d{1,4})(?:(?:\\.|:|\uFF1A)(\\d{1,2})(?:(?::|\uFF1A)(\\d{2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${n}`,r)}function S2(e,t){return new RegExp(`^(${e})(\\d{1,4})(?:(?:\\.|\\:|\\\uFF1A)(\\d{1,2})(?:(?:\\.|\\:|\\\uFF1A)(\\d{1,2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${t}`,"i")}var Ps=2,gn=3,ki=4,xi=5,Fn=6,Ei=class{strictMode;constructor(t=!1){this.strictMode=t}patternFlags(){return"i"}primaryPatternLeftBoundary(){return"(^|\\s|T|\\b)"}primarySuffix(){return"(?!/)(?=\\W|$)"}followingSuffix(){return"(?!/)(?=\\W|$)"}pattern(t){return this.getPrimaryTimePatternThroughCache()}extract(t,n){let r=this.extractPrimaryTimeComponents(t,n);if(!r)return n[0].match(/^\d{4}/)?(n.index+=4,null):(n.index+=n[0].length,null);let i=n.index+n[1].length,a=n[0].substring(n[1].length),s=t.createParsingResult(i,a,r);n.index+=n[0].length;let o=t.text.substring(n.index),d=this.getFollowingTimePatternThroughCache().exec(o);return a.match(/^\d{3,4}/)&&d&&(d[0].match(/^\s*([+-])\s*\d{2,4}$/)||d[0].match(/^\s*([+-])\s*\d{2}\W\d{2}/))?null:!d||d[0].match(/^\s*([+-])\s*\d{3,4}$/)?this.checkAndReturnWithoutFollowingPattern(s):(s.end=this.extractFollowingTimeComponents(t,d,s),s.end&&(s.text+=d[0]),this.checkAndReturnWithFollowingPattern(s))}extractPrimaryTimeComponents(t,n,r=!1){let i=t.createParsingComponents(),a=0,s=null,o=parseInt(n[Ps]);if(o>100){if(n[Ps].length==4&&n[gn]==null&&!n[Fn]||this.strictMode||n[gn]!=null)return null;a=o%100,o=Math.floor(o/100)}if(o>24)return null;if(n[gn]!=null){if(n[gn].length==1&&!n[Fn])return null;a=parseInt(n[gn])}if(a>=60)return null;if(o>12&&(s=ge.PM),n[Fn]!=null){if(o>12)return null;let u=n[Fn][0].toLowerCase();u=="a"&&(s=ge.AM,o==12&&(o=0)),u=="p"&&(s=ge.PM,o!=12&&(o+=12))}if(i.assign("hour",o),i.assign("minute",a),s!==null?i.assign("meridiem",s):o<12?i.imply("meridiem",ge.AM):i.imply("meridiem",ge.PM),n[xi]!=null){let u=parseInt(n[xi].substring(0,3));if(u>=1e3)return null;i.assign("millisecond",u)}if(n[ki]!=null){let u=parseInt(n[ki]);if(u>=60)return null;i.assign("second",u)}return i}extractFollowingTimeComponents(t,n,r){let i=t.createParsingComponents();if(n[xi]!=null){let u=parseInt(n[xi].substring(0,3));if(u>=1e3)return null;i.assign("millisecond",u)}if(n[ki]!=null){let u=parseInt(n[ki]);if(u>=60)return null;i.assign("second",u)}let a=parseInt(n[Ps]),s=0,o=-1;if(n[gn]!=null?s=parseInt(n[gn]):a>100&&(s=a%100,a=Math.floor(a/100)),s>=60||a>24)return null;if(a>=12&&(o=ge.PM),n[Fn]!=null){if(a>12)return null;let u=n[Fn][0].toLowerCase();u=="a"&&(o=ge.AM,a==12&&(a=0,i.isCertain("day")||i.addDurationAsImplied({day:1}))),u=="p"&&(o=ge.PM,a!=12&&(a+=12)),r.start.isCertain("meridiem")||(o==ge.AM?(r.start.imply("meridiem",ge.AM),r.start.get("hour")==12&&r.start.assign("hour",0)):(r.start.imply("meridiem",ge.PM),r.start.get("hour")!=12&&r.start.assign("hour",r.start.get("hour")+12)))}return i.assign("hour",a),i.assign("minute",s),o>=0?i.assign("meridiem",o):r.start.isCertain("meridiem")&&r.start.get("hour")>12?r.start.get("hour")-12>a?i.imply("meridiem",ge.AM):a<=12&&(i.assign("hour",a+12),i.assign("meridiem",ge.PM)):a>12?i.imply("meridiem",ge.PM):a<=12&&i.imply("meridiem",ge.AM),i.date().getTime()<r.start.date().getTime()&&i.addDurationAsImplied({day:1}),i}checkAndReturnWithoutFollowingPattern(t){if(t.text.match(/^\d$/)||t.text.match(/^\d\d\d+$/)||t.text.match(/\d[apAP]$/))return null;let n=t.text.match(/[^\d:.](\d[\d.]+)$/);if(n){let r=n[1];if(this.strictMode||r.includes(".")&&!r.match(/\d(\.\d{2})+$/)||parseInt(r)>24)return null}return t}checkAndReturnWithFollowingPattern(t){if(t.text.match(/^\d+-\d+$/))return null;let n=t.text.match(/[^\d:.](\d[\d.]+)\s*-\s*(\d[\d.]+)$/);if(n){if(this.strictMode)return null;let r=n[1],i=n[2];if(i.includes(".")&&!i.match(/\d(\.\d{2})+$/))return null;let a=parseInt(i),s=parseInt(r);if(a>24||s>24)return null}return t}cachedPrimaryPrefix=null;cachedPrimarySuffix=null;cachedPrimaryTimePattern=null;getPrimaryTimePatternThroughCache(){let t=this.primaryPrefix(),n=this.primarySuffix();return this.cachedPrimaryPrefix===t&&this.cachedPrimarySuffix===n?this.cachedPrimaryTimePattern:(this.cachedPrimaryTimePattern=T2(this.primaryPatternLeftBoundary(),t,n,this.patternFlags()),this.cachedPrimaryPrefix=t,this.cachedPrimarySuffix=n,this.cachedPrimaryTimePattern)}cachedFollowingPhase=null;cachedFollowingSuffix=null;cachedFollowingTimePatten=null;getFollowingTimePatternThroughCache(){let t=this.followingPhase(),n=this.followingSuffix();return this.cachedFollowingPhase===t&&this.cachedFollowingSuffix===n?this.cachedFollowingTimePatten:(this.cachedFollowingTimePatten=S2(t,n),this.cachedFollowingPhase=t,this.cachedFollowingSuffix=n,this.cachedFollowingTimePatten)}};var gr=class extends Ei{constructor(t){super(t)}followingPhase(){return"\\s*(?:\\-|\\\u2013|\\~|\\\u301C|to|until|through|till|\\?)\\s*"}primaryPrefix(){return"(?:(?:at|from)\\s*)??"}primarySuffix(){return"(?:\\s*(?:o\\W*clock|at\\s*night|in\\s*the\\s*(?:morning|afternoon)))?(?!/)(?=\\W|$)"}extractPrimaryTimeComponents(t,n){let r=super.extractPrimaryTimeComponents(t,n);if(!r)return r;if(n[0].endsWith("night")){let i=r.get("hour");i>=6&&i<12?(r.assign("hour",r.get("hour")+12),r.assign("meridiem",ge.PM)):i<6&&r.assign("meridiem",ge.AM)}if(n[0].endsWith("afternoon")){r.assign("meridiem",ge.PM);let i=r.get("hour");i>=0&&i<=6&&r.assign("hour",r.get("hour")+12)}return n[0].endsWith("morning")&&(r.assign("meridiem",ge.AM),r.get("hour")<12&&r.assign("hour",r.get("hour"))),r.addTag("parser/ENTimeExpressionParser")}extractFollowingTimeComponents(t,n,r){let i=super.extractFollowingTimeComponents(t,n,r);return i&&i.addTag("parser/ENTimeExpressionParser"),i}};var I2=new RegExp(`(${Mt})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`,"i"),C2=new RegExp(`(${rn})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`,"i"),yr=class extends ke{strictMode;constructor(t){super(),this.strictMode=t}innerPattern(){return this.strictMode?C2:I2}innerExtract(t,n){let r=ut(n[1]);return r?_e.createRelativeFromReference(t.reference,en(r)):null}};var A2=new RegExp(`(${Mt})\\s{0,5}(?:later|after|from now|henceforth|forward|out)(?=(?:\\W|$))`,"i"),z2=new RegExp(`(${rn})\\s{0,5}(later|after|from now)(?=\\W|$)`,"i"),O2=1,wr=class extends ke{strictMode;constructor(t){super(),this.strictMode=t}innerPattern(){return this.strictMode?z2:A2}innerExtract(t,n){let r=ut(n[O2]);return r?_e.createRelativeFromReference(t.reference,r):null}};var Gn=class{refine(t,n){return n.filter(r=>this.isValid(t,r))}},lt=class{refine(t,n){if(n.length<2)return n;let r=[],i=n[0],a=null;for(let s=1;s<n.length;s++){a=n[s];let o=t.text.substring(i.index+i.text.length,a.index);if(!this.shouldMergeResults(o,i,a,t))r.push(i),i=a;else{let u=i,d=a,c=this.mergeResults(o,u,d,t);t.debug(()=>{console.log(`${this.constructor.name} merged ${u} and ${d} into ${c}`)}),i=c}}return i!=null&&r.push(i),r}};var $r=class extends lt{shouldMergeResults(t,n,r){return!n.end&&!r.end&&t.match(this.patternBetween())!=null}mergeResults(t,n,r){if(!n.start.isOnlyWeekdayComponent()&&!r.start.isOnlyWeekdayComponent()&&(r.start.getCertainComponents().forEach(a=>{n.start.isCertain(a)||n.start.imply(a,r.start.get(a))}),n.start.getCertainComponents().forEach(a=>{r.start.isCertain(a)||r.start.imply(a,n.start.get(a))})),n.start.date()>r.start.date()){let a=n.start.date(),s=r.start.date();r.start.isOnlyWeekdayComponent()&&Fe(s,{day:7})>a?(s=Fe(s,{day:7}),r.start.imply("day",s.getDate()),r.start.imply("month",s.getMonth()+1),r.start.imply("year",s.getFullYear())):n.start.isOnlyWeekdayComponent()&&Fe(a,{day:-7})<s?(a=Fe(a,{day:-7}),n.start.imply("day",a.getDate()),n.start.imply("month",a.getMonth()+1),n.start.imply("year",a.getFullYear())):r.start.isDateWithUnknownYear()&&Fe(s,{year:1})>a?(s=Fe(s,{year:1}),r.start.imply("year",s.getFullYear())):n.start.isDateWithUnknownYear()&&Fe(a,{year:-1})<s?(a=Fe(a,{year:-1}),n.start.imply("year",a.getFullYear())):[r,n]=[n,r]}let i=n.clone();return i.start=n.start,i.end=r.start,i.index=Math.min(n.index,r.index),n.index<r.index?i.text=n.text+t+r.text:i.text=r.text+t+n.text,i}};var vr=class extends $r{patternBetween(){return/^\s*(to|-|–|until|through|till)\s*$/i}};function Bs(e,t){let n=e.clone(),r=e.start,i=t.start;if(n.start=od(r,i),e.end!=null||t.end!=null){let a=e.end==null?e.start:e.end,s=t.end==null?t.start:t.end,o=od(a,s);if(e.end==null&&o.date().getTime()<n.start.date().getTime()){let u=new Date(o.date().getTime());u.setDate(u.getDate()+1),o.isCertain("day")?ht(o,u):Dt(o,u)}n.end=o}return n}function od(e,t){let n=e.clone();t.isCertain("hour")?(n.assign("hour",t.get("hour")),n.assign("minute",t.get("minute")),t.isCertain("second")?(n.assign("second",t.get("second")),t.isCertain("millisecond")?n.assign("millisecond",t.get("millisecond")):n.imply("millisecond",t.get("millisecond"))):(n.imply("second",t.get("second")),n.imply("millisecond",t.get("millisecond")))):(n.imply("hour",t.get("hour")),n.imply("minute",t.get("minute")),n.imply("second",t.get("second")),n.imply("millisecond",t.get("millisecond"))),t.isCertain("timezoneOffset")&&n.assign("timezoneOffset",t.get("timezoneOffset"));let r=e.get("meridiem")!=null&&(e.isCertain("meridiem")||Array.from(e.tags()).some(i=>i.startsWith("casualReference/")));return t.isCertain("meridiem")?n.assign("meridiem",t.get("meridiem")):t.get("meridiem")!=null&&!r&&n.imply("meridiem",t.get("meridiem")),n.get("meridiem")==ge.PM&&n.get("hour")<12&&(t.isCertain("hour")?n.assign("hour",n.get("hour")+12):n.imply("hour",n.get("hour")+12)),n.addTags(e.tags()),n.addTags(t.tags()),n}var br=class extends lt{shouldMergeResults(t,n,r){let i=n.start.isOnlyDate()&&r.start.isOnlyTime(),a=n.start.isOnlyTime()&&r.start.isOnlyDate();return a&&t.trim()===":"?!1:(i||a)&&t.match(this.patternBetween())!=null}mergeResults(t,n,r){let i=n.start.isOnlyDate()?Bs(n,r):Bs(r,n);return i.index=n.index,i.text=n.text+t+r.text,i}};var Hn=class extends br{patternBetween(){return new RegExp("^\\s*(T|at|after|before|on|of|,|-|\\.|\u2219|:)?\\s*$")}};var R2=new RegExp("^\\s*,?\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)","i"),_r=class{timezoneOverrides;constructor(t){this.timezoneOverrides=t}refine(t,n){let r=t.option.timezones??{};return n.forEach(i=>{let a=t.text.substring(i.index+i.text.length),s=R2.exec(a);if(!s)return;let o=s[1].toUpperCase(),u=i.start.date()??i.refDate??new Date,d={...this.timezoneOverrides,...r},c=vi(o,u,d);if(c==null)return;t.debug(()=>{console.log(`Extracting timezone: '${o}' into: ${c} for: ${i.start}`)});let h=i.start.get("timezoneOffset");h!==null&&c!=h&&(i.start.isCertain("timezoneOffset")||o!=s[1])||i.start.isOnlyDate()&&o!=s[1]||(i.text+=s[0],i.start.isCertain("timezoneOffset")||i.start.assign("timezoneOffset",c),i.end!=null&&!i.end.isCertain("timezoneOffset")&&i.end.assign("timezoneOffset",c))}),n}};var D2=new RegExp("^\\s*(?:\\(?(?:GMT|UTC)\\s?)?([+-])(\\d{1,2})(?::?(\\d{2}))?\\)?","i"),N2=1,M2=2,P2=3,kr=class{refine(t,n){return n.forEach(function(r){if(r.start.isCertain("timezoneOffset"))return;let i=t.text.substring(r.index+r.text.length),a=D2.exec(i);if(!a)return;t.debug(()=>{console.log(`Extracting timezone: '${a[0]}' into : ${r}`)});let s=parseInt(a[M2]),o=parseInt(a[P2]||"0"),u=s*60+o;u>840||(a[N2]==="-"&&(u=-u),r.end!=null&&r.end.assign("timezoneOffset",u),r.start.assign("timezoneOffset",u),r.text+=a[0])}),n}};var sn=class{refine(t,n){if(n.length<2)return n;let r=[],i=n[0];for(let a=1;a<n.length;a++){let s=n[a];if(s.index>=i.index+i.text.length){r.push(i),i=s;continue}let o=null,u=null;s.text.length>i.text.length?(o=s,u=i):(o=i,u=s),t.debug(()=>{console.log(`${this.constructor.name} remove ${u} by ${o}`)}),i=o}return i!=null&&r.push(i),r}};function ud(e,t,n){let r=e.getDateWithAdjustedTimezone(),i=B2(r,t,n),a=new _e(e);return a=a.addDurationAsImplied({day:i}),a.assign("weekday",t),a}function B2(e,t,n){let r=e.getDay();switch(n){case"this":return yn(e,t);case"last":return ld(e,t);case"next":return r==ze.SUNDAY?t==ze.SUNDAY?7:t:r==ze.SATURDAY?t==ze.SATURDAY?7:t==ze.SUNDAY?8:1+t:t<r&&t!=ze.SUNDAY?yn(e,t):yn(e,t)+7}return U2(e,t)}function U2(e,t){let n=ld(e,t),r=yn(e,t);return r<-n?r:n}function yn(e,t){let n=e.getDay(),r=t-n;return r<0&&(r+=7),r}function ld(e,t){let n=e.getDay(),r=t-n;return r>=0&&(r-=7),r}var xr=class{refine(t,n){return t.option.forwardDate&&n.forEach(r=>{let i=t.reference.getDateWithAdjustedTimezone();if(r.start.isOnlyTime()&&t.reference.instant>r.start.date()){let a=t.reference.getDateWithAdjustedTimezone(),s=new Date(a);s.setDate(s.getDate()+1),Dt(r.start,s),t.debug(()=>{console.log(`${this.constructor.name} adjusted ${r} time from the ref date (${a}) to the following day (${s})`)}),r.end&&r.end.isOnlyTime()&&(Dt(r.end,s),r.start.date()>r.end.date()&&(s.setDate(s.getDate()+1),Dt(r.end,s)))}if(r.start.isOnlyWeekdayComponent()&&i>r.start.date()){let a=yn(i,r.start.get("weekday"))||7,s=Fe(i,{day:a});if(Dt(r.start,s),t.debug(()=>{console.log(`${this.constructor.name} adjusted ${r} weekday (${r.start})`)}),r.end&&r.start.date()>r.end.date()){let o=yn(i,r.start.get("weekday"))||7,u=Fe(i,{day:o});Dt(r.end,u),t.debug(()=>{console.log(`${this.constructor.name} adjusted ${r} weekday (${r.end})`)})}}if(r.start.isDateWithUnknownYear()&&i>r.start.date())for(let a=0;a<3&&i>r.start.date();a++)r.start.imply("year",r.start.get("year")+1),t.debug(()=>{console.log(`${this.constructor.name} adjusted ${r} year (${r.start})`)}),r.end&&!r.end.isCertain("year")&&(r.end.imply("year",r.end.get("year")+1),t.debug(()=>{console.log(`${this.constructor.name} adjusted ${r} month (${r.start})`)}))}),n}};var Er=class extends Gn{strictMode;constructor(t){super(),this.strictMode=t}isValid(t,n){return n.text.replace(" ","").match(/^\d*(\.\d*)?$/)?(t.debug(()=>{console.log(`Removing unlikely result '${n.text}'`)}),!1):n.start.isValidDate()?n.end&&!n.end.isValidDate()?(t.debug(()=>{console.log(`Removing invalid result: ${n} (${n.end})`)}),!1):this.strictMode?this.isStrictModeValid(t,n):!0:(t.debug(()=>{console.log(`Removing invalid result: ${n} (${n.start})`)}),!1)}isStrictModeValid(t,n){return n.start.isOnlyWeekdayComponent()?(t.debug(()=>{console.log(`(Strict) Removing weekday only component: ${n} (${n.end})`)}),!1):!0}};var W2=new RegExp("([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})(?:T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?(Z|([+-]\\d{2}):?(\\d{2})?)?)?(?=\\W|$)","i"),L2=1,V2=2,q2=3,dd=4,F2=5,fd=6,pd=7,G2=8,cd=9,hd=10,Tr=class extends ke{innerPattern(){return W2}innerExtract(t,n){let r=t.createParsingComponents({year:parseInt(n[L2]),month:parseInt(n[V2]),day:parseInt(n[q2])});if(n[dd]!=null&&(r.assign("hour",parseInt(n[dd])),r.assign("minute",parseInt(n[F2])),n[fd]!=null&&r.assign("second",parseInt(n[fd])),n[pd]!=null&&r.assign("millisecond",parseInt(n[pd])),n[G2]!=null)){let i=0;if(n[cd]){let a=parseInt(n[cd]),s=0;n[hd]!=null&&(s=parseInt(n[hd])),i=a*60,i<0?i-=s:i+=s}r.assign("timezoneOffset",i)}return r.addTag("parser/ISOFormatParser")}};var Sr=class extends lt{mergeResults(t,n,r){let i=r.clone();return i.index=n.index,i.text=n.text+t+i.text,i.start.assign("weekday",n.start.get("weekday")),i.end&&i.end.assign("weekday",n.start.get("weekday")),i}shouldMergeResults(t,n,r){return n.start.isOnlyWeekdayComponent()&&!n.start.isCertain("hour")&&r.start.isCertain("day")&&!r.start.tags().has("result/relativeDate")&&t.match(/^,?\s*$/)!=null}};function md(e,t=!1){return e.parsers.unshift(new Tr),e.refiners.unshift(new Sr),e.refiners.unshift(new kr),e.refiners.unshift(new sn),e.refiners.push(new _r),e.refiners.push(new sn),e.refiners.push(new xr),e.refiners.push(new Er(t)),e}function gd(e){let t=e.getDateWithAdjustedTimezone(),n=new _e(e,{});return ht(n,t),$i(n,t),n.assign("timezoneOffset",e.getTimezoneOffset()),n.addTag("casualReference/now"),n}function yd(e){let t=e.getDateWithAdjustedTimezone(),n=new _e(e,{});return ht(n,t),or(n,t),n.delete("meridiem"),n.addTag("casualReference/today"),n}function wd(e){return H2(e,1).addTag("casualReference/yesterday")}function $d(e){return Ti(e,1).addTag("casualReference/tomorrow")}function H2(e,t){return Ti(e,-t)}function Ti(e,t){let n=e.getDateWithAdjustedTimezone(),r=new _e(e,{}),i=new Date(n.getTime());return i.setDate(i.getDate()+t),ht(r,i),or(r,i),r.delete("meridiem"),r}function vd(e,t=22){let n=e.getDateWithAdjustedTimezone(),r=new _e(e,{});return ht(r,n),r.imply("hour",t),r.imply("meridiem",ge.PM),r.addTag("casualReference/tonight"),r}function bd(e,t=20){let n=new _e(e,{});return n.imply("meridiem",ge.PM),n.imply("hour",t),n.addTag("casualReference/evening"),n}function _d(e){let t=new _e(e,{});return e.getDateWithAdjustedTimezone().getHours()>2&&t.addDurationAsImplied({day:1}),t.assign("hour",0),t.imply("minute",0),t.imply("second",0),t.imply("millisecond",0),t.addTag("casualReference/midnight"),t}function kd(e,t=6){let n=new _e(e,{});return n.imply("meridiem",ge.AM),n.imply("hour",t),n.imply("minute",0),n.imply("second",0),n.imply("millisecond",0),n.addTag("casualReference/morning"),n}function xd(e,t=15){let n=new _e(e,{});return n.imply("meridiem",ge.PM),n.imply("hour",t),n.imply("minute",0),n.imply("second",0),n.imply("millisecond",0),n.addTag("casualReference/afternoon"),n}function Ed(e){let t=new _e(e,{});return t.imply("meridiem",ge.AM),t.assign("hour",12),t.imply("minute",0),t.imply("second",0),t.imply("millisecond",0),t.addTag("casualReference/noon"),t}var j2=/(now|today|tonight|tomorrow|overmorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i,Ir=class extends ke{innerPattern(t){return j2}innerExtract(t,n){let r=t.refDate,i=n[0].toLowerCase(),a=t.createParsingComponents();switch(i){case"now":a=gd(t.reference);break;case"today":a=yd(t.reference);break;case"yesterday":a=wd(t.reference);break;case"tomorrow":case"tmr":case"tmrw":a=$d(t.reference);break;case"tonight":a=vd(t.reference);break;case"overmorrow":a=Ti(t.reference,2);break;default:if(i.match(/last\s*night/)){if(r.getHours()>6){let s=new Date(r.getTime());s.setDate(s.getDate()-1),r=s}ht(a,r),a.imply("hour",0)}break}return a.addTag("parser/ENCasualDateParser"),a}};var K2=/(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|midday|noon)(?=\W|$)/i,Cr=class extends ke{innerPattern(){return K2}innerExtract(t,n){let r=null;switch(n[1].toLowerCase()){case"afternoon":r=xd(t.reference);break;case"evening":case"night":r=bd(t.reference);break;case"midnight":r=_d(t.reference);break;case"morning":r=kd(t.reference);break;case"noon":case"midday":r=Ed(t.reference);break}return r&&r.addTag("parser/ENCasualTimeParser"),r}};var Y2=new RegExp(`(?:(?:\\,|\\(|\\\uFF08)\\s*)?(?:on\\s*?)?(?:(this|last|past|next)\\s*)?(${We(_i)}|weekend|weekday)(?:\\s*(?:\\,|\\)|\\\uFF09))?(?:\\s*(?:of\\s*)?(this|last|past|next)\\s*week)?(?=\\W|$)`,"i"),Z2=1,X2=2,Q2=3,Ar=class extends ke{innerPattern(){return Y2}innerExtract(t,n){let r=n[Z2],i=n[Q2],a=r||i;a=a||"",a=a.toLowerCase();let s=null;a=="last"||a=="past"?s="last":a=="next"?s="next":a=="this"&&(s="this");let o=n[X2].toLowerCase(),u;if(_i[o]!==void 0)u=_i[o];else if(o=="weekend")u=s=="last"?ze.SUNDAY:ze.SATURDAY;else if(o=="weekday"){let d=t.reference.getDateWithAdjustedTimezone().getDay();d==ze.SUNDAY||d==ze.SATURDAY?u=s=="last"?ze.FRIDAY:ze.MONDAY:(u=d-1,u=s=="last"?u-1:u+1,u=u%5+1)}else return null;return ud(t.reference,u,s)}};var J2=new RegExp(`(this|last|past|next|after\\s*this)\\s*(${We(ur)})(?=\\s*)(?=\\W|$)`,"i"),e$=1,t$=2,zr=class extends ke{innerPattern(){return J2}innerExtract(t,n){let r=n[e$].toLowerCase(),i=n[t$].toLowerCase(),a=ur[i];if(r=="next"||r.startsWith("after")){let u={};return u[a]=1,_e.createRelativeFromReference(t.reference,u)}if(r=="last"||r=="past"){let u={};return u[a]=-1,_e.createRelativeFromReference(t.reference,u)}let s=t.createParsingComponents(),o=new Date(t.reference.instant.getTime());return i.match(/week/i)?(o.setDate(o.getDate()-o.getDay()),s.imply("day",o.getDate()),s.imply("month",o.getMonth()+1),s.imply("year",o.getFullYear())):i.match(/month/i)?(o.setDate(1),s.imply("day",o.getDate()),s.assign("year",o.getFullYear()),s.assign("month",o.getMonth()+1)):i.match(/year/i)&&(o.setDate(1),o.setMonth(0),s.imply("day",o.getDate()),s.imply("month",o.getMonth()+1),s.assign("year",o.getFullYear())),s}};var n$=new RegExp("([^\\d]|^)([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?(\\W|$)","i"),r$=1,i$=5,Sd=2,Id=3,Us=4,Or=class{groupNumberMonth;groupNumberDay;constructor(t){this.groupNumberMonth=t?Id:Sd,this.groupNumberDay=t?Sd:Id}pattern(){return n$}extract(t,n){let r=n.index+n[r$].length,i=n.index+n[0].length-n[i$].length;if(r>0&&t.text.substring(0,r).match("\\d/?$")||i<t.text.length&&t.text.substring(i).match("^/?\\d"))return;let a=t.text.substring(r,i);if(a.match(/^\d\.\d$/)||a.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/)||!n[Us]&&a.indexOf("/")<0)return;let s=t.createParsingResult(r,a),o=parseInt(n[this.groupNumberMonth]),u=parseInt(n[this.groupNumberDay]);if((o<1||o>12)&&o>12)if(u>=1&&u<=12&&o<=31)[u,o]=[o,u];else return null;if(u<1||u>31)return null;if(s.start.assign("day",u),s.start.assign("month",o),n[Us]){let d=parseInt(n[Us]),c=bi(d);s.start.assign("year",c)}else{let d=Et(t.refDate,u,o);s.start.imply("year",d)}return s.addTag("parser/SlashDateFormatParser")}};var s$=new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${Mt})(?=\\W|$)`,"i"),a$=new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${rn})(?=\\W|$)`,"i"),Rr=class extends ke{allowAbbreviations;constructor(t=!0){super(),this.allowAbbreviations=t}innerPattern(){return this.allowAbbreviations?s$:a$}innerExtract(t,n){let r=n[1].toLowerCase(),i=ut(n[2]);if(!i)return null;switch(r){case"last":case"past":case"-":i=en(i);break}return _e.createRelativeFromReference(t.reference,i)}};function o$(e){return e.text.match(/^[+-]/i)!=null}function Cd(e){return e.text.match(/^-/i)!=null}var Dr=class extends lt{shouldMergeResults(t,n,r){return t.match(/^\s*$/i)?o$(r)||Cd(r):!1}mergeResults(t,n,r,i){let a=ut(r.text);Cd(r)&&(a=en(a));let s=_e.createRelativeFromReference(tn.fromDate(n.start.date()),a);return new Nt(n.reference,n.index,`${n.text}${t}${r.text}`,s)}};function Ad(e){return e.text.match(/\s+(before|from)$/i)!=null}function u$(e){return e.text.match(/\s+(after|since)$/i)!=null}var Nr=class extends lt{patternBetween(){return/^\s*$/i}shouldMergeResults(t,n,r){return!t.match(this.patternBetween())||!Ad(n)&&!u$(n)?!1:!!r.start.get("day")&&!!r.start.get("month")&&!!r.start.get("year")}mergeResults(t,n,r){let i=ut(n.text);Ad(n)&&(i=en(i));let a=_e.createRelativeFromReference(tn.fromDate(r.start.date()),i);return new Nt(r.reference,n.index,`${n.text}${t}${r.text}`,a)}};var l$=new RegExp(`^\\s*(${nn})`,"i"),d$=1,Mr=class{refine(t,n){return n.forEach(function(r){if(!r.start.isDateWithUnknownYear())return;let i=t.text.substring(r.index+r.text.length),a=l$.exec(i);if(!a||a[0].trim().length<=3)return;t.debug(()=>{console.log(`Extracting year: '${a[0]}' into : ${r}`)});let s=Tt(a[d$]);r.end!=null&&r.end.assign("year",s),r.start.assign("year",s),r.text+=a[0]}),n}};var Pr=class extends Gn{constructor(){super()}isValid(t,n){let r=n.text.trim();return r===t.text.trim()?!0:r.toLowerCase()==="may"&&!t.text.substring(0,n.index).trim().match(/\b(in)$/i)?(t.debug(()=>{console.log(`Removing unlikely result: ${n}`)}),!1):r.toLowerCase().endsWith("the second")?(t.text.substring(n.index+n.text.length).trim().length>0&&t.debug(()=>{console.log(`Removing unlikely result: ${n}`)}),!1):!0}};var f$=/\b(?:last\s+day|end)\s+of\s+(?:the\s+)?$/i,p$=/^(this|last|past|next)\s*(week|month|year)$/i,c$=/^\s+(this|last|past|next)\s+year(?=\W|$)/i;function zd(e){return e==="next"?1:e==="last"||e==="past"?-1:0}var Br=class{refine(t,n){return n.forEach(r=>{let i=t.text.substring(0,r.index).match(f$);if(!i)return;let a=r.text.match(p$);if(a){let s=a[1].toLowerCase();this.moveToEndOfRelativePeriod(t,r,s,a[2].toLowerCase())}else if(r.start.isCertain("month")&&!r.start.isCertain("day"))this.moveToEndOfMonth(t,r);else return;r.start.imply("hour",12),r.start.imply("minute",0),r.start.imply("second",0),r.start.imply("millisecond",0),r.start.isCertain("timezoneOffset")||r.start.delete("timezoneOffset"),r.index-=i[0].length,r.text=i[0]+r.text,r.addTag("refiner/ENEndOfPeriodRefiner")}),n}moveToEndOfRelativePeriod(t,n,r,i){let a=zd(r),s=t.reference.getDateWithAdjustedTimezone(),o;i==="week"?(o=new Date(s.getTime()),o.setDate(s.getDate()+(6-s.getDay())+a*7)):i==="month"?o=new Date(s.getFullYear(),s.getMonth()+a+1,0):o=new Date(s.getFullYear()+a,11,31),n.start.assign("day",o.getDate()),n.start.assign("month",o.getMonth()+1),n.start.assign("year",o.getFullYear()),n.start.delete("weekday"),n.start.imply("weekday",o.getDay())}moveToEndOfMonth(t,n){let r=n.start.get("year"),i=n.start.get("month"),a=t.text.substring(n.index+n.text.length).match(c$);if(a){let s=a[1].toLowerCase();r=t.reference.getDateWithAdjustedTimezone().getFullYear()+zd(s),n.start.assign("year",r),n.text+=a[0]}if(!n.start.isCertain("year")){let s=new Date(r,i,0).getDate();r=Et(t.reference.getDateWithAdjustedTimezone(),s,i),n.start.imply("year",r)}n.start.assign("day",new Date(r,i,0).getDate())}};var h$=/(?:last\s+day|end)\s+of\s+(?:the\s+)?month(?=\W|$)/i,Ur=class extends ke{innerPattern(){return h$}innerExtract(t){let n=t.reference.getDateWithAdjustedTimezone(),r=n.getFullYear(),i=n.getMonth()+1,a=new Date(r,i,0).getDate(),s=t.createParsingComponents();return s.assign("day",a),s.assign("month",i),s.assign("year",r),s.addTag("parser/ENEndOfCurrentMonthParser"),s}};var wn=class{createCasualConfiguration(t=!1){let n=this.createConfiguration(!1,t);return n.parsers.push(new Ir),n.parsers.push(new Cr),n.parsers.push(new Ur),n.parsers.push(new pr),n.parsers.push(new zr),n.parsers.push(new Rr),n.refiners.unshift(new Br),n.refiners.push(new Pr),n}createConfiguration(t=!0,n=!1){let r=md({parsers:[new Or(n),new lr(t),new dr,new fr(n),new Ar,new mr,new gr(t),new yr(t),new wr(t),new hr],refiners:[new Hn]},t);return r.parsers.unshift(new cr(t)),r.refiners.unshift(new Nr),r.refiners.unshift(new Dr),r.refiners.unshift(new sn),r.refiners.push(new Hn),r.refiners.push(new Mr),r.refiners.push(new vr),r}};var jn=class e{parsers;refiners;defaultConfig=new wn;constructor(t){t=t||this.defaultConfig.createCasualConfiguration(),this.parsers=[...t.parsers],this.refiners=[...t.refiners]}clone(){return new e({parsers:[...this.parsers],refiners:[...this.refiners]})}parseDate(t,n,r){let i=this.parse(t,n,r);return i.length>0?i[0].start.date():null}parse(t,n,r){let i=new Ws(t,n,r),a=[];return this.parsers.forEach(s=>{let o=e.executeParser(i,s);a=a.concat(o)}),a.sort((s,o)=>s.index-o.index),this.refiners.forEach(function(s){a=s.refine(i,a)}),a}static executeParser(t,n){let r=[],i=n.pattern(t),a=t.text,s=t.text,o=i.exec(s);for(;o;){let u=o.index+a.length-s.length;o.index=u;let d=n.extract(t,o);if(!d){s=a.substring(o.index+1),o=i.exec(s);continue}let c=null;d instanceof Nt?c=d:d instanceof _e?(c=t.createParsingResult(o.index,o[0]),c.start=d):c=t.createParsingResult(o.index,o[0],d);let h=c.index,g=c.text;t.debug(()=>console.log(`${n.constructor.name} extracted (at index=${h}) '${g}'`)),r.push(c),s=a.substring(h+g.length),o=i.exec(s)}return r}},Ws=class{text;option;reference;refDate;constructor(t,n,r){this.text=t,this.option=r??{},this.reference=tn.fromInput(n,this.option.timezones),this.refDate=this.reference.instant}createParsingComponents(t){return t instanceof _e?t:new _e(this.reference,t)}createParsingResult(t,n,r,i){let a=typeof n=="string"?n:this.text.substring(t,n),s=r?this.createParsingComponents(r):null,o=i?this.createParsingComponents(i):null;return new Nt(this.reference,t,a,s,o)}debug(t){this.option.debug&&(this.option.debug instanceof Function?this.option.debug(t):this.option.debug.debug(t))}};var Ls=new wn,Od=new jn(Ls.createCasualConfiguration(!1)),m$=new jn(Ls.createConfiguration(!0,!1)),n3=new jn(Ls.createCasualConfiguration(!0));var Rd=Od;function St(e,t){return{id:e,async load(){},async predict(n,r,i){let a=performance.now();return{dsl:t(n,i?.today),ms:performance.now()-a}},dispose(){}}}var It=e=>e.toLowerCase().replace(/\s+/g," ").trim();var y$=["su","mo","tu","we","th","fr","sa"],an=e=>String(e).padStart(2,"0"),w$={a:1,an:1,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10},$$=/\b(every|each|daily|weekly|monthly|yearly|annually|weekdays?|biweekly|everyday|alternate)\b/;function v$(e,t){let n=Date.UTC(e.get("year"),e.get("month")-1,e.get("day")),r=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((n-r)/864e5)}function b$(e,t,n,r){let i;if(i=t.match(/\b(this|next|last|previous|coming)\s+(week|month|year)\b/)){let s=i[1]==="this"?0:i[1]==="next"||i[1]==="coming"?1:-1;return i[2].charAt(0).toUpperCase()+(s>=0?"+":"")+s}if(/\bweekend\b/.test(t))return"sa>su";if((i=t.match(/\b(\d+|an?|one|two|three|four|five|six|seven|eight|nine|ten)\s*(day|week|month|year)s?\s*(ago|from now|later|from today)?/))&&(i[3]||/\bin\b/.test(t))){let s=/^\d/.test(i[1])?+i[1]:w$[i[1]];return`${i[3]==="ago"?"-":"+"}${s}${i[2][0]}`}let a=e.isCertain("day")&&e.isCertain("month");if(/\b(today|tomorrow|tmrw|tmr|yesterday|tonight|now)\b/.test(t)&&e.isCertain("day")){let s=v$(e,n);return`${s>=0?"+":""}${s}d`}if(e.isCertain("weekday")&&!a){let s=y$[e.get("weekday")];return/\b(next|nxt)\b/.test(r)?s+"+1":/\b(last|past|previous)\b/.test(r)?s+"-1":s}if(a){let s=`${an(e.get("month"))}-${an(e.get("day"))}`;return e.isCertain("year")?`${e.get("year")}-${s}`:s}if(e.isCertain("month"))return`M@${an(e.get("month"))}`}function _$(e,t){if(!e.isCertain("hour"))return;let n=e.get("hour"),r=e.get("minute")??0;if(e.isCertain("meridiem")||n>12||n===0||/\b0\d:\d\d/.test(t)||/noon|midnight|midday/.test(t))return`${an(n)}:${an(r)}`;let i=n%12||12;return r?`${i}:${an(r)}?`:`${i}?`}function Dd(e,t,n,r){return{date:b$(e,t,n,r),time:_$(e,t)}}function k$(e,t,n){if(!n.time?.endsWith("?")||!t.isCertain("meridiem")||!t.isCertain("hour"))return;let r=e.get("hour")%12,i=t.get("hour"),a=r+(t.get("meridiem")===1?12:0);a>=i&&(a=r+(t.get("meridiem")===1?0:12)),n.time=`${an(a)}:${an(e.get("minute")??0)}`}function Nd(e,t){if(e=It(e),!e||$$.test(e))return"x";let[n,r,i]=t.split("-").map(Number),a=new Date(n,r-1,i,12,0,0),o=Rd.parse(e,a,{forwardDate:!0})[0];if(!o)return"x";let u=o;if(u.text.length<.6*e.replace(/[^\w:]/g,"").length)return"x";let d=Dd(u.start,u.text,a,e),c=u.end?Dd(u.end,u.text,a,e):void 0;u.end&&k$(u.start,u.end,d);let h=!!(d.date||c?.date),g=!!(d.time||c?.time);if(!h&&!g)return"x";let v=h&&g?"dt":h?"d":"t",b=(S,k)=>[S.date&&S.date!==k?.date?S.date:"",S.time??""].filter(Boolean).join(" ");if(!c)return`${v} ${b(d)}`;let T=(d.date??"")===(c.date??"");return`${v} ${b(d)}>${T?c.time??c.date:b(c)}`}var x$=St("chrono",(e,t)=>Nd(e,t??"2026-11-03")),Md=x$;var Le=e=>String(e).padStart(2,"0"),$n=new Map,ne=(e,t)=>e.split(" ").forEach(n=>$n.set(n,t)),Ud="january february march april may june july august september october november december".split(" ");Ud.forEach((e,t)=>{ne(e,{k:"m",v:t+1}),ne(e.slice(0,3),{k:"m",v:t+1})});ne("sept",{k:"m",v:9});var Wd="sunday monday tuesday wednesday thursday friday saturday".split(" "),Ii=["su","mo","tu","we","th","fr","sa"];Wd.forEach((e,t)=>ne(e+(t===4?" thur thurs thu":t===2?" tues tue":t===3?" weds wed":" "+e.slice(0,3)),{k:"w",s:Ii[t]}));var E$="zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");E$.forEach((e,t)=>t&&ne(e,{k:"n",v:t,w:!0}));"twenty thirty forty fifty".split(" ").forEach((e,t)=>ne(e,{k:"n",v:20+10*t,w:!0,s:"tens"}));var T$="first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth".split(" ");T$.forEach((e,t)=>ne(e,{k:"n",v:t+1,o:!0,w:!0}));ne("thirtieth",{k:"n",v:30,o:!0,w:!0});ne("fortieth",{k:"n",v:40,o:!0,w:!0});ne("day",{k:"u",s:"d",sg:!0});ne("days",{k:"u",s:"d"});ne("week",{k:"u",s:"w",sg:!0});ne("weeks wk wks",{k:"u",s:"w"});ne("month",{k:"u",s:"m",sg:!0});ne("months mth mos mths",{k:"u",s:"m"});ne("year",{k:"u",s:"y",sg:!0});ne("years yr yrs",{k:"u",s:"y"});ne("to >",{k:"sep",s:"to"});ne("until till til through thru ending",{k:"sep",s:"until"});ne("and n",{k:"and"});ne("from starting beginning begins",{k:"from"});ne("between",{k:"between"});ne("at",{k:"at"});ne("in",{k:"in"});ne("of",{k:"of"});ne("for",{k:"for"});ne("ago back",{k:"ago"});ne("now",{k:"now"});ne("after ahead",{k:"after"});ne("before",{k:"before"});ne("every each",{k:"every"});ne("other alternate alt",{k:"other"});ne("a an",{k:"a"});ne("am",{k:"mer",s:"am"});ne("pm",{k:"mer",s:"pm"});ne("noon midday",{k:"noon"});ne("midnight",{k:"mid"});ne("morning",{k:"part",s:"am"});ne("afternoon evening",{k:"part",s:"pm"});ne("night",{k:"part",s:"night"});ne("today tdy",{k:"rel",v:0});ne("tomorrow tmrw tmr tmw",{k:"rel",v:1});ne("overmorrow",{k:"rel",v:2});ne("yesterday yday",{k:"rel",v:-1});ne("next nxt",{k:"mod",v:1});ne("gone passed",{k:"gone"});ne("prev",{k:"mod",v:-1});ne("coming",{k:"mod",v:1,s:"coming"});ne("last lst previous",{k:"mod",v:-1});ne("this",{k:"mod",v:0});ne("weekend wknd",{k:"wknd"});ne("weekdays weekday workdays workday wkdays",{k:"wkd"});ne("work business",{k:"work"});ne("daily everyday",{k:"daily"});ne("weekly",{k:"weekly"});ne("biweekly fortnightly",{k:"biweekly"});ne("monthly",{k:"monthly"});ne("yearly annually",{k:"yearly"});ne("times time x occurrences",{k:"times"});ne("end",{k:"end"});ne("half",{k:"half"});ne("quarter",{k:"quarter"});ne("thousand",{k:"thousand"});ne("martin luther row single",{k:"skip"});ne("up",{k:"up"});ne("past",{k:"mod",v:-1,s:"past"});ne("eve",{k:"eve"});ne("new",{k:"new"});ne("oclock",{k:"oclock"});"the on during around about approx sometime pls please plz us st de ish just".split(" ").forEach(e=>ne(e,{k:"skip"}));var Pd={christmas:"12-25",xmas:"12-25",halloween:"10-31",valentines:"02-14",valentine:"02-14",juneteenth:"06-19",nye:"12-31",patricks:"03-17",cinco:"05-05",independence:"07-04",thanksgiving:"th#4@11",memorial:"mo#-1@05",labor:"mo#1@09",mlk:"mo#3@01",ny:"01-01",paddys:"03-17",mem:"mo#-1@05",turkey:"th#4@11",king:"mo#3@01",presidents:"mo#3@02",mothers:"su#2@05",mother:"su#2@05",fathers:"su#3@06",father:"su#3@06",columbus:"mo#2@10"};for(let e in Pd)ne(e,{k:"h",s:Pd[e]});ne("mayo",{k:"mayo"});"valentines valentine patricks independence presidents mlk king ny paddys mem turkey mothers mother fathers father columbus memorial labor".split(" ").forEach(e=>$n.get(e).z=!0);function S$(e,t,n){if(Math.abs(e.length-t.length)>n)return n+1;let r=[];for(let i=0;i<=e.length;i++){r[i]=[i];for(let a=1;a<=t.length;a++)if(!i)r[i][a]=a;else{let s=Math.min(r[i-1][a]+1,r[i][a-1]+1,r[i-1][a-1]+(e[i-1]===t[a-1]?0:1));i>1&&a>1&&e[i-1]===t[a-2]&&e[i-2]===t[a-1]&&(s=Math.min(s,r[i-2][a-2]+1)),r[i][a]=s}}return r[e.length][t.length]}var I$=new Set("sept tues thur thurs weds".split(" ")),C$=[...$n.keys()].filter(e=>e.length>=4&&!I$.has(e));function Ld(e){if(e.length<3)return;let t=e.length>=8?2:1,n,r=t+1;for(let i of C$){if(e.length===3&&(i.length!==4||i[0]!==e[0]))continue;let a=S$(e,i,t),s=o=>Math.abs(o.length-e.length);(a<r||a===r&&n&&(s(i)<s(n)||s(i)===s(n)&&i.length>n.length))&&(r=a,n=i)}return n?$n.get(n):void 0}function qs(e){let t=$n.get(e);if(t)return t;if(e.length>=4&&e.endsWith("s")&&e!=="thus"){let n=$n.get(e.slice(0,-1));if(n&&n.k==="w")return{...n,pl:!0}}}function Fs(e){if(e.length>=3){let t=Ud.findIndex(n=>n.startsWith(e));if(t>=0)return{k:"m",v:t+1,p:!0}}if(e.length>=2){let t=Wd.findIndex(n=>n.startsWith(e));if(t>=0)return{k:"w",s:Ii[t],p:!0}}for(let t of $n.keys())if(t.startsWith(e)&&t.length>e.length)return{k:"skip",p:!0}}function A$(e,t){let n=e.length,r=[{c:0,t:[]}];for(let i=0;i<n;i++){let a=r[i];if(a)for(let s=i+2;s<=n;s++){let o=e.slice(i,s),u=o.length===2&&!"to at of in on am pm".includes(o)?void 0:qs(o),d=1;!u&&s-i>=5&&(u=Ld(o),d=3),!u&&t&&s===n&&o.length>=3&&(u=Fs(o),d=3),u&&(!r[s]||a.c+d<r[s].c)&&(r[s]={c:a.c+d,t:[...a.t,{...u,s:u.s}]})}}return r[n]?.t}var Pt=(e,t)=>e>=1&&e<=12&&t>=1&&t<=[31,29,31,30,31,30,31,31,30,31,30,31][e-1],z$=(e,t)=>t===(e%100>=11&&e%100<=13?"th":{1:"st",2:"nd",3:"rd"}[e%10]??"th");function O$(e){e=e.replace(/(?<![a-z])([ap])\.\s?m\b\.?/g,"$1m").replace(/[–—−]/g,"-").replace(/'/g,"").replace(/\b2(morrow|moro|mrw)\b/g,"tomorrow").replace(/\bo ?clock\b/g,"oclock");let t=[],n=0,r=()=>t[t.length-1]?.k==="n";for(;n<e.length;){let a=e.slice(n),s;if((s=a.match(/^(\d{4})-(\d{2})-(\d{2})(?!\d)/))&&Pt(+s[2],+s[3]))t.push({k:"D",s:s[0],v:1});else if(s=a.match(/^(\d{1,2})([\/.-])(\d{1,2})\2(\d{4}|\d{2})(?!\d)/)){let[o,u]=[+s[1],+s[3]];o>12&&u<=12&&([o,u]=[u,o]);let d=+s[4]<100?2e3+ +s[4]:+s[4];Pt(o,u)?t.push({k:"D",s:`${d}-${Le(o)}-${Le(u)}`,v:1}):t.push({k:"?",s:s[0]})}else if((s=a.match(/^(\d{1,2})\.(\d{2})(?!\d)/))&&+s[1]<24&&+s[2]<60&&(+s[2]>31||s[2]==="00"||/^\s?([ap]m|-)/.test(a.slice(s[0].length))||/^\s?(in|morning|evening|afternoon|night)\b/.test(a.slice(s[0].length))||+s[2]%5===0&&/^\s?(to|till|til|until|through|thru)\s?\d{1,2}\.\d\d\b/.test(a.slice(s[0].length))||["m","w","D","rel","u","ago","at"].includes(t[t.length-1]?.k??"")))t.push({k:"t",v:+s[1],m:+s[2],z:s[1].length===2&&s[1][0]==="0"});else if(s=a.match(/^(\d{1,2}):(\d{2})(?!\d)/))t.push({k:"t",v:+s[1],m:+s[2],z:s[1].length===2&&s[1][0]==="0"});else if((s=a.match(/^(\d{1,2})([\/.])(\d{1,2})(?![\d:])/))&&Pt(...+s[1]>12?[+s[3],+s[1]]:[+s[1],+s[3]])){let[o,u]=+s[1]>12?[+s[3],+s[1]]:[+s[1],+s[3]];t.push({k:"D",s:`${Le(o)}-${Le(u)}`,v:0})}else if((s=a.match(/^(\d{1,2})-(\d{1,2})(?![\d:]|\s?[ap]m)/))&&+s[2]>12&&Pt(+s[1],+s[2])&&t[t.length-1]?.k!=="m"&&!/^\s?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/.test(a.slice(s[0].length)))t.push({k:"D",s:`${Le(+s[1])}-${Le(+s[2])}`,v:0});else if((s=a.match(/^(\d+)(st|nd|rd|th)/))&&(z$(+s[1],s[2])||!/^[a-z]/.test(a.slice(s[0].length))))t.push({k:"n",v:+s[1],o:!0,len:s[1].length});else if((s=a.match(/^\d{3,4}(?!\d)/))&&!(s[0].length===4&&+s[0]>=1900&&+s[0]<=2100)&&+s[0].slice(0,-2)<=23&&+s[0].slice(-2)<60&&(s[0].length===4||+s[0].slice(-2)>0)){let o=+s[0].slice(0,-2);t.push({k:"t",v:o,m:+s[0].slice(-2),z:s[0][0]==="0"})}else if(s=a.match(/^\d+/))t.push({k:"n",v:+s[0],len:s[0].length});else if(s=a.match(/^[a-z]+/)){let o=s[0],u=n+o.length>=e.trimEnd().length,d;if(o==="mos"?d={k:"u",s:"m"}:o==="mo"?d=r()||t[t.length-1]?.k==="a"?{k:"u",s:"m"}:qs("monday"):(o==="d"||o==="w"||o==="y")&&r()?d={k:"u",s:o}:d=qs(o),d)t.push(d);else if(u&&["week","year","month"].some(c=>c.startsWith(o)&&o.length>=3))t.push({k:"skip",p:!0});else if(u&&(d=Fs(o))&&d.k!=="skip")t.push(d);else if(d=Ld(o))t.push(d);else if(u&&(d=Fs(o)))t.push(d);else{let c=A$(o,u);c?t.push(...c):t.push({k:"?",s:o})}n+=o.length;continue}else if(s=a.match(/^\+(\d+)(?=\s?[a-z])/))t.push({k:"n",v:+s[1],len:s[1].length,s:"+"});else if(/^[%$#&*+=<~^]/.test(a)){t.push({k:"?",s:a[0]}),n++;continue}else if(a[0]==="-"){t.push({k:"sep",s:"-"}),n++;continue}else if(a[0]==="@"){t.push({k:"at"}),n++;continue}else if(a[0]==="/"||a[0]==="&"){t.push({k:"and"}),n++;continue}else{n++;continue}n+=s[0].length}let i=[];for(let a=0;a<t.length;a++){let s=t[a];if(s.k==="skip"&&!s.p)continue;let o=s.s==="tens"&&t[a+1]?.s==="-"?a+2:a+1,u=t[o];if(s.s==="tens"&&u&&u.k==="n"&&u.w&&u.v<10){i.push({k:"n",v:s.v+u.v,o:u.o,w:!0}),a=o;continue}if(s.k==="half"){let d=t[a+1]?.s==="past"?a+2:a+1,c=t[d];if(c&&c.k==="n"&&c.v>=1&&c.v<=12){i.push({k:"t",v:c.v,m:30}),a=d;continue}}if(s.k==="n"&&s.w&&(s.v===20&&u&&u.k==="n"&&u.w&&u.v>=20&&u.v<40||s.v===2&&u?.k==="thousand"&&t[a+2]?.w)){let d=u.k==="thousand"?t[a+2].v:u.v,c=u.k==="thousand"?a+2:a+1,h=(u.k==="thousand",2e3+d);t[c+1]?.w&&t[c+1].v<10&&d%10===0&&(h+=t[++c].v),i.push({k:"n",v:h,len:4}),a=c;continue}if(s.k==="quarter"||s.k==="n"&&s.v%5===0&&s.v>=5&&s.v<=55&&u?.k==="mod"&&u.s==="past"){let d=s.k==="quarter"&&t[a+1]?.k==="sep",c=u?.s==="past",h=t[a+2];if((d||c)&&h?.k==="n"&&h.v>=1&&h.v<=12){i.push(d?{k:"t",v:h.v===1?12:h.v-1,m:45}:{k:"t",v:h.v,m:s.k==="quarter"?15:s.v}),a+=2;continue}}if(s.k==="n"&&s.w&&!s.o&&s.v>=1&&s.v<=12&&u?.s==="tens"&&t[a+2]?.w&&!t[a+2].o&&t[a+2].v<10&&t[a+2].v%5===0){i.push({k:"t",v:s.v,m:u.v+t[a+2].v}),a+=2;continue}if(s.k==="n"&&s.w&&!s.o&&s.v>=1&&s.v<=12&&u&&u.k==="n"&&u.w&&!u.o&&u.v>=10&&u.v<60&&u.v%5===0){i.push({k:"t",v:s.v,m:u.v}),a++;continue}i.push(s)}return i}var Vs="mo,tu,we,th,fr",Qe=e=>e.mer?`${Le(e.h%12+(e.mer==="pm"?12:0))}:${Le(e.m)}`:e.kn?`${Le(e.h)}:${Le(e.m)}`:e.m?`${e.h}:${Le(e.m)}?`:`${e.h}?`,Si=e=>(e.mer?e.h%12+(e.mer==="pm"?12:0):e.h)*60+e.m;function Bd(e,t,n){return e.mer&&!t.mer&&!t.kn&&t.h>=1&&t.h<=12&&n&&(t={...t,mer:e.mer},Si(t)<=Si(e)&&(t={...t,mer:e.mer==="pm"?"am":"pm"})),e.num&&!t.mer&&!t.kn?t={...t,kn:!0}:t.num&&!t.mer&&e.col&&!e.mer&&!e.kn&&(e={...e,kn:!0}),!e.mer&&t.mer&&e.h<=12&&!e.kn&&(e={...e,mer:t.mer},Si(e)>=Si(t)&&(e={...e,mer:t.mer==="pm"?"am":"pm"})),[e,t]}function R$(e){let t=0,n=(w,f=0)=>e[t+f]?.k===w,r=w=>e[t]?.k===w?e[t++]:void 0,i=()=>t>=e.length;function a(w){let f=t;r("at");let $=e[t],E;if(!$)E=void 0;else if($.k==="noon")t++,E={h:12,m:0,kn:!0};else if($.k==="mid")t++,E={h:0,m:0,kn:!0};else if($.k==="t"){t++;let N=r("mer")?.s;E={h:$.v,m:$.m,mer:N,kn:!!$.z||$.v>=13||$.v===0||$.m===0&&$.v>=10&&!N,num:!!$.z||$.v>=13||!!N,col:!0},N&&($.v>12||$.v===0)&&(E=void 0)}else $.k==="n"&&!$.o&&n("mer",1)&&$.v>=1&&$.v<=12?(t+=2,E={h:$.v,m:0,mer:e[t-1].s,kn:!1,num:!0}):$.k==="n"&&!$.o&&$.v>=1&&$.v<=12&&($.w||($.len??9)<=2)&&(n("part",1)||(n("in",1)||n("at",1))&&n("part",2))?(t++,E={h:$.v,m:0,kn:!1}):$.k==="n"&&!$.o&&n("oclock",1)&&$.v>=1&&$.v<=12?(t+=2,E={h:$.v,m:0,mer:r("mer")?.s,kn:!1}):w&&$.k==="n"&&!$.o&&$.v>=1&&$.v<=12&&($.w||($.len??9)<=2)&&!n("u",1)&&!n("m",1)&&(t++,E={h:$.v,m:0,kn:!1});if(!E)return t=f,void 0;let z=t;if((n("in")||n("at"))&&z++,e[z]?.k==="part"&&!E.mer){let N=e[z].s;t=z+1,N==="night"?E.h===12?E={h:0,m:E.m,kn:!0}:E.h>=6?E={...E,mer:"pm"}:E={...E,mer:"am"}:E.h<=12&&(E={...E,mer:N})}return E}function s(w){return!!w&&w.k==="n"&&w.v>=1&&w.v<=31&&(w.w||(w.len??9)<=2)&&e[e.indexOf(w)+1]?.k!=="mer"}function o(w){return(e[w]?.k==="of"||e[w]?.k==="in")&&w++,e[w]?.k==="m"?e[w]:void 0}function u(){let w=e[t];if(w?.k==="n"&&w.len===4&&w.v>=1900&&w.v<=2100&&!w.o)return t++,w.v}function d(w,f,$,E){return{s:$?`${$}-${Le(w)}-${Le(f)}`:`${Le(w)}-${Le(f)}`,k:$?"other":"md",d:f,mo:w,sh:E}}function c(){let w=t;for(;n("skip")&&!e[t].p;)t++;n("in")&&(n("m",1)||n("n",1)&&e[t+1].len===4)&&t++;let f=e[t];if(!f)return t=w,void 0;let $,E;if(f.k==="D")t++,$=f.v?{s:f.s,k:"other"}:{s:f.s,k:"md",mo:+f.s.slice(0,2),d:+f.s.slice(3)};else if(f.k==="rel")t++,$={s:`${f.v>=0?"+":""}${f.v}d`,k:"other"};else if(f.k==="u"&&f.s==="d"&&(n("after",1)||n("before",1))&&n("rel",2))$={s:`${(e[t+1].k==="after"?1:-1)*2>0?"+":"-"}2d`,k:"other"},t+=3;else if(f.k==="in"&&(n("n",1)||n("a",1))&&n("u",2)&&(n("a",1)||e[t+1].v===1||!e[t+2].sg))$={s:`+${n("a",1)?1:e[t+1].v}${e[t+2].s}`,k:"other"},t+=3;else if((f.k==="n"||f.k==="a")&&n("u",1)&&(n("ago",2)||(n("from",2)||n("after",2)||n("before",2))&&(n("now",3)||n("rel",3))))$={s:`${n("ago",2)||n("before",2)?"-":"+"}${f.k==="a"?1:f.v}${e[t+1].s}`,k:"other"},t+=n("ago",2)?3:4;else if(f.k==="n"&&f.s==="+"&&n("u",1))$={s:`+${f.v}${e[t+1].s}`,k:"other"},t+=2;else if(f.k==="u"&&f.s!=="d"&&(n("gone",1)||n("before",1)||n("after",1))&&!n("rel",2))$={s:`${f.s.toUpperCase()}${n("after",1)?"+1":"-1"}`,k:"other"},t+=2;else if(f.k==="u"&&f.s==="w"&&t===0&&e.length===1)t++,$={s:"W+0",k:"other"};else if(f.k==="mod"&&n("u",1)&&e[t+1].s!=="d"){let z=f.v;$={s:`${e[t+1].s.toUpperCase()}${z>=0?"+":""}${z}`,k:"other"},t+=2}else if(f.k==="mod"&&f.v===0&&n("wknd",1)||f.k==="wknd")t+=f.k==="wknd"?1:2,$={s:"sa>su",k:"other"};else if((f.k==="n"&&(f.o||f.w)||f.k==="mod"&&f.v===-1)&&n("w",1)&&(E=o(t+2)))$={s:`${e[t+1].s}#${f.k==="mod"?-1:f.v}@${Le(E.v)}`,k:"other"},t=e.indexOf(E,t+2)+1;else if(f.k==="mod"&&n("w",1))$={s:`${e[t+1].s}${f.v===0||f.s==="coming"?"":f.v>0?"+1":"-1"}`,k:"other"},t+=2;else if(f.k==="w"){t++;let z=e[t],N=r("gone")?"-1":"";!N&&z?.k==="mod"&&z.v!==0&&z.s!=="coming"&&!n("w",1)&&!n("u",1)&&!n("m",1)&&(N=z.v>0?"+1":"-1",t++),$={s:f.s+N,k:"other"}}else if(f.k==="h"){t++;let z=f.s;if(z==="05-05"){for(;n("skip");)t++;if(!r("mayo"))return t=w,void 0}else if(r("eve"))z==="12-25"&&(z="12-24");else if(n("u")&&e[t].s==="d")t++;else if(f.z)return t=w,void 0;$=/^\d\d-/.test(z)?{s:z,k:"md",mo:+z.slice(0,2),d:+z.slice(3)}:{s:z,k:"other"}}else if(f.k==="new"&&n("u",1)&&e[t+1].s==="y"){t+=2;let z=r("eve");!z&&n("u")&&e[t].s==="d"&&t++,$={s:z?"12-31":"01-01",k:"md",mo:z?12:1,d:z?31:1}}else if(f.k==="m"&&(e[t+1]?.o||e[t+1]?.w)&&e[t+1].k==="n"&&n("w",2))$={s:`${e[t+2].s}#${e[t+1].v}@${Le(f.v)}`,k:"other"},t+=3;else if(f.k==="m")if(t++,s(e[t])){let z=e[t++].v,N=u();$=Pt(f.v,z)?d(f.v,z,N,!0):void 0}else $={s:`M@${Le(f.v)}`,k:"mon",mo:f.v};else if(f.k==="n"&&s(f)&&(n("m",1)||n("of",1)&&n("m",2))){t+=n("m",1)?1:2;let z=e[t++].v,N=u();$=Pt(z,f.v)?d(z,f.v,N):void 0}else if(f.k==="n"&&f.len===4&&!f.o&&n("m",1)&&s(e[t+2])){let z=e[t+1].v,N=e[t+2].v;$=Pt(z,N)?d(z,N,f.v):void 0,t+=3}else f.k==="u"&&f.s==="m"&&n("of",1)&&n("m",2)?($={s:`M@${Le(e[t+2].v)}`,k:"mon",mo:e[t+2].v},t+=3):f.k==="u"&&f.s==="y"&&n("n",1)&&e[t+1].len===4?($={s:`Y@${e[t+1].v}`,k:"yr"},t+=2):f.k==="n"&&f.len===4&&f.v>=1900&&f.v<=2100&&!f.o&&!n("mer",1)?(t++,$={s:`Y@${f.v}`,k:"yr"}):f.k==="n"&&f.o&&f.v<=31&&(t++,$={s:String(f.v),k:"day",d:f.v});return $||(t=w),$}function h(){let w={},f=t;for(;;){if(!w.date){let E=c();if(E){w.date=E;continue}}if(!w.time&&w.num===void 0){let E=a(!1);if(E){w.time=E;continue}}let $=e[t];if(w.num===void 0&&!w.time&&$?.k==="n"&&!$.o&&$.v<=31&&($.w||($.len??9)<=2)){w.num=$.v,t++;continue}if((n("at")||n("in")||n("from"))&&(w.date||w.time||w.num!==void 0)){let E=t;if(t++,n("n")||n("t")||n("noon")||n("mid")||n("part")||(t=E),t!==E)continue}break}return!w.date&&!w.time&&w.num===void 0?(t=f,void 0):w}function g(w,f){w.num!==void 0&&(w.num>=1&&w.num<=12?w.time={h:w.num,m:0,mer:f,kn:!1}:w.num>=13&&w.num<=23&&(w.time={h:w.num,m:0,kn:!0,num:!0}),w.num=void 0)}function v(w,f){for(let[B,F]of[[w,f],[f,w]])if(B.num!==void 0)if(B.date)g(B);else if(F.date&&F.date.mo&&!F.time&&B.num>=1&&(B===w||F.date.sh)){if(B.date=Pt(F.date.mo,B.num)?d(F.date.mo,B.num):void 0,B.num=void 0,!B.date)return null}else{if(F.date&&!F.time)return null;g(B)}for(let[B,F]of[[w,f],[f,w]])if(B.date?.k==="day"){if(!F.date?.mo||B===f&&!F.date.sh||!Pt(F.date.mo,B.date.d))return null;B.date=d(F.date.mo,B.date.d)}if(w.date&&f.date&&w.date.k==="mon"!=(f.date.k==="mon")||w.date&&f.date&&w.date.k==="yr"!=(f.date.k==="yr"))return null;let $=w.time,E=f.time,z=w.date,N=f.date;return $&&E&&([$,E]=Bd($,E,!(z&&N))),$&&E?!z&&!N?`t ${Qe($)}>${Qe(E)}`:z&&!N?`dt ${z.s} ${Qe($)}>${Qe(E)}`:!z&&N?`dt ${N.s} ${Qe($)}>${Qe(E)}`:`dt ${z.s} ${Qe($)}>${N.s} ${Qe(E)}`:!$&&!E&&z&&N?`d ${z.s}>${N.s}`:null}function b(w){if(w.num!==void 0)if(w.date&&w.date.k!=="day")g(w);else{if(w.date)return null;if(w.num<1||w.num>12)return null;g(w)}return w.date?.k==="day"?null:w.date?.k==="mon"?`d ${w.date.s}`:w.date&&w.time?`dt ${w.date.s} ${Qe(w.time)}`:w.date?`d ${w.date.s}`:w.time?`t ${Qe(w.time)}`:null}function T(w){let f=a(w);if(!f)return;let $=t;if(n("sep")||n("and")){t++;let E=a(w);if(E){let[z,N]=Bd(f,E,!0);return`${Qe(z)}>${Qe(N)}`}t=$}return Qe(f)}function S(){let w=[];for(;n("w");)w.push(e[t++].s),n("and")&&n("w",1)&&t++;return w}let k=w=>[...new Set(w)].sort((f,$)=>(Ii.indexOf(f)+6)%7-(Ii.indexOf($)+6)%7),_=w=>w?.k==="n"?w.v:w?.k==="a"?1:void 0;function I(){let w="",f=1,$,E,z,N,B=!!r("every");for(;n("skip");)t++;let F;n("n")&&!e[t].o&&(e[t+1]?.pl||n("wkd",1))&&(F=e[t++].v);let R=e[t];if(!R)return null;let j=M=>(e[t+M]?.k==="n"&&(e[t+M].o||e[t+M].w)||e[t+M]?.k==="mod"&&e[t+M].v===-1)&&n("w",M+1);if(R.k==="daily")t++,w="d";else if(R.k==="u"&&R.s==="d")t++,w="d";else if(R.k==="wkd")t++,w="d",$=Vs.split(",");else if(R.k==="work"&&n("u",1))t+=2,w="d",$=Vs.split(",");else if(R.k==="w"&&n("sep",1)&&e[t+1].s==="-"&&R.s==="mo"&&e[t+2]?.s==="fr")t+=3,w="d",$=Vs.split(",");else if(R.k==="other"&&n("u",1))w=e[t+1].s,f=2,t+=2;else if(R.k==="other"&&n("w",1))t++,w="w",f=2,$=[e[t++].s];else if(B&&R.k==="n"&&n("u",1)&&"dwm".includes(e[t+1].s)&&!j(0)&&!(e[t+1].sg&&R.v!==1))w=e[t+1].s,f=R.v,t+=2;else if(R.k==="biweekly")t++,w="w",f=2;else if(R.k==="weekly")t++,w="w";else if(R.k==="monthly")t++,w="m";else if(R.k==="yearly"||B&&R.k==="u"&&R.s==="y")t++,w="y";else if(B&&R.k==="u"&&R.s==="w")t++,w="w";else if(B&&R.k==="u"&&R.s==="m")t++,w="m";else if(R.k==="mod"&&R.v===-1&&n("u",1)&&e[t+1].s==="d"){for(t+=2,n("of")&&t++;n("every")||n("skip");)t++;if(!r("u"))return null;w="m",z="d-1"}else if(R.k==="end"&&n("of",1)){if(t+=2,r("every"),!r("u"))return null;w="m",z="d-1"}else if(R.k==="w"||j(0)||R.k==="n"&&n("of",1)&&!n("w",1)){if(j(0)){let M=e[t].k==="mod"?-1:e[t].v,Y=e[t+1].s,G=t+2;for(e[G]?.k==="of"&&G++;e[G]?.k==="every"||e[G]?.k==="skip";)G++;if(e[G]?.k==="u"&&e[G].s==="m")t=G+1,w="m",E=`${Y}#${M}`;else if(B&&e[t].k==="n")f=M,t+=1,w="w",$=S();else return null}else if(R.k==="w")w="w",$=S();else if(R.k==="n"){let M=R.v;if(t++,n("of")&&t++,r("every"),!r("u"))return null;w="m",z=`d${M}`}}else if(B&&R.k==="m")w="y";else return null;if(B=!0,w==="w"&&(!$&&(n("w")||n("skip")&&n("w",1))&&($=S()),!$&&j(0)))return null;if(w==="m"&&!E&&!z){for(;n("skip");)t++;if(j(0)){let M=e[t].k==="mod"?-1:e[t].v;E=`${e[t+1].s}#${M}`,t+=2}else n("n")&&!n("m",1)&&!n("mer",1)&&e[t].v<=31&&!n("t",0)?(z=`d${e[t++].v}`,n("of")&&t++,n("every")&&t++,r("u")):n("mod")&&e[t].v===-1&&n("u",1)&&(z="d-1",t+=2,n("of")&&(t+=2))}if(w==="y"){let M=c();if(!M||M.k!=="md")return null;N=M.s}let q=F,oe,H,ee;for(;!i();){let M=e[t];if(M.k==="skip"&&!M.p)t++;else if(M.k==="weekly"||M.k==="daily"||M.k==="wkd")t++;else if(M.k==="every"&&_(e[t+1])!==void 0&&n("u",2))f=_(e[t+1]),t+=3;else if(M.k==="every"&&n("u",1))t+=2;else if(M.k==="every"&&n("other",1)&&n("u",2))f=2,t+=3;else if(M.k==="n"&&!M.o&&(n("times",1)||n("u",1)&&!q&&e[t+1].s===(w==="w"?"w":"d")))q=M.v,t+=2;else if(M.k==="for"&&_(e[t+1])!==void 0&&(n("u",2)||n("times",2)))q=_(e[t+1])*(w==="d"&&e[t+2].s==="w"?7:1),t+=3;else if(M.k==="times"&&M.s===void 0&&n("n",1))q=e[t+1].v,t+=2;else if(M.k==="sep"&&M.s==="until"||M.k==="up"&&n("sep",1)){M.k==="up"&&t++,t++;let Y=c();if(!Y||Y.k==="day"||Y.k==="mon")return null;oe=Y.s}else if(M.k==="from"){t++;let Y=t,G=c();if(G&&G.k!=="day"&&G.k!=="mon")H=G.s;else if(t=Y,ee=T(!0),!ee)return null}else{if(M.k==="from"||M.k==="sep"&&M.s==="to")return null;if(!ee&&(M.k==="at"||M.k==="t"||M.k==="noon"||M.k==="mid"||M.k==="n"&&!M.o&&M.v<=12&&(M.w||(M.len??9)<=2)&&!n("m",1)||M.k==="n"&&n("mer",1))){if(ee=T(!0),!ee)return null}else if(M.k==="of"||M.k==="in"||M.k==="every"||M.k==="a")t++;else return null}}if(w==="m"&&!E&&!z||w==="y"&&!N||w==="w"&&!$&&f<2)return null;let V=["R",`${w}/${f}`];return $&&V.push(k($).join(",")),E&&V.push(E),z&&V.push(z),N&&V.push(N),q&&V.push(`n${q}`),oe&&V.push(`u${oe}`),ee&&V.push(ee),H&&V.push(`s${H}`),`${ee?"dt":"d"} ${V.join(" ")}`}if(e.some((w,f)=>["every","other","daily","weekly","monthly","yearly","biweekly","wkd"].includes(w.k)||w.k==="w"&&(w.pl||e[f+1]?.k==="and"&&e[f+2]?.k==="w"&&!e.some($=>$.k==="between"))||w.k==="u"&&w.s==="m"&&e[f-1]?.k==="of"&&e[f+1]?.k!=="m")||e[0]?.s==="mo"&&e[1]?.k==="sep"&&e[1].s==="-"&&e[2]?.s==="fr")return I();for(;n("from")||n("between")||n("at")||n("for")||n("skip")&&!e[t].p;)t++;let A=h();if(!A)return null;if(i())return b(A);if(!(n("sep")||n("and")))return null;t++;let D=h();return!D||!i()?null:v(A,D)}function Vd(e){let t=O$(It(e));if(t.some(a=>a.k==="?")||t.length===1&&t[0].k==="n"&&t[0].w)return"x";let n=t.length,r=t[n-1],i=t[n-2];r?.p&&i?.k==="n"&&!i.o&&t[n-3]?.k!=="m"&&(n-=1);for(let a=n;a>0;a--){let s=R$(t.slice(0,a));if(s){let o=t[a],u=t[a-1],d=t[a-2];return o&&u?.k==="w"&&(["of","in"].includes(o.k)&&(d?.k==="mod"&&d.v===-1||d?.k==="n"&&(d.o||d.w))||a===1&&u.s==="sa"&&o.k==="sep"&&o.s==="to")||a===1&&a<t.length&&t[0].k==="n"&&!t[0].o&&(o.p||["u","w","m"].includes(o.k))?"x":s}}return"x"}var D$=St("heuristic-full",Vd),qd=D$;var Ue=e=>String(e).padStart(2,"0"),dt=new Map,J=(e,t)=>e.split(" ").forEach(n=>dt.set(n,t)),Hd="january february march april may june july august september october november december".split(" ");Hd.forEach((e,t)=>{J(e,{k:"m",v:t+1}),J(e.slice(0,3),{k:"m",v:t+1})});J("sept",{k:"m",v:9});var jd="sunday monday tuesday wednesday thursday friday saturday".split(" "),zi=["su","mo","tu","we","th","fr","sa"];jd.forEach((e,t)=>J(e+(t===4?" thur thurs thu":t===2?" tues tue":t===3?" weds wed":" "+e.slice(0,3)),{k:"w",s:zi[t]}));var N$="zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");N$.forEach((e,t)=>t&&J(e,{k:"n",v:t,w:!0}));"twenty thirty forty fifty".split(" ").forEach((e,t)=>J(e,{k:"n",v:20+10*t,w:!0,s:"tens"}));var M$="first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth".split(" ");M$.forEach((e,t)=>J(e,{k:"n",v:t+1,o:!0,w:!0}));J("thirtieth",{k:"n",v:30,o:!0,w:!0});J("fortieth",{k:"n",v:40,o:!0,w:!0});J("day",{k:"u",s:"d",sg:!0});J("days",{k:"u",s:"d"});J("week",{k:"u",s:"w",sg:!0});J("weeks wk wks",{k:"u",s:"w"});J("month",{k:"u",s:"m",sg:!0});J("months mth mos mths",{k:"u",s:"m"});J("year",{k:"u",s:"y",sg:!0});J("years yr yrs",{k:"u",s:"y"});J("to >",{k:"sep",s:"to"});J("until till til through thru ending",{k:"sep",s:"until"});J("and n",{k:"and"});J("from starting beginning begins",{k:"from"});J("between",{k:"between"});J("at",{k:"at"});J("in",{k:"in"});J("of",{k:"of"});J("for",{k:"for"});J("ago back prior",{k:"ago"});J("now",{k:"now"});J("after ahead",{k:"after"});J("before",{k:"before"});J("every each",{k:"every"});J("other alternate alt",{k:"other"});J("a an",{k:"a"});J("am",{k:"mer",s:"am"});J("pm",{k:"mer",s:"pm"});J("noon midday",{k:"noon"});J("midnight",{k:"mid"});J("morning",{k:"part",s:"am"});J("afternoon evening",{k:"part",s:"pm"});J("night",{k:"part",s:"night"});J("today tdy tday",{k:"rel",v:0});J("tomorrow tomoz tmrw tmr tmw",{k:"rel",v:1});J("overmorrow",{k:"rel",v:2});J("yesterday yday",{k:"rel",v:-1});J("next nxt",{k:"mod",v:1});J("gone passed",{k:"gone"});J("prev",{k:"mod",v:-1});J("coming",{k:"mod",v:1,s:"coming"});J("last lst previous",{k:"mod",v:-1});J("this",{k:"mod",v:0});J("weekend wknd",{k:"wknd"});J("weekdays weekday workdays workday wkdays",{k:"wkd"});J("work business",{k:"work"});J("daily everyday",{k:"daily"});J("weekly",{k:"weekly"});J("biweekly fortnightly",{k:"biweekly"});J("monthly",{k:"monthly"});J("yearly annually",{k:"yearly"});J("times time x occurrences",{k:"times"});J("end",{k:"end"});J("half",{k:"half"});J("thousand",{k:"thousand"});J("martin luther row single jr all thanks",{k:"skip"});J("up",{k:"up"});J("past",{k:"mod",v:-1,s:"past"});J("eve",{k:"eve"});J("new",{k:"new"});J("oclock",{k:"oclock"});J("oh",{k:"oh"});J("arvo",{k:"part",s:"pm"});J("yest",{k:"rel",v:-1});J("nx",{k:"mod",v:1});J("following",{k:"mod",v:1,s:"following"});J("final",{k:"mod",v:-1,s:"final"});J("wkly",{k:"weekly"});J("bimonthly",{k:"bimonthly"});J("quarter quarterly",{k:"quarter"});J("onwards onward only roughly abt maybe",{k:"skip"});"the on during around about approx sometime pls please plz us st de ish just".split(" ").forEach(e=>J(e,{k:"skip"}));var Fd={christmas:"12-25",xmas:"12-25",halloween:"10-31",valentines:"02-14",val:"02-14",pats:"03-17",mums:"su#2@05",mum:"su#2@05",moms:"su#2@05",dads:"su#3@06",dad:"su#3@06",giving:"th#4@11",valentine:"02-14",juneteenth:"06-19",nye:"12-31",patricks:"03-17",cinco:"05-05",independence:"07-04",thanksgiving:"th#4@11",memorial:"mo#-1@05",labor:"mo#1@09",mlk:"mo#3@01",ny:"01-01",paddys:"03-17",mem:"mo#-1@05",turkey:"th#4@11",king:"mo#3@01",presidents:"mo#3@02",mothers:"su#2@05",mother:"su#2@05",fathers:"su#3@06",father:"su#3@06",columbus:"mo#2@10"};for(let e in Fd)J(e,{k:"h",s:Fd[e]});J("mayo",{k:"mayo"});"valentines valentine mums mum moms dads dad patricks independence presidents mlk king ny paddys mem turkey mothers mother fathers father columbus memorial labor".split(" ").forEach(e=>dt.get(e).z=!0);function P$(e,t,n){if(Math.abs(e.length-t.length)>n)return n+1;let r=[];for(let i=0;i<=e.length;i++){r[i]=[i];for(let a=1;a<=t.length;a++)if(!i)r[i][a]=a;else{let s=Math.min(r[i-1][a]+1,r[i][a-1]+1,r[i-1][a-1]+(e[i-1]===t[a-1]?0:1));i>1&&a>1&&e[i-1]===t[a-2]&&e[i-2]===t[a-1]&&(s=Math.min(s,r[i-2][a-2]+1)),r[i][a]=s}}return r[e.length][t.length]}var B$=new Set("sept tues thur thurs weds yest tday tomoz".split(" ")),U$=[...dt.keys()].filter(e=>e.length>=4&&!B$.has(e));function Hs(e){if(e.length<3)return;let t=e.length>=6?2:1,n,r=t+1;for(let a of U$){if(e.length===3&&(a.length!==4||a[0]!==e[0]))continue;let s=P$(e,a,t),o=d=>Math.abs(d.length-e.length);if(s===2&&Math.abs(a.length-e.length)>1&&!(a.length>=8&&e.length>=7&&(dt.get(a).k==="w"||dt.get(a).k==="m")))continue;let u=d=>dt.get(d).k==="w"||dt.get(d).k==="m"?0:1;(s<r||s===r&&n&&(u(a)<u(n)||u(a)===u(n)&&(o(a)<o(n)||o(a)===o(n)&&a.length>n.length)))&&(r=s,n=a)}let i=n?dt.get(n):void 0;return i&&i.k==="w"&&e.endsWith("s")&&!n.endsWith("s")?{...i,pl:!0}:i}function js(e){let t=dt.get(e);if(t)return t;if(e.length>=4&&e.endsWith("s")&&e!=="thus"){let n=dt.get(e.slice(0,-1));if(n&&n.k==="w")return{...n,pl:!0}}if(e.length>=4&&e.endsWith("s")){let n=dt.get(e.slice(0,-1));if(n&&n.k==="m")return n}}function Ai(e){if(e.length>=3){let t=Hd.findIndex(n=>n.startsWith(e));if(t>=0)return{k:"m",v:t+1,p:!0}}if(e.length>=2){let t=jd.findIndex(n=>n.startsWith(e));if(t>=0)return{k:"w",s:zi[t],p:!0}}for(let t of dt.keys())if(t.startsWith(e)&&t.length>e.length)return{k:"skip",p:!0}}function W$(e,t){let n=e.length,r=[{c:0,t:[]}];for(let i=0;i<n;i++){let a=r[i];if(a)for(let s=i+2;s<=n;s++){let o=e.slice(i,s),u=o.length===2&&!"to at of in on am pm st de".includes(o)?void 0:js(o),d=1;!u&&s-i>=5&&(u=Hs(o),d=3),!u&&t&&s===n&&o.length>=3&&(u=Ai(o),d=3),u&&(!r[s]||a.c+d<r[s].c)&&(r[s]={c:a.c+d,t:[...a.t,{...u,s:u.s}]})}}return r[n]?.t}var Bt=(e,t)=>e>=1&&e<=12&&t>=1&&t<=[31,29,31,30,31,30,31,31,30,31,30,31][e-1],L$=(e,t)=>t===(e%100>=11&&e%100<=13?"th":{1:"st",2:"nd",3:"rd"}[e%10]??"th");function V$(e){e=e.replace(/(?<![a-z])([ap])\.\s?m\b\.?/g,"$1m").replace(/[–—−]/g,"-").replace(/'/g,"").replace(/\b2(morrow|moro|mrw)\b/g,"tomorrow").replace(/\b(can|could|shall) we (do|have|meet|make it|say)\b|\blet(s| us)( do| meet)?\b|\bhow about\b/g," ").replace(/\b2day\b/g,"today").replace(/\b(\d+)\s*wkly\b/g,"$1 wkly").replace(/\bo ?clock\b/g,"oclock");let t=[],n=0,r=()=>t[t.length-1]?.k==="n";for(;n<e.length;){let a=e.slice(n),s;if((s=a.match(/^(\d{4})-(\d{2})-(\d{2})(?!\d)/))&&Bt(+s[2],+s[3]))t.push({k:"D",s:s[0],v:1});else if(s=a.match(/^(\d{1,2})([\/.-])(\d{1,2})\2(\d{4}|\d{2})(?!\d)/)){let[o,u]=[+s[1],+s[3]];o>12&&u<=12&&([o,u]=[u,o]);let d=+s[4]<100?2e3+ +s[4]:+s[4];Bt(o,u)?t.push({k:"D",s:`${d}-${Ue(o)}-${Ue(u)}`,v:1}):t.push({k:"?",s:s[0]})}else if((s=a.match(/^(\d{1,2})\.(\d{2})(?!\d)/))&&+s[1]<24&&+s[2]<60&&(+s[2]>31||s[2]==="00"||/^\s?([ap]m|-)/.test(a.slice(s[0].length))||!/\d:\d\d/.test(e)&&/\d\s?([ap]m)\b|morning|afternoon|evening|arvo|night/.test(e)||/^\s?(to|till|til|until|through|thru|-)\s?\d{1,2}\.\d\d\b/.test(a.slice(s[0].length))||["m","w","D","rel","u","ago","at"].includes(t[t.length-1]?.k??"")||t[t.length-1]?.k==="sep"&&t[t.length-2]?.k==="t"))t.push({k:"t",v:+s[1],m:+s[2],z:s[1].length===2&&s[1][0]==="0"});else if(s=a.match(/^(\d{1,2}):(\d{2})(?!\d)/))t.push({k:"t",v:+s[1],m:+s[2],z:s[1].length===2&&s[1][0]==="0"});else if((s=a.match(/^(\d{1,2})([\/.])(\d{1,2})(?![\d:])/))&&Bt(...+s[1]>12?[+s[3],+s[1]]:[+s[1],+s[3]])){let[o,u]=+s[1]>12?[+s[3],+s[1]]:[+s[1],+s[3]];t.push({k:"D",s:`${Ue(o)}-${Ue(u)}`,v:0})}else if((s=a.match(/^(\d{1,2})-(\d{1,2})(?![\d:]|\s?[ap]m)/))&&+s[2]>12&&Bt(+s[1],+s[2])&&t[t.length-1]?.k!=="m"&&!/^\s?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/.test(a.slice(s[0].length)))t.push({k:"D",s:`${Ue(+s[1])}-${Ue(+s[2])}`,v:0});else if((s=a.match(/^(\d+)(st|nd|rd|th)/))&&(L$(+s[1],s[2])||!/^[a-z]/.test(a.slice(s[0].length))))t.push({k:"n",v:+s[1],o:!0,len:s[1].length});else if((s=a.match(/^\d{3,4}(?!\d)/))&&!(s[0].length===4&&+s[0]>=1900&&+s[0]<=2100)&&+s[0].slice(0,-2)<=23&&+s[0].slice(-2)<60&&(s[0].length===4||+s[0].slice(-2)>0)){let o=+s[0].slice(0,-2);t.push({k:"t",v:o,m:+s[0].slice(-2),z:s[0][0]==="0"})}else if(s=a.match(/^\d+/))t.push({k:"n",v:+s[0],len:s[0].length});else if(s=a.match(/^[a-z]+/)){let o=s[0],u=n+o.length>=e.trimEnd().length,d;if(o==="mos"?d={k:"u",s:"m"}:o==="mo"?d=r()||t[t.length-1]?.k==="a"?{k:"u",s:"m"}:js("monday"):(o==="d"||o==="w"||o==="y")&&r()?d={k:"u",s:o}:d=js(o),d)t.push(d);else if(u&&["week","year","month"].some(c=>c.startsWith(o)&&o.length>=3))t.push({k:"skip",p:!0});else if(u&&(d=Ai(o))&&d.k!=="skip")t.push(d);else if(o.length>=4&&(d=Ai(o))&&(d.k==="m"||d.k==="w"))t.push(u?d:{...d,p:void 0});else if(d=Hs(o))t.push(d);else if(o.length>=6&&o.endsWith("s")&&(d=Hs(o.slice(0,-1)))&&d.k==="w")t.push({...d,pl:!0});else if(u&&(d=Ai(o)))t.push(d);else{let c=W$(o,u);c?t.push(...c):t.push({k:"?",s:o})}n+=o.length;continue}else if(s=a.match(/^\+(\d+)(?=\s?[a-z])/))t.push({k:"n",v:+s[1],len:s[1].length,s:"+"});else if(a[0]==="+"){t.push({k:"and"}),n++;continue}else if(/^[%$#*=<~^]/.test(a)){t.push({k:"?",s:a[0]}),n++;continue}else if(a[0]==="-"){t.push({k:"sep",s:"-"}),n++;continue}else if(a[0]==="@"){t.push({k:"at"}),n++;continue}else if(a[0]==="/"||a[0]==="&"){t.push({k:"and"}),n++;continue}else{n++;continue}n+=s[0].length}let i=[];for(let a=0;a<t.length;a++){let s=t[a];if(s.k==="skip"&&!s.p)continue;let o=s.s==="tens"&&t[a+1]?.s==="-"?a+2:a+1,u=t[o];if(s.s==="tens"&&u&&u.k==="n"&&u.w&&u.v<10){i.push({k:"n",v:s.v+u.v,o:u.o,w:!0}),a=o;continue}if(s.k==="half"){let d=t[a+1]?.s==="past"?a+2:a+1,c=t[d];if(c&&c.k==="n"&&c.v>=1&&c.v<=12){i.push({k:"t",v:c.v,m:30}),a=d;continue}}if(s.k==="n"&&s.w&&(s.v===20&&u&&u.k==="n"&&u.w&&u.v>=20&&u.v<40||s.v===2&&u?.k==="thousand"&&t[a+2]?.w)){let d=u.k==="thousand"?t[a+2].v:u.v,c=u.k==="thousand"?a+2:a+1,h=(u.k==="thousand",2e3+d);t[c+1]?.w&&t[c+1].v<10&&d%10===0&&(h+=t[++c].v),i.push({k:"n",v:h,len:4}),a=c;continue}if(s.k==="quarter"||s.k==="n"&&s.v%5===0&&s.v>=5&&s.v<=55&&u?.k==="mod"&&u.s==="past"){let d=s.k==="quarter"&&t[a+1]?.k==="sep",c=u?.s==="past",h=t[a+2];if((d||c)&&h?.k==="n"&&h.v>=1&&h.v<=12){i.push(d?{k:"t",v:h.v===1?12:h.v-1,m:45}:{k:"t",v:h.v,m:s.k==="quarter"?15:s.v}),a+=2;continue}}if(s.k==="n"&&s.w&&!s.o&&s.v>=1&&s.v<=12&&u?.s==="tens"&&t[a+2]?.w&&!t[a+2].o&&t[a+2].v<10&&t[a+2].v%5===0){i.push({k:"t",v:s.v,m:u.v+t[a+2].v}),a+=2;continue}if(s.k==="n"&&s.w&&!s.o&&s.v>=1&&s.v<=12&&u?.k==="oh"&&t[a+2]?.w&&t[a+2].v<10){i.push({k:"t",v:s.v,m:t[a+2].v}),a+=2;continue}if(s.k==="n"&&!s.w&&!s.o&&(s.len??9)<=2&&s.v<=23&&u?.k==="n"&&!u.w&&!u.o&&u.len===2&&u.v%5===0&&u.v<60&&!["m","in","every","for","n","mod"].includes(i[i.length-1]?.k??"")&&!["u","m","times"].includes(t[a+2]?.k??"")){i.push({k:"t",v:s.v,m:u.v,z:s.v>=13}),a++;continue}if(s.k==="n"&&s.w&&!s.o&&s.v>=1&&s.v<=12&&u&&u.k==="n"&&u.w&&!u.o&&u.v>=10&&u.v<60&&u.v%5===0){i.push({k:"t",v:s.v,m:u.v}),a++;continue}i.push(s)}return i}var Gs="mo,tu,we,th,fr",Je=e=>e.mer?`${Ue(e.h%12+(e.mer==="pm"?12:0))}:${Ue(e.m)}`:e.kn?`${Ue(e.h)}:${Ue(e.m)}`:e.m?`${e.h}:${Ue(e.m)}?`:`${e.h}?`,Ci=e=>(e.mer?e.h%12+(e.mer==="pm"?12:0):e.h)*60+e.m;function Gd(e,t,n){return e.mer&&!t.mer&&!t.kn&&t.h>=1&&t.h<=12&&n&&(t={...t,mer:e.mer},Ci(t)<=Ci(e)&&(t={...t,mer:e.mer==="pm"?"am":"pm"})),e.num&&!t.mer&&!t.kn?t={...t,kn:!0}:t.num&&!t.mer&&e.col&&!e.mer&&!e.kn&&(e={...e,kn:!0}),!e.mer&&t.mer&&e.h<=12&&!e.kn&&(e={...e,mer:t.mer},Ci(e)>=Ci(t)&&(e={...e,mer:t.mer==="pm"?"am":"pm"})),[e,t]}function q$(e){let t=0,n=(w,f=0)=>e[t+f]?.k===w,r=w=>e[t]?.k===w?e[t++]:void 0,i=()=>t>=e.length;function a(w){let f=t;r("at");let $=e[t],E;if(!$)E=void 0;else if($.k==="noon")t++,E={h:12,m:0,kn:!0};else if($.k==="mid")t++,E={h:0,m:0,kn:!0};else if($.k==="t"){t++;let N=r("mer")?.s;E={h:$.v,m:$.m,mer:N,kn:!!$.z||$.v>=13||$.v===0||$.m===0&&$.v>=10&&!N,num:!!$.z||$.v>=13||$.v===0||!!N,col:!0},N&&($.v>12||$.v===0)&&(E=void 0)}else $.k==="n"&&!$.o&&n("mer",1)&&$.v>=1&&$.v<=12?(t+=2,E={h:$.v,m:0,mer:e[t-1].s,kn:!1,num:!0}):$.k==="n"&&!$.o&&$.v>=1&&$.v<=12&&($.w||($.len??9)<=2)&&(n("part",1)||(n("in",1)||n("at",1))&&(n("part",2)||n("mer",2)))?(t++,E={h:$.v,m:0,kn:!1}):$.k==="n"&&!$.o&&n("oclock",1)&&$.v>=1&&$.v<=12?(t+=2,E={h:$.v,m:0,mer:r("mer")?.s,kn:!1}):w&&$.k==="n"&&!$.o&&$.v>=1&&$.v<=12&&($.w||($.len??9)<=2)&&!n("u",1)&&!n("m",1)&&(t++,E={h:$.v,m:0,kn:!1});if(!E)return t=f,void 0;let z=t;if((n("in")||n("at"))&&z++,e[z]?.k==="mer"&&!E.mer&&z>t)E={...E,mer:e[z].s,num:!0},t=z+1;else if(e[z]?.k==="part"&&!E.mer){let N=e[z].s;t=z+1,N==="night"?E.h===12?E={h:0,m:E.m,kn:!0}:E.h>=6?E={...E,mer:"pm"}:E={...E,mer:"am"}:E.h<=12&&(E={...E,mer:N})}return E}function s(w){return!!w&&w.k==="n"&&w.v>=1&&w.v<=31&&(w.w||(w.len??9)<=2)&&e[e.indexOf(w)+1]?.k!=="mer"}function o(w){return(e[w]?.k==="of"||e[w]?.k==="in")&&w++,e[w]?.k==="m"?e[w]:void 0}function u(){let w=e[t];if(w?.k==="n"&&w.len===4&&w.v>=1900&&w.v<=2100&&!w.o)return t++,w.v}function d(w,f,$,E){return{s:$?`${$}-${Ue(w)}-${Ue(f)}`:`${Ue(w)}-${Ue(f)}`,k:$?"other":"md",d:f,mo:w,sh:E}}function c(){let w=t;for(;n("skip")&&!e[t].p;)t++;n("in")&&(n("m",1)||n("n",1)&&e[t+1].len===4)&&t++;let f=e[t];if(!f)return t=w,void 0;let $,E;if(f.k==="D")t++,$=f.v?{s:f.s,k:"other"}:{s:f.s,k:"md",mo:+f.s.slice(0,2),d:+f.s.slice(3)};else if(f.k==="rel")t++,$={s:`${f.v>=0?"+":""}${f.v}d`,k:"other"};else if(f.k==="u"&&f.s==="d"&&(n("after",1)||n("before",1))&&n("rel",2))$={s:`${(e[t+1].k==="after"?1:-1)*2>0?"+":"-"}2d`,k:"other"},t+=3;else if(f.k==="in"&&(n("n",1)||n("a",1))&&n("u",2)&&(n("a",1)||e[t+1].v===1||!e[t+2].sg))$={s:`+${n("a",1)?1:e[t+1].v}${e[t+2].s}`,k:"other"},t+=3,n("times")&&e[t].s===void 0&&t++;else if((f.k==="n"||f.k==="a")&&n("u",1)&&n("times",2)&&e[t+2].s===void 0&&(f.k==="a"||f.v===1||!e[t+1].sg))$={s:`+${f.k==="a"?1:f.v}${e[t+1].s}`,k:"other"},t+=3;else if((f.k==="n"||f.k==="a")&&n("u",1)&&(n("ago",2)||n("mod",2)&&e[t+2].s==="past"||(n("from",2)||n("after",2)||n("before",2))&&(n("now",3)||n("rel",3))))$={s:`${n("ago",2)||n("before",2)||n("mod",2)?"-":"+"}${f.k==="a"?1:f.v}${e[t+1].s}`,k:"other"},t+=n("ago",2)||n("mod",2)?3:4;else if(f.k==="n"&&f.s==="+"&&n("u",1))$={s:`+${f.v}${e[t+1].s}`,k:"other"},t+=2;else if(f.k==="u"&&f.s!=="d"&&(n("gone",1)||n("before",1)||n("after",1)||n("mod",1)&&e[t+1].v!==0)&&!n("rel",2))$={s:`${f.s.toUpperCase()}${n("after",1)||e[t+1].v===1?"+1":"-1"}`,k:"other"},t+=2;else if(f.k==="u"&&f.s==="w"&&t===0&&e.length===1)t++,$={s:"W+0",k:"other"};else if(f.k==="mod"&&n("u",1)&&e[t+1].s!=="d"){let z=f.v;$={s:`${e[t+1].s.toUpperCase()}${z>=0?"+":""}${z}`,k:"other"},t+=2}else if(f.k==="mod"&&f.v===0&&n("wknd",1)||f.k==="wknd")t+=f.k==="wknd"?1:2,$={s:"sa>su",k:"other"};else if((f.k==="n"&&(f.o||f.w)||f.k==="mod"&&f.v===-1)&&n("w",1)&&(E=o(t+2)))$={s:`${e[t+1].s}#${f.k==="mod"?-1:f.v}@${Ue(E.v)}`,k:"other"},t=e.indexOf(E,t+2)+1;else if(f.k==="mod"&&n("w",1))$={s:`${e[t+1].s}${f.v===0||f.s==="coming"?"":f.v>0?"+1":"-1"}`,k:"other"},t+=2;else if(f.k==="w"&&!(n("n",1)&&!e[t+1].o&&(n("in",2)||n("of",2))&&n("m",3))){t++;let z=e[t],N=r("gone")?"-1":"";!N&&n("before")&&!n("rel",1)?(N="-1",t++):z?.k==="mod"&&z.s==="coming"&&!n("w",1)&&!n("u",1)&&t++,!N&&z?.k==="mod"&&z.v!==0&&z.s!=="coming"&&!n("w",1)&&!n("u",1)&&!n("m",1)&&(N=z.v>0?"+1":"-1",t++),$={s:f.s+N,k:"other"}}else if(f.k==="h"){t++;let z=f.s;if(z==="05-05"){for(;n("skip");)t++;if(!r("mayo"))return t=w,void 0}else if(r("eve"))z==="12-25"&&(z="12-24");else if(n("u")&&e[t].s==="d")t++;else if(f.z)return t=w,void 0;let N=/^\d\d-/.test(z)?u():void 0;$=/^\d\d-/.test(z)?N?{s:`${N}-${z}`,k:"other"}:{s:z,k:"md",mo:+z.slice(0,2),d:+z.slice(3)}:{s:z,k:"other"}}else if(f.k==="new"&&n("u",1)&&e[t+1].s==="y"){t+=2;let z=r("eve");!z&&n("u")&&e[t].s==="d"&&t++,$={s:z?"12-31":"01-01",k:"md",mo:z?12:1,d:z?31:1}}else if(f.k==="m"&&(e[t+1]?.k==="n"&&(e[t+1].o||e[t+1].w)||e[t+1]?.k==="mod"&&e[t+1].v===-1)&&n("w",2))$={s:`${e[t+2].s}#${e[t+1].k==="mod"?-1:e[t+1].v}@${Ue(f.v)}`,k:"other"},t+=3;else if(f.k==="w"&&n("n",1)&&!e[t+1].o&&e[t+1].v>=1&&e[t+1].v<=5&&(n("in",2)||n("of",2))&&n("m",3))$={s:`${f.s}#${e[t+1].v}@${Ue(e[t+3].v)}`,k:"other"},t+=4;else if(f.k==="m")if(t++,s(e[t])){let z=e[t++].v,N=u();$=Bt(f.v,z)?d(f.v,z,N,!0):void 0}else $={s:`M@${Ue(f.v)}`,k:"mon",mo:f.v};else if(f.k==="n"&&s(f)&&(n("m",1)||n("of",1)&&n("m",2))){t+=n("m",1)?1:2;let z=e[t++].v,N=u();$=Bt(z,f.v)?d(z,f.v,N):void 0}else if(f.k==="n"&&f.len===4&&!f.o&&n("m",1)&&s(e[t+2])){let z=e[t+1].v,N=e[t+2].v;$=Bt(z,N)?d(z,N,f.v):void 0,t+=3}else f.k==="u"&&f.s==="m"&&n("of",1)&&n("m",2)?($={s:`M@${Ue(e[t+2].v)}`,k:"mon",mo:e[t+2].v},t+=3):f.k==="u"&&f.s==="y"&&n("n",1)&&e[t+1].len===4?($={s:`Y@${e[t+1].v}`,k:"yr"},t+=2):f.k==="n"&&f.len===4&&f.v>=1900&&f.v<=2100&&!f.o&&!n("mer",1)?(t++,$={s:`Y@${f.v}`,k:"yr"}):f.k==="n"&&f.o&&f.v<=31&&(t++,$={s:String(f.v),k:"day",d:f.v});return $||(t=w),$}function h(){let w={},f=t;for(;;){if(!w.date){let E=c();if(E){w.date=E;continue}}if(!w.time&&w.num===void 0){let E=a(!1);if(E){w.time=E;continue}}let $=e[t];if(w.num===void 0&&!w.time&&$?.k==="n"&&!$.o&&$.v<=31&&($.w||($.len??9)<=2)){w.num=$.v,t++;continue}if((n("at")||n("in")||n("from"))&&(w.date||w.time||w.num!==void 0)){let E=t;if(t++,n("n")||n("t")||n("noon")||n("mid")||n("part")||(t=E),t!==E)continue}break}return!w.date&&!w.time&&w.num===void 0?(t=f,void 0):w}function g(w,f){w.num!==void 0&&(w.num>=1&&w.num<=12?w.time={h:w.num,m:0,mer:f,kn:!1}:w.num>=13&&w.num<=23&&(w.time={h:w.num,m:0,kn:!0,num:!0}),w.num=void 0)}function v(w,f){for(let[B,F]of[[w,f],[f,w]])if(B.num!==void 0)if(B.date)g(B);else if(F.date&&F.date.mo&&!F.time&&B.num>=1&&(B===w||F.date.sh)){if(B.date=Bt(F.date.mo,B.num)?d(F.date.mo,B.num):void 0,B.num=void 0,!B.date)return null}else{if(F.date&&!F.time)return null;g(B)}for(let[B,F]of[[w,f],[f,w]])if(B.date?.k==="day"){if(!F.date?.mo||B===f&&!F.date.sh||!Bt(F.date.mo,B.date.d))return null;B.date=d(F.date.mo,B.date.d)}if(w.date&&f.date&&w.date.k==="mon"!=(f.date.k==="mon")||w.date&&f.date&&w.date.k==="yr"!=(f.date.k==="yr"))return null;let $=w.time,E=f.time,z=w.date,N=f.date;return $&&E&&([$,E]=Gd($,E,!(z&&N))),$&&E?!z&&!N?`t ${Je($)}>${Je(E)}`:z&&!N?`dt ${z.s} ${Je($)}>${Je(E)}`:!z&&N?`dt ${N.s} ${Je($)}>${Je(E)}`:`dt ${z.s} ${Je($)}>${N.s} ${Je(E)}`:!$&&!E&&z&&N?`d ${z.s}>${N.s}`:null}function b(w){if(w.num!==void 0)if(w.date&&w.date.k!=="day")g(w);else{if(w.date)return null;if(w.num<1||w.num>12)return null;g(w)}return w.date?.k==="day"?null:w.date?.k==="mon"?`d ${w.date.s}`:w.date&&w.time?`dt ${w.date.s} ${Je(w.time)}`:w.date?`d ${w.date.s}`:w.time?`t ${Je(w.time)}`:null}function T(w){let f=a(w);if(!f)return;let $=t;if(n("sep")||n("and")){t++;let E=a(w);if(E){let[z,N]=Gd(f,E,!0);return`${Je(z)}>${Je(N)}`}t=$}return Je(f)}function S(){let w=[];for(;n("w");)w.push(e[t++].s),n("and")&&n("w",1)&&t++;return w}let k=w=>[...new Set(w)].sort((f,$)=>(zi.indexOf(f)+6)%7-(zi.indexOf($)+6)%7),_=w=>w?.k==="n"?w.v:w?.k==="a"?1:void 0;function I(){let w="",f=1,$,E,z,N,B=!!r("every");for(;n("skip");)t++;let F;n("n")&&!e[t].o&&(e[t+1]?.pl||n("wkd",1))?F=e[t++].v:n("n")&&!e[t].o&&n("times",1)&&e[t+1].s===void 0&&(F=e[t].v,t+=2);let R=e[t];if(!R)return null;let j=M=>(e[t+M]?.k==="n"&&(e[t+M].o||e[t+M].w)||e[t+M]?.k==="mod"&&e[t+M].v===-1)&&n("w",M+1);if(R.k==="daily")t++,w="d";else if(R.k==="u"&&R.s==="d")t++,w="d";else if(R.k==="wkd")t++,w="d",$=Gs.split(",");else if(R.k==="work"&&n("u",1))t+=2,w="d",$=Gs.split(",");else if(R.k==="w"&&n("sep",1)&&R.s==="mo"&&e[t+2]?.s==="fr")t+=3,w="d",$=Gs.split(",");else if(R.k==="other"&&n("u",1))w=e[t+1].s,f=2,t+=2;else if(R.k==="other"&&n("w",1))t++,w="w",f=2,$=[e[t++].s];else if(R.k==="n"&&n("weekly",1))w="w",f=R.v,t+=2;else if(R.k==="bimonthly")t++,w="m",f=2;else if(R.k==="quarter")t++,w="m",f=3;else if(R.k==="u"&&R.s==="m"&&n("end",1))t+=2,w="m",z="d-1";else if(B&&R.k==="n"&&n("u",1)&&"dwm".includes(e[t+1].s)&&!j(0)&&!(e[t+1].sg&&!R.o&&R.v!==1))w=e[t+1].s,f=R.v,t+=2;else if(R.k==="biweekly")t++,w="w",f=2;else if(R.k==="weekly")t++,w="w";else if(R.k==="monthly")t++,w="m";else if(R.k==="yearly"||B&&R.k==="u"&&R.s==="y")t++,w="y";else if(B&&R.k==="u"&&R.s==="w")t++,w="w";else if(B&&R.k==="u"&&R.s==="m")t++,w="m";else if(R.k==="mod"&&R.v===-1&&n("u",1)&&e[t+1].s==="d"){for(t+=2,n("of")&&t++;n("every")||n("skip");)t++;if(!r("u"))return null;w="m",z="d-1"}else if(R.k==="end"&&n("of",1)){if(t+=2,r("every"),!r("u"))return null;w="m",z="d-1"}else if(R.k==="w"||j(0)||R.k==="n"&&(n("of",1)||n("every",1))&&!n("w",1)){if(j(0)){let M=e[t].k==="mod"?-1:e[t].v,Y=e[t+1].s,G=t+2;for(e[G]?.k==="of"&&G++;e[G]?.k==="every"||e[G]?.k==="skip";)G++;if(e[G]?.k==="u"&&e[G].s==="m")t=G+1,w="m",E=`${Y}#${M}`;else if(e.some(he=>he.k==="monthly"))t+=2,w="m",E=`${Y}#${M}`;else if(B&&e[t].k==="n")f=M,t+=1,w="w",$=S();else return null}else if(R.k==="w")w="w",$=S();else if(R.k==="n"){let M=R.v;if(t++,n("of")&&t++,r("every"),!r("u"))return null;w="m",z=`d${M}`}}else if((B||e.some(M=>M.k==="every"))&&R.k==="m")w="y";else return null;if(B=!0,w==="w"&&(!$&&(n("w")||n("skip")&&n("w",1))&&($=S()),!$&&j(0)))return null;if(w==="m"&&!E&&!z){for(;n("skip");)t++;if(j(0)){let M=e[t].k==="mod"?-1:e[t].v;E=`${e[t+1].s}#${M}`,t+=2}else n("n")&&!n("m",1)&&!n("mer",1)&&e[t].v<=31&&!n("t",0)?(z=`d${e[t++].v}`,n("of")&&t++,n("every")&&t++,r("u")):n("mod")&&e[t].v===-1&&n("u",1)&&(z="d-1",t+=2,n("of")&&(t+=2))}if(w==="y"){let M=c();if(!M||M.k!=="md")return null;N=M.s}let q=F,oe,H,ee;for(;!i();){let M=e[t];if(M.k==="skip"&&!M.p)t++;else if(M.k==="weekly"||M.k==="daily"||M.k==="wkd"||M.k==="monthly"||M.k==="yearly")t++;else if(M.k==="every"&&_(e[t+1])!==void 0&&n("u",2))f=_(e[t+1]),t+=3;else if(M.k==="every"&&n("u",1))t+=2;else if(M.k==="every"&&n("other",1)&&n("u",2))f=2,t+=3;else if(M.k==="n"&&!M.o&&(n("times",1)||n("u",1)&&!q&&e[t+1].s===(w==="w"?"w":"d")))q=M.v,t+=2;else if(M.k==="for"&&_(e[t+1])!==void 0&&(n("u",2)||n("times",2)))q=_(e[t+1])*(w==="d"&&e[t+2].s==="w"?7:1),t+=3;else if(M.k==="for"&&n("n",1)&&!n("u",2)&&!n("m",2)&&!n("mer",2)&&!e[t+1].o&&!e[t+1].w)q=e[t+1].v,t+=2;else if(M.k==="times"&&M.s===void 0&&n("n",1))q=e[t+1].v,t+=2;else if(M.k==="sep"&&M.s==="until"||M.k==="up"&&n("sep",1)){M.k==="up"&&t++,t++;let Y=c();if(!Y||Y.k==="day"||Y.k==="mon")return null;oe=Y.s}else if(M.k==="from"){t++;let Y=t,G=c();if(G&&G.k!=="day"&&G.k!=="mon")H=G.s;else if(t=Y,ee=T(!0),!ee)return null}else{if(M.k==="from"||M.k==="sep"&&M.s==="to")return null;if(!ee&&(M.k==="at"||M.k==="t"||M.k==="noon"||M.k==="mid"||M.k==="n"&&!M.o&&M.v<=12&&(M.w||(M.len??9)<=2)&&!n("m",1)||M.k==="n"&&n("mer",1))){if(ee=T(!0),!ee)return null}else if(M.k==="of"||M.k==="in"||M.k==="every"||M.k==="a")t++;else return null}}if(w==="m"&&!E&&!z||w==="y"&&!N||w==="w"&&!$&&f<2)return null;let V=["R",`${w}/${f}`];return $&&V.push(k($).join(",")),E&&V.push(E),z&&V.push(z),N&&V.push(N),q&&V.push(`n${q}`),oe&&V.push(`u${oe}`),ee&&V.push(ee),H&&V.push(`s${H}`),`${ee?"dt":"d"} ${V.join(" ")}`}if(e.some((w,f)=>["every","other","daily","weekly","monthly","yearly","biweekly","bimonthly","quarter","wkd"].includes(w.k)||w.k==="w"&&(w.pl||e[f+1]?.k==="and"&&e[f+2]?.k==="w"&&!e.some($=>$.k==="between"))||w.k==="u"&&w.s==="m"&&e[f-1]?.k==="of"&&e[f+1]?.k!=="m")||e[0]?.k==="w"&&e.some((w,f)=>w.k==="for"&&e[f+1]?.k==="n"&&(e[f+2]?.k==="times"||e[f+2]?.k==="u")||w.k==="sep"&&w.s==="until"&&["m","D"].includes(e[f+1]?.k??""))||e.some((w,f)=>w.k==="times"&&w.s===void 0&&e[f+1]?.k==="n"&&e.some($=>$.k==="w"))||e[0]?.s==="mo"&&e[1]?.k==="sep"&&(e[1].s==="-"||e.length>3)&&e[2]?.s==="fr"||e.some((w,f)=>w.k==="w"&&e[f+1]?.k==="w"&&!e.slice(0,f).some($=>$.k==="sep"||$.k==="between")))return n("from")&&(t=1,c()&&(e=[...e.slice(t),...e.slice(0,t)]),t=0),I();for(;n("from")||n("between")||n("at")||n("for")||n("skip")&&!e[t].p;)t++;let A=h();if(!A)return null;if(i())return b(A);if(!(n("sep")||n("and")))return null;t++;let D=h();return!D||!i()?null:v(A,D)}function Kd(e){let t=V$(It(e));if(t.some(a=>a.k==="?")||t.length===1&&t[0].k==="n"&&t[0].w)return"x";let n=t.length,r=t[n-1],i=t[n-2];r?.p&&r.k!=="m"&&i?.k==="n"&&!i.o&&t[n-3]?.k!=="m"&&(n-=1);for(let a=n;a>0;a--){let s=q$(t.slice(0,a));if(s){let o=t[a],u=t[a-1],d=t[a-2];if(o&&u?.k==="w"&&(["of","in","every"].includes(o.k)&&(d?.k==="mod"&&d.v===-1||d?.k==="n"&&(d.o||d.w))||o.k==="and"&&a<=2||a===1&&u.s==="sa"&&o.k==="sep"&&o.s==="to")||a===1&&a<t.length&&t[0].k==="n"&&!t[0].o&&(o.p||["u","w","m"].includes(o.k)))return"x";if(a<t.length&&t[a-1]?.k==="n"&&(t[a-2]?.k==="sep"||t[a-2]?.k==="and")&&(o.p||o.k==="of"||o.k==="in")){a-=1;continue}return s}}return"x"}var F$=St("heuristic-full-2",Kd),Yd=F$;var Be=e=>String(e).padStart(2,"0"),Ke=new Map,Z=(e,t)=>e.split(" ").forEach(n=>Ke.set(n,t)),Qd="january february march april may june july august september october november december".split(" ");Qd.forEach((e,t)=>{Z(e,{k:"m",v:t+1}),Z(e.slice(0,3),{k:"m",v:t+1})});Z("sept",{k:"m",v:9});Ke.get("may").am=!0;Ke.get("march").am=!0;Ke.get("mar").am=!0;var Jd="sunday monday tuesday wednesday thursday friday saturday".split(" "),Di=["su","mo","tu","we","th","fr","sa"];Jd.forEach((e,t)=>Z(e+(t===4?" thur thurs thu":t===2?" tues tue":t===3?" weds wed":" "+e.slice(0,3)),{k:"w",s:Di[t]}));var G$="zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");G$.forEach((e,t)=>t&&Z(e,{k:"n",v:t,w:!0}));"twenty thirty forty fifty".split(" ").forEach((e,t)=>Z(e,{k:"n",v:20+10*t,w:!0,s:"tens"}));var H$="first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth".split(" ");H$.forEach((e,t)=>Z(e,{k:"n",v:t+1,o:!0,w:!0}));Z("thirtieth",{k:"n",v:30,o:!0,w:!0});Z("fortieth",{k:"n",v:40,o:!0,w:!0});Z("day",{k:"u",s:"d",sg:!0});Z("days",{k:"u",s:"d"});Z("week",{k:"u",s:"w",sg:!0});Z("weeks wk wks",{k:"u",s:"w"});Z("month",{k:"u",s:"m",sg:!0});Z("months mth mos mths",{k:"u",s:"m"});Z("year",{k:"u",s:"y",sg:!0});Z("years yr yrs",{k:"u",s:"y"});Z("to >",{k:"sep",s:"to"});Z("until till til through thru ending",{k:"sep",s:"until"});Z("and n",{k:"and"});Z("from starting beginning begins",{k:"from"});Z("between",{k:"between"});Z("at",{k:"at"});Z("in",{k:"in"});Z("of",{k:"of"});Z("for",{k:"for"});Z("ago back prior",{k:"ago"});Z("now",{k:"now"});Z("after ahead",{k:"after"});Z("before",{k:"before"});Z("every each ev",{k:"every"});Z("other alternate alt",{k:"other"});Z("a an",{k:"a"});Z("am",{k:"mer",s:"am"});Z("pm",{k:"mer",s:"pm"});Z("noon midday",{k:"noon"});Z("midnight",{k:"mid"});Z("morning",{k:"part",s:"am"});Z("afternoon evening",{k:"part",s:"pm"});Z("night",{k:"part",s:"night"});Z("today tdy tday",{k:"rel",v:0});Z("tomorrow tomoz tmrw tmr tmw",{k:"rel",v:1});Z("overmorrow",{k:"rel",v:2});Z("yesterday yday",{k:"rel",v:-1});Z("next nxt ned",{k:"mod",v:1});Z("gone passed",{k:"gone"});Z("prev",{k:"mod",v:-1});Z("coming",{k:"mod",v:1,s:"coming"});Z("last lst previous",{k:"mod",v:-1});Z("this",{k:"mod",v:0});Z("weekend wknd",{k:"wknd"});Z("weekdays weekday workdays workday wkdays",{k:"wkd"});Z("work business",{k:"work"});Z("daily everyday",{k:"daily"});Z("weekly",{k:"weekly"});Z("biweekly fortnightly",{k:"biweekly"});Z("monthly",{k:"monthly"});Z("yearly annually",{k:"yearly"});Z("times time x occurrences",{k:"times"});Z("end",{k:"end"});Z("half",{k:"half"});Z("thousand",{k:"thousand"});Z("martin luther row single jr all thanks",{k:"skip"});Z("up",{k:"up"});Z("past",{k:"mod",v:-1,s:"past"});Z("eve",{k:"eve"});Z("new",{k:"new"});Z("oclock",{k:"oclock"});Z("oh",{k:"oh"});Z("tonight tonite",{k:"tonight"});Z("nite even",{k:"part",s:"night"});Z("nightly",{k:"daily",s:"night"});Z("sharp ish exactly",{k:"skip",st:!0});Z("cob eod",{k:"skip"});Z("hour hours hr hrs minute minutes mins min bday birthday",{k:"?"});Z("out",{k:"out"});Z("couple",{k:"n",v:2,w:!0});Z("fortnight fortnightly",{k:"biweekly"});Z("arvo",{k:"part",s:"pm"});Z("yest",{k:"rel",v:-1});Z("nx",{k:"mod",v:1});Z("following",{k:"mod",v:1,s:"following"});Z("final",{k:"mod",v:-1,s:"final"});Z("wkly",{k:"weekly"});Z("bimonthly",{k:"bimonthly"});Z("quarter quarterly",{k:"quarter"});Z("onwards onward only roughly abt maybe",{k:"skip"});"the on during around about approx sometime pls please plz us st de just".split(" ").forEach(e=>Z(e,{k:"skip",s:e}));var Zd={christmas:"12-25",xmas:"12-25",halloween:"10-31",valentines:"02-14",val:"02-14",pats:"03-17",mums:"su#2@05",mum:"su#2@05",moms:"su#2@05",dads:"su#3@06",dad:"su#3@06",giving:"th#4@11",valentine:"02-14",juneteenth:"06-19",nye:"12-31",patricks:"03-17",cinco:"05-05",independence:"07-04",thanksgiving:"th#4@11",canada:"07-01",boxing:"12-26",memorial:"mo#-1@05",labor:"mo#1@09",mlk:"mo#3@01",ny:"01-01",paddys:"03-17",mem:"mo#-1@05",turkey:"th#4@11",king:"mo#3@01",presidents:"mo#3@02",mothers:"su#2@05",mother:"su#2@05",fathers:"su#3@06",father:"su#3@06",columbus:"mo#2@10"};for(let e in Zd)Z(e,{k:"h",s:Zd[e]});Z("mayo",{k:"mayo"});"canada boxing valentines valentine mums mum moms dads dad patricks independence presidents mlk king ny paddys mem turkey mothers mother fathers father columbus memorial labor".split(" ").forEach(e=>Ke.get(e).z=!0);function j$(e,t,n){if(Math.abs(e.length-t.length)>n)return n+1;let r=[];for(let i=0;i<=e.length;i++){r[i]=[i];for(let a=1;a<=t.length;a++)if(!i)r[i][a]=a;else{let s=Math.min(r[i-1][a]+1,r[i][a-1]+1,r[i-1][a-1]+(e[i-1]===t[a-1]?0:1));i>1&&a>1&&e[i-1]===t[a-2]&&e[i-2]===t[a-1]&&(s=Math.min(s,r[i-2][a-2]+1)),r[i][a]=s}}return r[e.length][t.length]}var K$=new Set("sept tues thur thurs weds yest tday tomoz yday tmrw tmw tdy".split(" ")),Y$=[...Ke.keys()].filter(e=>e.length>=4&&!K$.has(e)),Wr=new Map;function Ys(e){return Wr.has(e)||(Wr.size>3e3&&Wr.clear(),Wr.set(e,Z$(e))),Wr.get(e)}function Z$(e){if(e.length<3)return;let t=e.length>=6?2:1,n,r=t+1;for(let a of Y$){if(a.length-e.length>t+1||e.length-a.length>t+1||e.length===3&&(a.length!==4||a[0]!==e[0]))continue;let s=j$(e,a,t);if(e.length<=5&&a[0]!==e[0]||s===2&&(a[0]!==e[0]||Math.abs(a.length-e.length)>1&&!(a.length>=8&&e.length>=7&&(Ke.get(a).k==="w"||Ke.get(a).k==="m"))))continue;let o=d=>[d[0]===e[0]?0:1,Ke.get(d).k==="w"||Ke.get(d).k==="m"?0:1,Math.abs(d.length-e.length),-d.length],u=(d,c)=>{let[h,g]=[o(d),o(c)];for(let v=0;v<h.length;v++)if(h[v]!==g[v])return h[v]<g[v];return!1};(s<r||s===r&&n&&u(a,n))&&(r=s,n=a)}let i=n?Ke.get(n):void 0;return i&&i.k==="w"&&e.endsWith("s")&&!n.endsWith("s")?{...i,pl:!0}:i}function Zs(e){let t=Ke.get(e);if(t)return t;if(e.length>=4&&e.endsWith("s")&&e!=="thus"){let n=Ke.get(e.slice(0,-1));if(n&&n.k==="w")return{...n,pl:!0}}if(e.length>=4&&e.endsWith("s")){let n=Ke.get(e.slice(0,-1));if(n&&n.k==="m")return n}}function Ri(e){if(e.length>=3){let t=Qd.findIndex(n=>n.startsWith(e));if(t>=0)return{k:"m",v:t+1,p:!0}}if(e.length>=2){let t=Jd.findIndex(n=>n.startsWith(e));if(t>=0)return{k:"w",s:Di[t],p:!0}}for(let t of Ke.keys())if(t.startsWith(e)&&t.length>e.length)return{k:"skip",p:!0}}function X$(e,t){let n=e.length,r=[{c:0,t:[]}];for(let i=0;i<n;i++){let a=r[i];if(a)for(let s=i+2;s<=n;s++){let o=e.slice(i,s),u=o.length===2&&!"to at of in on am pm st de".includes(o)?void 0:Zs(o),d=1;!u&&s-i>=5&&(u=Ys(o),d=3),!u&&t&&s===n&&o.length>=3&&(u=Ri(o),d=3),u&&(!r[s]||a.c+d<r[s].c)&&(r[s]={c:a.c+d,t:[...a.t,{...u,s:u.s}]})}}return r[n]?.t}var Ut=(e,t)=>e>=1&&e<=12&&t>=1&&t<=[31,29,31,30,31,30,31,31,30,31,30,31][e-1],Q$=(e,t)=>t===(e%100>=11&&e%100<=13?"th":{1:"st",2:"nd",3:"rd"}[e%10]??"th"),ef=!1;function J$(e){e=e.replace(/(?<![a-z])([ap])\.\s?m\b\.?/g,"$1m").replace(/[–—−]/g,"-").replace(/'/g,"").replace(/\b2(morrow|moro|mrw)\b/g,"tomorrow").replace(/\b(can|could|shall) we (do|have|meet|make it|say)\b|\blet(s| us)( do| meet)?\b|\bhow about\b/g," ").replace(/\b2day\b/g,"today").replace(/\bbi-weekly\b/g,"biweekly").replace(/\bonce a month\b/g,"monthly").replace(/\b(week|wk|w\/c) (of|beginning|commencing|starting)\b/g," ").replace(/\ball of\b/g,"in").replace(/\bin too\b/g,"in 2").replace(/\ba couple( of)?\b/g,"couple").replace(/\bthe mor(n|ra)\b/g,"tomorrow").replace(/\bat (\d{1,2}) and (15|30|45)\b/g,"at $1:$2").replace(/\b(\d+)\s*wkly\b/g,"$1 wkly").replace(/\bo ?clock\b/g,"oclock");let t=[],n=0,r=()=>t[t.length-1]?.k==="n";for(;n<e.length;){let s=e.slice(n),o;if((o=s.match(/^(\d{4})-(\d{2})-(\d{2})(?!\d)/))&&Ut(+o[2],+o[3]))t.push({k:"D",s:o[0],v:1});else if(o=s.match(/^(\d{1,2})([\/.-])(\d{1,2})\2(\d{4}|\d{2})(?!\d)/)){let[u,d]=[+o[1],+o[3]];u>12&&d<=12&&([u,d]=[d,u]);let c=+o[4]<100?2e3+ +o[4]:+o[4];Ut(u,d)?t.push({k:"D",s:`${c}-${Be(u)}-${Be(d)}`,v:1}):t.push({k:"?",s:o[0]})}else if((o=s.match(/^(\d{1,2})\.(\d{2})(?!\d)/))&&+o[1]<24&&+o[2]<60&&(+o[2]>31||o[2]==="00"||/^\s?([ap]m|-)/.test(s.slice(o[0].length))||!/\d:\d\d/.test(e)&&/\d\s?([ap]m)\b|morning|afternoon|evening|arvo|night/.test(e)||/^\s?(to|till|til|until|through|thru|-)\s?\d{1,2}\.\d\d\b/.test(s.slice(o[0].length))||["m","w","D","rel","u","ago","at"].includes(t[t.length-1]?.k??"")||t[t.length-1]?.k==="sep"&&t[t.length-2]?.k==="t"))t.push({k:"t",v:+o[1],m:+o[2],z:o[1].length===2&&o[1][0]==="0"});else if(o=s.match(/^(\d{1,2}):(\d{2})(?!\d)/))t.push({k:"t",v:+o[1],m:+o[2],z:o[1].length===2&&o[1][0]==="0"});else if((o=s.match(/^(\d{1,2})([\/.])(\d{1,2})(?![\d:])/))&&Ut(...+o[1]>12?[+o[3],+o[1]]:[+o[1],+o[3]])){let[u,d]=+o[1]>12?[+o[3],+o[1]]:[+o[1],+o[3]];t.push({k:"D",s:`${Be(u)}-${Be(d)}`,v:0})}else if((o=s.match(/^(\d{1,2})-(\d{1,2})(?![\d:]|\s?[ap]m)/))&&+o[2]>12&&Ut(+o[1],+o[2])&&t[t.length-1]?.k!=="m"&&!/^\s?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/.test(s.slice(o[0].length)))t.push({k:"D",s:`${Be(+o[1])}-${Be(+o[2])}`,v:0});else if((o=s.match(/^(\d+)(st|nd|rd|th)/))&&(Q$(+o[1],o[2])||!/^[a-z]/.test(s.slice(o[0].length))))t.push({k:"n",v:+o[1],o:!0,len:o[1].length});else if((o=s.match(/^\d{3,4}(?!\d)/))&&!(o[0].length===4&&+o[0]>=1900&&+o[0]<=2100)&&+o[0].slice(0,-2)<=23&&+o[0].slice(-2)<60&&(o[0].length===4||+o[0].slice(-2)>0)){let u=+o[0].slice(0,-2);t.push({k:"t",v:u,m:+o[0].slice(-2),z:o[0][0]==="0",hm:!0})}else if(o=s.match(/^\d+/))t.push({k:"n",v:+o[0],len:o[0].length});else if(o=s.match(/^[a-z]+/)){let u=o[0],d=n+u.length>=e.trimEnd().length,c;if(u==="mos"?c={k:"u",s:"m"}:u==="mo"?c=r()||t[t.length-1]?.k==="a"?{k:"u",s:"m"}:Zs("monday"):(u==="d"||u==="w"||u==="y")&&r()?c={k:"u",s:u}:u==="back"&&t[t.length-1]?.k!=="u"?c={k:"?",s:u}:(u==="a"||u==="p")&&(r()||t[t.length-1]?.k==="t")?c={k:"mer",s:u==="a"?"am":"pm"}:c=Zs(u),c)t.push(c);else if(d&&["week","year","month"].some(h=>h.startsWith(u)&&u.length>=3))t.push({k:"skip",p:!0});else if(d&&u.length>=4&&"tonight".startsWith(u))t.push({k:"tonight"});else if(d&&(c=Ri(u))&&c.k!=="skip")t.push(c);else if(u.length>=4&&(c=Ri(u))&&(c.k==="m"||c.k==="w"))t.push(d?c:{...c,p:void 0});else if(c=Ys(u))t.push(c);else if(u.length>=6&&u.endsWith("s")&&(c=Ys(u.slice(0,-1)))&&c.k==="w")t.push({...c,pl:!0});else if(d&&(c=Ri(u)))t.push(c);else{let h=X$(u,d);h?t.push(...h):t.push({k:"?",s:u})}n+=u.length;continue}else if(o=s.match(/^\+(\d+)(?=\s?[a-z])/))t.push({k:"n",v:+o[1],len:o[1].length,s:"+"});else if(s[0]==="+"){t.push({k:"and"}),n++;continue}else if(/^[%$#*=<~^]/.test(s)){t.push({k:"?",s:s[0]}),n++;continue}else if(s[0]==="-"){t.push({k:"sep",s:"-"}),n++;continue}else if(s[0]==="@"){t.push({k:"at"}),n++;continue}else if(s[0]==="/"||s[0]==="&"){t.push({k:"and"}),n++;continue}else{n++;continue}n+=o[0].length}let i=[],a=!1;ef=t[t.length-1]?.k==="skip"&&!t[t.length-1].p;for(let s=0;s<t.length;s++){let o=t[s];if(o.k==="skip"&&!o.p){a=o.s==="on",o.st&&i.length&&(i[i.length-1]={...i[i.length-1],st:!0});continue}if(a&&(t[s]=o={...o,po:!0}),a=!1,o.k==="n"&&o.v===12&&t[s+1]?.k==="noon")continue;if(o.k==="n"&&o.w&&(o.v===20||o.v===25)&&t[s+1]?.k==="sep"&&t[s+1].s==="to"&&t[s+2]?.k==="n"&&t[s+2].v>=1&&t[s+2].v<=12){let c=t[s+2].v;i.push({k:"t",v:c===1?12:c-1,m:60-o.v}),s+=2;continue}let u=o.s==="tens"&&t[s+1]?.s==="-"?s+2:s+1,d=t[u];if(o.s==="tens"&&d&&d.k==="n"&&d.w&&d.v<10){i.push({k:"n",v:o.v+d.v,o:d.o,w:!0}),s=u;continue}if(o.k==="half"){let c=t[s+1]?.s==="past"?s+2:s+1,h=t[c];if(h&&h.k==="n"&&h.v>=1&&h.v<=12){i.push({k:"t",v:h.v,m:30}),s=c;continue}}if(o.k==="n"&&o.w&&(o.v===20&&d&&d.k==="n"&&d.w&&d.v>=20&&d.v<40||o.v===2&&d?.k==="thousand"&&t[s+2]?.w)){let c=d.k==="thousand"?t[s+2].v:d.v,h=d.k==="thousand"?s+2:s+1,g=(d.k==="thousand",2e3+c);t[h+1]?.w&&t[h+1].v<10&&c%10===0&&(g+=t[++h].v),i.push({k:"n",v:g,len:4}),s=h;continue}if(o.k==="quarter"||o.k==="n"&&o.v%5===0&&o.v>=5&&o.v<=55&&d?.k==="mod"&&d.s==="past"){let c=o.k==="quarter"&&t[s+1]?.k==="sep",h=d?.s==="past",g=t[s+2];if((c||h)&&g?.k==="n"&&g.v>=1&&g.v<=12){i.push(c?{k:"t",v:g.v===1?12:g.v-1,m:45}:{k:"t",v:g.v,m:o.k==="quarter"?15:o.v}),s+=2;continue}}if(o.k==="n"&&o.w&&!o.o&&o.v>=1&&o.v<=12&&d?.s==="tens"&&t[s+2]?.w&&!t[s+2].o&&t[s+2].v<10&&t[s+2].v%5===0){i.push({k:"t",v:o.v,m:d.v+t[s+2].v}),s+=2;continue}if(o.k==="n"&&o.w&&!o.o&&o.v>=1&&o.v<=12&&d?.k==="oh"&&t[s+2]?.w&&t[s+2].v<10){i.push({k:"t",v:o.v,m:t[s+2].v}),s+=2;continue}if(o.k==="n"&&!o.w&&!o.o&&(o.len??9)<=2&&o.v<=23&&d?.k==="n"&&!d.w&&!d.o&&d.len===2&&d.v%5===0&&d.v<60&&!["m","in","every","for","n","mod"].includes(i[i.length-1]?.k??"")&&!["u","m","times"].includes(t[s+2]?.k??"")){i.push({k:"t",v:o.v,m:d.v,z:o.v>=13,hm:!0}),s++;continue}if(o.k==="n"&&o.w&&!o.o&&o.v>=1&&o.v<=12&&d&&d.k==="n"&&d.w&&!d.o&&d.v>=10&&d.v<60&&d.v%5===0){i.push({k:"t",v:o.v,m:d.v}),s++;continue}i.push(o)}return i}var Ks="mo,tu,we,th,fr",et=e=>e.mer?`${Be(e.h%12+(e.mer==="pm"?12:0))}:${Be(e.m)}`:e.kn?`${Be(e.h)}:${Be(e.m)}`:e.m?`${e.h}:${Be(e.m)}?`:`${e.h}?`,Oi=e=>(e.mer?e.h%12+(e.mer==="pm"?12:0):e.h)*60+e.m;function Xd(e,t,n){return e.mer&&!t.mer&&!t.kn&&t.h>=1&&t.h<=12&&n&&(t={...t,mer:e.mer},Oi(t)<=Oi(e)&&(t={...t,mer:e.mer==="pm"?"am":"pm"})),e.num&&!t.mer&&!t.kn?t={...t,kn:!0}:t.num&&!t.mer&&e.col&&!e.mer&&!e.kn&&(e={...e,kn:!0}),!e.mer&&t.mer&&e.h<=12&&!e.kn&&(e={...e,mer:t.mer},Oi(e)>=Oi(t)&&(e={...e,mer:t.mer==="pm"?"am":"pm"})),[e,t]}function ev(e){let t=0,n,r=(f,$=0)=>e[t+$]?.k===f,i=f=>e[t]?.k===f?e[t++]:void 0,a=()=>t>=e.length;function s(f){let $=t;i("at");let E=e[t],z;if(!E)z=void 0;else if(E.k==="noon")t++,z={h:12,m:0,kn:!0};else if(E.k==="mid")t++,z={h:0,m:0,kn:!0};else if(E.k==="t"){t++;let B=i("mer")?.s;z={h:E.v,m:E.m,mer:B,kn:!!E.z||E.v>=13||E.v===0||E.m===0&&E.v>=10&&!B,num:!!E.z||E.v>=13||E.v===0||!!B,col:!0},B&&(E.v>12||E.v===0)&&(z=void 0)}else E.k==="n"&&!E.o&&r("mer",1)&&E.v>=1&&E.v<=12?(t+=2,z={h:E.v,m:0,mer:e[t-1].s,kn:!1,num:!0}):E.k==="n"&&!E.o&&E.v>=1&&E.v<=12&&(E.w||(E.len??9)<=2)&&(r("part",1)||(r("in",1)||r("at",1))&&(r("part",2)||r("mer",2)))?(t++,z={h:E.v,m:0,kn:!1}):E.k==="n"&&!E.o&&r("oclock",1)&&E.v>=1&&E.v<=12?(t+=2,z={h:E.v,m:0,mer:i("mer")?.s,kn:!1}):f&&E.k==="n"&&!E.o&&E.v>=1&&E.v<=12&&(E.w||(E.len??9)<=2)&&!r("u",1)&&!r("m",1)&&(t++,z={h:E.v,m:0,kn:!1});if(!z)return t=$,void 0;let N=t;if((r("in")||r("at"))&&N++,e[N]?.k==="mer"&&!z.mer&&N>t)z={...z,mer:e[N].s,num:!0},t=N+1;else if(e[N]?.k==="part"&&!z.mer){let B=e[N].s;t=N+1,B==="night"?z.h===12?z={h:0,m:z.m,kn:!0}:z.h>=6?z={...z,mer:"pm"}:z={...z,mer:"am"}:z.h<=12&&(z={...z,mer:B})}return z}function o(f){return!!f&&f.k==="n"&&f.v>=1&&f.v<=31&&(f.w||(f.len??9)<=2)&&e[e.indexOf(f)+1]?.k!=="mer"}function u(f){return(e[f]?.k==="of"||e[f]?.k==="in")&&f++,e[f]?.k==="m"?e[f]:void 0}function d(){let f=e[t];if(f?.k==="n"&&f.len===4&&f.v>=1900&&f.v<=2100&&!f.o)return t++,f.v}function c(f,$,E,z){return{s:E?`${E}-${Be(f)}-${Be($)}`:`${Be(f)}-${Be($)}`,k:E?"other":"md",d:$,mo:f,sh:z}}function h(){let f=t;for(;r("skip")&&!e[t].p;)t++;for(r("in")&&(r("m",1)||r("n",1)&&e[t+1].len===4)&&t++;r("mod")&&e[t].v===0&&r("mod",1);)t++;let $=e[t];if(!$)return t=f,void 0;let E,z;if($.k==="tonight")t++,n="night",E={s:"+0d",k:"other"};else if($.k==="mod"&&$.v===0&&r("part",1))n=e[t+1].s,t+=2,E={s:"+0d",k:"other"};else if($.k==="D")t++,E=$.v?{s:$.s,k:"other"}:{s:$.s,k:"md",mo:+$.s.slice(0,2),d:+$.s.slice(3)};else if($.k==="rel")t++,E={s:`${$.v>=0?"+":""}${$.v}d`,k:"other"};else if($.k==="u"&&$.s==="d"&&(r("after",1)||r("before",1))&&r("rel",2))E={s:`${(e[t+1].k==="after"?1:-1)*2>0?"+":"-"}2d`,k:"other"},t+=3;else if($.k==="in"&&(r("n",1)||r("a",1))&&r("u",2)&&(r("a",1)||e[t+1].v===1||!e[t+2].sg))E={s:`+${r("a",1)?1:e[t+1].v}${e[t+2].s}`,k:"other"},t+=3,r("times")&&e[t].s===void 0&&t++;else if(($.k==="n"||$.k==="a")&&r("u",1)&&r("times",2)&&e[t+2].s===void 0&&($.k==="a"||$.v===1||!e[t+1].sg))E={s:`+${$.k==="a"?1:$.v}${e[t+1].s}`,k:"other"},t+=3;else if(($.k==="n"||$.k==="a")&&r("u",1)&&(r("ago",2)||r("mod",2)&&e[t+2].s==="past"||(r("from",2)||r("after",2)||r("before",2))&&(r("now",3)||r("rel",3))))E={s:`${r("ago",2)||r("before",2)||r("mod",2)?"-":"+"}${$.k==="a"?1:$.v}${e[t+1].s}`,k:"other"},t+=r("ago",2)||r("mod",2)?3:4;else if($.k==="n"&&r("u",1)&&r("out",2))E={s:`+${$.v}${e[t+1].s}`,k:"other"},t+=3;else if($.k==="n"&&$.s==="+"&&r("u",1))E={s:`+${$.v}${e[t+1].s}`,k:"other"},t+=2;else if($.k==="u"&&$.s!=="d"&&(r("gone",1)||r("before",1)||r("after",1)||r("mod",1)&&e[t+1].v!==0)&&!r("rel",2))E={s:`${$.s.toUpperCase()}${r("after",1)||e[t+1].v===1?"+1":"-1"}`,k:"other"},t+=2;else if($.k==="u"&&$.s==="w"&&t===0&&e.length===1)t++,E={s:"W+0",k:"other"};else if($.k==="mod"&&$.v!==0&&r("u",1)&&e[t+1].s==="w"&&r("w",2))E={s:`${e[t+2].s}${$.v>0?"+1":"-1"}`,k:"other"},t+=3;else if($.k==="mod"&&r("u",1)&&e[t+1].s!=="d"){let N=$.v;E={s:`${e[t+1].s.toUpperCase()}${N>=0?"+":""}${N}`,k:"other"},t+=2}else if($.k==="mod"&&$.v===0&&r("wknd",1)||$.k==="wknd")t+=$.k==="wknd"?1:2,E={s:"sa>su",k:"other"};else if(($.k==="n"&&($.o||$.w)||$.k==="mod"&&$.v===-1)&&r("w",1)&&(z=u(t+2)))E={s:`${e[t+1].s}#${$.k==="mod"?-1:$.v}@${Be(z.v)}`,k:"other"},t=e.indexOf(z,t+2)+1;else if($.k==="mod"&&r("w",1))E={s:`${e[t+1].s}${$.v===0||$.s==="coming"?"":$.v>0?"+1":"-1"}`,k:"other"},t+=2,r("mod")&&e[t].s==="coming"&&t++;else if(!($.k==="w"&&(r("m",1)||r("D",1)||r("n",1)&&(r("m",2)||r("of",2)&&r("m",3))&&!e[t+2].po)&&(t++,z=void 0,E=h())))if($.k==="w"&&!(r("n",1)&&!e[t+1].o&&(r("in",2)||r("of",2))&&r("m",3))){e[t]===$&&t++;let N=e[t],B=i("gone")?"-1":"";!B&&r("before")&&!r("rel",1)?(B="-1",t++):N?.k==="mod"&&N.s==="coming"&&!r("w",1)&&!r("u",1)&&t++,!B&&N?.k==="mod"&&N.v!==0&&N.s!=="coming"&&!r("w",1)&&!r("u",1)&&!r("m",1)&&(B=N.v>0?"+1":"-1",t++),E={s:$.s+B,k:"other"}}else if($.k==="h"){t++;let N=$.s;if(N==="05-05"){for(;r("skip");)t++;if(!i("mayo"))return t=f,void 0}else if(i("eve"))N==="12-25"&&(N="12-24");else if(r("u")&&e[t].s==="d")t++;else if($.z)return t=f,void 0;let B=/^\d\d-/.test(N)?d():void 0;E=/^\d\d-/.test(N)?B?{s:`${B}-${N}`,k:"other"}:{s:N,k:"md",mo:+N.slice(0,2),d:+N.slice(3)}:{s:N,k:"other"}}else if($.k==="new"&&r("u",1)&&e[t+1].s==="y"){t+=2;let N=i("eve");!N&&r("u")&&e[t].s==="d"&&t++,E={s:N?"12-31":"01-01",k:"md",mo:N?12:1,d:N?31:1}}else if($.k==="m"&&(e[t+1]?.k==="n"&&(e[t+1].o||e[t+1].w)||e[t+1]?.k==="mod"&&e[t+1].v===-1)&&r("w",2))E={s:`${e[t+2].s}#${e[t+1].k==="mod"?-1:e[t+1].v}@${Be($.v)}`,k:"other"},t+=3;else if($.k==="w"&&r("n",1)&&!e[t+1].o&&e[t+1].v>=1&&e[t+1].v<=5&&(r("in",2)||r("of",2))&&r("m",3))E={s:`${$.s}#${e[t+1].v}@${Be(e[t+3].v)}`,k:"other"},t+=4;else if($.k==="m")if(t++,o(e[t])){let N=e[t++].v,B=d();E=Ut($.v,N)?c($.v,N,B,!0):void 0}else E={s:`M@${Be($.v)}`,k:"mon",mo:$.v};else if($.k==="n"&&o($)&&(r("m",1)&&!e[t+1].po||r("of",1)&&r("m",2))){t+=r("m",1)?1:2;let N=e[t++].v,B=d();E=Ut(N,$.v)?c(N,$.v,B):void 0}else if($.k==="n"&&$.len===4&&!$.o&&r("m",1)&&o(e[t+2])){let N=e[t+1].v,B=e[t+2].v;E=Ut(N,B)?c(N,B,$.v):void 0,t+=3}else $.k==="u"&&$.s==="m"&&r("of",1)&&r("m",2)?(E={s:`M@${Be(e[t+2].v)}`,k:"mon",mo:e[t+2].v},t+=3):$.k==="u"&&$.s==="y"&&r("n",1)&&e[t+1].len===4?(E={s:`Y@${e[t+1].v}`,k:"yr"},t+=2):$.k==="n"&&$.len===4&&$.v>=1900&&$.v<=2100&&!$.o&&!r("mer",1)?(t++,E={s:`Y@${$.v}`,k:"yr"}):$.k==="n"&&$.o&&$.v<=31&&(t++,E={s:String($.v),k:"day",d:$.v});return E||(t=f),E}function g(){let f={},$=t;for(n=void 0;;){if(!f.date){let z=h();if(z){f.date=z;continue}}if(!f.time&&f.num===void 0){let z=s(!1);if(z){f.time=z;continue}}let E=e[t];if(f.num===void 0&&!f.time&&E?.k==="n"&&!E.o&&E.v<=31&&(E.w||(E.len??9)<=2)){f.num=E.v,t++;continue}if(r("part")&&!f.part&&(f.date||f.time||f.num!==void 0)){f.part=e[t++].s;continue}if((r("at")||r("in")||r("from"))&&(f.date||f.time||f.num!==void 0)){let z=t;if(t++,r("n")||r("t")||r("noon")||r("mid")||r("part")||(t=z),t!==z)continue}break}if(!f.date&&!f.time&&f.num===void 0)return t=$,void 0;if(f.part??=n,f.part&&f.date&&f.num!==void 0&&!f.time&&v(f),f.part&&f.time&&!f.time.mer){let E=f.time;f.part==="night"?f.time=E.h===12?{h:0,m:E.m,kn:!0}:{...E,mer:E.h>=6?"pm":"am",num:!0}:E.h<=12&&(f.time={...E,mer:f.part,num:!0})}return f}function v(f,$){f.num!==void 0&&(f.num>=1&&f.num<=12?f.time={h:f.num,m:0,mer:$,kn:!1}:f.num>=13&&f.num<=23&&(f.time={h:f.num,m:0,kn:!0,num:!0}),f.num=void 0)}function b(f,$){for(let[F,R]of[[f,$],[$,f]])if(F.num!==void 0)if(F.date)v(F);else if(R.date&&R.date.mo&&!R.time&&F.num>=1&&(F===f||R.date.sh)){if(F.date=Ut(R.date.mo,F.num)?c(R.date.mo,F.num):void 0,F.num=void 0,!F.date)return null}else{if(R.date?.mo&&!R.time)return null;v(F)}for(let[F,R]of[[f,$],[$,f]])if(F.date?.k==="day"){if(!R.date?.mo||F===$&&!R.date.sh||!Ut(R.date.mo,F.date.d))return null;F.date=c(R.date.mo,F.date.d)}if(f.date&&$.date&&f.date.k==="mon"!=($.date.k==="mon")||f.date&&$.date&&f.date.k==="yr"!=($.date.k==="yr"))return null;let E=f.time,z=$.time,N=f.date,B=$.date;return E&&z&&([E,z]=Xd(E,z,!(N&&B))),E&&z?!N&&!B?`t ${et(E)}>${et(z)}`:N&&!B?`dt ${N.s} ${et(E)}>${et(z)}`:!N&&B?`dt ${B.s} ${et(E)}>${et(z)}`:`dt ${N.s} ${et(E)}>${B.s} ${et(z)}`:!E&&!z&&N&&B?`d ${N.s}>${B.s}`:null}function T(f){if(f.num!==void 0)if(f.date&&f.date.k!=="day")v(f);else{if(f.date)return null;if(f.num<1||f.num>12)return null;v(f)}return f.date?.k==="day"?null:f.date?.k==="mon"?`d ${f.date.s}`:f.date&&f.time?`dt ${f.date.s} ${et(f.time)}`:f.date?`d ${f.date.s}`:f.time?`t ${et(f.time)}`:null}function S(f){let $=s(f);if(!$)return;let E=t;if(r("sep")||r("and")){t++;let z=s(f);if(z){let[N,B]=Xd($,z,!0);return`${et(N)}>${et(B)}`}t=E}return et($)}function k(){let f=[];for(;r("w");)f.push(e[t++].s),r("and")&&r("w",1)&&t++;return f}let _=f=>[...new Set(f)].sort(($,E)=>(Di.indexOf($)+6)%7-(Di.indexOf(E)+6)%7),I=f=>f?.k==="n"?f.v:f?.k==="a"?1:void 0;function C(){let f="",$=1,E,z,N,B,F;if(r("from")&&(r("n",1)||r("t",1))&&t++,r("at")||r("t")||r("noon")||r("mid")||r("n")&&(r("mer",1)||r("sep",1)&&(r("n",2)||r("t",2)))){let Q=t;F=S(!0),F||(t=Q)}let R=!1,j,q=!!i("every");for(;r("skip");)t++;let oe;r("n")&&!e[t].o&&(e[t+1]?.pl||r("wkd",1))?oe=e[t++].v:r("n")&&!e[t].o&&r("times",1)&&e[t+1].s===void 0&&(oe=e[t].v,t+=2);let H=e[t];if(!H)return null;let ee=Q=>(e[t+Q]?.k==="n"&&(e[t+Q].o||e[t+Q].w)||e[t+Q]?.k==="mod"&&e[t+Q].v===-1)&&r("w",Q+1);if(H.k==="daily")t++,f="d",j=H.s;else if(q&&H.k==="u"&&H.s==="d")t++,f="d";else if(q&&H.k==="part")j=H.s,t++,f="d";else if(H.k==="wkd")t++,f="d",E=Ks.split(",");else if(H.k==="work"&&r("u",1))t+=2,f="d",E=Ks.split(",");else if(H.k==="w"&&r("sep",1)&&H.s==="mo"&&e[t+2]?.s==="fr")t+=3,f="d",E=Ks.split(",");else if(H.k==="other"&&r("u",1))f=e[t+1].s,$=2,t+=2;else if(H.k==="other"&&r("w",1))t++,f="w",$=2,E=[e[t++].s];else if(H.k==="n"&&r("weekly",1))f="w",$=H.v,t+=2;else if(H.k==="bimonthly")t++,f="m",$=2;else if(H.k==="quarter")t++,f="m",$=3;else if(H.k==="u"&&H.s==="m"&&r("end",1))t+=2,f="m",N="d-1";else if(q&&H.k==="n"&&r("u",1)&&"dwm".includes(e[t+1].s)&&!ee(0)&&!(e[t+1].sg&&!H.o&&H.v!==1))f=e[t+1].s,$=H.v,t+=2,R=!0;else if(H.k==="biweekly")t++,f="w",$=2;else if(H.k==="weekly")t++,f="w";else if(H.k==="monthly")t++,f="m";else if(H.k==="yearly"||q&&H.k==="u"&&H.s==="y")t++,f="y";else if(q&&H.k==="u"&&H.s==="w")t++,f="w",R=!0;else if(q&&H.k==="u"&&H.s==="m")t++,f="m",R=!0;else if(H.k==="mod"&&H.v===-1&&r("u",1)&&e[t+1].s==="d"){for(t+=2,r("of")&&t++;r("every")||r("skip");)t++;if(!i("u"))return null;f="m",N="d-1"}else if(H.k==="end"&&r("of",1)){if(t+=2,i("every"),!i("u"))return null;f="m",N="d-1"}else if(H.k==="w"||ee(0)||H.k==="n"&&(r("of",1)||r("every",1)||r("and",1)&&r("n",2))&&!r("w",1)){if(ee(0)){let Q=e[t].k==="mod"?-1:e[t].v,be=e[t+1].s,me=t+2;for(e[me]?.k==="of"&&me++;e[me]?.k==="every"||e[me]?.k==="skip";)me++;if(e[me]?.k==="u"&&e[me].s==="m")t=me+1,f="m",z=`${be}#${Q}`;else if(q&&e[t].k==="n"&&e[t].w&&Q!==2)t+=2,f="m",z=`${be}#${Q}`;else if(e.some(De=>De.k==="monthly"))t+=2,f="m",z=`${be}#${Q}`;else if(q&&e[t].k==="n")$=Q,t+=1,f="w",E=k();else return null}else if(H.k==="w")f="w",E=k();else if(H.k==="n"){let Q=`${H.v}`;for(t++;r("and")&&r("n",1);)Q+=`,d${e[t+1].v}`,t+=2;if(r("of")&&t++,i("every"),!i("u"))return null;f="m",N=`d${Q}`}}else if((q||e.some(Q=>Q.k==="every"))&&H.k==="m")f="y";else return null;if(q=!0,f==="w"&&(!E&&(r("w")||r("skip")&&r("w",1))&&(E=k()),!E&&ee(0)))return null;if(f==="m"&&!z&&!N){for(;r("skip");)t++;if(ee(0)){let Q=e[t].k==="mod"?-1:e[t].v;z=`${e[t+1].s}#${Q}`,t+=2}else r("n")&&!r("m",1)&&!r("mer",1)&&e[t].v<=31&&!r("t",0)?(N=`d${e[t++].v}`,r("of")&&t++,r("every")&&t++,i("u")):r("mod")&&e[t].v===-1&&r("u",1)&&(N="d-1",t+=2,r("of")&&(t+=2))}if(f==="y"){let Q=h();if(!Q||Q.k!=="md")return null;B=Q.s}let V=oe,M,Y,G;for(;!a();){let Q=e[t];if(Q.k==="skip"&&!Q.p)t++;else if(Q.k==="part"||Q.k==="u"&&e[t-1]?.k==="of")j??=Q.s,t++;else if(Q.k==="w"&&f==="w"&&!E)E=k();else if(Q.k==="weekly"||Q.k==="daily"||Q.k==="wkd"||Q.k==="monthly"||Q.k==="yearly")t++;else if(Q.k==="every"&&I(e[t+1])!==void 0&&r("u",2))$=I(e[t+1]),t+=3;else if(Q.k==="every"&&r("u",1))t+=2;else if(Q.k==="every"&&r("other",1)&&r("u",2))$=2,t+=3;else if(Q.k==="n"&&!Q.o&&(r("times",1)||r("u",1)&&!V&&e[t+1].s===(f==="w"?"w":"d")))V=Q.v,t+=2;else if(Q.k==="for"&&I(e[t+1])!==void 0&&(r("u",2)||r("times",2)))V=I(e[t+1])*(f==="d"&&e[t+2].s==="w"?7:1),t+=3;else if(Q.k==="for"&&r("n",1)&&!r("u",2)&&!r("m",2)&&!r("mer",2)&&!e[t+1].o&&!e[t+1].w)V=e[t+1].v,t+=2;else if(Q.k==="times"&&Q.s===void 0&&r("n",1))V=e[t+1].v,t+=2;else if(Q.k==="sep"&&Q.s==="until"||Q.k==="up"&&r("sep",1)){Q.k==="up"&&t++,t++;let be=h();if(!be||be.k==="day"||be.k==="mon")return null;M=be.s}else if(Q.k==="from"){t++;let be=t,me=h();if(me&&me.k!=="day"&&me.k!=="mon")Y=me.s;else if(t=be,G=S(!0),!G)return null}else{if(Q.k==="from"||Q.k==="sep"&&Q.s==="to")return null;if(!G&&(Q.k==="at"||Q.k==="t"||Q.k==="noon"||Q.k==="mid"||Q.k==="n"&&!Q.o&&Q.v<=12&&(Q.w||(Q.len??9)<=2)&&!r("m",1)||Q.k==="n"&&r("mer",1))){if(G=S(!0),!G)return null}else if(Q.k==="of"||Q.k==="in"||Q.k==="every"||Q.k==="a")t++;else return null}}if(!G&&F&&(G=F),G&&j&&(G=G.replace(/(\d{1,2})(?::(\d\d))?\?/g,(Q,be,me="00")=>`${Be(j==="night"?+be==12?0:+be>=6?+be+12:+be:+be%12+(j==="pm"?12:0))}:${me}`)),!(R&&!ef)&&(f==="m"&&!z&&!N||f==="y"&&!B||f==="w"&&!E&&$<2&&!V))return null;let he=["R",`${f}/${$}`];return E&&he.push(_(E).join(",")),z&&he.push(z),N&&he.push(N),B&&he.push(B),V&&he.push(`n${V}`),M&&he.push(`u${M}`),G&&he.push(G),Y&&he.push(`s${Y}`),`${G?"dt":"d"} ${he.join(" ")}`}if(e.some((f,$)=>["every","other","daily","weekly","monthly","yearly","biweekly","bimonthly","quarter","wkd"].includes(f.k)||f.k==="w"&&(f.pl||e[$+1]?.k==="and"&&e[$+2]?.k==="w"&&!e.some(E=>E.k==="between"))||f.k==="u"&&f.s==="m"&&e[$-1]?.k==="of"&&e[$+1]?.k!=="m")||e[0]?.k==="w"&&e.some((f,$)=>f.k==="for"&&e[$+1]?.k==="n"&&(e[$+2]?.k==="times"||e[$+2]?.k==="u")||f.k==="sep"&&f.s==="until"&&["m","D"].includes(e[$+1]?.k??""))||e.some((f,$)=>f.k==="times"&&f.s===void 0&&e[$+1]?.k==="n"&&e.some(E=>E.k==="w"))||e.some((f,$)=>f.s==="mo"&&e[$+1]?.k==="sep"&&e[$+2]?.s==="fr"&&(e[$+1].s==="-"||e.length>3))||e.some((f,$)=>f.k==="w"&&e[$+1]?.k==="w"&&!e.slice(0,$).some(E=>E.k==="sep"||E.k==="between")))return r("from")&&(t=1,h()&&(e=[...e.slice(t),...e.slice(0,t)]),t=0),C();for(;r("from")||r("between")||r("at")||r("for")||r("part")||r("skip")&&!e[t].p;)t++;let D=g();if(!D)return null;if(a())return T(D);if(!(r("sep")||r("and")))return null;t++;let w=g();return!w||!a()?null:b(D,w)}function tf(e){let t=e.length,n=e[t-1],r=e[t-2];n?.p&&n.k!=="m"&&r?.k==="n"&&!r.o&&e[t-3]?.k!=="m"&&(t-=1);for(let i=t;i>0;i--){let a=ev(e.slice(0,i));if(a){let s=e[i],o=e[i-1],u=e[i-2];if(s&&o?.k==="w"&&(["of","in","every"].includes(s.k)&&(u?.k==="mod"&&u.v===-1||u?.k==="n"&&(u.o||u.w))||s.k==="and"&&i<=2||i===1&&o.s==="sa"&&s.k==="sep"&&s.s==="to")||i===1&&i<e.length&&e[0].k==="n"&&!e[0].o&&(s.p||["u","w","m"].includes(s.k)))return null;if(i<e.length&&e[i-1]?.k==="n"&&(e[i-2]?.k==="sep"||e[i-2]?.k==="and")&&(s.p||s.k==="of"||s.k==="in")){i-=1;continue}return{r:a,end:i}}}return null}var tv=new Set(["rel","w","D","mer","noon","mid","part","h","wknd","tonight","ago","out","daily","weekly","every","wkd","biweekly","monthly","yearly","bimonthly","quarter","mod","oclock","u"]);function nv(e){let t=e.some(a=>a.st||a.k==="at"),n=[],r=!1;for(let a=0;a<e.length;a++){let s=e[a],o=e[a+1];if(s.k==="?"||s.k==="skip"&&!s.p||s.k==="work"&&o?.k!=="u"||s.k==="new"&&o?.k!=="u"||s.k==="up"&&o?.k!=="sep"||s.k==="end"&&o?.k!=="of"&&e[a-1]?.k!=="u"||s.k==="h"&&s.z&&!(o?.k==="u"&&o.s==="d")){r=!0;continue}n.push(r?{...s,gap:!0}:s),r=!1}let i;for(let a=0;a<n.length&&!(i&&i.n>=n.length-a);a++){if(["mer","sep","and","of","ago","out"].includes(n[a].k))continue;let s=tf(n.slice(a));if(!s)continue;let o=n.slice(a,a+s.end);o.some((d,c)=>c>0&&d.gap&&o[c-1].k==="n"&&!(d.k==="mer"||d.k==="sep"))||!o.some(d=>tv.has(d.k)&&!(d.k==="u"&&o.length<2)||d.k==="t"&&!d.hm||d.k==="m"&&(o.length>1||!d.am))&&!(t&&o.some(d=>d.k==="n"||d.k==="t"))||o.every(d=>d.k==="skip"||d.k==="at")||o.length===1&&o[0].k==="m"&&o[0].am||s.r.includes(" R ")&&!s.r.startsWith("dt")&&!o.some(d=>d.k==="every"||d.k==="daily"||d.k==="wkd"||d.k==="other"||d.k==="biweekly")||(!i||s.end>i.n)&&(i={r:s.r,n:s.end})}return i?i.r:"x"}function nf(e){let t=J$(It(e));return t.length===1&&t[0].k==="n"&&t[0].w?"x":t.some(n=>n.k==="?")?nv(t):tf(t)?.r??"x"}var rv=St("heuristic-full-3",nf),rf=rv;var iv="jan feb mar apr may jun jul aug sep oct nov dec".split(" "),sv="su mo tu we th fr sa".split(" "),av="sun mon tue wed thu fri sat",Me=e=>String(e).padStart(2,"0"),af="first second third fourth fifth sixth seventh eighth ninth tenth".split(" "),ov={a:1,an:1,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10},vn=e=>iv.indexOf(e.slice(0,3))+1,Wt=e=>sv[av.split(" ").indexOf(e.slice(0,3))],Kn=e=>/^\d+$/.test(e)?+e:ov[e]??0,bn="(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\\.?",Ct="(?!month)(sun|mon|tue|wed|thu|fri|sat)[a-z]*\\.?",kn="(\\d{1,2})(?:st|nd|rd|th)?",uv=[[/^(\d{4})[-/](\d\d)[-/](\d\d)$/,e=>`${e[1]}-${e[2]}-${e[3]}`],[/^(\d{1,2})[\/.](\d{1,2})[\/.](\d{2,4})$/,e=>`${+e[3]<100?2e3+ +e[3]:e[3]}-${Me(e[1])}-${Me(e[2])}`],[/^(\d{1,2})[\/.](\d{1,2})$/,e=>+e[1]>12?`${Me(e[2])}-${Me(e[1])}`:`${Me(e[1])}-${Me(e[2])}`],[new RegExp(`^${bn} ${kn},? (\\d{4})$`),e=>`${e[3]}-${Me(vn(e[1]))}-${Me(e[2])}`],[new RegExp(`^${bn} ${kn}$`),e=>`${Me(vn(e[1]))}-${Me(e[2])}`],[new RegExp(`^${kn} (?:of )?${bn},? (\\d{4})$`),e=>`${e[3]}-${Me(vn(e[2]))}-${Me(e[1])}`],[new RegExp(`^${kn} (?:of )?${bn}$`),e=>`${Me(vn(e[2]))}-${Me(e[1])}`],[/^(today|tdy|now)$/,()=>"+0d"],[/^(tomorrow|tmrw|tmr)$/,()=>"+1d"],[/^(yesterday|yday)$/,()=>"-1d"],[/^day after tomorrow$/,()=>"+2d"],[new RegExp(`^(?:on |this )?${Ct}$`),e=>Wt(e[1])],[new RegExp(`^(?:next|nxt) ${Ct}$`),e=>`${Wt(e[1])}+1`],[new RegExp(`^(?:last|past|previous) ${Ct}$`),e=>`${Wt(e[1])}-1`],[/^(next|nxt|this|last) (week|month|year)$/,e=>`${e[2][0].toUpperCase()}${e[1]==="this"?"+0":e[1].startsWith("n")?"+1":"-1"}`],[/^(?:in )?(\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten) (day|wk|week|mo|month|yr|year)s?(?: from now)?$/,e=>`+${Kn(e[1])}${e[2][0]}`],[/^(\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten) (day|wk|week|mo|month|yr|year)s? ago$/,e=>`-${Kn(e[1])}${e[2][0]}`],[/^(?:this |the )?weekend$/,()=>"sa>su"],[new RegExp(`^(first|second|third|fourth|last|\\d)(?:st|nd|rd|th)? ${Ct} (?:of |in )?${bn}$`),e=>`${Wt(e[2])}#${e[1]==="last"?-1:Kn(e[1])||af.indexOf(e[1])+1}@${Me(vn(e[3]))}`],[new RegExp(`^(?:in |during |the ?month of )?${bn}$`),e=>`M@${Me(vn(e[1]))}`],[/^(?:in |year )?(20\d\d)$/,e=>`Y@${e[1]}`],[/^(christmas|xmas) eve$/,()=>"12-24"],[/^(christmas|xmas)( day)?$/,()=>"12-25"],[/^(new years|ny)( day)?$/,()=>"01-01"],[/^(new years|ny) eve$/,()=>"12-31"],[/^valentines( day)?$/,()=>"02-14"],[/^(independence day|fourth of july)$/,()=>"07-04"],[/^halloween$/,()=>"10-31"],[/^thanksgiving( day)?$/,()=>"th#4@11"],[/^memorial day$/,()=>"mo#-1@05"],[/^labor day$/,()=>"mo#1@09"],[/^mothers day$/,()=>"su#2@05"],[/^fathers day$/,()=>"su#3@06"]];function _n(e){if(e=e.replace(/^(at|@) ?/,"").replace(/\b([ap])\.m\.?/,"$1m"),e==="noon")return{h:12,m:0,known:!0};if(e==="midnight")return{h:0,m:0,known:!0};let t=e.match(/^(\d{1,2})(?::(\d\d))? ?(am|pm)?$/);if(!t)return;let n=+t[1],r=+(t[2]??0);if(!(n>23||r>59))return t[3]?n>=1&&n<=12?{h:n,m:r,mer:t[3],known:!0}:void 0:{h:n,m:r,known:n>12||n===0||/^0/.test(e)}}var Js=e=>(e.mer?e.h%12+(e.mer==="pm"?12:0):e.h)*60+e.m;function Lr(e){return e.known?`${Me(Js(e)/60|0)}:${Me(e.m)}`:e.m?`${e.h}:${Me(e.m)}?`:`${e.h}?`}function of(e,t,n){return/\b(1[3-9]|2\d|0\d):\d\d/.test(n)&&!t.mer&&(e={...e,known:!0},t={...t,known:!0}),!e.mer&&t.mer&&!e.known&&e.h<=12&&(e={...e,mer:t.mer,known:!0},Js(e)>=Js(t)&&(e={...e,mer:t.mer==="pm"?"am":"pm"})),`${Lr(e)}>${Lr(t)}`}function Lt(e){for(let[t,n]of uv){let r=e.match(t);if(r)return n(r)}}function Xs(e){e=e.replace(/^(on|at|@) /,"").trim();let t=Lt(e);if(t)return{d:t};let n=_n(e);if(n)return{t:n};let r=e.match(/^(.+?) (?:at |@ |on )?(\d{1,2}(?::\d\d)? ?(?:am|pm)?|noon|midnight)$/);if(r&&Lt(r[1])&&_n(r[2]))return{d:Lt(r[1]),t:_n(r[2])};if(r=e.match(/^(\d{1,2}(?::\d\d)? ?(?:am|pm)?|noon|midnight) (?:on )?(.+)$/),r&&Lt(r[2])&&_n(r[1]))return{d:Lt(r[2]),t:_n(r[1])}}function lv(e){let t,n,r=e,i="",a="",s,o=!1;((s=r.match(/ (?:for )?(\d+) (times|days|weeks)$/))||(s=r.match(/ x(\d+)$/)))&&(a+=` n${s[1]}`,o=s[2]==="weeks",r=r.slice(0,s.index)),(s=r.match(/ (?:until|till|through|ending) (.+)$/))&&Lt(s[1])&&(a+=` u${Lt(s[1])}`,r=r.slice(0,s.index)),(s=r.match(/ (?:starting|beginning|from) (.+)$/))&&Lt(s[1])&&(a+=` s${Lt(s[1])}`,r=r.slice(0,s.index)),e=r;let u="\\d{1,2}(?::\\d\\d)? ?(?:am|pm)?|noon|midnight",d=e.match(new RegExp(` (?:at |@ |from )?(${u})(?: ?- ?| to |to)(${u})$`))??e.match(new RegExp(` (?:at |@ )?(${u})$`)),c=d&&_n(d[1]),h=d?.[2]?_n(d[2]):void 0;if(c&&(!d[2]||h)&&(i=h?of(c,h,e):Lr(c),r=e.slice(0,d.index)),/^(every ?day|daily|each day)$/.test(r)?n="d/1":/^(every weekday|weekdays|every work ?day)$/.test(r)?n="d/1 mo,tu,we,th,fr":(t=r.match(/^every (\d+|two|three|four) days?$/))?n=`d/${Kn(t[1])}`:(t=r.match(new RegExp(`^(?:every|each) ${Ct}$`)))?n=`w/1 ${Wt(t[1])}`:(t=r.match(new RegExp(`^${Ct}s$`)))?n=`w/1 ${Wt(t[1])}`:(t=r.match(new RegExp(`^every (?:other|second) ${Ct}$`)))?n=`w/2 ${Wt(t[1])}`:(t=r.match(/^every (?:other|second) week$/))?n="w/2":(t=r.match(new RegExp(`^every (\\d+|two|three|four) weeks? (?:on )?${Ct}$`)))?n=`w/${Kn(t[1])} ${Wt(t[2])}`:(t=r.match(new RegExp(`^(?:monthly|every month)(?: on)?( ?)${kn}$`)))?n=`m/1 d${+t[2]}`:(t=r.match(new RegExp(`^every (\\d+) months?(?: on)? ${kn}$`)))?n=`m/${t[1]} d${+t[2]}`:(t=r.match(new RegExp(`^every (?:year )?${bn} ${kn}$`)))?n=`y/1 ${Me(vn(t[1]))}-${Me(t[2])}`:(t=r.match(new RegExp(`^(?:every )?(first|second|third|fourth|last|\\d)(?:st|nd|rd|th)? ${Ct} (?:of )?(?:every )?(?:month|the month)$`)))&&(n=`m/1 ${Wt(t[2])}#${t[1]==="last"?-1:Kn(t[1])||af.indexOf(t[1])+1}`),!n)return;let[g,...v]=n.split(" ");o&&g==="d/1"&&(a=a.replace(/n(\d+)/,(k,_)=>`n${_*7}`));let[b,T,S]=[/ n\d+/.exec(a)?.[0],/ u\S+/.exec(a)?.[0],/ s\S+/.exec(a)?.[0]];return`${i?"dt":"d"} R ${[g,...v].join(" ")}${b??""}${T??""}${i?" "+i:""}${S??""}`}var dv="one two three four five six seven eight nine".split(" "),Qs="first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth".split(" "),sf="one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty".split(" ");function fv(e){return e=e.replace(/[\u2019']/g,"").replace(/\b(single|just)\b ?/g,"").replace(/\bmidday\b/g,"noon").replace(/\b(nxt)\b/g,"next").replace(/\bcoming\b/g,"this").replace(/\b(lst|past|previous|prev)\b/g,"last").replace(/\b(each|annually|yearly)\b/g,"every").replace(/\b(business|work) ?days?\b/g,"weekday").replace(/\b(on|the|during|for|of the|around|about)\b ?/g,(t,n)=>n==="of the"?"of ":n==="for"?"for ":"").replace(/\b(twenty|thirty)[ -]?(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|one|two|three|four|five|six|seven|eight|nine)\b/g,(t,n,r)=>`${n==="twenty"?2:3}${(Qs.indexOf(r)+1||dv.indexOf(r)+1)%10}`).replace(/\b(twentieth|thirtieth)\b/g,t=>t[0]==="t"&&t[1]==="w"?"20":"30").replace(new RegExp(`\\b(${Qs.join("|")})\\b(?! ${Ct})`,"g"),t=>String(Qs.indexOf(t)+1)).replace(new RegExp(`\\b(${sf.join("|")})\\b`,"g"),t=>String(sf.indexOf(t)+1)),e.replace(/\bevery weekday\b/,"every weekday")}function uf(e){let t=fv(It(e).replace(/(\d) (?:in the|at) (morning|afternoon|evening|night)/g,(u,d,c)=>`${d} ${c==="morning"?"am":"pm"}`).replace(/\b([ap])\.m\b\.?/g,"$1m").replace(/(\d{4})-(\d\d)-(\d\d)|^(\d{1,2})-(\d{1,2})$/,(u,d,c,h,g,v)=>d?`${d}/${c}/${h}`:`${g}/${v}`)).replace(/[.,!?]+$/,"").replace(/ (to|until|till|through|thru|at|on|from|and|-|for|in)$/,"");if(/\b(every|daily|weekly|monthly|weekdays?|biweekly|mon-?fri)\b|^\w+s$|of month$/.test(t)){let u=lv(t.replace(/\bmon-?fri\b/,"weekdays"));if(u)return u}let n=t.replace(/\s*[–—]\s*/g,"-").replace(/(?<=[a-z0-9])\s*-\s*(?=[a-z0-9])|\s+-\s+/g," to ").replace(/\b(til|till|until|thru|through)\b/g,"to").replace(/^(from|between) /,""),r=Xs(n.replace(/\bfrom (?!now|today)/g,""));if(r)return r.d&&r.t?`dt ${r.d} ${Lr(r.t)}`:r.d?`d ${r.d}`:`t ${Lr(r.t)}`;let i=n.replace(/\bfrom (?!now|today)/g,"").split(/ (?:to|and) /);if(i.length!==2)return"x";let a=Xs(i[0]),s=Xs(i[1]);a?.d&&!a.t&&/^\d{1,2}(st|nd|rd|th)?$/.test(i[1].trim())&&/^\d\d-\d\d$/.test(a.d)&&(s={d:`${a.d.slice(0,3)}${Me(parseInt(i[1]))}`});let o=i[0].match(/^(?:the )?(\d{1,2})(?:st|nd|rd|th)?$/);if(!a&&o&&s?.d&&/^\d\d-\d\d$/.test(s.d))return`d ${s.d.slice(0,3)}${Me(o[1])}>${s.d}`;if(!a||!s)return"x";if(a.t&&s.t){let[u,d]=of(a.t,s.t,n).split(">");return!a.d&&!s.d?`t ${u}>${d}`:a.d&&!s.d?`dt ${a.d} ${u}>${d}`:a.d&&s.d?`dt ${a.d} ${u}>${s.d} ${d}`:"x"}return a.d&&s.d&&!a.t&&!s.t?`d ${a.d}>${s.d}`:"x"}var lf=St("heuristic-small",uf);var ea={chrono:Md,"heuristic-small":lf,"heuristic-full":qd,"heuristic-full-2":Yd,"heuristic-full-3":rf};var Vr=class e{vocab;inv=[];ranks=new Map;digitSplit;unk;cache=new Map;constructor(t){this.vocab=new Map(Object.entries(t.model.vocab));for(let[r,i]of this.vocab)this.inv[i]=r;t.model.merges.forEach((r,i)=>{let a=typeof r=="string"?r:`${r[0]} ${r[1]}`;this.ranks.set(a,i)});let n=t.pre_tokenizer?.pretokenizers??[];this.digitSplit=n.some(r=>r.type==="Digits"&&r.individual_digits),this.unk=this.vocab.get(t.model.unk_token??"<unk>")??2}static normalize(t){return t.toLowerCase().split(/\s+/).filter(Boolean).join(" ")}bpe(t){let n=this.cache.get(t);if(n)return n;let r=Array.from(t);for(;r.length>1;){let a=-1,s=1/0;for(let o=0;o<r.length-1;o++){let u=this.ranks.get(`${r[o]} ${r[o+1]}`);u!==void 0&&u<s&&(s=u,a=o)}if(a<0)break;r=[...r.slice(0,a),r[a]+r[a+1],...r.slice(a+2)]}let i=r.map(a=>this.vocab.get(a)??this.unk);return this.cache.set(t,i),i}encode(t){let n=e.normalize(t);if(!n)return[];let r=n.split(" ").map((a,s)=>s===0?a:`\u2581${a}`),i=[];for(let a of r){let s=this.digitSplit?a.match(/\d|\D+/g)??[]:[a];for(let o of s)i.push(...this.bpe(o))}return i}decode(t,n=new Set([0,1,2])){return t.filter(i=>!n.has(i)).map(i=>this.inv[i]??"").join("").replaceAll("\u2581"," ").trim().replace(/\s+/g," ")}};var vo=Object.defineProperty,pv=Object.getOwnPropertyDescriptor,cv=Object.getOwnPropertyNames,hv=Object.prototype.hasOwnProperty,mv=(e=>typeof mn<"u"?mn:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof mn<"u"?mn:t)[n]}):e)(function(e){if(typeof mn<"u")return mn.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),K=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(r){throw n=[r],r}},tr=(e,t)=>{for(var n in t)vo(e,n,{get:t[n],enumerable:!0})},gv=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of cv(t))!hv.call(e,i)&&i!==n&&vo(e,i,{get:()=>t[i],enumerable:!(r=pv(t,i))||r.enumerable});return e},ii=e=>gv(vo({},"__esModule",{value:!0}),e),Yn,Vt,ta,Xn,na,Kh,Yh,bo=K(()=>{"use strict";Yn=new Map,Vt=[],ta=new WeakMap,Xn=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=Yn.get(e);if(r===void 0)Yn.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let i=Vt.indexOf(e);i!==-1&&Vt.splice(i,1);for(let a=0;a<Vt.length;a++)if(Yn.get(Vt[a]).priority<=n){Vt.splice(a,0,e);return}Vt.push(e)}return}throw new TypeError("not a valid backend")},na=async e=>{let t=Yn.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{if(!n){let r=t.backend,i=ta.get(r);t.initPromise=i?i.then(async()=>r.init(e),async()=>r.init(e)):r.init(e),ta.set(r,t.initPromise)}return await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Kh=async e=>{let t=e.executionProviders||[],n=t.map(u=>typeof u=="string"?u:u.name),r=n.length===0?Vt:n,i,a=[],s=new Set;for(let u of r){let d=await na(u);typeof d=="string"?a.push({name:u,err:d}):(i||(i=d),i===d&&s.add(u))}if(!i)throw new Error(`no available backend found. ERR: ${a.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:d}of a)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${d}`);let o=t.filter(u=>s.has(typeof u=="string"?u:u.name));return[i,new Proxy(e,{get:(u,d)=>d==="executionProviders"?o:Reflect.get(u,d)})]},Yh=async()=>{let e=[];for(let n of Vt){if(typeof Yn.get(n).backend.createLoraAdapterHandler!="function")continue;let r=await na(n);if(typeof r!="string")return r;e.push({name:n,err:r})}let t=e.length===0?"":` ERR: ${e.map(n=>`[${n.name}] ${n.err}`).join(", ")}`;throw new Error(`no available backend supports LoRA adapters.${t}`)}}),yv=K(()=>{"use strict";bo()}),Zh,wv=K(()=>{"use strict";Zh="1.31.1"}),ra,Ge,Xh=K(()=>{"use strict";wv(),ra="warning",Ge={wasm:{},webgl:{},webgpu:{},versions:{common:Zh},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ra=e}},get logLevel(){return ra}},Object.defineProperty(Ge,"logLevel",{enumerable:!0})}),Te,$v=K(()=>{"use strict";Xh(),Te=Ge}),Xi,ia,pt,rt,Rn,Dn,_o=K(()=>{"use strict";Xh(),Xi=(e,t)=>{(typeof Ge.trace>"u"?!Ge.wasm.trace:!Ge.trace)||console.timeStamp(`${e}::ORT::${t}`)},ia=(e,t)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let i=0;i<n.length;i++){if(r&&!n[i].includes("TRACE_FUNC")){let a=`FUNC_${e}::${n[i].trim().split(" ")[1]}`;t&&(a+=`::${t}`),Xi("CPU",a);return}n[i].includes("TRACE_FUNC")&&(r=!0)}},pt=e=>{(typeof Ge.trace>"u"?!Ge.wasm.trace:!Ge.trace)||ia("BEGIN",e)},rt=e=>{(typeof Ge.trace>"u"?!Ge.wasm.trace:!Ge.trace)||ia("END",e)},Rn=e=>{(typeof Ge.trace>"u"?!Ge.wasm.trace:!Ge.trace)||console.time(`ORT::${e}`)},Dn=e=>{(typeof Ge.trace>"u"?!Ge.wasm.trace:!Ge.trace)||console.timeEnd(`ORT::${e}`)}}),ko,Qh=K(()=>{"use strict";bo(),_o(),ko=class Jh{constructor(t,n){this.backend=t,this.handler=n}static async create(t){if(pt(),typeof t!="string"&&!(t instanceof Uint8Array))throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let n=await Yh(),r=await n.createLoraAdapterHandler(t);return rt(),new Jh(n,r)}async release(){return this.handler.dispose()}}}),em,tm,vv=K(()=>{"use strict";em=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let i,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[3]):(i=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",o=t?.norm,u,d;o===void 0||o.mean===void 0?u=[255,255,255,255]:typeof o.mean=="number"?u=[o.mean,o.mean,o.mean,o.mean]:(u=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(u[3]=o.mean[3])),o===void 0||o.bias===void 0?d=[0,0,0,0]:typeof o.bias=="number"?d=[o.bias,o.bias,o.bias,o.bias]:(d=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(d[3]=o.bias[3]));let c=a*i,h=0,g=c,v=c*2,b=-1;s==="RGBA"?(h=0,g=c,v=c*2,b=c*3):s==="RGB"?(h=0,g=c,v=c*2):s==="RBG"&&(h=0,v=c,g=c*2);for(let T=0;T<a;T++)for(let S=0;S<i;S++){let k=(e.data[h++]-d[0])*u[0],_=(e.data[g++]-d[1])*u[1],I=(e.data[v++]-d[2])*u[2],C=b===-1?255:(e.data[b++]-d[3])*u[3];r.fillStyle="rgba("+k+","+_+","+I+","+C+")",r.fillRect(S,T,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},tm=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let i,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[1],s=e.dims[3]):(i=e.dims[3],a=e.dims[2],s=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,d,c;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let h=a*i;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,v=0,b=1,T=2,S=3,k=0,_=h,I=h*2,C=-1;o==="RGBA"?(k=0,_=h,I=h*2,C=h*3):o==="RGB"?(k=0,_=h,I=h*2):o==="RBG"&&(k=0,I=h,_=h*2),r=n.createImageData(i,a);for(let A=0;A<a*i;v+=g,b+=g,T+=g,S+=g,A++)r.data[v]=(e.data[k++]-c[0])*d[0],r.data[b]=(e.data[_++]-c[1])*d[1],r.data[T]=(e.data[I++]-c[2])*d[2],r.data[S]=C===-1?255:(e.data[C++]-c[3])*d[3]}else throw new Error("Can not access image data");return r}}),Ni,nm,rm,im,sm,am,bv=K(()=>{"use strict";xo(),Ni=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,i=t.norm??{mean:255,bias:0},a,s;typeof i.mean=="number"?a=[i.mean,i.mean,i.mean,i.mean]:a=[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],typeof i.bias=="number"?s=[i.bias,i.bias,i.bias,i.bias]:s=[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=n*r,c=u==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),h=4,g=0,v=1,b=2,T=3,S=0,k=d,_=d*2,I=-1;o==="RGB"&&(h=3,g=0,v=1,b=2,T=-1),u==="RGBA"?I=d*3:u==="RBG"?(S=0,_=d,k=d*2):u==="BGR"&&(_=0,k=d,S=d*2);for(let C=0;C<d;C++,g+=h,b+=h,v+=h,T+=h)c[S++]=(e[g]+s[0])/a[0],c[k++]=(e[v]+s[1])/a[1],c[_++]=(e[b]+s[2])/a[2],I!==-1&&T!==-1&&(c[I++]=(e[T]+s[3])/a[3]);return u==="RGBA"?new nt("float32",c,[1,4,n,r]):new nt("float32",c,[1,3,n,r])},nm=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,i=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,o=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(n){let c=u();c.width=e.width,c.height=e.height;let h=d(c);if(h!=null){let g=e.height,v=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,v=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=g,o.width=v}else o.tensorFormat="RGBA",o.height=g,o.width=v;h.drawImage(e,0,0),s=h.getImageData(0,0,v,g).data}else throw new Error("Can not access image data")}else if(r){let c,h;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,h=t.resizedWidth):(c=e.height,h=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=c,o.width=h,t!==void 0){let g=u();g.width=h,g.height=c;let v=d(g);if(v!=null)v.putImageData(e,0,0),s=v.getImageData(0,0,h,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(i){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=e.width,c.height=e.height;let h=d(c);if(h!=null){let g=e.height,v=e.width;return h.drawImage(e,0,0,v,g),s=h.getImageData(0,0,v,g).data,o.height=g,o.width=v,Ni(s,o)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,h)=>{let g=u(),v=d(g);if(!e||!v)return h();let b=new Image;b.crossOrigin="Anonymous",b.src=e,b.onload=()=>{g.width=b.width,g.height=b.height,v.drawImage(b,0,0,g.width,g.height);let T=v.getImageData(0,0,g.width,g.height);o.height=g.height,o.width=g.width,c(Ni(T.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Ni(s,o);throw new Error("Input data provided is not supported - aborted tensor creation")},rm=(e,t)=>{let{width:n,height:r,download:i,dispose:a}=t,s=[1,r,n,4];return new nt({location:"texture",type:"float32",texture:e,dims:s,download:i,dispose:a})},im=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new nt({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:i,dispose:a})},sm=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new nt({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:i,dispose:a})},am=(e,t,n)=>new nt({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})}),An,ei,sa,om,_v=K(()=>{"use strict";An=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),ei=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),sa=!1,om=()=>{if(!sa){sa=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<"u"&&n.from;e&&(An.set("int64",BigInt64Array),ei.set(BigInt64Array,"int64")),t&&(An.set("uint64",BigUint64Array),ei.set(BigUint64Array,"uint64")),r?(An.set("float16",n),ei.set(n,"float16")):An.set("float16",Uint16Array)}}}),um,lm,kv=K(()=>{"use strict";xo(),um=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},lm=(e,t)=>{switch(e.location){case"cpu":return new nt(e.type,e.data,t);case"cpu-pinned":return new nt({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new nt({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new nt({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new nt({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),nt,xo=K(()=>{"use strict";vv(),bv(),_v(),kv(),nt=class{constructor(e,t,n){om();let r,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,r=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=An.get(r);if(!s)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint64"&&r!=="int8"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if(typeof e=="string")if(r=e,o=n,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let u=An.get(e);if(u===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&u===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${u.name} as data.`);e==="uint64"||e==="int64"?s=u.from(t,BigInt):s=u.from(t)}else if(t instanceof u)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&u!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${u}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let u=typeof e[0];if(u==="string")r="string",s=e;else if(u==="boolean")r="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${u}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",s=Uint8Array.from(e);else{let u=ei.get(e.constructor);if(u===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=u,s=e}if(o===void 0)o=[s.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");i=o,this.cpuData=s,this.dataLocation="cpu"}let a=um(i);if(this.cpuData&&a!==this.cpuData.length&&!((r==="uint4"||r==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=i,this.size=a}static async fromImage(e,t){return nm(e,t)}static fromTexture(e,t){return rm(e,t)}static fromGpuBuffer(e,t){return im(e,t)}static fromMLTensor(e,t){return sm(e,t)}static fromPinnedBuffer(e,t,n){return am(e,t,n)}toDataURL(e){return em(this,e)}toImageData(e){return tm(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return lm(this,e)}}}),Ze,dm=K(()=>{"use strict";xo(),Ze=nt}),fm,xv=K(()=>{"use strict";bo(),Qh(),dm(),_o(),fm=class pm{constructor(t,n){this.handler=t,this.backend=n}async run(t,n,r){pt(),Rn("InferenceSession.run");let i={},a={};if(typeof t!="object"||t===null||t instanceof Ze||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof Ze)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let c of n){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);i[c]=null}if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,h=Object.getOwnPropertyNames(n);for(let g of this.outputNames)if(h.indexOf(g)!==-1){let v=n[g];(v===null||v instanceof Ze)&&(c=!0,s=!1,i[g]=v)}if(c){if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else a=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(s)for(let c of this.outputNames)i[c]=null;let o;if(a.activeLoraAdapters!==void 0){if(!Array.isArray(a.activeLoraAdapters))throw new TypeError("'activeLoraAdapters' must be an array.");o=a.activeLoraAdapters.map(c=>{if(!(c instanceof ko))throw new TypeError("'activeLoraAdapters' must be an array of LoraAdapter objects.");if(c.backend!==this.backend)throw new Error("LoRA adapter was created by a different backend than the session.");return c.handler})}let u=await this.handler.run(t,i,a,o),d={};for(let c in u)if(Object.hasOwnProperty.call(u,c)){let h=u[c];h instanceof Ze?d[c]=h:d[c]=new Ze(h.type,h.data,h.dims)}return Dn("InferenceSession.run"),rt(),d}async release(){return this.handler.dispose()}static async create(t,n,r,i){pt(),Rn("InferenceSession.create");let a,s={};if(typeof t=="string"){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,h=0,g=t.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteOffset' must be an integer.");if(h<0||h>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(g=t.byteLength-h,typeof r=="number"){if(g=r,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||h+g>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-h}].`);if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,h,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,u]=await Kh(s),d=await o.createInferenceSessionHandler(a,u);return Dn("InferenceSession.create"),rt(),new pm(d,o)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),ai,Ev=K(()=>{"use strict";xv(),ai=fm}),cm,Tv=K(()=>{"use strict";Qh(),cm=ko}),Sv=K(()=>{"use strict"}),Iv=K(()=>{"use strict"}),Cv=K(()=>{"use strict"}),Av=K(()=>{"use strict"}),zv={};tr(zv,{InferenceSession:()=>ai,LoraAdapter:()=>cm,TRACE:()=>Xi,TRACE_EVENT_BEGIN:()=>Rn,TRACE_EVENT_END:()=>Dn,TRACE_FUNC_BEGIN:()=>pt,TRACE_FUNC_END:()=>rt,Tensor:()=>Ze,env:()=>Te,registerBackend:()=>Xn});var st=K(()=>{"use strict";yv(),$v(),Ev(),Tv(),dm(),Sv(),Iv(),_o(),Cv(),Av()}),Eo=K(()=>{"use strict"}),hm={};tr(hm,{default:()=>mm});var aa,oa,mm,Ov=K(()=>{"use strict";xy(),Bn(),To(),aa="ort-wasm-proxy-worker",oa=globalThis.self?.name===aa,oa&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case"init-wasm":So(n.wasm).then(()=>{Fo(n).then(()=>{postMessage({type:t})},r=>{postMessage({type:t,err:r})})},r=>{postMessage({type:t,err:r})});break;case"init-ep":{let{epName:r,env:i}=n;Go(i,r).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:r}=n,i=is(r);postMessage({type:t,out:i});break}case"create":{let{model:r,options:i}=n;Ho(r,i).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":jo(n),postMessage({type:t});break;case"run":{let{sessionId:r,inputIndices:i,inputs:a,outputIndices:s,options:o}=n;Ko(r,i,a,s,new Array(s.length).fill(null),o).then(u=>{u.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:u},Zo([...a,...u]))},u=>{postMessage({type:t,err:u})});break}case"end-profiling":Yo(n),postMessage({type:t});break;default:}}catch(r){postMessage({type:t,err:r})}}),mm=oa?null:e=>new Worker(e??tt,{type:"module",name:aa})}),gm={};tr(gm,{default:()=>ym});async function df(e={}){var t=e,n=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,i=r&&self.name?.startsWith("em-pthread");t.mountExternalData=(l,p)=>{l.startsWith("./")&&(l=l.substring(2)),(t.jd||(t.jd=new Map)).set(l,p)},t.unmountExternalData=()=>{delete t.jd,delete t.ke,delete t.je,delete t.le},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=l=>async(...p)=>{try{if(t.hd)throw Error("Session already started");let y=t.hd={Vd:p[0],errors:[]},m=await l(...p);if(t.hd!==y)throw Error("Session mismatch");t.pd?.flush();let x=y.errors;if(0<x.length){let O=await Promise.all(x);if(O=O.filter(P=>P),0<O.length)throw Error(O.join(`
`))}return m}finally{t.hd=null}};t.jsepInit=(l,p)=>{if(l==="webgpu"){[t.pd,t.Ld,t.Pd,t.rd,t.Od,t.ic,t.Qd,t.Sd,t.Md,t.Nd,t.Rd]=p;let y=t.pd;t.jsepRegisterBuffer=(m,x,O,P)=>y.registerBuffer(m,x,O,P),t.jsepGetBuffer=m=>y.getBuffer(m),t.jsepCreateDownloader=(m,x,O)=>y.createDownloader(m,x,O),t.jsepOnCreateSession=m=>{y.onCreateSession(m)},t.jsepOnReleaseSession=m=>{y.onReleaseSession(m)},t.jsepOnRunStart=m=>y.onRunStart(m),t.Td=(m,x)=>{y.upload(m,x)}}else if(l==="webnn"){let y=p[0];[t.ce,t.Cd,t.webnnEnsureTensor,t.Dd,t.webnnDownloadTensor,t.be,t.webnnEnableTraceEvent]=p.slice(1),t.webnnReleaseTensorId=t.Cd,t.webnnUploadTensor=t.Dd,t.webnnRegisterMLContext=t.be,t.webnnOnRunStart=m=>y.onRunStart(m),t.webnnOnRunEnd=y.onRunEnd.bind(y),t.webnnOnReleaseSession=m=>{y.onReleaseSession(m)},t.webnnCreateMLTensorDownloader=(m,x)=>y.createMLTensorDownloader(m,x),t.webnnRegisterMLTensor=(m,x,O,P)=>y.registerMLTensor(m,x,O,P),t.webnnCreateMLContext=m=>y.createMLContext(m),t.webnnRegisterGraphInput=y.registerGraphInput.bind(y),t.webnnIsGraphInput=y.isGraphInput.bind(y),t.webnnRegisterGraphOutput=y.registerGraphOutput.bind(y),t.webnnIsGraphOutput=y.isGraphOutput.bind(y),t.webnnCreateTemporaryTensor=y.createTemporaryTensor.bind(y),t.webnnIsGraphInputOutputTypeSupported=y.isGraphInputOutputTypeSupported.bind(y)}};let s=()=>{let l=p=>(...y)=>{let m=kt;return y=p(...y),kt!=m?new Promise((x,O)=>{ws={resolve:x,reject:O}}):y};(p=>{for(let y of p)t[y]=l(t[y])})("_OrtAppendExecutionProvider _OrtAppendExecutionProviderV2 _OrtCreateSession _OrtRun _OrtRunWithBinding _OrtBindInput".split(" ")),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s?.()};var o,u,d=(l,p)=>{throw p},c=import.meta.url,h="";if(n||r){try{h=new URL(".",c).href}catch{}r&&(u=l=>{var p=new XMLHttpRequest;return p.open("GET",l,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),o=async l=>{if(w(l))return new Promise((y,m)=>{var x=new XMLHttpRequest;x.open("GET",l,!0),x.responseType="arraybuffer",x.onload=()=>{x.status==200||x.status==0&&x.response?y(x.response):m(x.status)},x.onerror=m,x.send(null)});var p=await fetch(l,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)}}var g,v,b,T,S,k,_=console.log.bind(console),I=console.error.bind(console),C=_,A=I,D=!1,w=l=>l.startsWith("file://");function f(){Yt.buffer!=z.buffer&&Y()}if(i){let l=function(p){try{var y=p.data,m=y.bd;if(m==="load"){let x=[];self.onmessage=O=>x.push(O),k=()=>{postMessage({bd:"loaded"});for(let O of x)l(O);self.onmessage=l};for(let O of y.Hd)t[O]&&!t[O].proxy||(t[O]=(...P)=>{postMessage({bd:"callHandler",Fd:O,args:P})},O=="print"&&(C=t[O]),O=="printErr"&&(A=t[O]));Yt=y.Zd,Y(),v=y.$d,be(),wi()}else if(m==="run"){(function(x){var O=(f(),j)[x+52>>>2>>>0];x=(f(),j)[x+56>>>2>>>0],nl(O,O-x),fe(O)})(y.ad),ks(y.ad,0,0,1,0,0),nu(),ms(y.ad),E||(Zu(),E=!0);try{Ly(y.Xd,y.nd)}catch(x){if(x!="unwind")throw x}}else y.target!=="setimmediate"&&(m==="checkMailbox"?E&&fi():m&&(A(`worker: received unknown command ${m}`),A(y)))}catch(x){throw Xu(),x}};var $=l,E=!1;self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=l}var z,N,B,F,R,j,q,oe,H,ee,V,M=!1;function Y(){var l=Yt.buffer;t.HEAP8=z=new Int8Array(l),B=new Int16Array(l),t.HEAPU8=N=new Uint8Array(l),F=new Uint16Array(l),t.HEAP32=R=new Int32Array(l),t.HEAPU32=j=new Uint32Array(l),q=new Float32Array(l),oe=new Float64Array(l),H=new BigInt64Array(l),ee=new BigUint64Array(l)}function G(){M=!0,i?k():Rt.vb()}function he(l){throw A(l="Aborted("+l+")"),D=!0,l=new WebAssembly.RuntimeError(l+". Build with -sASSERTIONS for more info."),S?.(l),l}function Q(){return{a:{na:pw,jb:fw,g:Vy,G:qy,f:Fy,o:Gy,h:Hy,$:jy,b:Ky,S:Yy,Ja:uu,n:Zy,aa:pu,_a:cu,Fa:hu,Ha:mu,$a:gu,Ya:yu,Ra:wu,Xa:$u,la:vu,Ga:bu,Da:_u,Za:ku,Ea:xu,eb:Xy,ga:Jy,ya:e1,wa:n1,fa:i1,N:s1,I:a1,xa:o1,_:h1,za:m1,Ua:g1,Ba:w1,Ka:$1,ua:v1,ha:b1,Ta:ms,bb:_1,Q:T1,r:z1,c:cs,kb:O1,y:R1,M:D1,D:N1,m:M1,s:Ou,lb:P1,J:B1,R:U1,j:W1,u:L1,q:V1,k:q1,Oa:F1,Pa:G1,Qa:H1,Ma:Mu,Na:Pu,va:Bu,gb:K1,db:X1,v:Q1,ba:J1,ia:ew,cb:Y1,V:tw,ab:nw,Ca:rw,F:j1,U:iw,ma:gi,Aa:aw,ib:sw,hb:ow,Va:Vu,Wa:qu,Ia:us,T:Fu,La:Gu,ka:Hu,Sa:ju,ja:Ku,nb:Zw,oa:Gw,ob:Yw,pa:Fw,H:Rw,e:gw,t:hw,w:cw,B:Sw,pb:Lw,Z:Ww,x:vw,qa:Vw,X:Hw,ca:Uw,qb:Bw,ea:ww,O:Iw,sb:Nw,ra:Pw,tb:Dw,L:zw,Y:qw,d:mw,A:$w,l:yw,mb:Xw,p:_w,z:kw,C:bw,E:xw,K:Cw,sa:Ow,P:jw,da:Aw,W:Kw,ub:Tw,ta:Ew,rb:Mw,i:lw,a:Yt,fb:os}}}async function be(){function l(m,x){var O=Rt=m.exports;m={};for(let[P,W]of Object.entries(O))typeof W=="function"?(O=k1(W),m[P]=O):m[P]=W;return Rt=m,Rt=(function(){var P=Rt,W=te=>de=>te(de)>>>0,X=te=>()=>te()>>>0;return(P=Object.assign({},P)).wb=W(P.wb),P.ec=X(P.ec),P.gc=W(P.gc),P.uc=W(P.uc),P.vc=X(P.vc),P.zc=W(P.zc),P})(),eu.push(Rt.hc),Yu=(m=Rt).wb,Zu=m.xb,t._OrtInit=m.yb,t._OrtGetLastError=m.zb,t._OrtCreateSessionOptions=m.Ab,t._OrtAppendExecutionProvider=m.Bb,t._OrtGetEpDevices=m.Cb,t._OrtEpDevice_EpName=m.Db,t._OrtAppendExecutionProviderV2=m.Eb,t._OrtAddFreeDimensionOverride=m.Fb,t._OrtAddSessionConfigEntry=m.Gb,t._OrtReleaseSessionOptions=m.Hb,t._OrtCreateSession=m.Ib,t._OrtReleaseSession=m.Jb,t._OrtGetInputOutputCount=m.Kb,t._OrtGetInputOutputMetadata=m.Lb,t._OrtFree=m.Mb,t._OrtCreateTensor=m.Nb,t._OrtGetTensorData=m.Ob,t._OrtReleaseTensor=m.Pb,t._OrtCreateLoraAdapter=m.Qb,t._OrtReleaseLoraAdapter=m.Rb,t._OrtCreateRunOptions=m.Sb,t._OrtAddRunConfigEntry=m.Tb,t._OrtRunOptionsAddActiveLoraAdapter=m.Ub,t._OrtReleaseRunOptions=m.Vb,t._OrtCreateBinding=m.Wb,t._OrtBindInput=m.Xb,t._OrtBindOutput=m.Yb,t._OrtClearBoundOutputs=m.Zb,t._OrtReleaseBinding=m._b,t._OrtRunWithBinding=m.$b,t._OrtRun=m.ac,t._OrtEndProfiling=m.bc,t._JsepOutput=m.cc,t._JsepGetNodeName=m.dc,yi=m.ec,xt=t._free=m.fc,sr=t._malloc=m.gc,ks=m.jc,Xu=m.kc,Qu=m.lc,Ju=m.mc,xs=m.nc,el=m.oc,tl=m.pc,ce=m.qc,ar=m.rc,nl=m.sc,fe=m.tc,Es=m.uc,pe=m.vc,rl=m.wc,Ts=m.xc,il=m.yc,sl=m.zc,al=m.Ac,Ss=m.Bc,ol=m.Cc,ul=m.Dc,ll=m.Ec,dl=m.Fc,fl=m.Gc,pl=m.Hc,cl=m.Ic,hl=m.Jc,ml=m.Kc,gl=m.Lc,yl=m.Mc,wl=m.Nc,$l=m.Oc,vl=m.Pc,bl=m.Qc,_l=m.Rc,kl=m.Sc,xl=m.Tc,El=m.Uc,Tl=m.Vc,Sl=m.Wc,Il=m.Xc,Cl=m.Yc,Al=m._c,zl=m.$c,Ol=m.kd,Rl=m.ld,Dl=m.qd,Nl=m.vd,Ml=m.wd,Pl=m.xd,Bl=m.yd,Ul=m.zd,Wl=m.Ad,Ll=m.Bd,Vl=m.Gd,ql=m.Jd,Fl=m.fe,Gl=m.ge,Hl=m.he,jl=m.ie,v=x,Rt}var p,y=Q();return t.instantiateWasm?new Promise(m=>{t.instantiateWasm(y,(x,O)=>{m(l(x,O))})}):i?l(new WebAssembly.Instance(v,Q()),v):(V??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",h):h+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,p=await(async function(m){var x=V;if(!g&&!w(x))try{var O=fetch(x,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(O,m)}catch(P){A(`wasm streaming compile failed: ${P}`),A("falling back to ArrayBuffer instantiation")}return(async function(P,W){try{var X=await(async function(te){if(!g)try{var de=await o(te);return new Uint8Array(de)}catch{}if(te==V&&g)te=new Uint8Array(g);else{if(!u)throw"both async and sync fetching of the wasm failed";te=u(te)}return te})(P);return await WebAssembly.instantiate(X,W)}catch(te){A(`failed to asynchronously prepare wasm: ${te}`),he(te)}})(x,m)})(y),l(p.instance,p.module))}class me{name="ExitStatus";constructor(p){this.message=`Program terminated with exit(${p})`,this.status=p}}var De=l=>{l.terminate(),l.onmessage=()=>{}},jt=[],Ne=0,Ce=null,at=l=>{Kt.length==0&&(iu(),ru(Kt[0]));var p=Kt.pop();if(!p)return 6;rr.push(p),pn[l.ad]=p,p.ad=l.ad;var y={bd:"run",Xd:l.Wd,nd:l.nd,ad:l.ad};return p.postMessage(y,l.ud),0},bt=0,Ie=(l,p,...y)=>{var m,x=16*y.length,O=pe(),P=Es(x),W=P>>>3;for(m of y)typeof m=="bigint"?((f(),H)[W++>>>0]=1n,(f(),H)[W++>>>0]=m):((f(),H)[W++>>>0]=0n,(f(),oe)[W++>>>0]=m);return l=Qu(l,0,x,P,p),fe(O),l};function os(l){if(i)return Ie(0,1,l);if(b=l,!(0<bt)){for(var p of rr)De(p);for(p of Kt)De(p);Kt=[],rr=[],pn={},D=!0}d(0,new me(l))}function Jo(l){if(i)return Ie(1,0,l);us(l)}var us=l=>{if(b=l,i)throw Jo(l),"unwind";os(l)},Kt=[],rr=[],eu=[],pn={},tu=l=>{var p=l.ad;delete pn[p],Kt.push(l),rr.splice(rr.indexOf(l),1),l.ad=0,Ju(p)};function nu(){eu.forEach(l=>l())}var ru=l=>new Promise(p=>{l.onmessage=x=>{var O=x.data;if(x=O.bd,O.md&&O.md!=yi()){var P=pn[O.md];P?P.postMessage(O,O.ud):A(`Internal error! Worker sent a message "${x}" to target pthread ${O.md}, but that thread no longer exists!`)}else x==="checkMailbox"?fi():x==="spawnThread"?at(O):x==="cleanupThread"?di(()=>{tu(pn[O.Yd])}):x==="loaded"?(l.loaded=!0,p(l)):O.target==="setimmediate"?l.postMessage(O):x==="uncaughtException"?l.onerror(O.error):x==="callHandler"?t[O.Fd](...O.args):x&&A(`worker sent an unknown command ${x}`)},l.onerror=x=>{throw A(`worker sent an error! ${x.filename}:${x.lineno}: ${x.message}`),x};var y,m=[];for(y of[])t.propertyIsEnumerable(y)&&m.push(y);l.postMessage({bd:"load",Hd:m,Zd:Yt,$d:v})});function iu(){var l=new Worker((()=>{let p=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new p("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Kt.push(l)}var Yt,Ly=(l,p)=>{bt=0,l=Ss(l,p),0<bt?b=l:xs(l)},oi=[],ui=0;function Vy(l){var p=new ls(l>>>=0);return(f(),z)[p.cd+12>>>0]==0&&(su(p,!0),ui--),au(p,!1),oi.push(p),sl(l)}var Wn=0,qy=()=>{ce(0,0);var l=oi.pop();rl(l.od),Wn=0};function su(l,p){p=p?1:0,(f(),z)[l.cd+12>>>0]=p}function au(l,p){p=p?1:0,(f(),z)[l.cd+13>>>0]=p}class ls{constructor(p){this.od=p,this.cd=p-24}}var ds=l=>{var p=Wn;if(!p)return ar(0),0;var y=new ls(p);(f(),j)[y.cd+16>>>2>>>0]=p;var m=(f(),j)[y.cd+4>>>2>>>0];if(!m)return ar(0),p;for(var x of l){if(x===0||x===m)break;if(il(x,m,y.cd+16))return ar(x),p}return ar(m),p};function Fy(){return ds([])}function Gy(l){return ds([l>>>0])}function Hy(l,p,y,m){return ds([l>>>0,p>>>0,y>>>0,m>>>0])}var jy=()=>{var l=oi.pop();l||he("no exception to throw");var p=l.od;throw(f(),z)[l.cd+13>>>0]==0&&(oi.push(l),au(l,!0),su(l,!1),ui++),Ts(p),Wn=p};function Ky(l,p,y){var m=new ls(l>>>=0);throw p>>>=0,y>>>=0,(f(),j)[m.cd+16>>>2>>>0]=0,(f(),j)[m.cd+4>>>2>>>0]=p,(f(),j)[m.cd+8>>>2>>>0]=y,Ts(l),ui++,Wn=l}var Yy=()=>ui;function ou(l,p,y,m){return i?Ie(2,1,l,p,y,m):uu(l,p,y,m)}function uu(l,p,y,m){if(l>>>=0,p>>>=0,y>>>=0,m>>>=0,!globalThis.SharedArrayBuffer)return 6;var x=[];return i&&x.length===0?ou(l,p,y,m):(l={Wd:y,ad:l,nd:m,ud:x},i?(l.bd="spawnThread",postMessage(l,x),0):at(l))}function Zy(l){throw Wn||=l>>>0,Wn}var lu=globalThis.TextDecoder&&new TextDecoder,du=(l,p,y,m)=>{if(y=p+y,m)return y;for(;l[p]&&!(p>=y);)++p;return p},fu=(l,p=0,y,m)=>{if(16<(y=du(l,p>>>=0,y,m))-p&&l.buffer&&lu)return lu.decode(l.buffer instanceof ArrayBuffer?l.subarray(p,y):l.slice(p,y));for(m="";p<y;){var x=l[p++];if(128&x){var O=63&l[p++];if((224&x)==192)m+=String.fromCharCode((31&x)<<6|O);else{var P=63&l[p++];65536>(x=(240&x)==224?(15&x)<<12|O<<6|P:(7&x)<<18|O<<12|P<<6|63&l[p++])?m+=String.fromCharCode(x):(x-=65536,m+=String.fromCharCode(55296|x>>10,56320|1023&x))}}else m+=String.fromCharCode(x)}return m},Pe=(l,p,y)=>(l>>>=0)?fu((f(),N),l,p,y):"";function pu(l,p,y){return i?Ie(3,1,l,p,y):0}function cu(l,p){if(i)return Ie(4,1,l,p)}function hu(l,p){if(i)return Ie(5,1,l,p)}function mu(l,p,y){if(i)return Ie(6,1,l,p,y)}function gu(l,p,y){return i?Ie(7,1,l,p,y):0}function yu(l,p){if(i)return Ie(8,1,l,p)}function wu(l,p,y){if(i)return Ie(9,1,l,p,y)}function $u(l,p,y,m){if(i)return Ie(10,1,l,p,y,m)}function vu(l,p,y,m){if(i)return Ie(11,1,l,p,y,m)}function bu(l,p,y,m){if(i)return Ie(12,1,l,p,y,m)}function _u(l){if(i)return Ie(13,1,l)}function ku(l,p){if(i)return Ie(14,1,l,p)}function xu(l,p,y){if(i)return Ie(15,1,l,p,y)}var Xy=()=>he(""),_t=l=>{l>>>=0;for(var p="";;){var y=(f(),N)[l++>>>0];if(!y)return p;p+=String.fromCharCode(y)}},fs={},ps={},Qy={},Ln=class extends Error{constructor(l){super(l),this.name="BindingError"}};function Ot(l,p,y={}){return(function(m,x,O={}){var P=x.name;if(!m)throw new Ln(`type "${P}" must have a positive integer typeid pointer`);if(ps.hasOwnProperty(m)){if(O.Id)return;throw new Ln(`Cannot register type '${P}' twice`)}ps[m]=x,delete Qy[m],fs.hasOwnProperty(m)&&(x=fs[m],delete fs[m],x.forEach(W=>W()))})(l,p,y)}var Eu=(l,p,y)=>{switch(p){case 1:return y?m=>(f(),z)[m>>>0]:m=>(f(),N)[m>>>0];case 2:return y?m=>(f(),B)[m>>>1>>>0]:m=>(f(),F)[m>>>1>>>0];case 4:return y?m=>(f(),R)[m>>>2>>>0]:m=>(f(),j)[m>>>2>>>0];case 8:return y?m=>(f(),H)[m>>>3>>>0]:m=>(f(),ee)[m>>>3>>>0];default:throw new TypeError(`invalid integer width (${p}): ${l}`)}};function Jy(l,p,y,m,x){l>>>=0,y>>>=0,p=_t(p>>>0);let O=P=>P;if(m=m===0n){let P=8*y;O=W=>BigInt.asUintN(P,W),x=O(x)}Ot(l,{name:p,Zc:O,ed:(P,W)=>(typeof W=="number"&&(W=BigInt(W)),W),dd:Eu(p,y,!m),gd:null})}function e1(l,p,y,m){Ot(l>>>=0,{name:p=_t(p>>>0),Zc:function(x){return!!x},ed:function(x,O){return O?y:m},dd:function(x){return this.Zc((f(),N)[x>>>0])},gd:null})}var Tu=[],cn=[0,1,,1,null,1,!0,1,!1,1];function cs(l){9<(l>>>=0)&&--cn[l+1]===0&&(cn[l]=void 0,Tu.push(l))}var ot=l=>{if(!l)throw new Ln(`Cannot use deleted val. handle = ${l}`);return cn[l]},ct=l=>{switch(l){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=Tu.pop()||cn.length;return cn[p]=l,cn[p+1]=1,p}};function hs(l){return this.Zc((f(),j)[l>>>2>>>0])}var t1={name:"emscripten::val",Zc:l=>{var p=ot(l);return cs(l),p},ed:(l,p)=>ct(p),dd:hs,gd:null};function n1(l){return Ot(l>>>0,t1)}var r1=(l,p)=>{switch(p){case 4:return function(y){return this.Zc((f(),q)[y>>>2>>>0])};case 8:return function(y){return this.Zc((f(),oe)[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${l}`)}};function i1(l,p,y){y>>>=0,Ot(l>>>=0,{name:p=_t(p>>>0),Zc:m=>m,ed:(m,x)=>x,dd:r1(p,y),gd:null})}function s1(l,p,y,m,x){l>>>=0,y>>>=0,p=_t(p>>>0);let O=W=>W;if(m===0){var P=32-8*y;O=W=>W<<P>>>P,x=O(x)}Ot(l,{name:p,Zc:O,ed:(W,X)=>X,dd:Eu(p,y,m!==0),gd:null})}function a1(l,p,y){function m(O){var P=(f(),j)[O>>>2>>>0];return O=(f(),j)[O+4>>>2>>>0],new x((f(),z).buffer,O,P)}var x=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];Ot(l>>>=0,{name:y=_t(y>>>0),Zc:m,dd:m},{Id:!0})}var Zt=(l,p,y)=>{var m=(f(),N);if(p>>>=0,0<y){var x=p;y=p+y-1;for(var O=0;O<l.length;++O){var P=l.codePointAt(O);if(127>=P){if(p>=y)break;m[p++>>>0]=P}else if(2047>=P){if(p+1>=y)break;m[p++>>>0]=192|P>>6,m[p++>>>0]=128|63&P}else if(65535>=P){if(p+2>=y)break;m[p++>>>0]=224|P>>12,m[p++>>>0]=128|P>>6&63,m[p++>>>0]=128|63&P}else{if(p+3>=y)break;m[p++>>>0]=240|P>>18,m[p++>>>0]=128|P>>12&63,m[p++>>>0]=128|P>>6&63,m[p++>>>0]=128|63&P,O++}}m[p>>>0]=0,l=p-x}else l=0;return l},li=l=>{for(var p=0,y=0;y<l.length;++y){var m=l.charCodeAt(y);127>=m?p++:2047>=m?p+=2:55296<=m&&57343>=m?(p+=4,++y):p+=3}return p};function o1(l,p){Ot(l>>>=0,{name:p=_t(p>>>0),Zc(y){var m=(f(),j)[y>>>2>>>0];return m=Pe(y+4,m,!0),xt(y),m},ed(y,m){m instanceof ArrayBuffer&&(m=new Uint8Array(m));var x=typeof m=="string";if(!(x||ArrayBuffer.isView(m)&&m.BYTES_PER_ELEMENT==1))throw new Ln("Cannot pass non-string to std::string");var O=x?li(m):m.length,P=sr(4+O+1),W=P+4;return(f(),j)[P>>>2>>>0]=O,x?Zt(m,W,O+1):(f(),N).set(m,W>>>0),y!==null&&y.push(xt,P),P},dd:hs,gd(y){xt(y)}})}var Su=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,u1=(l,p,y)=>{if(l>>>=1,16<(p=du((f(),F),l,p/2,y))-l&&Su)return Su.decode((f(),F).slice(l,p));for(y="";l<p;++l){var m=(f(),F)[l>>>0];y+=String.fromCharCode(m)}return y},l1=(l,p,y)=>{if(y??=2147483647,2>y)return 0;var m=p;y=(y-=2)<2*l.length?y/2:l.length;for(var x=0;x<y;++x){var O=l.charCodeAt(x);(f(),B)[p>>>1>>>0]=O,p+=2}return(f(),B)[p>>>1>>>0]=0,p-m},d1=l=>2*l.length,f1=(l,p,y)=>{var m="";l>>>=2;for(var x=0;!(x>=p/4);x++){var O=(f(),j)[l+x>>>0];if(!O&&!y)break;m+=String.fromCodePoint(O)}return m},p1=(l,p,y)=>{if(p>>>=0,y??=2147483647,4>y)return 0;var m=p;y=m+y-4;for(var x=0;x<l.length;++x){var O=l.codePointAt(x);if(65535<O&&x++,(f(),R)[p>>>2>>>0]=O,(p+=4)+4>y)break}return(f(),R)[p>>>2>>>0]=0,p-m},c1=l=>{for(var p=0,y=0;y<l.length;++y)65535<l.codePointAt(y)&&y++,p+=4;return p};function h1(l,p,y){if(l>>>=0,p>>>=0,y=_t(y>>>=0),p===2)var m=u1,x=l1,O=d1;else m=f1,x=p1,O=c1;Ot(l,{name:y,Zc:P=>{var W=(f(),j)[P>>>2>>>0];return W=m(P+4,W*p,!0),xt(P),W},ed:(P,W)=>{if(typeof W!="string")throw new Ln(`Cannot pass non-string to C++ string type ${y}`);var X=O(W),te=sr(4+X+p);return(f(),j)[te>>>2>>>0]=X/p,x(W,te+4,X+p),P!==null&&P.push(xt,te),te},dd:hs,gd(P){xt(P)}})}function m1(l,p){Ot(l>>>=0,{Kd:!0,name:p=_t(p>>>0),Zc:()=>{},ed:()=>{}})}function g1(l){ks(l>>>0,!r,1,!n,131072,!1),nu()}var di=l=>{if(!D)try{if(l(),!(0<bt))try{i?yi()&&xs(b):us(b)}catch(p){p instanceof me||p=="unwind"||d(0,p)}}catch(p){p instanceof me||p=="unwind"||d(0,p)}},y1=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function ms(l){l>>>=0,y1||(Atomics.waitAsync((f(),R),l>>>2,l).value.then(fi),l+=128,Atomics.store((f(),R),l>>>2,1))}var fi=()=>di(()=>{var l=yi();l&&(ms(l),tl())});function w1(l,p){(l>>>=0)==p>>>0?setTimeout(fi):i?postMessage({md:l,bd:"checkMailbox"}):(l=pn[l])&&l.postMessage({bd:"checkMailbox"})}var gs=[];function $1(l,p,y,m,x){for(p>>>=0,x>>>=0,gs.length=0,y=x>>>3,m=x+m>>>3;y<m;){var O;O=(f(),H)[y++>>>0]?(f(),H)[y++>>>0]:(f(),oe)[y++>>>0],gs.push(O)}return(p?Is[p]:dw[l])(...gs)}var v1=()=>{bt=0};function b1(l){l>>>=0,i?postMessage({bd:"cleanupThread",Yd:l}):tu(pn[l])}function _1(l){}var pi=l=>{try{l()}catch(p){he(p)}};function k1(l){var p=(...y)=>{ci.push(l);try{return l(...y)}finally{D||(ci.pop(),kt&&Xt===1&&ci.length===0&&(Xt=0,bt+=1,pi(Gl),typeof Fibers<"u"&&Fibers.ne()))}};return Au.set(l,p),p}var Xt=0,kt=null,Iu=0,ci=[],ys=new Map,Cu=new Map,Au=new Map,x1=0,ws=null,E1=[],zu=l=>(function(p){if(!D){if(Xt===0){var y=!1,m=!1;p((x=0)=>{if(!D&&(Iu=x,y=!0,m)){Xt=2,pi(()=>Hl(kt)),typeof MainLoop<"u"&&MainLoop.Ed&&MainLoop.resume(),x=!1;try{var O=(function(){var X=(f(),R)[kt+8>>>2>>>0];return X=Cu.get(X),X=Au.get(X),--bt,X()})()}catch(X){O=X,x=!0}var P=!1;if(!kt){var W=ws;W&&(ws=null,(x?W.reject:W.resolve)(O),P=!0)}if(x&&!P)throw O}}),m=!0,y||(Xt=1,kt=(function(){var x=sr(65548),O=x+12;if((f(),j)[x>>>2>>>0]=O,(f(),j)[x+4>>>2>>>0]=O+65536,O=ci[0],!ys.has(O)){var P=x1++;ys.set(O,P),Cu.set(P,O)}return O=ys.get(O),(f(),R)[x+8>>>2>>>0]=O,x})(),typeof MainLoop<"u"&&MainLoop.Ed&&MainLoop.pause(),pi(()=>Fl(kt)))}else Xt===2?(Xt=0,pi(jl),xt(kt),kt=null,E1.forEach(di)):he(`invalid state: ${Xt}`);return Iu}})(p=>{l().then(p)});function T1(l){return l>>>=0,zu(async()=>{var p=await ot(l);return ct(p)})}var $s=[],S1=l=>{var p=$s.length;return $s.push(l),p},I1=(l,p)=>{for(var y=Array(l),m=0;m<l;++m){var x=m,O=(f(),j)[p+4*m>>>2>>>0],P=ps[O];if(P===void 0)throw l=`parameter ${m}`,O=Yu(O),p=_t(O),xt(O),new Ln(`${l} has unknown type ${p}`);y[x]=P}return y},C1=(l,p,y)=>{var m=[];return l=l(m,y),m.length&&((f(),j)[p>>>2>>>0]=ct(m)),l},A1={},hi=l=>{var p=A1[l];return p===void 0?_t(l):p};function z1(l,p,y){var[m,...x]=I1(l,p>>>0);p=m.ed.bind(m);var O=x.map(X=>X.dd.bind(X));l--;var P={toValue:ot};switch(l=O.map((X,te)=>{var de=`argFromPtr${te}`;return P[de]=X,`${de}(args${te?"+"+8*te:""})`}),y){case 0:var W="toValue(handle)";break;case 2:W="new (toValue(handle))";break;case 3:W="";break;case 1:P.getStringOrSymbol=hi,W="toValue(handle)[getStringOrSymbol(methodName)]"}return W+=`(${l})`,m.Kd||(P.toReturnWire=p,P.emval_returnValue=C1,W=`return emval_returnValue(toReturnWire, destructorsRef, ${W})`),W=`return function (handle, methodName, destructorsRef, args) {
  ${W}
  }`,y=new Function(Object.keys(P),W)(...Object.values(P)),W=`methodCaller<(${x.map(X=>X.name)}) => ${m.name}>`,S1(Object.defineProperty(y,"name",{value:W}))}function O1(l,p){return p>>>=0,(l=ot(l>>>0))==ot(p)}function R1(l){return(l>>>=0)?(l=hi(l),ct(globalThis[l])):ct(globalThis)}function D1(l){return l=hi(l>>>0),ct(t[l])}function N1(l,p){return p>>>=0,l=ot(l>>>0),p=ot(p),ct(l[p])}function M1(l){9<(l>>>=0)&&(cn[l+1]+=1)}function Ou(l,p,y,m,x){return $s[l>>>0](p>>>0,y>>>0,m>>>0,x>>>0)}function P1(l,p,y,m,x){return Ou(l>>>0,p>>>0,y>>>0,m>>>0,x>>>0)}function B1(){return ct([])}function U1(l){l=ot(l>>>0);for(var p=Array(l.length),y=0;y<l.length;y++)p[y]=l[y];return ct(p)}function W1(l){return ct(hi(l>>>0))}function L1(){return ct({})}function V1(l){for(var p=ot(l>>>=0);p.length;){var y=p.pop();p.pop()(y)}cs(l)}function q1(l,p,y){p>>>=0,y>>>=0,l=ot(l>>>0),p=ot(p),y=ot(y),l[p]=y}function F1(l,p){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),p>>>=0,l=new Date(1e3*l),(f(),R)[p>>>2>>>0]=l.getUTCSeconds(),(f(),R)[p+4>>>2>>>0]=l.getUTCMinutes(),(f(),R)[p+8>>>2>>>0]=l.getUTCHours(),(f(),R)[p+12>>>2>>>0]=l.getUTCDate(),(f(),R)[p+16>>>2>>>0]=l.getUTCMonth(),(f(),R)[p+20>>>2>>>0]=l.getUTCFullYear()-1900,(f(),R)[p+24>>>2>>>0]=l.getUTCDay(),l=(l.getTime()-Date.UTC(l.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(f(),R)[p+28>>>2>>>0]=l}var Ru=l=>l%4==0&&(l%100!=0||l%400==0),Du=[0,31,60,91,121,152,182,213,244,274,305,335],Nu=[0,31,59,90,120,151,181,212,243,273,304,334];function G1(l,p){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),p>>>=0,l=new Date(1e3*l),(f(),R)[p>>>2>>>0]=l.getSeconds(),(f(),R)[p+4>>>2>>>0]=l.getMinutes(),(f(),R)[p+8>>>2>>>0]=l.getHours(),(f(),R)[p+12>>>2>>>0]=l.getDate(),(f(),R)[p+16>>>2>>>0]=l.getMonth(),(f(),R)[p+20>>>2>>>0]=l.getFullYear()-1900,(f(),R)[p+24>>>2>>>0]=l.getDay();var y=(Ru(l.getFullYear())?Du:Nu)[l.getMonth()]+l.getDate()-1|0;(f(),R)[p+28>>>2>>>0]=y,(f(),R)[p+36>>>2>>>0]=-60*l.getTimezoneOffset(),y=new Date(l.getFullYear(),6,1).getTimezoneOffset();var m=new Date(l.getFullYear(),0,1).getTimezoneOffset();l=0|(y!=m&&l.getTimezoneOffset()==Math.min(m,y)),(f(),R)[p+32>>>2>>>0]=l}function H1(l){l>>>=0;var p=new Date((f(),R)[l+20>>>2>>>0]+1900,(f(),R)[l+16>>>2>>>0],(f(),R)[l+12>>>2>>>0],(f(),R)[l+8>>>2>>>0],(f(),R)[l+4>>>2>>>0],(f(),R)[l>>>2>>>0],0),y=(f(),R)[l+32>>>2>>>0],m=p.getTimezoneOffset(),x=new Date(p.getFullYear(),6,1).getTimezoneOffset(),O=new Date(p.getFullYear(),0,1).getTimezoneOffset(),P=Math.min(O,x);return 0>y?(f(),R)[l+32>>>2>>>0]=+(x!=O&&P==m):0<y!=(P==m)&&(x=Math.max(O,x),p.setTime(p.getTime()+6e4*((0<y?P:x)-m))),(f(),R)[l+24>>>2>>>0]=p.getDay(),y=(Ru(p.getFullYear())?Du:Nu)[p.getMonth()]+p.getDate()-1|0,(f(),R)[l+28>>>2>>>0]=y,(f(),R)[l>>>2>>>0]=p.getSeconds(),(f(),R)[l+4>>>2>>>0]=p.getMinutes(),(f(),R)[l+8>>>2>>>0]=p.getHours(),(f(),R)[l+12>>>2>>>0]=p.getDate(),(f(),R)[l+16>>>2>>>0]=p.getMonth(),(f(),R)[l+20>>>2>>>0]=p.getYear(),l=p.getTime(),BigInt(isNaN(l)?-1:l/1e3)}function Mu(l,p,y,m,x,O,P){return i?Ie(16,1,l,p,y,m,x,O,P):-52}function Pu(l,p,y,m,x,O){if(i)return Ie(17,1,l,p,y,m,x,O)}var ir={},j1=()=>performance.timeOrigin+performance.now();function Bu(l,p){if(i)return Ie(18,1,l,p);if(ir[l]&&(clearTimeout(ir[l].id),delete ir[l]),!p)return 0;var y=setTimeout(()=>{delete ir[l],di(()=>el(l,performance.timeOrigin+performance.now()))},p);return ir[l]={id:y,me:p},0}function K1(l,p,y,m){l>>>=0,p>>>=0,y>>>=0,m>>>=0;var x=new Date().getFullYear(),O=new Date(x,0,1).getTimezoneOffset();x=new Date(x,6,1).getTimezoneOffset();var P=Math.max(O,x);(f(),j)[l>>>2>>>0]=60*P,(f(),R)[p>>>2>>>0]=+(O!=x),l=(p=W=>{var X=Math.abs(W);return`UTC${0<=W?"-":"+"}${String(Math.floor(X/60)).padStart(2,"0")}${String(X%60).padStart(2,"0")}`})(O),p=p(x),x<O?(Zt(l,y,17),Zt(p,m,17)):(Zt(l,m,17),Zt(p,y,17))}var Y1=()=>Date.now(),Z1=1;function X1(l,p,y){if(y>>>=0,!(0<=l&&3>=l))return 28;if(l===0)l=Date.now();else{if(!Z1)return 52;l=performance.timeOrigin+performance.now()}return l=Math.round(1e6*l),(f(),H)[y>>>3>>>0]=BigInt(l),0}var vs=[],Uu=(l,p)=>{vs.length=0;for(var y;y=(f(),N)[l++>>>0];){var m=y!=105;p+=(m&=y!=112)&&p%8?4:0,vs.push(y==112?(f(),j)[p>>>2>>>0]:y==106?(f(),H)[p>>>3>>>0]:y==105?(f(),R)[p>>>2>>>0]:(f(),oe)[p>>>3>>>0]),p+=m?8:4}return vs};function Q1(l,p,y){return l>>>=0,p=Uu(p>>>0,y>>>0),Is[l](...p)}function J1(l,p,y){return l>>>=0,p=Uu(p>>>0,y>>>0),Is[l](...p)}var ew=()=>{};function tw(l,p){return A(Pe(l>>>0,p>>>0))}var nw=()=>{throw bt+=1,"unwind"};function rw(){return 4294901760}var iw=()=>navigator.hardwareConcurrency,hn={},mi=l=>{var p;return(p=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(l))?+p[1]:(p=/:(\d+):\d+(?:\)|$)/.exec(l))?2147483648|+p[1]:0},Wu=l=>{for(var p of l)(l=mi(p))&&(hn[l]=p)};function sw(){var l=Error().stack.toString().split(`
`);return l[0]=="Error"&&l.shift(),Wu(l),hn.sd=mi(l[3]),hn.Ud=l,hn.sd}function gi(l){if(!(l=hn[l>>>0]))return 0;var p;if(p=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(l))l=p[1];else if(p=/^\s+at (.*) \(.*\)$/.exec(l))l=p[1];else{if(!(p=/^(.+?)@/.exec(l)))return 0;l=p[1]}xt(gi.td??0),p=li(l)+1;var y=sr(p);return y&&Zt(l,y,p),gi.td=y,gi.td}function aw(l){l>>>=0;var p=(f(),N).length;if(l<=p||4294901760<l)return!1;for(var y=1;4>=y;y*=2){var m=p*(1+.2/y);m=Math.min(m,l+100663296);e:{m=(Math.min(4294901760,65536*Math.ceil(Math.max(l,m)/65536))-Yt.buffer.byteLength+65535)/65536|0;try{Yt.grow(m),Y();var x=1;break e}catch{}x=void 0}if(x)return!0}return!1}function ow(l,p,y){if(l>>>=0,p>>>=0,hn.sd==l)var m=hn.Ud;else(m=Error().stack.toString().split(`
`))[0]=="Error"&&m.shift(),Wu(m);for(var x=3;m[x]&&mi(m[x])!=l;)++x;for(l=0;l<y&&m[l+x];++l)(f(),R)[p+4*l>>>2>>>0]=mi(m[l+x]);return l}var bs,_s={},Lu=()=>{if(!bs){var l,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(l in _s)_s[l]===void 0?delete p[l]:p[l]=_s[l];var y=[];for(l in p)y.push(`${l}=${p[l]}`);bs=y}return bs};function Vu(l,p){if(i)return Ie(19,1,l,p);l>>>=0,p>>>=0;var y,m=0,x=0;for(y of Lu()){var O=p+m;(f(),j)[l+x>>>2>>>0]=O,m+=Zt(y,O,1/0)+1,x+=4}return 0}function qu(l,p){if(i)return Ie(20,1,l,p);l>>>=0,p>>>=0;var y=Lu();for(var m of((f(),j)[l>>>2>>>0]=y.length,l=0,y))l+=li(m)+1;return(f(),j)[p>>>2>>>0]=l,0}function Fu(l){return i?Ie(21,1,l):52}function Gu(l,p,y,m,x){return i?Ie(22,1,l,p,y,m,x):52}function Hu(l,p,y,m){return i?Ie(23,1,l,p,y,m):52}function ju(l,p,y,m){return i?Ie(24,1,l,p,y,m):70}var uw=[null,[],[]];function Ku(l,p,y,m){if(i)return Ie(25,1,l,p,y,m);p>>>=0,y>>>=0,m>>>=0;for(var x=0,O=0;O<y;O++){var P=(f(),j)[p>>>2>>>0],W=(f(),j)[p+4>>>2>>>0];p+=8;for(var X=0;X<W;X++){var te=l,de=(f(),N)[P+X>>>0],we=uw[te];de===0||de===10?((te===1?C:A)(fu(we)),we.length=0):we.push(de)}x+=W}return(f(),j)[m>>>2>>>0]=x,0}function lw(l){return l>>>0}i||(function(){for(var l=t.numThreads-1;l--;)iu();jt.push(async()=>{var p=(async function(){if(!i)return Promise.all(Kt.map(ru))})();Ne++,await p,--Ne==0&&Ce&&(p=Ce,Ce=null,p())})})(),i||(Yt=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Y()),t.wasmBinary&&(g=t.wasmBinary),t.stackSave=()=>pe(),t.stackRestore=l=>fe(l),t.stackAlloc=l=>Es(l),t.setValue=function(l,p,y="i8"){switch(y.endsWith("*")&&(y="*"),y){case"i1":case"i8":(f(),z)[l>>>0]=p;break;case"i16":(f(),B)[l>>>1>>>0]=p;break;case"i32":(f(),R)[l>>>2>>>0]=p;break;case"i64":(f(),H)[l>>>3>>>0]=BigInt(p);break;case"float":(f(),q)[l>>>2>>>0]=p;break;case"double":(f(),oe)[l>>>3>>>0]=p;break;case"*":(f(),j)[l>>>2>>>0]=p;break;default:he(`invalid type for setValue: ${y}`)}},t.getValue=function(l,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return(f(),z)[l>>>0];case"i16":return(f(),B)[l>>>1>>>0];case"i32":return(f(),R)[l>>>2>>>0];case"i64":return(f(),H)[l>>>3>>>0];case"float":return(f(),q)[l>>>2>>>0];case"double":return(f(),oe)[l>>>3>>>0];case"*":return(f(),j)[l>>>2>>>0];default:he(`invalid type for getValue: ${p}`)}},t.UTF8ToString=Pe,t.stringToUTF8=Zt,t.lengthBytesUTF8=li;var Yu,Zu,yi,xt,sr,ks,Xu,Qu,Ju,xs,el,tl,ce,ar,nl,fe,Es,pe,rl,Ts,il,sl,al,Ss,ol,ul,ll,dl,fl,pl,cl,hl,ml,gl,yl,wl,$l,vl,bl,_l,kl,xl,El,Tl,Sl,Il,Cl,Al,zl,Ol,Rl,Dl,Nl,Ml,Pl,Bl,Ul,Wl,Ll,Vl,ql,Fl,Gl,Hl,jl,Rt,dw=[os,Jo,ou,pu,cu,hu,mu,gu,yu,wu,$u,vu,bu,_u,ku,xu,Mu,Pu,Bu,Vu,qu,Fu,Gu,Hu,ju,Ku],Is={1124124:(l,p,y,m,x)=>{if(t===void 0||!t.jd)return 1;if((l=Pe(Number(l>>>0))).startsWith("./")&&(l=l.substring(2)),!(l=t.jd.get(l)))return 2;if(p=Number(p>>>0),y=Number(y>>>0),m=Number(m>>>0),p+y>l.byteLength)return 3;try{let O=l.subarray(p,p+y);switch(x){case 0:(f(),N).set(O,m>>>0);break;case 1:t.ae?t.ae(m,O):t.Td(m,O);break;default:return 4}return 0}catch{return 4}},1124948:()=>typeof navigator<"u"&&navigator.de?1:0,1125020:(l,p,y)=>{t.Dd(l,(f(),N).subarray(p>>>0,p+y>>>0))},1125084:()=>t.ce(),1125126:l=>{t.Cd(l)},1125163:()=>{t.Md()},1125194:()=>{t.Nd()},1125223:()=>{t.Rd()},1125248:l=>t.Ld(l),1125281:l=>t.Pd(l),1125313:(l,p,y)=>{t.rd(Number(l),Number(p),Number(y),!0)},1125376:(l,p,y)=>{t.rd(Number(l),Number(p),Number(y))},1125433:()=>typeof wasmOffsetConverter<"u",1125490:l=>{t.ic("Abs",l,void 0)},1125541:l=>{t.ic("Neg",l,void 0)},1125592:l=>{t.ic("Floor",l,void 0)},1125645:l=>{t.ic("Ceil",l,void 0)},1125697:l=>{t.ic("Reciprocal",l,void 0)},1125755:l=>{t.ic("Sqrt",l,void 0)},1125807:l=>{t.ic("Exp",l,void 0)},1125858:l=>{t.ic("Erf",l,void 0)},1125909:l=>{t.ic("Sigmoid",l,void 0)},1125964:(l,p,y)=>{t.ic("HardSigmoid",l,{alpha:p,beta:y})},1126043:l=>{t.ic("HardSwish",l,void 0)},1126100:l=>{t.ic("Log",l,void 0)},1126151:l=>{t.ic("Sin",l,void 0)},1126202:l=>{t.ic("Cos",l,void 0)},1126253:l=>{t.ic("Tan",l,void 0)},1126304:l=>{t.ic("Asin",l,void 0)},1126356:l=>{t.ic("Acos",l,void 0)},1126408:l=>{t.ic("Atan",l,void 0)},1126460:l=>{t.ic("Sinh",l,void 0)},1126512:l=>{t.ic("Cosh",l,void 0)},1126564:l=>{t.ic("Asinh",l,void 0)},1126617:l=>{t.ic("Acosh",l,void 0)},1126670:l=>{t.ic("Atanh",l,void 0)},1126723:l=>{t.ic("Tanh",l,void 0)},1126775:l=>{t.ic("Not",l,void 0)},1126826:(l,p,y)=>{t.ic("Clip",l,{min:p,max:y})},1126895:l=>{t.ic("Clip",l,void 0)},1126947:(l,p)=>{t.ic("Elu",l,{alpha:p})},1127005:l=>{t.ic("Gelu",l,void 0)},1127057:l=>{t.ic("Relu",l,void 0)},1127109:(l,p)=>{t.ic("LeakyRelu",l,{alpha:p})},1127173:(l,p)=>{t.ic("ThresholdedRelu",l,{alpha:p})},1127243:(l,p)=>{t.ic("Cast",l,{to:p})},1127301:l=>{t.ic("Add",l,void 0)},1127352:l=>{t.ic("Sub",l,void 0)},1127403:l=>{t.ic("Mul",l,void 0)},1127454:l=>{t.ic("Div",l,void 0)},1127505:l=>{t.ic("Pow",l,void 0)},1127556:l=>{t.ic("Equal",l,void 0)},1127609:l=>{t.ic("Greater",l,void 0)},1127664:l=>{t.ic("GreaterOrEqual",l,void 0)},1127726:l=>{t.ic("Less",l,void 0)},1127778:l=>{t.ic("LessOrEqual",l,void 0)},1127837:(l,p,y,m,x)=>{t.ic("ReduceMean",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1128012:(l,p,y,m,x)=>{t.ic("ReduceMax",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1128186:(l,p,y,m,x)=>{t.ic("ReduceMin",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1128360:(l,p,y,m,x)=>{t.ic("ReduceProd",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1128535:(l,p,y,m,x)=>{t.ic("ReduceSum",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1128709:(l,p,y,m,x)=>{t.ic("ReduceL1",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1128882:(l,p,y,m,x)=>{t.ic("ReduceL2",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1129055:(l,p,y,m,x)=>{t.ic("ReduceLogSum",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1129232:(l,p,y,m,x)=>{t.ic("ReduceSumSquare",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1129412:(l,p,y,m,x)=>{t.ic("ReduceLogSumExp",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1129592:l=>{t.ic("Where",l,void 0)},1129645:(l,p,y)=>{t.ic("Transpose",l,{perm:p?Array.from((f(),R).subarray(Number(p)>>>0,Number(y)>>>0)):[]})},1129769:(l,p,y,m)=>{t.ic("DepthToSpace",l,{blocksize:p,mode:Pe(y),format:m?"NHWC":"NCHW"})},1129902:(l,p,y,m)=>{t.ic("DepthToSpace",l,{blocksize:p,mode:Pe(y),format:m?"NHWC":"NCHW"})},1130035:(l,p,y,m)=>{t.ic("DFT",l,{axis:p,inverse:y,onesided:m})},1130127:(l,p,y,m,x,O,P,W,X,te,de,we,Se,Ae,Qt)=>{t.ic("ConvTranspose",l,{format:X?"NHWC":"NCHW",autoPad:p,dilations:[y],group:m,kernelShape:[x],pads:[O,P],strides:[W],wIsConst:()=>!!(f(),z)[te>>>0],outputPadding:de?Array.from((f(),R).subarray(Number(de)>>>0,Number(we)>>>0)):[],outputShape:Se?Array.from((f(),R).subarray(Number(Se)>>>0,Number(Ae)>>>0)):[],activation:Pe(Qt)})},1130560:(l,p,y,m,x,O,P,W,X,te,de,we,Se,Ae)=>{t.ic("ConvTranspose",l,{format:W?"NHWC":"NCHW",autoPad:p,dilations:Array.from((f(),R).subarray(Number(y)>>>0,(Number(y)>>>0)+2>>>0)),group:m,kernelShape:Array.from((f(),R).subarray(Number(x)>>>0,(Number(x)>>>0)+2>>>0)),pads:Array.from((f(),R).subarray(Number(O)>>>0,(Number(O)>>>0)+4>>>0)),strides:Array.from((f(),R).subarray(Number(P)>>>0,(Number(P)>>>0)+2>>>0)),wIsConst:()=>!!(f(),z)[X>>>0],outputPadding:te?Array.from((f(),R).subarray(Number(te)>>>0,Number(de)>>>0)):[],outputShape:we?Array.from((f(),R).subarray(Number(we)>>>0,Number(Se)>>>0)):[],activation:Pe(Ae)})},1131221:(l,p,y,m,x,O,P,W,X,te,de,we,Se,Ae,Qt)=>{t.ic("ConvTranspose",l,{format:X?"NHWC":"NCHW",autoPad:p,dilations:[y],group:m,kernelShape:[x],pads:[O,P],strides:[W],wIsConst:()=>!!(f(),z)[te>>>0],outputPadding:de?Array.from((f(),R).subarray(Number(de)>>>0,Number(we)>>>0)):[],outputShape:Se?Array.from((f(),R).subarray(Number(Se)>>>0,Number(Ae)>>>0)):[],activation:Pe(Qt)})},1131654:(l,p,y,m,x,O,P,W,X,te,de,we,Se,Ae)=>{t.ic("ConvTranspose",l,{format:W?"NHWC":"NCHW",autoPad:p,dilations:Array.from((f(),R).subarray(Number(y)>>>0,(Number(y)>>>0)+2>>>0)),group:m,kernelShape:Array.from((f(),R).subarray(Number(x)>>>0,(Number(x)>>>0)+2>>>0)),pads:Array.from((f(),R).subarray(Number(O)>>>0,(Number(O)>>>0)+4>>>0)),strides:Array.from((f(),R).subarray(Number(P)>>>0,(Number(P)>>>0)+2>>>0)),wIsConst:()=>!!(f(),z)[X>>>0],outputPadding:te?Array.from((f(),R).subarray(Number(te)>>>0,Number(de)>>>0)):[],outputShape:we?Array.from((f(),R).subarray(Number(we)>>>0,Number(Se)>>>0)):[],activation:Pe(Ae)})},1132315:(l,p)=>{t.ic("GlobalAveragePool",l,{format:p?"NHWC":"NCHW"})},1132406:(l,p,y,m,x,O,P,W,X,te,de,we,Se,Ae)=>{t.ic("AveragePool",l,{format:Ae?"NHWC":"NCHW",auto_pad:p,ceil_mode:y,count_include_pad:m,storage_order:x,dilations:O?Array.from((f(),R).subarray(Number(O)>>>0,Number(P)>>>0)):[],kernel_shape:W?Array.from((f(),R).subarray(Number(W)>>>0,Number(X)>>>0)):[],pads:te?Array.from((f(),R).subarray(Number(te)>>>0,Number(de)>>>0)):[],strides:we?Array.from((f(),R).subarray(Number(we)>>>0,Number(Se)>>>0)):[]})},1132885:(l,p)=>{t.ic("GlobalAveragePool",l,{format:p?"NHWC":"NCHW"})},1132976:(l,p,y,m,x,O,P,W,X,te,de,we,Se,Ae)=>{t.ic("AveragePool",l,{format:Ae?"NHWC":"NCHW",auto_pad:p,ceil_mode:y,count_include_pad:m,storage_order:x,dilations:O?Array.from((f(),R).subarray(Number(O)>>>0,Number(P)>>>0)):[],kernel_shape:W?Array.from((f(),R).subarray(Number(W)>>>0,Number(X)>>>0)):[],pads:te?Array.from((f(),R).subarray(Number(te)>>>0,Number(de)>>>0)):[],strides:we?Array.from((f(),R).subarray(Number(we)>>>0,Number(Se)>>>0)):[]})},1133455:(l,p)=>{t.ic("GlobalMaxPool",l,{format:p?"NHWC":"NCHW"})},1133542:(l,p,y,m,x,O,P,W,X,te,de,we,Se,Ae)=>{t.ic("MaxPool",l,{format:Ae?"NHWC":"NCHW",auto_pad:p,ceil_mode:y,count_include_pad:m,storage_order:x,dilations:O?Array.from((f(),R).subarray(Number(O)>>>0,Number(P)>>>0)):[],kernel_shape:W?Array.from((f(),R).subarray(Number(W)>>>0,Number(X)>>>0)):[],pads:te?Array.from((f(),R).subarray(Number(te)>>>0,Number(de)>>>0)):[],strides:we?Array.from((f(),R).subarray(Number(we)>>>0,Number(Se)>>>0)):[]})},1134017:(l,p)=>{t.ic("GlobalMaxPool",l,{format:p?"NHWC":"NCHW"})},1134104:(l,p,y,m,x,O,P,W,X,te,de,we,Se,Ae)=>{t.ic("MaxPool",l,{format:Ae?"NHWC":"NCHW",auto_pad:p,ceil_mode:y,count_include_pad:m,storage_order:x,dilations:O?Array.from((f(),R).subarray(Number(O)>>>0,Number(P)>>>0)):[],kernel_shape:W?Array.from((f(),R).subarray(Number(W)>>>0,Number(X)>>>0)):[],pads:te?Array.from((f(),R).subarray(Number(te)>>>0,Number(de)>>>0)):[],strides:we?Array.from((f(),R).subarray(Number(we)>>>0,Number(Se)>>>0)):[]})},1134579:(l,p,y,m,x)=>{t.ic("Gemm",l,{alpha:p,beta:y,transA:m,transB:x})},1134683:l=>{t.ic("MatMul",l,void 0)},1134737:(l,p,y,m)=>{t.ic("ArgMax",l,{keepDims:!!p,selectLastIndex:!!y,axis:m})},1134845:(l,p,y,m)=>{t.ic("ArgMin",l,{keepDims:!!p,selectLastIndex:!!y,axis:m})},1134953:(l,p)=>{t.ic("Softmax",l,{axis:p})},1135016:(l,p)=>{t.ic("Concat",l,{axis:p})},1135076:(l,p,y,m,x)=>{t.ic("Split",l,{axis:p,numOutputs:y,splitSizes:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1135232:l=>{t.ic("Expand",l,void 0)},1135286:(l,p)=>{t.ic("Gather",l,{axis:Number(p)})},1135357:(l,p)=>{t.ic("GatherElements",l,{axis:Number(p)})},1135436:(l,p)=>{t.ic("GatherND",l,{batch_dims:Number(p)})},1135515:(l,p,y,m,x,O,P,W,X,te,de)=>{t.ic("Resize",l,{antialias:p,axes:y?Array.from((f(),R).subarray(Number(y)>>>0,Number(m)>>>0)):[],coordinateTransformMode:Pe(x),cubicCoeffA:O,excludeOutside:P,extrapolationValue:W,keepAspectRatioPolicy:Pe(X),mode:Pe(te),nearestMode:Pe(de)})},1135877:(l,p,y,m,x,O,P)=>{t.ic("Slice",l,{starts:p?Array.from((f(),R).subarray(Number(p)>>>0,Number(y)>>>0)):[],ends:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[],axes:O?Array.from((f(),R).subarray(Number(O)>>>0,Number(P)>>>0)):[]})},1136141:l=>{t.ic("Tile",l,void 0)},1136193:(l,p,y)=>{t.ic("InstanceNormalization",l,{epsilon:p,format:y?"NHWC":"NCHW"})},1136307:(l,p,y)=>{t.ic("InstanceNormalization",l,{epsilon:p,format:y?"NHWC":"NCHW"})},1136421:l=>{t.ic("Range",l,void 0)},1136474:(l,p)=>{t.ic("Einsum",l,{equation:Pe(p)})},1136555:(l,p,y,m,x)=>{t.ic("Pad",l,{mode:p,value:y,pads:m?Array.from((f(),R).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1136698:(l,p,y,m,x,O)=>{t.ic("BatchNormalization",l,{epsilon:p,momentum:y,spatial:!!x,trainingMode:!!m,format:O?"NHWC":"NCHW"})},1136867:(l,p,y,m,x,O)=>{t.ic("BatchNormalization",l,{epsilon:p,momentum:y,spatial:!!x,trainingMode:!!m,format:O?"NHWC":"NCHW"})},1137036:(l,p,y)=>{t.ic("CumSum",l,{exclusive:Number(p),reverse:Number(y)})},1137133:(l,p,y)=>{t.ic("DequantizeLinear",l,{axis:p,blockSize:y})},1137223:(l,p,y,m,x)=>{t.ic("GridSample",l,{align_corners:p,mode:Pe(y),padding_mode:Pe(m),format:x?"NHWC":"NCHW"})},1137393:(l,p,y,m,x)=>{t.ic("GridSample",l,{align_corners:p,mode:Pe(y),padding_mode:Pe(m),format:x?"NHWC":"NCHW"})},1137563:(l,p)=>{t.ic("ScatterND",l,{reduction:Pe(p)})},1137648:(l,p,y,m,x,O,P,W,X)=>{t.ic("Attention",l,{numHeads:p,isUnidirectional:y,maskFilterValue:m,scale:x,doRotary:O,qkvHiddenSizes:P?Array.from((f(),R).subarray(Number(W)>>>0,Number(W)+P>>>0)):[],pastPresentShareBuffer:!!X})},1137920:l=>{t.ic("BiasAdd",l,void 0)},1137975:l=>{t.ic("BiasSplitGelu",l,void 0)},1138036:l=>{t.ic("FastGelu",l,void 0)},1138092:(l,p,y,m,x,O,P,W,X,te,de,we,Se,Ae,Qt,Cs)=>{t.ic("Conv",l,{format:we?"NHWC":"NCHW",auto_pad:p,dilations:y?Array.from((f(),R).subarray(Number(y)>>>0,Number(m)>>>0)):[],group:x,kernel_shape:O?Array.from((f(),R).subarray(Number(O)>>>0,Number(P)>>>0)):[],pads:W?Array.from((f(),R).subarray(Number(W)>>>0,Number(X)>>>0)):[],strides:te?Array.from((f(),R).subarray(Number(te)>>>0,Number(de)>>>0)):[],w_is_const:()=>!!(f(),z)[Number(Se)>>>0],activation:Pe(Ae),activation_params:Qt?Array.from((f(),q).subarray(Number(Qt)>>>0,Number(Cs)>>>0)):[]})},1138676:l=>{t.ic("Gelu",l,void 0)},1138728:(l,p,y,m,x,O,P,W,X)=>{t.ic("GroupQueryAttention",l,{numHeads:p,kvNumHeads:y,scale:m,softcap:x,doRotary:O,rotaryInterleaved:P,smoothSoftmax:W,localWindowSize:X})},1138945:(l,p,y,m)=>{t.ic("LayerNormalization",l,{axis:p,epsilon:y,simplified:!!m})},1139056:(l,p,y,m)=>{t.ic("LayerNormalization",l,{axis:p,epsilon:y,simplified:!!m})},1139167:(l,p,y,m,x,O)=>{t.ic("MatMulNBits",l,{k:p,n:y,accuracyLevel:m,bits:x,blockSize:O})},1139294:(l,p,y,m,x,O)=>{t.ic("MultiHeadAttention",l,{numHeads:p,isUnidirectional:y,maskFilterValue:m,scale:x,doRotary:O})},1139453:(l,p)=>{t.ic("QuickGelu",l,{alpha:p})},1139517:(l,p,y,m,x)=>{t.ic("RotaryEmbedding",l,{interleaved:!!p,numHeads:y,rotaryEmbeddingDim:m,scale:x})},1139656:(l,p,y)=>{t.ic("SkipLayerNormalization",l,{epsilon:p,simplified:!!y})},1139758:(l,p,y)=>{t.ic("SkipLayerNormalization",l,{epsilon:p,simplified:!!y})},1139860:(l,p,y,m)=>{t.ic("GatherBlockQuantized",l,{gatherAxis:p,quantizeAxis:y,blockSize:m})},1139981:l=>{t.Qd(l)},1140015:(l,p)=>t.Sd(Number(l),Number(p),t.hd.Vd,t.hd.errors)};function fw(l,p,y){return zu(async()=>{await t.Od(Number(l),Number(p),Number(y))})}function pw(){return typeof wasmOffsetConverter<"u"}function cw(l,p,y,m){var x=pe();try{return ml(l,p,y,m)}catch(O){if(fe(x),O!==O+0)throw O;ce(1,0)}}function hw(l,p,y){var m=pe();try{return cl(l,p,y)}catch(x){if(fe(m),x!==x+0)throw x;ce(1,0)}}function mw(l){var p=pe();try{fl(l)}catch(y){if(fe(p),y!==y+0)throw y;ce(1,0)}}function gw(l,p){var y=pe();try{return Ss(l,p)}catch(m){if(fe(y),m!==m+0)throw m;ce(1,0)}}function yw(l,p,y){var m=pe();try{al(l,p,y)}catch(x){if(fe(m),x!==x+0)throw x;ce(1,0)}}function ww(l,p,y,m){var x=pe();try{return vl(l,p,y,m)}catch(O){if(fe(x),O!==O+0)throw O;ce(1,0)}}function $w(l,p){var y=pe();try{gl(l,p)}catch(m){if(fe(y),m!==m+0)throw m;ce(1,0)}}function vw(l,p,y,m,x,O,P){var W=pe();try{return hl(l,p,y,m,x,O,P)}catch(X){if(fe(W),X!==X+0)throw X;ce(1,0)}}function bw(l,p,y,m,x,O){var P=pe();try{ol(l,p,y,m,x,O)}catch(W){if(fe(P),W!==W+0)throw W;ce(1,0)}}function _w(l,p,y,m){var x=pe();try{ll(l,p,y,m)}catch(O){if(fe(x),O!==O+0)throw O;ce(1,0)}}function kw(l,p,y,m,x){var O=pe();try{pl(l,p,y,m,x)}catch(P){if(fe(O),P!==P+0)throw P;ce(1,0)}}function xw(l,p,y,m,x,O,P){var W=pe();try{wl(l,p,y,m,x,O,P)}catch(X){if(fe(W),X!==X+0)throw X;ce(1,0)}}function Ew(l,p,y,m,x,O,P){var W=pe();try{$l(l,p,y,m,x,O,P)}catch(X){if(fe(W),X!==X+0)throw X;ce(1,0)}}function Tw(l,p,y,m,x,O,P,W){var X=pe();try{xl(l,p,y,m,x,O,P,W)}catch(te){if(fe(X),te!==te+0)throw te;ce(1,0)}}function Sw(l,p,y,m,x){var O=pe();try{return yl(l,p,y,m,x)}catch(P){if(fe(O),P!==P+0)throw P;ce(1,0)}}function Iw(l,p,y){var m=pe();try{return dl(l,p,y)}catch(x){if(fe(m),x!==x+0)throw x;ce(1,0)}}function Cw(l,p,y,m,x,O,P,W){var X=pe();try{El(l,p,y,m,x,O,P,W)}catch(te){if(fe(X),te!==te+0)throw te;ce(1,0)}}function Aw(l,p,y,m,x,O,P,W,X,te,de,we){var Se=pe();try{bl(l,p,y,m,x,O,P,W,X,te,de,we)}catch(Ae){if(fe(Se),Ae!==Ae+0)throw Ae;ce(1,0)}}function zw(l,p,y){var m=pe();try{return Tl(l,p,y)}catch(x){if(fe(m),x!==x+0)throw x;return ce(1,0),0n}}function Ow(l,p,y,m,x,O,P,W,X){var te=pe();try{ul(l,p,y,m,x,O,P,W,X)}catch(de){if(fe(te),de!==de+0)throw de;ce(1,0)}}function Rw(l){var p=pe();try{return Sl(l)}catch(y){if(fe(p),y!==y+0)throw y;ce(1,0)}}function Dw(l,p){var y=pe();try{return Vl(l,p)}catch(m){if(fe(y),m!==m+0)throw m;return ce(1,0),0n}}function Nw(l,p,y,m){var x=pe();try{return Il(l,p,y,m)}catch(O){if(fe(x),O!==O+0)throw O;ce(1,0)}}function Mw(l,p,y,m,x,O,P){var W=pe();try{ql(l,p,y,m,x,O,P)}catch(X){if(fe(W),X!==X+0)throw X;ce(1,0)}}function Pw(l){var p=pe();try{return Cl(l)}catch(y){if(fe(p),y!==y+0)throw y;return ce(1,0),0n}}function Bw(l,p,y,m,x){var O=pe();try{return Nl(l,p,y,m,x)}catch(P){if(fe(O),P!==P+0)throw P;ce(1,0)}}function Uw(l,p,y,m,x,O){var P=pe();try{return Ml(l,p,y,m,x,O)}catch(W){if(fe(P),W!==W+0)throw W;ce(1,0)}}function Ww(l,p,y,m,x,O){var P=pe();try{return _l(l,p,y,m,x,O)}catch(W){if(fe(P),W!==W+0)throw W;ce(1,0)}}function Lw(l,p,y,m,x,O){var P=pe();try{return Pl(l,p,y,m,x,O)}catch(W){if(fe(P),W!==W+0)throw W;ce(1,0)}}function Vw(l,p,y,m,x,O,P,W){var X=pe();try{return kl(l,p,y,m,x,O,P,W)}catch(te){if(fe(X),te!==te+0)throw te;ce(1,0)}}function qw(l,p,y,m,x){var O=pe();try{return Bl(l,p,y,m,x)}catch(P){if(fe(O),P!==P+0)throw P;return ce(1,0),0n}}function Fw(l,p,y,m){var x=pe();try{return Ul(l,p,y,m)}catch(O){if(fe(x),O!==O+0)throw O;ce(1,0)}}function Gw(l,p,y,m){var x=pe();try{return Wl(l,p,y,m)}catch(O){if(fe(x),O!==O+0)throw O;ce(1,0)}}function Hw(l,p,y,m,x,O,P,W,X,te,de,we){var Se=pe();try{return Ll(l,p,y,m,x,O,P,W,X,te,de,we)}catch(Ae){if(fe(Se),Ae!==Ae+0)throw Ae;ce(1,0)}}function jw(l,p,y,m,x,O,P,W,X,te,de){var we=pe();try{Rl(l,p,y,m,x,O,P,W,X,te,de)}catch(Se){if(fe(we),Se!==Se+0)throw Se;ce(1,0)}}function Kw(l,p,y,m,x,O,P,W,X,te,de,we,Se,Ae,Qt,Cs){var Qw=pe();try{Dl(l,p,y,m,x,O,P,W,X,te,de,we,Se,Ae,Qt,Cs)}catch(As){if(fe(Qw),As!==As+0)throw As;ce(1,0)}}function Yw(l,p,y){var m=pe();try{return Al(l,p,y)}catch(x){if(fe(m),x!==x+0)throw x;ce(1,0)}}function Zw(l,p,y){var m=pe();try{return zl(l,p,y)}catch(x){if(fe(m),x!==x+0)throw x;ce(1,0)}}function Xw(l,p,y,m){var x=pe();try{Ol(l,p,y,m)}catch(O){if(fe(x),O!==O+0)throw O;ce(1,0)}}function wi(){if(0<Ne)Ce=wi;else if(i)T?.(t),G();else{for(var l=jt;0<l.length;)l.shift()(t);0<Ne?Ce=wi:(t.calledRun=!0,D||(G(),T?.(t)))}}return i||(Rt=await be(),wi()),t.PTR_SIZE=4,M?t:new Promise((l,p)=>{T=l,S=p})}var ym,ff,Rv=K(()=>{"use strict";ym=df,ff=globalThis.self?.name?.startsWith("em-pthread"),ff&&df()}),ua,io,pf,tt,wm,Mi,cf,hf,la,mf,da,$m,fa,vm,To=K(()=>{"use strict";Eo(),ua=typeof location>"u"?void 0:location.origin,io=import.meta.url>"file:"&&import.meta.url<"file;",pf=()=>{if(io){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,ua).href}return import.meta.url},tt=pf(),wm=()=>{if(tt&&!tt.startsWith("blob:"))return tt.substring(0,tt.lastIndexOf("/")+1)},Mi=(e,t)=>{try{let n=t??tt;return(n?new URL(e,n):new URL(e)).origin===ua}catch{return!1}},cf=(e,t)=>{let n=t??tt;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},hf=(e,t)=>`${t??"./"}${e}`,la=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},mf=async e=>(await import(e)).default,da=(Ov(),ii(hm)).default,$m=async()=>{if(!tt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Mi(tt))return[void 0,da()];let e=await la(tt);return[e,da(e)]},fa=(Rv(),ii(gm)).default,vm=async(e,t,n,r)=>{let i=fa&&!(e||t);if(i)if(tt)i=Mi(tt)||r&&!n;else if(r&&!n)i=!0;else throw new Error("cannot determine the script source URL.");if(i)return[void 0,fa];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??cf(a,t),o=n&&s&&!Mi(s,t),u=o?await la(s):s??hf(a,t);return[o?u:void 0,await mf(u)]}}}),pa,Pi,qr,ca,gf,yf,wf,So,xe,Bn=K(()=>{"use strict";To(),Pi=!1,qr=!1,ca=!1,gf=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},yf=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},wf=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},So=async e=>{if(Pi)return Promise.resolve();if(qr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(ca)throw new Error("previous call to 'initializeWebAssembly()' failed.");qr=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!wf())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!yf())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let r=gf();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let i=e.wasmPaths,a=typeof i=="string"?i:void 0,s=i?.mjs,o=s?.href??s,u=i?.wasm,d=u?.href??u,c=e.wasmBinary,[h,g]=await vm(o,a,n>1,!!c||!!d),v=!1,b=[];if(t>0&&b.push(new Promise(T=>{setTimeout(()=>{v=!0,T()},t)})),b.push(new Promise((T,S)=>{let k={numThreads:n};if(c)k.wasmBinary=c,k.locateFile=_=>_;else if(d||a)k.locateFile=_=>d??a+_;else if(o&&o.indexOf("blob:")!==0)k.locateFile=_=>new URL(_,o).href;else if(h){let _=wm();_&&(k.locateFile=I=>_+I)}g(k).then(_=>{qr=!1,Pi=!0,pa=_,T(),h&&URL.revokeObjectURL(h)},_=>{qr=!1,ca=!0,S(_)})})),await Promise.race(b),v)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},xe=()=>{if(Pi&&pa)return pa;throw new Error("WebAssembly is not initialized yet.")}}),vt,Qi,ve,Io=K(()=>{"use strict";Bn(),vt=(e,t)=>{let n=xe(),r=n.lengthBytesUTF8(e)+1,i=n._malloc(r);return n.stringToUTF8(e,i,r),t.push(i),i},Qi=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([i,a])=>{let s=t?t+i:i;if(typeof a=="object")Qi(a,s+".",n,r);else if(typeof a=="string"||typeof a=="number")r(s,a.toString());else if(typeof a=="boolean")r(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},ve=e=>{let t=xe(),n=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetLastError(i,i+r);let a=Number(t.getValue(i,r===4?"i32":"i64")),s=t.getValue(i+r,"*"),o=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(n)}}}),bm,Dv=K(()=>{"use strict";Bn(),Io(),bm=(e,t)=>{let n=xe(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let s=0;e?.tag!==void 0&&(s=vt(e.tag,i)),r=n._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,s),r===0&&ve("Can't create run options."),e?.extra!==void 0&&Qi(e.extra,"",new WeakSet,(o,u)=>{let d=vt(o,i),c=vt(u,i);n._OrtAddRunConfigEntry(r,d,c)!==0&&ve(`Can't set a run config entry: ${o} - ${u}.`)});for(let o of t)n._OrtRunOptionsAddActiveLoraAdapter(r,o)!==0&&ve("Can't add an active LoRA adapter.");return[r,i]}catch(s){throw r!==0&&n._OrtReleaseRunOptions(r),i.forEach(o=>n._free(o)),s}}}),$f,vf,bf,xn,_f,_m,Nv=K(()=>{"use strict";Bn(),Io(),$f=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},vf=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},bf=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},xn=(e,t,n,r)=>{let i=vt(t,r),a=vt(n,r);xe()._OrtAddSessionConfigEntry(e,i,a)!==0&&ve(`Can't set a session config entry: ${t} - ${n}.`)},_f=async(e,t,n)=>{let r=t.executionProviders;for(let i of r){let a=typeof i=="string"?i:i.name,s=[],o;switch(a){case"webnn":if(a="WEBNN",xn(e,"session.disable_quant_qdq","1",n),xn(e,"session.disable_qdq_constant_folding","1",n),typeof i!="string"){let g=i?.deviceType;g&&xn(e,"deviceType",g,n)}break;case"webgpu":if(a="JS",typeof i!="string"){let g=i;if(g?.preferredLayout){if(g.preferredLayout!=="NCHW"&&g.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${g.preferredLayout}`);xn(e,"preferredLayout",g.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let u=s.length,d=0,c=0;if(u>0){d=xe()._malloc(u*xe().PTR_SIZE),n.push(d),c=xe()._malloc(u*xe().PTR_SIZE),n.push(c);for(let g=0;g<u;g++)xe().setValue(d+g*xe().PTR_SIZE,s[g][0],"*"),xe().setValue(c+g*xe().PTR_SIZE,s[g][1],"*")}let h;if(o!==void 0){let g=xe()._malloc(xe().PTR_SIZE);n.push(g),xe().setValue(g,o[0],"*"),h=await xe()._OrtAppendExecutionProviderV2(e,g,1,d,c,u)}else{let g=vt(a,n);h=await xe()._OrtAppendExecutionProvider(e,g,d,c,u)}h!==0&&ve(`Can't append execution provider: ${a}.`)}},_m=async e=>{let t=xe(),n=0,r=[],i=e||{};bf(i);try{let a=$f(i.graphOptimizationLevel??"all"),s=vf(i.executionMode??"sequential"),o=typeof i.logId=="string"?vt(i.logId,r):0,u=i.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log severity level is not valid: ${u}`);let d=i.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let c=typeof i.optimizedModelFilePath=="string"?vt(i.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(a,!!i.enableCpuMemArena,!!i.enableMemPattern,s,!!i.enableProfiling,0,o,u,d,c),n===0&&ve("Can't create session options."),i.executionProviders&&await _f(n,i,r),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);xn(n,"enableGraphCapture",i.enableGraphCapture.toString(),r)}if(i.freeDimensionOverrides)for(let[h,g]of Object.entries(i.freeDimensionOverrides)){if(typeof h!="string")throw new Error(`free dimension override name must be a string: ${h}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let v=vt(h,r);t._OrtAddFreeDimensionOverride(n,v,g)!==0&&ve(`Can't set a free dimension override: ${h} - ${g}.`)}return i.extra!==void 0&&Qi(i.extra,"",new WeakSet,(h,g)=>{xn(n,h,g,r)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&ve("Can't release session options."),r.forEach(s=>t._free(s)),a}}}),zn,Gt,On,ss,Ji,Co,Ao,so,ae=K(()=>{"use strict";zn=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Gt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},On=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((i,a)=>i*a,1);return n>0?Math.ceil(r*n):void 0},ss=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Ji=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Co=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ao=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",so=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),as,zo=K(()=>{"use strict";Eo(),as=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let i=t.body.getReader(),a;try{a=new ArrayBuffer(r)}catch(o){if(o instanceof RangeError){let u=Math.ceil(r/65536);a=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw o}let s=0;for(;;){let{done:o,value:u}=await i.read();if(o)break;let d=u.byteLength;new Uint8Array(a,s,d).set(u),s+=d}return new Uint8Array(a,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),kf,xf,Ef,Tf,Oo,Sf,ye,Ht=K(()=>{"use strict";ae(),kf=["V","I","W","E","F"],xf=(e,t)=>{console.log(`[${kf[e]},${new Date().toISOString()}]${t}`)},Oo=(e,t)=>{Ef=e,Tf=t},Sf=(e,t)=>{let n=Ji(e),r=Ji(Ef);n>=r&&xf(n,typeof t=="function"?t():t)},ye=(...e)=>{Tf&&Sf(...e)}}),If,Jn,U,es,km,xm,Em,ue=K(()=>{"use strict";If=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Jn=class{static calcShape(e,t,n=!1){let r=e.length,i=t.length;if(r===0)return t;if(i===0)return e;let a=Math.max(e.length,t.length),s=new Array(a);if(n){if(r<2||i<2)return;let o=If.calcMatMulShape([e[r-2],e[r-1]],[t[i-2],t[i-1]]);if(o===void 0)return;[s[a-2],s[a-1]]=o}for(let o=n?3:1;o<=a;o++){let u=r-o<0?1:e[r-o],d=i-o<0?1:t[i-o];if(u!==d&&u>1&&d>1)return;let c=Math.max(u,d);if(u&&d)s[a-o]=Math.max(u,d);else{if(c>1)return;s[a-o]=0}}return s}static isValidBroadcast(e,t){let n=e.length,r=t.length;if(n>r)return!1;for(let i=1;i<=n;i++)if(e[n-i]!==1&&e[n-i]!==t[r-i])return!1;return!0}},U=class Yi{static size(t){return Yi.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let i=new Array(r),a=r-1;for(;a>=0;){if(t[a]%n===0){i[a]=t[a]/n;break}if(n%t[a]!==0)throw new Error("cannot convert shape");i[a]=1,n/=t[a],a--}for(a--;a>=0;a--)i[a]=t[a];return i}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Yi.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Yi.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let i=1;for(let a=n;a<r;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(t[a])}return i}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let i=n-3;i>=0;--i)r[i]=r[i+1]*t[i+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((i,a)=>i+n[a]+n[a+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,i)=>r===n[i])}},es=class ln{static adjustPoolAttributes(t,n,r,i,a,s){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<n.length-2;o++)o>=r.length?r.push(n[o+2]):r[o]=n[o+2];for(let o=0;o<r.length;o++)if(o<i.length){if(i[o]<0)throw new Error("strides should be greater than or equal to 1")}else i.push(1);for(let o=0;o<r.length;o++)if(o<a.length){if(a[o]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let o=0;o<r.length*2;o++)if(o<s.length){if(s[o]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let o=0;o<r.length;o++){if(r[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[o]>=r[o]||s[o+r.length]>=r[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,i,a,s,o){if(o){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)ln.adjustPadAndReturnShape(t[u+(s?1:2)],n[u],r[u],i[u],a,u,u+t.length-2,o)}}static computePoolOutputShape(t,n,r,i,a,s,o,u=0){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let d=[n[0],n[1]];return ln.computeShapeHelper(t,n,d,r,i,a,s,o,u),d}static computeConvOutputShape(t,n,r,i,a,s,o){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],n[0]];return ln.computeShapeHelper(!1,t,u,r,i,a,s,o),u}static computeShapeHelper(t,n,r,i,a,s,o,u,d=0){if(t)for(let c=0;c<n.length-2;c++)r.push(1);else for(let c=0;c<n.length-2;c++)r.push(ln.adjustPadAndReturnShape(n[c+2],i[c],a[c],s[c],o,c,c+n.length-2,u,d))}static computeOutputSize(t,n,r,i,a){let s=Math.floor(t/n)+1;return a===1&&(s=Math.ceil(t/n)+1,(s-1)*n>=r+i&&(s-=1)),s}static adjustPadAndReturnShape(t,n,r,i,a,s,o,u,d=0){let c=r*(i-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return a[s]=0,a[o]=0,ln.computeOutputSize(t-c,n,t,0,d);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=(Math.floor((t+n-1)/n)-1)*n+i-t;return a[s]=Math.floor(u==="SAME_LOWER"?(h+1)/2:h/2),a[o]=h-a[s],ln.computeOutputSize(t+a[s]+a[o]-c,n,t,a[s],d)}default:throw new Error("Unsupported AutoPad type")}else return ln.computeOutputSize(t+a[s]+a[o]-c,n,t,a[s],d)}},km=class{static getShapeOfGemmResult(e,t,n,r,i){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,s,o;t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let u=-1;if(r?(o=n[0],u=1):(o=n[1],u=0),n[u]!==s)throw new Error("dimension mismatch");if(a<=0||o<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Jn.isValidBroadcast(i,[a,o]))throw new Error("gemm: invalid bias shape for broadcast");return[a,o,s]}},xm=-34028234663852886e22,Em=34028234663852886e22}),Ro,Tm=K(()=>{"use strict";ae(),Ro=(e,t)=>new(ss(t))(e)}),ha,Cf,ma,Af,ga,zf,ya,wa,$a,Of,Sm,Mv=K(()=>{"use strict";ae(),Ht(),ha=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Cf=(e,t)=>{if(t==="int32")return e;let n=ha.get(t);if(!n)throw new Error(`WebNN backend does not support data type: ${t}`);let r=n/8;if(e.byteLength%r!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let i=e.byteLength/r,a=new(ss(t))(e.buffer,e.byteOffset,i);switch(t){case"int64":case"uint64":{let s=new Int32Array(i);for(let o=0;o<i;o++){let u=a[o];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[o]=Number(u)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},ma=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":{let i=BigInt64Array.from(r,BigInt);return new Uint8Array(i.buffer)}case"uint64":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let i=BigUint64Array.from(r,BigInt);return new Uint8Array(i.buffer)}case"int8":{if(r.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let i=Int8Array.from(r,Number);return new Uint8Array(i.buffer)}case"uint8":{if(r.some(i=>i<0||i>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number)}case"uint32":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let i=Uint32Array.from(r,Number);return new Uint8Array(i.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Af=1,ga=()=>Af++,zf=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),ya=(e,t)=>{let n=ha.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((r,i)=>r*i)*n/8):0},wa=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:r,dataType:i,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=r,this.dataType=i,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return ya(this.dataType,this.tensorShape)}destroy(){ye("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=ma(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}else return new Uint8Array(n).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((r,i)=>r===n[i])}setIsDataConverted(e){this.isDataConverted=e}},$a=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,r){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!a?.input.dataTypes.includes(t)){if(s=zf.get(t),!s||!a?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);ye("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,n))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==ya(t,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,o,!0,!0,s),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Cf(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ye("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?ma(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Of=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=ga();return this.tensorTrackersById.set(e,new $a(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,r,i){ye("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,n,r,i)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");n.upload(t)}async download(e,t){ye("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,r){let i=this.getMLContext(e),a=ga(),s=new wa({sessionId:e,context:i,tensor:t,dataType:n,shape:r});return this.tensorTrackersById.set(a,new $a(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,n,r,i,a,s){let o=this.getMLContext(e);for(let[d,c]of this.freeTensors.entries())if(c.canReuseTensor(o,t,n)){ye("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${n}`);let h=this.freeTensors.splice(d,1)[0];return h.sessionId=e,h}ye("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${n}}`);let u=await o.createTensor({dataType:s??t,shape:n,dimensions:n,usage:r,writable:i,readable:a});return new wa({sessionId:e,context:o,tensor:u,dataType:t,shape:n,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Sm=(...e)=>new Of(...e)}),Fr,Rf,Im,Pv=K(()=>{"use strict";ae(),Bn(),Tm(),Mv(),Ht(),Fr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Rf=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((i,a)=>i===r[a]&&e[i]===t[i])},Im=class{constructor(e){this.tensorManager=Sm(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Oo(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ye("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ye("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let n of t)ye("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let n=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}else if(e===void 0){let n=this.mlContextCache.findIndex(r=>r.options===void 0&&r.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:r}),r}}let t=this.mlContextCache.findIndex(n=>Rf(n.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:n}),n}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let r=this.mlContextCache.findIndex(i=>i.mlContext===t);r!==-1&&this.mlContextCache.splice(r,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ye("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,r,i){let a=Fr.get(n);if(!a)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,r,i)}async createTemporaryTensor(e,t,n){ye("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let r=Fr.get(t);if(!r)throw new Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,r,n,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!xe().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ye("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return Ro(n,t)}}registerMLTensor(e,t,n,r){let i=Fr.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(e,t,i,r);return ye("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${r}} -> {tensorId: ${a}}`),a}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let r=Fr.get(zn(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof r>"u"?!1:n?!!i?.input.dataTypes.includes(r):!!i?.output.dataTypes.includes(r)}flush(){}}}),Do=K(()=>{"use strict"}),va,Bi,Ui,Df,Nf,ba,ao,Mf,Cm,Bv=K(()=>{"use strict";Ht(),Do(),va=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Bi=[],Ui=e=>Math.ceil(Number(e)/16)*16,Df=e=>{for(let t=0;t<Bi.length;t++){let n=Bi[t];if(e<=n)return n}return Math.ceil(e/16)*16},Nf=1,ba=()=>Nf++,ao=async(e,t,n,r)=>{let i=Ui(n),a=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,i),e.flush(),await a.mapAsync(GPUMapMode.READ);let o=a.getMappedRange();if(r){let u=r();return u.set(new Uint8Array(o,0,n)),u}else return new Uint8Array(o.slice(0,n))}finally{a.destroy()}},Mf=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of va)Bi.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,r=t.byteOffset,i=t.byteLength,a=Ui(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);if(a===i&&r%4===0)this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,n,r,i);else{let o=new Uint8Array(a);o.set(t),this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,o,0,a)}ye("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw new Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==r.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Ui(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,r.gpuData.buffer,0,i)}registerExternalBuffer(e,t,n){let r;if(n){if(r=n[0],e===n[1])return ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=ba();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ye("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Df(e),r,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let o=(i?this.freeBuffers:this.freeUniformBuffers).get(n);o?o.length>0?r=o.pop():r=this.backend.device.createBuffer({size:n,usage:t}):r=this.backend.device.createBuffer({size:n,usage:t})}else r=this.backend.device.createBuffer({size:n,usage:t});let s={id:ba(),type:0,buffer:r};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),ye("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ye("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw new Error("data does not exist");await ao(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=va.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ye("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Cm=(...e)=>new Mf(...e)}),Pf,Ee,Re=K(()=>{"use strict";Pf=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Ee=e=>new Pf(e)}),er,Wi,qe,Ve,se,Oe,oo,Qn,dn,ie,Gr,L,re,Am,No,Bf,zm,le=K(()=>{"use strict";ae(),ue(),er=64,Wi=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},qe=(e,t=1)=>{let n=Wi(e,t);return typeof n=="string"?n:n[0]},Ve=(e,t=1)=>{let n=Wi(e,t);return typeof n=="string"?n:n[1]},se=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:U.computeStrides(n)})}),t},Oe=e=>e%4===0?4:e%2===0?2:1,oo=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,Qn=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,dn=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,ie=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Gr=(e,t,n,r,i)=>{let a=typeof n=="number",s=a?n:n.length,o=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=Wi(t,i),c=typeof d=="string"?d:d[1],h=typeof d=="string"?d:d[0],g={indices:u,value:c,storage:h,tensor:t},v=V=>typeof V=="string"?V:`${V}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},T=a?"uniforms.":"",S=`${T}${e}_shape`,k=`${T}${e}_strides`,_="";for(let V=0;V<s-1;V++)_+=`
    let dim${V} = current / ${ie(k,V,s)};
    let rest${V} = current % ${ie(k,V,s)};
    indices[${V}] = dim${V};
    current = rest${V};
    `;_+=`indices[${s-1}] = current;`;let I=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${_}
    return indices;
  }`,C=V=>(b.offsetToIndices=!0,s<2?V:`o2i_${e}(${V})`),A=[];if(s>=2)for(let V=s-1;V>=0;V--)A.push(`${ie(k,V,s)} * (indices[${V}])`);let D=s<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${A.join("+")};
  }`,w=V=>(b.indicesToOffset=!0,s<2?V:`i2o_${e}(${V})`),f=(...V)=>s===0?"0u":`${g.indices}(${V.map(v).join(",")})`,$=(V,M)=>s<2?`${V}`:`${ie(V,M,s)}`,E=(V,M,Y)=>s<2?`${V}=${Y};`:`${ie(V,M,s)}=${Y};`,z={},N=(V,M)=>{b.broadcastedIndicesToOffset=!0;let Y=`${M.name}broadcastedIndicesTo${e}Offset`;if(Y in z)return`${Y}(${V})`;let G=[];for(let he=s-1;he>=0;he--){let Q=M.indicesGet("outputIndices",he+M.rank-s);G.push(`${$(k,he)} * (${Q} % ${$(S,he)})`)}return z[Y]=`fn ${Y}(outputIndices: ${M.type.indices}) -> u32 {
             return ${G.length>0?G.join("+"):"0u"};
           }`,`${Y}(${V})`},B=(V,M)=>(()=>{if(g.storage===g.value)return`${e}[${V}]=${M};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${V}]=vec2<u32>(u32(${M}), select(0u, 0xFFFFFFFFu, ${M} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${V}]=vec2<u32>(u32(${M}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${V}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${M}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),F=V=>(()=>{if(g.storage===g.value)return`${e}[${V}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${V}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${V}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${V}] & 0xFFu), bool(${e}[${V}] & 0xFF00u), bool(${e}[${V}] & 0xFF0000u), bool(${e}[${V}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),R=s<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${c} {
    return ${F(`i2o_${e}(indices)`)};
  }`,j=s<2?"":(()=>{let V=o.map(Y=>`d${Y}: u32`).join(", "),M=o.map(Y=>`d${Y}`).join(", ");return`
  fn get_${e}(${V}) -> ${c} {
    return get_${e}ByIndices(${f(M)});
  }`})(),q=(...V)=>{if(V.length!==s)throw new Error(`indices length must be ${s}`);let M=V.map(v).join(",");return s===0?F("0u"):s===1?F(M[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${M})`)},oe=V=>s<2?F(V):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${V})`),H=s<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${c}) {
    ${B(`i2o_${e}(indices)`,"value")}
  }`,ee=s<2?"":(()=>{let V=o.map(Y=>`d${Y}: u32`).join(", "),M=o.map(Y=>`d${Y}`).join(", ");return`
  fn set_${e}(${V}, value: ${c}) {
    set_${e}ByIndices(${f(M)}, value);
  }`})();return{impl:()=>{let V=[],M=!1;return b.offsetToIndices&&(V.push(I),M=!0),b.indicesToOffset&&(V.push(D),M=!0),b.broadcastedIndicesToOffset&&(Object.values(z).forEach(Y=>V.push(Y)),M=!0),b.set&&(V.push(ee),M=!0),b.setByIndices&&(V.push(H),M=!0),b.get&&(V.push(j),M=!0),b.getByIndices&&(V.push(R),M=!0),!a&&M&&V.unshift(`const ${S} = ${g.indices}(${n.join(",")});`,`const ${k} = ${g.indices}(${U.computeStrides(n).join(",")});`),V.join(`
`)},type:g,offsetToIndices:C,indicesToOffset:w,broadcastedIndicesToOffset:N,indices:f,indicesGet:$,indicesSet:E,set:(...V)=>{if(V.length!==s+1)throw new Error(`indices length must be ${s}`);let M=V[s];if(typeof M!="string")throw new Error("value must be string");let Y=V.slice(0,s).map(v).join(",");return s===0?B("0u",M):s===1?B(Y[0],M):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${Y}, ${M})`)},setByOffset:B,setByIndices:(V,M)=>s<2?B(V,M):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${V}, ${M});`),get:q,getByOffset:F,getByIndices:oe,usage:r,name:e,strides:k,shape:S,rank:s}},L=(e,t,n,r=1)=>Gr(e,t,n,"input",r),re=(e,t,n,r=1)=>Gr(e,t,n,"output",r),Am=(e,t,n)=>Gr(e,t,n,"atomicOutput",1),No=(e,t,n,r=1)=>Gr(e,t,n,"internal",r),Bf=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=er){let t=typeof e=="number"?e:e[0],n=typeof e=="number"?1:e[1],r=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*r>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*n*r}u + local_idx;`;return`@compute @workgroup_size(${t}, ${n}, ${r})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let n=e.usage==="input"?"read":"read_write",r=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,n=1){return this.uniforms.push({name:e,type:t,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:n,length:r}of this.uniforms)if(r&&r>4)n==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${n}>, ${Math.ceil(r/4)}>`);else{let i=r==null||r===1?n:`vec${r}<${n}>`;e.push(`${t}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},zm=(e,t)=>new Bf(e,t)}),Uf,_a,Wf,Lf,Vf,qf,it,Om,Rm,fn=K(()=>{"use strict";ae(),ue(),Re(),le(),Uf=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},_a=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Wf=(e,t)=>U.sortBasedOnPerm(e,_a(e.length,t)),Lf=(e,t,n,r)=>{let i=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let a=0;a<t;++a)i+=`a[${e[a]}]=i[${a}];`;return i+="return a;}"},Vf=(e,t)=>{let n=[],r=[];for(let i=0;i<e.length;++i)e[i]!==1&&n.push(e[i]),e[t[i]]!==1&&r.push(t[i]);return{newShape:n,newPerm:r}},qf=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},it=(e,t)=>{let n=e.dataType,r=e.dims.length,i=_a(r,t),a=Wf(e.dims,i),s=e.dims,o=a,u=r<2||qf(i,e.dims),d;if(u)return d=b=>{let T=L("input",n,s,4),S=re("output",n,o,4);return`
  ${b.registerUniform("output_size","u32").declareVariables(T,S)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=U.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(b/64/4)},programUniforms:[{type:12,data:Math.ceil(b/4)}]}},getShaderSource:d};let{newShape:c,newPerm:h}=Vf(e.dims,i),g=U.areEqual(h,[2,3,1]),v=U.areEqual(h,[3,1,2]);if(c.length===2||g||v){s=g?[c[0],c[1]*c[2]]:v?[c[0]*c[1],c[2]]:c,o=[s[1],s[0]];let b=16;return d=T=>{let S=L("a",n,s.length),k=re("output",n,o.length);return`
  ${T.registerUniform("output_size","u32").declareVariables(S,k)}
  var<workgroup> tile : array<array<${k.type.value}, ${b+1}>, ${b}>;
  ${T.mainStart([b,b,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${b} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${b}u + local_id.x;
    let input_row = workgroup_id_x * ${b}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${S.getByIndices(`${S.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${b}u + local_id.x;
    let output_row = workgroup_id_y * ${b}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${k.setByIndices(`${k.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let T=U.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/b),y:Math.ceil(o[0]/b)},programUniforms:[{type:12,data:T},...se(s,o)]}},getShaderSource:d}}return d=b=>{let T=L("a",n,s.length),S=re("output",n,o.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(T,S)}

  ${Lf(i,r,T,S)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx",T.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let b=U.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...se(s,o)]}},getShaderSource:d}},Om=(e,t)=>{Uf(e.inputs,t.perm),e.compute(it(e.inputs[0],t.perm))},Rm=e=>Ee({perm:e.perm})}),Ff,Gf,Hf,jf,Kf,Yf,Zf,Xf,Qf,Jf,mt,Dm,Nm,Mm,Pm,Bm,Um,Wm,Lm,Vm,qm,Uv=K(()=>{"use strict";ae(),ue(),le(),Mo(),fn(),Ff={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Gf={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Hf={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},jf={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Kf=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},Yf=(e,t)=>{let n=[],r=e.length;for(let a=0;a<r;a++)t.indexOf(a)===-1&&n.push(e[a]);let i=t.map(a=>e[a]);return[n,i]},Zf=(e,t)=>{let n=e.length+t.length,r=[],i=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[i++]):r.push(1);return r},Xf=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},Qf=(e,t)=>{let n=[];if(!Xf(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},Jf=(e,t,n,r,i,a,s)=>{let o=n[0].dims,u=U.size(a),d=U.size(s),c=L("_A",n[0].dataType,o),h=re("output",i,a),g=64;u===1&&(g=256);let v=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,b=T=>`
        ${T.registerUniform("reduceSize","u32").declareVariables(c,h)}
        ${v}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${T.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Hf[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${Ff[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Gf[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex",`${r==="mean"?`${h.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${h.type.storage}(${jf[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:u},programUniforms:[{type:12,data:d}]})}},mt=(e,t,n,r)=>{let i=e.inputs.length===1?n:uo(e.inputs,n),a=i.axes;a.length===0&&!i.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((v,b)=>b));let s=U.normalizeAxes(a,e.inputs[0].dims.length),o=s,u=e.inputs[0],d=Qf(o,e.inputs[0].dims.length);d.length>0&&(u=e.compute(it(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],o=Kf(o.length,u.dims.length));let[c,h]=Yf(u.dims,o),g=c;i.keepDims&&(g=Zf(c,s)),e.compute(Jf(t,i.cacheKey,[u],r,e.inputs[0].dataType,g,h),{inputs:[u]})},Dm=(e,t)=>{mt(e,"ReduceMeanShared",t,"mean")},Nm=(e,t)=>{mt(e,"ReduceL1Shared",t,"l1")},Mm=(e,t)=>{mt(e,"ReduceL2Shared",t,"l2")},Pm=(e,t)=>{mt(e,"ReduceLogSumExpShared",t,"logSumExp")},Bm=(e,t)=>{mt(e,"ReduceMaxShared",t,"max")},Um=(e,t)=>{mt(e,"ReduceMinShared",t,"min")},Wm=(e,t)=>{mt(e,"ReduceProdShared",t,"prod")},Lm=(e,t)=>{mt(e,"ReduceSumShared",t,"sum")},Vm=(e,t)=>{mt(e,"ReduceSumSquareShared",t,"sumSquare")},qm=(e,t)=>{mt(e,"ReduceLogSumShared",t,"logSum")}}),gt,ep,ts,uo,yt,tp,np,rp,ip,sp,ap,op,up,lp,dp,wt,Fm,Gm,Hm,jm,Km,Ym,Zm,Xm,Qm,Jm,Mo=K(()=>{"use strict";ae(),ue(),Re(),le(),Uv(),gt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},ep=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],ts=(e,t,n,r,i,a,s=!1,o=!1)=>{let u=[],d=n[0].dims,c=d.length,h=U.normalizeAxes(i,c),g=!o&&h.length===0;d.forEach((T,S)=>{g||h.indexOf(S)>=0?s&&u.push(1):u.push(T)});let v=u.length,b=U.size(u);return{name:e,shaderCache:t,getShaderSource:T=>{let S=[],k=L("_A",n[0].dataType,c),_=re("output",a,v),I=r(k,_,h),C=I[2];for(let A=0,D=0;A<c;A++)g||h.indexOf(A)>=0?(s&&D++,C=`for(var j${A}: u32 = 0; j${A} < ${d[A]}; j${A}++) {
                  ${I[2].includes("last_index")?`let last_index = j${A};`:""}
                  ${k.indicesSet("input_indices",A,`j${A}`)}
                  ${C}
                }`):(S.push(`${k.indicesSet("input_indices",A,_.indicesGet("output_indices",D))};`),D++);return`

        ${T.registerUniform("output_size","u32").declareVariables(k,_)}

        ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${k.type.indices};
          let output_indices = ${_.offsetToIndices("global_idx")};

          ${S.join(`
`)}
          ${I[0]}       // init ops for reduce max/min
          ${I[1]}
          ${C}
          ${I[3]}
          ${I.length===4?_.setByOffset("global_idx","value"):I.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:a}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...se(d,u)]})}},uo=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),Ee({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},yt=(e,t,n,r)=>{let i=e.inputs,a=i.length===1?n:uo(i,n);e.compute(ts(t,{hint:a.cacheKey,inputDependencies:["rank"]},[i[0]],a.noopWithEmptyAxes&&a.axes.length===0?ep:r,a.axes,i[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},tp=(e,t)=>{gt(e.inputs),yt(e,"ReduceLogSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},np=(e,t)=>{gt(e.inputs),yt(e,"ReduceL1",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},rp=(e,t)=>{gt(e.inputs),yt(e,"ReduceL2",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},ip=(e,t)=>{gt(e.inputs),yt(e,"ReduceLogSumExp",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},sp=(e,t)=>{gt(e.inputs),yt(e,"ReduceMax",t,(n,r,i)=>{let a=[];for(let s=0;s<n.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},ap=(e,t)=>{gt(e.inputs),yt(e,"ReduceMean",t,(n,r,i)=>{let a=1;for(let s=0;s<n.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${a});`]})},op=(e,t)=>{gt(e.inputs),yt(e,"ReduceMin",t,(n,r,i)=>{let a=[];for(let s=0;s<n.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},up=(e,t)=>{gt(e.inputs),yt(e,"ReduceProd",t,(n,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},lp=(e,t)=>{gt(e.inputs),yt(e,"ReduceSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},dp=(e,t)=>{gt(e.inputs),yt(e,"ReduceSumSquare",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},wt=(e,t,n)=>{if(t.length===0)return n;let r=1,i=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?r*=e[a]:i*=e[a];return i<32&&r>1024},Fm=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ap(e,t):Dm(e,t)},Gm=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?np(e,t):Nm(e,t)},Hm=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rp(e,t):Mm(e,t)},jm=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ip(e,t):Pm(e,t)},Km=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?sp(e,t):Bm(e,t)},Ym=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?op(e,t):Um(e,t)},Zm=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?up(e,t):Wm(e,t)},Xm=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?lp(e,t):Lm(e,t)},Qm=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?dp(e,t):Vm(e,t)},Jm=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?tp(e,t):qm(e,t)}}),ka,eg,tg,lo,Wv=K(()=>{"use strict";ae(),Re(),Mo(),ka=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},eg=(e,t)=>{ka(e.inputs);let n=(r,i,a)=>{let s=[];for(let o=0;o<r.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(ts("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},tg=(e,t)=>{ka(e.inputs);let n=(r,i,a)=>{let s=[];for(let o=0;o<r.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(ts("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},lo=e=>Ee(e)}),fp,Li,pp,cp,hp,si,mp,ng,Po=K(()=>{"use strict";ae(),ue(),Do(),le(),fp=(e,t)=>{let n=e[0],r=e[1],i=e[2],a=e[3],s=e[4],o=e[5];if(s&&o)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],d=n.dims[1],c=n.dims[2];if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=i.dims[0]/3,g=h,v=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of t.qkvHiddenSizes)if(I%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");h=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],v=t.qkvHiddenSizes[2]}let b=d;if(h!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==h+g+v)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let T=0;if(s){if(g!==v)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(T=s.dims[3])}let S=b+T,k=-1,_=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==u||o.dims[1]!==t.numHeads||o.dims[2]!==d||o.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:d,pastSequenceLength:T,kvSequenceLength:b,totalSequenceLength:S,maxSequenceLength:k,inputHiddenSize:c,hiddenSize:h,vHiddenSize:v,headSize:Math.floor(h/t.numHeads),vHeadSize:Math.floor(v/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Li=(e,t,n)=>t&&e?`
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
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,pp=(e,t,n,r,i,a,s,o)=>{let u=Oe(s?1:a),d=64,c=a/u;c<d&&(d=32);let h=Math.ceil(a/u/d),g=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:i},{type:12,data:c},{type:12,data:h}],v=qe(e.dataType,u),b=Ve(1,u),T=["type"];s&&T.push("type"),o&&T.push("type");let S=k=>{let _=re("x",e.dataType,e.dims,u),I=[_],C=s?L("seq_lens",s.dataType,s.dims):void 0;C&&I.push(C);let A=o?L("total_sequence_length_input",o.dataType,o.dims):void 0;A&&I.push(A);let D=Ve(e.dataType),w=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${k.registerUniforms(w).declareVariables(...I)}
  ${k.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Li(C,A,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${b}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${b}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${b}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${b}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${_.type.value}(${D}(1.0) / ${D}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${_.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${_.type.value}(${D}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${v};${u}`,inputDependencies:T},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*n},programUniforms:g})}},cp=(e,t,n,r,i,a,s,o,u)=>{let d=s+a.kvSequenceLength,c=[a.batchSize,a.numHeads,a.sequenceLength,d],h=e>1&&r,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,v=h?[a.batchSize,g,d,a.headSize]:void 0,b=a.nReps?a.nReps:1,T=a.scale===0?1/Math.sqrt(a.headSize):a.scale,S=Oe(a.headSize),k=a.headSize/S,_=12,I={x:Math.ceil(d/_),y:Math.ceil(a.sequenceLength/_),z:a.batchSize*a.numHeads},C=[{type:12,data:a.sequenceLength},{type:12,data:k},{type:12,data:d},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:T},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:b}],A=h&&r&&U.size(r.dims)>0,D=["type","type"];A&&D.push("type"),i&&D.push("type"),o&&D.push("type"),u&&D.push("type");let w=[{dims:c,dataType:t.dataType,gpuDataType:0}];h&&w.push({dims:v,dataType:t.dataType,gpuDataType:0});let f=$=>{let E=L("q",t.dataType,t.dims,S),z=L("key",n.dataType,n.dims,S),N=[E,z];if(A){let H=L("past_key",r.dataType,r.dims,S);N.push(H)}i&&N.push(L("attention_bias",i.dataType,i.dims));let B=o?L("seq_lens",o.dataType,o.dims):void 0;B&&N.push(B);let F=u?L("total_sequence_length_input",u.dataType,u.dims):void 0;F&&N.push(F);let R=re("output",t.dataType,c),j=[R];h&&j.push(re("present_key",t.dataType,v,S));let q=Ve(1,S),oe=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;

  var<workgroup> tileQ: array<${E.type.storage}, ${_*_}>;
  var<workgroup> tileK: array<${E.type.storage}, ${_*_}>;
  ${$.registerUniforms(oe).declareVariables(...N,...j)}
  ${$.mainStart([_,_,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Li(B,F,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${A&&h?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${q}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${A&&h?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${h?`if (n + local_id.y < present_sequence_length) {
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
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${R.type.value} (sum * uniforms.alpha) + ${i?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${i!==void 0};${r!==void 0};${e}`,inputDependencies:D},getRunData:()=>({outputs:w,dispatchGroup:I,programUniforms:C}),getShaderSource:f}},hp=(e,t,n,r,i,a,s=void 0,o=void 0)=>{let u=a+i.kvSequenceLength,d=i.nReps?i.nReps:1,c=i.vHiddenSize*d,h=e>1&&r,g=i.kvNumHeads?i.kvNumHeads:i.numHeads,v=h?[i.batchSize,g,u,i.headSize]:void 0,b=[i.batchSize,i.sequenceLength,c],T=12,S={x:Math.ceil(i.vHeadSize/T),y:Math.ceil(i.sequenceLength/T),z:i.batchSize*i.numHeads},k=[{type:12,data:i.sequenceLength},{type:12,data:u},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:c},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:d}],_=h&&r&&U.size(r.dims)>0,I=["type","type"];_&&I.push("type"),s&&I.push("type"),o&&I.push("type");let C=[{dims:b,dataType:t.dataType,gpuDataType:0}];h&&C.push({dims:v,dataType:t.dataType,gpuDataType:0});let A=D=>{let w=L("probs",t.dataType,t.dims),f=L("v",n.dataType,n.dims),$=[w,f];_&&$.push(L("past_value",r.dataType,r.dims));let E=s?L("seq_lens",s.dataType,s.dims):void 0;s&&$.push(E);let z=o?L("total_sequence_length_input",o.dataType,o.dims):void 0;o&&$.push(z);let N=[re("output",t.dataType,b)];h&&N.push(re("present_value",t.dataType,v));let B=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${T}u;
  var<workgroup> tileQ: array<${w.type.value}, ${T*T}>;
  var<workgroup> tileV: array<${w.type.value}, ${T*T}>;
  ${D.registerUniforms(B).declareVariables(...$,...N)}
  ${D.mainStart([T,T,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Li(E,z,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${_&&h?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${w.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${_&&h?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${h?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:C,dispatchGroup:S,programUniforms:k}),getShaderSource:A}},si=(e,t,n,r,i,a,s,o,u,d,c=void 0,h=void 0)=>{let g=Math.min(e.outputCount,1+(s?1:0)+(o?1:0)),v=g>1?s:void 0,b=g>1?o:void 0,T=g>1?d.pastSequenceLength:0,S=T+d.kvSequenceLength,k=u&&U.size(u.dims)>0?u:void 0,_=[t,n];v&&U.size(v.dims)>0&&_.push(v),k&&_.push(k),c&&_.push(c),h&&_.push(h);let I=e.compute(cp(g,t,n,v,k,d,T,c,h),{inputs:_,outputs:g>1?[-1,1]:[-1]})[0];e.compute(pp(I,d.batchSize,d.numHeads,T,d.sequenceLength,S,c,h),{inputs:c&&h?[I,c,h]:[I],outputs:[]});let C=[I,r];b&&U.size(b.dims)>0&&C.push(b),c&&C.push(c),h&&C.push(h),e.compute(hp(g,I,r,b,d,T,c,h),{inputs:C,outputs:g>1?[0,2]:[0]})},mp=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,i=t.inputHiddenSize,a=t.headSize,s=12,o={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=h=>{let g=re("output_q",u[0].dataType,n),v=re("output_k",u[0].dataType,n),b=re("output_v",u[0].dataType,n),T=L("input",u[0].dataType,u[0].dims),S=L("weight",u[1].dataType,u[1].dims),k=L("bias",u[2].dataType,u[2].dims),_=T.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${_}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${_}, ${s*s}>;
  var<workgroup> tileWeightK: array<${_}, ${s*s}>;
  var<workgroup> tileWeightV: array<${_}, ${s*s}>;
  ${h.registerUniforms(I).declareVariables(T,S,k,g,v,b)}
  ${h.mainStart([s,s,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:d}),getShaderSource:c},{inputs:u,outputs:[-1,-1,-1]})},ng=(e,t)=>{let n=fp(e.inputs,t),[r,i,a]=mp(e,n);return si(e,r,i,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),gp,yp,wp,rg,Lv=K(()=>{"use strict";st(),ae(),ue(),Re(),le(),gp=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,i,a)=>{let s=i.length;if(s!==r.length)throw new Error(`${a}: num dimensions != ${s}`);i.forEach((o,u)=>{if(o!==r[u])throw new Error(`${a}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},yp=(e,t)=>{let{epsilon:n,spatial:r,format:i}=t,a=e[0].dims,s=r?Oe(a[a.length-1]):1,o=i==="NHWC"&&a.length>1?s:1,u=U.size(a)/s,d=r,c=d?a.length:a,h=L("x",e[0].dataType,e[0].dims,s),g=L("scale",e[1].dataType,e[1].dims,o),v=L("bias",e[2].dataType,e[2].dims,o),b=L("inputMean",e[3].dataType,e[3].dims,o),T=L("inputVar",e[4].dataType,e[4].dims,o),S=re("y",e[0].dataType,c,s),k=()=>{let I="";if(r)I=`let cOffset = ${a.length===1?"0u":i==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(i==="NCHW")I=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let C=1;C<g.rank;C++)I+=`cIndices[${C}] = outputIndices[${C}];`;I+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return I},_=I=>`
  const epsilon = ${n};
  ${I.registerUniform("outputSize","u32").declareVariables(h,g,v,b,T,S)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${s}`)};
    ${k()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${v.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${T.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d?[{type:12,data:u},...se(a)]:[{type:12,data:u}]})}},wp=e=>Ee(e),rg=(e,t)=>{let{inputs:n,outputCount:r}=e,i=wp({...t,outputCount:r});if(Te.webgpu.validateInputContent&&gp(n,i),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(yp(n,i))}}),$p,vp,ig,Vv=K(()=>{"use strict";ue(),le(),$p=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},vp=e=>{let t=e[0].dims,n=e[0].dims[2],r=U.size(t)/4,i=e[0].dataType,a=L("input",i,t,4),s=L("bias",i,[n],4),o=L("residual",i,t,4),u=re("output",i,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:d=>`
  const channels = ${n}u / 4;
  ${d.declareVariables(a,s,o,u)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},ig=e=>{$p(e.inputs),e.compute(vp(e.inputs))}}),bp,$e,sg,ag,og,ug,lg,dg,fg,pg,cg,_p,hg,mg,gg,yg,ti,wg,Zi,$g,vg,bg,_g,kg,xg,Eg,Tg,Sg,Ig,Cg,Ag,zg,Og,Rg,Dg,Ng,xa,Mg,fo,po,Pg,Bg,Ug,kp,xp,Wg,Bo=K(()=>{"use strict";ae(),ue(),Re(),le(),bp=(e,t,n,r,i,a,s)=>{let o=Math.ceil(t/4),u="";typeof i=="string"?u=`${i}(a)`:u=i("a");let d=L("inputData",n,[o],4),c=re("outputData",r,[o],4),h=[{name:"vec_size",type:"u32"}];return s&&h.push(...s),`
      ${e.registerUniforms(h).declareVariables(d,c)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",u)}
  }`},$e=(e,t,n,r,i,a=e.dataType,s,o)=>{let u=[{type:12,data:Math.ceil(U.size(e.dims)/4)}];return s&&u.push(...s),{name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:d=>bp(d,U.size(e.dims),e.dataType,a,n,r,o),getRunData:d=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(U.size(d[0].dims)/64/4)},programUniforms:u})}},sg=e=>{e.compute($e(e.inputs[0],"Abs","abs"))},ag=e=>{e.compute($e(e.inputs[0],"Acos","acos"))},og=e=>{e.compute($e(e.inputs[0],"Acosh","acosh"))},ug=e=>{e.compute($e(e.inputs[0],"Asin","asin"))},lg=e=>{e.compute($e(e.inputs[0],"Asinh","asinh"))},dg=e=>{e.compute($e(e.inputs[0],"Atan","atan"))},fg=e=>{e.compute($e(e.inputs[0],"Atanh","atanh"))},pg=e=>Ee(e),cg=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute($e(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},_p=e=>{let t,n,r=e.length>=2&&e[1].data!==0,i=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=i?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return Ee({min:t,max:n})},hg=(e,t)=>{let n=t||_p(e.inputs),r=Ve(e.inputs[0].dataType);e.compute($e(e.inputs[0],"Clip",i=>`clamp(${i}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},mg=e=>{e.compute($e(e.inputs[0],"Ceil","ceil"))},gg=e=>{e.compute($e(e.inputs[0],"Cos","cos"))},yg=e=>{e.compute($e(e.inputs[0],"Cosh","cosh"))},ti=e=>Ee(e),wg=(e,t)=>{let n=Ve(e.inputs[0].dataType);e.compute($e(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Zi=(e="f32")=>`
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
}`,$g=e=>{let t=Ve(e.inputs[0].dataType);e.compute($e(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Zi(t)))},vg=e=>{e.compute($e(e.inputs[0],"Exp","exp"))},bg=e=>{e.compute($e(e.inputs[0],"Floor","floor"))},_g=e=>{let t=Ve(e.inputs[0].dataType);e.compute($e(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Zi(t)))},kg=(e,t)=>{let n=Ve(e.inputs[0].dataType);e.compute($e(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},xg=e=>{e.compute($e(e.inputs[0],"Not",t=>`!${t}`))},Eg=e=>{e.compute($e(e.inputs[0],"Neg",t=>`-${t}`))},Tg=e=>{e.compute($e(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Sg=e=>{let t=Ve(e.inputs[0].dataType);e.compute($e(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},Ig=e=>{e.compute($e(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Cg=e=>Ee(e),Ag=(e,t)=>{let n=Ve(e.inputs[0].dataType);e.compute($e(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},zg=e=>{let t=Ve(e.inputs[0].dataType);e.compute($e(e.inputs[0],"HardSwish",n=>`${n} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${n} + vec4<${t}>(0.5)))`))},Og=e=>{e.compute($e(e.inputs[0],"Sin","sin"))},Rg=e=>{e.compute($e(e.inputs[0],"Sinh","sinh"))},Dg=e=>{e.compute($e(e.inputs[0],"Sqrt","sqrt"))},Ng=e=>{e.compute($e(e.inputs[0],"Tan","tan"))},xa=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Mg=e=>{e.compute($e(e.inputs[0],"Tanh",xa))},fo=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${xa("v")};
}
`,po=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Pg=e=>{let t=Ve(e.inputs[0].dataType);e.compute($e(e.inputs[0],"FastGelu",po,fo(t),void 0,e.inputs[0].dataType))},Bg=(e,t)=>{let n=Ve(e.inputs[0].dataType);return e.compute($e(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},Ug=e=>{e.compute($e(e.inputs[0],"Log","log"))},kp=(e,t)=>`
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
`,xp=e=>`quick_gelu_impl(${e})`,Wg=(e,t)=>{let n=Ve(e.inputs[0].dataType);e.compute($e(e.inputs[0],"QuickGelu",xp,kp(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Ep,Tp,Lg,qv=K(()=>{"use strict";ue(),le(),Bo(),Ep=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Tp=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=L("input",e[0].dataType,e[0].dims,4),r=L("bias",e[0].dataType,[e[0].dims[2]],4),i=re("output",e[0].dataType,t,4),a=U.size(t)/4,s=qe(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(n,r,i)}

  ${Zi(s)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Lg=e=>{Ep(e.inputs),e.compute(Tp(e.inputs))}}),Sp,Ip,$t,Vg,qg,Fg,Gg,Hg,jg,Kg,Yg,Zg,Xg,Fv=K(()=>{"use strict";ae(),ue(),le(),Sp=(e,t,n,r,i,a,s,o,u,d,c,h)=>{let g,v;typeof o=="string"?g=v=(_,I)=>`${o}((${_}),(${I}))`:typeof o=="function"?g=v=o:(g=o.scalar,v=o.vector);let b=re("outputData",c,r.length,4),T=L("aData",u,t.length,4),S=L("bData",d,n.length,4),k;if(i)if(a){let _=U.size(t)===1,I=U.size(n)===1,C=t.length>0&&t[t.length-1]%4===0,A=n.length>0&&n[n.length-1]%4===0;_||I?k=b.setByOffset("global_idx",v(_?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"),I?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):k=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${T.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",v(s||C?T.getByOffset("offsetA / 4u"):`${T.type.value}(${T.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||A?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else k=b.setByOffset("global_idx",v(T.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let _=(I,C,A="")=>{let D=`aData[indexA${C}][componentA${C}]`,w=`bData[indexB${C}][componentB${C}]`;return`
            let outputIndices${C} = ${b.offsetToIndices(`global_idx * 4u + ${C}u`)};
            let offsetA${C} = ${T.broadcastedIndicesToOffset(`outputIndices${C}`,b)};
            let offsetB${C} = ${S.broadcastedIndicesToOffset(`outputIndices${C}`,b)};
            let indexA${C} = offsetA${C} / 4u;
            let indexB${C} = offsetB${C} / 4u;
            let componentA${C} = offsetA${C} % 4u;
            let componentB${C} = offsetB${C} % 4u;
            ${I}[${C}] = ${A}(${g(D,w)});
          `};c===9?k=`
            var data = vec4<u32>(0);
            ${_("data",0,"u32")}
            ${_("data",1,"u32")}
            ${_("data",2,"u32")}
            ${_("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:k=`
            ${_("outputData[global_idx]",0)}
            ${_("outputData[global_idx]",1)}
            ${_("outputData[global_idx]",2)}
            ${_("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(T,S,b)}

        ${h??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${k}
      }`},Ip=(e,t,n,r,i,a,s=n.dataType)=>{let o=n.dims.map(Number),u=r.dims.map(Number),d=!U.areEqual(o,u),c=o,h=U.size(o),g=!1,v=!1,b=[d];if(d){let T=Jn.calcShape(o,u,!1);if(!T)throw new Error("Can't perform binary op on the given tensors");c=T.slice(),h=U.size(c);let S=U.size(o)===1,k=U.size(u)===1,_=o.length>0&&o[o.length-1]%4===0,I=u.length>0&&u[u.length-1]%4===0;b.push(S),b.push(k),b.push(_),b.push(I);let C=1;for(let A=1;A<c.length;A++){let D=o[o.length-A],w=u[u.length-A];if(D===w)C*=D;else break}C%4===0?(v=!0,g=!0):(S||k||_||I)&&(g=!0)}else g=!0;return b.push(g),{name:e,shaderCache:{hint:t+b.map(T=>T.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:T=>Sp(T,o,u,c,g,d,v,i,n.dataType,r.dataType,s,a),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(U.size(c)/4)},...se(o,u,c)]})}},$t=(e,t,n,r,i,a)=>{e.compute(Ip(t,i??"",e.inputs[0],e.inputs[1],n,r,a))},Vg=e=>{$t(e,"Add",(t,n)=>`${t}+${n}`)},qg=e=>{$t(e,"Div",(t,n)=>`${t}/${n}`)},Fg=e=>{$t(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},Gg=e=>{$t(e,"Mul",(t,n)=>`${t}*${n}`)},Hg=e=>{let t=L("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;$t(e,"Pow",{scalar:(n,r)=>`pow_custom(${n},${r})`,vector:(n,r)=>`pow_vector_custom(${n},${r})`},`
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
      `)},jg=e=>{$t(e,"Sub",(t,n)=>`${t}-${n}`)},Kg=e=>{$t(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},Yg=e=>{$t(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},Zg=e=>{$t(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},Xg=e=>{$t(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}}),Cp,Ap,Qg,Jg,Gv=K(()=>{"use strict";ae(),ue(),Re(),le(),Cp=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],i=r.dataType,a=r.dims.length;e.forEach((s,o)=>{if(o!==n){if(s.dataType!==i)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((u,d)=>{if(d!==t&&u!==r.dims[d])throw new Error("non concat dimensions must match")})}})},Ap=(e,t,n,r,i=0)=>{let a=e.reduce((k,_)=>k+U.size(_.dims),0),s=new Array(e.length),o=new Array(e.length),u=new Array(e.length),d=0,c=i,h=[],g=[],v=[{type:12,data:a}];for(let k=0;k<e.length;++k)s[k]=d,o[k]=c,d+=U.size(e[k].dims),c+=e[k].dims[t],g.push(e[k].dims.length),u[k]=L(`input${k}`,r,g[k]),h.push("rank"),v.push({type:12,data:s[k]}),v.push({type:12,data:o[k]});for(let k=0;k<e.length;++k)v.push(...se(e[k].dims));v.push(...se(n));let b=re("output",r,n.length),T=u.map((k,_)=>{let I=`
        let inputOffset = ${`global_idx - uniforms.inputOffset${_}`};
        var outputIndices = ${k.offsetToIndices("inputOffset")};
        ${b.indicesGet("outputIndices",t)} += uniforms.outputAxisOffset${_};
        ${b.setByIndices("outputIndices",k.getByOffset("inputOffset"))}`;return e.length===1?I:_===0?`if (inputIndex == 0u) {${I}}`:_===e.length-1?`else {${I}}`:`else if (inputIndex == ${_}u) {${I}}`}).join(`
`),S=k=>`

  ${(()=>{k.registerUniform("outputSize","u32");for(let _=0;_<e.length;_++)k.registerUniform(`inputOffset${_}`,"u32"),k.registerUniform(`outputAxisOffset${_}`,"u32");return k.declareVariables(...u,b)})()}

  fn calculateInputIndex(global_idx: u32) -> u32 {
    ${u.slice(1).map((_,I)=>`if (global_idx < uniforms.inputOffset${I+1}) {
      return ${I}u;
    }`).join(`
`)}
    return ${e.length-1}u;
  }

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    let inputIndex = calculateInputIndex(global_idx);
    ${T}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:v}),getShaderSource:S}},Qg=(e,t)=>{let n=e.inputs,r=n[0].dims,i=U.normalizeAxis(t.axis,r.length);Cp(n,i);let a=r.slice();a[i]=n.reduce((d,c)=>d+(c.dims.length>i?c.dims[i]:0),0);let s=n.filter(d=>U.size(d.dims)>0);if(s.length===0){e.output(0,a);return}let o=e.deviceLimits.maxStorageBuffersPerShaderStage-1,u=0;for(let d=0;d<s.length;d+=o){let c=s.slice(d,d+o);e.compute(Ap(c,i,a,n[0].dataType,u),{inputs:c,outputs:[0]}),u+=c.reduce((h,g)=>h+g.dims[i],0)}},Jg=e=>Ee({axis:e.axis})}),Nn,Mn,Pn,Uo,Un=K(()=>{"use strict";ae(),ue(),Nn=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Mn=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Pn=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Uo=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[n,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=e?.activation_params||[xm,Em];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}}),He,e0,Wo=K(()=>{"use strict";He=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},e0=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),t0,Hv=K(()=>{"use strict";t0=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),ri,Lo,Vo=K(()=>{"use strict";ae(),ue(),le(),Un(),ri=(e,t,n,r,i)=>{let a=r-n;return`
      ${Array.from({length:n}).map((s,o)=>`
      if (${ie(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,ie(i,o+a,r))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},Lo=(e,t,n,r,i=!1,a)=>{let s=e[0].dims,o=e[1].dims,u=s[s.length-2],d=o[o.length-1],c=s[s.length-1],h=Oe(d),g=Oe(c),v=Oe(u),b=U.size(n)/h/v,T=e.length>2,S=r?r.slice(0,-2):n.slice(0,-2),k=[U.size(S),u,d],_=[{type:12,data:b},{type:12,data:u},{type:12,data:d},{type:12,data:c}];Mn(t,_),_.push(...se(S,s,o)),T&&_.push(...se(e[2].dims)),_.push(...se(k));let I=C=>{let A=No("batch_dims",e[0].dataType,S.length),D=L("a",e[0].dataType,s.length,g),w=L("b",e[1].dataType,o.length,h),f=re("output",e[0].dataType,k.length,h),$=qe(f.type.tensor),E=Nn(t,f.type.value,$),z=[D,w],N="";if(T){let R=i?h:1;z.push(L("bias",e[2].dataType,e[2].dims.length,R)),N=`${i?`value += bias[col / ${R}];`:`value += ${f.type.value}(bias[row + i]);`}`}let B=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Pn(t,B);let F=()=>{let R=`var a_data: ${D.type.value};`;for(let j=0;j<g;j++)R+=`
              let b_data${j} = b[(b_offset + (k + ${j}) * uniforms.N + col) / ${h}];`;for(let j=0;j<v;j++){R+=`a_data = a[(a_offset + (row + ${j}) * uniforms.K + k) / ${g}];`;for(let q=0;q<g;q++)R+=`
            values[${j}] = fma(${w.type.value}(a_data${g===1?"":`[${q}]`}), b_data${q}, values[${j}]);
`}return R};return`
  ${C.registerUniforms(B).registerInternalVariables(A).declareVariables(...z,f)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${v};
    let row = (index1 % stride1) * ${v};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${A.offsetToIndices("batch")};`}

    var a_indices: ${D.type.indices};
    ${ri("a_indices",D,D.rank-2,A.rank,"batch_indices")}
    ${D.indicesSet("a_indices",D.rank-2,0)}
    ${D.indicesSet("a_indices",D.rank-1,0)}
    let a_offset = ${D.indicesToOffset("a_indices")};

    var b_indices: ${w.type.indices};
    ${ri("b_indices",w,w.rank-2,A.rank,"batch_indices")}
    ${w.indicesSet("b_indices",w.rank-2,0)}
    ${w.indicesSet("b_indices",w.rank-1,0)}
    let b_offset = ${w.indicesToOffset("b_indices")};
    var values: array<${f.type.value}, ${v}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${F()}
    }
    for (var i = 0u; i < ${v}u; i++) {
      var value = values[i];
      ${N}
      ${E}
      let cur_indices = ${f.type.indices}(batch, row + i, col);
      let offset = ${f.indicesToOffset("cur_indices")};
      ${f.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${g};${v};${i}`,inputDependencies:T?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:_}),getShaderSource:I}}}),zp,Op,co,Ea,Rp,ho,Dp,ns,qo=K(()=>{"use strict";ae(),ue(),le(),Un(),Vo(),Wo(),zp=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Op=(e,t)=>e?`
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
        }`,co=(e,t,n="f32",r,i=!1,a=32,s=!1,o=32)=>{let u=t[1]*e[1],d=t[0]*e[0],c=i?u:a,h=i?a:u,g=c/t[0],v=a/t[1];if(!((i&&g===4&&e[1]===4||!i&&(g===3||g===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${i} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${n}>, ${c/g}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${d/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(o/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${v};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${zp(i,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${v}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Op(i,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ea=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Rp=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",ho=(e,t,n="f32",r,i=!1,a=32,s=!1,o=32,u=!1)=>{let d=e[1]*t[1],c=e[0]*t[0],h=i?d:a,g=i?a:d;if(!(g%t[1]===0&&h%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let v=g/t[1],b=h/t[0],T=a/t[1],S=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${Ea(i,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
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

let tileRowA = i32(localId.y) * ${v};
let tileColA = i32(localId.x) * ${b};
let tileRowB = i32(localId.y) * ${T};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${v}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${b}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ea(i,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${T}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Rp(i)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${h}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${c}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(o/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${S}
  }
`},Dp=(e,t,n,r,i=!1)=>{let[a,s,o,u]=r,d=qe(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${He(e,d)} {
      var value = ${He(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${ri("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${He(e,d)} {
      var value = ${He(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${ri("bIndices",o,o.rank-2,a.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${He(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${He(e,d)}(bias[row])`};`:""}
        ${n}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ns=(e,t,n,r,i=!1,a)=>{let s=e[0].dims,o=e[1].dims,u=s.slice(0,-2),d=o.slice(0,-2),c=r?r.slice(0,-2):n.slice(0,-2),h=U.size(c),g=s[s.length-2],v=s[s.length-1],b=o[o.length-1],T=v%4===0&&b%4===0,S=g<=8?[4,1,1]:[4,4,1],k=[8,8,1],_=[Math.ceil(b/k[0]/S[0]),Math.ceil(g/k[1]/S[1]),Math.ceil(h/k[2]/S[2])],I=T?4:1,C=[...u,g,v/I],A=C.length,D=[...d,v,b/I],w=D.length,f=[h,g,b/I],$=[{type:6,data:g},{type:6,data:b},{type:6,data:v}];Mn(t,$),$.push(...se(c,C,D));let E=["rank","rank"],z=e.length>2;z&&($.push(...se(e[2].dims)),E.push("rank")),$.push(...se(f));let N=B=>{let F=c.length,R=No("batchDims",e[0].dataType,F,1),j=qe(e[0].dataType),q=L("a",e[0].dataType,A,I),oe=L("b",e[1].dataType,w,I),H=re("result",e[0].dataType,f.length,I),ee=[q,oe];if(z){let he=i?I:1;ee.push(L("bias",e[2].dataType,e[2].dims.length,he))}let V=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Pn(t,V);let M=qe(H.type.tensor),Y=Nn(t,H.type.value,M),G=Dp(I,z,Y,[R,q,oe,H],i);return`
  ${B.registerUniforms(V).registerInternalVariables(R).declareVariables(...ee,H)}
  ${G}
  ${T?co(S,k,j,R):ho(S,k,j,R)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${T};${i}`,inputDependencies:E},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:$}),getShaderSource:N}}}),Np,n0,jv=K(()=>{"use strict";ae(),Ht(),le(),Un(),Wo(),Hv(),qo(),Np=(e,t,n,r,i=!1,a,s=4,o=4,u=4,d="f32")=>{let c=$=>{switch($){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${$} is not supported.`)}},h=$=>{switch($){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${$} is not supported.`)}},g=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,v=e?`
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
    `,b=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",T=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",k=e?"col":"row",_=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${k} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${k} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${k} % inChannels;
    var resData = ${He(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${T}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,I=e?t&&r?`
    let col = colIn * ${s};
    ${_}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${_}
    }
    return ${He(s,d)}(0.0);`:r&&n?`
    let col = colIn * ${s};
    ${_}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${He(s,d)}(0.0);`,C=e?r&&n?h(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(o)}
    }
    return ${He(o,d)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(o)}
    }
    return ${He(o,d)}(0.0);`,A=He(u,d),D=He(e?s:o,d),w=He(e?o:s,d),f=Nn(a,A,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${D} {
      ${e?I:C}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${w} {
      ${e?C:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${A}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${v}
      ${e0(i)}
      ${f}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},n0=(e,t,n,r,i,a,s,o,u)=>{let d=t.format==="NHWC",c=d?e[0].dims[3]:e[0].dims[1],h=n[0],g=d?n[2]:n[3],v=d?n[1]:n[2],b=d?n[3]:n[1],T=d&&(c%4===0||c%3===0)&&b%4===0,S=d?b:g*v,k=d?g*v:b,_=[8,8,1],I=r<=8?[4,1,1]:[4,4,1],C=[Math.ceil(S/_[0]/I[0]),Math.ceil(k/_[1]/I[1]),Math.ceil(h/_[2]/I[2])];ye("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${C}`);let A=T?d&&c%4!==0?3:4:1,D=_[1]*I[1],w=_[0]*I[0],f=Math.max(_[0]*A,_[1]),$=r%D===0,E=i%w===0,z=a%f===0,N=T?[A,4,4]:[1,1,1],B=[{type:6,data:r},{type:6,data:i},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Mn(t,B),B.push(...se(e[0].dims,e[1].dims));let F=["rank","rank"];s&&(B.push(...se(e[2].dims)),F.push("rank")),B.push(...se(n));let R=j=>{let q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Pn(t,q);let oe=T?4:1,H=qe(e[0].dataType),ee=`
      fn setOutputAtIndex(flatIndex : i32, value : ${T?`vec4<${H}>`:H}) {
        result[flatIndex] = ${T?`vec4<${H}>`:H}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${T?`vec4<${H}>`:H}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${T?"/ 4":""}, value);
      }`,V=L("x",e[0].dataType,e[0].dims.length,A===3?1:A),M=L("w",e[1].dataType,e[1].dims.length,oe),Y=[V,M],G=re("result",e[0].dataType,n.length,oe);if(s){let he=L("bias",e[2].dataType,e[2].dims.length,oe);Y.push(he),ee+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${T?`vec4<${H}>`:H} {
          return bias[coords.${d?"w":"y"}${T?"/ 4":""}];
        }`}return`
        ${t0("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${j.registerUniforms(q).declareVariables(...Y,G)}
        ${ee}
        ${Np(d,$,E,z,s,t,N[0],N[1],N[2],H)}
        ${T?co(I,_,H,void 0,!d,f):ho(I,_,H,void 0,!d,f,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${A};${T};${$};${E};${z};${D};${w};${f}`,inputDependencies:F},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:e[0].dataType}],dispatchGroup:{x:C[0],y:C[1],z:C[2]},programUniforms:B}),getShaderSource:R}}}),Mp,Ta,Hr,Pp,Sa,Bp,r0,i0,Kv=K(()=>{"use strict";ae(),Ht(),ue(),le(),Un(),Wo(),Mp=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Ta=e=>typeof e=="number"?[e,e,e]:e,Hr=(e,t)=>t<=1?e:e+(e-1)*(t-1),Pp=(e,t,n,r=1)=>{let i=Hr(t,r);return Math.floor((e[0]*(n-1)-n+i)/2)},Sa=(e,t,n,r,i)=>{i==null&&(i=Pp(e,t[0],r[0]));let a=[0,0,0,n];for(let s=0;s<3;s++)e[s]+2*i>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*i)/r[s]+1));return a},Bp=(e,t,n,r,i,a,s,o,u,d)=>{let c,h,g,v;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let b=Sa([t,n,r,1],[o,u,d],1,[i,a,s],e);h=b[0],g=b[1],v=b[2]}else if(Array.isArray(e)){if(!e.every((T,S,k)=>T===k[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let b=Sa([t,n,r,1],[o,u,d],1,[i,a,s],e[0]);h=b[0],g=b[1],v=b[2]}else if(e==="SAME_UPPER"){h=Math.ceil(t/i),g=Math.ceil(n/a),v=Math.ceil(r/s);let b=(h-1)*i+o-t,T=(g-1)*a+u-n,S=(v-1)*s+d-r,k=Math.floor(b/2),_=b-k,I=Math.floor(T/2),C=T-I,A=Math.floor(S/2),D=S-A;c={top:I,bottom:C,left:A,right:D,front:k,back:_}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:h,outHeight:g,outWidth:v}},r0=(e,t,n,r,i,a=!1,s="channelsLast")=>{let o,u,d,c,h;if(s==="channelsLast")[o,u,d,c,h]=e;else if(s==="channelsFirst")[o,h,u,d,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[g,,v,b,T]=t,[S,k,_]=Ta(n),[I,C,A]=Ta(r),D=Hr(v,I),w=Hr(b,C),f=Hr(T,A),{padInfo:$,outDepth:E,outHeight:z,outWidth:N}=Bp(i,u,d,c,S,k,_,D,w,f),B=a?g*h:g,F=[0,0,0,0,0];return s==="channelsFirst"?F=[o,B,E,z,N]:s==="channelsLast"&&(F=[o,E,z,N,B]),{batchSize:o,dataFormat:s,inDepth:u,inHeight:d,inWidth:c,inChannels:h,outDepth:E,outHeight:z,outWidth:N,outChannels:B,padInfo:$,strideDepth:S,strideHeight:k,strideWidth:_,filterDepth:v,filterHeight:b,filterWidth:T,effectiveFilterDepth:D,effectiveFilterHeight:w,effectiveFilterWidth:f,dilationDepth:I,dilationHeight:C,dilationWidth:A,inShape:e,outShape:F,filterShape:t}},i0=(e,t,n,r,i,a)=>{let s=a==="channelsLast",o=s?e[0].dims[3]:e[0].dims[1],u=!1,d=[64,1,1],c={x:n.map((_,I)=>I)},h=[Math.ceil(Mp(c.x.map(_=>n[_]))/d[0]),1,1];ye("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${h}`);let g=u?s&&o%4!==0?3:4:1,v=U.size(n),b=[{type:12,data:v},{type:12,data:r},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];Mn(t,b),b.push(...se(e[0].dims,e[1].dims));let T=["rank","rank"],S=e.length===3;S&&(b.push(...se(e[2].dims)),T.push("rank")),b.push(...se(n));let k=_=>{let I=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Pn(t,I);let C=u?4:1,A=qe(e[0].dataType),D=L("x",e[0].dataType,e[0].dims.length,g===3?1:g),w=L("W",e[1].dataType,e[1].dims.length,C),f=[D,w],$=re("result",e[0].dataType,n.length,C),E="";if(S){let B=L("bias",e[2].dataType,e[2].dims.length,C);f.push(B),E+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${A}>`:A} {
          return bias[${s?ie("coords",4,5):ie("coords",1,5)}${u?"/ 4":""}];
        }`}let z=He(g,A),N=Nn(t,z,A);return`
            ${E}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${A} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${D.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${A} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${w.getByIndices("aIndices")};
            }
          ${_.registerUniforms(I).declareVariables(...f,$)}
          ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${$.offsetToIndices("global_idx")};
              let batch = ${ie("coords",0,D.rank)};
              let d2 = ${s?ie("coords",D.rank-1,D.rank):ie("coords",1,D.rank)};
              let xFRCCorner = vec3<u32>(${s?ie("coords",1,D.rank):ie("coords",2,D.rank)},
              ${s?ie("coords",2,D.rank):ie("coords",3,D.rank)},
              ${s?ie("coords",3,D.rank):ie("coords",4,D.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?ie("uniforms.x_shape",1,D.rank):ie("uniforms.x_shape",2,D.rank)};
              let xShapeZ = ${s?ie("uniforms.x_shape",2,D.rank):ie("uniforms.x_shape",3,D.rank)};
              let xShapeW = ${s?ie("uniforms.x_shape",3,D.rank):ie("uniforms.x_shape",4,D.rank)};
              let xShapeU = ${s?ie("uniforms.x_shape",4,D.rank):ie("uniforms.x_shape",1,D.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = ${A}(0);
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
                      ${s?`let xValues = vec4<${A}>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<${A}>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<${A}>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<${A}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<${A}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<${A}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<${A}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<${A}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<${A}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${S?"value = value + getBiasByOutputCoords(coords)":""};
              ${N}
              result[global_idx] = ${A}(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${g};${S}`,inputDependencies:T},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:h[0],y:h[1],z:h[2]},programUniforms:b}),getShaderSource:k}}}),s0,a0,Yv=K(()=>{"use strict";ae(),ue(),le(),Un(),s0=(e,t,n,r)=>{let i=e.length>2,a=i?"value += b[output_channel];":"",s=e[0].dims,o=e[1].dims,u=t.format==="NHWC",d=u?n[3]:n[1],c=d/t.group,h=u&&c>=4?Oe(d):1,g=U.size(n)/h,v=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];Mn(t,v),v.push(...se(s,[o[0],o[1],o[2],o[3]/h]));let b=i?["rank","rank","rank"]:["rank","rank"];v.push(...se([n[0],n[1],n[2],n[3]/h]));let T=S=>{let k=re("output",e[0].dataType,n.length,h),_=qe(k.type.tensor),I=Nn(t,k.type.value,_),C=L("x",e[0].dataType,s.length),A=L("w",e[1].dataType,o.length,h),D=[C,A];i&&D.push(L("b",e[2].dataType,e[2].dims,h));let w=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Pn(t,w);let f=u?`
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
            let xVal = ${C.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${A.get("wHeight","wWidth","wInChannel","output_channel")};
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

            let xVal = ${C.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${A.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(w).declareVariables(...D,k)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${k.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${k.type.value} = ${k.type.value}(0);
    ${f}
    ${a}
    ${I}
    ${k.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${h}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:v}),getShaderSource:T}},a0=(e,t,n,r)=>{let i=e.length>2,a=Oe(n[3]),s=Oe(n[2]),o=U.size(n)/a/s,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],c=[n[0],n[1],n[2],n[3]/a],h=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Mn(t,h),h.push(...se(u,d,c));let g=(s-1)*t.strides[1]+d[1],v=b=>{let T=re("output",e[0].dataType,c.length,a),S=qe(T.type.tensor),k=Nn(t,T.type.value,S),_=L("x",e[0].dataType,u.length,a),I=L("w",e[1].dataType,d.length,a),C=[_,I];i&&C.push(L("b",e[2].dataType,e[2].dims,a));let A=i?"value += b[output_channel];":"",D=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Pn(t,D),`
  ${b.registerUniforms(D).declareVariables(...C,T)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${_.type.value}, ${g}>;
    var values: array<${T.type.value}, ${s}>;
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
          let w_val = ${I.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${A}
      ${k}
      ${T.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${g};${d[0]};${d[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:h}),getShaderSource:v}}}),Up,Vi,Wp,qi,mo,Ia,Lp,Vp,go,Zv=K(()=>{"use strict";ue(),jv(),Kv(),qo(),Yv(),Un(),Vo(),fn(),Up=(e,t,n,r,i,a)=>{let s=e[0],o=e.slice(a?1:2,a?3:4),u=o.length,d=t[0],c=t.slice(2).map((g,v)=>g+(g-1)*(n[v]-1)),h=o.map((g,v)=>g+r[v]+r[v+u]).map((g,v)=>Math.floor((g-c[v]+i[v])/i[v]));return h.splice(0,0,s),h.splice(a?3:1,0,d),h},Vi=[2,3,1,0],Wp=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},qi=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let a=2;a<t[1].dims.length;++a)n[a-2]===0&&(n[a-2]=t[1].dims[a]);let r=e.pads.slice();es.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:n,pads:r}),i},mo=e=>{let t=Uo(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],i=e.dilations,a=e.group,s=e.kernel_shape,o=e.pads,u=e.strides,d=e.w_is_const();return{autoPad:r,format:n,dilations:i,group:a,kernelShape:s,pads:o,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Ia=(e,t,n,r)=>{let i=n.format==="NHWC",a=Up(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,i);if(n.group!==1){let D=[t[0]];if(i){let w=e.kernelCustomData.wT??e.compute(it(t[1],Vi),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=w),D.push(w)}else D.push(t[1]);t.length===3&&D.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&i&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(a0(D,n,a,r),{inputs:D}):e.compute(s0(D,n,a,r),{inputs:D});return}let s=t.length===3,o=t[0].dims[i?1:2],u=t[0].dims[i?2:3],d=t[0].dims[i?3:1],c=t[1].dims[2],h=t[1].dims[3],g=a[i?1:2],v=a[i?2:3],b=a[i?3:1],T=i&&c===o&&h===u&&n.pads[0]===0&&n.pads[1]===0;if(T||c===1&&h===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let D=a[0],w,f,$,E=[];if(i){let B=e.kernelCustomData.wT??e.compute(it(t[1],Vi),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=B),T){let F=o*u*d;w=t[0].reshape([1,D,F]),f=B.reshape([1,F,b]),$=[1,D,b]}else w=t[0].reshape([D,o*u,d]),f=B.reshape([1,d,b]),$=[D,g*v,b];E.push(w),E.push(f)}else w=t[0].reshape([D,d,o*u]),f=t[1].reshape([1,b,d]),$=[D,b,g*v],E.push(f),E.push(w);s&&E.push(t[2]);let z=$[2],N=E[0].dims[E[0].dims.length-1];z<8&&N<8?e.compute(Lo(E,n,a,$,i,r),{inputs:E}):e.compute(ns(E,n,a,$,i,r),{inputs:E});return}let S=!0,k=e.kernelCustomData.wT??e.compute(it(t[1],Vi),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=k);let _=[t[0],k];s&&_.push(t[2]);let I=i?g*v:b,C=i?b:g*v,A=c*h*d;e.compute(n0(_,n,a,I,C,A,s,S,r),{inputs:_})},Lp=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),o=[1].concat(t.kernelShape),u=qi({...t,pads:i,strides:a,dilations:s,kernelShape:o},r);Ia(e,r,u,d=>n?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Vp=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",i=qi(n,t),a=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=r0(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(i0(t,i,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],r))},go=(e,t)=>{if(Wp(e.inputs,t),e.inputs[0].dims.length===3)Lp(e,t);else if(e.inputs[0].dims.length===5)Vp(e,e.inputs,t);else{let n=qi(t,e.inputs);Ia(e,e.inputs,n)}}}),o0,Xv=K(()=>{"use strict";ae(),Ht(),ue(),le(),o0=(e,t,n)=>{let r=e.length>2,i=t.outputShape,a=t.format==="NHWC",s=t.group,o=e[1].dims,u=o[2]/s,d=o[3],c=a?Oe(u):1,h=a&&d===1&&u>=4,g=h?Math.floor(u/4)*4:Math.floor(u/c)*c,v=u-g,b=a?Oe(d):1,T=a?d===1?c:b:1,S=U.size(i)/b,k=[Math.ceil(S/64),1,1];ye("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${k}`);let _=["rank","rank"],I=[t.strides[0],t.strides[1]],C=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],A=[t.dilations[0],t.dilations[1]],D=[C[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),C[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],w=[D[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),D[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],f=[{type:12,data:S},{type:12,data:I},{type:12,data:C},{type:12,data:A},{type:12,data:D},{type:6,data:w},{type:12,data:g},{type:12,data:u},{type:12,data:d},...se(e[0].dims,e[1].dims)];r&&(f.push(...se(e[2].dims)),_.push("rank")),f.push(...se(i));let $=E=>{let z=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:I.length},{name:"filter_dims",type:"u32",length:C.length},{name:"dilations",type:"u32",length:C.length},{name:"effective_filter_dims",type:"u32",length:D.length},{name:"pads",type:"i32",length:w.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],N=qe(e[0].dataType),B=a?1:2,F=a?2:3,R=a?3:1,j=L("W",e[1].dataType,e[1].dims.length,T),q=L("Dy",e[0].dataType,e[0].dims.length,c),oe=[q,j];r&&oe.push(L("bias",e[2].dataType,[i[R]].length,b));let H=re("result",e[0].dataType,i.length,b),ee=()=>{let Y="";if(h)c===4?Y+=`
        let xValue = ${q.getByOffset("x_offset")};
        let wValue = ${j.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?Y+=`
          dotProd = dotProd + dot(vec4<${N}>(${q.getByOffset("x_offset")}, ${q.getByOffset("x_offset + 1u")}), vec4<${N}>(${j.getByOffset("w_offset")}, ${j.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(Y+=`
          dotProd = dotProd + dot(vec4<${N}>(${q.getByOffset("x_offset")}, ${q.getByOffset("x_offset + 1u")}, ${q.getByOffset("x_offset + 2u")}, ${q.getByOffset("x_offset + 3u")}), vec4<${N}>(${j.getByOffset("w_offset")}, ${j.getByOffset("w_offset + 1u")}, ${j.getByOffset("w_offset + 2u")}, ${j.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(Y+=`
                  let xValue = ${a?q.getByOffset(`${q.indicesToOffset(`${q.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):q.get("batch","inputChannel","idyR","idyC")};
        `,c===1)Y+=`
          let w_offset = ${j.indicesToOffset(`${j.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${j.getByOffset(`w_offset / ${T}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let G=0;G<c;G++)Y+=`
            let wValue${G} = ${j.getByOffset(`${j.indicesToOffset(`${j.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${G}, wOutChannel)`)} / ${T}`)};
            dotProd = dotProd + xValue[${G}] * wValue${G};`;return Y},V=()=>{if(v===0)return"";if(!h)throw new Error(`packInputAs4 ${h} is not true.`);let Y="";if(c===1){Y+="dotProd = dotProd";for(let G=0;G<v;G++)Y+=`
            + ${q.getByOffset(`x_offset + ${G}`)} * ${j.getByOffset(`w_offset + ${G}`)}`;Y+=";"}else if(c===2){if(v!==2)throw new Error(`Invalid inputChannelsRemainder ${v}.`);Y+=`
          let xValue = ${q.getByOffset("x_offset")};
          let wValue = ${j.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return Y},M=`
            let outputIndices = ${H.offsetToIndices(`global_idx * ${b}`)};
            let batch = ${H.indicesGet("outputIndices",0)};
            let d1 = ${H.indicesGet("outputIndices",R)};
            let r = ${H.indicesGet("outputIndices",B)};
            let c = ${H.indicesGet("outputIndices",F)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${H.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${N}(dyRCorner) + ${N}(wR)) / ${N}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${N}(uniforms.Dy_shape[${B}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${N}(dyCCorner) + ${N}(wC)) / ${N}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${N}(uniforms.Dy_shape[${F}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${h?`
                var x_offset = ${q.indicesToOffset(`${q.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${j.indicesToOffset(`${j.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${T};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${h?4:c}) {
                  ${ee()}
                  inputChannel = inputChannel + ${h?4:c};
                }
                ${V()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${b}]`:""};
            ${H.setByOffset("global_idx","value")};
          `;return`
    ${E.registerUniforms(z).declareVariables(...oe,H)}
      ${E.mainStart()}
      ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${M}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${T}${b}${h}${v}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:k[0],y:k[1],z:k[2]},outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],programUniforms:f}),getShaderSource:$}}}),qp,Fp,Gp,Ca,u0,Hp,Aa,jp,l0,Qv=K(()=>{"use strict";Xv(),Un(),fn(),qp=(e,t,n,r,i,a)=>(e-1)*t+n+(r-1)*i+1-a,Fp=(e,t,n,r,i)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=a,n[i]=e-a):t==="SAME_LOWER"&&(n[r]=e-a,n[i]=a)},Gp=(e,t,n,r,i,a,s,o,u,d)=>{let c=e.length-2,h=d.length===0;u.length<c&&u.push(...Array(c-u.length).fill(0));let g=e[0],v=t[o?3:1]*i;for(let b=0,T=e.length-c-(o?1:0);b<c;++b,++T){let S=e[T],k=h?S*s[b]:d[b],_=qp(S,s[b],a[b],t[T],n[b],k);Fp(_,r,a,b,b+c),h&&d.push(s[b]*(S-1)+u[b]+(t[T]-1)*n[b]+1-a[b]-a[b+c])}d.splice(0,0,g),d.splice(o?3:1,0,v)},Ca=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((h,g)=>h*g,1)===0){n.length=0;for(let h=2;h<t[1].dims.length;++h)n.push(t[1].dims[h])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let i=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),o=t[0].dims,u=e.dilations.slice();if(u.reduce((h,g)=>h+g,0)===0){let h=t[0].dims.length-2;u=new Array(h).fill(1)}let d=e.strides.slice();if(d.reduce((h,g)=>h+g,0)===0){let h=t[0].dims.length-2;d=new Array(h).fill(1)}Gp(o,n,u,e.autoPad,e.group,i,d,r,s,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:n,pads:i,outputPadding:s,outputShape:a,dilations:u,strides:d}),c},u0=e=>{let t=Uo(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],i=e.dilations,a=e.group??1,s=e.kernelShape,o=e.pads,u=e.strides,d=e.wIsConst(),c=e.outputPadding,h=e.outputShape;return{autoPad:r,format:n,dilations:i,group:a,kernelShape:s,outputPadding:c,outputShape:h,pads:o,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Hp=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==i))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((s,o)=>s+o,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((s,o)=>s+o,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((s,o)=>s+o,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((s,o)=>s+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Aa=(e,t,n,r)=>{let i=e.kernelCustomData.wT??e.compute(it(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let a=[t[0],i];t.length===3&&a.push(t[2]),e.compute(o0(a,n,r),{inputs:a})},jp=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],s=[1].concat(s),a=[1].concat(a),i=[1].concat(i);let u=t.outputPadding;u=[0].concat(u);let d=Ca({...t,pads:o,strides:s,dilations:a,kernelShape:i,outputPadding:u},r);Aa(e,r,d,c=>n?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},l0=(e,t)=>{if(Hp(e.inputs,t),e.inputs[0].dims.length===3)jp(e,t);else{let n=Ca(t,e.inputs);Aa(e,e.inputs,n)}}}),Kp,d0,f0,Jv=K(()=>{"use strict";ae(),ue(),Re(),le(),Kp=(e,t,n,r)=>{let i=U.size(t),a=t.length,s=L("input",e,a),o=re("output",e,a),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),d=U.normalizeAxis(u,a),c=h=>{let g=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,v=ie("uniforms.input_shape","uniforms.axis",a),b=r.reverse?g+(r.exclusive?" + 1":""):"0",T=r.reverse?v:g+(r.exclusive?"":" + 1");return`
                ${h.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,o)}
                ${h.mainStart()}
                  ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${b};
                  let last : i32 = ${T};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:d},...se(t,t)]}),getShaderSource:c}},d0=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,i=e.inputs[1];e.compute(Kp(r,n,i,t),{inputs:[0]})},f0=e=>{let t=e.exclusive===1,n=e.reverse===1;return Ee({exclusive:t,reverse:n})}}),Yp,Zp,Xp,p0,c0,eb=K(()=>{"use strict";ae(),ue(),Re(),le(),Yp=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Zp=(e,t,n,r)=>{let i=[];i.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let a=0;a<t;++a)i.push(n.indicesSet("a",e[a],`i[${a}]`));return i.push("return a;}"),i.join(`
`)},Xp=(e,t)=>{let n,r,i,a,s,o,u=t.format==="NHWC",d=t.blocksize,c=t.mode==="DCR";u?([n,r,i,a]=e.dims,s=c?[n,r,i,d,d,a/d**2]:[n,r,i,a/d**2,d,d],o=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,i,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[n,d,d,a/d**2,r,i]:[n,a/d**2,d,d,r,i],o=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let h=e.reshape(s),g=h.dims.length,v=e.dataType,b=L("a",v,g),T=re("output",v,g),S=k=>`
  ${k.registerUniform("output_size","u32").declareVariables(b,T)}

  ${Zp(o,g,b,T)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:k=>{let _=u?[n,r*d,i*d,a/d**2]:[n,a/d**2,r*d,i*d],I=U.size(_),C=h.dims,A=U.sortBasedOnPerm(C,o);return{outputs:[{dims:_,dataType:k[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...se(C,A)]}},getShaderSource:S}},p0=(e,t)=>{Yp(e.inputs),e.compute(Xp(e.inputs[0],t))},c0=e=>Ee({blocksize:e.blocksize,mode:e.mode,format:e.format})}),qt,jr,Fi,za,on,Qp,Jp,ec,Oa,Ra,Da,tc,nc,Na,rc,h0,m0,tb=K(()=>{"use strict";ae(),ue(),Re(),le(),qt=256,jr=512,Fi=2*Math.PI,za=e=>{let t=[],n=e;for(let r of[4,2,3,5])for(;n%r===0;)t.push(r),n/=r;return n===1?t:void 0},on=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},Qp=(e,t,n,r,i)=>{let a=n/e,s=jr-r,o=d=>`smem[${s}u + base + ${d*t}u]`,u=`  for (var t = local_idx; t < ${a}u; t += ${qt}u) {
`;u+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,u+=`    var leg: array<vec2<f32>, 5>;
`;for(let d=0;d<e;d++){let c=`${r}u + t + ${d*a}u`;if(d===0)u+=`    leg[0] = smem[${c}];
`;else{let h=i*Fi*d/(e*t);u+=`    { let a = ${on(h)} * angleUnit; leg[${d}] = cmul(smem[${c}], vec2<f32>(cos(a), sin(a))); }
`}}if(u+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)u+=`    ${o(0)} = leg[0] + leg[1];
    ${o(1)} = leg[0] - leg[1];
`;else if(e===4){let d=i<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";u+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,u+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,u+=`    let oddRot = ${d};
`,u+=`    ${o(0)} = evenSum + oddSum;
    ${o(1)} = evenDiff + oddRot;
`,u+=`    ${o(2)} = evenSum - oddSum;
    ${o(3)} = evenDiff - oddRot;
`}else for(let d=0;d<e;d++){let c=["leg[0]"];for(let h=1;h<e;h++){let g=i*Fi*(h*d)/e,v=on(Math.cos(g)),b=on(Math.sin(g));c.push(`vec2<f32>(leg[${h}].x*${v} - leg[${h}].y*${b}, leg[${h}].x*${b} + leg[${h}].y*${v})`)}u+=`    ${o(d)} = ${c.join(" + ")};
`}return`${u}  }
  workgroupBarrier();
`},Jp=(e,t,n)=>{let r="",i=1,a=0;for(let s of e)r+=Qp(s,i,t,a,n),i*=s,a=jr-a;return{code:r,resultOffset:a}},ec=(e,t,n,r,i)=>{let a=e.dims,s=a.length,o=a[s-1],u=a[t],d=n&&r?(u-1)*2:u;i!==void 0&&(d=i);let c=n&&r?1:2,h=r&&!n?Math.floor(d/2)+1:d,g=a.slice();g[t]=h,g[s-1]=c;let v=1;for(let T=t+1;T<s-1;T++)v*=a[T];let b=U.size(a)/o/u;return{dataType:e.dataType,outputDims:g,length:d,signalLength:u,inner:v,batch:b,inputComponents:o,outputComponents:c,outputLength:h,inverse:n,onesided:r}},Oa=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),Ra=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],Da=(e,t,n)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,n),tc=e=>{let{dataType:t,length:n,inputComponents:r,outputComponents:i,inverse:a,onesided:s}=e,o=Ve(t),u=a?1:-1,d=a?1/n:1,c=za(n),h=g=>{let v=L("x",t,[1]),b=re("y",t,[1]),T=A=>{let D=`inBase + (${A}) * uniforms.inner * ${r}u`,w=`f32(${v.getByOffset(D)})`,f=r===2?`f32(${v.getByOffset(`${D} + 1u`)})`:"0.0";return`vec2<f32>(${w}, ${f})`},S;if(a&&s){let A=Math.floor(n/2)+1,D=n%2===0?`select(provided, provided - 1u, provided == ${A}u)`:"provided";S=`
    let provided = min(uniforms.signalLength, ${A}u);
    for (var i = local_idx; i < ${n}u; i += ${qt}u) {
      if (i < provided) { smem[i] = ${T("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${D}; k += ${qt}u) {
      let h = smem[k];
      smem[${n}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else S=`
    let loadCount = min(uniforms.signalLength, ${n}u);
    for (var i = local_idx; i < ${n}u; i += ${qt}u) {
      if (i < loadCount) { smem[i] = ${T("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:k,resultOffset:_}=Jp(c,n,u),I=d===1?`smem[${_}u + i]`:`smem[${_}u + i] * ${on(d)}`,C=i===2?b.setByOffset("off + 1u",`${o}(v.y)`):"";return`
  ${Da(g,v,b)}
  var<workgroup> smem: array<vec2<f32>, ${2*jr}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${g.mainStart(qt)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${r}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${i}u;
    ${S}
${k}    for (var i = local_idx; i < uniforms.outputLength; i += ${qt}u) {
      let v = ${I};
      let off = outBase + i * uniforms.inner * ${i}u;
      ${b.setByOffset("off",`${o}(v.x)`)}
      ${C}
    }
  }`};return{name:"DFT",shaderCache:{hint:Oa(e,"fft"),inputDependencies:["type"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:Ra(e),dispatchGroup:{x:e.batch}})}},nc=e=>{let{dataType:t,length:n,inputComponents:r,outputComponents:i,inverse:a,onesided:s}=e,o=Ve(t),u=a?1:-1,d=a?1/n:1,c=h=>{let g=L("x",t,[1]),v=re("y",t,[1]),b=I=>{let C=`inBase + (${I}) * uniforms.inner * ${r}u`,A=`f32(${g.getByOffset(C)})`,D=r===2?`f32(${g.getByOffset(`${C} + 1u`)})`:"0.0";return`vec2<f32>(${A}, ${D})`},T=a&&s?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(n/2)+1}u);
    if (k < provided) { return ${b("k")}; }
    let m = ${n}u - k;
    if (m < provided) {
      let h = ${b("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${b("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,S=`
      let angle = ${on(u*Fi)} * f32(knMod) / ${on(n)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${n}u) { knMod -= ${n}u; }`,k=i===2?v.setByOffset("off + 1u",`${o}(v.y)`):"",_=d===1?"acc":`acc * ${on(d)}`;return`
  ${Da(h,g,v)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${T}
  ${h.mainStart(qt)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${r}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${i}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${qt}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${n}u; n++) {${S}
      }
      let v = ${_};
      let off = outBase + k * uniforms.inner * ${i}u;
      ${v.setByOffset("off",`${o}(v.x)`)}
      ${k}
    }
  }`};return{name:"DFT",shaderCache:{hint:Oa(e,"direct"),inputDependencies:["type"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:Ra(e),dispatchGroup:{x:e.batch}})}},Na=e=>{if(!e||e.dataType===0)return;if(U.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},rc=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let n=t[t.length-1];if(n!==1&&n!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},h0=(e,t)=>{rc(e.inputs);let n=e.inputs[0],r=n.dims.length,i=t.inverse!==0,a=t.onesided!==0,s=Na(e.inputs[1]);if(s!==void 0&&s<=0)throw new Error("dft_length must be greater than zero.");let o=U.normalizeAxis(Na(e.inputs[2])??t.axis,r);if(o===r-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(i&&a&&n.dims[r-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let u=ec(n,o,i,a,s);if(u.length<=0)throw new Error(`Invalid DFT length: ${u.length}`);let d=u.length<=jr&&za(u.length)!==void 0?tc(u):nc(u);e.compute(d,{inputs:[0]})},m0=e=>Ee({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),Gi,Kr,Ma,ic,sc,ac,oc,Pa,uc,g0,y0,nb=K(()=>{"use strict";ae(),ue(),Re(),le(),Gi="[a-zA-Z]|\\.\\.\\.",Kr="("+Gi+")+",Ma="^"+Kr+"$",ic="("+Kr+",)*"+Kr,sc="^"+ic+"$",ac=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},oc=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,r]=t.includes("->")?t.split("->",2):[t,""];if(!n.match(RegExp(sc)))throw new Error("Invalid LHS term");if(n.split(",").forEach((i,a)=>{let s=e[a].dims.slice();if(!i.match(RegExp(Ma)))throw new Error("Invalid LHS term");let o=this.processTerm(i,!0,s,a);this.lhs.push(o)}),r==="")r+=[...this.symbolToInfo.entries()].filter(([i,a])=>a.count===1||i==="...").map(([i])=>i).join("");else if(!r.match(RegExp(Kr)))throw new Error("Invalid RHS");r.match(RegExp(Gi,"g"))?.forEach(i=>{if(i==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let a=this.symbolToInfo.get(i);if(a===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(a.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,n){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw new Error("Dimension mismatch");r.count++,r.inputIndices.push(n)}else r={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,r)}processTerm(e,t,n,r=-1){let i=n.length,a=!1,s=[],o=0;if(!e.match(RegExp(Ma))&&!t&&e!=="")throw new Error("Invalid LHS term");let u=e.match(RegExp(Gi,"g")),d=new ac(r);return u?.forEach((c,h)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let g=i-u.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(s=n.slice(o,o+g),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let v=0;v<s.length;v++){let b=String.fromCharCode(48+v);d.addSymbol(b,h+v),this.addSymbol(b,n[o++],r)}}else d.addSymbol(c,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,n[o++],r)}),d}},Pa=e=>e+"_max",uc=(e,t,n,r)=>{let i=e.map(d=>d.length).map((d,c)=>L(`input${c}`,t,d)),a=U.size(r),s=re("output",t,r.length),o=[...n.symbolToInfo.keys()].filter(d=>!n.rhs.symbolToIndices.has(d)),u=d=>{let c=[],h="var prod = 1.0;",g="var sum = 0.0;",v="sum += prod;",b=[],T=[],S=[],k=[],_=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((C,A)=>{if(n.rhs.symbolToIndices.has(A)){let D=n.rhs.symbolToIndices.get(A)?.[0];D!==void 0&&n.lhs.forEach((w,f)=>{if(C.inputIndices.includes(f)){let $=w.symbolToIndices.get(A);if($===void 0)throw new Error("Invalid symbol error");$.forEach(E=>{c.push(`${i[f].indicesSet(`input${f}Indices`,E,s.indicesGet("outputIndices",D))}`)})}})}else n.lhs.forEach((D,w)=>{if(C.inputIndices.includes(w)){let f=D.symbolToIndices.get(A);if(f===void 0)throw new Error("Invalid symbol error");f.forEach($=>{b.push(`${i[w].indicesSet(`input${w}Indices`,$,`${A}`)}`)}),k.push(`prod *= ${i[w].getByIndices(`input${w}Indices`)};`)}}),T.push(`for(var ${A}: u32 = 0; ${A} < uniforms.${Pa(A)}; ${A}++) {`),S.push("}")});let I=_?[...c,`let sum = ${i.map((C,A)=>C.getByIndices(`input${A}Indices`)).join(" * ")};`]:[...c,g,...T,...b,h,...k,v,...S];return`
            ${d.registerUniforms(o.map(C=>({name:`${Pa(C)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((C,A)=>`var input${A}Indices: ${i[A].type.indices};`).join(`
`)}
            ${I.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=o.filter(h=>n.symbolToInfo.has(h)).map(h=>({type:12,data:n.symbolToInfo.get(h)?.dimValue||0}));d.push({type:12,data:a});let c=e.map((h,g)=>[...se(h)]).reduce((h,g)=>h.concat(g),d);return c.push(...se(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:u}},g0=(e,t)=>{let n=new oc(e.inputs,t.equation),r=n.outputDims,i=e.inputs.map((a,s)=>a.dims);e.compute(uc(i,e.inputs[0].dataType,n,r))},y0=e=>{let t=e.equation.replace(/\s+/g,"");return Ee({equation:t})}}),lc,Ba,dc,fc,w0,rb=K(()=>{"use strict";ae(),ue(),le(),lc=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,i=t.length<n.length?0:t.length-n.length;for(;r<n.length&&i<t.length;++r,++i)if(n[r]!==t[i]&&n[r]!==1&&t[i]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Ba=(e,t)=>{let n=e.length-t.length,r=[];for(let i=0;i<n;++i)r.push(e[i]);for(let i=0;i<t.length;++i)r.push(t[i]===1?e[i+n]:t[i]);return r},dc=(e,t)=>e.length>t.length?Ba(e,t):Ba(t,e),fc=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=dc(t,n),i=e[0].dataType,a=i===9||U.size(t)===1,s=i===9||t.length>0&&t[t.length-1]%4===0?4:1,o=a||r.length>0&&r[r.length-1]%4===0?4:1,u=Math.ceil(U.size(r)/o),d=h=>{let g=L("input",i,t.length,s),v=re("output",i,r.length,o),b;if(i===9){let T=(S,k,_="")=>`
          let outputIndices${k} = ${v.offsetToIndices(`outputOffset + ${k}u`)};
          let offset${k} = ${g.broadcastedIndicesToOffset(`outputIndices${k}`,v)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${S}[${k}] = ${_}(${g.getByOffset(`index${k}`)}[component${k}]);
        `;b=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${T("data",0,"u32")}
        ${T("data",1,"u32")}
        ${T("data",2,"u32")}
        ${T("data",3,"u32")}
        ${v.setByOffset("global_idx","data")}
      }`}else b=`
        let outputIndices = ${v.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",v)};
        let data = ${v.type.value}(${g.getByOffset(`inputOffset / ${s}`)});
        ${v.setByOffset("global_idx","data")}
      }`;return`
    ${h.registerUniform("vec_size","u32").declareVariables(g,v)}
    ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${b}`},c=[{type:12,data:u},...se(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${s}${o}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c})}},w0=e=>{lc(e.inputs),e.compute(fc(e.inputs),{inputs:[0]})}}),pc,$0,ib=K(()=>{"use strict";ae(),ue(),le(),Bo(),pc=e=>{let t=e[0].dataType,n=U.size(e[0].dims),r=U.size(e[1].dims),i=r%4===0,a=s=>{let o=L("x",t,[1],4),u=L("bias",t,[1],4),d=re("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],h=v=>`
      let bias${v}_offset: u32 = (global_idx * 4 + ${v}) % uniforms.bias_size;
      let bias${v} = ${u.getByOffset(`bias${v}_offset / 4`)}[bias${v}_offset % 4];`,g=i?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(o,u,d)}

    ${fo(Ve(t))}

    ${s.mainStart(er)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",po("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/er/4)}})}},$0=e=>{e.inputs.length<2||U.size(e.inputs[1].dims)===0?Pg(e):e.compute(pc(e.inputs))}}),cc,hc,v0,b0,sb=K(()=>{"use strict";ae(),ue(),Re(),le(),cc=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},hc=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=U.normalizeAxis(t.axis,i),s=n.slice(0);s.splice(a,1,...r);let o=n[a],u=e[0].dataType===9?4:1,d=Math.ceil(U.size(s)/u),c=[{type:12,data:d},{type:6,data:o},{type:12,data:a},...se(e[0].dims,e[1].dims,s)],h=g=>{let v=L("data",e[0].dataType,e[0].dims.length,u),b=L("inputIndices",e[1].dataType,e[1].dims.length),T=re("output",e[0].dataType,s.length,u),S=_=>{let I=r.length,C=`var indicesIndices${_}  = ${b.type.indices}(0);`;for(let A=0;A<I;A++)C+=`${I>1?`indicesIndices${_}[${A}]`:`indicesIndices${_}`} = ${s.length>1?`outputIndices${_}[uniforms.axis + ${A}]`:`outputIndices${_}`};`;C+=`
          var idx${_} = ${b.getByIndices(`indicesIndices${_}`)};
          if (idx${_} < 0) {
            idx${_} = idx${_} + uniforms.axisDimLimit;
          }
          var dataIndices${_} : ${v.type.indices};
        `;for(let A=0,D=0;A<i;A++)A===a?(C+=`${i>1?`dataIndices${_}[${A}]`:`dataIndices${_}`} = u32(idx${_});`,D+=I):(C+=`${i>1?`dataIndices${_}[${A}]`:`dataIndices${_}`} = ${s.length>1?`outputIndices${_}[${D}]`:`outputIndices${_}`};`,D++);return C},k;if(e[0].dataType===9){let _=(I,C,A="")=>`
          let outputIndices${C} = ${T.offsetToIndices(`outputOffset + ${C}u`)};
          ${S(C)};
          let offset${C} = ${v.indicesToOffset(`dataIndices${C}`)};
          let index${C} = offset${C} / 4u;
          let component${C} = offset${C} % 4u;
          ${I}[${C}] = ${A}(${v.getByOffset(`index${C}`)}[component${C}]);
        `;k=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${_("value",0,"u32")}
        ${_("value",1,"u32")}
        ${_("value",2,"u32")}
        ${_("value",3,"u32")}
        ${T.setByOffset("global_idx","value")}
      `}else k=`
      let outputIndices = ${T.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${v.getByIndices("dataIndices")};
      ${T.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(v,b,T)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${k}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:h}},v0=e=>Ee({axis:e.axis}),b0=(e,t)=>{let n=e.inputs;cc(n),e.compute(hc(e.inputs,t))}}),mc,_0,k0,ab=K(()=>{"use strict";ae(),ue(),le(),mc=(e,t,n,r,i,a,s,o,u)=>{let d=[{type:12,data:a},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:s},{type:12,data:o},{type:12,data:u}],c=[a];d.push(...se(t.dims,c));let h=g=>{let v=L("indices_data",t.dataType,t.dims.length),b=re("input_slice_offsets_data",12,1,1),T=[v,b],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:i.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(S).declareVariables(...T)}
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
      ${n.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${i.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:h},{inputs:[t],outputs:[-1]})[0]},_0=(e,t)=>{let n=e.inputs,r=n[0].dims,i=n[0].dataType,a=n[1].dims,s=a[a.length-1],o=U.sizeToDimension(a,a.length-1),u=U.sizeFromDimension(r,t.batchDims+s),d=U.sizeToDimension(r,t.batchDims),c=U.sizeFromDimension(r,t.batchDims),h=o/d,g=new Array(s),v=u;for(let C=0;C<s;++C)g[s-1-C]=v,v*=r[t.batchDims+s-1-C];let b=mc(e,n[1],g,t.batchDims,r,o,h,c,s),T=t.batchDims+s;if(T>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=a.slice(0,-1).concat(r.slice(T)),k=U.size(S),_=[{type:12,data:k},{type:12,data:u},...se(n[0].dims,b.dims,S)],I=C=>{let A=L("data",n[0].dataType,n[0].dims.length),D=L("slice_offsets",12,b.dims.length),w=re("output",n[0].dataType,S.length);return`
          ${C.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(A,D,w)}
            ${C.mainStart()}
            ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:i}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:_}),getShaderSource:I},{inputs:[n[0],b]})},k0=e=>({batchDims:e.batch_dims,cacheKey:""})}),gc,yc,x0,E0,ob=K(()=>{"use strict";ae(),ue(),Re(),le(),gc=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=U.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,i=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==i.dims.length||!i.dims.map((o,u)=>u===n?Math.ceil(o/r)===a.dims[u]:o===a.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==i.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((o,u)=>o===a.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},yc=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=U.normalizeAxis(t.gatherAxis,i),s=U.normalizeAxis(t.quantizeAxis,i),o=n.slice(0);o.splice(a,1,...r);let u=U.size(o),d=e[2].dataType,c=e[0].dataType===22,h=[{type:12,data:u},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...se(...e.map((v,b)=>v.dims),o)],g=v=>{let b=L("data",e[0].dataType,e[0].dims.length),T=L("inputIndices",e[1].dataType,e[1].dims.length),S=L("scales",e[2].dataType,e[2].dims.length),k=e.length>3?L("zeroPoint",e[3].dataType,e[3].dims.length):void 0,_=re("output",d,o.length),I=[b,T,S];k&&I.push(k);let C=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${v.registerUniforms(C).declareVariables(...I,_)}
        ${v.mainStart()}
        let output_indices = ${_.offsetToIndices("global_idx")};
        var indices_indices = ${T.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${_.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${T.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${_.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${b.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${_.indicesGet("output_indices","i")};
          ${b.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${T.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[a]};
        }
        ${b.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${_.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${b.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${b.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${b.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${S.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${S.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${S.getByIndices("scale_indices")};
        ${k?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${k.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${k.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ve(d)}(quantized_data - zero_point) * scale;
        ${_.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((v,b)=>b!==1).map(v=>v.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(v,b)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:d}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h}),getShaderSource:g}},x0=(e,t)=>{let n=e.inputs;gc(n,t),e.compute(yc(e.inputs,t))},E0=e=>Ee({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),wc,$c,T0,S0,ub=K(()=>{"use strict";ae(),ue(),Re(),le(),wc=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},$c=(e,t)=>{let n=e[0].dims,r=e[0].dataType,i=n.length,a=e[1].dims,s=e[1].dataType,o=U.normalizeAxis(t.axis,i),u=n[o],d=a.slice(0),c=U.size(d),h=L("input",r,i),g=L("indicesInput",s,a.length),v=re("output",r,d.length),b=[{type:12,data:c},{type:6,data:u},{type:12,data:o}];return b.push(...se(n,a,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:b}),getShaderSource:T=>`
      ${T.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,g,v)}
      ${T.mainStart()}
      ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${v.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${v.setByOffset("global_idx","value")};
  }`}},T0=e=>Ee({axis:e.axis}),S0=(e,t)=>{let n=e.inputs;wc(n),e.compute($c(e.inputs,t))}}),vc,bc,I0,C0,lb=K(()=>{"use strict";ae(),ue(),le(),vc=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},bc=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[i,a,s]=km.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),o=[i,a];if(!o)throw new Error("Can't use gemm on the given tensors");let u=16,d=Math.ceil(a/u),c=Math.ceil(i/u),h=!0,g=U.size(o),v=[{type:12,data:h?d:g},{type:12,data:i},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],b=["type","type"];e.length===3&&(v.push(...se(e[2].dims)),b.push("rank")),v.push(...se(o));let T=k=>{let _="";t.transA&&t.transB?_="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?_="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?_="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(_="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=t.alpha===1?"":"value *= uniforms.alpha;",C=L("a",e[0].dataType,e[0].dims),A=L("b",e[1].dataType,e[1].dims),D=C.type.value,w=null,f=[C,A];e.length===3&&(w=L("c",e[2].dataType,e[2].dims.length),f.push(w));let $=re("output",e[0].dataType,o.length);f.push($);let E=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${k.registerUniforms(E).declareVariables(...f)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${D}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${_}
    }

    ${I}
    ${w!=null?`let cOffset = ${w.broadcastedIndicesToOffset("vec2(m, n)",$)}; value += ${D}(uniforms.beta) * ${w.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=k=>{let _=L("a",e[0].dataType,e[0].dims),I=L("b",e[1].dataType,e[1].dims),C=null,A=[_,I];e.length===3&&(C=L("c",e[2].dataType,e[2].dims.length),A.push(C));let D=re("output",e[0].dataType,o.length);A.push(D);let w=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],f="",$="";t.transA&&t.transB?($=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,f="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?($=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,f="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?($=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,f="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&($=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,f="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let E=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${k.registerUniforms(w).declareVariables(...A)}
  var<workgroup> tile_a: array<array<${_.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${u}>, ${u}>;
  ${k.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${D.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${$}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${f}
      }
      workgroupBarrier();
    }

    ${E}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${C!=null?`let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)",D)}; value += ${D.type.value}(uniforms.beta) * ${C.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return h?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:d*c},programUniforms:v}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:v}),getShaderSource:T}},I0=e=>{let t=e.transA,n=e.transB,r=e.alpha,i=e.beta;return{transA:t,transB:n,alpha:r,beta:i,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},C0=(e,t)=>{vc(e.inputs),e.compute(bc(e.inputs,t))}}),At,Ft,En,Tn,_c,kc,xc,Ec,Tc,Sc,Ic,Cc,A0,z0,db=K(()=>{"use strict";ae(),ue(),Re(),le(),[At,Ft,En,Tn]=[0,1,2,3],_c=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},kc=`
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
`,xc=e=>`
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
`,Ec=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Tc=e=>`
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
`,Sc=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${At}] = batch;
     indices[${Ft}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${En}] = u32(r);
            indices[${Tn}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${En}] = u32(clamp(r, 0, H - 1));
          indices[${Tn}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${En}] = gs_reflect(r, border[1], border[3]);
          indices[${Tn}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Ic=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${At}], indices[${Ft}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${At}], indices[${Ft}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${At}], indices[${Ft}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${At}], indices[${Ft}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${At}], indices[${Ft}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${At}], indices[${Ft}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Cc=(e,t)=>{let n=L("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=L("grid",e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[At,Ft,En,Tn]=[0,3,1,2]);let s=re("output",e[0].dataType,a.length),o=n.type.value,u=U.size(a),d=[{type:12,data:u},...se(e[0].dims,r,a)],c=h=>`
  ${h.registerUniform("output_size","u32").declareVariables(n,i,s)}
  ${kc}
  ${xc(o)}
  ${Ec(t)}
  ${Tc(t)}
  ${Sc(n,o,t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${En}]);
      let W_in = i32(uniforms.x_shape[${Tn}]);

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

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${At}], indices[${En}], indices[${Tn}]);
      let nxy = ${i.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Ic(s,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:h=>{let g=U.size(a);return{outputs:[{dims:a,dataType:h[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:d}},getShaderSource:c}},A0=(e,t)=>{_c(e.inputs),e.compute(Cc(e.inputs,t))},z0=e=>Ee({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ye,Ac,O0,Ua,zc,ni,R0,D0=K(()=>{"use strict";ae(),ue(),Re(),Do(),Po(),le(),fn(),Ye=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Ac=(e,t)=>{let n=e[0],r=Ye(e,1),i=Ye(e,2),a=Ye(e,3),s=Ye(e,4),o=Ye(e,5),u=Ye(e,6),d=Ye(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=n.dims[0],h=n.dims[1],g=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],v=h,b=0,T=0,S=Math.floor(g/t.numHeads);if(u&&d&&U.size(u.dims)&&U.size(d.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==c||d.dims[1]!==t.numHeads||d.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=u.dims[2],T=u.dims[2]}else if(u&&U.size(u.dims)||d&&U.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let k;if(r&&U.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');k=2,v=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');k=5,v=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');k=0,v=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');k=3}if(a&&U.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let _=b+v,I=0;if(s&&U.size(s.dims)>0){I=8;let w=s.dims;throw w.length===1?w[0]===c?I=1:w[0]===3*c+2&&(I=3):w.length===2&&w[0]===c&&w[1]===_&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let C=!1,A=g;if(i&&U.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(v!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=i.dims[2]}else{if(v!==i.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');A=i.dims[1]*i.dims[3],C=!0}}let D=!1;if(s&&U.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(o&&U.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==c||o.dims[1]!==t.numHeads||o.dims[2]!==h||o.dims[3]!==_)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:h,pastSequenceLength:b,kvSequenceLength:v,totalSequenceLength:_,maxSequenceLength:T,inputHiddenSize:0,hiddenSize:g,vHiddenSize:A,headSize:S,vHeadSize:Math.floor(A/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:I,scale:t.scale,broadcastResPosBias:D,passPastInKv:C,qkvFormat:k}},O0=e=>Ee({...e}),Ua=Ee({perm:[0,2,1,3]}),zc=(e,t,n,r,i,a,s)=>{let o=[r,i,a],u=U.size(o),d=[{type:12,data:u},{type:12,data:s},{type:12,data:a}],c=h=>{let g=re("qkv_with_bias",t.dataType,o),v=L("qkv",t.dataType,o),b=L("bias",n.dataType,o),T=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${h.registerUniforms(T).declareVariables(v,b,g)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c},{inputs:[t,n],outputs:[-1]})[0]},ni=(e,t,n,r,i,a,s,o)=>{let u=a;if(s&&U.size(s.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=zc(e,a,s,t,r,n*i,o),u=u.reshape([t,r,n,i]),n===1||r===1?u:e.compute(it(u,Ua.perm),{inputs:[u],outputs:[-1]})[0]}else return a.dims.length===3&&(u=a.reshape([t,r,n,i])),n===1||r===1?u:e.compute(it(u,Ua.perm),{inputs:[u],outputs:[-1]})[0]},R0=(e,t)=>{let n=Ac(e.inputs,t),r=e.inputs[0],i=Ye(e.inputs,1),a=Ye(e.inputs,2),s=Ye(e.inputs,3),o=Ye(e.inputs,4),u=Ye(e.inputs,5),d=Ye(e.inputs,6),c=Ye(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if(i?.dims.length===5)throw new Error("Packed KV is not implemented");let h=i&&a&&i.dims.length===4&&a.dims.length===4,g=ni(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,s,0);if(h)return si(e,g,i,a,o,void 0,d,c,u,n);if(!i||!a)throw new Error("key and value must be provided");let v=ni(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,i,s,n.hiddenSize),b=ni(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,s,2*n.hiddenSize);si(e,g,v,b,o,void 0,d,c,u,n)}}),Oc,Rc,Dc,Nc,yo,N0,M0,P0=K(()=>{"use strict";ae(),ue(),Re(),le(),Oc=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Rc=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(i=>n.push(Number(i))),r=n.length),Ee({numOutputs:r,axis:t.axis,splitSizes:n})},Dc=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${ie("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Nc=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let i=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(i):r===0?n.push(`if (output_number == ${r}u) { ${i} }`):r===t-1?n.push(`else { ${i} }`):n.push(`else if (output_number == ${r}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},yo=(e,t)=>{let n=e[0].dims,r=U.size(n),i=e[0].dataType,a=U.normalizeAxis(t.axis,n.length),s=new Array(t.numOutputs),o=L("input",i,n.length),u=new Array(t.numOutputs),d=[],c=[],h=0,g=[{type:12,data:r}];for(let b=0;b<t.numOutputs;b++){h+=t.splitSizes[b],u[b]=h;let T=n.slice();T[a]=t.splitSizes[b],c.push(T),s[b]=re(`output${b}`,i,T.length),d.push({dims:c[b],dataType:e[0].dataType})}g.push({type:12,data:u},...se(n,...c));let v=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(o,...s)}
  ${Dc(u.length)}
  ${Nc(s)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${ie("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${o.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:g})}},N0=(e,t)=>{Oc(e.inputs);let n=e.inputs.length===1?t:Rc(e.inputs,t);e.compute(yo(e.inputs,n),{inputs:[0]})},M0=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return Ee({axis:t,numOutputs:r,splitSizes:n})}}),Mc,rs,B0,U0=K(()=>{"use strict";ae(),ue(),Re(),le(),Mc=(e,t)=>{let[n,r,i,a]=e,{numHeads:s,rotaryEmbeddingDim:o}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!U.areEqual(r.dims,[])&&!U.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!U.areEqual(i.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],d=n.dims[n.dims.length-2],c=i.dims[0],h=U.sizeFromDimension(n.dims,1)/d,g=o===0?i.dims[1]*2:h/s;if(o>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(u!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(d!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(d>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(g/2!==i.dims[1]&&o/2!==i.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`)},rs=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:i,scale:a}=t,s=e[0].dims[0],o=U.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],d=o/u,c=e[2].dims[1],h=i===0?c*2:d/r,g=new Array(s,u,d/h,h-c),v=U.computeStrides(g),b=[{type:1,data:a},{type:12,data:g},{type:12,data:v},...e[0].dims.length===3?new Array({type:12,data:[o,d,h,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,h,u*h,1]}):[],...se(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],T=S=>{let k=L("input",e[0].dataType,e[0].dims.length),_=L("position_ids",e[1].dataType,e[1].dims.length),I=L("cos_cache",e[2].dataType,e[2].dims.length),C=L("sin_cache",e[3].dataType,e[3].dims.length),A=re("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:v.length},{name:"input_output_strides",type:"u32",length:v.length}]),`
        ${S.declareVariables(k,_,I,C,A)}

        ${S.mainStart(er)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${_.broadcastedIndicesToOffset("bsnh.xy",re("",_.type.tensor,2))};
            let position_id =
                u32(${_.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${k.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${k.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${A.setByOffset("i","re")}
            let im = ${k.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} +
                ${k.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${A.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${A.setByOffset("k",k.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:Ee({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:T,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(U.size(g)/er)},programUniforms:b})}},B0=(e,t)=>{Mc(e.inputs,t),e.compute(rs(e.inputs,t))}}),Pc,Bc,Wa,Uc,W0,fb=K(()=>{"use strict";Re(),ae(),Po(),D0(),P0(),fn(),U0(),le(),Pc=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],i=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,u=n.dims[0],d=n.dims[1],c=n.dims.length===3?o?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],h=d,g=0,v=!r||r.dims.length===0,b=Math.floor(v?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);v&&(c=b*t.numHeads);let T=a&&a.dims.length!==0,S=s&&s.dims.length!==0;if(T&&a.dims.length===4&&a.dims[0]===u&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if(T&&S){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=a.dims[2]}else if(T||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let k=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');h=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');h=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');h=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');k=3}let _=0,I=!1,C=t.kvNumHeads?b*t.kvNumHeads:c;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(h!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=i.dims[2]}else{if(h!==i.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');C=i.dims[1]*i.dims[3],I=!0}}let A=e.length>4?e[5]:void 0;if(A){if(A.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let D=A.dims.reduce((w,f)=>w*f,1);if(D!==u)throw new Error(`seqlens_k must have batch_size (${u}) elements, got ${D}.`);for(let w=0;w<A.dims.length;w++)if(A.dims[w]!==1&&A.dims[w]!==u)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${u}), got dims[${w}] = ${A.dims[w]}.`)}return{batchSize:u,sequenceLength:d,pastSequenceLength:g,kvSequenceLength:h,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:C,headSize:b,vHeadSize:Math.floor(C/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:I,qkvFormat:k}},Bc=Ee({perm:[0,2,1,3]}),Wa=(e,t,n)=>{let r=t,i=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,i,n.headSize]),r=e.compute(it(r,Bc.perm),{inputs:[r],outputs:[-1]})[0]),r},Uc=(e,t,n,r)=>{let i=7,a=["type","type"],s=[e*t],o=e*t,u=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],d=c=>{let h=L("seq_lens",n.dataType,n.dims),g=L("total_seq_lens",r.dataType,r.dims),v=re("pos_ids",i,s),b=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(b).declareVariables(h,g,v)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${h.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${v.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${v.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${v.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:d}},W0=(e,t)=>{if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let n=Pc(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,c=n.kvNumHeads?n.kvNumHeads:n.numHeads,h=Ee({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,c*n.headSize,c*n.headSize]}),[g,v,b]=!i&&!a?e.compute(yo([r],h),{inputs:[r],outputs:[-1,-1,-1]}):[r,i,a],T,S;if(t.doRotary){let C=e.compute(Uc(n.batchSize,n.sequenceLength,u,d),{inputs:[u,d],outputs:[-1]})[0],A=e.inputs[7],D=e.inputs[8],w=Ee({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),f=[g,C,A,D],$=[-1];T=e.compute(rs(f,w),{inputs:f,outputs:$})[0],f.splice(0,1,v);let E=Ee({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});S=e.compute(rs(f,E),{inputs:f,outputs:$})[0]}let k=ni(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?T:g,void 0,0),_=Wa(e,t.doRotary?S:v,n),I=Wa(e,b,n);si(e,k,_,I,void 0,void 0,s,o,void 0,n,u,d)}}),La,Wc,Lc,L0,pb=K(()=>{"use strict";ae(),ue(),fn(),le(),La=(e,t,n,r,i,a,s,o)=>{let u=Oe(a),d=u===1?"f32":`vec${u}f`,c=u===1?"vec2f":`mat2x${u}f`,h=i*s,g=64;h===1&&(g=256);let v=[i,s,a/u],b=[i,s,2],T=["rank","type","type"],S=[];S.push(...se(v,b));let k=_=>{let I=L("x",t.dataType,3,u),C=L("scale",n.dataType,n.dims),A=L("bias",r.dataType,r.dims),D=re("output",1,3,2),w=[I,C,A,D];return`
  var<workgroup> workgroup_shared : array<${c}, ${g}>;
  const workgroup_size = ${g}u;
  ${_.declareVariables(...w)}
  ${_.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${I.get("batch","channel","h")});
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
      let sum_final = ${dn("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${dn("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${o};${g}`,inputDependencies:T},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:h},programUniforms:S}),getShaderSource:k},{inputs:[t,n,r],outputs:[-1]})[0]},Wc=(e,t,n)=>{let r=t[0].dims,i=r,a=2,s=r[0],o=r[1],u=U.sizeFromDimension(r,a),d=Oe(u),c=U.size(i)/d,h=La(e,t[0],t[1],t[2],s,u,o,n.epsilon),g=[s,o,u/d],v=[s,o],b=["type","none"],T=S=>{let k=L("x",t[0].dataType,g.length,d),_=L("scale_shift",1,v.length,2),I=re("output",t[0].dataType,g.length,d),C=[k,_,I];return`
  ${S.registerUniform("output_size","u32").declareVariables(...C)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${_.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${k.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...se(g,v,g)]}),getShaderSource:T},{inputs:[t[0],h]})},Lc=(e,t,n)=>{let r=t[0].dims,i=r,a=r[0],s=r[r.length-1],o=U.sizeFromDimension(r,1)/s,u=Oe(s),d=U.size(i)/u,c=[{type:12,data:o},{type:12,data:Math.floor(s/u)}],h=["type","type"],g=!1,v=[0,r.length-1];for(let k=0;k<r.length-2;k++)g=g||r[k+1]!==1,v.push(k+1);g=g&&r[r.length-1]!==1;let b=g?e.compute(it(e.inputs[0],v),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(k,_)=>r[v[_]])),T=La(e,b,t[1],t[2],a,o,s,n.epsilon),S=k=>{let _=qe(t[0].dataType),I=u===1?"vec2f":`mat${u}x2f`,C=w=>{let f=w===0?"x":"y",$=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${_}(${$}(scale.${f}))`;case 2:return`vec2<${_}>(${$}(scale[0].${f}, scale[1].${f}))`;case 4:return`vec4<${_}>(${$}(scale[0].${f}, scale[1].${f}, scale[2].${f}, scale[3].${f}))`;default:throw new Error(`Not supported compoents ${u}`)}},A=L("input",t[0].dataType,t[0].dims,u),D=re("output",t[0].dataType,i,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${A.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${D.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${k.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${C(0)}, ${C(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:S},{inputs:[t[0],T]})},L0=(e,t)=>{t.format==="NHWC"?Lc(e,e.inputs,t):Wc(e,e.inputs,t)}}),Vc,qc,V0,cb=K(()=>{"use strict";ae(),ue(),le(),Vc=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},qc=(e,t,n)=>{let r=t.simplified,i=e[0].dims,a=e[1],s=!r&&e[2],o=i,u=U.normalizeAxis(t.axis,i.length),d=U.sizeToDimension(i,u),c=U.sizeFromDimension(i,u),h=U.size(a.dims),g=s?U.size(s.dims):0;if(h!==c||s&&g!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${g}`);let v=[];for(let A=0;A<i.length;++A)A<u?v.push(i[A]):v.push(1);let b=Oe(c),T=["type","type"],S=[{type:12,data:d},{type:1,data:c},{type:12,data:Math.floor(c/b)},{type:1,data:t.epsilon}];s&&T.push("type");let k=n>1,_=n>2,I=A=>{let D=qe(e[0].dataType),w=[L("x",e[0].dataType,e[0].dims,b),L("scale",a.dataType,a.dims,b)];s&&w.push(L("bias",s.dataType,s.dims,b)),w.push(re("output",e[0].dataType,o,b)),k&&w.push(re("mean_data_output",1,v)),_&&w.push(re("inv_std_output",1,v));let f=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${A.registerUniforms(f).declareVariables(...w)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${oo("f32",b)};
    var mean_square_vector = ${oo("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Qn(D,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${dn("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${dn("mean_square_vector",b)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Qn(D,b,"x[j + offset]")};
      let f32scale = ${Qn(D,b,"scale[j]")};
      output[j + offset] = ${w[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Qn(D,b,"bias[j]")}`:""}
      );
    }

    ${k?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},C=[{dims:o,dataType:e[0].dataType}];return k&&C.push({dims:v,dataType:1}),_&&C.push({dims:v,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${n};${r}`,inputDependencies:T},getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:S}),getShaderSource:I}},V0=(e,t)=>{Vc(e.inputs),e.compute(qc(e.inputs,t,e.outputCount))}}),Fc,q0,hb=K(()=>{"use strict";ue(),Vo(),qo(),Fc=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},q0=e=>{Fc(e.inputs);let t=Jn.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(Lo(e.inputs,{activation:""},t));else{let i=t[t.length-2],a=U.size(e.inputs[0].dims.slice(0,-2)),s=U.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&i===1&&s===1){let o=e.inputs[0].reshape([1,a,r]),u=e.inputs[1].reshape([1,r,n]),d=[1,a,n],c=[o,u];e.compute(ns(c,{activation:""},t,d),{inputs:c})}else e.compute(ns(e.inputs,{activation:""},t))}}}),Gc,Hc,jc,F0,G0,mb=K(()=>{"use strict";ae(),ue(),Re(),le(),Gc=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!U.areEqual(s.dims,[t.n,i,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(U.size(o)!==t.n*i)throw new Error("scales input size error.");if(e.length===4){let u=e[3].dims,d=t.n*(t.bits===8?i:Math.floor((i*t.bits+7)/8));if(U.size(u)!==d)throw new Error("zeroPoints input size error.")}},Hc=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,s=t.n,o=n.slice(0,r-2),u=U.size(o),d=e[1].dims[2]/4,c=e[0].dataType,h=Oe(t.k),g=Oe(d),v=Oe(s),b=o.concat([i,s]),T=i>1&&s/v%2===0?2:1,S=U.size(b)/v/T,k=64,_=[],I=[u,i,a/h],C=U.convertShape(e[1].dims).slice();C.splice(-1,1,d/g),_.push(...se(I)),_.push(...se(C)),_.push(...se(e[2].dims)),e.length===4&&_.push(...se(U.convertShape(e[3].dims)));let A=[u,i,s/v];_.push(...se(A));let D=w=>{let f=I.length,$=L("a",e[0].dataType,f,h),E=L("b",12,C.length,g),z=L("scales",e[2].dataType,e[2].dims.length),N=[$,E,z],B=e.length===4?L("zero_points",12,e[3].dims.length):void 0;B&&N.push(B);let F=A.length,R=re("output",e[0].dataType,F,v),j=qe(e[0].dataType),q=(()=>{switch(h){case 1:return`array<${j}, 8>`;case 2:return`mat4x2<${j}>`;case 4:return`mat2x4<${j}>`;default:throw new Error(`${h}-component is not supported.`)}})(),oe=Math.floor(32/t.bits),H=Math.floor(oe/8),ee=()=>{let Y="";for(let G=0;G<H;G++){let he=G*t.bits*4,Q=he+t.bits;Y+=`
          // reuse a data (pass ${G})
            var input_offset${G>0?G:""} = ${G===0?$.indicesToOffset(`${$.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${G>0?G:""}: ${q};
            for (var j${G>0?G:""}: u32 = 0; j${G>0?G:""} < ${8/h}; j${G>0?G:""}++) {
              a_data${G>0?G:""}[j${G>0?G:""}] = ${$.getByOffset(`input_offset${G>0?G:""}`)};
              input_offset${G>0?G:""}++;
            }
          `;for(let be=0;be<v*T;be++)Y+=`
            b_value = ${g===1?`b${be}_data`:`b${be}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${G*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${he}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Q}u) & b_mask);`}
            b_quantized_values = ${q}(${Array.from({length:4},(me,De)=>`${j}(b_value_lower[${De}]), ${j}(b_value_upper[${De}])`).join(", ")});
            b_dequantized_values = ${h===1?`${q}(${Array.from({length:8},(me,De)=>`(b_quantized_values[${De}] - ${B?`zero_point${be}`:"zero_point"}) * scale${be}`).join(", ")});`:`(b_quantized_values - ${q}(${Array(8).fill(`${B?`zero_point${be}`:"zero_point"}`).join(",")})) * scale${be};`};
            workgroup_shared[local_id.x * ${T} + ${Math.floor(be/v)}]${v>1?`[${be%v}]`:""} += ${Array.from({length:8/h},(me,De)=>`${h===1?`a_data${G>0?G:""}[${De}] * b_dequantized_values[${De}]`:`dot(a_data${G>0?G:""}[${De}], b_dequantized_values[${De}])`}`).join(" + ")};
          `}return Y},V=()=>{let Y=`
            var col_index = col * ${v};
            ${B?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${j}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let G=0;G<v*T;G++)Y+=`
            let scale${G} = ${z.getByOffset("col_index * nBlocksPerCol + block")};
            ${B?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${B.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${G} = ${j}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return Y},M=()=>{let Y=`col_index = col * ${v};`;for(let G=0;G<v*T;G++)Y+=`
            let b${G}_data = ${E.getByIndices(`${E.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Y+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${q};
            var b_dequantized_values: ${q};`,Y};return`
        var<workgroup> workgroup_shared: array<${R.type.value}, ${T*k}>;
        ${w.declareVariables(...N,R)}
        ${w.mainStart([k,1,1])}
          let output_indices = ${R.offsetToIndices(`(global_idx / ${k}) * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${k}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${V()}
            for (var word: u32 = 0; word < ${d}; word += ${g}) {
              ${M()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${ee()}
                word_offset += ${oe/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${T}) {
            var output_value: ${R.type.value} = ${R.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${k}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${T};
            }
            ${R.setByIndices(`${R.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${g};${v};${T};${k}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:c}],dispatchGroup:{x:S},programUniforms:_}),getShaderSource:D}},jc=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,s=t.n,o=n.slice(0,r-2),u=U.size(o),d=e[1].dims[2]/4,c=e[0].dataType,h=Oe(t.k),g=Oe(d),v=o.concat([i,s]),b=128,T=s%8===0?8:s%4===0?4:1,S=b/T,k=Math.floor(32/t.bits),_=S*g*k,I=_/h,C=_/t.blockSize,A=U.size(v)/T,D=[],w=[u,i,a/h],f=U.convertShape(e[1].dims).slice();f.splice(-1,1,d/g),D.push(...se(w)),D.push(...se(f)),D.push(...se(e[2].dims)),e.length===4&&D.push(...se(U.convertShape(e[3].dims)));let $=[u,i,s];D.push(...se($));let E=z=>{let N=w.length,B=L("a",e[0].dataType,N,h),F=L("b",12,f.length,g),R=L("scales",e[2].dataType,e[2].dims.length),j=[B,F,R],q=e.length===4?L("zero_points",12,e[3].dims.length):void 0;q&&j.push(q);let oe=$.length,H=re("output",e[0].dataType,oe),ee=qe(e[0].dataType),V=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${ee}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ee}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ee}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ee}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${B.type.value}, ${I}>;
        var<workgroup> inter_results: array<array<${H.type.value}, ${S}>, ${T}>;
        ${z.declareVariables(...j,H)}
        ${z.mainStart([S,T,1])}
          let output_indices = ${H.offsetToIndices(`workgroup_index * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${C} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${I};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${I}; a_offset += ${b})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${B.getByIndices(`${B.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${B.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${C} + local_id.x;
            ${q?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${q.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ee}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${ee}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${R.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${F.getByIndices(`${F.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${g}; i++) {
              let b_value = ${g===1?"b_data":"b_data[i]"};
              ${(()=>{let M=Math.floor(k/8),Y="";for(let G=0;G<M;G++){let he=G*t.bits*4,Q=he+t.bits;Y+=`
              ${V()}
              {${t.bits===2?`
                let half_word = b_value >> ${G*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${he}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Q}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${ee}>(${Array.from({length:4},(be,me)=>`${ee}(b_value_lower[${me}]), ${ee}(b_value_upper[${me}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${ee}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(be,me)=>`${`dot(a_data${me}, b_dequantized_values[${me}])`}`).join(" + ")};
              }
              word_offset += ${8/h};`}return Y})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${T}) {
            var output_value: ${H.type.value} = ${H.type.value}(0);
            for (var b = 0u; b < ${S}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${H.setByIndices(`${H.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${g};${S};${T}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:v,dataType:c}],dispatchGroup:{x:A},programUniforms:D}),getShaderSource:E}},F0=(e,t)=>{Gc(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(jc(e.inputs,t)):e.compute(Hc(e.inputs,t))},G0=e=>Ee(e)}),Kc,Yc,Zc,Xc,Qc,Jc,eh,th,H0,gb=K(()=>{"use strict";ae(),ue(),le(),Kc=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Yc=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
            k = i32(${e.indicesGet("indices",i)}) - ${ie("uniforms.pads",i,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${ie("uniforms.x_shape",i,t)})) {
              break;
            }
            offset += k * i32(${ie("uniforms.x_strides",i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},Zc=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet("indices",i)}) - ${ie("uniforms.pads",i,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${ie("uniforms.x_shape",i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${ie("uniforms.x_shape",i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${ie("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Xc=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet("indices",i)}) - ${ie("uniforms.pads",i,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${ie("uniforms.x_shape",i,t)})) {
                  k = i32(${ie("uniforms.x_shape",i,t)}) - 1;
                }
                offset += k * i32(${ie("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Qc=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet("indices",i)}) - ${ie("uniforms.pads",i,n)};
                if (k < 0)  {
                  k += i32(${ie("uniforms.x_shape",i,t)}]);
                }
                if (k >= i32(${ie("uniforms.x_shape",i,t)})) {
                  k -= i32(${ie("uniforms.x_shape",i,t)});
                }
                offset += k * i32(${ie("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Jc=(e,t,n)=>{switch(n.mode){case 0:return Yc(e,t,n.pads.length);case 1:return Zc(e,t,n.pads.length);case 2:return Xc(e,t,n.pads.length);case 3:return Qc(e,t,n.pads.length);default:throw new Error("Invalid mode")}},eh=(e,t)=>{let n=U.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,i=U.size(n),a=[{type:12,data:i},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...se(e[0].dims,n));let o=["rank"],u=d=>{let c=re("output",e[0].dataType,n.length),h=L("x",e[0].dataType,r.length),g=h.type.value,v=Jc(c,r.length,t),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&b.push({name:"constant_value",type:s?g:"f32"}),`
            ${d.registerUniforms(b).declareVariables(h,c)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${v}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(U.size(n)/64)},programUniforms:a}),getShaderSource:u}},th=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,a=new Int32Array(2*i).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let u=0;u<o.length;u++)a[Number(o[u])]=Number(n[u]),a[Number(o[u])+i]=Number(n[u+o.length])}else n.forEach((o,u)=>a[Number(u)]=Number(o));let s=[];return a.forEach(o=>s.push(o)),{mode:t.mode,value:r,pads:s}}else return t},H0=(e,t)=>{Kc(e.inputs);let n=th(e.inputs,t);e.compute(eh(e.inputs,n),{inputs:[0]})}}),Yr,Va,qa,Fa,Ga,nh,rh,Ha,ja,j0,K0,Ka,Y0,Z0,Ya,X0,Q0,J0,ey,yb=K(()=>{"use strict";st(),ae(),ue(),le(),Yr=e=>{if(Te.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Va=(e,t,n)=>{let r=t.format==="NHWC",i=e.dims.slice();r&&i.splice(1,0,i.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),o=t.strides.slice(),u=a?t.dilations.slice():[],d=t.pads.slice();es.adjustPoolAttributes(n,i,s,o,u,d);let c=es.computePoolOutputShape(n,i,o,u,s,d,t.autoPad,t.ceilMode),h=Object.assign({},t);a?Object.assign(h,{kernelShape:s,strides:o,pads:d,dilations:u,cacheKey:t.cacheKey}):Object.assign(h,{kernelShape:s,strides:o,pads:d,cacheKey:t.cacheKey});let g=c.slice();return g.push(g.splice(1,1)[0]),[h,r?g:c]},qa=(e,t)=>{let n=t.format==="NHWC",r=U.size(e),i=U.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:i}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],h=!!(d+c);a.push({type:12,data:o},{type:12,data:u},{type:12,data:d},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let v=t.kernelShape[t.kernelShape.length-2],b=t.strides[t.strides.length-2],T=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];g=!!(T+S),a.push({type:12,data:v},{type:12,data:b},{type:12,data:T},{type:12,data:S}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,h,g]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=U.computeStrides(t.kernelShape);a.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((d,c)=>d+c);return[a,s,!!u,!1,!1]}},Fa=(e,t,n,r,i,a,s,o,u,d,c,h)=>{let g=i.format==="NHWC",v=t.type.value,b=re("output",t.type.tensor,r);if(i.kernelShape.length<=2){let T="",S="",k="",_=n-(g?2:1);if(c?T=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${_}] < 0 || xIndices[${_}]
                      >= uniforms.x_shape[${_}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:T=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,i.kernelShape.length===2){let I=n-(g?3:2);h?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${I}] < 0 || xIndices[${I}] >= uniforms.x_shape[${I}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                `,k=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var value = ${v}(${o});
              var pad = 0;
              ${S}
              ${T}
              ${k}
              ${s}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let T=i.kernelShape.length,S=i.pads.length,k="";return d?k=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:k=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(u).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var offsets: array<u32, ${T}>;

              var value = ${v}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${T-1}u; j++) {
                  offsets[j] = offset / ${ie("uniforms.kernelStrides","j",T)};
                  offset -= offsets[j] * ${ie("uniforms.kernelStrides","j",T)};
                }
                offsets[${T-1}] = offset;

                isPad = false;
                for (var j = ${n-T}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${ie("uniforms.strides",`j - ${n-T}u`,T)}
                    + offsets[j - ${n-T}u] - ${ie("uniforms.pads","j - 2u",S)};
                  ${k}
              }
              ${s}

              output[global_idx] = value;
            }`}},Ga=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,nh=e=>`${Ga(e)};${e.countIncludePad}`,rh=e=>`${Ga(e)};${e.storageOrder};${e.dilations}`,Ha=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ja=(e,t,n,r)=>{let[i,a]=Va(t,r,n),s=L("x",t.dataType,t.dims.length),o=s.type.value,u="value += x_val;",d="";i.countIncludePad?d+=`value /= ${o}(uniforms.kernelSize);`:d+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[c,h,g,v,b]=qa(a,i);c.push(...se(t.dims,a));let T=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${g};${v};${b}`,inputDependencies:T},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(U.size(a)/64)},programUniforms:c}),getShaderSource:S=>Fa(S,s,t.dims.length,a.length,i,u,d,0,h,g,v,b)}},j0=e=>{let t=e.count_include_pad!==0,n=Ha(e);if(n.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:nh(r)}},K0=(e,t)=>{Yr(e.inputs),e.compute(ja("AveragePool",e.inputs[0],!1,t))},Ka={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Y0=e=>{let t=e.format;return{format:t,...Ka,cacheKey:t}},Z0=(e,t)=>{Yr(e.inputs),e.compute(ja("GlobalAveragePool",e.inputs[0],!0,t))},Ya=(e,t,n,r)=>{let[i,a]=Va(t,r,n),s=`
      value = max(x_val, value);
    `,o="",u=L("x",t.dataType,t.dims.length),d=["rank"],[c,h,g,v,b]=qa(a,i);return c.push(...se(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${g};${v};${b}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(U.size(a)/64)},programUniforms:c}),getShaderSource:T=>Fa(T,u,t.dims.length,a.length,i,s,o,t.dataType===10?-65504:-1e5,h,g,v,b)}},X0=(e,t)=>{Yr(e.inputs),e.compute(Ya("MaxPool",e.inputs[0],!1,t))},Q0=e=>{let t=e.storage_order,n=e.dilations,r=Ha(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let i={storageOrder:t,dilations:n,...r,cacheKey:""};return{...i,cacheKey:rh(i)}},J0=e=>{let t=e.format;return{format:t,...Ka,cacheKey:t}},ey=(e,t)=>{Yr(e.inputs),e.compute(Ya("GlobalMaxPool",e.inputs[0],!0,t))}}),ih,sh,ty,ny,wb=K(()=>{"use strict";ae(),ue(),Re(),le(),ih=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((i,a)=>a===t.axis||i===e[0].dims[a]).reduce((i,a)=>i&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},sh=(e,t)=>{let n=U.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,i=r===3,a=e[0].dims,s=e[1].dataType,o=U.size(a),u=r===3||r===2,d=u?[Math.ceil(U.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,h=e.length>2?e[2]:void 0,g=h?u?[Math.ceil(U.size(h.dims)/4)]:h.dims:void 0,v=c.length===0||c.length===1&&c[0]===1,b=v===!1&&c.length===1,T=Oe(o),S=v&&(!u||T===4),k=S?T:1,_=S&&!u?T:1,I=L("input",u?12:r,d.length,_),C=L("scale",s,c.length),A=h?L("zero_point",u?12:r,g.length):void 0,D=re("output",s,a.length,k),w=[I,C];A&&w.push(A);let f=[d,c];h&&f.push(g);let $=[{type:12,data:o/k},{type:12,data:n},{type:12,data:t.blockSize},...se(...f,a)],E=z=>{let N=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${z.registerUniforms(N).declareVariables(...w,D)}
      ${z.mainStart()}
          ${z.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${D.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${i?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${k===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${v?`let scale_value= ${C.getByOffset("0")}`:b?`
            let scale_index = ${D.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${C.getByOffset("scale_index")};`:`
            var scale_indices: ${C.type.indices} = output_indices;
            let index = ${C.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${C.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${C.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${A?v?u?`
                let zero_point_input = ${A.getByOffset("0")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${A.getByOffset("0")}`:b?u?`
                let zero_point_index = ${D.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${A.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${D.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${A.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${C.indicesToOffset("scale_indices")};
                let zero_point_input = ${A.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${A.getByIndices("scale_indices")};`:`let zero_point_value = ${u?i?"i32":"u32":I.type.value}(0);`};
      // Compute and write output
      ${D.setByOffset("global_idx",`${D.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:A?["rank","rank","rank"]:["rank","rank"]},getShaderSource:E,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(o/k/64),y:1,z:1},programUniforms:$})}},ty=(e,t)=>{ih(e.inputs,t),e.compute(sh(e.inputs,t))},ny=e=>Ee({axis:e.axis,blockSize:e.blockSize})}),ah,oh,ry,$b=K(()=>{"use strict";st(),ae(),le(),ah=(e,t,n)=>{let r=e===t,i=e<t&&n<0,a=e>t&&n>0;if(r||i||a)throw new Error("Range these inputs' contents are invalid.")},oh=(e,t,n,r)=>{let i=Math.abs(Math.ceil((t-e)/n)),a=[i],s=i,o=[{type:12,data:s},{type:r,data:e},{type:r,data:n},...se(a)],u=d=>{let c=re("output",r,a.length),h=c.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:h},{name:"delta",type:h}];return`
        ${d.registerUniforms(g).declareVariables(c)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:o})}},ry=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),Te.webgpu.validateInputContent&&ah(t,n,r),e.compute(oh(t,n,r,e.inputs[0].dataType),{inputs:[]})}}),uh,lh,iy,sy,vb=K(()=>{"use strict";ae(),ue(),Re(),le(),uh=(e,t,n,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let i=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${n};`;case"add":return r==="i32"||r==="u32"?`atomicAdd(&${t}, bitcast<${r}>(${n}));`:`
              ${i}bitcast<${r}>(oldValue) + (${n})${a}`;case"max":return r==="i32"||r==="u32"?`atomicMax(&${t}, bitcast<${r}>(${n}));`:`
                ${i}max(bitcast<f32>(oldValue), (${n}))${a}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${i}min(bitcast<${r}>(oldValue), (${n}))${a}`;case"mul":return`${i}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},lh=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n,a=1,s=Math.ceil(U.sizeToDimension(r,r.length-1)/a),o=r[r.length-1],u=U.sizeFromDimension(n,o),d=[{type:12,data:s},{type:12,data:o},{type:12,data:u},...se(e[1].dims,e[2].dims,i)],c=h=>{let g=L("indices",e[1].dataType,e[1].dims.length),v=L("updates",e[2].dataType,e[2].dims.length,a),b=t.reduction!=="none"&&t.reduction!==""?Am("output",e[0].dataType,i.length):re("output",e[0].dataType,i.length,a);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,v,b)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
    ${uh(t.reduction,"output[data_offset + i]","value",b.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:c}},iy=e=>Ee({reduction:e.reduction}),sy=(e,t)=>{e.compute(lh(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),dh,fh,ph,Za,ch,hh,mh,gh,yh,wh,$h,vh,Xa,bh,_h,kh,xh,Eh,ay,oy,bb=K(()=>{"use strict";ae(),ue(),Re(),le(),dh=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},fh=(e,t,n)=>{t.every(i=>i>=0&&i<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((i,a)=>r[i]=e[a]),r},ph=(e,t,n,r,i,a)=>{let[s,o,u]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(c=>r.push(c)),r.length!==0&&r.length!==d&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");dh(r,t),t.axes.length>0&&fh(r,t.axes,d).forEach((c,h)=>r[h]=c)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(c=>i.push(Number(c))),i.length!==0&&i.length!==d&&n>=18&&i.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof i<"u"&&r.length>0&&i.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},Za=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,ch=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Za("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Za("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",hh=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",mh=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),i=e.length===0?r:e.slice();return t.length>0?(t.forEach((a,s)=>{r[a]=i[s],r[s+n]=i[t.length+s]}),r):i},gh=(e,t,n,r)=>{let i=[];if(n.length>0)if(r.length>0){if(e.forEach(a=>i.push(a)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((a,s)=>i[a]=n[s])}else n.forEach(a=>i.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");i=e.map((a,s)=>Math.round(a*t[s]))}return i},yh=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return n.axes.length>0?(n.axes.forEach(a=>t[a]=r),n.axes.forEach(a=>i[a]=Math.round(e[a]*t[a]))):(t.fill(r,0,t.length),i.forEach((a,s)=>i[s]=Math.round(a*t[s]))),i},wh=(e,t,n,r,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${ie("uniforms.scales","i",r)};
        var roi_low = ${ie("uniforms.roi","i",i)};
        var roi_hi = ${ie("uniforms.roi",`i + ${t.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${ie("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${ie("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,$h=(e,t,n,r,i,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${ie("uniforms.scales","i",i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${ie("uniforms.roi","i",a)};
          var roi_hi = ${ie("uniforms.roi",`i + ${n.length}`,a)};
          var input_shape_i = ${ie("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${ie("uniforms.output_shape","i",r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,vh=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${ie("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Xa=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",bh=(e,t,n,r,i)=>{let[a,s,o,u]=n.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${n[o]} - 1))`)};
      ${Xa(e,u,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${o}];
      ${r?`if (row < 0 || row > (${n[s]} - 1) || col < 0 || col > (${n[o]} - 1)) {
        return ${i};
      }`:""};
      row = max(0, min(row, ${n[s]} - 1));
      col = max(0, min(col, ${n[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${a}])`:"0"};
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
    }`},_h=(e,t,n,r,i,a,s,o,u,d)=>{let c=n.length===2,h=!0,[g,v]=c?[0,1]:h?[2,3]:[1,2],b=e.type.value,T=S=>{let k=S===g?"row":"col";return`
      fn ${k}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${b} {
        var output_index = ${t.indicesGet("output_indices",S)};
        var originalIdx: ${b} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[S]},
        ${r[S]}, ${n[S]}, ${a[S]}, ${a[S]} + ${n.length});
        var fractOriginalIdx: ${b} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${n[S]} - 1))) {
          return ${u};
        }
        var data: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${k}: ${b} = originalIdx + ${b}(i);
          if (${k} < 0 || ${k} >= ${n[S]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${u};`:`${k} = max(0, min(${k}, ${n[S]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",S,`u32(${k})`)};
          data[i + 1] = ${S===g?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${T(g)};
    ${T(v)};
  fn getCubicInterpolationCoefs(s: ${b}) -> array<${b}, 4> {
    var absS = abs(s);
    var coeffs: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${b} = 1.0 - absS;
    var twoMinusAbsS: ${b} = 2.0 - absS;
    var onePlusAbsS: ${b} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${b}, 4>, coefs: array<${b}, 4>) -> ${b} {
    var coefsSum: ${b} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${b} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},kh=(e,t,n,r,i)=>{let[a,s,o,u,d]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${n[u]} - 1))`)};
      ${Xa(e,d,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${s}];
      var height:${c} = originalIndices[${o}];
      var width:${c} = originalIndices[${u}];
      ${r?`if (depth < 0 || depth > (${n[s]} - 1) || height < 0 || height > (${n[o]} - 1) || width < 0 || (width > ${n[u]} - 1)) {
      return ${i};
        }`:""};

    depth = max(0, min(depth, ${n[s]} - 1));
      height = max(0, min(height, ${n[o]} - 1));
      width = max(0, min(width, ${n[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${a}])`:"0"};

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
    }`},xh=(e,t,n,r,i,a)=>{let s=e.dims,o=mh(a,t.axes,s.length),u=gh(s,r,i,t.axes),d=r.slice();r.length===0&&(d=s.map((_,I)=>_===0?1:u[I]/_),t.keepAspectRatioPolicy!=="stretch"&&(u=yh(s,d,t)));let c=re("output",e.dataType,u.length),h=L("input",e.dataType,s.length),g=U.size(u),v=s.length===u.length&&s.every((_,I)=>_===u[I]),b=t.coordinateTransformMode==="tf_crop_and_resize",T=t.extrapolationValue,S=h.type.value,k=_=>`
      ${v?"":`
      ${ch(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${vh(h,s)};
              ${hh(t.nearestMode,n,S)};
              ${$h(h,c,s,u,d.length,o.length,b)};
              `;case"linear":return`
              ${wh(c,s,u,d.length,o.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${bh(h,c,s,b,T)}`;if(s.length===3||s.length===5)return`${kh(h,c,s,b,T)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${_h(h,c,s,u,d,o,t.cubicCoeffA,b,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${_.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",o.length).declareVariables(h,c)}
      ${_.mainStart()}
        ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${v?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${h.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${h.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${i.length>0?i:""}|${o.length>0?o:""}|${v}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:k,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:d},{type:1,data:o},...se(s,u)]})}},Eh=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},ay=(e,t)=>{let n=[],r=[],i=[],a=Eh(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");ph(e.inputs,t,a,n,r,i),e.compute(xh(e.inputs[0],t,a,n,r,i),{inputs:[0]})},oy=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,i=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,o=e.keepAspectRatioPolicy,u=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return Ee({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:i,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:o,mode:u,nearestMode:d})}}),Th,Sh,uy,_b=K(()=>{"use strict";ae(),ue(),le(),Th=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==i)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==i)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==i)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==i)throw new Error("Bias must have the same hidden size as input")}},Sh=(e,t,n,r)=>{let i=t.simplified,a=e[0].dims,s=U.size(a),o=a,u=s,d=a.slice(-1)[0],c=r?a.slice(0,-1).concat(1):[],h=!i&&e.length>3,g=e.length>4,v=r&&n>1,b=r&&n>2,T=n>3,S=64,k=Oe(d),_=[{type:12,data:u},{type:12,data:k},{type:12,data:d},{type:1,data:t.epsilon}],I=A=>{let D=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],w=[L("x",e[0].dataType,e[0].dims,k),L("skip",e[1].dataType,e[1].dims,k),L("gamma",e[2].dataType,e[2].dims,k)];h&&w.push(L("beta",e[3].dataType,e[3].dims,k)),g&&w.push(L("bias",e[4].dataType,e[4].dims,k)),w.push(re("output",e[0].dataType,o,k)),v&&w.push(re("mean_output",1,c)),b&&w.push(re("inv_std_output",1,c)),T&&w.push(re("input_skip_bias_sum",e[0].dataType,o,k));let f=qe(e[0].dataType),$=qe(1,k);return`

      ${A.registerUniforms(D).declareVariables(...w)}
      var<workgroup> sum_shared : array<${$}, ${S}>;
      var<workgroup> sum_squared_shared : array<${$}, ${S}>;

      ${A.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g?"bias[offset1d + i]":f+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${T?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Qn(f,k,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
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
        let mean = ${dn("sum",k)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${dn("square_sum",k)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${v?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${f}(mean)`}) *
            ${f}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},C=[{dims:o,dataType:e[0].dataType}];return n>1&&C.push({dims:c,dataType:1}),n>2&&C.push({dims:c,dataType:1}),n>3&&C.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${k};${v};${b};${T}`,inputDependencies:e.map((A,D)=>"type")},getShaderSource:I,getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(u/d)},programUniforms:_})}},uy=(e,t)=>{Th(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Sh(e.inputs,t,e.outputCount,!1),{outputs:n})}}),Ih,Zr,Ch,Qa,Ah,zh,ly,dy,kb=K(()=>{"use strict";ae(),ue(),Re(),le(),Ih=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},Zr=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},Ch=(e,t)=>{if(e.length>1){let n=Zr(e,1),r=Zr(e,2),i=Zr(e,3);return i.length===0&&(i=[...Array(e[0].dims.length).keys()]),Ee({starts:n,ends:r,axes:i})}else return t},Qa=(e,t,n,r,i)=>{let a=e;return e<0&&(a+=n[r[t]]),i[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},Ah=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${ie("uniforms.input_shape","i",n.length)};
            let steps_i = ${ie("uniforms.steps","i",n.length)};
            let signs_i = ${ie("uniforms.signs","i",n.length)};
            let starts_i = ${ie("uniforms.starts","i",n.length)};
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
      }`,zh=(e,t)=>{let n=e[0].dims,r=U.size(n),i=t.axes.length>0?U.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=Zr(e,4);a.forEach(k=>k!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(i.length).fill(1));let s=t.starts.map((k,_)=>Qa(k,_,n,i,a)),o=t.ends.map((k,_)=>Qa(k,_,n,i,a));if(i.length!==s.length||i.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(i.length!==n.length)for(let k=0;k<n.length;++k)i.includes(k)||(s.splice(k,0,0),o.splice(k,0,n[k]),a.splice(k,0,1));let u=a.map(k=>Math.sign(k));a.forEach((k,_,I)=>{if(k<0){let C=(o[_]-s[_])/k,A=s[_],D=A+C*a[_];s[_]=D,o[_]=A,I[_]=-k}});let d=n.slice(0);i.forEach((k,_)=>{d[k]=Math.ceil((o[k]-s[k])/a[k])});let c={dims:d,dataType:e[0].dataType},h=re("output",e[0].dataType,d.length),g=L("input",e[0].dataType,e[0].dims.length),v=U.size(d),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:a.length}],T=[{type:12,data:v},{type:12,data:s},{type:6,data:u},{type:12,data:a},...se(e[0].dims,d)],S=k=>`
      ${k.registerUniforms(b).declareVariables(g,h)}
        ${Ah(g,h,n)}
        ${k.mainStart()}
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:T})}},ly=(e,t)=>{Ih(e.inputs,t);let n=Ch(e.inputs,t);e.compute(zh(e.inputs,n),{inputs:[0]})},dy=e=>{let t=e.starts,n=e.ends,r=e.axes;return Ee({starts:t,ends:n,axes:r})}}),Oh,Rh,fy,py,xb=K(()=>{"use strict";ae(),ue(),Re(),fn(),le(),Oh=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Rh=(e,t)=>{let n=e.inputs[0],r=n.dims,i=U.size(r),a=r.length,s=U.normalizeAxis(t.axis,a),o=s<r.length-1,u,d=[];o?(d=Array.from({length:a},(w,f)=>f),d[s]=a-1,d[a-1]=s,u=e.compute(it(n,d),{inputs:[n],outputs:[-1]})[0]):u=n;let c=u.dims,h=c[a-1],g=i/h,v=Oe(h),b=h/v,T=64;g===1&&(T=256);let S=(w,f)=>f===4?`max(max(${w}.x, ${w}.y), max(${w}.z, ${w}.w))`:f===2?`max(${w}.x, ${w}.y)`:f===3?`max(max(${w}.x, ${w}.y), ${w}.z)`:w,k=L("x",u.dataType,u.dims,v),_=re("result",u.dataType,u.dims,v),I=k.type.value,C=qe(u.dataType)==="f32"?`var threadMax = ${I}(-3.4028234663852886e+38f);`:`var threadMax = ${I}(-65504.0h);`,A=w=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${T}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${w.registerUniform("packedCols","i32").declareVariables(k,_)}
      ${w.mainStart(T)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${T};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${C}
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
          rowMaxShared = ${I}(${S("threadShared[0]",v)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${I}(0.0);
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
          rowSumShared = ${I}(${dn("threadShared[0]",v)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${I}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,D=e.compute({name:"Softmax",shaderCache:{hint:`${v};${T}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:u.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:b}]}),getShaderSource:A},{inputs:[u],outputs:[o?-1:0]})[0];o&&e.compute(it(D,d),{inputs:[D]})},fy=(e,t)=>{Oh(e.inputs),Rh(e,t)},py=e=>Ee({axis:e.axis})}),Ja,Dh,Nh,Mh,cy,Eb=K(()=>{"use strict";ae(),ue(),le(),Ja=e=>Array.from(e.getBigInt64Array(),Number),Dh=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ja(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Nh=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},Mh=(e,t)=>{let n=e[0].dims,r=t??Ja(e[1]),i=Nh(n,r),a=U.size(i),s=e[0].dataType,o=L("input",s,n.length),u=re("output",s,i.length),d=c=>`
      const inputShape = ${o.indices(...n)};
      ${c.registerUniform("output_size","u32").declareVariables(o,u)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...se(e[0].dims,i)]}),getShaderSource:d}},cy=e=>{Dh(e.inputs),e.compute(Mh(e.inputs),{inputs:[0]})}}),Ph,Bh,hy,Tb=K(()=>{"use strict";ae(),ue(),le(),Ph=(e,t,n,r,i)=>{let a=re("output_data",i,n.length,4),s=L("a_data",t[1].dataType,t[1].dims.length,4),o=L("b_data",t[2].dataType,t[2].dims.length,4),u=L("c_data",t[0].dataType,t[0].dims.length,4),d,c=(h,g,v)=>`select(${g}, ${h}, ${v})`;if(!r)d=a.setByOffset("global_idx",c(s.getByOffset("global_idx"),o.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let h=(g,v,b="")=>{let T=`a_data[index_a${v}][component_a${v}]`,S=`b_data[index_b${v}][component_b${v}]`,k=`bool(c_data[index_c${v}] & (0xffu << (component_c${v} * 8)))`;return`
            let output_indices${v} = ${a.offsetToIndices(`global_idx * 4u + ${v}u`)};
            let offset_a${v} = ${s.broadcastedIndicesToOffset(`output_indices${v}`,a)};
            let offset_b${v} = ${o.broadcastedIndicesToOffset(`output_indices${v}`,a)};
            let offset_c${v} = ${u.broadcastedIndicesToOffset(`output_indices${v}`,a)};
            let index_a${v} = offset_a${v} / 4u;
            let index_b${v} = offset_b${v} / 4u;
            let index_c${v} = offset_c${v} / 4u;
            let component_a${v} = offset_a${v} % 4u;
            let component_b${v} = offset_b${v} % 4u;
            let component_c${v} = offset_c${v} % 4u;
            ${g}[${v}] = ${b}(${c(T,S,k)});
          `};i===9?d=`
            var data = vec4<u32>(0);
            ${h("data",0,"u32")}
            ${h("data",1,"u32")}
            ${h("data",2,"u32")}
            ${h("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${h("output_data[global_idx]",0)}
            ${h("output_data[global_idx]",1)}
            ${h("output_data[global_idx]",2)}
            ${h("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,s,o,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},Bh=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,i=e[1].dataType,a=!(U.areEqual(t,n)&&U.areEqual(n,r)),s=t,o=U.size(t);if(a){let d=Jn.calcShape(Jn.calcShape(t,n,!1),r,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,o=U.size(s)}let u=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Ph(d,e,s,a,i),getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:u},...se(r,t,n,s)]})}},hy=e=>{e.compute(Bh(e.inputs))}}),my,Sb=K(()=>{"use strict";Wv(),Po(),Lv(),Vv(),qv(),Fv(),Gv(),Zv(),Qv(),Jv(),eb(),tb(),nb(),rb(),ib(),sb(),ab(),ob(),ub(),lb(),db(),fb(),pb(),cb(),hb(),mb(),D0(),gb(),yb(),wb(),$b(),vb(),Mo(),bb(),U0(),_b(),kb(),xb(),P0(),Eb(),fn(),Bo(),Tb(),my=new Map([["Abs",[sg]],["Acos",[ag]],["Acosh",[og]],["Add",[Vg]],["ArgMax",[tg,lo]],["ArgMin",[eg,lo]],["Asin",[ug]],["Asinh",[lg]],["Atan",[dg]],["Atanh",[fg]],["Attention",[ng]],["AveragePool",[K0,j0]],["BatchNormalization",[rg]],["BiasAdd",[ig]],["BiasSplitGelu",[Lg]],["Cast",[cg,pg]],["Ceil",[mg]],["Clip",[hg]],["Concat",[Qg,Jg]],["Conv",[go,mo]],["ConvTranspose",[l0,u0]],["Cos",[gg]],["Cosh",[yg]],["CumSum",[d0,f0]],["DepthToSpace",[p0,c0]],["DequantizeLinear",[ty,ny]],["DFT",[h0,m0]],["Div",[qg]],["Einsum",[g0,y0]],["Elu",[wg,ti]],["Equal",[Fg]],["Erf",[$g]],["Exp",[vg]],["Expand",[w0]],["FastGelu",[$0]],["Floor",[bg]],["FusedConv",[go,mo]],["Gather",[b0,v0]],["GatherElements",[S0,T0]],["GatherBlockQuantized",[x0,E0]],["GatherND",[_0,k0]],["Gelu",[_g]],["Gemm",[C0,I0]],["GlobalAveragePool",[Z0,Y0]],["GlobalMaxPool",[ey,J0]],["Greater",[Kg]],["GreaterOrEqual",[Zg]],["GridSample",[A0,z0]],["GroupQueryAttention",[W0]],["HardSigmoid",[Ag,Cg]],["HardSwish",[zg]],["InstanceNormalization",[L0]],["LayerNormalization",[V0]],["LeakyRelu",[kg,ti]],["Less",[Yg]],["LessOrEqual",[Xg]],["Log",[Ug]],["MatMul",[q0]],["MatMulNBits",[F0,G0]],["MaxPool",[X0,Q0]],["Mul",[Gg]],["MultiHeadAttention",[R0,O0]],["Neg",[Eg]],["Not",[xg]],["Pad",[H0]],["Pow",[Hg]],["QuickGelu",[Wg,ti]],["Range",[ry]],["Reciprocal",[Tg]],["ReduceMin",[Ym]],["ReduceMean",[Fm]],["ReduceMax",[Km]],["ReduceSum",[Xm]],["ReduceProd",[Zm]],["ReduceL1",[Gm]],["ReduceL2",[Hm]],["ReduceLogSum",[Jm]],["ReduceLogSumExp",[jm]],["ReduceSumSquare",[Qm]],["Relu",[Sg]],["Resize",[ay,oy]],["RotaryEmbedding",[B0]],["ScatterND",[sy,iy]],["Sigmoid",[Ig]],["Sin",[Og]],["Sinh",[Rg]],["Slice",[ly,dy]],["SkipLayerNormalization",[uy]],["Split",[N0,M0]],["Sqrt",[Dg]],["Softmax",[fy,py]],["Sub",[jg]],["Tan",[Ng]],["Tanh",[Mg]],["ThresholdedRelu",[Bg,ti]],["Tile",[cy]],["Transpose",[Om,Rm]],["Where",[hy]]])}),gy,Ib=K(()=>{"use strict";st(),Ht(),le(),gy=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,r,i){pt(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let d of t)o.push({binding:o.length,resource:{buffer:d.buffer}});for(let d of n)o.push({binding:o.length,resource:{buffer:d.buffer}});i&&o.push({binding:o.length,resource:i});let u=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,u),s.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),rt(e.programInfo.name)}dispose(){}build(e,t){pt(e.name);let n=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{n.features.has(d.feature)&&r.push(`enable ${d.extension};`)});let i=zm(t,this.backend.device.limits),a=e.getShaderSource(i),s=`${r.join(`
`)}
${i.additionalImplementations}
${a}`,o=n.createShaderModule({code:s,label:e.name});ye("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let u=n.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return rt(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,n=typeof e=="number"?1:e.y||1,r=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&n<=i&&r<=i)return[t,n,r];let a=t*n*r,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),yy={};tr(yy,{WebGpuBackend:()=>wy});var Uh,Wh,Lh,wy,Cb=K(()=>{"use strict";st(),ae(),Ht(),Tm(),Bv(),Sb(),Ib(),Uh=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let i=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${i}`);break}case"rank":{let a=e[r].dims.length;n.push(`${i};${a}`);break}case"dims":{let a=e[r].dims.join(",");n.push(`${i};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},Wh=(e,t,n)=>{let r=e.name;return e.shaderCache?.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${Uh(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,r},Lh=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},wy=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=o=>t.features.has(o)&&n.push(o)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await t.requestDevice(r);let a=t,s=t.info??(typeof a.requestAdapterInfo=="function"?await a.requestAdapterInfo():void 0);this.adapterInfo=new Lh(s),this.gpuDataManager=Cm(this),this.programManager=new gy(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Oo(e.logLevel,!!e.debug),this.device.onuncapturederror=o=>{o.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${o.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;pt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let r=0;r<t.length/2;r++){let i=n[r],a=i.kernelId,s=this.kernels.get(a),o=s.kernelType,u=s.kernelName,d=i.programName,c=i.inputTensorViews,h=i.outputTensorViews,g=t[r*2],v=t[r*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let b=Number(g-this.queryTimeBase),T=Number(v-this.queryTimeBase);if(!Number.isSafeInteger(b)||!Number.isSafeInteger(T))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(S=>({dims:S.dims,dataType:Gt(S.dataType)})),outputsMetadata:h.map(S=>({dims:S.dims,dataType:Gt(S.dataType)})),kernelId:a,kernelType:o,kernelName:u,programName:d,startTime:b,endTime:T});else{let S="";c.forEach((_,I)=>{S+=`input[${I}]: [${_.dims}] | ${Gt(_.dataType)}, `});let k="";h.forEach((_,I)=>{k+=`output[${I}]: [${_.dims}] | ${Gt(_.dataType)}, `}),console.log(`[profiling] kernel "${a}|${o}|${u}|${d}" ${S}${k}start time: ${b} ns, execution time: ${T-b} ns`)}Xi("GPU",`${d}::${g}::${v}`)}e.unmap(),this.pendingQueries.delete(e)}),rt()}run(e,t,n,r,i,a){pt(e.name);let s=[];for(let _=0;_<t.length;++_){let I=t[_].data;if(I===0)continue;let C=this.gpuDataManager.get(I);if(!C)throw new Error(`no GPU data for input: ${I}`);s.push(C)}let{outputs:o,dispatchGroup:u,programUniforms:d}=e.getRunData(t),c=n.length===0?o.map((_,I)=>I):n;if(c.length!==o.length)throw new Error(`Output size ${c.length} must be equal to ${o.length}.`);let h=[],g=[];for(let _=0;_<o.length;++_){if(!Number.isInteger(c[_])||c[_]<-3||c[_]>=a)throw new Error(`Invalid output index: ${c[_]}`);if(c[_]===-3)continue;let I=c[_]===-1,C=c[_]===-2,A=I||C?i(o[_].dataType,o[_].dims):r(c[_],o[_].dataType,o[_].dims);if(h.push(A),A.data===0)continue;let D=this.gpuDataManager.get(A.data);if(!D)throw new Error(`no GPU data for output: ${A.data}`);if(I&&this.temporaryData.push(D),C){let w=this.kernelPersistentData.get(this.currentKernelId);w||(w=[],this.kernelPersistentData.set(this.currentKernelId,w)),w.push(D)}g.push(D)}if(s.length!==t.length||g.length!==h.length){if(g.length===0)return rt(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let v;if(d){let _=0,I=[];d.forEach(w=>{let f=typeof w.data=="number"?[w.data]:w.data;if(f.length===0)return;let $=w.type===10?2:4,E,z;w.type===10?(z=f.length>4?16:f.length>2?8:f.length*$,E=f.length>4?16:$*f.length):(z=f.length<=2?f.length*$:16,E=16),_=Math.ceil(_/z)*z,I.push(_);let N=w.type===10?8:4;_+=f.length>4?Math.ceil(f.length/N)*E:f.length*$});let C=16;_=Math.ceil(_/C)*C;let A=new ArrayBuffer(_);d.forEach((w,f)=>{let $=I[f],E=typeof w.data=="number"?[w.data]:w.data;if(w.type===6)new Int32Array(A,$,E.length).set(E);else if(w.type===12)new Uint32Array(A,$,E.length).set(E);else if(w.type===10)new Uint16Array(A,$,E.length).set(E);else if(w.type===1)new Float32Array(A,$,E.length).set(E);else throw new Error(`Unsupported uniform type: ${Gt(w.type)}`)});let D=this.gpuDataManager.create(_,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(D.buffer,0,A,0,_),this.gpuDataManager.release(D.id),v={offset:0,size:_,buffer:D.buffer}}let b=this.programManager.normalizeDispatchGroupSize(u),T=b[1]===1&&b[2]===1,S=Wh(e,t,T),k=this.programManager.getArtifact(S);if(k||(k=this.programManager.build(e,b),this.programManager.setArtifact(S,k),ye("info",()=>`[artifact] key: ${S}, programName: ${e.name}`)),d&&k.uniformVariablesInfo){if(d.length!==k.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${k.uniformVariablesInfo.length}, got ${d.length} in program "${k.programInfo.name}".`);for(let _=0;_<d.length;_++){let I=d[_],C=I.type,A=typeof I.data=="number"?1:I.data.length,[D,w]=k.uniformVariablesInfo[_];if(C!==D||A!==w)throw new Error(`Uniform variable ${_} mismatch: expect type ${D} with size ${w}, got type ${C} with size ${A} in program "${k.programInfo.name}".`)}}if(ye("info",()=>`[ProgramManager] run "${e.name}" (key=${S}) with ${b[0]}x${b[1]}x${b[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let _={kernelId:this.currentKernelId,programName:k.programInfo.name,inputTensorViews:t,outputTensorViews:h};this.pendingKernels.push(_),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(_)}return this.programManager.run(k,s,g,b,v),rt(e.name),h}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,r){let i=my.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:r,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let n of t)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let r=this.kernels.get(e);if(!r)throw new Error(`kernel not created: ${e}`);let i=r.kernelType,a=r.kernelName,s=r.kernelEntry,o=r.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),ye("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),s(t,o[1]),0}catch(d){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${d}`)),1}finally{u&&n.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${i}] ${a}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,r){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(t),s=this.gpuDataManager.registerExternalBuffer(n,r,a);return i.set(t,[s,n]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let r=await ao(this,e,t);return Ro(r.buffer,n)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ye("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ye("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ye("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let r=0;r<n;r++){let i=this.getComputePassEncoder(),a=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),$y={};tr($y,{init:()=>vy});var Hi,Vh,vy,Ab=K(()=>{"use strict";ae(),Ht(),ue(),Pv(),Hi=class by{constructor(t,n,r,i){this.module=t,this.dataType=n,this.data=r,this.dims=i}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=U.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=U.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=U.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=U.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(U.size(t)!==U.size(this.dims))throw new Error("Invalid new shape");return new by(this.module,this.dataType,this.data,t)}},Vh=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo,this.deviceLimits=t.device.limits;let r=e.PTR_SIZE,i=n/e.PTR_SIZE,a=r===4?"i32":"i64";this.opKernelContext=Number(e.getValue(r*i++,a));let s=Number(e.getValue(r*i++,a));this.outputCount=Number(e.getValue(r*i++,a)),this.customDataOffset=Number(e.getValue(r*i++,"*")),this.customDataSize=Number(e.getValue(r*i++,a));let o=[];for(let u=0;u<s;u++){let d=Number(e.getValue(r*i++,a)),c=Number(e.getValue(r*i++,"*")),h=Number(e.getValue(r*i++,a)),g=[];for(let v=0;v<h;v++)g.push(Number(e.getValue(r*i++,a)));o.push(new Hi(e,d,c,g))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let n=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,r=t?.outputs??[],i=(s,o,u)=>new Hi(this.module,o,this.output(s,u),u),a=(s,o)=>{let u=On(s,o);if(!u)throw new Error(`Unsupported data type: ${s}`);let d=u>0?this.backend.gpuDataManager.create(u).id:0;return new Hi(this.module,s,d,o)};return this.backend.run(e,n,r,i,a,this.outputCount)}output(e,t){let n=this.module.stackSave();try{let r=this.module.PTR_SIZE,i=r===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*r);this.module.setValue(a,t.length,i);for(let s=0;s<t.length;s++)this.module.setValue(a+r*(s+1),t[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(r){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(n)}}},vy=async(e,t,n,r)=>{let i=t.jsepInit;if(!i)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(Cb(),ii(yy)).WebGpuBackend,s=new a;await s.initialize(n,r),i("webgpu",[s,o=>s.alloc(Number(o)),o=>s.free(o),(o,u,d,c=!1)=>{if(c)ye("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(u)}, size=${Number(d)}`),s.memcpy(Number(o),Number(u));else{ye("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(u)}, size=${Number(d)}`);let h=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));s.upload(Number(u),h)}},async(o,u,d)=>{ye("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${u}, size=${d}`),await s.download(Number(o),()=>t.HEAPU8.subarray(Number(u)>>>0,Number(u+d)>>>0))},(o,u,d)=>s.createKernel(o,Number(u),d,t.UTF8ToString(t._JsepGetNodeName(Number(u)))),o=>s.releaseKernel(o),(o,u,d,c)=>{ye("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${u}`);let h=new Vh(t,s,Number(u));return s.computeKernel(Number(o),h,c)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new Im(n);i("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,o,u,d,c)=>a.ensureTensor(s,o,u,d,c),(s,o)=>{a.uploadTensor(s,o)},async(s,o)=>a.downloadTensor(s,o),(s,o)=>a.registerMLContext(s,o),!!n.trace])}}}),qh,Fo,Go,un,Fh,eo,is,Ho,jo,Xr,Gh,Sn,_y,ky,to,Ko,Yo,Zo,xy=K(()=>{"use strict";st(),Dv(),Nv(),ae(),Bn(),Io(),zo(),qh=(e,t)=>{xe()._OrtInit(e,t)!==0&&ve("Can't initialize onnxruntime.")},Fo=async e=>{qh(e.wasm.numThreads,Ji(e.logLevel))},Go=async(e,t)=>{xe().asyncInit?.();let n=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=e.webgpu.powerPreference;if(r!==void 0&&r!=="low-power"&&r!=="high-performance")throw new Error(`Invalid powerPreference setting: "${r}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let r=(Ab(),ii($y)).init;t==="webgpu"&&await r("webgpu",xe(),e,n),t==="webnn"&&await r("webnn",xe(),e)}},un=new Map,Fh=e=>{let t=xe(),n=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,i,i+r)!==0&&ve("Can't get session input/output count.");let a=r===4?"i32":"i64";return[Number(t.getValue(i,a)),Number(t.getValue(i+r,a))]}finally{t.stackRestore(n)}},eo=(e,t)=>{let n=xe(),r=n.stackSave(),i=0;try{let a=n.PTR_SIZE,s=n.stackAlloc(2*a);n._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&ve("Can't get session input/output metadata.");let o=Number(n.getValue(s,"*"));i=Number(n.getValue(s+a,"*"));let u=n.HEAP32[i/4];if(u===0)return[o,0];let d=n.HEAPU32[i/4+1],c=[];for(let h=0;h<d;h++){let g=Number(n.getValue(i+8+h*a,"*"));c.push(g!==0?n.UTF8ToString(g):Number(n.getValue(i+8+(h+d)*a,"*")))}return[o,u,c]}finally{n.stackRestore(r),i!==0&&n._OrtFree(i)}},is=e=>{let t=xe(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},Ho=async(e,t)=>{let n,r,i=xe();Array.isArray(e)?[n,r]=e:e.buffer===i.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=is(e);let a=0,s=0,o=0,u=[],d=[],c=[];try{if([s,u]=await _m(t),t?.externalData&&i.mountExternalData){let C=[];for(let A of t.externalData){let D=typeof A=="string"?A:A.path,w=typeof A=="string"?A:A.data;C.push(as(w).then(f=>{i.mountExternalData(D,f)}))}await Promise.all(C)}for(let C of t?.executionProviders??[])if((typeof C=="string"?C:C.name)==="webnn"){if(i.shouldTransferToMLTensor=!1,typeof C!="string"){let A=C,D=A?.context,w=A?.gpuDevice,f=A?.deviceType,$=A?.powerPreference;D?i.currentContext=D:w?i.currentContext=await i.webnnCreateMLContext(w):i.currentContext=await i.webnnCreateMLContext({deviceType:f,powerPreference:$})}else i.currentContext=await i.webnnCreateMLContext();break}a=await i._OrtCreateSession(n,r,s),i.webgpuOnCreateSession?.(a),a===0&&ve("Can't create a session."),i.jsepOnCreateSession?.(),i.currentContext&&(i.webnnRegisterMLContext(a,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[h,g]=Fh(a),v=!!t?.enableGraphCapture,b=[],T=[],S=[],k=[],_=[];for(let C=0;C<h;C++){let[A,D,w]=eo(a,C);A===0&&ve("Can't get an input name."),d.push(A);let f=i.UTF8ToString(A);b.push(f),S.push(D===0?{name:f,isTensor:!1}:{name:f,isTensor:!0,type:Gt(D),shape:w})}for(let C=0;C<g;C++){let[A,D,w]=eo(a,C+h);A===0&&ve("Can't get an output name."),c.push(A);let f=i.UTF8ToString(A);T.push(f),k.push(D===0?{name:f,isTensor:!1}:{name:f,isTensor:!0,type:Gt(D),shape:w});{if(v&&t?.preferredOutputLocation===void 0){_.push("gpu-buffer");continue}let $=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[f]??"cpu",E=i.webnnIsGraphOutput;if($==="cpu"&&E&&E(a,f)){_.push("ml-tensor-cpu-output");continue}if($!=="cpu"&&$!=="cpu-pinned"&&$!=="gpu-buffer"&&$!=="ml-tensor")throw new Error(`Not supported preferred output location: ${$}.`);if(v&&$!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${$}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push($)}}let I=null;return _.some(C=>C==="gpu-buffer"||C==="ml-tensor"||C==="ml-tensor-cpu-output")&&(o=i._OrtCreateBinding(a),o===0&&ve("Can't create IO binding."),I={handle:o,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(C=>C==="ml-tensor-cpu-output"?"ml-tensor":C).map(C=>so(C))}),un.set(a,[a,d,c,I,v,!1]),[a,b,T,S,k]}catch(h){throw d.forEach(g=>i._OrtFree(g)),c.forEach(g=>i._OrtFree(g)),o!==0&&i._OrtReleaseBinding(o)!==0&&ve("Can't release IO binding."),a!==0&&i._OrtReleaseSession(a)!==0&&ve("Can't release session."),h}finally{i._free(n),s!==0&&i._OrtReleaseSessionOptions(s)!==0&&ve("Can't release session options."),u.forEach(h=>i._free(h)),i.unmountExternalData?.()}},jo=e=>{let t=xe(),n=un.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,i,a,s,o]=n;s&&(o&&t._OrtClearBoundOutputs(s.handle)!==0&&ve("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&ve("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),i.forEach(u=>t._OrtFree(u)),a.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(r)!==0&&ve("Can't release session."),un.delete(e)},Xr=new Map,Gh=1,Sn=new Map,_y=e=>{let t=xe(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a LoRA adapter. failed to allocate a buffer of size ${e.byteLength}.`);try{t.HEAPU8.set(e,n);let r=t._OrtCreateLoraAdapter(n,e.byteLength);r===0&&ve("Can't create a LoRA adapter.");let i=Gh++;return Xr.set(i,r),i}finally{t._free(n)}},ky=e=>{let t=xe(),n=Xr.get(e);if(n===void 0)throw new Error(`cannot release LoRA adapter. invalid adapter id: ${e}`);if(Sn.has(e))throw new Error(`cannot release LoRA adapter. the adapter is used by a run in progress. adapter id: ${e}`);t._OrtReleaseLoraAdapter(n)!==0&&ve("Can't release LoRA adapter."),Xr.delete(e)},to=async(e,t,n,r,i,a,s=!1)=>{if(!e){t.push(0);return}let o=xe(),u=o.PTR_SIZE,d=e[0],c=e[1],h=e[3],g=h,v,b;if(d==="string"&&(h==="gpu-buffer"||h==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&h!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(h==="gpu-buffer"){let k=e[2].gpuBuffer;b=On(zn(d),c);{let _=o.jsepRegisterBuffer;if(!_)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');v=_(r,a,k,b)}}else if(h==="ml-tensor"){let k=e[2].mlTensor;b=On(zn(d),c);let _=o.webnnRegisterMLTensor;if(!_)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');v=_(r,k,zn(d),c)}else{let k=e[2];if(Array.isArray(k)){b=u*k.length,v=o._malloc(b),n.push(v);for(let _=0;_<k.length;_++){if(typeof k[_]!="string")throw new TypeError(`tensor data at index ${_} is not a string`);o.setValue(v+_*u,vt(k[_],n),"*")}}else{let _=o.webnnIsGraphInput,I=o.webnnIsGraphOutput;if(d!=="string"&&_&&I){let C=o.UTF8ToString(i);if(_(r,C)||I(r,C)){let A=zn(d);b=On(A,c),g="ml-tensor";let D=o.webnnCreateTemporaryTensor,w=o.webnnUploadTensor;if(!D||!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let f=await D(r,A,c);w(f,new Uint8Array(k.buffer,k.byteOffset,k.byteLength)),v=f}else b=k.byteLength,v=o._malloc(b),n.push(v),o.HEAPU8.set(new Uint8Array(k.buffer,k.byteOffset,b),v)}else b=k.byteLength,v=o._malloc(b),n.push(v),o.HEAPU8.set(new Uint8Array(k.buffer,k.byteOffset,b),v)}}let T=o.stackSave(),S=o.stackAlloc(4*c.length);try{c.forEach((_,I)=>o.setValue(S+I*u,_,u===4?"i32":"i64"));let k=o._OrtCreateTensor(zn(d),v,b,S,c.length,so(g));k===0&&ve(`Can't create tensor for input/output. session=${r}, index=${a}.`),t.push(k)}finally{o.stackRestore(T)}},Ko=async(e,t,n,r,i,a,s=[])=>{let o=xe(),u=o.PTR_SIZE,d=un.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let c=d[0],h=d[1],g=d[2],v=d[3],b=d[4],T=d[5],S=[];if(s.length>0){if(v)throw new Error("LoRA adapters are not supported for a session that uses IO binding, e.g. when an output is preferred to be on GPU, or when the WebNN execution provider produces an output.");for(let F of s){let R=Xr.get(F);if(R===void 0)throw new Error(`cannot run inference. invalid LoRA adapter id: ${F}`);S.push(R)}}let k=t.length,_=r.length,I=0,C=[],A=[],D=[],w=[],f=[],$=o.stackSave(),E=o.stackAlloc(k*u),z=o.stackAlloc(k*u),N=o.stackAlloc(_*u),B=o.stackAlloc(_*u);try{for(let q of s)Sn.set(q,(Sn.get(q)??0)+1);[I,C]=bm(a,S),Rn("wasm prepareInputOutputTensor");for(let q=0;q<k;q++)await to(n[q],A,w,e,h[t[q]],t[q],b);for(let q=0;q<_;q++)await to(i[q],D,w,e,g[r[q]],k+r[q],b);Dn("wasm prepareInputOutputTensor");for(let q=0;q<k;q++)o.setValue(E+q*u,A[q],"*"),o.setValue(z+q*u,h[t[q]],"*");for(let q=0;q<_;q++)o.setValue(N+q*u,D[q],"*"),o.setValue(B+q*u,g[r[q]],"*");if(v&&!T){let{handle:q,outputPreferredLocations:oe,outputPreferredLocationsEncoded:H}=v;if(h.length!==k)throw new Error(`input count from feeds (${k}) is expected to be always equal to model's input count (${h.length}).`);Rn("wasm bindInputsOutputs");for(let ee=0;ee<k;ee++){let V=t[ee];await o._OrtBindInput(q,h[V],A[ee])!==0&&ve(`Can't bind input[${ee}] for session=${e}.`)}for(let ee=0;ee<_;ee++){let V=r[ee];i[ee]?.[3]?(f.push(D[ee]),o._OrtBindOutput(q,g[V],D[ee],0)!==0&&ve(`Can't bind pre-allocated output[${ee}] for session=${e}.`)):o._OrtBindOutput(q,g[V],0,H[V])!==0&&ve(`Can't bind output[${ee}] to ${oe[ee]} for session=${e}.`)}Dn("wasm bindInputsOutputs"),un.set(e,[c,h,g,v,b,!0])}o.jsepOnRunStart?.(c),o.webnnOnRunStart?.(c);let F;v?F=await o._OrtRunWithBinding(c,v.handle,_,N,I):F=await o._OrtRun(c,z,E,k,B,_,N,I),F!==0&&ve("failed to call OrtRun().");let R=[],j=[];Rn("wasm ProcessOutputTensor");for(let q=0;q<_;q++){let oe=Number(o.getValue(N+q*u,"*"));if(oe===D[q]||f.includes(D[q])){R.push(i[q]),oe!==D[q]&&o._OrtReleaseTensor(oe)!==0&&ve("Can't release tensor.");continue}let H=o.stackSave(),ee=o.stackAlloc(4*u),V=!1,M,Y=0;try{o._OrtGetTensorData(oe,ee,ee+u,ee+2*u,ee+3*u)!==0&&ve(`Can't access output tensor data on index ${q}.`);let G=u===4?"i32":"i64",he=Number(o.getValue(ee,G));Y=o.getValue(ee+u,"*");let Q=o.getValue(ee+u*2,"*"),be=Number(o.getValue(ee+u*3,G)),me=[];for(let Ne=0;Ne<be;Ne++)me.push(Number(o.getValue(Q+Ne*u,G)));o._OrtFree(Q)!==0&&ve("Can't free memory for tensor dims.");let De=me.reduce((Ne,Ce)=>Ne*Ce,1);M=Gt(he);let jt=v?.outputPreferredLocations[r[q]];if(M==="string"){if(jt==="gpu-buffer"||jt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ne=[];for(let Ce=0;Ce<De;Ce++){let at=o.getValue(Y+Ce*u,"*"),bt=o.getValue(Y+(Ce+1)*u,"*"),Ie=Ce===De-1?void 0:bt-at;Ne.push(o.UTF8ToString(at,Ie))}R.push([M,me,Ne,"cpu"])}else if(jt==="gpu-buffer"&&De>0){let Ne=o.jsepGetBuffer;if(!Ne)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Ce=Ne(Y),at=On(he,De);if(at===void 0||!Co(M))throw new Error(`Unsupported data type: ${M}`);V=!0,R.push([M,me,{gpuBuffer:Ce,download:o.jsepCreateDownloader(Ce,at,M),dispose:()=>{o._OrtReleaseTensor(oe)!==0&&ve("Can't release tensor.")}},"gpu-buffer"])}else if(jt==="ml-tensor"&&De>0){let Ne=o.webnnEnsureTensor,Ce=o.webnnIsGraphInputOutputTypeSupported;if(!Ne||!Ce)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(On(he,De)===void 0||!Ao(M))throw new Error(`Unsupported data type: ${M}`);if(!Ce(e,M,!1))throw new Error(`preferredLocation "ml-tensor" for ${M} output is not supported by current WebNN Context.`);let at=await Ne(e,Y,he,me,!1);V=!0,R.push([M,me,{mlTensor:at,download:o.webnnCreateMLTensorDownloader(Y,M),dispose:()=>{o.webnnReleaseTensorId(Y),o._OrtReleaseTensor(oe)}},"ml-tensor"])}else if(jt==="ml-tensor-cpu-output"&&De>0){let Ne=o.webnnCreateMLTensorDownloader(Y,M)(),Ce=R.length;V=!0,j.push((async()=>{let at=[Ce,await Ne];return o.webnnReleaseTensorId(Y),o._OrtReleaseTensor(oe),at})()),R.push([M,me,[],"cpu"])}else{let Ne=ss(M),Ce=new Ne(De);new Uint8Array(Ce.buffer,Ce.byteOffset,Ce.byteLength).set(o.HEAPU8.subarray(Y,Y+Ce.byteLength)),R.push([M,me,Ce,"cpu"])}}finally{o.stackRestore(H),M==="string"&&Y&&o._free(Y),V||o._OrtReleaseTensor(oe)}}v&&!b&&(o._OrtClearBoundOutputs(v.handle)!==0&&ve("Can't clear bound outputs."),un.set(e,[c,h,g,v,b,!1]));for(let[q,oe]of await Promise.all(j))R[q][2]=oe;return Dn("wasm ProcessOutputTensor"),R}finally{o.webnnOnRunEnd?.(c),o.stackRestore($),A.forEach(F=>o._OrtReleaseTensor(F)),D.forEach(F=>o._OrtReleaseTensor(F)),w.forEach(F=>o._free(F)),I!==0&&o._OrtReleaseRunOptions(I),C.forEach(F=>o._free(F));for(let F of s){let R=Sn.get(F)-1;R===0?Sn.delete(F):Sn.set(F,R)}}},Yo=e=>{let t=xe(),n=un.get(e);if(!n)throw new Error("invalid session id");let r=n[0],i=t._OrtEndProfiling(r);i===0&&ve("Can't get an profile file name."),t._OrtFree(i)},Zo=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}}),zt,ft,Zn,Qr,Jr,ji,no,Ki,In,Cn,Hh,Ey,Ty,Sy,Iy,Cy,Ay,zy,Oy,Ry,Xo=K(()=>{"use strict";st(),xy(),Bn(),To(),zo(),zt=()=>!!Te.wasm.proxy&&typeof document<"u",Zn=!1,Qr=!1,Jr=!1,Ki=new Map,In=(e,t)=>{let n=Ki.get(e);n?n.push(t):Ki.set(e,[t])},Cn=()=>{if(Zn||!Qr||Jr||!ft)throw new Error("worker not ready")},Hh=e=>{switch(e.data.type){case"init-wasm":Zn=!1,e.data.err?(Jr=!0,no[1](e.data.err)):(Qr=!0,no[0]()),ji&&(URL.revokeObjectURL(ji),ji=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Ki.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Ey=async()=>{if(!Qr){if(Zn)throw new Error("multiple calls to 'initWasm()' detected.");if(Jr)throw new Error("previous call to 'initWasm()' failed.");if(Zn=!0,zt())return new Promise((e,t)=>{ft?.terminate(),$m().then(([n,r])=>{try{ft=r,ft.onerror=a=>t(a),ft.onmessage=Hh,no=[e,t];let i={type:"init-wasm",in:Te};!i.in.wasm.wasmPaths&&(n||io)&&(i.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),ft.postMessage(i),ji=n}catch(i){t(i)}},t)});try{await So(Te.wasm),await Fo(Te),Qr=!0}catch(e){throw Jr=!0,e}finally{Zn=!1}}},Ty=async e=>{if(zt())return Cn(),new Promise((t,n)=>{In("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:Te}};ft.postMessage(r)});await Go(Te,e)},Sy=async e=>zt()?(Cn(),new Promise((t,n)=>{In("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};ft.postMessage(r,[e.buffer])})):is(e),Iy=async(e,t)=>{if(zt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Cn(),new Promise((n,r)=>{In("create",[n,r]);let i={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),ft.postMessage(i,a)})}else return Ho(e,t)},Cy=async e=>{if(zt())return Cn(),new Promise((t,n)=>{In("release",[t,n]);let r={type:"release",in:e};ft.postMessage(r)});jo(e)},Ay=async e=>{if(zt())throw new Error("LoRA adapter is not supported for proxy.");let t=typeof e=="string"?await as(e):e;return _y(t)},zy=async e=>{if(zt())throw new Error("LoRA adapter is not supported for proxy.");ky(e)},Oy=async(e,t,n,r,i,a,s)=>{if(zt()){if(s.length>0)throw new Error("LoRA adapter is not supported for proxy.");if(n.some(o=>o[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(i.some(o=>o))throw new Error("pre-allocated output tensor is not supported for proxy.");return Cn(),new Promise((o,u)=>{In("run",[o,u]);let d=n,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:r,options:a}};ft.postMessage(c,Zo(d))})}else return Ko(e,t,n,r,i,a,s)},Ry=async e=>{if(zt())return Cn(),new Promise((t,n)=>{In("end-profiling",[t,n]);let r={type:"end-profiling",in:e};ft.postMessage(r)});Yo(e)}}),Qo,Dy=K(()=>{"use strict";st(),Xo(),Qo=class{async loadAdapter(e){pt(),this.adapterId=await Ay(e),rt()}async dispose(){return zy(this.adapterId)}}}),ro,jh,Ny,zb=K(()=>{"use strict";st(),Dy(),Xo(),ae(),Eo(),zo(),ro=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},jh=e=>{switch(e[3]){case"cpu":return new Ze(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Co(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:i}=e[2];return Ze.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:i})}case"ml-tensor":{let t=e[0];if(!Ao(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:i}=e[2];return Ze.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:i})}default:throw new Error(`invalid data location: ${e[3]}`)}},Ny=class{async fetchModelAndCopyToWasmMemory(e){return Sy(await as(e))}async loadModel(e,t){pt();let n;typeof e=="string"?n=await this.fetchModelAndCopyToWasmMemory(e):n=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Iy(n,t),rt()}async dispose(){return Cy(this.sessionId)}async run(e,t,n,r=[]){pt();let i=r.map(v=>{if(!(v instanceof Qo))throw new Error("LoRA adapter was not created by the WebAssembly backend.");return v.adapterId}),a=[],s=[];Object.entries(e).forEach(v=>{let b=v[0],T=v[1],S=this.inputNames.indexOf(b);if(S===-1)throw new Error(`invalid input '${b}'`);a.push(T),s.push(S)});let o=[],u=[];Object.entries(t).forEach(v=>{let b=v[0],T=v[1],S=this.outputNames.indexOf(b);if(S===-1)throw new Error(`invalid output '${b}'`);o.push(T),u.push(S)});let d=a.map((v,b)=>ro(v,()=>`input "${this.inputNames[s[b]]}"`)),c=o.map((v,b)=>v?ro(v,()=>`output "${this.outputNames[u[b]]}"`):null),h=await Oy(this.sessionId,s,d,u,c,n,i),g={};for(let v=0;v<h.length;v++)g[this.outputNames[u[v]]]=o[v]??jh(h[v]);return rt(),g}startProfiling(){}endProfiling(){Ry(this.sessionId)}}}),My,Ob=K(()=>{"use strict";My=e=>{if(e?.epContextDataRead)throw new Error('session option "epContextDataRead" is not supported by ONNX Runtime Web')}}),Py={};tr(Py,{OnnxruntimeWebAssemblyBackend:()=>$o,initializeFlags:()=>wo,wasmBackend:()=>By});var wo,$o,By,Rb=K(()=>{"use strict";st(),Dy(),Xo(),zb(),Ob(),wo=()=>{(typeof Te.wasm.initTimeout!="number"||Te.wasm.initTimeout<0)&&(Te.wasm.initTimeout=0);let e=Te.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Te.wasm.simd=!1),typeof Te.wasm.proxy!="boolean"&&(Te.wasm.proxy=!1),typeof Te.wasm.trace!="boolean"&&(Te.wasm.trace=!1),typeof Te.wasm.numThreads!="number"||!Number.isInteger(Te.wasm.numThreads)||Te.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Te.wasm.numThreads=1;else{let t=typeof navigator>"u"?mv("node:os").cpus().length:navigator.hardwareConcurrency;Te.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},$o=class{async init(e){wo(),await Ey(),await Ty(e)}async createInferenceSessionHandler(e,t){My(t);let n=new Ny;return await n.loadModel(e,t),n}async createLoraAdapterHandler(e){let t=new Qo;return await t.loadAdapter(e),t}},By=new $o});st();st();st();var Db="1.31.1";{let e=(Rb(),ii(Py)).wasmBackend;Xn("webgpu",e,5),Xn("webnn",e,5),Xn("cpu",e,10),Xn("wasm",e,10)}Object.defineProperty(Te.versions,"web",{value:Db,enumerable:!0});var Wy=1,Nb=0;async function Mb(e){let t=await fetch(e);if(!t.ok)throw new Error(`fetch ${e}: ${t.status}`);return new Uint8Array(await t.arrayBuffer())}var nr=class{constructor(t={}){this.options=t}options;id="ort-custom";enc;dec;tok;maxIn=63;maxOut=39;async load(t){let n=this.options.fetchBytes??Mb,r=t.manifest;if(!r)throw new Error("manifest required");let i=`${t.baseUrl.replace(/\/$/,"")}/${r.dir??""}`.replace(/\/$/,"");this.options.numThreads!==void 0&&(Te.wasm.numThreads=this.options.numThreads),this.options.wasmPaths&&(Te.wasm.wasmPaths=this.options.wasmPaths);let s={executionProviders:t.backend==="webgpu"?["webgpu","wasm"]:["wasm"],graphOptimizationLevel:"all"},[o,u,d]=await Promise.all([n(`${i}/${r.files.encoder}`),n(`${i}/${r.files.decoder}`),n(`${i}/${r.files.tokenizer}`)]);t.onProgress?.(.6),this.tok=new Vr(JSON.parse(new TextDecoder().decode(d))),this.enc=await ai.create(o,s),this.dec=await ai.create(u,s);let c=r.config??{};this.maxIn=Number(c.max_input_tokens??63),this.maxOut=Number(c.max_output_tokens??39),t.onProgress?.(1)}async predict(t,n){let r=performance.now(),i=[...this.tok.encode(t).slice(0,this.maxIn),Wy],a=new Ze("int64",BigInt64Array.from(i.map(BigInt)),[1,i.length]),s=new Ze("int64",BigInt64Array.from(i.map(()=>1n)),[1,i.length]),u=(await this.enc.run({input_ids:a,attention_mask:s})).last_hidden_state,d=[Nb];for(let c=0;c<this.maxOut;c++){if(n?.aborted)throw new DOMException("aborted","AbortError");let h=new Ze("int64",BigInt64Array.from(d.map(BigInt)),[1,d.length]),v=(await this.dec.run({input_ids:h,encoder_hidden_states:u,encoder_attention_mask:s})).logits,b=v.dims[2],T=v.data,S=(d.length-1)*b,k=0,_=-1/0;for(let I=0;I<b;I++){let C=T[S+I];C>_&&(_=C,k=I)}if(k===Wy)break;d.push(k)}return{dsl:this.tok.decode(d.slice(1)),ms:performance.now()-r,outputTokens:d.length-1}}dispose(){this.enc?.release(),this.dec?.release()}};window.runBench=async e=>{Te.wasm.wasmPaths="/ort/",Te.wasm.numThreads=e.threads;let t=e.engine&&ea[e.engine]?ea[e.engine]:new nr({numThreads:e.threads,wasmPaths:"/ort/"}),n={today:e.today},r=performance.now();await t.load({baseUrl:e.baseUrl,manifest:e.manifest,backend:e.backend});let i=performance.now()-r,a=await t.predict(e.rows[0].text,void 0,n),s=Math.min(5,e.rows.length);for(let c=0;c<s;c++)await t.predict(e.rows[c].text,void 0,n);let o=[],u=[],d=0;for(let c of e.rows){let h=await t.predict(c.text,void 0,n);o.push(h.ms),u.push(h.outputTokens??0),h.dsl===c.dsl&&d++}return t.dispose(),{loadMs:i,coldFirstMs:a.ms,lat:o,toks:u,ok:d,n:e.rows.length}};
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
