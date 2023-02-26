"use strict";(self["webpackChunkshreddify"]=self["webpackChunkshreddify"]||[]).push([[10],{10:function(e,t,i){i.r(t),i.d(t,{default:function(){return o}});var s=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"box"},[t("h1",{staticClass:"has-text-centered title"},[t("b-tooltip",{attrs:{label:"The fat-free mass index, known as FFMI, indicates the body’s muscle development.",position:"is-bottom",size:e.getTooltipSize,multilined:"",dashed:"",type:"is-primary"}},[t("span",[e._v("FFMI")])]),e._v(" Calculator ")],1),t("section",[t("b-field",{attrs:{label:"Which units?"}},[t("b-radio",{attrs:{name:"units","native-value":"metric"},model:{value:e.units,callback:function(t){e.units=t},expression:"units"}},[e._v(" Metric ")]),t("b-radio",{attrs:{name:"units","native-value":"imperial"},model:{value:e.units,callback:function(t){e.units=t},expression:"units"}},[e._v(" Imperial ")])],1),"metric"===e.units?t("b-field",{attrs:{label:"Height",type:{"is-danger":e.height.metric<=0}}},[t("b-input",{staticClass:"height",attrs:{type:"number",step:"any",min:"1",extended:""},model:{value:e.height.metric,callback:function(t){e.$set(e.height,"metric",t)},expression:"height.metric"}}),t("p",{staticClass:"control"},[t("span",{staticClass:"button is-static"},[e._v("cm")])])],1):t("b-field",{attrs:{label:"Height",type:{"is-danger":e.height.imperial.inches<0||e.height.imperial.feet<=0}}},[t("b-input",{staticClass:"height",attrs:{type:"number",min:"1",extended:""},model:{value:e.height.imperial.feet,callback:function(t){e.$set(e.height.imperial,"feet",t)},expression:"height.imperial.feet"}}),t("p",{staticClass:"control"},[t("span",{staticClass:"button is-static"},[e._v("feet")])]),t("b-input",{staticClass:"height",attrs:{type:"number",step:"any",min:"0",extended:""},model:{value:e.height.imperial.inches,callback:function(t){e.$set(e.height.imperial,"inches",t)},expression:"height.imperial.inches"}}),t("p",{staticClass:"control"},[t("span",{staticClass:"button is-static"},[e._v("inches")])])],1),"metric"===e.units?t("b-field",{attrs:{label:"Weight",type:{"is-danger":e.weight<=0}}},[t("b-input",{staticClass:"weight",attrs:{type:"number",step:"any",min:"1",extended:""},model:{value:e.weight.metric,callback:function(t){e.$set(e.weight,"metric",t)},expression:"weight.metric"}}),t("p",{staticClass:"control"},[t("span",{staticClass:"button is-static"},[e._v("kg")])])],1):t("b-field",{attrs:{label:"Weight",type:{"is-danger":e.weight<=0}}},[t("b-input",{staticClass:"weight",attrs:{type:"number",step:"any",min:"1",extended:""},model:{value:e.weight.imperial,callback:function(t){e.$set(e.weight,"imperial",t)},expression:"weight.imperial"}}),t("p",{staticClass:"control"},[t("span",{staticClass:"button is-static"},[e._v("lb")])])],1)],1),t("b-field",{staticClass:"mt-2",attrs:{label:"Bodyfat",type:{"is-danger":e.bodyfat<=0}}},[t("b-input",{staticClass:"weight",attrs:{type:"number",min:"1",extended:""},model:{value:e.bodyfat,callback:function(t){e.bodyfat=t},expression:"bodyfat"}}),t("p",{staticClass:"control"},[t("span",{staticClass:"button is-static"},[e._v("%")])])],1),t("div",{staticClass:"mt-4 is-size-5 has-text-centered"},[e._v(" Your "),t("b-tooltip",{attrs:{label:"The fat-free mass index, known as FFMI, indicates the body’s muscle development.",position:"is-top",size:e.getTooltipSize,multilined:"",dashed:"",type:"is-primary"}},[t("span",[e._v("FFMI")])]),e._v(" is "),t("span",{staticClass:"has-text-weight-bold"},[e._v(e._s(e.getFFMI))])],1),t("div",{staticClass:"mt-4 is-size-5 has-text-centered"},[e._v(" Your "),t("b-tooltip",{attrs:{label:"Normalized FFMI is just FFMI better adjusted for height.",position:"is-top",size:e.getTooltipSize,multilined:"",dashed:"",type:"is-primary"}},[t("span",[e._v("normalized FFMI")])]),e._v(" is "),t("span",{staticClass:"has-text-weight-bold"},[e._v(e._s(e.getNormalizedFFMI))])],1)],1),t("div",{staticClass:"box"},[t("h2",{staticClass:"title is-size-3"},[e._v("FFMI Categories")]),t("b-table",{attrs:{selected:e.selected,striped:!0,data:e.FFMITable,columns:e.FFMIColumns,"mobile-cards":!1},on:{"update:selected":function(t){e.selected=t}}})],1)])},a=[],l={data(){return{units:"metric",bodyfat:12,height:{metric:183,imperial:{feet:6,inches:0}},weight:{metric:80,imperial:180},FFMITable:[{category:"Below average",FFMI:"<18"},{category:"Average",FFMI:"18-20"},{category:"Above average",FFMI:"20-22"},{category:"Excellent",FFMI:"22-23⁠"},{category:"Superior",FFMI:"23-26"},{category:"Suspicion of steroid use",FFMI:"26-28"},{category:"Steroid use likely",FFMI:">28"}],FFMIColumns:[{field:"category",label:"Category",numeric:!1,centered:!0},{field:"FFMI",label:"FFMI",numeric:!0,centered:!0}],selected:void 0}},methods:{round(e,t){return Math.round(e*10**t)/10**t},getFFMILevel(e){switch(!0){case e<=18:return this.selected=this.FFMITable[0],"Bellow average";case e>18&&e<=20:return this.selected=this.FFMITable[1],"Average";case e>20&&e<=22:return this.selected=this.FFMITable[2],"Above average";case e>22&&e<=23:return this.selected=this.FFMITable[3],"Excellent";case e>23&&e<=26:return this.selected=this.FFMITable[4],"Superior";case e>26&&e<=28:return this.selected=this.FFMITable[5],"Suspicion of steroid use";case e>28:return this.selected=this.FFMITable[6],"Steroid use likely";default:return"Something broke"}}},computed:{getTooltipSize(){return screen.width>=540?"is-large":"is-small"},getFFMI(){return"metric"===this.units?this.round(this.weight.metric*(1-this.bodyfat/100)/(this.height.metric/100)**2,2):this.round(Number.parseInt(this.weight.imperial)/2.20462262*(1-this.bodyfat/100)/((Number.parseInt(this.height.imperial.inches)+12*Number.parseInt(this.height.imperial.feet))/39.3700787)**2,2)},getNormalizedFFMI(){return"metric"===this.units?this.round(this.getFFMI+6.1*(1.8-this.height.metric/100),2):this.round(this.getFFMI+6.1*(1.8-(Number.parseInt(this.height.imperial.inches)+12*Number.parseInt(this.height.imperial.feet))/39.3700787),2)}},mounted(){this.getFFMILevel(this.getFFMI)},beforeUpdate(){this.getFFMILevel(this.getFFMI)}},r=l,n=i(1),c=(0,n.Z)(r,s,a,!1,null,"521e3bff",null),o=c.exports}}]);
//# sourceMappingURL=10.acf64b11.js.map