import{readFileSync as R,writeFileSync as W,mkdirSync as K,readdirSync as D}from'node:fs';
import{join as J}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of D(I).sort()){
 const P=R(J(I,id,'program.bin')),N=R(J(I,id,'input.bin'));
 let S=[],C=[],m=new Int32Array(256),o=[],p=0,n=0,t=0,x=0,d=0,a=0,b=0,k=0,g=0,s='';
 const T=c=>{throw c};
 const U=()=>{if(!S.length)T(2);return S.pop()};
 const H=v=>{if(S.length>255)T(3);S.push(v|0)};
 try{while(!d){
  if(t>=1e6)T(10);
  if(p<0||p>=P.length)T(9);
  const op=P[p];
  if(!(op<8||(op>15&&op<35)||(op>47&&op<53)||(op>63&&op<66)||(op>79&&op<84)))T(5);
  const im=op==1?1:op==2?4:op>47&&op<52?2:0;
  if(im&&p+im>=P.length)T(9);
  t++;
  if(op>47&&op<52){k=P[p+1]|P[p+2]<<8;if(op<51&&k>32767)k-=65536}
  if(op>15&&op<35&&op!=23&&op!=27){b=U();a=U()}
  switch(op){
   case 0:d=1;break;
   case 1:H(P[p+1]>127?P[p+1]-256:P[p+1]);p+=2;break;
   case 2:H(P[p+1]|P[p+2]<<8|P[p+3]<<16|P[p+4]<<24);p+=5;break;
   case 3:U();p++;break;
   case 4:a=U();H(a);H(a);p++;break;
   case 5:b=U();a=U();H(b);H(a);p++;break;
   case 6:b=U();a=U();H(a);H(b);H(a);p++;break;
   case 7:g=U();b=U();a=U();H(b);H(g);H(a);p++;break;
   case 16:H(a+b);p++;break;
   case 17:H(a-b);p++;break;
   case 18:H(Math.imul(a,b));p++;break;
   case 19:if(!b)T(4);H((a/b)|0);p++;break;
   case 20:if(!b)T(4);H(a%b);p++;break;
   case 21:if(!b)T(4);H(Math.floor((a>>>0)/(b>>>0)));p++;break;
   case 22:if(!b)T(4);H((a>>>0)%(b>>>0));p++;break;
   case 23:H(-U());p++;break;
   case 24:H(a&b);p++;break;
   case 25:H(a|b);p++;break;
   case 26:H(a^b);p++;break;
   case 27:H(~U());p++;break;
   case 28:H(a<<(b&31));p++;break;
   case 29:H(a>>(b&31));p++;break;
   case 30:H(a>>>(b&31));p++;break;
   case 32:H(a==b?1:0);p++;break;
   case 33:H(a<b?1:0);p++;break;
   case 34:H((a>>>0)<(b>>>0)?1:0);p++;break;
   case 48:p+=3+k;break;
   case 49:a=U();p+=a?3:3+k;break;
   case 50:a=U();p+=a?3+k:3;break;
   case 51:if(C.length>63)T(7);C.push(p+3);p=k;break;
   case 52:if(!C.length)T(8);p=C.pop();break;
   case 64:a=U();if(a<0||a>255)T(6);H(m[a]);p++;break;
   case 65:a=U();b=U();if(a<0||a>255)T(6);m[a]=b;p++;break;
   case 80:a=U();s=String(a);if(o.length+s.length>65536)T(11);for(let i=0;i<s.length;i++)o.push(s.charCodeAt(i));p++;break;
   case 81:a=U();if(o.length>65535)T(11);o.push(a&255);p++;break;
   case 82:H(n<N.length?N[n++]:-1);p++;break;
   case 83:x=U()&255;d=1;break;
  }
 }}catch(e){x=e}
 K(J(O,id),{recursive:true});
 W(J(O,id,'stdout.bin'),Buffer.from(o));
 W(J(O,id,'exit.txt'),x+'\n');
}
