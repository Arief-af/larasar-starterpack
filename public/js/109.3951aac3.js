"use strict";(self["webpackChunklarasar"]=self["webpackChunklarasar"]||[]).push([[109],{7109:(e,a,r)=>{r.r(a),r.d(a,{default:()=>z});var s=r(3673),l=r(2323);const o={class:"q-pa-lg"},n={class:"form-label"},t={key:0,class:"text-negative q-my-sm"},m={class:"form-label"},i={key:0,class:"text-negative q-my-sm"},u={class:"form-label"},d={key:0,class:"text-negative q-my-sm"},c={class:"form-label"},p={key:0,class:"text-negative q-my-sm"},w={class:"form-label"},v={key:0,class:"text-negative q-my-sm"};function f(e,a,r,f,g,b){const y=(0,s.up)("q-input"),k=(0,s.up)("q-btn"),q=(0,s.up)("q-form");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s.Uk)((0,l.zw)(f.errors)+" ",1),(0,s.Wm)(q,{onSubmit:f.onSubmit,onReset:f.onReset,class:"q-gutter-md"},{default:(0,s.w5)((()=>[(0,s._)("div",n,[(0,s.Wm)(y,{color:"warning",modelValue:f.user.email,"onUpdate:modelValue":a[0]||(a[0]=e=>f.user.email=e),type:"text",label:"Email"},null,8,["modelValue"]),f.errors.email?((0,s.wg)(),(0,s.iD)("div",t,(0,l.zw)(f.errors.email[0]),1)):(0,s.kq)("",!0)]),(0,s._)("div",m,[(0,s.Wm)(y,{color:"warning",modelValue:f.user.name,"onUpdate:modelValue":a[1]||(a[1]=e=>f.user.name=e),type:"text",label:"Name"},null,8,["modelValue"]),f.errors.name?((0,s.wg)(),(0,s.iD)("div",i,(0,l.zw)(f.errors.name[0]),1)):(0,s.kq)("",!0)]),(0,s._)("div",u,[(0,s.Wm)(y,{color:"warning",modelValue:f.user.username,"onUpdate:modelValue":a[2]||(a[2]=e=>f.user.username=e),type:"text",label:"Username"},null,8,["modelValue"]),f.errors.username?((0,s.wg)(),(0,s.iD)("div",d,(0,l.zw)(f.errors.username[0]),1)):(0,s.kq)("",!0)]),(0,s._)("div",c,[(0,s.Wm)(y,{color:"warning",modelValue:f.user.password,"onUpdate:modelValue":a[3]||(a[3]=e=>f.user.password=e),type:"password",label:"Password"},null,8,["modelValue"]),f.errors.password?((0,s.wg)(),(0,s.iD)("div",p,(0,l.zw)(f.errors.password[0]),1)):(0,s.kq)("",!0)]),(0,s._)("div",w,[(0,s.Wm)(y,{color:"warning",modelValue:f.user.password_confirmation,"onUpdate:modelValue":a[4]||(a[4]=e=>f.user.password_confirmation=e),type:"password",label:"Confirm Password"},null,8,["modelValue"]),f.errors.password_confirmation?((0,s.wg)(),(0,s.iD)("div",v,(0,l.zw)(f.errors.password_confirmation[0]),1)):(0,s.kq)("",!0)]),(0,s._)("div",null,[(0,s.Wm)(k,{label:"Submit",type:"submit",color:"warning"}),(0,s.Wm)(k,{label:"Reset",type:"reset",color:"warning",flat:"",class:"q-ml-sm"})])])),_:1},8,["onSubmit","onReset"])])}var g=r(1959),b=r(5474),y=r(8825);const k={setup(){const e=(0,y.Z)(),a=(0,g.iH)([]),r=(0,g.iH)([]);function s(){a.value=[],r.value=[]}function l(){b.api.post("/api/register",{name:a.value.name,email:a.value.email,username:a.value.username,password:a.value.password,password_confirmation:a.value.password_confirmation}).then((()=>{a.value=[],e.notify({message:"Successfully registered",icon:"mark_email_read",color:"green"})})).catch((e=>{r.value=e.response.data.errors,r.value["password_confirmation"]=["Password confirmation didn't match"]}))}return{user:a,onReset:s,onSubmit:l,errors:r}}};var q=r(4260),_=r(5269),V=r(4842),x=r(8240),W=r(7518),U=r.n(W);const h=(0,q.Z)(k,[["render",f]]),z=h;U()(k,"components",{QForm:_.Z,QInput:V.Z,QBtn:x.Z})}}]);