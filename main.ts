import{readFileSync as R,writeFileSync as W,mkdirSync as K,readdirSync as D}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of D(I)){
 const P=R(I+'/'+id+'/program.bin'),N=R(I+'/'+id+'/input.bin');
 let S=[],C=[],m=new Int32Array(256),o=[],p=0,n=0,t=0,x=0,d=0,a=0,b=0,k=0,s='';
 const T=c=>{throw c};
 const U=()=>S.pop()??T(2);
 const H=v=>S.length>255?T(3):S.push(v|0);
 try{while(!d){
  if(t>=1e6)T(10);
  if(p<0||p>=P.length)T(9);
  const op=P[p];
  const im=op==1?1:op==2?4:op>47&&op<52?2:0;
  if(im&&p+im>=P.length)T(9);
  t++;
  if(op>47&&op<52){k=P.readUInt16LE(p+1);if(op<51)k=k<<16>>16}
  if(op>15&&op<35&&op!=23&&op!=27&&op!=31){b=U();a=U()}
  switch(op){
   case 0:d=1;break;
   case 1:H(P.readInt8(p+1));p++;break;
   case 2:H(P.readInt32LE(p+1));p+=4;break;
   case 3:U();break;
   case 4:a=U();H(a);H(a);break;
   case 5:b=U();a=U();H(b);H(a);break;
   case 6:b=U();a=U();H(a);H(b);H(a);break;
   case 7:k=U();b=U();a=U();H(b);H(k);H(a);break;
   case 16:H(a+b);break;
   case 17:H(a-b);break;
   case 18:H(Math.imul(a,b));break;
   case 19:if(!b)T(4);H(a/b|0);break;
   case 20:if(!b)T(4);H(a%b);break;
   case 21:if(!b)T(4);H(Math.floor((a>>>0)/(b>>>0)));break;
   case 22:if(!b)T(4);H((a>>>0)%(b>>>0));break;
   case 23:H(-U());break;
   case 24:H(a&b);break;
   case 25:H(a|b);break;
   case 26:H(a^b);break;
   case 27:H(~U());break;
   case 28:H(a<<(b&31));break;
   case 29:H(a>>(b&31));break;
   case 30:H(a>>>(b&31));break;
   case 32:H(a==b?1:0);break;
   case 33:H(a<b?1:0);break;
   case 34:H((a>>>0)<(b>>>0)?1:0);break;
   case 48:p+=2+k;break;
   case 49:a=U();p+=a?2:2+k;break;
   case 50:a=U();p+=a?2+k:2;break;
   case 51:if(C.length>63)T(7);C.push(p+3);p=k-1;break;
   case 52:if(!C.length)T(8);p=C.pop()-1;break;
   case 64:a=U();if(a<0||a>255)T(6);H(m[a]);break;
   case 65:a=U();b=U();if(a<0||a>255)T(6);m[a]=b;break;
   case 80:a=U();s=String(a);if(o.length+s.length>65536)T(11);o.push(...Buffer.from(s));break;
   case 81:a=U();if(o.length>65535)T(11);o.push(a&255);break;
   case 82:H(n<N.length?N[n++]:-1);break;
   case 83:x=U()&255;d=1;break;
   default:T(5);
  }
  p++;
 }}catch(e){x=e}
 K(O+'/'+id,{recursive:true});
 W(O+'/'+id+'/stdout.bin',Buffer.from(o));
 W(O+'/'+id+'/exit.txt',x+'\n');
}
